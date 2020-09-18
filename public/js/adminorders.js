

$(document).ready(function () {


    function preloadFunc()
    {
    };
    window.onpaint = preloadFunc();


    

    // $('#orderslist').on('click', '.sendPaymentToggleBtn', function () {
    //     alert("click");
    // })

    $('.confirmBtn').click(function(){

        //gets the OR number of that row
        var order_ID = $(this).parent().parent().parent().find('.OR').text();
        var order_details = $(this).parent().parent().parent().find('.shippingdetails').html();

        $(this).parent().parent().parent().remove(); //removes the order object
       

        $.post('/confirmpayment', {order_ID: order_ID}, function(result){

            $("#confirmOrderModalTitle").text("Order successfully confirmed!");
            $("#confirmOrderModalBody").html("<strong>Order Number: </strong>" + order_ID  + "<br>" + order_details);
            
        })



    });

   

});