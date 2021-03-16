import { Bar } from "vue-chartjs";
import database from "../firebase.js";

export default {
  extends: Bar,
  data: function() {
    return {
      datacollection: {
        labels: [
          "Prawn omelette",
          "Dry Beef Hor Fun",
          "Sambal KangKung",
          "Pork Fried Rice",
          "Mapo Tofu",
          "Cereal Prawn",
        ],
        datasets: [
          {
            label: "Quanitity",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#f28d85",
            ],
            data: [0, 0, 0, 0, 0, 0],
          },
        ],
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: "Total Number of each dish",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      var labels = this.datacollection.labels;
      database
        .collection("orders")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var current_doc_array = Object.entries(doc.data());
            console.log(current_doc_array);
            current_doc_array.forEach((pair) => {
              for (let i = 0; i < labels.length; i++) {
                if (pair[0].toString() == labels[i].toString()) {
                  this.datacollection.datasets[0].data[i] += pair[1];
                }
              }
            });
          });
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
