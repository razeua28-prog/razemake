let books=[]
let lang="ru"

const t={

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
admin:"Login as admin"
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

function render(){

document.getElementById("welcome").innerText=t[lang].welcome
document.getElementById("adminBtn").innerText=t[lang].admin

const container=document.getElementById("books")
container.innerHTML=""

books.forEach(b=>{

const el=document.createElement("div")
el.className="book"

el.innerHTML=`

<img src="${b.image}">

<h3>${b.title[lang]}</h3>

<p>${t[lang].pages}: ${b.pages}</p>

<p>${t[lang].languages}: ${b.languages.join(", ")}</p>

<p>${t[lang].illustrations}: ${b.illustrations?"✔":"✖"}</p>

<button class="readBtn">${t[lang].read}</button>

`

el.querySelector("button").onclick=()=>openBook(b)

container.appendChild(el)

})

}

function openBook(book){

document.getElementById("readerModal").style.display="flex"

const list=document.getElementById("fileList")

list.innerHTML=""

Object.entries(book.files).forEach(([k,v])=>{

const a=document.createElement("a")

a.href=v

a.innerText=k

a.target="_blank"

list.appendChild(a)

})

}

function closeModal(){
document.getElementById("readerModal").style.display="none"
}

fetch("books.json")
.then(r=>r.json())
.then(d=>{

books=d
render()

})

document.querySelectorAll(".flag").forEach(f=>{

f.onclick=()=>{
lang=f.dataset.lang
render()
}

})

document.getElementById("adminBtn").onclick=()=>{

const pass=prompt("Password")

if(pass==="iloverazemake"){

alert("Admin mode")

}

}
const canvas=document.getElementById("bg")
const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let shapes=[]

for(let i=0;i<40;i++){

shapes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:10+Math.random()*10,
dx:(Math.random()-0.5),
dy:(Math.random()-0.5)

})

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

shapes.forEach(s=>{

ctx.beginPath()

ctx.arc(s.x,s.y,s.size,0,Math.PI*2)

ctx.fillStyle="rgba(255,255,255,0.05)"

ctx.fill()

s.x+=s.dx
s.y+=s.dy

})

requestAnimationFrame(draw)

}

draw()
