const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer=new THREE.WebGLRenderer({alpha:true})

renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("bg3d").appendChild(renderer.domElement)

camera.position.z=10

const shapes=[]

function create(type){

let geo

if(type==="cube") geo=new THREE.BoxGeometry()
else geo=new THREE.ConeGeometry(1,2,4)

const mat=new THREE.MeshBasicMaterial({
color:0xffffff,
wireframe:true,
opacity:0.25,
transparent:true
})

const mesh=new THREE.Mesh(geo,mat)

mesh.position.x=(Math.random()-0.5)*12
mesh.position.y=(Math.random()-0.5)*8

mesh.vel={
x:(Math.random()-0.5)*0.01,
y:(Math.random()-0.5)*0.01
}

scene.add(mesh)
shapes.push(mesh)

}

for(let i=0;i<20;i++){

create("cube")
create("pyramid")

}

const mouse={x:0,y:0}

window.addEventListener("mousemove",e=>{

mouse.x=(e.clientX/window.innerWidth-0.5)*2
mouse.y=(e.clientY/window.innerHeight-0.5)*2

})

function animate(){

requestAnimationFrame(animate)

shapes.forEach(s=>{

s.rotation.x+=0.002
s.rotation.y+=0.002

s.position.x+=s.vel.x
s.position.y+=s.vel.y

s.position.x+=mouse.x*0.01
s.position.y-=mouse.y*0.01

if(s.position.x>6||s.position.x<-6) s.vel.x*=-1
if(s.position.y>4||s.position.y<-4) s.vel.y*=-1

})

renderer.render(scene,camera)

}

animate()
