import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js";

/* ========================================================= SHUBHAM 3D AI PORTFOLIO — PREMIUM WORLD Complete replacement for main.js ========================================================= */

const app = document.getElementById("app");
const loadingScreen = document.getElementById("loadingScreen");
const loadingProgress = document.getElementById("loadingProgress");
const loadingText = document.getElementById("loadingText");

const infoPanel = document.getElementById("infoPanel");
const closePanel = document.getElementById("closePanel");
const panelTitle = document.getElementById("panelTitle");
const panelDescription = document.getElementById("panelDescription");
const panelIcon = document.getElementById("panelIcon");
const panelAction = document.getElementById("panelAction");

/* ========================================================= SCENE ========================================================= */

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02040b);
scene.fog = new THREE.FogExp2(0x02040b, 0.01);

/* ========================================================= CAMERA ========================================================= */

const camera = new THREE.PerspectiveCamera(
  58,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 7.5, 18);

/* ========================================================= RENDERER ========================================================= */

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "default",
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

app.appendChild(renderer.domElement);

/* ========================================================= LIGHTING ========================================================= */

const ambient = new THREE.AmbientLight(0x7184a8, 1.15);
scene.add(ambient);

const moon = new THREE.DirectionalLight(0xa8c8ff, 2.2);
moon.position.set(20, 35, 15);
moon.castShadow = true;
scene.add(moon);

const cyanLight = new THREE.PointLight(0x00eaff, 22, 35);
cyanLight.position.set(0, 5, 0);
scene.add(cyanLight);

const purpleLight = new THREE.PointLight(0x765cff, 18, 45);
purpleLight.position.set(-15, 7, -12);
scene.add(purpleLight);

/* ========================================================= HELPERS ========================================================= */

function standardMaterial( color, emissive = 0x000000, emissiveIntensity = 0, metalness = 0.45, roughness = 0.55 ) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive,
    emissiveIntensity,
    metalness,
    roughness,
  });
}

function basicMaterial(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
  });
}

/* ========================================================= GROUND ========================================================= */

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(180, 180),
  standardMaterial(0x050912, 0x020711, 0.35, 0.5, 0.65)
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

/* ========================================================= GRID ========================================================= */

const grid = new THREE.GridHelper(180, 90, 0x12617b, 0x081a2a);

grid.position.y = 0.025;
grid.material.transparent = true;
grid.material.opacity = 0.42;
scene.add(grid);

/* ========================================================= MAIN ROADS ========================================================= */

function createRoad(x, z, width, depth) {
  const road = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.08, depth),
    standardMaterial(0x070b14, 0x02050a, 0.2, 0.75, 0.4)
  );

  road.position.set(x, 0.04, z);
  scene.add(road);

  return road;
}

createRoad(0, 0, 180, 7);
createRoad(0, 0, 7, 180);

/* ========================================================= ROAD NEON LINES ========================================================= */

function neonLine(x, y, z, width, depth, color, opacity = 0.9) {
  const line = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.035, depth),
    basicMaterial(color, opacity)
  );

  line.position.set(x, y, z);
  scene.add(line);

  return line;
}

neonLine(0, 0.105, 3.35, 180, 0.045, 0x00dfff);

neonLine(0, 0.105, -3.35, 180, 0.045, 0x7b5cff);

neonLine(3.35, 0.108, 0, 0.045, 180, 0x7b5cff);

neonLine(-3.35, 0.108, 0, 0.045, 180, 0x00dfff);

/* ========================================================= STREET LIGHTS ========================================================= */

const streetLights = [];

function createStreetLight(x, z) {
  const group = new THREE.Group();

  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.055, 2.3, 8),
    standardMaterial(0x263247, 0x08101b, 0.4)
  );

  pole.position.y = 1.15;
  group.add(pole);

  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 12, 12),
    standardMaterial(0x00eaff, 0x00eaff, 4)
  );

  lamp.position.y = 2.35;
  group.add(lamp);

  const light = new THREE.PointLight(0x00eaff, 2.5, 7);

  light.position.y = 2.35;
  group.add(light);

  group.position.set(x, 0, z);
  scene.add(group);

  streetLights.push(group);
}

for (let i = -60; i <= 60; i += 10) {
  createStreetLight(i, -5);
  createStreetLight(i, 5);
}

