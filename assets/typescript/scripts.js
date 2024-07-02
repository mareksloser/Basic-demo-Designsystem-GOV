import './helpers/utils/dom';

//import './header/toggle_top_header';
import {initScrollUpController} from "./Control/default";
import {initPortalHamburgerNavs} from "./Portal/default";


/**
 * @return {void}
 */
function initBaseComponents() {
    initScrollUpController();
    initPortalHamburgerNavs();
}

/**
 * @return {void}
 */
function reinitBaseComponents() {

}

window.reinitBaseComponents = reinitBaseComponents;
window.initBaseComponents = initBaseComponents;

initBaseComponents();
reinitBaseComponents();

function onWindowResize() {

}

onWindowResize();
window.addEventListener('resize', onWindowResize);

window.GOV_DS_CONFIG = {
    iconsPath: '../../../icons'
}