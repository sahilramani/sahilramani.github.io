---
published: false
---

# slimgs series — queued follow-ups

Reader-suggested experiments and fixes for the Gaussian-Splatting-on-a-Jetson-Nano
series. Not published (`published: false`). Working notes only.

Status key: `[ ]` open · `[~]` in progress · `[x]` done

## Post 2 — the bottleneck wasn't the sort

- [ ] **Density images.** Show the stress scene at increasing splats-per-tile so
  "deliberately heavy" is visual, not asserted. Note: the knob sets count, not
  fidelity — the point is what dense overlap looks like.
- [ ] **After-`__expf` stage breakdown.** Add an explicit before/after profile.
  Render drops 53→45.7 ms while the sort holds, so its share climbs to ~72% —
  put the split next to the "same proportions" sentence.
- [ ] **Cache / occupancy counters.** Published only occupancy (98%) and
  issue-active (99%). Add shared-mem read/write throughput, L1/L2 hit-vs-miss,
  L1/L2 vs DRAM bytes moved, ALU counters. Caveat: nvprof on Tegra/Maxwell
  exposes a thin, sometimes-unreliable set (the bogus "DRAM utilization" reading
  is the example) — pull what's trustworthy and flag what isn't. **Blocks the two
  items below.**
- [ ] **Tile aspect-ratio sweep.** Try 32×8, 32×16 vs stock 16×16. Wider tiles
  lay pixels across more contiguous framebuffer rows — fewer strided jumps,
  better cache-line fill. Confound: tile shape also changes splats-per-tile
  overlap, which is what actually binds this kernel — fix the synthetic scene and
  sweep only the shape to separate the two. Align per-tile buffers to page
  boundaries as free hygiene. Do after the cache counters are on screen.
- [ ] **1D-texture exp LUT — evaluated, likely not worth it.** Hot loop is already
  a single `MUFU.EX2` on the SFU, and the kernel is dependency/sync-bound, not
  SFU-throughput-bound. A tex/L1 fetch trades one latency for another on the same
  serial chain. Revisit only if counters show the SFU as the limiter.

## Post 6 — the backward pass I deleted

- [ ] **Re-render the 30k-distilled images at higher res.** Current
  `12-distilled-30k-inband-21fps.png` (hero/teaser) and
  `10-distilled-30k-recognizable.png` are the blurriest/streakiest in the series
  and visually undercut the "distillation wins" claim. Drop-in same paths, keep
  855×480, same camera as `13`/`09`. Softness is real (30k = 4% of scene +
  enlarged-splat artifact), but a cleaner render of the same model would read
  better.

## Final post — two machines, one git history

- [ ] **`handoff/*.md` footer pointer.** Decide whether to reword the closing
  reference to `handoff/jetson.md` / `handoff/5080.md` — same not-yet-live repo
  issue as the delinks in #17, but it's woven into the post's narrative.

## Whole series — when the repo goes live

- [ ] **Re-add repo pointers.** #17 stripped "slimgs repo" / in-repo deliverable
  references from parts 1–6 because the repo isn't public. Restore them (with the
  URL) once it is.
