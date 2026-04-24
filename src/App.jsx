import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase.js";

/* ─── PHOTOS ─────────────────────────────────────────────────────────────── */
const PHOTOS = [
  { id: 1,  src: "/photos/villa-exterior.jpeg",    category: "Architecture", alt: "Woodline custom villa exterior with bespoke woodwork, Zouk Mosbeh Lebanon"       },
  { id: 2,  src: "/photos/front-door.jpeg",         category: "Architecture", alt: "Woodline handcrafted solid wood front door, custom made in Lebanon"               },
  { id: 3,  src: "/photos/wood-beams.jpeg",         category: "Architecture", alt: "Exposed custom wood beams ceiling crafted by Woodline, Lebanon"                   },
  { id: 4,  src: "/photos/open-space.jpeg",         category: "Architecture", alt: "Bespoke open-plan architectural joinery by Woodline, Lebanon"                     },
  { id: 5,  src: "/photos/entrance-hall.jpeg",      category: "Interior",     alt: "Custom entrance hall joinery with bespoke woodwork by Woodline Lebanon"           },
  { id: 6,  src: "/photos/hidden-door.jpeg",        category: "Interior",     alt: "Woodline bespoke hidden door integrated into custom wall panelling, Lebanon"      },
  { id: 7,  src: "/photos/living-room.jpeg",        category: "Interior",     alt: "Luxury custom living room interior designed and crafted by Woodline Lebanon"      },
  { id: 8,  src: "/photos/living-room2.jpeg",       category: "Interior",     alt: "Bespoke living room furniture and wall units by Woodline, Zouk Mosbeh Lebanon"   },
  { id: 9,  src: "/photos/dining-room.jpeg",        category: "Interior",     alt: "Custom dining room joinery and furniture crafted by Woodline Lebanon"             },
  { id: 10, src: "/photos/dining-room2.jpeg",       category: "Interior",     alt: "Handcrafted bespoke dining room interior by Woodline, Lebanon"                   },
  { id: 11, src: "/photos/wall-panel-marble.jpeg",  category: "Interior",     alt: "Custom wood and marble wall panel installation by Woodline Lebanon"               },
  { id: 12, src: "/photos/loft-space.jpeg",         category: "Interior",     alt: "Bespoke loft space with custom wood staircase and joinery by Woodline Lebanon"   },
  { id: 13, src: "/photos/loft-space2.jpeg",        category: "Interior",     alt: "Custom loft interior with handcrafted wooden elements by Woodline Lebanon"       },
  { id: 14, src: "/photos/window-bench.jpeg",       category: "Interior",     alt: "Bespoke built-in window bench seat with custom storage by Woodline Lebanon"      },
  { id: 15, src: "/photos/elevator.jpeg",           category: "Interior",     alt: "Custom wood-panelled private elevator interior crafted by Woodline Lebanon"      },
  { id: 16, src: "/photos/round-table.jpeg",        category: "Furniture",    alt: "Handcrafted round solid wood dining table made to measure by Woodline Lebanon"   },
  { id: 17, src: "/photos/black-wardrobe.jpeg",     category: "Furniture",    alt: "Custom black lacquered wardrobe with bespoke storage by Woodline Lebanon"        },
  { id: 18, src: "/photos/black-unit-open.jpeg",    category: "Furniture",    alt: "Bespoke open storage unit in black finish custom made by Woodline Lebanon"       },
  { id: 19, src: "/photos/kitchen.jpeg",            category: "Kitchen",      alt: "Custom made kitchen with bespoke cabinetry designed by Woodline, Lebanon"        },
  { id: 20, src: "/photos/kitchen2.jpeg",           category: "Kitchen",      alt: "Luxury bespoke kitchen joinery and cabinetry by Woodline Zouk Mosbeh"            },
  { id: 21, src: "/photos/kitchen-island.jpeg",     category: "Kitchen",      alt: "Handcrafted custom kitchen island in solid wood by Woodline Lebanon"             },
  { id: 22, src: "/photos/wine-cellar-outside.jpeg",category: "Wine Cellar",  alt: "Bespoke wine cellar exterior with custom wood frame by Woodline Lebanon"         },
  { id: 23, src: "/photos/wine-cellar-inside.jpeg", category: "Wine Cellar",  alt: "Custom wine cellar interior with handcrafted wooden racks by Woodline Lebanon"   },
  { id: 24, src: "/photos/wine-cellar-angle.jpeg",  category: "Wine Cellar",  alt: "Luxury bespoke wine cellar with custom joinery crafted by Woodline Lebanon"      },
  { id: 25, src: "/photos/bathroom.jpeg",           category: "Bathroom",     alt: "Custom bathroom furniture and bespoke wood vanity by Woodline Lebanon"           },
];

const HERO_SLIDES = [1, 7, 19, 22, 12, 16].map(id => PHOTOS.find(p => p.id === id));

