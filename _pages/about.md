---
title: About
permalink: /about/
layout: field
nav_id: about
---
<style>
.about-page-hero{position:relative;border-bottom:1px solid var(--line);overflow:hidden;height:520px}
.about-page-hero canvas{position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0.55}
.about-page-hero-inner{position:relative;z-index:2;max-width:1100px;margin:0 auto;padding:96px 60px 64px;height:100%;display:flex;flex-direction:column;justify-content:center}
.about-page-hero .eyebrow{font-family:var(--mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--g);margin-bottom:28px;display:flex;align-items:center;gap:10px}
.about-page-hero .eyebrow::before{content:'';width:32px;height:1px;background:var(--g)}
.about-page-hero-title{font-family:var(--sans);font-size:clamp(96px,12vw,160px);line-height:0.88;letter-spacing:-0.05em;font-weight:300;color:var(--ink)}
.about-page-hero-title em{font-family:var(--serif);font-style:italic;color:var(--g);font-weight:400}

.about-body-wrap{max-width:1100px;margin:0 auto;padding:96px 60px;display:grid;grid-template-columns:340px 1fr;gap:64px;align-items:start;border-bottom:1px solid var(--line)}

/* PORTRAIT slot on about (re-uses hero portrait styles with about-portrait scoping) */
.about-portrait-col{position:sticky;top:80px}
.ap-frame{position:relative;width:100%;aspect-ratio:3/4;border:1px solid var(--g);background:rgba(0,0,0,0.4);box-shadow:0 0 0 1px var(--bg),0 0 40px rgba(0,255,136,0.15),inset 0 0 0 1px rgba(0,255,136,0.12);transition:box-shadow .25s;overflow:hidden;margin-bottom:14px}
.ap-frame:hover{box-shadow:0 0 0 1px var(--bg),0 0 60px rgba(0,255,136,0.32),inset 0 0 0 1px rgba(0,255,136,0.28)}
.ap-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:0;transition:opacity .4s}
.ap-frame.raw-view .ap-img{opacity:1}
.ap-corner{position:absolute;width:14px;height:14px;border:1.5px solid var(--g);z-index:4;pointer-events:none}
.ap-corner.tl{top:-3px;left:-3px;border-right:none;border-bottom:none}
.ap-corner.tr{top:-3px;right:-3px;border-left:none;border-bottom:none}
.ap-corner.bl{bottom:-3px;left:-3px;border-right:none;border-top:none}
.ap-corner.br{bottom:-3px;right:-3px;border-left:none;border-top:none}
.ap-tag{position:absolute;top:-22px;left:0;font-family:var(--mono);font-size:10px;color:var(--g);letter-spacing:0.12em;text-transform:uppercase;font-weight:600;display:flex;align-items:center;gap:6px;z-index:6}
.ap-tag::before{content:'';width:8px;height:8px;background:var(--g);border-radius:50%;box-shadow:0 0 6px var(--g);animation:pulse 1.5s infinite}
#about-splat-overlay{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:5;background:#08080a;transition:opacity .4s}
.ap-frame.raw-view #about-splat-overlay{opacity:0}
.ap-readout{position:absolute;left:8px;bottom:8px;font-family:var(--mono);font-size:9px;color:var(--g);letter-spacing:0.08em;line-height:1.4;z-index:6;pointer-events:none;text-transform:uppercase;text-shadow:0 0 4px rgba(0,0,0,0.8);transition:opacity .3s}
.ap-frame.raw-view .ap-readout{opacity:0}
.ap-readout .row{display:flex;justify-content:space-between;gap:10px;min-width:120px}
.ap-readout .row b{color:var(--ink);font-weight:500}
.ap-toggle{position:absolute;top:8px;right:8px;font-family:var(--mono);font-size:9px;color:var(--ink);background:rgba(0,0,0,0.6);border:1px solid var(--g);padding:4px 8px;letter-spacing:0.08em;text-transform:uppercase;cursor:pointer;z-index:6;font-weight:600;transition:background .12s}
.ap-toggle:hover{background:var(--g);color:#000}
.ap-cap{font-family:var(--mono);font-size:10px;color:var(--ink2);letter-spacing:0.08em;line-height:1.5;text-transform:uppercase;margin-bottom:24px}
.ap-cap b{color:var(--g);font-weight:500}

.ap-mini-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border:1px solid var(--line)}
.ap-mini{background:var(--bg);padding:18px 16px}
.ap-mini-k{font-size:32px;font-weight:300;letter-spacing:-0.02em;line-height:1;margin-bottom:6px;color:var(--ink)}
.ap-mini-k em{font-family:var(--serif);font-style:italic;color:var(--g)}
.ap-mini-v{font-family:var(--mono);font-size:10px;color:var(--ink2);letter-spacing:0.04em;line-height:1.4}

