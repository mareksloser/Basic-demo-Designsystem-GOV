const prepareClasses = (classes) => {
  if (Array.isArray(classes) === false)
    return;
  return classes
    .filter(classname => !!classname)
    .join(' ')
    .trim();
};
const slottedChildren = (host) => {
  const slotted = host.querySelector('slot');
  if (slotted) {
    return slotted.assignedNodes().filter(node => {
      return node.nodeName !== '#text';
    });
  }
  return [];
};
const booleanString = (value) => {
  return value ? 'true' : 'false';
};
const govHost = (host) => {
  return {
    get hostElement() {
      return host;
    },
    get name() {
      return this.hostElement.nodeName.toLowerCase();
    },
    hasSlot(name) {
      return !!this.getSlot(name);
    },
    isSlotEmpty(name) {
      const slot = this.getSlot(name);
      if (slot) {
        return slot.childNodes.length === 0;
      }
      return false;
    },
    getSlot(name) {
      return this.hostElement.querySelector('[slot="' + name + '"]');
    },
    getParent(element) {
      return this.hostElement.closest(element);
    },
    passChildAttr(selector, name, value) {
      if (Array.isArray(selector)) {
        selector.forEach(selector => {
          this.hostElement.querySelectorAll(selector).forEach(child => child.setAttribute(name, value));
        });
      }
      else {
        this.hostElement.querySelectorAll(selector).forEach(child => child.setAttribute(name, value));
      }
    },
    removeChildAttr(selector, name) {
      if (Array.isArray(selector)) {
        selector.forEach(selector => {
          this.hostElement.querySelectorAll(selector).forEach(child => child.removeAttribute(name));
        });
      }
      else {
        this.hostElement.querySelectorAll(selector).forEach(child => child.removeAttribute(name));
      }
    },
    get slottedChildren() {
      const slotted = this.hostElement.shadowRoot.querySelector('slot');
      if (slotted) {
        return slotted.assignedNodes().filter(node => {
          return node.nodeName !== '#text';
        });
      }
      return [];
    },
    classes(classes) {
      const clearClasses = Array.isArray(classes) ? classes.join(' ') : classes;
      if (this.hostElement) {
        return this.hostElement.classList.toString() + ' ' + clearClasses;
      }
      return clearClasses;
    },
  };
};
const toBoolAttr = (value) => {
  if (typeof value === 'string') {
    return ['true', 'True', 'TRUE', '1'].indexOf(value) !== -1 ? 'true' : 'false';
  }
  else if (typeof value === 'number') {
    return value > 0 ? 'true' : 'false';
  }
  else if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }
  else {
    return value ? 'true' : 'false';
  }
};
const toOnOffAttr = (value) => {
  if (typeof value === 'string') {
    return ['true', 'True', 'TRUE', '1', 'On', 'on', 'ON'].indexOf(value) !== -1 ? 'on' : 'off';
  }
  else if (typeof value === 'number') {
    return value > 0 ? 'on' : 'off';
  }
  else if (typeof value === 'boolean') {
    return value ? 'on' : 'off';
  }
  else {
    return value ? 'on' : 'off';
  }
};
const toBoolAttrIfDefined = (value) => {
  return typeof value === 'undefined' ? undefined : toBoolAttr(value);
};
const toOnOffAttrIfDefined = (value) => {
  return typeof value === 'undefined' ? undefined : toOnOffAttr(value);
};

export { toBoolAttr as a, booleanString as b, toOnOffAttrIfDefined as c, govHost as g, prepareClasses as p, slottedChildren as s, toBoolAttrIfDefined as t };

//# sourceMappingURL=template-df429738.js.map