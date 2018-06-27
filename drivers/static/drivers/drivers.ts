
const travelDriverListItemComponent = {
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <span style="flex: 1;">Posizione di partenza:<br/>{{getPositionFormatted(content.startPos)}}</span>
        <span style="flex: 1;">Posizione di arrivo:<br/>{{getPositionFormatted(content.endPos)}}</span>
        <span style="flex: 1;">Inizio: {{content.start}}</span>
        <span style="flex: 1;">Data/Ora inizio:<br/>{{formatDate(content.dt)}}</span>
        <span v-if="checkPending()" class="badge badge-info ld-badge">In Corso</span>
    </div>`,
    props: [
        'content'
    ],
    mounted: function () { },
    components: {
        'ld-button': buttonComponent
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
            if (this.content && this.content.dt) {
                const date = new Date(this.content.dt);
                return isValidDate(date) && checkDateDifference(date.getTime(), Date.now(), 0);
            }
            return false;
        }
    }
}

const travelDriverListComponent = {
    template: `<div>
        <travel-list-item v-for="item in content" :key="item.id" :content="item"></travel-list-item>
    </div>`,
    props: [
        'content'
    ],
    components: {
        'travel-list-item': travelDriverListItemComponent
    },
    mounted: function () { }
}

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'travel-list': travelDriverListComponent,
            'driver-header': headerComponent
        }
    })
}