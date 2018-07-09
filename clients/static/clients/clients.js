var travelClientListItemComponent = {
    template: "<div style=\"display: flex;\" class=\"list-group-item list-group-item-action\">\n        <span class=\"ld-client-list-item\">Posizione di partenza:<br/>{{getPositionFormatted(content.start_pos)}}</span>\n        <span class=\"ld-client-list-item\">Posizione di arrivo:<br/>{{getPositionFormatted(content.end_pos)}}</span>\n        <span class=\"ld-client-list-item\">Data/Ora inizio:<br/>{{formatDate(content.start_date_time)}}</span>\n        <span class=\"ld-client-list-item\">Costo:<br>{{formatNum(content.fee)}} \u20AC</span>\n        <span class=\"ld-client-list-item\">Autista:<br>{{content.driver}}</span>\n        <ld-button :disabled=\"checkRefRequest()\" style=\"margin-right:5px\" v-on:click=\"askRefund\" btnType=\"warning\">Richiedi rimborso <span class=\"fa fa-recycle\"></span></ld-button>\n        <ld-button tooltip=\"Report Driver\" style=\"margin-right:5px\" v-on:click=\"reportDriver\" btnType=\"warning\"><span class=\"fa fa-frown-o\"></span></ld-button>\n        <ld-button v-on:click=\"removeTravel\" v-if=\"checkRemovable()\" btnType=\"danger\">X</ld-button>\n    </div>",
    props: [
        'content'
    ],
    components: {
        'ld-button': buttonComponent
    },
    methods: {
        checkRefRequest: function () {
            return this.content.refound_request == '1';
        },
        formatNum: function (n) { return formatNum(n); },
        checkRemovable: function () {
            if (this.content && this.content.start_date_time) {
                var date = new Date(this.content.start_date_time);
                return isValidDate(date) && checkDateDifference(date.getTime(), Date.now(), MAX_DATE_DIFF);
            }
            return false;
        },
        formatDate: function (d) {
            var date = new Date(d);
            return isValidDate(date) ? formatDate(date) : '';
        },
        getPositionFormatted: function (pos) {
            if (pos && pos.length == 2) {
                return 'lat: ' + formatNum(pos[0]) + ', lng: ' + formatNum(pos[1]);
            }
            else {
                return '';
            }
        },
        askRefund: function (event) {
            this.$emit('submit', { name: 'refundReq', content: this.content.id });
        },
        reportDriver: function () {
            this.$emit('submit', { name: 'reportDriver', content: this.content.id });
        },
        removeTravel: function () {
            if (this.checkRemovable()) {
                this.$emit('submit', { name: 'removeTravel', content: this.content.id });
            }
        }
    }
};
window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'list-item': travelClientListItemComponent,
            'ld-header': headerComponent
        },
        methods: {
            handleSubmit: function (event) {
                location.href = 'clients?' + event.name + "=" + event.content;
            }
        }
    });
};
