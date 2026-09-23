# AURA Mobile Health Prototype

## Goal
Build a polished, mobile-first AURA wearable companion that demonstrates the complete hackathon journey from onboarding and device connection through an accelerated two-minute stimulation session, automatic episode capture, trend review, and report generation.

## Experience
- Create a centered smartphone-scale experience that remains stable across common phone widths and gracefully fills larger previews without becoming a desktop dashboard.
- Establish AURA’s visual system using the supplied navy, teal, lavender, off-white, border, warning, and coral palette; Inter for English and IBM Plex Sans Arabic for Arabic.
- Add a minimal ripple/biometric AURA mark, premium device artwork, calm motion, refined shadows, 16–24px surfaces, large metric typography, and smooth restrained charts.
- Preserve generous whitespace and clear hierarchy; avoid medical claims, personal names, clutter, and placeholder styling.

## App Structure
- Build the experience as one cohesive interactive mobile application at `/`, with internal views for onboarding, home, active session, session completion, episodes, episode details, heart trends, health summary/report, profile, and device settings.
- Show the fixed four-item bottom navigation only on the main app destinations: Home, Episodes, Heart, and Profile.
- Provide natural back navigation for detail and settings screens, while immersive session screens focus on the active flow.

## Functional Journey
- Implement the three-screen onboarding flow with language selection, device connection animation, connected confirmation, and automatic-data overview.
- Build Home with live connection state, battery/sync details, today’s episode count, live heart-rate sparkline, start-session action, weekly activity, and neutral data insight.
- Run a demo-accelerated session that visibly represents exactly 02:00, animates a progress ring and heart-rate series, updates values smoothly, and automatically completes.
- On completion, create a new in-memory episode exactly once, immediately update history and heart summaries, and link directly to the new episode details.
- Build episode history filters, detail summaries, the full-session heart-rate graph, and the recorded-event timeline.
- Build current and historical heart-rate views with episode measurement summaries.
- Build Health Summary with date range, aggregate measurements, recorded sessions, report preparation, ready, view, and share prototype states.
- Build Profile and Device Settings with working language, preference, connection, and simulated disconnect/reconnect controls.

## English and Arabic
- Centralize every visible label and dynamic phrase in complete English and Arabic dictionaries.
- Switch the document language and direction globally; mirror navigation order, directional controls, alignment, and timeline layout for RTL while keeping charts and numeric readings understandable.
- Keep the language switch available during onboarding and in Profile.

## Data and State
- Define typed mock episodes around September 2026 with all requested fields and realistic heart-rate series.
- Keep shared app state for onboarding, language, device connection, preferences, active session, episodes, selected episode, and report generation.
- Use deterministic mock updates so the live demo behaves consistently and does not rely on a backend or personal data.

## Technical Details
- Use React state/context for the self-contained prototype and Recharts for responsive, smooth graphs.
- Create focused reusable pieces for the mobile shell, logo/device artwork, navigation, metric displays, status rows, charts, session ring, and language control.
- Extend the Tailwind v4 design system in `src/styles.css` with semantic AURA tokens, typography, shadows, and reduced-motion-safe animations.
- Use existing design-system buttons and switches for interactive controls; use line icons from Lucide.
- Add route-specific title, description, Open Graph, and Twitter metadata to the home route and replace template metadata.

## Verification
- Verify the principal live-demo flow end to end in the browser, including accelerated completion and immediate episode creation.
- Verify all four navigation destinations, episode/detail/report/device interactions, and control states.
- Verify English and Arabic screens at mobile viewport sizes, including RTL alignment, mirrored directionality, translated labels, chart stability, and no overflow.
- Check that no personal name, unsupported diagnosis, certification claim, or template placeholder remains.
