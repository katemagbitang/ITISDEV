$(document).ready(function(){

     //disables submit button
    function disableSubmit(){
        $('#submit').prop('disabled', true);
    }

    // enables submit button
    function enableSubmit(){
        $('#submit').prop('disabled', false);
    }

    function isFilled(field){
        // var valid = false;

        if (field.val() ==""){
            if(field.is($('#fname'))){
                $('#fname').css({'border': "1px solid #DB4E35 "});
                $('#fNameError').text('First name is required.');
            }
            if(field.is($('#lname'))){
                $('#lname').css({'border': "1px solid #DB4E35 "});
                $('#lNameError').text('Last name is required.');
            }
            if(field.is($('#password'))){
                $('#password').css({'border': "1px solid #DB4E35 "});
                $('#pwError').text('Password is required.');
            }
            disableSubmit();            
            // valid = false;
            
        }
        else{
            if (field.is($('#fname'))){
                $('#fname').css({'border': "1px solid #4E6172 "});
                $('#fNameError').text('');
            }
            if (field.is($('#lname'))){
                $('#lname').css({'border': "1px solid #4E6172 "});
                $('#lNameError').text('');
            }
            if (field.is($('#password'))){
                $('#password').css({'border': "1px solid #4E6172 "});
                $('#pwError').text('');
            }

            if (areAllFilled() == true)
                enableSubmit();
            // valid = true;
        }

        // return valid;
    }

    function validUsername(user){
        // var username = $('#username').val();
        // var valid = false;

        if (user.val() == ""){
            // valid = false;
            $('#username').css({'border': "1px solid #DB4E35 "});
            $('#usernameError').text('Username is required');
            disableSubmit();
        }
        else{
            $('#username').css({'border': "1px solid #4E6172 "});
            $('#usernameError').text('');
        // }
        // else{
            username = user.val();

            $.get('/getUsername', {username:username}, function(result){
                if(result.username == username){
                    $('#username').css({'border': "1px solid #DB4E35 "});
                    $('#usernameError').text('Username already registered');
                    // valid = false;
                    disableSubmit();
                }
                else{
                    $('#username').css({'border': "1px solid #4E6172 "});
                    $('#usernameError').text('');
    
                    if (areAllFilled() == true){
                        enableSubmit();
                    }
                    // valid = true;
                        
                }
            });
            // valid = true;
        }
        // return valid;
    }

    function validEmail(mail){
        // var username = $('#username').val();
        // var valid = false;

        if (mail.val() == ""){
            // valid = false;
            $('#email').css({'border': "1px solid #DB4E35 "});
            $('#emailError').text('Email is required');
            disableSubmit();
        }
        else{
            $('#email').css({'border': "1px solid #4E6172 "});
            $('#emailError').text('');
        // }
        // // else{
            email = mail.val();

            $.get('/getEmail', {email:email}, function(result){
                if(result.email == email){
                    $('#email').css({'border': "1px solid #DB4E35 "});
                    $('#emailError').text('Email already registered');
                    // valid = false;
                    disableSubmit();
                    
                }
                else{
                    $('#email').css({'border': "1px solid #4E6172 "});
                    $('#emailError').text('');
    
                    if (areAllFilled() == true){
                        enableSubmit();
                    }
                    // valid = true;    
                }
            });
            // valid = true;
        }
        // return valid;
    }

    $('#username').keyup(function(){
        // validateField($("#username"));
        validUsername($("#username"));
    });

    $('#fname').keyup(function(){
        // validateField($('#fname'));
        isFilled($('#fname'));
    });

    $('#lname').keyup(function(){
        // validateField($('#lname'));
        isFilled($('#lname'));
    });

    $('#password').keyup(function(){
        // validateField($('#password'));
        isFilled($('#password'));
    });

    $('#email').keyup(function(){
        // validateField($('#email'));
        validEmail($('#email'));
    });

});

