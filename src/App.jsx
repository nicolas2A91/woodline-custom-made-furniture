import { useState, useEffect, useRef } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rgxvdkwqsfpwheibxsrw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneHZka3dxc2Zwd2hlaWJ4c3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjAxMTEsImV4cCI6MjA5MDYzNjExMX0.o24mD2RisFm9cjyNXNTslBWZkAZFP31BvX5dabNfrAg'
);

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const PHOTOS = [
  { id: 1,  src: "/photos/villa-exterior.jpeg",     category: "Architecture", alt: "Woodline custom villa exterior, Zouk Mosbeh Lebanon" },
  { id: 2,  src: "/photos/front-door.jpeg",          category: "Architecture", alt: "Woodline handcrafted solid wood front door" },
  { id: 3,  src: "/photos/wood-beams.jpeg",          category: "Architecture", alt: "Exposed custom wood beams ceiling by Woodline" },
  { id: 4,  src: "/photos/open-space.jpeg",          category: "Architecture", alt: "Bespoke open-plan architectural joinery by Woodline" },
  { id: 5,  src: "/photos/entrance-hall.jpeg",       category: "Interior",     alt: "Custom entrance hall joinery by Woodline Lebanon" },
  { id: 6,  src: "/photos/hidden-door.jpeg",         category: "Interior",     alt: "Bespoke hidden door in custom wall panelling" },
  { id: 7,  src: "/photos/living-room.jpeg",         category: "Interior",     alt: "Luxury custom living room by Woodline Lebanon" },
  { id: 8,  src: "/photos/living-room2.jpeg",        category: "Interior",     alt: "Bespoke living room furniture by Woodline" },
  { id: 9,  src: "/photos/dining-room.jpeg",         category: "Interior",     alt: "Custom dining room joinery by Woodline Lebanon" },
  { id: 10, src: "/photos/dining-room2.jpeg",        category: "Interior",     alt: "Handcrafted bespoke dining room by Woodline" },
  { id: 11, src: "/photos/wall-panel-marble.jpeg",   category: "Interior",     alt: "Custom wood and marble wall panel by Woodline" },
  { id: 12, src: "/photos/loft-space.jpeg",          category: "Interior",     alt: "Bespoke loft with custom wood staircase by Woodline" },
  { id: 13, src: "/photos/loft-space2.jpeg",         category: "Interior",     alt: "Custom loft interior with handcrafted elements" },
  { id: 14, src: "/photos/window-bench.jpeg",        category: "Interior",     alt: "Bespoke built-in window bench by Woodline" },
  { id: 15, src: "/photos/elevator.jpeg",            category: "Interior",     alt: "Custom wood-panelled private elevator by Woodline" },
  { id: 16, src: "/photos/round-table.jpeg",         category: "Furniture",    alt: "Handcrafted round solid wood dining table" },
  { id: 17, src: "/photos/black-wardrobe.jpeg",      category: "Furniture",    alt: "Custom black lacquered wardrobe by Woodline" },
  { id: 18, src: "/photos/black-unit-open.jpeg",     category: "Furniture",    alt: "Bespoke open storage unit by Woodline Lebanon" },
  { id: 19, src: "/photos/kitchen.jpeg",             category: "Kitchen",      alt: "Custom kitchen with bespoke cabinetry by Woodline" },
  { id: 20, src: "/photos/kitchen2.jpeg",            category: "Kitchen",      alt: "Luxury bespoke kitchen joinery by Woodline" },
  { id: 21, src: "/photos/kitchen-island.jpeg",      category: "Kitchen",      alt: "Handcrafted custom kitchen island by Woodline" },
  { id: 22, src: "/photos/wine-cellar-outside.jpeg", category: "Wine Cellar",  alt: "Bespoke wine cellar exterior by Woodline Lebanon" },
  { id: 23, src: "/photos/wine-cellar-inside.jpeg",  category: "Wine Cellar",  alt: "Custom wine cellar interior by Woodline Lebanon" },
  { id: 24, src: "/photos/wine-cellar-angle.jpeg",   category: "Wine Cellar",  alt: "Luxury bespoke wine cellar by Woodline Lebanon" },
  { id: 25, src: "/photos/bathroom.jpeg",            category: "Bathroom",     alt: "Custom bathroom vanity by Woodline Lebanon" },
];

const CATEGORIES = [
  { key: "Architecture", cover: "/photos/villa-exterior.jpeg",     count: 4  },
  { key: "Interior",     cover: "/photos/living-room.jpeg",        count: 11 },
  { key: "Furniture",    cover: "/photos/round-table.jpeg",        count: 3  },
  { key: "Kitchen",      cover: "/photos/kitchen.jpeg",            count: 3  },
  { key: "Wine Cellar",  cover: "/photos/wine-cellar-inside.jpeg", count: 3  },
  { key: "Bathroom",     cover: "/photos/bathroom.jpeg",           count: 1  },
];

const HERO_SLIDES = [1, 7, 19, 22, 12, 16].map(id => PHOTOS.find(p => p.id === id));

