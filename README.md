# AURA Companion

Build a polished, high-fidelity mobile digital health application called “AURA”.

AURA is the companion mobile application for AURA-NVNS, an earbud-style non-invasive wearable concept that provides transcutaneous auricular vagus nerve stimulation (taVNS) and tracks digital health data.

IMPORTANT:

This is a hackathon prototype / product demo. The app should feel like a premium, realistic digital health product, not a generic dashboard or a basic CRUD application.

The prototype should demonstrate this complete user journey:

Wearable connected

→ user activates a stimulation session

→ active 2-minute session

→ heart rate is monitored

→ session completes

→ episode is automatically recorded

→ user can review the episode

→ historical episodes and heart-rate trends can be viewed

→ user can generate a clinical summary/report.

Do NOT use the user's personal name anywhere in the application.

Use generic greetings such as “Good morning”, “Good afternoon”, or “Welcome back”.

==================================================

1. PLATFORM & DESIGN DIRECTION

==================================================

Design this as a MOBILE-FIRST application.

Target:

- Modern smartphone screen

- Portrait orientation

- Premium healthcare technology aesthetic

- Extremely polished UI

- Smooth, minimal, calm, trustworthy, sophisticated

- Inspired by the visual quality of Apple Health, Oura, and premium medical wearables, but DO NOT copy any of their interfaces.

The application should NOT look like:

- a hospital management system

- a generic fitness tracker

- a banking dashboard

- an old-fashioned medical app

- a template dashboard

It should feel like a premium wearable companion application.

Use:

- generous whitespace

- rounded cards

- subtle shadows

- smooth graphs

- large readable numbers

- minimal icons

- elegant typography

- subtle animations

- soft transitions

- clean hierarchy

- premium micro-interactions.

Avoid:

- excessive gradients

- excessive icons

- excessive borders

- clutter

- overly bright colors

- aggressive red medical alerts

- unnecessary charts

- desktop-style layouts.

==================================================

2. BRAND IDENTITY

==================================================

App name:

AURA

Optional subtitle:

Connected calm. Better understanding.

Create a simple premium AURA visual identity.

The logo should be minimal and abstract, inspired by:

- an aura/ripple

- a subtle ear/wave concept

- calmness

- connection

- biometric signal

Do not create a complicated medical cross logo.

Primary colors:

Deep Navy:

#12263A

AURA Teal:

#3DB7A7

Soft Lavender:

#A99BEA

Background:

#F7F9FA

White:

#FFFFFF

Primary text:

#17212B

Secondary text:

#71808F

Soft border:

#E7ECEF

Warning:

#F4B860

Muted coral for exceptional/critical states only:

#E97878

Use Deep Navy mainly for important typography.

Use Teal as the main interaction/accent color.

Use Lavender sparingly for wellbeing/insight elements.

The interface should mostly be white/off-white with teal and navy accents.

==================================================

3. TYPOGRAPHY

==================================================

Use a modern clean sans-serif font.

For English:

Inter or a similar modern sans-serif.

For Arabic:

Use a clean modern Arabic font such as IBM Plex Sans Arabic, Noto Sans Arabic, or a visually compatible modern Arabic font.

Typography hierarchy:

- Large numbers for health metrics

- Medium-weight headings

- Regular secondary text

- Avoid overly bold paragraphs.

Arabic typography must look intentional and polished, not like an afterthought.

==================================================

4. FULL BILINGUAL SUPPORT

==================================================

The app MUST support:

English

Arabic

Include a language switcher.

The language switcher should be visible on the onboarding screen and also available inside Profile / Settings.

Display it elegantly as:

EN | ع

or:

English | العربية

When Arabic is selected:

- Entire application switches to RTL

- Navigation order switches appropriately

- Cards and content align right

- Icons/arrows that indicate direction should mirror

- Text alignment becomes right aligned where appropriate

- Charts remain visually understandable

- Layout should not break

- No English UI labels should remain accidentally

- Dates and numbers should remain readable.

English = LTR.

Arabic = RTL.

Do NOT merely translate some labels.

The entire UI must support proper RTL.

Default language:

English.

==================================================

5. NAVIGATION

==================================================

Use a bottom navigation bar with exactly 4 main destinations:

1. Home

2. Episodes

3. Heart

4. Profile

Use simple line icons.

Suggested icons:

Home → house

Episodes → activity/history

Heart → heart/pulse

Profile → person/settings

The bottom navigation should be elegant, compact, and fixed.

The currently selected tab uses AURA Teal.

==================================================

6. ONBOARDING

==================================================

Create a short premium onboarding flow.

Screen 1:

AURA logo

“A calmer way to stay connected.”

Short description:

“Your AURA wearable helps deliver stimulation while the app securely tracks your sessions and heart-rate data.”

