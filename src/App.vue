<template>
  <div id="app">
    <h1 id="banner">Shu Ling's Restaurant</h1>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>

<style>
  #banner {
    background-color: pink;
    text-align: center;
    padding: 5px;
    color: rgb(240, 248, 255);
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