/* ─── TRANSLATIONS ───────────────────────────────────────────────────────── */
const T = {
  en: {
    nav: ["Home", "About", "Portfolio", "Contact"],
    cta: "Get a Quote",
    heroSlides: [
      { title: "Crafted wood.", sub: "Elevated living.", caption: "Three decades of bespoke joinery transforming spaces across Lebanon." },
      { title: "Bespoke interiors.", sub: "Built to last.", caption: "Every detail designed around your lifestyle, vision, and space." },
      { title: "Custom kitchens.", sub: "Exceptional craft.", caption: "From concept to installation — handcrafted in our Zouk Mosbeh workshop." },
      { title: "Wine cellars.", sub: "Truly yours.", caption: "Bespoke wine rooms that combine function, beauty and fine woodwork." },
      { title: "Living spaces.", sub: "Reimagined.", caption: "We turn ordinary rooms into extraordinary environments." },
      { title: "Fine furniture.", sub: "Lasting character.", caption: "Solid hardwoods, selected for beauty, built for generations." },
    ],
    btn1: "View Our Work", btn2: "Request a Quote",
    p1title: "Bespoke Design",    p1desc: "Every piece is designed from scratch to suit your space, lifestyle, and vision — no off-the-shelf compromises.",
    p2title: "Premium Materials", p2desc: "We work with fine-grain hardwoods — solid oak, walnut, cedar — selected for beauty and longevity.",
    p3title: "30 Years of Mastery", p3desc: "Three decades of expertise in bespoke joinery — every joint, surface, and finish built to last generations.",
    aboutEye: "Our Story",
    aboutTitle: "Born from a passion for wood",
    aboutP1: "Woodline was founded on a single belief: that a well-crafted space changes how you live. Based in Zouk Mosbeh, Lebanon, we have spent over 30 years transforming residential and commercial interiors with bespoke joinery that balances artistry with function.",
    aboutP2: "Every project begins with listening. We take time to understand your vision, your space, and your daily rhythms — then we design, build, and install furniture that feels like it was always meant to be there.",
    stats: [["500+", "Projects completed"], ["100%", "Custom-made"], ["30+", "Years in Lebanon"]],
    portEye: "Portfolio", portTitle: "Our Realizations", portSub: "A selection of bespoke joinery and custom furniture across Lebanon.",
    filterAll: "All",
    cats: { Architecture: "Architecture", Interior: "Interior", Furniture: "Furniture", Kitchen: "Kitchen", "Wine Cellar": "Wine Cellar", Bathroom: "Bathroom" },
    contactEye: "Get in Touch", contactTitle: "Your project, our passion",
    contactIntro: "Tell us about your project and we'll get back to you within 24 hours.",
    fields: [
      { key: "name",    label: "Your Name" },
      { key: "email",   label: "Email Address" },
      { key: "phone",   label: "Phone (optional)" },
      { key: "message", label: "Describe Your Project" },
    ],
    send: "Send My Request", sending: "Sending…",
    successTxt: "Message sent. We'll reply within 24 hours.",
    errorTxt: "Something went wrong. Please try again or call us directly.",
    footerTag: "Custom Made Furniture · 30 Years of Expertise · Zouk Mosbeh, Lebanon",
    copy: `© ${new Date().getFullYear()} Woodline. All rights reserved.`,
    dir: "ltr",
  },
  fr: {
    nav: ["Accueil", "À propos", "Réalisations", "Contact"],
    cta: "Devis Gratuit",
    heroSlides: [
      { title: "Bois façonné.", sub: "Art de vivre.", caption: "Trois décennies de menuiserie sur mesure transformant les espaces au Liban." },
      { title: "Intérieurs uniques.", sub: "Construits pour durer.", caption: "Chaque détail conçu autour de votre style de vie, vision et espace." },
      { title: "Cuisines sur mesure.", sub: "Artisanat d'exception.", caption: "Du concept à la pose — fabriqué à la main dans notre atelier de Zouk Mosbeh." },
      { title: "Caves à vin.", sub: "Vraiment les vôtres.", caption: "Des caves à vin uniques alliant fonction, beauté et boiserie raffinée." },
      { title: "Espaces de vie.", sub: "Réinventés.", caption: "Nous transformons les pièces ordinaires en environnements extraordinaires." },
      { title: "Mobilier de qualité.", sub: "Caractère durable.", caption: "Bois massifs nobles, choisis pour leur beauté, construits pour les générations." },
    ],
    btn1: "Voir nos réalisations", btn2: "Demander un devis",
    p1title: "Sur Mesure", p1desc: "Chaque pièce est conçue de zéro pour s'adapter à votre espace, votre style de vie et votre vision.",
    p2title: "Matériaux Premium", p2desc: "Nous travaillons avec des bois nobles — chêne massif, noyer, cèdre — sélectionnés pour leur beauté et leur durabilité.",
    p3title: "30 Ans de Maîtrise", p3desc: "Trois décennies d'expertise en menuiserie sur mesure — chaque joint, surface et finition conçu pour durer des générations.",
    aboutEye: "Notre Histoire",
    aboutTitle: "Né d'une passion du bois",
    aboutP1: "Woodline est né d'une conviction : un espace bien conçu change la façon dont on vit. Basés à Zouk Mosbeh, au Liban, nous transformons depuis plus de 30 ans des intérieurs résidentiels et commerciaux avec une menuiserie sur mesure alliant art et fonction.",
    aboutP2: "Chaque projet commence par une écoute attentive. Nous prenons le temps de comprendre votre vision, votre espace et vos habitudes — puis nous concevons, fabriquons et installons des meubles qui semblent avoir toujours été là.",
    stats: [["500+", "Projets réalisés"], ["100%", "Sur mesure"], ["30+", "Ans au Liban"]],
    portEye: "Portfolio", portTitle: "Nos Réalisations", portSub: "Une sélection de menuiseries et meubles sur mesure au Liban.",
    filterAll: "Tous",
    cats: { Architecture: "Architecture", Interior: "Intérieur", Furniture: "Mobilier", Kitchen: "Cuisine", "Wine Cellar": "Cave à vin", Bathroom: "Salle de bain" },
    contactEye: "Contactez-nous", contactTitle: "Votre projet, notre passion",
    contactIntro: "Décrivez-nous votre projet et nous vous répondrons sous 24h avec une première proposition.",
    fields: [
      { key: "name",    label: "Votre Nom" },
      { key: "email",   label: "Email" },
      { key: "phone",   label: "Téléphone (optionnel)" },
      { key: "message", label: "Décrivez votre projet" },
    ],
    send: "Envoyer ma demande", sending: "Envoi…",
    successTxt: "Message envoyé. Nous vous répondrons sous 24h.",
    errorTxt: "Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.",
    footerTag: "Mobilier sur mesure · 30 Ans d'Expertise · Zouk Mosbeh, Liban",
    copy: `© ${new Date().getFullYear()} Woodline. Tous droits réservés.`,
    dir: "ltr",
  },
  ar: {
    nav: ["الرئيسية", "من نحن", "أعمالنا", "اتصل بنا"],
    cta: "طلب عرض سعر",
    heroSlides: [
      { title: "خشب محكم الصنع.", sub: "حياة راقية.", caption: "ثلاثة عقود من النجارة المخصصة تحوّل المساحات في لبنان." },
      { title: "ديكور فريد.", sub: "يدوم للأجيال.", caption: "كل تفصيل مصمم حول أسلوب حياتك ورؤيتك ومساحتك." },
      { title: "مطابخ مخصصة.", sub: "حرفة استثنائية.", caption: "من المفهوم إلى التركيب — مصنوع يدوياً في ورشتنا في سوق مصبح." },
      { title: "أقبية النبيذ.", sub: "حقاً لك.", caption: "غرف نبيذ فريدة تجمع بين الوظيفة والجمال والخشب الفاخر." },
      { title: "مساحات المعيشة.", sub: "معاد تصورها.", caption: "نحوّل الغرف العادية إلى بيئات استثنائية." },
      { title: "أثاث راقٍ.", sub: "طابع دائم.", caption: "أخشاب صلبة نبيلة، مختارة للجمال، مبنية للأجيال." },
    ],
    btn1: "اكتشف أعمالنا", btn2: "طلب عرض سعر",
    p1title: "تصميم خاص", p1desc: "كل قطعة مصممة من الصفر لتناسب مساحتك وأسلوب حياتك ورؤيتك — لا مجال للحلول الجاهزة.",
    p2title: "مواد فاخرة", p2desc: "نعمل مع أخشاب نبيلة — البلوط الصلب والجوز والأرز — مختارة لجمالها ومتانتها.",
    p3title: "٣٠ عاماً من الإتقان", p3desc: "ثلاثة عقود من الخبرة في النجارة المخصصة — كل مفصل وسطح وتشطيب مبني ليدوم للأجيال.",
    aboutEye: "قصتنا",
    aboutTitle: "وُلدنا من شغف بالخشب",
    aboutP1: "تأسست وودلاين على قناعة واحدة: أن المساحة المصممة جيداً تغيّر أسلوب الحياة. انطلاقاً من سوق مصبح في لبنان، نحوّل منذ أكثر من ٣٠ عاماً الديكورات الداخلية السكنية والتجارية بنجارة مخصصة تجمع بين الفن والوظيفة.",
    aboutP2: "كل مشروع يبدأ بالاستماع. نأخذ وقتنا لفهم رؤيتك ومساحتك وعاداتك اليومية — ثم نصمم ونصنع ونركّب أثاثاً يبدو وكأنه كان دائماً في مكانه.",
    stats: [["٥٠٠+", "مشروع منجز"], ["١٠٠٪", "مخصص بالكامل"], ["٣٠+", "عاماً في لبنان"]],
    portEye: "معرض الأعمال", portTitle: "إنجازاتنا", portSub: "مجموعة مختارة من أعمال النجارة والأثاث المخصص في لبنان.",
    filterAll: "الكل",
    cats: { Architecture: "معمار", Interior: "ديكور داخلي", Furniture: "أثاث", Kitchen: "مطبخ", "Wine Cellar": "قبو النبيذ", Bathroom: "حمام" },
    contactEye: "تواصل معنا", contactTitle: "مشروعك، شغفنا",
    contactIntro: "أخبرنا عن مشروعك وسنرد عليك خلال ٢٤ ساعة بأول اقتراح.",
    fields: [
      { key: "name",    label: "اسمك" },
      { key: "email",   label: "البريد الإلكتروني" },
      { key: "phone",   label: "الهاتف (اختياري)" },
      { key: "message", label: "صف مشروعك" },
    ],
    send: "إرسال طلبي", sending: "جارٍ الإرسال…",
    successTxt: "تم إرسال رسالتك. سنرد خلال ٢٤ ساعة.",
    errorTxt: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
    footerTag: "أثاث مخصص · ٣٠ عاماً من الخبرة · سوق مصبح، لبنان",
    copy: `© ${new Date().getFullYear()} Woodline. جميع الحقوق محفوظة.`,
    dir: "rtl",
  },
};

