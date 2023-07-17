<template>
  <div class="board-container">
    <div class="board-title">
      <span>접속횟수</span>
    </div>
    <div class="board-sub-title">
      <span class="sum">SUM</span>
      <span>Total Event Count</span>
    </div>
    <div class="board-total">
      <span>{{ total.toLocaleString() }}</span>
    </div>
    <div class="board-rate">
      <span class="rate" :class="rate > 0 ? 'up' : rate < 0 ? 'down' : ''">{{
        rate.toLocaleString()
      }}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "UVCboard",
  components: {},
  data() {
    return {
      TECdata: {},
      now: dayjs(),
      total: 0,
      prevTotal: 0,
      rate: 0,
    };
  },
  mounted() {
    this.get();
  },
  watch: {
    TECdata() {
      // 오늘날짜 총 접속 유저 찾기
      console.log("오늘날짜 = ", this.now.format("YYYY-MM-DD"));
      for (let i = 0; i > this.TECdata.rows.length; i++) {
        if (this.TECdata.rows[i][0] === this.now.format("YYYY-MM-DD")) {
          this.total += this.TECdata.rows[i][2];
        }
      }
      console.log(this.total);
      // 어제와 비교하여 감소 또는 증가된 수
      for (let i = 0; i > this.TECdata.rows.length; i++) {
        if (
          this.TECdata.rows[i][0] ===
          this.now.subtract(1, "day").format("YYYY-MM-DD")
        ) {
          this.prevTotal += this.TECdata.rows[i][2];
        }
      }
      this.rate = this.total - this.prevTotal;
    },
  },
  methods: {
    get() {
      axios
        .get("https://static.adbrix.io/front/coding-test/event_1.json")
        .then((response) => {
          console.log(response);
          this.TECdata = response.data.data;
          console.log("TECdata = ", this.TECdata);
        });
    },
  },
};
</script>

<style></style>
