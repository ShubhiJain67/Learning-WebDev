//-----------------------------------------------------------------------------------------//
//                   To display all the Notes that are added previously                    //
//-----------------------------------------------------------------------------------------//

showNotes();


//-----------------------------------------------------------------------------------------//
//                                    Adding Note popup                                    //
//-----------------------------------------------------------------------------------------//

addNotePopup = document.getElementById("add-note-popup");
addNotePopup.addEventListener("click",function(e){
  // console.log("Add Note Triggered");
  let addNoteModal = document.getElementById("add-note-modal");
  addNoteModal.style.display = "block";
});


//-----------------------------------------------------------------------------------------//
//                                   Closing Note popup                                    //
//-----------------------------------------------------------------------------------------//

cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", function(e){
  // console.log("Cancel Fired");
  document.getElementById("add-note-modal").style.display = "none";
});


//-----------------------------------------------------------------------------------------//
//                             Adding Note to the localStorage                             //
//-----------------------------------------------------------------------------------------//

let addNoteBtn = document.getElementById("add-note-btn");
addNoteBtn.addEventListener("click", function (e) {
    let addNote = document.getElementById("add-note");
    let addTitle = document.getElementById("add-title");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addNote.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addNote.value = "";
    addTitle.value = "";
    // console.log("Added a New Note");
    document.getElementById("add-note-modal").style.display = "none";
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
                        <h5 id="title-${index + 1}" class="card-title">${element.title}</h5>
                        <p id="note-${index + 1}" class="card-text"> ${element.text}</p>
                        <button id="delete-${index + 1}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                        <button  id="star-${index + 1}" onclick="starNote(this.id)" class="btn btn-primary">Star</button>
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
  index = index.substring(index.lastIndexOf("-")+1, index.length);
    if (confirm("Are you sure you want to delete it?")) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        // console.log("Deleted Card ID-", index);
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
  index = index.substring(index.lastIndexOf("-")+1, index.length);
    let mycard = document.getElementById(index);
    if (!mycard.classList.contains("bg-warning")) {
        // console.log("Starred Card ID-", index);
        mycard.classList.add("border-dark");
        mycard.classList.add("bg-warning");
        mycard.getElementsByTagName("button")[1].innerText = "Unstar";
    }
    else {
        // console.log("Unstarred Card ID", index);
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
let checkListItem = document.getElementsByClassName("check-list-item")[0];
checkListItem.addEventListener("click",function(e){
  console.log("Entered");
   if(checkListItem.classList.contains("checked")){
     checkListItem.classList.remove("checked");
     console.log("Removed Checked");
   }else{
    checkListItem.classList.add("checked");
    console.log("Added Checked");
   }
});
