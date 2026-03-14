let lang="en"

let books=JSON.parse(localStorage.getItem("books"))||[]

const text={

en:{
welcome:"Welcome to the online library of RazeMake publishing",
read:"Read",
pages:"Pages",
languages:{
ru:"Русский",
en:"English",
ua:"Українська"
}
},

ru:{
welcome:"Добро пожаловать в онлайн-библиотеку издательства RazeMake",
read:"Читать",
pages:"Страниц",
languages:{
ru:"Русский",
en:"English",
ua:"Українська"
}
},

ua:{
welcome:"Ласкаво просимо до онлайн бібліотеки видавництва RazeMake",
read:"Читати",
pages:"Сторінок",
languages:{
ru:"Русский",
en:"English",
ua:"Українська"
}
}

}

function render(){

document.getElementById("welcome").innerText=text[lang].welcome

const container=document.getElementById("books")

container.innerHTML=""

books.forEach((b,i)=>{

const el=document.createElement("div")
el.className="book"

el.innerHTML=`

<img src="${b.image}">

<h3>${b.title}</h3>

<p>${text[lang].pages}: ${b.pages}</p>

<button class="readBtn">${text[lang].read}</button>

`

el.querySelector("button").onclick=()=>openReader(b)

container.appendChild(el)

})

}

function openReader(book){

const list=document.getElementById("fileList")
list.innerHTML=""

for(let l in book.links){

if(book.links[l]){

const a=document.createElement("a")

a.href=book.links[l]

a.target="_blank"

a.innerText=text[lang].languages[l]

list.appendChild(a)

}

}

document.getElementById("reader").style.display="flex"

}

function closeReader(){

document.getElementById("reader").style.display="none"

}

document.querySelectorAll(".flags img").forEach(f=>{

f.onclick=()=>{

lang=f.dataset.lang

render()

}

})

document.getElementById("adminBtn").onclick=()=>{

const p=prompt("Password")

if(p==="iloverazemake"){

document.getElementById("adminPanel").style.display="flex"

}

}

function closeAdmin(){

document.getElementById("adminPanel").style.display="none"

}

function addBook(){

const book={

title:document.getElementById("bookTitle").value,

pages:document.getElementById("bookPages").value,

image:document.getElementById("bookImage").value,

links:{

ru:document.getElementById("ruLink").value,

en:document.getElementById("enLink").value,

ua:document.getElementById("uaLink").value

}

}

books.push(book)

localStorage.setItem("books",JSON.stringify(books))

render()

}

render()

/* particles */

const canvas=document.getElementById("bg")
const ctx=canvas.getContext("2d")

canvas.width=innerWidth
canvas.height=innerHeight

let mouse={x:0,y:0}

window.onmousemove=e=>{
mouse.x=e.x
mouse.y=e.y
}

let shapes=[]

for(let i=0;i<60;i++){

shapes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vx:(Math.random()-.5)*1,
vy:(Math.random()-.5)*1,

size:8+Math.random()*10,

type:Math.floor(Math.random()*3)

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

shapes.forEach(s=>{

if(s.x<0||s.x>canvas.width)s.vx*=-1
if(s.y<0||s.y>canvas.height)s.vy*=-1

s.x+=s.vx
s.y+=s.vy

let dx=s.x-mouse.x
let dy=s.y-mouse.y

let d=Math.sqrt(dx*dx+dy*dy)

if(d<120){

s.vx+=dx*0.002
s.vy+=dy*0.002

}

ctx.fillStyle="rgba(255,255,255,.08)"

ctx.beginPath()

if(s.type==0)ctx.arc(s.x,s.y,s.size,0,Math.PI*2)

if(s.type==1)ctx.rect(s.x,s.y,s.size,s.size)

if(s.type==2){

ctx.moveTo(s.x,s.y)
ctx.lineTo(s.x+s.size,s.y)
ctx.lineTo(s.x+s.size/2,s.y-s.size)

}

ctx.fill()

})

requestAnimationFrame(draw)

}

draw()
