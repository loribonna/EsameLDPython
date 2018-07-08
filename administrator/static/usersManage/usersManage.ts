const usersListItemComponent = {
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <div style="display:flex; flex:1"><ld-badge color="info">{{getUserTypeFormatted()}}</ld-badge></div>
        <span style="flex: 1;">Nome:<br/>{{content.user}}</span>
        <span style="flex: 1;">ID:<br/>{{content.id}}</span>
        <span style="flex: 1;">Segnalazioni:<br/>{{content.reports}}</span>
        <div v-if="isBlackListed()" style="display:flex; flex:1"><ld-badge color="info">BlackListed</ld-badge></div>
        <ld-button style="margin-right:5px" v-on:click="reportUser" btnType="warning">Segnala Utente <span class="fa fa-frown-o"></span></ld-button>
        <ld-button v-if="!isBlackListed()" style="margin-right:5px" v-on:click="blackListUser" btnType="danger">Black-List <span class="fa fa-ban"></span></ld-button>
    </div>`,
    props: [
        'content', 'user_type'
    ],
    mounted: function () { },
    components: {
        'ld-button': buttonComponent,
        'ld-badge': badgeComponent
    },
    methods: {
        isBlackListed() {
            return this.content.black_listed == '1'
        },
        formatDate(d) {
            const date = new Date(d);
            return isValidDate(date) ? formatDate(date) : ''
        },
        reportUser() {
            if (this.user_type) {
                this.$emit('submit', [{ name: 'reportUser', content: this.content.id }, { name: 'user_type', content: this.user_type }]);
            }
        },
        blackListUser() {
            if (this.user_type) {
                this.$emit('submit', [{ name: 'blackListUser', content: this.content.id }, { name: 'user_type', content: this.user_type }]);
            }
        },
        getUserTypeFormatted() {
            if (this.user_type) {
                return capitalizeString(this.user_type);
            } else {
                return 'Default'
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
            'list-item': usersListItemComponent
        },
        methods: {
            handleSubmit(event: {name: string, content: string}[]) {
                const q: String = event.reduce((acc, val) => {
                    return acc += val.name + "=" + val.content + "&";
                }, "?");
                const query = q.slice(0, q.length - 1)
                location.href = 'users' + query;
            }
        }
    })
}