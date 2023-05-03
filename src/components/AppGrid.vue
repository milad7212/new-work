<template>
  <div class="flex justify-center my-2">
    <ejs-grid
      id="my-grid"
      ref="myGrid"
      :data-source="dataSource"
      :allow-paging="isPagingEnabled"
      :allow-filtering="isFilteringEnabled"
      :allow-sorting="isSortingEnabled"
      :allow-multi-sorting="isMultiSortingEnabled"
      :filter-settings="filterSettings"
      :page-settings="pageSettings"
      :data-state-change="onDataStateChange"
      :data-source-changed="onDataSourceChanged"
      :toolbar="toolbarItems"
      :edit-settings="editSettings"
      :row-selected="onRowSelected"
      :grid-lines="gridLineSettings"
      :action-begin="onGridActionBegin"
      :action-complete="onGridActionComplete"
      :toolbar-click="onToolbarItemClick"
      :row-height="rowHeight"
      :allow-resizing="isColumnResizingEnabled"
      :allow-reordering="isColumnReorderingEnabled"
      height="210"
    >
      <e-columns>
        <e-column
          v-for="(column, index) in resolvedColumns"
          :key="index"
          :field="column?.field"
          :header-text="column?.headerText"
          :validation-rules="column?.validationRules"
          :type="column?.type"
          :filter="column?.filter"
          :auto-fit="column?.autoFitEnabled"
          :is-primary-key="column?.isPrimaryKey"
          :custom-attributes="column?.customAttributes"
          :header-text-align="column?.headerTextAlign"
          :text-align="column?.textAlign"
          :width="column?.width"
          :allow-editing="column?.editingEnabled"
        ></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script>
/**
 * @typedef {Object} GridDataSource
 * @property {Array} data - The data to display in the grid.
 * @property {Number} count - The total number of records in the data source.
 */

/**
 * @typedef {Object} GridFilterSettings
 * @property {String} type - The filter type to use, such as "menu", "checkbox", or "excel".
 * @property {Boolean} showPredicate - Whether to show the filter predicate.
 */

/**
 * @typedef {Object} GridPageSettings
 * @property {Number} pageSize - The number of records to display per page.
 * @property {Number} pageCount - The total number of pages.
 * @property {Number} currentPage - The current page index.
 */

/**
 * @typedef {Object} GridEditSettings
 * @property {String} mode - The edit mode to use, such as "normal", "batch", or "dialog".
 * @property {Boolean} allowAdding - Whether to allow adding new records.
 * @property {Boolean} allowEditing - Whether to allow editing existing records.
 * @property {Boolean} allowDeleting - Whether to allow deleting records.
 */

import "@syncfusion/ej2-vue-grids/styles/material.css";
export default {
  name: "GridComponent",
  props: {
    /** The data source for the grid. */
    dataSource: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          Object.prototype.hasOwnProperty.call(value, "data") &&
          Object.prototype.hasOwnProperty.call(value, "count")
        );
      },
    },
    /** Whether paging is enabled. */
    isPagingEnabled: {
      type: Boolean,
      default: true,
    },
    /** Whether filtering is enabled. */
    isFilteringEnabled: {
      type: Boolean,
      default: true,
    },
    /** Whether sorting is enabled. */
    isSortingEnabled: {
      type: Boolean,
      default: true,
    },
    /** Whether multi-column sorting is enabled. */
    isMultiSortingEnabled: {
      type: Boolean,
      default: true,
    },
    /** The filter settings for the grid. */
    filterSettings: {
      type: Object,
      default: () => ({}),
    },
    /** The page settings for the grid. */
    pageSettings: {
      type: Object,
      default: () => ({
        pageSize: 10,
        pageCount: 5,
        currentPage: 1,
      }),
    },
    /** The toolbar items for the grid. */
    toolbarItems: {
      type: Array,
      default: () => [],
    },
    /** The edit settings for the grid. */
    editSettings: {
      type: Object,
      default: () => ({}),
    },
    /** The grid line settings for the grid. */
    gridLineSettings: {
      type: String,
      default: "Both",
    },
    /** The row height for the grid. */
    rowHeight: {
      type: Number,
      default: 30,
    },
    /** Whether column resizing is enabled. */
    isColumnResizingEnabled: {
      type: Boolean,
      default: true,
    },
    /** Whether column reordering is enabled. */
    isColumnReorderingEnabled: {
      type: Boolean,
      default: true,
    },
    /** The height of the grid. */
    gridHeight: {
      type: String,
      default: "290px",
    },
    /** The columns to display in the grid. */
    columns: {
      type: Array,
      default: () => [
        {
          field: "version",
          headerText: "ورژن",
          type: "number",
          visible: true,
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
          autoFitEnabled: true,
        },
        {
          field: "code",
          headerText: "کد",
          type: "string",
          validationRules: "rules",
          autoFitEnabled: true,
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
          autoFitEnabled: true,
          editingEnabled: false,
        },
        {
          field: "localCreatedDate",
          headerText: "تاریخ ایجاد",
          type: "string",
          customAttributes: { class: "rtl-date" },
          autoFitEnabled: true,
          editingEnabled: false,
        },
      ],
    },
  },
  computed: {
    resolvedColumns() {
      return this.columns.filter((col) => col.visible !== false);
    },
  },
  methods: {
    onDataStateChange() {},
    onDataSourceChanged() {},
    onRowSelected() {},
    onGridActionBegin() {},
    onGridActionComplete() {},
    onToolbarItemClick() {},
  },
};
</script>

<style scoped>
.e-attr {
  font-weight: bold;
}
.rtl-date {
  direction: rtl;
}
</style>
