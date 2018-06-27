
window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'ld-button': buttonComponent,
            'text-input': textInputComponent
        },
        data: {
            user: null,
            pass: null,
            enable_error: false,
            valid: true,
            components: {}
        },
        methods: {
            handleLogin: function (event) {
                for (const comp in this.components) {
                    if(!this.components[comp]){
                        event.preventDefault();
                        this.enable_error=true;
                        return;
                    }
                }
                event.preventDefault();
            },
            submitForm(event){
                this.$emit('submit', event);
            },
            validCheck: function (event) {
                this.components[event.name] = event.value
            }
        }
    })
}