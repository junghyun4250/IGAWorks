<template>
  <div class="board-container">
    <div class="board-title">
      <span>Top Referral</span>
    </div>
    <div class="pie-chart">
      <CanvasJSChart :options="options" :styles="styleOptions" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TRPieBoard",
  components: {},
  data() {
    return {
      TRPieData: {},
      adbrixTotal: 0,
      dfineryTotal: 0,
      consoleTotal: 0,
      googleTotal: 0,
      etcTotal: 0,
      reload: 0,

      // pie차트
      options: {},
      styleOptions: {
        width: "100%",
        height: "400px",
      },
    };
  },
  mounted() {
    this.get();
  },
  watch: {
    TRPieData() {
      this.TRPieData.rows.forEach((data) => {
        if (data[0].includes("adbrix.io")) {
          this.adbrixTotal += Number(data[1]);
        } else if (data[0].includes("www.dfinery.io")) {
          this.dfineryTotal += Number(data[1]);
        } else if (data[0].includes("console.dfinery.io")) {
          this.consoleTotal += Number(data[1]);
        } else if (data[0].includes("www.google.com")) {
          this.googleTotal += Number(data[1]);
        } else {
          this.etcTotal += Number(data[1]);
        }
      });
      console.log("adbrixTotal = ", this.adbrixTotal);
      console.log("dfineryTotal = ", this.dfineryTotal);
      console.log("consoleTotal = ", this.consoleTotal);
      console.log("googleTotal = ", this.googleTotal);
      console.log("etcTotal = ", this.etcTotal);
      this.options = {
        theme: "light2",
        data: [
          {
            type: "pie",
            indexLabel: "{label} (#percent%)",
            showInLegend: true,
            yValueFormatString: "#,##0",
            dataPoints: [
              {
                name: "adbrix.io",
                label: "adbrix.io",
                y: this.adbrixTotal,
                color: "#25ced9",
              },
              {
                name: "www.dfinery.io",
                label: "www.dfinery.io",
                y: this.dfineryTotal,
                color: "#f72564",
              },
              {
                name: "console.dfinery.io",
                label: "console.dfinery.io",
                y: this.consoleTotal,
                color: "#cbf1f8",
              },
              {
                name: "www.google.com",
                label: "www.google.com",
                y: this.googleTotal,
                color: "#25c441",
              },
              { name: "etc", label: "etc", y: this.etcTotal, color: "#f72125" },
            ],
          },
        ],
      };
    },
  },
  methods: {
    fillData() {
      const ctx = document.getElementById("chart").getContext("2d");
      this.myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [],
        },
      });
    },
    async get() {
      await axios
        .get("https://static.adbrix.io/front/coding-test/event_3.json")
        .then((response) => {
          console.log(response);
          this.TRPieData = response.data.data;
          console.log("TRPieData = ", this.TRPieData);
        });
    },
  },
};
</script>

<style></style>
