import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// ── All game data inline ─────────────────────────────────────────────
const MAP_SIZE = 80;
const HALF = 40;
const GRAVITY = -20;
const JUMP_FORCE = 6;
const INTERACT_DIST = 9;

const SHOPS = [
  {
    id: "grocery", name: "Sakura Grocery",
    pos: [20, 0, 20], signColor: "#c0392b",
    wallHex: 0xfff5f5, roofHex: 0xc0392b,
    items: [
      { id: "rice",  name: "Rice",      price: 10, emoji: "🍚" },
      { id: "ramen", name: "Ramen",     price: 15, emoji: "🍜" },
      { id: "tea",   name: "Green Tea", price: 8,  emoji: "🍵" },
      { id: "miso",  name: "Miso Soup", price: 6,  emoji: "🥣" },
      { id: "soy",   name: "Soy Sauce", price: 5,  emoji: "🫙" },
    ],
  },
  {
    id: "fruits", name: "Blossom Fruits",
    pos: [-22, 0, 14], signColor: "#27ae60",
    wallHex: 0xf0fff0, roofHex: 0x27ae60,
    items: [
      { id: "apple",  name: "Apple",      price: 5,  emoji: "🍎" },
      { id: "orange", name: "Orange",     price: 6,  emoji: "🍊" },
      { id: "straw",  name: "Strawberry", price: 12, emoji: "🍓" },
      { id: "peach",  name: "Peach",      price: 14, emoji: "🍑" },
      { id: "grape",  name: "Grapes",     price: 9,  emoji: "🍇" },
    ],
  },
  {
    id: "bakery", name: "Garden Bakery",
    pos: [4, 0, -24], signColor: "#e67e22",
    wallHex: 0xfffbf0, roofHex: 0xe67e22,
    items: [
      { id: "bread",   name: "Bread",       price: 7,  emoji: "🍞" },
      { id: "mochi",   name: "Mochi",       price: 9,  emoji: "🍡" },
      { id: "dango",   name: "Dango",       price: 11, emoji: "🍢" },
      { id: "mcake",   name: "Matcha Cake", price: 18, emoji: "🎂" },
      { id: "onigiri", name: "Onigiri",     price: 4,  emoji: "🍙" },
    ],
  },
];

const TREE_POSITIONS = [
  [-15,-10],[15,-8],[-8,20],[12,22],[-25,5],[25,-5],[-10,-20],[10,-18],
  [-30,15],[30,10],[-5,30],[5,-30],[20,-25],[-20,25],[35,25],[-35,-25],
  [28,28],[-28,-28],[-32,0],[32,0],[0,35],[0,-35],
];

const LANTERN_POSITIONS = [
  [-10,0],[10,0],[0,-10],[0,10],[-20,0],[20,0],[0,-20],[0,20],
  [-5,-5],[5,-5],[-5,5],[5,5],[-15,15],[15,15],[-15,-15],[15,-15],
];

// ── Scene helpers ────────────────────────────────────────────────────
function makeSignTexture(text, bg) {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 512, 128);
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 5; ctx.strokeRect(5, 5, 502, 118);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 38px Arial";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, 256, 64);
  return new THREE.CanvasTexture(c);
}

