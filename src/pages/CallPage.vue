<template>
  <div class="">
   
    <div class="flex justify-center my-2">
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
        height="100"
      >
        <e-columns>
          <e-column
            v-for="(column, index) in columns"
            :key="index"
            :field="column.field"
            :header-text="column.headerText"
            :validation-rules="column.validationRules"
            :type="column.type"
            :filter="sfilter"
            :auto-fit="column.autoFit"
            :is-primary-key="column.isPrimaryKey"
            :custom-attributes="column.customAttributes"
            :header-text-align="column.headerTextAlign"
            :text-align="column.textAlign"
            :width="column.width"
            :allow-editing="column.allowEditing"
          ></e-column>
        </e-columns>
      </ejs-grid>
    </div>
    <div  class=" flex justify-center my-2 ">
      
      <AppGrid v-if="dataM && dataM.length > 0"  :dataSource ='dataM' />

    </div>
  </div>
</template>

<script>
import AppGrid from "@/components/AppGrid.vue"
import dataTable from "@/data/dataTable";
import "@syncfusion/ej2-vue-grids/styles/material.css";
export default {
  data() {
    return {
      dataM: dataTable,
      pageOptions: {
        pageSize: 5,
        pageCount: 10,
        currentPage: 1,
      },
      columns: [
        {
          field: "version",
          type: "number",
          visible: false,
        },
        {
          field: "id",
          headerText: "شناسه",
          type: "number",
          visible: false,
          isPrimaryKey: true,
        },
        {
          field: "title",
          headerText: "عنوان",
          type: "string",
          validationRules: "rules",
          autoFit: true,
        },
        {
          field: "code",
          headerText: "کد",
          type: "string",
          validationRules: "rules",
          autoFit: true,
          customAttributes: { class: "e-attr" },
          headerTextAlign: "right",
          textAlign: "left",
        },
        {
          field: "description",
          headerText: "توضیحات",
          type: "string",
          width: "*",
        },
        {
          field: "createdBy",
          headerText: "ایجاد کننده",
          type: "string",
          autoFit: true,
          allowEditing: false,
        },
        {
          field: "localCreatedDate",
          headerText: "تاریخ ایجاد",
          type: "string",
          customAttributes: { class: "rtl-date" },
          autoFit: true,
          allowEditing: false,
        },
      ],
    };
  },
  components: {
    
    AppGrid
  },
  methods: {},
};
</script>
