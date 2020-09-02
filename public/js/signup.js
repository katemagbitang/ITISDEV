$(document).ready(function(){

     //disables submit button
    function disableSubmit(){
        $('#submit').prop('disabled', true);
    }

    // enables submit button
    function enableSubmit(){
        $('#submit').prop('disabled', false);
    }


    // function isFilled(){


    //     var fname = $("#fname").val();
    //     var lname = $("#lname").val();
    //     var username = $("#username").val();
    //     var email = $("#email").val();
    //     var password = $("#password").val();

    //     return !(fname == null && fname == "") && !!(lname == null && lname == "") && !(username == null && username == "") && !(email == null && email == "") && !(password == null && password == "")

    //     // if($("#fname").val() != null && $("#fname").val() != ""){
    //     //     // enableSubmit();
    //     //     $('#fname').css({'border': "1px solid #4E6172 "});
    //     //     $('#fNameError').text('');
    //     //     check = true;
    //     // }else{
    //     //     // disableSubmit();
    //     //     $('#fname').css({'border': "1px solid #DB4E35 "});
    //     //     $('#fNameError').text('First name is empty');
    //     //     check = false;
    //     // }

    //     // if($("#lname").val() != null && $("#lname").val() != ""){
    //     //     // enableSubmit();
    //     //     $('#lname').css({'border': "1px solid #4E6172 "});
    //     //     $('#lNameError').text('');
    //     //     check = true;
    //     // }else{
    //     //     // disableSubmit();
    //     //     $('#lname').css({'border': "1px solid #DB4E35 "});
    //     //     $('#lNameError').text('Last name is empty');
    //     //     check = false;
    //     // }

    //     // return check;
    // }

        //checks if all fields are filled up
    function areAllFilled(){

        var valid ;
    
            // var validusername = validUsername($("#username"));
            // var validemail = validEmail($("#email"));
            // var validp = validPassword($("#password"));
            // var validcp = validCPassword($("#cpassword"));
        
    
        if($("#username").val() != '' && $("#email").val() != '' && $("#password").val() != '' && $("#fname").val() != '' && $("#lname").val() != '' ){
        // if($("#username").val() != '' && $("#email").val() != ''){
                // alert("true");
            valid = true;
        }else{
            valid = false;
        }
        return valid;
    }

    // function fieldsValidate(){
        
    //     var filled = isFilled();
        
    //     if(filled){
    //         enableSubmit();
    //     }
    //     else{
    //         disableSubmit();
    //         if($("#fname").val() != null && $("#fname").val() != ""){
    //             $('#fname').css({'border': "1px solid #4E6172 "});
    //             $('#fNameError').text('');
    //         }else{
    //             $('#fname').css({'border': "1px solid #DB4E35 "});
    //             $('#fNameError').text('First name is empty');
    //         }
    //         if($("#lname").val() != null && $("#lname").val() != ""){
    //         // enableSubmit();
    //             $('#lname').css({'border': "1px solid #4E6172 "});
    //             $('#lNameError').text('');
    //         }else{
    //             // disableSubmit();
    //             $('#lname').css({'border': "1px solid #DB4E35 "});
    //             $('#lNameError').text('Last name is empty');
    //         }
    //         if($("#username").val() != null && $("#username").val() != ""){
    //             normalUsername();
    //             $('#usernameError').text('');
    //         }else{
    //             errorUsername();
    //             $('#usernameError').text('Username is empty');
    //         }
    //         if($("#password").val() != null &&  $("#password").val() != ""){
    //             $('#password').css({'border': "1px solid #4E6172 "})
    //             $('#pwError').text('');
    //         }else{
    //             $('#password').css({'border': "1px solid #DB4E35 "});
    //             $('#pwError').text('Password is empty');
    //         }
    //         if($("#email").val() != null && $("#email").val() != ""){
    //             // enableSubmit();
    //             $('#email').css({'border': "1px solid #4E6172 "});
    //             $('#emailError').text('');
    //         }else{
    //             // disableSubmit();
    //             $('#email').css({'border': "1px solid #DB4E35 "});
    //             $('#emailError').text('Email is empty');
    //         }
    //     }
    // }

    function isFilled(field){
        var valid = false;

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
                $('#passwordError').text('Password is required.');
            }

            valid = false;
            
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
            valid = true;
        }

        return valid;
    }

    function validUsername(user){
        // var username = $('#username').val();
        var valid = false;

        if (user.val() == ""){
            valid = false;
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
            valid = true;
        }
        return valid;
    }

    function validEmail(mail){
        // var username = $('#username').val();
        var valid = false;

        if (mail.val() == ""){
            valid = false;
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
            valid = true;
        }
        return valid;
    }

    // if (validUsername($("#username")) == true && validEmail(($('#email')) == true && isFilled($('#fname')) ==true && isFilled($('#lname')) == true && isFilled($('#password') == true))){
    //     // if (isFilled($('#fname')) ==true && isFilled($('#lname')) == true && isFilled($('#password') == true)){
    //         enableSubmit();
    //     // }
    // }
    // else
    //     disableSubmit();



    function validateField(field){
        if (field.is($('#fname')) || field.is($('#lname')) || field.is($('#password')))
            isFilled(field);
        if (field.is($("#username")))
            var user = validUsername(field);  
        if (field.is($('#email')))
            var mail = validEmail(field);
            
        if (areAllFilled() && user && mail)
        // if (user && mail)
            enableSubmit();
        else
            disableSubmit();
    }

     
    $('#username').keyup(function(){
        validateField($("#username"));
    });

    $('#fname').keyup(function(){
        validateField($('#fname'));
    });

    $('#lname').keyup(function(){
        validateField($('#lname'));
    });

    $('#password').keyup(function(){
        validateField($('#password'));
    });

    $('#email').keyup(function(){
        validateField($('#email'));
    });

    

});

