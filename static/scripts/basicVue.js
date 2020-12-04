// N'utiliser qu'une seul vue par fichier, éviter les Vue multiple
const vue = new Vue({
    el: '#myVue',
    data: {},
    methods: {},
    mounted() {
        axios.get("/api/chartData")
            .then(response => {
                // Format the data for the chart
                //mychart_func(response.data);
                labels = [];
                total_repos = [];
                data = response.data;
                console.log(data);
                data.forEach((license_count) => {
                    labels.push(license_count.license);
                    total_repos.push(license_count.total);
                });

                console.log(labels);
                console.log(total_repos);
                mychart_func(labels,total_repos)
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
    responsive: true
};

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

function mychart_func(labels, total_repos) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: "Nombre de repos github selon le type de license",
                backgroundColor: ["#0053cd", "#8715a2", "#ba5505", "#11e821", "#c45850"],
                data: total_repos
            }]
        },

        options: options
    });
    myChart.update();

}