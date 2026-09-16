import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js";
/* ==========================================
   SHUBHAM'S 3D AI PORTFOLIO
   REAL THREE.JS WORLD
   ========================================== */

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

/* ==========================================
   SCENE
   ========================================== */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x02030a);

scene.fog = new THREE.FogExp2(
    0x02030a,
    0.012
);

/* ==========================================
   CAMERA
   ========================================== */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(
    0,
    7,
    15
);

/* ==========================================
   RENDERER
   ========================================== */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "default"
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type =
    THREE.PCFSoftShadowMap;

app.appendChild(renderer.domElement);

/* ==========================================
   LIGHTING
   ========================================== */

const ambientLight =
    new THREE.AmbientLight(
        0x6677aa,
        1.4
    );

scene.add(ambientLight);

const moonLight =
    new THREE.DirectionalLight(
        0x99bbff,
        2
    );

moonLight.position.set(
    20,
    40,
    20
);

moonLight.castShadow = true;

scene.add(moonLight);

const cyanLight =
    new THREE.PointLight(
        0x00eaff,
        30,
        60
    );

cyanLight.position.set(
    0,
    8,
    0
);

scene.add(cyanLight);

const purpleLight =
    new THREE.PointLight(
        0x7b5cff,
        35,
        70
    );

purpleLight.position.set(
    -25,
    8,
    -20
);

scene.add(purpleLight);

/* ==========================================
   MATERIAL HELPERS
   ========================================== */

function material(
    color,
    emissive = 0x000000,
    intensity = 0
) {
    return new THREE.MeshStandardMaterial({
        color,
        roughness: 0.65,
        metalness: 0.35,
        emissive,
        emissiveIntensity: intensity
    });
}

/* ==========================================
   GROUND
   ========================================== */

const groundGeometry =
    new THREE.PlaneGeometry(
        180,
        180
    );

const groundMaterial =
    material(0x050811);

const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );

ground.rotation.x =
    -Math.PI / 2;

ground.receiveShadow = true;

scene.add(ground);

/* ==========================================
   GRID
   ========================================== */

const grid =
    new THREE.GridHelper(
        180,
        90,
        0x14506a,
        0x0a2030
    );

grid.position.y = 0.02;

scene.add(grid);

/* ==========================================
   ROADS
   ========================================== */

function createRoad(
    x,
    z,
    width,
    depth
) {

    const geometry =
        new THREE.BoxGeometry(
            width,
            0.08,
            depth
        );

    const mat =
        material(0x080b13);

    const road =
        new THREE.Mesh(
            geometry,
            mat
        );

    road.position.set(
        x,
        0.04,
        z
    );

    scene.add(road);

    return road;
}

createRoad(
    0,
    0,
    180,
    8
);

createRoad(
    0,
    0,
    8,
    180
);

/* ==========================================
   ROAD LIGHTS
   ========================================== */

function createRoadLights() {

    for (
        let i = -80;
        i <= 80;
        i += 8
    ) {

        createLightPole(
            i,
            -5
        );

        createLightPole(
            i,
            5
        );
    }
}

function createLightPole(
    x,
    z
) {

    const pole =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.04,
                0.04,
                1.8,
                8
            ),
            material(0x354052)
        );

    pole.position.set(
        x,
        0.9,
        z
    );

    scene.add(pole);

    const lamp =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.12,
                12,
                12
            ),
            material(
                0x00eaff,
                0x00eaff,
                4
            )
        );

    lamp.position.set(
        x,
        1.8,
        z
    );

    scene.add(lamp);
}

createRoadLights();

/* ==========================================
   BUILDINGS
   ========================================== */

const buildings = [];

