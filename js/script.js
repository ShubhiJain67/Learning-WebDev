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
    var notes = localStorage.getItem("note-card-container");
    var notesObj = (notes == null) ? [] : JSON.parse(notes);
    var html = "";
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
    var notesElm = document.getElementById("note-card-container");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h3 class="blank-notes"> Nothing to show! Use "<span class="link" onclick="addNotePops()">Add New Note</span>" section above to add notes.</h3>`;
    }
}


//-----------------------------------------------------------------------------------------//
//                                    Adding a Card                                        //
//-----------------------------------------------------------------------------------------//

function addNote() {
    var addNote = document.getElementById("add-note");
    var addTitle = document.getElementById("add-title");
    var notes = localStorage.getItem("note-card-container");
    var notesObj = (notes == null) ? [] : JSON.parse(notes);
    var myObj = {
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
    var notes = localStorage.getItem("note-card-container");
    var notesObj = (notes == null) ? [] : JSON.parse(notes);
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
//                               Deleting + (Undo) a Card                                  //
//-----------------------------------------------------------------------------------------//

var timer = 0;
var gid = "";

function deleteCard(id) {
    id = id.substring(id.lastIndexOf("-") + 1);
    gid = id;
    if (confirm("Are you sure you want to delete it?")) {
        document.getElementById("note-" + id).style.display = "none";
        document.getElementById("undo").style.display = "block";
        timer = window.setTimeout(deleteCardPermanently, 5000);
    }
}

function undo() {
    document.getElementById("note-" + gid).style.display = "block";
    document.getElementById("undo").style.display = "none";
    window.clearTimeout(timer);
}

function deleteCardPermanently() {
    var notes = localStorage.getItem("note-card-container");
    var notesObj = (notes == null) ? [] : JSON.parse(notes);
    notesObj.splice(gid, 1);
    localStorage.setItem("note-card-container", JSON.stringify(notesObj));
    document.getElementById("undo").style.display = "none";
    showNotes();
}


//-----------------------------------------------------------------------------------------//
//                                    Draggable Card                                       //
//-----------------------------------------------------------------------------------------//

// $('.draggable').draggable({
//     scroll: true,
//     scrollSensitivity: 40,
//     scrollSpeed: 40
// });


//-----------------------------------------------------------------------------------------//
//                                    Search Function                                      //
//-----------------------------------------------------------------------------------------//

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputValue = search.value.toLowerCase();
    let notes=document.getElementsByClassName("note-card");
    Array.from(notes).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h3")[0].innerText.toLowerCase();
        if(cardText.includes(inputValue) || cardTitle.includes(inputValue)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    })

})