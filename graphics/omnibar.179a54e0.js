// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../node_modules/riot/riot.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.component = component;
exports.install = install;
exports.mount = mount;
exports.pure = pure;
exports.register = register;
exports.uninstall = uninstall;
exports.unmount = unmount;
exports.unregister = unregister;
exports.version = exports.__ = void 0;

var _expressions, _bindings, _Object$freeze, _Object$freeze2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Riot v4.8.7, @license MIT */
var COMPONENTS_IMPLEMENTATION_MAP = new Map(),
    DOM_COMPONENT_INSTANCE_PROPERTY = Symbol('riot-component'),
    PLUGINS_SET = new Set(),
    IS_DIRECTIVE = 'is',
    VALUE_ATTRIBUTE = 'value',
    MOUNT_METHOD_KEY = 'mount',
    UPDATE_METHOD_KEY = 'update',
    UNMOUNT_METHOD_KEY = 'unmount',
    SHOULD_UPDATE_KEY = 'shouldUpdate',
    ON_BEFORE_MOUNT_KEY = 'onBeforeMount',
    ON_MOUNTED_KEY = 'onMounted',
    ON_BEFORE_UPDATE_KEY = 'onBeforeUpdate',
    ON_UPDATED_KEY = 'onUpdated',
    ON_BEFORE_UNMOUNT_KEY = 'onBeforeUnmount',
    ON_UNMOUNTED_KEY = 'onUnmounted',
    PROPS_KEY = 'props',
    STATE_KEY = 'state',
    SLOTS_KEY = 'slots',
    ROOT_KEY = 'root',
    IS_PURE_SYMBOL = Symbol.for('pure'),
    PARENT_KEY_SYMBOL = Symbol('parent'),
    ATTRIBUTES_KEY_SYMBOL = Symbol('attributes'),
    TEMPLATE_KEY_SYMBOL = Symbol('template');
var globals =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP,
  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY,
  PLUGINS_SET: PLUGINS_SET,
  IS_DIRECTIVE: IS_DIRECTIVE,
  VALUE_ATTRIBUTE: VALUE_ATTRIBUTE,
  MOUNT_METHOD_KEY: MOUNT_METHOD_KEY,
  UPDATE_METHOD_KEY: UPDATE_METHOD_KEY,
  UNMOUNT_METHOD_KEY: UNMOUNT_METHOD_KEY,
  SHOULD_UPDATE_KEY: SHOULD_UPDATE_KEY,
  ON_BEFORE_MOUNT_KEY: ON_BEFORE_MOUNT_KEY,
  ON_MOUNTED_KEY: ON_MOUNTED_KEY,
  ON_BEFORE_UPDATE_KEY: ON_BEFORE_UPDATE_KEY,
  ON_UPDATED_KEY: ON_UPDATED_KEY,
  ON_BEFORE_UNMOUNT_KEY: ON_BEFORE_UNMOUNT_KEY,
  ON_UNMOUNTED_KEY: ON_UNMOUNTED_KEY,
  PROPS_KEY: PROPS_KEY,
  STATE_KEY: STATE_KEY,
  SLOTS_KEY: SLOTS_KEY,
  ROOT_KEY: ROOT_KEY,
  IS_PURE_SYMBOL: IS_PURE_SYMBOL,
  PARENT_KEY_SYMBOL: PARENT_KEY_SYMBOL,
  ATTRIBUTES_KEY_SYMBOL: ATTRIBUTES_KEY_SYMBOL,
  TEMPLATE_KEY_SYMBOL: TEMPLATE_KEY_SYMBOL
});
/**
 * Quick type checking
 * @param   {*} element - anything
 * @param   {string} type - type definition
 * @returns {boolean} true if the type corresponds
 */

function checkType(element, type) {
  return _typeof(element) === type;
}
/**
 * Check that will be passed if its argument is a function
 * @param   {*} value - value to check
 * @returns {boolean} - true if the value is a function
 */


function isFunction(value) {
  return checkType(value, 'function');
}

function noop() {
  return this;
}
/**
 * Autobind the methods of a source object to itself
 * @param   {Object} source - probably a riot tag instance
 * @param   {Array<string>} methods - list of the methods to autobind
 * @returns {Object} the original object received
 */


function autobindMethods(source, methods) {
  methods.forEach(function (method) {
    source[method] = source[method].bind(source);
  });
  return source;
}
/**
 * Call the first argument received only if it's a function otherwise return it as it is
 * @param   {*} source - anything
 * @returns {*} anything
 */


function callOrAssign(source) {
  return isFunction(source) ? source.prototype && source.prototype.constructor ? new source() : source() : source;
}
/**
 * Convert a string from camel case to dash-case
 * @param   {string} string - probably a component tag name
 * @returns {string} component name normalized
 */

/**
 * Convert a string containing dashes to camel case
 * @param   {string} string - input string
 * @returns {string} my-string -> myString
 */


function dashToCamelCase(string) {
  return string.replace(/-(\w)/g, function (_, c) {
    return c.toUpperCase();
  });
}
/**
 * Move all the child nodes from a source tag to another
 * @param   {HTMLElement} source - source node
 * @param   {HTMLElement} target - target node
 * @returns {undefined} it's a void method ¯\_(ツ)_/¯
 */
// Ignore this helper because it's needed only for svg tags


function moveChildren(source, target) {
  if (source.firstChild) {
    target.appendChild(source.firstChild);
    moveChildren(source, target);
  }
}
/**
 * Remove the child nodes from any DOM node
 * @param   {HTMLElement} node - target node
 * @returns {undefined}
 */


function cleanNode(node) {
  clearChildren(node.childNodes);
}
/**
 * Clear multiple children in a node
 * @param   {HTMLElement[]} children - direct children nodes
 * @returns {undefined}
 */


function clearChildren(children) {
  Array.from(children).forEach(removeNode);
}
/**
 * Remove a node from the DOM
 * @param   {HTMLElement} node - target node
 * @returns {undefined}
 */


function removeNode(node) {
  var parentNode = node.parentNode;
  if (node.remove) node.remove();
  /* istanbul ignore else */
  else if (parentNode) parentNode.removeChild(node);
}

var EACH = 0;
var IF = 1;
var SIMPLE = 2;
var TAG = 3;
var SLOT = 4;
var bindingTypes = {
  EACH: EACH,
  IF: IF,
  SIMPLE: SIMPLE,
  TAG: TAG,
  SLOT: SLOT
};
var ATTRIBUTE = 0;
var EVENT = 1;
var TEXT = 2;
var VALUE = 3;
var expressionTypes = {
  ATTRIBUTE: ATTRIBUTE,
  EVENT: EVENT,
  TEXT: TEXT,
  VALUE: VALUE
};
/**
 * Create the template meta object in case of <template> fragments
 * @param   {TemplateChunk} componentTemplate - template chunk object
 * @returns {Object} the meta property that will be passed to the mount function of the TemplateChunk
 */

function createTemplateMeta(componentTemplate) {
  var fragment = componentTemplate.dom.cloneNode(true);
  return {
    avoidDOMInjection: true,
    fragment: fragment,
    children: Array.from(fragment.childNodes)
  };
}

var iOF = [].indexOf;

var append = function append(get, parent, children, start, end, before) {
  var isSelect = 'selectedIndex' in parent;
  var noSelection = isSelect;

  while (start < end) {
    var child = get(children[start], 1);
    parent.insertBefore(child, before);

    if (isSelect && noSelection && child.selected) {
      noSelection = !noSelection;
      var selectedIndex = parent.selectedIndex;
      parent.selectedIndex = selectedIndex < 0 ? start : iOF.call(parent.querySelectorAll('option'), child);
    }

    start++;
  }
};

var eqeq = function eqeq(a, b) {
  return a == b;
};

var identity = function identity(O) {
  return O;
};

var indexOf = function indexOf(moreNodes, moreStart, moreEnd, lessNodes, lessStart, lessEnd, compare) {
  var length = lessEnd - lessStart;
  /* istanbul ignore if */

  if (length < 1) return -1;

  while (moreEnd - moreStart >= length) {
    var m = moreStart;
    var l = lessStart;

    while (m < moreEnd && l < lessEnd && compare(moreNodes[m], lessNodes[l])) {
      m++;
      l++;
    }

    if (l === lessEnd) return moreStart;
    moreStart = m + 1;
  }

  return -1;
};

var isReversed = function isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare) {
  while (currentStart < currentEnd && compare(currentNodes[currentStart], futureNodes[futureEnd - 1])) {
    currentStart++;
    futureEnd--;
  }

  return futureEnd === 0;
};

var next = function next(get, list, i, length, before) {
  return i < length ? get(list[i], 0) : 0 < i ? get(list[i - 1], -0).nextSibling : before;
};

var remove = function remove(get, children, start, end) {
  while (start < end) {
    drop(get(children[start++], -1));
  }
}; // - - - - - - - - - - - - - - - - - - -
// diff related constants and utilities
// - - - - - - - - - - - - - - - - - - -


var DELETION = -1;
var INSERTION = 1;
var SKIP = 0;
var SKIP_OND = 50;

var HS = function HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges) {
  var k = 0;
  /* istanbul ignore next */

  var minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
  var link = Array(minLen++);
  var tresh = Array(minLen);
  tresh[0] = -1;

  for (var i = 1; i < minLen; i++) {
    tresh[i] = currentEnd;
  }

  var nodes = currentNodes.slice(currentStart, currentEnd);

  for (var _i = futureStart; _i < futureEnd; _i++) {
    var index = nodes.indexOf(futureNodes[_i]);

    if (-1 < index) {
      var idxInOld = index + currentStart;
      k = findK(tresh, minLen, idxInOld);
      /* istanbul ignore else */

      if (-1 < k) {
        tresh[k] = idxInOld;
        link[k] = {
          newi: _i,
          oldi: idxInOld,
          prev: link[k - 1]
        };
      }
    }
  }

  k = --minLen;
  --currentEnd;

  while (tresh[k] > currentEnd) {
    --k;
  }

  minLen = currentChanges + futureChanges - k;
  var diff = Array(minLen);
  var ptr = link[k];
  --futureEnd;

  while (ptr) {
    var _ptr = ptr,
        newi = _ptr.newi,
        oldi = _ptr.oldi;

    while (futureEnd > newi) {
      diff[--minLen] = INSERTION;
      --futureEnd;
    }

    while (currentEnd > oldi) {
      diff[--minLen] = DELETION;
      --currentEnd;
    }

    diff[--minLen] = SKIP;
    --futureEnd;
    --currentEnd;
    ptr = ptr.prev;
  }

  while (futureEnd >= futureStart) {
    diff[--minLen] = INSERTION;
    --futureEnd;
  }

  while (currentEnd >= currentStart) {
    diff[--minLen] = DELETION;
    --currentEnd;
  }

  return diff;
}; // this is pretty much the same petit-dom code without the delete map part
// https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561


