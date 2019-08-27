
function openSingleListPage(type) {

    var listsCount = document.getElementsByClassName("listRow").length;

    switch (type) {
        case 'details':
            document.location.href = "singleListPage.html?type="+type;
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