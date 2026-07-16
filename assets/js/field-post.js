// Related-card mini visualizations (small subset of the home page set)
document.querySelectorAll('.related-vis canvas[data-vis]').forEach(function(c){
  var kind = c.dataset.vis;
  var ctx = c.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size(){
    var r = c.getBoundingClientRect();
    c.width = r.width * dpr; c.height = r.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return [r.width, r.height];
  }
  var sz = size();
  var w = sz[0], h = sz[1];
  window.addEventListener('resize', function(){ var s = size(); w = s[0]; h = s[1]; });
  var t = Math.random() * 100;
  function draw(){
    t += 0.01;
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, w, h);
    if(kind === 'terrain'){
      ctx.strokeStyle = 'rgba(0,255,136,0.5)'; ctx.lineWidth = 0.7;
      var rows = 12, cols = 22;
      for(var r = 0; r < rows; r++){
        ctx.beginPath();
        for(var i = 0; i < cols; i++){
          var x = (i / (cols - 1)) * w;
          var baseY = h * 0.55 + (r - rows / 2) * 6;
          var wave = Math.sin(i * 0.5 + t + r * 0.3) * (6 + r * 0.5);
          var y = baseY + wave - r * 1.5;
          if(i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.25 + (r / rows) * 0.75;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    else if(kind === 'splat'){
      for(var i = 0; i < 40; i++){
        var a = i * 0.314 + t * 0.5;
        var rr = 22 + (i % 5) * 10;
        var x = w / 2 + Math.cos(a) * rr;
        var y = h / 2 + Math.sin(a * 1.3) * rr * 0.7;
        var ssz = 12 + Math.sin(t + i) * 5;
        var grad = ctx.createRadialGradient(x, y, 0, x, y, ssz);
        var col = i % 7 === 0 ? '255,0,102' : '0,255,136';
        grad.addColorStop(0, 'rgba(' + col + ',0.7)');
        grad.addColorStop(1, 'rgba(' + col + ',0)');
        ctx.fillStyle = grad;
        ctx.fillRect(x - ssz, y - ssz, ssz * 2, ssz * 2);
      }
    }
    else if(kind === 'grid'){
      ctx.strokeStyle = 'rgba(0,255,136,0.35)'; ctx.lineWidth = 0.7;
      var step = 18;
      for(var x = 0; x < w; x += step){ ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for(var y = 0; y < h; y += step){ ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      var px = ((Math.sin(t) * 0.5 + 0.5) * w);
      var py = ((Math.cos(t * 0.7) * 0.5 + 0.5) * h);
      var grad2 = ctx.createRadialGradient(px, py, 0, px, py, 55);
      grad2.addColorStop(0, 'rgba(255,0,102,0.8)');
      grad2.addColorStop(1, 'rgba(255,0,102,0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(px - 55, py - 55, 110, 110);
    }
    else if(kind === 'waves'){
      ctx.strokeStyle = 'rgba(0,255,136,0.5)'; ctx.lineWidth = 1;
      for(var j = 0; j < 6; j++){
        ctx.beginPath();
        for(var i = 0; i <= 50; i++){
          var x = (i / 50) * w;
          var y = h / 2 + Math.sin(i * 0.2 + t * 1.2 + j * 0.4) * (5 + j * 2) + (j - 3) * 5;
          if(i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.globalAlpha = 0.4 + j * 0.08;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    else if(kind === 'topo'){
      ctx.strokeStyle = 'rgba(0,255,136,0.4)'; ctx.lineWidth = 0.8;
      var cx = w / 2, cy = h / 2;
      for(var r = 1; r < 8; r++){
        ctx.beginPath();
        for(var a = 0; a <= Math.PI * 2; a += 0.05){
          var wob = Math.sin(a * 4 + t + r) * 3;
          var rr = r * 12 + wob;
          var x = cx + Math.cos(a) * rr;
          var y = cy + Math.sin(a) * rr * 0.7;
          if(a === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.globalAlpha = 0.22 + r * 0.06;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    else if(kind === 'nano'){
      var cell = 10;
      for(var y = 0; y < h; y += cell){
        for(var x = 0; x < w; x += cell){
          var n = Math.sin(x * 0.04 + y * 0.05 + t * 1.2);
          if(n > 0.5){
            ctx.fillStyle = n > 0.8 ? 'rgba(255,0,102,0.7)' : 'rgba(0,255,136,0.6)';
            ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
          } else if(n > 0){
            ctx.fillStyle = 'rgba(0,255,136,0.15)';
            ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2);
          }
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
});
