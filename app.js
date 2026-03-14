let lang="en"

const names={
ru:"Русский",
en:"English",
ua:"Українська"
}

const t={

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

let books=JSON.parse(localStorage.getItem("books"))

if(!books){

fetch("books.json")
.then(r=>r.json())
.then(d=>{
books=d
save()
render()
})

}else render()

function save(){

localStorage.setItem("books",JSON.stringify(books))

}

function render(){

welcome.innerText=t[lang].welcome

const box=document.getElementById("books")
box.innerHTML=""

books.forEach((b,i)=>{

const el=document.createElement("div")
el.className="book"

el.innerHTML=`

<img src="${b.image}">

<h3>${b.title}</h3>

<p>Pages: ${b.pages}</p>

<button class="glass">${t[lang].read}</button>

`

el.querySelector("button").onclick=()=>openBook(i)

box.appendChild(el)

})

}

/* languages */

document.querySelectorAll(".flags img").forEach(f=>{

f.onclick=()=>{

lang=f.dataset.lang
render()

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

btn.className="glass"

btn.innerText=names[l]

btn.onclick=()=>{

viewer.src=book.links[l]

}

list.appendChild(btn)

}

}

reader.style.display="flex"

}

function closeReader(){

reader.style.display="none"

}

/* categories */

function filterCategory(cat){

if(cat==="all") render()

else{

const filtered=books.filter(b=>b.category===cat)

renderFiltered(filtered)

}

}

function renderFiltered(list){

books=list
render()

}

/* admin */

adminBtn.onclick=()=>{

const p=prompt("Password")

if(p==="iloverazemake"){

adminPanel.style.display="flex"
renderAdmin()

}

}

function closeAdmin(){

adminPanel.style.display="none"

}

function addBook(){

const book={

title:title.value,
pages:pages.value,
category:category.value,
image:image.value,

links:{
ru:ru.value,
en:en.value,
ua:ua.value
}

}

books.push(book)

save()
render()
renderAdmin()

}

function renderAdmin(){

adminList.innerHTML=""

books.forEach((b,i)=>{

const row=document.createElement("div")

row.innerHTML=`

${b.title}

<button onclick="deleteBook(${i})" class="glass">
Delete
</button>

`

adminList.appendChild(row)

})

}

function deleteBook(i){

books.splice(i,1)

save()
render()
renderAdmin()

}
