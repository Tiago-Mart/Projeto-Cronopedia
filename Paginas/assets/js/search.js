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
                    console.log(data[0]);

                    for (let i = 0; i < data.length; i++) {
                        results.append(`<div class="search-results-item">
                                    <div class="search-results-item-header">
                                        <h3>${data[i].title}</h3>
                                    </div>
                                    <div class="search-results-item-body">
                                        <p>
                                            ${data[i].resume}
                                        </p>
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