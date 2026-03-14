let lang="en"

const translations={

en:{
welcome:"Welcome to the online library of RazeMake publishing",
read:"Read"
},

ru:{
welcome:"Добро пожаловать в онлайн библиотеку издательства RazeMake",
read:"Читать"
},

ua:{
welcome:"Ласкаво просимо до онлайн бібліотеки видавництва RazeMake",
read:"Читати"
}

}

let books=JSON.parse(localStorage.getItem("books"))||[]

if(books.length===0){

fetch("data/books.json")
.then(r=>r.json())
.then(d=>{
books=d
saveBooks()
renderBooks()
})

}else{

renderBooks()

}

function saveBooks(){

localStorage.setItem("books",JSON.stringify(books))

}

function renderBooks(){

document.getElementById("welcome").innerText=translations[lang].welcome

const container=document.getElementById("books")
container.innerHTML=""

books.forEach((b,i)=>{

const card=document.createElement("div")
card.className="book"

card.innerHTML=`

<img src="${b.image}">

<h3>${b.title}</h3>

<p>Pages: ${b.pages}</p>

<button class="glassBtn readBtn">
${translations[lang].read}
</button>

`

card.querySelector("button").onclick=()=>openBook(i)

container.appendChild(card)

})

}

/* search */

document.getElementById("search").oninput=e=>{

const q=e.target.value.toLowerCase()

const filtered=books.filter(b=>
b.title.toLowerCase().includes(q)
)

renderFiltered(filtered)

}

function renderFiltered(list){

const container=document.getElementById("books")
container.innerHTML=""

list.forEach((b,i)=>{

const card=document.createElement("div")
card.className="book"

card.innerHTML=`

<img src="${b.image}">
<h3>${b.title}</h3>
<p>Pages: ${b.pages}</p>

<button class="glassBtn readBtn">
${translations[lang].read}
</button>

`

card.querySelector("button").onclick=()=>openBook(i)

container.appendChild(card)

})

}

/* language */

document.querySelectorAll(".flags img").forEach(f=>{

f.onclick=()=>{

lang=f.dataset.lang
renderBooks()

}

})

/* reader */

function openBook(i){

const book=books[i]

const list=document.getElementById("fileList")
list.innerHTML=""

for(let l in book.links){

if(book.links[l]){

const btn=document.createElement("button")

btn.className="glassBtn"

btn.innerText=l.toUpperCase()

btn.onclick=()=>{

document.getElementById("viewer").src=book.links[l]

}

list.appendChild(btn)

}

}

document.getElementById("reader").style.display="flex"

}

function closeReader(){

document.getElementById("reader").style.display="none"

}

/* admin */

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

title:bookTitle.value,
pages:bookPages.value,
image:bookImage.value,

links:{
ru:ruLink.value,
en:enLink.value,
ua:uaLink.value
}

}

books.push(book)

saveBooks()
renderBooks()
renderAdmin()

}

function renderAdmin(){

const list=document.getElementById("adminBooks")
list.innerHTML=""

books.forEach((b,i)=>{

const row=document.createElement("div")

row.innerHTML=`

${b.title}

<button class="glassBtn" onclick="deleteBook(${i})">
Delete
</button>

`

list.appendChild(row)

})

}

function deleteBook(i){

books.splice(i,1)

saveBooks()
renderBooks()
renderAdmin()

}
