//Se crea la escena
var scene = new THREE.Scene();
function cubo(x, y, z, color, material, alambrado) {
  //parametros del cubo
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

  
  scene.add(cube);
  return cube;
}
function escalar(cubo, esc) {
  
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
  
  var dim = prompt("Tamaño del cubo", "3"); 
  if (dim == null || dim == "" || dim <= 0) {
    alert("error"); 
  }
  while (dim == "" || dim <= 0) {
    
    dim = prompt("error, Introduzca de nuevo tamaño del cubo", "3");
  }

  
  var angulo = prompt(
    "Angulo de rotacion en grados(0°-90°)",
    "90"
  );
  if (angulo == null || angulo == "" || angulo < 0 || angulo > 90) {
    alert("error"); 
  }
  while (angulo == "" || angulo < 0 || angulo > 90) {
   
    angulo = prompt(
      "error, Introduzca de nuevo angulo de rotacion del cubo en grados(0°-90°)",
      "90"
    );
  }
  angulo = (Math.PI * angulo) / 180; 

 

  Cubo = []; // Definir un array unidimensional para generar los 3 cubos
  diferencia = dim / 2; 
  diagonal = Math.sqrt(Math.pow(diferencia, 2) + Math.pow(diferencia, 2)); 
  dim2 = Math.cos(Math.PI / 4 - angulo) * diagonal;
  for (i = 0; i < 3; i++) {
    
    if (i % 2 == 0) {
      Cubo.push(cubo(dim, dim, dim, 0x61FF00, "Phong", false)); 
    } else {
      Cubo.push(cubo(dim, dim, dim, 0xFFEC00, "Basic", false)); 
    }
    
   
    Cubo[i].translateX(dim2); 
    Cubo[i].translateY(diferencia); 
    Cubo[i].translateZ(dim2); 
  }

  Cubo[1].translateY((3 * dim) / 4); 
  Cubo[2].translateY((9 * dim) / 8); 

  escalar(1, 1 / 2);
  escalar(2, 1 / 4); 

  for (i = 0; i < 3; i++) {
   
    if (i % 2 == 0) {
      
      Cubo[i].rotateY(angulo);
    }
  }

  
  light = new THREE.PointLight(0xffff00);
  light.position.set(-1 * dim, 30 * dim, 15 * dim); 
  scene.add(light); 

  
  camera.position.set(1 * dim, 3 * dim, 6 * dim); 
  camera.lookAt(scene.position);

  
  document.getElementById("webgl-output").appendChild(renderer.domElement);
  
  renderer.render(scene, camera);
}