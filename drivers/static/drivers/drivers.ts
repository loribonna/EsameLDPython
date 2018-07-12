
const travelDriverListItemComponent = {
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <span style="flex: 1;">Posizione di partenza:<br/>{{getPositionFormatted(content.start_pos)}}</span>
        <span style="flex: 1;">Posizione di arrivo:<br/>{{getPositionFormatted(content.end_pos)}}</span>
        <span style="flex: 1;">Data/Ora inizio:<br/>{{formatDate(content.start_date_time)}}</span>
        <span style="flex: 1;">Costo:<br>{{formatNum(content.fee)}} €</span>
        <ld-badge v-if="checkPending()" color="info">In Corso</ld-badge>
    </div>`,
    props: [
        'content'
    ],
    mounted: function () { },
    components: {
        'ld-button': buttonComponent,
        'ld-badge': badgeComponent
    },
    methods: {
        formatNum(n) { return formatNum(n) },
        formatDate(d) {
            const date = new Date(d);
            return isValidDate(date) ? formatDate(date) : ''
        },
        getPositionFormatted(pos) {
            if (pos && pos[0] && pos[1]) {
                return 'lat: ' + formatNum(pos[0]) + ', lng: ' + formatNum(pos[1]);
            } else {
                return ''
            }
        },
        checkPending() {
            if (this.content && this.content.start_date_time) {
                const date = new Date(this.content.start_date_time);
                return isValidDate(date) && checkDateDifference(Date.now(), date.getTime());
            }
            return false;
        }
    }
}

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'list-item': travelDriverListItemComponent,
            'ld-header': headerComponent
        }
    })
}