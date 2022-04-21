const fetchWeatherData = async (timeSpan) => {
    try {
        const response = await fetch(`http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/${timeSpan}`);
        const jsonData = await response.json();
        loadingAnim.style.visibility = "hidden";
        populateTables(jsonData);
        drawChart(jsonData);

    } catch (error) {
        console.log(error);
    }
}

const populateTables = (weatherData) => {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    weatherData.map(item => {
        const row = document.createElement("tr");

        const dateColumn = document.createElement("td");
        const timeColumn = document.createElement("td");
        const valueColumn = document.createElement("td");

        valueColumn.innerHTML = parseFloat(item.temperature).toFixed(2);

        let date = new Date(item.date_time);
        dateColumn.innerHTML = date.toLocaleDateString("en-us");
        timeColumn.innerHTML = date.toLocaleTimeString("en-US");

        row.appendChild(dateColumn);
        row.appendChild(timeColumn);
        row.appendChild(valueColumn);

        tableBody.appendChild(row);
    });
}

const drawChart = (data) => {

    let dates = [];
    let values = [];
    for (var i = 0; i < data.length; i++) {
        dates[i] = new Date(data[i].date_time).toLocaleString("en-us");
        values[i] = data[i].temperature;
    }
    const chart = Chart.getChart("myChart");

    if (chart != undefined) {
        chart.destroy();
    }

    new Chart("myChart", {
        type: "line",
        data: {
            datasets: [{
                backgroundColor: "red",
                borderColor: 'red',
                data: values,
                label: "Temperature"
            }],
            labels: dates
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        maxTicksLimit: 3,
                        maxRotation: 0
                    }
                }
            },

            plugins: {
                legend: { display: true },
                title: {
                    display: false
                }

            }
        }
    });

}

const loadingAnim = document.getElementById("loading");

const selectElement = document.getElementById("timespanSelect");
selectElement.addEventListener("change", () => {
    fetchWeatherData(selectElement.value);
    loadingAnim.style.visibility = "visible";
});


fetchWeatherData(selectElement.value);