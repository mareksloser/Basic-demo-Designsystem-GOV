/*!
 * Element
 *
 * Version 1.0.0
 */

'use strict';

import Error from '../error/error';

class BaseElement {
  /**
   * @param {Element|HTMLElement} el
   * @throws GovError
   */
  constructor(el) {
    if (!el instanceof Element) {
      throw new Error('Element must be a instance of HTML or HTMLElement');
    }
    this._containerElement = el;
  }

}

export default BaseElement;
