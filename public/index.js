//const BASE_URL = `http://192.168.1.4:8080`
const BASE_URL = `http://localhost:8080`

function searchFunction(q, locationName) {
    fetch(`${BASE_URL}/search?q=${q}&locationName=${locationName}`)
    .then(res=>res.json())
    .then(data=>{
        let results = document.querySelector("#results")
        results.innerHTML = `
            <h1>Websites that are selling ${q} in ${locationName}</h1>
        `;
        data.data.forEach(item=>{
            results.innerHTML += `
                <a target="_blank" href="${item.formattedUrl}">
                    <div class="item-div">
                        <h3>${item.displayLink}</h3>
                    </div>
                </a>
            `
        })
        loadingFunction()
    })
}

function loadingFunction() {
    if (document.getElementById("loading-gif").style.display == "") {
        document.getElementById("loading-gif").style.display = "none"
    } else {
        document.getElementById("loading-gif").style.display = ""
    }
}

function onSearch() {
    loadingFunction()
    document.querySelector("#results").innerHTML = ""
    searchFunction(document.querySelector("#search-bar").value, document.querySelector("#location-name").value)
}

document.getElementById("loading-gif").style.display = "none"