/* Prose */
.about-prose{font-size:20px;line-height:1.7;color:var(--ink2)}
.about-prose .seyebrow{font-family:var(--mono);font-size:11px;color:var(--ink2);letter-spacing:0.1em;margin-bottom:8px}
.about-prose .stitle{font-size:36px;line-height:1.1;letter-spacing:-0.025em;font-weight:400;color:var(--ink);margin-bottom:32px}
.about-prose .stitle em{font-family:var(--serif);font-style:italic;color:var(--g)}
.about-prose p{margin-bottom:22px}
.about-prose p:last-child{margin-bottom:0}
.about-prose b,.about-prose strong{color:var(--ink);font-weight:500}
.about-prose em{font-family:var(--serif);font-style:italic;color:var(--g);font-weight:400}
.about-prose a{color:var(--g);border-bottom:1px solid rgba(0,255,136,0.25);transition:border-color .12s}
.about-prose a:hover{border-bottom-color:var(--g)}

/* NOW section */
.now-section{max-width:1100px;margin:0 auto;padding:72px 60px;border-bottom:1px solid var(--line)}
.now-head{display:grid;grid-template-columns:80px 1fr;gap:24px;align-items:start;margin-bottom:36px}
.now-num{font-family:var(--mono);font-size:11px;color:var(--g);letter-spacing:0.1em;padding-top:8px;border-top:1px solid var(--g)}
.now-title{font-size:32px;font-weight:400;letter-spacing:-0.02em;color:var(--ink)}
.now-title em{font-family:var(--serif);font-style:italic;color:var(--g)}
.now-eyebrow{font-family:var(--mono);font-size:11px;color:var(--ink2);letter-spacing:0.1em;margin-bottom:8px}
.now-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.now-row{display:grid;grid-template-columns:120px 1fr;gap:20px;padding:18px 0;border-top:1px solid var(--line)}
.now-row .k{font-family:var(--mono);font-size:10px;color:var(--g);letter-spacing:0.1em;text-transform:uppercase;padding-top:3px;font-weight:600}
.now-row .v{font-size:15px;line-height:1.5;color:var(--ink)}
.now-row .v em{font-family:var(--serif);font-style:italic;color:var(--g)}

