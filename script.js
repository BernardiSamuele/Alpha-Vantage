const API_KEY = "3GFAI4VS0CGCGTJY"
const DEMO_API_KEY = "3GFAI4VS0CGCGTJY"

window.onload = async () => {
    await loadGoogleMaps()
    const geocoder = new google.maps.Geocoder()
    jQuery.noConflict()
    document.getElementById("listCompany").addEventListener("change", function () {
        currentCompany = this.querySelectorAll("option")[this.selectedIndex].textContent
        getGlobalQuotes(this.value)
    })
    document.getElementById("txtAutocomplete").addEventListener("input", function () {
        getSymbolAutocompletePrompts(this.value)
    })
    const inputYear = document.getElementById("inputYear")
    inputYear.value = new Date().getFullYear()
    const buttonYear = document.getElementById("buttonYear")
    buttonYear.addEventListener("click", () => {
        let companySymbol = document.getElementById("symbolField").innerHTML
        if(companySymbol == 0){
            companySymbol = "MSFT"
        }
        getMonthlyData(companySymbol, inputYear.value)
    })
    const swapChartButton = document.getElementById("swapChart").addEventListener("click", ()=>{
        chartType = chartType === "line" ? "bar" : "line"
        buttonYear.dispatchEvent(new CustomEvent("click"))
    })
    buttonYear.dispatchEvent(new CustomEvent("click"))
    const buttonLocation = document.getElementById("buttonLocation")
    buttonLocation.addEventListener("click", () => {
        const COMPANY_SYMBOL = document.getElementById("symbolField").innerHTML
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${COMPANY_SYMBOL}&apikey=${DEMO_API_KEY}`
        $.getJSON(url, (data) => {
            geocoder.geocode({ address: data["Address"] }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    showMap(data["Symbol"], results[0]["geometry"]["location"])
                }
                else {
                    Swal.fire({
                        title: "<b>An error occoured during map API loading</b>",
                        icon: "error",
                        width: "400px",
                        background: "#fff"
                    })
                }
            })
        })
    })

    const listCompany = document.getElementById("listCompany")
    currentCompany = listCompany.querySelectorAll("option")[listCompany.selectedIndex].textContent
    getGlobalQuotes(document.getElementById("listCompany").value)
}