function buildShop({ name, pos, wallHex, roofHex, signColor }) {
  const g = new THREE.Group();
  const mat = (hex, opts = {}) => new THREE.MeshLambertMaterial({ color: hex, ...opts });
  const wM  = mat(wallHex);
  const rM  = mat(roofHex);
  const wdM = mat(0x7a5c2e);
  const drM = mat(0x5d3a1a);
  const frM = mat(0x3d2010);
  const glM = new THREE.MeshPhongMaterial({ color: 0xadd8e6, transparent: true, opacity: 0.5, shininess: 100 });

  const add = (geo, m, x, y, z) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    mesh.castShadow = true; mesh.receiveShadow = true;
    g.add(mesh); return mesh;
  };

  add(new THREE.BoxGeometry(10, 0.4, 9),    wdM, 0, 0.2,  0);
  add(new THREE.BoxGeometry(10, 4.5, 0.3),  wM,  0, 2.65,-4.3);
  add(new THREE.BoxGeometry(0.3, 4.5, 9),   wM, -5, 2.65, 0);
  add(new THREE.BoxGeometry(0.3, 4.5, 9),   wM,  5, 2.65, 0);
  add(new THREE.BoxGeometry(10, 1.2, 0.3),  wM,  0, 4.3,  4.3);
  add(new THREE.BoxGeometry(10, 0.5, 0.3),  wM,  0, 0.65, 4.3);
  add(new THREE.BoxGeometry(1.5, 3, 0.3),   wM, -4.2, 2.5, 4.3);
  add(new THREE.BoxGeometry(1.5, 3, 0.3),   wM,  4.2, 2.5, 4.3);
  add(new THREE.BoxGeometry(1.8, 2.8, 0.18),drM, 0, 1.7, 4.35);
  add(new THREE.BoxGeometry(2.2, 0.2, 0.25),frM, 0, 3.2, 4.3);

  const kb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 6, 6),
    new THREE.MeshPhongMaterial({ color: 0xFFD700, shininess: 200 }));
  kb.position.set(0.7, 1.7, 4.46); g.add(kb);

  [-2.8, 2.8].forEach(wx => {
    add(new THREE.BoxGeometry(2.0, 2.0, 0.15), glM, wx, 2.5, 4.4);
    add(new THREE.BoxGeometry(2.3, 0.15,0.2),  frM, wx, 1.4, 4.38);
    add(new THREE.BoxGeometry(2.3, 0.15,0.2),  frM, wx, 3.6, 4.38);
    add(new THREE.BoxGeometry(0.15,2.3, 0.2),  frM, wx-1.1, 2.5, 4.38);
    add(new THREE.BoxGeometry(0.15,2.3, 0.2),  frM, wx+1.1, 2.5, 4.38);
  });

  add(new THREE.BoxGeometry(12.5, 0.35,11.5), rM, 0, 5.1, 0);
  add(new THREE.ConeGeometry(6, 2.8, 4),       rM, 0, 6.7, 0);
  add(new THREE.SphereGeometry(0.18, 8, 8),
    new THREE.MeshPhongMaterial({ color: 0xFFD700 }), 0, 8.2, 0);

  const sign = new THREE.Mesh(new THREE.BoxGeometry(7, 1.4, 0.15),
    new THREE.MeshLambertMaterial({ map: makeSignTexture(name, signColor) }));
  sign.position.set(0, 5.6, 4.25); g.add(sign);

  add(new THREE.BoxGeometry(8.5, 0.65, 1.8),
    mat(0xd4a26a), 0, 0.73, 1.8);

  const aw = new THREE.Mesh(new THREE.PlaneGeometry(9, 2.2),
    new THREE.MeshLambertMaterial({ color: roofHex, side: THREE.DoubleSide }));
  aw.position.set(0, 4.5, 5.8); aw.rotation.x = Math.PI / 5; g.add(aw);

  const lanM = new THREE.MeshPhongMaterial({ color: 0xff6b35, emissive: 0xff4400, emissiveIntensity: 0.4 });
  const lan = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 8), lanM);
  lan.scale.y = 1.6; lan.position.set(0, 4, 6.2); g.add(lan);
  const pl = new THREE.PointLight(0xff9955, 1.0, 12);
  pl.position.set(0, 4, 6.2); g.add(pl);

  g.position.set(...pos);
  g.rotation.y = Math.atan2(-pos[0], -pos[2]);
  return g;
}

function buildTree(x, z, s = 1) {
  const g = new THREE.Group();
  const tM = new THREE.MeshLambertMaterial({ color: 0x4a3c28 });
  const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.25*s, 0.42*s, 3.8*s, 8), tM);
  tr.position.y = 1.9*s; tr.castShadow = true; g.add(tr);
  [
    [0,4,0,2.3],[1.5,3.5,0,1.9],[-1.5,3.5,0,1.9],
    [0,3.5,1.5,1.9],[0,3.5,-1.5,1.9],
    [0.9,4.6,0.9,1.6],[-0.9,4.6,0.9,1.6],
    [0.9,4.6,-0.9,1.6],[-0.9,4.6,-0.9,1.6],[0,5.6,0,1.4],
  ].forEach(([bx,by,bz,r]) => {
    const bm = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(0.93 + Math.random()*0.05, 0.75, 0.8),
      transparent: true, opacity: 0.9,
    });
    const b = new THREE.Mesh(new THREE.SphereGeometry(r*s*(0.8+Math.random()*0.3), 8, 6), bm);
    b.position.set(bx*s, by*s, bz*s); b.castShadow = true; g.add(b);
  });
  g.position.set(x, 0, z);
  return g;
}

