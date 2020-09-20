$(document).ready(function(){
    //disables submit button
    function disableSubmit(){
        $('#submit').prop('disabled', true);
    }

    // enables submit button
    function enableSubmit(){
        $('#submit').prop('disabled', false);
    }

    function areAllFilled(){

        var valid ;
        
        if($("#title").val() != '' && $("#authors").val() != '' && $("#description").val() != '' && $("#price").val() != '' && $("#quantity").val() != '' ){
        // if($("#username").val() != '' && $("#email").val() != ''){
            valid = true;
        }else{
            valid = false;
        }
        return valid;
    }
    function isFilled(field){
        // var valid = false;

        if (field.val() ==""){
            if(field.is($('#title'))){
                $('#title').css({'border': "1px solid #DB4E35 "});
                $('#titleError').text('Title is required.');
            }
            if(field.is($('#authors'))){
                $('#authors').css({'border': "1px solid #DB4E35 "});
                $('#authorsError').text('Authors are required.');
            }
            if(field.is($('#description'))){
                $('#description').css({'border': "1px solid #DB4E35 "});
                $('#desError').text('Description is required.');
            }
            if(field.is($('#price'))){
                $('#price').css({'border': "1px solid #DB4E35 "});
                $('#priceError').text('Price is required.');
            }
            if(field.is($('#quantity'))){
                $('#quantity').css({'border': "1px solid #DB4E35 "});
                $('#qtyError').text('Price is required.');
            }
            disableSubmit();            
            // valid = false;
            
        }
        else{
            if (field.is($('#title'))){
                $('#title').css({'border': "1px solid #4E6172 "});
                $('#titleError').text('');
            }
            if (field.is($('#authors'))){
                $('#authors').css({'border': "1px solid #4E6172 "});
                $('#authorsError').text('');
            }
            if (field.is($('#description'))){
                $('#description').css({'border': "1px solid #4E6172 "});
                $('#desError').text('');
            }
            if (field.is($('#price'))){
                $('#price').css({'border': "1px solid #4E6172 "});
                $('#priceError').text('');
            }
            if (field.is($('#quantity'))){
                $('#quantity').css({'border': "1px solid #4E6172 "});
                $('#qtyError').text('');
            }

            if (areAllFilled() == true)
                enableSubmit();
            // valid = true;
        }

        // return valid;
    }

    $('#title').keyup(function(){
        isFilled($('#title'));
    });

    $('#authors').keyup(function(){
        isFilled($('#authors'));
    });

    $('#description').keyup(function(){
        isFilled($('#description'));
    });

    $('#price').keyup(function(){
        isFilled($('#price'));
    });

    $('#quantity').keyup(function(){
        isFilled($('#quantity'));
    });

});