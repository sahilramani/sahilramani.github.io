---
title: About
permalink: /about/
layout: redesign
nav_id: about
---
<div class="about-page">
  <div class="about-hero">

    <div class="about-photo-col">
      <div class="about-photo-wrap">
        <img src="{{ site.author.avatar | relative_url }}" alt="{{ site.author.name }}" />
      </div>
      <div class="about-photo-caption">
        {{ site.author.name }}<br />
        <span style="color: var(--accent);">Foster City, CA</span>
      </div>
    </div>

    <div class="about-text-col">
      <div class="about-eyebrow">Software Engineer · ML · Game Dev</div>
      <h1>About Me</h1>

      <div class="about-body">
        <p>
          Hi, I'm Sahil. I'm a software engineer at NVIDIA working on AI for game development - the slice of the field where neural networks meet real-time graphics, and where the tools that ship with games become as interesting as the games themselves.
        </p>
        <p>
          I've spent the last fifteen-or-so years moving between graphics, game engines, and machine learning. Shipped engine tech at Crystal Dynamics and DreamWorks, led neural-rendering R&amp;D at Unity, and built 3D reconstruction pipelines for self-driving at Zoox before landing at NVIDIA. Two patents along the way, and a deep conviction that the most interesting problems live at the seam between disciplines.
        </p>
        <p>
          Outside of work I'm a gamer, an amateur photographer, and a proud dog dad - we live with a Swiss Shepherd and a Samoyed mix who keep me honest about going outside. Most weekends involve a hike with them and my wife. The rest is reading, tinkering, and the occasional long walk to think a problem through.
        </p>
        <p>
          This site is where I write the things I want to remember - engineering notes, half-formed ideas, and the occasional essay on something more personal. Random access, no particular order.
        </p>
      </div>

      <div class="about-facts">
        <div class="about-fact">
          <div class="about-fact-label">Currently</div>
          <div class="about-fact-value">NVIDIA - AI for Games</div>
        </div>
        <div class="about-fact">
          <div class="about-fact-label">Previously</div>
          <div class="about-fact-value">Zoox · Unity · Crystal Dynamics · DreamWorks · Microsoft</div>
        </div>
        <div class="about-fact">
          <div class="about-fact-label">Education</div>
          <div class="about-fact-value">MS CS, USC · BE CS, BMS College</div>
        </div>
        <div class="about-fact">
          <div class="about-fact-label">Interests</div>
          <div class="about-fact-value">Gaming · Photography · Hiking · Dogs</div>
        </div>
      </div>

      <div class="about-links">
        <a class="social-link" href="https://github.com/{{ site.github_username }}" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" class="social-icon"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub
        </a>
        <a class="social-link" href="https://twitter.com/{{ site.twitter_username }}" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" class="social-icon"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          Twitter
        </a>
        <a class="social-link" href="mailto:{{ site.email }}">
          <svg viewBox="0 0 24 24" class="social-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          Email
        </a>
        <a class="social-link" href="{{ '/resume/' | relative_url }}">View Resume →</a>
      </div>
    </div>

  </div>
</div>