function buildLantern(x, z) {
  const g = new THREE.Group();
  const stM = new THREE.MeshLambertMaterial({ color: 0x888878 });
  const glM = new THREE.MeshPhongMaterial({ color: 0xffee88, emissive: 0xffcc44, emissiveIntensity: 0.5 });
  const add = (geo, m, px, py, pz) => { const mesh = new THREE.Mesh(geo, m); mesh.position.set(px,py,pz); g.add(mesh); };
  add(new THREE.BoxGeometry(0.9,0.38,0.9),  stM, 0, 0.19, 0);
  add(new THREE.CylinderGeometry(0.2,0.2,1.9,6), stM, 0, 1.33, 0);
  add(new THREE.BoxGeometry(0.65,0.65,0.65), glM, 0, 2.47, 0);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.6,0.5,4),
    new THREE.MeshLambertMaterial({ color: 0x777767 }));
  cap.position.set(0,3.05,0); cap.rotation.y = Math.PI/4; g.add(cap);
  const pl = new THREE.PointLight(0xffaa44, 0.35, 7);
  pl.position.y = 2.47; g.add(pl);
  g.position.set(x, 0, z);
  return g;
}

function buildPond(x, z) {
  const g = new THREE.Group();
  const wM = new THREE.MeshPhongMaterial({ color: 0x4a90c8, transparent: true, opacity: 0.72, shininess: 130 });
  const w = new THREE.Mesh(new THREE.CircleGeometry(4.5, 24), wM);
  w.rotation.x = -Math.PI/2; w.position.y = -0.12; g.add(w);
  const e = new THREE.Mesh(new THREE.TorusGeometry(4.5,0.38,6,24),
    new THREE.MeshLambertMaterial({ color: 0x888878 }));
  e.rotation.x = -Math.PI/2; e.position.y = 0.05; e.castShadow = true; g.add(e);
  const pM = new THREE.MeshLambertMaterial({ color: 0x2d6a2d });
  for (let i = 0; i < 4; i++) {
    const r = 1.5+Math.random()*2, th = Math.random()*Math.PI*2;
    const p = new THREE.Mesh(new THREE.CircleGeometry(0.5+Math.random()*0.2,8), pM);
    p.rotation.x = -Math.PI/2; p.position.set(r*Math.cos(th), 0, r*Math.sin(th));
    g.add(p);
  }
  g.position.set(x, 0, z);
  return g;
}

