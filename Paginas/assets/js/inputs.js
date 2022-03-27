$(document).ready(function(){
    const menuBtn = $(".menu-button")

    menuBtn.on("click", function(){
        $(this).hasClass("clicado")? $(this).removeClass("clicado") : $(this).addClass("clicado");
    })
})