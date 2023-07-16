<template>
  <div>
    <UECboard />
    <TECboard />
    <DAUboard />
    <TRPieBoard />
    <TRChartBoard />
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
};
</script>

<style>
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
</style>