Primary button:

“Get Started”

Language selector:

EN | ع

Screen 2:

Title:

“Connect your AURA”

Show a beautiful stylized earbud/wearable illustration or premium device placeholder.

Status:

“Ready to connect”

Button:

“Connect Device”

After tapping:

show a short connection animation.

Then:

“Connected”

Green/teal status indicator.

Button:

“Continue”

Screen 3:

Title:

“Your data, automatically tracked.”

Show three small benefits:

Episode tracking

Date & time

Heart-rate monitoring

Then:

“Continue to AURA”

Do not request unnecessary personal information during onboarding.

==================================================

7. HOME SCREEN

==================================================

This is the main dashboard.

Top:

“Good afternoon”

Under it:

“How are you feeling today?”

Do not display any personal name.

Top-right:

small language switcher or globe icon if appropriate.

Device status card:

AURA Device

🟢 Connected

Battery:

84%

Small text:

“Last synced 2:36 PM”

Make this card visually premium.

--------------------------------

TODAY'S ACTIVITY

--------------------------------

Large card:

“Today”

Large number:

0

Label:

“Episodes”

Secondary text:

“No episodes recorded today”

If there are episodes, dynamically show:

“2 episodes today”

and the latest episode time.

--------------------------------

HEART RATE

--------------------------------

Card:

Heart Rate

Large number:

78 BPM

Small status:

“Live”

Add a smooth mini line chart showing recent heart-rate values.

Example mock data:

72, 75, 79, 81, 78, 76, 78

Do not use fake medical claims.

--------------------------------

QUICK ACTION

--------------------------------

Button:

“View Today’s Activity”

--------------------------------

WEEKLY OVERVIEW

--------------------------------

Card:

“This Week”

Show a minimal 7-day episode visualization.

Example:

Mon  •

Tue

Wed  ••

Thu  •

Fri

Sat

Sun

Do not make this chart visually complicated.

--------------------------------

INSIGHT CARD

--------------------------------

A soft lavender/teal card:

“Your data at a glance”

“4 episodes recorded this week”

“Average heart rate during recorded sessions: 94 BPM”

Include a small “View details” action.

IMPORTANT:

Do not say:

“Your anxiety is getting worse.”

“You have severe anxiety.”

“You are having a panic disorder.”

The app should display recorded measurements and trends without diagnosing the user.

==================================================

8. ACTIVE SESSION SCREEN

==================================================

This is one of the most important screens in the entire prototype.

When a session starts, navigate to a dedicated immersive screen.

Header:

“AURA Session”

Small status:

“Stimulation in progress”

Center of screen:

A large animated circular progress ring.

Inside:

01:42

Below:

“Remaining”

The session duration is exactly 2 minutes.

Animate the countdown realistically.

Use a subtle teal glow/pulse around the circle.

Do not make the animation distracting.

--------------------------------

HEART RATE

--------------------------------

Below the timer:

Heart Rate

Large:

104 BPM

Small:

“Monitoring”

Add a live animated heart-rate line graph.

The heart-rate value should update gradually using mock data.

Example sequence:

82

89

94

101

104

108

106

102

98

94

90

The graph should animate smoothly.

--------------------------------

SESSION INFO

--------------------------------

Show:

Session started

2:34 PM

Device

AURA Connected

--------------------------------

BOTTOM

--------------------------------

Subtle text:

“Stay comfortable. AURA will complete the session automatically.”

Do NOT add a large “Stop” button unless necessary.

If a stop action is included, make it secondary and clearly distinguish it from the primary flow.

==================================================

9. SESSION COMPLETE SCREEN

==================================================

After the 2-minute countdown reaches zero, automatically navigate to:

“Session Complete”

Use a subtle success animation.

Show:

✓

“Session recorded”

Then:

Duration

02:00

Average Heart Rate

96 BPM

Peak Heart Rate

108 BPM

Started

2:34 PM

Ended

2:36 PM

Primary button:

“View Episode”

Secondary:

“Back to Home”

Important:

The session should automatically create an episode record in the prototype data.

==================================================

10. EPISODES SCREEN

==================================================

Title:

“Episodes”

Top summary:

“This Week”

Large:

4

“Recorded episodes”

Optional segmented filter:

Week | Month

Main content is a chronological timeline/list.

Example:

TODAY

2:34 PM

Recorded episode

Duration 2 min

Peak HR 108 BPM

10:18 AM

Recorded episode

Duration 2 min

Peak HR 112 BPM

YESTERDAY

8:42 PM

Recorded episode

Duration 2 min

Peak HR 105 BPM

SEP 21

6:12 PM

Recorded episode

Duration 2 min

Peak HR 101 BPM

Each episode card is tappable.

Use subtle teal activity indicators.

