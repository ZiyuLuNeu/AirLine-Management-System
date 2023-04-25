import {useEffect, useState} from "react";
import {checkLogin, getLoginUser} from "../services/loginService";
import sendRequest from "../services/ApiService";

function MainPage() {

    const fetchCities = async () => {
        const data = await sendRequest({
            path: 'airports/all',
            port: '8088', // city port
            server: 'cities'
        })
        console.log(data)

        const airports = data.data;

        // Get the dropdown list element
        const dropdown = document.getElementById("from");

        // Loop through each airport and add it to the dropdown as an option
        airports.forEach(airport => {
            const option = document.createElement("option");
            option.text = `${airport.icao} - ${airport.name}, ${airport.city}, ${airport.state} (${airport.iata === "" ? "N/A" : airport.iata})`;
            dropdown.add(option);
        });

        const dropdownTo = document.getElementById("to");

        // Loop through each airport and add it to the dropdown as an option
        airports.forEach(airport => {
            const option = document.createElement("option");
            option.text = `${airport.icao} - ${airport.name}, ${airport.city}, ${airport.state} (${airport.iata === "" ? "N/A" : airport.iata})`;
            dropdownTo.add(option);
        });
    }

    const searchAirports = async ({city, airport, element}) => {
        const data = await sendRequest({
            path: 'airports/search',
            method: 'POST',
            port: '8088', // city port
            server: 'cities',
            body: {
                city: city,
                airport: airport
            }
        })
        console.log(data)

        const airports = data.data;

        // Get the dropdown list element
        const dropdown = document.getElementById(element);

        while (dropdown.options.length > 1) {
            dropdown.removeChild(dropdown.lastChild);
        }

        // Loop through each airport and add it to the dropdown as an option
        airports.forEach(airport => {
            const option = document.createElement("option");
            option.text = `${airport.icao} - ${airport.name}, ${airport.city}, ${airport.state} (${airport.iata === "" ? "N/A" : airport.iata})`;
            dropdown.add(option);
        });

    }


    const [fromCity, setFromCity] = useState("");
    const [fromAirport, setFromAirport] = useState("");
    const [toCity, setToCity] = useState("");
    const [toAirport, setToAirport] = useState("");

    const findFromCity = () => {
        searchAirports({
            city: fromCity,
            airport: "",
            element: "from"
        });
    }

    const findFromAirport = () => {
        searchAirports({
            city: "",
            airport: fromAirport,
            element: "from"
        });
    }

    const findToCity = () => {
        searchAirports({
            city: toCity,
            airport: "",
            element: "to"
        });
    }

    const findToAirport = () => {
        searchAirports({
            city: "",
            airport: toAirport,
            element: "to"
        });
    }

    const [greeting, setGreeting] = useState("Hello, you are viewing as guest, would you like to login?");

    useEffect(() => {
        if (checkLogin()) {
            setGreeting("Welcome, " + getLoginUser()["fname"]);
        } else {
            setGreeting("Hello, you are viewing as guest, would you like to login?");
        }
    }, [checkLogin]);

    useEffect(() => {
        fetchCities();
    }, [])

    return (
        <div>
            <main>
                <section>
                    <h2>Flights Search</h2>
                    <p>{greeting}</p>
                    <label htmlFor="from">From:</label>
                    <div className="search-hint-container">

                        <input type="text" id="from-airport-hint" onChange={(e) => {setFromCity(e.target.value)}} name="from-airport-hint"/>
                        <button onClick={findFromCity}>Find City</button>

                        <input type="text" id="from-city-hint"  onChange={(e) => {setFromAirport(e.target.value)}}  name="from-city-hint"/>
                        <button onClick={findFromAirport}>Find Airport</button>
                    </div>
                    <select id="from" name="from">
                        <option value="">Select an airport</option>
                    </select>
                    <label htmlFor="to">To:</label>
                    <div className="search-hint-container">

                        <input type="text" id="to-airport-hint" onChange={(e) => {setToCity(e.target.value)}} name="to-airport-hint"/>
                        <button onClick={findToCity}>Find City</button>

                        <input type="text" id="to-city-hint"  onChange={(e) => {setToAirport(e.target.value)}}  name="to-city-hint"/>
                        <button onClick={findToAirport}>Find Airport</button>
                    </div>
                    <select id="to" name="to">
                        <option value="">Select an airport</option>
                    </select>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date"/>
                    <input type="submit" value="Search Flights"/>

                </section>
            </main>

        </div>
    );
}

export default MainPage;