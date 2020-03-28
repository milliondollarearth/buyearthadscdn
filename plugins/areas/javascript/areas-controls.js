$(document).ready(function(){
    $(".country_lists").click(function(){
        var country_id = $(this).attr('id');
        var province_id = country_id.split("_")[1];
        var display = $(".province_"+province_id).eq(1).css("display");
        $(".province_"+province_id).slideToggle("slow");
        if(display == 'table-row' ){
            $("#country_"+province_id).find("i").html("add");
        }else{
            $("#country_"+province_id).find("i").html("remove");
        }
    });
});