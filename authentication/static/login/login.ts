interface IUserBase {
    name: String,
    info: String,
    enable_driver: Boolean,
    reports: Number,
    black_listed: Boolean,
    user_type: String
}

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'ld-button': buttonComponent,
            'text-input': textInputComponent,
            'ld-badge': badgeComponent
        },
        data: {
            user: null,
            pass: null,
            enable_error: false,
            components: {},
            content: null
        },
        methods: {
            handleLogin: function (event) {
                for (const comp in this.components) {
                    if (!this.components[comp]) {
                        event.preventDefault();
                        this.enable_error = true;
                        return;
                    }
                }
            },
            submitForm(event) {
                this.$emit('submit', event);
            },
            validCheck: function (event) {
                this.components[event.name] = event.value
            }
        },
        mounted: function () {
            if(this.content){
                this.user = this.content['user'];
                this.pass = this.content['pass'];
            }
        }
    })
}