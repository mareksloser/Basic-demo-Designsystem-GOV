'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');

function toArray(objectOrArray) {
  objectOrArray = objectOrArray || [];
  return Array.isArray(objectOrArray) ? objectOrArray : [objectOrArray];
}

function log(msg) {
  return `[Vaadin.Router] ${msg}`;
}

function logValue(value) {
  if (typeof value !== 'object') {
    return String(value);
  }

  const stringType = Object.prototype.toString.call(value).match(/ (.*)\]$/)[1];
  if (stringType === 'Object' || stringType === 'Array') {
    return `${stringType} ${JSON.stringify(value)}`;
  } else {
    return stringType;
  }
}

const MODULE = 'module';
const NOMODULE = 'nomodule';
const bundleKeys = [MODULE, NOMODULE];

function ensureBundle(src) {
  if (!src.match(/.+\.[m]?js$/)) {
    throw new Error(
      log(`Unsupported type for bundle "${src}": .js or .mjs expected.`)
    );
  }
}

function ensureRoute(route) {
  if (!route || !isString(route.path)) {
    throw new Error(
      log(`Expected route config to be an object with a "path" string property, or an array of such objects`)
    );
  }

  const bundle = route.bundle;

  const stringKeys = ['component', 'redirect', 'bundle'];
  if (
    !isFunction(route.action) &&
    !Array.isArray(route.children) &&
    !isFunction(route.children) &&
    !isObject(bundle) &&
    !stringKeys.some(key => isString(route[key]))
  ) {
    throw new Error(
      log(
        `Expected route config "${route.path}" to include either "${stringKeys.join('", "')}" ` +
        `or "action" function but none found.`
      )
    );
  }

  if (bundle) {
    if (isString(bundle)) {
      ensureBundle(bundle);
    } else if (!bundleKeys.some(key => key in bundle)) {
      throw new Error(
        log('Expected route bundle to include either "' + NOMODULE + '" or "' + MODULE + '" keys, or both')
      );
    } else {
      bundleKeys.forEach(key => key in bundle && ensureBundle(bundle[key]));
    }
  }

  if (route.redirect) {
    ['bundle', 'component'].forEach(overriddenProp => {
      if (overriddenProp in route) {
        console.warn(
          log(
            `Route config "${route.path}" has both "redirect" and "${overriddenProp}" properties, ` +
            `and "redirect" will always override the latter. Did you mean to only use "${overriddenProp}"?`
          )
        );
      }
    });
  }
}

function ensureRoutes(routes) {
  toArray(routes).forEach(route => ensureRoute(route));
}

function loadScript(src, key) {
  let script = document.head.querySelector('script[src="' + src + '"][async]');
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('src', src);
    if (key === MODULE) {
      script.setAttribute('type', MODULE);
    } else if (key === NOMODULE) {
      script.setAttribute(NOMODULE, '');
    }
    script.async = true;
  }
  return new Promise((resolve, reject) => {
    script.onreadystatechange = script.onload = e => {
      script.__dynamicImportLoaded = true;
      resolve(e);
    };
    script.onerror = e => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      reject(e);
    };
    if (script.parentNode === null) {
      document.head.appendChild(script);
    } else if (script.__dynamicImportLoaded) {
      resolve();
    }
  });
}

function loadBundle(bundle) {
  if (isString(bundle)) {
    return loadScript(bundle);
  } else {
    return Promise.race(
      bundleKeys
        .filter(key => key in bundle)
        .map(key => loadScript(bundle[key], key))
    );
  }
}

function fireRouterEvent(type, detail) {
  return !window.dispatchEvent(new CustomEvent(
    `vaadin-router-${type}`,
    {cancelable: type === 'go', detail}
  ));
}

function isObject(o) {
  // guard against null passing the typeof check
  return typeof o === 'object' && !!o;
}

function isFunction(f) {
  return typeof f === 'function';
}

function isString(s) {
  return typeof s === 'string';
}

function getNotFoundError(context) {
  const error = new Error(log(`Page not found (${context.pathname})`));
  error.context = context;
  error.code = 404;
  return error;
}

const notFoundResult = new (class NotFoundResult {})();

/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */
function getAnchorOrigin(anchor) {
  // IE11: on HTTP and HTTPS the default port is not included into
  // window.location.origin, so won't include it here either.
  const port = anchor.port;
  const protocol = anchor.protocol;
  const defaultHttp = protocol === 'http:' && port === '80';
  const defaultHttps = protocol === 'https:' && port === '443';
  const host = (defaultHttp || defaultHttps)
    ? anchor.hostname // does not include the port number (e.g. www.example.org)
    : anchor.host; // does include the port number (e.g. www.example.org:80)
  return `${protocol}//${host}`;
}

// The list of checks is not complete:
//  - SVG support is missing
//  - the 'rel' attribute is not considered
function vaadinRouterGlobalClickHandler(event) {
  // ignore the click if the default action is prevented
  if (event.defaultPrevented) {
    return;
  }

  // ignore the click if not with the primary mouse button
  if (event.button !== 0) {
    return;
  }

  // ignore the click if a modifier key is pressed
  if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  // find the <a> element that the click is at (or within)
  let anchor = event.target;
  const path = event.composedPath
    ? event.composedPath()
    : (event.path || []);

  // FIXME(web-padawan): `Symbol.iterator` used by webcomponentsjs is broken for arrays
  // example to check: `for...of` loop here throws the "Not yet implemented" error
  for (let i = 0; i < path.length; i++) {
    const target = path[i];
    if (target.nodeName && target.nodeName.toLowerCase() === 'a') {
      anchor = target;
      break;
    }
  }

  while (anchor && anchor.nodeName.toLowerCase() !== 'a') {
    anchor = anchor.parentNode;
  }

  // ignore the click if not at an <a> element
  if (!anchor || anchor.nodeName.toLowerCase() !== 'a') {
    return;
  }

  // ignore the click if the <a> element has a non-default target
  if (anchor.target && anchor.target.toLowerCase() !== '_self') {
    return;
  }

  // ignore the click if the <a> element has the 'download' attribute
  if (anchor.hasAttribute('download')) {
    return;
  }

  // ignore the click if the <a> element has the 'router-ignore' attribute
  if (anchor.hasAttribute('router-ignore')) {
    return;
  }

  // ignore the click if the target URL is a fragment on the current page
  if (anchor.pathname === window.location.pathname && anchor.hash !== '') {
    return;
  }

  // ignore the click if the target is external to the app
  // In IE11 HTMLAnchorElement does not have the `origin` property
  const origin = anchor.origin || getAnchorOrigin(anchor);
  if (origin !== window.location.origin) {
    return;
  }

  // if none of the above, convert the click into a navigation event
  const {pathname, search, hash} = anchor;
  if (fireRouterEvent('go', {pathname, search, hash})) {
    event.preventDefault();
    // for a click event, the scroll is reset to the top position.
    if (event && event.type === 'click') {
      window.scrollTo(0, 0);
    }
  }
}

/**
 * A navigation trigger for Vaadin Router that translated clicks on `<a>` links
 * into Vaadin Router navigation events.
 *
 * Only regular clicks on in-app links are translated (primary mouse button, no
 * modifier keys, the target href is within the app's URL space).
 *
 * @memberOf Router.NavigationTrigger
 * @type {NavigationTrigger}
 */
const CLICK = {
  activate() {
    window.document.addEventListener('click', vaadinRouterGlobalClickHandler);
  },

  inactivate() {
    window.document.removeEventListener('click', vaadinRouterGlobalClickHandler);
  }
};

// PopStateEvent constructor shim
const isIE = /Trident/.test(navigator.userAgent);

/* istanbul ignore next: coverage is calculated in Chrome, this code is for IE */
if (isIE && !isFunction(window.PopStateEvent)) {
  window.PopStateEvent = function(inType, params) {
    params = params || {};
    var e = document.createEvent('Event');
    e.initEvent(inType, Boolean(params.bubbles), Boolean(params.cancelable));
    e.state = params.state || null;
    return e;
  };
  window.PopStateEvent.prototype = window.Event.prototype;
}

function vaadinRouterGlobalPopstateHandler(event) {
  if (event.state === 'vaadin-router-ignore') {
    return;
  }
  const {pathname, search, hash} = window.location;
  fireRouterEvent('go', {pathname, search, hash});
}

/**
 * A navigation trigger for Vaadin Router that translates popstate events into
 * Vaadin Router navigation events.
 *
 * @memberOf Router.NavigationTrigger
 * @type {NavigationTrigger}
 */
