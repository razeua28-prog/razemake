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

camera.position.z=8

const shapes=[]

function cube(){

const geo=new THREE.BoxGeometry()

const mat=new THREE.MeshBasicMaterial({
color:0xffffff,
wireframe:true
})

const mesh=new THREE.Mesh(geo,mat)

mesh.position.x=(Math.random()-0.5)*10
mesh.position.y=(Math.random()-0.5)*6

scene.add(mesh)

shapes.push(mesh)

}

function pyramid(){

const geo=new THREE.ConeGeometry(1,1.5,4)

const mat=new THREE.MeshBasicMaterial({
color:0xffffff,
wireframe:true
})

const mesh=new THREE.Mesh(geo,mat)

mesh.position.x=(Math.random()-0.5)*10
mesh.position.y=(Math.random()-0.5)*6

scene.add(mesh)

shapes.push(mesh)

}

for(let i=0;i<15;i++){

cube()
pyramid()

}

const mouse={x:0,y:0}

window.addEventListener("mousemove",e=>{

mouse.x=(e.clientX/window.innerWidth)*2-1
mouse.y=-(e.clientY/window.innerHeight)*2+1

})

function animate(){

requestAnimationFrame(animate)

shapes.forEach(s=>{

s.rotation.x+=0.004
s.rotation.y+=0.005

s.position.x+=mouse.x*0.02
s.position.y+=mouse.y*0.02

})

renderer.render(scene,camera)

}

animate()
