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

function createShape(type){

let geo

if(type==="cube") geo=new THREE.BoxGeometry()
else geo=new THREE.ConeGeometry(1,2,4)

const mat=new THREE.MeshBasicMaterial({
color:0xffffff,
wireframe:true
})

const mesh=new THREE.Mesh(geo,mat)

mesh.position.x=(Math.random()-0.5)*15
mesh.position.y=(Math.random()-0.5)*10
mesh.position.z=(Math.random()-0.5)*5

mesh.velocity={
x:(Math.random()-0.5)*0.01,
y:(Math.random()-0.5)*0.01
}

scene.add(mesh)

shapes.push(mesh)

}

for(let i=0;i<25;i++){

createShape("cube")
createShape("pyramid")

}

const mouse={x:0,y:0}

window.addEventListener("mousemove",e=>{

mouse.x=(e.clientX/window.innerWidth-0.5)*2
mouse.y=(e.clientY/window.innerHeight-0.5)*2

})

function animate(){

requestAnimationFrame(animate)

shapes.forEach(s=>{

s.rotation.x+=0.004
s.rotation.y+=0.004

s.position.x+=s.velocity.x
s.position.y+=s.velocity.y

s.position.x+=mouse.x*0.002
s.position.y-=mouse.y*0.002

if(s.position.x>8||s.position.x<-8) s.velocity.x*=-1
if(s.position.y>5||s.position.y<-5) s.velocity.y*=-1

})

renderer.render(scene,camera)

}

animate()
