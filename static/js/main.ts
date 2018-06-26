const buttonComponent = {
    template: '<button :tooltip="tooltip" v-bind:type="type" v-on:click="$emit(\'click\', $event)" :class="getClass()" v-bind:class="{\'disabled\': disable}"><slot></slot></button>',
    props: [
        'disable',
        'type',
        'btnType',
        'tooltip'
    ],
    methods: {
        getClass() {
            return 'btn btn-' + 
            (this.btnType ? this.btnType : 'primary') +
            (this.tooltip ? ' ld-tooltip' : '');
        }
    },
    mounted: function() {
        console.log(this.tooltip);
    }
};

const isValidDate = (d) => {
    return d && d instanceof Date && !isNaN(d.getTime());
}

const checkDateDifference = (d1, d2, maxDiff) => {
    return (d2 - d1) <= maxDiff;
}

const MAX_DATE_DIFF = 15 * 60 * 1000; // 15 minutes

const travelListItemComponent = {
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

const travelListComponent = {
    template: `<div>
        <travel-list-item v-for="item in content" :key="item.id" :content="item"></travel-list-item>
    </div>`,
    props: [
        'content'
    ],
    components: {
        'travel-list-item': travelListItemComponent
    },
    mounted: function () { }
}

const VALIDATORS = {
    timeValidator: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    stringValidator: <RegExp>/^([A-Za-z0-99À-ÿ� ,.:/';+!?|)(_\n-]*)*$/,
    telephoneValidator: <RegExp>/^([+]([0-9][0-9][\s])?)?([0-9]*(\s)?[0-9]*)$/,
    mailValidator: <RegExp>/(^$|^.*@.*\..*$)/,
    numberValidator: <RegExp>/^(-)?[0-9]*([.][0-9]*)?$/,
    urlValidator: <RegExp>/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    dateWithoutYearValidator: <RegExp>/^[0-9]{1,2}(-|\/)?[0-9]{1,2}$/,
    objectID: <RegExp>/^[0-9a-fA-F]{24}$/

}

const textInputComponent = {
    template: `<input class="form-control ld_text_input" :placeholder="placeholder" :name="name" :type="type ? type : \'text\'" v-bind:class="{invalid: (!valid&&enable_error)}" v-bind:value="value" v-on:input="onInput">`,
    props: [
        'value',
        'type',
        'name',
        'placeholder',
        'enable_error',
        'validator',
        'required'
    ],
    data: function () {
        return {
            valid: null,
            validatorRegExp: null
        }
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value);
            this.valid = this.isValid(event.target.value)
        },
        isValid(value = this.valid) {
            let valid = true;
            if (this.required && value == null) {
                valid = false;
            } else if (this.validatorRegExp && !this.validatorRegExp.test(value)) {
                valid = false;
            }
            this.$emit('valid', { value: valid, name: this.name });
            return valid
        }
    },
    mounted: function () {
        this.validatorRegExp = VALIDATORS[this.validator] || VALIDATORS.stringValidator
        this.valid = this.isValid(this.value);
    }
}