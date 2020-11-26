console.log("Welcome to App.js");


// If user adds a note, add it to the local storage
let addBtn = document.getElementById('add-btn');
addBtn.addEventListener("click",function(e){
    let addText = document.getElementById("add-text");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObject = [];
    }
    else{
        notesObject= JSON.parse(notes);
    }
    notesObject.push(addText.value);
    localStorage.setItem("notes",JSON.stringify(notesObject));
    addText.value="";
    console.log(notesObject);

    showNotes();
})

function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObject = [];
    }
    else{
        notesObject= JSON.parse(notes);
    }

    let html = "";
    notesObject.forEach(function(element, index){
        html+= '<div class="notesCard card mx-3 my-3" style="width: 18rem;"><div class="card-body"><h5 class="card-title">Note ${index + 1}</h5><p class="card-text"> ${element+1} </p><a href="#" class="btn btn-primary">Delete Node</a></div></div>';
    });
    let notesElem = getElementById('notes');
    if(notes.length != 0){
        notesElem.innerHtml = html;
    }
}