;(function() {

    //localStorage.clear();


    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("lastname", "Smith");
        // Retrieve local storage
        console.log(localStorage.getItem("lastname"));
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }

    document.addEventListener("DOMContentLoaded", function(){

    });
})();