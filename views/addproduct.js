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
    
        if($("#Book_Title").val() != '' && $("#myImage").val() != '' && $("#author").val() != '' && $("#category").val() != '' && $("#bookSynopsis").val() != '' && $("#year").val() != ''&& $("#publisher").val() != ''&& $("#edition").val() != ''&& $("#quality").val() != ''&& $("#quantity").val() != ''&& $("#sellingPrice").val() != ''&& $("#priceBought").val() != ''&& $("#type").val() != ''){
            valid = true;
        }else{
            valid = false;
        }
        return valid;
    }

    function isFilled(field){
        // var valid = false;

        if (field.val() ==""){
            if(field.is($('#Book_Title'))){
                $('#Book_Title').css({'border': "1px solid #DB4E35 "});
                $('#BookTitleError').text('Book title is required.');
            }
            if(field.is($('#myImage'))){
                $('#myImage').css({'border': "1px solid #DB4E35 "});
                $('#BookCoverError').text('Book cover is required.');
            }
            
            disableSubmit();    
            
        }
        else{
            if (field.is($('#Book_Title'))){
                $('#Book_Title').css({'border': "1px solid #4E6172 "});
                $('#BookTitleError').text('');
            }
            if (field.is($('#myImage'))){
                $('#myImage').css({'border': "1px solid #4E6172 "});
                $('#BookCoverError').text('');
            }

            if (areAllFilled() == true)
                enableSubmit();
        }
    }

    $('#Book_Title').keyup(function(){
    isFilled($('#Book_Title'));
    }); 

    $('#myImage').keyup(function(){
    isFilled($('#myImage'));
    });    

    $('#author').keyup(function(){
    isFilled($('#author'));
    });    

    $('#category').keyup(function(){
    isFilled($('#category'));
    });    

    $('#bookSynopsis').keyup(function(){
    isFilled($('#bookSynopsis'));
    });    

    $('#year').keyup(function(){
    isFilled($('#year'));
    });    

    $('#publisher').keyup(function(){
    isFilled($('#publisher'));
    });    

    $('#edition').keyup(function(){
    isFilled($('#edition'));
    });    

    $('#quality').keyup(function(){
    isFilled($('#quality'));
    });    

    $('#quantity').keyup(function(){
    isFilled($('#quantity'));
    });    

    $('#sellingPrice').keyup(function(){
    isFilled($('#sellingPrice'));
    });    

    $('#priceBought').keyup(function(){
    isFilled($('#priceBought'));
    });    

    $('#type').keyup(function(){
    isFilled($('#type'));
    });       
});