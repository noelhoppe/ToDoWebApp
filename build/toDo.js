document.addEventListener("DOMContentLoaded", function () {
    // Select add buttons
    var selectAddButton = document.getElementById("addToDo");
    // console.log(selectAddButton);
    selectAddButton.addEventListener("click", function (event) {
        event.preventDefault();
        addToDoToTable();
        resetToDoInputFieldAfterAddingToList();
        // Select delete buttons
        var selectDeleteButtons = document.getElementsByClassName("deleteButton");
        console.log(selectDeleteButtons);
        var _loop_1 = function (selectDeleteButton) {
            selectDeleteButton.addEventListener("click", function (event) {
                event.preventDefault();
                // console.log(selectDeleteButton);
                removeToDoFromTable(selectDeleteButton);
            });
        };
        // TODO Suggestion how to fix type any
        for (var _i = 0, selectDeleteButtons_1 = selectDeleteButtons; _i < selectDeleteButtons_1.length; _i++) {
            var selectDeleteButton = selectDeleteButtons_1[_i];
            _loop_1(selectDeleteButton);
        }
        var selectEditButtons = document.getElementsByClassName("editButton");
        console.log(selectEditButtons);
        var _loop_2 = function (selectEditButton) {
            selectEditButton.addEventListener("click", function (event) {
                // console.log("Event Handler for Editing wird mehrmals aufgerufen");
                event.preventDefault();
                editToDo(selectEditButton);
            });
        };
        // TODO Suggestions how to fix type
        for (var _a = 0, selectEditButtons_1 = selectEditButtons; _a < selectEditButtons_1.length; _a++) {
            var selectEditButton = selectEditButtons_1[_a];
            _loop_2(selectEditButton);
        }
        var selectDoneButtons = document.getElementsByClassName("doneButton");
        var _loop_3 = function (selectDoneButtonElement) {
            selectDoneButtonElement.addEventListener("click", function (event) {
                console.log("Event-Handler wird aufgerufen");
                event.preventDefault();
                changeToDoStatus(selectDoneButtonElement);
                removeToDoFromTable(selectDoneButtonElement);
                var selectDeleteButtons = document.getElementsByClassName("deleteButton");
                var _loop_4 = function (selectDeleteButton) {
                    selectDeleteButton.addEventListener("click", function (event) {
                        event.preventDefault();
                        removeToDoFromTable(selectDeleteButton);
                    });
                };
                for (var _i = 0, selectDeleteButtons_2 = selectDeleteButtons; _i < selectDeleteButtons_2.length; _i++) {
                    var selectDeleteButton = selectDeleteButtons_2[_i];
                    _loop_4(selectDeleteButton);
                }
            });
        };
        for (var _b = 0, selectDoneButtons_1 = selectDoneButtons; _b < selectDoneButtons_1.length; _b++) {
            var selectDoneButtonElement = selectDoneButtons_1[_b];
            _loop_3(selectDoneButtonElement);
        }
    });
});
function isValidToDo() {
    return document.getElementById("toDoInput").value.trim() != "";
}
function addToDoToTable() {
    if (isValidToDo()) {
        // Get the value of the to-do input field and the status input field
        var getToDo = document.getElementById("toDoInput").value;
        // Select the tbody element of the table
        var tbodyElement = document.querySelector("table>tbody");
        // Create a new table row and append to the table body as child item
        var trCreate = document.createElement("tr");
        tbodyElement.appendChild(trCreate);
        // Create the table data cells (<td>) and set its content
        // to-do cells
        var tdToDoElement = document.createElement("td");
        tdToDoElement.id = "toDoName";
        tdToDoElement.textContent = getToDo;
        trCreate.append(tdToDoElement);
        // status cells
        var tdToDoStatus = document.createElement("td");
        tdToDoStatus.textContent = "ToDo";
        trCreate.append(tdToDoStatus);
        // edit cells
        var tdEdit = document.createElement("td");
        tdEdit.className = "d-flex justify-content-center";
        trCreate.append(tdEdit);
        // create buttons
        // done button
        var createDoneButton = document.createElement("button");
        createDoneButton.className = "btn btn-success w-100 doneButton";
        createDoneButton.textContent = "Done";
        // edit button
        var createEditButton = document.createElement("button");
        createEditButton.className = "btn btn-warning w-100 editButton";
        // adds modal functionality to all buttons
        createEditButton.setAttribute("data-bs-target", "#openModalForEditing");
        createEditButton.setAttribute("data-bs-toggle", "modal");
        createEditButton.textContent = "Edit";
        // delete button
        var createDeleteButton = document.createElement("button");
        createDeleteButton.className = "btn btn-danger w-100 deleteButton";
        createDeleteButton.textContent = "Delete";
        // add button as child elements inside the edit cells
        tdEdit.appendChild(createDoneButton);
        tdEdit.appendChild(createEditButton);
        tdEdit.appendChild(createDeleteButton);
    }
}
function resetToDoInputFieldAfterAddingToList() {
    var selectToDoInputField = document.getElementById("toDoInput");
    selectToDoInputField.value = "";
}
function removeToDoFromTable(selectDeleteButton) {
    var selectClosestTableRow = selectDeleteButton.closest("tr");
    selectClosestTableRow.remove();
}
function editToDo(selectEditButton) {
    var selectClosestToDoValue = selectEditButton.closest("tr").querySelector("#toDoName").textContent;
    var selectModalInput = document.getElementById("toDo");
    // Reset modal input field
    selectModalInput.value = "";
    selectModalInput.setAttribute("placeholder", selectClosestToDoValue);
    var selectSaveChangesButton = document.getElementById("saveChanges");
    selectSaveChangesButton.addEventListener("click", function (event) {
        event.preventDefault();
        // Update to-do-name with modal input to-do-name
        selectClosestToDoValue = selectModalInput.value;
        // update to-do-element in the table
        var toDoNameElement = selectEditButton.closest("tr").querySelector("#toDoName");
        toDoNameElement.textContent = selectClosestToDoValue;
    });
}
function changeToDoStatus(selectDoneButtonElement) {
    console.log("Methodenaufruf");
    var select_tbodyFromDoneList = document.querySelector("table#doneList>tbody");
    var createNewTableRow = document.createElement("tr");
    select_tbodyFromDoneList.appendChild(createNewTableRow);
    var selectFinishedToDoValue = selectDoneButtonElement.closest("tr").querySelector("#toDoName");
    // console.log(selectFinishedToDoValue)
    var createNewTableDataElement = document.createElement("td");
    createNewTableRow.appendChild(createNewTableDataElement);
    createNewTableDataElement.textContent = selectFinishedToDoValue.textContent;
    var createNewTableDataElement2 = document.createElement("td");
    createNewTableRow.appendChild(createNewTableDataElement2);
    createNewTableDataElement2.textContent = "Done";
    var createNewTableDateElement3 = document.createElement("td");
    createNewTableRow.appendChild(createNewTableDateElement3);
    var createDeleteButton = document.createElement("button");
    createDeleteButton.className = "btn btn-danger w-100 deleteButton";
    createDeleteButton.textContent = "Delete";
    createNewTableDateElement3.appendChild(createDeleteButton);
}
//# sourceMappingURL=toDo.js.map