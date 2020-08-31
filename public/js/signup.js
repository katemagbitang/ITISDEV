$(document).ready(function(){

     //disables submit button
    function disableSubmit(){
        $('#submit').prop('disabled', true);
    }

    // enables submit button
    function enableSubmit(){
        $('#submit').prop('disabled', false);
    }

    function errorUsername(){
        $('#username').css({'border': "1px solid #DB4E35 "});
    }

    function normalUsername(){
        $('#username').css({'border': "1px solid #4E6172 "});
    }

    function nameIsEmpty(){
        if($("#fname").val() != null && $("#fname").val() != ""){
            enableSubmit();
            $('#fname').css({'border': "1px solid #4E6172 "});
            $('#fNameError').text('');
        }else{
            disableSubmit();
            $('#fname').css({'border': "1px solid #DB4E35 "});
            $('#fNameError').text('First name is empty');

        }

        if($("#lname").val() != null && $("#lname").val() != ""){
            enableSubmit();
            $('#lname').css({'border': "1px solid #4E6172 "});
            $('#lNameError').text('');
        }else{
            disableSubmit();
            $('#lname').css({'border': "1px solid #DB4E35 "});
            $('#lNameError').text('Last name is empty');

        }
    }

    function fieldsValidate(field){
        if($("#username").val() != null && $("#username").val() != ""){
            enableSubmit();
            normalUsername();
            $('#usernameError').text('');
        }else{
            disableSubmit();
            errorUsername();
            $('#usernameError').text('Username is empty');

        }

        // if($("#password").val() != null &&  $("#password").val() != ""){
        //     enableSubmit();
        //     normalPassword();
        // }else{
        //     disableSubmit();
        //     errorPassword();
        // }
    }
     
    $('#username').keyup(function(){
        var username = $('#username').val();

        $.get('/getUsername', {username:username}, function(result){
            if(result.username == username){
                errorUsername();
                disableSubmit();
                $('#usernameError').text('Username already registered');
            }
            else{
                normalUsername();
                enableSubmit();
                $('#usernameError').text('');
            }
        });

        fieldsValidate();
    });

    $('#fname').keyup(function(){
        nameIsEmpty();
    });

    $('#lname').keyup(function(){
        nameIsEmpty();
    });
});



// $(document).ready(function(){
    
//      //disables submit button
//      function disableSubmit(){
//         $('#login-btn').prop('disabled', true);
//     };

//     // enables submit button
//     function enableSubmit(){
//         $('#login-btn').prop('disabled', false);
        
       
//     };

//     function errorPassword(){
//         $('#password').css({'border': "1px solid #DB4E35 "});
//     }

//     function normalPassword(){
//         $('#password').css({'border': "1px solid #4E6172 "});
//     }

//     function errorUsername(){
//         $('#username').css({'border': "1px solid #DB4E35 "});
//     }

//     function normalUsername(){
//         $('#username').css({'border': "1px solid #4E6172 "});
//     }
    
//     function isFilled() {

//         var fName = validator.trim($('#fname').val());
//         var lName = validator.trim($('#lname').val());
//         var username = validator.trim($('#username').val());
//         var email = validator.trim($('#email').val());
//         var pw = validator.trim($('#password').val());
    
//         var fNameEmpty = validator.isEmpty(fName);
//         var lNameEmpty = validator.isEmpty(lName);
//         var usernameEmpty = validator.isEmpty(username);
//         var emailEmpty = validator.isEmpty(email);
//         var pwEmpty = validator.isEmpty(pw);
    
//         return !fNameEmpty && !lNameEmpty && !usernameEmpty && !emailEmpty && !pwEmpty;
//     }

//     function isValidUsername(field, callback) {

//         var username = validator.trim($('#username').val());
//         var isValidLength = validator.isLength(username, {min: 8});
    
//         if(isValidLength) {
//             $.get('/getUsername', {username: username}, function (result) {
//                 if(result.username != username) {
//                     if(field.is($('#username')))
//                         $('#usernameError').text('');
    
//                     return callback(true);
    
//                 }
    
//                 else {
//                     if(field.is($('#username')))
//                         $('#usernameError').text('Username already registered.');
//                         return callback(false);
//                     }
//                 });
//             }
    
//         else {
//             if(field.is($('#username')))
//                 $('#usernameError').text('ID Number should contain at least 8 characters.');
//                 return callback(false);
//         }
//     }

//     function isValidPassword(field) {

//         var validPassword = false;
    
//         var password = validator.trim($('#password').val());
//         var isValidLength = validator.isLength(password, {min: 8});
    
//         if(isValidLength) {
//             if(field.is($('#password')))
//                 $('#pwError').text('');
//             validPassword = true;
//         }
    
//         else {
//             if(field.is($('#password')))
//                 $('#pwError').text(`Passwords should contain at least 8 characters.`);
//         }
    
//         return validPassword;
//     }

//     function validateField(field, fieldName, error) {

//         var value = validator.trim(field.val());
//         var empty = validator.isEmpty(value);
    
//         if(empty) {
//             field.prop('value', '');
//             error.text(fieldName + ' should not be empty.');
//         }
    
//         else
//             error.text('');
    
//         var filled = isFilled();
//         var validPassword = isValidPassword(field);
//         // isValidUsername(field, function (validUsername) {
    
//             // if(filled && validPassword && validUsername)
//             if (filled)
//                 $('#submit').prop('disabled', false);
    
//             else
//                 $('#submit').prop('disabled', true);
//         // });
//     }

//     $('#fName').keyup(function () {
//         validateField($('#fName'), 'First name', $('#fNameError'));
//     });
    
//     $('#lName').keyup(function () {
//         validateField($('#lName'), 'Last name', $('#lNameError'));
//     });
    
//     $('#username').keyup(function () {
//         validateField($('#username'), 'Username', $('#usernameError'));
//     });

//     $('#email').keyup(function () {
//         validateField($('#email'), 'Email', $('#emailError'));
//     });
    
//     $('#password').keyup(function () {
//         validateField($('#password'), 'Password', $('#pwError'));
//     });
// });