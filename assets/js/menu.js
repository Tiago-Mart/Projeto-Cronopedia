$(document).ready(function(){
    const primaryNav = $(".primary-menu");
    const btnMenu = $(".topo-pagina button.menu-button");

    btnMenu.on("click", function(){
        var visibility = primaryNav.attr("data-visible");

        visibility == "false" ? primaryNav.attr("data-visible", "true") : primaryNav.attr("data-visible", "false")
    })
})