document.getElementById("adminBtn").onclick=()=>{

const pass=prompt("Password")

if(pass==="iloverazemake"){

document.getElementById("adminPanel").style.display="flex"
renderAdmin()

}

}

function closeAdmin(){

document.getElementById("adminPanel").style.display="none"

}

function addBook(){

const book={

title:document.getElementById("bookTitle").value,
pages:document.getElementById("bookPages").value,
category:document.getElementById("bookCategory").value,
image:document.getElementById("bookImage").value,

links:{

ru:document.getElementById("ruLink").value,
en:document.getElementById("enLink").value,
ua:document.getElementById("uaLink").value

}

}

books.push(book)

renderBooks(books)
renderAdmin()

}

function renderAdmin(){

const list=document.getElementById("adminBooks")

list.innerHTML=""

books.forEach((b,i)=>{

const div=document.createElement("div")

div.innerHTML=`

<input value="${b.title}" id="t${i}">
<button onclick="saveBook(${i})">Save</button>
<button onclick="deleteBook(${i})">Delete</button>

`

list.appendChild(div)

})

}

function saveBook(i){

books[i].title=document.getElementById("t"+i).value

renderBooks(books)

}

function deleteBook(i){

books.splice(i,1)

renderBooks(books)
renderAdmin()

}
