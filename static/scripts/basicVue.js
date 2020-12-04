// N'utiliser qu'une seul vue par fichier, éviter les Vue multiple
const vue = new Vue({
    el: '#myVue',
    data: {},
    methods: {
        chart: chart
    },
    mounted() {
        axios.get("/api/chartData")
            .then(response => {
                // Format the data for the chart
                chart(response.data);

                console.log(response.data)
            });
    },
    delimiters: ["<%", "%>"]
});

var options = {
    title: {
        display: true,
        text: 'Repos Github selon le type de licence',
        position: 'top'
    },
    responsive:true
};

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

function chart(data) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
          datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
            data: [2478,5267,734,784,433]
          }]
        },

        options: options
    });
    myChart.update();

}