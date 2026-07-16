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
  var mq = window.matchMedia('(max-width: 768px)');
  var handler = function(e){ if(!e.matches) set(false); };
  if(mq.addEventListener) mq.addEventListener('change', handler);
  else if(mq.addListener) mq.addListener(handler);
})();

// FIELD CANVAS HELPER — for any page with a [data-field-canvas] element
// Options via data-* attributes: data-points (count), data-cx (0..1), data-cy (0..1), data-scale (0..1), data-rot-speed
(function(){
  document.querySelectorAll('[data-field-canvas]').forEach(function(canvas){
    var N = parseInt(canvas.dataset.points || '1200', 10);
    var cxRatio = parseFloat(canvas.dataset.cx || '0.5');
    var cyRatio = parseFloat(canvas.dataset.cy || '0.5');
    var scaleRatio = parseFloat(canvas.dataset.scale || '0.40');
    var rotSpeed = parseFloat(canvas.dataset.rotSpeed || '0.003');
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, t = 0;
    function resize(){
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);
    var pts = [];
    for(var i = 0; i < N; i++){
      var theta = Math.random() * Math.PI * 2;
      var phi = Math.acos(2 * Math.random() - 1);
      var r = 0.5 + Math.pow(Math.random(), 0.5) * 0.5;
      pts.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta) * 1.2,
        z: r * Math.cos(phi),
        s: Math.random(),
        h: Math.random() < 0.07 ? 1 : 0
      });
    }
    function frame(){
      t += rotSpeed;
      ctx.fillStyle = 'rgba(8,8,10,0.22)';
      ctx.fillRect(0, 0, w, h);
      var cx = w * cxRatio, cy = h * cyRatio;
      var scale = Math.min(w, h) * scaleRatio;
      var cosT = Math.cos(t), sinT = Math.sin(t);
      var scanY = cy + Math.sin(t * 1.4) * scale * 0.85;
      for(var j = 0; j < N; j++){
        var p = pts[j];
        var x1 = p.x * cosT - p.z * sinT;
        var z1 = p.x * sinT + p.z * cosT;
        var pers = 1.6 / (1.6 + z1);
        var sx = cx + x1 * scale * pers;
        var sy = cy + p.y * scale * pers;
        var depth = (z1 + 1) / 2;
        var dScan = Math.abs(sy - scanY);
        var glow = Math.max(0, 1 - dScan / 70);
        var a = 0.18 + depth * 0.55;
        var size = pers * (p.s * 1.3 + 0.4) + glow * 1.2;
        if(p.h){
          ctx.fillStyle = 'rgba(255,0,102,' + (a * 0.9 + glow * 0.4) + ')';
        } else if(glow > 0.15){
          ctx.fillStyle = 'rgba(0,255,136,' + (a + glow * 0.55) + ')';
        } else {
          var g = 180 + Math.floor(depth * 60);
          ctx.fillStyle = 'rgba(' + g + ',' + g + ',' + (g - 15) + ',' + (a * 0.65) + ')';
        }
        ctx.fillRect(sx, sy, size, size);
      }
      requestAnimationFrame(frame);
    }
    frame();
  });
})();
