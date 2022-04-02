$(document).ready(function(){
   const card = $("div.card-article");


   //Quando o mouse passa por cima do card
   card.mouseover(function(){
        var e = $(this);
        var article = e.children(".text-card");
        if (article.hasClass("hideText")) article.removeClass("hideText")
        article.show()
        article.css("display", "flex")
   })

   //Quando o mouse deixa o card
   card.mouseout(function(){
        var e = $(this);
        var article = e.children(".text-card");
        article.addClass("hideText");
        
   })
})