export default {
  methods: {
    totalCountry(data) {
      return data.region.length;
    },
    totalRegion(data) {
      return data.city.length;
    },
    sumCountry(data, country) {
      let sum = 0;
      data.forEach((d) => {
        if (d.country === country) {
          d.region.forEach((r) => {
            r.city.forEach((c) => {
              sum += Number(c.cnt);
            });
          });
        }
      });
      return sum;
    },
    sumRegion(data, region) {
      let sum = 0;
      if (data.region === region) {
        data.city.forEach((d) => {
          sum += Number(d.cnt);
        });
      }
      return sum;
    },
    sumCity(data, city) {
      let sum = 0;
      // data.forEach((d) => {
      if (data.city === city) {
        sum = Number(data.cnt);
      }
      // });
      return sum;
    },
  },
};
