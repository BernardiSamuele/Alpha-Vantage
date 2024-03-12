function getGlobalQuotes(symbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    $.getJSON(url,
        (data) => {
            const listCompany = document.getElementById("listCompany")
            console.log(data)
            loadDataInTable(data["Global Quote"])
        })
}

function getSymbolAutocompletePrompts(text) {
    if (text == "") {
        return
    }
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${API_KEY}`
    const _autocompleteList = document.getElementById("autocomplete-list")
    _autocompleteList.innerHTML = ""
    $.getJSON(url, (data) => {
        console.log(data)
        data["bestMatches"].forEach(element => {
            const _div = document.createElement("div")
            _div.innerHTML = `<b>${element["2. name"]}</b> - ${element["1. symbol"]}`
            _div.symbol = element["1. symbol"]
            _div.company = element["2. name"]
            _autocompleteList.append(_div)
            _div.addEventListener("click", function () {
                getGlobalQuotes(this.symbol)
                document.getElementById("txtAutocomplete").innerHTML = this.company
                document.getElementById("autocomplete-list").innerHTML = ""
            })
        })
    })
}

function loadDataInTable(globalQuoteData) {
    console.log("Global Quote Data", globalQuoteData)
    document.getElementById("companyField").textContent = listCompany.querySelectorAll("option")[listCompany.selectedIndex].textContent
    document.getElementById("symbolField").textContent = globalQuoteData["01. symbol"]
    document.getElementById("openField").textContent = globalQuoteData["02. open"]
    document.getElementById("highField").textContent = globalQuoteData["03. high"]
    document.getElementById("lowField").textContent = globalQuoteData["04. low"]
    // document.getElementById("").textContent = globalQuoteData["05. price"]
    document.getElementById("volumeField").textContent = globalQuoteData["06. volume"]
    document.getElementById("latestTraringDayField").textContent = globalQuoteData["07. latest trading day"]
    document.getElementById("previousCloseField").textContent = globalQuoteData["08. previous close"]
    document.getElementById("changeField").textContent = globalQuoteData["09. change"]
}