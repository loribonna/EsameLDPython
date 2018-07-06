window.onload = function () {
    const router = new VueRouter({
        mode: 'history',
        routes: []
    });
    new Vue({
        router,
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
            }
        },
        methods: {
            getValueFromRoute(name: string, pos?: number) {
                if (pos != null) {
                    if (this.$route.query[name]) {
                        const field = JSON.parse(this.$route.query[name]);
                        return field && field[pos] ? field[pos] : '';
                    } else {
                        return '';
                    }
                } else {
                    return this.$route.query[name] ? this.$route.query[name] : '';
                }
            },
            getPositionFormatted(pos: any[]) {
                if (pos && pos.length == 2) {
                    return 'lat: ' + formatNum(pos[0]) + ', lng: ' + formatNum(pos[1]);
                } else {
                    return ''
                }
            },
            formatDate(d) {
                const date = new Date(d);
                return isValidDate(date) ? formatDate(date) : ''
            },
            formatNum(n) { return formatNum(n) },
            confirmTravel(event) { }
        },
        mounted: function () {
            this.content = this.$route.query;
        }
    })
}