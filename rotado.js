//se crea la escena
var scene = new THREE.Scene();
//funcion para generar el cubo
function cubo(x, y, z, color, material, alambrado) {
  
  var cubeGeometry = new THREE.BoxGeometry(x, y, z);
  var cubeMaterial;
  switch (material) {
    case "Basic":
      cubeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Standard":
      cubeMaterial = new THREE.MeshStandardMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Physical":
      cubeMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Phong":
      cubeMaterial = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;

    case "Lambert":
      cubeMaterial = new THREE.MeshLambertMaterial({
        color: color,
        wireframe: alambrado,
      });
      break;
  }

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  //agregamos el cubo
  scene.add(cube);
  return cube;
}
function escalar(cubo, esc) {
 //funcion para que se escale simetricamente
 Cubo[cubo].scale.set(esc, esc, esc);
}
function init() {
  
  var camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.2,
    1000
  );

  
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  var axes = new THREE.AxesHelper(20);
  scene.add(axes); 

  
  dim = 2; 
  Cubo = []; 
  angulo = Math.PI / 4; 
  diferencia = dim / 2; 
  //calculamos la diagonal
  diagonal = Math.sqrt(Math.pow(diferencia, 2) + Math.pow(diferencia, 2)); 
  dim2 = diagonal - diferencia; 
  for (i = 0; i < 3; i++) {
  
    if (i % 2 == 0) {
      Cubo.push(cubo(dim, dim, dim, 0x61FF00, "Phong", false)); 
    } else {
      Cubo.push(cubo(dim, dim, dim, 0xFFE400, "Basic", false)); 
    }
    
   
    Cubo[i].translateX(dim / 2); 
    Cubo[i].translateY(dim / 2); 
    Cubo[i].translateZ(dim / 2);
  }

  Cubo[1].translateY((3 * dim) / 4); 
  Cubo[2].translateY((9 * dim) / 8); 

  escalar(1, 1 / 2); 
  escalar(2, 1 / 4); 

  for (i = 0; i < 3; i++) {
    
    Cubo[i].translateX(dim2);

    Cubo[i].translateZ(dim2);
    if (i % 2 == 0) {
      
      Cubo[i].rotateY(angulo);
    }
  }

 
  light = new THREE.PointLight(0xffff00);

  light.position.set(-1 * dim, 30 * dim, 15 * dim); 
  scene.add(light); 
 
  camera.position.set(1 * dim, 3 * dim, 6 * dim); //3, 6, 12
  camera.lookAt(scene.position);

 
  document.getElementById("webgl-output").appendChild(renderer.domElement);


  renderer.render(scene, camera);
}