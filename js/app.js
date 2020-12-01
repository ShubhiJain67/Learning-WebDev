//-----------------------------------------------------------------------------------------//
//                      As soon as page Javascript is loaded on Page                       //
//-----------------------------------------------------------------------------------------//

showNotes();

//-----------------------------------------------------------------------------------------//
//                                     Add Note Section Popup                              //
//-----------------------------------------------------------------------------------------//

function addNotePops() {
    var addNotePopup = document.getElementById("add-note-modal");
    addNotePopup.style.display = "block";
}

function closePopup() {
    var addNotePopup = document.getElementById("add-note-modal");
    addNotePopup.style.display = "none";
}

function showNotes() {
    let notes = localStorage.getItem("note-card-container");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div id="note-${index}" class="col-lg-3 col-md-4 col-sm-6 col-xs-6 note-card">
                    <div id="note-card-top-${index}" class="${element.bookmark} note-card-top">
                        <div class="note-card-content">
                            <p id="note-note-${index}" class="${element.textColor}">${element.note}</p>
                        </div>
                    </div>
                    <div id="note-card-bottom-${index}" class="bg-white note-card-bottom">
                        <div style="float:right;">
                            <i id="note-b-${index}" onclick="bookmarkCard(this.id)" class="fa ${element.bookmarkIcon} btn btn-outline-primary note-card-icon"></i>
                            <i id="note-d-${index}" onclick="deleteCard(this.id)" class="fa fa-trash btn btn-outline-primary note-card-icon"></i>
                        </div>
                        <div>
                            <h3 id="note-title-${index}">${element.title}</h3>
                        </div>
                    </div>
                </div> `;
    });
    let notesElm = document.getElementById("note-card-container");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h3 class="blank-notes"> Nothing to show! Use "Add New Note" section above to add notes.</h3>`;
    }
}


//-----------------------------------------------------------------------------------------//
//                                    Adding a Card                                        //
//-----------------------------------------------------------------------------------------//

function addNote() {
    let addNote = document.getElementById("add-note");
    let addTitle = document.getElementById("add-title");
    let notes = localStorage.getItem("note-card-container");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        note: addNote.value,
        bookmark: "bg-card",
        bookmarkIcon: "fa-bookmark-o",
        textColor: "txt-black"
    }
    notesObj.push(myObj);
    localStorage.setItem("note-card-container", JSON.stringify(notesObj));
    addNote.value = "";
    addTitle.value = "";
    // console.log("Added a New Note");
    document.getElementById("add-note-modal").style.display = "none";
    showNotes();
}


//-----------------------------------------------------------------------------------------//
//                                    Bookmarking a Card                                   //
//-----------------------------------------------------------------------------------------//

function bookmarkCard(id) {
    var noteCard = document.getElementById(id);
    let notes = localStorage.getItem("note-card-container");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    id = id.substring(id.lastIndexOf("-") + 1);
    // console.log("Before "+notesObj[id].bookmark+" "+notesObj[id].bookmarkIcon);
    if (notesObj[id].bookmark == "bg-card") {
        notesObj[id].bookmark = "bg-card-booked";
        notesObj[id].bookmarkIcon = "fa-bookmark";
        notesObj[id].textColor = "txt-white";
    } else {
        notesObj[id].bookmark = "bg-card";
        notesObj[id].bookmarkIcon = "fa-bookmark-o";
        notesObj[id].textColor = "txt-black";
    }
    // console.log("After "+notesObj[id].bookmark+" "+notesObj[id].bookmarkIcon);
    localStorage.setItem("note-card-container", JSON.stringify(notesObj));
    showNotes();
    /* if (noteCard.classList.contains("fa-bookmark-o")) {
        console.log("Bookmarked", id);
        noteCard.classList.remove("fa-bookmark-o");
        noteCard.classList.add("fa-bookmark");
        document.getElementById("note-card-top"+id.slice(id.lastIndexOf("-"))).classList.remove("bg-card");
        document.getElementById("note-card-top"+id.slice(id.lastIndexOf("-"))).classList.add("bg-card-booked");
    }
    else {
        console.log("Unbookmarked", id);
        noteCard.classList.remove("fa-bookmark");
        noteCard.classList.add("fa-bookmark-o");
        document.getElementById("note-card-top"+id.slice(id.lastIndexOf("-"))).classList.remove("bg-card-booked");
        document.getElementById("note-card-top"+id.slice(id.lastIndexOf("-"))).classList.add("bg-card");
    // } */
}


//-----------------------------------------------------------------------------------------//
//                                    Deleting a Card                                      //
//-----------------------------------------------------------------------------------------//

function deleteCard(id) {
    var noteCard = document.getElementById("note" + id.slice(id.lastIndexOf("-")));
    let notes = localStorage.getItem("note-card-container");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    id = id.substring(id.lastIndexOf("-") + 1);
    notesObj.splice(id, 1);
    if (confirm("Are you sure you want to delete it?")) {
        localStorage.setItem("note-card-container", JSON.stringify(notesObj));
    }
    showNotes();
}