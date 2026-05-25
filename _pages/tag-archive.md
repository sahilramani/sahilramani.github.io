---
title: Posts by Tag
permalink: /tags/
layout: field
nav_id: blog
---
<style>
.archive-hero{padding:96px 60px 56px;border-bottom:1px solid var(--line);max-width:1400px;margin:0 auto;width:100%}
.archive-hero-inner{max-width:1100px;margin:0 auto}
.archive-hero .eyebrow{font-family:var(--mono);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:var(--g);margin-bottom:22px;display:flex;align-items:center;gap:10px}
.archive-hero .eyebrow::before{content:'';width:32px;height:1px;background:var(--g)}
.archive-hero h1{font-family:var(--sans);font-size:clamp(56px,8vw,88px);line-height:0.95;letter-spacing:-0.04em;font-weight:300;color:var(--ink);margin-bottom:18px}
.archive-hero h1 em{font-family:var(--serif);font-style:italic;color:var(--g);font-weight:400}
.archive-hero p{font-family:var(--mono);font-size:13px;color:var(--ink2);letter-spacing:0.04em;max-width:680px}

.tax-jump{display:flex;flex-wrap:wrap;gap:8px;padding:32px 60px;border-bottom:1px solid var(--line);max-width:1400px;margin:0 auto;width:100%;position:sticky;top:50px;background:rgba(8,8,10,0.92);backdrop-filter:blur(8px);z-index:5}
.tax-jump-inner{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;gap:8px;width:100%}
.tax-jump a{font-family:var(--mono);font-size:10px;letter-spacing:0.06em;color:var(--ink2);padding:5px 10px;border:1px solid var(--line2);border-radius:100px;transition:color .12s,border-color .12s}
.tax-jump a:hover{color:var(--g);border-color:var(--g)}

.tax-body{padding:64px 60px 96px;max-width:1400px;margin:0 auto;width:100%;border-bottom:1px solid var(--line)}
.tax-body-inner{max-width:1100px;margin:0 auto}
.tax-group{margin-bottom:64px;scroll-margin-top:120px}
.tax-group:last-child{margin-bottom:0}
.tax-group-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin-bottom:24px;padding-bottom:14px;border-bottom:1px solid var(--g)}
.tax-group-title{font-family:var(--mono);font-size:22px;font-weight:500;letter-spacing:0.02em;color:var(--ink)}
.tax-group-title .hash{color:var(--g);font-weight:700}
.tax-group-count{font-family:var(--mono);font-size:11px;color:var(--g);letter-spacing:0.08em;text-transform:uppercase}

@media (max-width: 1100px){
  .archive-hero{padding:72px 32px 48px}
  .tax-jump{padding:24px 32px;top:50px}
  .tax-body{padding:48px 32px 80px}
}
@media (max-width: 768px){
  .archive-hero{padding:56px 20px 36px}
  .tax-jump{padding:18px 20px;top:50px}
  .tax-body{padding:36px 20px 64px}
  .tax-group{margin-bottom:48px}
  .tax-group-title{font-size:18px}
}
</style>

<section class="archive-hero">
  <div class="archive-hero-inner">
    <div class="eyebrow">// INDEX &middot; BY TAG</div>
    <h1>Posts by <em>tag</em></h1>
    <p>Browse {{ site.posts | size }} posts grouped by tag.</p>
  </div>
</section>

{%- assign all_tags = "" | split: "" -%}
{%- for post in site.posts -%}
  {%- for tag in post.tags -%}
    {%- unless all_tags contains tag -%}
      {%- assign all_tags = all_tags | push: tag -%}
    {%- endunless -%}
  {%- endfor -%}
{%- endfor -%}
{%- assign all_tags = all_tags | sort -%}

<nav class="tax-jump" aria-label="Jump to tag">
  <div class="tax-jump-inner">
    {%- for tag in all_tags -%}
    <a href="#{{ tag | slugify }}">#{{ tag | replace: ' ', '' | downcase }}</a>
    {%- endfor -%}
  </div>
</nav>

<section class="tax-body">
  <div class="tax-body-inner">
    {%- for tag in all_tags -%}
      {%- assign tag_posts = site.posts | where_exp: "p", "p.tags contains tag" -%}
    <div class="tax-group" id="{{ tag | slugify }}">
      <div class="tax-group-head">
        <div class="tax-group-title"><span class="hash">#</span>{{ tag | replace: ' ', '' | downcase }}</div>
        <div class="tax-group-count">{{ tag_posts | size }} {% if tag_posts.size == 1 %}POST{% else %}POSTS{% endif %}</div>
      </div>
      <div class="writing">
        {%- for post in tag_posts -%}
          {%- assign words = post.content | strip_html | number_of_words -%}
          {%- assign minutes = words | divided_by: 200 | at_least: 1 -%}
          {%- assign category = post.categories | first | default: 'essay' -%}
        <a class="wrow" href="{{ post.url | relative_url }}">
          <span class="wdate">{{ post.date | date: "%Y.%m.%d" }}</span>
          <span class="wcat">{{ category | upcase }}</span>
          <span class="wtitle">{{ post.title }}</span>
          <span class="wmeta">{{ minutes }} min &nearr;</span>
        </a>
        {%- endfor -%}
      </div>
    </div>
    {%- endfor -%}
  </div>
</section>
