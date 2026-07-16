# sahilramani.github.io

Personal site and blog for Sahil Ramani -- live at [sahilramani.com](https://sahilramani.com) (CNAME points GitHub Pages at the custom domain). Built with Jekyll on GitHub Pages, with a custom dark "neural rendering / field instrument" aesthetic ("Field") instead of a stock theme.

## What's here

- A single-page hero/landing at `/` -- animated NeRF-style point cloud, a Gaussian-splat training animation generated live from `assets/images/bio-photo.jpg`, condensed sections for telemetry / writing / projects / resume / about / contact.
- Full standalone pages in the same aesthetic at `/about/`, `/resume/`, `/posts/`, `/categories/`, `/tags/`, plus per-post pages and a 404.
- Blog posts authored in Markdown under `_posts/`.

## Local development

```bash
bundle install                       # first time, or after Gemfile changes
bundle exec jekyll serve             # dev server with live reload at http://localhost:4000
bundle exec jekyll serve --drafts    # include posts in _drafts/
bundle exec jekyll build             # one-off build into _site/
```

`_config.yml` is **not** picked up by `jekyll serve` on save -- restart the server after editing it.

The site runs "Field", its own in-repo theme: layouts in `_layouts/field*.html`, styles in `_sass/field/` (compiled through `assets/css/main.scss` and `assets/css/home.scss`), and scripts in `assets/js/`. There is no `theme:`/`remote_theme:` in `_config.yml` on purpose -- GitHub Pages injects `jekyll-theme-primer` as a default when none is set, which is inert here because every page uses a local layout and nothing links primer's CSS. Don't "fix" that by adding a theme key.

The site started life on the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) remote theme; the Field theme replaced it wholesale and no Minimal Mistakes code ships anymore.

## Structure

```
index.html                       Home page (layout: null -- owns its own chrome)
_layouts/
  field.html                     Shared layout: nav, hamburger, footer, scanline
  field-post.html                Post reader (sparse cloud hero + body + related)
  field-project.html             Project detail page
_includes/
  analytics.html                 gtag snippet (shared by field.html and index.html)
  series-nav.html                Series index box for multi-part posts
  series-next.html               "Next part" teaser link
_sass/field/
  _base.scss                     Site chrome: tokens, nav, hero, footer
  _post.scss                     Post reader styles
  _project.scss                  Project page styles
  _code.scss                     field-code($scope) mixin: code panels + rouge palette
  _home.scss                     Home page styles (only home.css imports it)
_pages/
  about.md     /about/           layout: field
  resume.md    /resume/          layout: field
  year-archive.md     /posts/    layout: field   (writing list with filter pills)
  category-archive.md /categories/
  tag-archive.md      /tags/
  404.md              /404.html
_posts/YYYY-MM-DD-slug.md        Blog posts. Permalink: /:year/:month/:title/
_data/
  work.yml                       Resume experience timeline (consumed by /resume/)
  skills.yml                     Resume skill groups (consumed by /resume/)
  education.yml                  Resume education list (consumed by /resume/)
assets/
  images/                        bio-photo.jpg, post images, favicon
  files/                         Resume PDFs
  css/main.scss                  Field stylesheet entry (imports _sass/field/*)
  css/home.scss                  Home-only stylesheet entry
  js/                            field.js, field-post.js, field-project.js, home.js
.well-known/                     Published verbatim
```

### Adding a post

1. Create `_posts/YYYY-MM-DD-slug.md` -- the date in the filename sets the publish date.
2. Front matter:
   ```yaml
   ---
   title: "Post title"
   categories:
     - Programming
   tags:
     - performance
   excerpt: "One-line summary used in cards and meta tags."
   ---
   ```
   Layout defaults to `field-post` automatically (set in `_config.yml`).
3. Write Markdown. The post reader styles h2 with `// section` mono eyebrows, h3 plain, code blocks against `--bg2`, blockquotes with a green left bar, and inline `code` with a hairline border.

### Updating the resume

Most fields are data-driven -- edit `_data/work.yml`, `_data/skills.yml`, or `_data/education.yml`. The page layout itself rarely needs changes.

### The Field design

Design tokens (`--bg`, `--g`, fonts) live in `_sass/field/_base.scss`; page-specific styles sit next to it in `_sass/field/`. The home page's hero canvas (`#field`), portrait splat (`#splat-overlay`), and per-project card visualizations (`canvas[data-vis]`) live in `assets/js/home.js`. The shared `[data-field-canvas]` helper in `assets/js/field.js` powers the sparser clouds on `/about/`, individual post heros, and `/404.html` -- configure via `data-points`, `data-cx`, `data-cy`, `data-scale`, `data-rot-speed` attributes.

## Deploy

GitHub Pages builds from `master` -- `git push origin master` is the deploy. The plugins enabled in `_config.yml` (`jekyll-paginate`, `jekyll-sitemap`, `jekyll-gist`, `jekyll-feed`, `jemoji`, `jekyll-include-cache`, `jekyll-archives`) are all on the GitHub Pages allow-list. Adding a non-whitelisted plugin will work locally but break the published build.

The CNAME file at the repo root points the Pages site at the custom domain.
