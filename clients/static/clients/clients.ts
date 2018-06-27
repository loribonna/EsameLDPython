interface IClient {
    id: String,
    name: String,
    travels: ITravel,
    info: String
}

const travelClientListItemComponent = {
    template: `<div style="display: flex;" class="list-group-item list-group-item-action">
        <span style="flex: 1;">Inizio: {{content.start}}</span>
        <span style="flex: 1;">Fine: {{content.end}}</span>
        <span style="flex: 1;">Data/Ora inizio:<br/>{{content.dt}}</span>
        <span style="flex: 1;">Costo: {{content.cost}}</span>
        <ld-button tooltip="Report Driver" style="margin-right:5px" v-on:click="reportDriver" btnType="warning"><span class="fa fa-frown-o"></span></ld-button>
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
            if (this.content && this.content.dt) {
                const date = new Date(this.content.dt);
                return isValidDate(date) && checkDateDifference(date.getTime(), Date.now(), MAX_DATE_DIFF);
            }
            return false;
        },
        reportDriver() {
            //TODO: 
            console.log(this);
        },
        removeTravel() {
            //TODO: 
            if (this.checkRemovable()) {
                console.log(this);
            }  
        }
    }
}

const travelClientListComponent = {
    template: `<div>
        <travel-list-item v-for="item in content" :key="item.id" :content="item"></travel-list-item>
    </div>`,
    props: [
        'content'
    ],
    components: {
        'travel-list-item': travelClientListItemComponent
    },
    mounted: function () { }
}

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'travel-list': travelClientListComponent,
            'client-header': headerComponent
        }
    })
}