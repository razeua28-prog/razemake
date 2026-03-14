const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bg3d").appendChild(renderer.domElement);
camera.position.z = 12;

const shapes = [];
function createShape(type){
    let geo = type==="cube"? new THREE.BoxGeometry(): new THREE.ConeGeometry(1,2,4);
    const mat = new THREE.MeshBasicMaterial({color:0x999999,wireframe:true,opacity:0.15,transparent:true});
    const mesh = new THREE.Mesh(geo,mat);
    mesh.position.x = (Math.random()-0.5)*10;
    mesh.position.y = (Math.random()-0.5)*6;
    mesh.vel = {x:(Math.random()-0.5)*0.02, y:(Math.random()-0.5)*0.02};
    scene.add(mesh); shapes.push(mesh);
}
for(let i=0;i<20;i++){ createShape("cube"); createShape("pyramid"); }

const mouse={x:0,y:0};
window.addEventListener("mousemove", e=>{ mouse.x=(e.clientX/window.innerWidth-0.5)*2; mouse.y=(e.clientY/window.innerHeight-0.5)*2; });

function animate(){
    requestAnimationFrame(animate);
    shapes.forEach(s=>{
        s.rotation.x +=0.002; s.rotation.y +=0.002;
        // отталкивание
        const dx = s.position.x - mouse.x*8;
        const dy = s.position.y - mouse.y*6;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const force = Math.min(0.05, 1/(dist+0.5));
        s.position.x += s.vel.x + dx/dist*force;
        s.position.y += s.vel.y + dy/dist*force;
        // границы
        if(s.position.x>6||s.position.x<-6) s.vel.x*=-1;
        if(s.position.y>5||s.position.y<-5) s.vel.y*=-1;
    });
    renderer.render(scene,camera);
}
animate();
