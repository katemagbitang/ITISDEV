

$(document).ready(function () {


    function preloadFunc()
    {
    };
    window.onpaint = preloadFunc();


    




    $('.fulfill-btn').click(function(){

        //gets the req number of that row
        var request_ID = $(this).parent().parent().parent().find('.requestID').text();
        var requester = $(this).parent().parent().parent().find('.requester').html();
        var requestedBookDetails = $(this).parent().parent().parent().find('.requestedBookDetails').html();
        var quantity = $(this).parent().parent().parent().find('.requestedBookQuantity').html();

        var pointer = $(this).parent().parent().parent(); //used to define which request/row is being selected
        
        $('#FulfillRequestNumber').val(request_ID);
        $('#FulfillRequester').html(requester);
        $('#FulfillBookDetails').html(requestedBookDetails);
        $('#FulfillBookQuantity').html(quantity);

        //resets the fields in #validateBook
        $('#FulfillBookID').val('');
        $('#validateTitle').html('');
        $('#validateAuthor').html('');
        $('#validatePrice').html('');
        $('#validateBook').prop('hidden', true);

        //for sending na talaga
        $('#SendFulfillBtn').click(function(){
        
            var bookVersion_ID = $('#FulfillBookID').val();
            var request_ID = $('#FulfillRequestNumber').val();
            var quantity = $('#FulfillBookQuantity').html();
            quantity = parseInt(quantity);
            var requester = $('#FulfillRequester').html().trim(); 

            // alert("bookVersion_ID: " + bookVersion_ID + "//// " + request_ID + "////" + quantity+"//// " + requester);
    
            $.post('/fulfillrequest', {bookVersion_ID: bookVersion_ID, request_ID: request_ID , quantity: quantity, requester: requester}, function(result){

                //CHANGES THE ELEMENTS IN THE ROW 
                pointer.find('.status').html("Fulfilled");
    
    
            })
    
    
    
    
    
        });



    });

    $('#FulfillBookID').keyup(function(){
        var bookVersion_ID = $('#FulfillBookID').val();
        console.log("bookVersion_ID: " + bookVersion_ID);

        // checks and retrieves if a bookVersion exist
        $.post('/postOneBookVersion', {bookVersion_ID:bookVersion_ID }, function(result){
            if(result){
                // if valid yung ID

                $('#SendFulfillBtn').prop('disabled', false);
                $('#FulfillError').html("");
                $('#validateBook').prop('hidden', false);
                $('#validateTitle').html(result.title);
                $('#validateAuthor').html(result.aName);
                $('#validatePrice').html('Php ' +result.sellingPrice);
                $("#validateBookCover").attr("src",result.bookCover);
                
                console.log("result: " + JSON.stringify(result.book));


            }else{
                // if not valid yung ID

                $('#SendFulfillBtn').prop('disabled', true);
                $('#FulfillError').html("Book does not exist!");
                $('#validateBook').prop('hidden', true);
                console.log("result: " + result.title);
            }
        })
    })


   

});