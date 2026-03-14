let lang = "en";
const names = {ru:"Русский", en:"English", ua:"Українська"};

const translations = {
    en:{welcome:"Welcome to the online library of RazeMake publishing", read:"Read"},
    ru:{welcome:"Добро пожаловать в онлайн библиотеку издательства RazeMake", read:"Читать"},
    ua:{welcome:"Ласкаво просимо до онлайн бібліотеки видавництва RazeMake", read:"Читати"}
}

// загрузка книг
let books = JSON.parse(localStorage.getItem("books")) || [];
if(books.length === 0){
    fetch("books.json").then(r=>r.json()).then(d=>{
        books = d;
        saveBooks();
        renderBooks();
    });
} else renderBooks();

// сохранение
function saveBooks(){ localStorage.setItem("books", JSON.stringify(books)); }

// рендер книг
function renderBooks(){
    document.getElementById("welcome").innerText = translations[lang].welcome;
    const container = document.getElementById("books");
    container.innerHTML = "";
    books.forEach((b,i)=>{
        const card = document.createElement("div");
        card.className="book";
        card.innerHTML = `
            <img src="${b.image}">
            <h3>${b.title}</h3>
            <p>Pages: ${b.pages}</p>
            <button class="glassBtn">${translations[lang].read}</button>
        `;
        card.querySelector("button").onclick = ()=>openBook(i);
        container.appendChild(card);
    });
}

// поиск
document.getElementById("search").oninput = e=>{
    const q = e.target.value.toLowerCase();
    renderFiltered(books.filter(b=>b.title.toLowerCase().includes(q)));
}
function renderFiltered(list){ books = list; renderBooks(); }

// языки
document.querySelectorAll(".flags img").forEach(f=>{
    f.onclick = ()=>{
        lang = f.dataset.lang;
        renderBooks();
    }
});

// reader
function openBook(i){
    const book = books[i];
    const list = document.getElementById("fileList");
    list.innerHTML="";
    for(let l in book.links){
        if(book.links[l]){
            const btn = document.createElement("button");
            btn.className="glassBtn";
            btn.innerText = names[l];
            btn.onclick = ()=>document.getElementById("viewer").src = book.links[l];
            list.appendChild(btn);
        }
    }
    document.getElementById("reader").style.display="flex";
}
function closeReader(){ document.getElementById("reader").style.display="none"; }

// категории
function filterCategory(cat){
    if(cat==="all") renderBooks();
    else renderFiltered(books.filter(b=>b.category===cat));
}

// админ
document.getElementById("adminBtn").onclick = ()=>{
    const pass = prompt("Password");
    if(pass==="iloverazemake"){
        document.getElementById("adminPanel").style.display="flex";
        renderAdmin();
    }
}
function closeAdmin(){ document.getElementById("adminPanel").style.display="none"; }

function addBook(){
    const book = {
        title:title.value, pages:pages.value, category:category.value, image:image.value,
        links:{ru:ru.value,en:en.value,ua:ua.value}
    };
    // проверка на существующую книгу
    const index = books.findIndex(b=>b.title === book.title);
    if(index >= 0){ books[index] = book; } else { books.push(book); }
    saveBooks();
    renderBooks();
    renderAdmin();
}

function renderAdmin(){
    const list = document.getElementById("adminList");
    list.innerHTML="";
    books.forEach((b,i)=>{
        const row = document.createElement("div");
        row.innerHTML = `${b.title} <button onclick="deleteBook(${i})" class="glassBtn">Delete</button>`;
        list.appendChild(row);
    });
}

function deleteBook(i){
    books.splice(i,1);
    saveBooks();
    renderBooks();
    renderAdmin();
}
