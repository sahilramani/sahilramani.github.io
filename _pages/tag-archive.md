---
title: Posts by Tag
permalink: /tags/
layout: redesign
nav_id: blog
---
<div class="archive-page">
  <div class="blog-header">
    <h1>Posts by Tag</h1>
    <p>Browse {{ site.posts | size }} posts grouped by tag.</p>
  </div>

  {%- assign all_tags = "" | split: "" -%}
  {%- for post in site.posts -%}
    {%- for tag in post.tags -%}
      {%- unless all_tags contains tag -%}
        {%- assign all_tags = all_tags | push: tag -%}
      {%- endunless -%}
    {%- endfor -%}
  {%- endfor -%}
  {%- assign all_tags = all_tags | sort -%}

  <div class="archive-jump">
    {%- for tag in all_tags -%}
    <a href="#{{ tag | slugify }}">#{{ tag | replace: ' ', '' }}</a>
    {%- endfor -%}
  </div>

  {%- for tag in all_tags -%}
  {%- assign tag_posts = site.posts | where_exp: "p", "p.tags contains tag" -%}
  <div class="archive-group">
    <span class="archive-group-anchor" id="{{ tag | slugify }}"></span>
    <h2 class="archive-group-title">
      #{{ tag | replace: ' ', '' }}
      <span class="archive-group-count">{{ tag_posts | size }} {% if tag_posts.size == 1 %}post{% else %}posts{% endif %}</span>
    </h2>
    <div class="blog-list">
      {%- for post in tag_posts -%}
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
