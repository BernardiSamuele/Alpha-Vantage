const API_KEY = "3GFAI4VS0CGCGTJY"

window.onload = () => {
    jQuery.noConflict();
    document.getElementById("listCompany").addEventListener("input", function () {
        getGlobalQuotes(this.value)
    })

    getGlobalQuotes(document.getElementById("listCompany").value)
}