

$(document).ready(function () {


    function preloadFunc()
    {
    };
    window.onpaint = preloadFunc();


    


    $('.confirmBtn').click(function(){

        //gets the OR number of that row
        var order_ID = $(this).parent().parent().parent().find('.OR').text();
        var order_details = $(this).parent().parent().parent().find('.shippingdetails').html();

        $(this).parent().parent().parent().remove(); //removes the order object
       

        $.post('/confirmpayment', {order_ID: order_ID}, function(result){

            $("#confirmOrderModalTitle").text("Order payment has been confirmed!");
            $("#confirmOrderModalBody").html("<strong>Order Number: </strong>" + order_ID  + "<br>" + order_details);
            
        })
    });

    $('.rejectBtn').click(function(){

        //gets the OR number of that row
        var order_ID = $(this).parent().parent().parent().find('.OR').text();
        var order_details = $(this).parent().parent().parent().find('.shippingdetails').html();

        $(this).parent().parent().parent().remove(); //removes the order object
       

        $.post('/rejectpayment', {order_ID: order_ID}, function(result){
            
            $("#confirmOrderModalTitle").text("Order payment has been rejected!" );
            $("#confirmOrderModalBody").html("<strong>Order Number: </strong>" + order_ID  + "<br>" + order_details);
            
        })
    });

   

});