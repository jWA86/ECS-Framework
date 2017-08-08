class XArray {
    constructor() {
        Array.apply(this, arguments);   
        return new Array();
    }
    // we need this, or TS will show an error,
    //XArray["prototype"] = new Array(); will replace with native js arrray function
    pop(): any { return "" };
    push(val): number { return 0; };
    length: number;
}
//Adding Arrray to XArray prototype chain.
XArray["prototype"] = new Array();

//our Class
class YArray extends XArray {
///Some stuff
}

var arr = new YArray();
//we can use the array prop here.
arr.push("one");
arr.push("two");

console.log("First Elemet in array : " + arr[0]);
console.log("</br>Array Lenght : " + arr.length);