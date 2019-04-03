$(function() {

    $(document).on('click', "#dropDown" , function(e) {
        $('.drop-down').toggleClass('drop-down--active');
    });

    $(document).on('click', ".lslide" , function(e) {
        console.log("Inside click");
        $("li.lslide.active").removeClass('active');
        $(this).addClass('active');
    });

    // $(document).on('click', ".report_upload_option_select" , function(e) {
    //     $(".report_upload_option_select.active > i").removeClass('blue_icon');
    //    $(".report_upload_option_select.active").removeClass('active');
    //    $(this).addClass('active');
    //     $(".report_upload_option_select.active > i").addClass('blue_icon');
    // });

        //report_upload_option_select

});