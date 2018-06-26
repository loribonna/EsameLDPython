interface IClient {
    id: String,
    name: String,
    travels: ITravel,
    info: String
}

const clientHeaderComponent = {
    template: `<div style="display: flex">
        <ld-button tooltip="Return MAP" v-on:click="homeClick"><span class="fa fa-home"></span></ld-button>
    </div>`,
    props: [],
    components: {
        'ld-button': buttonComponent
    },
    methods: {
        homeClick(event) {
            location.href="/map"
        }
    }
}

window.onload = function () {
    new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'travel-list': travelListComponent,
            'client-header': clientHeaderComponent
        }
    })
}