function buildScene(scene) {
  // Lights
  scene.add(new THREE.AmbientLight(0xfff0f5, 0.75));
  scene.add(new THREE.HemisphereLight(0x87ceeb, 0x4a7c4a, 0.35));
  const sun = new THREE.DirectionalLight(0xfffacd, 1.3);
  sun.position.set(35, 80, 35); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left:-80, right:80, top:80, bottom:-80, far:200 });
  scene.add(sun);

  // Ground
  const gnd = new THREE.Mesh(new THREE.PlaneGeometry(MAP_SIZE, MAP_SIZE),
    new THREE.MeshLambertMaterial({ color: 0x4a7c4a }));
  gnd.rotation.x = -Math.PI/2; gnd.receiveShadow = true; scene.add(gnd);

  // Grass patches
  const dgM = new THREE.MeshLambertMaterial({ color: 0x3d6e3d });
  for (let i = 0; i < 30; i++) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(2+Math.random()*4,8), dgM);
    p.rotation.x = -Math.PI/2;
    p.position.set((Math.random()-0.5)*72, 0.01, (Math.random()-0.5)*72);
    scene.add(p);
  }

  // Stone paths
  const spM = new THREE.MeshLambertMaterial({ color: 0x999080 });
  for (let i = -19; i <= 19; i++) {
    const sx = new THREE.Mesh(new THREE.BoxGeometry(1.7,0.08,1.7), spM);
    sx.position.set(i*2.1, 0.04, 0); scene.add(sx);
    const sz = new THREE.Mesh(new THREE.BoxGeometry(1.7,0.08,1.7), spM);
    sz.position.set(0, 0.04, i*2.1); scene.add(sz);
  }
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(5.5,24),
    new THREE.MeshLambertMaterial({ color: 0xb5a898 }));
  plaza.rotation.x = -Math.PI/2; plaza.position.y = 0.03; scene.add(plaza);

  // Boundary fence
  const fnM = new THREE.MeshLambertMaterial({ color: 0x8b6933 });
  const poM = new THREE.MeshLambertMaterial({ color: 0x6b4e23 });
  [
    [0,1.0,-HALF,MAP_SIZE,0.25,0.4],[0,1.0,HALF,MAP_SIZE,0.25,0.4],
    [-HALF,1.0,0,0.4,0.25,MAP_SIZE],[HALF,1.0,0,0.4,0.25,MAP_SIZE],
    [0,1.8,-HALF,MAP_SIZE,0.25,0.4],[0,1.8,HALF,MAP_SIZE,0.25,0.4],
    [-HALF,1.8,0,0.4,0.25,MAP_SIZE],[HALF,1.8,0,0.4,0.25,MAP_SIZE],
  ].forEach(([x,y,z,w,h,d]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w,h,d), fnM);
    m.position.set(x,y,z); m.castShadow = true; scene.add(m);
  });
  for (let i = -HALF; i <= HALF; i += 4) {
    [HALF,-HALF].forEach(e => {
      [[i,1.15,e],[e,1.15,i]].forEach(([px,py,pz]) => {
        const p = new THREE.Mesh(new THREE.BoxGeometry(0.35,2.3,0.35), poM);
        p.position.set(px,py,pz); p.castShadow = true; scene.add(p);
      });
    });
  }

  // Gate
  const gM = new THREE.MeshLambertMaterial({ color: 0xcc3333 });
  const gcM = new THREE.MeshLambertMaterial({ color: 0x991111 });
  [-4,4].forEach(gx => {
    const gp = new THREE.Mesh(new THREE.BoxGeometry(0.8,5,0.8), gM);
    gp.position.set(gx,2.5,HALF); gp.castShadow = true; scene.add(gp);
    const gc = new THREE.Mesh(new THREE.BoxGeometry(1.4,0.6,1.4), gcM);
    gc.position.set(gx,5.3,HALF); scene.add(gc);
  });
  const gb = new THREE.Mesh(new THREE.BoxGeometry(8,0.6,0.5), gM);
  gb.position.set(0,4.5,HALF); scene.add(gb);

  // Trees
  TREE_POSITIONS.forEach(([x,z]) =>
    scene.add(buildTree(x, z, 0.75+Math.random()*0.65)));

  // Lanterns
  LANTERN_POSITIONS.forEach(([x,z]) => scene.add(buildLantern(x,z)));

  // Ponds
  scene.add(buildPond(-8, 9));
  scene.add(buildPond(14,-12));

  // Bamboo
  const bamM = new THREE.MeshLambertMaterial({ color: 0x567d2e });
  [-30,-32,-34,-28,-31].forEach((x,i) => {
    const h = 6+Math.random()*5;
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.15,h,6), bamM);
    b.position.set(x, h/2, [-8,-5,-10,-6,-12][i]);
    b.castShadow = true; scene.add(b);
  });

  // Shops
  SHOPS.forEach(s => scene.add(buildShop(s)));
}

