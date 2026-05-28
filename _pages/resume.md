---
title: Resume
permalink: /resume/
layout: field
nav_id: resume
---
<style>
.resume-page-hero{position:relative;border-bottom:1px solid var(--line);overflow:hidden;padding:96px 60px 56px;background:linear-gradient(180deg,#0a0a0d 0%,#08080a 100%)}
.resume-page-hero::after{content:'';position:absolute;left:0;right:0;top:50%;height:1px;background:linear-gradient(90deg,transparent,rgba(0,255,136,0.18),transparent);transform:translateY(-50%);pointer-events:none}
.resume-page-hero-inner{position:relative;z-index:2;max-width:1100px;margin:0 auto}
.resume-page-hero .eyebrow{font-family:var(--mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--g);margin-bottom:24px;display:flex;align-items:center;gap:10px}
.resume-page-hero .eyebrow::before{content:'';width:32px;height:1px;background:var(--g)}
.resume-page-hero-title{font-family:var(--sans);font-size:clamp(56px,8vw,96px);line-height:0.95;letter-spacing:-0.04em;font-weight:300;color:var(--ink);margin-bottom:18px}
.resume-page-hero-title em{font-family:var(--serif);font-style:italic;color:var(--g);font-weight:400}
.resume-page-hero-sub{font-family:var(--serif);font-style:italic;font-size:22px;color:var(--ink);line-height:1.4;margin-bottom:22px;max-width:780px}
.resume-page-hero-sub b{color:var(--g);font-style:normal;font-family:var(--sans);font-weight:500}

.resume-wrap{max-width:1100px;margin:0 auto;padding:72px 60px 96px;display:grid;grid-template-columns:240px 1fr;gap:64px;align-items:start}
.resume-aside{position:sticky;top:80px;display:flex;flex-direction:column;gap:24px;padding-right:24px;border-right:1px solid var(--line)}
.ra-label{font-family:var(--mono);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--g);margin-bottom:8px;font-weight:600}
.ra-val{font-size:14px;color:var(--ink);line-height:1.55}
.ra-val a{color:var(--g);border-bottom:1px solid transparent;transition:border-color .12s}
.ra-val a:hover{border-color:var(--g)}
.ra-pills{display:flex;flex-wrap:wrap;gap:5px}
.ra-pill{font-family:var(--mono);font-size:10px;letter-spacing:0.06em;color:var(--ink2);padding:3px 8px;border:1px solid var(--line2);border-radius:100px}

.resume-main{}
.r-section{margin-bottom:56px}
.r-section:last-child{margin-bottom:0}
.r-section-head{font-family:var(--mono);font-size:11px;color:var(--g);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:24px;display:flex;align-items:center;gap:14px;font-weight:600}
.r-section-head::after{content:'';flex:1;height:1px;background:var(--line)}
.r-section-num{font-family:var(--mono);font-size:10px;color:var(--g);letter-spacing:0.1em;border:1px solid var(--g);padding:2px 6px}

.r-summary{font-size:17px;line-height:1.75;color:var(--ink)}
.r-summary em{font-family:var(--serif);font-style:italic;color:var(--g)}
.r-summary b{color:var(--ink);font-weight:500}

.skill-group{margin-bottom:22px}
.skill-group:last-child{margin-bottom:0}
.skill-group-label{font-family:var(--mono);font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink2);margin-bottom:10px}

.edu-row{display:grid;grid-template-columns:1fr auto;gap:14px;padding:18px 0;border-top:1px solid var(--line);align-items:baseline}
.edu-row:last-child{border-bottom:1px solid var(--line)}
.edu-degree{font-family:var(--serif);font-style:italic;font-size:18px;font-weight:400;line-height:1.3;color:var(--g);margin-bottom:2px}
.edu-school{font-size:14px;font-weight:500;color:var(--ink)}
.edu-meta{font-family:var(--mono);font-size:11px;color:var(--ink2);letter-spacing:0.04em}
.edu-period{font-family:var(--mono);font-size:11px;color:var(--ink2);letter-spacing:0.04em;text-align:right;white-space:nowrap}

