
/*==================================================================================*/
/* Fill lists table before Lists page is presented
/*==================================================================================*/
;(function() {
    //After document is ready
    document.addEventListener("DOMContentLoaded", function(){

        //Check browser WebStorage support
        if (typeof(Storage) !== "undefined") {

            if(localStorage.getItem("lists") != null) {

                // Retrieve local storage
                var lists = JSON.parse(localStorage.getItem("lists"));


                for (var i = 0; i < lists.length; i++) {

                    appendListRow(lists[i], i);
                }
            }

        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    });
})();


/*==================================================================================*/
//Appends row in Lists Table
/*==================================================================================*/
function appendListRow(list, listNo) {


    //Get html of temp row
    var html = document.getElementsByClassName("templateRow")[0];
    //Get the el of the table before which rows will be appended
    var table = document.getElementById("addList");
    //Create copy of html el
    var newRow = html.cloneNode(true);
    var progress = 0;

    newRow.setAttribute("data", listNo);
    newRow.removeAttribute("hidden");

    //Insert column values in the row
    newRow.getElementsByClassName("listNameRow")[0].textContent = list[0];
    newRow.getElementsByClassName("listCatRow")[0].textContent = list[1];


    var tasks = list[3];
    var completedTasks = 0;

    if(tasks != null) {
        for (var i = 0; i < tasks.length; i++) {

            var task = tasks[i];

            if(task[2] == "Completed") {
                completedTasks += 1;
            }
        }

        progress = ((completedTasks/tasks.length) * 100).toFixed(0);
    }



    newRow.getElementsByClassName("listProgressRow")[0].textContent = progress;

    //Append new List row
    table.insertAdjacentHTML("beforebegin", newRow.outerHTML);
}

/*==================================================================================*/
//Opens New List or List Details Page
/*==================================================================================*/

function openSingleListPage(type, elem) {

    var listsCount = document.getElementsByClassName("listRow").length;

    if(elem != undefined) {
        var elementNo = elem.parentNode.getAttribute("data");
    }


    switch (type) {
        case 'details':
            document.location.href = "singleListPage.html?type="+type+"&no="+elementNo;
        break;
        case 'new':
            if(listsCount >= 5) {
                alert("You can add up to 5 lists!");
            }
            else {
                document.location.href = "singleListPage.html?type="+type;
            }
        break;
    }
}

/*==================================================================================*/
//Removes list from table and local storage
/*==================================================================================*/

function removeList(elem) {

    //Get element/row number
    var elementNo = elem.parentNode.getAttribute("data");

    //Check browser WebStorage support
    if (typeof(Storage) !== "undefined") {

        if(localStorage.getItem("lists") != null) {

            // Retrieve local storage
            var lists = JSON.parse(localStorage.getItem("lists"));

            lists.splice(elementNo, 1);

            localStorage.setItem("lists", JSON.stringify(lists));

            location.reload();
        }

    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}