/* ========================================================= CENTRAL PREMIUM PLAZA ========================================================= */

const plaza = new THREE.Group();
scene.add(plaza);

const plazaBase = new THREE.Mesh(
  new THREE.CylinderGeometry(7.3, 7.7, 0.32, 64),
  standardMaterial(0x07111d, 0x032031, 0.8, 0.85, 0.25)
);

plazaBase.position.y = 0.18;
plaza.add(plazaBase);

const plazaEdge = new THREE.Mesh(
  new THREE.TorusGeometry(7.05, 0.07, 10, 96),
  basicMaterial(0x00eaff)
);

plazaEdge.rotation.x = Math.PI / 2;
plazaEdge.position.y = 0.38;
plaza.add(plazaEdge);

const plazaInner = new THREE.Mesh(
  new THREE.TorusGeometry(4.7, 0.045, 10, 96),
  basicMaterial(0x7b5cff)
);

plazaInner.rotation.x = Math.PI / 2;
plazaInner.position.y = 0.41;
plaza.add(plazaInner);

/* ========================================================= CENTRAL HOLOGRAM — SMALL AND CLEAN ========================================================= */

const holoGroup = new THREE.Group();
holoGroup.position.y = 0.4;
scene.add(holoGroup);

const holoColumn = new THREE.Mesh(
  new THREE.CylinderGeometry(1.55, 1.55, 3.5, 32, 1, true),
  new THREE.MeshBasicMaterial({
    color: 0x00eaff,
    transparent: true,
    opacity: 0.055,
    side: THREE.DoubleSide,
  })
);

holoColumn.position.y = 2;
holoGroup.add(holoColumn);

const holoTop = new THREE.Mesh(
  new THREE.TorusGeometry(1.55, 0.045, 8, 64),
  basicMaterial(0x00eaff)
);

holoTop.rotation.x = Math.PI / 2;
holoTop.position.y = 3.75;
holoGroup.add(holoTop);

const holoBottom = holoTop.clone();
holoBottom.position.y = 0.25;
holoGroup.add(holoBottom);

/* Floating diamond */

const aiDiamond = new THREE.Mesh(
  new THREE.OctahedronGeometry(0.9, 1),
  standardMaterial(0x111b31, 0x00eaff, 2.8, 0.8, 0.2)
);

aiDiamond.position.y = 2;
holoGroup.add(aiDiamond);

const diamondWire = new THREE.Mesh(
  new THREE.OctahedronGeometry(1.08, 1),
  new THREE.MeshBasicMaterial({
    color: 0x7b5cff,
    wireframe: true,
    transparent: true,
    opacity: 0.75,
  })
);

diamondWire.position.y = 2;
holoGroup.add(diamondWire);

/* ========================================================= PORTFOLIO BUILDINGS ========================================================= */

const buildings = [];

function createSignTexture(title, subtitle) {
  const canvas = document.createElement("canvas");

  canvas.width = 1024;
  canvas.height = 256;

  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(3,10,20,0.88)";

  ctx.fillRect(20, 20, 984, 216);

  ctx.strokeStyle = "#00eaff";

  ctx.lineWidth = 5;

  ctx.strokeRect(20, 20, 984, 216);

  ctx.font = "bold 64px Arial";

  ctx.fillStyle = "#ffffff";

  ctx.textAlign = "center";

  ctx.fillText(title, 512, 105);

  ctx.font = "28px Arial";

  ctx.fillStyle = "#00eaff";

  ctx.fillText(subtitle, 512, 170);

  const texture = new THREE.CanvasTexture(canvas);

  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
}

