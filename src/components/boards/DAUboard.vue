<template>
  <div class="board-container">
    <div class="board-title">
      <span>DAU</span>
    </div>
    <div class="stick-chart" style="height: 400px">
      <CanvasJSChart
        :options="options"
        :style="styleOptions"
        @chart-ref="chartInstance"
        v-bind:key="reload"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UVCboard",
  // components: { LineChart: Line, BarChart: Bar },
  data() {
    return {
      reload: 0,
      DAUdata: {},
      dateList: [],
      totalList: [],
      uniqueList: [],
      chart: null,
      options: {
        title: {
          // text: "Restaurant Complaints",
        },
        axisY: {
          // title: "Count of Complaints",
          // suffix: "k",
          lineColor: "#4F81BC",
          tickColor: "#4F81BC",
          labelFontColor: "#4F81BC",
          includeZero: true,
        },
        axisY2: {
          // title: "Percent",
          // suffix: "%",
          lineColor: "#C0504E",
          tickColor: "#C0504E",
          labelFontColor: "#C0504E",
          includeZero: true,
        },
        axisX: {
          // title: "Type of Complaints",
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
              // { label: "Overpriced", y: 875 },
              // { label: "Quantity", y: 648 },
              // { label: "Wait Time", y: 153 },
              // { label: "Tasteless", y: 78 },
              // { label: "Ambience", y: 42 },
              // { label: "Not Clean", y: 35 },
              // { label: "Noisy", y: 23 },
              // { label: "Unfriendly Staff", y: 17 },
            ],
          },
        ],
        // line 오른쪽 uniq 1번
        // bar 왼쪽 total 2번
      },
      styleOptions: {
        width: "100%",
        height: "360px",
      },
      totalDataPoints: [],
    };
  },
  mounted() {
    this.get();
  },
  watch: {
    DAUdata() {
      this.DAUdata.rows.forEach((data) => {
        // unique dataSet
        const tempUnique = {
          label: "",
          y: 0,
        };
        tempUnique.label = data[0];
        tempUnique.y += Number(data[1]);
        this.totalDataPoints.push(tempUnique);

        // total dataSet
        const tempTotal = {
          label: "",
          y: 0,
        };
        tempTotal.label = data[0];
        tempTotal.y = Number(data[2]);
        this.options.data[0].dataPoints.push(tempTotal);
      });
      this.reload += 1;
    },
  },
  methods: {
    async get() {
      await axios
        .get("https://static.adbrix.io/front/coding-test/event_1.json")
        .then((response) => {
          this.DAUdata = response.data.data;
        });
    },
    createPareto() {
      // let dps = [];
      let chart = this.chart;
      let yTotal = 0;
      let y2Total = 0;
      // let yValue,
      //   yTotal = 0,
      //   yPercent = 0;
      // for (let i = 0; i < chart.data[0].dataPoints.length; i++)
      //   yTotal += chart.data[0].dataPoints[i].y;
      // for (let i = 0; i < chart.data[0].dataPoints.length; i++) {
      //   yValue = chart.data[0].dataPoints[i].y;
      //   yPercent += (yValue / yTotal) * 100;
      //   dps.push({ label: chart.data[0].dataPoints[i].label, y: yPercent });
      // }
      this.totalDataPoints.forEach((data) => {
        if (yTotal < data.y) {
          yTotal = data.y;
        }
      });
      this.options.data[0].dataPoints.forEach((data) => {
        if (y2Total < data.y) {
          y2Total = data.y;
        }
      });
      chart.addTo("data", {
        type: "line",
        yValueFormatString: "0,##0",
        dataPoints: this.totalDataPoints,
      });
      chart.data[1].set("axisYType", "secondary", false);
      chart.axisY[0].set("maximum", y2Total);
      chart.axisY2[0].set("maximum", yTotal);
    },
    chartInstance(chart) {
      this.chart = chart;
      this.createPareto();
    },
  },
};
</script>

<style></style>
