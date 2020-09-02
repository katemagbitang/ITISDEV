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


   
    $(".chat_list").on('click', function(event){
        var username = $(this).find(".username_list").val();
        window.location.replace("/messages/"+username);
    });


//     $(".msg_send_btn").on('click', function(event){
       

//         var receiver= $(".receiver").val();
// // ;
// //         var message = {
// //          messagesHistory_id :  $(".messagesHistory_id").val() ,
// //          receiver: $(".receiverUsername").val() ,
// //          messageText : $(".write_msg").val() ,
// //          date : Date.now()
// //         };

//         // console.log(message);
//         $.post("/messages/"+receiver, {
//             messagesHistory_id :  $(".messagesHistory_id").val() ,
//             receiver: receiver ,
//             messageText : $(".write_msg").val() ,
//             date : Date.now()
        
//         }, function(data, status){
//             if(status == "success"){
//                 alert("SUCC");
//                 $(".messageRightName").appendChild("ASDGASFg");


//             }else{
//                 alert("FAIL");

//             }
//         })






//     })


       
    






})