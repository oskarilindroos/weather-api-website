const fetchWeatherData = async (timeSpan, signal) => {
    try {
        const response = await fetch(`http://webapi19sa-1.course.tamk.cloud/v1/weather/${signal}/${timeSpan}`);
        const jsonData = await response.json();
        loadingAnim.style.visibility = "hidden";
        populateTables(jsonData, signal);
        drawChart(jsonData, signal);

    } catch (error) {
        console.log(error);
    }
}

const populateTables = (weatherData, signal) => {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    weatherData.map(item => {
        const row = document.createElement("tr");

        const dateColumn = document.createElement("td");
        const timeColumn = document.createElement("td");
        const valueColumn = document.createElement("td");

        valueColumn.innerHTML = parseFloat(item[signal]).toFixed(2);

        let date = new Date(item.date_time);
        dateColumn.innerHTML = date.toLocaleDateString("en-us");
        timeColumn.innerHTML = date.toLocaleTimeString("en-US");

        row.appendChild(dateColumn);
        row.appendChild(timeColumn);
        row.appendChild(valueColumn);

        tableBody.appendChild(row);
    });
}

const drawChart = (data, signal) => {

    let dates = [];
    let values = [];

    data.map((item, index) => {
        dates[index] = new Date(item.date_time).toLocaleString("en-us");
        values[index] = item[signal];
    })

    const chart = Chart.getChart("myChart");

    if (chart != undefined) {
        chart.destroy();
    }

    new Chart("myChart", {
        type: "line",
        data: {
            datasets: [{
                backgroundColor: "red",
                borderColor: "red",
                data: values,
                label: signal
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
const signalSelectElement = document.getElementById("signalSelect");
const timeSpanSelectElement = document.getElementById("timespanSelect");

timeSpanSelectElement.addEventListener("change", onSelect);
signalSelectElement.addEventListener("change", onSelect);

function onSelect() {
    fetchWeatherData(timeSpanSelectElement.value, signalSelectElement.value);
    loadingAnim.style.visibility = "visible";
}

fetchWeatherData(timeSpanSelectElement.value, signalSelectElement.value);