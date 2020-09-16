

$(document).ready(function () {


    function preloadFunc()
    {
    };
    window.onpaint = preloadFunc();


    

    // $('#orderslist').on('click', '.sendPaymentToggleBtn', function () {
    //     alert("click");
    // })

    $('.sendPaymentToggleBtn').click(function(){

        //gets the OR number of that row
        var x = $(this).parent().parent().find('.OR').text();
        console.log("x: " + x);

        // sets the value of OR number and clears all the other fields
        $('#SendPaymentOrderNumber').val(x);
        $('#SendPaymentBankName').val('');
        $('#SendPaymentRefNum').val('');
        $('#myImage').val('');
    });

   

});