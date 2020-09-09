$(document).ready(function(){

     //disables submit button
    function disableSubmit(){
        $('#submit').prop('disabled', true);
    }

    // enables submit button
    function enableSubmit(){
        $('#submit').prop('disabled', false);
    }

     //checks if all fields are filled up
    function areAllFilled(){

        var valid ;
        
    
        if($("#username").val() != '' && $("#email").val() != '' && $("#password").val() != '' && $("#fname").val() != '' && $("#lname").val() != '' ){
        // if($("#username").val() != '' && $("#email").val() != ''){
                // alert("true");
            valid = true;
        }else{
            valid = false;
        }
        return valid;
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
            // if(field.is($('#password'))){
            //     $('#password').css({'border': "1px solid #DB4E35 "});
            //     $('#pwError').text('Password is required.');
            // }
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
            // if (field.is($('#password'))){
            //     $('#password').css({'border': "1px solid #4E6172 "});
            //     $('#pwError').text('');
            // }

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
        else if(user.val().length < 4 || user.val().length > 15){
            $('#username').css({'border': "1px solid #DB4E35 "});
            $('#usernameError').text('Username must be 4-15 characters only.');
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
        else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.val()) == false){
            // valid = false; // sets to false because the email is not valid.
            $('#email').css({'border': "1px solid #DB4E35 "});
            $("#emailError").text('Invalid email format');

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

    function validPassword(pass){
        if(pass.val() == ''){
            $('#password').css({'border': "1px solid #DB4E35 "});
            $('#pwError').text('Password is required.');
            disableSubmit();
        }
        else if(pass.val().length < 5){
            $('#password').css({'border': "1px solid #DB4E35 "});
            $('#pwError').text('Password must be at least 5 characters.');
            disableSubmit();
        }
        else{
            $('#password').css({'border': "1px solid #4E6172 "});
            $('#pwError').text('');
            
            if (areAllFilled() == true)
                enableSubmit();
        }
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
        validPassword($('#password'));
    });

    $('#email').keyup(function(){
        // validateField($('#email'));
        validEmail($('#email'));
    });

});

//2nd try
// $(document).ready(function () {
//     function isFilled() {
//         var fName = validator.trim($('#fname').val());
//         var lName = validator.trim($('#lname').val());
//         var email = validator.trim($('#email').val());
//         var username = validator.trim($('#username').val());
//         var pw = validator.trim($('#password').val());

//         var fNameEmpty = validator.isEmpty(fName);
//         var lNameEmpty = validator.isEmpty(lName);
//         var emailEmpty = validator.isEmpty(email);
//         var usernameEmpty = validator.isEmpty(username);
//         var pwEmpty = validator.isEmpty(pw);

//         return !fNameEmpty && !lNameEmpty && !emailEmpty && !usernameEmpty && !pwEmpty;
//     }

//     function isValidUsername(field, callback) {
//         var valid = false;
//         var username = validator.trim($('#username').val());
//         var isValidLength = validator.isLength(username, {min: 4, max: 15});

//         if(isValidLength) {
//             $.get('/getUsername', {username: username}, function (result) {
//                 if(!(result.username == username)) {
//                     if(field.is($('#username')))
//                         $('#usernameError').text('');

//                     // return callback(true);
//                     valid = true;
//                 } else {
//                     if(field.is($('#username')))
//                         $('#usernameError').text('Username already taken.');

//                     // return callback(false);
//                 }
//             });  
//         } else {
//             if(field.is($('#username')))
//                 $('#usernameError').text('Username should contain at least 4 characters and 15 characters at most.');

//             // return callback(false);
//         }
//         return valid;
//     }

//     function isValidEmail(field) {
//         var validEmail = false;
//         var email = validator.trim($('#email').val());
//         var isValidFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.val());
//         // var isValidLength = validator.isLength(email, {min: 4, max: 15});

//         if(isValidFormat) {
//             $.get('/getEmail', {email: email}, function (result) {
//                 if(!(result.email == email)) {
//                     if(field.is($('#email')))
//                         $('#emailError').text('');

//                     validEmail = true;
//                 } else {
//                     if(field.is($('#email')))
//                         $('#emailError').text('Email already taken.');
//                 }
//             });  
//         } else {
//             if(field.is($('#email')))
//                 $('#emailError').text('Invalid email format.');
//         }
//         return validEmail;
//     }

//     function isValidPassword(field) {
//         var validPassword = false;

//         var password = validator.trim($('#password').val());
//         var isValidLength = validator.isLength(password, {min: 5});

//         if(isValidLength) {
//             if(field.is($('#password')))
//                 $('#pwError').text('');

//             validPassword = true;    
//         } else {
//             if(field.is($('#password')))
//                 $('#pwError').text('Password should contain at least 5 characters.');
//         }

//         return validPassword;
//     }

//     function validateField(field, fieldName, error) {
//         var value = validator.trim(field.val());
//         var empty = validator.isEmpty(value);

//         if(empty) {
//             field.prop('value', '');
//             error.text(fieldName + ' should not be empty.');
//         } else {
//             error.text('');
//         }

//         var filled = isFilled();
//         var validPassword = isValidPassword(field);
//         var validEmail = isValidEmail(field);
//         var validUsername = isValidUsername(field);

//         // isValidUsername(field, function (validUsername) {
//         //     if(filled && validPassword && validUsername && validEmail) {
//         //         $('#submit').prop('disabled', false);
//         //     }
//         //     else{
//         //         $('#submit').prop('disabled', true);
//         //     }
                
//         // });

//         if(filled && validPassword && validUsername && validEmail) {
//             $('#submit').prop('disabled', false);
//             console.log('email' + validEmail);
//             console.log('user' + validUsername);
//             console.log('pass' + validPassword);

//         }
//         else{
//             $('#submit').prop('disabled', true);
//             console.log('email' + validEmail);
//             console.log('user' + validUsername);
//             console.log('pass' + validPassword);
//         }
//     }

//     $('#fname').keyup(function () {
//         validateField($('#fname'), 'First name', $('#fNameError'));
//     });

//     $('#lname').keyup(function () {
//         validateField($('#lname'), 'Last name', $('#lNameError'));
//     });

//     $('#email').keyup(function () {
//         validateField($('#email'), 'Email', $('#emailError'));
//     });

//     $('#username').keyup(function () {
//         validateField($('#username'), 'Username', $('#usernameError'));
//     });

//     $('#password').keyup(function () {
//         validateField($('#password'), 'Password', $('#pwError'));
//     });
// });