@media (max-width: 1100px){
  .about-page-hero{height:auto;min-height:380px}
  .about-page-hero-inner{padding:72px 32px 48px}
  .about-body-wrap{padding:72px 32px;grid-template-columns:280px 1fr;gap:48px}
  .now-section{padding:64px 32px}
}
@media (max-width: 768px){
  .about-page-hero{min-height:320px}
  .about-page-hero canvas{opacity:0.4}
  .about-page-hero-inner{padding:48px 20px 36px;position:relative}
  .about-page-hero-inner::before{content:'';position:absolute;inset:-20px -16px;background:radial-gradient(ellipse at 30% 50%,rgba(8,8,10,0.75) 0%,rgba(8,8,10,0.45) 60%,transparent 90%);z-index:-1;pointer-events:none}
  .about-page-hero-title{text-shadow:0 0 16px rgba(8,8,10,0.9),0 0 4px rgba(8,8,10,0.7)}
  .about-page-hero .eyebrow{text-shadow:0 0 8px rgba(8,8,10,0.85)}
  .about-body-wrap{padding:48px 20px;grid-template-columns:1fr;gap:48px}
  .about-portrait-col{position:static}
  .ap-frame{max-width:300px;margin-left:auto;margin-right:auto}
  .ap-cap,.ap-mini-grid{max-width:300px;margin-left:auto;margin-right:auto}
  .about-prose{font-size:17px}
  .about-prose .stitle{font-size:28px}
  .now-section{padding:48px 20px}
  .now-grid{grid-template-columns:1fr}
  .now-row{grid-template-columns:100px 1fr;gap:14px}
}
@media (max-width: 480px){
  .about-page-hero canvas{opacity:0.32}
  .about-page-hero-title{font-size:clamp(72px,18vw,110px)}
  .now-head{grid-template-columns:1fr;gap:10px}
  .now-num{justify-self:start;padding-top:6px}
}
</style>

<section class="about-page-hero">
  <canvas data-field-canvas data-points="1000" data-cx="0.7" data-cy="0.5" data-scale="0.32" data-rot-speed="0.0026" aria-hidden="true"></canvas>
  <div class="about-page-hero-inner">
    <div class="eyebrow">// SUBJECT &middot; SAHIL RAMANI &middot; THE HUMAN IN THE LOOP</div>
    <h1 class="about-page-hero-title"><em>About.</em></h1>
  </div>
</section>

<section class="about-body-wrap">
  <aside class="about-portrait-col">
    <div class="ap-frame" id="about-frame">
      <div class="ap-tag">TARGET // sahil_001.ply</div>
      <span class="ap-corner tl"></span>
      <span class="ap-corner tr"></span>
      <span class="ap-corner bl"></span>
      <span class="ap-corner br"></span>
      <img class="ap-img" id="about-img" src="{{ '/assets/images/bio-photo.jpg' | relative_url }}" alt="{{ site.author.name }}" />
      <canvas id="about-splat-overlay"></canvas>
      <div class="ap-readout">
        <div class="row"><span>ITER</span><b id="ar-iter">0</b></div>
        <div class="row"><span>LOSS</span><b id="ar-loss">&mdash;</b></div>
        <div class="row"><span>POINTS</span><b id="ar-points">0</b></div>
        <div class="row"><span>STATUS</span><b id="ar-status">IDLE</b></div>
      </div>
      <button class="ap-toggle" id="about-toggle" type="button">SPLAT &#9673;</button>
    </div>
    <div class="ap-cap">PORTRAIT &middot; <b>2024.05</b> &middot; SANTA CLARA, CA</div>
    <div class="ap-mini-grid">
      <div class="ap-mini"><div class="ap-mini-k">15<em>+</em></div><div class="ap-mini-v">years shipping</div></div>
      <div class="ap-mini"><div class="ap-mini-k">2</div><div class="ap-mini-v">patents granted</div></div>
      <div class="ap-mini"><div class="ap-mini-k">6</div><div class="ap-mini-v">companies</div></div>
      <div class="ap-mini"><div class="ap-mini-k">2</div><div class="ap-mini-v">dogs &middot; one shepherd, one samoyed</div></div>
    </div>
  </aside>

  <div class="about-prose">
    <div class="seyebrow">// long-form</div>
    <h2 class="stitle">The <em>human</em> in the loop</h2>
    <p>Hi, I'm Sahil. I build <em>AI for game development</em> at <b>NVIDIA</b> &mdash; the slice of the field where neural networks meet real-time graphics, and where the tools that ship with games become as interesting as the games themselves.</p>
    <p>I've spent the last fifteen-or-so years moving between graphics, game engines, and machine learning. Shipped engine tech at <b>Crystal Dynamics</b> and <b>DreamWorks</b>, led neural-rendering R&amp;D at <b>Unity</b>, and built 3D reconstruction pipelines for self-driving at <b>Zoox</b> before landing at NVIDIA. Two patents along the way, and a deep conviction that the most interesting problems live at the <em>seam</em> between disciplines.</p>
    <p>Outside of work I'm a gamer, an amateur photographer, and a proud dog dad &mdash; we live with a <b>Swiss Shepherd</b> and a <b>Samoyed mix</b> who keep me honest about going outside. Most weekends involve a hike with them and my wife. The rest is reading, tinkering with a Jetson Nano in the garage, and the occasional long walk to think a problem through.</p>
    <p>I have <em>OCPD</em>, which is the version of obsessive-compulsive personality that runs on <strong>need-to-control</strong> rather than <strong>need-to-perform-rituals</strong>. It's been the engine behind a lot of what I've shipped &mdash; the diligence, the documentation, the unwillingness to leave something half-baked &mdash; and it's been the thing I've had to actively manage so it doesn't <a href="{{ '/2023/05/living-with-ocpd/' | relative_url }}">burn me out</a>. I write about it openly because more engineers have it than admit it.</p>
    <p>This site is where I write the things I want to remember &mdash; engineering notes, half-formed ideas, and the occasional essay on something more personal. <em>Random access</em>, no particular order. The learning happens in public.</p>
  </div>