If there are no episodes:

show a calm empty state:

“No episodes recorded yet.”

“No data is available for this period.”

==================================================

11. EPISODE DETAILS SCREEN

==================================================

When the user taps an episode:

Title:

“Episode Details”

Date:

September 23, 2026

Time:

2:34 PM

--------------------------------

SESSION SUMMARY

--------------------------------

Duration:

02:00

Average HR:

96 BPM

Peak HR:

108 BPM

Starting HR:

82 BPM

--------------------------------

HEART RATE GRAPH

--------------------------------

Create a large smooth line chart covering the full 2-minute session.

X-axis:

Time

Y-axis:

BPM

Use realistic mock data.

The graph should visually communicate the change over the session.

Do not use a complicated legend.

--------------------------------

SESSION TIMELINE

--------------------------------

2:34 PM

Episode detected

↓

2:34 PM

Stimulation started

↓

2:36 PM

Session completed

--------------------------------

At the bottom:

“Automatically recorded by AURA”

Use a subtle information icon.

Add a button:

“View Health Summary”

==================================================

12. HEART SCREEN

==================================================

Title:

“Heart Rate”

Top card:

Current

78 BPM

Status:

“Live”

Then:

“Today”

Large smooth heart-rate chart.

Use realistic sample data.

Below the chart, create three compact statistic cards:

Average

78 BPM

Minimum

64 BPM

Maximum

108 BPM

--------------------------------

EPISODE HEART RATE

--------------------------------

Section:

“During recorded episodes”

Show:

4 recorded episodes

Average during episodes:

94 BPM

Peak recorded:

118 BPM

Then a small list:

2:34 PM

Avg 96

Peak 108

10:18 AM

Avg 91

Peak 112

8:42 PM

Avg 94

Peak 105

Keep this visually clean.

IMPORTANT:

These are measurements, not diagnoses.

Do not label heart rate as “normal” or “abnormal” unless a medically validated reference is actually implemented.

==================================================

13. CLINICAL SUMMARY / REPORT

==================================================

Add a polished “Health Summary” accessible from Episode Details and Heart.

Title:

“Health Summary”

Subtitle:

“Recorded data overview”

Date range:

September 1 – September 23, 2026

Show:

Total recorded episodes

24

Average episodes per week

6

Average heart rate during recorded episodes

94 BPM

Peak recorded heart rate

118 BPM

Then a simple episode timeline/chart.

Section:

“Recorded Sessions”

Show chronological activity.

Add primary button:

“Generate Report”

When clicked, simulate generating a report.

Show loading state:

“Preparing your report…”

Then:

“Report ready”

Buttons:

“View Report”

“Share Report”

This can be a prototype interaction.

No real medical record integration is required.

The report must clearly be described as a summary of recorded device/app data, not a medical diagnosis.

==================================================

14. PROFILE / SETTINGS

==================================================

Title:

“Profile”

Do not display the user's personal name.

Use:

“Your AURA account”

Sections:

--------------------------------

DEVICE

--------------------------------

AURA Device

Connected

Battery 84%

Last synced:

2:36 PM

Button:

“Device Settings”

--------------------------------

PREFERENCES

--------------------------------

Language

English / العربية

Notifications

On

Sound

On

Haptic Feedback

On

--------------------------------

DATA

--------------------------------

Health Data

Episodes

24

Heart-rate records

Available

Clinical Summary

View / Generate

--------------------------------

PRIVACY

--------------------------------

Privacy & Data

“Your health data should be handled securely and shared only with people you choose.”

Do not claim specific security certifications or encryption standards unless actually implemented.

--------------------------------

ABOUT

--------------------------------

About AURA

Version 1.0 Prototype

==================================================

15. DEVICE SETTINGS

==================================================

Create a simple device settings screen.

Show a beautiful wearable illustration.

AURA

🟢 Connected

Battery:

84%

Connection:

Connected

Last synced:

2:36 PM

Options:

Device Name

AURA

Notifications

On

Haptic Feedback

On

Session Feedback

On

Button:

“Disconnect Device”

This is a prototype, so simulate the interaction.

==================================================

16. DATA MODEL / MOCK DATA

==================================================

Use realistic mock data so the application feels alive.

Create an internal mock dataset containing episodes.

Each episode should contain:

- id

- date

- startTime

- endTime

- duration

- startingHeartRate

- averageHeartRate

- peakHeartRate

- heartRateSeries

- device

- status

Example:

Episode:

id: 001

date: 2026-09-23

startTime: 14:34

endTime: 14:36

duration: 120 seconds

startingHeartRate: 82

averageHeartRate: 96

peakHeartRate: 108

heartRateSeries:

[

82,

86,

89,

94,

98,

104,

108,

106,

102,

98,

94,

90

]

