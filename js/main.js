// JavaScript Document



$(document).ready(function() {

	/*******************************************************************
	 * create client and set up vars
	 ********************************************************************/
	//Apigee account credentials, available in the App Services admin portal
	var client_creds = {
		orgName: 'paullaoshu',
		appName: 'sandbox',
		logging: true, //optional - turn on logging, off by default
		buildCurl: true //optional - turn on curl commands, off by default
	};

	//Initializes the SDK. Also instantiates Apigee.MonitoringClient
	var client = new Apigee.Client(client_creds);

	var appUser;
	var fullFeedView = true;
	var fullActivityFeed;
	var userFeed;

    var appRoom;



	//Create a collection object of room
	var rooms = new Apigee.Collection({
		"client": client,
		"type": "rooms"
	});
	//Create a collection object to hold the response
	//var roomsCopy = new Apigee.Collection(rooms);



	/*******************************************************************
	 * bind the various click events
	 ********************************************************************/
	//bind
	$('#btn-test').bind('click', test);
	$('#btn-login').bind('click', login);
    $("#btn-checkin").bind("click",checkin);
    $('#btn-test2').bind('click', test2);



	/*******************************************************************
	 * default actions for page load
	 ********************************************************************/
	//if the app was somehow loaded on another page, default to the login page

	//window.location = "#page-login";

	//清除user
	client.logout();

	//检查是否有user

	client.getLoggedInUser(function(err, data, user) {
		if (err) {
			//error - could not get logged in user
			//alert("No user logged in");
            //Core.StaticClass.message();
            //console.log("No user login");
            //Toolbox.message("No user login");
		} else {
			if (client.isLoggedIn()) {
				appUser = user;
				showFullFeed();
			}
		}
	});


	/*******************************************************************
	 * main program functions
	 ********************************************************************/

	/**
	 *  function to log in the app user.  The API returns a token,
	 *  which is stored in the client and used for all future
	 *  calls.  We pass a username, password, and a callback function
	 *  which is called when the api call returns (asynchronously).
	 *
	 *  Once the call is sucessful, we transition the user to the page
	 *  that displays the list of messages.
	 *
	 *  @method login
	 *  @return none
	 */







    //login
	function test() {

		rooms.fetch(

			//success callback
			function(err, data) {
				if (err) {
					alert("read failed");
				} else {
					alert("starting read");
					var inputLoginKey = $("#login-key").val();
					var room = null;
					while (rooms.hasNextEntity()) {
						var r = rooms.getNextEntity();
						alert(
							"Got an Entity:\n" +
							r.get("room_number") + "\n" +
							r.get("user_lastname") + "\n" +
							r.get("user_password") + "\n" +
							""
						);
						if (r.get("user_password") == inputLoginKey.toString()) {
							alert("Found a Room");
							//将符合key的房间存入localstorage
							localStorage.clear();
							localStorage.room_number = r.get("room_number");
							room = new Apigee.Entity(r);
							break
						}

					}

					if (room == null) {
						alert("No room Fund");
					} else {
						alert("We now Login into room " + localStorage.room_number);
					}
				}
			}
		);

	}



	function login() {

		//清除user
		client.logout();

		//$('#login-section-error').html('');
		var username = $("#login-username").val();
		var password = $("#login-password").val();
		alert(
			"get login username and password from html" + "\n" +
			username.toString() + "\n" +
			password.toString() + "\n"
		);

		client.login(username, password,
			function(err) {
				if (err) {
					//$('#login-section-error').html('There was an error logging you in.');
					alert("Trying to login, But error occured, code 1");
				} else {
					//login succeeded


					//the login call will return an OAuth token, which is saved
					//in the client. Any calls made now will use the token.
					//once a user has logged in, their user object is stored
					//in the client and you can access it this way:

                    //var token = client.token;

					client.getLoggedInUser(function(err, data, user) {
						if (err) {
							//error - could not get logged in user
							alert("Trying to login, But error occured, code 2");
						} else {
							if (client.isLoggedIn()) {
								appUser = user;

								//得到用户的用户名
								var username = user.get("username");
								alert(
									"Login succeeded, " + "\n" +
									"appUser = user" + "\n" +
									"client username: " + username + "\n"
								);



								// showFullFeed();
							}
						}
					});

					//clear out the login form so it is empty if the user chooses to log out
					//$("#login-username").val('');
					//$("#login-password").val('');

					//default to the full feed view (all messages in the system)
					//showMyFeed();
				}
			}
		);
	}




    var r = new Array();
    //checkin
    function checkin(){
        if (client.isLoggedIn()) {

            var name = appUser.get("name");//Yang Yang
            var username = appUser.get("username");// yya51

            //从resvlist 找到客户预订了几个房间
            var resvlistofuser = ApigeeTool.letQueryCollectionReady(client, "resvlists",
                "resv_user_name="+"'"+username+"'",
                function (collection) {



                    while (collection.hasNextEntity()) {

                        var a = collection.getNextEntity().get("resv_room_no");
                        r.push(a);

                    }
                    alert(r);
                    drawRoomLabel(name, r);








                }
            );



        }else{
            Toolbox.message("No Client login, Please login first");
        }

    }





////////////////////////////

//    var r = new Array();
//    function yy(collection){
//        alert(r);
//    }
//    Toolbox.logMessage("hihi");
//    var resv_rooms = ApigeeTool.letQueryCollectionReady(client,"resvlists",
//        "resv_user_name='yya51'",
//        function (collection){
//            while(collection.hasNextEntity()){
//                //var a = collection.getNextEntity().get("resv_room_no");
//                var a = collection.getNextEntity().get("resv_room_no");
//                r.push(a);
//            }
//        },
//        yy
//    );

////////////////////////
//    var collection = new Apigee.Collection({
//        "client": client,
//        "type": "resvlists",
//        qs:{ql: "resv_user_name='yya51'"}
//    });
//    collection.fetch(function(err, data) {
//        if (err) {
//            Toolbox.fail("Cant fetch "+"collection"+", Type: "+"resvlists");
//        } else {
//            Toolbox.success("fetch "+"collection"+", Type: "+"resvlists");
//            //console.log(JSON.stringify(collection,null));
//
//
//
//
//        }
//    });

/////////////////////////

//    $.getJSON("https://api.usergrid.com/paullaoshu/sandbox/users",function(data){
//        var vv=data;
//        //console.log(vv);
//    });


    function test2(){
        console.log(JSON.stringify(collection,null,2));

    }























    //查找客人是否有预定过房间
    function checkRoomReservation(username, roomnumber){
        //取回resvlists数据collection并操作
        ApigeeTool.letCollectionReady(client,"resvlists",function(collection){

            var resv_user_name;
            var resv_room_no;

            while (collection.hasNextEntity()) {

                var entity = collection.getNextEntity();
                resv_user_name=entity.get("resv_user_name");
                resv_room_no=entity.get("resv_room_no");

                if(resv_user_name==username && resv_room_no==roomnumber)
                {
                    Toolbox.success("Found 1 reserved room from resv list")

                }


            }

        });
    }

    //draw room label
    function drawRoomLabel(username, roomnumber){
        $("#room-number").empty().html(roomnumber);
        $("#user-name").empty().html(username);



    }
















    //删除一个Collection
    function deletCollection(){
        var options = {
            endpoint:'tests/?ql=',
            method:'DELETE'

        };

        client.request(options,function (error, result) {

            if (error) {
                alert("Error: Delete Collection ");
            } else {
                alert("Succeeded: Delete Collection ");
            }

        });
    }
    //deletCollection();









































	//点击删除id=display
	$("#display")
        .click(function() {$(this).hide();})
        .css("background-color", "gray");
	//id=display部分字体颜色
	//$("#display").css("background-color", "gray");

	//改变灯泡显示方式
	$("#myimage").click(function() {
		if ($("#myimage").attr("src").match("bulbon")) {
			$("#myimage").attr("src", "i/eg_bulboff.gif");
		} else {
			$("#myimage").attr("src", "i/eg_bulbon.gif");
		}
	});



});