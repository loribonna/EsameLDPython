interface IDriver extends IUserBase {
    travels: ITravel,
    ratePerKM: Number,
    commonStartPos: IPos,
    maxDistance: Number,
    timeAvail: ITimeAvail
}

interface ITimeAvail {
    startTime: String,
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
                enable_error: false,
                profile: {
                    user: null,
                    info: null,
                    ratePerKM: null,
                    commonStartPos: {
                        lat: null,
                        lng: null
                    },
                    maxDistance: null,
                    timeAvail: {
                        startTime: null,
                        duration: null
                    }
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
                event.preventDefault();
            },
            validCheck(event) {
                this.checkers[event.name] = event.value;
            },
            selectPosition(event) {
                if (event.latlng) {
                    this.profile.commonStartPos.lat = event.latlng.lat;
                    this.profile.commonStartPos.lng = event.latlng.lng;
                    this.addMarker(event.latlng);
                }
            },
            addMarker(latlng) {
                let marker = null;
                if (this.marker) {
                    this.removeMarker();
                }
                marker = createMarker(latlng);
                this.marker = marker;
                marker.addTo(this.map);
                
            },
            removeMarker() {
                this.map.removeLayer(this.marker);
                this.marker = undefined;
            }
        },
        mounted: function () {
            this.map = (<any[]>this.$children).find(c => c['map'] != null && typeof c['map'] !== "function").map;
            if (this.userData) {
                this.profile = this.userData;
            }
        }
    })
}