function createBuilding( x, z, width, height, depth, title, description, icon, subtitle ) {
  const group = new THREE.Group();

  group.position.set(x, 0, z);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    standardMaterial(0x0a1222, 0x04101b, 0.55, 0.75, 0.35)
  );

  body.position.y = height / 2;

  body.castShadow = true;
  body.receiveShadow = true;

  group.add(body);

  /* Vertical corner lights */

  for (const side of [-1, 1]) {
    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, height, 0.055),
      basicMaterial(side === -1 ? 0x00eaff : 0x7b5cff)
    );

    edge.position.set(side * (width / 2 - 0.08), height / 2, depth / 2 + 0.04);

    group.add(edge);
  }

  /* Windows */

  const windowMat = standardMaterial(0x0d4c68, 0x00cfff, 1.4, 0.25, 0.25);

  for (let y = 1.4; y < height - 0.7; y += 1.35) {
    for (let wx = -width / 2 + 0.75; wx < width / 2 - 0.3; wx += 1.15) {
      const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.48, 0.38, 0.035),
        windowMat
      );

      window.position.set(wx, y, depth / 2 + 0.04);

      group.add(window);
    }
  }

  /* Rooftop */

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(width * 0.78, 0.11, depth * 0.78),
    basicMaterial(0x00eaff)
  );

  roof.position.y = height + 0.08;

  group.add(roof);

  /* Floating sign */

  const signTexture = createSignTexture(title, subtitle);

  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(Math.min(width * 0.9, 7), 1.65),
    new THREE.MeshBasicMaterial({
      map: signTexture,
      transparent: true,
      side: THREE.DoubleSide,
    })
  );

  sign.position.set(0, Math.min(height - 1, 8), depth / 2 + 0.08);

  group.add(sign);

  /* Base */

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(width * 0.65, width * 0.72, 0.12, 32),
    basicMaterial(0x7b5cff)
  );

  base.position.y = 0.1;

  group.add(base);

  /* Roof ring */

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(width * 0.52, 0.035, 8, 48),
    basicMaterial(0x00eaff)
  );

  ring.rotation.x = Math.PI / 2;

  ring.position.y = height + 0.8;

  group.add(ring);

  group.userData = {
    title,
    description,
    icon,
  };

  buildings.push(group);
  scene.add(group);

  return group;
}

/* Four main towers are intentionally closer */

createBuilding(
  -12,
  -11,
  6,
  9,
  6,
  "ABOUT ME",
  "AIML student and technology enthusiast building practical AI, web and robotics projects.",
  "USER",
  "PROFILE"
);

createBuilding(
  12,
  -11,
  6.5,
  11,
  6.5,
  "AI LAB",
  "A space for machine learning, artificial intelligence and experimentation.",
  "AI",
  "INTELLIGENCE"
);

createBuilding(
  -12,
  12,
  6.5,
  10,
  6.5,
  "PROJECTS",
  "Explore the projects I have designed, developed and experimented with.",
  "CODE",
  "WORK"
);

createBuilding(
  12,
  12,
  6,
  8.5,
  6,
  "ACHIEVEMENTS",
  "Certificates, competitions, hackathons and milestones.",
  "WIN",
  "MILESTONES"
);

createBuilding(
  0,
  -25,
  7,
  10,
  7,
  "RESUME",
  "View my skills, education, projects and career journey.",
  "CV",
  "CAREER"
);

/* ========================================================= BACKGROUND SKYLINE ========================================================= */

function createSkyBuilding(x, z, w, h, d, color) {
  const group = new THREE.Group();

  const building = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    standardMaterial(0x060b15, 0x020611, 0.4, 0.8, 0.45)
  );

  building.position.y = h / 2;

  group.add(building);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(w * 0.7, 0.08, d * 0.7),
    basicMaterial(color)
  );

  roof.position.y = h + 0.05;

  group.add(roof);

  group.position.set(x, 0, z);

  scene.add(group);
}

const skyline = [
  [-34, -34, 7, 17, 7],
  [-23, -42, 6, 22, 6],
  [-10, -43, 8, 15, 7],
  [10, -43, 8, 21, 7],
  [24, -40, 7, 16, 7],
  [36, -33, 9, 24, 8],
  [-36, 32, 8, 21, 8],
  [-24, 40, 6, 15, 6],
  [24, 40, 8, 20, 7],
  [36, 32, 7, 17, 7],
];

skyline.forEach((data, i) => {
  createSkyBuilding(
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    i % 2 === 0 ? 0x00eaff : 0x7b5cff
  );
});

/* ========================================================= STAR / PARTICLE FIELD ========================================================= */

const particleCount = 850;

const particlePositions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  particlePositions[i * 3] = (Math.random() - 0.5) * 150;

  particlePositions[i * 3 + 1] = 4 + Math.random() * 34;

  particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 150;
}

const particleGeometry = new THREE.BufferGeometry();

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(particlePositions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  color: 0x8be9ff,
  size: 0.075,
  transparent: true,
  opacity: 0.72,
});

