window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
            let crd = position.coords;
            long = crd.longitude;
            lat = crd.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=d9573281a53d3e74f57a5bb88cf4e201`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    locationTimezone.textContent = data['sys']['country'] + ' / ' + data['name'];
                    temperatureDegree.textContent = Math.round(data['main']['temp']);
                    temperatureDescription.textContent = data['weather'][0]['description'];
                    let icon = data['weather'][0]['icon'];
                    let img = document.createElement('img');
                    img.setAttribute('src', `https://openweathermap.org/img/wn/${icon}@4x.png`);
                    img.setAttribute('alt', 'weatherIcon');
                    weatherIcon.appendChild(img);
                });
        });
    }
});