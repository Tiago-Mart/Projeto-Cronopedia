$(document).ready(function () {
    $(".search input").keyup(function (e) {
        var termo = $(this).val();
        clearTimeout($.data(this, 'timer'));

        if (e.keyCode == 13)
            search(termo);
        else
            $(this).data('timer', setTimeout(function () {
                search(termo);
            }, 3000));
    });

    function search(termo) {
        let results = $(".search-results");
        results.html("");

        if (termo.split() != "") {
            $.ajax({
                url: "/search?q=" + termo,
                method: "GET",
                success: function (data) {
                    if (data.length > 0) {
                        data.forEach(function (item) {
                            results.append(`<div class="search-results-item">
                                        <div class="search-results-item-header">
                                            <a href="#"><h4>${item.title}</h4></a>
                                        </div>
                                        <div class="search-results-item-body">
                                            <p>
                                                ${item.resume.substring(0, 100).concat("...")}
                                            </p>
                                        </div>
                                    </div>`);
                        });
                    } else {
                        results.html(`<div class="search-results-item">
                                        <div class="search-results-item-header">
                                            <a href="#"><h4>Nenhum resultado encontrado</h4></a>
                                        </div>
                                    </div>`);
                    }
                },
                error: function (error) {
                    console.log(error);
                },
                beforeSubmit: function () {
                    results.html(`<div class="search-results-item">
                                    <div class="search-results-item-header">
                                        <h3>Carregando...</h3>
                                    </div>
                                </div>`);
                },
                complete: function () {
                    results.addClass("active");
                }
            });


        } else {
            results.removeClass("active");
        }
    }
});