function createBuilding(
    x,
    z,
    width,
    height,
    depth,
    title,
    description,
    icon
) {

    const group =
        new THREE.Group();

    group.position.set(
        x,
        0,
        z
    );

    /* MAIN BUILDING */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                height,
                depth
            ),
            material(
                0x10182b,
                0x061421,
                0.4
            )
        );

    body.position.y =
        height / 2;

    body.castShadow = true;
    body.receiveShadow = true;

    group.add(body);

    /* TOP CORE */

    const core =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width * 0.7,
                0.15,
                depth * 0.7
            ),
            material(
                0x00eaff,
                0x00eaff,
                3
            )
        );

    core.position.y =
        height + 0.1;

    group.add(core);

    /* WINDOWS */

    const windowMaterial =
        material(
            0x12384a,
            0x00bfff,
            1.2
        );

    for (
        let y = 1.3;
        y < height - 0.5;
        y += 1.3
    ) {

        for (
            let wx = -width / 2 + 0.6;
            wx < width / 2;
            wx += 1.1
        ) {

            const window =
                new THREE.Mesh(
                    new THREE.BoxGeometry(
                        0.45,
                        0.5,
                        0.04
                    ),
                    windowMaterial
                );

            window.position.set(
                wx,
                y,
                depth / 2 + 0.03
            );

            group.add(window);
        }
    }

    /* FLOATING RING */

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                width * 0.55,
                0.035,
                8,
                48
            ),
            material(
                0x7b5cff,
                0x7b5cff,
                3
            )
        );

    ring.rotation.x =
        Math.PI / 2;

    ring.position.y =
        height + 1;

    group.add(ring);

    /* INTERACTION BASE */

    const base =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                width * 0.7,
                width * 0.7,
                0.08,
                32
            ),
            material(
                0x00eaff,
                0x00eaff,
                1.5
            )
        );

    base.position.y =
        0.08;

    group.add(base);

    group.userData = {
        title,
        description,
        icon,
        action: title
    };

    buildings.push(group);

    scene.add(group);

    return group;
}

/* ==========================================
   PORTFOLIO BUILDINGS
   ========================================== */

createBuilding(
    -18,
    -18,
    7,
    10,
    7,
    "ABOUT ME",
    "AIML student and technology enthusiast building practical AI, web and robotics projects.",
    "👤"
);

createBuilding(
    18,
    -18,
    8,
    14,
    8,
    "AI LAB",
    "An interactive space representing machine learning, artificial intelligence and experimentation.",
    "🧠"
);

createBuilding(
    -18,
    18,
    8,
    13,
    8,
    "PROJECTS",
    "Explore the projects I have designed, developed and experimented with.",
    "🚀"
);

createBuilding(
    18,
    18,
    7,
    11,
    7,
    "ACHIEVEMENTS",
    "Certificates, competitions, hackathons and milestones.",
    "🏆"
);

createBuilding(
    0,
    -32,
    8,
    12,
    8,
    "RESUME",
    "View my skills, education, projects and career journey.",
    "📄"
);
/* ==========================================
   PREMIUM CITY ENVIRONMENT
   ========================================== */

function createNeonStrip(x, y, z, width, depth, color) {
    const strip = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.035, depth),
        new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9
        })
    );

    strip.position.set(x, y, z);
    scene.add(strip);

    return strip;
}

/* CENTRAL PLAZA */

const plaza = new THREE.Mesh(
    new THREE.CylinderGeometry(
        9,
        9,
        0.12,
        64
    ),
    new THREE.MeshStandardMaterial({
        color: 0x07101c,
        metalness: 0.8,
        roughness: 0.3,
        emissive: 0x061b2a,
        emissiveIntensity: 0.8
    })
);

plaza.position.y = 0.08;
scene.add(plaza);

/* PLAZA RINGS */

for (let i = 0; i < 3; i++) {

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
            4 + i * 1.7,
            0.035,
            8,
            96
        ),
        new THREE.MeshBasicMaterial({
            color: i % 2 === 0
                ? 0x00eaff
                : 0x7b5cff,
            transparent: true,
            opacity: 0.8
        })
    );

    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.16;

    scene.add(ring);
}

/* NEON ROAD STRIPS */

createNeonStrip(
    0,
    0.11,
    0,
    170,
    0.06,
    0x00eaff
);

createNeonStrip(
    0,
    0.11,
    0,
    0.06,
    170,
    0x7b5cff
);

/* HOLOGRAPHIC CITY PILLARS */

function createHoloPillar(x, z, color) {

    const group = new THREE.Group();

    const pillar = new THREE.Mesh(
        new THREE.CylinderGeometry(
            0.18,
            0.18,
            4,
            16
        ),
        new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2.5,
            metalness: 0.6,
            roughness: 0.25
        })
    );

    pillar.position.y = 2;

    group.add(pillar);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(
            0.65,
            0.035,
            8,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: color
        })
    );

    ring.rotation.x = Math.PI / 2;
    ring.position.y = 2;

    group.add(ring);

    const light = new THREE.PointLight(
        color,
        8,
        10
    );

    light.position.y = 2;

    group.add(light);

    group.position.set(x, 0, z);

    scene.add(group);

    return group;
}