</section>

<section class="now-section">
  <div class="now-head">
    <div class="now-num">06 / NOW</div>
    <div>
      <div class="now-eyebrow">// {{ site.time | date: '%Y.%m' }}</div>
      <div class="now-title">What I'm <em>doing</em> right now</div>
    </div>
  </div>
  <div class="now-grid">
    <div>
      <div class="now-row"><div class="k">Working</div><div class="v">AI for game development at <em>NVIDIA</em></div></div>
      <div class="now-row"><div class="k">Reading</div><div class="v">Tidy First by Kent Beck &middot; Designing Data-Intensive Applications (re-read)</div></div>
      <div class="now-row"><div class="k">Tinkering</div><div class="v">Edge ML on the Jetson Nano &middot; Gaussian splat capture experiments</div></div>
    </div>
    <div>
      <div class="now-row"><div class="k">Hiking</div><div class="v">Bay Area weekends &middot; trying to get the dogs up Mission Peak before summer</div></div>
      <div class="now-row"><div class="k">Photographing</div><div class="v">Wide-angle landscapes &middot; the dogs, mostly</div></div>
      <div class="now-row"><div class="k">Writing</div><div class="v">Trying to ship one <em>field note</em> per month &mdash; pace varies</div></div>
    </div>
  </div>
</section>

<section class="contact">
  <div class="contact-eyebrow">// SAY HI</div>
  <h2>Let's <em>build</em> something.</h2>
  <a class="contact-email" href="mailto:{{ site.email }}">{{ site.email }} &rarr;</a>
  <div class="socials">
    <a href="https://www.github.com/{{ site.github_username }}" target="_blank" rel="noreferrer">GITHUB &nearr;</a>
    <a href="https://www.twitter.com/{{ site.twitter_username }}" target="_blank" rel="noreferrer">TWITTER &nearr;</a>
    <a href="https://www.linkedin.com/in/sahilramani" target="_blank" rel="noreferrer">LINKEDIN &nearr;</a>
    <a href="{{ '/resume/' | relative_url }}">RESUME &rarr;</a>
  </div>
</section>

