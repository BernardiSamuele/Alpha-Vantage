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

    const listCompany = document.getElementById("listCompany")
    currentCompany = listCompany.querySelectorAll("option")[listCompany.selectedIndex].textContent
    getGlobalQuotes(document.getElementById("listCompany").value)
}