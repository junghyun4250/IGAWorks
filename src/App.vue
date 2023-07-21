<template>
  <div>
    <div class="grid-widget">
      <smart-widget-grid :layout="layout">
        <template #0>
          <smart-widget simple>
            <div class="layout-center">
              <UECboard />
            </div>
          </smart-widget>
        </template>
        <template #1>
          <smart-widget simple>
            <div class="layout-center">
              <TECboard />
            </div>
          </smart-widget>
        </template>
        <template #2>
          <smart-widget simple>
            <div class="layout-center">
              <DAUboard />
            </div>
          </smart-widget>
        </template>
        <template #3>
          <smart-widget simple>
            <div class="layout-center">
              <TRPieBoard />
            </div>
          </smart-widget>
        </template>
        <template #4>
          <smart-widget simple>
            <div class="layout-center">
              <TRChartBoard />
            </div>
          </smart-widget>
        </template>
      </smart-widget-grid>
    </div>
  </div>
</template>

<script>
import UECboard from "./components/boards/UECboard.vue";
import TECboard from "./components/boards/TECboard.vue";
import DAUboard from "./components/boards/DAUboard.vue";
import TRPieBoard from "./components/boards/TRPieBoard.vue";
import TRChartBoard from "./components/boards/TRChartBoard.vue";

export default {
  name: "App",
  components: {
    UECboard,
    TECboard,
    DAUboard,
    TRPieBoard,
    TRChartBoard,
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 6, h: 3, i: 0 },
        { x: 6, y: 0, w: 6, h: 3, i: 1 },
        { x: 0, y: 1, w: 12, h: 8, i: 2 },
        { x: 0, y: 2, w: 6, h: 8, i: 3 },
        { x: 6, y: 2, w: 6, h: 8, i: 4 },
      ],
    };
  },
};
</script>

<style>
body {
  background-color: grey;
}
.board-container {
  background-color: #ffffff;
  padding: 15px;
  max-height: 450px;
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
.region-show {
  display: block;
}
.region-show.on {
  display: none;
}
</style>
