---
title: Writing
permalink: /posts/
layout: redesign
nav_id: blog
---
<div class="section">
  <div class="blog-header">
    <h1>Writing</h1>
    <p>{{ site.posts | size }} posts on engineering, machine learning, and life.</p>
  </div>

  {%- assign all_cats = "" | split: "" -%}
  {%- for post in site.posts -%}
    {%- for cat in post.categories -%}
      {%- unless all_cats contains cat -%}
        {%- assign all_cats = all_cats | push: cat -%}
      {%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}
  {%- assign all_cats = all_cats | sort -%}

  <div class="blog-filters" id="blog-filters">
    <button class="filter-btn active" data-filter="all">All</button>
    {%- for cat in all_cats -%}
    <button class="filter-btn" data-filter="{{ cat | slugify }}">{{ cat }}</button>
    {%- endfor -%}
  </div>

  <div class="blog-list" id="blog-list">
    {%- for post in site.posts -%}
    {%- assign cat_slugs = "" | split: "" -%}
    {%- for c in post.categories -%}{%- assign cat_slugs = cat_slugs | push: c | push: " " -%}{%- endfor -%}
    {%- capture data_cats -%}{%- for c in post.categories -%}{{ c | slugify }} {% endfor -%}{%- endcapture -%}
    <a class="blog-list-item" href="{{ post.url | relative_url }}" data-categories="{{ data_cats | strip }}">
      <div class="blog-list-date">{{ post.date | date: "%b %-d, %Y" }}</div>
      <div>
        {%- if post.categories.first -%}
        <div class="blog-list-cat">{{ post.categories.first }}</div>
        {%- endif -%}
        <div class="blog-list-title">{{ post.title }}</div>
        <div class="blog-list-excerpt">{{ post.excerpt | strip_html | strip_newlines | truncate: 220 }}</div>
      </div>
    </a>
    {%- endfor -%}
  </div>
</div>

<script>
  (function () {
    var filters = document.getElementById('blog-filters');
    var list = document.getElementById('blog-list');
    if (!filters || !list) return;
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      var filter = btn.dataset.filter;
      filters.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      list.querySelectorAll('.blog-list-item').forEach(function (item) {
        var cats = (item.dataset.categories || '').split(/\s+/);
        item.style.display = (filter === 'all' || cats.indexOf(filter) !== -1) ? '' : 'none';
      });
    });
  })();
</script>
