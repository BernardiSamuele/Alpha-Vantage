function getGlobalQuotes(symbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    $.getJSON(url,
        function (data) {
            const listCompany = document.getElementById("listCompany")
            console.log(data)
            const globalQuoteData = data["Global Quote"]
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
        })
}