interface IClient extends IUserBase { }

const travelClientListItemComponent = {
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <span class="ld-client-list-item">Posizione di partenza:<br/>{{getPositionFormatted(content.start_pos)}}</span>
        <span class="ld-client-list-item">Posizione di arrivo:<br/>{{getPositionFormatted(content.end_pos)}}</span>
        <span class="ld-client-list-item">Data/Ora inizio:<br/>{{formatDate(content.start_date_time)}}</span>
        <span class="ld-client-list-item">Costo:<br>{{formatNum(content.fee)}} €</span>
        <span class="ld-client-list-item">Autista:<br>{{content.driver}}</span>
        <ld-button :disabled="checkRefRequest()" style="margin-right:5px" v-on:click="askRefund" btnType="warning">Richiedi rimborso <span class="fa fa-recycle"></span></ld-button>
        <ld-button tooltip="Report Driver" style="margin-right:5px" v-on:click="reportDriver" btnType="warning"><span class="fa fa-frown-o"></span></ld-button>
        <ld-button v-on:click="removeTravel" v-if="checkRemovable()" btnType="danger">X</ld-button>
    </div>`,
    props: [
        'content'
    ],
    components: {
        'ld-button': buttonComponent
    },
    mounted: function () { },
    methods: {
        checkRefRequest() {
            return this.content.refound_request == '1'
        },
        formatNum(n) { return formatNum(n) },
        checkRemovable() {
            if (this.content && this.content.start_date_time) {
                const date = new Date(this.content.start_date_time);
                return isValidDate(date) && checkDateDifference(Date.now(), date.getTime(), MAX_DATE_DIFF);
            }
            return false;
        },
        formatDate(d) {
            const date = new Date(d);
            return isValidDate(date) ? formatDate(date) : ''
        },
        getPositionFormatted(pos: any[]) {
            if (pos && pos.length == 2) {
                return 'lat: ' + formatNum(pos[0]) + ', lng: ' + formatNum(pos[1]);
            } else {
                return ''
            }
        },
        askRefund(event) {
            this.$emit('submit', { name: 'refundReq', content: this.content.id });
        },
        reportDriver() {
            this.$emit('submit', { name: 'reportDriver', content: this.content.id });
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
        components: {
            'list-item': travelClientListItemComponent,
            'ld-header': headerComponent,
            'ld-badge': badgeComponent
        },
        methods: {
            handleSubmit(event) {
                location.href = 'clients?' + event.name + "=" + event.content;
            }
        }
    })
}