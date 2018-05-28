
window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'ld-button': buttonComponent 
        },
        methods: {
            login: (event) => {
                console.log(event);
            }
        }
    })
}