<template>
  <div>
    <navbar></navbar>
    <ul>
      <li v-for="order in orders" v-bind:key="order">
        <p v-for="(value, key, index) in order[1]" v-bind:key="index">
          {{ key }}: {{ value }}
        </p>
        <button v-bind:id="order[0]" v-on:click="deleteItem($event)">
          Delete
        </button>
        <button v-bind:id="order[0]" v-on:click="route($event)">
          Modify
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import database from "../firebase.js";
  export default {
    data() {
      return {
        orders: [],
      };
    },
    created() {
      this.fetchItems();
    },
    methods: {
      fetchItems: function() {
        database
          .collection("orders")
          .get()
          .then((snapshot) => {
            let order = {};
            snapshot.forEach((doc) => {
              order = doc.data();
              this.orders.push([doc.id, order]);
            });
          });
        console.log(database);
      },
      deleteItem: function(event) {
        let doc_id = event.target.getAttribute("id");
        database
          .collection("orders")
          .doc(doc_id)
          .delete()
          .then(() => {
            location.reload();
          });
      },
      route: function(event) {
        let doc_id = event.target.getAttribute("id");
        alert(doc_id);
        this.$router.push({
          name: "modify",
          params: { modify_id: doc_id },
        });
      },
    },
  };
</script>

<style scoped>
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
  li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
  }

  button {
    width: 65px;
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
  }
</style>
