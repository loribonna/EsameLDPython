var usersListItemComponent = {
    template: "<div style=\"display: flex;\" class=\"list-group-item list-group-item-action\">\n        <div style=\"display:flex; flex:1\"><ld-badge color=\"info\">{{getUserTypeFormatted()}}</ld-badge></div>\n        <span style=\"flex: 1;\">Nome:<br/>{{content.user}}</span>\n        <span style=\"flex: 1;\">ID:<br/>{{content.id}}</span>\n        <span style=\"flex: 1;\">Segnalazioni:<br/>{{content.reports}}</span>\n        <div v-if=\"isBlackListed()\" style=\"display:flex; flex:1\"><ld-badge color=\"info\">BlackListed</ld-badge></div>\n        <ld-button style=\"margin-right:5px\" v-on:click=\"reportUser\" btnType=\"warning\">Segnala Utente <span class=\"fa fa-frown-o\"></span></ld-button>\n        <ld-button v-if=\"!isBlackListed()\" style=\"margin-right:5px\" v-on:click=\"blackListUser\" btnType=\"danger\">Black-List <span class=\"fa fa-ban\"></span></ld-button>\n    </div>",
    props: [
        'content', 'user_type'
    ],
    mounted: function () { },
    components: {
        'ld-button': buttonComponent,
        'ld-badge': badgeComponent
    },
    methods: {
        isBlackListed: function () {
            return this.content.black_listed == '1';
        },
        formatDate: function (d) {
            var date = new Date(d);
            return isValidDate(date) ? formatDate(date) : '';
        },
        reportUser: function () {
            if (this.user_type) {
                this.$emit('submit', [{ name: 'reportUser', content: this.content.id }, { name: 'user_type', content: this.user_type }]);
            }
        },
        blackListUser: function () {
            if (this.user_type) {
                this.$emit('submit', [{ name: 'blackListUser', content: this.content.id }, { name: 'user_type', content: this.user_type }]);
            }
        },
        getUserTypeFormatted: function () {
            if (this.user_type) {
                return capitalizeString(this.user_type);
            }
            else {
                return 'Default';
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
            'list-item': usersListItemComponent
        },
        methods: {
            handleSubmit: function (event) {
                var q = event.reduce(function (acc, val) {
                    return acc += val.name + "=" + val.content + "&";
                }, "?");
                var query = q.slice(0, q.length - 1);
                location.href = 'users' + query;
            }
        }
    });
};
