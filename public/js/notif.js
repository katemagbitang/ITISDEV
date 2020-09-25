$(document).ready(function (req, res) {


   



    function preloadFunc()
    {



        $.get('/sendnotification',  function (data, status) {
            console.log("/sendnotification ~ DATA/STATUS: " + data + status);

        })

        $.get('/autocancelrequests', function(data, status){
            console.log("/autocancelrequests ~ DATA/STATUS: " + data + status);
        })
        
        $('.noBtn').on('click', function(){
            var notif_ID  = $('.notif_ID').val();
            $.post('/postResponseNo', {notif_ID: notif_ID}, function(data, status){
                console.log(data)
            })

            $(this).parent().parent().remove();
            $('#notifModalBody').html("Since you're no longer interested in the requested book, we have cancelled your request. Thank you!");
        })

        $('.yesBtn').on('click', function(){
            var notif_ID  = $('.notif_ID').val();

            // record the response as "yes"
            $.post('/postResponseYes', {notif_ID: notif_ID}, function(data, status){
                console.log(data)
            })
            $(this).parent().parent().remove();
            $('#notifModalBody').html("Thank you for your interest. We'll continue looking for your requested book.");

            
        })





    };
    window.onpaint = preloadFunc();

    



    

})