var OND = function OND(futureNodes, futureStart, rows, currentNodes, currentStart, cols, compare) {
  var length = rows + cols;
  var v = [];
  var d, k, r, c, pv, cv, pd;

  outer: for (d = 0; d <= length; d++) {
    /* istanbul ignore if */
    if (d > SKIP_OND) return null;
    pd = d - 1;
    /* istanbul ignore next */

    pv = d ? v[d - 1] : [0, 0];
    cv = v[d] = [];

    for (k = -d; k <= d; k += 2) {
      if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
        c = pv[pd + k + 1];
      } else {
        c = pv[pd + k - 1] + 1;
      }

      r = c - k;

      while (c < cols && r < rows && compare(currentNodes[currentStart + c], futureNodes[futureStart + r])) {
        c++;
        r++;
      }

      if (c === cols && r === rows) {
        break outer;
      }

      cv[d + k] = c;
    }
  }

  var diff = Array(d / 2 + length / 2);
  var diffIdx = diff.length - 1;

  for (d = v.length - 1; d >= 0; d--) {
    while (c > 0 && r > 0 && compare(currentNodes[currentStart + c - 1], futureNodes[futureStart + r - 1])) {
      // diagonal edge = equality
      diff[diffIdx--] = SKIP;
      c--;
      r--;
    }

    if (!d) break;
    pd = d - 1;
    /* istanbul ignore next */

    pv = d ? v[d - 1] : [0, 0];
    k = c - r;

    if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
      // vertical edge = insertion
      r--;
      diff[diffIdx--] = INSERTION;
    } else {
      // horizontal edge = deletion
      c--;
      diff[diffIdx--] = DELETION;
    }
  }

  return diff;
};

var applyDiff = function applyDiff(diff, get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before) {
  var live = [];
  var length = diff.length;
  var currentIndex = currentStart;
  var i = 0;

  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        futureStart++;
        currentIndex++;
        break;

      case INSERTION:
        // TODO: bulk appends for sequential nodes
        live.push(futureNodes[futureStart]);
        append(get, parentNode, futureNodes, futureStart++, futureStart, currentIndex < currentLength ? get(currentNodes[currentIndex], 0) : before);
        break;

      case DELETION:
        currentIndex++;
        break;
    }
  }

  i = 0;

  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        currentStart++;
        break;

      case DELETION:
        // TODO: bulk removes for sequential nodes
        if (-1 < live.indexOf(currentNodes[currentStart])) currentStart++;else remove(get, currentNodes, currentStart++, currentStart);
        break;
    }
  }
};

var findK = function findK(ktr, length, j) {
  var lo = 1;
  var hi = length;

  while (lo < hi) {
    var mid = (lo + hi) / 2 >>> 0;
    if (j < ktr[mid]) hi = mid;else lo = mid + 1;
  }

  return lo;
};

var smartDiff = function smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before) {
  applyDiff(OND(futureNodes, futureStart, futureChanges, currentNodes, currentStart, currentChanges, compare) || HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges), get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before);
};

var drop = function drop(node) {
  return (node.remove || dropChild).call(node);
};

function dropChild() {
  var parentNode = this.parentNode;
  /* istanbul ignore else */

  if (parentNode) parentNode.removeChild(this);
}
/*! (c) 2018 Andrea Giammarchi (ISC) */


var domdiff = function domdiff(parentNode, // where changes happen
currentNodes, // Array of current items/nodes
futureNodes, // Array of future items/nodes
options // optional object with one of the following properties
//  before: domNode
//  compare(generic, generic) => true if same generic
//  node(generic) => Node
) {
  if (!options) options = {};
  var compare = options.compare || eqeq;
  var get = options.node || identity;
  var before = options.before == null ? null : get(options.before, 0);
  var currentLength = currentNodes.length;
  var currentEnd = currentLength;
  var currentStart = 0;
  var futureEnd = futureNodes.length;
  var futureStart = 0; // common prefix

  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentStart], futureNodes[futureStart])) {
    currentStart++;
    futureStart++;
  } // common suffix


  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])) {
    currentEnd--;
    futureEnd--;
  }

  var currentSame = currentStart === currentEnd;
  var futureSame = futureStart === futureEnd; // same list

  if (currentSame && futureSame) return futureNodes; // only stuff to add

  if (currentSame && futureStart < futureEnd) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentStart, currentLength, before));
    return futureNodes;
  } // only stuff to remove


  if (futureSame && currentStart < currentEnd) {
    remove(get, currentNodes, currentStart, currentEnd);
    return futureNodes;
  }

  var currentChanges = currentEnd - currentStart;
  var futureChanges = futureEnd - futureStart;
  var i = -1; // 2 simple indels: the shortest sequence is a subsequence of the longest

  if (currentChanges < futureChanges) {
    i = indexOf(futureNodes, futureStart, futureEnd, currentNodes, currentStart, currentEnd, compare); // inner diff

    if (-1 < i) {
      append(get, parentNode, futureNodes, futureStart, i, get(currentNodes[currentStart], 0));
      append(get, parentNode, futureNodes, i + currentChanges, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
      return futureNodes;
    }
  }
  /* istanbul ignore else */
  else if (futureChanges < currentChanges) {
      i = indexOf(currentNodes, currentStart, currentEnd, futureNodes, futureStart, futureEnd, compare); // outer diff

      if (-1 < i) {
        remove(get, currentNodes, currentStart, i);
        remove(get, currentNodes, i + futureChanges, currentEnd);
        return futureNodes;
      }
    } // common case with one replacement for many nodes
  // or many nodes replaced for a single one

  /* istanbul ignore else */


  if (currentChanges < 2 || futureChanges < 2) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, get(currentNodes[currentStart], 0));
    remove(get, currentNodes, currentStart, currentEnd);
    return futureNodes;
  } // the half match diff part has been skipped in petit-dom
  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
  // accordingly, I think it's safe to skip in here too
  // if one day it'll come out like the speediest thing ever to do
  // then I might add it in here too
  // Extra: before going too fancy, what about reversed lists ?
  //        This should bail out pretty quickly if that's not the case.


  if (currentChanges === futureChanges && isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare)) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
    return futureNodes;
  } // last resort through a smart diff


  smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before);
  return futureNodes;
};
/**
 * Quick type checking
 * @param   {*} element - anything
 * @param   {string} type - type definition
 * @returns {boolean} true if the type corresponds
 */


function checkType$1(element, type) {
  return _typeof(element) === type;
}
/**
 * Check if an element is part of an svg
 * @param   {HTMLElement}  el - element to check
 * @returns {boolean} true if we are in an svg context
 */


function isSvg(el) {
  var owner = el.ownerSVGElement;
  return !!owner || owner === null;
}
/**
 * Check if an element is a template tag
 * @param   {HTMLElement}  el - element to check
 * @returns {boolean} true if it's a <template>
 */


function isTemplate(el) {
  return !isNil(el.content);
}
/**
 * Check that will be passed if its argument is a function
 * @param   {*} value - value to check
 * @returns {boolean} - true if the value is a function
 */


function isFunction$1(value) {
  return checkType$1(value, 'function');
}
/**
 * Check if a value is a Boolean
 * @param   {*}  value - anything
 * @returns {boolean} true only for the value is a boolean
 */


function isBoolean(value) {
  return checkType$1(value, 'boolean');
}
/**
 * Check if a value is an Object
 * @param   {*}  value - anything
 * @returns {boolean} true only for the value is an object
 */


function isObject(value) {
  return !isNil(value) && checkType$1(value, 'object');
}
/**
 * Check if a value is null or undefined
 * @param   {*}  value - anything
 * @returns {boolean} true only for the 'undefined' and 'null' types
 */


function isNil(value) {
  return value === null || value === undefined;
}

var UNMOUNT_SCOPE = Symbol('unmount');
var EachBinding = Object.seal({
  // dynamic binding properties
  // childrenMap: null,
  // node: null,
  // root: null,
  // condition: null,
  // evaluate: null,
  // template: null,
  // isTemplateTag: false,
  nodes: [],
  // getKey: null,
  // indexName: null,
  // itemName: null,
  // afterPlaceholder: null,
  // placeholder: null,
  // API methods
  mount: function mount(scope, parentScope) {
    return this.update(scope, parentScope);
  },
  update: function update(scope, parentScope) {
    var placeholder = this.placeholder,
        nodes = this.nodes,
        childrenMap = this.childrenMap;
    var collection = scope === UNMOUNT_SCOPE ? null : this.evaluate(scope);
    var items = collection ? Array.from(collection) : [];
    var parent = placeholder.parentNode; // prepare the diffing

    var _createPatch = createPatch(items, scope, parentScope, this),
        newChildrenMap = _createPatch.newChildrenMap,
        batches = _createPatch.batches,
        futureNodes = _createPatch.futureNodes; // patch the DOM only if there are new nodes


    domdiff(parent, nodes, futureNodes, {
      before: placeholder,
      node: patch(Array.from(childrenMap.values()), parentScope)
    }); // trigger the mounts and the updates

    batches.forEach(function (fn) {
      return fn();
    }); // update the children map

    this.childrenMap = newChildrenMap;
    this.nodes = futureNodes;
    return this;
  },
  unmount: function unmount(scope, parentScope) {
    this.update(UNMOUNT_SCOPE, parentScope);
    return this;
  }
});
/**
 * Patch the DOM while diffing
 * @param   {TemplateChunk[]} redundant - redundant tepmplate chunks
 * @param   {*} parentScope - scope of the parent template
 * @returns {Function} patch function used by domdiff
 */

function patch(redundant, parentScope) {
  return function (item, info) {
    if (info < 0) {
      var element = redundant.pop();

      if (element) {
        var template = element.template,
            context = element.context; // notice that we pass null as last argument because
        // the root node and its children will be removed by domdiff

        template.unmount(context, parentScope, null);
      }
    }

    return item;
  };
}
/**
 * Check whether a template must be filtered from a loop
 * @param   {Function} condition - filter function
 * @param   {Object} context - argument passed to the filter function
 * @returns {boolean} true if this item should be skipped
 */


function mustFilterItem(condition, context) {
  return condition ? Boolean(condition(context)) === false : false;
}
/**
 * Extend the scope of the looped template
 * @param   {Object} scope - current template scope
 * @param   {string} options.itemName - key to identify the looped item in the new context
 * @param   {string} options.indexName - key to identify the index of the looped item
 * @param   {number} options.index - current index
 * @param   {*} options.item - collection item looped
 * @returns {Object} enhanced scope object
 */


function extendScope(scope, _ref) {
  var itemName = _ref.itemName,
      indexName = _ref.indexName,
      index = _ref.index,
      item = _ref.item;
  scope[itemName] = item;
  if (indexName) scope[indexName] = index;
  return scope;
}
/**
 * Loop the current template items
 * @param   {Array} items - expression collection value
 * @param   {*} scope - template scope
 * @param   {*} parentScope - scope of the parent template
 * @param   {EeachBinding} binding - each binding object instance
 * @returns {Object} data
 * @returns {Map} data.newChildrenMap - a Map containing the new children template structure
 * @returns {Array} data.batches - array containing the template lifecycle functions to trigger
 * @returns {Array} data.futureNodes - array containing the nodes we need to diff
 */


