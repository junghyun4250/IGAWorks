<template>
  <div class="board-container">
    <div class="board-title">
      <span>DAU</span>
      <p>라이브러리 버전 문제로 보임... (미완)</p>
    </div>
    <div class="stick-chart" style="height: 400px">
      <CanvasJSChart
        :options="options"
        :style="styleOptions"
        @chart-ref="chartInstance"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UVCboard",
  components: {},
  data() {
    return {
      DAUdata: {},
      total: 0,
      prevTotal: 0,
      rate: 0,
      labels: [],
      chart: null,
      options: {
        axisY: {
          suffix: "K",
          lineColor: "#4F81BC",
          tickColor: "#4F81BC",
          labelFontColor: "#4F81BC",
        },
        axisY2: {
          lineColor: "#C0504E",
          tickColor: "#C0504E",
          labelFontColor: "#C0504E",
          includeZero: true,
        },
        axisX: {
          labelAngle: -90,
          labelMaxWidth: 70,
          labelTextAlign: "center",
        },
        data: [
          {
            type: "column",
            name: "Complaints",
            yValueFormatString: "#,##0",
            dataPoints: [
              { label: "Overpriced", y: 875 },
              { label: "Quantity", y: 648 },
              { label: "Wait Time", y: 153 },
              { label: "Tasteless", y: 78 },
              { label: "Ambience", y: 42 },
              { label: "Not Clean", y: 35 },
              { label: "Noisy", y: 23 },
              { label: "Unfriendly Staff", y: 17 },
              { label: "Overpriced", y: 875 },
              { label: "Quantity", y: 648 },
              { label: "Wait Time", y: 153 },
              { label: "Tasteless", y: 78 },
              { label: "Ambience", y: 42 },
              { label: "Not Clean", y: 35 },
              { label: "Noisy", y: 23 },
              { label: "Unfriendly Staff", y: 17 },
            ],
          },
        ],
      },
      dataPointsList1: [],
      dataPointsList2: [],
      styleOptions: {
        width: "100%",
        height: "360px",
        overflow: "auto",
      },
    };
  },
  mounted() {
    this.get();
  },
  watch: {
    DAUdata() {
      // data set
      this.DAUdata.rows.forEach((data) => {
        const temp1 = {
          label: "",
          y: "",
        };
        temp1.label = data[0];
        temp1.y = data[2];

        this.dataPointsList1.push(temp1);
        const temp2 = {
          label: "",
          y: "",
        };
        temp2.label = data[0];
        temp2.y = data[1];

        this.dataPointsList2.push(temp2);
      });
      console.log("dataPointsList1 = ", this.dataPointsList1);
      console.log("dataPointsList2 = ", this.dataPointsList2);

      // options setting
      this.options = {
        axisY: {
          lineColor: "#4F81BC",
          tickColor: "#4F81BC",
          labelFontColor: "#4F81BC",
          includeZero: true,
        },
        axisY2: {
          lineColor: "#C0504E",
          tickColor: "#C0504E",
          labelFontColor: "#C0504E",
          includeZero: true,
        },
        axisX: {
          labelTextAlign: "center",
        },
        data: [
          {
            type: "column",
            name: "TEC",
            yValueFormatString: "#,##0",
            dataPoints: this.dataPointsList2,
          },
        ],
      };
      console.log("options = ", this.options);
      this.createPareto();
    },
  },
  methods: {
    createPareto() {
      let chart = this.chart;
      chart.addTo("data", {
        type: "line",
        name: "UEC",
        yValueFormatString: "#,##0",
        dataPoints: this.dataPointsList2,
      });
      chart.data[1].set("axisYType", "secondary", false);
    },
    chartInstance(chart) {
      this.chart = chart;
      // this.createPareto();
    },
    async get() {
      await axios
        .get("https://static.adbrix.io/front/coding-test/event_1.json")
        .then((response) => {
          console.log(response);
          this.DAUdata = response.data.data;
          console.log("DAUdata = ", this.DAUdata);
        });
    },
  },
};
</script>

<style></style>
