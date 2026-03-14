const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({alpha:true})
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

camera.position.z=8

const shapes=[]

function createCube(){

const geo=new THREE.BoxGeometry()
const mat=new THREE.MeshBasicMaterial({
color:0xffffff,
wireframe:true
})

const cube=new THREE.Mesh(geo,mat)

cube.position.x=(Math.random()-0.5)*12
cube.position.y=(Math.random()-0.5)*8

scene.add(cube)
shapes.push(cube)

}

function createPyramid(){

const geo=new THREE.ConeGeometry(1,1.5,4)
const mat=new THREE.MeshBasicMaterial({
color:0xffffff,
wireframe:true
})

const pyramid=new THREE.Mesh(geo,mat)

pyramid.position.x=(Math.random()-0.5)*12
pyramid.position.y=(Math.random()-0.5)*8

scene.add(pyramid)
shapes.push(pyramid)

}

for(let i=0;i<20;i++){

createCube()
createPyramid()

}

const mouse={x:0,y:0}

window.addEventListener("mousemove",e=>{

mouse.x=(e.clientX/window.innerWidth)*2-1
mouse.y=-(e.clientY/window.innerHeight)*2+1

})

function animate(){

requestAnimationFrame(animate)

shapes.forEach(s=>{

s.rotation.x+=0.003
s.rotation.y+=0.004

s.position.x+=mouse.x*0.02
s.position.y+=mouse.y*0.02

})

renderer.render(scene,camera)

}

animate()
