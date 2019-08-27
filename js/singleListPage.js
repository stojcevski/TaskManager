
(function() {
    var urlParams = new URLSearchParams(window.location.search);

    document.addEventListener("DOMContentLoaded", function(){
        switch (urlParams.get('type')) {
            case 'details':
                document.getElementById("header").innerHTML = "List Detals";

            break;
            case 'new':
                document.getElementById("header").innerHTML = "New List";

            break;
        }
    });
})();

