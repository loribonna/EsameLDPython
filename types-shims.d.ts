import * as Leaflet from 'leaflet';
import { VueConstructor } from 'vue';
import * as VR from 'vue-router';

declare global {
    const L: typeof Leaflet;
    const Vue: VueConstructor;
    const VueRouter: typeof VR.default;
}
