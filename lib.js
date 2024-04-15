let currentCompany = ""
let chart
let chartType = "bar"

function getGlobalQuotes(symbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${DEMO_API_KEY}`
    $.getJSON(url,
        (data) => {
            if (data["Global Quote"] == null) {
                document.querySelector(".errorDisplay").style.display = "block"
                listCompany.selectedIndex = -1
                return
            }
            document.querySelector(".errorDisplay").style.display = "none"
            loadDataInTable(data["Global Quote"])
        })
}

function getSymbolAutocompletePrompts(text) {
    if (text.length < 2) {
        return
    }
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${DEMO_API_KEY}`
    const _autocompleteList = document.getElementById("autocomplete-list")
    _autocompleteList.innerHTML = ""
    $.getJSON(url, (data) => {
        data["bestMatches"].forEach(element => {
            const _div = document.createElement("div")
            _div.innerHTML = `<b>${element["2. name"]}</b> - ${element["1. symbol"]}`
            _div.symbol = element["1. symbol"]
            _div.company = element["2. name"]
            _autocompleteList.append(_div)
            _div.addEventListener("click", function () {
                currentCompany = this.company
                getGlobalQuotes(this.symbol)
                document.getElementById("txtAutocomplete").value = this.company
                document.getElementById("autocomplete-list").innerHTML = ""
            })
        })
    })
}

function getMonthlyData(companySymbol, year) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${companySymbol}&apikey=${DEMO_API_KEY}`
    $.getJSON(url, (data) => {
        $.getJSON(`http://localhost:3000/${chartType}`, (chartOptions) => {
            const canvas = document.querySelector("canvas")
            const monthlyData = []
            const montlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            for (const key in data["Monthly Time Series"]) {
                if (key.substring(0, 4) == year) {
                    monthlyData.push(data["Monthly Time Series"][key]["4. close"])
                }
                else if (key.substring(0, 4) < year) {
                    break
                }
            }
            if (monthlyData.length == 0) {
                Swal.fire({
                    title: "<b>Error! Couldn't find any data for the selected year.</b>",
                    icon: "error",
                    width: "400px",
                    background: "#fff"
                })
                return
            }
            monthlyData.reverse()
            chartOptions["data"]["datasets"][0]["data"] = monthlyData
            chartOptions["data"]["labels"] = montlyLabels.slice(0, monthlyData.length)
            chartOptions["options"]["plugins"]["title"]["text"] += year
            chartOptions["data"]["datasets"][0]["barThickness"] = window.innerWidth / 18
            if (chart) {
                chart.destroy()
            }
            chart = new Chart(canvas, chartOptions)
        })
    })
}

function loadDataInTable(globalQuoteData) {
    document.getElementById("companyField").textContent = currentCompany
    document.getElementById("symbolField").textContent = globalQuoteData["01. symbol"]
    document.getElementById("openField").textContent = globalQuoteData["02. open"]
    document.getElementById("highField").textContent = globalQuoteData["03. high"]
    document.getElementById("lowField").textContent = globalQuoteData["04. low"]
    document.getElementById("priceField").textContent = globalQuoteData["05. price"]
    document.getElementById("volumeField").textContent = globalQuoteData["06. volume"]
    document.getElementById("latestTraringDayField").textContent = globalQuoteData["07. latest trading day"]
    document.getElementById("previousCloseField").textContent = globalQuoteData["08. previous close"]
    document.getElementById("changeField").textContent = globalQuoteData["09. change"]
}

function showMap(symbol, position){
    const mapContainer = document.createElement("div")
    mapContainer.style.width = "100%"
    mapContainer.style.height = "400px"
    const html = document.createElement("div")
    let mapOptions = {
        "center":position,
		"zoom":16,
		"mapTypeId":google.maps.MapTypeId.ROADMAP
    }
	const map = new google.maps.Map(mapContainer, mapOptions)
    html.appendChild(mapContainer)
    Swal.fire({
        title: `Sede ${symbol}`,
        html: mapContainer,
        width: 800,
        background: "#fff"
    })
}

const MAPS_URL = "https://maps.googleapis.com/maps/api/js"
function loadGoogleMaps() {
	let promise = new Promise(function (resolve, reject) {
		const script = document.createElement("script")
		script.type = "application/javascript"
		script.src = `${MAPS_URL}?v=3&key=${MAP_KEY}`
		document.body.appendChild(script)
		script.onerror = function (err) {
			console.log("An error occoured during map API loading")
			reject(err)
		}
		script.onload = function () {
			resolve()
		}
	})
	return promise
}
