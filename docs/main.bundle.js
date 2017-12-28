webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".flip {\r\n  -webkit-perspective: 800;\r\n   width: 400px;\r\n   height: 200px;\r\n    position: relative;\r\n    margin: 50px auto;\r\n}\r\n.flip .card.flipped {\r\n  -webkit-transform: rotatex(-180deg);\r\n}\r\n.flip .card {\r\n  width: 100%;\r\n  height: 100%;\r\n  -webkit-transform-style: preserve-3d;\r\n  -webkit-transition: 0.5s;\r\n}\r\n.flip .card .face {\r\n  width: 100%;\r\n  height: 100%;\r\n  position: absolute;\r\n  -webkit-backface-visibility: hidden ;\r\n  z-index: 2;\r\n    font-family: Georgia;\r\n    font-size: 3em;\r\n    text-align: center;\r\n    line-height: 200px;\r\n}\r\n.flip .card .front {\r\n  position: absolute;\r\n  z-index: 1;\r\n    background: black;\r\n    color: white;\r\n    cursor: pointer;\r\n}\r\n.flip .card .back {\r\n  -webkit-transform: rotatex(-180deg);\r\n    background: blue;\r\n    background: white;\r\n    color: black;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    THE MEMORY GAME\n  </h1>\n  <h4>\n    Click on cards to reveal their value, and then find its match...\n  </h4>\n</div>\n<mat-grid-list cols=\"6\" rowHeight=\"5:7\">\n  <mat-grid-tile class=\"card\"\n      *ngFor=\"let tile of tiles\"\n      [colspan]=\"tile.cols\"\n      [rowspan]=\"tile.rows\">\n\n    <div class=\"flip\">\n      <div class=\"card\" [ngClass]=\"{'flipped':tile.isFlipped}\" (click)=\"select(tile)\">\n          <div class=\"face front\">\n            ?\n          </div>\n          <div class=\"face back\">\n            {{tile.text}}\n          </div>\n      </div>\n    </div>\n\n  </mat-grid-tile>\n</mat-grid-list>\n\n<!-- <pre>\nTiles: {{tiles | json}}\nNo cards {{fsm.is('noCards') | json}}\nOne card {{fsm.is('oneCard') | json}}\nTwo cards {{fsm.is('twoCards') | json}}\n</pre> -->\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_javascript_state_machine__ = __webpack_require__("../../../../javascript-state-machine/lib/state-machine.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_javascript_state_machine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_javascript_state_machine__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppComponent = (function () {
    function AppComponent() {
        this.tiles = tiles;
        this.fsm = fsm;
        this.select = select;
        this.pick = pick;
        this.guess = guess;
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());

// temporary values for cards under comparison
var pick = { text: '', isFlipped: false };
var guess = { text: '', isFlipped: false };
// the state machine that controls the gameplay logic
var fsm = new __WEBPACK_IMPORTED_MODULE_2_javascript_state_machine__({
    init: 'noCards',
    transitions: [
        { name: 'pick', from: 'noCards', to: 'oneCard' },
        { name: 'guess', from: 'oneCard', to: 'twoCards' },
        { name: 'resolve', from: 'twoCards', to: 'noCards' }
    ],
    methods: {
        onPick: function () { console.log('You picked', pick.text); },
        onGuess: function () { match(); },
        onResolve: function () { resolve(); }
    }
});
// game and card state transition logic
var select = function (tile) {
    if (fsm.is('noCards') && !tile.isFlipped) {
        pick = tile;
        fsm.pick();
        tile.isFlipped = !tile.isFlipped;
    }
    else if (fsm.is('oneCard') && tile != pick) {
        guess = tile;
        fsm.guess();
        tile.isFlipped = !tile.isFlipped;
    }
};
// private functions to be called by state controller
var match = function () {
    console.log('You guessed, and compared the cards');
    setTimeout(function () {
        if (pick.text != guess.text) {
            pick.isFlipped = false;
            guess.isFlipped = false;
        }
        fsm.resolve();
    }, 1000);
};
var resolve = function () {
    console.log('You resolved', pick.text == guess.text);
    if (__WEBPACK_IMPORTED_MODULE_1_lodash__["every"](tiles, 'isFlipped')) {
        alert("YOU WIN!");
    }
};
// generate cards for the picking and matching
var tiles = [];
__WEBPACK_IMPORTED_MODULE_1_lodash__["times"](12, function (text) {
    // push matching cards
    tiles.push({ text: text, cols: 1, rows: 1, isFlipped: false });
    tiles.push({ text: text, cols: 1, rows: 1, isFlipped: false });
});
// randomize the pile
tiles = __WEBPACK_IMPORTED_MODULE_1_lodash__["shuffle"](tiles);


/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map