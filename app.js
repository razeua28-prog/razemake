let lang="ru"
let books=[]
let admin=false

const text={

ru:{
welcome:"Добро пожаловать в онлайн-библиотеку издательства RazeMake!",
pages:"Кол-во страниц",
languages:"Доступные языки",
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
pages:"Кількість сторінок",
languages:"Мови",
illustrations:"Ілюстрації",
read:"Читати",
admin:"Увійти як адміністратор"
}

}

fetch("books.json")
.then(r=>r.json())
.then(d=>{
books=d
render()
})

function render(){

document.getElementById("welcome").innerText=text[lang].welcome
document.getElementById("adminBtn").innerText=text[lang].admin

const container=document.getElementById("books")

container.innerHTML=""

books.forEach(book=>{

const div=document.createElement("div")
div.className="book"

div.innerHTML=`

<img src="${book.image}">

<h3>${book.title[lang]}</h3>

<p>${text[lang].pages}: ${book.pages}</p>

<p>${text[lang].languages}: ${book.languages.join(",")}</p>

<p>${text[lang].illustrations}: ${book.illustrations?"✔":"✖"}</p>

<button class="readBtn">${text[lang].read}</button>

`

div.querySelector("button").onclick=()=>openBook(book)

container.appendChild(div)

})

}

function openBook(book){

document.getElementById("modal").style.display="flex"

const list=document.getElementById("fileList")

list.innerHTML=""

for(let l in book.files){

const a=document.createElement("a")

a.href=book.files[l]

a.innerText=l

a.target="_blank"

a.style.display="block"

a.style.margin="10px 0"

list.appendChild(a)

}

}

function closeModal(){

document.getElementById("modal").style.display="none"

}

document.querySelectorAll(".lang img").forEach(el=>{

el.onclick=()=>{

lang=el.dataset.lang

render()

}

})

document.getElementById("adminBtn").onclick=()=>{

const p=prompt("Password")

if(p==="iloverazemake"){

admin=true

alert("Admin mode enabled")

}

}
const canvas=document.getElementById("bg")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let mouse={x:0,y:0}

document.addEventListener("mousemove",e=>{
mouse.x=e.clientX
mouse.y=e.clientY
})

let shapes=[]

for(let i=0;i<60;i++){

shapes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:6+Math.random()*10,
type:Math.floor(Math.random()*3),
dx:(Math.random()-.5)*1,
dy:(Math.random()-.5)*1

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

shapes.forEach(s=>{

let dist=Math.hypot(mouse.x-s.x,mouse.y-s.y)

if(dist<120){

s.x+=(s.x-mouse.x)*0.02
s.y+=(s.y-mouse.y)*0.02
s.size+=0.2

}else{

s.size*=0.98

}

ctx.fillStyle="rgba(255,255,255,0.07)"

ctx.beginPath()

if(s.type===0){

ctx.arc(s.x,s.y,s.size,0,Math.PI*2)

}

if(s.type===1){

ctx.rect(s.x,s.y,s.size,s.size)

}

if(s.type===2){

ctx.moveTo(s.x,s.y)
ctx.lineTo(s.x+s.size,s.y)
ctx.lineTo(s.x+s.size/2,s.y-s.size)

}

ctx.fill()

s.x+=s.dx
s.y+=s.dy

})

requestAnimationFrame(draw)

}

draw()
