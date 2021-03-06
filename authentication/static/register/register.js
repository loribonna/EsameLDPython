window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'ld-button': buttonComponent,
            'text-input': textInputComponent,
            'check-input': checkboxInputComponent,
            'ld-badge': badgeComponent
        },
        data: {
            user: null,
            pass: null,
            enable_error: false,
            components: {},
            content: null,
            driver_enable: null
        },
        methods: {
            handleSubmit: function (event) {
                for (var comp in this.components) {
                    if (!this.components[comp]) {
                        event.preventDefault();
                        this.enable_error = true;
                        return;
                    }
                }
            },
            submitForm: function (event) {
                this.$emit('submit', event);
            },
            validCheck: function (event) {
                this.components[event.name] = event.value;
            }
        },
        mounted: function () {
            if (this.content) {
                this.user = this.content['user'];
                this.pass = this.content['pass'];
            }
        }
    });
};
