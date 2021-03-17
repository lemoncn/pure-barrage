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
})({"../src/type.ts":[function(require,module,exports) {

},{}],"../src/Bullet.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;
/**
 * 子弹
 */

require("./type"); //  数据类型


var Bullet =
/** @class */
function () {
  /**
   * @constructor Bullet
   * @param {string} msg 弹幕文字
   * @param {EmitConfig} emitConfig   弹幕文字效果
   * @param {config} stageConfig 弹幕组件初始化配置
   *
   */
  function Bullet(msg, emitConfig, stageConfig) {
    var that = this;
    that.oBullet = document.createElement("div");
    that.oBullet.innerHTML = msg;
    that.oBullet.className = "barrage-bullet"; //  着重标记

    if (emitConfig.notice) {
      that.oBullet.className += " barrage-bullet-notice";
    } // class拓展


    if (emitConfig.className) {
      that.oBullet.className += " " + emitConfig.className;
    } //  字号


    if (emitConfig.fontSize) {
      that.oBullet.style.fontSize = emitConfig.fontSize;
    } //  字色


    if (emitConfig.fontColor) {
      that.oBullet.style.color = emitConfig.fontColor;
    } // 速度
    // 弹幕速度通过时间控制：overTimeBase


    var time = stageConfig.overTimeBase;

    switch (emitConfig.speed) {
      case 'fast':
        time = time * (Math.random() * (1.3 - 0.8) + 0.4);
        break;

      case 'slow':
        time = time * (Math.random() * (1.3 - 0.8) + 1.2);
        break;

      default:
        time = time * (Math.random() * (1.3 - 0.8) + 0.8);
    }

    that.oBullet.style.transitionDuration = time / 1000 + "s";
  }
  /**
   * 获取子弹dom
   * @function get
   * @returns {HTMLSpanElement}
   *
   */


  Bullet.prototype.get = function () {
    return this.oBullet;
  };

  return Bullet;
}();

exports["default"] = Bullet;
},{"./type":"../src/type.ts"}],"../node_modules/object-assign/index.js":[function(require,module,exports) {
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
'use strict';
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};
},{}],"../src/Barrage.ts":[function(require,module,exports) {
"use strict";
/**
 * 弹幕类
 * @author Lemon
 */

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

require("./type"); //  数据类型


var Bullet_1 = __importDefault(require("./Bullet")); //  弹幕子弹


var objectAssign = require('object-assign');

var Barrage =
/** @class */
function () {
  /**
   * @constructor Barrage
   *
   * @param {config} config
   * @param {Object} config.container - 弹幕区域的dom对象
   * @param {Number} config.overTimeBase - 弹幕划过的时间基准（弹幕划过所需要的时间，默认5000  即5s）
   */
  function Barrage(config) {
    var that = this; // 初始化默认配置

    that.config = objectAssign({
      container: window.document.body,
      overTimeBase: 6000
    }, config);
    that.width = that.config.container.clientWidth;
    that.height = that.config.container.clientHeight;
    that.lastTop = 0;
    that.styleInit();
  }
  /**
   * 样式初始化
   * @function  styleInit
   * @private
   */


  Barrage.prototype.styleInit = function () {
    var that = this; // 给弹幕容器加class调用

    that.config.container.className += ' fe-plus-barrage';
    var oHead = document.getElementsByTagName('head')[0];
    var oStyle = document.createElement('style');
    oStyle.type = 'text/css';
    var sCSS = ['.fe-plus-barrage{overflow: hidden}', '.fe-plus-barrage .barrage-bullet{position: absolute;left: 100%;top: 0px;z-index: 100;white-space: nowrap;color: #fff;line-height: 160%;text-shadow: 1px 1px 0px rgba(0,0,0,.4);transition: transform 3s linear;}', '.fe-plus-barrage .barrage-bullet-notice{font-weight: bold;color:red}'].join('');

    if (oStyle.styleSheet) {
      oStyle.styleSheet.cssText = sCSS;
    } else {
      oStyle.innerHTML = sCSS;
    }

    oHead.appendChild(oStyle);
  };
  /**
   * 发射弹幕
   * @function emit
   * @param {string} msg
   * @param {EmitConfig} [emitConfig] 拓展样式
   * @param {boolean} [emitConfig.notice] 是否是重点弹幕（加大加粗）
   * @param {string} [emitConfig.fontSize] 字号 “12px”
   * @param {string} [emitConfig.fontColor] 字色“#ff0”
   */


  Barrage.prototype.emit = function (msg, emitConfig) {
    var that = this;
    var oEmitConfig = emitConfig || {}; //  获取弹幕子弹元素

    var bullet = new Bullet_1["default"](msg, oEmitConfig, that.config).get(); //  render dom，获取其占位尺寸

    that.config.container.appendChild(bullet);
    var bulletWidth = bullet.clientWidth;
    var bulletHeight = bullet.clientHeight; //  top值
    // that.lastTop += bulletHeight + Math.random() * 30;

    that.lastTop += bulletHeight + 0;

    if (that.lastTop + bulletHeight > that.height) {
      that.lastTop = 0;
    }

    bullet.style.top = that.lastTop + 'px'; // 移出屏幕偏移量

    var moveX = that.width + bulletWidth; //  开始单条弹幕

    bullet.style.transform = 'translate3d(' + -moveX + 'px, 0,0)'; //  动画结束消除自己

    function _removeBullet() {
      if (bullet.parentNode) {
        bullet.removeEventListener('webkitTransitionEnd', _removeBullet);
        bullet.removeEventListener('transitionend', _removeBullet);
        bullet.parentNode.removeChild(bullet);
      }
    }

    bullet.addEventListener('webkitTransitionEnd', _removeBullet);
    bullet.addEventListener('transitionend', _removeBullet);
  };

  return Barrage;
}();

exports["default"] = Barrage;
},{"./type":"../src/type.ts","./Bullet":"../src/Bullet.ts","object-assign":"../node_modules/object-assign/index.js"}],"main.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

exports.__esModule = true;

var Barrage_1 = __importDefault(require("../src/Barrage"));

var barrage = new Barrage_1["default"]({
  container: window.document.getElementById('danmu'),
  overTimeBase: 5000
});
barrage.emit('中文中文中文中文中文中文');
setInterval(function () {
  barrage.emit('中文中文中文中文中文中文', {
    notice: true,
    fontSize: '20px',
    fontColor: '#ff0',
    speed: 'fast',
    className: 'custom' // 自定义class

  });
}, 1000);
},{"../src/Barrage":"../src/Barrage.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "7877" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map