function createPatch(items, scope, parentScope, binding) {
  var condition = binding.condition,
      template = binding.template,
      childrenMap = binding.childrenMap,
      itemName = binding.itemName,
      getKey = binding.getKey,
      indexName = binding.indexName,
      root = binding.root,
      isTemplateTag = binding.isTemplateTag;
  var newChildrenMap = new Map();
  var batches = [];
  var futureNodes = [];
  items.forEach(function (item, index) {
    var context = extendScope(Object.create(scope), {
      itemName: itemName,
      indexName: indexName,
      index: index,
      item: item
    });
    var key = getKey ? getKey(context) : index;
    var oldItem = childrenMap.get(key);

    if (mustFilterItem(condition, context)) {
      return;
    }

    var componentTemplate = oldItem ? oldItem.template : template.clone();
    var el = oldItem ? componentTemplate.el : root.cloneNode();
    var mustMount = !oldItem;
    var meta = isTemplateTag && mustMount ? createTemplateMeta(componentTemplate) : {};

    if (mustMount) {
      batches.push(function () {
        return componentTemplate.mount(el, context, parentScope, meta);
      });
    } else {
      batches.push(function () {
        return componentTemplate.update(context, parentScope);
      });
    } // create the collection of nodes to update or to add
    // in case of template tags we need to add all its children nodes


    if (isTemplateTag) {
      var children = meta.children || componentTemplate.children;
      futureNodes.push.apply(futureNodes, _toConsumableArray(children));
    } else {
      futureNodes.push(el);
    } // delete the old item from the children map


    childrenMap.delete(key); // update the children map

    newChildrenMap.set(key, {
      template: componentTemplate,
      context: context,
      index: index
    });
  });
  return {
    newChildrenMap: newChildrenMap,
    batches: batches,
    futureNodes: futureNodes
  };
}

function create(node, _ref2) {
  var evaluate = _ref2.evaluate,
      condition = _ref2.condition,
      itemName = _ref2.itemName,
      indexName = _ref2.indexName,
      getKey = _ref2.getKey,
      template = _ref2.template;
  var placeholder = document.createTextNode('');
  var parent = node.parentNode;
  var root = node.cloneNode();
  parent.insertBefore(placeholder, node);
  removeNode(node);
  return Object.assign({}, EachBinding, {
    childrenMap: new Map(),
    node: node,
    root: root,
    condition: condition,
    evaluate: evaluate,
    isTemplateTag: isTemplate(root),
    template: template.createDOM(node),
    getKey: getKey,
    indexName: indexName,
    itemName: itemName,
    placeholder: placeholder
  });
}
/**
 * Binding responsible for the `if` directive
 */


var IfBinding = Object.seal({
  // dynamic binding properties
  // node: null,
  // evaluate: null,
  // isTemplateTag: false,
  // placeholder: null,
  // template: null,
  // API methods
  mount: function mount(scope, parentScope) {
    return this.update(scope, parentScope);
  },
  update: function update(scope, parentScope) {
    var _this = this;

    var value = !!this.evaluate(scope);
    var mustMount = !this.value && value;
    var mustUnmount = this.value && !value;

    var mount = function mount() {
      var pristine = _this.node.cloneNode();

      _this.placeholder.parentNode.insertBefore(pristine, _this.placeholder);

      _this.template = _this.template.clone();

      _this.template.mount(pristine, scope, parentScope);
    };

    switch (true) {
      case mustMount:
        mount();
        break;

      case mustUnmount:
        this.unmount(scope);
        break;

      default:
        if (value) this.template.update(scope, parentScope);
    }

    this.value = value;
    return this;
  },
  unmount: function unmount(scope, parentScope) {
    this.template.unmount(scope, parentScope, true);
    return this;
  }
});

function create$1(node, _ref3) {
  var evaluate = _ref3.evaluate,
      template = _ref3.template;
  var parent = node.parentNode;
  var placeholder = document.createTextNode('');
  parent.insertBefore(placeholder, node);
  removeNode(node);
  return Object.assign({}, IfBinding, {
    node: node,
    evaluate: evaluate,
    placeholder: placeholder,
    template: template.createDOM(node)
  });
}
/**
 * Returns the memoized (cached) function.
 * // borrowed from https://www.30secondsofcode.org/js/s/memoize
 * @param {Function} fn - function to memoize
 * @returns {Function} memoize function
 */


function memoize(fn) {
  var _this2 = this;

  var cache = new Map();

  var cached = function cached(val) {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(_this2, val)) && cache.get(val);
  };

  cached.cache = cache;
  return cached;
}
/**
 * Evaluate a list of attribute expressions
 * @param   {Array} attributes - attribute expressions generated by the riot compiler
 * @returns {Object} key value pairs with the result of the computation
 */


function evaluateAttributeExpressions(attributes) {
  return attributes.reduce(function (acc, attribute) {
    var value = attribute.value,
        type = attribute.type;

    switch (true) {
      // spread attribute
      case !attribute.name && type === ATTRIBUTE:
        return Object.assign({}, acc, {}, value);
      // value attribute

      case type === VALUE:
        acc.value = attribute.value;
        break;
      // normal attributes

      default:
        acc[dashToCamelCase(attribute.name)] = attribute.value;
    }

    return acc;
  }, {});
}

var REMOVE_ATTRIBUTE = 'removeAttribute';
var SET_ATTIBUTE = 'setAttribute';
var ElementProto = typeof Element === 'undefined' ? {} : Element.prototype;
var isNativeHtmlProperty = memoize(function (name) {
  return ElementProto.hasOwnProperty(name);
}); // eslint-disable-line

/**
 * Add all the attributes provided
 * @param   {HTMLElement} node - target node
 * @param   {Object} attributes - object containing the attributes names and values
 * @returns {undefined} sorry it's a void function :(
 */

function setAllAttributes(node, attributes) {
  Object.entries(attributes).forEach(function (_ref4) {
    var _ref12 = _slicedToArray(_ref4, 2),
        name = _ref12[0],
        value = _ref12[1];

    return attributeExpression(node, {
      name: name
    }, value);
  });
}
/**
 * Remove all the attributes provided
 * @param   {HTMLElement} node - target node
 * @param   {Object} attributes - object containing all the attribute names
 * @returns {undefined} sorry it's a void function :(
 */


function removeAllAttributes(node, attributes) {
  Object.keys(attributes).forEach(function (attribute) {
    return node.removeAttribute(attribute);
  });
}
/**
 * This methods handles the DOM attributes updates
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {string} expression.name - attribute name
 * @param   {*} value - new expression value
 * @param   {*} oldValue - the old expression cached value
 * @returns {undefined}
 */


function attributeExpression(node, _ref5, value, oldValue) {
  var name = _ref5.name; // is it a spread operator? {...attributes}

  if (!name) {
    // is the value still truthy?
    if (value) {
      setAllAttributes(node, value);
    } else if (oldValue) {
      // otherwise remove all the old attributes
      removeAllAttributes(node, oldValue);
    }

    return;
  } // handle boolean attributes


  if (!isNativeHtmlProperty(name) && (isBoolean(value) || isObject(value) || isFunction$1(value))) {
    node[name] = value;
  }

  node[getMethod(value)](name, normalizeValue(name, value));
}
/**
 * Get the attribute modifier method
 * @param   {*} value - if truthy we return `setAttribute` othewise `removeAttribute`
 * @returns {string} the node attribute modifier method name
 */


function getMethod(value) {
  return isNil(value) || value === false || value === '' || isObject(value) || isFunction$1(value) ? REMOVE_ATTRIBUTE : SET_ATTIBUTE;
}
/**
 * Get the value as string
 * @param   {string} name - attribute name
 * @param   {*} value - user input value
 * @returns {string} input value as string
 */


function normalizeValue(name, value) {
  // be sure that expressions like selected={ true } will be always rendered as selected='selected'
  if (value === true) return name;
  return value;
}

var RE_EVENTS_PREFIX = /^on/;
/**
 * Set a new event listener
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {string} expression.name - event name
 * @param   {*} value - new expression value
 * @param   {*} oldValue - old expression value
 * @returns {value} the callback just received
 */

function eventExpression(node, _ref6, value, oldValue) {
  var name = _ref6.name;
  var normalizedEventName = name.replace(RE_EVENTS_PREFIX, '');

  if (oldValue) {
    node.removeEventListener(normalizedEventName, oldValue);
  }

  if (value) {
    node.addEventListener(normalizedEventName, value, false);
  }
}
/**
 * Normalize the user value in order to render a empty string in case of falsy values
 * @param   {*} value - user input value
 * @returns {string} hopefully a string
 */


function normalizeStringValue(value) {
  return isNil(value) ? '' : value;
}
/**
 * Get the the target text node to update or create one from of a comment node
 * @param   {HTMLElement} node - any html element containing childNodes
 * @param   {number} childNodeIndex - index of the text node in the childNodes list
 * @returns {HTMLTextNode} the text node to update
 */


var getTextNode = function getTextNode(node, childNodeIndex) {
  var target = node.childNodes[childNodeIndex];

  if (target.nodeType === Node.COMMENT_NODE) {
    var textNode = document.createTextNode('');
    node.replaceChild(textNode, target);
    return textNode;
  }

  return target;
};
/**
 * This methods handles a simple text expression update
 * @param   {HTMLElement} node - target node
 * @param   {Object} data - expression object
 * @param   {*} value - new expression value
 * @returns {undefined}
 */


function textExpression(node, data, value) {
  node.data = normalizeStringValue(value);
}
/**
 * This methods handles the input fileds value updates
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {*} value - new expression value
 * @returns {undefined}
 */


function valueExpression(node, expression, value) {
  node.value = normalizeStringValue(value);
}

var expressions = (_expressions = {}, _defineProperty(_expressions, ATTRIBUTE, attributeExpression), _defineProperty(_expressions, EVENT, eventExpression), _defineProperty(_expressions, TEXT, textExpression), _defineProperty(_expressions, VALUE, valueExpression), _expressions);
var Expression = Object.seal({
  // Static props
  // node: null,
  // value: null,
  // API methods

  /**
   * Mount the expression evaluating its initial value
   * @param   {*} scope - argument passed to the expression to evaluate its current values
   * @returns {Expression} self
   */
  mount: function mount(scope) {
    // hopefully a pure function
    this.value = this.evaluate(scope); // IO() DOM updates

    apply(this, this.value);
    return this;
  },

  /**
   * Update the expression if its value changed
   * @param   {*} scope - argument passed to the expression to evaluate its current values
   * @returns {Expression} self
   */
  update: function update(scope) {
    // pure function
    var value = this.evaluate(scope);

    if (this.value !== value) {
      // IO() DOM updates
      apply(this, value);
      this.value = value;
    }

    return this;
  },

  /**
   * Expression teardown method
   * @returns {Expression} self
   */
  unmount: function unmount() {
    // unmount only the event handling expressions
    if (this.type === EVENT) apply(this, null);
    return this;
  }
});
/**
 * IO() function to handle the DOM updates
 * @param {Expression} expression - expression object
 * @param {*} value - current expression value
 * @returns {undefined}
 */

function apply(expression, value) {
  return expressions[expression.type](expression.node, expression, value, expression.value);
}

function create$2(node, data) {
  return Object.assign({}, Expression, {}, data, {
    node: data.type === TEXT ? getTextNode(node, data.childNodeIndex) : node
  });
}
/**
 * Create a flat object having as keys a list of methods that if dispatched will propagate
 * on the whole collection
 * @param   {Array} collection - collection to iterate
 * @param   {Array<string>} methods - methods to execute on each item of the collection
 * @param   {*} context - context returned by the new methods created
 * @returns {Object} a new object to simplify the the nested methods dispatching
 */


function flattenCollectionMethods(collection, methods, context) {
  return methods.reduce(function (acc, method) {
    return Object.assign({}, acc, _defineProperty({}, method, function (scope) {
      return collection.map(function (item) {
        return item[method](scope);
      }) && context;
    }));
  }, {});
}

function create$3(node, _ref7) {
  var expressions = _ref7.expressions;
  return Object.assign({}, flattenCollectionMethods(expressions.map(function (expression) {
    return create$2(node, expression);
  }), ['mount', 'update', 'unmount']));
}

