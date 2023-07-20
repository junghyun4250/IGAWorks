export default {
  methods: {
    sumCountry(data, country) {
      let sum = 0;
      data.forEach((d) => {
        if (d.country === country) {
          sum += Number(d.cnt);
        }
      });
      return sum;
    },
    sumRegion(data, region) {
      let sum = 0;
      data.forEach((d) => {
        if (d.region === region) {
          sum += Number(d.cnt);
        }
      });
      return sum;
    },
    sumCity(data, city) {
      let sum = 0;
      data.forEach((d) => {
        if (d.city === city) {
          sum += Number(d.cnt);
        }
      });
      return sum;
    },
  },
};
