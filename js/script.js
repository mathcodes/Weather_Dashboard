$(document).ready(function () {

    $(document).keypress(
        function (event) {
            if (event.which == '13') {
                event.preventDefault();
            }
        }
    );
    document.getElementById("content").style.backgroundImage = "url('../BGland.jpg')";
    const m = moment();
    console.log(moment());
    console.log(m.format('l'));

    var APIKey = "e83d9bc717bee8ffd12645ab9105f4a0";
    var city = $("#search").val();


    if (localStorage.getItem("Cities") === null) {
        var cities = [];
        var oldCities = [];
        localStorage.setItem("Cities", JSON.stringify(cities, oldCities));

    } else {
        var oldCities = JSON.parse(localStorage.getItem("Cities"));
        oldCities.forEach(city => {
            var newBtn = $(`<button type="button" class="btn btn-primary cityButtons"></button>`);
            newBtn.text(city);
            newBtn.appendTo(cityBtns);
        })

    }

    $("#search").keyup(function(){
        if (event.key === "Enter"){
            console.log("enter")
            getUserInput();
        }
    })
    // give search buttons click function to:
    $("#searchBtn").on("click", function () {

        getUserInput();

    });

    function getUserInput(){
        city = $("#search").val().trim() ;
        console.log(city);
        $("#search").val(""); //clear input field
        if (city === ""){ //if empty don't run
            return;
        }
        var oldCities = JSON.parse(localStorage.getItem("Cities"));
        if(oldCities.indexOf(city) === -1){
            var newBtn = $(`<button type="button" class="btn btn-primary cityButtons" id=${city}></button>`);

            newBtn.text(city);
            newBtn.appendTo(cityBtns);
    
            console.log(city);
    
            var cities = [];
    
            console.log(cities);
    
            cities.push(city);
            localStorage.setItem("Cities", JSON.stringify([...oldCities, ...cities]));
        } 
            
        

        // city = $("#search").val();
        generateInfo();
    }

    $(document).on("click", ".cityButtons", function (e) {
        city = $(this).text();
        generateInfo();
    });


    function generateInfo() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // Log the data in HTML
            $("#todaysDate").html(moment().format("l"));

            var iconID = response.weather[0].icon;
            $('#icon').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
            $("#cityName").text(response.name);
            var tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
            $("#temp").text("Temperature: " + tempF + "°F");
            var wind = ((response.wind.speed * 2.236936).toFixed(1));
            $("#windSpeed").text("Wind Speed: " + wind + "mph");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");

            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $('#uvDiv').css("display", "flex");
                $("#uvIndex").text(response.value);
                if (response.value <= 2) {
                    $('#uvIndex').css("background-color", "#05AF00");
                    $('#uvIndex').css("color", "black");
                } else if (response.value > 2 && response.value <= 5) {
                    $('#uvIndex').css("background-color", "#E5D600");
                    $('#uvIndex').css("color", "black");
                } else if (response.value > 5 && response.value <= 7) {
                    $('#uvIndex').css("background-color", "#E88E10");
                    $('#uvIndex').css("color", "black");
                } else if (response.value > 7 && response.value <= 10) {
                    $('#uvIndex').css("background-color", "#BC0000");
                    $('#uvIndex').css("color", "#ffffff");
                } else {
                    $('#uvIndex').css("background-color", "#0072FF");
                    $('#uvIndex').css("color", "#ffffff");
                }
            });

            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=" + APIKey;
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                console.log(response.list);

                $("#d1d").html(moment().add(1, 'days').format("l"));
                $("#d2d").html(moment().add(2, 'days').format("l"));
                $("#d3d").html(moment().add(3, 'days').format("l"));
                $("#d4d").html(moment().add(4, 'days').format("l"));
                $("#d5d").html(moment().add(5, 'days').format("l"));

                var iconID0 = response.list[0].weather[0].icon;
                $('#d1i').attr("src", "http://openweathermap.org/img/wn/" + iconID0 + "@2x.png");
                var tempF1 = ((response.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d1t").text("Temp: " + tempF1 + "°F");
                $("#d1h").text("Humidity: " + response.list[0].main.humidity + "%");


                var iconID1 = response.list[1].weather[0].icon;
                $('#d2i').attr("src", "http://openweathermap.org/img/wn/" + iconID1 + "@2x.png");
                var tempF2 = ((response.list[1].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d2t").text("Temp: " + tempF2 + "°F");
                $("#d2h").text("Humidity: " + response.list[1].main.humidity + "%");


                var iconID2 = response.list[2].weather[0].icon;
                $('#d3i').attr("src", "http://openweathermap.org/img/wn/" + iconID2 + "@2x.png");
                var tempF3 = ((response.list[2].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d3t").text("Temp: " + tempF3 + "°F");
                $("#d3h").text("Humidity: " + response.list[2].main.humidity + "%");


                var iconID3 = response.list[3].weather[0].icon;
                $('#d4i').attr("src", "http://openweathermap.org/img/wn/" + iconID3 + "@2x.png");
                var tempF4 = ((response.list[3].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d4t").text("Temp: " + tempF4 + "°F");
                $("#d4h").text("Humidity: " + response.list[3].main.humidity + "%");


                var iconID4 = response.list[4].weather[0].icon;
                $('#d5i').attr("src", "http://openweathermap.org/img/wn/" + iconID4 + "@2x.png");
                var tempF5 = ((response.list[4].main.temp - 273.15) * 1.80 + 32).toFixed(2);
                $("#d5t").text("Temp: " + tempF5 + "°F");
                $("#d5h").text("Humidity: " + response.list[4].main.humidity + "%");

            });
        });
    }

});