<script>
// GAUSSIAN SPLAT GENERATOR — about-portrait variant
(function(){
  var frame = document.getElementById('about-frame');
  var img = document.getElementById('about-img');
  var canvas = document.getElementById('about-splat-overlay');
  var toggle = document.getElementById('about-toggle');
  if(!frame || !img || !canvas || !toggle) return;

  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = 0, h = 0;
  var splats = [];
  var trainStart = 0;
  var TRAIN_MS = 2500;
  var converged = false;
  var rotation = 0;
  var raf = null;

  function resize(){
    var r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function sample(){
    var off = document.createElement('canvas');
    var SW = 50;
    var ratio = img.naturalHeight / Math.max(1, img.naturalWidth);
    var SH = Math.max(10, Math.round(SW * ratio));
    off.width = SW; off.height = SH;
    var octx = off.getContext('2d', { willReadFrequently: true });
    try { octx.drawImage(img, 0, 0, SW, SH); } catch(err){ return []; }
    var data;
    try { data = octx.getImageData(0, 0, SW, SH).data; } catch(err){ return []; }
    var list = [];
    var target = 1000;
    var total = SW * SH;
    var step = Math.max(1, Math.floor(total / (target * 1.5)));
    for(var idx = 0; idx < total; idx += step){
      var x = idx % SW;
      var y = Math.floor(idx / SW);
      var i = idx * 4;
      var r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
      if(a < 30) continue;
      var lum = (r + g + b) / 3;
      if(lum < 18) continue;
      var jitter = (Math.random() - 0.5) * 0.4;
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

  function easeOut(t){ return 1 - Math.pow(1 - t, 3); }

  function setHud(iter, loss, points, status){
    var ei = document.getElementById('ar-iter');
    var el = document.getElementById('ar-loss');
    var ep = document.getElementById('ar-points');
    var es = document.getElementById('ar-status');
    if(ei) ei.textContent = iter;
    if(el) el.textContent = loss;
    if(ep) ep.textContent = points;
    if(es) es.textContent = status;
  }

  function render(now){
    if(!splats.length){ raf = null; return; }
    if(!trainStart) trainStart = now;
    var elapsed = now - trainStart;
    var rawP = Math.min(1, elapsed / TRAIN_MS);
    var trainDone = rawP >= 1;

    ctx.clearRect(0, 0, w, h);

    if(!converged){
      var iter = Math.floor(rawP * 30000);
      var loss = (2.0 - rawP * 1.996).toFixed(4);
      setHud(iter.toLocaleString(), loss, splats.length, trainDone ? 'CONVERGED' : 'TRAINING');
      if(trainDone) converged = true;
    } else {
      rotation += 0.0035;
      var wob = Math.sin(now * 0.0009) * 0.0008;
      var loss2 = (0.0042 + wob).toFixed(4);
      setHud('30,000', loss2, splats.length, 'CONVERGED');
    }

    var cosR = Math.cos(rotation) * 0.08 + 1.0;
    var t = now * 0.001;

    ctx.globalCompositeOperation = 'screen';
    for(var i = 0; i < splats.length; i++){
      var s = splats[i];
      var localDelay = s.delay;
      var localP = Math.max(0, Math.min(1, (rawP - localDelay) / Math.max(0.0001, 1 - localDelay)));
      var e = easeOut(localP);
      var fade = Math.min(1, localP * 3);
      var nx = s.sx * (1 - e) + s.tx * e;
      var ny = s.sy * (1 - e) + s.ty * e;
      if(converged){
        var wob1 = Math.sin(t + s.tx * 10) * 0.004;
        var wob2 = Math.cos(t * 0.8 + s.ty * 10) * 0.004;
        nx = s.tx + wob1;
        ny = s.ty + wob2;
        nx = 0.5 + (nx - 0.5) * cosR;
      }
      var px = nx * w;
      var py = ny * h;
      var sz = s.size;
      var alpha = 0.55 * fade;
      var col = 'rgba(' + s.r + ',' + s.g + ',' + s.b + ',';
      try {
        var grad = ctx.createRadialGradient(px, py, 0, px, py, sz);
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

  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  toggle.addEventListener('click', function(){
    var raw = frame.classList.toggle('raw-view');
    toggle.innerHTML = raw ? 'RAW &#9673;' : 'SPLAT &#9673;';
  });

  boot();
})();
</script>
