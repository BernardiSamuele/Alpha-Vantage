const API_KEY = "3GFAI4VS0CGCGTJY"
const DEMO_API_KEY = "demo"

window.onload = () => {
    
    jQuery.noConflict();
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
        getMonthlyData(inputYear.value)
    })
    buttonYear.dispatchEvent(new CustomEvent("click"))
    const buttonLocation = document.getElementById("buttonLocation")
    buttonLocation.addEventListener("click", ()=>{
        showMap()
    })
    
    const listCompany = document.getElementById("listCompany")
    currentCompany = listCompany.querySelectorAll("option")[listCompany.selectedIndex].textContent
    getGlobalQuotes(document.getElementById("listCompany").value)
}