function extendParentScope(attributes, scope, parentScope) {
  if (!attributes || !attributes.length) return parentScope;
  var expressions = attributes.map(function (attr) {
    return Object.assign({}, attr, {
      value: attr.evaluate(scope)
    });
  });
  return Object.assign(Object.create(parentScope || null), evaluateAttributeExpressions(expressions));
}

var SlotBinding = Object.seal({
  // dynamic binding properties
  // node: null,
  // name: null,
  attributes: [],
  // template: null,
  getTemplateScope: function getTemplateScope(scope, parentScope) {
    return extendParentScope(this.attributes, scope, parentScope);
  },
  // API methods
  mount: function mount(scope, parentScope) {
    var _this3 = this;

    var templateData = scope.slots ? scope.slots.find(function (_ref8) {
      var id = _ref8.id;
      return id === _this3.name;
    }) : false;
    var parentNode = this.node.parentNode;
    this.template = templateData && create$6(templateData.html, templateData.bindings).createDOM(parentNode);

    if (this.template) {
      this.template.mount(this.node, this.getTemplateScope(scope, parentScope));
      this.template.children = moveSlotInnerContent(this.node);
    }

    removeNode(this.node);
    return this;
  },
  update: function update(scope, parentScope) {
    if (this.template) {
      this.template.update(this.getTemplateScope(scope, parentScope));
    }

    return this;
  },
  unmount: function unmount(scope, parentScope, mustRemoveRoot) {
    if (this.template) {
      this.template.unmount(this.getTemplateScope(scope, parentScope), null, mustRemoveRoot);
    }

    return this;
  }
});
/**
 * Move the inner content of the slots outside of them
 * @param   {HTMLNode} slot - slot node
 * @param   {HTMLElement} children - array to fill with the child nodes detected
 * @returns {HTMLElement[]} list of the node moved
 */

function moveSlotInnerContent(slot, children) {
  if (children === void 0) {
    children = [];
  }

  var child = slot.firstChild;

  if (child) {
    slot.parentNode.insertBefore(child, slot);
    return [child].concat(_toConsumableArray(moveSlotInnerContent(slot)));
  }

  return children;
}
/**
 * Create a single slot binding
 * @param   {HTMLElement} node - slot node
 * @param   {string} options.name - slot id
 * @returns {Object} Slot binding object
 */


function createSlot(node, _ref9) {
  var name = _ref9.name,
      attributes = _ref9.attributes;
  return Object.assign({}, SlotBinding, {
    attributes: attributes,
    node: node,
    name: name
  });
}
/**
 * Create a new tag object if it was registered before, otherwise fallback to the simple
 * template chunk
 * @param   {Function} component - component factory function
 * @param   {Array<Object>} slots - array containing the slots markup
 * @param   {Array} attributes - dynamic attributes that will be received by the tag element
 * @returns {TagImplementation|TemplateChunk} a tag implementation or a template chunk as fallback
 */


function getTag(component, slots, attributes) {
  if (slots === void 0) {
    slots = [];
  }

  if (attributes === void 0) {
    attributes = [];
  } // if this tag was registered before we will return its implementation


  if (component) {
    return component({
      slots: slots,
      attributes: attributes
    });
  } // otherwise we return a template chunk


  return create$6(slotsToMarkup(slots), [].concat(_toConsumableArray(slotBindings(slots)), [{
    // the attributes should be registered as binding
    // if we fallback to a normal template chunk
    expressions: attributes.map(function (attr) {
      return Object.assign({
        type: ATTRIBUTE
      }, attr);
    })
  }]));
}
/**
 * Merge all the slots bindings into a single array
 * @param   {Array<Object>} slots - slots collection
 * @returns {Array<Bindings>} flatten bindings array
 */


function slotBindings(slots) {
  return slots.reduce(function (acc, _ref10) {
    var bindings = _ref10.bindings;
    return acc.concat(bindings);
  }, []);
}
/**
 * Merge all the slots together in a single markup string
 * @param   {Array<Object>} slots - slots collection
 * @returns {string} markup of all the slots in a single string
 */


function slotsToMarkup(slots) {
  return slots.reduce(function (acc, slot) {
    return acc + slot.html;
  }, '');
}

var TagBinding = Object.seal({
  // dynamic binding properties
  // node: null,
  // evaluate: null,
  // name: null,
  // slots: null,
  // tag: null,
  // attributes: null,
  // getComponent: null,
  mount: function mount(scope) {
    return this.update(scope);
  },
  update: function update(scope, parentScope) {
    var name = this.evaluate(scope); // simple update

    if (name === this.name) {
      this.tag.update(scope);
    } else {
      // unmount the old tag if it exists
      this.unmount(scope, parentScope, true); // mount the new tag

      this.name = name;
      this.tag = getTag(this.getComponent(name), this.slots, this.attributes);
      this.tag.mount(this.node, scope);
    }

    return this;
  },
  unmount: function unmount(scope, parentScope, keepRootTag) {
    if (this.tag) {
      // keep the root tag
      this.tag.unmount(keepRootTag);
    }

    return this;
  }
});

function create$4(node, _ref11) {
  var evaluate = _ref11.evaluate,
      getComponent = _ref11.getComponent,
      slots = _ref11.slots,
      attributes = _ref11.attributes;
  return Object.assign({}, TagBinding, {
    node: node,
    evaluate: evaluate,
    slots: slots,
    attributes: attributes,
    getComponent: getComponent
  });
}

var bindings = (_bindings = {}, _defineProperty(_bindings, IF, create$1), _defineProperty(_bindings, SIMPLE, create$3), _defineProperty(_bindings, EACH, create), _defineProperty(_bindings, TAG, create$4), _defineProperty(_bindings, SLOT, createSlot), _bindings);
/**
 * Text expressions in a template tag will get childNodeIndex value normalized
 * depending on the position of the <template> tag offset
 * @param   {Expression[]} expressions - riot expressions array
 * @param   {number} textExpressionsOffset - offset of the <template> tag
 * @returns {Expression[]} expressions containing the text expressions normalized
 */

function fixTextExpressionsOffset(expressions, textExpressionsOffset) {
  return expressions.map(function (e) {
    return e.type === TEXT ? Object.assign({}, e, {
      childNodeIndex: e.childNodeIndex + textExpressionsOffset
    }) : e;
  });
}
/**
 * Bind a new expression object to a DOM node
 * @param   {HTMLElement} root - DOM node where to bind the expression
 * @param   {Object} binding - binding data
 * @param   {number|null} templateTagOffset - if it's defined we need to fix the text expressions childNodeIndex offset
 * @returns {Binding} Binding object
 */


function create$5(root, binding, templateTagOffset) {
  var selector = binding.selector,
      type = binding.type,
      redundantAttribute = binding.redundantAttribute,
      expressions = binding.expressions; // find the node to apply the bindings

  var node = selector ? root.querySelector(selector) : root; // remove eventually additional attributes created only to select this node

  if (redundantAttribute) node.removeAttribute(redundantAttribute);
  var bindingExpressions = expressions || []; // init the binding

  return (bindings[type] || bindings[SIMPLE])(node, Object.assign({}, binding, {
    expressions: templateTagOffset && !selector ? fixTextExpressionsOffset(bindingExpressions, templateTagOffset) : bindingExpressions
  }));
} // in this case a simple innerHTML is enough


function createHTMLTree(html, root) {
  var template = isTemplate(root) ? root : document.createElement('template');
  template.innerHTML = html;
  return template.content;
} // for svg nodes we need a bit more work


function createSVGTree(html, container) {
  // create the SVGNode
  var svgNode = container.ownerDocument.importNode(new window.DOMParser().parseFromString("<svg xmlns=\"http://www.w3.org/2000/svg\">".concat(html, "</svg>"), 'application/xml').documentElement, true);
  return svgNode;
}
/**
 * Create the DOM that will be injected
 * @param {Object} root - DOM node to find out the context where the fragment will be created
 * @param   {string} html - DOM to create as string
 * @returns {HTMLDocumentFragment|HTMLElement} a new html fragment
 */


function createDOMTree(root, html) {
  if (isSvg(root)) return createSVGTree(html, root);
  return createHTMLTree(html, root);
}
/**
 * Inject the DOM tree into a target node
 * @param   {HTMLElement} el - target element
 * @param   {HTMLFragment|SVGElement} dom - dom tree to inject
 * @returns {undefined}
 */


function injectDOM(el, dom) {
  switch (true) {
    case isSvg(el):
      moveChildren(dom, el);
      break;

    case isTemplate(el):
      el.parentNode.replaceChild(dom, el);
      break;

    default:
      el.appendChild(dom);
  }
}
/**
 * Create the Template DOM skeleton
 * @param   {HTMLElement} el - root node where the DOM will be injected
 * @param   {string} html - markup that will be injected into the root node
 * @returns {HTMLFragment} fragment that will be injected into the root node
 */


function createTemplateDOM(el, html) {
  return html && (typeof html === 'string' ? createDOMTree(el, html) : html);
}
/**
 * Template Chunk model
 * @type {Object}
 */


var TemplateChunk = Object.freeze({
  // Static props
  // bindings: null,
  // bindingsData: null,
  // html: null,
  // isTemplateTag: false,
  // fragment: null,
  // children: null,
  // dom: null,
  // el: null,

  /**
   * Create the template DOM structure that will be cloned on each mount
   * @param   {HTMLElement} el - the root node
   * @returns {TemplateChunk} self
   */
  createDOM: function createDOM(el) {
    // make sure that the DOM gets created before cloning the template
    this.dom = this.dom || createTemplateDOM(el, this.html);
    return this;
  },
  // API methods

  /**
   * Attach the template to a DOM node
   * @param   {HTMLElement} el - target DOM node
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @param   {Object} meta - meta properties needed to handle the <template> tags in loops
   * @returns {TemplateChunk} self
   */
  mount: function mount(el, scope, parentScope, meta) {
    var _this4 = this;

    if (meta === void 0) {
      meta = {};
    }

    if (!el) throw new Error('Please provide DOM node to mount properly your template');
    if (this.el) this.unmount(scope); // <template> tags require a bit more work
    // the template fragment might be already created via meta outside of this call

    var _meta = meta,
        fragment = _meta.fragment,
        children = _meta.children,
        avoidDOMInjection = _meta.avoidDOMInjection; // <template> bindings of course can not have a root element
    // so we check the parent node to set the query selector bindings

    var _ref13 = children ? children[0] : el,
        parentNode = _ref13.parentNode;

    var isTemplateTag = isTemplate(el);
    var templateTagOffset = isTemplateTag ? Math.max(Array.from(parentNode.children).indexOf(el), 0) : null;
    this.isTemplateTag = isTemplateTag; // create the DOM if it wasn't created before

    this.createDOM(el);

    if (this.dom) {
      // create the new template dom fragment if it want already passed in via meta
      this.fragment = fragment || this.dom.cloneNode(true);
    } // store root node
    // notice that for template tags the root note will be the parent tag


    this.el = this.isTemplateTag ? parentNode : el; // create the children array only for the <template> fragments

    this.children = this.isTemplateTag ? children || Array.from(this.fragment.childNodes) : null; // inject the DOM into the el only if a fragment is available

    if (!avoidDOMInjection && this.fragment) injectDOM(el, this.fragment); // create the bindings

    this.bindings = this.bindingsData.map(function (binding) {
      return create$5(_this4.el, binding, templateTagOffset);
    });
    this.bindings.forEach(function (b) {
      return b.mount(scope, parentScope);
    });
    return this;
  },

  /**
   * Update the template with fresh data
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @returns {TemplateChunk} self
   */
  update: function update(scope, parentScope) {
    this.bindings.forEach(function (b) {
      return b.update(scope, parentScope);
    });
    return this;
  },

  /**
   * Remove the template from the node where it was initially mounted
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @param   {boolean|null} mustRemoveRoot - if true remove the root element,
   * if false or undefined clean the root tag content, if null don't touch the DOM
   * @returns {TemplateChunk} self
   */
  unmount: function unmount(scope, parentScope, mustRemoveRoot) {
    if (this.el) {
      this.bindings.forEach(function (b) {
        return b.unmount(scope, parentScope, mustRemoveRoot);
      });

      switch (true) {
        // <template> tags should be treated a bit differently
        // we need to clear their children only if it's explicitly required by the caller
        // via mustRemoveRoot !== null
        case this.children && mustRemoveRoot !== null:
          clearChildren(this.children);
          break;
        // remove the root node only if the mustRemoveRoot === true

        case mustRemoveRoot === true:
          removeNode(this.el);
          break;
        // otherwise we clean the node children

        case mustRemoveRoot !== null:
          cleanNode(this.el);
          break;
      }

      this.el = null;
    }

    return this;
  },

  /**
   * Clone the template chunk
   * @returns {TemplateChunk} a clone of this object resetting the this.el property
   */
  clone: function clone() {
    return Object.assign({}, this, {
      el: null
    });
  }
});
/**
 * Create a template chunk wiring also the bindings
 * @param   {string|HTMLElement} html - template string
 * @param   {Array} bindings - bindings collection
 * @returns {TemplateChunk} a new TemplateChunk copy
 */

