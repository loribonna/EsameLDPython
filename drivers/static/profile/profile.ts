interface IDriver extends IUserBase {
    travels: ITravel,
    rate_per_km: Number,
    common_start_pos: IPos,
    max_distance: Number,
    time_avail: ITimeAvail
}

interface ITimeAvail {
    start_time: String,
    duration: Number
}

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        props: ['userData'],
        components: {
            'text-input': textInputComponent,
            'ld-button': buttonComponent,
            'ld-header': headerComponent,
            'ld-leaflet': leafletComponent,
            'ld-divider': dividerComponent,
            'ld-badge': badgeComponent
        },
        data: function () {
            return {
                db_consistent: false,
                enable_error: false,
                profile: {
                    user: null,
                    info: null,
                    rate_per_km: null,
                    common_start_pos: {
                        lat: null,
                        lng: null
                    },
                    max_distance: null,
                    start_time: null,
                    duration: null
                },
                marker: null,
                map: null,
                checkers: {}
            }
        },
        methods: {
            handleSave(event) {
                if (Object.keys(this.checkers).find(p => !this.checkers[p])) {
                    event.preventDefault();
                    this.enable_error = true;
                }
            },
            validCheck(event) {
                this.checkers[event.name] = event.value;
            },
            selectPosition(event) {
                if (event.latlng) {
                    this.profile.common_start_pos.lat = event.latlng.lat;
                    this.profile.common_start_pos.lng = event.latlng.lng;
                    this.addMarker(event.latlng);
                }
            },
            submitForm(event) {
                this.$emit('submit', event);
            },
            addMarker(latlng) {
                if (latlng.lat && latlng.lng) {
                    let marker = null;
                    if (this.marker) {
                        this.removeMarker();
                    }
                    marker = createMarker(latlng);
                    this.marker = marker;
                    marker.addTo(this.map);
                }
            },
            removeMarker() {
                this.map.removeLayer(this.marker);
                this.marker = undefined;
            }
        },
        mounted: function () {
            this.map = (<any[]>this.$children).find(c => c['map'] != null && typeof c['map'] !== "function").map;
            if (this.userData) {
                if (this.userData.common_start_pos
                    && this.userData.common_start_pos.lat
                    && this.userData.common_start_pos.lng
                    && this.userData.start_time
                    && this.userData.duration
                    && this.userData.rate_per_km) {
                    this.db_consistent = true;
                }
                this.profile = this.userData;
                if (this.profile.common_start_pos) {
                    this.addMarker(this.profile.common_start_pos);
                }
            }
        }
    })
}