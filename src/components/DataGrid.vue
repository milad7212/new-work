<script>

// Amin HK:
// Infrastructure code set all the list grids. "Please do not touch anything." \(^_^)/
import Vue from 'vue'
import { mapMutations } from 'vuex'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  GridPlugin,
  Page,
  Filter,
  Sort,
  Edit,
  Toolbar,
  RowDD,
  Selection,
  Resize,
  Freeze,
  Group,
  Reorder,
  ColumnChooser,
} from '@syncfusion/ej2-vue-grids'

import {
  setCulture, enableRtl, createElement,
} from '@syncfusion/ej2-base'

import { TextBox } from '@syncfusion/ej2-inputs'
import { DropDownList } from '@syncfusion/ej2-dropdowns'
import { ToolbarPlugin } from '@syncfusion/ej2-vue-navigations'

import '@/utils/syncfusion/dataGridTrans'
import '@/utils/syncfusion/formValidator'

enableRtl(true)
setCulture('fa')

Vue.use(ToolbarPlugin)
Vue.use(GridPlugin)

let dropObj
let dropElem

export default Vue.extend({
  vm: this,
  components: {
    'ejs-grid': GridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: { header: { default: true } },
  data() {
    return {
      wrapSettings: { wrapMode: 'Content' },
      rowHeight: 29,
      localDataGridBus: new Vue(),
      Header: this.header,
      pageOptions: { pageSizes: [10, 50, 100, 200], pageSize: 10 },
      filterOptions: {
        type: 'FilterBar',
        showFilterBarOperator: true,
        mode: 'Immediate',
        immediateModeDelay: 1500,
      },
      changes: {},
      baseState: { skip: 0, take: 10 },
      toolbar: [{
        text: 'بازخوانی', tooltipText: 'بازخوانی', prefixIcon: 'e-refresh', id: 'refresh',
      },

      // {
      //   text: 'نمایش کامل', tooltipText: 'نمایش کامل', prefixIcon: 'e-level-4', id: 'full',
      // },
      'Add', 'Edit', 'Delete'],
      editSettings: {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        showDeleteConfirmDialog: true,
        mode: 'Dialog',
      },
      lines: 'Both',
      sendUpdate: true,
      sfilter: { operator: 'contains' },
      efilter: { operator: 'equal' },

      // Amin HK:
      // How to use: :filter="customFilter" and filterOptions: { type: 'Menu',
      // This code solves the problem of automatic fetching without finding any records. \(^_^)/
      customFilter: {
        ui: {
          create: args => {
            const cusInput = createElement('input', { className: 'cusInput', id: 'cusInput' })
            args.target.appendChild(cusInput)
            this.inputobj1 = new TextBox({
              placeholder: this.$msg.EnterValue,
              floatLabelType: 'Never',
            })
            this.inputobj1.appendTo('#cusInput')
          },
          write: args => {
            if (args.filteredValue) {
              this.inputobj1.value = args.filteredValue
            }
          },
          read: args => {
            args.fltrObj.filterByColumn(args.column.field, args.operator, this.inputobj1.value)
          },
        },
      },
    }
  },

  mounted() {
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     // const btns = document.querySelectorAll('.e-refresh')
    //     // if (btns.length > 0) {
    //     //   btns.forEach(item => item.parentElement.addEventListener('click', () => { this.$bus.$emit('gridRefresh') }))
    //     // }
    //   }, 1000)
    // })
  },
  provide() {
    return {
      grid: [Page, Filter, Sort, Edit, Toolbar, RowDD, Selection, Resize, Freeze, Group, Reorder, ColumnChooser],
    }
  },
  methods: {
    ...mapMutations({
      setResponse: 'Utility/setResponse',
    }),
    configFilterText(grid) {
      if (grid?.element.querySelector('.e-filterbar')?.children) {
        Array.prototype.forEach.call(grid.element.querySelector('.e-filterbar').children,
          child => {
            if (child.querySelector('input.e-input')) {
            // eslint-disable-next-line no-param-reassign
              child.querySelector('input.e-input').placeholder = 'جستجو'
            }
          })
      }
    },
    bFilter(idx) {
      const vm = this

      return {
        create() {
          dropElem = document.createElement('input')

          return dropElem
        },
        read: () => dropObj.text,
        destroy: () => {
          dropObj.destroy()
        },
        write() {
          dropObj = new DropDownList({
            dataSource: [{ id: 2, text: 'همه' }, { id: 1, text: 'فعال' }, { id: 0, text: 'غیرفعال' }],
            fields: { value: 'id', text: 'text' },
            change: e => {
              vm.localDataGridBus.$emit(`bfilter${idx}`, e.value)
            },
          })
          dropObj.appendTo(dropElem)
        },
      }
    },
    completeCRUD(grid, isInline = true, addCallBack = () => {}) {
      setTimeout(() => { if (isInline) { if (grid) grid.closeEdit(true) } if (grid) grid.refresh(); addCallBack() }, 150)
    },
    // eslint-disable-next-line no-unused-vars
    failureCRUD(grid, state = null, isInline = true) {
      if (grid) { grid.hideSpinner() }

      // if (isInline) {
      //   if (grid) { grid.startEdit() }
      // }

      // if (state) {
      //   if (isInline) {
      //     state.startEdit()
      //   }
      // }

      // if (grid) { grid.refresh() }
    },
    partialUpdate(state) {
      this.sendUpdate = true
      this.changes = {}
      const oldData = state.rowData
      const newData = state.data
      const lchanges = {}
      let i = 0

      const editFields = Object.keys(state.previousData)
      while (i < editFields.length) {
        if (oldData[editFields[i]] !== newData[editFields[i]]) {
          lchanges[editFields[i]] = newData[editFields[i]]
        }
        i += 1
      }

      if (Object.keys(lchanges).length === 0) this.sendUpdate = false

      this.changes = { ...lchanges, id: state.data.id, version: state.data.version }
    },
    // eslint-disable-next-line no-unused-vars
    loadData(state, callback, addParameter = null, isPromise = false) {
      if (state?.action?.requestType !== 'stringfilterrequest') {
        return new Promise(resolve => {
          if (!addParameter) { setTimeout(() => { callback(state).then(e => resolve(e)) }, 150) } else { setTimeout(() => callback(addParameter).then(e => resolve(e)), 150) }
        })
      }

      return []
    },
    // eslint-disable-next-line no-unused-vars
    handleResponse(state, callback, grid, isInline = true, addCallBack = () => {}, isPartial = false, isPromise = false) {
      if (isPartial) {
        this.partialUpdate(state)
        state.data = this.changes
      }

      let sendStatus = true
      if (!this.sendUpdate) { sendStatus = false }

      if (state.data) {
        Object.keys(state.data).forEach(item => {
          if (state.data[item]) {
            state.data[item] = this.$util.normalizePersian(this.$util.removeTrim(state.data[item]))
          }
        })
      }

      return new Promise((resolve, reject) => {
        if (sendStatus) {
          callback(state).then(e => { resolve(e); this.setResponse(e); this.completeCRUD(grid, isInline, addCallBack) })
            .catch(e => { reject(e); this.failureCRUD(grid, state, isInline) })
        } else {
          this.completeCRUD(grid, isInline)
        }
      })
    },
    handleResponseUpload(payload, callback, grid) {
      callback(payload).then(() => this.completeCRUD(grid)).catch(() => this.failureCRUD(grid))
    },
    removeFilter(fname) {
      document.querySelector(`#${fname}_filterBarcell`).parentElement.remove()
    },
    removeToolbarEdit(name) {
      document.querySelector(`#${name}Grid_toolbarItems`).style.display = 'none'

      return {
        allowEditing: false,
        allowAdding: false,
        allowDeleting: false,
      }
    },
    setHeaderDialog(args, name, ignore = false, addName = null) {
      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        const { dialog } = args

        if (ignore) {
          dialog.header = `${addName} "${name}"`

          return
        }

        dialog.header = args.requestType === 'beginEdit' ? 'ویرایش' : `ایجاد "${name}"`
      }
    },
    toggleEnabledGrid(id, enable) {
      setTimeout(() => {
        const grid = document.getElementById(id)
        if (enable) {
          if (grid?.classList) {
            grid.classList.remove('disablegrid')
            grid.classList.remove('wrapper')
          }
        } else if (grid?.classList) {
          grid.classList.add('disablegrid')
          grid.classList.add('wrapper')
        }
      }, 150)
    },
    toggleEnabledGridByClass(grid, enable) {
      setTimeout(() => {
        if (enable) {
          if (grid.classList) {
            grid.classList.remove('disablegrid')
            grid.classList.remove('wrapper')
          }
        } else if (grid?.classList) {
          grid.classList.add('disablegrid')
          grid.classList.add('wrapper')
        }
      }, 150)
    },
    language(e) {
      const char = String.fromCharCode(e.keyCode)
      // eslint-disable-next-line no-control-regex
      if (/[^\x00-\x7F]/g.test(char)) {
        e.preventDefault()

        return false
      }

      return true
    },
    resolveDialogConflict(status, name) {
      if (status) {
        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.v-dialog').forEach(item => { item.style.visibility = 'hidden' })

        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.theme--dark.v-overlay').forEach(item => { item.style.visibility = 'hidden' })

        setTimeout(() => {
          if (document.querySelector(`#${name}GriddialogEdit_wrapper`) && 'parentElement' in document.querySelector(`#${name}GriddialogEdit_wrapper`)) {
            document.querySelector(`#${name}Grid_dialogEdit_wrapper`).parentElement.style.zIndex = 999999
          }

          if (document.querySelector(`#${name}Grid_dialogEdit_wrapper`)) {
            document.querySelector(`#${name}Grid_dialogEdit_wrapper`).style.zIndex = 1000000
          }
          if (document.querySelector(`#${name}Grid_dialogEdit_wrapper`)) { document.querySelector(`#${name}Grid_dialogEdit_wrapper`).style.zIndex = 1000000 }
        }, 300)
      } else {
        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.v-dialog').forEach(item => { item.style.visibility = 'visible' })
      }
    },
    hasInRole(role, ...addRoles) {
      const parentRole = role.slice(0, role.lastIndexOf('_'))

      /* additional roles */

      let flag = false

      addRoles.forEach(item => {
        if (Vue.$keycloak.hasResourceRole(item) && !flag) {
          flag = true
        }
      })

      if (flag) {
        return true
      }

      /* end additional roles */

      return process.env.VUE_APP_ROOT_SECURITY === 'false' ? true
        : Vue.$keycloak.hasResourceRole('admin_developer') || Vue.$keycloak.hasResourceRole(parentRole) || Vue.$keycloak.hasResourceRole(role)
    },
    setToolbar(editSettings) {
      const arr = []
      this.toolbar = [{
        text: 'بازخوانی', tooltipText: 'بازخوانی', prefixIcon: 'e-refresh', id: 'refresh',
      }]

      Object.keys(editSettings).forEach(item => {
        if (item === 'allowEditing' && editSettings[item]) {
          arr.push('Edit')
        } else if (item === 'allowAdding' && editSettings[item]) {
          arr.push('Add')
        } else if (item === 'allowDeleting' && editSettings[item]) {
          arr.push('Delete')
        }
      })

      return process.env.VUE_APP_ROOT_SECURITY === 'false' ? [
        {
          text: 'بازخوانی', tooltipText: 'بازخوانی', prefixIcon: 'e-refresh', id: 'refresh',
        }, 'Add', 'Edit', 'Delete'] : [...this.toolbar, ...arr]
    },
  },
})
</script>

<style scoped>
@import '../styles/syncfusion/styles.css'
</style>