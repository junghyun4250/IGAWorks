export default {
  methods: {
    sumCountry(data, country) {
      console.log("sumCountry data = ", data);
      console.log("sumCountry country = ", country);
      let sum = 0;
      data.forEach((d) => {
        if (d.country === country) {
          sum += Number(d.sum);
        }
      });
      return sum;
    },
    sumRegion(data, region) {
      console.log("sumRegion data = ", data);
      console.log("sumRegion region = ", region);
      let sum = 0;
      data.forEach((d) => {
        if (d.region === region) {
          sum += Number(d.sum);
        }
      });
      return sum;
    },
    sumCity(data, city) {
      console.log("sumCity data = ", data);
      console.log("sumCity city = ", city);
      let sum = 0;
      data.forEach((d) => {
        if (d.city === city) {
          sum += Number(d.sum);
        }
      });
      return sum;
    },
  },
};
