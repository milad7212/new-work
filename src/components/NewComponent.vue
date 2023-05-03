<template>
    <v-dialog
      v-model="dialog"
      width="65vw"
      @keydown.esc="closeDialog"
    >
      <v-card>
        <v-card-title class="text-h5 mb-2">
          innerDialogForm
          <v-spacer></v-spacer>
          <v-icon
            dark
            icon
            color="white"
            medium
            @click="closeDialog"
          >
            {{ mdiClose }}
          </v-icon>
        </v-card-title>
        <v-card-text class="mx-0 mb-1 mt-n2 pa-2">
          <v-container>
            <v-form
              ref="formPattern"
              v-model="valid"
            >
              <input
                v-model="data.id"
                type="hidden"
              />
              <v-row
                no-gutters
                class="d-flex align-center"
              >
                <v-col
                  cols="6"
                  md="4"
                >
                  <v-text-field
                    v-model="data.name"
                    dense
                    label="نام"
                    :rules="requiredRules"
                    class="pl-4"
                  >
                  </v-text-field>
                </v-col>
                <v-col
                  cols="6"
                  md="4"
                >
                  <v-combobox
                    v-model="data.options"
                    :items="items"
                    label="عنوان"
                    :value="defaultValue"
                    :rules="dropDownRequired"
                    dense
                    class="pl-4"
                  >
                  </v-combobox>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions class="ml-n3 mt-1 mb-n3">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            small
            @click="submit"
          >
            ذخيره
          </v-btn>
          <v-btn
            color="primary"
            small
            @click="closeDialog"
          >
            بستن
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import { mdiClose } from '@mdi/js'
  
  export default {
    props: ['propData'],
    data() {
      return {
        data: {
          name: '',
          options: {},
        },
        mdiClose,
        dialog: true,
        valid: false,
        requiredRules: [
          v => !!v || 'فیلد اجباری است',
          v => v.length > 3 || 'hj jikhnjik hj',
        ],
        dropDownRequired: [
          value => !!value || 'مقدار صحيح را وارد کنيد.',
          value => value.value !== '#3' || 'مقدار وارد شده افتضاح است',
        ],
        items: [
          {
            text: '#1',
            value: '#1',
          },
          {
            text: '#2',
            value: '#2',
            disabled: true,
          },
          {
            text: '#3',
            value: '#3',
          },
          {
            text: '#4',
            value: '#4',
            disabled: true,
          },
          {
            text: '#5',
            value: '#5',
          },
        ],
        selectedItem: '',
        isValid: false,
        defaultValue: {
          text: '#4',
          value: '#4',
          disabled: true,
        },
      }
    },
    created() {
      if (this.propData) {
        this.data = this.propData
      }
    },
    methods: {
      submit() {
        if (!this.$refs.formPattern.validate()) return
        const data = {
          name: this.name,
          selectedItem: this.selectedItem.value,
        }
        this.$emit('onSave', data)
      },
      closeDialog() {
        this.dialog = false
        this.$emit('onClose')
      },
    },
  }
  </script>