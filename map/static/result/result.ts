
const resultItemComponent = {
    template: `<a v-on:click="chooseTravel" href="#" style="display: flex;" class="list-group-item list-group-item-action">
        <span style="flex: 1;">Nome autista: {{content.driver.name}}</span>
        <span style="flex: 1;">Costo: {{content.fee}}</span>
        <span v-if="content.message" style="flex: 1;">Info: {{content.message}}</span>
    </a>`,
    props: ['content'],
    components: {
        'ld-button': buttonComponent,
        'ld-badge': badgeComponent
    },
    methods: {
        chooseTravel(event) {
            this.$emit('submit', { name: 'chooseTravel', content: this.content });
        }
    }
}

window.onload = function () {
    var router = new VueRouter({
        mode: 'history',
        routes: []
    });
    new Vue({
        router,
        delimiters: ['[[', ']]'],
        el: '#app',
        components: {
            'result-item': resultItemComponent,
            'ld-button': buttonComponent,
            'ld-badge': badgeComponent
        },
        methods: {
            formatLatLng(pos: String) {
                try {
                    const parts = pos.split(',');
                    if (parts.length === 2) {
                        return "(" + Number(parts[0]).toFixed(2) + ', ' + Number(parts[1]).toFixed(2) + ")";
                    }
                    return null;
                } catch (e) {
                    return null;
                }
            },
            returnMap(event){
                location.href="/map"
            },
            handleSubmit(event) {
                let query = buildQuery(event.content).reduce((acc, val) => {
                    return acc += val + "&"
                }, "?");
                query = query.slice(0, query.length - 1);
                location.href = 'confirm' + query;
            }
        }
    })
}