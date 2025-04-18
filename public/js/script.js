document.addEventListener("DOMContentLoaded", function(){
    const searchBtn = document.querySelector('.searchbtn');
    const searchBar = document.querySelector('.searchbar');
    const searchInput = document.getElementById("search_input");
    const searchClose = document.getElementById("searchclose");

    searchBtn.addEventListener("click", function() {
        searchBar.style.visibility = "visible";
        searchBar.classList.add('open');
        this.setAttribute("aria-expanded", "true");
        searchInput.focus();
    });

    searchClose.addEventListener("click", function() {
        searchBar.style.visibility = "hidden";
        searchBar.classList.remove('open');
        this.setAttribute("aria-expanded", "false");
    })
})