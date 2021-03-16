<template>
  <div>
    <p>Menu:</p>
    <ul>
      <li v-for="itemSelected in itemsSelected" v-bind:key="itemSelected">
        <p>{{ itemSelected[0] }}: {{ itemSelected[1] }}</p>
      </li>
    </ul>
    <button v-on:click.prevent="sendOrder">Add order</button>
    <!-- <button v-on:click="showPrice = true">Calculate Total</button>
    <p v-show="showPrice">
      Subtotal: ${{ findTotal(itemsSelected) }}<br />Grandtotal: ${{
        grandtotal
      }}
    </p> -->
  </div>
</template>

<script>
  import database from "../firebase.js";
  export default {
    props: ["itemsSelected"],
    data() {
      return {
        showPrice: false,
        subtotal: 0,
        grandtotal: 0,
        orderlist: [
          {
            name: "Prawn omelette",
            quantity: 0,
          },
          {
            name: "Dry Beef Hor Fun",
            quantity: 0,
          },
          {
            name: "Sambal KangKung",
            quantity: 0,
          },
          {
            name: "Pork Fried Rice",
            quantity: 0,
          },
          {
            name: "Mapo Tofu",
            quantity: 0,
          },
          {
            name: "Cereal Prawn",
            quantity: 0,
          },
        ],
      };
    },

    watch: {
      subtotal: function(subtotal) {
        this.grandtotal = subtotal * 1.07;
        this.grandtotal = (Math.round(this.grandtotal * 100) / 100).toFixed(2);
      },
    },
    methods: {
      sendOrder: function() {
        for (let i = 0; i < this.itemsSelected.length; i++) {
          var current_item_selected = this.itemsSelected[i];

          for (let w = 0; w < this.orderlist.length; w++) {
            var current_menu_item = this.orderlist[w];
            if (current_item_selected[0] == current_menu_item.name) {
              current_menu_item.quantity = current_item_selected[1];
              break;
            }
            continue;
          }
        }

        database
          .collection("orders")
          .add({
            "Prawn omelette": this.orderlist[0].quantity,
            "Dry Beef Hor Fun": this.orderlist[1].quantity,
            "Sambal KangKung": this.orderlist[2].quantity,
            "Pork Fried Rice": this.orderlist[3].quantity,
            "Mapo Tofu": this.orderlist[4].quantity,
            "Cereal Prawn": this.orderlist[5].quantity,
          })
          .then(() => {
            location.reload();
          });

        alert(this.itemsSelected);
      },
      findTotal: function(items) {
        var total = 0;
        for (let i = 0; i < items.length; i++) {
          total += items[i][2] * items[i][1];
        }
        this.subtotal = total;
        return total;
      },
    },
  };
</script>

<style scoped>
  p {
    font-size: 20px;
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
