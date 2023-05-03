<template>
  <div>
    <v-row class="match-height">
      <v-col
        cols="12"
        md="12"
      >
    
        <v-card>
          <v-card-title
            v-if="Header"
            class="mb-0"
          >
            {{ formParentTitle }}
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <ejs-grid
              id="gridM"
              ref="gridM"
              :data-source="dataM"
              :allow-paging="true"
              :allow-filtering="true"
              :allow-sorting="true"
              :allow-multi-sorting="true"
              :filter-settings="filterOptions"
              :page-settings="pageOptions"
              :data-state-change="dataMStateChange"
              :data-source-changed="dataMSourceChanged"
              :toolbar="toolbarM"
              :edit-settings="editSettingsM"
              :row-selected="onRowSelected"
              :grid-lines="lines"
              :action-begin="actionBegin"
              :action-complete="actionCompleteM"
              :toolbar-click="clickMHandler"
              :row-height="rowHeight"
              :allow-resizing="true"
              :allow-reordering="true"
              height="290"
            >
              <e-columns>
                <e-column
                  :visible="false"
                  field="version"
                  type="number"
                >
                </e-column>
                <e-column
                  :visible="false"
                  field="id"
                  :is-primary-key="true"
                >
                </e-column>
                <e-column
                  field="title"
                  header-text="عنوان"
                  :validation-rules="rules"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                ></e-column>
                <e-column
                  field="code"
                  header-text="کد"
                  :validation-rules="rules"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                  :custom-attributes=" {class: 'e-attr'}"
                  header-text-align="right"
                  text-align="left"
                ></e-column>
                <e-column
                  field="description"
                  header-text="توضیحات"
                  type="string"
                  :filter="sfilter"
                  width="*"
                ></e-column>
                <e-column
                  field="createdBy"
                  header-text="ایجاد کننده"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                  :allow-editing="false"
                ></e-column>
                <e-column
                  field="localCreatedDate"
                  header-text="تاریخ ایجاد"
                  :custom-attributes=" {class: 'rtl-date'}"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                  :allow-editing="false"
                ></e-column>
              </e-columns>
            </ejs-grid>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="match-height">
      <v-col
        cols="12"
        md="12"
        class="mt-n6"
      >
        <v-card>
          <v-card-title class="mb-0">
            {{ formChildTitle }} <span v-if="parameterTitle">&nbsp;"{{ parameterTitle }}"</span>
          </v-card-title>
          <v-card-text class="ma-0 pa-0">
            <ejs-grid
              id="gridD"
              ref="gridD"
              :data-source="dataD"
              :allow-paging="true"
              :allow-filtering="true"
              :allow-sorting="true"
              :allow-multi-sorting="true"
              :action-begin="actionBegin"
              :filter-settings="filterOptions"
              :page-settings="pageOptions"
              :data-state-change="dataDStateChange"
              :data-source-changed="dataDSourceChanged"
              :toolbar="toolbarD"
              :edit-settings="editSettingsD"
              :grid-lines="lines"
              :action-complete="actionCompleteD"
              :toolbar-click="clickDHandler"
              :row-height="rowHeight"
              :allow-resizing="true"
              :allow-reordering="true"
              :allow-row-drag-and-drop="true"
              :row-drop="rowDrop"
              height="290"
            >
              <e-columns>
                <e-column
                  :visible="false"
                  field="version"
                  type="number"
                >
                </e-column>
                <e-column
                  :visible="false"
                  field="id"
                  :is-primary-key="true"
                >
                </e-column>
                <e-column
                  field="title"
                  header-text="عنوان"
                  :validation-rules="rules"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                ></e-column>
                <e-column
                  field="code"
                  header-text="کد"
                  :validation-rules="rules"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                  header-text-align="right"
                  text-align="left"
                ></e-column>
                <e-column
                  header-text="ترتیب نمایش"
                  field="showOrder"
                  type="number"
                  :auto-fit="true"
                >
                </e-column>
                <e-column
                  field="description"
                  header-text="توضیحات"
                  type="string"
                  :filter="sfilter"
                  width="*"
                ></e-column>
                <e-column
                  field="createdBy"
                  header-text="ایجاد کننده"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                  :allow-editing="false"
                ></e-column>
                <e-column
                  field="localCreatedDate"
                  header-text="تاریخ ایجاد"
                  type="string"
                  :filter="sfilter"
                  :auto-fit="true"
                  :allow-editing="false"
                  :custom-attributes=" {class: 'rtl-date'}"
                ></e-column>
                <e-column
                  header-text="فعال"
                  edit-type="booleanedit"
                  display-as-check-box="true"
                  type="boolean"
                  field="enabled"
                  default-value="true"
                  :filter-bar-template="template1"
                  text-align="center"
                  min-width="120"
                  :auto-fit="true"
                  header-text-align="right"
                ></e-column>
              </e-columns>
            </ejs-grid>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { mapActions, mapMutations, mapState } from 'vuex'
