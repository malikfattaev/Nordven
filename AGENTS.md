# Nordven UI Standard

When working on Nordven UI, do not settle for generic, safe, template-like output. The visual bar is premium software studio: calm, deliberate, distinctive, and memorable.

## Default Design Posture

- Act as a senior product designer plus frontend engineer, not only an implementer.
- If a UI looks like generic SaaS, AI slop, dashboard boilerplate, or a Tailwind starter, redesign it.
- Prefer strong visual direction over harmless neutrality.
- Preserve Nordven's calm, refined tone, but make it feel expensive and intentional.
- Do not add decoration for its own sake; every visual choice should support hierarchy, rhythm, or brand feel.

## Before Building Larger UI Changes

For non-trivial UI work, first choose a direction:

- Name the visual idea in one sentence.
- Identify what makes it distinctive.
- Decide typography, spacing, color mood, background atmosphere, and interaction behavior before editing.

Then implement and verify in browser when practical.

## Visual Principles

- Typography should carry personality. Avoid default-looking type treatment.
- Layout should have a clear editorial rhythm, not evenly spaced generic blocks.
- Backgrounds should feel atmospheric: gradients, light fields, spatial depth, or subtle structure are preferred over flat empty color.
- Cards should not look like ordinary SaaS cards unless the existing design system demands it.
- Motion should be sparse and meaningful: page entry, reveal, hover response, or spatial continuity.
- Mobile must feel designed, not merely stacked.
- Avoid purple/default AI aesthetics unless explicitly requested.

## Nordven Brand Feel

Nordven should feel like:

- senior engineering with taste;
- quiet confidence;
- European software lab energy;
- soft but precise;
- premium, not loud;
- technical, but human.

Good reference feelings: Linear discipline, Vercel clarity, Metalab editorial polish, A24 restraint, Teenage Engineering intentionality, high-end studio portfolio calm.

## Quality Gate

Before calling UI work done, ask:

- Would this survive next to a strong studio website?
- Does it have one memorable visual idea?
- Is the hierarchy obvious in five seconds?
- Does it avoid generic SaaS patterns?
- Does mobile still feel premium?
- Are hover/focus states intentional?

If the answer is no, keep polishing.

## Engineering Standard

Premium UI must not come at the expense of engineering quality. Keep the code as strong as the visuals.

- Use clean, maintainable React and Next.js patterns.
- Preserve type safety; run typecheck for meaningful changes.
- Keep components readable and avoid clever one-off hacks.
- Maintain accessibility: semantic HTML, keyboard states, focus visibility, labels, contrast, and reduced-motion behavior where relevant.
- Keep responsive layout intentional across desktop, tablet, and mobile.
- Watch performance: avoid unnecessary client components, heavy effects, layout thrash, excessive filters, and persistent compositor layers.
- Preserve SEO and metadata behavior when touching pages, layouts, routing, or content.
- Prefer small, purposeful abstractions over large generic component systems.
- Use lint, typecheck, build, and browser verification when practical.
- If a visual idea requires technical tradeoffs, pause and name the tradeoff before committing to it.