.r-patents{display:flex;flex-direction:column;gap:14px}
.r-patent{border:1px solid rgba(255,0,102,0.3);background:rgba(255,0,102,0.06);padding:18px 22px}
.r-patent-num{font-family:var(--mono);font-size:11px;color:var(--m);letter-spacing:0.1em;margin-bottom:6px;text-transform:uppercase}
.r-patent-title{font-family:var(--serif);font-style:italic;font-size:18px;color:var(--ink);line-height:1.3;margin-bottom:4px}
.r-patent-meta{font-family:var(--mono);font-size:10px;color:var(--ink2);letter-spacing:0.06em}

@media (max-width: 1100px){
  .resume-page-hero{padding:72px 32px 48px}
  .resume-wrap{padding:56px 32px 80px;grid-template-columns:200px 1fr;gap:48px}
}
@media (max-width: 768px){
  .resume-page-hero{padding:56px 20px 36px}
  .resume-page-hero-sub{font-size:18px}
  .resume-wrap{padding:48px 20px 72px;grid-template-columns:1fr;gap:36px}
  .resume-aside{position:static;border-right:0;padding-right:0;border-bottom:1px solid var(--line);padding-bottom:24px;display:grid;grid-template-columns:repeat(2,1fr);gap:20px 24px}
  .resume-aside .ra-pills{margin-top:4px}
  .r-section{margin-bottom:40px}
  .timeline{padding-left:22px}
  .tjob::before{left:-22px}
  .edu-row{grid-template-columns:1fr}
  .edu-period{text-align:left}
}
@media (max-width: 480px){
  .resume-aside{grid-template-columns:1fr}
}

