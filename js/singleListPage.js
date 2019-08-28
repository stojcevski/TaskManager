
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

function showAddTaskWrapper() {
    document.getElementById("taskWrapper").style.display = "flex";
    document.getElementById("addTaskBtn").disabled = true;
}

function submitTask() {
    document.getElementById("addTaskBtn").disabled = false;
    document.getElementById("taskWrapper").style.display = "none";

}

function cancelTask() {
    document.getElementById("taskWrapper").style.display = "none";
    document.getElementById("addTaskBtn").disabled = false;
}



