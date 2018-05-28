
window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'leaflet': leafletComponent
        }
    })
}