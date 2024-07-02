/*!
 * HamburgerNav
 *
 * Version 1.0.0
 */

'use strict';

import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import { hasClass, toggleClass } from '../../helpers/utils/classie';

class HamburgerNav {

    /**
     * @param {Element} openElement
     * @param {String} navClass
     * @param {Object} options
     */
    constructor(openElement, navClass, options= {}) {
        this._openElement = openElement;
        this._navClass = navClass;

        this._defaults = {
            isOpenHamburgerClass: 'hamburger-nav__is-open',
            closeClass: 'hamburger-nav--close',
            isOpenClass: 'is-open',
            closeButtonZIndex: '10',
            topHeader: 'top-header',
            mainHeader: 'main-header'
        }

        this._options = merge({}, this._defaults, options);

        this._init();
    }

    /**
     * @return {void}
     * @private
     */
    _init() {
        this._registerListeners();
    }

    /**
     * @return {void}
     * @private
     */
    _registerListeners() {
        this._openElement.addEventListener('gov-click', this._toggleNavigation.bind(this));
        this._closeElement.addEventListener('gov-click', this._toggleNavigation.bind(this));
    }

    /**
     * @return {void}
     * @private
     */
    _toggleNavigation() {
        // Add class is-open to body
        const {isOpenHamburgerClass, isOpenClass, closeButtonZIndex} = this._options;
        toggleClass(this._bodyElement, isOpenHamburgerClass);
        toggleClass(this._navElement, isOpenClass);
        this._navElement.style.top = this._topNavElement.offsetHeight + "px";
        this._navElement.style.paddingTop = this._mainNavElement.offsetHeight + "px";

        // Set visible only for current close button and not for different menu
        if(hasClass(this._bodyElement, isOpenHamburgerClass)) {
            this._closeElement.style.zIndex = closeButtonZIndex;
        } else {
            this._closeElement.style.zIndex = 'initial';
        }

    }

    /**
     * @return {HTMLElement|null}
     * @private
     */
    get _navElement() {
        const element = document.querySelectorAll('.' + this._navClass);

        if(element.length >= 1) {
            return element[0];
        }

        return null;
    }
    /**
     * @return {HTMLElement|null}
     * @private
     */
    get _closeElement() {
        let element = null;

        const {closeClass} = this._options;
        const closeElements = document.querySelectorAll('.' + closeClass);

        closeElements.forEach((closeElement) => {
            const overflow = closeElement.getAttribute('data-overflow');

            if(overflow === this._navClass) {
                element = closeElement;
            }
        });

        return element;
    }

    /**
     * @return {HTMLBodyElement}
     * @private
     */
    get _bodyElement() {
        return document.querySelector('body');
    }

    /**
     * @return {HTMLElement}
     * @private
     */
    get _topNavElement() {
        const {topHeader} = this._options;

        return document.querySelector('.' + topHeader);
    }

    /**
     * @return {HTMLElement}
     * @private
     */
    get _mainNavElement() {
        const {mainHeader} = this._options;

        return document.querySelector('.' + mainHeader);
    }

}

export default HamburgerNav;