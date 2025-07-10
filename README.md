# 🖥️ Ryan Tibbetts' Portfolio

Welcome to the not-so-standard portfolio site of [Ryan Tibbetts](https://ryanetibbetts.com) — a creative frontend engineer, climber, nomad, and unapologetic nerd. This site is built with **Next.js**, **React**, and **Tailwind CSS v4**, with a few animations, tricks, and secrets packed in for those curious enough to poke around.

## 🧠 What's Inside

This is not just a resume. It’s a playground. A portfolio. A subtle maze. A vibe.

### ⚙️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS v4
* **Animation:** Framer Motion
* **Charts & Graphs:** Chart.js, ECharts (when applicable)
* **3D Rendering:** Three.js (OnScale Demo)
* **Icons:** Lucide
* **Deployment:** Vercel

---

## 🚀 Pages & Features

### 🔥 Home

* Background video that **fades between clips** with transitions.
* Responsive **hero typewriter effect** with a **gradient hover CTA**.
* **Terminal intro modal** with:

  * Typing animation
  * Command history (`↑`, `↓`)
  * Fake commands (`npm start`, `git log`, etc.)
  * **ASCII splash art**
  * Boot sequence, aliases (`~`, `..`), blinking caret
  * Type `exit` to close
* **Background effects**

### 📁 Projects

* Clickable company logos open **modal demos**.
* Each modal:

  * Company bio
  * Resume excerpt
  * **Live React demo** or visual (mock UI, hardware animation, data graph, etc.)
* Examples:

  * **Delta:** Mock flight booking
  * **Equifax:** Fake document upload with missing-field inference
  * **Google X:** Animated hardware control panel
  * **OnScale:** 3D engineering CAD viewer (microchip model)
  * **Turner:** Dynamic S3 video clipping UI

### 🧑‍🎨 About

* Playful intro and **GitHub link** to source code
* Personal story (military brat → Element nomad → SF dev)
* Competitive climbing, courier years, cats, and caffeine
* Includes hidden visual **easter eggs**:

  * “Four cats” does something.
  * "San Francisco" animates or reveals an image.
  * Starlink performance metrics appear on hover.
  * Terminal-style text & animations
  * And more… 👀

### 📬 Contact

* Simple contact form
* Interactive **canvas background**

---

## 🕹️ Easter Eggs & Hidden Details

| Trigger or Location   | What Happens                                                    |
| --------------------- | --------------------------------------------------------------- |
| Terminal modal        | Fake command outputs, blinking caret, command history, boot art |
| Typing `exit`         | Closes terminal                                                 |
| Typing `clear`        | Clears terminal output                                          |
| Four cats             | Mystery effect (try clicking it)                                |
| Starlink (hover)      | Animated performance chart                                      |
| San Francisco (hover) | Hidden visual reveal                                            |
| Canvas Background     | Ink-like bloom effects (in progress)                            |
| Chevron nav buttons   | Navigate project modals manually                                |
| GitHub repo link      | Open source invitation + hints about how site was built         |

---

## 🛠️ Development

```bash
pnpm install
pnpm dev
```

All demo content is **lazy-loaded**, meaning nothing loads until a modal is opened. Great for performance, mysterious for nosy devtools peepers.

---

## 📜 License

MIT — use, fork, remix, and have fun. Just don’t remove the four cats.
