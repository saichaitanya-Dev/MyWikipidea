let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //Create Resut Item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("search-results");
    searchResultsEl.appendChild(resultItemEl);
    //Create Title Element
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);
    //create brake Element
    let brakeEl = document.createElement("br");
    resultItemEl.appendChild(brakeEl);
    //create URL Element
    let resultUrlEl = document.createElement("a");
    resultUrlEl.href = link;
    resultUrlEl.target = "_blank";
    resultUrlEl.textContent = link;
    resultUrlEl.classList.add("result-url");
    resultItemEl.appendChild(resultUrlEl);
    //create Brake Element
    let lbrakeEl = document.createElement("br");
    resultItemEl.appendChild(lbrakeEl);
    //creating Description Element
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(search_results) {
    spinner.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let {
                    search_results
                } = data;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);