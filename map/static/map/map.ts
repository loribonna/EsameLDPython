
const positionLabelComponent = {
    template: `
        <div style="padding: 5px; display:flex">
            <button v-on:click="removeData" class="btn btn-primary">X</button><div class="badge badge-light">
            <slot></slot>{{getLatLngFormatted()}}
            </div>
        </div>`,
    props: [
        'markerPos',
        'markerName'
    ],
    methods: {
        getLatLngFormatted() {
            return this.markerPos.lat.toFixed(2) + ", " + this.markerPos.lng.toFixed(2);
        },
        removeData() {
            this.$emit('delete', this.markerName);
        }
    }
}

const DEFAULT_CENTER = [41.8931, 12.4828];

const leafletComponent = {
    template: `<div id="map" class="ld-map">
    <div style="position:absolute; z-index:500; right:0px">
        <position-label :markerPos="markers.start._latlng" :markerName="'start'" v-if="markers.start" v-on:delete="removeMarker">Inizio:<br/></position-label>
        <position-label :markerPos="markers.end._latlng" :markerName="'end'" v-if="markers.end" v-on:delete="removeMarker">Fine:<br/></position-label>
        <ld-button v-on:submit="sendData" style="margin: 5px" v-if="markers.start && markers.end" >Mostra tariffe</ld-button>
    </div>
    </div>`,
    components: {
        'position-label': positionLabelComponent,
        'ld-button': buttonComponent
    },
    data: function () {
        return {
            map: null,
            markers: {
                start: null,
                end: null
            }
        };
    },
    methods: {
        removeMarker(event) {
            this.map.removeLayer(this.markers[event]);
            this.markers[event]=undefined;
        },
        getLatLng(pos: L.LatLng): Number[] {
            return [pos.lat, pos.lng]
        },
        sendData(event) {
            location.href= `/map/calc?start=${this.getLatLng(this.markers.start._latlng)}&end=${this.getLatLng(this.markers.end._latlng)}`;
        }
    },
    mounted: function () {
        this.map = new L.Map('map');
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(this.map);
        this.map.invalidateSize();
        this.map.setView(DEFAULT_CENTER, 6);
        this.map.on('dblclick', event => {
            const marker = L.marker(event.latlng);

            if (!this.markers.start) {
                this.markers.start = marker;
            } else {
                if (this.markers.end) {
                    this.map.removeLayer(this.markers.end);
                }
                this.markers.end = marker;
            }
            marker.addTo(this.map);
        });
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