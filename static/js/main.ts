const buttonComponent = {
    template: '<button v-bind:type="type" v-on:click="$emit(\'submit\', $event)" class="btn btn-primary" v-bind:class="{\'disabled\': disable}"><slot></slot></button>',
    props: [
        'disable',
        'type',
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
    data: function () {
        return {
            valid: null
        }
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value);
            this.valid = this.isValid(event.target.value)
        },
        isValid(value = this.valid) {
            let valid = false;
            if (value) valid = true;
            this.$emit('valid', { value: valid, name: this.name });
            return value
        }
    },
    mounted: function () {
        this.valid = this.isValid(this.value);
    }
}