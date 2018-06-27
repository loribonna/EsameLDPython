
const positionLabelComponent = {
    template: `
        <div style="padding: 5px; display:flex">
            <button v-on:click="removeData" :class=getClass()>X</button>
            <ld-badge><slot></slot>{{getLatLngFormatted()}}</ld-badge>
        </div>`,
    props: [
        'markerPos',
        'markerName',
        'btnType'
    ],
    components: {
        'ld-badge': badgeComponent
    },
    methods: {
        getLatLngFormatted() {
            return this.markerPos.lat.toFixed(2) + ", " + this.markerPos.lng.toFixed(2);
        },
        removeData() {
            this.$emit('delete', this.markerName);
        },
        getClass() {
            return `btn btn-${this.btnType || 'primary'}`
        }
    }
}

const DEFAULT_CENTER = [41.8931, 12.4828];

const createMarker = (pos: L.LatLng, className: String) => {
    const icon = L.divIcon({
        className: '',
        iconSize: null,
        html: "<div class='fa fa-map-marker " + className + "'></div>"
    });
    return L.marker(pos, { icon: icon });
}

const leafletComponent = {
    template: `<div id="map" class="ld-map">
    <div style="position:absolute; z-index:500; right:0px">
        <div style="padding: 5px">
            <ld-badge>Ora partenza: </ld-badge>
            <text-input style="width:120px" :enable_error="enable_error" name="sTime" validator="timeValidator" v-on:valid="validCheck" v-model="sTime"></text-input>
        </div>
        <position-label :markerPos="markers.start._latlng" :markerName="'start'" v-if="markers.start" v-on:delete="removeMarker">Inizio:<br/></position-label>
        <position-label btnType="danger" :markerPos="markers.end._latlng" :markerName="'end'" v-if="markers.end" v-on:delete="removeMarker">Fine:<br/></position-label>
        <ld-button v-on:click="sendData" style="margin: 5px" v-if="markers.start && markers.end" >Mostra tariffe</ld-button>
    </div>
    </div>`,
    components: {
        'position-label': positionLabelComponent,
        'ld-button': buttonComponent,
        'text-input': textInputComponent,
        'ld-badge': badgeComponent
    },
    data: function () {
        return {
            map: null,
            markers: {
                start: null,
                end: null
            },
            sTime: '9:30',
            validators: {},
            enable_error: false
        };
    },
    methods: {
        removeMarker(event) {
            this.map.removeLayer(this.markers[event]);
            this.markers[event] = undefined;
        },
        getLatLng(pos: L.LatLng): Number[] {
            return [pos.lat, pos.lng]
        },
        sendData(event) {
            if (this.validators.sTime) {
                location.href = `/map/calc?start=${this.getLatLng(this.markers.start._latlng)}&end=${this.getLatLng(this.markers.end._latlng)}&sTime=${this.sTime}`;
            } else {
                this.enable_error = true;
            }
        },
        validCheck(event) {
            this.validators[event.name] = event.value;
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
            let marker = null;
            if (!this.markers.start) {
                marker = createMarker(event.latlng, "ld-start-marker");
                this.markers.start = marker;
            } else {
                marker = createMarker(event.latlng, "ld-end-marker");
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