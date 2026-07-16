// FIELD: NeRF-style point cloud
(function(){
  const c = document.getElementById('field');
  if(!c) return;
  const ctx = c.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w=0,h=0,t=0;
  function resize(){
    const r = c.getBoundingClientRect();
    w=r.width; h=r.height;
    c.width=w*dpr; c.height=h*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  resize();
  window.addEventListener('resize', resize);

  const N = 2400;
  const pts = [];
  for(let i=0;i<N;i++){
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos(2*Math.random()-1);
    const r = 0.5 + Math.pow(Math.random(),0.5)*0.5;
    pts.push({
      x:r*Math.sin(phi)*Math.cos(theta),
      y:r*Math.sin(phi)*Math.sin(theta)*1.2,
      z:r*Math.cos(phi),
      s:Math.random(),
      h: Math.random()<0.07 ? 1 : 0
    });
  }

  function frame(){
    t += 0.003;
    ctx.fillStyle = 'rgba(8,8,10,0.22)';
    ctx.fillRect(0,0,w,h);

    const cx = w*0.72, cy = h*0.5;
    const scale = Math.min(w,h)*0.40;
    const cosT = Math.cos(t), sinT = Math.sin(t);
    const scanY = cy + Math.sin(t*1.4)*scale*0.85;

    for(let i=0;i<N;i++){
      const p = pts[i];
      const x1 = p.x*cosT - p.z*sinT;
      const z1 = p.x*sinT + p.z*cosT;
      const pers = 1.6/(1.6 + z1);
      const sx = cx + x1*scale*pers;
      const sy = cy + p.y*scale*pers;
      const depth = (z1+1)/2;
      const dScan = Math.abs(sy-scanY);
      const glow = Math.max(0, 1 - dScan/70);
      const a = 0.18 + depth*0.55;
      const size = pers*(p.s*1.3+0.4) + glow*1.2;

      if(p.h){
        ctx.fillStyle = 'rgba(255,0,102,' + (a*0.9 + glow*0.4) + ')';
      } else if(glow > 0.15){
        ctx.fillStyle = 'rgba(0,255,136,' + (a + glow*0.55) + ')';
      } else {
        const g = 180 + Math.floor(depth*60);
        ctx.fillStyle = 'rgba(' + g + ',' + g + ',' + (g-15) + ',' + (a*0.65) + ')';
      }
      ctx.fillRect(sx, sy, size, size);
    }

    // bracket reticle
    ctx.strokeStyle = 'rgba(0,255,136,0.45)';
    ctx.lineWidth = 1.2;
    const br = 18;
    ctx.beginPath();
    ctx.moveTo(cx-br*2,cy-br*2); ctx.lineTo(cx-br,cy-br*2); ctx.moveTo(cx-br*2,cy-br*2); ctx.lineTo(cx-br*2,cy-br);
    ctx.moveTo(cx+br*2,cy-br*2); ctx.lineTo(cx+br,cy-br*2); ctx.moveTo(cx+br*2,cy-br*2); ctx.lineTo(cx+br*2,cy-br);
    ctx.moveTo(cx-br*2,cy+br*2); ctx.lineTo(cx-br,cy+br*2); ctx.moveTo(cx-br*2,cy+br*2); ctx.lineTo(cx-br*2,cy+br);
    ctx.moveTo(cx+br*2,cy+br*2); ctx.lineTo(cx+br,cy+br*2); ctx.moveTo(cx+br*2,cy+br*2); ctx.lineTo(cx+br*2,cy+br);
    ctx.stroke();
    requestAnimationFrame(frame);
  }
  frame();
})();

// PROJECT VISUALS
document.querySelectorAll('canvas[data-vis]').forEach(function(c){
  const kind = c.dataset.vis;
  const ctx = c.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio||1,2);
  function size(){
    const r = c.getBoundingClientRect();
    c.width = r.width*dpr; c.height = r.height*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    return [r.width, r.height];
  }
  let sz = size();
  let w = sz[0], h = sz[1];
  window.addEventListener('resize', function(){ const s = size(); w=s[0]; h=s[1]; });
  let t = Math.random()*100;

  function draw(){
    t += 0.01;
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0,0,w,h);

    if(kind==='terrain'){
      ctx.strokeStyle = 'rgba(0,255,136,0.5)';
      ctx.lineWidth = 0.7;
      const rows = 18, cols = 28;
      for(let r=0;r<rows;r++){
        ctx.beginPath();
        for(let i=0;i<cols;i++){
          const x = (i/(cols-1))*w;
          const baseY = h*0.55 + (r-rows/2)*8;
          const wave = Math.sin(i*0.5 + t + r*0.3) * (10 + r*0.6);
          const y = baseY + wave - r*2;
          if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.globalAlpha = 0.3 + (r/rows)*0.7;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    else if(kind==='splat'){
      for(let i=0;i<60;i++){
        const a = i*0.314 + t*0.5;
        const r = 30 + (i%5)*15;
        const x = w/2 + Math.cos(a)*r;
        const y = h/2 + Math.sin(a*1.3)*r*0.7;
        const sz = 18 + Math.sin(t+i)*8;
        const grad = ctx.createRadialGradient(x,y,0,x,y,sz);
        const col = i%7===0 ? '255,0,102' : '0,255,136';
        grad.addColorStop(0,'rgba('+col+',0.7)');
        grad.addColorStop(1,'rgba('+col+',0)');
        ctx.fillStyle = grad;
        ctx.fillRect(x-sz,y-sz,sz*2,sz*2);
      }
    }
    else if(kind==='grid'){
      ctx.strokeStyle = 'rgba(0,255,136,0.4)';
      ctx.lineWidth = 0.7;
      const step = 24;
      for(let x=0;x<w;x+=step){
        ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();
      }
      for(let y=0;y<h;y+=step){
        ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();
      }
      const px = ((Math.sin(t)*0.5+0.5)*w);
      const py = ((Math.cos(t*0.7)*0.5+0.5)*h);
      const grad = ctx.createRadialGradient(px,py,0,px,py,80);
      grad.addColorStop(0,'rgba(255,0,102,0.8)');
      grad.addColorStop(1,'rgba(255,0,102,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(px-80,py-80,160,160);
    }
    else if(kind==='waves'){
      ctx.strokeStyle = 'rgba(0,255,136,0.5)';
      ctx.lineWidth = 1;
      for(let j=0;j<8;j++){
        ctx.beginPath();
        for(let i=0;i<=60;i++){
          const x = (i/60)*w;
          const y = h/2 + Math.sin(i*0.2 + t*1.2 + j*0.4)*(8 + j*3) + (j-4)*6;
          if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.globalAlpha = 0.4 + j*0.07;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    else if(kind==='topo'){
      ctx.strokeStyle = 'rgba(0,255,136,0.4)';
      ctx.lineWidth = 0.8;
      const cx = w/2, cy = h/2;
      for(let r=1;r<12;r++){
        ctx.beginPath();
        for(let a=0;a<=Math.PI*2;a+=0.05){
          const wob = Math.sin(a*4 + t + r)*4;
          const rr = r*18 + wob;
          const x = cx + Math.cos(a)*rr;
          const y = cy + Math.sin(a)*rr*0.7;
          if(a===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.globalAlpha = 0.2 + r*0.05;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    else if(kind==='nano'){
      const cell = 14;
      for(let y=0;y<h;y+=cell){
        for(let x=0;x<w;x+=cell){
          const n = Math.sin(x*0.04 + y*0.05 + t*1.2);
          if(n > 0.5){
            ctx.fillStyle = n > 0.8 ? 'rgba(255,0,102,0.7)' : 'rgba(0,255,136,0.6)';
            ctx.fillRect(x+2,y+2,cell-4,cell-4);
          } else if(n > 0){
            ctx.fillStyle = 'rgba(0,255,136,0.15)';
            ctx.fillRect(x+2,y+2,cell-4,cell-4);
          }
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
});

// SCROLL SPY
(function(){
  const links = document.querySelectorAll('[data-nav]');
  const map = new Map();
  links.forEach(function(a){
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if(sec){
      if(!map.has(id)) map.set(id, {links:[], sec:sec, ratio:0});
      map.get(id).links.push(a);
    }
  });
  const io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      const entry = map.get(e.target.id);
      if(!entry) return;
      entry.ratio = e.intersectionRatio;
    });
    let best = null, bestR = 0;
    map.forEach(function(v){
      if((v.ratio||0) > bestR){ bestR = v.ratio; best = v; }
    });
    links.forEach(function(l){ l.classList.remove('active'); });
    if(best){ best.links.forEach(function(l){ l.classList.add('active'); }); }
  }, {threshold:[0,0.15,0.3,0.5,0.75,1], rootMargin:'-80px 0px -40% 0px'});
  map.forEach(function(v){ io.observe(v.sec); });
})();

// HAMBURGER MENU
(function(){
  var btn = document.getElementById('hamburger');
  var overlay = document.getElementById('mnav');
  if(!btn || !overlay) return;
  function set(isOpen){
    btn.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('mnav-open', isOpen);
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  btn.addEventListener('click', function(){
    set(!overlay.classList.contains('open'));
  });
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) set(false);
  });
  overlay.querySelectorAll('a[data-mnav]').forEach(function(a){
    a.addEventListener('click', function(){ set(false); });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && overlay.classList.contains('open')) set(false);
  });
  // Auto-close if viewport grows past mobile breakpoint
  var mq = window.matchMedia('(max-width: 768px)');
  var handler = function(e){ if(!e.matches) set(false); };
  if(mq.addEventListener) mq.addEventListener('change', handler);
  else if(mq.addListener) mq.addListener(handler);
})();

// GAUSSIAN SPLAT GENERATOR
(function(){
  const frame = document.getElementById('portrait-frame');
  const img = document.getElementById('portrait-img');
  const canvas = document.getElementById('splat-overlay');
  const toggle = document.getElementById('splat-toggle');
  if(!frame || !img || !canvas || !toggle) return;

  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;
  let splats = [];
  let trainStart = 0;
  const TRAIN_MS = 2500;
  let converged = false;
  let rotation = 0;
  let raf = null;

  function resize(){
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function sample(){
    const off = document.createElement('canvas');
    const SW = 50;
    const ratio = img.naturalHeight / Math.max(1, img.naturalWidth);
    const SH = Math.max(10, Math.round(SW * ratio));
    off.width = SW; off.height = SH;
    const octx = off.getContext('2d', { willReadFrequently: true });
    try {
      octx.drawImage(img, 0, 0, SW, SH);
    } catch(err){
      return [];
    }
    let data;
    try {
      data = octx.getImageData(0, 0, SW, SH).data;
    } catch(err){
      return [];
    }
    const list = [];
    const target = 1000;
    const total = SW * SH;
    const step = Math.max(1, Math.floor(total / (target * 1.5)));
    for(let idx = 0; idx < total; idx += step){
      const x = idx % SW;
      const y = Math.floor(idx / SW);
      const i = idx * 4;
      const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
      if(a < 30) continue;
      const lum = (r + g + b) / 3;
      if(lum < 18) continue;
      const jitter = (Math.random() - 0.5) * 0.4;
      list.push({
        tx: ((x + 0.5) / SW) + jitter / SW,
        ty: ((y + 0.5) / SH) + jitter / SH,
        sx: Math.random(),
        sy: Math.random(),
        r: r, g: g, b: b,
        size: 4 + Math.random() * 6,
        delay: Math.random() * 0.6
      });
      if(list.length >= 1500) break;
    }
    return list;
  }

  function easeOut(t){
    return 1 - Math.pow(1 - t, 3);
  }

  function setHud(iter, loss, points, status){
    const ei = document.getElementById('r-iter');
    const el = document.getElementById('r-loss');
    const ep = document.getElementById('r-points');
    const es = document.getElementById('r-status');
    if(ei) ei.textContent = iter;
    if(el) el.textContent = loss;
    if(ep) ep.textContent = points;
    if(es) es.textContent = status;
  }

  function render(now){
    if(!splats.length){ raf = null; return; }
    if(!trainStart) trainStart = now;
    const elapsed = now - trainStart;
    const rawP = Math.min(1, elapsed / TRAIN_MS);
    const trainDone = rawP >= 1;

    ctx.clearRect(0, 0, w, h);

    if(!converged){
      const iter = Math.floor(rawP * 30000);
      const loss = (2.0 - rawP * 1.996).toFixed(4);
      setHud(iter.toLocaleString(), loss, splats.length, trainDone ? 'CONVERGED' : 'TRAINING');
      if(trainDone) converged = true;
    } else {
      rotation += 0.0035;
      const wob = Math.sin(now * 0.0009) * 0.0008;
      const loss = (0.0042 + wob).toFixed(4);
      setHud('30,000', loss, splats.length, 'CONVERGED');
    }

    const cosR = Math.cos(rotation) * 0.08 + 1.0;
    const t = now * 0.001;

    ctx.globalCompositeOperation = 'screen';
    for(let i = 0; i < splats.length; i++){
      const s = splats[i];
      const localDelay = s.delay;
      const localP = Math.max(0, Math.min(1, (rawP - localDelay) / Math.max(0.0001, 1 - localDelay)));
      const e = easeOut(localP);
      const fade = Math.min(1, localP * 3);
      let nx = s.sx * (1 - e) + s.tx * e;
      let ny = s.sy * (1 - e) + s.ty * e;
      if(converged){
        const wob = Math.sin(t + s.tx * 10) * 0.004;
        const wob2 = Math.cos(t * 0.8 + s.ty * 10) * 0.004;
        nx = s.tx + wob;
        ny = s.ty + wob2;
        nx = 0.5 + (nx - 0.5) * cosR;
      }
      const px = nx * w;
      const py = ny * h;
      const sz = s.size;
      const alpha = 0.55 * fade;
      const col = 'rgba(' + s.r + ',' + s.g + ',' + s.b + ',';
      try {
        const grad = ctx.createRadialGradient(px, py, 0, px, py, sz);
        grad.addColorStop(0, col + alpha + ')');
        grad.addColorStop(1, col + '0)');
        ctx.fillStyle = grad;
        ctx.fillRect(px - sz, py - sz, sz * 2, sz * 2);
      } catch(err){
        ctx.fillStyle = col + (alpha * 0.6) + ')';
        ctx.beginPath();
        ctx.arc(px, py, sz * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalCompositeOperation = 'source-over';

    raf = requestAnimationFrame(render);
  }

  function start(){
    resize();
    splats = sample();
    if(!splats.length){
      setHud('0', 'ERR', '0', 'NO_DATA');
      return;
    }
    trainStart = 0;
    converged = false;
    rotation = 0;
    setHud('0', '2.0000', splats.length, 'TRAINING');
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(render);
  }

  function boot(){
    if(img.complete && img.naturalWidth > 0){
      start();
    } else {
      img.addEventListener('load', start, { once: true });
      img.addEventListener('error', function(){
        setHud('0', 'ERR', '0', 'NO_IMG');
      }, { once: true });
    }
  }

  let resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
      resize();
    }, 150);
  });

  toggle.addEventListener('click', function(){
    const raw = frame.classList.toggle('raw-view');
    toggle.innerHTML = raw ? 'RAW ◉' : 'SPLAT ◉';
  });

  boot();
})();