Create several additional historical episodes so the charts and history screens look realistic.

Use dates around September 2026.

Do not use the user's actual personal data.

==================================================

17. FUNCTIONAL PROTOTYPE INTERACTIONS

==================================================

The prototype must feel interactive.

Implement:

1. Connect Device

→ status changes to Connected.

2. Start Session

→ opens Active Session screen.

3. Active Session

→ 2-minute countdown.

For demo purposes, make the countdown easy to experience without forcing the presenter to wait 2 full minutes.

You can implement a demo-mode acceleration while still displaying “02:00” as the designed session duration.

4. Heart rate

→ values update during active session.

5. Session Complete

→ automatically creates a new episode record.

6. View Episode

→ opens the newly created Episode Details.

7. Episodes

→ dynamically reflects the newly created session.

8. Heart

→ dynamically reflects the recorded data.

9. Generate Report

→ show loading state then report-ready state.

10. Language switch

→ switches the entire application between English and Arabic.

11. Arabic

→ fully RTL.

12. Navigation

→ all bottom navigation buttons work.

==================================================

18. MICRO-INTERACTIONS

==================================================

Add subtle premium animations:

- page transitions

- card fade/slide

- countdown progress animation

- heart-rate graph movement

- connected-device pulse

- button press feedback

- report generation animation

- success checkmark after session completion.

Animations must be subtle and professional.

Avoid flashy animations.

==================================================

19. MEDICAL UX LANGUAGE

==================================================

Use neutral, responsible language.

Prefer:

“Recorded episode”

“Heart-rate data”

“Session”

“Stimulation”

“Recorded measurements”

“Health summary”

Avoid unsupported claims such as:

“Cures anxiety”

“Stops panic attacks”

“Treats panic disorder”

“Clinically proven”

“Guaranteed relief”

“Prevents attacks”

The prototype represents a digital health tracking system connected to a wearable concept.

Do not present the app as a replacement for professional medical care.

==================================================

20. EMPTY / LOADING / ERROR STATES

==================================================

Design polished states for:

No episodes

No heart-rate data

Device disconnected

Device connecting

Report generating

Report ready

Session loading

Session completed

For disconnected device:

“AURA is disconnected”

“Connect your device to start a session and sync your health data.”

Button:

“Connect AURA”

==================================================

21. RESPONSIVE BEHAVIOR

==================================================

Although this is mobile-first, ensure the layout remains visually stable across common smartphone sizes.

Do not create a desktop dashboard.

The main experience should always feel like a native premium mobile application.

==================================================

22. IMPORTANT VISUAL DETAILS

==================================================

Use:

- white/off-white backgrounds

- rounded cards approximately 16–24px

- subtle shadows

- clean line icons

- large health metrics

- smooth charts

- teal accents

- navy typography

- lavender wellbeing accents.

Charts:

- smooth curves

- no excessive grid lines

- minimal axis labels

- clear data points when necessary.

Cards:

- do not put everything inside cards

- use whitespace to separate sections.

Buttons:

Primary buttons should use AURA Teal with white text.

Secondary buttons should be outlined or use a subtle tinted background.

==================================================

23. DEMO EXPERIENCE

==================================================

The most important hackathon demo flow is:

HOME

↓

AURA CONNECTED

↓

START SESSION

↓

ACTIVE STIMULATION

↓

LIVE HEART RATE

↓

SESSION COMPLETE

↓

EPISODE AUTOMATICALLY RECORDED

↓

EPISODE DETAILS

↓

HEART RATE GRAPH

↓

EPISODES HISTORY

↓

HEALTH SUMMARY / REPORT

Make this flow exceptionally smooth because it will be used in a live hackathon presentation.

==================================================

24. FINAL QUALITY REQUIREMENTS

==================================================

Before finishing, verify:

- No personal name is used anywhere.

- English works completely.

- Arabic works completely.

- Arabic uses RTL correctly.

- All navigation works.

- All buttons have meaningful interactions.

- The active session feels realistic.

- The 2-minute session is represented correctly.

- Heart-rate values update during the session.

- Completing a session creates an episode.

- The episode appears immediately in history.

- Episode details contain date, time, duration, average HR, peak HR, and a graph.

- Heart screen contains historical trends.

- Health Summary can be opened.

- Device connection state is visible.

- The interface is visually consistent.

- There are no placeholder-looking generic dashboards.

- No unsupported medical claims are presented.

- No unnecessary features are added.

PRIORITIZE POLISH AND VISUAL QUALITY OVER ADDING MORE FEATURES.

The final result should look like a real premium digital health product ready to be demonstrated at a biotechnology and digital health hackathon.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aura-mindful-pulse.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/de1b4686-9678-4a1b-9c67-07ebb355d6a5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
