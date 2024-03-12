const API_KEY = "3GFAI4VS0CGCGTJY"
const DEMO_API_KEY = "demo"

window.onload = () => {
    jQuery.noConflict();
    document.getElementById("listCompany").addEventListener("change", function () {
        getGlobalQuotes(this.value)
    })
    document.getElementById("txtAutocomplete").addEventListener("input", function () {
        getSymbolAutocompletePrompts(this.value)
    })

    getGlobalQuotes(document.getElementById("listCompany").value)
}