@media print{
  .top,.mnav,.hamburger,.scanline-global,footer{display:none !important}
  html,body{background:#fff !important;color:#000 !important}
  .resume-page-hero{background:#fff !important;padding:16pt 0 12pt;border-bottom:1pt solid #444}
  .resume-page-hero::after{display:none}
  .resume-page-hero .eyebrow{color:#000}
  .resume-page-hero .eyebrow::before{background:#000}
  .resume-page-hero-title,.resume-page-hero-sub{color:#000}
  .resume-page-hero-sub b{color:#000}
  .resume-wrap{padding:12pt 0;grid-template-columns:1fr;gap:14pt;color:#000}
  .resume-aside{position:static;border:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:10pt}
  .ra-label{color:#000}
  .ra-val,.ra-val a{color:#000}
  .ra-pill{color:#000;border-color:#888}
  .r-section-head{color:#000}
  .r-section-head::after{background:#888}
  .r-summary,.r-summary b,.tjob-co,.tjob-meta,.tjob-bullets li{color:#000}
  .tjob-title,.edu-degree{color:#000;font-style:italic}
  .tjob-period,.edu-meta,.edu-period{color:#000}
  .tjob::before{border-color:#000;background:#000}
  .timeline::before{background:#888}
  .tjob-bullets li::before{color:#000}
  .tjob-patent,.r-patent{color:#000;background:#fff;border-color:#888}
  .r-patent-num,.r-patent-title,.r-patent-meta{color:#000}
}
</style>

<section class="resume-page-hero">
  <div class="resume-page-hero-inner">
    <div class="eyebrow">// DOCUMENT &middot; CV &middot; {{ site.time | date: '%Y.%m' }}</div>
    <h1 class="resume-page-hero-title">Sahil <em>Ramani</em></h1>
    <p class="resume-page-hero-sub">Senior Software Engineer &middot; <b>AI for Game Development</b> &middot; Neural Rendering, 3D Reconstruction &amp; Simulation</p>
    <div class="page-hero-meta">
      <span class="chip">Santa Clara, CA &middot; PST</span>
      <span class="chip"><a href="mailto:{{ site.email }}">{{ site.email }}</a></span>
      <a class="chip solid" href="{{ '/assets/files/ramani_ml.pdf' | relative_url }}">[ DOWNLOAD .PDF ]</a>
    </div>
  </div>
</section>

<section class="resume-wrap">
  <aside class="resume-aside">
    <div><div class="ra-label">Now</div><div class="ra-val">Senior SWE @ <a href="https://www.nvidia.com" rel="noreferrer">NVIDIA</a><br/>AI for Games</div></div>
    <div><div class="ra-label">Based</div><div class="ra-val">Santa Clara, CA &middot; PST</div></div>
    <div><div class="ra-label">Education</div><div class="ra-val">MS CS &middot; USC '11<br/>BE CS &middot; BMS '06</div></div>
    <div><div class="ra-label">Stack</div><div class="ra-pills">
      <span class="ra-pill">PyTorch</span><span class="ra-pill">CUDA</span><span class="ra-pill">C++</span><span class="ra-pill">Python</span><span class="ra-pill">HLSL</span><span class="ra-pill">Vulkan</span><span class="ra-pill">DX12</span><span class="ra-pill">Unity</span>
    </div></div>
    <div><div class="ra-label">Patents</div><div class="ra-val">18/144,734<br/>#11,189,068</div></div>
    <div><div class="ra-label">Languages</div><div class="ra-val">English &middot; Hindi &middot; Kannada</div></div>
  </aside>

  <div class="resume-main">

    <div class="r-section">
      <div class="r-section-head"><span class="r-section-num">01</span> Summary</div>
      <p class="r-summary">
        Machine learning engineer and computer vision specialist with <b>15+ years</b> of experience deploying production ML systems. Working on <em>AI for Game Development</em> at NVIDIA. Previously led neural rendering and terrain generation at <b>Unity Technologies</b>, and architected 3D reconstruction workflows for autonomous vehicles at <b>Zoox</b>. Proven track record leading R&amp;D teams with expertise in optimizing ML systems for real-time applications.
      </p>
    </div>

    <div class="r-section">
      <div class="r-section-head"><span class="r-section-num">02</span> Skills</div>
      {% for group in site.data.skills %}
      <div class="skill-group">
        <div class="skill-group-label">{{ group.label }}</div>
        <div class="ra-pills">
          {% for pill in group.pills %}<span class="ra-pill">{{ pill }}</span>{% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>

    <div class="r-section">
      <div class="r-section-head"><span class="r-section-num">03</span> Experience</div>
      <div class="timeline">
        {% for job in site.data.work %}
        <div class="tjob">
          <div class="tjob-head">
            <div class="tjob-co">{{ job.company }}</div>
            <div class="tjob-period">{{ job.period | upcase }}</div>
          </div>
          <div class="tjob-title">{{ job.title }}</div>
          <div class="tjob-meta">{{ job.location }}{% if job.sub != "" %} &middot; {{ job.sub }}{% endif %}</div>
          {% if job.bullets.size > 0 %}
          <ul class="tjob-bullets">
            {% for b in job.bullets %}<li>{{ b }}</li>{% endfor %}
          </ul>
          {% endif %}
          {% if job.patent %}
          <div class="tjob-patent">&#10921; {{ job.patent }}</div>
          {% endif %}
        </div>
        {% endfor %}
      </div>
    </div>

    <div class="r-section">
      <div class="r-section-head"><span class="r-section-num">04</span> Education</div>
      {% for e in site.data.education %}
      <div class="edu-row">
        <div>
          <div class="edu-degree">{{ e.degree }}</div>
          <div class="edu-school">{{ e.school }}</div>
          <div class="edu-meta">{{ e.location }}</div>
        </div>
        <div class="edu-period">{{ e.period }}</div>
      </div>
      {% endfor %}
    </div>

    <div class="r-section">
      <div class="r-section-head"><span class="r-section-num">05</span> Patents</div>
      <div class="r-patents">
        <div class="r-patent">
          <div class="r-patent-num">&#10921; US PATENT 18/144,734</div>
          <div class="r-patent-title">Interactive Asynchronous Tile-Based Terrain Generation</div>
          <div class="r-patent-meta">UNITY TECHNOLOGIES &middot; GPU-accelerated tile stitching with zero latent allocations</div>
        </div>
        <div class="r-patent">
          <div class="r-patent-num">&#10921; US PATENT #11,189,068</div>
          <div class="r-patent-title">Macro-based Electronic Map Editing</div>
          <div class="r-patent-meta">CRYSTAL DYNAMICS &middot; Workflow innovations for AAA game map editors</div>
        </div>
      </div>
    </div>

  </div>
</section>
