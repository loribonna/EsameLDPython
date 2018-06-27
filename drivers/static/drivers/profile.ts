interface IDriver {
    id: String,
    name: String,
    travels: ITravel,
    info: String,
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
            'driver-header': headerComponent
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
                checkers: {}
            }
        },
        methods: {
            handleSave(event) {
                if (Object.keys(this.checkers).find(p => !this.checkers[p])) {
                    event.preventDefault();
                    this.enable_error = true;
                }
                console.log(this.profile, this.checkers);
                event.preventDefault();
            },
            validCheck(event) {
                this.checkers[event.name] = event.value;
            }
        },
        mounted: function () {
            if (this.userData) {
                this.profile = this.userData;
            }
        }
    })
}