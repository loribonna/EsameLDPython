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
            };
        },
        methods: {
            handleSave: function (event) {
                var _this = this;
                if (Object.keys(this.checkers).find(function (p) { return !_this.checkers[p]; })) {
                    event.preventDefault();
                    this.enable_error = true;
                }
            },
            validCheck: function (event) {
                this.checkers[event.name] = event.value;
            },
            selectPosition: function (event) {
                if (event.latlng) {
                    this.profile.common_start_pos.lat = event.latlng.lat;
                    this.profile.common_start_pos.lng = event.latlng.lng;
                    this.addMarker(event.latlng);
                }
            },
            submitForm: function (event) {
                this.$emit('submit', event);
            },
            addMarker: function (latlng) {
                if (latlng.lat && latlng.lng) {
                    var marker = null;
                    if (this.marker) {
                        this.removeMarker();
                    }
                    marker = createMarker(latlng);
                    this.marker = marker;
                    marker.addTo(this.map);
                }
            },
            removeMarker: function () {
                this.map.removeLayer(this.marker);
                this.marker = undefined;
            }
        },
        mounted: function () {
            this.map = this.$children.find(function (c) { return c['map'] != null && typeof c['map'] !== "function"; }).map;
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
    });
};