function create$6(html, bindings) {
  if (bindings === void 0) {
    bindings = [];
  }

  return Object.assign({}, TemplateChunk, {
    html: html,
    bindingsData: bindings
  });
}
/**
 * Helper function to set an immutable property
 * @param   {Object} source - object where the new property will be set
 * @param   {string} key - object key where the new property will be stored
 * @param   {*} value - value of the new property
 * @param   {Object} options - set the propery overriding the default options
 * @returns {Object} - the original object modified
 */


function defineProperty(source, key, value, options) {
  if (options === void 0) {
    options = {};
  }
  /* eslint-disable fp/no-mutating-methods */


  Object.defineProperty(source, key, Object.assign({
    value: value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  /* eslint-enable fp/no-mutating-methods */

  return source;
}
/**
 * Define multiple properties on a target object
 * @param   {Object} source - object where the new properties will be set
 * @param   {Object} properties - object containing as key pair the key + value properties
 * @param   {Object} options - set the propery overriding the default options
 * @returns {Object} the original object modified
 */


function defineProperties(source, properties, options) {
  Object.entries(properties).forEach(function (_ref) {
    var _ref14 = _slicedToArray(_ref, 2),
        key = _ref14[0],
        value = _ref14[1];

    defineProperty(source, key, value, options);
  });
  return source;
}
/**
 * Define default properties if they don't exist on the source object
 * @param   {Object} source - object that will receive the default properties
 * @param   {Object} defaults - object containing additional optional keys
 * @returns {Object} the original object received enhanced
 */


function defineDefaults(source, defaults) {
  Object.entries(defaults).forEach(function (_ref2) {
    var _ref15 = _slicedToArray(_ref2, 2),
        key = _ref15[0],
        value = _ref15[1];

    if (!source[key]) source[key] = value;
  });
  return source;
}

var ATTRIBUTE$1 = 0;
var VALUE$1 = 3;
/**
 * Convert a string from camel case to dash-case
 * @param   {string} string - probably a component tag name
 * @returns {string} component name normalized
 */

function camelToDashCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * Convert a string containing dashes to camel case
 * @param   {string} string - input string
 * @returns {string} my-string -> myString
 */


function dashToCamelCase$1(string) {
  return string.replace(/-(\w)/g, function (_, c) {
    return c.toUpperCase();
  });
}
/**
 * Throw an error with a descriptive message
 * @param   { string } message - error message
 * @returns { undefined } hoppla.. at this point the program should stop working
 */


function panic(message) {
  throw new Error(message);
}
/**
 * Evaluate a list of attribute expressions
 * @param   {Array} attributes - attribute expressions generated by the riot compiler
 * @returns {Object} key value pairs with the result of the computation
 */


function evaluateAttributeExpressions$1(attributes) {
  return attributes.reduce(function (acc, attribute) {
    var value = attribute.value,
        type = attribute.type;

    switch (true) {
      // spread attribute
      case !attribute.name && type === ATTRIBUTE$1:
        return Object.assign({}, acc, {}, value);
      // value attribute

      case type === VALUE$1:
        acc.value = attribute.value;
        break;
      // normal attributes

      default:
        acc[dashToCamelCase$1(attribute.name)] = attribute.value;
    }

    return acc;
  }, {});
}
/**
 * Converts any DOM node/s to a loopable array
 * @param   { HTMLElement|NodeList } els - single html element or a node list
 * @returns { Array } always a loopable object
 */


function domToArray(els) {
  // can this object be already looped?
  if (!Array.isArray(els)) {
    // is it a node list?
    if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === 'number') return Array.from(els);else // if it's a single node
      // it will be returned as "array" with one single entry
      return [els];
  } // this object could be looped out of the box


  return els;
}
/**
 * Simple helper to find DOM nodes returning them as array like loopable object
 * @param   { string|DOMNodeList } selector - either the query or the DOM nodes to arraify
 * @param   { HTMLElement }        ctx      - context defining where the query will search for the DOM nodes
 * @returns { Array } DOM nodes found as array
 */


function _$(selector, ctx) {
  return domToArray(typeof selector === 'string' ? (ctx || document).querySelectorAll(selector) : selector);
}
/**
 * Normalize the return values, in case of a single value we avoid to return an array
 * @param   { Array } values - list of values we want to return
 * @returns { Array|string|boolean } either the whole list of values or the single one found
 * @private
 */


var normalize = function normalize(values) {
  return values.length === 1 ? values[0] : values;
};
/**
 * Parse all the nodes received to get/remove/check their attributes
 * @param   { HTMLElement|NodeList|Array } els    - DOM node/s to parse
 * @param   { string|Array }               name   - name or list of attributes
 * @param   { string }                     method - method that will be used to parse the attributes
 * @returns { Array|string } result of the parsing in a list or a single value
 * @private
 */


function parseNodes(els, name, method) {
  var names = typeof name === 'string' ? [name] : name;
  return normalize(domToArray(els).map(function (el) {
    return normalize(names.map(function (n) {
      return el[method](n);
    }));
  }));
}
/**
 * Set any attribute on a single or a list of DOM nodes
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Object }              name  - either the name of the attribute to set
 *                                                 or a list of properties as object key - value
 * @param   { string }                     value - the new value of the attribute (optional)
 * @returns { HTMLElement|NodeList|Array } the original array of elements passed to this function
 *
 * @example
 *
 * import { set } from 'bianco.attr'
 *
 * const img = document.createElement('img')
 *
 * set(img, 'width', 100)
 *
 * // or also
 * set(img, {
 *   width: 300,
 *   height: 300
 * })
 *
 */


function set(els, name, value) {
  var attrs = _typeof(name) === 'object' ? name : _defineProperty({}, name, value);
  var props = Object.keys(attrs);
  domToArray(els).forEach(function (el) {
    props.forEach(function (prop) {
      return el.setAttribute(prop, attrs[prop]);
    });
  });
  return els;
}
/**
 * Get any attribute from a single or a list of DOM nodes
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Array }               name  - name or list of attributes to get
 * @returns { Array|string } list of the attributes found
 *
 * @example
 *
 * import { get } from 'bianco.attr'
 *
 * const img = document.createElement('img')
 *
 * get(img, 'width') // => '200'
 *
 * // or also
 * get(img, ['width', 'height']) // => ['200', '300']
 *
 * // or also
 * get([img1, img2], ['width', 'height']) // => [['200', '300'], ['500', '200']]
 */


function get(els, name) {
  return parseNodes(els, name, 'getAttribute');
}

var CSS_BY_NAME = new Map();
var STYLE_NODE_SELECTOR = 'style[riot]'; // memoized curried function

var getStyleNode = function (style) {
  return function () {
    // lazy evaluation:
    // if this function was already called before
    // we return its cached result
    if (style) return style; // create a new style element or use an existing one
    // and cache it internally

    style = _$(STYLE_NODE_SELECTOR)[0] || document.createElement('style');
    set(style, 'type', 'text/css');
    /* istanbul ignore next */

    if (!style.parentNode) document.head.appendChild(style);
    return style;
  };
}();
/**
 * Object that will be used to inject and manage the css of every tag instance
 */


var cssManager = {
  CSS_BY_NAME: CSS_BY_NAME,

  /**
   * Save a tag style to be later injected into DOM
   * @param { string } name - if it's passed we will map the css to a tagname
   * @param { string } css - css string
   * @returns {Object} self
   */
  add: function add(name, css) {
    if (!CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.set(name, css);
      this.inject();
    }

    return this;
  },

  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   * @returns {Object} self
   */
  inject: function inject() {
    getStyleNode().innerHTML = _toConsumableArray(CSS_BY_NAME.values()).join('\n');
    return this;
  },

  /**
   * Remove a tag style from the DOM
   * @param {string} name a registered tagname
   * @returns {Object} self
   */
  remove: function remove(name) {
    if (CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.delete(name);
      this.inject();
    }

    return this;
  }
};
/**
 * Function to curry any javascript method
 * @param   {Function}  fn - the target function we want to curry
 * @param   {...[args]} acc - initial arguments
 * @returns {Function|*} it will return a function until the target function
 *                       will receive all of its arguments
 */

function curry(fn) {
  for (var _len = arguments.length, acc = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    acc[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args = [].concat(acc, _toConsumableArray(args));
    return args.length < fn.length ? curry.apply(void 0, [fn].concat(_toConsumableArray(args))) : fn.apply(void 0, _toConsumableArray(args));
  };
}
/**
 * Get the tag name of any DOM node
 * @param   {HTMLElement} element - DOM node we want to inspect
 * @returns {string} name to identify this dom node in riot
 */


function getName(element) {
  return get(element, IS_DIRECTIVE) || element.tagName.toLowerCase();
}

var COMPONENT_CORE_HELPERS = Object.freeze({
  // component helpers
  $: function $(selector) {
    return _$(selector, this.root)[0];
  },
  $$: function $$(selector) {
    return _$(selector, this.root);
  }
});
var PURE_COMPONENT_API = Object.freeze((_Object$freeze = {}, _defineProperty(_Object$freeze, MOUNT_METHOD_KEY, noop), _defineProperty(_Object$freeze, UPDATE_METHOD_KEY, noop), _defineProperty(_Object$freeze, UNMOUNT_METHOD_KEY, noop), _Object$freeze));
var COMPONENT_LIFECYCLE_METHODS = Object.freeze((_Object$freeze2 = {}, _defineProperty(_Object$freeze2, SHOULD_UPDATE_KEY, noop), _defineProperty(_Object$freeze2, ON_BEFORE_MOUNT_KEY, noop), _defineProperty(_Object$freeze2, ON_MOUNTED_KEY, noop), _defineProperty(_Object$freeze2, ON_BEFORE_UPDATE_KEY, noop), _defineProperty(_Object$freeze2, ON_UPDATED_KEY, noop), _defineProperty(_Object$freeze2, ON_BEFORE_UNMOUNT_KEY, noop), _defineProperty(_Object$freeze2, ON_UNMOUNTED_KEY, noop), _Object$freeze2));
var MOCKED_TEMPLATE_INTERFACE = Object.assign({}, PURE_COMPONENT_API, {
  clone: noop,
  createDOM: noop
});
/**
 * Bind a DOM node to its component object
 * @param   {HTMLElement} node - html node mounted
 * @param   {Object} component - Riot.js component object
 * @returns {Object} the component object received as second argument
 */

var bindDOMNodeToComponentObject = function bindDOMNodeToComponentObject(node, component) {
  return node[DOM_COMPONENT_INSTANCE_PROPERTY] = component;
};
/**
 * Wrap the Riot.js core API methods using a mapping function
 * @param   {Function} mapFunction - lifting function
 * @returns {Object} an object having the { mount, update, unmount } functions
 */


function createCoreAPIMethods(mapFunction) {
  return [MOUNT_METHOD_KEY, UPDATE_METHOD_KEY, UNMOUNT_METHOD_KEY].reduce(function (acc, method) {
    acc[method] = mapFunction(method);
    return acc;
  }, {});
}
/**
 * Factory function to create the component templates only once
 * @param   {Function} template - component template creation function
 * @param   {Object} components - object containing the nested components
 * @returns {TemplateChunk} template chunk object
 */


function componentTemplateFactory(template, components) {
  return template(create$6, expressionTypes, bindingTypes, function (name) {
    return components[name] || COMPONENTS_IMPLEMENTATION_MAP.get(name);
  });
}
/**
 * Create a pure component
 * @param   {Function} pureFactoryFunction - pure component factory function
 * @param   {Array} options.slots - component slots
 * @param   {Array} options.attributes - component attributes
 * @param   {Array} options.template - template factory function
 * @param   {Array} options.template - template factory function
 * @param   {any} options.props - initial component properties
 * @returns {Object} pure component object
 */


function createPureComponent(pureFactoryFunction, _ref) {
  var slots = _ref.slots,
      attributes = _ref.attributes,
      props = _ref.props,
      css = _ref.css,
      template = _ref.template;
  if (template) panic('Pure components can not have html');
  if (css) panic('Pure components do not have css');
  var component = defineDefaults(pureFactoryFunction({
    slots: slots,
    attributes: attributes,
    props: props
  }), PURE_COMPONENT_API);
  return createCoreAPIMethods(function (method) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      } // intercept the mount calls to bind the DOM node to the pure object created
      // see also https://github.com/riot/riot/issues/2806


      if (method === MOUNT_METHOD_KEY) {
        var el = args[0];
        bindDOMNodeToComponentObject(el, component);
      }

      component[method].apply(component, args);
      return component;
    };
  });
}
/**
 * Create the component interface needed for the @riotjs/dom-bindings tag bindings
 * @param   {string} options.css - component css
 * @param   {Function} options.template - functon that will return the dom-bindings template function
 * @param   {Object} options.exports - component interface
 * @param   {string} options.name - component name
 * @returns {Object} component like interface
 */


