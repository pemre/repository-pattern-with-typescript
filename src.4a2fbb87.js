parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"xGRV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){this.age=t,this.name=e}return e.prototype.getName=function(){return this.name},e.prototype.getAge=function(){return this.age},e}();exports.Customer=e;
},{}],"SCRD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){return function(t,e){this.name=t,this.city=e}}();exports.Restaurant=t;
},{}],"PH3m":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){this.db=e,this.repoName=t,this.db.addTable(this.repoName)}return e.prototype.add=function(e){return this.db.create(this.repoName,e)},e.prototype.getAll=function(){return this.db.all(this.repoName)},e.prototype.findBy=function(e,t){return this.db.read(this.repoName,e,t,!1)},e}();exports.BaseRepository=e;
},{}],"LmDZ":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function o(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(o.prototype=r.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./base"),r=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.getOldest=function(){return this.getAll().reduce(function(t,e){return e.getAge()>t.getAge()?e:t})},r}(e.BaseRepository);exports.CustomerRepository=r;
},{"./base":"PH3m"}],"rDzc":[function(require,module,exports) {
"use strict";var t=this&&this.__extends||function(){var t=function(r,e){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var e in r)r.hasOwnProperty(e)&&(t[e]=r[e])})(r,e)};return function(r,e){function o(){this.constructor=r}t(r,e),r.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}}();Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./base"),e=function(r){function e(){return null!==r&&r.apply(this,arguments)||this}return t(e,r),e.prototype.getByCity=function(t){return this.findBy("city",t)},e}(r.BaseRepository);exports.RestaurantRepository=e;
},{"./base":"PH3m"}],"NARc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(){this.database={}}return t.prototype.addTable=function(t){this.database[t]=[]},t.prototype.create=function(t,e){return this.database[t].push(e),!0},t.prototype.read=function(t,e,n,o){return void 0===o&&(o=!0),o?this.database[t].find(function(t){return t[e]===n}):this.database[t].filter(function(t){return t[e]===n})},t.update=function(){throw new Error("Method not implemented.")},t.delete=function(){throw new Error("Method not implemented.")},t.prototype.all=function(t){return this.database[t]},t.prototype.count=function(t){return this.database[t].length},t}();exports.DummyQLConnector=t;
},{}],"x1mJ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.log=function(e,o){void 0===o&&(o=""),console.log(e,o),document.querySelector(".logs").insertAdjacentHTML("beforeend","<li>"+e+" "+o+"</li>")};
},{}],"B6dB":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./models/customer"),t=require("./models/restaurant"),r=require("./repositories/customer"),a=require("./repositories/restaurant"),s=require("./lib/dummyql-connector"),u=require("./lib/helpers"),n=function(){return function(){var n=new s.DummyQLConnector,o=new r.CustomerRepository(n,"customer"),i=o.add(new e.Customer("Alice",32));u.log("Customer added with "+(i?"success":"fail")),o.add(new e.Customer("Bob",16)),o.add(new e.Customer("Carol",48)),o.add(new e.Customer("Dave",24));var d=o.getOldest();u.log("The oldest customer is "+d.getName()+": Age "+d.getAge());var l=new a.RestaurantRepository(n,"restaurant"),m=l.add(new t.Restaurant("Ana","Istanbul"));u.log("Restaurant added with "+(m?"success":"fail")),l.add(new t.Restaurant("Bogazici","Istanbul")),l.add(new t.Restaurant("Cumhuriyet","Ankara")),l.add(new t.Restaurant("Deniz","Istanbul"));var c=l.getByCity("Istanbul");u.log("Restaurants in Istanbul:",JSON.stringify(c))}}();new n;
},{"./models/customer":"xGRV","./models/restaurant":"SCRD","./repositories/customer":"LmDZ","./repositories/restaurant":"rDzc","./lib/dummyql-connector":"NARc","./lib/helpers":"x1mJ"}]},{},["B6dB"], null)
//# sourceMappingURL=src.4a2fbb87.js.map