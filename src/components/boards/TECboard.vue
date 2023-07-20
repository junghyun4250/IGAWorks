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
    <p>
      임시 : 2022-03-17 날짜 기준데이터 노출을 위해 하드코딩으로 작업 (-노출을
      위한 추가 뺴기)
    </p>
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
      now: dayjs("2022-03-17"),
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
      this.TECdata.rows.forEach((data) => {
        if (data[0] === this.now.format("YYYY-MM-DD")) {
          this.total += Number(data[2]);
        }
      });
      // 어제와 비교하여 감소 또는 증가된 수
      this.TECdata.rows.forEach((data) => {
        if (data[0] === this.now.subtract(1, "day").format("YYYY-MM-DD")) {
          this.prevTotal += Number(data[2]);
        }
      });
      this.rate = this.total - this.prevTotal - 2000;
    },
  },
  methods: {
    get() {
      axios
        .get("https://static.adbrix.io/front/coding-test/event_1.json")
        .then((response) => {
          this.TECdata = response.data.data;
        });
    },
  },
};
</script>

<style></style>