/* ─── TRANSLATIONS ──────────────────────────────────────────────────────────── */
const T = {
  en: {
    dir: "ltr",
    nav: { home: "Home", realisations: "Realisations", about: "About", contact: "Contact" },
    cta: "Get a Quote",
    hero: { eyebrow: "Custom Made Furniture · Lebanon", title: "Bespoke joinery,\ncrafted for life.", sub: "Three decades of mastery transforming spaces across Lebanon." },
    cats: { Architecture: "Architecture", Interior: "Interior", Furniture: "Furniture", Kitchen: "Kitchen", "Wine Cellar": "Wine Cellar", Bathroom: "Bathroom" },
    catPage: { back: "All Realisations", photos: "photos" },
    about: {
      eyebrow: "Our Story",
      title: "Born from a passion for wood",
      p1: "Woodline was founded on a single belief: that a well-crafted space changes how you live. Based in Zouk Mosbeh, Lebanon, we have spent over 30 years transforming residential and commercial interiors with bespoke joinery that balances artistry with function.",
      p2: "Every project begins with listening. We take time to understand your vision, your space, and your daily rhythms — then we design, build, and install furniture that feels like it was always meant to be there.",
      stats: [["500+", "Projects completed"], ["100%", "Custom-made"], ["30+", "Years in Lebanon"]],
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Your project, our passion",
      intro: "Tell us about your project and we'll get back to you within 24 hours.",
      fields: [{ key: "name", label: "Your Name" }, { key: "email", label: "Email Address" }, { key: "phone", label: "Phone (optional)" }, { key: "message", label: "Describe Your Project" }],
      send: "Send My Request", sending: "Sending…",
      success: "Message sent. We'll reply within 24 hours.",
      error: "Something went wrong. Please try again or call us directly.",
      phone: "Phone", email: "Email", location: "Location",
    },
    footer: { tag: "Custom Made Furniture · 30 Years of Expertise · Zouk Mosbeh, Lebanon", copy: `© ${new Date().getFullYear()} Woodline. All rights reserved.` },
    realisations: { eyebrow: "Portfolio", title: "Our Realisations", sub: "A selection of bespoke joinery and custom furniture across Lebanon." },
  },
  fr: {
    dir: "ltr",
    nav: { home: "Accueil", realisations: "Réalisations", about: "À Propos", contact: "Contact" },
    cta: "Devis Gratuit",
    hero: { eyebrow: "Mobilier sur Mesure · Liban", title: "Menuiserie d'exception,\ncréée pour durer.", sub: "Trois décennies de maîtrise transformant les espaces au Liban." },
    cats: { Architecture: "Architecture", Interior: "Intérieur", Furniture: "Mobilier", Kitchen: "Cuisine", "Wine Cellar": "Cave à Vin", Bathroom: "Salle de Bain" },
    catPage: { back: "Toutes les Réalisations", photos: "photos" },
    about: {
      eyebrow: "Notre Histoire",
      title: "Né d'une passion du bois",
      p1: "Woodline est né d'une conviction : un espace bien conçu change la façon dont on vit. Basés à Zouk Mosbeh, au Liban, nous transformons depuis plus de 30 ans des intérieurs résidentiels et commerciaux avec une menuiserie sur mesure alliant art et fonction.",
      p2: "Chaque projet commence par une écoute attentive. Nous prenons le temps de comprendre votre vision, votre espace et vos habitudes — puis nous concevons, fabriquons et installons des meubles qui semblent avoir toujours été là.",
      stats: [["500+", "Projets réalisés"], ["100%", "Sur mesure"], ["30+", "Ans au Liban"]],
    },
    contact: {
      eyebrow: "Contactez-nous",
      title: "Votre projet, notre passion",
      intro: "Décrivez-nous votre projet et nous vous répondrons sous 24h.",
      fields: [{ key: "name", label: "Votre Nom" }, { key: "email", label: "Email" }, { key: "phone", label: "Téléphone (optionnel)" }, { key: "message", label: "Décrivez votre projet" }],
      send: "Envoyer ma demande", sending: "Envoi…",
      success: "Message envoyé. Nous vous répondrons sous 24h.",
      error: "Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.",
      phone: "Téléphone", email: "Email", location: "Adresse",
    },
    footer: { tag: "Mobilier sur Mesure · 30 Ans d'Expertise · Zouk Mosbeh, Liban", copy: `© ${new Date().getFullYear()} Woodline. Tous droits réservés.` },
    realisations: { eyebrow: "Portfolio", title: "Nos Réalisations", sub: "Une sélection de menuiseries et meubles sur mesure au Liban." },
  },
  ar: {
    dir: "rtl",
    nav: { home: "الرئيسية", realisations: "أعمالنا", about: "من نحن", contact: "اتصل بنا" },
    cta: "طلب عرض سعر",
    hero: { eyebrow: "أثاث مخصص · لبنان", title: "نجارة فريدة،\nمصنوعة للأبد.", sub: "ثلاثة عقود من الإتقان تحوّل المساحات في لبنان." },
    cats: { Architecture: "معمار", Interior: "ديكور داخلي", Furniture: "أثاث", Kitchen: "مطبخ", "Wine Cellar": "قبو النبيذ", Bathroom: "حمام" },
    catPage: { back: "جميع الأعمال", photos: "صور" },
    about: {
      eyebrow: "قصتنا",
      title: "وُلدنا من شغف بالخشب",
      p1: "تأسست وودلاين على قناعة واحدة: أن المساحة المصممة جيداً تغيّر أسلوب الحياة. انطلاقاً من سوق مصبح في لبنان، نحوّل منذ أكثر من ٣٠ عاماً الديكورات الداخلية السكنية والتجارية بنجارة مخصصة تجمع بين الفن والوظيفة.",
      p2: "كل مشروع يبدأ بالاستماع. نأخذ وقتنا لفهم رؤيتك ومساحتك وعاداتك اليومية — ثم نصمم ونصنع ونركّب أثاثاً يبدو وكأنه كان دائماً في مكانه.",
      stats: [["٥٠٠+", "مشروع منجز"], ["١٠٠٪", "مخصص بالكامل"], ["٣٠+", "عاماً في لبنان"]],
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "مشروعك، شغفنا",
      intro: "أخبرنا عن مشروعك وسنرد عليك خلال ٢٤ ساعة.",
      fields: [{ key: "name", label: "اسمك" }, { key: "email", label: "البريد الإلكتروني" }, { key: "phone", label: "الهاتف (اختياري)" }, { key: "message", label: "صف مشروعك" }],
      send: "إرسال طلبي", sending: "جارٍ الإرسال…",
      success: "تم إرسال رسالتك. سنرد خلال ٢٤ ساعة.",
      error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
      phone: "هاتف", email: "بريد", location: "موقع",
    },
    footer: { tag: "أثاث مخصص · ٣٠ عاماً من الخبرة · سوق مصبح، لبنان", copy: `© ${new Date().getFullYear()} Woodline. جميع الحقوق محفوظة.` },
    realisations: { eyebrow: "معرض الأعمال", title: "إنجازاتنا", sub: "مجموعة مختارة من أعمال النجارة والأثاث المخصص في لبنان." },
  },
};

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Cormorant:ital,wght@0,300;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

  :root {
    --cream: #F5F0E8;
    --cream-dark: #EDE7D8;
    --dark: #1E160E;
    --brown: #3C2D1E;
    --wood: #9B6B45;
    --wood-light: #C8A97A;
    --text-muted: rgba(60,45,30,0.45);
    --border: rgba(60,45,30,0.1);
  }

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { font-size: 16px; scroll-behavior: smooth; }
  body { background: var(--cream); color: var(--brown); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ── PAGE TRANSITIONS ── */
  .page-enter { animation: pageIn 0.65s cubic-bezier(0.16,1,0.3,1) both; }
  @keyframes pageIn {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: none; }
  }

  /* ── NAVIGATION ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    transition: background 0.5s, box-shadow 0.5s, height 0.4s;
  }
  .nav.scrolled {
    background: rgba(245,240,232,0.97);
    backdrop-filter: blur(16px);
    box-shadow: 0 1px 0 var(--border);
  }
  .nav-inner {
    max-width: 1440px; margin: 0 auto;
    padding: 0 4rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 88px; transition: height 0.4s;
  }
  .nav.scrolled .nav-inner { height: 68px; }

  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 400; font-style: italic;
    letter-spacing: 0.04em; background: none; border: none;
    color: #F5F0E8; transition: color 0.4s; cursor: pointer;
  }
  .nav.scrolled .nav-logo { color: var(--brown); }

  .nav-links { display: flex; align-items: center; gap: 3.5rem; }
  .nav-link {
    font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 400;
    letter-spacing: 3px; text-transform: uppercase;
    background: none; border: none; cursor: pointer;
    color: rgba(245,240,232,0.65); transition: color 0.3s;
    position: relative; padding-bottom: 3px;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: var(--wood-light);
    transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease;
  }
  .nav-link:hover { color: rgba(245,240,232,0.95); }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
  .nav-link.active { color: rgba(245,240,232,0.95); }
  .nav.scrolled .nav-link { color: var(--text-muted); }
  .nav.scrolled .nav-link:hover, .nav.scrolled .nav-link.active { color: var(--brown); }
  .nav.scrolled .nav-link::after { background: var(--wood); }

  .nav-cta {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; font-weight: 500;
    border: 1px solid rgba(245,240,232,0.35); background: none;
    color: rgba(245,240,232,0.8); padding: 11px 26px;
    cursor: pointer; transition: all 0.3s;
  }
  .nav-cta:hover { background: rgba(245,240,232,0.1); border-color: rgba(245,240,232,0.65); color: #F5F0E8; }
  .nav.scrolled .nav-cta { border-color: rgba(60,45,30,0.25); color: var(--brown); }
  .nav.scrolled .nav-cta:hover { background: var(--brown); color: var(--cream); border-color: var(--brown); }

  /* Lang toggle */
  .lang-btn {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 2px;
    text-transform: uppercase; background: none; border: none;
    cursor: pointer; transition: color 0.3s; padding: 4px 0;
    color: rgba(245,240,232,0.35);
  }
  .nav.scrolled .lang-btn { color: var(--text-muted); }
  .lang-btn.active { color: rgba(245,240,232,0.85); }
  .nav.scrolled .lang-btn.active { color: var(--brown); }
  .lang-btn:hover { color: rgba(245,240,232,0.85); }
  .nav.scrolled .lang-btn:hover { color: var(--brown); }

  /* Mobile burger */
  .burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 6px; cursor: pointer; }
  .bl { width: 22px; height: 1px; transition: all 0.35s; transform-origin: center; }
  .bl-light { background: rgba(245,240,232,0.8); }
  .bl-dark { background: var(--brown); }
  .burger.open .bl:nth-child(1) { transform: translateY(6px) rotate(45deg); }
  .burger.open .bl:nth-child(2) { opacity: 0; }
  .burger.open .bl:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

  /* Mobile overlay */
  .mob-menu {
    position: fixed; inset: 0; background: var(--dark); z-index: 190;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
    opacity: 0; pointer-events: none; transition: opacity 0.45s;
  }
  .mob-menu.open { opacity: 1; pointer-events: all; }
  .mob-link {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(2.2rem,6vw,3.5rem);
    font-style: italic; font-weight: 300; color: rgba(245,240,232,0.75);
    background: none; border: none; cursor: pointer;
    opacity: 0; transform: translateY(16px);
    transition: color 0.3s, opacity 0.4s, transform 0.4s;
  }
  .mob-menu.open .mob-link { opacity: 1; transform: none; }
  .mob-link:nth-child(1) { transition-delay: 0.08s; }
  .mob-link:nth-child(2) { transition-delay: 0.14s; }
  .mob-link:nth-child(3) { transition-delay: 0.20s; }
  .mob-link:nth-child(4) { transition-delay: 0.26s; }
  .mob-link:hover { color: var(--wood-light); }
  .mob-langs { display: flex; gap: 1.5rem; margin-top: 2rem; opacity: 0; transition: opacity 0.4s 0.35s; }
  .mob-menu.open .mob-langs { opacity: 1; }

  /* ── HERO ── */
  .hero { position: relative; height: 100vh; min-height: 640px; overflow: hidden; }
  .hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1.8s cubic-bezier(0.4,0,0.2,1); }
  .hero-slide.active { opacity: 1; }
  .hero-slide img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.04); transition: transform 9s ease-out; }
  .hero-slide.active img { transform: scale(1); }
  .hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(20,14,8,0.62) 0%, rgba(20,14,8,0.28) 60%, rgba(20,14,8,0.1) 100%); }
  .hero-content {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    justify-content: flex-end; padding: 0 8vw 10vh;
    max-width: 820px;
  }
  .hero-eyebrow {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 4px;
    text-transform: uppercase; color: var(--wood-light);
    margin-bottom: 1.5rem;
    opacity: 0; transform: translateY(8px);
    transition: opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s;
  }
  .hero-eyebrow.in { opacity: 1; transform: none; }
  .hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(3rem,5.5vw,6rem); font-weight: 300; line-height: 1.08;
    color: #F5F0E8; white-space: pre-line;
    overflow: hidden;
  }
  .hero-title-inner {
    display: block; transform: translateY(100%);
    transition: transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s;
  }
  .hero-title-inner.in { transform: none; }
  .hero-sub {
    margin-top: 1.8rem;
    font-family: 'Jost', sans-serif; font-size: 13px; letter-spacing: 1px;
    font-weight: 300; color: rgba(245,240,232,0.6); line-height: 1.7;
    opacity: 0; transform: translateY(8px);
    transition: opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s;
  }
  .hero-sub.in { opacity: 1; transform: none; }
  .hero-btns {
    margin-top: 2.8rem; display: flex; gap: 1.2rem; flex-wrap: wrap;
    opacity: 0; transform: translateY(8px);
    transition: opacity 0.8s ease 0.85s, transform 0.8s ease 0.85s;
  }
  .hero-btns.in { opacity: 1; transform: none; }
  .hero-dots {
    position: absolute; bottom: 40px; right: 4rem;
    display: flex; flex-direction: column; gap: 8px;
  }
  .hero-dot {
    width: 1px; background: rgba(245,240,232,0.25); transition: all 0.5s;
    cursor: pointer; border: none;
  }
  .hero-dot.active { background: rgba(245,240,232,0.8); }

  /* ── BUTTONS ── */
  .btn-dark {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'Jost', sans-serif; font-size: 9px;
    font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    background: var(--brown); color: var(--cream); border: none;
    padding: 16px 32px; cursor: pointer; transition: background 0.3s;
    text-decoration: none;
  }
  .btn-dark:hover { background: var(--dark); }
  .btn-outline {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'Jost', sans-serif; font-size: 9px;
    font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    background: transparent; color: var(--cream);
    border: 1px solid rgba(245,240,232,0.35); padding: 16px 32px;
    cursor: pointer; transition: all 0.3s; text-decoration: none;
  }
  .btn-outline:hover { background: rgba(245,240,232,0.08); border-color: rgba(245,240,232,0.65); }
  .btn-wood {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'Jost', sans-serif; font-size: 9px;
    font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    background: var(--wood); color: var(--cream); border: none;
    padding: 16px 36px; cursor: pointer; transition: background 0.3s;
  }
  .btn-wood:hover { background: #7A5234; }
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 12px;
    font-family: 'Jost', sans-serif; font-size: 9px;
    font-weight: 400; letter-spacing: 3px; text-transform: uppercase;
    background: none; border: none; color: var(--wood); cursor: pointer;
    padding: 0; transition: gap 0.3s;
  }
  .btn-ghost:hover { gap: 18px; }

  /* ── SECTION HEADERS ── */
  .section-eyebrow {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 4px;
    text-transform: uppercase; color: var(--wood);
    display: flex; align-items: center; gap: 16px; margin-bottom: 1.2rem;
  }
  .section-eyebrow::before { content: ''; display: block; width: 30px; height: 1px; background: var(--wood); }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3.2rem); font-weight: 300; line-height: 1.15;
    color: var(--brown);
  }

  /* ── REALISATIONS PAGE — CATEGORY GRID ── */
  .cat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
  }
  .cat-item {
    position: relative; overflow: hidden;
    aspect-ratio: 3/4; cursor: pointer;
    background: var(--cream-dark);
  }
  .cat-item:first-child { grid-column: span 2; aspect-ratio: auto; min-height: 560px; }
  .cat-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 1.1s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .cat-item:hover img { transform: scale(1.07); }
  .cat-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(20,14,8,0.72) 0%, rgba(20,14,8,0) 55%);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 2.5rem 2.8rem;
    transition: background 0.5s;
  }
  .cat-item:hover .cat-overlay { background: linear-gradient(to top, rgba(20,14,8,0.82) 0%, rgba(20,14,8,0.1) 65%); }
  .cat-label {
    font-family: 'Cormorant Garamond', serif; font-size: clamp(1.4rem,2.5vw,2rem);
    font-weight: 300; color: #F5F0E8; font-style: italic;
    transform: translateY(4px); transition: transform 0.4s;
  }
  .cat-item:hover .cat-label { transform: none; }
  .cat-count {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; color: rgba(245,240,232,0.45);
    margin-top: 6px; opacity: 0; transform: translateY(6px);
    transition: opacity 0.4s 0.06s, transform 0.4s 0.06s;
  }
  .cat-item:hover .cat-count { opacity: 1; transform: none; }
  .cat-arrow {
    position: absolute; top: 1.8rem; right: 1.8rem;
    width: 36px; height: 36px; border: 1px solid rgba(245,240,232,0.3);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: scale(0.85);
    transition: opacity 0.3s, transform 0.3s;
  }
  .cat-item:hover .cat-arrow { opacity: 1; transform: scale(1); }

  /* ── CATEGORY DETAIL PAGE ── */
  .cat-detail-hero {
    height: 55vh; min-height: 400px; position: relative; overflow: hidden;
  }
  .cat-detail-hero img { width: 100%; height: 100%; object-fit: cover; }
  .cat-detail-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(20,14,8,0) 40%, rgba(20,14,8,0.7));
    display: flex; align-items: flex-end; padding: 4rem 6rem;
  }
  .photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
  }
  .photo-item {
    overflow: hidden; position: relative; background: var(--cream-dark);
    cursor: pointer;
  }
  .photo-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .photo-item:hover img { transform: scale(1.06); }

  /* ── ABOUT PAGE ── */
  .about-split {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; min-height: 85vh;
  }
  .about-visual { position: relative; overflow: hidden; }
  .about-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .about-content {
    padding: 8rem 6vw; display: flex; flex-direction: column; justify-content: center;
  }
  .about-text {
    font-family: 'Cormorant Garamond', serif; font-size: 1.15rem;
    line-height: 1.85; color: rgba(60,45,30,0.7); font-style: italic;
    margin-bottom: 1.8rem;
  }
  .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 3.5rem; }
  .stat-item { padding: 2.5rem 0 2.5rem 2rem; border-left: 1px solid var(--border); }
  .stat-item:first-child { padding-left: 0; border-left: none; }
  .stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.6rem; font-weight: 300; color: var(--brown); }
  .stat-lbl { font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 2.5px; text-transform: uppercase; color: var(--text-muted); margin-top: 4px; }

  /* ── CONTACT PAGE ── */
  .contact-split { display: grid; grid-template-columns: 1fr 1fr; min-height: 80vh; }
  .contact-visual { position: relative; overflow: hidden; }
  .contact-visual img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .contact-visual-overlay { position: absolute; inset: 0; background: rgba(20,14,8,0.45); }
  .contact-content { padding: 8rem 6vw; background: var(--cream); }
  .form-field {
    width: 100%; background: transparent; border: none;
    border-bottom: 1px solid rgba(60,45,30,0.18);
    padding: 14px 0; font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem; color: var(--brown); outline: none;
    transition: border-color 0.3s; resize: none;
  }
  .form-field::placeholder { color: rgba(60,45,30,0.28); }
  .form-field:focus { border-color: var(--wood); }
  .form-label {
    font-family: 'Jost', sans-serif; font-size: 9px;
    letter-spacing: 2px; text-transform: uppercase;
    color: var(--text-muted); display: block; margin-bottom: 4px;
    transition: color 0.3s;
  }
  .form-group:focus-within .form-label { color: var(--wood); }

  /* ── FOOTER ── */
  .footer {
    background: var(--dark); padding: 5rem 4rem 3.5rem;
  }
  .footer-inner {
    max-width: 1440px; margin: 0 auto;
  }
  .footer-top {
    display: flex; align-items: flex-end; justify-content: space-between;
    padding-bottom: 3.5rem; border-bottom: 1px solid rgba(245,240,232,0.06);
    margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem;
  }
  .footer-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem; font-weight: 300; font-style: italic;
    color: rgba(245,240,232,0.9); letter-spacing: 0.04em;
  }
  .footer-tag {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; color: rgba(245,240,232,0.22); margin-top: 6px;
  }
  .footer-nav { display: flex; gap: 3rem; flex-wrap: wrap; }
  .footer-link {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 2.5px;
    text-transform: uppercase; background: none; border: none;
    color: rgba(245,240,232,0.3); cursor: pointer; transition: color 0.3s;
  }
  .footer-link:hover { color: rgba(245,240,232,0.7); }
  .footer-bottom {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
  }
  .footer-copy {
    font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 2px;
    color: rgba(245,240,232,0.18);
  }

  /* ── LIGHTBOX ── */
  .lightbox {
    position: fixed; inset: 0; background: rgba(12,8,4,0.97);
    z-index: 9000; display: flex; align-items: center; justify-content: center;
  }
  .lightbox-img { max-width: 86vw; max-height: 86vh; object-fit: contain; display: block; }

  /* ── WHATSAPP ── */
  .wa-fab {
    position: fixed; bottom: 32px; right: 32px; z-index: 500;
    width: 52px; height: 52px; border-radius: 50%; background: #25D366; border: none;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 24px rgba(37,211,102,0.3);
    transition: transform 0.3s, box-shadow 0.3s; text-decoration: none;
  }
  .wa-fab:hover { transform: scale(1.08); box-shadow: 0 8px 32px rgba(37,211,102,0.45); }

  /* ── CONTACT INFO ── */
  .contact-info-item { margin-bottom: 2.5rem; }
  .contact-info-lbl { font-family: 'Jost', sans-serif; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
  .contact-info-val { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--brown); text-decoration: none; border-bottom: 1px solid rgba(155,107,69,0.2); padding-bottom: 2px; transition: border-color 0.3s; display: inline; }
  a.contact-info-val:hover { border-color: var(--wood); }

  /* ── REVEAL ── */
  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.9s ease, transform 0.9s ease; }
  .reveal.in { opacity: 1; transform: none; }
  .reveal-left { opacity: 0; transform: translateX(-28px); transition: opacity 0.9s ease, transform 0.9s ease; }
  .reveal-left.in { opacity: 1; transform: none; }
  .reveal-right { opacity: 0; transform: translateX(28px); transition: opacity 0.9s ease, transform 0.9s ease; }
  .reveal-right.in { opacity: 1; transform: none; }

  /* ── PAGE HEADER ── */
  .page-header {
    padding: 160px 8vw 80px;
    border-bottom: 1px solid var(--border);
  }

  /* ── RESPONSIVE ── */
  @media(max-width: 1024px) {
    .nav-links { display: none !important; }
    .burger { display: flex !important; }
    .cat-grid { grid-template-columns: 1fr 1fr; }
    .cat-item:first-child { grid-column: span 2; }
    .about-split { grid-template-columns: 1fr; }
    .about-visual { height: 55vw; min-height: 340px; }
    .contact-split { grid-template-columns: 1fr; }
    .contact-visual { height: 45vw; min-height: 300px; }
  }
  @media(max-width: 768px) {
    .nav-inner { padding: 0 1.8rem; }
    .cat-grid { grid-template-columns: 1fr; }
    .cat-item:first-child { grid-column: span 1; }
    .photo-grid { grid-template-columns: 1fr 1fr; }
    .stats-row { grid-template-columns: 1fr; }
    .footer-top { flex-direction: column; align-items: flex-start; }
    .page-header { padding: 140px 6vw 60px; }
    .about-content { padding: 4rem 6vw; }
    .contact-content { padding: 4rem 6vw; }
    .cat-detail-hero-overlay { padding: 2.5rem 3rem; }
  }
  @media(max-width: 480px) {
    .photo-grid { grid-template-columns: 1fr; }
    .wa-fab { bottom: 20px; right: 20px; }
    .hero-content { padding: 0 6vw 10vh; }
  }
