let apiKey = "0b4ce2adf9660ea726ae320d56010a24";
let city;
let weather;

// console.log(weather);

$("#citySearchButton").click(function () {
    event.preventDefault();
    city = $("#citySearch").val();
    // console.log(city);
    let weather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;

    $.ajax({
        url: weather,
        method: "GET"
    }).then(function (response) {
        $("#currentWeather").text(response.name);
        $("#currentDate").html(moment().format("(L)"));
        $("#currentIcon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
        let tempF = Math.round((response.main.temp - 273.15) * 1.80 + 32);
        $("#currentTemp").text("Temperature: " + tempF + "°F");
        $("#currentHumid").text("Humidity: " + response.main.humidity + "%");
        $("#currentWind").text("Wind Speed: " + response.wind.speed + "MPH");
        console.log(response);
    });
});

