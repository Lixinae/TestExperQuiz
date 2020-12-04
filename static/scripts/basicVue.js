// N'utiliser qu'une seul vue par fichier, éviter les Vue multiple
const vue = new Vue({
    el: '#myVue',
    data: {

    },
    methods: {

    },
    mounted(){
        axios.get("/api/chartData")
             .then(response => console.log(response))
    },
    delimiters: ["<%", "%>"]
});