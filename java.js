/*A simple application that explains How to use the API by searching for the country
 you want to know the weather for and some features using the >> fetch()
*/
let wet = {
  apikey: "92e26ebf59fa52a6d91c716407df85fa",
  //using api weather
  fetch_weather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=92e26ebf59fa52a6d91c716407df85fa"
    )
      //Get erorr
      .then((response) => {
        if (!response.ok) {
          $(".icon").fadeOut(100, function () {
            // Not found weather
            $(".alert").fadeIn(1000);
          });
        }
        return response.json();
      })
      .then((date) => this.display(date));
  },
  //display date weather
  display: function (date) {
    const { name } = date;
    const { icon, description } = date.weather[0];
    const { temp, humidity } = date.main;
    const { speed } = date.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".location").innerHTML = "Weather in  " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".alert").remove();
    //change background backgroundImage Country Status
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetch_weather(document.querySelector(".search-bar").value);
  },
};

var all = document.getElementById("ALL");
document.querySelector(".search").addEventListener("click", function () {
  wet.search();
  // Change the compose box
  $(".ALL").animate({ height: "400px" }, 800, function () {
    $(".cont").fadeIn(1000);
    document.querySelector(".search-bar").value = "";
  });
  //use event Enter show weather
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        wet.search();
      }
    });
});
//window reload page
document.querySelector(".change").addEventListener("click", function () {
  window.location.reload();
});
