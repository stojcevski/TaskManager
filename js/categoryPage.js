
;(function() {
    document.addEventListener("DOMContentLoaded", function(){
        if (typeof(Storage) !== "undefined") {

            // Retrieve local storage
            var categories = JSON.parse(localStorage.getItem("categories"));

            console.log(categories);
            for (var i = 0; i < categories.length; i++) {

                appendCategoryRow(categories[i], i);
            }

        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    });
})();

function appendCategoryRow(category, i) {
    var html = document.getElementById("rowTmp");

    var table = document.getElementById("categoriesLists");

    table.insertBefore(html, table.childNodes[i]);
}

function showCategoryWrapper() {
    document.getElementById("categoryWrapper").style.display = "flex";
}

function submitCategory() {

    var categoryInput = document.getElementById("categoryInputField").value;
    var localStorageCategories = localStorage.getItem("categories");
    var categories = [];
    //localStorage.setItem("categories", null);

    if(categoryInput != '') {
        if (typeof(Storage) !== "undefined") {
            //Store LocalStorage
            if(localStorageCategories == "null") {
                categories.push(categoryInput);
                localStorage.setItem("categories", JSON.stringify(categories));
            } else {
                categories = JSON.parse(localStorageCategories);
                categories.push(categoryInput);
                localStorage.setItem("categories", JSON.stringify(categories));
            }
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
        document.getElementById("categoryInputField").value = "";
        document.getElementById("categoryWrapper").style.display = "none";
    } else {
        alert("Category name cannot be empty!");
    }
}

function cancelCategory() {
    document.getElementById("categoryInputField").value = "";
    document.getElementById("categoryWrapper").style.display = "none";
}