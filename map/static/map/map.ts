const DEFAULT_CENTER = [41.8931, 12.4828];

const leafletComponent = {
    template: '<div id="map" class="ld-map"></div>',
    data: function () {
        return {
            map: null
        };
    },
    mounted: function () {
        this.map = new L.Map('map');
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(this.map);
        this.map.invalidateSize();
        this.map.setView(DEFAULT_CENTER, 6);
    }
};

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'leaflet': leafletComponent
        }
    })
}