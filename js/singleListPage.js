
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

            var numOfTags = document.getElementById("tagsDropdown").options.length;

            if(listTags != null) {
                for (var i = 0; i < listTags.length; i++) {
                    for (var j = 0; j < numOfTags; j++) {
                        if (document.getElementById("tagsDropdown")[j].value == listTags [i]) {
                            document.getElementById("tagsDropdown")[j].selected = true;
                        }
                    }
                }
            }


             if(listTasks != null) {
                 for (var i = 0; i < listTasks.length; i++) {
                     var task = listTasks[i];
                     if(task[2] == "Completed") {
                         appendTaskRow(task[0], task[2], "green", i);
                     } else {
                         appendTaskRow(task[0], task[2], "red", i);
                     }

                 }
             }
        }

    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function showAddTaskWrapper(type, element) {
    var taskWrapper = document.getElementById("taskWrapper");
    var listNumber = new URLSearchParams(window.location.search).get('no');

    switch (type) {
        case 'details':
            var elementNo = element.parentNode.getAttribute("data");
            fillAddTaskWrapper(listNumber, elementNo);
            document.getElementById("submitTaskBtn").setAttribute('data', 'details');
            break;
        case 'new':
            document.getElementById("submitTaskBtn").setAttribute('data', 'new');
            break;
    }

    taskWrapper.style.display = "block";
}

function fillAddTaskWrapper(listNumber, elNumber) {

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

        switch (document.getElementById("submitTaskBtn").getAttribute('data')) {
            case 'details':
                if (taskState == "Completed") {
                    appendTaskRow(taskName, taskState, "green");
                } else {
                    appendTaskRow(taskName, taskState, "red");
                }
                break;
            case 'new':
                appendTaskRow(taskName, taskState, "grey");
                break;

        }
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



    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function appendTaskRow(taskName, taskState, color, taskNo) {
    //Get html of temp row
    var html = document.getElementsByClassName("templateRow")[0];
    //Get the el of the table before which rows will be appended
    var table = document.getElementById("addList");

    //Insert Task name and State in the row
    html.getElementsByClassName("taskNameRow")[0].textContent = taskName;
    html.getElementsByClassName("taskStateRow")[0].textContent = taskState;

    //Set Task color
    html.getElementsByClassName("painted")[0].setAttribute("style", "background-color: "+color);
    html.getElementsByClassName("painted")[1].setAttribute("style", "background-color: "+color);

    //Append new Category row
    table.insertAdjacentHTML("beforebegin", html.innerHTML);

    //ReSet Task color of template row
    html.getElementsByClassName("painted")[0].removeAttribute("style");
    html.getElementsByClassName("painted")[1].removeAttribute("style");
}

function cancelTask() {
    document.getElementById("taskNameInput").value = "";
    document.getElementById("taskDescInput").value = "";
    document.getElementById("taskStateInput").value = "";
    document.getElementById("submitTaskBtn").removeAttribute('data');
    document.getElementById("taskWrapper").style.display = "none";
}

function submitList() {

    var listName = document.getElementById("listNameInput").value;
    var listCategory = document.getElementById("categoriesDropdown").value;
    var listTagsSelect = document.getElementById("tagsDropdown");
    var listTags = [];

    if (listTagsSelect.value != undefined) {
            for (var i = 0; i < listTagsSelect.options.length; i++) {
                if(listTagsSelect.options[i].selected) {
                    listTags.push(listTagsSelect.options[i].value);
                }
            }
    }

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


                list[listId][0] = listName;
                list[listId][1] = listCategory;
                list[listId][2] = listTags;

                if (newTasks != null) {
                    //list[listId][3] = list[listId][3].concat(newTasks);
                    if(list[listId][3] != null) {
                        list[listId][3] = list[listId][3].concat(newTasks);
                    } else {
                        list[listId][3] = newTasks;
                    }

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
