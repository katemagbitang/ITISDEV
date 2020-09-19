

$(document).ready(function () {


    function preloadFunc()
    {
    };
    window.onpaint = preloadFunc();


    

    // $('#orderslist').on('click', '.sendPaymentToggleBtn', function () {
    //     alert("click");
    // })

    $('.fulfill-btn').click(function(){

        //gets the req number of that row
        var request_ID = $(this).parent().parent().parent().find('.requestID').text();
        var requester = $(this).parent().parent().parent().find('.requester').html();
        var requestedBookDetails = $(this).parent().parent().parent().find('.requestedBookDetails').html();

        
        $('#FulfillRequestNumber').val(request_ID);
        $('#FulfillRequester').html(requester);
        $('#FulfillBookDetails').html(requestedBookDetails);
    });

    $('#SendFulfillBtn').click(function(){
        
        var bookVersion_ID = $('#FulfillBookID').val();
        alert("bookVersion_ID: " + bookVersion_ID);

        



    });

   

});