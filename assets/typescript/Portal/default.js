import HamburgerNav from "./HamburgerNavs/HamburgerNav";

/**
 * @return {void}
 */
export function initPortalHamburgerNavs() {

    // Top Nav
    const topNavButtons = document.querySelectorAll('.hamburger-nav.hamburger-nav--open');
    topNavButtons.forEach((button) => {
        const overflow = button.getAttribute('data-overflow');

        new HamburgerNav(button, overflow);
    });

    // Main nav
    const mainNavButtons = document.querySelectorAll('.toggleMainHeader');
    mainNavButtons.forEach((button) => {
        const overflow = button.getAttribute('data-overflow');

        if(overflow) {
            const container = document.querySelector('.' + overflow);

            if(container) { new HamburgerNav(button, container); }
        }
    });
}

/**
 * @return {void}
 */
export function destroyPortalHamburgerNavs() {

    // Top Nav

    // Main nav
}

/**
 * @return {void}
 */
export function initPortalHamburgerSearch() {

}

/**
 * @return {void}
 */
export function destroyPortalHamburgerSearch() {

}