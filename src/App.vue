<template>
  <div>
    <SmartWidgetGrid :layout="layout">
      <SmartWidget :v-slot="0" simple>
        <div class="layout-center">
          <UECboard />
        </div>
      </SmartWidget>
      <SmartWidget :v-slot="1" simple>
        <div class="layout-center">
          <TECboard />
        </div>
      </SmartWidget>
      <SmartWidget :v-slot="2" simple>
        <div class="layout-center">
          <DAUboard />
        </div>
      </SmartWidget>
      <SmartWidget :v-slot="3" simple>
        <div class="layout-center">
          <TRPieBoard />
        </div>
      </SmartWidget>
      <SmartWidget :v-slot="4" simple>
        <div class="layout-center">
          <TRChartBoard />
        </div>
      </SmartWidget>
    </SmartWidgetGrid>
  </div>
</template>

<script>
import UECboard from "./components/boards/UECboard.vue";
import TECboard from "./components/boards/TECboard.vue";
import DAUboard from "./components/boards/DAUboard.vue";
import TRPieBoard from "./components/boards/TRPieBoard.vue";
import TRChartBoard from "./components/boards/TRChartBoard.vue";
import { SmartWidget } from "vue-smart-widget";
// import VueSmartWidget from "vue-smart-widget";
import { SmartWidgetGrid } from "vue-smart-widget";

export default {
  name: "App",
  components: {
    UECboard,
    TECboard,
    DAUboard,
    TRPieBoard,
    TRChartBoard,
    SmartWidget,
    // VueSmartWidget,
    SmartWidgetGrid,
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 6, h: 4, i: 0 },
        { x: 6, y: 0, w: 6, h: 4, i: 1 },
        { x: 0, y: 1, w: 12, h: 4, i: 2 },
        { x: 0, y: 2, w: 6, h: 4, i: 3 },
        { x: 6, y: 2, w: 6, h: 4, i: 4 },
      ],
    };
  },
};
</script>

<style>
/* body {
  background-color: gray;
} */
.board-container {
  padding: 15px;
}
.board-title span {
  font-size: 18px;
  color: skyblue;
  font-weight: bold;
}
.sum {
  width: 30px;
  margin-right: 10px;
  border: 1px solid gray;
  background-color: gray;
  border-radius: 6px;
}
.board-rate .rate {
  color: gray;
}
.board-rate .rate.up {
  color: red;
}
.board-rate .rate.down {
  color: blue;
}
.smartwidget .is-always-shadow {
  background-color: white;
}
.smartwidget .is-always-shadow {
  margin: 15px;
}
</style>