const POPSTATE = {
  activate() {
    window.addEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  },

  inactivate() {
    window.removeEventListener('popstate', vaadinRouterGlobalPopstateHandler);
  }
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/';
var DEFAULT_DELIMITERS = './';

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
  // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER;
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue
    }

    var prev = '';
    var next = str[index];
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k];
        path = path.slice(0, k);
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var partial = prev !== '' && next !== undefined && next !== prev;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = prev || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (data, options) {
    var path = '';
    var encode = (options && options.encode) || encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j], token);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value), token);

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment;
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix;

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      });
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {};

  var strict = options.strict;
  var start = options.start !== false;
  var end = options.end !== false;
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
  var delimiters = options.delimiters || DEFAULT_DELIMITERS;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = start ? '^' : '';
  var isEndDelimited = tokens.length === 0;

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
    } else {
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
        : token.pattern;

      if (keys) keys.push(token);

      if (token.optional) {
        if (token.partial) {
          route += escapeString(token.prefix) + '(' + capture + ')?';
        } else {
          route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';
        }
      } else {
        route += escapeString(token.prefix) + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?';

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?';
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')';
  }

  return new RegExp(route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {hasOwnProperty} = Object.prototype;
const cache = new Map();
// see https://github.com/pillarjs/path-to-regexp/issues/148
cache.set('|false', {
  keys: [],
  pattern: /(?:)/
});

function decodeParam(val) {
  try {
    return decodeURIComponent(val);
  } catch (err) {
    return val;
  }
}

function matchPath(routepath, path, exact, parentKeys, parentParams) {
  exact = !!exact;
  const cacheKey = `${routepath}|${exact}`;
  let regexp = cache.get(cacheKey);

  if (!regexp) {
    const keys = [];
    regexp = {
      keys,
      pattern: pathToRegexp_1(routepath, keys, {
        end: exact,
        strict: routepath === ''
      }),
    };
    cache.set(cacheKey, regexp);
  }

  const m = regexp.pattern.exec(path);
  if (!m) {
    return null;
  }

  const params = Object.assign({}, parentParams);

  for (let i = 1; i < m.length; i++) {
    const key = regexp.keys[i - 1];
    const prop = key.name;
    const value = m[i];
    if (value !== undefined || !hasOwnProperty.call(params, prop)) {
      if (key.repeat) {
        params[prop] = value ? value.split(key.delimiter).map(decodeParam) : [];
      } else {
        params[prop] = value ? decodeParam(value) : value;
      }
    }
  }

  return {
    path: m[0],
    keys: (parentKeys || []).concat(regexp.keys),
    params,
  };
}

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Traverses the routes tree and matches its nodes to the given pathname from
 * the root down to the leaves. Each match consumes a part of the pathname and
 * the matching process continues for as long as there is a matching child
 * route for the remaining part of the pathname.
 *
 * The returned value is a lazily evaluated iterator.
 *
 * The leading "/" in a route path matters only for the root of the routes
 * tree (or if all parent routes are ""). In all other cases a leading "/" in
 * a child route path has no significance.
 *
 * The trailing "/" in a _route path_ matters only for the leaves of the
 * routes tree. A leaf route with a trailing "/" matches only a pathname that
 * also has a trailing "/".
 *
 * The trailing "/" in a route path does not affect matching of child routes
 * in any way.
 *
 * The trailing "/" in a _pathname_ generally does not matter (except for
 * the case of leaf nodes described above).
 *
 * The "" and "/" routes have special treatment:
 *  1. as a single route
 *     the "" and "/" routes match only the "" and "/" pathnames respectively
 *  2. as a parent in the routes tree
 *     the "" route matches any pathname without consuming any part of it
 *     the "/" route matches any absolute pathname consuming its leading "/"
 *  3. as a leaf in the routes tree
 *     the "" and "/" routes match only if the entire pathname is consumed by
 *         the parent routes chain. In this case "" and "/" are equivalent.
 *  4. several directly nested "" or "/" routes
 *     - directly nested "" or "/" routes are 'squashed' (i.e. nesting two
 *       "/" routes does not require a double "/" in the pathname to match)
 *     - if there are only "" in the parent routes chain, no part of the
 *       pathname is consumed, and the leading "/" in the child routes' paths
 *       remains significant
 *
 * Side effect:
 *   - the routes tree { path: '' } matches only the '' pathname
 *   - the routes tree { path: '', children: [ { path: '' } ] } matches any
 *     pathname (for the tree root)
 *
 * Prefix matching can be enabled also by `children: true`.
 */
function matchRoute(route, pathname, ignoreLeadingSlash, parentKeys, parentParams) {
  let match;
  let childMatches;
  let childIndex = 0;
  let routepath = route.path || '';
  if (routepath.charAt(0) === '/') {
    if (ignoreLeadingSlash) {
      routepath = routepath.substr(1);
    }
    ignoreLeadingSlash = true;
  }

  return {
    next(routeToSkip) {
      if (route === routeToSkip) {
        return {done: true};
      }

      const children = route.__children = route.__children || route.children;

      if (!match) {
        match = matchPath(routepath, pathname, !children, parentKeys, parentParams);

        if (match) {
          return {
            done: false,
            value: {
              route,
              keys: match.keys,
              params: match.params,
              path: match.path
            },
          };
        }
      }

      if (match && children) {
        while (childIndex < children.length) {
          if (!childMatches) {
            const childRoute = children[childIndex];
            childRoute.parent = route;

            let matchedLength = match.path.length;
            if (matchedLength > 0 && pathname.charAt(matchedLength) === '/') {
              matchedLength += 1;
            }

            childMatches = matchRoute(
              childRoute,
              pathname.substr(matchedLength),
              ignoreLeadingSlash,
              match.keys,
              match.params
            );
          }

          const childMatch = childMatches.next(routeToSkip);
          if (!childMatch.done) {
            return {
              done: false,
              value: childMatch.value,
            };
          }

          childMatches = null;
          childIndex++;
        }
      }

      return {done: true};
    },
  };
}

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function resolveRoute(context) {
  if (isFunction(context.route.action)) {
    return context.route.action(context);
  }
  return undefined;
}

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function isChildRoute(parentRoute, childRoute) {
  let route = childRoute;
  while (route) {
    route = route.parent;
    if (route === parentRoute) {
      return true;
    }
  }
  return false;
}

function generateErrorMessage(currentContext) {
  let errorMessage = `Path '${currentContext.pathname}' is not properly resolved due to an error.`;
  const routePath = (currentContext.route || {}).path;
  if (routePath) {
    errorMessage += ` Resolution had failed on route: '${routePath}'`;
  }
  return errorMessage;
}

function updateChainForRoute(context, match) {
  const {route, path} = match;

  if (route && !route.__synthetic) {
    const item = {path, route};
    if (!context.chain) {
      context.chain = [];
    } else {
      // Discard old items
      if (route.parent) {
        let i = context.chain.length;
        while (i-- && context.chain[i].route && context.chain[i].route !== route.parent) {
          context.chain.pop();
        }
      }
    }
    context.chain.push(item);
  }
}

/**
 */
class Resolver {
  constructor(routes, options = {}) {
    if (Object(routes) !== routes) {
      throw new TypeError('Invalid routes');
    }

    this.baseUrl = options.baseUrl || '';
    this.errorHandler = options.errorHandler;
    this.resolveRoute = options.resolveRoute || resolveRoute;
    this.context = Object.assign({resolver: this}, options.context);
    this.root = Array.isArray(routes) ? {path: '', __children: routes, parent: null, __synthetic: true} : routes;
    this.root.parent = null;
  }

  /**
   * Returns the current list of routes (as a shallow copy). Adding / removing
   * routes to / from the returned array does not affect the routing config,
   * but modifying the route objects does.
   *
   * @return {!Array<!Router.Route>}
   */
  getRoutes() {
    return [...this.root.__children];
  }

  /**
   * Sets the routing config (replacing the existing one).
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   */
  setRoutes(routes) {
    ensureRoutes(routes);
    const newRoutes = [...toArray(routes)];
    this.root.__children = newRoutes;
  }

  /**
   * Appends one or several routes to the routing config and returns the
   * effective routing config after the operation.
   *
   * @param {!Array<!Router.Route>|!Router.Route} routes a single route or an array of those
   *    (the array is shallow copied)
   * @return {!Array<!Router.Route>}
   * @protected
   */
  addRoutes(routes) {
    ensureRoutes(routes);
    this.root.__children.push(...toArray(routes));
    return this.getRoutes();
  }

  /**
   * Removes all existing routes from the routing config.
   */
  removeRoutes() {
    this.setRoutes([]);
  }

  /**
   * Asynchronously resolves the given pathname, i.e. finds all routes matching
   * the pathname and tries resolving them one after another in the order they
   * are listed in the routes config until the first non-null result.
   *
   * Returns a promise that is fulfilled with the return value of an object that consists of the first
   * route handler result that returns something other than `null` or `undefined` and context used to get this result.
   *
   * If no route handlers return a non-null result, or if no route matches the
   * given pathname the returned promise is rejected with a 'page not found'
   * `Error`.
   *
   * @param {!string|!{pathname: !string}} pathnameOrContext the pathname to
   *    resolve or a context object with a `pathname` property and other
   *    properties to pass to the route resolver functions.
   * @return {!Promise<any>}
   */
  resolve(pathnameOrContext) {
    const context = Object.assign(
      {},
      this.context,
      isString(pathnameOrContext) ? {pathname: pathnameOrContext} : pathnameOrContext
    );
    const match = matchRoute(
      this.root,
      this.__normalizePathname(context.pathname),
      this.baseUrl
    );
    const resolve = this.resolveRoute;
    let matches = null;
    let nextMatches = null;
    let currentContext = context;

    function next(resume, parent = matches.value.route, prevResult) {
      const routeToSkip = prevResult === null && matches.value.route;
      matches = nextMatches || match.next(routeToSkip);
      nextMatches = null;

      if (!resume) {
        if (matches.done || !isChildRoute(parent, matches.value.route)) {
          nextMatches = matches;
          return Promise.resolve(notFoundResult);
        }
      }

      if (matches.done) {
        return Promise.reject(getNotFoundError(context));
      }

      currentContext = Object.assign(
        currentContext
          ? {chain: (currentContext.chain ? currentContext.chain.slice(0) : [])}
          : {},
        context,
        matches.value
      );
      updateChainForRoute(currentContext, matches.value);

      return Promise.resolve(resolve(currentContext)).then(resolution => {
        if (resolution !== null && resolution !== undefined && resolution !== notFoundResult) {
          currentContext.result = resolution.result || resolution;
          return currentContext;
        }
        return next(resume, parent, resolution);
      });
    }

    context.next = next;

    return Promise.resolve()
      .then(() => next(true, this.root))
      .catch((error) => {
        const errorMessage = generateErrorMessage(currentContext);
        if (!error) {
          error = new Error(errorMessage);
        } else {
          console.warn(errorMessage);
        }
        error.context = error.context || currentContext;
        // DOMException has its own code which is read-only
        if (!(error instanceof DOMException)) {
          error.code = error.code || 500;
        }
        if (this.errorHandler) {
          currentContext.result = this.errorHandler(error);
          return currentContext;
        }
        throw error;
      });
  }

  /**
   * URL constructor polyfill hook. Creates and returns an URL instance.
   */
  static __createUrl(url, base) {
    return new URL(url, base);
  }

  /**
   * If the baseUrl property is set, transforms the baseUrl and returns the full
   * actual `base` string for using in the `new URL(path, base);` and for
   * prepernding the paths with. The returned base ends with a trailing slash.
   *
   * Otherwise, returns empty string.
   */
  get __effectiveBaseUrl() {
    return this.baseUrl
      ? this.constructor.__createUrl(
        this.baseUrl,
        document.baseURI || document.URL
      ).href.replace(/[^\/]*$/, '')
      : '';
  }

  /**
   * If the baseUrl is set, matches the pathname with the router’s baseUrl,
   * and returns the local pathname with the baseUrl stripped out.
   *
   * If the pathname does not match the baseUrl, returns undefined.
   *
   * If the `baseUrl` is not set, returns the unmodified pathname argument.
   */
  __normalizePathname(pathname) {
    if (!this.baseUrl) {
      // No base URL, no need to transform the pathname.
      return pathname;
    }

    const base = this.__effectiveBaseUrl;
    const normalizedUrl = this.constructor.__createUrl(pathname, base).href;
    if (normalizedUrl.slice(0, base.length) === base) {
      return normalizedUrl.slice(base.length);
    }
  }
}

Resolver.pathToRegexp = pathToRegexp_1;

/**
 * Universal Router (https://www.kriasoft.com/universal-router/)
 *
 * Copyright (c) 2015-present Kriasoft.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const {pathToRegexp: pathToRegexp$1} = Resolver;
const cache$1 = new Map();

function cacheRoutes(routesByName, route, routes) {
  const name = route.name || route.component;
  if (name) {
    if (routesByName.has(name)) {
      routesByName.get(name).push(route);
    } else {
      routesByName.set(name, [route]);
    }
  }

  if (Array.isArray(routes)) {
    for (let i = 0; i < routes.length; i++) {
      const childRoute = routes[i];
      childRoute.parent = route;
      cacheRoutes(routesByName, childRoute, childRoute.__children || childRoute.children);
    }
  }
}

function getRouteByName(routesByName, routeName) {
  const routes = routesByName.get(routeName);
  if (routes && routes.length > 1) {
    throw new Error(
      `Duplicate route with name "${routeName}".`
      + ` Try seting unique 'name' route properties.`
    );
  }
  return routes && routes[0];
}

function getRoutePath(route) {
  let path = route.path;
  path = Array.isArray(path) ? path[0] : path;
  return path !== undefined ? path : '';
}

function generateUrls(router, options = {}) {
  if (!(router instanceof Resolver)) {
    throw new TypeError('An instance of Resolver is expected');
  }

  const routesByName = new Map();

  return (routeName, params) => {
    let route = getRouteByName(routesByName, routeName);
    if (!route) {
      routesByName.clear(); // clear cache
      cacheRoutes(routesByName, router.root, router.root.__children);

      route = getRouteByName(routesByName, routeName);
      if (!route) {
        throw new Error(`Route "${routeName}" not found`);
      }
    }

    let regexp = cache$1.get(route.fullPath);
    if (!regexp) {
      let fullPath = getRoutePath(route);
      let rt = route.parent;
      while (rt) {
        const path = getRoutePath(rt);
        if (path) {
          fullPath = path.replace(/\/$/, '') + '/' + fullPath.replace(/^\//, '');
        }
        rt = rt.parent;
      }
      const tokens = pathToRegexp$1.parse(fullPath);
      const toPath = pathToRegexp$1.tokensToFunction(tokens);
      const keys = Object.create(null);
      for (let i = 0; i < tokens.length; i++) {
        if (!isString(tokens[i])) {
          keys[tokens[i].name] = true;
        }
      }
      regexp = {toPath, keys};
      cache$1.set(fullPath, regexp);
      route.fullPath = fullPath;
    }

    let url = regexp.toPath(params, options) || '/';

    if (options.stringifyQueryParams && params) {
      const queryParams = {};
      const keys = Object.keys(params);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!regexp.keys[key]) {
          queryParams[key] = params[key];
        }
      }
      const query = options.stringifyQueryParams(queryParams);
      if (query) {
        url += query.charAt(0) === '?' ? query : `?${query}`;
      }
    }

    return url;
  };
}

/**
 * @typedef NavigationTrigger
 * @type {object}
 * @property {function()} activate
 * @property {function()} inactivate
 */

/** @type {Array<NavigationTrigger>} */
let triggers = [];

function setNavigationTriggers(newTriggers) {
  triggers.forEach(trigger => trigger.inactivate());

  newTriggers.forEach(trigger => trigger.activate());

  triggers = newTriggers;
}

const willAnimate = elem => {
  const name = getComputedStyle(elem).getPropertyValue('animation-name');
  return name && name !== 'none';
};

const waitForAnimation = (elem, cb) => {
  const listener = () => {
    elem.removeEventListener('animationend', listener);
    cb();
  };
  elem.addEventListener('animationend', listener);
};

function animate(elem, className) {
  elem.classList.add(className);

  return new Promise(resolve => {
    if (willAnimate(elem)) {
      const rect = elem.getBoundingClientRect();
      const size = `height: ${rect.bottom - rect.top}px; width: ${rect.right - rect.left}px`;
      elem.setAttribute('style', `position: absolute; ${size}`);
      waitForAnimation(elem, () => {
        elem.classList.remove(className);
        elem.removeAttribute('style');
        resolve();
      });
    } else {
      elem.classList.remove(className);
      resolve();
    }
  });
}

const MAX_REDIRECT_COUNT = 256;

function isResultNotEmpty(result) {
  return result !== null && result !== undefined;
}

function copyContextWithoutNext(context) {
  const copy = Object.assign({}, context);
  delete copy.next;
  return copy;
}

function createLocation({pathname = '', search = '', hash = '', chain = [], params = {}, redirectFrom, resolver}, route) {
  const routes = chain.map(item => item.route);
  return {
    baseUrl: resolver && resolver.baseUrl || '',
    pathname,
    search,
    hash,
    routes,
    route: route || routes.length && routes[routes.length - 1] || null,
    params,
    redirectFrom,
    getUrl: (userParams = {}) => getPathnameForRouter(
      Router.pathToRegexp.compile(
        getMatchedPath(routes)
      )(Object.assign({}, params, userParams)),
      resolver
    )
  };
}

function createRedirect(context, pathname) {
  const params = Object.assign({}, context.params);
  return {
    redirect: {
      pathname,
      from: context.pathname,
      params
    }
  };
}

function renderElement(context, element) {
  element.location = createLocation(context);
  const index = context.chain.map(item => item.route).indexOf(context.route);
  context.chain[index].element = element;
  return element;
}

function runCallbackIfPossible(callback, args, thisArg) {
  if (isFunction(callback)) {
    return callback.apply(thisArg, args);
  }
}

function amend(amendmentFunction, args, element) {
  return amendmentResult => {
    if (amendmentResult && (amendmentResult.cancel || amendmentResult.redirect)) {
      return amendmentResult;
    }

    if (element) {
      return runCallbackIfPossible(element[amendmentFunction], args, element);
    }
  };
}

function processNewChildren(newChildren, route) {
  if (!Array.isArray(newChildren) && !isObject(newChildren)) {
    throw new Error(
      log(
        `Incorrect "children" value for the route ${route.path}: expected array or object, but got ${newChildren}`
      )
    );
  }

  route.__children = [];
  const childRoutes = toArray(newChildren);
  for (let i = 0; i < childRoutes.length; i++) {
    ensureRoute(childRoutes[i]);
    route.__children.push(childRoutes[i]);
  }
}

function removeDomNodes(nodes) {
  if (nodes && nodes.length) {
    const parent = nodes[0].parentNode;
    for (let i = 0; i < nodes.length; i++) {
      parent.removeChild(nodes[i]);
    }
  }
}

function getPathnameForRouter(pathname, router) {
  const base = router.__effectiveBaseUrl;
  return base
    ? router.constructor.__createUrl(pathname.replace(/^\//, ''), base).pathname
    : pathname;
}

function getMatchedPath(chain) {
  return chain.map(item => item.path).reduce((a, b) => {
    if (b.length) {
      return a.replace(/\/$/, '') + '/' + b.replace(/^\//, '');
    }
    return a;
  }, '');
}

/**
 * A simple client-side router for single-page applications. It uses
 * express-style middleware and has a first-class support for Web Components and
 * lazy-loading. Works great in Polymer and non-Polymer apps.
 *
 * Use `new Router(outlet, options)` to create a new Router instance.
 *
 * * The `outlet` parameter is a reference to the DOM node to render
 *   the content into.
 *
 * * The `options` parameter is an optional object with options. The following
 *   keys are supported:
 *   * `baseUrl` — the initial value for [
 *     the `baseUrl` property
 *   ](#/classes/Router#property-baseUrl)
 *
 * The Router instance is automatically subscribed to navigation events
 * on `window`.
 *
 * See [Live Examples](#/classes/Router/demos/demo/index.html) for the detailed usage demo and code snippets.
 *
 * See also detailed API docs for the following methods, for the advanced usage:
 *
 * * [setOutlet](#/classes/Router#method-setOutlet) – should be used to configure the outlet.
 * * [setTriggers](#/classes/Router#method-setTriggers) – should be used to configure the navigation events.
 * * [setRoutes](#/classes/Router#method-setRoutes) – should be used to configure the routes.
 *
 * Only `setRoutes` has to be called manually, others are automatically invoked when creating a new instance.
 *
 * @extends Resolver
 * @demo demo/index.html
 * @summary JavaScript class that renders different DOM content depending on
 *    a given path. It can re-render when triggered or automatically on
 *    'popstate' and / or 'click' events.
 */
class Router extends Resolver {

  /**
   * Creates a new Router instance with a given outlet, and
   * automatically subscribes it to navigation events on the `window`.
   * Using a constructor argument or a setter for outlet is equivalent:
   *
   * ```
   * const router = new Router();
   * router.setOutlet(outlet);
   * ```
   * @param {?Node=} outlet
   * @param {?RouterOptions=} options
   */
  constructor(outlet, options) {
    const baseElement = document.head.querySelector('base');
    const baseHref = baseElement && baseElement.getAttribute('href');
    super([], Object.assign({
      // Default options
      baseUrl: baseHref && Resolver.__createUrl(baseHref, document.URL).pathname.replace(/[^\/]*$/, '')
    }, options));

    this.resolveRoute = context => this.__resolveRoute(context);

    const triggers = Router.NavigationTrigger;
    Router.setTriggers.apply(Router, Object.keys(triggers).map(key => triggers[key]));
    this.ready = Promise.resolve(outlet);
    this.location = createLocation({resolver: this});

    this.__lastStartedRenderId = 0;
    this.__navigationEventHandler = this.__onNavigationEvent.bind(this);
    this.setOutlet(outlet);
    this.subscribe();
    // Using WeakMap instead of WeakSet because WeakSet is not supported by IE11
    this.__createdByRouter = new WeakMap();
    this.__addedByRouter = new WeakMap();
  }

  __resolveRoute(context) {
    const route = context.route;

    let callbacks = Promise.resolve();

    if (isFunction(route.children)) {
      callbacks = callbacks
        .then(() => route.children(copyContextWithoutNext(context)))
        .then(children => {
          // The route.children() callback might have re-written the
          // route.children property instead of returning a value
          if (!isResultNotEmpty(children) && !isFunction(route.children)) {
            children = route.children;
          }
          processNewChildren(children, route);
        });
    }

    const commands = {
      redirect: path => createRedirect(context, path),
      component: (component) => {
        const element = document.createElement(component);
        this.__createdByRouter.set(element, true);
        return element;
      }
    };

    return callbacks
      .then(() => {
        if (this.__isLatestRender(context)) {
          return runCallbackIfPossible(route.action, [context, commands], route);
        }
      })
      .then(result => {
        if (isResultNotEmpty(result)) {
          // Actions like `() => import('my-view.js')` are not expected to
          // end the resolution, despite the result is not empty. Checking
          // the result with a whitelist of values that end the resolution.
          if (result instanceof HTMLElement ||
              result.redirect ||
              result === notFoundResult) {
            return result;
          }
        }

        if (isString(route.redirect)) {
          return commands.redirect(route.redirect);
        }

        if (route.bundle) {
          return loadBundle(route.bundle)
            .then(() => {}, () => {
              throw new Error(log(`Bundle not found: ${route.bundle}. Check if the file name is correct`));
            });
        }
      })
      .then(result => {
        if (isResultNotEmpty(result)) {
          return result;
        }
        if (isString(route.component)) {
          return commands.component(route.component);
        }
      });
  }

  /**
   * Sets the router outlet (the DOM node where the content for the current
   * route is inserted). Any content pre-existing in the router outlet is
   * removed at the end of each render pass.
   *
   * NOTE: this method is automatically invoked first time when creating a new Router instance.
   *
   * @param {?Node} outlet the DOM node where the content for the current route
   *     is inserted.
   */
  setOutlet(outlet) {
    if (outlet) {
      this.__ensureOutlet(outlet);
    }
    this.__outlet = outlet;
  }

  /**
   * Returns the current router outlet. The initial value is `undefined`.
   *
   * @return {?Node} the current router outlet (or `undefined`)
   */
  getOutlet() {
    return this.__outlet;
  }

  /**
   * Sets the routing config (replacing the existing one) and triggers a
   * navigation event so that the router outlet is refreshed according to the
   * current `window.location` and the new routing config.
   *
   * Each route object may have the following properties, listed here in the processing order:
   * * `path` – the route path (relative to the parent route if any) in the
   * [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   *
   * * `children` – an array of nested routes or a function that provides this
   * array at the render time. The function can be synchronous or asynchronous:
   * in the latter case the render is delayed until the returned promise is
   * resolved. The `children` function is executed every time when this route is
   * being rendered. This allows for dynamic route structures (e.g. backend-defined),
   * but it might have a performance impact as well. In order to avoid calling
   * the function on subsequent renders, you can override the `children` property
   * of the route object and save the calculated array there
   * (via `context.route.children = [ route1, route2, ...];`).
   * Parent routes are fully resolved before resolving the children. Children
   * 'path' values are relative to the parent ones.
   *
   * * `action` – the action that is executed before the route is resolved.
   * The value for this property should be a function, accepting `context`
   * and `commands` parameters described below. If present, this function is
   * always invoked first, disregarding of the other properties' presence.
   * The action can return a result directly or within a `Promise`, which
   * resolves to the result. If the action result is an `HTMLElement` instance,
   * a `commands.component(name)` result, a `commands.redirect(path)` result,
   * or a `context.next()` result, the current route resolution is finished,
   * and other route config properties are ignored.
   * See also **Route Actions** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `redirect` – other route's path to redirect to. Passes all route parameters to the redirect target.
   * The target route should also be defined.
   * See also **Redirects** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `bundle` – string containing the path to `.js` or `.mjs` bundle to load before resolving the route,
   * or the object with "module" and "nomodule" keys referring to different bundles.
   * Each bundle is only loaded once. If "module" and "nomodule" are set, only one bundle is loaded,
   * depending on whether the browser supports ES modules or not.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * Any error, e.g. 404 while loading bundle will cause route resolution to throw.
   * See also **Code Splitting** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * * `component` – the tag name of the Web Component to resolve the route to.
   * The property is ignored when either an `action` returns the result or `redirect` property is present.
   * If route contains the `component` property (or an action that return a component)
   * and its child route also contains the `component` property, child route's component
   * will be rendered as a light dom child of a parent component.
   *
   * * `name` – the string name of the route to use in the
   * [`router.urlForName(name, params)`](#/classes/Router#method-urlForName)
   * navigation helper method.
   *
   * For any route function (`action`, `children`) defined, the corresponding `route` object is available inside the callback
   * through the `this` reference. If you need to access it, make sure you define the callback as a non-arrow function
   * because arrow functions do not have their own `this` reference.
   *
   * `context` object that is passed to `action` function holds the following properties:
   * * `context.pathname` – string with the pathname being resolved
   *
   * * `context.search` – search query string
   *
   * * `context.hash` – hash string
   *
   * * `context.params` – object with route parameters
   *
   * * `context.route` – object that holds the route that is currently being rendered.
   *
   * * `context.next()` – function for asynchronously getting the next route
   * contents from the resolution chain (if any)
   *
   * `commands` object that is passed to `action` function has
   * the following methods:
   *
   * * `commands.redirect(path)` – function that creates a redirect data
   * for the path specified.
   *
   * * `commands.component(component)` – function that creates a new HTMLElement
   * with current context. Note: the component created by this function is reused if visiting the same path twice in row.
   *
   *
   * @param {!Array<!Route>|!Route} routes a single route or an array of those
   * @param {?boolean} skipRender configure the router but skip rendering the
   *     route corresponding to the current `window.location` values
   *
   * @return {!Promise<!Node>}
   */
  setRoutes(routes, skipRender = false) {
    this.__previousContext = undefined;
    this.__urlForName = undefined;
    super.setRoutes(routes);
    if (!skipRender) {
      this.__onNavigationEvent();
    }
    return this.ready;
  }

  /**
   * Asynchronously resolves the given pathname and renders the resolved route
   * component into the router outlet. If no router outlet is set at the time of
   * calling this method, or at the time when the route resolution is completed,
   * a `TypeError` is thrown.
   *
   * Returns a promise that is fulfilled with the router outlet DOM Node after
   * the route component is created and inserted into the router outlet, or
   * rejected if no route matches the given path.
   *
   * If another render pass is started before the previous one is completed, the
   * result of the previous render pass is ignored.
   *
   * @param {!string|!{pathname: !string, search: ?string, hash: ?string}} pathnameOrContext
   *    the pathname to render or a context object with a `pathname` property,
   *    optional `search` and `hash` properties, and other properties
   *    to pass to the resolver.
   * @param {boolean=} shouldUpdateHistory
   *    update browser history with the rendered location
   * @return {!Promise<!Node>}
   */
  render(pathnameOrContext, shouldUpdateHistory) {
    const renderId = ++this.__lastStartedRenderId;
    const context = Object.assign(
      {
        search: '',
        hash: ''
      },
      isString(pathnameOrContext)
        ? {pathname: pathnameOrContext}
        : pathnameOrContext,
      {
        __renderId: renderId
      }
    );

    // Find the first route that resolves to a non-empty result
    this.ready = this.resolve(context)

      // Process the result of this.resolve() and handle all special commands:
      // (redirect / prevent / component). If the result is a 'component',
      // then go deeper and build the entire chain of nested components matching
      // the pathname. Also call all 'on before' callbacks along the way.
      .then(context => this.__fullyResolveChain(context))

      .then(context => {
        if (this.__isLatestRender(context)) {
          const previousContext = this.__previousContext;

          // Check if the render was prevented and make an early return in that case
          if (context === previousContext) {
            // Replace the history with the previous context
            // to make sure the URL stays the same.
            this.__updateBrowserHistory(previousContext, true);
            return this.location;
          }

          this.location = createLocation(context);

          if (shouldUpdateHistory) {
            // Replace only if first render redirects, so that we don’t leave
            // the redirecting record in the history
            this.__updateBrowserHistory(context, renderId === 1);
          }

          fireRouterEvent('location-changed', {router: this, location: this.location});

          // Skip detaching/re-attaching there are no render changes
          if (context.__skipAttach) {
            this.__copyUnchangedElements(context, previousContext);
            this.__previousContext = context;
            return this.location;
          }

          this.__addAppearingContent(context, previousContext);
          const animationDone = this.__animateIfNeeded(context);

          this.__runOnAfterEnterCallbacks(context);
          this.__runOnAfterLeaveCallbacks(context, previousContext);

          return animationDone.then(() => {
            if (this.__isLatestRender(context)) {
              // If there is another render pass started after this one,
              // the 'disappearing content' would be removed when the other
              // render pass calls `this.__addAppearingContent()`
              this.__removeDisappearingContent();

              this.__previousContext = context;
              return this.location;
            }
          });
        }
      })
      .catch(error => {
        if (renderId === this.__lastStartedRenderId) {
          if (shouldUpdateHistory) {
            this.__updateBrowserHistory(context);
          }
          removeDomNodes(this.__outlet && this.__outlet.children);
          this.location = createLocation(Object.assign(context, {resolver: this}));
          fireRouterEvent('error', Object.assign({router: this, error}, context));
          throw error;
        }
      });
    return this.ready;
  }

  // `topOfTheChainContextBeforeRedirects` is a context coming from Resolver.resolve().
  // It would contain a 'redirect' route or the first 'component' route that
  // matched the pathname. There might be more child 'component' routes to be
  // resolved and added into the chain. This method would find and add them.
  // `contextBeforeRedirects` is the context containing such a child component
  // route. It's only necessary when this method is called recursively (otherwise
  // it's the same as the 'top of the chain' context).
  //
  // Apart from building the chain of child components, this method would also
  // handle 'redirect' routes, call 'onBefore' callbacks and handle 'prevent'
  // and 'redirect' callback results.
  __fullyResolveChain(topOfTheChainContextBeforeRedirects,
    contextBeforeRedirects = topOfTheChainContextBeforeRedirects) {
    return this.__findComponentContextAfterAllRedirects(contextBeforeRedirects)
      // `contextAfterRedirects` is always a context with an `HTMLElement` result
      // In other cases the promise gets rejected and .then() is not called
      .then(contextAfterRedirects => {
        const redirectsHappened = contextAfterRedirects !== contextBeforeRedirects;
        const topOfTheChainContextAfterRedirects =
          redirectsHappened ? contextAfterRedirects : topOfTheChainContextBeforeRedirects;

        const matchedPath = getPathnameForRouter(
          getMatchedPath(contextAfterRedirects.chain),
          contextAfterRedirects.resolver
        );
        const isFound = (matchedPath === contextAfterRedirects.pathname);

        // Recursive method to try matching more child and sibling routes
        const findNextContextIfAny = (context, parent = context.route, prevResult) => {
          return context.next(undefined, parent, prevResult).then(nextContext => {
            if (nextContext === null || nextContext === notFoundResult) {
              // Next context is not found in children, ...
              if (isFound) {
                // ...but original context is already fully matching - use it
                return context;
              } else if (parent.parent !== null) {
                // ...and there is no full match yet - step up to check siblings
                return findNextContextIfAny(context, parent.parent, nextContext);
              } else {
                return nextContext;
              }
            }

            return nextContext;
          });
        };

        return findNextContextIfAny(contextAfterRedirects).then(nextContext => {
          if (nextContext === null || nextContext === notFoundResult) {
            throw getNotFoundError(topOfTheChainContextAfterRedirects);
          }

          return nextContext
          && nextContext !== notFoundResult
          && nextContext !== contextAfterRedirects
            ? this.__fullyResolveChain(topOfTheChainContextAfterRedirects, nextContext)
            : this.__amendWithOnBeforeCallbacks(contextAfterRedirects);
        });
      });
  }

  __findComponentContextAfterAllRedirects(context) {
    const result = context.result;
    if (result instanceof HTMLElement) {
      renderElement(context, result);
      return Promise.resolve(context);
    } else if (result.redirect) {
      return this.__redirect(result.redirect, context.__redirectCount, context.__renderId)
        .then(context => this.__findComponentContextAfterAllRedirects(context));
    } else if (result instanceof Error) {
      return Promise.reject(result);
    } else {
      return Promise.reject(
        new Error(
          log(
            `Invalid route resolution result for path "${context.pathname}". ` +
            `Expected redirect object or HTML element, but got: "${logValue(result)}". ` +
            `Double check the action return value for the route.`
          )
        ));
    }
  }

  __amendWithOnBeforeCallbacks(contextWithFullChain) {
    return this.__runOnBeforeCallbacks(contextWithFullChain).then(amendedContext => {
      if (amendedContext === this.__previousContext || amendedContext === contextWithFullChain) {
        return amendedContext;
      }
      return this.__fullyResolveChain(amendedContext);
    });
  }

  __runOnBeforeCallbacks(newContext) {
    const previousContext = this.__previousContext || {};
    const previousChain = previousContext.chain || [];
    const newChain = newContext.chain;

    let callbacks = Promise.resolve();
    const prevent = () => ({cancel: true});
    const redirect = (pathname) => createRedirect(newContext, pathname);

    newContext.__divergedChainIndex = 0;
    newContext.__skipAttach = false;
    if (previousChain.length) {
      for (let i = 0; i < Math.min(previousChain.length, newChain.length); i = ++newContext.__divergedChainIndex) {
        if (previousChain[i].route !== newChain[i].route
          || previousChain[i].path !== newChain[i].path && previousChain[i].element !== newChain[i].element
          || !this.__isReusableElement(previousChain[i].element, newChain[i].element)) {
          break;
        }
      }

      // Skip re-attaching and notifications if element and chain do not change
      newContext.__skipAttach =
        // Same route chain
        newChain.length === previousChain.length && newContext.__divergedChainIndex == newChain.length &&
        // Same element
        this.__isReusableElement(newContext.result, previousContext.result);

      if (newContext.__skipAttach) {
        // execute onBeforeLeave for changed segment element when skipping attach
        for (let i = newChain.length - 1; i >= 0; i--) {
          callbacks = this.__runOnBeforeLeaveCallbacks(callbacks, newContext, {prevent}, previousChain[i]);
        }
        // execute onBeforeEnter for changed segment element when skipping attach
        for (let i = 0; i < newChain.length; i++) {
          callbacks = this.__runOnBeforeEnterCallbacks(callbacks, newContext, {prevent, redirect}, newChain[i]);
          previousChain[i].element.location = createLocation(newContext, previousChain[i].route);
        }

      } else {
        // execute onBeforeLeave when NOT skipping attach
        for (let i = previousChain.length - 1; i >= newContext.__divergedChainIndex; i--) {
          callbacks = this.__runOnBeforeLeaveCallbacks(callbacks, newContext, {prevent}, previousChain[i]);
        }
      }
    }
    // execute onBeforeEnter when NOT skipping attach
    if (!newContext.__skipAttach) {
      for (let i = 0; i < newChain.length; i++) {
        if (i < newContext.__divergedChainIndex) {
          if (i < previousChain.length && previousChain[i].element) {
            previousChain[i].element.location = createLocation(newContext, previousChain[i].route);
          }
        } else {
          callbacks = this.__runOnBeforeEnterCallbacks(callbacks, newContext, {prevent, redirect}, newChain[i]);
          if (newChain[i].element) {
            newChain[i].element.location = createLocation(newContext, newChain[i].route);
          }
        }
      }
    }
    return callbacks.then(amendmentResult => {
      if (amendmentResult) {
        if (amendmentResult.cancel) {
          this.__previousContext.__renderId = newContext.__renderId;
          return this.__previousContext;
        }
        if (amendmentResult.redirect) {
          return this.__redirect(amendmentResult.redirect, newContext.__redirectCount, newContext.__renderId);
        }
      }
      return newContext;
    });
  }

  __runOnBeforeLeaveCallbacks(callbacks, newContext, commands, chainElement) {
    const location = createLocation(newContext);
    return callbacks.then(result => {
      if (this.__isLatestRender(newContext)) {
        const afterLeaveFunction = amend('onBeforeLeave', [location, commands, this], chainElement.element);
        return afterLeaveFunction(result);
      }
    }).then(result => {
      if (!(result || {}).redirect) {
        return result;
      }
    });
  }

  __runOnBeforeEnterCallbacks(callbacks, newContext, commands, chainElement) {
    const location = createLocation(newContext, chainElement.route);
    return callbacks.then(result => {
      if (this.__isLatestRender(newContext)) {
        const beforeEnterFunction = amend('onBeforeEnter', [location, commands, this], chainElement.element);
        return beforeEnterFunction(result);
      }
    });
  }

  __isReusableElement(element, otherElement) {
    if (element && otherElement) {
      return this.__createdByRouter.get(element) && this.__createdByRouter.get(otherElement)
        ? element.localName === otherElement.localName
        : element === otherElement;
    }
    return false;
  }

  __isLatestRender(context) {
    return context.__renderId === this.__lastStartedRenderId;
  }

  __redirect(redirectData, counter, renderId) {
    if (counter > MAX_REDIRECT_COUNT) {
      throw new Error(log(`Too many redirects when rendering ${redirectData.from}`));
    }

    return this.resolve({
      pathname: this.urlForPath(
        redirectData.pathname,
        redirectData.params
      ),
      redirectFrom: redirectData.from,
      __redirectCount: (counter || 0) + 1,
      __renderId: renderId
    });
  }

  __ensureOutlet(outlet = this.__outlet) {
    if (!(outlet instanceof Node)) {
      throw new TypeError(log(`Expected router outlet to be a valid DOM Node (but got ${outlet})`));
    }
  }

  __updateBrowserHistory({pathname, search = '', hash = ''}, replace) {
    if (window.location.pathname !== pathname
        || window.location.search !== search
        || window.location.hash !== hash
    ) {
      const changeState = replace ? 'replaceState' : 'pushState';
      window.history[changeState](null, document.title, pathname + search + hash);
      window.dispatchEvent(new PopStateEvent('popstate', {state: 'vaadin-router-ignore'}));
    }
  }

  __copyUnchangedElements(context, previousContext) {
    // Find the deepest common parent between the last and the new component
    // chains. Update references for the unchanged elements in the new chain
    let deepestCommonParent = this.__outlet;
    for (let i = 0; i < context.__divergedChainIndex; i++) {
      const unchangedElement = previousContext && previousContext.chain[i].element;
      if (unchangedElement) {
        if (unchangedElement.parentNode === deepestCommonParent) {
          context.chain[i].element = unchangedElement;
          deepestCommonParent = unchangedElement;
        } else {
          break;
        }
      }
    }
    return deepestCommonParent;
  }

  __addAppearingContent(context, previousContext) {
    this.__ensureOutlet();

    // If the previous 'entering' animation has not completed yet,
    // stop it and remove that content from the DOM before adding new one.
    this.__removeAppearingContent();

    // Copy reusable elements from the previousContext to current
    const deepestCommonParent = this.__copyUnchangedElements(context, previousContext);

    // Keep two lists of DOM elements:
    //  - those that should be removed once the transition animation is over
    //  - and those that should remain
    this.__appearingContent = [];
    this.__disappearingContent = Array
      .from(deepestCommonParent.children)
      .filter(
        // Only remove layout content that was added by router
        e => this.__addedByRouter.get(e) &&
        // Do not remove the result element to avoid flickering
        e !== context.result);

    // Add new elements (starting after the deepest common parent) to the DOM.
    // That way only the components that are actually different between the two
    // locations are added to the DOM (and those that are common remain in the
    // DOM without first removing and then adding them again).
    let parentElement = deepestCommonParent;
    for (let i = context.__divergedChainIndex; i < context.chain.length; i++) {
      const elementToAdd = context.chain[i].element;
      if (elementToAdd) {
        parentElement.appendChild(elementToAdd);
        this.__addedByRouter.set(elementToAdd, true);
        if (parentElement === deepestCommonParent) {
          this.__appearingContent.push(elementToAdd);
        }
        parentElement = elementToAdd;
      }
    }
  }

  __removeDisappearingContent() {
    if (this.__disappearingContent) {
      removeDomNodes(this.__disappearingContent);
    }
    this.__disappearingContent = null;
    this.__appearingContent = null;
  }

  __removeAppearingContent() {
    if (this.__disappearingContent && this.__appearingContent) {
      removeDomNodes(this.__appearingContent);
      this.__disappearingContent = null;
      this.__appearingContent = null;
    }
  }

  __runOnAfterLeaveCallbacks(currentContext, targetContext) {
    if (!targetContext) {
      return;
    }

    // REVERSE iteration: from Z to A
    for (let i = targetContext.chain.length - 1; i >= currentContext.__divergedChainIndex; i--) {
      if (!this.__isLatestRender(currentContext)) {
        break;
      }
      const currentComponent = targetContext.chain[i].element;
      if (!currentComponent) {
        continue;
      }
      try {
        const location = createLocation(currentContext);
        runCallbackIfPossible(
          currentComponent.onAfterLeave,
          [location, {}, targetContext.resolver],
          currentComponent);
      } finally {
        if (this.__disappearingContent.indexOf(currentComponent) > -1) {
          removeDomNodes(currentComponent.children);
        }
      }
    }
  }

  __runOnAfterEnterCallbacks(currentContext) {
    // forward iteration: from A to Z
    for (let i = currentContext.__divergedChainIndex; i < currentContext.chain.length; i++) {
      if (!this.__isLatestRender(currentContext)) {
        break;
      }
      const currentComponent = currentContext.chain[i].element || {};
      const location = createLocation(currentContext, currentContext.chain[i].route);
      runCallbackIfPossible(
        currentComponent.onAfterEnter,
        [location, {}, currentContext.resolver],
        currentComponent);
    }
  }

  __animateIfNeeded(context) {
    const from = (this.__disappearingContent || [])[0];
    const to = (this.__appearingContent || [])[0];
    const promises = [];

    const chain = context.chain;
    let config;
    for (let i = chain.length; i > 0; i--) {
      if (chain[i - 1].route.animate) {
        config = chain[i - 1].route.animate;
        break;
      }
    }

    if (from && to && config) {
      const leave = isObject(config) && config.leave || 'leaving';
      const enter = isObject(config) && config.enter || 'entering';
      promises.push(animate(from, leave));
      promises.push(animate(to, enter));
    }

    return Promise.all(promises).then(() => context);
  }

  /**
   * Subscribes this instance to navigation events on the `window`.
   *
   * NOTE: beware of resource leaks. For as long as a router instance is
   * subscribed to navigation events, it won't be garbage collected.
   */
  subscribe() {
    window.addEventListener('vaadin-router-go', this.__navigationEventHandler);
  }

  /**
   * Removes the subscription to navigation events created in the `subscribe()`
   * method.
   */
  unsubscribe() {
    window.removeEventListener('vaadin-router-go', this.__navigationEventHandler);
  }

  __onNavigationEvent(event) {
    const {pathname, search, hash} = event ? event.detail : window.location;
    if (isString(this.__normalizePathname(pathname))) {
      if (event && event.preventDefault) {
        event.preventDefault();
      }
      this.render({pathname, search, hash}, true);
    }
  }

  /**
   * Configures what triggers Router navigation events:
   *  - `POPSTATE`: popstate events on the current `window`
   *  - `CLICK`: click events on `<a>` links leading to the current page
   *
   * This method is invoked with the pre-configured values when creating a new Router instance.
   * By default, both `POPSTATE` and `CLICK` are enabled. This setup is expected to cover most of the use cases.
   *
   * See the `router-config.js` for the default navigation triggers config. Based on it, you can
   * create the own one and only import the triggers you need, instead of pulling in all the code,
   * e.g. if you want to handle `click` differently.
   *
   * See also **Navigation Triggers** section in [Live Examples](#/classes/Router/demos/demo/index.html).
   *
   * @param {...NavigationTrigger} triggers
   */
  static setTriggers(...triggers) {
    setNavigationTriggers(triggers);
  }

  /**
   * Generates a URL for the route with the given name, optionally performing
   * substitution of parameters.
   *
   * The route is searched in all the Router instances subscribed to
   * navigation events.
   *
   * **Note:** For child route names, only array children are considered.
   * It is not possible to generate URLs using a name for routes set with
   * a children function.
   *
   * @function urlForName
   * @param {!string} name the route name or the route’s `component` name.
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */
  urlForName(name, params) {
    if (!this.__urlForName) {
      this.__urlForName = generateUrls(this);
    }
    return getPathnameForRouter(
      this.__urlForName(name, params),
      this
    );
  }

  /**
   * Generates a URL for the given route path, optionally performing
   * substitution of parameters.
   *
   * @param {!string} path string route path declared in [express.js syntax](https://expressjs.com/en/guide/routing.html#route-paths").
   * @param {Params=} params Optional object with route path parameters.
   * Named parameters are passed by name (`params[name] = value`), unnamed
   * parameters are passed by index (`params[index] = value`).
   *
   * @return {string}
   */
  urlForPath(path, params) {
    return getPathnameForRouter(
      Router.pathToRegexp.compile(path)(params),
      this
    );
  }

  /**
   * Triggers navigation to a new path. Returns a boolean without waiting until
   * the navigation is complete. Returns `true` if at least one `Router`
   * has handled the navigation (was subscribed and had `baseUrl` matching
   * the `path` argument), otherwise returns `false`.
   *
   * @param {!string|!{pathname: !string, search: (string|undefined), hash: (string|undefined)}} path
   *   a new in-app path string, or an URL-like object with `pathname`
   *   string property, and optional `search` and `hash` string properties.
   * @return {boolean}
   */
  static go(path) {
    const {pathname, search, hash} = isString(path)
      ? this.__createUrl(path, 'http://a') // some base to omit origin
      : path;
    return fireRouterEvent('go', {pathname, search, hash});
  }
}

const DEV_MODE_CODE_REGEXP =
  /\/\*\*\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;

const FlowClients = window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients;

function isMinified() {
  function test() {
    /** vaadin-dev-mode:start
    return false;
    vaadin-dev-mode:end **/
    return true;
  }
  return uncommentAndRun(test);
}

function isDevelopmentMode() {
  try {
    if (isForcedDevelopmentMode()) {
      return true;
    }

    if (!isLocalhost()) {
      return false;
    }

    if (FlowClients) {
      return !isFlowProductionMode();
    }

    return !isMinified();
  } catch (e) {
    // Some error in this code, assume production so no further actions will be taken
    return false;
  }
}

function isForcedDevelopmentMode() {
  return localStorage.getItem("vaadin.developmentmode.force");
}

function isLocalhost() {
  return (["localhost","127.0.0.1"].indexOf(window.location.hostname) >= 0);
}

function isFlowProductionMode() {
  if (FlowClients) {
    const productionModeApps = Object.keys(FlowClients)
      .map(key => FlowClients[key])
      .filter(client => client.productionMode);
    if (productionModeApps.length > 0) {
      return true;
    }
  }
  return false;
}

function uncommentAndRun(callback, args) {
  if (typeof callback !== 'function') {
    return;
  }

  const match = DEV_MODE_CODE_REGEXP.exec(callback.toString());
  if (match) {
    try {
      // requires CSP: script-src 'unsafe-eval'
      callback = new Function(match[1]);
    } catch (e) {
      // eat the exception
      console.log('vaadin-development-mode-detector: uncommentAndRun() failed', e);
    }
  }

  return callback(args);
}

// A guard against polymer-modulizer removing the window.Vaadin
// initialization above.
window['Vaadin'] = window['Vaadin'] || {};

/**
 * Inspects the source code of the given `callback` function for
 * specially-marked _commented_ code. If such commented code is found in the
 * callback source, uncomments and runs that code instead of the callback
 * itself. Otherwise runs the callback as is.
 *
 * The optional arguments are passed into the callback / uncommented code,
 * the result is returned.
 *
 * See the `isMinified()` function source code in this file for an example.
 *
 */
const runIfDevelopmentMode = function(callback, args) {
  if (window.Vaadin.developmentMode) {
    return uncommentAndRun(callback, args);
  }
};

if (window.Vaadin.developmentMode === undefined) {
  window.Vaadin.developmentMode = isDevelopmentMode();
}

/* This file is autogenerated from src/vaadin-usage-statistics.tpl.html */

function maybeGatherAndSendStats() {
  /** vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.0';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/
}

const usageStatistics = function() {
  if (typeof runIfDevelopmentMode === 'function') {
    return runIfDevelopmentMode(maybeGatherAndSendStats);
  }
};

window.Vaadin = window.Vaadin || {};
window.Vaadin.registrations = window.Vaadin.registrations || [];

window.Vaadin.registrations.push({
  is: '@vaadin/router',
  version: '1.7.4',
});

usageStatistics();

Router.NavigationTrigger = {POPSTATE, CLICK};

class AccordionPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h4>Accordion</h4>
		<div class="container-view">
			<gov-accordion size="xs">
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<gov-icon slot="toggle-icon" name="info"></gov-icon>
				</gov-accordion-item>
				<gov-accordion-item disabled is-expanded>
					<h3 slot="label">Kontaktní osoby</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Působnost v agendách</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p slot="annotation">Anotace Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					<gov-chip variant="primary" size="xs" slot="suffix">
						Chip
					</gov-chip>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Zřizované organizace</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
			<br>
			<gov-accordion size="xs" no-border>
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Kontaktní osoby">
					<h3 slot="label">Kontaktní osoby</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Působnost v agendách">
					<p slot="label">Působnost v agendách</p>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Zřizované organizace">
					<span slot="label">Zřizované organizace</span>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
			<br />
			<gov-accordion size="s" variant="secondary">
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<gov-icon slot="toggle-icon" name="info"></gov-icon>
				</gov-accordion-item>
				<gov-accordion-item disabled is-expanded>
					<h3 slot="label">Kontaktní osoby</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Působnost v agendách</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Zřizované organizace</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
			<br>
			<gov-accordion size="s">
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Kontaktní osoby">
					<h3 slot="label">Kontaktní osoby</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Působnost v agendách">
					<h3 slot="label">Působnost v agendách</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<gov-chip variant="primary" size="xs" slot="suffix">
						Chip
					</gov-chip>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Zřizované organizace">
					<h3 slot="label">Zřizované organizace</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
			<br />
			<gov-accordion size="m">
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<gov-icon slot="toggle-icon" name="info"></gov-icon>
				</gov-accordion-item>
				<gov-accordion-item disabled is-expanded>
					<h3 slot="label">Kontaktní osoby</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Působnost v agendách</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Zřizované organizace</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
			<br>
			<gov-accordion size="m">
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item is-expanded label="Kontaktní osoby">
					<h3 slot="label">Kontaktní osoby</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<gov-chip variant="primary" size="xs" slot="suffix">
						Chip
					</gov-chip>
								<gov-accordion size="xs" no-border>
									<gov-accordion-item>
										<h3 slot="label">Font Awesome Icon</h3>
										<gov-icon slot="icon" name="info"></gov-icon>
										<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
										<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
										<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
										<gov-icon slot="toggle-icon" name="info"></gov-icon>
									</gov-accordion-item>
									<gov-accordion-item disabled is-expanded>
										<h3 slot="label">Kontaktní osoby</h3>
										<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
									</gov-accordion-item>
									<gov-accordion-item>
										<h3 slot="label">Působnost v agendách</h3>
										<gov-icon slot="icon" name="info"></gov-icon>
										<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
									</gov-accordion-item>
									<gov-accordion-item>
										<h3 slot="label">Zřizované organizace</h3>
										<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
									</gov-accordion-item>
								</gov-accordion>
				</gov-accordion-item>
				<gov-accordion-item label="Působnost v agendách">
					<h3 slot="label">Působnost v agendách</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<gov-chip variant="primary" size="xs" slot="suffix">
						Chip
					</gov-chip>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Zřizované organizace">
					<h3 slot="label">Zřizované organizace</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
			<br />
			<gov-accordion size="l">
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<gov-icon slot="toggle-icon" name="info"></gov-icon>
				</gov-accordion-item>
				<gov-accordion-item disabled is-expanded>
					<h3 slot="label">Kontaktní osoby</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Působnost v agendách</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item>
					<h3 slot="label">Zřizované organizace</h3>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
			<br>
			<gov-accordion size="l">
				<gov-accordion-item>
					<h3 slot="label">Font Awesome Icon</h3>
					<p slot="annotation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus</p>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Kontaktní osoby">
					<h3 slot="label">Kontaktní osoby</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Působnost v agendách">
					<h3 slot="label">Působnost v agendách</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<gov-chip variant="primary" size="m" slot="suffix">
						Chip
					</gov-chip>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
				<gov-accordion-item label="Zřizované organizace">
					<h3 slot="label">Zřizované organizace</h3>
					<gov-icon slot="icon" name="info"></gov-icon>
					<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
				</gov-accordion-item>
			</gov-accordion>
		</div>
		`;
  }
}
if (customElements.get('accordion-page') === undefined) {
  customElements.define('accordion-page', AccordionPage);
}

class BreadcrumbsPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Breadcrumbs</h2>

		<gov-breadcrumbs wcag-label="Drobečková navigace pro stránku Czech POINT">
			<ul>
				<li>
					<button>
					Domů
					</button>
				</li>
				<li>
					<gov-icon  name="chevron-right"></gov-icon>
					<a href="#">Kam dál</a>
				</li>
				<li>
					<gov-icon  name="chevron-right"></gov-icon>
					<a href="#">
					Český eGovernment
					</a>
				</li>
				<li>
					<gov-icon name="chevron-right"></gov-icon>
					<strong>Czech POINT</strong>
				</li>
			</ul>
		</gov-breadcrumbs>

		`;
  }
}
if (customElements.get("breadcrumbs-page") === undefined) {
  customElements.define("breadcrumbs-page", BreadcrumbsPage);
}

class ButtonPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h1>Buttons</h1>

			<h4>Dropdown</h4>

			<gov-layout>
				<gov-layout-column>
					<div class="container-view">
						<gov-dropdown>
							<gov-button variant="primary" size="s">
								Více
							</gov-button>
							<ul slot="list">
								<li>
									<gov-button variant="primary" type="base" size="s">
										A další nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="primary" type="base" size="s">
										A další dlouhá nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="primary" type="base" size="s">
										A další
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
							</ul>
						</gov-dropdown>
					</div>
				</gov-layout-column>
				<gov-layout-column>
					<div class="container-view">
						<gov-dropdown position="right">
							<gov-button variant="primary" size="s">
								Více
							</gov-button>
							<ul slot="list">
								<li>
									<gov-button variant="secondary" type="base" size="s">
										A další nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="secondary" type="base" size="s">
										A další dlouhá nabídka
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
								<li>
									<gov-button variant="secondary" type="base" size="s">
										A další
										<gov-icon slot="right-icon" name="info"></gov-icon>
									</gov-button>
								</li>
							</ul>
						</gov-dropdown>
					</div>
				</gov-layout-column>
			</gov-layout>

			<h4>Buttons - primary (default)</h4>

			<gov-button variant="primary" size="s" icon-left="basic/info"  icon-right="basic/info" href="http://localhost:3333/button">
					Small Primary Icon Param
				</gov-button>

			<div class="container-view">
				<gov-button variant="primary" size="s" href="http://localhost:3333/button">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br><br>
				<gov-button variant="primary" size="s" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="s" href="http://localhost:3333/button" loading="1" disabled>
					Odeslat
				</gov-button>
				<gov-button variant="primary" href="http://localhost:3333/button" loading="0">
					Odeslat
				</gov-button>
				<gov-button variant="primary" href="http://localhost:3333/button" loading="1" disabled>
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="l" loading="true">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="l" loading="true" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Odeslat
				</gov-button>
				<gov-button variant="primary" size="xl" loading="false">
					Odeslat
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="xl" loading="true" disabled>
					Odeslat
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="primary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<h4>Buttons - primary (expanded)</h4>
			<div class="container-view">
				<gov-button variant="primary" expanded="true">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Expanded
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
			</div>
			<h4>Buttons - primary (inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (outlined)</h4>
			<div class="container-view">
				<gov-button variant="primary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (outlined inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>

			<h4>Buttons - primary (base)</h4>
			<div class="container-view">
				<gov-button variant="primary" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (base inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (link)</h4>
			<div class="container-view">
				<gov-button variant="primary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="primary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="primary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="primary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - primary (link inversed)</h4>
			<div class="container-view gov-bg--primary-600">
				<gov-button inverse variant="primary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="primary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="primary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="primary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (default)</h4>
			<div class="container-view">
				<gov-button variant="secondary" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="secondary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (outlined)</h4>
			<div class="container-view">
				<gov-button variant="secondary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (outlined inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (base)</h4>
			<div class="container-view">
				<gov-button variant="secondary" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (base inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (link)</h4>
			<div class="container-view">
				<gov-button variant="secondary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="secondary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="secondary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="secondary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - secondary (link inversed)</h4>
			<div class="container-view gov-bg--secondary-800">
				<gov-button inverse variant="secondary" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Secondary
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="secondary" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Secondary
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="secondary" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="secondary" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (default)</h4>
			<div class="container-view">
				<gov-button variant="warning" size="s" class="u-mr--medium u-mr-mobile--2xl u-mr-tablet--unset u-mr-portable--medium">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="warning" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="warning" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (outlined)</h4>
			<div class="container-view">
				<gov-button variant="warning" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (outlined inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (base)</h4>
			<div class="container-view">
				<gov-button variant="warning" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (base inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (link)</h4>
			<div class="container-view">
				<gov-button variant="warning" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="warning" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="warning" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="warning" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - warning (link inversed)</h4>
			<div class="container-view gov-bg--warning-500">
				<gov-button inverse variant="warning" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="warning" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="warning" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="warning" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (default)</h4>
			<div class="container-view">
				<gov-button variant="success" size="s" class="u-mr--medium u-mr-mobile--2xl u-mr-tablet--unset u-mr-portable--medium">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="success" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="success" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (outlined)</h4>
			<div class="container-view">
				<gov-button variant="success" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (outlined inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (base)</h4>
			<div class="container-view">
				<gov-button variant="success" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (base inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (link)</h4>
			<div class="container-view">
				<gov-button variant="success" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="success" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="success" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="success" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - success (link inversed)</h4>
			<div class="container-view gov-bg--success-500">
				<gov-button inverse variant="success" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="success" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="success" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="success" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (default)</h4>
			<div class="container-view">
				<gov-button variant="error" size="s" class="u-mr--medium u-mr-mobile--2xl u-mr-tablet--unset u-mr-portable--medium">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
				<br>
				<gov-button variant="error" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button variant="error" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (outlined)</h4>
			<div class="container-view">
				<gov-button variant="error" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" type="outlined" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" type="outlined" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (outlined inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" type="outlined" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="outlined" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (base)</h4>
			<div class="container-view">
				<gov-button variant="error" type="base" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="base" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="base" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="base" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" type="base" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" type="base" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (base inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" type="base" size="s">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" size="l">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" size="xl" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" loading="false">
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="base" loading="true" disabled>
					<gov-icon slot="left-icon" name="x-lg"></gov-icon>
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (link)</h4>
			<div class="container-view">
				<gov-button variant="error" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button variant="error" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button variant="error" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button variant="error" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />

			<h4>Buttons - error (link inversed)</h4>
			<div class="container-view gov-bg--error-400">
				<gov-button inverse variant="error" type="link" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="link" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="link" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<gov-button inverse variant="error" type="link" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
					<gov-icon inverse slot="right-icon" name="info"></gov-icon>
				</gov-button>
				<br>
				<gov-button inverse variant="error" type="link" href="http://localhost:3333/button" loading="false">
					Odeslat
				</gov-button>
				<gov-button inverse variant="error" type="link" href="http://localhost:3333/button" loading="true" disabled>
					Odeslat
				</gov-button>
			</div>
			<hr />
		`;
  }
}
if (customElements.get('button-page') === undefined) {
  customElements.define('button-page', ButtonPage);
}

class CardPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

		<div style="max-width: 650px">
			<h2>Card</h2>

			<gov-card label="Fusce tellus odio, dapibus id fermentum quis" expanded collapsible class="gov-bg--success-100">
				<p class="gov-color--secondary-700">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
				</p>
			</gov-card>

			<br>

			<div style="height: 400px">
				<gov-card label="Fusce tellus odio, dapibus id fermentum quis" expanded collapsible>
					<div class="gov-content">
						<p class="gov-color--secondary-700">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
						</p>
						<gov-button variant="primary" size="s" href="http://localhost:3333/button">
							Button
						</gov-button>
						<p slot="footer" class="gov-color--primary-700">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
						</p>
					</div>
				</gov-card>
			</div>
			<br>
			<gov-card label="Fusce tellus odio, dapibus id fermentum quis">
				<p class="gov-color--secondary-700">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
				</p>
				<gov-button variant="primary" size="s" href="http://localhost:3333/button">
					Button
				</gov-button>
				<p slot="footer" color="gov-color--primary-700">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
				</p>
			</gov-card>
			<h3>Image slot</h3>
			<gov-card expanded>
				<img slot="img" src="https://picsum.photos/536/354" src="" alt="Obárzek" width="536" height="354">
				<p class="gov-text--l gov-color--secondary-800">
					<b>
						Commodo consequat.
					</b>
				</p>
				<p class="gov-color--secondary-700">
					Commodo consequat. Nullam rhoncus aliquam metus.
				</p>
				<p class="gov-color--secondary-700">
					<a href="#">Chci vědět více</a>
				</p>
			</gov-card>
			<h3>Shadow variant</h3>
			<gov-card expanded class="gov-box-shadow--m">
				<img slot="img" src="https://picsum.photos/536/354" src="" alt="Obárzek" width="536" height="354">
				<p class="gov-text--l gov-color--secondary-800">
					<b>
						Commodo consequat.
					</b>
				</p>
				<p class="gov-color--secondary-700">
					Commodo consequat. Nullam rhoncus aliquam metus.
				</p>
				<gov-button variant="primary" size="s" href="http://localhost:3333/button">
					Jak založit
				</gov-button>
				<gov-button variant="primary" type="outlined" size="s" href="http://localhost:3333/button">
					Zjistit více
				</gov-button>
			</gov-card>
			<h3>With icon</h3>
			<gov-card>
				<gov-icon name="car" type="complex"></gov-icon>
				<p class="gov-color--secondary-700">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cras elementum. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Fusce tellus.
				</p>
				<gov-button variant="primary" type="outlined" size="s" href="http://localhost:3333/button">
					Learn more
				</gov-button>
			</gov-card>
			<h3>Horizontal orientation</h3>
			<gov-card promotion>
				<gov-icon slot="icon" name="car" type="complex"></gov-icon>
				<p class="gov-color--secondary-700">
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cras elementum. Fusce tellus odio, dapibus id fermentum quis, suscipit id erat. Fusce tellus.
				</p>
				<gov-button slot="btn" variant="primary" type="outlined" size="s" href="http://localhost:3333/button">
					Learn more
				</gov-button>
			</gov-card>
		</div>

		`;
  }
}
if (customElements.get('card-page') === undefined) {
  customElements.define('card-page', CardPage);
}

class ChipPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h1>Chips</h1>
			<h4>Chips close</h4>
			<div class="container-view">
				<gov-chip variant="primary" size="s" inverse="">
				Not clickable S
				<gov-button slot="right" variant="primary" type="base" wcag-label="Zavřít vše" size="s">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="s">
				Not clickable S
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="s">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="m">
				Not clickable M
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="m">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="l">
				Not clickable L
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="l">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="xl">
				Not clickable XL
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="xl">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			</div>
			<h4>Chips close (inversed)</h4>
			<div class="container-view gov-bg--primary-600">
			<gov-chip variant="primary" size="s" inverse>
				Not clickable S
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="s">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="m" inverse>
				Not clickable M
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="m">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="l" inverse>
				Not clickable L
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="l">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			<gov-chip variant="primary" size="xl" inverse>
				Not clickable XL
				<gov-button slot="right" variant="primary" type="solid" wcag-label="Zavřít vše" size="xl">
					<gov-icon slot="right-icon" name="x-lg"></gov-icon>
				</gov-button>
			</gov-chip>
			</div>
			<h4>Chips - primary (default)</h4>
			<div class="container-view">
				<gov-chip variant="primary" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="primary" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" disabled href="http://www.example.com/" target="_blank">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="l" href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large Primary
				</gov-chip>
			</div>
			<h4>Chips - primary (inversed)</h4>
			<div class="container-view">
				<gov-chip variant="primary" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="primary" size="s" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" href="http://www.example.com/" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" disabled href="http://www.example.com/" target="_blank" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="l" href="http://www.example.com/" inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="primary" size="xl" disabled inverse>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large Primary
				</gov-chip>
			</div>
			<h4>Chips - primary (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="primary" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="primary" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small Primary
				</gov-chip>
				<gov-chip variant="primary" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal Primary
				</gov-chip>
				<gov-chip variant="primary" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large Primary
				</gov-chip>
				<gov-chip variant="primary" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large Primary
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - secondary (default)</h4>
			<div class="container-view">
				<gov-chip variant="secondary" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="secondary" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="secondary" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="secondary">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="secondary" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="secondary" size="l" tag="a">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="secondary" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large secondary
				</gov-chip>
			</div>
			<h4>Chips - secondary (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="secondary" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="secondary" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small secondary
				</gov-chip>
				<gov-chip variant="secondary" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal secondary
				</gov-chip>
				<gov-chip variant="secondary" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large secondary
				</gov-chip>
				<gov-chip variant="secondary" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large secondary
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - success (default)</h4>
			<div class="container-view">
				<gov-chip variant="success" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="success" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="success" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="success">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="success" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="success" size="l" tag="a">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="success" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large success
				</gov-chip>
			</div>
			<h4>Chips - success (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="success" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="success" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small success
				</gov-chip>
				<gov-chip variant="success" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal success
				</gov-chip>
				<gov-chip variant="success" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large success
				</gov-chip>
				<gov-chip variant="success" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large success
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - warning (default)</h4>
			<div class="container-view">
				<gov-chip variant="warning" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="warning" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="warning" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="warning">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="warning" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="warning" size="l" tag="a">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="warning" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large warning
				</gov-chip>
			</div>
			<h4>Chips - warning (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="warning" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="warning" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small warning
				</gov-chip>
				<gov-chip variant="warning" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal warning
				</gov-chip>
				<gov-chip variant="warning" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large warning
				</gov-chip>
				<gov-chip variant="warning" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large warning
				</gov-chip>
			</div>
			<hr />

			<h4>Chips - error (default)</h4>
			<div class="container-view">
				<gov-chip variant="error" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="error" size="xs" inverse>
					Chip
				</gov-chip>
				<gov-chip variant="error" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Not clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip tag="button" variant="error">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Normal href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="error" disabled href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Disabled with href
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="error" size="l" href="http://www.example.com/">
					<gov-icon slot="left-icon" name="info"></gov-icon>
						Clickable
					<gov-icon slot="right-icon" name="info"></gov-icon>
				</gov-chip>
				<gov-chip variant="error" size="xl" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
						X-Large error
				</gov-chip>
			</div>
			<h4>Chips - error (outlined)</h4>
			<div class="container-view">
				<gov-chip variant="error" tag="a" type="outlined" size="xs">
					Chip
				</gov-chip>
				<gov-chip variant="error" tag="a" type="outlined" size="s">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Small error
				</gov-chip>
				<gov-chip variant="error" tag="button" type="outlined" disabled>
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Normal error
				</gov-chip>
				<gov-chip variant="error" tag="a" type="outlined" size="l">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					Large error
				</gov-chip>
				<gov-chip variant="error" tag="button" type="outlined" disabled size="xl">
					<gov-icon slot="left-icon" name="info"></gov-icon>
					X-Large error
				</gov-chip>
			</div>
		`;
  }
}
if (customElements.get('chip-page') === undefined) {
  customElements.define('chip-page', ChipPage);
}

class ContainerPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Container</h2>

		<gov-container>
			<p>Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
		</gov-container>
		`;
  }
}
if (customElements.get('container-page') === undefined) {
  customElements.define('container-page', ContainerPage);
}

class ControlGroupPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Control Group</h2>

		<gov-control-group>
			<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" size="s"></gov-form-input>
			<gov-button variant="primary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="primary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-button variant="primary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
			<gov-dropdown position="right">
				<gov-button variant="primary" size="s">
					Více
				</gov-button>
				<ul slot="list">
					<li>
						<gov-button variant="primary" type="base" size="s">
							A další nabídka
						</gov-button>
					</li>
					<li>
						<gov-button variant="primary" type="base" size="s">
							A další nabídka
						</gov-button>
					</li>
					<li>
						<gov-button variant="primary" type="base" size="s">
							A další nabídka
						</gov-button>
					</li>
				</ul>
			</gov-dropdown>
		</gov-control-group>
		<br />
		<gov-control-group variant="primary">
			<gov-form-select name="test-me" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="primary" type="solid" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group>
			<gov-button variant="primary" type="outlined" size="l">
				<gov-icon slot="left-icon" name="gear"></gov-icon>
			</gov-button>
			<gov-form-file name="test-me-c" accept="image/*" max-file-size="1024">
				<gov-button variant="primary" type="outlined" size="l" tabindex="-1">
					Nahrát soubor ze zařízení
				</gov-button>
			</gov-form-file>
			<gov-button variant="primary" type="outlined" size="l">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group variant="primary" no-border>
		<gov-button variant="primary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="primary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" size="xl">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="primary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br><br>

		<gov-control-group variant="secondary" no-border>
			<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
			<gov-button variant="primary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="primary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-button variant="primary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group variant="secondary">
			<gov-form-select name="test-me" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="primary" type="outlined" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group variant="secondary">
			<gov-button variant="primary" type="outlined" size="l">
				<gov-icon slot="left-icon" name="gear"></gov-icon>
			</gov-button>
			<gov-form-file name="test-me-c" accept="image/*" max-file-size="1024">
				<gov-button variant="primary" type="outlined" size="l" tabindex="-1">
					Nahrát soubor ze zařízení
				</gov-button>
			</gov-form-file>
			<gov-button variant="primary" type="outlined" size="l">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group variant="secondary">
		<gov-button variant="primary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="primary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" variant="primary" size="xl">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="primary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br><br>

		<gov-control-group variant="secondary">
			<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="secondary" size="s"></gov-form-input>
			<gov-button variant="secondary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="secondary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-button variant="secondary" type="outlined" size="s">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group variant="secondary" no-border>
			<gov-form-select name="test-me" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="secondary" type="outlined" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group variant="secondary">
			<gov-button variant="secondary" type="outlined" size="l">
				<gov-icon slot="left-icon" name="gear"></gov-icon>
			</gov-button>
			<gov-form-file name="test-me-c" accept="image/*" max-file-size="1024">
				<gov-button variant="secondary" type="outlined" size="l" tabindex="-1">
					Nahrát soubor ze zařízení
				</gov-button>
			</gov-form-file>
			<gov-button variant="secondary" type="outlined" size="l">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		<br />
		<gov-control-group variant="secondary">
		<gov-button variant="secondary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="secondary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" variant="secondary" size="xl">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="secondary" type="outlined" size="xl">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>

		<br /><br />
		<gov-control-group variant="primary">
		<gov-button variant="primary" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="primary" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" variant="primary" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="primary" type="solid" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>

		<br />
		<gov-control-group variant="secondary">
		<gov-button variant="secondary" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="secondary" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" variant="secondary" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="secondary" type="solid" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>

		<br />
		<gov-control-group variant="success">
		<gov-button variant="success" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="success" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" variant="success" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="success" type="solid" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>

		<br />
		<gov-control-group variant="warning">
		<gov-button variant="warning" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="warning" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" variant="warning" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="warning" type="solid" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>

		<br />
		<gov-control-group variant="error">
		<gov-button variant="error" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-up"></gov-icon>
			</gov-button>
			<gov-button variant="error" type="outlined" size="m">
				<gov-icon slot="left-icon" name="chevron-down"></gov-icon>
			</gov-button>
			<gov-form-select name="test-me" variant="error" size="m">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<gov-button variant="error" type="solid" size="m">
				<gov-icon slot="left-icon" name="x-lg"></gov-icon>
			</gov-button>
		</gov-control-group>
		`;
  }
}
if (customElements.get('control-group-page') === undefined) {
  customElements.define('control-group-page', ControlGroupPage);
}

class Cookiebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<gov-cookiebar>
				<h2 class="h4">Můžeme si u vás uložit cookies?</h2>

				<p>
					Co že to znamená? Cookies jsou malé datové soubory, které slouží např. k tomu, aby si web pamatoval vaše nastavení a to, co vás zajímá, nebo abychom jej zlepšovali . Pro ukládání různých typů cookies od vás potřebujeme souhlas. Web bude fungovat i bez souhlasu, s ním ale o něco lépe.
				</p>

				<gov-button variant="primary" slot="actions-primary">
					Souhlasím se všemi
				</gov-button>

				<gov-button variant="primary" type="outlined" slot="actions-primary">
					Odmítnout všechny
				</gov-button>

				<gov-button variant="primary" type="base" slot="actions-secondary">
					Podrobné nastavení
				</gov-button>
			</gov-cookiebar>
		`;
  }
}
if (customElements.get('cookiebar-page') === undefined) {
  customElements.define('cookiebar-page', Cookiebar);
}

class EmptyPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Empty</h2>

		<gov-empty>
			<gov-icon slot="icon" name="car" type="complex"></gov-icon>
			<p class="gov-text--2xl">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
			</p>
			<p class="gov-text--l gov-color--secondary-700">
				Informace o tom, že je potřeba upřesnit vyhledávání
			</p>
			<gov-spacer size="l"></gov-spacer>
			<gov-button variant="primary">
				Přejít na jinou stránku
			</gov-button>
		</gov-empty>
		<gov-empty align="right">
			<gov-icon slot="icon" name="car" type="complex"></gov-icon>
			<p class="gov-text--2xl">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
			</p>
			<p class="gov-text--l gov-color--secondary-700">
				Informace o tom, že je potřeba upřesnit vyhledávání
			</p>
		</gov-empty>
		<gov-empty align="center">
			<gov-icon slot="icon" name="car" type="complex"></gov-icon>
			<p class="gov-text--2xl">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsum vitae etiam dui eget lectus vulputate ornare.
			</p>
			<p class="gov-text--l gov-color--secondary-700">
				Informace o tom, že je potřeba upřesnit vyhledávání
			</p>
		</gov-empty>
		`;
  }
}
if (customElements.get('empty-page') === undefined) {
  customElements.define('empty-page', EmptyPage);
}

class ErrorPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Error</h2>
		<gov-error-code>
			<gov-icon slot="icon" name="card-400" type="complex"></gov-icon>
			<h2 class="gov-text--6xl">Page Not Found</h2>
			<p class="gov-text--l">Sorry, the page you are looking for does not exist.</p>
		</gov-error-code>
		`;
  }
}
if (customElements.get('error-page') === undefined) {
  customElements.define('error-page', ErrorPage);
}

class FormLabelPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<gov-form-label>
				Form Label
			</gov-form-label>
	`;
  }
}
if (customElements.get('form-label-page') === undefined) {
  customElements.define('form-label-page', FormLabelPage);
}

class FormMessagePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<gov-form-message>
				<gov-icon slot="icon" name="info"></gov-icon>
				<p>
					Default
				</p>
			</gov-form-message>
			<gov-form-message>
				<p>
					Default
				</p>
			</gov-form-message>
			<gov-form-message variant="secondary">
				<gov-icon name="info" slot="icon"></gov-icon>
				<p>
					Secondary
				</p>
			</gov-form-message>
			<gov-form-message variant="secondary">
				<p>
					Secondary
				</p>
			</gov-form-message>
			<gov-form-message variant="error">
				<gov-icon slot="icon" name="info"></gov-icon>
				<p>
					Error
				</p>
			</gov-form-message>
			<gov-form-message variant="error">
				<p>
					Error
				</p>
			</gov-form-message>
			<gov-form-message variant="warning">
				<gov-icon slot="icon" name="info"></gov-icon>
				<p>
					Warning
				</p>
			</gov-form-message>
			<gov-form-message variant="warning">
				<p>
					Warning
				</p>
			</gov-form-message>
			<gov-form-message variant="success">
				<gov-icon slot="icon" name="info"></gov-icon>
				<p>
					Success
				</p>
			</gov-form-message>
			<gov-form-message variant="success">
				<p>
					Success
				</p>
			</gov-form-message>
			<gov-form-message>
				<gov-icon slot="icon" name="info"></gov-icon>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dapibus eros, a dapibus metus. Ut a leo lorem. Sed ut fermentum diam. Sed porttitor ligula est, eget lobortis lacus rutrum et. Nunc sapien arcu, faucibus sit amet justo vel, aliquam gravida magna. Pellentesque et tempor risus. 
				</p>
				<p>
					Aliquam suscipit justo dolor, et pellentesque dui venenatis quis. Vestibulum dignissim libero urna, non ultricies neque consequat ut.
				</p>
			</gov-form-message>
			<gov-form-message>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae dapibus eros, a dapibus metus. Ut a leo lorem. Sed ut fermentum diam. Sed porttitor ligula est, eget lobortis lacus rutrum et. Nunc sapien arcu, faucibus sit amet justo vel, aliquam gravida magna. Pellentesque et tempor risus. 
				</p>
				<p>
					Aliquam suscipit justo dolor, et pellentesque dui venenatis quis. Vestibulum dignissim libero urna, non ultricies neque consequat ut.
				</p>
			</gov-form-message>
	`;
  }
}
if (customElements.get('form-message-page') === undefined) {
  customElements.define('form-message-page', FormMessagePage);
}

const removeDiacritics = (string) => {
  if (!string)
    return string;
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const data = () => [
  { name: 'Pepa' },
  { name: 'Katak' },
  { name: 'Tomáš' },
  { name: 'Ludvík' },
  { name: 'Anežda' },
  { name: 'Xaviér' },
  { name: 'Ondřej' },
  { name: 'Mirek' },
  { name: 'Zdeněk' },
  { name: 'Monika' },
  { name: 'Jirka' },
  { name: 'Abrahám' },
  { name: 'Lucie' },
  { name: 'Emily' },
  { name: 'Pavel' },
  { name: 'Gustav' },
  { name: 'Amálie' },
];
class FormsPage extends HTMLElement {
  connectedCallback() {
    (() => {
      setTimeout(() => {
        const selectedList = document.getElementById('selected');
        const moja = document.getElementById('moja');
        const da = document.getElementById('test-me-ujo');
        const po = document.getElementById('bagr');
        const ba = document.getElementById('ba');
        const na = document.getElementById('kaprWWWWWW');
        const ms = document.getElementById('poleno');
        if (ba) {
          ba.addEventListener('gov-change', function (e) {
            console.log(e);
          });
        }
        if (na) {
          na.addEventListener('gov-blur', function (e) {
            console.log(e);
          });
        }
        if (da) {
          console.log(da);
          da.addEventListener('gov-add-file', function (e) {
            console.log(e.detail);
          });
        }
        if (po) {
          po.addEventListener('gov-select', function (e) {
            console.log(e);
          });
          po.setSearchCallback(val => {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(data().filter(({ name }) => {
                  if (!name)
                    return false;
                  return removeDiacritics(name).toLowerCase().indexOf(removeDiacritics(val).toLowerCase()) > -1;
                }));
              }, randomNumber(100, 1000));
            });
          });
        }
        if (ms && selectedList) {
          ms.addEventListener('gov-change', (e) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.detail.value.map((item) => {
              const cta = document.createElement('button');
              cta.innerHTML = item.name;
              cta.addEventListener('click', () => {
                ms.setSelectedOptions([{ value: 'a', name: 'Aneta' }]);
              });
              selectedList.appendChild(cta);
            });
          });
          ms.setOptions([{ value: 'a', name: 'Aneta' }, { value: 'b', name: 'Beata' }, { value: 't', name: 'Tomáš' }]);
          setTimeout(() => {
            //ms.setSelectedOption({value: 'a', name: 'Aneta'})
            //ms.setSelectedOptions([{value: 'a', name: 'Aneta'}])
            //console.log('sets');
            //ms.getSelectedOptions().then((t) => console.log(t))
          }, 5000);
        }
        if (moja) {
          moja.setOptions([{ value: 'd', label: 'Value D' }, { value: 'e', label: 'Value E' }, {
              value: 'f',
              label: 'Value F',
              disabled: true
            }]);
          setTimeout(() => {
            moja.value = 'h';
            moja.setOptions([{ value: 'g', label: 'Value G' }, { value: 'h', label: 'Value H' }, {
                value: 'i',
                label: 'Value I',
              }]);
          }, 2000);
        }
      }, 1000);
    })();
    this.innerHTML = `


<div id="selected" style="border: 1px solid blue"></div>
	<gov-form-control>
				<gov-form-label size="m" slot="top">Multiselect</gov-form-label>
				<gov-form-group>
					<gov-form-multi-select name="test-me" size="xl" id="poleno">
					</gov-form-multi-select>
				</gov-form-group>
			</gov-form-control>

			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select  value="e" name="test-me" size="xl" id="moja">
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<h2>
				Samostatné použití
			</h2>
			<gov-form-input placeholder="Co hledáte" variant="primary">
				<gov-icon slot="right-icon" name="info"></gov-icon>
			</gov-form-input>
			<br>
			<gov-form-select size="l" name="test-me" invalid="true">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<br>
			<gov-form-select size="l" name="test-me" success="true">
				<option value="" selected>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d">Value D</option>
			</gov-form-select>
			<br>
			<gov-form-multi-select size="xl" id="ba" placeholder="Placeholder" wcag-described-by="me-and-you">
				<option value>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d" selected>Value D</option>
				<option value="e">Value E</option>
				<option value="f">Value F</option>
				<option value="g">Value G</option>
				<option value="h">Value H</option>
				<option value="i" selected>Value I</option>
			</gov-form-multi-select>
			<br>
			<gov-form-multi-select size="xl" id="ba" placeholder="Placeholder" wcag-described-by="me-and-you" invalid="true">
				<option value>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d" selected>Value D</option>
				<option value="e">Value E</option>
				<option value="f">Value F</option>
				<option value="g">Value G</option>
				<option value="h">Value H</option>
				<option value="i" selected>Value I</option>
			</gov-form-multi-select>
			<br>
			<gov-form-multi-select size="xl" id="ba" placeholder="Placeholder" wcag-described-by="me-and-you" success="true">
				<option value>Placeholder</option>
				<option value="b">Value B</option>
				<option value="c">Value C</option>
				<option value="d" selected>Value D</option>
				<option value="e">Value E</option>
				<option value="f">Value F</option>
				<option value="g">Value G</option>
				<option value="h">Value H</option>
				<option value="i" selected>Value I</option>
			</gov-form-multi-select>
			<br>
			<gov-form-checkbox name="test-me-c" value="me" checked no-label></gov-form-checkbox>
			<gov-form-radio name="superRadio2" value="me1" no-label></gov-form-radio>
			<br>
			<gov-form-radio name="superRadio2" value="me2" checked no-label></gov-form-radio>
			<gov-form-switch name="test-me" value="me2" checked no-label></gov-form-switch>
			<gov-form-checkbox name="test-me-c" value="me" checked>
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-checkbox>
			<gov-form-radio name="superRadio" value="me1">
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-radio>
			<gov-form-radio name="superRadio" value="me2" checked>
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-radio>
			<gov-form-switch name="test-me" value="me2" checked>
				<gov-form-label slot="label">Souhlasím</gov-form-label>
			</gov-form-switch>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>
				Date & Time input (nativní)
			</h2>
			<gov-form-input size="m" placeholder="Co hledáte" input-type="datetime-local"></gov-form-input>
			<br>
			<gov-form-input size="l" placeholder="Co hledáte" input-type="date"></gov-form-input>
			<br>
			<gov-form-input size="xl" placeholder="Co hledáte" input-type="time"></gov-form-input>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Search</h2>
			<gov-form-control>
				<gov-form-group>
					<gov-form-search name="test-me-c" value="me" variant="secondary">
						<gov-form-input slot="input" id="kapr" name="test-me" size="m" placeholder="Co hledáte"></gov-form-input>
						<gov-button slot="button" variant="primary" size="s">
							<gov-icon slot="left-icon" name="search"></gov-icon>
						</gov-button>
					</gov-form-search>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-search name="test-me-c" value="me" variant="primary">
						<gov-form-input slot="input" id="kapr" name="test-me" size="l" placeholder="Co hledáte"></gov-form-input>
						<gov-button slot="button" variant="primary" size="m">
							Hledat
						</gov-button>
					</gov-form-search>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-search name="test-me-c" value="me"checked variant="secondary">
						<gov-form-input slot="input" id="kapr" size="xl" name="test-me" placeholder="Co hledáte"></gov-form-input>
						<gov-button slot="button" variant="secondary" size="l">
							Hledat
						</gov-button>
					</gov-form-search>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>File</h2>
			<div class="container-view">
			<h3>Normal 2</h3>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file id="test-me-ujo" multiple accept=".pdf,.jpg,.png,.jpeg" max-file-size="616448">
							<p>
								<gov-button variant="primary" type="outlined" tabindex="-1">
									Nahrát soubor ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file name="test-me-c">
							<p aria-hidden="true">
								<gov-button variant="primary" type="outlined">
									<gov-icon slot="left-icon" name="upload"></gov-icon>
									Nahrát soubor ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file name="test-me-c" invalid>
							<p>
								<gov-button variant="primary" type="outlined">
									<gov-icon slot="left-icon" name="upload"></gov-icon>
									Nahrát soubor ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
					<gov-form-message slot="bottom" variant="error">
						<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
						Required
					</gov-form-message>
				</gov-form-control>
				<br>

				<h3>Expanded</h3>
				<gov-form-control>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file expanded name="test-me-c">
							<p>
								Přetáhněte soubor nebo
							</p>
							<p>
								<gov-button variant="primary" type="outlined">
									Nahrajte ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control disabled>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file expanded name="test-me-c" disabled>
							<p>
								Přetáhněte soubor nebo
							</p>
							<p>
								<gov-button disabled variant="primary" type="outlined">
									Nahrát ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
				</gov-form-control>
				<br>
				<gov-form-control invalid>
					<gov-form-label size="s" slot="top">Přidat přílohu *</gov-form-label>
					<gov-form-group>
						<gov-form-file expanded name="test-me-c" invalid>
							<p>
								Přetáhněte soubor nebo
							</p>
							<p>
								<gov-button variant="primary" type="outlined">
									Nahrát ze zařízení
								</gov-button>
							</p>
							<p class="gov-text--s">
								Podporované formáty XML, PDF, DOC
							</p>
						</gov-form-file>
					</gov-form-group>
					<gov-form-message slot="bottom" variant="error">
						<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
						Required
					</gov-form-message>
				</gov-form-control>
				<br>
			</div>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Multiselect</h2>
			<gov-form-control>
				<gov-form-label slot="top">Multiselect</gov-form-label>
				<gov-form-group>
					<gov-form-multi-select id="ba" placeholder="Placeholder" wcag-described-by="me-and-you">
						<option value>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d" selected>Value D</option>
						<option value="e">Value E</option>
						<option value="f">Value F</option>
						<option value="g">Value G</option>
						<option value="h">Value H</option>
						<option value="i" selected>Value I</option>
					</gov-form-multi-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Autocomplete</h2>
			<gov-form-control>
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr" invalid="true">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr" success="true">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label slot="top">Label of autocomplete</gov-form-label>
				<gov-form-group>
					<gov-form-autocomplete placeholder="Placeholder autcomplete" id="bagr" disabled="true">
						<gov-icon name="search" slot="right-icon" />
					</gov-form-autocomplete>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Textarea</h2>
			<h3>
				Default
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of textarea</gov-form-label>
				<gov-form-group>
					<gov-form-input multiline rows="3" name="test-me" placeholder="Placeholder">
						<gov-icon slot="left-icon" name="info"></gov-icon>
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of textarea</gov-form-label>
				<gov-form-group>
					<gov-form-input required multiline rows="3" name="test-me" value="Value of textarea" invalid="TRUE"></gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control id="metro2">
				<gov-form-label size="s" slot="top">Label of textarea</gov-form-label>
				<gov-form-group>
					<gov-form-input multiline rows="3" name="test-me" disabled value="Value of textarea"></gov-form-input>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Checkbox</h2>
			<h3>
				Gaps
			</h3>
			<gov-form-control>
				<gov-form-label size="xs" slot="top">Label of word</gov-form-label>
				<gov-form-group gap="2xs">
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked></gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked></gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="2xs">
					<gov-form-checkbox name="test-me-c" value="me" size="xs" required checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="xs">
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="s">
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group gap="m">
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked>
						<gov-form-label slot="label">Option 1</gov-form-label>
					</gov-form-checkbox>
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked>
						<gov-form-label slot="label">Option 2</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Default
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" checked invalid="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="s" checked invalid="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked invalid="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="xs" disabled>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="s" disabled="True">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="m" checked disabled="TRUE">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-checkbox name="test-me-c" value="me" size="l" checked disabled="1">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-checkbox>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Radio</h2>
			<h3>
				Default group
			</h3>
			<gov-form-control fieldset>
					<gov-form-label legend size="s" slot="top">Seznam skupiny</gov-form-label>
				<gov-form-group>
					<gov-form-radio name="test1" value="me" size="xs">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test1" value="me2" size="xs" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test2" value="me" size="s">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test2" value="me2" size="s" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test3" value="me" size="m">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test3" value="me2" size="m" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test4" value="me" size="l">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test4" value="me2" size="l" checked>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test5" value="me" size="xs" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test5" value="me2" size="xs" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test6" value="me" size="s" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test6" value="me2" size="s" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test7" value="me" size="m" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test7" value="me2" size="m" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test8" value="me" size="l" invalid="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test8" value="me2" size="l" checked invalid="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test9" value="me" size="xs" disabled>
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test9" value="me2" size="xs" checked disabled>
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test10" value="me" size="s" disabled="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test10" value="me2" size="s" checked disabled="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test11" value="me" size="m" disabled="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test11" value="me2" size="m" checked disabled="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>
			<br>
			<gov-form-control>
				<gov-form-group>
					<gov-form-radio name="test12" value="me" size="l" disabled="true">
						<gov-form-label slot="label">Value 1</gov-form-label>
					</gov-form-radio>
					<gov-form-radio name="test12" value="me2" size="l" checked disabled="true">
						<gov-form-label slot="label">Value 2</gov-form-label>
					</gov-form-radio>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Select</h2>
			<h3>
				Default
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l">
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="xl">
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Prefix / sufix
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
						<option value="a" selected>Value A</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Success
			</h3>
			<gov-form-control success="true">
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control success="true">
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="xl" success="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="xl" invalid="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="s" disabled>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" disabled>
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="m" disabled="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Souhlasím</gov-form-label>
				<gov-form-group>
					<gov-form-select name="test-me" size="l" disabled="true">
						<option value="" selected>Placeholder</option>
						<option value="b">Value B</option>
						<option value="c">Value C</option>
						<option value="d">Value D</option>
					</gov-form-select>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Input</h2>
			<h3>
				Primary
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="primary" size="m"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input 3333</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="primary" size="l"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="primary" size="xl"></gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Secondary
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="secondary" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" variant="secondary" size="m"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input 3333</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="secondary" size="l"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" variant="secondary" size="xl"></gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Prefix / sufix
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" size="s">
						<p slot="prefix">$</p>
						<p slot="sufix">Kč</p>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" id="kapr" name="test-me" placeholder="Placeholder" size="m">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<span slot="prefix">$</span>
						<span slot="sufix">Kč</span>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Left icon
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Right icon
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s">
					<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m">
					<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Success
			</h3>
			<gov-form-control type="input" id="metro2" success="true">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2" success="true">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2" success="True">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2" success="1">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s" invalid="true"></gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m" invalid="true"></gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l" invalid="true">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl" invalid="true">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control size="m" type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="s" disabled>
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control size="m" type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" placeholder="Placeholder" size="m" disabled>
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="l" disabled="True">
						<gov-icon slot="right-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="input" id="metro2">
				<gov-form-label size="m" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input id="kapr" name="test-me" value="Value of input" size="xl" disabled="1">
						<gov-icon slot="left-icon" name="info"></gov-icon>
					</gov-form-input>
				</gov-form-group>
			</gov-form-control>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h3>
				Password power
			</h3>
			<gov-form-password-power power="0"></gov-form-password-power>
			<gov-form-password-power power="1">slabé</gov-form-password-power>
			<gov-form-password-power power="2">střední</gov-form-password-power>
			<gov-form-password-power power="3">silné</gov-form-password-power>


			<!-- ----------------------------------------------------------------------------------------------------------------------------- -->


			<h2>Switch</h2>
			<h3>
				Default
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>

			<h3>
				With message
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
				<gov-form-message slot="bottom" variant="error">
					<gov-icon slot="icon" name="exclamation-triangle-fill"></gov-icon>
					Required
				</gov-form-message>
			</gov-form-control>

			<h3>
				With label
			</h3>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="s" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-label size="m" slot="top">Label of toggle</gov-form-label>
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Disabled
			</h3>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="xs" disabled>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="s" disabled="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="m" checked disabled="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control type="switch">
				<gov-form-group>
					<gov-form-switch name="test-me" value="me" size="l" checked disabled="true">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>

			<h3>
				Invalid
			</h3>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="xs" invalid="True">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="s" invalid="TRUE">
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="m" invalid="true" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
			<gov-form-control>
				<gov-form-group>
					<gov-form-switch invalid name="test-me" value="me" size="l" invalid="1" checked>
						<gov-form-label slot="label">Souhlasím</gov-form-label>
					</gov-form-switch>
				</gov-form-group>
			</gov-form-control>
		`;
  }
}
if (customElements.get('forms-page') === undefined) {
  customElements.define('forms-page', FormsPage);
}

class FormsRestructurePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h4>Forms</h4>
			<div class="container-view container-view--inline">
			</div>
		`;
  }
}
if (customElements.get('forms-restructue-page') === undefined) {
  customElements.define('forms-restructue-page', FormsRestructurePage);
}

class GridPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>
			Grid
		</h2>
		<style>
			.gov-grid-item span {
				display: block;
				background: lightgray;
				padding: 10px;
			}
		</style>
		<gov-grid>
			<gov-grid-item size="1/12"><span>1/12</span></gov-grid-item>
			<gov-grid-item size="11/12"><span>11/12</span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid>
			<gov-grid-item size="2/12"><span>2/12</span></gov-grid-item>
			<gov-grid-item size="10/12"><span>10/12</span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid>
			<gov-grid-item size="3/12"><span>3/12</span></gov-grid-item>
			<gov-grid-item size="9/12"><span>9/12</span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid>
			<gov-grid-item size="4/12"><span>4/12</span></gov-grid-item>
			<gov-grid-item size="8/12"><span>8/12</span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid>
			<gov-grid-item size="5/12"><span>5/12</span></gov-grid-item>
			<gov-grid-item size="7/12"><span>7/12</span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid>
			<gov-grid-item size="6/12"><span>6/12</span></gov-grid-item>
			<gov-grid-item size="6/12"><span>6/12</span></gov-grid-item>
		</gov-grid>

		<h2>Responsive grid</h2>
		<gov-grid>
			<gov-grid-item size-sm="6/12" size-md="4/12" size-lg="3/12" size-xl="2/12"><span>Cell 1</span></gov-grid-item>
			<gov-grid-item size-sm="6/12" size-md="4/12" size-lg="3/12" size-xl="2/12"><span>Cell 2</span></gov-grid-item>
			<gov-grid-item size-sm="6/12" size-md="4/12" size-lg="3/12" size-xl="2/12"><span>Cell 3</span></gov-grid-item>
			<gov-grid-item size-sm="6/12" size-md="4/12" size-lg="3/12" size-xl="2/12"><span>Cell 4</span></gov-grid-item>
			<gov-grid-item size-sm="6/12" size-md="4/12" size-lg="3/12" size-xl="2/12"><span>Cell 5</span></gov-grid-item>
			<gov-grid-item size-sm="6/12" size-md="4/12" size-lg="3/12" size-xl="2/12"><span>Cell 6</span></gov-grid-item>
		</gov-grid>

		<h2>Horizontal (X) align</h2>
		<gov-grid>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. Ut et tempor risus. In volutpat nec diam semper iaculis. Nam tempus varius nunc, eu congue mauris ornare nec. Sed sodales et nisl vitae volutpat. Duis luctus metus ut justo vestibulum, id suscipit lacus suscipit. Vestibulum at nisi at turpis volutpat fermentum non id erat. Morbi mauris eros, porttitor non tellus sed, iaculis ultrices tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</span></gov-grid-item>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. </span></gov-grid-item>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. Ut et tempor risus. In volutpat nec diam semper iaculis. Nam tempus varius nunc, eu congue mauris ornare nec. Sed sodales et nisl vitae volutpat. Duis luctus metus ut justo vestibulum, id suscipit lacus suscipit. Vestibulum at nisi at turpis volutpat fermentum non id erat.</span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid align-x="middle">
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. Ut et tempor risus. In volutpat nec diam semper iaculis. Nam tempus varius nunc, eu congue mauris ornare nec. Sed sodales et nisl vitae volutpat. Duis luctus metus ut justo vestibulum, id suscipit lacus suscipit. Vestibulum at nisi at turpis volutpat fermentum non id erat. Morbi mauris eros, porttitor non tellus sed, iaculis ultrices tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</span></gov-grid-item>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. </span></gov-grid-item>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. Ut et tempor risus. In volutpat nec diam semper iaculis. Nam tempus varius nunc, eu congue mauris ornare nec. Sed sodales et nisl vitae volutpat. Duis luctus metus ut justo vestibulum, id suscipit lacus suscipit. Vestibulum at nisi at turpis volutpat fermentum non id erat.</span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid align-x="bottom">
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. Ut et tempor risus. In volutpat nec diam semper iaculis. Nam tempus varius nunc, eu congue mauris ornare nec. Sed sodales et nisl vitae volutpat. Duis luctus metus ut justo vestibulum, id suscipit lacus suscipit. Vestibulum at nisi at turpis volutpat fermentum non id erat. Morbi mauris eros, porttitor non tellus sed, iaculis ultrices tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</span></gov-grid-item>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. </span></gov-grid-item>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. Ut et tempor risus. In volutpat nec diam semper iaculis. Nam tempus varius nunc, eu congue mauris ornare nec. Sed sodales et nisl vitae volutpat. Duis luctus metus ut justo vestibulum, id suscipit lacus suscipit. Vestibulum at nisi at turpis volutpat fermentum non id erat.</span></gov-grid-item>
		</gov-grid>
		<br>

		<h2>Vertical (Y) align</h2>
		<gov-grid>
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. </span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid align-y="center">
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. </span></gov-grid-item>
		</gov-grid>
		<br>
		<gov-grid align-y="right">
			<gov-grid-item size="4/12"><span>Curabitur tincidunt leo elit, et accumsan leo vestibulum sit amet. Nulla quis nibh a diam ultricies volutpat. Pellentesque fringilla id diam in placerat. Pellentesque consectetur, nisl tincidunt scelerisque vulputate, diam velit cursus neque, eu posuere urna metus id justo. </span></gov-grid-item>
		</gov-grid>
			`;
  }
}
if (customElements.get('grid-page') === undefined) {
  customElements.define('grid-page', GridPage);
}

class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<form style="padding: 20px;">
			<gov-form-label legend>
				Form Label legend
			</gov-form-label>
			<gov-form-control type="input">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<br><br>
			<legend>Legend</legend>
			<gov-form-control type="input">
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<br><br>
			<gov-form-control type="input" fieldset>
				<gov-form-label size="s" slot="top">Form control fieldset</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
				</gov-form-group>
			</gov-form-control>
			<br><br>
			<fieldset>
				<gov-form-label size="s" slot="top">Fieldset</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
				</gov-form-group>
			</fieldset>
			<br><br>
			<fieldset>
				<legend>Fieldset & Legend</legend>
				<gov-form-label size="s" slot="top">Label of input</gov-form-label>
				<gov-form-group>
					<gov-form-input type="number" name="test-me" placeholder="Placeholder" variant="primary" size="s"></gov-form-input>
				</gov-form-group>
			</fieldset>
		</form>
		`;
  }
}
if (customElements.get('home-page') === undefined) {
  customElements.define('home-page', HomePage);
}

class InfobarPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Infobar</h2>

		<div class="gov-bg--secondary-800">
			<gov-container>
				<gov-infobar variant="secondary" headline="Tohle bude super nadpis pro všechno" closable>
					<gov-icon name="info" slot="icon"></gov-icon>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-infobar>
			</gov-container>
		</div>

		<div class="gov-bg--primary-600">
			<gov-container>
				<gov-infobar variant="primary" headline="Tohle bude super nadpis pro všechno" closable>
					<gov-icon name="info" slot="icon"></gov-icon>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-infobar>
			</gov-container>
		</div>

		<div class="gov-bg--success-500">
			<gov-container>
				<gov-infobar variant="success" headline="Tohle bude super nadpis pro všechno" closable>
					<gov-icon name="info" slot="icon"></gov-icon>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-infobar>
			</gov-container>
		</div>

		<div class="gov-bg--error-400">
			<gov-container>
				<gov-infobar variant="error" headline="Tohle bude super nadpis pro všechno" closable>
					<gov-icon name="info" slot="icon"></gov-icon>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-infobar>
			</gov-container>
		</div>

		<div class="gov-bg--warning-400">
			<gov-container>
				<gov-infobar variant="warning" headline="Tohle bude super nadpis pro všechno" closable>
					<gov-icon name="info" slot="icon"></gov-icon>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-infobar>
			</gov-container>
		</div>

		<br/>

		<gov-infobar variant="secondary" headline="Tohle bude super nadpis pro všechno" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>


		<br>
		<gov-infobar variant="secondary">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar variant="warning" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Warning - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar variant="error" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Error - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar variant="success" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Error - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar variant="primary" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Error - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>

		<h3>Inverse</h3>
		<br>
		<gov-infobar inverse="TRUE" variant="secondary" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar inverse="True" variant="warning" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Warning - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar inverse="1" variant="error" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Error - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar inverse="true" variant="success" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Error - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		<br>
		<gov-infobar inverse="true" variant="primary" closable>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Error - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-infobar>
		`;
  }
}
if (customElements.get('infobar-page') === undefined) {
  customElements.define('infobar-page', InfobarPage);
}

class LayoutPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Layout</h2>

		<gov-container>
			<gov-layout type="stretch">
				<gov-layout-column>
					<p><b>Stretch</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout>
				<gov-layout-column>
					<p><b>Stretch</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
				<gov-layout-column>
					<p><b>Stretch</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout>
				<gov-layout-column>
					<p><b>Stretch</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
				<gov-layout-column>
					<p><b>Stretch</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
				<gov-layout-column>
					<p><b>Stretch</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout type="aside" variant="right">
				<gov-layout-column>
					<p><b>Aside right</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
				<gov-layout-column>
					<p><b>Aside right</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout type="aside" variant="left">
				<gov-layout-column>
					<p><b>Aside left</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus.</p>
				</gov-layout-column>
				<gov-layout-column>
					<p><b>Aside left</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout type="aside" variant="right" inverse>
				<gov-layout-column>
					<p><b>Aside right inverse</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
				<gov-layout-column>
					<p><b>Aside right inverse</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout type="aside" variant="left" inverse>
				<gov-layout-column>
					<p><b>Aside left inverse</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus.</p>
				</gov-layout-column>
				<gov-layout-column>
					<p><b>Aside left inverse</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout type="text" variant="left">
				<gov-layout-column>
					<p><b>Text left</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout type="text">
				<gov-layout-column>
					<p><b>Text</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
			<gov-layout type="text" variant="right">
				<gov-layout-column>
					<p><b>Text right</b> Ut sollicitudin risus sit amet placerat fermentum. Sed libero mauris, maximus cursus magna tincidunt, efficitur congue enim. Suspendisse potenti. Sed ac eleifend leo. Nullam a sapien in diam semper faucibus sit amet vel nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu faucibus mi. Morbi leo ipsum, tempus vel vulputate non, varius et lectus. Donec justo lacus, congue hendrerit felis sit amet, commodo lobortis neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla vulputate urna sapien. Proin imperdiet rhoncus dictum. Pellentesque tempor ultrices tortor, ac mollis lorem mollis non. Phasellus sit amet maximus ex, id scelerisque nulla. Etiam eu orci a nulla semper maximus et at quam.</p>
				</gov-layout-column>
			</gov-layout>
			<br>
		</gov-container>
		<br>

		`;
  }
}
if (customElements.get('layout-page') === undefined) {
  customElements.define('layout-page', LayoutPage);
}

class LoadingPage extends HTMLElement {
  connectedCallback() {
    setTimeout(function () {
      document.getElementById('btn').addEventListener('gov-click', function () {
        document.getElementById('loading').setAttribute('loading', 'true');
      });
    }, 500);
    this.innerHTML = `
			<h2>Loading</h2>
			<div class="preview-container">
      <div class="skeletons-defaults">
        <h2>Default</h2>
        <gov-skeleton variant="success"></gov-skeleton>     
      </div>
      <div class="skeletons-appearance-circle">
        <h2>Default circle</h2>
        <gov-skeleton shape="circle"> </gov-skeleton>
      </div> 
      <div class="skeletons-appearance-circle">
        <h2>Default rect</h2>
        <gov-skeleton shape="rect"> </gov-skeleton>
      </div>       
      <div class="skeletons-with-count">
        <h2>Default 4 rows</h2>
        <gov-skeleton count="2"></gov-skeleton>
      </div>           
      <div class="skeletons-animation-no-animation">
        <h2>Without animation</h2>
        <gov-skeleton animation="false"></gov-skeleton>
      </div>
      <div class="skeletons-animation-pulse">
        <h2>Pulse animation</h2>
        <gov-skeleton animation="pulse"></gov-skeleton>
      </div>
      <div class="skeletons-animation-progress">
        <h2>Progress animation</h2>
        <gov-skeleton animation="progress"></gov-skeleton>
      </div>
      <div class="skeletons-with-theming">
        <h2>Custom styles</h2>
        <style>
          .custom-skeleton {
            --skeleton-width: 100px;
            --skeleton-height: 100px;
            --skeleton-background: #cccccc;
            --skeleton-border-radius: 20px;
          }
        </style>
        <gov-skeleton></gov-skeleton>
      </div>
      <div>
        <h2>Custom width</h2>
        <gov-skeleton width="500px"></gov-skeleton>
      </div>
      <div>
        <h2>Custom height</h2>
        <gov-skeleton height="80px"></gov-skeleton>
      </div>
    </div>
			
			
			<gov-button variant="primary" id="btn" wcag-label="Zobrazit načítání">Zobrazit načítání</gov-button>

			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>

			<gov-loading id="loading">Načítání</gov-loading>
		`;
  }
}
if (customElements.get('loading-page') === undefined) {
  customElements.define('loading-page', LoadingPage);
}

class MessagePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>
			Content Message
		</h2>
		<gov-message variant="error">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-message>
		<br>
		<gov-message variant="primary">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-message>
		<br>
		<gov-message variant="success">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-message>
		<br>
		<gov-message variant="warning">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-message>
		<br>
		<gov-message variant="secondary">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-message>
		<br>

		<div class="gov-bg--secondary-300" style="padding: 48px">
			<h3>Inverse</h3>
			<gov-message inverse variant="error">
				<gov-icon name="info" slot="icon"></gov-icon>
				<p>
					Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
				</p>
			</gov-message>
			<br>
			<gov-message inverse variant="primary">
				<gov-icon name="info" slot="icon"></gov-icon>
				<p>
					Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
				</p>
			</gov-message>
			<br>
			<gov-message inverse variant="success">
				<gov-icon name="info" slot="icon"></gov-icon>
				<p>
					Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
				</p>
			</gov-message>
			<br>
			<gov-message inverse variant="warning">
				<gov-icon name="info" slot="icon"></gov-icon>
				<p>
					Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
				</p>
			</gov-message>
			<br>
			<gov-message inverse variant="secondary">
				<gov-icon name="info" slot="icon"></gov-icon>
				<p>
					Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
				</p>
			</gov-message>
		</div>

		<h3>Shadow</h3>
		<gov-message variant="secondary" shadow>
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Font awesome. Default - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
			</p>
		</gov-message>
			`;
  }
}
if (customElements.get('message-page') === undefined) {
  customElements.define('message-page', MessagePage);
}

class ModalPage extends HTMLElement {
  connectedCallback() {
    setTimeout(function () {
      document.getElementById('btn').addEventListener('gov-click', function () {
        document.getElementById('modal').setAttribute('open', 'true');
      });
    }, 500);
    this.innerHTML = `
			<h2>Modal</h2>
			<gov-button variant="primary" id="btn" wcag-label="Zobrazit formulář o výši dávky">Vyplnit formulář</gov-button>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>

			<gov-modal label="Podání daňového přiznání" id="modal" wcag-close-label="Zavřít modal žádosti o dávku">
				<gov-icon slot="icon" name="info"></gov-icon>
				<h3>Obsah modálního okna</h3>
				<p>Bude tvořen libovolnými komponentami</p>
				<h3>Obsah modálního okna</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eros libero, pulvinar vitae tempor at, laoreet quis mi. Vivamus vitae orci mi. Sed eget nisi convallis, condimentum diam a, fermentum risus. Proin vulputate pretium nisi sit amet commodo. Fusce ac magna velit. Maecenas sit amet sem quis arcu lobortis varius a non urna. Morbi ex neque, tempor bibendum sagittis vitae, vulputate ut nibh. Vestibulum sit amet pretium metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut molestie varius nisi, sed mattis quam mollis vulputate. Morbi semper, purus sed ornare sodales, risus tellus porta massa, et eleifend erat diam vitae ex.
				</p>
				<p>
					Suspendisse quis justo nibh. Aenean id purus mattis, posuere urna a, blandit magna. Aenean a ante eleifend, ornare ipsum quis, bibendum mauris. Integer eget posuere sem, in tincidunt quam. Phasellus massa erat, sodales vel hendrerit vitae, ultrices quis dolor. Fusce id vestibulum sem, eu pretium sem. Praesent lacinia, odio non aliquam cursus, arcu ipsum ornare diam, vitae pharetra erat dui non velit. Quisque eu tempus mi. Nam a diam mauris. Quisque sollicitudin risus eu neque accumsan vulputate. Ut tincidunt metus eu nulla sodales, vitae dictum justo ornare. In tincidunt lobortis nunc, ac imperdiet odio condimentum nec. Ut aliquet pulvinar ligula vitae tincidunt. Phasellus egestas ut leo pretium laoreet. Fusce et vestibulum purus. Duis semper sem massa, non dignissim nunc aliquam sit amet.
				</p>
				<p>
					Praesent blandit mattis neque varius sagittis. Nulla ac scelerisque justo. Vestibulum aliquet blandit pharetra. Quisque lacus mi, tincidunt ac dui at, lobortis efficitur nisi. Fusce laoreet maximus purus, sit amet pulvinar mauris facilisis in. Integer fermentum elit eu aliquam sodales. Curabitur laoreet pharetra est rutrum posuere. In at eros tempus ex sodales facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras placerat dolor ac urna elementum facilisis. Aenean diam nibh, sollicitudin in porta sed, laoreet in nisl. Ut scelerisque tortor augue, vitae fermentum dui ornare non. Nulla fringilla libero non metus venenatis, eu maximus massa placerat. Praesent elementum convallis metus, vel iaculis sem pretium cursus.
				</p>
				<gov-button slot="footer" variant="primary" wcag-label="Vyplnit formulář o výši dávky">Vyplnit formulář</gov-button>
			</gov-modal>
		`;
  }
}
if (customElements.get('modal-page') === undefined) {
  customElements.define('modal-page', ModalPage);
}

class NavPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

			<h4>Nav</h4>

			<gov-nav wcag-label="Hlavní navigace">
				<gov-nav-item href="#">
					Úvod
				</gov-nav-item>
				<gov-nav-item href="#">
					Služby veřejná správy
				</gov-nav-item>
				<gov-nav-item href="#">
					Životní události
				</gov-nav-item>
				<gov-nav-item href="#">
					O živote v ČR
				</gov-nav-item>
				<gov-nav-item href="#">
					Časté dotazy
				</gov-nav-item>
			</gov-nav>
		`;
  }
}
if (customElements.get('nav-page') === undefined) {
  customElements.define('nav-page', NavPage);
}

class PaginationPage extends HTMLElement {
  connectedCallback() {
    setTimeout(() => {
      const bagr = document.getElementById('bagr');
      if (bagr) {
        bagr.addEventListener('gov-page', () => {
          // console.log(e)
          // bagr.setAttribute('current', String(e))
        });
      }
    }, 500);
    this.innerHTML = `
		<h2>Pagination</h2>

		<gov-pagination total="212" wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>
		<br>
		<gov-pagination size="s" total="212" wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>
		<br>
		<gov-pagination  id="bagr"  type="select" total="212"  wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>
		<br>
		<gov-pagination type="select" size="s" total="212"  wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>
		<br>
		<br>
		<gov-pagination variant="secondary" total="212" current="2" wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>
		<br>
		<gov-pagination size="s" variant="secondary" wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>
		<br>
		<gov-pagination type="select" variant="secondary" total="212"  wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>
		<br>
		<gov-pagination type="select" variant="secondary" size="s" total="212"  wcag-label="Stránkování pro sekci dokumenty" wcag-select-label="Vybrat stránku"></gov-pagination>

		`;
  }
}
if (customElements.get('pagination-page') === undefined) {
  customElements.define('pagination-page', PaginationPage);
}

class PromptPage extends HTMLElement {
  connectedCallback() {
    setTimeout(function () {
      document.getElementById('btn').addEventListener('gov-click', function () {
        document.getElementById('modal').setAttribute('open', 'true');
      });
    }, 500);
    this.innerHTML = `
            <h2>Prompt</h2>
			<gov-button variant="error" id="btn">Smazat dokument</gov-button>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>
			<p>aspo idapo diopad siaspo dasipo dsaiopds iaposa ipodsai dpsoa isapdsoai pdso posadd</p>

			<gov-prompt label="Smazání dokumentu" id="modal" wcag-close-label="Zavřít prompt">
				<gov-icon class="gov-color--error-400" slot="icon" name="info"></gov-icon>
				<p class="gov-text--l gov-color--secondary-800">Opravdu chcete tento dokument smazat?</p>
				<p>Pokud tak učiníte, tak již nebude cesty zpět a souboru bude nenávratně odstraněn ze serveru. Ujistěte se, že máte dostatečnou zálohu.</p>
                <gov-button slot="actions" size="l" variant="primary" type="base">Zrušit</gov-button>
                <gov-button slot="actions" size="l" variant="error">Smazat dokument</gov-button>
			</gov-prompt>
		`;
  }
}
if (customElements.get('prompt-page') === undefined) {
  customElements.define('prompt-page', PromptPage);
}

class SideNavPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Side nav</h2>

		<div style="max-width: 300px;">
			<gov-side-nav>
				<gov-side-nav-item label="Hlavní skupina" count="true" href="#">
					<gov-side-nav-item label="Vše o našem projektu">
						<gov-side-nav-item label="Hodnocení">
						</gov-side-nav-item>
						<gov-side-nav-item label="Rozpočtová politika" count="true">
						</gov-side-nav-item>
						<gov-side-nav-item label="Partneři">
						</gov-side-nav-item>
					</gov-side-nav-item>

					<gov-side-nav-item label="O nás" href="#">
					</gov-side-nav-item>

					<gov-side-nav-item label="O společnosti" href="#">
					</gov-side-nav-item>

					<gov-side-nav-item label="Kontakt">
					</gov-side-nav-item>
				</gov-side-nav-item>

				<gov-side-nav-item label="Produkty" href="#">
				</gov-side-nav-item>

				<gov-side-nav-item label="Ocenění">
				</gov-side-nav-item>

				<gov-side-nav-item label="Naši klienti" href="#">
				</gov-side-nav-item>
			</gov-side-nav>
			<h3>Compact</h3>
			<gov-side-nav compact="true">
				<gov-side-nav-item label="Hlavní skupina" count="true" href="#">
					<gov-side-nav-item label="Vše o našem projektu">
						<gov-side-nav-item label="Hodnocení">
						</gov-side-nav-item>
						<gov-side-nav-item label="Rozpočtová politika" count="true">
						</gov-side-nav-item>
						<gov-side-nav-item label="Partneři">
						</gov-side-nav-item>
					</gov-side-nav-item>

					<gov-side-nav-item label="O nás" href="#">
					</gov-side-nav-item>

					<gov-side-nav-item label="O společnosti" href="#">
					</gov-side-nav-item>

					<gov-side-nav-item label="Kontakt">
					</gov-side-nav-item>
				</gov-side-nav-item>

				<gov-side-nav-item label="Produkty" href="#">
				</gov-side-nav-item>

				<gov-side-nav-item label="Ocenění">
				</gov-side-nav-item>

				<gov-side-nav-item label="Naši klienti" href="#">
				</gov-side-nav-item>
			</gov-side-nav>

			<h3>Inverse</h3>
			<div class="gov-bg--secondary-300" style="padding: 20px;">
				<gov-side-nav inverse="true">
					<gov-side-nav-item label="Hlavní skupina" count="true" href="#">
						<gov-icon slot="icon" name="info"></gov-icon>
						<gov-side-nav-item label="Vše o našem projektu">
							<gov-icon slot="icon" name="info"></gov-icon>
							<gov-side-nav-item label="Hodnocení">
							</gov-side-nav-item>
							<gov-side-nav-item label="Rozpočtová politika" count="true">
							</gov-side-nav-item>
							<gov-side-nav-item label="Partneři">
							</gov-side-nav-item>
						</gov-side-nav-item>

						<gov-side-nav-item label="O nás" href="#">
							<gov-icon slot="icon" name="info"></gov-icon>
						</gov-side-nav-item>

						<gov-side-nav-item label="O společnosti" href="#">
							<gov-icon slot="icon" name="info"></gov-icon>
						</gov-side-nav-item>

						<gov-side-nav-item label="Kontakt">
							<gov-icon slot="icon" name="info"></gov-icon>
						</gov-side-nav-item>
					</gov-side-nav-item>

					<gov-side-nav-item label="Produkty" href="#">
						<gov-icon slot="icon" name="info"></gov-icon>
					</gov-side-nav-item>

					<gov-side-nav-item label="Ocenění">
						<gov-icon slot="icon" name="info"></gov-icon>
					</gov-side-nav-item>

					<gov-side-nav-item label="Naši klienti" href="#">
						<gov-icon slot="icon" name="info"></gov-icon>
					</gov-side-nav-item>
				</gov-side-nav>
			</div>
		</div>
		`;
  }
}
if (customElements.get('side-nav-page') === undefined) {
  customElements.define('side-nav-page', SideNavPage);
}

class SpacerPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<style>
			 gov-spacer {
				background: lightgray;
				margin-bottom: 10px;
			 }
			</style>
			<gov-spacer size="2xs" breakpoint="sm"></gov-spacer>
			<gov-spacer size="xs" breakpoint="sm"></gov-spacer>
			<gov-spacer size="s" breakpoint="sm"></gov-spacer>
			<gov-spacer size="m" breakpoint="sm"></gov-spacer>
			<gov-spacer size="l" breakpoint="sm"></gov-spacer>
			<gov-spacer size="xl" breakpoint="sm"></gov-spacer>
			<gov-spacer size="2xl" breakpoint="sm"></gov-spacer>
			<gov-spacer size="3xl" breakpoint="sm"></gov-spacer>
			<gov-spacer size="4xl" breakpoint="sm"></gov-spacer>
		`;
  }
}
if (customElements.get('spacer-page') === undefined) {
  customElements.define('spacer-page', SpacerPage);
}

class StatsbarPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<gov-statsbar>
				<gov-statsbar-item>
					<slot>215 mil</slot>
					<p slot="text">datových zpráv</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
			<hr />
			<gov-statsbar>
				<gov-statsbar-item>
					<gov-icon type="complex" name="id-card" slot="icon"></gov-icon>
					<slot>215 mil</slot>
					<p slot="text">Font Awesome</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="job-loss" slot="icon"></gov-icon>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="globe" slot="icon"></gov-icon>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="new-comments" slot="icon"></gov-icon>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
			<hr />
			<gov-statsbar icon-position="left">
				<gov-statsbar-item>
					<gov-icon type="complex" name="id-card" slot="icon"></gov-icon>
					<slot>215 mil</slot>
					<p slot="text">datových zpráv</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="job-loss" slot="icon"></gov-icon>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="globe" slot="icon"></gov-icon>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="new-comments" slot="icon"></gov-icon>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
			<hr />
			<gov-statsbar inverse variant="secondary">
				<gov-statsbar-item>
					<slot>215 mil</slot>
					<p slot="text">datových zpráv</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
			<hr />
			<gov-statsbar inverse>
				<gov-statsbar-item>
					<gov-icon type="complex" name="id-card" slot="icon"></gov-icon>
					<slot>215 mil</slot>
					<p slot="text">datových zpráv</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="job-loss" slot="icon"></gov-icon>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="globe" slot="icon"></gov-icon>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="new-comments" slot="icon"></gov-icon>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
			<hr />
			<gov-statsbar inverse variant="secondary" icon-position="left">
				<gov-statsbar-item>
					<gov-icon type="complex" name="id-card" slot="icon"></gov-icon>
					<slot>215 mil</slot>
					<p slot="text">datových zpráv</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="job-loss" slot="icon"></gov-icon>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="globe" slot="icon"></gov-icon>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="new-comments" slot="icon"></gov-icon>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
			<hr />
			<gov-statsbar variant="secondary">
					<gov-statsbar-item>
						<slot>215 mil</slot>
						<p slot="text">datových zpráv</p>
					</gov-statsbar-item>
					<gov-statsbar-item>
						<slot>1 mil</slot>
						<p slot="text">datových schránek</p>
					</gov-statsbar-item>
					<gov-statsbar-item>
						<slot>967 tis</slot>
						<p slot="text">hodin ušetřených ve frontách</p>
					</gov-statsbar-item>
					<gov-statsbar-item>
						<slot>12 mil</slot>
						<p slot="text">ušetřených korun</p>
					</gov-statsbar-item>
			</gov-statsbar>
			<gov-statsbar variant="secondary">
				<gov-statsbar-item>
					<gov-icon type="complex" name="id-card" slot="icon"></gov-icon>
					<slot>215 mil</slot>
					<p slot="text">datových zpráv</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="job-loss" slot="icon"></gov-icon>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="globe" slot="icon"></gov-icon>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="new-comments" slot="icon"></gov-icon>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
			<gov-statsbar variant="secondary" icon-position="left">
				<gov-statsbar-item>
					<gov-icon type="complex" name="id-card" slot="icon"></gov-icon>
					<slot>215 mil</slot>
					<p slot="text">datových zpráv</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="job-loss" slot="icon"></gov-icon>
					<slot>1 mil</slot>
					<p slot="text">datových schránek</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="globe" slot="icon"></gov-icon>
					<slot>967 tis</slot>
					<p slot="text">hodin ušetřených ve frontách</p>
				</gov-statsbar-item>
				<gov-statsbar-item>
					<gov-icon type="complex" name="new-comments" slot="icon"></gov-icon>
					<slot>12 mil</slot>
					<p slot="text">ušetřených korun</p>
				</gov-statsbar-item>
			</gov-statsbar>
		`;
  }
}
if (customElements.get('statsbar-page') === undefined) {
  customElements.define('statsbar-page', StatsbarPage);
}

class StepperPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h2>Stepper</h2>

			<h3>Velikost M</h3>
			<gov-spacer size="l"></gov-spacer>

			<gov-stepper>
				<gov-stepper-item trigger-tag="h1" label="Hotový krok" variant="success" annotation="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
					<gov-icon slot="prefix" name="check-lg"></gov-icon>
					<div slot="content">
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus. Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</div>
				</gov-stepper-item>
				<gov-stepper-item label="Chybový krok" variant="error">
					<gov-icon slot="prefix" name="x-lg"></gov-icon>
				</gov-stepper-item>
				<gov-stepper-item collapsible="true" label="Krok s textem, obrázkem, tlačítkem" variant="primary" annotation="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus">
					<span slot="prefix">2</span>
					<div slot="content">
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus. Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus. Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</div>
				</gov-stepper-item>
				<gov-stepper-item label="Budoucí krok" variant="secondary">
					<span slot="prefix">3</span>
				</gov-stepper-item>
				<gov-stepper-item label="Budoucí krok" variant="warning">
					<span slot="prefix">4</span>
				</gov-stepper-item>
			</gov-stepper>

			<br><br>
			<h3>Velikost S</h3>
			<gov-spacer size="l"></gov-spacer>

			<gov-stepper size="s">
				<gov-stepper-item trigger-tag="h1" label="Hotový krok" variant="success" annotation="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus">
					<gov-icon slot="prefix" name="check-lg"></gov-icon>
				</gov-stepper-item>
				<gov-stepper-item label="Chybový krok" variant="error">
					<gov-icon slot="prefix" name="x-lg"></gov-icon>
				</gov-stepper-item>
				<gov-stepper-item label="Krok s textem, obrázkem, tlačítkem" variant="primary">
					<span slot="prefix">2</span>
					<div slot="content">
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</div>
				</gov-stepper-item>
				<gov-stepper-item label="Budoucí krok" variant="secondary">
					<span slot="prefix">3</span>
				</gov-stepper-item>
				<gov-stepper-item label="Budoucí krok" variant="warning">
					<span slot="prefix">4</span>
				</gov-stepper-item>
			</gov-stepper>

			<br><br>
			<h3>Velikost XS</h3>
			<gov-spacer size="l"></gov-spacer>

			<gov-stepper size="xs">
				<gov-stepper-item trigger-tag="h1" label="Hotový krok" variant="success" annotation="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus">
					<gov-icon slot="prefix" name="check-lg"></gov-icon>
				</gov-stepper-item>
				<gov-stepper-item label="Chybový krok" variant="error">
					<gov-icon slot="prefix" name="x-lg"></gov-icon>
				</gov-stepper-item>
				<gov-stepper-item label="Krok s textem, obrázkem, tlačítkem" variant="primary">
					<span slot="prefix">2</span>
					<div slot="content">
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</div>
				</gov-stepper-item>
				<gov-stepper-item label="Budoucí krok" variant="secondary">
					<span slot="prefix">3</span>
				</gov-stepper-item>
				<gov-stepper-item label="Budoucí krok" variant="warning">
					<span slot="prefix">4</span>
				</gov-stepper-item>
			</gov-stepper>
		`;
  }
}
if (customElements.get('stepper-page') === undefined) {
  customElements.define('stepper-page', StepperPage);
}

class TabsPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h2>Tabs</h2>
			<gov-tabs id="po" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" variant="secondary" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" variant="success" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" variant="warning" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" variant="error" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>

			<gov-tabs id="po" type="chip" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>

			<gov-tabs id="po" variant="secondary" type="chip" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" variant="success" type="chip" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" variant="warning" type="chip" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" variant="error" type="chip" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>

			<h2>Vertical tabs</h2>
			<gov-tabs id="po" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti" orientation="vertical">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi super tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi super tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti" orientation="vertical">
				<gov-tabs-item label="Muj super tab">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="Dalsi super tab s dlouhým popisem" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="Další super tab s naprosto nesmyslně dlouhým popisem, který se doufám nevyužije">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" type="chip" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti" orientation="vertical">
				<gov-tabs-item label="TAB #1">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #2" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="TAB #3">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
			<gov-tabs id="po" type="chip" wcag-label="Důležitý tabs" wcag-select-label="Výběr možnosti" orientation="vertical">
				<gov-tabs-item label="Muj super tab">
					<p>Muj super tab - Lorem ipsum (zkráceně lipsum) je označení pro standardní pseudolatinský text užívaný v grafickém
						designu a navrhování jako demonstrativní výplňový text při vytváření pracovních ukázek grafických
						návrhů (např. internetových stránek, rozvržení časopisů či všech druhů reklamních materiálů). Lipsum
						tak pracovně znázorňuje text v ukázkových maketách (tzv. mock-up) předtím, než bude do hotového
						návrhu vložen smysluplný obsah.</p>
				</gov-tabs-item>
				<gov-tabs-item label="Dalsi super tab s dlouhým popisem" default>
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou
						strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný
						text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně
						atd.</p>
				</gov-tabs-item>
				<gov-tabs-item label="Další super tab s naprosto nesmyslně dlouhým popisem, který se doufám nevyužije">
					<p>Dalsi suepr tab - Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se
						pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text
						(např. opakování „asdf asdf asdf…“).</p>
				</gov-tabs-item>
			</gov-tabs>
		`;
  }
}
if (customElements.get('tabs-page') === undefined) {
  customElements.define('tabs-page', TabsPage);
}

class TagPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<h1>Tags</h1>
			<h4>Tags - primary (default)</h4>
			<div class="container-view">
				<gov-tag variant="primary" size="xs" type="solid">
					Tag
				</gov-tag>
				<gov-tag variant="primary" size="xs" type="solid">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Tag
				</gov-tag>
				<gov-tag variant="primary" size="xs" type="solid">
					Tag
					<gov-icon slot="right-icon" name="star-fill"></gov-icon>
				</gov-tag>
				<gov-tag variant="primary" size="xs" type="solid">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Tag
					<gov-icon slot="right-icon" name="star-fill"></gov-icon>
				</gov-tag>
				<gov-tag variant="primary" size="s" type="solid">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small Primary
				</gov-tag>
				<gov-tag variant="primary" size="m" type="solid">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal Primary
					<gov-icon slot="right-icon" name="star-fill"></gov-icon>
				</gov-tag>
				<gov-tag variant="primary" size="l" type="solid">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Large Primary
					<gov-icon slot="right-icon" name="star-fill"></gov-icon>
				</gov-tag>
				<gov-tag variant="primary" size="xl" type="solid">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					X-Large Primary
					<gov-icon slot="right-icon" name="star-fill"></gov-icon>
				</gov-tag>
			</div>
			<h4>Tags - primary (inversed)</h4>
			<div class="container-view">
				<gov-tag variant="primary" size="xs" inverse="true">
					Tag
				</gov-tag>
				<gov-tag variant="primary" size="s" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small Primary
				</gov-tag>
				<gov-tag variant="primary" size="m" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal Primary
				</gov-tag>
			</div>
			<h4>Tags - primary (outlined)</h4>
			<div class="container-view">
				<gov-tag variant="primary" type="outlined" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="primary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small Primary
				</gov-tag>
				<gov-tag variant="primary" type="outlined" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal Primary
				</gov-tag>
			</div>
			<hr />

			<h4>Tags - secondary (default)</h4>
			<div class="container-view">
				<gov-tag variant="secondary" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="secondary" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small secondary
				</gov-tag>
				<gov-tag variant="secondary" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal secondary
				</gov-tag>
			</div>
			<h4>Tags - secondary (inversed)</h4>
			<div class="container-view">
				<gov-tag variant="secondary" size="xs" inverse="true">
					Tag
				</gov-tag>
				<gov-tag variant="secondary" size="s" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small Primary
				</gov-tag>
				<gov-tag variant="secondary" size="m" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal Primary
				</gov-tag>
			</div>
			<h4>Tags - secondary (outlined)</h4>
			<div class="container-view">
				<gov-tag variant="secondary" type="outlined" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="secondary" type="outlined" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small secondary
				</gov-tag>
				<gov-tag variant="secondary" type="outlined" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal secondary
				</gov-tag>
			</div>
			<hr />

			<h4>Tags - success (default)</h4>
			<div class="container-view">
				<gov-tag variant="success" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="success" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small success
				</gov-tag>
				<gov-tag variant="success" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal success
				</gov-tag>
			</div>
			<h4>Tags - success (inversed)</h4>
			<div class="container-view">
				<gov-tag variant="success" size="xs" inverse="true">
					Tag
				</gov-tag>
				<gov-tag variant="success" size="s" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small Primary
				</gov-tag>
				<gov-tag variant="success" size="m" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal Primary
				</gov-tag>
			</div>
			<h4>Tags - success (outlined)</h4>
			<div class="container-view">
				<gov-tag variant="success" type="outlined" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="success" type="outlined" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small success
				</gov-tag>
				<gov-tag variant="success" type="outlined" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal success
				</gov-tag>
			</div>
			<hr />

			<h4>Tags - warning (default)</h4>
			<div class="container-view">
				<gov-tag variant="warning" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="warning" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small warning
				</gov-tag>
				<gov-tag variant="warning" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal warning
				</gov-tag>
			</div>
			<h4>Tags - warning (inversed)</h4>
			<div class="container-view">
				<gov-tag variant="warning" size="xs" inverse="true">
					Tag
				</gov-tag>
				<gov-tag variant="warning" size="s" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small Primary
				</gov-tag>
				<gov-tag variant="warning" size="m" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal Primary
				</gov-tag>
			</div>
			<h4>Tags - warning (outlined)</h4>
			<div class="container-view">
				<gov-tag variant="warning" type="outlined" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="warning" type="outlined" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small warning
				</gov-tag>
				<gov-tag variant="warning" type="outlined" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal warning
				</gov-tag>
			</div>
			<hr />

			<h4>Tags - error (default)</h4>
			<div class="container-view">
				<gov-tag variant="error" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="error" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small error
				</gov-tag>
				<gov-tag variant="error" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal error
				</gov-tag>
			</div>
			<h4>Tags - error (inversed)</h4>
			<div class="container-view">
				<gov-tag variant="error" size="xs" inverse="true">
					Tag
				</gov-tag>
				<gov-tag variant="error" size="s" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small Primary
				</gov-tag>
				<gov-tag variant="error" size="m" inverse="true">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal Primary
				</gov-tag>
			</div>
			<h4>Tags - error (outlined)</h4>
			<div class="container-view">
				<gov-tag variant="error" type="outlined" size="xs">
					Tag
				</gov-tag>
				<gov-tag variant="error" type="outlined" size="s">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Small error
				</gov-tag>
				<gov-tag variant="error" type="outlined" size="m">
					<gov-icon slot="left-icon" name="star-fill"></gov-icon>
					Normal error
				</gov-tag>
			</div>
		`;
  }
}
if (customElements.get('tag-page') === undefined) {
  customElements.define('tag-page', TagPage);
}

class TilesPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>Tiles</h2>

		<div class="gov-bg--secondary-300" style="padding: 48px;">
			<div style="max-width: 600px;">
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<br>
				<gov-tile name="Zdroje energie, těžba, nerosty, drahé kovy">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<ul class="gov-list--plain">
						<li><a href="#">Občanský život</a></li>
						<li><a href="#">Podnikání v ČR</a></li>
						<li><a href="#">Czech POINT</a></li>
					</ul>
				</gov-tile>
			</div>
			<br>

			<gov-tiles columns="4">
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
			</gov-tiles>
			<br>
			<gov-tiles columns="3" no-border>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
				<gov-tile href="#">
					<gov-icon name="id-card" type="complex" slot="icon"></gov-icon>
					<h3 slot="title">Zdroje energie, těžba, nerosty, drahé kovy</h3>
					<p>
						Secondary - Od 20. 12. 2020 do 14:00 h do 20.&nbsp;12. 2020 do 15:00 h bude provedena plánovaná odstávka serverů. V&nbsp;uvedeném termínu bude nedostupné přihlášení k&nbsp;Portálu občana prostřednictvím datové schránky. Více informací <a href="#">zde</a>.
					</p>
				</gov-tile>
			</gov-tiles>

		</div>
		`;
  }
}
if (customElements.get('tiles-page') === undefined) {
  customElements.define('tiles-page', TilesPage);
}

class ToastMessagePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>
			Toast Message
		</h2>
		<gov-toast variant="success">
			<gov-icon name="check-lg" slot="icon"></gov-icon>
			<p>
				Vaše dokumenty byly úspěšně staženy.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="error" gravity="bottom" position="left">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Není možné požadavek zpracovat z důvodu chyby serveru.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="warning" position="left">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Žádost se nepodařilo odeslat, zkontrolujte nastavení.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="primary" position="center">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Soubory jsou připraveny ke stažení.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="secondary"  gravity="bottom" position="right">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Vaše aplikace byla aktualizovaná na novou verzi!
			</p>
		</gov-toast>
			`;
  }
}
if (customElements.get('toast-message-page') === undefined) {
  customElements.define('toast-message-page', ToastMessagePage);
}

class ToastMessageCountdownPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
		<h2>
			Toast Message Countdown
		</h2>
		<gov-toast variant="success" type="solid" time="10000">
			<gov-icon name="check-lg" slot="icon"></gov-icon>
			<p>
				Vaše dokumenty byly úspěšně staženy.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="error" type="solid" gravity="bottom" position="left" time="10000">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Není možné požadavek zpracovat z důvodu chyby serveru.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="warning" type="solid" position="left" time="10000">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Žádost se nepodařilo odeslat, zkontrolujte nastavení.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="primary" type="solid" position="center" time="10000">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Soubory jsou připraveny ke stažení.
			</p>
		</gov-toast>
		<br>
		<gov-toast variant="secondary" type="solid" gravity="bottom" position="right" time="10000">
			<gov-icon name="info" slot="icon"></gov-icon>
			<p>
				Vaše aplikace byla aktualizovaná na novou verzi!
			</p>
		</gov-toast>
			`;
  }
}
if (customElements.get('toast-message-countdown-page') === undefined) {
  customElements.define('toast-message-countdown-page', ToastMessageCountdownPage);
}

class TooltipPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<div style="width: 500px; overflow: auto; height: 100px">
				<div style="width: 800px; display: flex; flex-direction: row; height: 100px; gap: 20px">
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px"></div>
					<div style="width: 100px; border: 1px solid black; height: 100px">
					<gov-tooltip position="right" size="s" icon>
					<gov-icon name="info"></gov-icon>
					<gov-tooltip-content>
						<ul>
							<li>Toggler div, h1, h2 rozbije celou komponentu. </li>
							<li>Můžu použít tagy jako span, anchor, gov-icon - inlinové. Zde je použita ikonka z knihovny font-awesome</li>
						</ul>
					</gov-tooltip-content>
				</gov-tooltip>
</div>
				</div>
			</div>
			<p>
				Default scheme, size Small. Nelze umístit jako toggle element který je blokový - tj. div, h1, h2, atp.
				<gov-tooltip position="right" size="s" icon>
					<gov-icon name="info"></gov-icon>
					<gov-tooltip-content>
						<ul>
							<li>Toggler div, h1, h2 rozbije celou komponentu. </li>
							<li>Můžu použít tagy jako span, anchor, gov-icon - inlinové. Zde je použita ikonka z knihovny font-awesome</li>
						</ul>
					</gov-tooltip-content>
				</gov-tooltip>
				za prací do států EU byste měli být vždy pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy tento stát.
			</p>
			<p>
				V rámci
				<gov-tooltip variant="secondary" position="top" size="s" message="Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.">
					případě vycestování (top)případě vycestování (top)případě vycestování
				</gov-tooltip>
				států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
			</p>
			<p>V rámci
				<gov-tooltip variant="secondary" position="bottom" size="s">
					případě vycestování (bottom)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip>
				států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
			</p>
			<p>
				V rámci států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				<gov-tooltip variant="secondary" position="top" size="m">
					případě vycestování (top)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip>
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy tento stát.
			</p>
			<p>
				V rámci států EU platí princip jednoho pojištění. V
				<gov-tooltip position="right">
					případě vycestování postion (right)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip>
				za prací do států EU byste měli být vždy pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy tento stát.
			</p>
			<p>
				V rámci
				<gov-tooltip position="top">
					případě vycestování (top)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip>
				států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
			</p>
			<p>
			V rámci
				<gov-tooltip position="bottom">
					případě vycestování (bottom)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip> států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
			</p>
			<p>
				V rámci států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				<gov-tooltip variant="secondary" position="left">
					případě vycestování (left)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip> pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát. V rámci států EU platí princip jednoho pojištění. V
				<gov-tooltip variant="secondary" position="right" size="l">
					případě vycestování (right)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip>
				za prací do států EU byste měli být vždy
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
			</p>
			<p>V rámci
				<gov-tooltip position="top" size="l">
					případě vycestování (top)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip> států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
			</p>
			<p>
				V rámci
				<gov-tooltip variant="secondary" position="bottom" size="l">
					případě vycestování (bottom)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip> států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
			</p>
			<p>
				V rámci států EU platí princip jednoho pojištění. V za prací do států EU byste měli být vždy
				<gov-tooltip inverse variant="secondary" position="left" size="l">
					případě vycestování (left)
					<gov-tooltip-content>
						Znění petice podléhá § 1 odst. 3-4 zákonuč. 85/1990 Sb. Text.
					</gov-tooltip-content>
				</gov-tooltip> pojištěni ve státě, ve kterém pracujete. Pokud pracujete pouze na území jednoho státu, je státem pojištění vždy
				tento stát.
				<br /><br /><br /><br /><br />x
			</p>
	`;
  }
}
if (customElements.get('tooltip-page') === undefined) {
  customElements.define('tooltip-page', TooltipPage);
}

class TypographyPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
			<p>
				<a class="gov-text--xs" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--s" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--m" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--l" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--xl" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--2xl" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--3xl" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--4xl" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--5xl" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
				<a class="gov-text--6xl" href="#copy" target="_blank">paragraph with no more than four lines</a><br>
			</p>

			<ul>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
			</ul>
			<ol>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
				<li>This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines</li>
			</ol>

			<h6 class="gov-text--6xl">Heading 1 Heading 1 Heading 1</h6>
			<h2>Heading 2 Heading 2 Heading 2</h2>
			<p>
				Body 1/400<br />A lead <a href="#copy" target="_blank">paragraph with no more than four lines</a> . Body 1/400 A lead paragraph with no more than four lines. Body 1/400 A lead paragraph with no more than four lines
			</p>
			<h4 class="gov-text--l">Heading 2 Heading 2 Heading 2</h4>
			<h3>Heading 3 Heading 3 Heading 3</h3>
			<p>
				Body 2/400<br />This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines
			</p>
			<h2>Heading 2 Heading 2 Heading 2</h2>
			<h3>Heading 3 Heading 3 Heading 3</h3>
			<p>
				Body 3/400<br />This is for body copy in components such as accordion, structured list or tile. This is for body copy in components such as accordion, structured list or tile.
			</p>
			<h3>Heading 3 Heading 3 Heading 3</h3>
			<h4>Heading 4 Heading 4 Heading 4</h4>
			<p>
				Bold - Body 1/700<br />A lead paragraph with no more than four lines. Body 1/400 A lead paragraph with no more than four lines. Body 1/400 A lead paragraph with no more than four lines
			</p>
			<h4>Heading 4 Heading 4 Heading 4</h4>
			<h5>Heading 5 Heading 5 Heading 5</h5>
			<p>
				Bold - Body 2/700<br />This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines. This is commonly used for long paragraphs with more than four lines
			</p>
			<h5>Heading 5 Heading 5 Heading 5</h5>
			<h6>Heading 6 Heading 6 Heading 6</h6>
			<p>
				Bold - Body 3/700<br />This is for body copy in components such as accordion, structured list or tile. This is for body copy in components such as accordion, structured list or tile.
			</p>
			<h6>Heading 6 Heading 6 Heading 6</h6>
			<p class="text-x-small">
				Assistive<br />This is for explanatory helper text that appears below a field
			</p>
			<ul>
				<li>seznam položka seznam položka seznam položka<br />seznam položka seznam položka seznam položka</li>
				<li>seznam položka seznam položka seznam položka</li>
				<li>seznam položka seznam položka seznam položka</li>
			</ul>
		`;
  }
}
if (customElements.get('typography-page') === undefined) {
  customElements.define('typography-page', TypographyPage);
}

class WizardPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <h2>Wizard</h2>
			<div class="gov-bg--secondary-300" style="padding: 48px">
				<gov-wizard>
					<gov-wizard-item label-tag="h1" label="Font Awesome Icon" variant="success" collapsible>
						<span slot="prefix"><gov-icon name="check-lg"></gov-icon></span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
							<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Kontaktní osoby" variant="primary" is-expanded>
						<span slot="prefix">2</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
							<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Působnost v agendách" variant="secondary" collapsible="false">
						<span slot="prefix">3</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Zřizované organizace" variant="error" collapsible annotation="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus.">
						<span slot="prefix">4</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Zřizované organizace" variant="warning" is-expanded>
						<span slot="prefix">5</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
				</gov-wizard>

				<br><br>

				<gov-wizard size="s">
					<gov-wizard-item label-tag="h1" label="Font Awesome Icon" variant="success" annotation="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus." collapsible>
						<gov-icon slot="prefix" name="check-lg"></gov-icon>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
							<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Kontaktní osoby" variant="primary" is-expanded>
						<span slot="prefix">2</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Působnost v agendách" variant="secondary">
						<span slot="prefix">3</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Zřizované organizace" variant="error">
						<span slot="prefix">4</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Zřizované organizace" variant="warning">
						<span slot="prefix">5</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
				</gov-wizard>
				<br><br>

				<gov-wizard size="xs">
					<gov-wizard-item label-tag="h1" label="Font Awesome Icon" variant="success" annotation="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus." collapsible>
						<gov-icon slot="prefix" name="check-lg"></gov-icon>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
							<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Kontaktní osoby" variant="primary" is-expanded>
						<span slot="prefix">2</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Působnost v agendách" variant="secondary">
						<span slot="prefix">3</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Zřizované organizace" variant="error">
						<span slot="prefix">4</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
					<gov-wizard-item label="Zřizované organizace" variant="warning">
						<span slot="prefix">5</span>
						<p>Opět věc a stylování obsahu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula sollicitudin risus, quis tempor metus imperdiet vitae. Duis in blandit lacus.</p>
					</gov-wizard-item>
				</gov-wizard>
			</div>
		`;
  }
}
if (customElements.get('wizard-page') === undefined) {
  customElements.define('wizard-page', WizardPage);
}

const govAppCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}html,body{margin:0;padding:0}.container-view{padding:12px}hr{height:0;border:0 none;border-top:1px solid gainsboro;font-size:0}hr.inversed{border-top-color:#254e80}";

const GovApp = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  componentWillLoad() {
    const outlet = document.getElementById('outlet');
    outlet.innerHTML = '';
    const router = new Router(outlet);
    router.setRoutes([
      { path: '/', component: 'home-page' },
      { path: '/infobar', component: 'infobar-page' },
      { path: '/accordion', component: 'accordion-page' },
      { path: '/chip', component: 'chip-page' },
      { path: '/button', component: 'button-page' },
      { path: '/breadcrumbs', component: 'breadcrumbs-page' },
      { path: '/card', component: 'card-page' },
      { path: '/message', component: 'message-page' },
      { path: '/cookiebar', component: 'cookiebar-page' },
      { path: '/container', component: 'container-page' },
      { path: '/control-group', component: 'control-group-page' },
      { path: '/empty', component: 'empty-page' },
      { path: '/error', component: 'error-page' },
      { path: '/forms', component: 'forms-page' },
      { path: '/forms-restructue', component: 'forms-restructure-page' },
      { path: '/form-message', component: 'form-message-page' },
      { path: '/form-label', component: 'form-label-page' },
      { path: '/grid', component: 'grid-page' },
      { path: '/loading', component: 'loading-page' },
      { path: '/modal', component: 'modal-page' },
      { path: '/nav', component: 'nav-page' },
      { path: '/spacer', component: 'spacer-page' },
      { path: '/statsbar', component: 'statsbar-page' },
      { path: '/stepper', component: 'stepper-page' },
      { path: '/tabs', component: 'tabs-page' },
      { path: '/tag', component: 'tag-page' },
      { path: '/tooltip', component: 'tooltip-page' },
      { path: '/tiles', component: 'tiles-page' },
      { path: '/typography', component: 'typography-page' },
      { path: '/toast-message', component: 'toast-message-page' },
      { path: '/toast-message-countdown', component: 'toast-message-countdown-page' },
      { path: '/pagination', component: 'pagination-page' },
      { path: '/prompt', component: 'prompt-page' },
      { path: '/wizard', component: 'wizard-page' },
      { path: '/side-nav', component: 'side-nav-page' },
      { path: '/grid', component: 'grid-page' },
      { path: '/layout', component: 'layout-page' },
    ]);
  }
  render() {
    return index.h(index.Host, null);
  }
};
GovApp.style = govAppCss;

exports.gov_app = GovApp;

//# sourceMappingURL=gov-app.cjs.entry.js.map