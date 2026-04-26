---
title: Posts by Category
permalink: /categories/
layout: redesign
nav_id: blog
---
<div class="archive-page">
  <div class="blog-header">
    <h1>Posts by Category</h1>
    <p>Browse {{ site.posts | size }} posts grouped by topic.</p>
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

  <div class="archive-jump">
    {%- for cat in all_cats -%}
    <a href="#{{ cat | slugify }}">{{ cat }}</a>
    {%- endfor -%}
  </div>

  {%- for cat in all_cats -%}
  {%- assign cat_posts = site.posts | where_exp: "p", "p.categories contains cat" -%}
  <div class="archive-group">
    <span class="archive-group-anchor" id="{{ cat | slugify }}"></span>
    <h2 class="archive-group-title">
      {{ cat }}
      <span class="archive-group-count">{{ cat_posts | size }} {% if cat_posts.size == 1 %}post{% else %}posts{% endif %}</span>
    </h2>
    <div class="blog-list">
      {%- for post in cat_posts -%}
      <a class="blog-list-item" href="{{ post.url | relative_url }}">
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
  {%- endfor -%}
</div>