`;

/* ════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang]       = useState("en");
  const [page, setPage]       = useState("home");
  const [catPage, setCatPage] = useState(null); // category key
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [textIn, setTextIn]   = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState("");

  const t = T[lang];

  /* Navigate */
  const navigate = (p, cat = null) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => { setPage(p); setCatPage(cat); setMenuOpen(false); }, p !== page ? 0 : 0);
  };

  /* Scroll */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: 0.08 });
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* Hero slideshow */
  useEffect(() => {
    const t = setInterval(() => {
      setTextIn(false);
      setTimeout(() => { setSlideIdx(i => (i + 1) % HERO_SLIDES.length); setTextIn(true); }, 700);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  /* Lang dir */
  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setSending(true); setError("");
    try {
      const { error: sbError } = await supabase
        .from("contacts")
        .insert([{ name: formData.name, email: formData.email, phone: formData.phone || null, message: formData.message }]);
      if (sbError) throw sbError;
      setSent(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    } catch { setError(t.contact.error); } finally { setSending(false); }
  };

  const isNavLight = !scrolled && page === "home";

  /* ── RENDER ── */
  return (
    <div style={{ background: "var(--cream)", color: "var(--brown)", overflowX: "hidden", direction: t.dir, minHeight: "100vh" }}>
      <style>{css}</style>

      {/* ── WhatsApp ── */}
      <a href="https://wa.me/9613011175" target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* ── Lightbox ── */}
      {lightbox !== null && (() => {
        const photos = catPage ? PHOTOS.filter(p => p.category === catPage) : PHOTOS;
        return (
          <div className="lightbox" onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 28, right: 36, background: "none", border: "none", fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: 3, color: "rgba(245,240,232,0.4)", textTransform: "uppercase", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color="#F5F0E8"} onMouseLeave={e => e.target.style.color="rgba(245,240,232,0.4)"}>Close</button>
            <button style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(245,240,232,0.15)", color: "#F5F0E8", width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, cursor: "pointer", transition: "border-color 0.2s" }} onClick={e => { e.stopPropagation(); setLightbox(l => (l-1+photos.length)%photos.length); }}>‹</button>
            <img className="lightbox-img" src={photos[lightbox].src} alt={photos[lightbox].alt} onClick={e => e.stopPropagation()} />
            <button style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(245,240,232,0.15)", color: "#F5F0E8", width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, cursor: "pointer", transition: "border-color 0.2s" }} onClick={e => { e.stopPropagation(); setLightbox(l => (l+1)%photos.length); }}>›</button>
            <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", fontFamily: "'Jost',sans-serif", fontSize: 9, letterSpacing: 3, color: "rgba(245,240,232,0.25)", textTransform: "uppercase" }}>{lightbox+1} / {photos.length}</div>
          </div>
        );
      })()}

      {/* ══════ NAVIGATION ══════ */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`} style={{ background: isNavLight ? "transparent" : undefined }}>
        <div className="nav-inner">
          <button className="nav-logo" onClick={() => navigate("home")} style={{ color: isNavLight ? "#F5F0E8" : undefined }}>Woodline</button>

          {/* Desktop links */}
          <div className="nav-links" style={{ gap: "3rem" }}>
            {[
              { key: "home", label: t.nav.home },
              { key: "realisations", label: t.nav.realisations },
              { key: "about", label: t.nav.about },
              { key: "contact", label: t.nav.contact },
            ].map(({ key, label }) => (
              <button key={key} className={`nav-link${page === key ? " active" : ""}`} onClick={() => navigate(key)}
                style={isNavLight ? { color: page===key?"rgba(245,240,232,0.95)":"rgba(245,240,232,0.55)" } : undefined}>
                {label}
              </button>
            ))}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {["en","fr","ar"].map((l,i) => (
                <span key={l} style={{ display:"flex",alignItems:"center",gap:8 }}>
                  {i>0 && <span style={{ color: isNavLight ? "rgba(245,240,232,0.2)" : "var(--border)", fontSize:10 }}>·</span>}
                  <button className={`lang-btn${lang===l?" active":""}`} onClick={()=>setLang(l)}
                    style={isNavLight&&lang!==l ? {color:"rgba(245,240,232,0.3)"} : isNavLight&&lang===l ? {color:"rgba(245,240,232,0.8)"} : undefined}>
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>
            <button className="nav-cta" onClick={() => navigate("contact")}>{t.cta}</button>
          </div>

          {/* Burger */}
          <button className={`burger${menuOpen?" open":""}`} onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu">
            {[1,2,3].map(i=><span key={i} className={`bl ${isNavLight&&!menuOpen?"bl-light":"bl-dark"}`}/>)}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mob-menu${menuOpen?" open":""}`}>
        {[
          { key:"home", label:t.nav.home },
          { key:"realisations", label:t.nav.realisations },
          { key:"about", label:t.nav.about },
          { key:"contact", label:t.nav.contact },
        ].map(({key,label}) => (
          <button key={key} className="mob-link" onClick={()=>navigate(key)}>{label}</button>
        ))}
        <div className="mob-langs">
          {["en","fr","ar"].map(l => (
            <button key={l} className={`lang-btn${lang===l?" active":""}`} onClick={()=>{setLang(l);setMenuOpen(false);}}
              style={{ color: lang===l?"rgba(245,240,232,0.8)":"rgba(245,240,232,0.3)", fontSize:10 }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ══════ PAGES ══════ */}
      <div className="page-enter" key={page + catPage + lang}>

        {/* ── HOME ── */}
        {page === "home" && <HomePage t={t} lang={lang} navigate={navigate} slideIdx={slideIdx} textIn={textIn} setSlideIdx={setSlideIdx} />}

        {/* ── REALISATIONS ── */}
        {page === "realisations" && !catPage && <RealisationsPage t={t} navigate={navigate} />}

        {/* ── CATEGORY DETAIL ── */}
        {page === "realisations" && catPage && <CategoryPage t={t} cat={catPage} navigate={navigate} setLightbox={setLightbox} />}

        {/* ── ABOUT ── */}
        {page === "about" && <AboutPage t={t} navigate={navigate} />}

        {/* ── CONTACT ── */}
        {page === "contact" && <ContactPage t={t} navigate={navigate} formData={formData} setFormData={setFormData} sent={sent} sending={sending} error={error} handleSubmit={handleSubmit} />}

      </div>

      {/* Footer on all pages */}
      <SiteFooter t={t} navigate={navigate} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════════════════════ */
function HomePage({ t, lang, navigate, slideIdx, textIn, setSlideIdx }) {
  const slide = HERO_SLIDES[slideIdx];
  return (
    <>
      {/* Hero */}
      <section className="hero">
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} className={`hero-slide${i===slideIdx?" active":""}`}>
            <img src={s.src} alt={s.alt} />
          </div>
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className={`hero-eyebrow${textIn?" in":""}`}>{t.hero.eyebrow}</div>
          <div className="hero-title" style={{ overflow:"hidden" }}>
            <span className="hero-title-inner" style={{ display:"block", transform: textIn?"none":"translateY(100%)", transition:"transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.25s" }}>
              {t.hero.title}
            </span>
          </div>
          <p className={`hero-sub${textIn?" in":""}`}>{t.hero.sub}</p>
          <div className={`hero-btns${textIn?" in":""}`}>
            <button className="btn-dark" onClick={()=>navigate("realisations")}>
              {lang==="ar"?"اكتشف أعمالنا":lang==="fr"?"Voir nos réalisations":"View Our Work"}
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4H13M9 1L13 4L9 7" stroke="#F5F0E8" strokeWidth="0.75"/></svg>
            </button>
            <button className="btn-outline" onClick={()=>navigate("contact")}>
              {lang==="ar"?"طلب عرض سعر":lang==="fr"?"Demander un devis":"Request a Quote"}
            </button>
          </div>
        </div>
        {/* Slide dots */}
        <div className="hero-dots">
          {HERO_SLIDES.map((_,i) => (
            <button key={i} className={`hero-dot${i===slideIdx?" active":""}`} style={{ height: i===slideIdx?28:16 }} onClick={()=>setSlideIdx(i)} aria-label={`Slide ${i+1}`} />
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section style={{ background: "#EDE7D8", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
          {[
            { t: lang==="ar"?"تصميم خاص":lang==="fr"?"Sur Mesure":"Bespoke Design",
              d: lang==="ar"?"كل قطعة مصممة من الصفر لتناسب مساحتك ورؤيتك.":lang==="fr"?"Chaque pièce conçue de zéro pour s'adapter à votre espace et vision.":"Every piece designed from scratch to suit your space and vision." },
            { t: lang==="ar"?"مواد فاخرة":lang==="fr"?"Matériaux Premium":"Premium Materials",
              d: lang==="ar"?"أخشاب نبيلة — البلوط والجوز والأرز — مختارة لجمالها ومتانتها.":lang==="fr"?"Bois nobles — chêne, noyer, cèdre — sélectionnés pour leur beauté.":"Fine-grain hardwoods — oak, walnut, cedar — selected for beauty." },
            { t: lang==="ar"?"٣٠ عاماً من الإتقان":lang==="fr"?"30 Ans de Maîtrise":"30 Years of Mastery",
              d: lang==="ar"?"ثلاثة عقود من الخبرة في النجارة المخصصة، كل مشروع مبني ليدوم.":lang==="fr"?"Trois décennies d'expertise en menuiserie — chaque finition pour durer.":"Three decades of expertise — every finish built to last generations." },
          ].map((p,i) => (
            <div key={i} className="reveal" style={{ padding:"4rem 4vw", borderRight: i<2?"1px solid var(--border)":"none", transition:`opacity 0.9s ${i*0.12}s, transform 0.9s ${i*0.12}s` }}>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:"var(--wood)", marginBottom:"1rem" }}>0{i+1}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:300, marginBottom:"0.9rem" }}>{p.t}</h3>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", lineHeight:1.8, color:"var(--text-muted)", fontWeight:300 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories preview — key visual block like intérieurs-privés */}
      <section style={{ padding:"7rem 0 0" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 4rem 3rem" }}>
          <div className="reveal">
            <div className="section-eyebrow">{t.realisations.eyebrow}</div>
            <h2 className="section-title">{t.realisations.title}</h2>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
          {CATEGORIES.slice(0,4).map((cat,i) => (
            <div key={cat.key} className="cat-item reveal" style={{ minHeight:480, cursor:"pointer", transition:`opacity 0.9s ${i*0.1}s, transform 0.9s ${i*0.1}s` }}
              onClick={()=>{ window.scrollTo({top:0}); setTimeout(()=>{ /* navigate to page */ }, 0); }}
            >
              <img src={cat.cover} alt={cat.key} />
              <div className="cat-overlay" onClick={()=>{ window.scrollTo({top:0,behavior:"smooth"}); }}>
                <div>
                  <div className="cat-label">{T["en"].cats[cat.key]}</div>
                  <div className="cat-count">{cat.count} {t.catPage.photos}</div>
                </div>
              </div>
              <div className="cat-arrow">
                <svg width="12" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4H13M9 1L13 4L9 7" stroke="#F5F0E8" strokeWidth="0.9"/></svg>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", padding:"4rem 0 7rem" }}>
          <button className="btn-ghost" onClick={()=>{ window.scrollTo({top:0,behavior:"instant"}); }}>
            {lang==="ar"?"كل الأعمال":lang==="fr"?"Voir toutes les réalisations":"View all realisations"}
            <svg width="32" height="1" viewBox="0 0 32 1"><line x1="0" y1="0.5" x2="32" y2="0.5" stroke="var(--wood)" strokeWidth="1"/></svg>
          </button>
        </div>
      </section>

      {/* About teaser */}
      <section style={{ background:"var(--dark)", padding:"8rem 0" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 8vw", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8vw", alignItems:"center" }}>
          <div className="reveal-left">
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:"var(--wood)", marginBottom:"1.5rem", display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ display:"block", width:30, height:1, background:"var(--wood)" }} />
              {t.about.eyebrow}
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:300, color:"rgba(245,240,232,0.92)", lineHeight:1.15, marginBottom:"2rem" }}>{t.about.title}</h2>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", lineHeight:1.85, color:"rgba(245,240,232,0.45)", fontStyle:"italic", marginBottom:"2.5rem" }}>{t.about.p1}</p>
            <button className="btn-ghost" style={{ color:"var(--wood-light)" }} onClick={()=>{ window.scrollTo({top:0,behavior:"instant"}); }}>
              {lang==="ar"?"اقرأ المزيد":lang==="fr"?"En savoir plus":"Read more"}
              <svg width="32" height="1" viewBox="0 0 32 1"><line x1="0" y1="0.5" x2="32" y2="0.5" stroke="var(--wood-light)" strokeWidth="1"/></svg>
            </button>
          </div>
          <div className="reveal-right" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
            {[5, 16, 22, 3].map(id => {
              const ph = PHOTOS.find(p=>p.id===id);
              return ph ? <div key={id} style={{ overflow:"hidden", aspectRatio:"1", background:"#2A1F14" }}><img src={ph.src} alt={ph.alt} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.8s",filter:"brightness(0.8)" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}/></div> : null;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   REALISATIONS PAGE
══════════════════════════════════════════════════════════════════════════════ */
function RealisationsPage({ t, navigate }) {
  return (
    <>
      <div className="page-header">
        <div style={{ maxWidth:1440, margin:"0 auto" }}>
          <div className="section-eyebrow reveal">{t.realisations.eyebrow}</div>
          <h1 className="section-title reveal" style={{ fontSize:"clamp(2.5rem,5vw,5rem)", marginBottom:"1rem" }}>{t.realisations.title}</h1>
          <p className="reveal" style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.8rem", letterSpacing:1, color:"var(--text-muted)", fontWeight:300, maxWidth:500 }}>{t.realisations.sub}</p>
        </div>
      </div>

      {/* Categories — one after another, like intérieurs-privés */}
      <div style={{ maxWidth:1440, margin:"0 auto" }}>
        {CATEGORIES.map((cat, idx) => {
          const photos = PHOTOS.filter(p => p.category === cat.key);
          const isEven = idx % 2 === 0;
          return (
            <div key={cat.key} className="reveal" style={{ padding:"5rem 4rem", borderBottom:"1px solid var(--border)" }}>
              {/* Category header */}
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"2.5rem", flexWrap:"wrap", gap:"1rem" }}>
                <div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, textTransform:"uppercase", color:"var(--text-muted)", marginBottom:8 }}>0{idx+1}</div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3vw,2.8rem)", fontWeight:300, fontStyle:"italic" }}>
                    {t.cats[cat.key]}
                  </h2>
                </div>
                <button className="btn-ghost" onClick={()=>navigate("realisations", cat.key)}>
                  {t.catPage.back.replace("Toutes les Réalisations","Voir tout").replace("All Realisations","View all").replace("جميع الأعمال","الكل")} — {cat.count} {t.catPage.photos}
                  <svg width="28" height="1" viewBox="0 0 28 1"><line x1="0" y1="0.5" x2="28" y2="0.5" stroke="var(--wood)" strokeWidth="1"/></svg>
                </button>
              </div>

              {/* Photo strip — 3 photos preview */}
              <div style={{ display:"grid", gridTemplateColumns:`${isEven?"2fr 1fr 1fr":"1fr 1fr 2fr"}`, gap:3, cursor:"pointer" }}
                onClick={()=>navigate("realisations", cat.key)}>
                {photos.slice(0,3).map((ph,i) => (
                  <div key={ph.id} style={{ overflow:"hidden", aspectRatio: i===0&&isEven||i===2&&!isEven?"16/10":"4/5", background:"var(--cream-dark)" }}>
                    <img src={ph.src} alt={ph.alt} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.9s" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="none"}/>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CATEGORY DETAIL PAGE
══════════════════════════════════════════════════════════════════════════════ */
function CategoryPage({ t, cat, navigate, setLightbox }) {
  const photos = PHOTOS.filter(p => p.category === cat);
  const catInfo = CATEGORIES.find(c => c.key === cat);
  const col1 = photos.filter((_,i)=>i%3===0);
  const col2 = photos.filter((_,i)=>i%3===1);
  const col3 = photos.filter((_,i)=>i%3===2);
  const heights = [420,300,520,380,460];

  return (
    <>
      {/* Hero image */}
      <div className="cat-detail-hero">
        <img src={catInfo.cover} alt={cat} />
        <div className="cat-detail-hero-overlay">
          <div>
            <button onClick={()=>navigate("realisations")} style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", background:"none", border:"none", color:"rgba(245,240,232,0.5)", cursor:"pointer", display:"flex", alignItems:"center", gap:10, marginBottom:"1.2rem", transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color="#F5F0E8"} onMouseLeave={e=>e.currentTarget.style.color="rgba(245,240,232,0.5)"}>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" style={{transform:"rotate(180deg)"}}><path d="M1 4H13M5 1L1 4L5 7" stroke="currentColor" strokeWidth="0.9"/></svg>
              {t.catPage.back}
            </button>
            <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.5rem,5vw,4.5rem)", fontWeight:300, color:"#F5F0E8", fontStyle:"italic" }}>{t.cats[cat]}</h1>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(245,240,232,0.4)", marginTop:8 }}>{photos.length} {t.catPage.photos}</p>
          </div>
        </div>
      </div>

      {/* Masonry gallery */}
      <div style={{ maxWidth:1440, margin:"0 auto", padding:"4px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
          {[col1,col2,col3].map((col,ci) => (
            <div key={ci} style={{ display:"flex", flexDirection:"column", gap:3 }}>
              {col.map((ph,i) => (
                <div key={ph.id} className="photo-item" style={{ height: heights[(i+ci)%heights.length] }} onClick={()=>setLightbox(photos.indexOf(ph))}>
                  <img src={ph.src} alt={ph.alt} />
                  <div style={{ position:"absolute", inset:0, background:"rgba(20,14,8,0)", transition:"background 0.4s", display:"flex", alignItems:"center", justifyContent:"center" }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(20,14,8,0.25)"}
                    onMouseLeave={e=>e.currentTarget.style.background="rgba(20,14,8,0)"}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ opacity:0, transition:"opacity 0.3s" }}
                      onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                      <rect x="1" y="1" width="26" height="26" stroke="rgba(245,240,232,0.6)" strokeWidth="0.8"/>
                      <line x1="14" y1="8" x2="14" y2="20" stroke="rgba(245,240,232,0.6)" strokeWidth="0.8"/>
                      <line x1="8" y1="14" x2="20" y2="14" stroke="rgba(245,240,232,0.6)" strokeWidth="0.8"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign:"center", padding:"6rem 4rem" }}>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontStyle:"italic", color:"var(--text-muted)", marginBottom:"2.5rem", maxWidth:500, margin:"0 auto 2.5rem" }}>
          {t.contact.intro}
        </p>
        <button className="btn-wood" onClick={()=>navigate("contact")}>
          {t.cta}
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4H13M9 1L13 4L9 7" stroke="#F5F0E8" strokeWidth="0.75"/></svg>
        </button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════════════════════════════ */
function AboutPage({ t, navigate }) {
  return (
    <>
      <div className="about-split">
        <div className="about-visual">
          <img src="/photos/wood-beams.jpeg" alt="Woodline craftsmanship" />
          <div style={{ position:"absolute", inset:0, background:"rgba(20,14,8,0.15)" }} />
        </div>
        <div className="about-content">
          <div className="section-eyebrow reveal">{t.about.eyebrow}</div>
          <h1 className="section-title reveal" style={{ fontSize:"clamp(2rem,3vw,3rem)", marginBottom:"2.5rem" }}>{t.about.title}</h1>
          <p className="about-text reveal">{t.about.p1}</p>
          <p className="about-text reveal">{t.about.p2}</p>
          <div className="stats-row reveal" style={{ marginTop:"3rem" }}>
            {t.about.stats.map(([num,lbl],i) => (
              <div key={i} className="stat-item">
                <div className="stat-num">{num}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop:"3rem" }}>
            <button className="btn-wood" onClick={()=>navigate("contact")}>{t.cta}</button>
          </div>
        </div>
      </div>

      {/* Values */}
      <section style={{ background:"var(--cream-dark)", padding:"6rem 0", borderTop:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 4rem" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0 }}>
            {[
              { n:"01", t: t.about.stats[0][1], d: t.about.p1.split(".")[0]+"." },
              { n:"02", t: t.about.stats[1][1], d: t.about.p2.split(".")[0]+"." },
              { n:"03", t: t.about.stats[2][1], d: t.about.p1.split(".").slice(-2,-1)[0]+"." },
            ].map((v,i) => (
              <div key={i} className="reveal" style={{ padding:"3.5rem 3rem", borderRight:i<2?"1px solid var(--border)":"none", transition:`opacity 0.9s ${i*0.12}s,transform 0.9s ${i*0.12}s` }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:4, color:"var(--wood)", textTransform:"uppercase", marginBottom:"1rem" }}>{v.n}</div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.6rem", fontWeight:300, marginBottom:"1rem" }}>{v.t}</h3>
                <p style={{ fontFamily:"'Jost',sans-serif", fontSize:"0.78rem", lineHeight:1.85, color:"var(--text-muted)", fontWeight:300 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }}>
        {[7,5,11,16].map(id => {
          const ph = PHOTOS.find(p=>p.id===id);
          return ph ? <div key={id} style={{ overflow:"hidden", aspectRatio:"1", background:"var(--cream-dark)" }}>
            <img src={ph.src} alt={ph.alt} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.8s" }}
              onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}/>
          </div> : null;
        })}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════════════════════════════════════ */
function ContactPage({ t, navigate, formData, setFormData, sent, sending, error, handleSubmit }) {
  const tc = t.contact;
  return (
    <div className="contact-split">
      {/* Left visual */}
      <div className="contact-visual">
        <img src="/photos/entrance-hall.jpeg" alt="Woodline craftsmanship" />
        <div className="contact-visual-overlay" />
        <div style={{ position:"absolute", bottom:"4rem", left:"4rem", right:"4rem" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.5rem,2.5vw,2.5rem)", fontWeight:300, fontStyle:"italic", color:"#F5F0E8", lineHeight:1.3, marginBottom:"1.5rem" }}>
            "{tc.title}"
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
            {[
              { l: tc.phone, v:"+961 3 01 11 75", h:"tel:+9613011175" },
              { l: tc.email, v:"fadi-kassabian@hotmail.com", h:"mailto:fadi-kassabian@hotmail.com" },
              { l: tc.location, v:"Zouk Mosbeh, Keserwan, Lebanon", h:null },
            ].map(({l,v,h}) => (
              <div key={l}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:3, textTransform:"uppercase", color:"rgba(245,240,232,0.3)", marginBottom:4 }}>{l}</div>
                {h ? <a href={h} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:"rgba(245,240,232,0.75)", textDecoration:"none", borderBottom:"1px solid rgba(245,240,232,0.15)", paddingBottom:2, transition:"border-color 0.3s" }} onMouseEnter={e=>e.target.style.borderColor="rgba(245,240,232,0.5)"} onMouseLeave={e=>e.target.style.borderColor="rgba(245,240,232,0.15)"}>{v}</a>
                    : <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem", color:"rgba(245,240,232,0.55)" }}>{v}</span>}
              </div>
            ))}
          </div>
          <a href="https://wa.me/9613011175" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#25D366", color:"#fff", padding:"12px 24px", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", textDecoration:"none", marginTop:"2rem", transition:"opacity 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity="0.85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Right form */}
      <div className="contact-content">
        <div style={{ maxWidth:520 }}>
          <div className="section-eyebrow reveal">{tc.eyebrow}</div>
          <h1 className="section-title reveal" style={{ fontSize:"clamp(1.8rem,2.5vw,2.8rem)", marginBottom:"0.8rem" }}>{tc.title}</h1>
          <p className="reveal" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.05rem", lineHeight:1.85, color:"var(--text-muted)", fontStyle:"italic", marginBottom:"3rem" }}>{tc.intro}</p>

          {sent ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.5rem", padding:"4rem 0", textAlign:"center" }}>
              <div style={{ width:52, height:52, border:"1px solid var(--wood)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="18" height="12" viewBox="0 0 22 16" fill="none"><path d="M1 8L8 15L21 1" stroke="var(--wood)" strokeWidth="1.2"/></svg>
              </div>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontStyle:"italic", color:"var(--text-muted)" }}>{tc.success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"2.5rem" }}>
              {tc.fields.slice(0,3).map(({key,label}) => (
                <div key={key} className="form-group reveal">
                  <label className="form-label">{label}</label>
                  <input type={key==="email"?"email":key==="phone"?"tel":"text"} className="form-field" value={formData[key]} onChange={e=>setFormData({...formData,[key]:e.target.value})} required={key!=="phone"} />
                </div>
              ))}
              <div className="form-group reveal">
                <label className="form-label">{tc.fields[3].label}</label>
                <textarea className="form-field" value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} style={{ height:120 }} required/>
              </div>
              {error && <p style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"#b5351e", letterSpacing:1 }}>{error}</p>}
              <div className="reveal">
                <button type="submit" className="btn-wood" disabled={sending} style={{ opacity:sending?0.7:1 }}>
                  {sending ? tc.sending : tc.send}
                  {!sending && <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4H13M9 1L13 4L9 7" stroke="#F5F0E8" strokeWidth="0.75"/></svg>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════════════ */
function SiteFooter({ t, navigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-logo">Woodline</div>
            <div className="footer-tag">{t.footer.tag}</div>
          </div>
          <nav className="footer-nav">
            {Object.entries(t.nav).map(([key,label]) => (
              <button key={key} className="footer-link" onClick={()=>navigate(key)}>{label}</button>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">{t.footer.copy}</p>
          <a href="https://wa.me/9613011175" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:2, textTransform:"uppercase", color:"rgba(245,240,232,0.2)", textDecoration:"none", transition:"color 0.3s" }}
            onMouseEnter={e=>e.target.style.color="rgba(245,240,232,0.5)"} onMouseLeave={e=>e.target.style.color="rgba(245,240,232,0.2)"}>
            WhatsApp ↗
          </a>
        </div>
      </div>
    </footer>
  );
}