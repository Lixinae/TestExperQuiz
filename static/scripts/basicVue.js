// N'utiliser qu'une seul vue par fichier, éviter les Vue multiple
const vue = new Vue({
    el: '#myVue',
    data: {
        limit: 5,
    },
    methods: {
        ask_pie_chart_data: function () {
            let vue_self = this;
            axios.post("/api/PieChartData", {
                limit: vue_self.limit
            })
                .then(response => {
                    extract_and_display_data_pie_chart(response);
                });
        },
        ask_bar_chart_data: function () {
            let vue_self = this;
            axios.post("/api/BarChartData", {
                limit: vue_self.limit
            })
                .then(response => {
                    extract_and_display_data_bar_chart(response);
                });
        },
    },

    mounted() {
        if (localStorage.limit) {
            this.limit = localStorage.limit;
        }
        this.ask_pie_chart_data();
    },
    watch: {
        limit(new_limit) {
            localStorage.limit = new_limit;
        }
    },
    delimiters: ["<%", "%>"]
});

var options_pie_chart = {
    title: {
        display: true,
        text: 'Repos Github selon le type de licence',
        position: 'top'
    },
    responsive: true,
};

var options_bar_chart = {
    title: {
        display: true,
        text: 'Taille des repos selon le language',
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
    const ctx = document.getElementById('myChartPie').getContext('2d');
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: "Nombre de repos github",
                backgroundColor: colors,
                data: total_repos
            }]
        },

        options: options_pie_chart
    })
}

function my_bar_chart_func(labels, total_bytes, colors) {
    const ctx = document.getElementById('myChartBar').getContext('2d');
    return new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: "Taille en Bytes",
                backgroundColor: colors,
                data: total_bytes
            }]
        },

        options: options_bar_chart
    });
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