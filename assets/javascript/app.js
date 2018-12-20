var choices = ["spongebob", "rugrats", "catdog", "ren and stimpy", "gorilla"];

function makeButtons() {
    $("#place-of-buttons").empty();

    for (i=0; i < choices.length; i++) {
        var g = $("<button>");
        g.addClass("gif");
        g.attr("data-name", choices[i]);
        g.text(choices[i]);
        $("#place-of-buttons").append(g);
    }
}

$("#add-choice").on("click", function (event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    choices.push(gif);
    makeButtons();
});


function displaygifs() {
    $("#gif-view").empty();
    var gifs = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=FKljlk5rvmmXmg6Kp4KEDE9ihDrYT43y&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var div = $("<div>");
        for (i=0; i < 10; i++) {
            var gifRating = response.data[i].rating;
            var giffRated = $("<p>").text("Rated: " + gifRating);
            div.append(giffRated);
            var giff = response.data[i].images.original.url;
            var gifImg = $("<img>").attr("src", giff);
            div.append(gifImg);
        }

        $("#gif-view").append(div);
    })

}
$(document).on("click", ".gif", displaygifs);

makeButtons();