<template>
  <div class="board-container">
    <div class="board-title">
      <span>Top Referral</span>
    </div>
    <div class="chart" style="height: 600px">
      <table style="width: 100%">
        <header style="width: 100%">
          <tr>
            <th>GroupBy</th>
            <th>Metrics</th>
          </tr>
          <tr>
            <th>Country (IP) > Region(IP) > City(IP)</th>
            <th>Sum(Unique Event Count)</th>
          </tr>
        </header>
        <tbody
          v-for="(country, countryIndex) in countrySet"
          :key="countryIndex"
        >
          <tr>
            <td>
              <button type="button" @click="showRegion">
                {{ isShowRegion ? "<" : ">" }}</button
              >{{ country }}
            </td>
            <td>{{ sumCountry(dataSet, country) }}</td>
          </tr>
          <template v-for="(region, regionIndex) in regionSet">
            <tr
              class="region-wrap"
              :class="isShowRegion ? 'show' : ''"
              v-if="country === region.country"
              :key="regionIndex"
            >
              <td style="padding-left: 20px">
                <button type="button" @click="showCity">
                  {{ isShowCity ? "<" : ">" }}</button
                >{{ region.region ? region.region : "-" }}
                <template v-for="(city, cityIndex) in citySet">
                  <tr
                    class="city-wrap"
                    :class="isShowCity ? 'show' : ''"
                    v-if="region.region === city.region"
                    :key="cityIndex"
                  >
                    <td style="padding-left: 40px; width: 100%">
                      {{ city.city }}
                    </td>
                    <td>{{ city.cnt }}</td>
                  </tr>
                </template>
              </td>
              <td style="vertical-align: baseline">
                {{ sumRegion(dataSet, region.region) }}
              </td>
            </tr>
          </template>
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
      countrySet: [],
      regionSet: [],
      citySet: [],
      isShowRegion: false,
      isShowCity: false,
    };
  },
  watch: {
    TRChartData() {
      // data set
      this.TRChartData.rows.forEach((data, i) => {
        const tempData = {
          country: "",
          region: "",
          city: "",
          cnt: "",
        };
        tempData.country = data[0];
        tempData.region = data[1];
        tempData.city = data[2];
        tempData.cnt = data[3];
        this.dataSet.push(tempData);
      });
      // country parsing
      let tempCo = [];
      tempCo = _.uniqBy(this.dataSet, "country");
      console.log("tempCo = ", tempCo);
      tempCo.forEach((data) => {
        this.countrySet.push(data.country);
      });
      console.log("this.countrySet = ", this.countrySet);

      // region parsing
      let tempRe = [];
      tempRe = _.uniqBy(this.dataSet, "region");
      console.log("tempRe = ", tempRe);
      tempRe.forEach((dataRe) => {
        this.countrySet.forEach((country) => {
          if (dataRe.country === country) {
            const tempRegionList = {
              country: "",
              region: "",
            };
            tempRegionList.country = dataRe.country;
            tempRegionList.region = dataRe.region;
            this.regionSet.push(tempRegionList);
          }
        });
      });
      console.log("this.regionSet = ", this.regionSet);

      // city parsing
      let tempCi = [];
      tempCi = _.uniqBy(this.dataSet, "city");
      console.log("tempCi = ", tempCi);
      tempCi.forEach((dataCi) => {
        this.regionSet.forEach((region) => {
          if (dataCi.region === region.region) {
            const tempcityList = {
              region: "",
              city: "",
              cnt: "",
            };
            tempcityList.region = dataCi.region;
            tempcityList.city = dataCi.city;
            tempcityList.cnt = dataCi.cnt;
            this.citySet.push(tempcityList);
          }
        });
      });
      console.log("this.citySet = ", this.citySet);
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
    showRegion() {
      this.isShowRegion = !this.isShowRegion;
    },
    showCity() {
      this.isShowCity = !this.isShowCity;
    },
  },
};
</script>

<style>
.TRTable {
  width: 100%;
}
.region-wrap {
  display: none;
}
.region-wrap.show {
  display: revert;
}
.city-wrap {
  display: none;
}
.city-wrap.show {
  display: revert;
}
</style>
