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
        const valueColumn = document.createElement("td");
        const dateColumn = document.createElement("td");
        const timeColumn = document.createElement("td");

        for (let key in item.data) {
            signalColumn.innerHTML = key;
            valueColumn.innerHTML = item.data[key].toFixed(2); 
        }

        let date = new Date(item.date_time);
        dateColumn.innerHTML = date.toLocaleDateString();
        timeColumn.innerHTML = date.toLocaleTimeString();

        row.appendChild(signalColumn);
        row.appendChild(valueColumn);
        row.appendChild(dateColumn);
        row.appendChild(timeColumn);

        tableBody.appendChild(row);
    });
}

fetchWeatherData();