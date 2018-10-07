var data = [];
var from = 0;
var to = 10;
var sort = false;
var aSort = 1;
 

const url = 'http://localhost:3000/tedTalks/';

var fillTable = function (table, from, to) {
    for (var i = from; i < to; i++) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var cell3 = row.insertCell();
        var cell4 = row.insertCell();
        var cell5 = row.insertCell();
        var cell6 = row.insertCell();
        cell1.innerHTML = data[i].event;
        cell2.innerHTML = data[i].main_speaker;
        cell3.innerHTML = data[i].title;
        cell4.innerHTML = `<a href="${data[i].url}" target="_blank">Watch</a>`;
        let pDate = new Date(1000 * data[i].published_date);
        cell5.innerHTML = pDate.toLocaleDateString();
        cell6.innerHTML = data[i].views;
        
    }

}

var getFetchAsync = async function (from, to) {
    const res = await fetch(
        `${url}${from}/${to}/`);
    data = await res.json();
    var table = document.getElementById("table");
    fillTable(table, from, to)
}

var pageLoad = function () {
    sort = false;
    getFetchAsync(from, to);
}


window.onload = pageLoad;


var deleteRows = function () {
    var table = document.getElementById("table");
    for (var i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

document.getElementById("next").addEventListener("click", () => {
    var table = document.getElementById("table");
    from += 10;
    to += 10;
    console.log("Next", from, to)
    deleteRows();
    getFetchAsync(from, to);
});

document.getElementById("prev").addEventListener("click", () => {
    if (from === 0) {
        alert("You have reached the index of the list. Please click NEXT to see further")
    } else {
        var table = document.getElementById("table");
        from = from - 10;
        to -= 10;
        console.log("Prev", from, to)
        deleteRows()
        getFetchAsync(from, to);
    }
});

var sortOnViews = async function(){
    sort = true;
    
    from = 0;
    to = 10;
    const res = await fetch(
        `http://localhost:3000/tedTalks/sortView/`);
    data = await res.json();
    deleteRows();
    getFetchAsync(from, to);
}

