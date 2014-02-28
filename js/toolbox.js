/**
 * Created by yyang on 14-2-20.
 */
/**
 * Created by yyang on 14-2-20.
 */




var Toolbox = (function(){
    var Return = {
        Property: "Test Static Property",    //公有属性
        Method: function(){    //公有方法
            alert(_Field);    //调用私用字段
            privateMethod();    //调用私用方法
        },



        message: function(str1){
            alert("MESSAGE: "+str1);
        },
        success: function(str1){
            alert("SUCCESS: "+str1);
        },
        fail: function(str1){
            alert("FAIL: "+str1);
        },
        err: function(str1){
            alert("ERROR: "+str1);
        },

        logMessage:function(str1){
            window.console.warn(str1);
            window.console.log(str1);
        }




    };    //定义返回的公有对象

    var _Field = "Test Static Field";    //私有字段
    var privateMethod = function(){    //私有方法
        alert(Return.Property);    //调用属性
    }

    return Return;    //生成公有静态元素
})();













/*
 静态类模板

 var Core = {};
 Core.StaticClass = (function(){
 var Return = {
 Property: "Test Static Property",    //公有属性
 Method: function(){    //公有方法
 alert(_Field);    //调用私用字段
 privateMethod();    //调用私用方法
 },
 message: function(){
 alert("hahahahahahahaha");
 }

 };    //定义返回的公有对象

 var _Field = "Test Static Field";    //私有字段
 var privateMethod = function(){    //私有方法
 alert(Return.Property);    //调用属性
 }

 return Return;    //生成公有静态元素
 })();*/
