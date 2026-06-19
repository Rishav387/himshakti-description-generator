# Figma Wireframe Guide — Week 3

This is your build guide for the 6 lo-fi wireframes. Follow these specs exactly in Figma — grey boxes, placeholder text, **no colour**.

---

## Setup in Figma

1. Go to figma.com → Sign in (free account)
2. Click **New design file**
3. Rename it: `HimShakti AI D2C Platform — Wireframes`
4. For each screen below, create a new **Frame** (press `F`, choose **Desktop — 1440×1024** for most, **Mobile — 375×812** is optional extra)
5. Use the **Rectangle tool (R)** for boxes — fill grey (#D9D9D9 / #E0E0E0), no border
6. Use the **Text tool (T)** for placeholder labels — grey text (#888888), generic words like "Heading", "Image", "Button"
7. Name each frame clearly: `01-Home`, `02-Dashboard`, `03-ProductDetail`, `04-Login`, `05-AIFeature`

---

## Screen 1 — Home

```
┌─────────────────────────────────────────┐
│ [Logo]      Nav Nav Nav Nav    [Button]  │  ← Navbar bar, full width, ~64px tall
├─────────────────────────────────────────┤
│                                           │
│         [Heading - large box]            │
│         [Subheading - line]              │  ← Hero section
│         [Button box]                     │
│                                           │
├─────────────────────────────────────────┤
│  [Card]    [Card]    [Card]              │  ← 3-column grid
│  [Card]    [Card]    [Card]              │     (boxes with image placeholder
│                                           │      + 3 text lines + button)
├─────────────────────────────────────────┤
│         [CTA banner box]                 │
├─────────────────────────────────────────┤
│ [Footer columns x3]                      │
└─────────────────────────────────────────┘
```
Each product card = one grey rectangle (image area) + 3 grey lines (title/price/desc) + small grey button rectangle.

---

## Screen 2 — Dashboard

```
┌─────────────────────────────────────────┐
│ [Logo]      Nav Nav Nav Nav    [Button]  │
├─────────────────────────────────────────┤
│  [Page Title box]                        │
│  [Subtitle line]                         │
│                                           │
│  [Status banner — full width strip]      │
│                                           │
│  [Tool Card]      [Tool Card]            │  ← 2-column grid
│  [Tool Card]      [Tool Card]            │     (icon box + title + desc + tag)
│                                           │
├─────────────────────────────────────────┤
│ [Footer columns x3]                      │
└─────────────────────────────────────────┘
```

---

## Screen 3 — Detail / List View (Product Detail)

```
┌─────────────────────────────────────────┐
│ [Logo]      Nav Nav Nav Nav    [Button]  │
├─────────────────────────────────────────┤
│  [Large image box]  │  [Product Title]   │
│                      │  [Price box]       │
│                      │  [Description -    │
│                      │   3 lines]          │
│                      │  [Ingredients line] │
│                      │  [Order Button]     │
├─────────────────────────────────────────┤
│  Related Products                        │
│  [Card] [Card] [Card]                    │
├─────────────────────────────────────────┤
│ [Footer columns x3]                      │
└─────────────────────────────────────────┘
```

---

## Screen 4 — Login / Signup

```
┌─────────────────────────────────────────┐
│ [Logo]      Nav Nav Nav Nav    [Button]  │
├─────────────────────────────────────────┤
│                                           │
│         ┌───────────────────┐            │
│         │   [Icon circle]    │            │
│         │   [Title text]     │            │
│         │   [Subtitle line]  │            │
│         │                    │            │
│         │   [Input box]      │            │  ← Centered card,
│         │   [Input box]      │            │     ~400px wide
│         │   [Button box]     │            │
│         └───────────────────┘             │
│                                           │
├─────────────────────────────────────────┤
│ [Footer columns x3]                      │
└─────────────────────────────────────────┘
```

---

## Screen 5 — AI Feature Screen (Product Description Generator)

```
┌─────────────────────────────────────────┐
│ [Logo]      Nav Nav Nav Nav    [Button]  │
├─────────────────────────────────────────┤
│  [Page Title: AI Description Generator]  │
│                                           │
│  ┌───────────────┐  ┌─────────────────┐ │
│  │ [Input box]    │  │ [Output label]   │ │
│  │ [Input box]    │  │                  │ │
│  │ [Input box]    │  │ [Generated text  │ │
│  │ [Textarea box] │  │  box - large]     │ │
│  │                │  │                  │ │
│  │ [Tone: O O O]  │  │ [Copy] [Regen]   │ │
│  │ [Generate btn] │  │                  │ │
│  └───────────────┘  └─────────────────┘ │
│       Form side            Output side   │
├─────────────────────────────────────────┤
│ [Footer columns x3]                      │
└─────────────────────────────────────────┘
```

---

## Screen 6 — UI Component Showcase (bonus / optional 6th screen)

```
┌─────────────────────────────────────────┐
│ [Logo]      Nav Nav Nav Nav    [Button]  │
├─────────────────────────────────────────┤
│  [Section: Buttons]                      │
│  [btn] [btn] [btn] [btn]                 │
│                                           │
│  [Section: Inputs]                       │
│  [Input box] [Input box]                 │
│                                           │
│  [Section: Modal/Toast/Loader]            │
│  [Trigger button] [Trigger button]       │
├─────────────────────────────────────────┤
│ [Footer columns x3]                      │
└─────────────────────────────────────────┘
```

---

## Exporting to PDF

1. Select all 5-6 frames (click each while holding Shift, or select all with `Ctrl+A` on the canvas)
2. Go to **File → Export frames to PDF** (or right-click → Export selection)
3. Choose PDF format
4. Save as: `W3_Wireframes_[InternID].pdf`

## Sharing the Figma Link

1. Click **Share** (top right)
2. Set permission to **Anyone with the link → can view**
3. Copy the link and paste it into the Moodle submission text field
