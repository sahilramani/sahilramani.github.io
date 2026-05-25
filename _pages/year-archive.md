---
title: Writing
permalink: /posts/
layout: field
nav_id: blog
---
<style>
.archive-hero{padding:96px 60px 56px;border-bottom:1px solid var(--line);max-width:1400px;margin:0 auto;width:100%}
.archive-hero-inner{max-width:1100px;margin:0 auto}
.archive-hero .eyebrow{font-family:var(--mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--g);margin-bottom:22px;display:flex;align-items:center;gap:10px}
.archive-hero .eyebrow::before{content:'';width:32px;height:1px;background:var(--g)}
.archive-hero h1{font-family:var(--sans);font-size:clamp(56px,8vw,96px);line-height:0.95;letter-spacing:-0.04em;font-weight:300;color:var(--ink);margin-bottom:18px}
.archive-hero h1 em{font-family:var(--serif);font-style:italic;color:var(--g);font-weight:400}
.archive-hero p{font-family:var(--mono);font-size:13px;color:var(--ink2);letter-spacing:0.04em;max-width:680px}

.archive-list{padding:48px 60px 96px;max-width:1400px;margin:0 auto;width:100%;border-bottom:1px solid var(--line)}
.archive-list-inner{max-width:1100px;margin:0 auto}
.archive-filters{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:36px;padding-bottom:32px;border-bottom:1px solid var(--line)}
.archive-filters .pill{cursor:pointer;background:transparent;border-radius:100px}
.archive-filters .pill.active{color:#000;background:var(--g);border-color:var(--g)}

.archive-empty{display:none;padding:48px 0;text-align:center;font-family:var(--mono);font-size:13px;color:var(--ink2);letter-spacing:0.06em}
.archive-empty.show{display:block}

@media (max-width: 1100px){
  .archive-hero{padding:72px 32px 48px}
  .archive-list{padding:40px 32px 80px}
}
@media (max-width: 768px){
  .archive-hero{padding:56px 20px 36px}
  .archive-list{padding:32px 20px 64px}
  .archive-filters{margin-bottom:24px;padding-bottom:20px}
}
</style>

<section class="archive-hero">
  <div class="archive-hero-inner">
    <div class="eyebrow">// FIELD NOTES &middot; INDEX</div>
    <h1><em>Writing.</em></h1>
    <p>{{ site.posts | size }} posts on engineering, machine learning, mental health, and the seam where graphics meets ML.</p>
  </div>
</section>

<section class="archive-list">
  <div class="archive-list-inner">

    {%- assign all_cats = "" | split: "" -%}
    {%- for post in site.posts -%}
      {%- for cat in post.categories -%}
        {%- unless all_cats contains cat -%}
          {%- assign all_cats = all_cats | push: cat -%}
        {%- endunless -%}
      {%- endfor -%}
    {%- endfor -%}
    {%- assign all_cats = all_cats | sort -%}

    <div class="archive-filters pill-row" id="blog-filters">
      <button class="pill active" data-filter="all" type="button">ALL &middot; {{ site.posts | size }}</button>
      {%- for cat in all_cats -%}
      <button class="pill" data-filter="{{ cat | slugify }}" type="button">{{ cat | upcase }}</button>
      {%- endfor -%}
    </div>

    <div class="writing" id="blog-list">
      {%- for post in site.posts -%}
        {%- assign words = post.content | strip_html | number_of_words -%}
        {%- assign minutes = words | divided_by: 200 | at_least: 1 -%}
        {%- assign category = post.categories | first | default: 'essay' -%}
        {%- capture data_cats -%}{%- for c in post.categories -%}{{ c | slugify }} {% endfor -%}{%- endcapture -%}
      <a class="wrow" href="{{ post.url | relative_url }}" data-categories="{{ data_cats | strip }}">
        <span class="wdate">{{ post.date | date: "%Y.%m.%d" }}</span>
        <span class="wcat">{{ category | upcase }}</span>
        <span class="wtitle">{{ post.title }}</span>
        <span class="wmeta">{{ minutes }} min &nearr;</span>
      </a>
      {%- endfor -%}
    </div>

    <div class="archive-empty" id="archive-empty">// NO POSTS MATCH THIS FILTER</div>

  </div>
</section>

<script>
(function(){
  var filters = document.getElementById('blog-filters');
  var list = document.getElementById('blog-list');
  var empty = document.getElementById('archive-empty');
  if(!filters || !list) return;
  filters.addEventListener('click', function(e){
    var btn = e.target.closest('.pill');
    if(!btn) return;
    var filter = btn.dataset.filter;
    filters.querySelectorAll('.pill').forEach(function(b){
      b.classList.toggle('active', b === btn);
    });
    var visibleCount = 0;
    list.querySelectorAll('.wrow').forEach(function(item){
      var cats = (item.dataset.categories || '').split(/\s+/);
      var show = (filter === 'all' || cats.indexOf(filter) !== -1);
      item.style.display = show ? '' : 'none';
      if(show) visibleCount++;
    });
    if(empty) empty.classList.toggle('show', visibleCount === 0);
  });
})();
</script>
