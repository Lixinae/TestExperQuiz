// N'utiliser qu'une seul vue par fichier, éviter les Vue multiple
const vue = new Vue({
    el: '#myVue',
    data: {},
    methods: {
        ask_pie_chart_data: () => {
            axios.post("/api/PieChartData", {
                limit: 5
            })
                .then(response => {
                    extract_and_display_data_pie_chart(response);
                });
        },
        ask_bar_chart_data: () => {
            axios.post("/api/BarChartData", {
                limit: 5
            })
                .then(response => {
                    extract_and_display_data_bar_chart(response);
                });
        },
    },

    mounted() {
        this.ask_pie_chart_data();
    },
    delimiters: ["<%", "%>"]
});

var options = {
    title: {
        display: true,
        text: 'Repos Github selon le type de licence',
        position: 'top'
    },
    responsive: true,
};

Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontSize = 16;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function my_pie_chart_func(labels, total_repos, colors) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: "Nombre de repos github selon le type de license",
                backgroundColor: colors,
                data: total_repos
            }]
        },

        options: options
    });
    myChart.update();
}

function my_bar_chart_func(labels, total_bytes, colors) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Taille des repo selon le langage de programmation",
                backgroundColor: colors,
                data: total_bytes
            }]
        },

        options: options
    });
    myChart.update();
}


function extract_and_display_data_pie_chart(response) {
    labels = [];
    total_repos = [];
    colors = [];
    data = response.data;
    data.forEach((license_count) => {
        labels.push(license_count.license);
        total_repos.push(license_count.total);
        colors.push(getRandomColor())
    });
    my_pie_chart_func(labels, total_repos, colors);
}

function extract_and_display_data_bar_chart(response) {
    labels = [];
    total_bytes = [];
    colors = [];
    data = response.data;
    data.forEach((license_count) => {
        labels.push(license_count.LANGUAGE);
        total_bytes.push(license_count.total_bytes);
        colors.push(getRandomColor())
    });
    my_bar_chart_func(labels, total_bytes, colors);
}