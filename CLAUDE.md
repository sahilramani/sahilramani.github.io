# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal site/blog at https://sahilramani.github.io (CNAME points the GitHub Pages site to a custom domain). It is a Jekyll site running "Field", the repo's own theme, deployed via GitHub Pages - there is no custom build pipeline; pushing to `master` is the deploy.

The site started on the Minimal Mistakes remote theme but no longer uses it: all layouts, styles, and scripts are local. `_config.yml` intentionally has no `theme:`/`remote_theme:` key - GitHub Pages injects `jekyll-theme-primer` as a default, which is inert because every page uses a local layout. Do not add a theme key.

## Common commands

```bash
bundle install                  # install gems (first time / after Gemfile changes)
bundle exec jekyll serve        # local dev server with live reload at http://localhost:4000
bundle exec jekyll serve --drafts
bundle exec jekyll build        # one-off build into _site/
```

`_config.yml` is **not** reloaded by `jekyll serve` - restart the server after editing it.

## Structure conventions

- `_layouts/` - the Field theme: `field.html` (base chrome: nav, hamburger, footer), `field-post.html` (post reader), `field-project.html` (project page). `index.html` at the repo root is `layout: null` and owns its own chrome.
- `_sass/field/` - all theme styles: `_base.scss` (tokens + chrome), `_post.scss`, `_project.scss`, `_code.scss` (a `field-code($scope)` mixin for code panels/rouge palette), `_home.scss`. Entry points are `assets/css/main.scss` (all pages via `field.html`) and `assets/css/home.scss` (home only). Keep `sass: style: expanded` in `_config.yml` - the Ruby Sass 3.x `compressed` mode mangles CSS custom properties.
- `assets/js/` - `field.js` (hamburger + `[data-field-canvas]` helper), `field-post.js`, `field-project.js`, `home.js`. Loaded via plain `<script src>` at end of body; no bundler.
- `_includes/` - `analytics.html` (gtag, shared by `field.html` and `index.html`), `series-nav.html`, `series-next.html`.
- `_posts/` - blog posts. Filename must be `YYYY-MM-DD-slug.md`; permalinks are `/:year/:month/:title/` (set in `_config.yml`). The `defaults` block in `_config.yml` applies `layout: field-post` and `comments: true`, so individual post front matter usually only needs `title`, `categories`, `tags`, `excerpt`.
- `_projects/` - project collection, rendered with `field-project` at `/projects/:name/`.
- `_pages/` - standalone pages (about, resume, archives). `_pages` is listed under `include:` in `_config.yml` so the directory is published; each page sets its own `permalink`.
- `assets/` - `images/`, `css/`, and `files/` (e.g. resume PDF at `assets/files/ramani_ml.pdf`, linked from `_pages/resume.md`).
- `.well-known/` is explicitly included so files there are published verbatim.

## Deploy

GitHub Pages builds from `master`. The plugin set in `_config.yml` (jekyll-paginate, jekyll-sitemap, jekyll-gist, jekyll-feed, jemoji, jekyll-include-cache, jekyll-archives, jekyll-seo-tag) is what GH Pages whitelists for this site - adding a non-whitelisted plugin will work locally but break the published build.
