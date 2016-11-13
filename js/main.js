(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Avator = function () {
  _createClass(Avator, null, [{
    key: '_loop',
    value: function _loop() {
      Avator.isLooping = true;
      Avator.__raf();
      window.requestAnimationFrame(Avator._loop);
    }
  }, {
    key: '__raf',
    value: function __raf() {
      var func = function (funcs) {
        Avator.current = Date.now();
        if (Avator.prev && Avator.current - Avator.prev < 15) {
          return;
        }
        Avator.prev = Avator.current;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = funcs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var f = _step.value;

            f();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }.bind(null, Avator._functions);
      Avator._functions = [];
      window.requestAnimationFrame(func);
    }
  }, {
    key: '_raf',
    value: function _raf(f) {
      Avator._functions.push(f);
    }
  }]);

  function Avator(_ref) {
    var x = _ref.x,
        y = _ref.y,
        init = _ref.init,
        render = _ref.render;

    _classCallCheck(this, Avator);

    this.x = x != null ? x : 0;
    this.y = y != null ? y : 0;
    this._init = init != null ? init : function () {
      return document.createElement('div');
    };
    this._render = render != null ? render : function () {};
    this._elem = this._init();
    this._positionHistory = [];
    this._positionHistory.push({ x: this.x, y: this.y });
    if (Avator._functions == null) {
      Avator._functions = [];
    }
    if (!Avator.isLooping) {
      // TODO: stop looping when no Avator exists
      Avator._loop();
    }
  }

  _createClass(Avator, [{
    key: 'bind',
    value: function bind(container) {
      container.appendChild(this._elem);
      setTimeout(this.render.bind(this), 0);
      // Avator._raf(this.render.bind(this))
    }
  }, {
    key: 'render',
    value: function render() {
      this._render(this._elem);
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      var parent = this._elem.parentElement;
      if (parent) parent.removeChild(this._elem);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      // TODO: dispose
    }
  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      if (this._positionHistory.length >= 10) {
        this._positionHistory.shift();
      }
      this._positionHistory.push({ x: this.x, y: this.y });
      this.x = x;
      this.y = y;
      Avator._raf(this.render.bind(this));
    }
  }, {
    key: 'moveBy',
    value: function moveBy(dx, dy) {
      this.moveTo(this.x + dx, this.y + dy);
    }
  }, {
    key: 'positionHistory',
    get: function get() {
      return this._positionHistory;
    }
  }]);

  return Avator;
}();

exports.default = Avator;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Avator2 = require('./Avator');

var _Avator3 = _interopRequireDefault(_Avator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// XXX: 'BirdAvator' isn't an Avator anymore so better to use composition
var BirdAvator = function (_Avator) {
  _inherits(BirdAvator, _Avator);

  _createClass(BirdAvator, null, [{
    key: 'randomBetween',
    value: function randomBetween(from, to) {
      return from + Math.floor(Math.random() * (to - from));
    }
  }, {
    key: 'init',
    value: function init() {
      var elem = document.createElement('div');
      elem.classList.add('bird', 'avator');
      elem.style.position = 'absolute';
      var img = document.createElement('img');
      img.setAttribute('width', '20px');
      img.setAttribute('height', '20px');
      img.setAttribute('src', 'img/tori.png');
      elem.appendChild(img);
      return elem;
    }
  }, {
    key: 'render',
    value: function render(elem) {
      var posHist = this.positionHistory;
      var range = 0;
      var sumX = 0;
      var sumY = 0;
      for (var i = 0, len = posHist.length; i < len; i++) {
        var pos = posHist[i];
        range += 1 / (i + 1);
        sumX += pos.x / (i + 1);
        sumY += pos.y / (i + 1);
      }
      var aveX = sumX / range;
      // let a bird jump
      var angle = Math.PI * ++this._count / this._tick * 1.0;
      var offsetY = Math.abs(10 * Math.sin(angle));
      var aveY = sumY / range - offsetY;
      if (this._count % this._tick === 0) this._count = 0;

      var transform = 'translate(' + aveX + 'px, ' + aveY + 'px)';
      if (aveX < this.x) {
        transform += ' scaleX(-1)';
      }
      elem.style.setProperty('transform', transform);
      elem.style.zIndex = this.y + 25;
    }
  }]);

  function BirdAvator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 },
        x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, BirdAvator);

    x = x != null ? x : 0;
    y = y != null ? y : 0;

    var _this = _possibleConstructorReturn(this, (BirdAvator.__proto__ || Object.getPrototypeOf(BirdAvator)).call(this, { x: x, y: y, init: BirdAvator.init, render: BirdAvator.render }));

    _this._tick = 30;
    _this._count = BirdAvator.randomBetween(0, _this._tick);
    return _this;
  }

  return BirdAvator;
}(_Avator3.default);

exports.default = BirdAvator;

},{"./Avator":1}],3:[function(require,module,exports){
'use strict';

var _BirdAvator = require('./BirdAvator');

var _BirdAvator2 = _interopRequireDefault(_BirdAvator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var container = document.getElementsByTagName('body')[0];
var avators = [];
var posHist = [];
container.addEventListener('click', function (context) {
  var avator = new _BirdAvator2.default({ x: context.pageX, y: context.pageY });
  avator.bind(container);
  avators.splice(0, 0, avator);
});
container.addEventListener('mousemove', function (context) {
  posHist.push({ x: context.pageX, y: context.pageY });
  posHist = posHist.slice(-10 * avators.length);
  for (var i = 0, len = avators.length; i < len; i++) {
    var idx = Math.max(0, posHist.length - i * 10 - 1);
    var pos = posHist[idx];
    avators[i].moveTo(pos.x, pos.y);
  }
});

// logo z-index
var _arr = ['logo', 'description'];
for (var _i = 0; _i < _arr.length; _i++) {
  var className = _arr[_i];
  var elem = document.getElementsByClassName(className)[0];
  console.log(elem.getBoundingClientRect().bottom);
  elem.style.zIndex = Math.round(Number(elem.getBoundingClientRect().bottom));
}

},{"./BirdAvator":2}]},{},[3])
//# sourceMappingURL=main.js.map
