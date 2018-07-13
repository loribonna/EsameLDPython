var capitalizeString = function (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
};
var formatNum = function (n) {
    return n && typeof n === 'number' ? n.toFixed(2) : 0;
};
var formatDate = function (d) {
    return d.toLocaleString();
};
var isValidDate = function (d) {
    return d && d instanceof Date && !isNaN(d.getTime());
};
var abs = function (n) {
    return n > 0 ? n : -n;
};
var getDate = function (day, time) {
    if (!day || !time) {
        return null;
    }
    var dayParts = day.split('/');
    var timeParts = time.split(':');
    if (dayParts.length == 3 && timeParts.length == 2) {
        var year = dayParts[2].length == 2 ? 2000 + Number(dayParts[2]) : Number(dayParts[2]);
        var retDate = new Date(year, Number(dayParts[1]), Number(dayParts[0]), Number(timeParts[1]), Number(timeParts[0]));
        return !isNaN(retDate.getTime()) ? retDate : null;
    }
    return null;
};
var checkDateDifference = function (start, end, maxDiff) {
    if (!maxDiff) {
        return start - end > 0;
    }
    return maxDiff <= end - start;
};
var buildQuery = function (obj) {
    var query = [];
    var _loop_1 = function (prop) {
        if (typeof obj[prop] === "string" || typeof obj[prop] === "number") {
            query.push(prop + "=" + obj[prop]);
        }
        else if (typeof obj[prop] === "object" && !Array.isArray(obj[prop])) {
            query.push.apply(query, buildQuery(obj[prop]).map(function (q) { return prop + "." + q; }));
        }
        else if (Array.isArray(obj[prop])) {
            query.push(prop + "=" + JSON.stringify(obj[prop]));
        }
    };
    for (var prop in obj) {
        _loop_1(prop);
    }
    return query;
};
var MAX_DATE_DIFF = 15 * 60 * 1000; // 15 minutes
var VALIDATORS = {
    timeValidator: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    stringValidator: /^([A-Za-z0-99À-ÿ� ,.:/';+!?|)(_\n-]*)*$/,
    telephoneValidator: /^([+]([0-9][0-9][\s])?)?([0-9]*(\s)?[0-9]*)$/,
    mailValidator: /(^$|^.*@.*\..*$)/,
    numberValidator: /^(-)?[0-9]*([.][0-9]*)?$/,
    urlValidator: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    dateWithoutYearValidator: /^[0-9]{1,2}(-|\/)?[0-9]{1,2}$/,
    objectID: /^[0-9a-fA-F]{24}$/,
    dateValidator: /^(3[01]|[12][0-9]|0?[1-9])\/(1[0-2]|0?[1-9])\/([0-9]{2}|[0-9]{4})$/
};
var DEFAULT_CENTER = [41.8931, 12.4828];
var createMarker = function (pos, className) {
    var icon = L.divIcon({
        className: '',
        iconSize: null,
        iconAnchor: ['8', '30'],
        html: "<div class='fa fa-map-marker ld-marker " + className + "'></div>"
    });
    return L.marker(pos, { icon: icon });
};
var buttonComponent = {
    template: '<button :tooltip="tooltip" v-bind:type="type" v-on:click="$emit(\'click\', $event)" :class="getClass()"><slot></slot></button>',
    props: [
        'disable',
        'type',
        'btnType',
        'tooltip'
    ],
    methods: {
        getClass: function () {
            return 'btn btn-' +
                (this.btnType ? this.btnType : 'primary') +
                (this.tooltip ? ' ld-tooltip' : '') +
                (this.disable ? 'disabled' : '');
        }
    }
};
var leafletComponent = {
    template: "<div id=\"map\" class=\"ld-map\"><slot></slot></div>",
    data: function () {
        return {
            map: null
        };
    },
    mounted: function () {
        var _this = this;
        this.map = new L.Map('map');
        L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }).addTo(this.map);
        this.map.invalidateSize();
        this.map.setView(DEFAULT_CENTER, 6);
        this.map.off('dblclick');
        this.map.on('dblclick', function (event) {
            _this.$emit('dblclick', event);
        });
    }
};
var badgeComponent = {
    template: "<span :class=\"getClass()\"><slot></slot></span>",
    props: ['color'],
    methods: {
        getClass: function () {
            return 'badge badge-' +
                (this.color ? this.color : 'light') +
                ' ld-badge';
        }
    }
};
var dividerComponent = {
    template: "<div class=\"ld-divider\"></div>"
};
var positionLabelComponent = {
    template: "\n        <div style=\"padding: 5px; display:flex; width:100%\">\n            <button v-on:click=\"removeData\" :class=getClass()>X</button>\n            <ld-badge style=\"width:100%; display: inline-grid\"><slot></slot>{{getLatLngFormatted()}}</ld-badge>\n        </div>",
    props: [
        'marker_pos',
        'marker_name',
        'btn_type'
    ],
    data: function () { return {}; },
    components: {
        'ld-badge': badgeComponent
    },
    methods: {
        getLatLngFormatted: function () {
            if (this.marker_pos && this.marker_pos.lat && this.marker_pos.lng) {
                return this.marker_pos.lat.toFixed(2) + ", " + this.marker_pos.lng.toFixed(2);
            }
        },
        removeData: function () {
            this.$emit('delete', this.marker_name);
        },
        getClass: function () {
            return "btn btn-" + (this.btn_type || 'primary');
        }
    }
};
var checkboxInputComponent = {
    template: "<div class=\"form-check\">\n        <input v-bind:value=\"value\" type=\"checkbox\" style=\"position: relative\" class=\"form-check-input\" :name=\"name\" v-on:input=\"onInput\" :id=\"name\">\n        <label v-if=\"label\" class=\"form-check-label\" :for=\"name\">{{label}}</label>\n    </div>",
    props: [
        'name',
        'label',
        'value'
    ],
    methods: {
        onInput: function (event) {
            this.$emit('input', event.target.value);
        }
    }
};
var textInputComponent = {
    template: "<input class=\"form-control ld_text_input\" :class=\"{ld_input_invalid: enable_invalid}\" :placeholder=\"placeholder\" :name=\"name\" :type=\"getType()\" :value=\"value\" v-on:input=\"onInput\">",
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
        };
    },
    methods: {
        onInput: function (event) {
            this.$emit('input', event.target.value);
            this.valid = this.isValid(event.target.value);
            if (this.enable_invalid && this.valid) {
                this.enable_invalid = false;
            }
        },
        getType: function () {
            return this.type ? this.type : 'text';
        },
        isValid: function (value) {
            if (value === void 0) { value = this.value; }
            var valid = true;
            if (this.required && (value == null || value === "")) {
                valid = false;
            }
            else if (this.validatorRegExp && !this.validatorRegExp.test(value)) {
                valid = false;
            }
            this.$emit('valid', { value: valid, name: this.name });
            return valid;
        }
    },
    mounted: function () {
        this.validatorRegExp = VALIDATORS[this.validator] || VALIDATORS.stringValidator;
        this.valid = this.isValid(this.value);
    }
};
var headerComponent = {
    template: "<div class=\"ld-header\">\n        <ld-button v-if=\"action!=null\" :tooltip=tooltip v-on:click=\"homeClick\"><span :class=\"getIcon()\"></span></ld-button>\n        <ld-button v-if=\"!disable_logout\" style=\"margin-right:0; margin-left:auto\" v-on:click=\"logout\">Logout <span class=\"fa fa-sign-out\"></span></ld-button>\n    </div>",
    props: ['action', 'tooltip', 'main_icon', 'disable_logout'],
    components: {
        'ld-button': buttonComponent
    },
    methods: {
        homeClick: function (event) {
            if (this.action) {
                location.href = this.action;
            }
        },
        getIcon: function () {
            return 'fa fa-' + (this.main_icon ? this.main_icon : 'home');
        },
        logout: function () {
            location.href = "/auth/logout";
        }
    }
};
var dropdownComponent = {
    template: "<div class=\"dropdown\">\n        <div><ld-button v-on:click=\"openDropdown\" btnType=\"secondary\" class=\"dropdown-toggle\">{{button_text || 'Apri'}}</ld-button></div>\n        <br>\n        <div class=\"ld-dropdown\" v-if=\"toggle\"><slot></slot></div>\n    </div>",
    props: ['button_text'],
    components: {
        'ld-button': buttonComponent
    },
    data: function () {
        return {
            toggle: null
        };
    },
    methods: {
        openDropdown: function (event) {
            this.toggle = !this.toggle ? true : false;
        }
    }
};
