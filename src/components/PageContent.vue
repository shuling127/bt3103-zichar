<template>
  <div>
    <navbar></navbar>
    <ul id="itemsList">
      <li id="li" v-for="item in items" v-bind:key="item">
        <h2 id="itemName">{{ item.name }}</h2>
        <img v-bind:src="item.imageURL" />
        <p id="price">${{ item.price }}</p>
        <qCounter v-on:counter="onCounter" v-bind:item="item"></qCounter>
      </li>
    </ul>
    <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basket>
  </div>
</template>

<script>
  import database from "../firebase.js";
  import Basket from "./Basket.vue";
  export default {
    methods: {
      onCounter: function(item, count) {
        if (this.itemsSelected.length === 0 && count > 0) {
          //If there is nothing in items selected, push the ORDER in
          this.itemsSelected.push([item.name, count, item.price]);
        } else {
          var inBasket = false;
          // Loop through everything to check what is not in the basket
          for (let i = 0; i < this.itemsSelected.length; i++) {
            const curr_item = this.itemsSelected[i];
            const item_name = curr_item[0];

            // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
            if (item_name == item.name && count > 0) {
              inBasket = true;
              this.itemsSelected.splice(i, 1, [item.name, count, item.price]);
              break;
            }
            // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
            else if (item_name == item.name && count == 0) {
              inBasket = true;
              this.itemsSelected.splice(i, 1);
              break;
            }
            // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          }
          if (!inBasket && count > 0) {
            this.itemsSelected.push([item.name, count, item.price]);
          }
        }
      },

      fetchItems: function() {
        database
          .collection("menu")
          .get()
          .then((snapshot) => {
            let item = {};
            snapshot.forEach((doc) => {
              item = doc.data();
              item.id = doc.id;
              // item.show = false;
              this.items.push(item);
            });
          });
        console.log(this.items);
      },
    },
    components: {
      basket: Basket,
    },
    created() {
      this.fetchItems();
    },
    data() {
      return {
        itemsSelected: [],
        items: [],
      };
    },
  };
</script>

<style>
  #itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
  }
  #itemsList {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
  #li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
  }
  img {
    width: 135px;
    height: 135px;
  }

  #price {
    font-size: 30px;
  }

  #itemName {
    font-size: 30px;
  }

  #shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
  }
</style>
