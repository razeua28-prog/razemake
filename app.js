document.addEventListener("DOMContentLoaded",()=>{

let lang="ru"
let books=[]

const text={

ru:{
welcome:"Добро пожаловать в онлайн-библиотеку издательства RazeMake!",
pages:"Страниц",
languages:"Языки",
illustrations:"Иллюстрации",
read:"Читать",
admin:"Войти как администратор"
},

en:{
welcome:"Welcome to the online library of RazeMake publishing!",
pages:"Pages",
languages:"Languages",
illustrations:"Illustrations",
read:"Read",
admin:"Admin login"
},

ua:{
welcome:"Ласкаво просимо до онлайн бібліотеки видавництва RazeMake!",
pages:"Сторінок",
languages:"Мови",
illustrations:"Ілюстрації",
read:"Читати",
admin:"Увійти як адміністратор"
}

}

/* load books */

fetch("books.json")
.then(r=>r.json())
.then(data=>{

books=data
render()

})

/* render */

function render(){

document.getElementById("welcome").innerText=text[lang].welcome
document.getElementById("adminBtn").innerText=text[lang].admin

const container=document.getElementById("books")
container.innerHTML=""

books.forEach(book=>{

const card=document.createElement("div")
card.className="book"

card.innerHTML=`

<img src="${book.image}">

<h3>${book.title[lang]}</h3>

<p>${text[lang].pages}: ${book.pages}</p>

<p>${text[lang].languages}: ${book.languages.join(", ")}</p>

<p>${text[lang].illustrations}: ${book.illustrations?"✔":"✖"}</p>

<button class="readBtn">${text[lang].read}</button>

`

card.querySelector("button").onclick=()=>openBook(book)

container.appendChild(card)

})

}

/* language switch */

document.querySelectorAll(".flags img").forEach(flag=>{

flag.onclick=()=>{

lang=flag.dataset.lang
render()

}

})

/* modal */

function openBook(book){

const modal=document.getElementById("reader")
const list=document.getElementById("fileList")

list.innerHTML=""

for(let l in book.files){

const a=document.createElement("a")

a.href=book.files[l]
a.target="_blank"
a.innerText=l

list.appendChild(a)

}

modal.style.display="flex"

}

document.getElementById("closeModal").onclick=()=>{

document.getElementById("reader").style.display="none"

}

/* admin */

document.getElementById("adminBtn").onclick=()=>{

const pass=prompt("Password")

if(pass==="iloverazemake"){

alert("Admin mode activated")

}

}

/* interactive background */

const canvas=document.getElementById("bg")
const ctx=canvas.getContext("2d")

let w=canvas.width=window.innerWidth
let h=canvas.height=window.innerHeight

let mouse={x:0,y:0}

window.addEventListener("mousemove",e=>{

mouse.x=e.clientX
mouse.y=e.clientY

})

let particles=[]

for(let i=0;i<80;i++){

particles.push({

x:Math.random()*w,
y:Math.random()*h,

vx:(Math.random()-.5)*0.5,
vy:(Math.random()-.5)*0.5,

size:3+Math.random()*4

})

}

function animate(){

ctx.clearRect(0,0,w,h)

particles.forEach(p=>{

let dx=p.x-mouse.x
let dy=p.y-mouse.y

let dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

p.vx+=dx*0.0005
p.vy+=dy*0.0005

}

p.x+=p.vx
p.y+=p.vy

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fillStyle="rgba(255,255,255,0.08)"
ctx.fill()

})

requestAnimationFrame(animate)

}

animate()

})
