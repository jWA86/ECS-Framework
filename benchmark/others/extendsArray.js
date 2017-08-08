var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var XArray = (function () {
    function XArray() {
        Array.apply(this, arguments);
        return new Array();
    }
    // we need this, or TS will show an error,
    //XArray["prototype"] = new Array(); will replace with native js arrray function
    XArray.prototype.pop = function () { return ""; };
    ;
    XArray.prototype.push = function (val) { return 0; };
    ;
    return XArray;
}());
//Adding Arrray to XArray prototype chain.
XArray["prototype"] = new Array();
//our Class
var YArray = (function (_super) {
    __extends(YArray, _super);
    function YArray() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return YArray;
}(XArray));
var arr = new YArray();
//we can use the array prop here.
arr.push("one");
arr.push("two");
console.log("First Elemet in array : " + arr[0]);
console.log("</br>Array Lenght : " + arr.length);
