$(function(){
    $("[data-hide]").on("click", function(){
        //$("." + $(this).attr("data-hide")).hide()
        // -or-, see below
         $(this).closest("." + $(this).attr("data-hide")).hide()
    })
})