$(document).ready(function (req, res) {


   



    function preloadFunc()
    {


        $.get('/getsession',  function (data, status) {
            if(data.userType == "Regular"){
                $("#navvisit").hide();
                $("#navuser").show();
                $("#navadmin").hide();
            }else if(data.userType == "Admin"){
                $("#navvisit").hide();
                $("#navuser").hide();
                $("#navadmin").show();
            }else if(data.userType == "Visitor"){
                $("#navvisit").show();
                $("#navuser").hide();
                $("#navadmin").hide();
            }

        })




    };
    window.onpaint = preloadFunc();

    



    






})