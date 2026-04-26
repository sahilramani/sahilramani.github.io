# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal site/blog at https://sahilramani.github.io (CNAME points the GitHub Pages site to a custom domain). It is a Jekyll site built on the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) remote theme and deployed via GitHub Pages — there is no custom build pipeline; pushing to `master` is the deploy.

## Common commands

```bash
bundle install                  # install gems (first time / after Gemfile changes)
bundle exec jekyll serve        # local dev server with live reload at http://localhost:4000
bundle exec jekyll serve --drafts
bundle exec jekyll build        # one-off build into _site/
```

`_config.yml` is **not** reloaded by `jekyll serve` — restart the server after editing it.

## Structure conventions

- `_posts/` — blog posts. Filename must be `YYYY-MM-DD-slug.md`; permalinks are `/:year/:month/:title/` (set in `_config.yml`). Defaults applied to posts (single layout, author profile, share, related, comments, wide) come from the `defaults` block in `_config.yml`, so individual post front matter usually only needs `title`, `categories`, `tags`, `excerpt`.
- `_pages/` — standalone pages (about, resume, archives). `_pages` is listed under `include:` in `_config.yml` so the directory is published; each page sets its own `permalink`.
- `_data/navigation.yml` — top nav. Edit here, not in templates.
- `assets/` — `images/`, `css/`, and `files/` (e.g. resume PDF at `assets/files/ramani_ml.pdf`, linked from `_pages/resume.md`).
- `.well-known/` is explicitly included so files there are published verbatim.
- The theme itself is pulled remotely (`remote_theme: mmistakes/minimal-mistakes`); to override layouts/includes, create matching paths locally — they take precedence over the remote theme.

## Deploy

GitHub Pages builds from `master`. The plugin set in `_config.yml` (jekyll-paginate, jekyll-sitemap, jekyll-gist, jekyll-feed, jemoji, jekyll-include-cache, jekyll-archives) is what GH Pages whitelists for this site — adding a non-whitelisted plugin will work locally but break the published build.