createHoloPillar(-7, -7, 0x00eaff);
createHoloPillar(7, -7, 0x7b5cff);
createHoloPillar(-7, 7, 0x7b5cff);
createHoloPillar(7, 7, 0x00eaff);

/* DISTANT FUTURISTIC SKYLINE */

function createSkyBuilding(x, z, width, height, depth) {

    const building = new THREE.Mesh(
        new THREE.BoxGeometry(
            width,
            height,
            depth
        ),
        new THREE.MeshStandardMaterial({
            color: 0x070d18,
            metalness: 0.7,
            roughness: 0.4,
            emissive: 0x020914,
            emissiveIntensity: 0.7
        })
    );

    building.position.set(
        x,
        height / 2,
        z
    );

    scene.add(building);

    /* rooftop glow */

    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(
            width * 0.75,
            0.08,
            depth * 0.75
        ),
        new THREE.MeshBasicMaterial({
            color: 0x00eaff
        })
    );

    roof.position.set(
        x,
        height + 0.05,
        z
    );

    scene.add(roof);
}

/* BACKGROUND CITY */

const skyline = [
    [-55, -45, 8, 20, 8],
    [-42, -52, 6, 14, 7],
    [-28, -55, 9, 24, 8],
    [28, -55, 8, 19, 8],
    [43, -50, 7, 27, 7],
    [58, -42, 10, 18, 9],
    [-55, 45, 9, 25, 9],
    [-40, 52, 7, 18, 7],
    [40, 52, 9, 23, 8],
    [55, 45, 7, 17, 7]
];

skyline.forEach(data => {
    createSkyBuilding(
        data[0],
        data[1],
        data[2],
        data[3],
        data[4]
    );
});

/* FLOATING CITY MARKERS */

function createFloatingMarker(x, y, z, color) {

    const marker = new THREE.Mesh(
        new THREE.OctahedronGeometry(
            0.35,
            1
        ),
        new THREE.MeshBasicMaterial({
            color: color
        })
    );

    marker.position.set(
        x,
        y,
        z
    );

    scene.add(marker);

    return marker;
}

createFloatingMarker(
    -12,
    5,
    -8,
    0x00eaff
);

createFloatingMarker(
    12,
    6,
    -8,
    0x7b5cff
);

createFloatingMarker(
    -12,
    5,
    8,
    0x7b5cff
);

createFloatingMarker(
    12,
    6,
    8,
    0x00eaff
);

/* ==========================================
   CENTRAL AI CORE
   ========================================== */

const coreGroup =
    new THREE.Group();

scene.add(coreGroup);

const core =
    new THREE.Mesh(
        new THREE.IcosahedronGeometry(
            2.2,
            2
        ),
        new THREE.MeshStandardMaterial({
            color: 0x00eaff,
            emissive: 0x00eaff,
            emissiveIntensity: 3,
            roughness: 0.2,
            metalness: 0.6,
            wireframe: false
        })
    );

coreGroup.add(core);

const coreWire =
    new THREE.Mesh(
        new THREE.IcosahedronGeometry(
            2.6,
            1
        ),
        new THREE.MeshBasicMaterial({
            color: 0x7b5cff,
            wireframe: true,
            transparent: true,
            opacity: 0.7
        })
    );

coreGroup.add(coreWire);

for (
    let i = 0;
    i < 3;
    i++
) {

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                3 + i * 0.55,
                0.035,
                8,
                64
            ),
            new THREE.MeshBasicMaterial({
                color:
                    i % 2 === 0
                        ? 0x00eaff
                        : 0x7b5cff
            })
        );

    ring.rotation.x =
        Math.random() * Math.PI;

    ring.rotation.y =
        Math.random() * Math.PI;

    ring.userData.speed =
        0.003 + i * 0.002;

    coreGroup.add(ring);
}

/* ==========================================
   ROBOT PLAYER
   ========================================== */

const player =
    new THREE.Group();

player.position.set(
    0,
    0,
    10
);

scene.add(player);

