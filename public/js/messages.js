$(document).ready(function (req, res) {


   
    function preloadFunc()
    {
        var messagesList_Len = $(".inbox_chat").find(".username_list").length;
        var messageRightName = $(".messageRightName").text();

        console.log("messagesList_Len: " + messagesList_Len);


        console.log("messageRightName: " + JSON.stringify(messageRightName));


        //auto scroll at the bottom of messages
        var chatHistory = document.getElementById("msg_history");
        chatHistory.scrollTop = chatHistory.scrollHeight;


        if ($(".receiver").val() == "" ){
            //disables send button
            disableSend();
            $(".write_msg").prop('disabled', true);
        }else if($(".write_msg").val() == ""){
            $(".write_msg").prop('disabled', false);
            disableSend();
            // enableSend();
        }
    };
    window.onpaint = preloadFunc();

    
   

    //disables send button
    function disableSend(){
        $("#msg_send_btn").prop('disabled', true);

    }
    //enables send button
    function enableSend(){
        $("#msg_send_btn").prop('disabled', false);
    }

    $(".write_msg").keyup(function(){
        if($(".write_msg").val() != "" )
            enableSend();
        else if($(".write_msg").val() == "" ){
             disableSend();
        }
           
    });


   // when choosing a convo from left panel
    $(".chat_list").on('click', function(event){
        var username = $(this).find(".username_list").val();
        window.location.replace("/messages/"+username);
    });


    // ajax ui for compose new message modal
    
    $("#composeNewMessageText").keyup(function(){
        if($("#composeNewMessageText").val() == ""){
            $("#composeNewMessageText").css({'border': "4px solid #DB4E35 ","border-radius":"4px"});
        }else{
            $("#composeNewMessageText").css({'border': "4px solid transparent "});
        }

        if( $("#composeNewMessageRecipient").val() == ""   ){
            $("#composeNewMessageRecipient").css({'border': "4px solid #DB4E35 ","border-radius":"4px"});
        }else{
            $("#composeNewMessageRecipient").css({'border': "4px solid transparent "});

        }

        // for the button
        if( $("#composeNewMessageText").val() != "" && $("#composeNewMessageRecipient").val() != ""){
            $("#newMessageSubmit").prop("disabled", false);
        }
        
    })

    $("#composeNewMessageRecipient").keyup(function(){

        var username = $('#composeNewMessageRecipient').val();
        console.log(username);

        $.get('/getusername', {username: username}, function(data){
            console.log("DATE: " + data.username);
            if(data.username == undefined){
                $("#newMessageSubmit").prop("disabled", true);
                $("#recipientError").html("User does not exist!");
                $("#composeNewMessageRecipient").css({'border': "4px solid #DB4E35 ","border-radius":"4px"});
            }else{
                $("#recipientError").html("");

            }
        })


        if($("#composeNewMessageText").val() == ""){
            $("#composeNewMessageText").css({'border': "4px solid #DB4E35 ","border-radius":"4px"});
        }else{
            $("#composeNewMessageText").css({'border': "4px solid transparent "});
        }

        if( $("#composeNewMessageRecipient").val() == ""   ){
            $("#composeNewMessageRecipient").css({'border': "4px solid #DB4E35 ","border-radius":"4px"});
        }else{
            $("#composeNewMessageRecipient").css({'border': "4px solid transparent "});

        }

        

        
        // for the button
       if( $("#composeNewMessageText").val() != "" && $("#composeNewMessageRecipient").val() != ""){
           $("#newMessageSubmit").prop("disabled", false);
       }




    })

    




       
    






})