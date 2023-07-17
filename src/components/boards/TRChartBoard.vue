<template>
  <div class="board-container">
    <div class="board-title">
      <span>Top Referral</span>
    </div>
    <div class="chart" style="height: 600px">
      <!-- <VueGoodTable :columns="columns" :rows="rows" /> -->
      <ag-grid-vue
        style="width: 100%; height: 100%"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        :defaultColDef="defaultColDef"
        :groupDisplayType="groupDisplayType"
        :animateRows="true"
        :rowData="rowData"
      ></ag-grid-vue>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles//ag-theme-alpine.css";
import "ag-grid-community/styles//ag-grid.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

ModuleRegistry.registerModules([RowGroupingModule]);

export default {
  name: "TRChartBoard",
  components: { AgGridVue },
  data() {
    return {
      TRChartData: {},
      dataSet: [],
      countryTotal: 0,
      regionTotal: 0,
      cityTotal: 0,
      allTotal: 0,
      columnDefs: [
        { field: "country", rowGroup: true, hide: true },
        { field: "region", rowGroup: true, hide: true },
        {
          field: "city",
          // field: "Country (IP) > Region (IP) > City (IP)",
          minWidth: 250,
          cellRenderer: (params) => {
            return `<span style="margin-left: 60px">${params.value}</span>`;
          },
        },
        { field: "sum", minWidth: 200 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        resizable: true,
      },
      groupDisplayType: null,
      rowData: null,
    };
  },
  created() {
    this.groupDisplayType = "groupRows";
  },
  watch: {
    TRChartData() {
      // data set
      this.TRChartData.rows.forEach((data, i) => {
        const tempData = {
          country: "",
          region: "",
          city: "",
          sum: "",
        };
        tempData.country = data[0];
        tempData.region = data[1];
        tempData.city = data[2];
        tempData.sum = data[3];
        this.dataSet.push(tempData);
      });
      this.onGridReady();
    },
  },
  mounted() {
    this.get();
  },
  methods: {
    async get() {
      await axios
        .get("https://static.adbrix.io/front/coding-test/event_4.json")
        .then((response) => {
          console.log(response);
          this.TRChartData = response.data.data;
          console.log("TRChartData = ", this.TRChartData);
        });
    },
    onGridReadySet(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    onGridReady() {
      const updateData = (data) => {
        this.rowData = data;
      };
      updateData(this.dataSet);
    },
  },
};
</script>

<style></style>
