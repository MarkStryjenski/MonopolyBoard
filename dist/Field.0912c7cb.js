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
})({"src/Field.js":[function(require,module,exports) {
function Field(name, color, cost, basicRevenue, houseCost, singleHouseRevenue, twoHouseRevenue, threeHouseRevenue, fourHouseRevenue, hotelRevenue) {
  this.name = name;
  this.cost = cost;
  this.basicRevenue = basicRevenue;
  this.houseCost = houseCost;
  this.singleHouseRevenue = singleHouseRevenue;
  this.twoHouseRevenue = twoHouseRevenue;
  this.threeHouseRevenue = threeHouseRevenue;
  this.fourHouseRevenue = fourHouseRevenue;
  this.hotelRevenue = hotelRevenue;
  this.color = color;
  this.coffeeMachine = false;
  this.breakRoom = false;
  this.jail = false;
  this.police = false;
  this.go = false;
  this.tax = false;
  this.owner = null;
  this.oneHouseBuild = false;
  this.twoHousesBuild = false;
  this.threeHousesBuild = false;
  this.fourHousesBuild = false;
  this.hotelBuild = false;
  this.setComplete = false;
  this.currentRevenue = 0;
  this.nrOfHousesBuild = 0;
  this.sellValue = 0;
  this.partOfTrade = false;
  this.number = 0; // this.breaksRoomOwned=0;

  this.getCurrentRevenue = function () {
    if (this.oneHouseBuild === true) {
      this.currentRevenue = singleHouseRevenue;
    } else if (this.twoHousesBuild === true) {
      this.currentRevenue = twoHouseRevenue;
    } else if (this.threeHousesBuild === true) {
      this.currentRevenue = threeHouseRevenue;
    } else if (this.fourHousesBuild === true) {
      this.currentRevenue = fourHouseRevenue;
    } else if (this.hotelBuild === true) {
      this.currentRevenue = hotelRevenue;
    } else {
      this.currentRevenue = basicRevenue;
    }

    return this.currentRevenue;
  };

  this.buildHouse = function () {
    switch (this.nrOfHousesBuild) {
      case 0:
        this.oneHouseBuild = true;
        break;

      case 1:
        this.oneHouseBuild = false;
        this.twoHousesBuild = true;
        break;

      case 2:
        this.twoHousesBuild = false;
        this.threeHousesBuild = true;
        break;

      case 3:
        this.threeHousesBuild = false;
        this.fourHousesBuild = true;
        break;

      case 4:
        this.fourHousesBuild = false;
        this.hotelBuild = true;
        break;

      default:
        console.log("Max nr of houses to build reached");
        return -1;
    }

    this.nrOfHousesBuild++;
    return this.nrOfHousesBuild;
  };

  this.sellHouse = function () {
    if (this.nrOfHousesBuild == 0) {
      return false;
    } else if (this.nrOfHousesBuild == 1) {
      this.oneHouseBuild = false;
    } else if (this.nrOfHousesBuild == 2) {
      this.twoHousesBuild = false;
      this.oneHouseBuild = true;
    } else if (this.nrOfHousesBuild == 3) {
      this.threeHousesBuild = false;
      this.twoHousesBuild = true;
    } else if (this.nrOfHousesBuild == 4) {
      this.fourHousesBuild = false;
      this.threeHousesBuild = true;
    } else if (this.nrOfHousesBuild == 5) {
      this.hotelBuild = false;
      this.fourHousesBuild = true;
    }

    return true; // addMessage(game.getCurrentPlayer().name+" sold a single house and now field "+game.getCurrentFieldObj().name);
  };

  this.getSellValue = function () {
    this.sellValue = this.cost / 2;
    return this.sellValue;
  };

  this.getHouseCost = function () {
    return this.houseCost;
  };
}

var fields = [];
fields[0] = new Field("GO", null);
fields[0].go = true;
fields[1] = new Field("Intercultural Communication", "brown", 60, 2, 50, 10, 30, 90, 160, 250);
fields[2] = new Field("Coffee Machine", "white");
fields[2].coffeeMachine = true;
fields[2].owner = "bank";
fields[3] = new Field("Introduction to PHP", "brown", 60, 4, 50, 20, 60, 180, 320, 450);
fields[4] = new Field("Tuition Fee", "white");
fields[4].owner = "government";
fields[4].tax = true;
fields[5] = new Field("Study Career coaching 1", "black", 200, 50);
fields[5].breakRoom = true;
fields[6] = new Field("HTML/CSS", "lightblue", 100, 6, 50, 10, 30, 90, 160, 250);
fields[7] = new Field("Coffee Machine", "white");
fields[7].coffeeMachine = true;
fields[7].owner = "bank";
fields[8] = new Field("Project Professional Website", "lightblue", 100, 6, 50, 10, 30, 90, 160, 250);
fields[9] = new Field("Written Communication 1", "lightblue", 120, 8, 50, 10, 30, 90, 160, 250);
fields[10] = new Field("Jail", "white");
fields[10].jail = true;
fields[10].owner = "jail";
fields[11] = new Field("Information management", "pink", 140, 10, 50, 10, 30, 90, 160, 250);
fields[12] = new Field("Mediterian Avenue", "white", 60, 2, 50, 10, 30, 90, 160, 250);
fields[13] = new Field("FED Essentials", "pink", 140, 10, 50, 10, 30, 90, 160, 250);
fields[14] = new Field("Introduction to Databases", "pink", 160, 12, 50, 10, 30, 90, 160, 250);
fields[15] = new Field("Study Career coaching 2", "black", 200, 50);
fields[15].breakRoom = true;
fields[16] = new Field("PHP Advandced", "orange", 180, 14, 50, 10, 30, 90, 160, 250);
fields[17] = new Field("Coffee Machine", "white");
fields[17].coffeeMachine = true;
fields[17].owner = "bank";
fields[18] = new Field("Project Support Desk", "orange", 180, 14, 50, 10, 30, 90, 160, 250);
fields[19] = new Field("Oral Communication 1", "orange", 200, 16, 50, 10, 30, 90, 160, 250);
fields[20] = new Field("Parking", "white", 60, 2, 50, 10, 30, 90, 160, 250);
fields[21] = new Field("Introduction to Programming in Java", "red", 220, 18, 50, 10, 30, 90, 160, 250);
fields[22] = new Field("Coffee Machine", "white");
fields[22].coffeeMachine = true;
fields[22].owner = "bank";
fields[23] = new Field("Introduction to Computer Network", "red", 220, 18, 50, 10, 30, 90, 160, 250);
fields[24] = new Field("Basic Mathematics", "red", 240, 20, 50, 10, 30, 90, 160, 250);
fields[25] = new Field("Study Career coaching 3", "black", 200, 50);
fields[25].breakRoom = true;
fields[26] = new Field("Project Battle Bot", "yellow", 260, 22, 50, 10, 30, 90, 160, 250);
fields[27] = new Field("Programming in C#", "yellow", 260, 22, 50, 10, 30, 90, 160, 250);
fields[28] = new Field("Coffee Machine", "white");
fields[28].coffeeMachine = true;
fields[28].owner = "bank";
fields[29] = new Field("Project Innovate", "yellow", 280, 24, 50, 10, 30, 90, 160, 250);
fields[30] = new Field("Give student detention", "white");
fields[30].owner = "sendToJail";
fields[31] = new Field("Data Structures and Algorithms", "green", 300, 26, 50, 10, 30, 90, 160, 250);
fields[32] = new Field("Operating Systems", "green", 300, 26, 50, 10, 30, 90, 160, 250);
fields[33] = new Field("Coffee Machine");
fields[33].coffeeMachine = true;
fields[33].owner = "bank";
fields[34] = new Field("Databases 2", "green", 320, 28, 50, 10, 30, 90, 160, 250);
fields[35] = new Field("Study Career coaching 4", "black", 200, 50);
fields[35].breakRoom = true;
fields[36] = new Field("Coffee Machine", "white");
fields[36].coffeeMachine = true;
fields[36].owner = "bank";
fields[37] = new Field("JavaScript", "darkblue", 350, 35, 50, 10, 30, 90, 160, 250);
fields[38] = new Field("Tuition Fee", "white");
fields[38].owner = "government";
fields[38].tax = true;
fields[39] = new Field("Java Finals", "darkblue", 400, 50, 50, 10, 30, 90, 160, 250);

for (var i = 0; i < fields.length; i++) {
  fields[i].number = i;
}

module.exports = {
  Field: Field,
  fields: fields
}; // trade-players-text
// button-trade-players
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59680" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/Field.js"], null)
//# sourceMappingURL=/Field.0912c7cb.js.map