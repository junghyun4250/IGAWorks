<template>
  <div class="board-container">
    <div class="board-title">
      <span>DAU</span>
      <p>라이브러리 버전 문제로 보임... (미완)</p>
    </div>
    <!-- <div class="stick-chart" style="height: 400px">
      <LineChart :data="lineChartData" :options="lineChartOptions" />
      <BarChart :data="barChartData" :options="barChartOptions" />
    </div> -->
  </div>
</template>

<script>
import { Line, Bar } from "vue-chartjs";
import axios from "axios";

export default {
  name: "UVCboard",
  // components: { LineChart: Line, BarChart: Bar },
  props: ["rows"],
  data() {
    return {
      DAUdata: {},
      dateList: [],
      totalList: [],
      uniqueList: [],
      lineChartData: {
        labels: [],
        datasets: [
          {
            label: "Data 1",
            borderColor: "#00f", // Blue color for the line
            data: [],
            fill: false,
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },

      barChartData: {
        labels: [],
        datasets: [
          {
            label: "Data 2",
            backgroundColor: "#f00", // Red color for the bars
            data: [],
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  mounted() {
    console.log("this.rows =- ", this.rows);
    // this.get();
  },
  watch: {
    // DAUdata() {
    //   this.dateList.forEach((data) => {
    //     this.lineChartData.labels.push(data[0]);
    //     this.lineChartData.datasets.data.push(data[2]);
    //     this.barChartData.labels.push(data[0]);
    //     this.barChartData.datasets.data.push(data[1]);
    //     // this.dateList.push(data[0]);
    //     // this.totalList.push(data[2]);
    //     // this.unique.push(data[1]);
    //   });
    // },
  },
  methods: {
    // async get() {
    //   await axios
    //     .get("https://static.adbrix.io/front/coding-test/event_1.json")
    //     .then((response) => {
    //       this.DAUdata = response.data.data;
    //     });
    // },
  },
};
</script>

<style></style>
