// JavaScript Document
<!--
var x = 0
var speed = 120
var text = "佛哥品牌,值得信赖,www.hifoge.com"
var course = 120
var text2 = text

function Scroll() {
window.status = text2.substring(0, text2.length)

if (course < text2.length) {
setTimeout("Scroll2()", speed)
}

else {
text2 = " " + text2

setTimeout("Scroll()", speed);
}
}

function Scroll2() {
window.status = text2.substring(x, text2.length)

if (text2.length - x == text.length) { 
text2 = text
x = 0

setTimeout("Scroll()", speed);
}

else {
x++
setTimeout("Scroll2()", speed);
}
}

Scroll()
//-->