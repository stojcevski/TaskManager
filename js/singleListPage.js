
(function() {
    var urlParams = new URLSearchParams(window.location.search);

    document.addEventListener("DOMContentLoaded", function(){

        fillCategoriesTags();

        switch (urlParams.get('type')) {
            case 'details':
                document.getElementById("header").innerHTML = "List Detals";
                fillListDetails(urlParams.get('no'));
            break;
            case 'new':
                document.getElementById("header").innerHTML = "New List";

            break;
        }

    });
})();

function fillCategoriesTags() {

    //Check browser WebStorage support
    if (typeof(Storage) !== "undefined") {

        if(localStorage.getItem("categories") != null && localStorage.getItem("tags") != null) {

            // Retrieve local storage
            var categories = JSON.parse(localStorage.getItem("categories"));
            var tags = JSON.parse(localStorage.getItem("tags"));
        }

    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }

    var categoriesDropdown = document.getElementById("categoriesDropdown");
    var tagsDropdown = document.getElementById("tagsDropdown");

    categoriesDropdown.options.length = 0;
    tagsDropdown.options.length = 0;

    if(categories != null || tags != null) {
        for (var i = 0; i < categories.length; i++) {
            var newItem = document.createElement("option");
            newItem.value = categories[i];
            newItem.innerHTML = categories[i];
            categoriesDropdown.appendChild(newItem);
        }

        for (var i = 0; i < tags.length; i++) {
            var newItem = document.createElement("option");
            newItem.value = tags[i];
            newItem.innerHTML = tags[i];
            tagsDropdown.appendChild(newItem);
        }
    }
    else {
        alert("You have to create at least one Category and one Tag!");
        document.location.href = "mainPage.html";
    }
}

function fillListDetails(listNumber) {
    //Check browser WebStorage support
    if (typeof(Storage) !== "undefined") {

        if(localStorage.getItem("lists") != null) {

            // Retrieve local storage
            var lists = JSON.parse(localStorage.getItem("lists"));
            var selectedList = lists[listNumber];

            console.log(selectedList);
            var listName = selectedList[0];
            var listCategory = selectedList[1];
            var listTags = selectedList[2];
            var listTasks = selectedList[3];

            document.getElementById("listNameInput").value = listName;
            document.getElementById("categoriesDropdown").value = listCategory;
            document.getElementById("tagsDropdown").value = listTags;

             if(listTasks != null) {
                 for (var i = 0; i < listTasks.length; i++) {
                     var task = listTasks[i];
                     appendTaskRow(task[0], task[2]);
                 }
             }
        }

    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function showAddTaskWrapper() {
    document.getElementById("taskWrapper").style.display = "block";
}

function submitTask() {

    var taskName = document.getElementById("taskNameInput").value;
    var taskDesc = document.getElementById("taskDescInput").value;
    var taskState = document.getElementById("taskStateInput").value;


    if(taskName == "" || taskDesc == "" || taskState == "") {
        alert("All fields must be filled!");
    }
    else {

        putTasksWebStorage(taskName, taskDesc, taskState);
        document.getElementById("taskWrapper").style.display = "none";
        cancelTask();
    }
}

function putTasksWebStorage(taskName, taskDesc, taskState) {

    var tasks = [];
    var taskInput = [taskName, taskDesc, taskState];

    if (typeof(Storage) !== "undefined") {

        var localStorageTasks = localStorage.getItem("newTasks");

        //Store LocalStorage
        if(localStorageTasks == null || localStorageTasks == "null") {
            tasks.push(taskInput);
            localStorage.setItem("newTasks", JSON.stringify(tasks));
        } else {
            tasks = JSON.parse(localStorageTasks);
            tasks.push(taskInput);
            localStorage.setItem("newTasks", JSON.stringify(tasks));
        }

        appendTaskRow(taskName, taskState);

    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function appendTaskRow(taskName, taskState) {
    //Get html of temp row
    var html = document.getElementsByClassName("templateRow")[0];
    //Get the el of the table before which rows will be appended
    var table = document.getElementById("addList");

    //Insert Tag name in the row
    html.getElementsByClassName("taskNameRow")[0].textContent = taskName;
    html.getElementsByClassName("taskStateRow")[0].textContent = taskState;

    //Append new Category row
    table.insertAdjacentHTML("beforebegin", html.innerHTML);
}

function cancelTask() {
    document.getElementById("taskNameInput").value = "";
    document.getElementById("taskDescInput").value = "";
    document.getElementById("taskStateInput").value = "";
    document.getElementById("taskWrapper").style.display = "none";
}

function submitList() {

    var listName = document.getElementById("listNameInput").value;
    var listCategory = document.getElementById("categoriesDropdown").value;
    var listTags = document.getElementById("tagsDropdown").value;

    if(listName != "") {

        updateWebStorageLists(listName, listCategory, listTags);

        fillCategoriesTags();

        document.getElementById("listNameInput").value = "";
        document.getElementById("backToListsBtn").click();
        
    }
    else {
        alert("You have to insert List Name!");
    }
}

function updateWebStorageLists(listName, listCategory, listTags) {
    var list = [];
    var urlParams = new URLSearchParams(window.location.search);


    if (typeof(Storage) !== "undefined") {

        var localStorageNewTasks = localStorage.getItem("newTasks");
        var localStorageLists = localStorage.getItem("lists");
        var newTasks = JSON.parse(localStorageNewTasks);
        var listId = urlParams.get('no');

        switch (urlParams.get('type')) {
            case 'details':
                list = JSON.parse(localStorageLists);
                //var selectedList = list[urlParams.get('no')];

                console.log(localStorageLists[0]);
                list[listId][0] = listName;
                list[listId][1] = listCategory;
                list[listId][2] = listTags;

                if (newTasks != null) {
                    //list[listId][3] = list[listId][3].concat(newTasks);
                    list[listId][3] = list[listId][3].concat(newTasks);
                }

                localStorage.setItem("lists", JSON.stringify(list));
                break;

            case 'new':
                var listInput = [listName, listCategory, listTags, newTasks];
                //Store LocalStorage
                if(localStorageLists == null) {
                    list.push(listInput);
                    localStorage.setItem("lists", JSON.stringify(list));
                } else {
                    list = JSON.parse(localStorageLists);
                    list.push(listInput);
                    localStorage.setItem("lists", JSON.stringify(list));
                }
                break;
        }


        localStorage.removeItem("newTasks");

    }
    else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}
