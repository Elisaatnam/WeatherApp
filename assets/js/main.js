const btn = document.querySelector("button");
const wrapper = document.querySelector(".wrapper");

btn.addEventListener("click", () => {
	const preloader = document.querySelector(".preloader");
	preloader.style.opacity = "1";

	const city = document.querySelector("#get-city").value;

	// Vorherigen weatherOutput entfernen
	const weatherOutput = wrapper.querySelector(".weather-output");
	if (weatherOutput) {
		weatherOutput.remove();
	}

	fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=0f4e48d5bad8f61ca054d7c5c6001386&lang=de&units=metric`,
	)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const longitude = data[0].lon;
			console.log({ longitude });
			const latitude = data[0].lat;
			console.log({ latitude });

			fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0f4e48d5bad8f61ca054d7c5c6001386&lang=de&units=metric`,
			)
				.then(res => res.json())
				.then(weatherData => {
					console.log(weatherData);
					const icon = weatherData.weather[0].icon;
					const temp = Math.round(weatherData.main.temp);
					const feelsLike = Math.round(weatherData.main.feels_like);
					const weatherDescription = weatherData.weather[0].description;
					const pressure = weatherData.main.pressure;
					const humidity = weatherData.main.humidity;
					const wind = Math.round(weatherData.wind.speed * 3.701);
					console.log(wind);
					const sunrise = new Date(
						weatherData.sys.sunrise * 1000,
					).toLocaleTimeString("de-DE");

					const sunset = new Date(
						weatherData.sys.sunset * 1000,
					).toLocaleTimeString("de-DE");

					//ELTERMELEMENT - Output wo alle Daten gesammelt drin stehen
					let weatherOutput = document.createElement("section");
					//Klasse hinzufuegen, um bei erneuter Ausfuehrung der Funktion drauf zugreifen zu koennen und den output wieder zu 'removen'
					weatherOutput.classList.add("weather-output");

					//Output wo Staedtename drin steht
					let cityInfo = document.createElement("h2");
					cityInfo.textContent = `Aktuelles Wetter in ${city}`;
					weatherOutput.appendChild(cityInfo);

					//ICON
					let iconOutput = document.createElement("img");
					iconOutput.setAttribute(
						"src",
						`http://openweathermap.org/img/w/${icon}.png`,
					);
					iconOutput.setAttribute("alt", "Wetter Symbol");
					weatherOutput.appendChild(iconOutput);

					let outputDiv = document.createElement("article");

					//Output fuer die Temperatur
					let tempOutput = document.createElement("p");
					tempOutput.innerHTML = `Temparatur: <br><span>${temp} °C</span>`;
					outputDiv.appendChild(tempOutput);

					//Output fuer gefuehlte Temp.
					let feelsLikeOutput = document.createElement("p");
					feelsLikeOutput.innerHTML = `Fühlt sich an wie: <br><span>${feelsLike} °C</span>`;
					outputDiv.appendChild(feelsLikeOutput);

					//Output fuer Wetter Beschreibung
					let weatherDescriptionOutput = document.createElement("p");
					weatherDescriptionOutput.innerHTML = `Beschreibung:<br><span>${weatherDescription}</span>`;
					outputDiv.appendChild(weatherDescriptionOutput);

					//Output fuer Luftdruck
					let pressureOutput = document.createElement("p");
					pressureOutput.innerHTML = `Luftdruck: <br><span>${pressure} hPa</span>`;
					outputDiv.appendChild(pressureOutput);

					//Output fuer Luftfeuchtigkeit
					let humidityOutput = document.createElement("p");
					humidityOutput.innerHTML = `Luftfeuchtigkeit: <br><span>${humidity} %</span>`;
					outputDiv.appendChild(humidityOutput);

					//Output fuer Wind
					let windOutput = document.createElement("p");
					windOutput.innerHTML = `Windgeschwindigkeit: <br><span>${wind} km/h</span>`;
					outputDiv.appendChild(windOutput);

					//Output fue Sunrise
					let sunriseOutput = document.createElement("p");
					sunriseOutput.innerHTML = `Sonnenaufgang: <br><span>${sunrise}</span>`;
					outputDiv.appendChild(sunriseOutput);

					//Output fue Sunset
					let sunsetOutput = document.createElement("p");
					sunsetOutput.innerHTML = `Sonnenuntergang: <br><span>${sunset}</span>`;
					outputDiv.appendChild(sunsetOutput);

					weatherOutput.appendChild(outputDiv);

					setTimeout(function () {
						preloader.style.opacity = "0";
					}, 2000);
					setTimeout(function () {
						document.querySelector(".wrapper").appendChild(weatherOutput);
						document.querySelector("#get-city").value = "";
					}, 2500);
				});
		})
		.catch(err => {
			console.log("Fehler: ", err);
		});
});
