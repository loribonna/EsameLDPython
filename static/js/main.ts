const capitalizeString = (s: String) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const formatNum = (n) => {
    return n && typeof n === 'number' ? n.toFixed(2) : 0;
}

const formatDate = (d: Date) => {
    return d.toLocaleString();
}

const isValidDate = (d) => {
    return d && d instanceof Date && !isNaN(d.getTime());
}

const abs = (n) => {
    return n > 0 ? n : -n;
}

const getDate = (day: String, time: String) => {
    if (!day || !time) {
        return null
    }
    const dayParts = day.split('/');
    const timeParts = time.split(':');
    if (dayParts.length == 3 && timeParts.length == 2) {
        const year = dayParts[2].length == 2 ? 2000 + Number(dayParts[2]) : Number(dayParts[2])
        const retDate =  new Date(
            year,  Number(dayParts[1]),  Number(dayParts[0]),  Number(timeParts[1]),  Number(timeParts[0])
        )
        return !isNaN(retDate.getTime()) ? retDate : null;
    }
    return null
}

const checkDateDifference = (start, end, maxDiff?) => {
    if (!maxDiff) {
        return start - end > 0
    }
    return maxDiff <= end - start;
}

const buildQuery = (obj): string[] => {
    let query = [];
    for (const prop in obj) {
        if (typeof obj[prop] === "string" || typeof obj[prop] === "number") {
            query.push(prop + "=" + obj[prop]);
        } else if (typeof obj[prop] === "object" && !Array.isArray(obj[prop])) {
            query.push(...buildQuery(obj[prop]).map(q => prop + "." + q));
        } else if (Array.isArray(obj[prop])) {
            query.push(prop + "=" + JSON.stringify(obj[prop]))
        }
    }
    return query;
}

const MAX_DATE_DIFF = 15 * 60 * 1000; // 15 minutes

const VALIDATORS = {
    timeValidator: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    stringValidator: <RegExp>/^([A-Za-z0-99À-ÿ� ,.:/';+!?|)(_\n-]*)*$/,
    telephoneValidator: <RegExp>/^([+]([0-9][0-9][\s])?)?([0-9]*(\s)?[0-9]*)$/,
    mailValidator: <RegExp>/(^$|^.*@.*\..*$)/,
    numberValidator: <RegExp>/^(-)?[0-9]*([.][0-9]*)?$/,
    urlValidator: <RegExp>/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    dateWithoutYearValidator: <RegExp>/^[0-9]{1,2}(-|\/)?[0-9]{1,2}$/,
    objectID: <RegExp>/^[0-9a-fA-F]{24}$/,
    dateValidator: /^(3[01]|[12][0-9]|0?[1-9])\/(1[0-2]|0?[1-9])\/([0-9]{2}|[0-9]{4})$/
}

const DEFAULT_CENTER = [41.8931, 12.4828];

const createMarker = (pos: L.LatLng, className?: String) => {
    const icon = L.divIcon({
        className: '',
        iconSize: null,
        iconAnchor: <any>['8', '30'],
        html: "<div class='fa fa-map-marker ld-marker " + className + "'></div>"
    });
    return L.marker(pos, { icon: icon });
}


const buttonComponent = {
    template: '<button :tooltip="tooltip" v-bind:type="type" v-on:click="$emit(\'click\', $event)" :class="getClass()"><slot></slot></button>',
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
                (this.tooltip ? ' ld-tooltip' : '') +
                (this.disable ? 'disabled' : '');
        }
    }
};

const leafletComponent = {
    template: `<div id="map" class="ld-map"><slot></slot></div>`,
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
        this.map.off('dblclick');
        this.map.on('dblclick', event => {
            this.$emit('dblclick', event);
        });
    }
};

const badgeComponent = {
    template: `<span :class="getClass()"><slot></slot></span>`,
    props: ['color'],
    methods: {
        getClass() {
            return 'badge badge-' +
                (this.color ? this.color : 'light') +
                ' ld-badge';
        }
    }
}

