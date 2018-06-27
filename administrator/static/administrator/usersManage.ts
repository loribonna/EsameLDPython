interface IUserBase {
    name: String,
    info: String,
    reportes: Number,
    black_listed: Boolean,
    user_type: String
}

const usersListItemComponent = {
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <div style="display:flex; flex:1"><ld-badge color="info">{{getUserTypeFormatted()}}</ld-badge></div>
        <span style="flex: 1;">Nome:<br/>{{content.name}}</span>
        <span style="flex: 1;">ID:<br/>{{content.id}}</span>
        <ld-button style="margin-right:5px" v-on:click="reportUser" btnType="warning">Segnala Utente <span class="fa fa-frown-o"></span></ld-button>
        <ld-button style="margin-right:5px" v-on:click="reportUser" btnType="danger">Black-List <span class="fa fa-ban"></span></ld-button>
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
        reportUser() {
            //TODO:
            console.log(this);
        },
        getUserTypeFormatted(){
            if(this.content && this.content.user_type){
                return capitalizeString(this.content.user_type);
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
        }
    })
}