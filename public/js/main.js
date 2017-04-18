$(function ($) {
    $(document).on('submit', '#form_signup', function(){
        var data = $(this).serialize();
        $.ajax({
            type : 'POST',
            url  : $(this).attr('action'),
            data : data,
            dataType : 'json',
            success :  function(data) {
                alert(data);
            }
        });
        return false;
    });
});