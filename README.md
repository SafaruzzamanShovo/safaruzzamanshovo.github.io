# Your Portfolio Site

A clean, academic-style personal site for PhD applications — styled like a
living preprint (paper header, numbered publications, bracket-style links).
No build tools, no frameworks — just HTML/CSS/JS, so it works directly on
GitHub Pages.

```
portfolio/
├── index.html    ← page structure (you shouldn't need to touch this)
├── style.css     ← visual styling (optional to touch)
├── editor.html   ← ⭐ EASIEST WAY TO EDIT — a visual form, no code
├── content.js    ← all your text and links live here
├── script.js     ← builds the page from content.js (no need to touch)
├── assets/       ← put your cv.pdf and profile.jpg here
└── README.md
```

## 1. Edit your content

You have two ways to do this — pick whichever you prefer.

### Option A — the visual editor (no code)

Double-click **`editor.html`** to open it in your browser. It loads your
current `content.js`, shows a form for every section (profile, research
interests, education, publications, experience, projects, blog, news,
contact), and lets you add, remove, and reorder list items with buttons.

When you're done, click **Download content.js** in the sidebar. That
downloads an updated `content.js` — drop it into this folder (replacing
the old one), or paste its contents into `content.js` on GitHub, and
commit. The sidebar also shows a small dot next to each section so you
can see at a glance which ones still need content.

The editor never saves automatically — nothing changes on your live site
until you download the file and commit it.

### Option B — edit the text file directly

Open **`content.js`** in any text editor (or directly on GitHub — see
below). Every field is commented. Replace the placeholder text between the
quotes with your own.

A few things worth knowing:

- If you don't have publications yet, that's completely normal at the
  application stage — just leave `publications: []` empty and that whole
  section disappears from the site automatically. The same works for
  `news: []` or any other list.
- To hide a single link (e.g. no Google Scholar page yet), set its `url`
  to `""` and it won't be shown.
- Nothing elsewhere in the site needs to change — `script.js` reads
  whatever is in `content.js` and builds the page automatically.
- Keep **Research Interests** short: a title plus one sentence, not a
  paragraph. It reads as a scannable list, not a set of mini-essays.

## 2. Add your CV and photo

Put your CV into the `assets/` folder and name it `cv.pdf` — the "CV" link
in the header already points to `assets/cv.pdf`.

For your photo, add a file at `assets/profile.jpg` (any photo works, it's
cropped to a square automatically) — `content.js` already points to it.
Until that file exists, the site automatically shows a clean monogram in
its place instead, so nothing ever looks broken either way.

A few other things worth knowing about `content.js`:

- `profile.status` — the small pill under your name (e.g. "Open to PhD
  offers · Fall 2027"). Set it to `""` to hide it.
- Each item in `profile.links` can take an `icon`: `"mail"`, `"file"`,
  `"cap"`, `"code"`, `"link"`, or `""` for no icon.
- `skills` — your technical skills, grouped into categories (Languages,
  ML & Robotics, Systems & Tools, or whatever fits your field). Leave
  `skills: []` to remove the section entirely.

## 3. Preview it locally (optional)

You can just double-click `index.html` to open it in a browser. To preview
it exactly as it will look when served (recommended before publishing),
run from inside the `portfolio` folder:

```bash
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## 4. Publish it on GitHub Pages

1. Create a new **public** repository on GitHub — for a site at
   `https://your-username.github.io`, name the repo exactly
   `your-username.github.io`. (Any other name works too, but the site
   will live at `https://your-username.github.io/repo-name/` instead.)
2. Upload these files to the repository. Easiest way if you're not
   comfortable with git commands: on the repo page, click
   **Add file → Upload files**, drag in everything from this folder
   (keeping the `assets` folder), and commit.
   Or, with git installed:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/your-username/your-username.github.io.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a
   branch**, set branch to **main** and folder to **/ (root)**, then
   **Save**.
5. Wait 1-2 minutes, then visit the URL GitHub shows you. Future edits:
   change `content.js` (either locally + `git push`, or directly in the
   GitHub web editor), and the live site updates automatically within a
   minute or two of each commit.

## 5. Optional: custom domain

If you own a domain, add a file named `CNAME` (no extension) to the repo
root containing just your domain, e.g. `yourname.com`, then follow
GitHub's DNS instructions under **Settings → Pages**.

## Editing content directly on GitHub (no local setup needed)

You don't need to install anything. In the repository, click on
`content.js`, click the pencil (✎) icon to edit, make your changes, and
commit directly to `main`. The live site rebuilds automatically.

## Tips for the content itself

- Keep the **abstract** (bio) concrete: your specific research area,
  one example of work you've done, and what you want to work on in a
  PhD. Admissions readers and potential advisors skim — specificity is
  what makes a site memorable over a generic "I am passionate about AI."
- The **News** section is a small but effective touch — programs and
  faculty who revisit your site later will see it's active and current.
- List **research interests** narrowly enough that a faculty member can
  tell if your interests overlap with theirs — "Machine Learning" alone
  is less useful than "sample-efficient reinforcement learning for
  robotics."