function buildCharacter(scene) {
  const char = new THREE.Group();
  const bM  = new THREE.MeshLambertMaterial({ color: 0x2980b9 });
  const skM = new THREE.MeshLambertMaterial({ color: 0xffd9a0 });
  const haM = new THREE.MeshLambertMaterial({ color: 0x2c1810 });
  const paM = new THREE.MeshLambertMaterial({ color: 0x1a252f });
  const shM = new THREE.MeshPhongMaterial({ color: 0x111111, shininess: 80 });
  const eyM = new THREE.MeshPhongMaterial({ color: 0x222244, shininess: 100 });
  const add = (geo, m, x, y, z) => {
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x,y,z); mesh.castShadow = true; char.add(mesh); return mesh;
  };
  add(new THREE.BoxGeometry(0.65,0.88,0.32), bM,  0, 0.94, 0);
  add(new THREE.CylinderGeometry(0.11,0.11,0.14,6), skM, 0, 1.44, 0);
  add(new THREE.SphereGeometry(0.24,10,8), skM, 0, 1.64, 0);
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.26,10,8), haM);
  hair.position.set(0,1.73,-0.02); hair.scale.set(1,0.76,1); char.add(hair);
  [-0.1,0.1].forEach(ex => add(new THREE.SphereGeometry(0.045,6,6), eyM, ex, 1.64, 0.22));
  const lArm = add(new THREE.CylinderGeometry(0.09,0.09,0.75,6), bM, -0.42, 0.94, 0);
  const rArm = add(new THREE.CylinderGeometry(0.09,0.09,0.75,6), bM,  0.42, 0.94, 0);
  const lLeg = add(new THREE.CylinderGeometry(0.11,0.11,0.78,6), paM, -0.2, 0.39, 0);
  const rLeg = add(new THREE.CylinderGeometry(0.11,0.11,0.78,6), paM,  0.2, 0.39, 0);
  add(new THREE.BoxGeometry(0.26,0.14,0.4), shM, -0.2, 0.07, 0.05);
  add(new THREE.BoxGeometry(0.26,0.14,0.4), shM,  0.2, 0.07, 0.05);
  scene.add(char);
  return { char, lArm, rArm, lLeg, rLeg };
}