const particles = new THREE.Points(particleGeometry, particleMaterial);

scene.add(particles);

/* ========================================================= PLAYER + PREMIUM ROBOT ========================================================= */

const player = new THREE.Group();

player.position.set(0, 0, 5);

scene.add(player);

let robotCore;
let robotRing;
let robotEye;

function createRobot() {
  const robot = new THREE.Group();

  /* Feet */

  for (const x of [-0.34, 0.34]) {
    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.22, 0.72),
      standardMaterial(0x111b2d, 0x06121e, 0.7, 0.8, 0.3)
    );

    foot.position.set(x, 0.12, -0.02);

    robot.add(foot);
  }

  /* Legs */

  for (const x of [-0.32, 0.32]) {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.95, 0.42),
      standardMaterial(0x162239, 0x071321, 0.8, 0.75, 0.32)
    );

    leg.position.set(x, 0.67, 0);

    robot.add(leg);
  }

  /* Body */

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.35, 1.45, 0.85),
    standardMaterial(0x17243a, 0x061523, 0.8, 0.85, 0.28)
  );

  body.position.y = 1.55;

  body.castShadow = true;
  robot.add(body);

  /* Chest core */

  robotCore = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 20, 20),
    standardMaterial(0x00eaff, 0x00eaff, 5, 0.5, 0.15)
  );

  robotCore.position.set(0, 1.62, -0.46);

  robot.add(robotCore);

  /* Head */

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(1.22, 0.86, 0.86),
    standardMaterial(0x202f49, 0x071422, 0.75, 0.8, 0.25)
  );

  head.position.y = 2.72;

  head.castShadow = true;
  robot.add(head);

  /* Visor */

  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.28, 0.055),
    basicMaterial(0x071521)
  );

  visor.position.set(0, 2.72, -0.45);

  robot.add(visor);

  /* Eyes */

  robotEye = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.08, 0.07),
    basicMaterial(0x00eaff)
  );

  robotEye.position.set(0, 2.72, -0.49);

  robot.add(robotEye);

  /* Arms */

  for (const x of [-0.88, 0.88]) {
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 1.18, 0.34),
      standardMaterial(0x152238, 0x06121e, 0.6, 0.75, 0.3)
    );

    arm.position.set(x, 1.55, 0);

    robot.add(arm);

    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.23, 16, 16),
      basicMaterial(0x7b5cff)
    );

    shoulder.position.set(x, 2.03, 0);

    robot.add(shoulder);
  }

  /* Energy ring */

  robotRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.05, 0.035, 8, 48),
    basicMaterial(0x00eaff)
  );

  robotRing.rotation.x = Math.PI / 2;

  robotRing.position.y = 0.12;

  robot.add(robotRing);

  return robot;
}

const robot = createRobot();

player.add(robot);

/* ========================================================= CONTROLS ========================================================= */

const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

const speed = 0.14;

window.addEventListener("keydown", (event) => {
  if (event.key === "w" || event.key === "ArrowUp") keys.up = true;

  if (event.key === "s" || event.key === "ArrowDown") keys.down = true;

  if (event.key === "a" || event.key === "ArrowLeft") keys.left = true;

  if (event.key === "d" || event.key === "ArrowRight") keys.right = true;
});

window.addEventListener("keyup", (event) => {
  if (event.key === "w" || event.key === "ArrowUp") keys.up = false;

  if (event.key === "s" || event.key === "ArrowDown") keys.down = false;

  if (event.key === "a" || event.key === "ArrowLeft") keys.left = false;

  if (event.key === "d" || event.key === "ArrowRight") keys.right = false;
});

/* ========================================================= MOBILE BUTTONS ========================================================= */

function holdButton(id, key) {
  const button = document.getElementById(id);

  if (!button) return;

  const start = (event) => {
    event.preventDefault();
    keys[key] = true;
  };

  const stop = (event) => {
    event.preventDefault();
    keys[key] = false;
  };

  button.addEventListener("pointerdown", start);

  button.addEventListener("pointerup", stop);

  button.addEventListener("pointercancel", stop);

  button.addEventListener("pointerleave", stop);
}

holdButton("up", "up");
holdButton("down", "down");
holdButton("left", "left");
holdButton("right", "right");

/* ========================================================= PANEL ========================================================= */

