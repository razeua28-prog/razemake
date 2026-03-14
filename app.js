let lang="en"

let books=[]

fetch("data/books.json")
.then(r=>r.json())
.then(d=>{

books=d
renderBooks(books)

})

function renderBooks(list){

const container=document.getElementById("books")
container.innerHTML=""

list.forEach((b,i)=>{

const el=document.createElement("div")
el.className="book"

el.innerHTML=`

<img src="${b.image}">
<h3>${b.title}</h3>
<p>Pages: ${b.pages}</p>

<button class="readBtn" onclick="openBook(${i})">
Read
</button>

`

container.appendChild(el)

})

}

document.getElementById("search").oninput=e=>{

const q=e.target.value.toLowerCase()

const filtered=books.filter(b=>
b.title.toLowerCase().includes(q)
)

renderBooks(filtered)

}

function filterCategory(cat){

if(cat==="all") renderBooks(books)

else{

const filtered=books.filter(b=>b.category===cat)

renderBooks(filtered)

}

}

function openBook(i){

const book=books[i]

const list=document.getElementById("fileList")
list.innerHTML=""

for(let lang in book.links){

if(book.links[lang]){

const btn=document.createElement("button")

btn.innerText=lang

btn.onclick=()=>loadReader(book.links[lang])

list.appendChild(btn)

}

}

document.getElementById("reader").style.display="flex"

}

function loadReader(url){

const viewer=document.getElementById("viewer")

viewer.innerHTML=""

if(url.endsWith(".pdf")){

const iframe=document.createElement("iframe")
iframe.src=url
iframe.width="100%"
iframe.height="100%"

viewer.appendChild(iframe)

}

if(url.endsWith(".epub")){

var book=ePub(url)

var rendition=book.renderTo("viewer",{
width:"100%",
height:"100%"
})

rendition.display()

}

}

function closeReader(){

document.getElementById("reader").style.display="none"

}
