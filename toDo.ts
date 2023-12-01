document.addEventListener("DOMContentLoaded", () => {
    // Select add buttons
    const selectAddButton = document.getElementById("addToDo");
    // console.log(selectAddButton);
    selectAddButton.addEventListener("click", (event) => {
        event.preventDefault();
        addToDoToTable()
        resetToDoInputFieldAfterAddingToList();
        // Select delete buttons
        const selectDeleteButtons = document.getElementsByClassName("deleteButton") as HTMLCollectionOf<HTMLTableCellElement>;
        console.log(selectDeleteButtons);
        // TODO Suggestion how to fix type any
        for (const selectDeleteButton of selectDeleteButtons) {
            selectDeleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                // console.log(selectDeleteButton);
                removeToDoFromTable(selectDeleteButton);
            })
        }
        const selectEditButtons = document.getElementsByClassName("editButton") as HTMLCollectionOf<HTMLTableCellElement>;
        console.log(selectEditButtons);
        // TODO Suggestions how to fix type
        for (const selectEditButton of selectEditButtons) {
            selectEditButton.addEventListener("click", (event) => {
                event.preventDefault();
                editToDo(selectEditButton);
            } )
        }
    })
})





function isValidToDo() : boolean {
    return (document.getElementById("toDoInput")as HTMLInputElement).value.trim() != "";
}


function addToDoToTable() {
    if (isValidToDo()) {
        // Get the value of the to-do input field and the status input field
        const getToDo = (document.getElementById("toDoInput") as HTMLInputElement).value;

        // Select the tbody element of the table
        const tbodyElement = document.querySelector("table>tbody");

        // Create a new table row and append to the table body as child item
        const trCreate = document.createElement("tr");
        tbodyElement.appendChild(trCreate);


        // Create the table data cells (<td>) and set its content
        // to-do cells
        const tdToDoElement = document.createElement("td");
        tdToDoElement.id = "toDoName";
        tdToDoElement.textContent = getToDo;
        trCreate.append(tdToDoElement);

        // status cells
        const tdToDoStatus = document.createElement("td");
        tdToDoStatus.textContent = "ToDo";
        trCreate.append(tdToDoStatus)

        // edit cells
        const tdEdit = document.createElement("td");
        tdEdit.className = "d-flex justify-content-center";
        trCreate.append(tdEdit);

        // create buttons
        // done button
        const createDoneButton = document.createElement("button");
        createDoneButton.className = "btn btn-success w-100";
        createDoneButton.textContent = "Done";

        // edit button
        const createEditButton = document.createElement("button");
        createEditButton.className = "btn btn-warning w-100 editButton";

        // adds modal functionality to all buttons
        createEditButton.setAttribute("data-bs-target", "#openModalForEditing");
        createEditButton.setAttribute("data-bs-toggle", "modal");

        createEditButton.textContent = "Edit";

        // delete button
        const createDeleteButton = document.createElement("button");
        createDeleteButton.className = "btn btn-danger w-100 deleteButton";
        createDeleteButton.textContent = "Delete";

        // add button as child elements inside the edit cells
        tdEdit.appendChild(createDoneButton);
        tdEdit.appendChild(createEditButton);
        tdEdit.appendChild(createDeleteButton);
    }
}

function resetToDoInputFieldAfterAddingToList() {
    const selectToDoInputField = document.getElementById("toDoInput") as HTMLInputElement;
    selectToDoInputField.value = "";
}



function removeToDoFromTable(selectDeleteButton : any) {
    const selectClosestTableRow = selectDeleteButton.closest("tr");
    selectClosestTableRow.remove();
}


function editToDo(selectEditButton: Element) {
    let selectClosestToDoValue = selectEditButton.closest("tr").querySelector("#toDoName").textContent;

    const selectModalInput = document.getElementById("toDo") as HTMLInputElement;
    // Reset modal input field
    selectModalInput.value = "";
    selectModalInput.setAttribute("placeholder", selectClosestToDoValue);

    const selectSaveChangesButton = document.getElementById("saveChanges");
    selectSaveChangesButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Update to-do-name with modal input to-do-name
        selectClosestToDoValue = selectModalInput.value;

        // update to-do-element in the table
        const toDoNameElement = selectEditButton.closest("tr").querySelector("#toDoName");
        toDoNameElement.textContent = selectClosestToDoValue;
    });
}
