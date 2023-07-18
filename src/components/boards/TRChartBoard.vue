<template>
  <div class="board-container">
    <div class="board-title">
      <span>Top Referral</span>
      <p>시간부족으로 이벤트 카운트 및 바인딩 작업만 완료 (미완 : 드릴다운)</p>
    </div>
    <div class="chart" style="height: 600px">
      <table>
        <theader>
          <tr>
            <td>GroupBy</td>
            <td>Metrics</td>
          </tr>
          <tr>
            <td>Country (IP) > Region(IP) > City(IP)</td>
            <td>Sum(Unique Event Count)</td>
          </tr>
        </theader>
        <tbody
          v-for="(dataSetData, dataSetDataIndex) in dataSet"
          :key="dataSetDataIndex"
        >
          <tr>
            <td @click="openCountry">{{ dataSetData.country }}</td>
            <td>{{ sumCountry(dataSet, dataSetData.country) }}</td>
          </tr>
          <tr>
            <td @click="openRegion">
              <span class="region-col">{{ dataSetData.region }}</span>
            </td>
            <td>{{ sumRegion(dataSet, dataSetData.region) }}</td>
          </tr>
          <tr>
            <td>
              <span class="city-col">{{ dataSetData.city }}</span>
            </td>
            <td>{{ sumCity(dataSet, dataSetData.city) }}</td>
          </tr>
          <!-- <tr
            v-for="(regionData, regionDataIndex) in regionSet"
            :key="regionDataIndex"
          >
            <td @click="openRegion">{{ regionData.region }}</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import test from "../../mixin.js";
import _ from "lodash";

export default {
  name: "TRChartBoard",
  components: {},
  mixins: [test],
  data() {
    return {
      TRChartData: {},
      dataSet: [],
      dataSetMap: new Map(),
      // countrySet: [],
      // regionSet: [],
      // citySet: [],
      isOpenCountry: false,
      isOpenRegion: false,
    };
  },
  // created() {
  //   this.groupDisplayType = "groupRows";
  // },
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
      // data paring Map
      const countrySet = [];
      const countryMap = new Map();
      const regionMap = new Map();
      const cityMap = new Map();
      const countryList = [];
      const regionList = [];
      const cityList = [];
      // country parsing
      let tempCo = [];
      let tempRe = [];
      let tempCi = [];
      tempCo = _.uniqBy(this.dataSet, "country");
      tempRe = _.uniqBy(this.dataSet, "region");
      tempCi = _.uniqBy(this.dataSet, "city");
      console.log("tempCo = ", tempCo);
      console.log("tempRe = ", tempRe);
      console.log("tempCi = ", tempCi);
      tempCo.forEach((data) => {
        countryList.push(data.country);
      });
      console.log("countryList = ", countryList);
      // city Map
      tempCi.forEach((dataCi) => {
        cityMap.set(dataCi.city, dataCi.sum);
      });
      console.log("cityMap = ", cityMap);
      cityMap.forEach((val, key) => {
        console.log(val + "," + key);
        regionList.push(key);
      });
      // region Map
      tempRe.forEach((dataRe) => {
        cityMap.forEach((val, key) => {
          if (dataRe.region === key) {
            regionMap.set(dataRe.region, key);
          }
        });
      });
      // country Map
      countryList.forEach((list) => {
        countryMap.set(list, "");
      });
      console.log("cityMap = ", cityMap);

      // under country sum
      // this.dataSet.forEach((dataSet) => {
      //   tempCo.forEach((data) => {
      //     if (dataSet.country === data.country) {
      //       this.countrySet.forEach((dataT) => {
      //         if (dataT.country === dataSet.country) {
      //           dataT.countrySum += Number(dataSet.sum);
      //         }
      //       });
      //     }
      //   });
      // });
      // console.log("this.countrySet = ", this.countrySet);

      // // region parsing
      // // let tempRe = [];
      // this.dataSet.forEach((dataSet) => {
      //   const regionTemp = {
      //     country: "",
      //     region: "",
      //   };
      //   this.countrySet.forEach((dataCo) => {
      //     if (dataSet.country === dataCo.country) {
      //       regionTemp.country = dataSet.country;
      //       regionTemp.region = dataSet.region;
      //     }
      //   });
      //   this.regionSet.push(regionTemp);
      // });
      // console.log("regionSet = ", this.regionSet);
      // this.dataSet.forEach((dataSet) => {
      //   tempCo.forEach((data) => {
      //     if (dataSet.country === data.country) {
      //       this.countrySet.forEach((dataT) => {
      //         if (dataT.country === dataSet.country) {
      //           dataT.countrySum += 1;
      //         }
      //       });
      //     }
      //   });
      // });
      // if (data[0])
      // countryTemp.sum =
      console.log("dataSet = ", this.dataSet);
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
    openCountry() {
      this.isOpenCountry = true;
    },
  },
};
</script>

<style></style>
