window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'ld-leaflet': leafletComponent,
            'ld-header': headerComponent,
            'ld-button': buttonComponent,
            'text-input': textInputComponent,
            'ld-badge': badgeComponent,
            'position-label': positionLabelComponent
        },
        data: function () {
            return {
                map: null,
                markers: {
                    start: null,
                    end: null
                },
                sTime: null,
                sDay: null,
                validators: {},
                enable_error: false,
                time_error: false
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
                if (this.validators.sTime && this.validators.sDay) {
                    const start_date_time = getDate(this.sDay, this.sTime)
                    if (start_date_time && (start_date_time.getTime() > Date.now())) {
                        location.href = `/map/calc?start=${this.getLatLng(this.markers.start._latlng)}&end=${this.getLatLng(this.markers.end._latlng)}&sTime=${this.sTime}&sDay=${this.sDay}`;
                    } else {
                        this.time_error = true;
                    }
                } else {
                    this.enable_error = true;
                }
            },
            validCheck(event) {
                this.validators[event.name] = event.value;
            },
            getMarkerPos(mName) {
                return this.markers[mName]._latlng;
            },
            addMarker(event) {
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
            }
        },
        mounted: function () {
            this.map = this.$children[0].map;
        }
    })
}