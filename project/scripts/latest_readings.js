const fetchWeatherData = async() => {
    try {
        const response = await fetch("https://webapi19sa-1.course.tamk.cloud/v1/weather/limit/50");
        const jsonData = await response.json();
        populateTables(jsonData);
    } catch (error) {
        console.log(error);
    }
}

const populateTables = (weatherData) => {
    const tableBody = document.getElementById("tableBody");

    weatherData.map(item => {
        const row = document.createElement("tr");

        const signalColumn = document.createElement("td");
        const dateColumn = document.createElement("td");
        const timeColumn = document.createElement("td");
        const valueColumn = document.createElement("td");

        for (let key in item.data) {
            signalColumn.innerHTML = key;
            valueColumn.innerHTML = item.data[key].toFixed(2); 
        }

        let date = new Date(item.date_time);
        dateColumn.innerHTML = date.toLocaleDateString("en-us");
        timeColumn.innerHTML = date.toLocaleTimeString("en-us");

        row.appendChild(signalColumn);
        row.appendChild(dateColumn);
        row.appendChild(timeColumn);
        row.appendChild(valueColumn);

        tableBody.appendChild(row);
    });
}

fetchWeatherData();