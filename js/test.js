// JavaScript Documentvar 


$(document).ready(function() {

////改变灯泡的颜色
//function changeImages()
//{
//element=document.getElementById('myimage')
//if (element.src.match("bulbon"))
//  {
//  element.src="i/eg_bulboff.gif";
//  }
//else
//  {
//  element.src="i/eg_bulbon.gif";
//  }
//
//}

//JSON的例子
var employees = [
{ "firstName":"Bill" , "lastName":"Gates" },
{ "firstName":"George" , "lastName":"Bush" },
{ "firstName":"Thomas" , "lastName": "Carter" }
];
employees[1].firstName="Jobs";
document.getElementById("room-number").innerHTML=employees[2].firstName;

});