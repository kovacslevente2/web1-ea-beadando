var selectedRow = null;

document.addEventListener("DOMContentLoaded", function() {
    loadTableData();
});

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
        saveTableData();
    }
}

function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("fname").value;
    formData["email"] = document.getElementById("email").value;
    formData["testsuly"] = document.getElementById("weight").value;
    formData["magassag"] = document.getElementById("height").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("bodylist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.magassag; // Swapped
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.testsuly; // Swapped
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("weight").value = selectedRow.cells[3].innerHTML; // Swapped
    document.getElementById("height").value = selectedRow.cells[2].innerHTML; // Swapped
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.magassag; // Swapped
    selectedRow.cells[3].innerHTML = formData.testsuly; // Swapped
    saveTableData();
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("bodylist").deleteRow(row.rowIndex);
        resetForm();
        saveTableData();
    }
}

function validate() {
    var isValid = true;
    if (document.getElementById("fname").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    if (document.getElementById("email").value == "") {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("emailValidationError").classList.contains("hide"))
            document.getElementById("emailValidationError").classList.add("hide");
    }
    if (document.getElementById("height").value == "") {
        isValid = false;
        document.getElementById("heightValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("heightValidationError").classList.contains("hide"))
            document.getElementById("heightValidationError").classList.add("hide");
    }
    if (document.getElementById("weight").value == "") {
        isValid = false;
        document.getElementById("weightValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("weightValidationError").classList.contains("hide"))
            document.getElementById("weightValidationError").classList.add("hide");
    }
    return isValid;
}

function sortTable(columnIndex) {
    var table = document.getElementById("bodylist");
    var rows = Array.from(table.rows).slice(1); // Skip the header row
    var isAscending = table.getAttribute("data-sort-order") === "asc";
    
    rows.sort(function(rowA, rowB) {
        var cellA = rowA.cells[columnIndex].innerText.toLowerCase();
        var cellB = rowB.cells[columnIndex].innerText.toLowerCase();
        
        if (cellA < cellB) return isAscending ? -1 : 1;
        if (cellA > cellB) return isAscending ? 1 : -1;
        return 0;
    });

    rows.forEach(function(row) {
        table.tBodies[0].appendChild(row);
    });

    table.setAttribute("data-sort-order", isAscending ? "desc" : "asc");
}

function filterTable() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    var table = document.getElementById("bodylist");
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var match = false;
        for (var j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().indexOf(filter) > -1) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}

function saveTableData() {
    var table = document.getElementById("bodylist").getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    var data = [];
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var rowData = {
            name: cells[0].innerText,
            email: cells[1].innerText,
            magassag: cells[2].innerText,
            testsuly: cells[3].innerText
        };
        data.push(rowData);
    }
    localStorage.setItem('tableData', JSON.stringify(data));
}

function loadTableData() {
    var data = JSON.parse(localStorage.getItem('tableData')) || [];
    data.forEach(function(rowData) {
        insertNewRecord(rowData);
    });
}

// Add event listeners to header cells for sorting
document.querySelectorAll("#bodylist th").forEach(function(headerCell, index) {
    headerCell.addEventListener("click", function() {
        sortTable(index);
    });
});