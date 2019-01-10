var choices = ["Spongebob", "Rugrats", "Catdog", "Ren and Stimpy", "Dexter's Lab"];

function makeButtons() {
    $("#place-of-buttons").empty();

    for (i = 0; i < choices.length; i++) {
        var g = $("<button>");
        g.addClass("gif");
        g.attr("data-name", choices[i]);
        g.text(choices[i]);
        g.addClass("bg-green hover:bg-green-dark text-red font-bold py-2 px-4 rounded-full choices");
        $("#place-of-buttons").append(g);
    }
}

$("#add-choice").on("click", function (event) {
    event.preventDefault();
    if ($("#gif-input").val().trim() && choices.indexOf($("#gif-input").val().trim()) === -1) {
    var gif = $("#gif-input").val().trim();
    choices.push(gif);
    makeButtons();
    }
    $("#gif-input").val("");

});

// var ratingChoice = $("#grid-state").val();

function displaygifs() {
    $("#gif-view").empty();
    var gifs = $(this).attr("data-name");
    var ratingChoice = $("#grid-state").val();
    console.log(ratingChoice);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=FKljlk5rvmmXmg6Kp4KEDE9ihDrYT43y&rating=" + ratingChoice;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var divMain = $("<div>");
        var m = 0;
        for (i = 0; i < 10; i++) {
            var div = $("<div>");
            div.addClass("float-left divBox");
            if (response.data[i] == undefined) {
                break
            } else {
                var gifRating = response.data[i].rating;
                var giffRated = $("<p>").text("Rated: " + gifRating);
                div.append(giffRated);
                var pic = response.data[i].images.fixed_height_still.url;
                var giff = response.data[i].images.fixed_height.url;
                var gifImg = $("<img>").attr("src", pic);
                gifImg.attr("data-orig", giff);
                gifImg.attr("data-still", pic);
                gifImg.addClass("pausePlay");
                div.append(gifImg);
                divMain.append(div);
            }
        }


        $("#gif-view").append(divMain);
    })

}
$(document).on("click", ".pausePlay", stopOrGo);
function stopOrGo() {
    if ($(this).attr("src") === $(this).attr("data-orig")) {
        $(this).attr("src", $(this).attr("data-still"));
    } else {
        $(this).attr("src", $(this).attr("data-orig"));
    }
};

$(document).on("click", ".gif", displaygifs);

makeButtons();