function createRobot() {

    const robot =
        new THREE.Group();

    /* BODY */

    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.2,
                1.5,
                0.8
            ),
            material(
                0x28334a,
                0x07101c,
                0.4
            )
        );

    body.position.y = 1.4;

    body.castShadow = true;

    robot.add(body);

    /* HEAD */

    const head =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.15,
                0.85,
                0.85
            ),
            material(
                0x35435e,
                0x07101c,
                0.4
            )
        );

    head.position.y = 2.55;

    head.castShadow = true;

    robot.add(head);

    /* EYES */

    const eyeMaterial =
        material(
            0x00eaff,
            0x00eaff,
            5
        );

    for (
        const x of [-0.27, 0.27]
    ) {

        const eye =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.18,
                    0.18,
                    0.08
                ),
                eyeMaterial
            );

        eye.position.set(
            x,
            2.58,
            -0.45
        );

        robot.add(eye);
    }

    /* ARMS */

    for (
        const x of [-0.85, 0.85]
    ) {

        const arm =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.35,
                    1.25,
                    0.35
                ),
                material(
                    0x202b40
                )
            );

        arm.position.set(
            x,
            1.45,
            0
        );

        arm.castShadow = true;

        robot.add(arm);
    }

    /* LEGS */

    for (
        const x of [-0.32, 0.32]
    ) {

        const leg =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.4,
                    1.1,
                    0.45
                ),
                material(
                    0x1c2638
                )
            );

        leg.position.set(
            x,
            0.45,
            0
        );

        leg.castShadow = true;

        robot.add(leg);
    }

    /* ENERGY RING */

    const ring =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1,
                0.04,
                8,
                32
            ),
            new THREE.MeshBasicMaterial({
                color: 0x00eaff
            })
        );

    ring.rotation.x =
        Math.PI / 2;

    ring.position.y = 0.12;

    robot.add(ring);

    return robot;
}

const robot =
    createRobot();

player.add(robot);

/* ==========================================
   PARTICLES
   ========================================== */

const particleCount = 1200;

const positions =
    new Float32Array(
        particleCount * 3
    );

for (
    let i = 0;
    i < particleCount;
    i++
) {

    positions[i * 3] =
        (Math.random() - 0.5) * 160;

    positions[i * 3 + 1] =
        Math.random() * 35;

    positions[i * 3 + 2] =
        (Math.random() - 0.5) * 160;
}

const particleGeometry =
    new THREE.BufferGeometry();

particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(
        positions,
        3
    )
);

const particleMaterial =
    new THREE.PointsMaterial({
        color: 0x66ddff,
        size: 0.08,
        transparent: true,
        opacity: 0.7
    });

const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(particles);

/* ==========================================
   PLAYER MOVEMENT
   ========================================== */

const keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

const speed = 0.16;

window.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "w" ||
            event.key === "ArrowUp"
        )
            keys.up = true;

        if (
            event.key === "s" ||
            event.key === "ArrowDown"
        )
            keys.down = true;

        if (
            event.key === "a" ||
            event.key === "ArrowLeft"
        )
            keys.left = true;

        if (
            event.key === "d" ||
            event.key === "ArrowRight"
        )
            keys.right = true;
    }
);

window.addEventListener(
    "keyup",
    (event) => {

        if (
            event.key === "w" ||
            event.key === "ArrowUp"
        )
            keys.up = false;

        if (
            event.key === "s" ||
            event.key === "ArrowDown"
        )
            keys.down = false;

        if (
            event.key === "a" ||
            event.key === "ArrowLeft"
        )
            keys.left = false;

        if (
            event.key === "d" ||
            event.key === "ArrowRight"
        )
            keys.right = false;
    }
);

/* ==========================================
   MOBILE BUTTONS
   ========================================== */

function holdButton(
    id,
    key
) {

    const button =
        document.getElementById(id);

    if (!button) return;

    const start = (event) => {
        event.preventDefault();
        keys[key] = true;
    };

    const stop = (event) => {
        event.preventDefault();
        keys[key] = false;
    };

    button.addEventListener(
        "pointerdown",
        start
    );

    button.addEventListener(
        "pointerup",
        stop
    );

    button.addEventListener(
        "pointercancel",
        stop
    );

    button.addEventListener(
        "pointerleave",
        stop
    );
}

holdButton("up", "up");
holdButton("down", "down");
holdButton("left", "left");
holdButton("right", "right");

/* ==========================================
   PANEL
   ========================================== */

function showPanel(
    building
) {

    panelTitle.textContent =
        building.userData.title;

    panelDescription.textContent =
        building.userData.description;

    panelIcon.textContent =
        building.userData.icon;

    infoPanel.classList.add(
        "show"
    );
}

