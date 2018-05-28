const buttonComponent = {
    template: '<button v-bind:type="type" v-on:click="$emit(\'submit\', $event)" class="btn btn-outline-primary" v-bind:class="{\'disabled\': disable}"><slot></slot></button>',
    props: [
        'disable',
        'type'
    ]
};

const textInputComponent = {
    template: `<input class="form-control ld_text_input" :placeholder="placeholder" :name="name" :type="type ? type : \'text\'" v-bind:class="{invalid: (!valid&&enable_error)}" v-bind:value="value" v-on:input="onInput">`,
    props: [
        'value',
        'type',
        'name',
        'placeholder',
        'enable_error'
    ],
    data: function() {
        return {
            valid:null
        }
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value);
            this.valid=this.isValid(event.target.value)
        },
        isValid(value = this.valid) {
            let valid=false;
            if(value) valid=true;
            this.$emit('valid', {value: valid, name: this.name});
            return value
        }
    },
    mounted: function() {
        this.valid=this.isValid(this.value);
    }
}

const DEFAULT_CENTER = [41.8931, 12.4828];

const leafletComponent = {
    template: '<div id="map" class="ld-map"></div>',
    data: function () {
        return {
            map: null
        };
    },
    mounted: function () {
        this.map = new L.Map('map');
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(this.map);
        this.map.invalidateSize();
        this.map.setView(DEFAULT_CENTER, 6);
    }
};