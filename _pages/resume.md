---
title: Resume
permalink: /resume/
layout: redesign
nav_id: resume
---
<div class="resume-page">

  <div class="resume-hero">
    <div>
      <div class="resume-hero-name">Sahil Ramani</div>
      <div class="resume-hero-title">
        <strong>Senior Software Engineer</strong> · Neural Rendering, 3D Reconstruction &amp; Simulation
      </div>
      <div class="resume-hero-actions">
        <a class="btn" href="{{ '/assets/files/ramani_ml.pdf' | relative_url }}">Download PDF</a>
      </div>
    </div>
    <div class="resume-hero-meta">
      <div class="resume-hero-email">{{ site.author.name | default: 'sahilramani' }} · sahilramani@gmail.com</div>
      <div class="resume-hero-chips">
        <span class="resume-hero-chip">15+ yrs exp</span>
        <span class="resume-hero-chip">2 Patents</span>
        <span class="resume-hero-chip">Zoox · Unity · Crystal Dynamics</span>
      </div>
    </div>
  </div>

  <div class="resume-body">

    <div class="resume-sidebar">

      <div class="resume-section">
        <div class="resume-section-title">Skills</div>
        {% for group in site.data.skills %}
        <div class="skill-group">
          <div class="skill-group-label">{{ group.label }}</div>
          <div class="skill-pills">
            {% for pill in group.pills %}<span class="skill-pill">{{ pill }}</span>{% endfor %}
          </div>
        </div>
        {% endfor %}
      </div>

      <div class="resume-section">
        <div class="resume-section-title">Education</div>
        <div class="timeline">
          {% for e in site.data.education %}
          <div class="edu-item">
            <div class="edu-degree">{{ e.degree }}</div>
            <div class="edu-school">{{ e.school }}</div>
            <div class="edu-meta">{{ e.period }} · {{ e.location }}</div>
          </div>
          {% endfor %}
        </div>
      </div>

    </div>

    <div class="resume-main">

      <div class="resume-section">
        <div class="resume-section-title">Summary</div>
        <p class="resume-summary">
          Machine learning engineer and computer vision specialist with 15+ years of experience deploying production ML systems. Led neural rendering and terrain generation at Unity Technologies, and architected 3D Reconstruction workflows for autonomous vehicles at Zoox. Proven track record leading R&amp;D teams with expertise in optimizing ML systems for real‑time applications.
        </p>
      </div>

      <div class="resume-section">
        <div class="resume-section-title">Experience</div>
        <div class="timeline">
          {% for job in site.data.work %}
          <div class="job">
            <div class="job-header">
              <div class="job-company">{{ job.company }}</div>
              <div class="job-period">{{ job.period }}</div>
            </div>
            <div class="job-title">{{ job.title }}</div>
            <div class="job-location">{% if job.sub != "" %}{{ job.sub }} · {% endif %}{{ job.location }}</div>
            {% if job.bullets.size > 0 %}
            <ul class="job-bullets">
              {% for b in job.bullets %}<li>{{ b }}</li>{% endfor %}
            </ul>
            {% endif %}
            {% if job.patent %}
            <div class="patent-badge">⬡ {{ job.patent }}</div>
            {% endif %}
          </div>
          {% endfor %}
        </div>
      </div>

    </div>
  </div>
</div>
