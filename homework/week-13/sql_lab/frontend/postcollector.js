
const form = document.getElementById("collector-form");

postCollector = async (event) => {
    event.preventDefault();

    const collector = initCollector();
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(collector),
    };

    try {
        const response = await fetch("http://localhost:5000/api/collectors/", fetchOptions);
        fetchCollectors();
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.log(error);
    }
}

initCollector = () => {
    let collectorName = document.getElementById("collector-name").value;
    let collectorEmail = document.getElementById("collector-email").value;
    let collectorCars = document.getElementById("collector-cars").value;
    let collectorSlogan = document.getElementById("collector-slogan").value;
    let collectorTrading = document.getElementById("collector-trading").value;

    const collector = {
        name: collectorName,
        email: collectorEmail,
        cars: collectorCars,
        slogan: collectorSlogan,
        trading: collectorTrading
    }

    return collector;
}

form.addEventListener("submit", postCollector);
