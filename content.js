/* =========================================================================
   YOUR CONTENT — EDIT THIS FILE ONLY
   =========================================================================
   Two ways to edit:

   1. EASY — open editor.html in your browser. Fill in the form, click
      "Download content.js", and replace this file with the one you get.
      No code required.

   2. MANUAL — edit the values below directly. Keep the quotes "like this"
      around text, and a comma after each item except the last one in a
      list. To hide a whole section, leave its list empty: e.g. news: []
      — works for researchInterests, projects, blog, news, publications,
      or any other list below.

   This file currently has DEMO DATA (a fictional applicant, "Maya Chen")
   so you can see the site fully populated. Replace it with your own.
   ========================================================================= */

window.SITE_CONTENT = {

  // Browser tab title / search engines.
  meta: {
    siteTitle: "Maya Chen — PhD Applicant",
  },

  // ---------------------------------------------------------------------
  // HERO — the top "paper header" block
  // ---------------------------------------------------------------------
  profile: {
    name: "Maya Chen",
    eyebrow: "PhD Applicant · Computer Science",
    affiliation: "B.S. in Computer Science, University of Washington · Applying for Fall 2027",

    status: "Open to PhD offers · Fall 2027 admission", // small badge; "" hides it

    // Put your photo in assets/ and point to it here. Leave "" (or leave
    // the file missing) and the site shows a clean monogram instead.
    photo: "assets/profile.jpg",

    abstract: "I'm a final-year undergraduate researcher working on reinforcement learning for robotic manipulation, with a focus on sample efficiency and sim-to-real transfer. My recent work explores learned dynamics models that let a robot arm acquire new manipulation skills from a few dozen real-world trials instead of thousands. I'm applying to PhD programs in Fall 2027 to pursue research on generalizable robot learning, ideally advised by faculty working at the intersection of reinforcement learning, control, and real-world robotics.",

    keywords: [
      "Reinforcement Learning",
      "Robotic Manipulation",
      "Sim-to-Real Transfer",
      "Human-Robot Interaction"
    ],

    // icon options: "mail", "file", "cap", "code", "link", or "" for none
    links: [
      { label: "Email", url: "mailto:maya.chen@uw.edu", icon: "mail" },
      { label: "CV", url: "assets/cv.pdf", icon: "file" },
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=demo", icon: "cap" },
      { label: "GitHub", url: "https://github.com/mayachen", icon: "code" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mayachen", icon: "link" }
    ]
  },

  // ---------------------------------------------------------------------
  // RESEARCH INTERESTS — one short sentence each, not a paragraph.
  // ---------------------------------------------------------------------
  researchInterests: [
    { title: "Sample-Efficient Reinforcement Learning", description: "Learning useful policies from limited real-world interaction." },
    { title: "Sim-to-Real Transfer", description: "Closing the gap between simulated training and physical deployment." },
    { title: "Robotic Manipulation", description: "Dexterous policies that generalize across object shapes and grasps." },
    { title: "Human-Robot Interaction", description: "Robots that learn from human demonstrations and corrections." }
  ],

  // ---------------------------------------------------------------------
  // TECHNICAL SKILLS — grouped into categories. skills: [] hides section.
  // ---------------------------------------------------------------------
  skills: [
    { category: "Languages", items: ["Python", "C++", "MATLAB", "JavaScript"] },
    { category: "ML & Robotics", items: ["PyTorch", "JAX", "MuJoCo", "ROS", "OpenCV"] },
    { category: "Systems & Tools", items: ["Git", "Docker", "Linux", "AWS", "Slurm"] }
  ],

  // ---------------------------------------------------------------------
  // EDUCATION — most recent first
  // ---------------------------------------------------------------------
  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "University of Washington",
      period: "2022 – 2026 (expected)",
      details: "GPA: 3.92/4.0 · Honors thesis on sample-efficient RL for manipulation, advised by Prof. David Torres"
    },
    {
      degree: "High School Diploma",
      institution: "Lakeside School, Seattle",
      period: "2018 – 2022",
      details: ""
    }
  ],

  // ---------------------------------------------------------------------
  // PUBLICATIONS & PREPRINTS — most recent first
  // ---------------------------------------------------------------------
  publications: [
    {
      title: "Sample-Efficient Reinforcement Learning for Dexterous Manipulation via Learned Dynamics Models",
      authors: "Maya Chen, David Torres",
      venue: "arXiv preprint",
      year: "2026",
      status: "Preprint",
      tags: [
        { label: "PDF", url: "#" },
        { label: "Code", url: "#" },
        { label: "arXiv", url: "#" }
      ]
    },
    {
      title: "Evaluating Sim-to-Real Transfer for Quadrupedal Locomotion Policies",
      authors: "Maya Chen, Priya Nair, David Torres",
      venue: "UW Undergraduate Research Symposium",
      year: "2025",
      status: "Published",
      tags: [
        { label: "PDF", url: "#" }
      ]
    }
  ],

  // ---------------------------------------------------------------------
  // RESEARCH EXPERIENCE — most recent first. [] hides this section.
  // ---------------------------------------------------------------------
  researchExperience: [
    {
      role: "Undergraduate Researcher, UW Robotics Lab",
      org: "Advised by Prof. David Torres",
      period: "Jun 2025 – Present",
      description: "Designing a model-based RL pipeline that learns object-relative dynamics models, cutting the real-world trials needed to learn a new grasp-and-place skill by roughly 6x compared to a model-free baseline.",
      tags: ["Python", "PyTorch", "MuJoCo", "ROS"],
      link: { label: "View Code", url: "https://github.com/mayachen/dexterous-rl" }
    },
    {
      role: "Research Assistant, UW Robotics Lab",
      org: "Advised by Prof. David Torres & Priya Nair",
      period: "Sep 2024 – Jun 2025",
      description: "Evaluated sim-to-real transfer techniques for quadrupedal locomotion, running domain-randomization sweeps across five gap configurations and building the analysis pipeline used in the resulting symposium paper.",
      tags: ["Python", "MuJoCo", "Domain Randomization"],
      link: null
    }
  ],

  // ---------------------------------------------------------------------
  // PROJECTS — most recent first. projects: [] hides this section.
  // ---------------------------------------------------------------------
  projects: [
    {
      title: "Autonomous Drone Navigation — CS Capstone",
      period: "Sep 2024 – Jun 2025",
      description: "Built a vision-based obstacle avoidance system for a quadrotor using a lightweight depth-estimation network, deployed and tested on real hardware in an indoor flight arena.",
      tags: ["C++", "OpenCV", "PX4"],
      link: { label: "Project Writeup", url: "https://github.com/mayachen/drone-nav" }
    },
    {
      title: "Grasp Dataset Visualizer",
      period: "Spring 2024",
      description: "An open-source tool for browsing large robotic grasp datasets, with side-by-side point-cloud and RGB views, built for a research methods elective.",
      tags: ["Python", "Open3D", "Plotly"],
      link: { label: "View Code", url: "https://github.com/mayachen/grasp-viz" }
    }
  ],

  // ---------------------------------------------------------------------
  // BLOG — most recent first. url is optional (leave "" if unpublished).
  // blog: [] hides this section.
  // ---------------------------------------------------------------------
  blog: [
    {
      date: "Jun 2026",
      title: "What I Wish I Knew Before Writing PhD Statements of Purpose",
      excerpt: "Notes on turning eighteen months of lab work into a two-page statement — what admissions committees actually seem to be reading for.",
      url: "#"
    },
    {
      date: "Mar 2026",
      title: "Debugging Sim-to-Real Gaps, One Assumption at a Time",
      excerpt: "A walkthrough of the domain-randomization sweep that finally closed the gap between our MuJoCo policies and the real quadrotor.",
      url: "#"
    },
    {
      date: "Nov 2025",
      title: "Reading Group Notes: Model-Based RL for Manipulation",
      excerpt: "A short summary of three papers our lab read this fall, and where I think the open problems still are.",
      url: "#"
    }
  ],

  // ---------------------------------------------------------------------
  // NEWS — short, dated updates. Most recent first.
  // ---------------------------------------------------------------------
  news: [
    { date: "Jul 2026", text: "Submitted PhD applications for Fall 2027 admission." },
    { date: "May 2026", text: "Presented a poster on sim-to-real transfer at the UW Undergraduate Research Symposium." },
    { date: "Jan 2026", text: "Started as an undergraduate researcher in the UW Robotics Lab." }
  ],

  // ---------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------
  contact: {
    email: "maya.chen@uw.edu",
    note: "I'm currently applying to PhD programs for Fall 2027 in robot learning and reinforcement learning. If our research interests overlap, I'd love to hear from you."
  },

  footerText: "© {year} Maya Chen. Built with GitHub Pages."
};
