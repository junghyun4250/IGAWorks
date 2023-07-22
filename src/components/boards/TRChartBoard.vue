<template>
  <div class="board-container" style="overflow-y: scroll">
    <div class="board-title">
      <span>Top Referral</span>
    </div>
    <div class="chart" style="height: 600px">
      <div class="table-header">
        <span class="name">GroupBy</span>
        <span class="count">Metrics</span>
      </div>
      <div class="table-header">
        <span class="name"
          ><strong
            ><span @click="orderBy('country')">Country (IP)</span> >
            <span @click="orderBy('region')">Region(IP)</span> >
            <span @click="orderBy('city')">City(IP)</span></strong
          ></span
        >
        <span class="count"><strong>Sum(Unique Event Count)</strong></span>
      </div>
      <div
        class="country-wrap"
        v-for="(data, dataIndex) in dataJSON"
        :key="dataIndex"
      >
        <div class="country">
          <button
            class="open-btn"
            type="button"
            @click="showRegion(data.country)"
          >
            {{ data.isOpen ? "<" : ">" }}
          </button>
          <span class="name">
            {{ data.country }}({{ totalCountry(data) }})</span
          >
          <span class="count">{{ sumCountry(dataJSON, data.country) }}</span>
          <div class="region-ctr" :class="data.isOpen ? 'show' : ''">
            <div
              class="region-wrap"
              v-for="(region, regionIndex) in data.region"
              :key="regionIndex"
            >
              <div class="region">
                <button
                  class="open-btn"
                  type="button"
                  @click="showCity(region.region)"
                >
                  {{ region.isOpen ? "<" : ">" }}
                </button>
                <span class="name"
                  >{{ region.region }}({{ totalRegion(region) }})</span
                >
                <span class="count">{{
                  sumRegion(region, region.region)
                }}</span>
                <div class="city-ctr" :class="region.isOpen ? 'show' : ''">
                  <div
                    class="city-wrap"
                    v-for="(city, cityIndex) in region.city"
                    :key="cityIndex"
                  >
                    <div class="city">
                      <span class="name">{{ city.city }}</span>
                      <span class="count">{{ sumCity(city, city.city) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      dataJSON: [],
      tempDataJSON: [],
      countrySet: [],
      regionSet: [],
      citySet: [],
      // 홀짝을 위한 변수
      cntCountry: 0,
      cntRegion: 0,
      cntCity: 0,
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
      tempCo.forEach((data) => {
        const tempCountryList = {
          isOpen: false,
          country: "",
        };
        tempCountryList.country = data.country;
        this.countrySet.push(tempCountryList);
      });

      // region parsing
      let tempRe = [];
      tempRe = _.uniqBy(this.dataSet, "region");
      tempRe.forEach((dataRe) => {
        this.countrySet.forEach((country) => {
          if (dataRe.country === country.country) {
            const tempRegionList = {
              isOpen: false,
              country: "",
              region: "",
            };
            tempRegionList.country = dataRe.country;
            tempRegionList.region = dataRe.region;
            this.regionSet.push(tempRegionList);
          }
        });
      });

      // city parsing
      let tempCi = [];
      tempCi = _.uniqBy(this.dataSet, "city");
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
      // test
      tempCo.forEach((country) => {
        const tempData = {
          isOpen: false,
          country: "",
          region: [],
        };
        tempData.country = country.country;
        this.dataJSON.push(tempData);
      });
      this.dataSet.forEach((data) => {
        this.dataJSON.forEach((countrySet) => {
          const tempData = {
            isOpen: false,
            region: "",
            city: [],
          };
          if (countrySet.country === data.country) {
            tempData.region = data.region;
            countrySet.region.push(tempData);
          }
        });
      });
      // region 중복제거
      this.dataJSON.forEach((data) => {
        data.region = _.uniqBy(data.region, "region");
      });
      this.dataSet.forEach((data) => {
        this.dataJSON.forEach((countrySet) => {
          countrySet.region.forEach((regionSet) => {
            if (regionSet.region === data.region) {
              const tempData = {
                city: "",
                cnt: "",
              };
              tempData.city = data.city;
              tempData.cnt = data.cnt;
              regionSet.city.push(tempData);
            }
          });
        });
      });
      // city
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
          this.TRChartData = response.data.data;
        });
    },
    showRegion(country) {
      this.dataJSON.forEach((countryData) => {
        if (countryData.country === country) {
          if (countryData.isOpen) {
            countryData.isOpen = !countryData.isOpen;
          } else {
            countryData.isOpen = !countryData.isOpen;
          }
        }
      });
    },
    showCity(region) {
      this.dataJSON.forEach((countryData) => {
        countryData.region.forEach((regionData) => {
          if (regionData.region === region) {
            if (regionData.isOpen) {
              regionData.isOpen = !regionData.isOpen;
            } else {
              regionData.isOpen = !regionData.isOpen;
            }
          }
        });
      });
    },
    orderBy(orderType) {
      if (orderType === "country") {
        if (this.cntCountry % 2 == 0) {
          this.cntCountry += 1;
          this.dataJSON = _.sortBy(this.dataJSON, "country");
        } else {
          this.cntCountry += 1;
          this.dataJSON = _.sortBy(this.dataJSON, "country").reverse();
        }
      }
      if (orderType === "region") {
        if (this.cntRegion % 2 == 0) {
          this.cntRegion += 1;
          this.dataJSON.forEach((data) => {
            data.region = _.sortBy(data.region, "region");
          });
        } else {
          this.cntRegion += 1;
          this.dataJSON.forEach((data) => {
            data.region = _.sortBy(data.region, "region").reverse();
          });
        }
      }
      if (orderType === "city") {
        if (this.cntCity % 2 == 0) {
          this.cntCity += 1;
          this.dataJSON.forEach((data) => {
            data.region.forEach((r) => {
              r.city = _.sortBy(r.city, "city");
            });
          });
        } else {
          this.cntCity += 1;
          this.dataJSON.forEach((data) => {
            data.region.forEach((r) => {
              r.city = _.sortBy(r.city, "city").reverse();
            });
          });
        }
      }
    },
    regionOrderBy() {},
    cityOrderByI() {},
  },
};
</script>

<style>
.chart {
  width: 100%;
}
.chart .country-wrap {
  width: 100%;
}
.chart .country-wrap .country {
  width: 100%;
}
.region-wrap {
  width: 100%;
}
.region-wrap .region {
  margin-left: 20px;
}
.city-wrap .city {
  margin-left: 40px;
}
.open-btn {
  display: inline-block;
}
.name {
  width: 50%;
}
.count {
  width: 50%;
  float: right;
}

.region-ctr {
  display: none;
}
.region-ctr.show {
  display: block;
}
.city-ctr {
  display: none;
}
.city-ctr.show {
  display: block;
}
</style>
