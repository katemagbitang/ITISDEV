$(document).ready(function (req, res) {


   
    function preloadFunc()
    {
        var messagesList_Len = $(".inbox_chat").find(".username_list").length;
        var messageRightName = $(".messageRightName").text();



        // var messagesList = $("#inbox_chat").find(".username_list").each();

        // console.log("messagesList: " + JSON.stringify(messagesList));
        


        console.log("messagesList_Len: " + messagesList_Len);


        console.log("messageRightName: " + JSON.stringify(messageRightName));



        // makes the messages scroll at the bottom on load
        var chatHistory = document.getElementById("msg_history");
        chatHistory.scrollTop = chatHistory.scrollHeight;



    };
    window.onpaint = preloadFunc();



    
   
    $(".chat_list").on('click', function(event){
        var username = $(this).find(".username_list").val();
        window.location.replace("/messages/"+username);
    });



       
    






})