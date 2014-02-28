/**
 * Created by yyang on 14-2-20.
 */





var ApigeeTool = (function(){
    var Return = {
        Property: "Test Static Property",    //公有属性
        Method: function(){    //公有方法
            alert(_Field);    //调用私用字段
            privateMethod();    //调用私用方法
        },


        m:function(str1){
            alert("m: "+str1);
        },

        //Connect entityA and entityB by connector
        connectionEntity:function(client,entityA,entityB,connector){
            var options = {
                method:'POST',
                //endpoint:'dogs/Tom/like/cats/Kitty'
                endpoint:entityA+"/"+connector+"/"+entityB
            };
            client.request(options, function (err, data) {
                    if (err) {
                        Toolbox.err("Cant Connect "+entityA+" and "+entityB+" by "+connector);
                    } else {
                        Toolbox.success("Connect "+entityA+" and "+entityB+" by "+connector);
                    }
            });
        },



        //Delete entityA and entityB by connector
        disconnectEntity:function(client,entityA,entityB,connector){
            var options = {
                method:'DELETE',
                //endpoint:'dogs/Tom/following/cats/Kitty'
                endpoint:entityA+"/"+connector+"/"+entityB
            };
            client.request(options, function (err, data) {
                if (err) {
                    alert("Cant Disconnect "+entityA+" and "+entityB+" by "+connector);
                } else {
                    alert("Disconnect "+entityA+" and "+entityB+" by "+connector);
                }
            });
        },

        getCollection:function(client,type){
            var options = {
                type:type, //"books" Required - the type of collection to be retrieved
                client:client //Required
            };

            return Apigee.Collection(options);
        },



        //将Collection准备好，随时准备操作

        letCollectionReady:function(client, type, callback1, callback2){


            var collection = new Apigee.Collection({
                "client": client,
                "type": type
            });
            collection.fetch(function(err, data) {
                if (err) {
                    Toolbox.fail("Cant fetch "+"collection"+", Type: "+type);
                } else {
                    Toolbox.success("fetch "+"collection"+", Type: "+type);

                    //callback1
                    if(callback1){callback1(collection);}

                    //callback2
                    if(callback2){callback2(collection);}

                }
            });

            return collection //返回值

        },


        //将Query后的Collection准备好，随时准备操作
        letQueryCollectionReady:function(client, type, query, callback1, callback2){


            var collection = new Apigee.Collection({
                "client": client,
                "type": type,
                qs:{ql: query}
            });
            var test = collection.fetch(function(err, data) {
                if (err) {
                    Toolbox.fail("Cant fetch "+"collection"+", Type: "+type);
                } else {
                    Toolbox.success("fetch "+"collection"+", Type: "+type);

                    //callback1
                    if(callback1){callback1(collection);}

                    //callback2
                    if(callback2){callback2(collection);}



                }

            });





            return collection //返回值
        }



//        //fetch a collection
//        fetchCollection:function(client, type){
//            var collection = new Apigee.Collection({
//                "client": client,
//                "type": type
//            });
//            return collection
//        },
//
//        //fetch a specific collection by query
//        fetchQueryCollection:function(client,type){
//            var collection = new Apigee.Collection({
//                "client": client,
//                "type": type,
//                qs:{ql:"'resv_user_name'='yya51'"}
//            });
//            return collection
//        }























    };    //定义返回的公有对象

    var _Field = "Test Static Field";    //私有字段
    var privateMethod = function(){    //私有方法
        alert(Return.Property);    //调用属性
    }

    return Return;    //生成公有静态元素
})();