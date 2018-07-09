var resultItemComponent = {
    template: "<a v-on:click=\"chooseTravel\" href=\"#\" style=\"display: flex;\" class=\"list-group-item list-group-item-action\">\n        <span style=\"flex: 1;\">Nome autista: {{content.driver.name}}</span>\n        <span style=\"flex: 1;\">Costo: {{content.fee}}</span>\n        <span v-if=\"content.message\" style=\"flex: 1;\">Info: {{content.message}}</span>\n    </a>",
    props: ['content'],
    components: {
        'ld-button': buttonComponent,
        'ld-badge': badgeComponent
    },
    methods: {
        chooseTravel: function (event) {
            this.$emit('submit', { name: 'chooseTravel', content: this.content });
        }
    }
};
window.onload = function () {
    var router = new VueRouter({
        mode: 'history',
        routes: []
    });
    new Vue({
        router: router,
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'result-item': resultItemComponent,
            'ld-button': buttonComponent,
            'ld-badge': badgeComponent
        },
        methods: {
            formatLatLng: function (pos) {
                try {
                    var parts = pos.split(',');
                    if (parts.length === 2) {
                        return "(" + Number(parts[0]).toFixed(2) + ', ' + Number(parts[1]).toFixed(2) + ")";
                    }
                    return null;
                }
                catch (e) {
                    return null;
                }
            },
            returnMap: function (event) {
                location.href = "/map";
            },
            handleSubmit: function (event) {
                var query = buildQuery(event.content).reduce(function (acc, val) {
                    return acc += val + "&";
                }, "?");
                query = query.slice(0, query.length - 1);
                location.href = 'confirm' + query;
            }
        }
    });
};
