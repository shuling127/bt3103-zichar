<template>
  <div>
    <button v-on:click="increase">+</button>
    <span> {{ counter }} </span>
    <button v-on:click="decrease">-</button>
  </div>
</template>

<script>
  export default {
    props: ["item"],
    data() {
      return {
        counter: 0,
      };
    },
    methods: {
      increase: function() {
        if (this.counter == 10) {
          alert("You cannot buy more than 10 items.");
        } else {
          this.counter++;
        }
        this.$emit("counter", this.item, this.counter);
      },
      decrease: function() {
        if (this.counter != 0) {
          this.counter--;
        } else {
          this.counter = 0;
        }
        this.$emit("counter", this.item, this.counter);
      },
    },
  };
</script>

<style scoped>
  button {
    box-shadow: inset 0px 1px 0px 0px #dcecfb;
    background: linear-gradient(to bottom, #bddbfa 5%, #80b5ea 100%);
    background-color: #bddbfa;
    border-radius: 6px;
    border: 1px solid #84bbf3;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 15px;
    font-weight: bold;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #528ecc;
  }
</style>