// ── Main Component ───────────────────────────────────────────────────
export default function TeaGardenGame() {
  const mountRef = useRef(null);
  const stRef = useRef({
    view: "first",
    coins: 100,
    inventory: [],
    nearShop: null,
    shopOpen: null,
    started: false,
    mouse: { down: false, lastX: 0, lastY: 0 },
    player: { pos: new THREE.Vector3(0, 1.7, 12), yaw: 0, pitch: 0, velY: 0, grounded: true },
    keys: new Set(),
    wt: 0,
  });
  const [ui, setUi] = useState({
    view: "first", coins: 100, inventory: [],
    nearShop: null, shopOpen: null, started: false,
  });

  const syncUi = (patch) => {
    Object.assign(stRef.current, patch);
    setUi(s => ({ ...s, ...patch }));
  };

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0xffd4e8, 20, 95);

    const camera = new THREE.PerspectiveCamera(70, el.clientWidth / el.clientHeight, 0.05, 250);

    buildScene(scene);
    const { char, lArm, rArm, lLeg, rLeg } = buildCharacter(scene);

    const shopVecs = SHOPS.map(s => ({
      id: s.id, vec: new THREE.Vector3(...s.pos),
    }));

    const st = stRef.current;

    // ── Keyboard
    const onKD = e => {
      st.keys.add(e.code);
      if (e.ctrlKey && e.code === "KeyV") {
        e.preventDefault();
        const v = st.view === "first" ? "third" : "first";
        syncUi({ view: v });
      }
      if (e.code === "KeyE" && st.nearShop && !st.shopOpen) {
        syncUi({ shopOpen: st.nearShop });
      }
      if (e.code === "Escape" && st.shopOpen) {
        syncUi({ shopOpen: null });
      }
    };
    const onKU = e => st.keys.delete(e.code);
    document.addEventListener("keydown", onKD);
    document.addEventListener("keyup", onKU);

    // ── Mouse drag-to-look
    const cvs = renderer.domElement;
    const startDrag = (cx, cy) => {
      st.mouse.down = true;
      st.mouse.lastX = cx; st.mouse.lastY = cy;
      if (!st.started) syncUi({ started: true });
    };
    const moveDrag = (cx, cy) => {
      if (!st.mouse.down || st.shopOpen) return;
      const dx = cx - st.mouse.lastX;
      const dy = cy - st.mouse.lastY;
      st.mouse.lastX = cx; st.mouse.lastY = cy;
      st.player.yaw  -= dx * 0.004;
      st.player.pitch = Math.max(-1.0, Math.min(1.0, st.player.pitch - dy * 0.004));
    };
    const endDrag = () => { st.mouse.down = false; };

    const onMD = e => startDrag(e.clientX, e.clientY);
    const onMM = e => moveDrag(e.clientX, e.clientY);
    const onTD = e => startDrag(e.touches[0].clientX, e.touches[0].clientY);
    const onTM = e => moveDrag(e.touches[0].clientX, e.touches[0].clientY);

    cvs.addEventListener("mousedown", onMD);
    cvs.addEventListener("touchstart", onTD);
    window.addEventListener("mousemove", onMM);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", onTM);
    window.addEventListener("touchend", endDrag);

    // ── Game loop
    const clock = new THREE.Clock();
    let raf;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      const { player, keys, view } = st;

      if (!st.shopOpen && st.started) {
        const spd = (keys.has("ShiftLeft") || keys.has("ShiftRight")) ? 12 : 6;
        const fwd = new THREE.Vector3(-Math.sin(player.yaw), 0, -Math.cos(player.yaw));
        const rt  = new THREE.Vector3( Math.cos(player.yaw), 0, -Math.sin(player.yaw));
        const mv  = new THREE.Vector3();
        if (keys.has("KeyW") || keys.has("ArrowUp"))    mv.addScaledVector(fwd,  1);
        if (keys.has("KeyS") || keys.has("ArrowDown"))  mv.addScaledVector(fwd, -1);
        if (keys.has("KeyA") || keys.has("ArrowLeft"))  mv.addScaledVector(rt,  -1);
        if (keys.has("KeyD") || keys.has("ArrowRight")) mv.addScaledVector(rt,   1);

        const moving = mv.lengthSq() > 0;
        if (moving) { mv.normalize(); st.wt += dt * spd * 2.5; }
        player.pos.x += mv.x * spd * dt;
        player.pos.z += mv.z * spd * dt;

        if (keys.has("Space") && player.grounded) {
          player.velY = JUMP_FORCE; player.grounded = false;
        }
        player.velY += GRAVITY * dt;
        player.pos.y += player.velY * dt;
        if (player.pos.y <= 1.7) {
          player.pos.y = 1.7; player.velY = 0; player.grounded = true;
        }

        const mg = 2.5;
        player.pos.x = Math.max(-HALF+mg, Math.min(HALF-mg, player.pos.x));
        player.pos.z = Math.max(-HALF+mg, Math.min(HALF-mg, player.pos.z));

        if (moving) {
          const sw = Math.sin(st.wt) * 0.5;
          lLeg.rotation.x =  sw; rLeg.rotation.x = -sw;
          lArm.rotation.x = -sw * 0.6; rArm.rotation.x =  sw * 0.6;
        } else {
          lLeg.rotation.x *= 0.85; rLeg.rotation.x *= 0.85;
          lArm.rotation.x *= 0.85; rArm.rotation.x *= 0.85;
        }

        let near = null, nd = INTERACT_DIST;
        shopVecs.forEach(sv => {
          const d = player.pos.distanceTo(sv.vec);
          if (d < nd) { nd = d; near = sv.id; }
        });
        if (near !== st.nearShop) syncUi({ nearShop: near });
      }

      char.position.set(player.pos.x, player.pos.y - 1.7, player.pos.z);
      char.rotation.y = player.yaw + Math.PI;

      if (view === "first") {
        char.visible = false;
        camera.position.copy(player.pos);
        camera.lookAt(
          player.pos.x - Math.sin(player.yaw) * Math.cos(player.pitch),
          player.pos.y + Math.sin(player.pitch),
          player.pos.z - Math.cos(player.yaw) * Math.cos(player.pitch)
        );
      } else {
        char.visible = true;
        camera.position.set(
          player.pos.x + Math.sin(player.yaw) * 7,
          player.pos.y + 3.5,
          player.pos.z + Math.cos(player.yaw) * 7
        );
        camera.lookAt(player.pos.x, player.pos.y + 0.8, player.pos.z);
      }

      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKD);
      document.removeEventListener("keyup", onKU);
      cvs.removeEventListener("mousedown", onMD);
      cvs.removeEventListener("touchstart", onTD);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", onTM);
      window.removeEventListener("touchend", endDrag);
      window.removeEventListener("resize", onResize);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // eslint-disable-line

  const handleBuy = item => {
    const st = stRef.current;
    if (st.coins < item.price) return;
    const coins = st.coins - item.price;
    const inventory = [...st.inventory, { ...item }];
    st.coins = coins; st.inventory = inventory;
    setUi(s => ({ ...s, coins, inventory }));
  };

  const closeShop = () => syncUi({ shopOpen: null });
  const shopData  = SHOPS.find(s => s.id === ui.shopOpen);
  const nearData  = SHOPS.find(s => s.id === ui.nearShop);

  const hud = {
    background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
    borderRadius: 12, padding: "8px 14px",
    border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontSize: 13,
  };

  return (
    <div style={{ width:"100%", height:"100vh", position:"relative", overflow:"hidden", fontFamily:"'Segoe UI',Arial,sans-serif", userSelect:"none" }}>
      <div ref={mountRef} style={{ width:"100%", height:"100%", cursor: ui.shopOpen ? "default" : "crosshair" }} />

      {/* Coins + View + Bag */}
      <div style={{ position:"absolute", top:14, left:14, display:"flex", flexDirection:"column", gap:8, pointerEvents:"none" }}>
        <div style={{ ...hud, color:"#FFD700", fontWeight:"bold", fontSize:17 }}>🪙 {ui.coins}</div>
        <div style={hud}>
          {ui.view === "first" ? "👁 First Person" : "🎮 Third Person"}
          <span style={{ opacity:0.45, fontSize:11, marginLeft:6 }}>Ctrl+V</span>
        </div>
        {ui.inventory.length > 0 && (
          <div style={{ ...hud, maxWidth:220 }}>
            <div style={{ fontSize:11, opacity:0.6, marginBottom:5 }}>🎒 Bag ({ui.inventory.length})</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
              {ui.inventory.map((it,i) => (
                <span key={i} style={{ background:"rgba(255,255,255,0.15)", borderRadius:6, padding:"2px 7px", fontSize:14 }}>{it.emoji}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div style={{ ...hud, position:"absolute", top:14, right:14, lineHeight:2.0, pointerEvents:"none" }}>
        {[["WASD","Move"],["Hold+Drag","Look"],["Space","Jump"],["Shift","Run"],["E","Open Shop"],["Ctrl+V","Toggle View"],["Esc","Close Shop"]].map(([k,v]) => (
          <div key={k} style={{ display:"flex", justifyContent:"space-between", gap:12 }}>
            <span style={{ background:"rgba(255,255,255,0.18)", borderRadius:4, padding:"0 5px", fontWeight:"bold", fontSize:11 }}>{k}</span>
            <span style={{ opacity:0.55, fontSize:12 }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Shop legend */}
      <div style={{ ...hud, position:"absolute", bottom:14, right:14, pointerEvents:"none" }}>
        <div style={{ opacity:0.5, fontSize:10, letterSpacing:1, textTransform:"uppercase", marginBottom:7 }}>Shops</div>
        {SHOPS.map(s => (
          <div key={s.id} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
            <div style={{ width:9, height:9, borderRadius:"50%", background:s.signColor, flexShrink:0 }} />
            <span style={{ fontSize:12 }}>{s.name}</span>
          </div>
        ))}
      </div>

      {/* Crosshair */}
      {ui.view === "first" && ui.started && !ui.shopOpen && (
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}>
          <div style={{ position:"absolute", width:18, height:2, top:"50%", left:0, transform:"translateY(-50%)", background:"rgba(255,255,255,0.8)", borderRadius:1 }} />
          <div style={{ position:"absolute", width:2, height:18, top:0, left:"50%", transform:"translateX(-50%)", background:"rgba(255,255,255,0.8)", borderRadius:1 }} />
        </div>
      )}

      {/* Start overlay */}
      {!ui.started && (
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.45)", backdropFilter:"blur(3px)", pointerEvents:"none" }}>
          <div style={{ background:"rgba(0,0,0,0.82)", color:"#fff", borderRadius:24, padding:"34px 58px", textAlign:"center", border:"1px solid rgba(255,255,255,0.15)", boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
            <div style={{ fontSize:52, marginBottom:10 }}>🌸</div>
            <div style={{ fontSize:22, fontWeight:300, letterSpacing:2 }}>Cherry Blossom Garden</div>
            <div style={{ fontSize:13, opacity:0.55, marginTop:10 }}>Click & drag to look around</div>
            <div style={{ fontSize:13, opacity:0.55, marginTop:4 }}>WASD to walk · E to shop</div>
          </div>
        </div>
      )}

      {/* Near-shop prompt */}
      {ui.nearShop && !ui.shopOpen && ui.started && (
        <div style={{ position:"absolute", bottom:"28%", left:"50%", transform:"translateX(-50%)", ...hud, fontSize:15, whiteSpace:"nowrap", pointerEvents:"none" }}>
          Press <kbd style={{ background:"rgba(255,255,255,0.25)", borderRadius:5, padding:"1px 8px", fontWeight:"bold", marginInline:4 }}>E</kbd>
          to enter <strong>{nearData?.name}</strong>
        </div>
      )}

      {/* Shop modal */}
      {ui.shopOpen && shopData && (
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)" }}
          onClick={e => { if (e.target === e.currentTarget) closeShop(); }}>
          <div style={{ background:"#fff", borderRadius:24, padding:28, width:"min(560px,92vw)", maxHeight:"84vh", overflow:"auto", boxShadow:"0 24px 80px rgba(0,0,0,0.5)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
              <div>
                <div style={{ fontSize:22, fontWeight:"bold", color:"#1a1a2e" }}>{shopData.name}</div>
                <div style={{ fontSize:13, color:"#888", marginTop:3 }}>🪙 {ui.coins} coins available</div>
              </div>
              <button onClick={closeShop} style={{ background:"#f2f2f2", color:"#333", border:"none", borderRadius:10, padding:"8px 16px", cursor:"pointer", fontWeight:"bold", fontSize:14 }}>
                ✕ Close
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))", gap:14 }}>
              {shopData.items.map(item => {
                const owned = ui.inventory.filter(i => i.id === item.id).length;
                const ok = ui.coins >= item.price;
                return (
                  <div key={item.id}
                    style={{ border:`2px solid ${ok?"#eee":"#fce8e8"}`, borderRadius:18, padding:"18px 12px", display:"flex", flexDirection:"column", alignItems:"center", gap:6, background:ok?"#fafafa":"#fff8f8", transition:"transform 0.15s,box-shadow 0.15s" }}
                    onMouseEnter={e => { if(ok){e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)";}}}
                    onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                    <div style={{ fontSize:38 }}>{item.emoji}</div>
                    <div style={{ fontWeight:"600", color:"#1a1a2e", fontSize:14, textAlign:"center" }}>{item.name}</div>
                    <div style={{ color:"#B8860B", fontWeight:"bold", fontSize:14 }}>🪙 {item.price}</div>
                    {owned > 0 && <div style={{ color:"#27ae60", fontSize:11, fontWeight:"bold" }}>✓ ×{owned} owned</div>}
                    <button onClick={() => handleBuy(item)} disabled={!ok}
                      style={{ background:ok?shopData.signColor:"#ddd", color:ok?"#fff":"#aaa", border:"none", borderRadius:10, padding:"7px 0", cursor:ok?"pointer":"not-allowed", fontWeight:"bold", fontSize:13, width:"100%", marginTop:4 }}>
                      {ok ? "Buy" : "Too costly"}
                    </button>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop:16, fontSize:12, color:"#bbb", textAlign:"center" }}>Esc or click outside to close</div>
          </div>
        </div>
      )}
    </div>
  );
}