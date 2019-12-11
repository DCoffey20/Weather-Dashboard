$(document).ready(function () {
    let apiKey = "0b4ce2adf9660ea726ae320d56010a24";
    let city;
    let cityHistory = [];
    $("#myModal").hide();


    // console.log(city);

    //Check local storage for perviously searched cities 
    cityHistory = JSON.parse(localStorage.getItem("cityHistory"));
    // console.log(cityHistory);
    if (cityHistory === null) {
        cityHistory = [];
        // console.log("none");
    } else {
        // console.log("some");
        console.log(cityHistory.length);
        for (let i = 0; i < cityHistory.length; i++) {
            console.log(cityHistory[i]);
            let list = $("<li>");
            city = cityHistory[i];
            list.text(city);
            list.addClass("list-group-item btn");
            list.attr("id", city);
            $("#cityList").prepend(list);
        };
    };

    // Call weather API for the search button
    $(".btn").click(function () {
        event.preventDefault();
        city = $("#citySearch").val();
        list = $("<li>");

        let weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
        // console.log("test");
        if (city == "") {
            // console.log("1")
            return
        } else if ($("li").attr("id") === city) {
            // console.log($("#cityList li").length);
            return
        } else if (!cityHistory.includes(city)) {
            list.text(city);
            list.addClass("list-group-item btn");
            list.attr("id", city);
            $("#cityList").prepend(list);
            // console.log("3");
            cityHistory.push(city);
        };

        $.ajax({
            url: weather,
            method: "GET",
            beforeSend: function () {
                $("#myModal").show()
            }
        }).then(function (response) {
            $("#myModal").hide();
            $("#currentWeather").text(response.name);
            $("#currentDate").html(moment().format("(L)"));
            $("#currentIcon").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
            let tempF = Math.round((response.main.temp - 273.15) * 1.80 + 32);
            $("#currentTemp").text("Temperature: " + tempF + "°F");
            $("#currentHumid").text("Humidity: " + response.main.humidity + "%");
            $("#currentWind").text("Wind Speed: " + response.wind.speed + "MPH");
            // console.log(response);
        });

        let forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

        $.ajax({
            url: forecast,
            method: "GET",
            beforeSend: function () {
                $("#myModal").show()
            }
        }).then(function (response) {
            $("#myModal").hide();
            // Day 1
            $("#day1").text(moment().add(1, "d").format("(L)"));
            $("#day1Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[5].weather[0].icon + ".png");
            let day1TempF = Math.round((response.list[5].main.temp - 273.15) * 1.80 + 32);
            $("#day1Temp").text("Temp: " + day1TempF + "°F");
            $("#day1Humid").text("Humidity: " + response.list[5].main.humidity + "%");
            // Day 2
            $("#day2").text(moment().add(2, "d").format("(L)"));
            $("#day2Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[13].weather[0].icon + ".png");
            let day2TempF = Math.round((response.list[13].main.temp - 273.15) * 1.80 + 32);
            $("#day2Temp").text("Temp: " + day2TempF + "°F");
            $("#day2Humid").text("Humidity: " + response.list[13].main.humidity + "%");
            // Day 3
            $("#day3").text(moment().add(3, "d").format("(L)"));
            $("#day3Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[21].weather[0].icon + ".png");
            let day3TempF = Math.round((response.list[21].main.temp - 273.15) * 1.80 + 32);
            $("#day3Temp").text("Temp: " + day3TempF + "°F");
            $("#day3Humid").text("Humidity: " + response.list[21].main.humidity + "%");
            // Day 4
            $("#day4").text(moment().add(4, "d").format("(L)"));
            $("#day4Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[29].weather[0].icon + ".png");
            let day4TempF = Math.round((response.list[29].main.temp - 273.15) * 1.80 + 32);
            $("#day4Temp").text("Temp: " + day4TempF + "°F");
            $("#day4Humid").text("Humidity: " + response.list[29].main.humidity + "%");
            // Day 5
            $("#day5").text(moment().add(5, "d").format("(L)"));
            $("#day5Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[37].weather[0].icon + ".png");
            let day5TempF = Math.round((response.list[37].main.temp - 273.15) * 1.80 + 32);
            $("#day5Temp").text("Temp: " + day5TempF + "°F");
            $("#day5Humid").text("Humidity: " + response.list[37].main.humidity + "%");
            // console.log(response);



            localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
            console.log(cityHistory);
        });
    });

    // Call the weather API for the list of searched cities
    $(document).on("click", "li", function () {
        // console.log("test");
        city = this.id;
        // console.log(this.id);

        let weather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
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
            // console.log(response);
        });

        let forecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=" + apiKey;

        $.ajax({
            url: forecast,
            method: "GET"
        }).then(function (response) {
            // Day 1
            $("#day1").text(moment().add(1, "d").format("(L)"));
            $("#day1Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[5].weather[0].icon + ".png");
            let day1TempF = Math.round((response.list[5].main.temp - 273.15) * 1.80 + 32);
            $("#day1Temp").text("Temp: " + day1TempF + "°F");
            $("#day1Humid").text("Humidity: " + response.list[5].main.humidity + "%");
            // Day 2
            $("#day2").text(moment().add(2, "d").format("(L)"));
            $("#day2Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[13].weather[0].icon + ".png");
            let day2TempF = Math.round((response.list[13].main.temp - 273.15) * 1.80 + 32);
            $("#day2Temp").text("Temp: " + day2TempF + "°F");
            $("#day2Humid").text("Humidity: " + response.list[13].main.humidity + "%");
            // Day 3
            $("#day3").text(moment().add(3, "d").format("(L)"));
            $("#day3Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[21].weather[0].icon + ".png");
            let day3TempF = Math.round((response.list[21].main.temp - 273.15) * 1.80 + 32);
            $("#day3Temp").text("Temp: " + day3TempF + "°F");
            $("#day3Humid").text("Humidity: " + response.list[21].main.humidity + "%");
            // Day 4
            $("#day4").text(moment().add(4, "d").format("(L)"));
            $("#day4Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[29].weather[0].icon + ".png");
            let day4TempF = Math.round((response.list[29].main.temp - 273.15) * 1.80 + 32);
            $("#day4Temp").text("Temp: " + day4TempF + "°F");
            $("#day4Humid").text("Humidity: " + response.list[29].main.humidity + "%");
            // Day 5
            $("#day5").text(moment().add(5, "d").format("(L)"));
            $("#day5Icon").attr("src", "http://openweathermap.org/img/w/" + response.list[37].weather[0].icon + ".png");
            let day5TempF = Math.round((response.list[37].main.temp - 273.15) * 1.80 + 32);
            $("#day5Temp").text("Temp: " + day5TempF + "°F");
            $("#day5Humid").text("Humidity: " + response.list[37].main.humidity + "%");
        });


    });
});