import DataGrid from '@/components/DataGrid.vue'

export default DataGrid.extend({
  data() {
    return {
      boolCol1: 'enabled',
      parameterTitle: '',
      parameterId: 0,
      formParentTitle: this.$msg.ParameterTitle,
      formChildTitle: this.$msg.ParametersValues,
      rules: { required: true },
      criteria: {},
      gridD: {},
      editSettingsM: {},
      editSettingsD: {},
      stateM: null,
      stateD: null,
      toolbarM: [],
      toolbarD: [],
    }
  },
  mounted() {
    /* security config */

    this.editSettingsM = {
      ...this.editSettings,
      allowAdding: this.hasInRole('parameter_c'),
      allowEditing: this.hasInRole('parameter_u'),
      allowDeleting: this.hasInRole('parameter_d'),
    }

    this.editSettingsD = {
      ...this.editSettings,
      allowAdding: this.hasInRole('parameter_value_c'),
      allowEditing: this.hasInRole('parameter_value_u'),
      allowDeleting: this.hasInRole('parameter_value_d'),
    }

    this.toolbarM = this.setToolbar(this.editSettingsM)
    this.toolbarD = this.setToolbar(this.editSettingsD)

    /* end securtiy config */

    setTimeout(() => this.dataMStateChange(this.baseState), 100)
    // eslint-disable-next-line prefer-destructuring
    this.gridD = document.getElementById('gridD').ej2_instances[0]

    // eslint-disable-next-line prefer-destructuring
    this.gridM = document.getElementById('gridM').ej2_instances[0]

    this.configFilterText(this.gridD)
    this.configFilterText(this.gridM)

    this.resetDData()

    this.filterBoolean(['enabled'])

    this.toggleEnabledGrid('gridD', false)
  },
  computed: {
    ...mapState({ dataM: state => state.Parameter.mDatas, dataD: state => state.Parameter.dDatas }),
    template1() {
      return this.bFilter(`-${this.boolCol1}`)
    },
  },
  methods: {
    onRowSelected(args) {
      const record = args.data
      this.parameterTitle = record.title
      this.parameterId = record.id

      // this.criteria = { n: 'parameter.id', v: this.parameterId, o: 'equals' }
      // this.getDDatas({ criteria: [this.criteria] })

      this.getDDatas({ ...this.baseState, id: this.parameterId })

      this.gridD.clearFiltering()
      this.toggleEnabledGrid('gridD', true)
    },
    ...mapActions({
      getMDatas: 'Parameter/getMDatas',
      saveMData: 'Parameter/saveMData',
      updateMData: 'Parameter/updateMData',
      deleteMData: 'Parameter/deleteMData',
      getDDatas: 'Parameter/getDDatas',
      saveDData: 'Parameter/saveDData',
      updateDData: 'Parameter/updateDData',
      deleteDData: 'Parameter/deleteDData',
      batchShowOrder: 'Parameter/batchShowOrder',
    }),
    ...mapMutations({
      resetDData: 'Parameter/resetDData',
    }),
    dataMStateChange(state) {
      this.stateM = state
      if (state?.action?.action === 'filter') {
        this.resetGridD()
      }
      this.loadData(state, this.getMDatas)
    },
    dataMSourceChanged(state) {
      if (state.action === 'add') {
        this.handleResponse(state, this.saveMData, this.$refs.gridM)
        this.resetDData()
      } else if (state.action === 'edit') {
        this.handleResponse(state, this.updateMData, this.$refs.gridM)
      } else if (state.requestType === 'delete') {
        this.handleResponse(state, this.deleteMData, this.$refs.gridM, true, () => {}, false, true).then(() => {
          this.parameterTitle = ''
          this.resetGridD()
        })
      }
    },
    dataDStateChange(state) {
      state.id = this.parameterId
      this.stateD = state
      this.loadData(state, this.getDDatas)
    },
    dataDSourceChanged(state) {
      if (state.action === 'add') {
        state.data = { ...state.data, ...this.$util.flattenObj({ parameter: { id: this.parameterId } }) }
        this.handleResponse(state, this.saveDData, this.$refs.gridD)
      } else if (state.action === 'edit') {
        state.data = { ...state.data, ...this.$util.flattenObj({ parameter: { id: this.parameterId } }) }
        this.handleResponse(state, this.updateDData, this.$refs.gridD)
      } else if (state.requestType === 'delete') {
        this.handleResponse(state, this.deleteDData, this.$refs.gridD)
      }
    },
    resetGridD() {
      this.resetDData()
      this.gridD.clearFiltering()
    },
    actionBegin(args) {
      if (args.requestType === 'add' || args.requestType === 'beginEdit') {
        setTimeout(() => {
          document.querySelector('td .e-float-input input[id*="createdBy"]').parentElement.style.display = 'none'
          document.querySelector('td .e-float-input input[id*="CreatedDate"]').parentElement.style.display = 'none'

          if (document.querySelector('td .e-float-input input[id*="showOrder"]')) { document.querySelector('td .e-float-input input[id*="showOrder"]').parentElement.style.display = 'none' }
        }, 100)
      }
    },
    actionCompleteM(args) {
      this.setHeaderDialog(args, this.$msg.ParameterTitle)

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        setTimeout(() => {
          document.querySelector('#gridMcode').addEventListener('keypress', e => {
            this.language(e)
          })
        }, 300)
      }
    },
    actionCompleteD(args) {
      this.setHeaderDialog(args, this.$msg.ParameterValueTitle)

      if (args.requestType === 'beginEdit' || args.requestType === 'add') {
        setTimeout(() => {
          document.querySelector('#gridDcode').addEventListener('keypress', e => {
            this.language(e)
          })
        }, 300)
      }
    },
    filterBoolean(cols) {
      cols.forEach(col => {
        this.localDataGridBus.$on(`bfilter-${col}`, e => {
          if (e !== 2) {
            this.gridD.filterByColumn(col, 'equal', e)
          } else { this.gridD.removeFilteredColsByField(col) }
        })
      })
    },
    clickMHandler(args) {
      if (args.item.id === 'refresh') {
        this.dataMStateChange(this.stateM)
      }
    },
    clickDHandler(args) {
      if (args.item.id === 'refresh') {
        this.dataDStateChange(this.stateD)
      }
    },
    rowDrop() {
      setTimeout(() => {
        this.batchShowOrder(this.gridD.currentViewData.map((item, idx) => ({ id: item.id, title: item.title, showOrder: idx + 1 }))).then(() => {
          this.dataDStateChange(this.stateD ?? this.baseState)
        })
      }, 500)
    },
  },
})
</script>

<style>

</style>


