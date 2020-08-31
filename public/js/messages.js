$(document).ready(function (req, res) {


   
 


    
   
    $(".chat_list").on('click', function(event){

        var username = $(this).find(".username_list").val();

        // alert(username);


        window.location.replace("/messages/"+username);



       


    });



       
    






})