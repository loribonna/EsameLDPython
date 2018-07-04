const travelAdminListItemComponent = {
    //TODO;
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <span style="flex: 1;">Posizione di partenza:<br/>{{getPositionFormatted(content.startPos)}}</span>
        <span style="flex: 1;">Posizione di arrivo:<br/>{{getPositionFormatted(content.endPos)}}</span>
        <span style="flex: 1;">Data/Ora inizio:<br/>{{formatDate(content.startDateTime)}}</span>
        <ld-button v-if="content.refoundRequest" style="margin-right:5px" v-on:click="acceptRefound" btnType="warning">Accetta rimborso <span class="fa fa-recycle"></span></ld-button>
        <ld-button v-on:click="removeTravel" v-if="checkRemovable()" btnType="danger">X</ld-button>
    </div>`,
    props: [
        'content'
    ],
    mounted: function () { },
    components: {
        'ld-button': buttonComponent
    },
    methods: {
        checkRemovable() {
            if (this.content && this.content.startDateTime) {
                const date = new Date(this.content.startDateTime);
                return isValidDate(date) && checkDateDifference(date.getTime(), Date.now(), MAX_DATE_DIFF);
            }
            return false;
        },
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
        acceptRefound() {
            this.$emit('submit', { name: 'acceptRef', content: this.content.id });
        },
        removeTravel() {
            if (this.checkRemovable()) {
                this.$emit('submit', { name: 'removeTravel', content: this.content.id });
            }
        }
    }
}

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        props: ['content'],
        components: {
            'ld-header': headerComponent,
            'list-item': travelAdminListItemComponent
        },
        methods: {
            handleSubmit(event) {
                location.href = 'administration?' + event.name + "=" + event.content;
            }
        }
    })
}