function createComponent(_ref2) {
  var css = _ref2.css,
      template = _ref2.template,
      exports = _ref2.exports,
      name = _ref2.name;
  var templateFn = template ? componentTemplateFactory(template, exports ? createSubcomponents(exports.components) : {}) : MOCKED_TEMPLATE_INTERFACE;
  return function (_ref3) {
    var slots = _ref3.slots,
        attributes = _ref3.attributes,
        props = _ref3.props; // pure components rendering will be managed by the end user

    if (exports && exports[IS_PURE_SYMBOL]) return createPureComponent(exports, {
      slots: slots,
      attributes: attributes,
      props: props,
      css: css,
      template: template
    });
    var componentAPI = callOrAssign(exports) || {};
    var component = defineComponent({
      css: css,
      template: templateFn,
      componentAPI: componentAPI,
      name: name
    })({
      slots: slots,
      attributes: attributes,
      props: props
    }); // notice that for the components create via tag binding
    // we need to invert the mount (state/parentScope) arguments
    // the template bindings will only forward the parentScope updates
    // and never deal with the component state

    return {
      mount: function mount(element, parentScope, state) {
        return component.mount(element, state, parentScope);
      },
      update: function update(parentScope, state) {
        return component.update(state, parentScope);
      },
      unmount: function unmount(preserveRoot) {
        return component.unmount(preserveRoot);
      }
    };
  };
}
/**
 * Component definition function
 * @param   {Object} implementation - the componen implementation will be generated via compiler
 * @param   {Object} component - the component initial properties
 * @returns {Object} a new component implementation object
 */


function defineComponent(_ref4) {
  var _Object$assign3;

  var css = _ref4.css,
      template = _ref4.template,
      componentAPI = _ref4.componentAPI,
      name = _ref4.name; // add the component css into the DOM

  if (css && name) cssManager.add(name, css);
  return curry(enhanceComponentAPI)(defineProperties( // set the component defaults without overriding the original component API
  defineDefaults(componentAPI, Object.assign({}, COMPONENT_LIFECYCLE_METHODS, _defineProperty({}, STATE_KEY, {}))), Object.assign((_Object$assign3 = {}, _defineProperty(_Object$assign3, SLOTS_KEY, null), _defineProperty(_Object$assign3, ROOT_KEY, null), _Object$assign3), COMPONENT_CORE_HELPERS, {
    name: name,
    css: css,
    template: template
  })));
}
/**
 * Create the bindings to update the component attributes
 * @param   {HTMLElement} node - node where we will bind the expressions
 * @param   {Array} attributes - list of attribute bindings
 * @returns {TemplateChunk} - template bindings object
 */


function createAttributeBindings(node, attributes) {
  if (attributes === void 0) {
    attributes = [];
  }

  var expressions = attributes.map(function (a) {
    return create$2(node, a);
  });
  var binding = {};
  return Object.assign(binding, Object.assign({
    expressions: expressions
  }, createCoreAPIMethods(function (method) {
    return function (scope) {
      expressions.forEach(function (e) {
        return e[method](scope);
      });
      return binding;
    };
  })));
}
/**
 * Create the subcomponents that can be included inside a tag in runtime
 * @param   {Object} components - components imported in runtime
 * @returns {Object} all the components transformed into Riot.Component factory functions
 */


function createSubcomponents(components) {
  if (components === void 0) {
    components = {};
  }

  return Object.entries(callOrAssign(components)).reduce(function (acc, _ref5) {
    var _ref17 = _slicedToArray(_ref5, 2),
        key = _ref17[0],
        value = _ref17[1];

    acc[camelToDashCase(key)] = createComponent(value);
    return acc;
  }, {});
}
/**
 * Run the component instance through all the plugins set by the user
 * @param   {Object} component - component instance
 * @returns {Object} the component enhanced by the plugins
 */


function runPlugins(component) {
  return _toConsumableArray(PLUGINS_SET).reduce(function (c, fn) {
    return fn(c) || c;
  }, component);
}
/**
 * Compute the component current state merging it with its previous state
 * @param   {Object} oldState - previous state object
 * @param   {Object} newState - new state givent to the `update` call
 * @returns {Object} new object state
 */


function computeState(oldState, newState) {
  return Object.assign({}, oldState, {}, callOrAssign(newState));
}
/**
 * Add eventually the "is" attribute to link this DOM node to its css
 * @param {HTMLElement} element - target root node
 * @param {string} name - name of the component mounted
 * @returns {undefined} it's a void function
 */


function addCssHook(element, name) {
  if (getName(element) !== name) {
    set(element, IS_DIRECTIVE, name);
  }
}
/**
 * Component creation factory function that will enhance the user provided API
 * @param   {Object} component - a component implementation previously defined
 * @param   {Array} options.slots - component slots generated via riot compiler
 * @param   {Array} options.attributes - attribute expressions generated via riot compiler
 * @returns {Riot.Component} a riot component instance
 */


function enhanceComponentAPI(component, _ref6) {
  var slots = _ref6.slots,
      attributes = _ref6.attributes,
      props = _ref6.props;
  return autobindMethods(runPlugins(defineProperties(Object.create(component), {
    mount: function mount(element, state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      this[ATTRIBUTES_KEY_SYMBOL] = createAttributeBindings(element, attributes).mount(parentScope);
      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, props, {}, evaluateAttributeExpressions$1(this[ATTRIBUTES_KEY_SYMBOL].expressions))));
      this[STATE_KEY] = computeState(this[STATE_KEY], state);
      this[TEMPLATE_KEY_SYMBOL] = this.template.createDOM(element).clone(); // link this object to the DOM node

      bindDOMNodeToComponentObject(element, this); // add eventually the 'is' attribute

      component.name && addCssHook(element, component.name); // define the root element

      defineProperty(this, ROOT_KEY, element); // define the slots array

      defineProperty(this, SLOTS_KEY, slots); // before mount lifecycle event

      this[ON_BEFORE_MOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]); // mount the template

      this[TEMPLATE_KEY_SYMBOL].mount(element, this, parentScope);
      this[PARENT_KEY_SYMBOL] = parentScope;
      this[ON_MOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    },
    update: function update(state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      if (parentScope) {
        this[ATTRIBUTES_KEY_SYMBOL].update(parentScope);
      }

      var newProps = evaluateAttributeExpressions$1(this[ATTRIBUTES_KEY_SYMBOL].expressions);
      if (this[SHOULD_UPDATE_KEY](newProps, this[PROPS_KEY]) === false) return;
      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, props, {}, newProps)));
      this[STATE_KEY] = computeState(this[STATE_KEY], state);
      this[ON_BEFORE_UPDATE_KEY](this[PROPS_KEY], this[STATE_KEY]);
      this[TEMPLATE_KEY_SYMBOL].update(this, this[PARENT_KEY_SYMBOL]);
      this[ON_UPDATED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    },
    unmount: function unmount(preserveRoot) {
      this[ON_BEFORE_UNMOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
      this[ATTRIBUTES_KEY_SYMBOL].unmount(); // if the preserveRoot is null the template html will be left untouched
      // in that case the DOM cleanup will happen differently from a parent node

      this[TEMPLATE_KEY_SYMBOL].unmount(this, this[PARENT_KEY_SYMBOL], preserveRoot === null ? null : !preserveRoot);
      this[ON_UNMOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    }
  })), Object.keys(component).filter(function (prop) {
    return isFunction(component[prop]);
  }));
}
/**
 * Component initialization function starting from a DOM node
 * @param   {HTMLElement} element - element to upgrade
 * @param   {Object} initialProps - initial component properties
 * @param   {string} componentName - component id
 * @returns {Object} a new component instance bound to a DOM node
 */


function mountComponent(element, initialProps, componentName) {
  var name = componentName || getName(element);
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic("The component named \"".concat(name, "\" was never registered"));
  var component = COMPONENTS_IMPLEMENTATION_MAP.get(name)({
    props: initialProps
  });
  return component.mount(element);
}
/**
 * Get all the element attributes as object
 * @param   {HTMLElement} element - DOM node we want to parse
 * @returns {Object} all the attributes found as a key value pairs
 */