/* ─── SEO ─────────────────────────────────────────────────────────────────── */
const JSON_LD = {
  "@context": "https://schema.org", "@type": "LocalBusiness",
  "name": "Woodline", "alternateName": "Woodline Custom Made Furniture",
  "description": "Custom made furniture and bespoke joinery in Zouk Mosbeh, Lebanon. 30 years of expertise.",
  "url": "https://woodline-custom-made-furniture.vercel.app",
  "telephone": "+9613011175", "email": "fadi-kassabian@hotmail.com",
  "foundingDate": "1994", "priceRange": "$$$$",
  "address": { "@type": "PostalAddress", "streetAddress": "Zouk Mosbeh", "addressLocality": "Zouk Mosbeh", "addressRegion": "Keserwan", "addressCountry": "LB" },
};

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Cormorant:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body { overflow-x: hidden; -webkit-font-smoothing: antialiased; background: #F5F0E8; }

  /* ── Nav ── */
  .nav-wrap {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    transition: background 0.5s ease, box-shadow 0.5s ease, padding 0.4s ease;
    padding: 0;
  }
  .nav-wrap.scrolled {
    background: rgba(245,240,232,0.96);
    backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 rgba(60,45,30,0.08);
  }
  .nav-link {
    font-family: 'Montserrat', sans-serif;
    font-size: 10px; font-weight: 500; letter-spacing: 2.5px;
    text-transform: uppercase; background: none; border: none;
    color: rgba(245,240,232,0.7); transition: color 0.3s;
    position: relative; padding-bottom: 2px;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: #C8A97A; transform: scaleX(0);
    transform-origin: left; transition: transform 0.35s ease;
  }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
  .nav-link:hover { color: rgba(245,240,232,0.95); }
  .nav-link.active { color: rgba(245,240,232,0.95); }
  .nav-wrap.scrolled .nav-link { color: rgba(40,30,20,0.5); }
  .nav-wrap.scrolled .nav-link:hover,
  .nav-wrap.scrolled .nav-link.active { color: #3C2D1E; }
  .nav-wrap.scrolled .nav-link::after { background: #9B6B45; }

  /* ── Hero ── */
  .hero-slide {
    position: absolute; inset: 0; opacity: 0;
    transition: opacity 1.8s cubic-bezier(0.4,0,0.2,1);
  }
  .hero-slide.active { opacity: 1; }
  .hero-slide img {
    width: 100%; height: 100%; object-fit: cover;
    transform: scale(1.04);
    transition: transform 9s ease-out;
  }
  .hero-slide.active img { transform: scale(1); }

  /* ── Hero text ── */
  .hero-tag {
    opacity: 0; transform: translateY(6px);
    transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
  }
  .hero-tag.in { opacity: 1; transform: none; }
  .hero-title-line {
    display: block; overflow: hidden;
  }
  .hero-title-inner {
    display: block;
    transform: translateY(100%);
    transition: transform 1s cubic-bezier(0.16,1,0.3,1);
  }
  .hero-title-inner.in { transform: translateY(0); }
  .hero-sub-line {
    opacity: 0; transform: translateY(8px);
    transition: opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s;
  }
  .hero-sub-line.in { opacity: 1; transform: none; }

  /* ── Buttons ── */
  .btn-dark {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'Montserrat', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    background: #3C2D1E; color: #F5F0E8; border: none;
    padding: 16px 32px; transition: background 0.3s ease;
    text-decoration: none;
  }
  .btn-dark:hover { background: #2A1F13; }
  .btn-outline-light {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'Montserrat', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    background: transparent; color: #F5F0E8;
    border: 1px solid rgba(245,240,232,0.45); padding: 16px 32px;
    transition: background 0.3s, border-color 0.3s;
  }
  .btn-outline-light:hover { background: rgba(245,240,232,0.08); border-color: rgba(245,240,232,0.7); }
  .btn-wood {
    display: inline-flex; align-items: center; gap: 14px;
    font-family: 'Montserrat', sans-serif; font-size: 10px;
    font-weight: 500; letter-spacing: 3px; text-transform: uppercase;
    background: #9B6B45; color: #F5F0E8; border: none;
    padding: 16px 36px; transition: background 0.3s ease;
  }
  .btn-wood:hover { background: #7A5234; }

  /* ── Gallery grid — masonry-like ── */
  .gallery-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3px;
  }
  .gallery-col { display: flex; flex-direction: column; gap: 3px; }
  .gallery-item {
    overflow: hidden; position: relative;
    background: #E8E0D0;
  }
  .gallery-item img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.6s ease;
    filter: brightness(0.95);
  }
  .gallery-item:hover img {
    transform: scale(1.05);
    filter: brightness(1.02);
  }
  .gallery-item-overlay {
    position: absolute; inset: 0;
    background: rgba(30,22,14,0);
    transition: background 0.5s ease;
    display: flex; align-items: flex-end; padding: 28px;
  }
  .gallery-item:hover .gallery-item-overlay { background: rgba(30,22,14,0.35); }
  .gallery-item-label {
    font-family: 'Montserrat', sans-serif; font-size: 9px; letter-spacing: 3px;
    text-transform: uppercase; color: #F5F0E8;
    opacity: 0; transform: translateY(6px);
    transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
  }
  .gallery-item:hover .gallery-item-label { opacity: 1; transform: none; }

  /* ── Filter tabs ── */
  .filter-tab {
    font-family: 'Montserrat', sans-serif; font-size: 9px;
    letter-spacing: 2.5px; text-transform: uppercase; font-weight: 500;
    background: none; border: none; color: rgba(60,45,30,0.35);
    padding: 6px 0; position: relative; transition: color 0.3s;
  }
  .filter-tab::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 1px; background: #9B6B45; transform: scaleX(0);
    transform-origin: left; transition: transform 0.35s ease;
  }
  .filter-tab.active { color: #3C2D1E; }
  .filter-tab.active::after { transform: scaleX(1); }
  .filter-tab:hover { color: #3C2D1E; }

  /* ── Form ── */
  .form-field {
    width: 100%; background: transparent; border: none;
    border-bottom: 1px solid rgba(60,45,30,0.2);
    padding: 14px 0; font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem; color: #3C2D1E; outline: none;
    transition: border-color 0.3s;
    resize: none;
  }
  .form-field::placeholder { color: rgba(60,45,30,0.3); }
  .form-field:focus { border-color: #9B6B45; }
  .form-label {
    font-family: 'Montserrat', sans-serif;
    font-size: 9px; letter-spacing: 2px; text-transform: uppercase;
    color: rgba(60,45,30,0.45); display: block; margin-bottom: 4px;
    transition: color 0.3s;
  }
  .form-group:focus-within .form-label { color: #9B6B45; }

  /* ── Reveal ── */
  .reveal { opacity: 0; transform: translateY(40px); transition: opacity 1s ease, transform 1s ease; }
  .reveal.in { opacity: 1; transform: none; }
  .reveal-left { opacity: 0; transform: translateX(-30px); transition: opacity 1s ease, transform 1s ease; }
  .reveal-left.in { opacity: 1; transform: none; }
  .reveal-right { opacity: 0; transform: translateX(30px); transition: opacity 1s ease, transform 1s ease; }
  .reveal-right.in { opacity: 1; transform: none; }

  /* ── Lightbox ── */
  .lightbox {
    position: fixed; inset: 0; background: rgba(20,15,10,0.97);
    z-index: 9000; display: flex; align-items: center; justify-content: center;
  }
  .lightbox-img { max-width: 86vw; max-height: 86vh; object-fit: contain; }

  /* ── Horizontal scrolling feature bar ── */
  .feature-bar {
    display: flex; gap: 0; overflow: hidden;
  }
  .feature-item {
    flex: 1; padding: 52px 48px; border-right: 1px solid rgba(60,45,30,0.08);
    transition: background 0.4s;
  }
  .feature-item:last-child { border-right: none; }
  .feature-item:hover { background: rgba(155,107,69,0.04); }

  /* ── WhatsApp ── */
  .wa-fab {
    position: fixed; bottom: 32px; right: 32px; z-index: 500;
    width: 52px; height: 52px; border-radius: 50%; background: #25D366; border: none;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 24px rgba(37,211,102,0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease; text-decoration: none;
  }
  .wa-fab:hover { transform: scale(1.08); box-shadow: 0 8px 32px rgba(37,211,102,0.45); }

  /* ── Mobile menu ── */
  .mobile-menu {
    position: fixed; inset: 0; background: #1E160E; z-index: 98;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 2.5rem;
    opacity: 0; pointer-events: none; transition: opacity 0.45s ease;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; }
  .mobile-nav-link {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 7vw, 4rem); font-weight: 300; font-style: italic;
    color: rgba(245,240,232,0.85); background: none; border: none;
    opacity: 0; transform: translateY(18px);
    transition: color 0.3s, opacity 0.5s ease, transform 0.5s ease;
  }
  .mobile-menu.open .mobile-nav-link { opacity: 1; transform: none; }
  .mobile-menu.open .mobile-nav-link:nth-child(1) { transition-delay: 0.1s; }
  .mobile-menu.open .mobile-nav-link:nth-child(2) { transition-delay: 0.17s; }
  .mobile-menu.open .mobile-nav-link:nth-child(3) { transition-delay: 0.24s; }
  .mobile-menu.open .mobile-nav-link:nth-child(4) { transition-delay: 0.31s; }
  .mobile-nav-link:hover { color: #C8A97A; }

  /* ── Hamburger ── */
  .burger { display: none; flex-direction: column; gap: 6px; background: none; border: none; padding: 6px; }
  .burger-line { width: 24px; height: 1px; transition: all 0.35s ease; transform-origin: center; }
  .burger-line-dark { background: #3C2D1E; }
  .burger-line-light { background: #F5F0E8; }
  .burger.open .burger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open .burger-line:nth-child(2) { opacity: 0; }
  .burger.open .burger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* ── Ticker ── */
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .ticker-track { animation: ticker 28s linear infinite; white-space: nowrap; display: flex; }
  .ticker-track:hover { animation-play-state: paused; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: none; }
  }

  @media(max-width: 900px) { .nav-links { display: none !important; } .burger { display: flex !important; } }
  @media(max-width: 768px) {
    .gallery-columns { grid-template-columns: repeat(2, 1fr) !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
    .feature-bar { flex-direction: column; }
    .feature-item { border-right: none; border-bottom: 1px solid rgba(60,45,30,0.08); }
    .contact-split { grid-template-columns: 1fr !important; }
    .stats-row { grid-template-columns: repeat(3,1fr); }
  }
  @media(max-width: 480px) {
    .gallery-columns { grid-template-columns: 1fr !important; }
    .wa-fab { bottom: 20px; right: 20px; }
  }
`;

/* ════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang]         = useState("en");
  const [activeNav, setActiveNav] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter]     = useState("All");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [textIn, setTextIn]     = useState(true);

  const t     = T[lang];
  const isRtl = lang === "ar";
  const sectionIds = ["home", "about", "projects", "contact"];

  /* ── SEO ── */
  useEffect(() => {
    document.documentElement.dir  = t.dir;
    document.documentElement.lang = lang;
    const titles = { en: "Woodline – Custom Made Furniture | Lebanon", fr: "Woodline – Mobilier sur Mesure | Liban", ar: "وودلاين – أثاث مخصص | لبنان" };
    document.title = titles[lang];
    let ld = document.getElementById("ld-json");
    if (!ld) { ld = document.createElement("script"); ld.id = "ld-json"; ld.type = "application/ld+json"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify(JSON_LD);
  }, [lang, t.dir]);

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const offsets = sectionIds.map(id => { const el = document.getElementById(id); return el ? el.getBoundingClientRect().top : 9999; });
      const active = offsets.reduce((best, off, i) => (off <= 140 && off > (offsets[best] ?? -9999) ? i : best), 0);
      setActiveNav(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: 0.1 });
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* ── Hero slideshow ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setTextIn(false);
      setTimeout(() => { setSlideIdx(i => (i + 1) % HERO_SLIDES.length); setTextIn(true); }, 600);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (idx) => {
    setActiveNav(idx); setMenuOpen(false);
    window.history.pushState({ section: idx }, "", "#" + sectionIds[idx]);
    document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSending(true); setError("");
    try {
      const { error: sbError } = await supabase.from("contacts").insert([{ name: formData.name, email: formData.email, phone: formData.phone, message: formData.message }]);
      if (sbError) throw sbError;
      setSent(true); setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 6000);
    } catch { setError(t.errorTxt); } finally { setSending(false); }
  };

  const allCats = ["All", ...new Set(PHOTOS.map(p => p.category))];
  const filtered = filter === "All" ? PHOTOS : PHOTOS.filter(p => p.category === filter);

  // Split into 3 columns for masonry effect
  const col1 = filtered.filter((_, i) => i % 3 === 0);
  const col2 = filtered.filter((_, i) => i % 3 === 1);
  const col3 = filtered.filter((_, i) => i % 3 === 2);

  // Heights for masonry feel — vary by position
  const getH = (idx) => {
    const heights = [420, 320, 520, 380, 460, 300, 440, 360, 480];
    return heights[idx % heights.length];
  };

  const isNavLight = !scrolled;

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#F5F0E8", color: "#3C2D1E", overflowX: "hidden", direction: t.dir }}>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/9613011175?text=Hello%20Woodline%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="WhatsApp">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 28, right: 36, background: "none", border: "none", fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: 3, color: "rgba(245,240,232,0.5)", textTransform: "uppercase", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#F5F0E8"} onMouseLeave={e => e.target.style.color = "rgba(245,240,232,0.5)"}>Close</button>
          <button style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(245,240,232,0.2)", color: "#F5F0E8", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "border-color 0.2s" }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + PHOTOS.length) % PHOTOS.length); }}>‹</button>
          <img className="lightbox-img" src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].alt} onClick={e => e.stopPropagation()} />
          <button style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", background: "none", border: "1px solid rgba(245,240,232,0.2)", color: "#F5F0E8", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "border-color 0.2s" }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % PHOTOS.length); }}>›</button>
          <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 3, color: "rgba(245,240,232,0.3)", textTransform: "uppercase" }}>
            {lightbox + 1} / {PHOTOS.length}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════════════════ */}
      <nav className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? "70px" : "92px", transition: "height 0.4s ease" }}>
          {/* Logo */}
          <button onClick={() => scrollTo(0)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", lineHeight: 1, textAlign: isRtl ? "right" : "left" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: scrolled ? "21px" : "26px", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.06em", color: isNavLight ? "#F5F0E8" : "#3C2D1E", transition: "font-size 0.4s, color 0.5s" }}>Woodline</span>
            <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "7.5px", letterSpacing: "3.5px", color: isNavLight ? "rgba(245,240,232,0.4)" : "rgba(60,45,30,0.35)", textTransform: "uppercase", marginTop: 3, transition: "color 0.5s" }}>Custom Furniture · Lebanon</span>
          </button>

          {/* Nav links */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "3.5rem" }}>
            {t.nav.map((link, i) => (
              <button key={i} className={`nav-link${activeNav === i ? " active" : ""}`} onClick={() => scrollTo(i)}
                style={{ color: isNavLight ? (activeNav === i ? "#F5F0E8" : "rgba(245,240,232,0.6)") : (activeNav === i ? "#3C2D1E" : "rgba(60,45,30,0.45)") }}>
                {link}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            {/* Lang */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["en", "fr", "ar"].map(code => (
                <button key={code} onClick={() => setLang(code)} style={{
                  fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 1.5,
                  textTransform: "uppercase", background: "none", border: "none",
                  color: lang === code
                    ? (isNavLight ? "#F5F0E8" : "#3C2D1E")
                    : (isNavLight ? "rgba(245,240,232,0.35)" : "rgba(60,45,30,0.3)"),
                  borderBottom: lang === code ? `1px solid ${isNavLight ? "#C8A97A" : "#9B6B45"}` : "1px solid transparent",
                  paddingBottom: 1, transition: "all 0.3s", fontWeight: lang === code ? 500 : 400
                }}>{code}</button>
              ))}
            </div>
            {/* CTA */}
            <button className="nav-links btn-dark" onClick={() => scrollTo(3)}
              style={{ padding: "10px 22px", fontSize: "9px", letterSpacing: "2.5px", background: isNavLight ? "rgba(245,240,232,0.12)" : "#3C2D1E", border: isNavLight ? "1px solid rgba(245,240,232,0.3)" : "none", color: "#F5F0E8", transition: "all 0.3s", display: "inline-flex", alignItems: "center", fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase" }}>
              {t.cta}
            </button>
            {/* Burger */}
            <button className={`burger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              <span className={`burger-line ${isNavLight && !menuOpen ? "burger-line-light" : "burger-line-dark"}`} />
              <span className={`burger-line ${isNavLight && !menuOpen ? "burger-line-light" : "burger-line-dark"}`} />
              <span className={`burger-line ${isNavLight && !menuOpen ? "burger-line-light" : "burger-line-dark"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {t.nav.map((link, i) => (
          <button key={i} className="mobile-nav-link" onClick={() => scrollTo(i)}
            style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.07}s` : "0s" }}>{link}</button>
        ))}
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.5rem" }}>
          {["en", "fr", "ar"].map(code => (
            <button key={code} onClick={() => { setLang(code); }} style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", background: "none", border: "none", color: lang === code ? "#C8A97A" : "rgba(245,240,232,0.3)", paddingBottom: 1, borderBottom: lang === code ? "1px solid #C8A97A" : "1px solid transparent" }}>{code}</button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO — full-bleed with editorial text overlay
      ══════════════════════════════════════════════════════ */}
      <section id="home" style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}>
        {HERO_SLIDES.map((photo, i) => (
          <div key={photo.id} className={`hero-slide${i === slideIdx ? " active" : ""}`}>
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}

        {/* Gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(20,14,8,0.68) 0%, rgba(20,14,8,0.25) 65%, rgba(20,14,8,0.05) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,14,8,0.4) 0%, transparent 45%)" }} />

        {/* Eyebrow — top left */}
        <div style={{ position: "absolute", top: 110, left: isRtl ? "auto" : 72, right: isRtl ? 72 : "auto" }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(245,240,232,0.45)", fontWeight: 300 }}>30 {lang === "ar" ? "عاماً من الخبرة" : lang === "fr" ? "Ans d'expertise" : "Years of expertise"} · Zouk Mosbeh</p>
        </div>

        {/* Main content */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: isRtl ? "0 7vw 0 5vw" : "0 5vw 0 7vw", direction: t.dir }}>

          {/* Thin rule */}
          <div style={{ width: 40, height: 1, background: "#C8A97A", marginBottom: "2.5rem", opacity: 0.7 }} />

          {/* Title */}
          <div style={{ marginBottom: "1.25rem" }}>
            <span className="hero-title-line">
              <span className={`hero-title-inner${textIn ? " in" : ""}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3.5rem,7vw,7rem)", fontWeight: 300, color: "#F5F0E8", lineHeight: 1 }}>
                {t.heroSlides[slideIdx].title}
              </span>
            </span>
            <span className="hero-title-line" style={{ display: "block" }}>
              <span className={`hero-title-inner${textIn ? " in" : ""}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(3.5rem,7vw,7rem)", fontWeight: 300, fontStyle: "italic", color: "#C8A97A", lineHeight: 1.05, transitionDelay: "0.12s" }}>
                {t.heroSlides[slideIdx].sub}
              </span>
            </span>
          </div>

          {/* Caption */}
          <p className={`hero-sub-line${textIn ? " in" : ""}`} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1rem,1.4vw,1.2rem)", fontStyle: "italic", color: "rgba(245,240,232,0.55)", maxWidth: 420, lineHeight: 1.75, marginBottom: "3rem" }}>
            {t.heroSlides[slideIdx].caption}
          </p>

          {/* CTAs */}
          <div className={`hero-sub-line${textIn ? " in" : ""}`} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", transitionDelay: "0.8s" }}>
            <button className="btn-dark" onClick={() => scrollTo(2)} style={{ background: "#F5F0E8", color: "#3C2D1E" }}>
              {t.btn1}
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4H13M9 1L13 4L9 7" stroke="#3C2D1E" strokeWidth="0.75"/></svg>
            </button>
            <button className="btn-outline-light" onClick={() => scrollTo(3)}>
              {t.btn2}
            </button>
          </div>
        </div>

        {/* Slide counter — bottom right */}
        <div style={{ position: "absolute", bottom: 44, right: 56, display: "flex", alignItems: "center", gap: 14, zIndex: 3 }}>
          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 42, fontStyle: "italic", color: "rgba(245,240,232,0.12)", lineHeight: 1 }}>
            {String(slideIdx + 1).padStart(2, "0")}
          </span>
          <div style={{ width: 40, height: 1, background: "rgba(245,240,232,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "#C8A97A", transform: `scaleX(${(slideIdx + 1) / HERO_SLIDES.length})`, transformOrigin: "left", transition: "transform 0.5s ease" }} />
          </div>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 3, color: "rgba(245,240,232,0.3)" }}>
            {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Vertical slide indicators */}
        <div style={{ position: "absolute", left: isRtl ? "auto" : 32, right: isRtl ? 32 : "auto", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 10, zIndex: 3 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setTextIn(false); setTimeout(() => { setSlideIdx(i); setTextIn(true); }, 300); }} style={{ width: 1.5, height: i === slideIdx ? 36 : 12, background: i === slideIdx ? "#C8A97A" : "rgba(245,240,232,0.25)", border: "none", transition: "all 0.45s ease", padding: 0 }} />
          ))}
        </div>

        {/* Scroll line */}
        <div style={{ position: "absolute", bottom: 0, left: isRtl ? "auto" : 72, right: isRtl ? 72 : "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, zIndex: 3 }}>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 4, textTransform: "uppercase", color: "rgba(245,240,232,0.3)", writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: 1, height: 60, background: "linear-gradient(to bottom, rgba(245,240,232,0.3), transparent)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TICKER — brand atmosphere strip
      ══════════════════════════════════════════════════════ */}
      <div style={{ background: "#3C2D1E", overflow: "hidden", padding: "14px 0", borderBottom: "1px solid rgba(200,169,122,0.1)" }}>
        <div className="ticker-track">
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "2.5rem", paddingRight: "2.5rem" }}>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(200,169,122,0.6)", whiteSpace: "nowrap" }}>Bespoke Joinery</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(200,169,122,0.25)", display: "inline-block" }} />
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(200,169,122,0.6)", whiteSpace: "nowrap" }}>30 Years of Excellence</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(200,169,122,0.25)", display: "inline-block" }} />
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(200,169,122,0.6)", whiteSpace: "nowrap" }}>Zouk Mosbeh, Lebanon</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(200,169,122,0.25)", display: "inline-block" }} />
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(200,169,122,0.6)", whiteSpace: "nowrap" }}>Custom Made</span>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(200,169,122,0.25)", display: "inline-block" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          FEATURES — 3-column strip
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#F5F0E8", borderBottom: "1px solid rgba(60,45,30,0.07)" }}>
        <div className="feature-bar" style={{ maxWidth: 1440, margin: "0 auto" }}>
          {[
            { num: "01", title: t.p1title, desc: t.p1desc },
            { num: "02", title: t.p2title, desc: t.p2desc },
            { num: "03", title: t.p3title, desc: t.p3desc },
          ].map((v, i) => (
            <div key={i} className="feature-item reveal" style={{ textAlign: isRtl ? "right" : "left" }}>
              <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 3, color: "rgba(155,107,69,0.5)", marginBottom: "1.75rem", fontWeight: 500 }}>{v.num}</div>
              <div style={{ width: 28, height: 1, background: "rgba(155,107,69,0.3)", marginBottom: "1.5rem" }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.3rem,1.8vw,1.6rem)", fontWeight: 400, color: "#3C2D1E", marginBottom: "1rem", fontStyle: "italic", lineHeight: 1.2 }}>{v.title}</h3>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 13, lineHeight: 1.9, color: "rgba(60,45,30,0.5)", fontWeight: 300 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: "#EFEAD8", padding: "9rem 0" }}>
        <div className="about-grid" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem", alignItems: "center" }}>

          {/* Image block */}
          <div className="reveal-left" style={{ position: "relative" }}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src="/photos/wood-beams.jpeg" alt="Woodline workshop" style={{ width: "100%", height: 560, objectFit: "cover", display: "block" }} />
              {/* Floating stat card */}
              <div style={{ position: "absolute", bottom: -28, right: -28, background: "#3C2D1E", padding: "2.5rem 2.25rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3.5rem", fontWeight: 300, color: "#C8A97A", lineHeight: 1 }}>30</div>
                <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginTop: 6 }}>{lang === "ar" ? "عاماً" : lang === "fr" ? "Ans" : "Years"}</div>
              </div>
            </div>
          </div>

          {/* Text block */}
          <div className="reveal-right" style={{ direction: t.dir }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(155,107,69,0.6)", marginBottom: "1.5rem" }}>{t.aboutEye}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, color: "#3C2D1E", lineHeight: 1.2, marginBottom: "2.5rem", fontStyle: "italic" }}>
              {t.aboutTitle}
            </h2>
            <div style={{ width: 40, height: 1, background: "rgba(155,107,69,0.4)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", lineHeight: 1.85, color: "rgba(60,45,30,0.75)", marginBottom: "1.5rem" }}>{t.aboutP1}</p>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", lineHeight: 1.85, color: "rgba(60,45,30,0.6)", marginBottom: "3rem" }}>{t.aboutP2}</p>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(60,45,30,0.1)" }}>
              {t.stats.map(([num, label], i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.25rem", fontWeight: 400, color: "#9B6B45", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(60,45,30,0.4)", marginTop: 6, lineHeight: 1.5 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PORTFOLIO — editorial masonry gallery
      ══════════════════════════════════════════════════════ */}
      <section id="projects" style={{ background: "#F5F0E8", paddingTop: "8rem" }}>

        {/* Header */}
        <div className="reveal" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 4rem 5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(155,107,69,0.6)", marginBottom: "1rem" }}>{t.portEye}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, fontStyle: "italic", color: "#3C2D1E", lineHeight: 1.15 }}>{t.portTitle}</h2>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.05rem", fontStyle: "italic", color: "rgba(60,45,30,0.5)", maxWidth: 360, lineHeight: 1.75 }}>{t.portSub}</p>
        </div>

        {/* Filter bar */}
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 4rem 3.5rem", display: "flex", flexWrap: "wrap", gap: "2.5rem", borderBottom: "1px solid rgba(60,45,30,0.08)" }}>
          {allCats.map(cat => (
            <button key={cat} className={`filter-tab${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>
              {cat === "All" ? t.filterAll : (t.cats[cat] || cat)}
            </button>
          ))}
        </div>

        {/* Masonry columns */}
        <div className="gallery-columns" style={{ maxWidth: 1440, margin: "3px auto 0" }}>
          {[col1, col2, col3].map((col, ci) => (
            <div key={ci} className="gallery-col">
              {col.map((photo, pi) => (
                <div key={photo.id} className="gallery-item" style={{ height: getH(ci * 9 + pi) }} onClick={() => setLightbox(PHOTOS.findIndex(p => p.id === photo.id))}>
                  <img src={photo.src} alt={photo.alt} />
                  <div className="gallery-item-overlay">
                    <span className="gallery-item-label">{t.cats[photo.category] || photo.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section id="contact" style={{ background: "#EFEAD8", padding: "9rem 0 0" }}>
        <div className="contact-split" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8rem", alignItems: "start" }}>

          {/* Left — info */}
          <div className="reveal-left" style={{ direction: t.dir }}>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "rgba(155,107,69,0.6)", marginBottom: "1.5rem" }}>{t.contactEye}</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.2vw,2.75rem)", fontWeight: 300, fontStyle: "italic", color: "#3C2D1E", lineHeight: 1.2, marginBottom: "2.5rem" }}>{t.contactTitle}</h2>
            <div style={{ width: 40, height: 1, background: "rgba(155,107,69,0.4)", marginBottom: "2rem" }} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", lineHeight: 1.85, color: "rgba(60,45,30,0.6)", marginBottom: "3.5rem", fontStyle: "italic" }}>{t.contactIntro}</p>

            {/* Contact details */}
            {[
              { label: lang === "ar" ? "هاتف" : lang === "fr" ? "Téléphone" : "Phone",   value: "+961 3 01 11 75",                      href: "tel:+9613011175" },
              { label: lang === "ar" ? "بريد" : lang === "fr" ? "Email" : "Email",        value: "fadi-kassabian@hotmail.com",              href: "mailto:fadi-kassabian@hotmail.com" },
              { label: lang === "ar" ? "موقع" : lang === "fr" ? "Adresse" : "Location",   value: "Zouk Mosbeh, Keserwan, Lebanon",          href: null },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: "1.75rem" }}>
                <span style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "rgba(60,45,30,0.35)" }}>{label}</span>
                {href
                  ? <a href={href} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: "#3C2D1E", textDecoration: "none", borderBottom: "1px solid rgba(155,107,69,0.25)", paddingBottom: 2, transition: "border-color 0.3s", display: "inline" }}
                    onMouseEnter={e => e.target.style.borderColor = "#9B6B45"} onMouseLeave={e => e.target.style.borderColor = "rgba(155,107,69,0.25)"}>{value}</a>
                  : <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", color: "rgba(60,45,30,0.65)" }}>{value}</span>
                }
              </div>
            ))}

            {/* WhatsApp link */}
            <a href="https://wa.me/9613011175" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", padding: "14px 28px", fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none", marginTop: "0.5rem", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>

          {/* Right — form */}
          <div className="reveal-right" style={{ direction: t.dir }}>
            {sent ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", padding: "5rem 0", textAlign: "center" }}>
                <div style={{ width: 56, height: 56, border: "1px solid #9B6B45", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="14" viewBox="0 0 22 16" fill="none"><path d="M1 8L8 15L21 1" stroke="#9B6B45" strokeWidth="1.25"/></svg>
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontStyle: "italic", color: "rgba(60,45,30,0.7)" }}>{t.successTxt}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {t.fields.slice(0, 3).map(({ key, label }) => (
                  <div key={key} className="form-group">
                    <label className="form-label">{label}</label>
                    <input type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} className="form-field" value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })} required={key !== "phone"} />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">{t.fields[3].label}</label>
                  <textarea className="form-field" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ height: 120 }} required />
                </div>
                {error && <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 11, color: "#b5351e", letterSpacing: 1 }}>{error}</p>}
                <button type="submit" className="btn-wood" disabled={sending} style={{ alignSelf: isRtl ? "flex-end" : "flex-start", opacity: sending ? 0.7 : 1 }}>
                  {sending ? t.sending : t.send}
                  {!sending && <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 4H13M9 1L13 4L9 7" stroke="#F5F0E8" strokeWidth="0.75"/></svg>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer style={{ marginTop: "9rem", borderTop: "1px solid rgba(60,45,30,0.1)", padding: "3.5rem 4rem", background: "#EFEAD8" }}>
          <div style={{ maxWidth: 1440, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", fontStyle: "italic", fontWeight: 400, color: "#3C2D1E", letterSpacing: "0.04em" }}>Woodline</div>
              <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 8, letterSpacing: 3, color: "rgba(60,45,30,0.3)", textTransform: "uppercase", marginTop: 4 }}>{t.footerTag}</p>
            </div>
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
              {t.nav.map((link, i) => (
                <button key={i} onClick={() => scrollTo(i)} style={{ background: "none", border: "none", fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "rgba(60,45,30,0.3)", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#9B6B45"} onMouseLeave={e => e.target.style.color = "rgba(60,45,30,0.3)"}>
                  {link}
                </button>
              ))}
            </div>
            <p style={{ fontFamily: "'Montserrat',sans-serif", fontSize: 9, letterSpacing: 2, color: "rgba(60,45,30,0.25)" }}>{t.copy}</p>
          </div>
        </footer>
      </section>
    </div>
  );
}