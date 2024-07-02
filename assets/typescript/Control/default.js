import ScrollUp from './ScrollUp';

/**
 * @return {void}
 */
export function initScrollUpController() {
    const buttons = document.querySelectorAll('.js--scroll-up');
    buttons.forEach((button) => new ScrollUp(button));
}
