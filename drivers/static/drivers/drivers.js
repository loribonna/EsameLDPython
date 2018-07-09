var travelDriverListItemComponent = {
    template: "<div style=\"display: flex;\" class=\"list-group-item list-group-item-action\">\n        <span style=\"flex: 1;\">Posizione di partenza:<br/>{{getPositionFormatted(content.start_pos)}}</span>\n        <span style=\"flex: 1;\">Posizione di arrivo:<br/>{{getPositionFormatted(content.end_pos)}}</span>\n        <span style=\"flex: 1;\">Data/Ora inizio:<br/>{{formatDate(content.start_date_time)}}</span>\n        <span style=\"flex: 1;\">Costo:<br>{{formatNum(content.fee)}} \u20AC</span>\n        <ld-badge v-if=\"checkPending()\" color=\"info\">In Corso</ld-badge>\n    </div>",
    props: [
        'content'
    ],
    mounted: function () { },
    components: {
        'ld-button': buttonComponent,
        'ld-badge': badgeComponent
    },
    methods: {
        formatNum: function (n) { return formatNum(n); },
        formatDate: function (d) {
            var date = new Date(d);
            return isValidDate(date) ? formatDate(date) : '';
        },
        getPositionFormatted: function (pos) {
            if (pos && pos[0] && pos[1]) {
                return 'lat: ' + formatNum(pos[0]) + ', lng: ' + formatNum(pos[1]);
            }
            else {
                return '';
            }
        },
        checkPending: function () {
            if (this.content && this.content.start_date_time) {
                var date = new Date(this.content.start_date_time);
                return isValidDate(date) && checkDateDifference(Date.now(), date.getTime(), 0);
            }
            return false;
        }
    }
};
window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'list-item': travelDriverListItemComponent,
            'ld-header': headerComponent
        }
    });
};
