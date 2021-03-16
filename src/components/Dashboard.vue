<template>
  <div id="dashboard">
    <bar-chart></bar-chart>
    <call-API></call-API>
  </div>
</template>

<script>
  import BarChart from "./BarChart.vue";
  import CallAPI from "./CallAPI.vue";

  export default {
    name: "dashboard",
    components: {
      BarChart,
      CallAPI,
    },
  };
</script>

<style scoped>
  #dashboard {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
