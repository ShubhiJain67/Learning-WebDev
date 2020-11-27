//-----------------------------------------------------------------------------------------//
//                   To display all the Notes that are added previously                    //
//-----------------------------------------------------------------------------------------//

showNotes();


//-----------------------------------------------------------------------------------------//
//                    If user adds a note, add it to the localStorage                      //
//-----------------------------------------------------------------------------------------//

let addBtn = document.getElementById("addBtn");
<<<<<<< Updated upstream
addBtn.addEventListener("click", function(e) {
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
//   console.log(notesObj);
  showNotes();
=======
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
>>>>>>> Stashed changes
});


//-----------------------------------------------------------------------------------------//
//                      Function to show elements from localStorage                        //
//-----------------------------------------------------------------------------------------//

function showNotes() {
<<<<<<< Updated upstream
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="star-${index}"onclick="starNote(this.id)" class="btn btn-primary">Star</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "New Note" section above to add notes.`;
  }
=======
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
>>>>>>> Stashed changes
}


//-----------------------------------------------------------------------------------------//
//                                Function to delete a note                                //
//-----------------------------------------------------------------------------------------//

function deleteNote(index) {
<<<<<<< Updated upstream
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
=======
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
>>>>>>> Stashed changes
}


//-----------------------------------------------------------------------------------------//
//                                 Searching within Notes                                  //
//-----------------------------------------------------------------------------------------//

let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        let cardTxtTitle = element.getElementsByTagName("p")[0].innerText.toLowerCase();
<<<<<<< Updated upstream
        console.log(cardTxt);
        if(cardTxt.includes(inputVal) || cardTxtTitle.includes(inputVal)){
=======
        if (cardTxt.includes(inputVal) || cardTxtTitle.includes(inputVal)) {
>>>>>>> Stashed changes
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


//-----------------------------------------------------------------------------------------//
//                                      Staring Notes                                      //
//-----------------------------------------------------------------------------------------//
function starNote(index) {
<<<<<<< Updated upstream
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    let mycard = document.getElementById(index);
    mycard.style.textDecorationColor = white;
    showNotes();
  }
=======
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
>>>>>>> Stashed changes


/*
Further Features:
1. Mark a note as Important
2. Separate section
3. Recycle Bin
*/