const dividerComponent = {
    template: `<div class="ld-divider"></div>`
}

const positionLabelComponent = {
    template: `
        <div style="padding: 5px; display:flex; width:100%">
            <button v-on:click="removeData" :class=getClass()>X</button>
            <ld-badge style="width:100%; display: inline-grid"><slot></slot>{{getLatLngFormatted()}}</ld-badge>
        </div>`,
    props: [
        'marker_pos',
        'marker_name',
        'btn_type'
    ],
    data: function () { return {} },
    components: {
        'ld-badge': badgeComponent
    },
    methods: {
        getLatLngFormatted() {
            if (this.marker_pos && this.marker_pos.lat && this.marker_pos.lng) {
                return this.marker_pos.lat.toFixed(2) + ", " + this.marker_pos.lng.toFixed(2);
            }
        },
        removeData() {
            this.$emit('delete', this.marker_name);
        },
        getClass() {
            return `btn btn-${this.btn_type || 'primary'}`
        }
    }
}

const checkboxInputComponent = {
    template: `<div class="form-check">
        <input v-bind:value="value" type="checkbox" style="position: relative" class="form-check-input" :name="name" v-on:input="onInput" :id="name">
        <label v-if="label" class="form-check-label" :for="name">{{label}}</label>
    </div>`,
    props: [
        'name',
        'label',
        'value'
    ],
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value);
        }
    }
}

const textInputComponent = {
    template: `<input class="form-control ld_text_input" :class="{ld_input_invalid: enable_invalid}" :placeholder="placeholder" :name="name" :type="getType()" :value="value" v-on:input="onInput">`,
    props: [
        'value',
        'type',
        'name',
        'placeholder',
        'enable_error',
        'validator',
        'required'
    ],
    watch: {
        value: function (newVal, oldVal) {
            if (!oldVal) {
                this.onInput({ target: { value: newVal } });
            }

        },
        enable_error: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.enable_invalid = newVal && !this.valid;
            }
        }
    },
    data: function () {
        return {
            valid: false,
            validatorRegExp: null,
            enable_invalid: false
        }
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value);

            this.valid = this.isValid(event.target.value);
            if (this.enable_invalid && this.valid) {
                this.enable_invalid = false;
            }

        },
        getType() {
            return this.type ? this.type : 'text';
        },
        isValid(value = this.value) {
            let valid = true;
            if (this.required && (value == null || value === "")) {
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

const headerComponent = {
    template: `<div class="ld-header">
        <ld-button v-if="action!=null" :tooltip=tooltip v-on:click="homeClick"><span :class="getIcon()"></span></ld-button>
        <ld-button v-if="!disable_logout" style="margin-right:0; margin-left:auto" v-on:click="logout">Logout <span class="fa fa-sign-out"></span></ld-button>
    </div>`,
    props: ['action', 'tooltip', 'main_icon', 'disable_logout'],
    components: {
        'ld-button': buttonComponent
    },
    methods: {
        homeClick(event) {
            if (this.action) { location.href = this.action }
        },
        getIcon() {
            return 'fa fa-' + (this.main_icon ? this.main_icon : 'home');
        },
        logout() {
            location.href = "/auth/logout"
        }
    }
}

const dropdownComponent = {
    template: `<div class="dropdown">
        <div><ld-button v-on:click="openDropdown" btnType="secondary" class="dropdown-toggle">{{button_text || 'Apri'}}</ld-button></div>
        <br>
        <div class="ld-dropdown" v-if="toggle"><slot></slot></div>
    </div>`,
    props: ['button_text'],
    components: {
        'ld-button': buttonComponent
    },
    data: function () {
        return {
            toggle: null
        }
    },
    methods: {
        openDropdown(event) {
            this.toggle = !this.toggle ? true : false
        }
    }
}