function showPanel(building) {
  if (!infoPanel) return;

  panelTitle.textContent = building.userData.title;

  panelDescription.textContent = building.userData.description;

  if (panelIcon) {
    panelIcon.textContent = building.userData.icon;
  }

  if (panelAction) {
    panelAction.textContent = "EXPLORE";
  }

  infoPanel.classList.add("show");
}

if (closePanel) {
  closePanel.addEventListener("click", () => {
    infoPanel.classList.remove("show");
  });
}

/* ========================================================= RAYCASTING ========================================================= */

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

renderer.domElement.addEventListener("click", (event) => {
  const rect = renderer.domElement.getBoundingClientRect();

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;

  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const objects = [];

  buildings.forEach((building) => {
    building.traverse((child) => {
      if (child.isMesh) {
        objects.push(child);
      }
    });
  });

  const hits = raycaster.intersectObjects(objects);

  if (hits.length > 0) {
    let object = hits[0].object;

    while (object.parent && !object.userData.title) {
      object = object.parent;
    }

    if (object.userData && object.userData.title) {
      showPanel(object);
    }
  }
});

/* ========================================================= CAMERA ========================================================= */

function updateCamera() {
  const target = new THREE.Vector3(player.position.x, 2.3, player.position.z);

  const desired = new THREE.Vector3(
    player.position.x,
    7.5,
    player.position.z + 16
  );

  camera.position.lerp(desired, 0.075);

  camera.lookAt(target);
}

/* ========================================================= MOVEMENT ========================================================= */

function updatePlayer() {
  let moved = false;

  if (keys.up) {
    player.position.z -= speed;
    moved = true;
  }

  if (keys.down) {
    player.position.z += speed;
    moved = true;
  }

  if (keys.left) {
    player.position.x -= speed;
    moved = true;
  }

  if (keys.right) {
    player.position.x += speed;
    moved = true;
  }

  player.position.x = THREE.MathUtils.clamp(player.position.x, -70, 70);

  player.position.z = THREE.MathUtils.clamp(player.position.z, -70, 70);

  if (moved) {
    if (keys.left) robot.rotation.y = -Math.PI / 2;
    else if (keys.right) robot.rotation.y = Math.PI / 2;
    else if (keys.up) robot.rotation.y = Math.PI;
    else if (keys.down) robot.rotation.y = 0;
  }
}

/* ========================================================= ANIMATION ========================================================= */

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();

  updatePlayer();
  updateCamera();

  /* Hologram */

  holoGroup.rotation.y = time * 0.12;

  aiDiamond.rotation.y = time * 0.75;

  aiDiamond.rotation.x = Math.sin(time * 1.4) * 0.15;

  diamondWire.rotation.y = -time * 0.5;

  holoTop.rotation.z = time * 0.6;

  holoBottom.rotation.z = -time * 0.45;

  /* Plaza lights */

  plazaEdge.rotation.z = time * 0.12;

  plazaInner.rotation.z = -time * 0.16;

  /* Building rings */

  buildings.forEach((building, index) => {
    const ring = building.children.find(
      (child) => child.geometry && child.geometry.type === "TorusGeometry"
    );

    if (ring) {
      ring.rotation.z = time * (0.25 + index * 0.045);
    }
  });

  /* Robot */

  robot.position.y = Math.sin(time * 2.8) * 0.035;

  if (robotCore) {
    const pulse = 1 + Math.sin(time * 5) * 0.12;

    robotCore.scale.setScalar(pulse);
  }

  if (robotRing) {
    robotRing.rotation.z = time * 0.8;
  }

  if (robotEye) {
    robotEye.material.opacity = 0.65 + Math.sin(time * 4) * 0.35;
  }

  /* Particles */

  particles.rotation.y = time * 0.008;

  renderer.render(scene, camera);
}

animate();

/* ========================================================= RESIZE ========================================================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
});

/* ========================================================= LOADING ========================================================= */

let progress = 0;

const loadingInterval = setInterval(() => {
  progress += Math.random() * 15;

  if (progress >= 100) {
    progress = 100;

    clearInterval(loadingInterval);

    if (loadingText) {
      loadingText.textContent = "Welcome to the AI World";
    }

    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.classList.add("hidden");
      }
    }, 450);
  }

  if (loadingProgress) {
    loadingProgress.style.width = progress + "%";
  }
}, 100);
