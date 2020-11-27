//-----------------------------------------------------------------------------------------//
//                   To display all the Notes that are added previously                    //
//-----------------------------------------------------------------------------------------//

showNotes();


//-----------------------------------------------------------------------------------------//
//                             Adding Note to the localStorage                             //
//-----------------------------------------------------------------------------------------//

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log("Added a New Note");
    showNotes();
});


//-----------------------------------------------------------------------------------------//
//                      Function to show elements from localStorage                        //
//-----------------------------------------------------------------------------------------//

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard col-xs-12 col-md-6 col-lg-4">
                <div id="${index + 1}" class="card my-2 mx-2">
                    <div class="card-body">
                        <h5 id="${index + 1}" class="card-title">${element.title}</h5>
                        <p id="${index + 1}" class="card-text"> ${element.text}</p>
                        <button id="${index + 1}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                        <button  id="${index + 1}" onclick="starNote(this.id)" class="btn btn-primary">Star</button>
                    </div>
                </div>
            </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "New Note" section above to add notes.`;
    }
}


//-----------------------------------------------------------------------------------------//
//                                     Deleting a Note                                     //
//-----------------------------------------------------------------------------------------//

function deleteNote(index) {
    if (confirm("Are you sure you want to delet it?")) {
        console.log("Deleting Card ID-", index);
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
}


//-----------------------------------------------------------------------------------------//
//                                 Searching within Notes                                  //
//-----------------------------------------------------------------------------------------//

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardTxtTitle = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal) || cardTxtTitle.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


//-----------------------------------------------------------------------------------------//
//                                     Staring a Notes                                     //
//-----------------------------------------------------------------------------------------//
function starNote(index) {
    let mycard = document.getElementById(index);
    if (!mycard.classList.contains("bg-warning")) {
        console.log("Starred Card ID-", index);
        mycard.classList.add("border-dark");
        mycard.classList.add("bg-warning");
        mycard.getElementsByTagName("button")[1].innerText = "Unstar";
    }
    else {
        console.log("Unstarred Card ID", index);
        mycard.classList.remove("bg-warning");
        mycard.classList.remove("border-dark");
        mycard.getElementsByTagName("button")[1].innerText = "Star";
    }
}


/*
Further Features:
1. Mark a note as Important
2. Separate section
3. Recycle Bin
*/
