
const travelDriverListItemComponent = {
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <span style="flex: 1;">Posizione di partenza:<br/>{{getPositionFormatted(content.startPos)}}</span>
        <span style="flex: 1;">Posizione di arrivo:<br/>{{getPositionFormatted(content.endPos)}}</span>
        <span style="flex: 1;">Data/Ora inizio:<br/>{{formatDate(content.startDateTime)}}</span>
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
        formatDate(d) {
            const date = new Date(d);
            return isValidDate(date) ? formatDate(date) : ''
        },
        getPositionFormatted(pos) {
            if (pos && pos.lat && pos.lng) {
                return 'lat: ' + formatNum(pos.lat) + ', lng: ' + formatNum(pos.lng);
            } else {
                return ''
            }
        },
        checkPending() {
            if (this.content && this.content.startDateTime) {
                const date = new Date(this.content.startDateTime);
                return isValidDate(date) && checkDateDifference(date.getTime(), Date.now(), 0);
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