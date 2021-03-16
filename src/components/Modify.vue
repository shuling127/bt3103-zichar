<template>
  <div>
    <ul>
      <li v-for="order in Object.keys(datapacket)" v-bind:key="(index, order)">
        <h3>{{ order }}</h3>
        <input v-bind:id="index" placeholder="0" type="number" min="0" />
      </li>
      <br />
      <button v-on:click="updateOrder">Update Order</button>
    </ul>
  </div>
</template>

<script>
  import database from "../firebase";
  export default {
    methods: {
      fetchItems: function() {
        database
          .collection("orders")
          .doc(this.modify_id)
          .get()
          .then((doc) => {
            this.datapacket = doc.data();
          });
      },
      updateOrder: function() {
        var name = Object.keys(this.datapacket);
        var quantity = Object.entries(this.datapacket);
        var copy = {};
        for (let i = 0; i < this.datapacket.length; i++) {
          var current_name = name[i];
          var current_quantity = quantity[i];
          copy[current_name] = current_quantity;
        }
        database
          .collection("orders")
          .doc(this.modify_id)
          .update(copy)
          .then(() => {
            this.$router.push({ path: "/orders" });
          });
      },
    },
    created() {
      this.fetchItems();
    },
    data() {
      return {
        datapacket: [],
        modify_id: this.$route.params.modify_id,
      };
    },
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0; /* Remove padding */
    margin: 0; /* Remove margins */
  }
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
