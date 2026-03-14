const GITHUB_TOKEN="PASTE_TOKEN"
const REPO="username/repository"

async function saveToGithub(){

const content=btoa(JSON.stringify(books,null,2))

await fetch(

`https://api.github.com/repos/${REPO}/contents/data/books.json`,

{
method:"PUT",

headers:{
Authorization:`token ${GITHUB_TOKEN}`
},

body:JSON.stringify({

message:"update books",
content:content

})

})

}
