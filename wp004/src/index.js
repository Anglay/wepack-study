let a = require("./a")
console.log(a)
require("./index.less")
require("./index.css")

let fn = ()=>{
    console.log("=>function")
}

fn();

@log
class A{
    a = 1;
}

let _a = new A();
console.log(_a.a)

function log(target){
    console.log(target)
}