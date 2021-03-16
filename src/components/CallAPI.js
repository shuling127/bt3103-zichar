import { Line } from "vue-chartjs";
import axios from "axios";

export default {
  extends: Line,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "Central",
            fill: false,
            borderColor: "#3e95cd",
          },
          {
            data: [],
            label: "East",
            fill: false,
            borderColor: "#8e5ea2",
          },
          {
            data: [],
            label: "National",
            fill: false,
            borderColor: "#3cba9f",
          },
          {
            data: [],
            label: "North",
            fill: false,
            borderColor: "#e8c3b9",
          },
          {
            data: [],
            label: "South",
            fill: false,
            borderColor: "#c45850",
          },
          {
            data: [],
            label: "West",
            fill: false,
            borderColor: "#a1eeff",
          },
        ],
      },
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: "PSI Twenty Four Hourly (By Region)",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    fetchItems: function() {
      axios
        .get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then((response) => {
          console.log(response.data.items);
          response.data.items.forEach((everyhour) => {
            this.datacollection.labels.push(everyhour.timestamp);
            // this.datacollection.datasets[0].data.push(everyhour[1]);
            for (let i = 0; i < this.datacollection.datasets.length; i++) {
              this.datacollection.datasets[i].data.push(
                Object.entries(everyhour.readings.psi_twenty_four_hourly)[i][1]
              );
            }
          });
          this.renderChart(this.datacollection, this.options);
        });
    },
  },
  created() {
    this.fetchItems();
  },
};