function DOMattributesToObject(element) {
  return Array.from(element.attributes).reduce(function (acc, attribute) {
    acc[dashToCamelCase$1(attribute.name)] = attribute.value;
    return acc;
  }, {});
}
/**
 * Similar to compose but performs from left-to-right function composition.<br/>
 * {@link https://30secondsofcode.org/function#composeright see also}
 * @param   {...[function]} fns) - list of unary function
 * @returns {*} result of the computation
 */

/**
 * Performs right-to-left function composition.<br/>
 * Use Array.prototype.reduce() to perform right-to-left function composition.<br/>
 * The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.<br/>
 * {@link https://30secondsofcode.org/function#compose original source code}
 * @param   {...[function]} fns) - list of unary function
 * @returns {*} result of the computation
 */


function compose() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(void 0, arguments));
    };
  });
}

var DOM_COMPONENT_INSTANCE_PROPERTY$1 = globals.DOM_COMPONENT_INSTANCE_PROPERTY,
    COMPONENTS_IMPLEMENTATION_MAP$1 = globals.COMPONENTS_IMPLEMENTATION_MAP,
    PLUGINS_SET$1 = globals.PLUGINS_SET;
/**
 * Evaluate the component properties either from its real attributes or from its initial user properties
 * @param   {HTMLElement} element - component root
 * @param   {Object}  initialProps - initial props
 * @returns {Object} component props key value pairs
 */

function evaluateInitialProps(element, initialProps) {
  if (initialProps === void 0) {
    initialProps = [];
  }

  return Object.assign({}, DOMattributesToObject(element), {}, callOrAssign(initialProps));
}
/**
 * Riot public api
 */

/**
 * Register a custom tag by name
 * @param   {string} name - component name
 * @param   {Object} implementation - tag implementation
 * @returns {Map} map containing all the components implementations
 */


function register(name, _ref) {
  var css = _ref.css,
      template = _ref.template,
      exports = _ref.exports;
  if (COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic("The component \"".concat(name, "\" was already registered"));
  COMPONENTS_IMPLEMENTATION_MAP$1.set(name, createComponent({
    name: name,
    css: css,
    template: template,
    exports: exports
  }));
  return COMPONENTS_IMPLEMENTATION_MAP$1;
}
/**
 * Unregister a riot web component
 * @param   {string} name - component name
 * @returns {Map} map containing all the components implementations
 */


function unregister(name) {
  if (!COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic("The component \"".concat(name, "\" was never registered"));
  COMPONENTS_IMPLEMENTATION_MAP$1.delete(name);
  cssManager.remove(name);
  return COMPONENTS_IMPLEMENTATION_MAP$1;
}
/**
 * Mounting function that will work only for the components that were globally registered
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @param   {Object} initialProps - the initial component properties
 * @param   {string} name - optional component name
 * @returns {Array} list of nodes upgraded
 */


function mount(selector, initialProps, name) {
  return _$(selector).map(function (element) {
    return mountComponent(element, evaluateInitialProps(element, initialProps), name);
  });
}
/**
 * Sweet unmounting helper function for the DOM node mounted manually by the user
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @param   {boolean|null} keepRootElement - if true keep the root element
 * @returns {Array} list of nodes unmounted
 */


function unmount(selector, keepRootElement) {
  return _$(selector).map(function (element) {
    if (element[DOM_COMPONENT_INSTANCE_PROPERTY$1]) {
      element[DOM_COMPONENT_INSTANCE_PROPERTY$1].unmount(keepRootElement);
    }

    return element;
  });
}
/**
 * Define a riot plugin
 * @param   {Function} plugin - function that will receive all the components created
 * @returns {Set} the set containing all the plugins installed
 */


function install(plugin) {
  if (!isFunction(plugin)) panic('Plugins must be of type function');
  if (PLUGINS_SET$1.has(plugin)) panic('This plugin was already install');
  PLUGINS_SET$1.add(plugin);
  return PLUGINS_SET$1;
}
/**
 * Uninstall a riot plugin
 * @param   {Function} plugin - plugin previously installed
 * @returns {Set} the set containing all the plugins installed
 */


function uninstall(plugin) {
  if (!PLUGINS_SET$1.has(plugin)) panic('This plugin was never installed');
  PLUGINS_SET$1.delete(plugin);
  return PLUGINS_SET$1;
}
/**
 * Helpter method to create component without relying on the registered ones
 * @param   {Object} implementation - component implementation
 * @returns {Function} function that will allow you to mount a riot component on a DOM node
 */


function component(implementation) {
  return function (el, props, _temp) {
    var _ref18 = _temp === void 0 ? {} : _temp,
        slots = _ref18.slots,
        attributes = _ref18.attributes;

    return compose(function (c) {
      return c.mount(el);
    }, function (c) {
      return c({
        props: evaluateInitialProps(el, props),
        slots: slots,
        attributes: attributes
      });
    }, createComponent)(implementation);
  };
}
/**
 * Lift a riot component Interface into a pure riot object
 * @param   {Function} func - RiotPureComponent factory function
 * @returns {Function} the lifted original function received as argument
 */


function pure(func) {
  if (!isFunction(func)) panic('riot.pure accepts only arguments of type "function"');
  func[IS_PURE_SYMBOL] = true;
  return func;
}
/** @type {string} current riot version */


var version = 'v4.8.7'; // expose some internal stuff that might be used from external tools

exports.version = version;
var __ = {
  cssManager: cssManager,
  createComponent: createComponent,
  defineComponent: defineComponent,
  globals: globals
};
exports.__ = __;
},{}],"../../../node_modules/bianco.dom-to-array/index.next.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = domToArray;

/**
 * Converts any DOM node/s to a loopable array
 * @param   { HTMLElement|NodeList } els - single html element or a node list
 * @returns { Array } always a loopable object
 */
function domToArray(els) {
  // can this object be already looped?
  if (!Array.isArray(els)) {
    // is it a node list?
    if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === 'number') return Array.from(els);else // if it's a single node
      // it will be returned as "array" with one single entry
      return [els];
  } // this object could be looped out of the box


  return els;
}
},{}],"../../../node_modules/bianco.query/index.next.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = $;

var _bianco = _interopRequireDefault(require("bianco.dom-to-array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Simple helper to find DOM nodes returning them as array like loopable object
 * @param   { string|DOMNodeList } selector - either the query or the DOM nodes to arraify
 * @param   { HTMLElement }        ctx      - context defining where the query will search for the DOM nodes
 * @returns { Array } DOM nodes found as array
 */
function $(selector, ctx) {
  return (0, _bianco.default)(typeof selector === 'string' ? (ctx || document).querySelectorAll(selector) : selector);
}
},{"bianco.dom-to-array":"../../../node_modules/bianco.dom-to-array/index.next.js"}],"../../../node_modules/@riotjs/hot-reload/index.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('riot'), require('bianco.query')) :
  typeof define === 'function' && define.amd ? define(['exports', 'riot', 'bianco.query'], factory) :
  (global = global || self, factory(global.riotHotReload = {}, global.riot, global.$));
}(this, function (exports, riot, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  const { cssManager } = riot.__;
  const { DOM_COMPONENT_INSTANCE_PROPERTY } = riot.__.globals;

  function reload(componentAPI) {
    const {name} = componentAPI;

    if (!name) {
      console.warn('Anonymous components can not be reloaded'); // eslint-disable-line
      return []
    }

    return $(`${name}, [is=${name}]`).map(el => {
      const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY];

      // remove the tag template from the DOM
      oldTag.unmount(true);
      // delete the old css from the css manager
      cssManager.remove(name);

      // create the new tag
      const newTag = riot.component(componentAPI)(el, oldTag.props);
      newTag.update(oldTag.state);

      return newTag
    })
  }

  exports.default = reload;
  exports.reload = reload;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

},{"riot":"../../../node_modules/riot/riot.esm.js","bianco.query":"../../../node_modules/bianco.query/index.next.js"}],"components/checkpoint-detail/checkpoint-detail.riot":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Define logics about this component here.
var progressRep = nodecg.Replicant('progress');
var teamRep = nodecg.Replicant('team-list');
var relayRep = nodecg.Replicant('relay');

function CheckpointDetail() {
  return {
    state: {
      details: [],
      teams: [],
      segments: [],
      segIndexes: {
        runIndex: 0,
        segIndex: 0
      },
      existing: false
    },
    onMounted: function onMounted() {
      var _this = this;

      setTimeout(function () {
        _this.state.existing = true;

        _this.update();
      }, 18000);
      progressRep.on('change', function (newVal) {
        _this.state.details = [];
        var minIdxs = {
          runIndex: Infinity,
          segIndex: Infinity
        };

        for (var i = 0; i < newVal.length; i++) {
          var segments = newVal[i].segments;

          if (segments.prev) {
            if (segments.prev.runIndex < minIdxs.runIndex) {
              minIdxs.runIndex = segments.prev.runIndex;
              minIdxs.segIndex = segments.prev.segIndex;
            } else if (segments.prev.runIndex === minIdxs.runIndex) {
              minIdxs.segIndex = Math.min(minIdxs.segIndex, segments.prev.segIndex);
            }
          }
        }

        for (var i = 0; i < newVal.length; i++) {
          if (newVal[i].splits.length <= minIdxs.runIndex || newVal[i].splits[minIdxs.runIndex].length <= minIdxs.segIndex) {
            continue;
          }

          var split = newVal[i].splits[minIdxs.runIndex][minIdxs.segIndex];

          _this.state.details.push({
            teamIdx: i,
            time: {
              formatted: split.total.formatted.split('.')[0],
              raw: split.total.raw
            }
          });

          _this.state.details.sort(function (a, b) {
            return a.time.raw - b.time.raw;
          });
        }

        _this.state.segIndexes = minIdxs;

        _this.update();
      });
      teamRep.on('change', function (newVal) {
        _this.state.teams = newVal.map(function (team) {
          return team.name;
        });

        _this.update();
      });
      relayRep.on('change', function (newVal) {
        _this.state.segments = [];

        for (var i = 0; i < newVal.runs.length; i++) {
          _this.state.segments.push(newVal.runs[i].segments);
        }

        _this.update();
      });
    }
  };
}

