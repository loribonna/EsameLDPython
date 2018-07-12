var travelAdminListItemComponent = {
    template: "<div style=\"display: flex;\" class=\"list-group-item list-group-item-action\">\n        <span class=\"ld-admin-list-item\">Posizione di partenza:<br/>{{getPositionFormatted(content.start_pos)}}</span>\n        <span class=\"ld-admin-list-item\">Posizione di arrivo:<br/>{{getPositionFormatted(content.end_pos)}}</span>\n        <span class=\"ld-admin-list-item\">Data/Ora inizio:<br/>{{formatDate(content.start_date_time)}}</span>\n        <span class=\"ld-admin-list-item\">Cliente:<br>{{content.client}}</span>\n        <span class=\"ld-admin-list-item\">Autista:<br>{{content.driver}}</span>\n        <ld-button v-if=\"content.refound_request=='1'\" style=\"margin-right:5px\" v-on:click=\"acceptRefound\" btnType=\"warning\">Accetta rimborso <span class=\"fa fa-recycle\"></span></ld-button>\n        <ld-button v-on:click=\"removeTravel\" v-if=\"checkRemovable()\" btnType=\"danger\">X</ld-button>\n        </div>",
    props: [
        'content'
    ],
    mounted: function () { },
    components: {
        'ld-button': buttonComponent
    },
    methods: {
        checkRemovable: function () {
            if (this.content && this.content.start_date_time) {
                var date = new Date(this.content.start_date_time);
                return isValidDate(date) && checkDateDifference(Date.now(), date.getTime(), MAX_DATE_DIFF);
            }
            return false;
        },
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
        acceptRefound: function () {
            this.$emit('submit', { name: 'acceptRef', content: this.content.id });
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
        props: ['content'],
        components: {
            'ld-header': headerComponent,
            'list-item': travelAdminListItemComponent,
            'ld-badge': badgeComponent
        },
        methods: {
            handleSubmit: function (event) {
                location.href = 'administrator?' + event.name + "=" + event.content;
            }
        }
    });
};
