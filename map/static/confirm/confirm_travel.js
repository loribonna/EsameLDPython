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
            'ld-button': buttonComponent,
            'ld-header': headerComponent,
            'text-input': textInputComponent,
            'ld-badge': badgeComponent
        },
        data: function () {
            return {
                content: {}
            };
        },
        methods: {
            getValueFromRoute: function (name, pos) {
                if (pos != null) {
                    if (this.$route.query[name]) {
                        var field = JSON.parse(this.$route.query[name]);
                        return field && field[pos] ? field[pos] : '';
                    }
                    else {
                        return '';
                    }
                }
                else {
                    return this.$route.query[name] ? this.$route.query[name] : '';
                }
            },
            getPositionFormatted: function (pos) {
                if (pos && pos.length == 2) {
                    return 'lat: ' + formatNum(pos[0]) + ', lng: ' + formatNum(pos[1]);
                }
                else {
                    return '';
                }
            },
            formatDate: function (d) {
                var date = new Date(d);
                return isValidDate(date) ? formatDate(date) : '';
            },
            formatNum: function (n) { return formatNum(n); },
            confirmTravel: function (event) { }
        },
        mounted: function () {
            this.content = this.$route.query;
        }
    });
};
