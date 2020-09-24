$(document).ready(function (req, res) {


   



    function preloadFunc()
    {



        $.get('/sendnotification',  function (data, status) {
            console.log("/sendnotification ~ DATA/STATUS: " + data + status);

        })

        $.get('/autocancelrequests', function(data, status){
            console.log("/autocancelrequests ~ DATA/STATUS: " + data + status);
        })


    };
    window.onpaint = preloadFunc();

    



    

})