var _default = {
  'css': "checkpoint-detail .top,[is=\"checkpoint-detail\"] .top{ width: 100%; height: 100%; display: flex; } checkpoint-detail .detail,[is=\"checkpoint-detail\"] .detail{ padding: 0.5rem 0 0.5rem 0.5rem; margin-right: 0.25rem; overflow-x: hidden; overflow-y: hidden; }",
  'exports': CheckpointDetail,
  'template': function template(_template, expressionTypes, bindingTypes, getComponent) {
    return _template('<div class="top columns is-marginless is-vcentered"><div expr89="expr89" style="margin-right: 0.5rem;"><div class="columns is-marginless is-multiline is-vcentered" style="height:100vh;padding:0 0.5rem;"><div class="column is-paddingless is-full is-size-7">チェックポイント</div><div expr90="expr90" class="column is-paddingless is-full has-text-weight-bold is-size-7"> </div></div></div><div expr91="expr91"></div><div class="column"></div></div>', [{
      'redundantAttribute': 'expr89',
      'selector': '[expr89]',
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',
        'evaluate': function evaluate(scope) {
          return ['column is-2 is-paddingless is-narrow animated ', scope.state.existing ? 'slideOutLeft' : 'slideInLeft'].join('');
        }
      }]
    }, {
      'redundantAttribute': 'expr90',
      'selector': '[expr90]',
      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,
        'evaluate': function evaluate(scope) {
          return ['\r\n                    ', scope.state.segments[scope.state.segIndexes.runIndex] ? scope.state.segments[scope.state.segIndexes.runIndex][scope.state.segIndexes.segIndex] || '-' : '-', '\r\n                '].join('');
        }
      }]
    }, {
      'type': bindingTypes.EACH,
      'getKey': null,
      'condition': null,
      'template': _template('<div class="columns is-marginless is-vcentered box is-paddingless"><div expr92="expr92" class="column is-narrow is-size-7" style="border-right: 1px dashed black; font-size:25vh;"> </div><div class="column columns is-multiline"><div expr93="expr93" class="column is-paddingless is-full is-size-7" style="margin-left: 0.5rem; font-size:25vh; white-space: nowrap;"> </div><div expr94="expr94" class="column is-paddingless is-full" style="margin-left: 0.5rem; font-size:25vh;"> </div></div></div>', [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',
          'evaluate': function evaluate(scope) {
            return ['detail column is-paddingless is-vcentered is-3 animated ', scope.state.existing ? 'fadeOutRight' : 'fadeInRight'].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr92',
        'selector': '[expr92]',
        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,
          'evaluate': function evaluate(scope) {
            return ['\r\n                    ', scope.idx + 1, '\r\n                '].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr93',
        'selector': '[expr93]',
        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,
          'evaluate': function evaluate(scope) {
            return scope.state.teams[scope.detail.teamIdx] || '-';
          }
        }]
      }, {
        'redundantAttribute': 'expr94',
        'selector': '[expr94]',
        'expressions': [{
          'type': expressionTypes.TEXT,
          'childNodeIndex': 0,
          'evaluate': function evaluate(scope) {
            return scope.detail.time.formatted;
          }
        }]
      }]),
      'redundantAttribute': 'expr91',
      'selector': '[expr91]',
      'itemName': 'detail',
      'indexName': 'idx',
      'evaluate': function evaluate(scope) {
        return scope.state.details;
      }
    }]);
  },
  'name': 'checkpoint-detail'
};
exports.default = _default;
},{}],"components/event-title/event-title.riot":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Define logics about this component here.
function EventTitle() {
  return {
    state: {
      existing: false
    },
    onMounted: function onMounted() {
      var _this = this;

      setTimeout(function () {
        _this.state.existing = true;

        _this.update();
      }, 18000);
    }
  };
}

var _default = {
  'css': "event-title .event-title,[is=\"event-title\"] .event-title{ font-weight: bold; font-size: 50vh; }",
  'exports': EventTitle,
  'template': function template(_template, expressionTypes, bindingTypes, getComponent) {
    return _template('<div expr7="expr7"> </div>', [{
      'redundantAttribute': 'expr7',
      'selector': '[expr7]',
      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,
        'evaluate': function evaluate(scope) {
          return scope.props.title;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',
        'evaluate': function evaluate(scope) {
          return ['event-title has-text-centered animated ', scope.state.existing ? 'fadeOutLeft' : 'fadeInRight'].join('');
        }
      }]
    }]);
  },
  'name': 'event-title'
};
exports.default = _default;
},{}],"../../../node_modules/color-name/index.js":[function(require,module,exports) {
'use strict'

module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};

},{}],"../../../node_modules/simple-swizzle/node_modules/is-arrayish/index.js":[function(require,module,exports) {
module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};

},{}],"../../../node_modules/simple-swizzle/index.js":[function(require,module,exports) {
'use strict';

var isArrayish = require('is-arrayish');

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};

},{"is-arrayish":"../../../node_modules/simple-swizzle/node_modules/is-arrayish/index.js"}],"../../../node_modules/color-string/index.js":[function(require,module,exports) {
/* MIT license */
var colorNames = require('color-name');
var swizzle = require('simple-swizzle');

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {},
	get: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?(?:\d*\.)?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = (parseFloat(match[1]) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}

},{"color-name":"../../../node_modules/color-name/index.js","simple-swizzle":"../../../node_modules/simple-swizzle/index.js"}],"../../../node_modules/color-convert/conversions.js":[function(require,module,exports) {
/* MIT license */
var cssKeywords = require('color-name');

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};

},{"color-name":"../../../node_modules/color-name/index.js"}],"../../../node_modules/color-convert/route.js":[function(require,module,exports) {
var conversions = require('./conversions');

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};


},{"./conversions":"../../../node_modules/color-convert/conversions.js"}],"../../../node_modules/color-convert/index.js":[function(require,module,exports) {
var conversions = require('./conversions');
var route = require('./route');

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;

},{"./conversions":"../../../node_modules/color-convert/conversions.js","./route":"../../../node_modules/color-convert/route.js"}],"../../../node_modules/color/index.js":[function(require,module,exports) {
'use strict';

var colorString = require('color-string');
var convert = require('color-convert');

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (obj == null) { // eslint-disable-line no-eq-null,eqeqeq
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	isDark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	isLight: function () {
		return !this.isDark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		if (!mixinColor || !mixinColor.rgb) {
			throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof mixinColor);
		}
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;

},{"color-string":"../../../node_modules/color-string/index.js","color-convert":"../../../node_modules/color-convert/index.js"}],"components/omni-bar/omni-bar.riot":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkpointDetail = _interopRequireDefault(require("../checkpoint-detail/checkpoint-detail.riot"));

var _eventTitle = _interopRequireDefault(require("../event-title/event-title.riot"));

var _color = _interopRequireDefault(require("color"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Define logics about this component here.
var relayRep = nodecg.Replicant('relay');
var timeRep = nodecg.Replicant('stopwatch');
var graphicRep = nodecg.Replicant('graphics');

function OmniBar() {
  return {
    state: {
      eventTitle: '',
      themeColor: '#dddddd',
      time: '0:00:00',
      timeState: 'not_started',
      logo: null,
      showInfo: 0
    },
    themeColorIsLight: function themeColorIsLight() {
      try {
        return (0, _color.default)(this.state.themeColor).isLight();
      } catch (_a) {
        return false;
      }
    },
    onMounted: function onMounted() {
      var _this = this;

      relayRep.on('change', function (newVal) {
        _this.state.eventTitle = newVal.name;
        _this.state.themeColor = newVal.color;

        _this.update();
      });
      timeRep.on('change', function (newVal) {
        _this.state.time = newVal.time.formatted.split('.')[0];
        _this.state.timeState = newVal.state;

        _this.update();
      });
      graphicRep.on('change', function (newVal) {
        _this.state.logo = newVal.logoUrl;

        _this.update();
      });
      setInterval(function () {
        _this.state.showInfo = (_this.state.showInfo + 1) % 2;

        _this.update();
      }, 20000);
    }
  };
}

OmniBar.components = {
  EventTitle: _eventTitle.default,
  CheckpointDetail: _checkpointDetail.default
};
var _default = {
  'css': "omni-bar,[is=\"omni-bar\"]{ } omni-bar .timer,[is=\"omni-bar\"] .timer{ background-color: rgba(255, 255, 255, 0.9); line-height: 100vh; font-size: 50vh; font-weight: bold; } omni-bar .timer span,[is=\"omni-bar\"] .timer span{ padding: 0 0.5rem; } omni-bar .logo,[is=\"omni-bar\"] .logo{ height: 100vh; } omni-bar .omni,[is=\"omni-bar\"] .omni{ overflow: hidden; } omni-bar img,[is=\"omni-bar\"] img{ width: auto; height: 100%; }",
  'exports': OmniBar,
  'template': function template(_template, expressionTypes, bindingTypes, getComponent) {
    return _template('<div expr1="expr1"><div expr2="expr2" class="column is-narrow is-paddingless"></div><div class="column is-paddingless omni is-vcentered"><event-title expr4="expr4"></event-title><checkpoint-detail expr5="expr5"></checkpoint-detail></div><div style="min-width:10rem;" class="column is-narrow is-paddingless timer has-text-dark is-background-light has-text-right"><span expr6="expr6"> </span></div></div>', [{
      'redundantAttribute': 'expr1',
      'selector': '[expr1]',
      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',
        'evaluate': function evaluate(scope) {
          return ['columns is-marginless is-vcentered ', scope.themeColorIsLight() ? 'has-text-black' : 'has-text-white'].join('');
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'style',
        'evaluate': function evaluate(scope) {
          return ['background-color: ', scope.state.themeColor, ';'].join('');
        }
      }]
    }, {
      'type': bindingTypes.IF,
      'evaluate': function evaluate(scope) {
        return scope.state.logo != null && scope.state.logo != '';
      },
      'redundantAttribute': 'expr2',
      'selector': '[expr2]',
      'template': _template('<figure class="image logo is-72x72"><img expr3="expr3"/></figure>', [{
        'redundantAttribute': 'expr3',
        'selector': '[expr3]',
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'src',
          'evaluate': function evaluate(scope) {
            return scope.state.logo || '../statics/logo-png.png';
          }
        }]
      }])
    }, {
      'type': bindingTypes.IF,
      'evaluate': function evaluate(scope) {
        return scope.state.showInfo === 0;
      },
      'redundantAttribute': 'expr4',
      'selector': '[expr4]',
      'template': _template(null, [{
        'type': bindingTypes.TAG,
        'getComponent': getComponent,
        'evaluate': function evaluate(scope) {
          return 'event-title';
        },
        'slots': [],
        'attributes': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'title',
          'evaluate': function evaluate(scope) {
            return scope.state.eventTitle;
          }
        }]
      }])
    }, {
      'type': bindingTypes.IF,
      'evaluate': function evaluate(scope) {
        return scope.state.showInfo === 1;
      },
      'redundantAttribute': 'expr5',
      'selector': '[expr5]',
      'template': _template(null, [{
        'type': bindingTypes.TAG,
        'getComponent': getComponent,
        'evaluate': function evaluate(scope) {
          return 'checkpoint-detail';
        },
        'slots': [],
        'attributes': []
      }])
    }, {
      'redundantAttribute': 'expr6',
      'selector': '[expr6]',
      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,
        'evaluate': function evaluate(scope) {
          return scope.state.time;
        }
      }, {
        'type': expressionTypes.ATTRIBUTE,
        'name': 'class',
        'evaluate': function evaluate(scope) {
          return [' ', scope.state.timeState == 'not_started' ? 'has-text-dark' : '', ' ', scope.state.timeState == 'running' ? 'has-text-black' : '', ' ', scope.state.timeState == 'finished' ? 'has-text-success' : ''].join('');
        }
      }]
    }]);
  },
  'name': 'omni-bar'
};
exports.default = _default;
},{"../checkpoint-detail/checkpoint-detail.riot":"components/checkpoint-detail/checkpoint-detail.riot","../event-title/event-title.riot":"components/event-title/event-title.riot","color":"../../../node_modules/color/index.js"}],"omnibar.ts":[function(require,module,exports) {
"use strict";

require("@riotjs/hot-reload");

var riot = _interopRequireWildcard(require("riot"));

var _omniBar = _interopRequireDefault(require("./components/omni-bar/omni-bar.riot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

riot.component(_omniBar.default)(document.getElementById("root") || document.body, {});
},{"@riotjs/hot-reload":"../../../node_modules/@riotjs/hot-reload/index.js","riot":"../../../node_modules/riot/riot.esm.js","./components/omni-bar/omni-bar.riot":"components/omni-bar/omni-bar.riot"}],"../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55621" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","omnibar.ts"], null)
//# sourceMappingURL=omnibar.179a54e0.js.map