closePanel.addEventListener(
    "click",
    () => {
        infoPanel.classList.remove(
            "show"
        );
    }
);

/* ==========================================
   RAYCASTING
   ========================================== */

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();

function interact(
    event
) {

    const rect =
        renderer.domElement.getBoundingClientRect();

    mouse.x =
        ((event.clientX - rect.left)
            / rect.width) * 2 - 1;

    mouse.y =
        -((event.clientY - rect.top)
            / rect.height) * 2 + 1;

    raycaster.setFromCamera(
        mouse,
        camera
    );

    const objects = [];

    buildings.forEach(
        building => {

            building.traverse(
                child => {

                    if (
                        child.isMesh
                    ) {
                        objects.push(
                            child
                        );
                    }
                }
            );
        }
    );

    const hits =
        raycaster.intersectObjects(
            objects
        );

    if (hits.length > 0) {

        let object =
            hits[0].object;

        while (
            object.parent &&
            !object.userData.title
        ) {
            object =
                object.parent;
        }

        if (
            object.userData.title
        ) {
            showPanel(object);
        }
    }
}

renderer.domElement.addEventListener(
    "click",
    interact
);

/* ==========================================
   CAMERA FOLLOW
   ========================================== */

function updateCamera() {

    const target =
        new THREE.Vector3(
            player.position.x,
            2.5,
            player.position.z
        );

    const desired =
        new THREE.Vector3(
            player.position.x,
            7,
            player.position.z + 14
        );

    camera.position.lerp(
        desired,
        0.08
    );

    camera.lookAt(target);
}

/* ==========================================
   MOVEMENT
   ========================================== */

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

    /* WORLD LIMIT */

    player.position.x =
        THREE.MathUtils.clamp(
            player.position.x,
            -75,
            75
        );

    player.position.z =
        THREE.MathUtils.clamp(
            player.position.z,
            -75,
            75
            );

    if (moved) {

        robot.rotation.y =
            Math.atan2(
                keys.left
                    ? -1
                    : keys.right
                    ? 1
                    : 0,
                keys.up
                    ? -1
                    : keys.down
                    ? 1
                    : 0
            );
    }
}

/* ==========================================
   ANIMATION
   ========================================== */

const clock =
    new THREE.Clock();

function animate() {

    requestAnimationFrame(
        animate
    );

    const time =
        clock.getElapsedTime();

    updatePlayer();
    updateCamera();

    /* AI CORE */

    core.rotation.y =
        time * 0.5;

    core.rotation.x =
        time * 0.25;

    coreWire.rotation.y =
        -time * 0.35;

    coreGroup.position.y =
        3 +
        Math.sin(time * 2) * 0.3;

    /* RINGS */

    coreGroup.children.forEach(
        child => {

            if (
                child.userData &&
                child.userData.speed
            ) {

                child.rotation.z +=
                    child.userData.speed;
            }
        }
    );

    /* BUILDING RINGS */

    buildings.forEach(
        (building, index) => {

            const ring =
                building.children.find(
                    child =>
                        child.geometry &&
                        child.geometry.type ===
                        "TorusGeometry"
                );

            if (ring) {

                ring.rotation.z =
                    time *
                    (0.3 +
                        index * 0.05);
            }
        }
    );

    /* ROBOT FLOAT */

    robot.position.y =
        Math.sin(time * 3) *
        0.03;

    /* PARTICLES */

    particles.rotation.y =
        time * 0.01;

    renderer.render(
        scene,
        camera
    );
}

/* ==========================================
   RESIZE
   ========================================== */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );
    }
);

/* ==========================================
   LOADING
   ========================================== */

let progress = 0;

const loadingInterval =
    setInterval(() => {

        progress +=
            Math.random() * 12;

        if (progress >= 100) {

            progress = 100;

            clearInterval(
                loadingInterval
            );

            loadingText.textContent =
                "Welcome to the AI World";

            setTimeout(() => {

                loadingScreen.classList.add(
                    "hidden"
                );

            }, 500);
        }

        loadingProgress.style.width =
            progress + "%";

    }, 120);

/* ==========================================
   START
   ========================================== */

animate();

console.log(
    "🚀 SHUBHAM'S REAL 3D AI PORTFOLIO LOADED"
);
