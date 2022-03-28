$(function ($) {
    let requestConfig = {
        method: 'GET',
        url: 'http://api.tvmaze.com/shows'
    };
    $.ajax(requestConfig).then(function (responseMessage) {
        $.each(responseMessage, function (index, value) {
            let a = $('<a>').html(value.name).attr("href", value._links.self.href)
            clickFunc(a, value._links.self.href)
            let li = $('<li>').html(a).attr("id", "show_id");
            $("#showList").append(li);
            $("#showList").removeAttr("hidden");
        });
    })

    $('#searchForm').submit(function (event) {
        event.preventDefault();
        let searchTerm = $('#search_term').val()
        $("#error").attr("hidden", true)
        $("#showList").empty();
        $("#show").attr("hidden", true);
        if (!searchTerm || (searchTerm.trim() === "")) {
            $("#error").html("Error: SearchTerm is Empty")
            $("#error").removeAttr("hidden")
        }
        else {
            requestConfig = {
                method: 'GET',
                url: 'http://api.tvmaze.com/search/shows?q=' + searchTerm
            };
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage);
                $.each(responseMessage, function (index, value) {
                    let a = $('<a>').html(value.show.name).attr("href", value.show._links.self.href)
                    clickFunc(a, value.show._links.self.href)
                    let li = $('<li>').html(a)
                    $("#showList").append(li);
                    $("#showList").removeAttr("hidden");
                    $("#homeLink").removeAttr("hidden")
                });
            });

        }
    })
})(window.jQuery);

function clickFunc(ele, href) {
    ele.on('click', (function (event) {
        event.preventDefault();
        $("#showList").attr("hidden", true);
        $("#show").empty();
        let requestConfig = {
            method: 'GET',
            url: href
        };
        $.ajax(requestConfig).then(function (responseMessage) {
            console.log(requestConfig)
            console.log(responseMessage)
            let h1 = $('<h1>').html("Name: N/A")
            if (responseMessage.name) {
                h1 = $('<h1>').html(responseMessage.name)
            }
            let img;
            if (!responseMessage.image) {
                img = $('<img>').attr('src', 'public/img/no_image.jpeg')
            }
            else {
                img = $('<img>').attr('src', responseMessage.image.medium)
            }
            let dt1 = $('<dt>').html("Language: N/A")
            if (responseMessage.language) {
                dt1 = $('<dt>').html("Language: " + responseMessage.language)
            }
            let dt2 = $('<dt>').html("Average: N/A")
            if (responseMessage.rating.average) {
                dt2 = $('<dt>').html("Average: " + responseMessage.rating.average)
            }
            let dt3 = $('<dt>').html("Network: N/A")
            if (responseMessage.network) {
                dt3 = $('<dt>').html("Network: " + responseMessage.network.name)
            }
            let ul1 = $('<dt>').html("N/A")
            if (responseMessage.genres) {
                ul1 = $('<ul>').html("Genres")
                ul1.attr("id", "genre")
                $.each(responseMessage.genres, function (index, value) {
                    let li = $('<li>').html(value)
                    ul1.append(li);
                })
            }
            let dd1 = $('<dd>').html(ul1)
            let dt4 = $('<dt>').html("Summary: N/A")
            if (responseMessage.summary) {
                dt4 = $('<dt>').html("Summary: " + responseMessage.summary)
            }
            let dl = $('<dl>').append(h1, img, dt1, dt2, dt3, dd1, dt4)
            $('#show').append(dl)
            $("#show").removeAttr("hidden")
            $("#homeLink").removeAttr("hidden")
        })
    }))
}