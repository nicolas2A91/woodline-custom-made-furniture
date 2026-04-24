import { useState, useEffect, useRef, useCallback } from "react";
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
    nav: ["Home","About","Portfolio","Contact"],
    cta: "Get a Quote",
    eyebrow: "30 Years of Expertise · Zouk Mosbeh, Lebanon",
    heroSlides: [
      { title: ["Crafted wood.", "Elevated living."],      sub: "Three decades of bespoke joinery transforming spaces across Lebanon." },
      { title: ["Bespoke interiors.", "Built to last."],   sub: "Every detail designed around your lifestyle, vision, and space." },
      { title: ["Custom kitchens.", "Exceptional craft."], sub: "From concept to installation — handcrafted in our Zouk Mosbeh workshop." },
      { title: ["Wine cellars.", "Truly yours."],          sub: "Bespoke wine rooms that combine function, beauty and fine woodwork." },
      { title: ["Living spaces.", "Reimagined."],          sub: "We turn ordinary rooms into extraordinary environments." },
      { title: ["Fine furniture.", "Lasting character."],  sub: "Solid hardwoods, selected for beauty, built for generations." },
    ],
    btn1: "View Our Work", btn2: "Request a Quote",
    p1title: "Bespoke Design",    p1desc: "Every piece is designed from scratch to suit your space, lifestyle, and vision — no off-the-shelf compromises.",
    p2title: "Premium Materials", p2desc: "We work with fine-grain hardwoods — solid oak, walnut, cedar — selected for beauty and longevity.",
    p3title: "30 Years of Mastery", p3desc: "Three decades of expertise in bespoke joinery — every joint, surface, and finish built to last generations.",
    aboutEye: "Our Story", aboutTitle: ["Born from a", "passion for wood"],
    aboutP1: "Woodline was founded on a single belief: that a well-crafted space changes how you live. Based in Zouk Mosbeh, Lebanon, we have spent over 30 years transforming residential and commercial interiors with bespoke joinery that balances artistry with function.",
    aboutP2: "Every project begins with listening. We take time to understand your vision, your space, and your daily rhythms — then we design, build, and install furniture that feels like it was always meant to be there.",
    stats: [["500+","Projects completed"],["100%","Custom-made"],["30+","Years in Lebanon"]],
    badgeTxt: "Years of expertise",
    portEye: "Portfolio", portTitle: "Our Realizations", portSub: "A selection of bespoke joinery and custom furniture across Lebanon.",
    filterAll: "All",
    cats: { Architecture:"Architecture", Interior:"Interior", Furniture:"Furniture", Kitchen:"Kitchen", "Wine Cellar":"Wine Cellar", Bathroom:"Bathroom" },
    testimonials: [
      { name: "Maya K.", location: "Beirut", text: "Woodline transformed our entire ground floor. The attention to detail is extraordinary — every joint, every finish, simply perfect." },
      { name: "Georges S.", location: "Jounieh", text: "Our wine cellar is now the centrepiece of our home. Quality that exceeds everything we imagined. Highly recommended." },
      { name: "Lara M.", location: "Zouk Mikael", text: "From the first meeting to final installation, the team was professional, punctual and passionate. The kitchen is a dream." },
    ],
    testimonialEye: "What Our Clients Say", testimonialTitle: "Trusted by Families Across Lebanon",
    contactEye: "Get in Touch", contactTitle: ["Your project,","our passion"],
    contactIntro: "Tell us about your project and we'll get back to you within 24 hours with a first proposal.",
    fields: [
      { key:"name",    label:"Your Name"            },
      { key:"email",   label:"Email Address"         },
      { key:"phone",   label:"Phone (optional)"      },
      { key:"message", label:"Describe Your Project" },
    ],
    send: "Send My Request", sending: "Sending…",
    successTxt: "Message sent! We'll reply within 24 hours.",
    errorTxt: "Something went wrong. Please try again or call us directly.",
    footerTag: "Custom Made Furniture · 30 Years of Expertise · Zouk Mosbeh, Lebanon",
    copy: `© ${new Date().getFullYear()} Woodline. All rights reserved.`,
    dir: "ltr",
  },
  fr: {
    nav: ["Accueil","À propos","Réalisations","Contact"],
    cta: "Devis Gratuit",
    eyebrow: "30 Ans d'Expertise · Zouk Mosbeh, Liban",
    heroSlides: [
      { title: ["Bois façonné.", "Art de vivre."],               sub: "Trois décennies de menuiserie sur mesure transformant les espaces au Liban." },
      { title: ["Intérieurs uniques.", "Construits pour durer."], sub: "Chaque détail conçu autour de votre style de vie, vision et espace." },
      { title: ["Cuisines sur mesure.", "Artisanat d'exception."],sub: "Du concept à la pose — fabriqué à la main dans notre atelier de Zouk Mosbeh." },
      { title: ["Caves à vin.", "Vraiment les vôtres."],          sub: "Des caves à vin uniques alliant fonction, beauté et boiserie raffinée." },
      { title: ["Espaces de vie.", "Réinventés."],                sub: "Nous transformons les pièces ordinaires en environnements extraordinaires." },
      { title: ["Mobilier de qualité.", "Caractère durable."],    sub: "Bois massifs nobles, choisis pour leur beauté, construits pour les générations." },
    ],
    btn1: "Voir nos réalisations", btn2: "Demander un devis",
    p1title: "Sur Mesure",        p1desc: "Chaque pièce est conçue de zéro pour s'adapter à votre espace, votre style de vie et votre vision.",
    p2title: "Matériaux Premium", p2desc: "Nous travaillons avec des bois nobles — chêne massif, noyer, cèdre — sélectionnés pour leur beauté et leur durabilité.",
    p3title: "30 Ans de Maîtrise",p3desc: "Trois décennies d'expertise en menuiserie sur mesure — chaque joint, surface et finition conçu pour durer des générations.",
    aboutEye: "Notre Histoire", aboutTitle: ["Né d'une", "passion du bois"],
    aboutP1: "Woodline est né d'une conviction : un espace bien conçu change la façon dont on vit. Basés à Zouk Mosbeh, au Liban, nous transformons depuis plus de 30 ans des intérieurs résidentiels et commerciaux avec une menuiserie sur mesure alliant art et fonction.",
    aboutP2: "Chaque projet commence par une écoute attentive. Nous prenons le temps de comprendre votre vision, votre espace et vos habitudes — puis nous concevons, fabriquons et installons des meubles qui semblent avoir toujours été là.",
    stats: [["500+","Projets réalisés"],["100%","Sur mesure"],["30+","Ans au Liban"]],
    badgeTxt: "Ans d'expertise",
    portEye: "Portfolio", portTitle: "Nos Réalisations", portSub: "Une sélection de menuiseries et meubles sur mesure au Liban.",
    filterAll: "Tous",
    cats: { Architecture:"Architecture", Interior:"Intérieur", Furniture:"Mobilier", Kitchen:"Cuisine", "Wine Cellar":"Cave à vin", Bathroom:"Salle de bain" },
    testimonials: [
      { name: "Maya K.", location: "Beyrouth", text: "Woodline a transformé tout notre rez-de-chaussée. L'attention aux détails est extraordinaire — chaque joint, chaque finition, simplement parfait." },
      { name: "Georges S.", location: "Jounieh", text: "Notre cave à vin est maintenant la pièce maîtresse de notre maison. Une qualité qui dépasse tout ce que nous avions imaginé. Vivement recommandé." },
      { name: "Lara M.", location: "Zouk Mikael", text: "Du premier rendez-vous à la pose finale, l'équipe a été professionnelle, ponctuelle et passionnée. La cuisine est un rêve." },
    ],
    testimonialEye: "Ce que disent nos clients", testimonialTitle: "La confiance de familles dans tout le Liban",
    contactEye: "Contactez-nous", contactTitle: ["Votre projet,","notre passion"],
    contactIntro: "Décrivez-nous votre projet et nous vous répondrons sous 24h avec une première proposition.",
    fields: [
      { key:"name",    label:"Votre Nom"             },
      { key:"email",   label:"Email"                  },
      { key:"phone",   label:"Téléphone (optionnel)"  },
      { key:"message", label:"Décrivez votre projet"  },
    ],
    send: "Envoyer ma demande", sending: "Envoi…",
    successTxt: "Message envoyé ! Nous vous répondrons sous 24h.",
    errorTxt: "Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.",
    footerTag: "Mobilier sur mesure · 30 Ans d'Expertise · Zouk Mosbeh, Liban",
    copy: `© ${new Date().getFullYear()} Woodline. Tous droits réservés.`,
    dir: "ltr",
  },
  ar: {
    nav: ["الرئيسية","من نحن","أعمالنا","اتصل بنا"],
    cta: "طلب عرض سعر",
    eyebrow: "٣٠ عاماً من الخبرة · سوق مصبح، لبنان",
    heroSlides: [
      { title: ["خشب محكم الصنع.", "حياة راقية."],        sub: "ثلاثة عقود من النجارة المخصصة تحوّل المساحات في لبنان." },
      { title: ["ديكور فريد.", "يدوم للأجيال."],          sub: "كل تفصيل مصمم حول أسلوب حياتك ورؤيتك ومساحتك." },
      { title: ["مطابخ مخصصة.", "حرفة استثنائية."],       sub: "من المفهوم إلى التركيب — مصنوع يدوياً في ورشتنا في سوق مصبح." },
      { title: ["أقبية النبيذ.", "حقاً لك."],             sub: "غرف نبيذ فريدة تجمع بين الوظيفة والجمال والخشب الفاخر." },
      { title: ["مساحات المعيشة.", "معاد تصورها."],       sub: "نحوّل الغرف العادية إلى بيئات استثنائية." },
      { title: ["أثاث راقٍ.", "طابع دائم."],              sub: "أخشاب صلبة نبيلة، مختارة للجمال، مبنية للأجيال." },
    ],
    btn1: "اكتشف أعمالنا", btn2: "طلب عرض سعر",
    p1title: "تصميم خاص",          p1desc: "كل قطعة مصممة من الصفر لتناسب مساحتك وأسلوب حياتك ورؤيتك — لا مجال للحلول الجاهزة.",
    p2title: "مواد فاخرة",         p2desc: "نعمل مع أخشاب نبيلة — البلوط الصلب والجوز والأرز — مختارة لجمالها ومتانتها.",
    p3title: "٣٠ عاماً من الإتقان",p3desc: "ثلاثة عقود من الخبرة في النجارة المخصصة — كل مفصل وسطح وتشطيب مبني ليدوم للأجيال.",
    aboutEye: "قصتنا", aboutTitle: ["وُلدنا من", "شغف بالخشب"],
    aboutP1: "تأسست وودلاين على قناعة واحدة: أن المساحة المصممة جيداً تغيّر أسلوب الحياة. انطلاقاً من سوق مصبح في لبنان، نحوّل منذ أكثر من ٣٠ عاماً الديكورات الداخلية السكنية والتجارية بنجارة مخصصة تجمع بين الفن والوظيفة.",
    aboutP2: "كل مشروع يبدأ بالاستماع. نأخذ وقتنا لفهم رؤيتك ومساحتك وعاداتك اليومية — ثم نصمم ونصنع ونركّب أثاثاً يبدو وكأنه كان دائماً في مكانه.",
    stats: [["٥٠٠+","مشروع منجز"],["١٠٠٪","مخصص بالكامل"],["٣٠+","عاماً في لبنان"]],
    badgeTxt: "عاماً من الخبرة",
    portEye: "معرض الأعمال", portTitle: "إنجازاتنا", portSub: "مجموعة مختارة من أعمال النجارة والأثاث المخصص في لبنان.",
    filterAll: "الكل",
    cats: { Architecture:"معمار", Interior:"ديكور داخلي", Furniture:"أثاث", Kitchen:"مطبخ", "Wine Cellar":"قبو النبيذ", Bathroom:"حمام" },
    testimonials: [
      { name: "مايا ك.", location: "بيروت", text: "حوّل وودلاين طابقنا الأرضي بالكامل. الاهتمام بالتفاصيل استثنائي — كل مفصل، كل تشطيب، مثالي تماماً." },
      { name: "جورج س.", location: "جونية", text: "قبو النبيذ لدينا هو الآن محور منزلنا. جودة تفوق كل ما توقعناه. موصى به بشدة." },
      { name: "لارا م.", location: "زوق مكايل", text: "من الاجتماع الأول حتى التركيب النهائي، كان الفريق محترفاً ودقيقاً ومتحمساً. المطبخ حلم." },
    ],
    testimonialEye: "ما يقوله عملاؤنا", testimonialTitle: "ثقة عائلات في كل أنحاء لبنان",
    contactEye: "تواصل معنا", contactTitle: ["مشروعك،","شغفنا"],
    contactIntro: "أخبرنا عن مشروعك وسنرد عليك خلال ٢٤ ساعة بأول اقتراح.",
    fields: [
      { key:"name",    label:"اسمك"                  },
      { key:"email",   label:"البريد الإلكتروني"     },
      { key:"phone",   label:"الهاتف (اختياري)"      },
      { key:"message", label:"صف مشروعك"             },
    ],
    send: "إرسال طلبي", sending: "جارٍ الإرسال…",
    successTxt: "تم إرسال رسالتك! سنرد خلال ٢٤ ساعة.",
    errorTxt: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
    footerTag: "أثاث مخصص · ٣٠ عاماً من الخبرة · سوق مصبح، لبنان",
    copy: `© ${new Date().getFullYear()} Woodline. جميع الحقوق محفوظة.`,
    dir: "rtl",
  },
};

/* ─── SEO ─────────────────────────────────────────────────────────────────── */
const JSON_LD = {
  "@context": "https://schema.org", "@type": "LocalBusiness",
  "@id": "https://woodline-custom-made-furniture.vercel.app/#business",
  "name": "Woodline", "alternateName": "Woodline Custom Made Furniture",
  "description": "Custom made furniture and bespoke joinery in Zouk Mosbeh, Lebanon. 30 years of expertise.",
  "url": "https://woodline-custom-made-furniture.vercel.app",
  "telephone": "+9613011175", "email": "fadi-kassabian@hotmail.com",
  "foundingDate": "1994", "priceRange": "$$$$",
  "address": { "@type": "PostalAddress", "streetAddress": "Zouk Mosbeh", "addressLocality": "Zouk Mosbeh", "addressRegion": "Keserwan", "addressCountry": "LB" },
};

/* ─── PALETTE ─────────────────────────────────────────────────────────────── */
const C = {
  cream:      "#F7F0E6",
  creamLight: "#FAF5EE",
  creamDark:  "#EDE3D5",
  ink:        "#17120D",
  inkSoft:    "#2C231A",
  wood:       "#9B6B45",
  woodLight:  "#B8845E",
  woodMuted:  "#7A5234",
  sand:       "#C8A97A",
  sandLight:  "#DEC89A",
  fog:        "#8A7868",
};

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; font-size:16px; }
  body { overflow-x:hidden; -webkit-font-smoothing:antialiased; }

  /* ── Cursor ── */
  * { cursor: none !important; }
  .cursor-dot {
    position: fixed; top:0; left:0; width:8px; height:8px;
    background: ${C.wood}; border-radius:50%; pointer-events:none;
    z-index:9999; transform:translate(-50%,-50%);
    transition: transform 0.08s ease, opacity 0.2s;
    mix-blend-mode: multiply;
  }
  .cursor-ring {
    position: fixed; top:0; left:0; width:36px; height:36px;
    border: 1px solid ${C.wood}; border-radius:50%; pointer-events:none;
    z-index:9998; transform:translate(-50%,-50%);
    transition: transform 0.18s ease, width 0.25s ease, height 0.25s ease, opacity 0.2s, border-color 0.2s;
    opacity: 0.6;
  }
  .cursor-ring.hover { width:64px; height:64px; opacity:1; border-color:${C.sand}; }

  /* ── Noise overlay ── */
  body::after {
    content:''; position:fixed; inset:0; pointer-events:none; z-index:1000;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  /* ── Nav ── */
  .nav-wrap {
    position:fixed; top:0; left:0; right:0; z-index:100;
    transition: background 0.5s ease, backdrop-filter 0.5s ease, padding 0.4s ease;
  }
  .nav-wrap.scrolled {
    background: rgba(247,240,230,0.88);
    backdrop-filter: blur(18px) saturate(1.4);
    -webkit-backdrop-filter: blur(18px) saturate(1.4);
    box-shadow: 0 1px 0 rgba(155,107,69,0.12);
  }
  .nav-link {
    font-family: 'Jost', sans-serif; font-size:11px; letter-spacing:2.5px;
    text-transform:uppercase; color:${C.fog}; text-decoration:none;
    background:none; border:none; cursor:pointer; font-weight:400;
    padding: 6px 0; position:relative; transition: color 0.3s;
  }
  .nav-link::after {
    content:''; position:absolute; bottom:-2px; left:0; right:0; height:1px;
    background:${C.wood}; transform:scaleX(0); transform-origin:left;
    transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-link:hover, .nav-link.active { color:${C.wood}; }
  .nav-link:hover::after, .nav-link.active::after { transform:scaleX(1); }

  /* ── CTA button ── */
  .btn-primary {
    display:inline-flex; align-items:center; gap:10px;
    font-family:'Jost',sans-serif; font-size:11px; letter-spacing:3px; font-weight:400;
    text-transform:uppercase; background:${C.ink}; color:${C.cream};
    padding:14px 32px; border:none; cursor:pointer;
    position:relative; overflow:hidden; transition:color 0.4s;
  }
  .btn-primary::before {
    content:''; position:absolute; inset:0;
    background:${C.wood}; transform:scaleX(0); transform-origin:left;
    transition:transform 0.45s cubic-bezier(0.4,0,0.2,1);
  }
  .btn-primary:hover::before { transform:scaleX(1); }
  .btn-primary span { position:relative; z-index:1; }

  .btn-ghost {
    display:inline-flex; align-items:center; gap:10px;
    font-family:'Jost',sans-serif; font-size:11px; letter-spacing:3px; font-weight:400;
    text-transform:uppercase; background:transparent; color:${C.cream};
    padding:13px 31px; border:1px solid rgba(247,240,230,0.4); cursor:pointer;
    transition:border-color 0.3s, color 0.3s;
  }
  .btn-ghost:hover { border-color:${C.cream}; }

  /* ── Hero ── */
  .hero-slide { position:absolute; inset:0; opacity:0; transition:opacity 1.6s cubic-bezier(0.4,0,0.2,1); }
  .hero-slide img { width:100%; height:100%; object-fit:cover; transform:scale(1.06); transition:transform 9s ease-out; }
  .hero-slide.active { opacity:1; }
  .hero-slide.active img { transform:scale(1); }

  /* ── Hero text animation ── */
  .hero-headline { overflow:hidden; }
  .hero-line { display:block; transform:translateY(100%); opacity:0; transition:transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease; }
  .hero-line.visible { transform:translateY(0); opacity:1; }
  .hero-sub { opacity:0; transform:translateY(16px); transition:opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s; }
  .hero-sub.visible { opacity:1; transform:none; }
  .hero-btns { opacity:0; transform:translateY(16px); transition:opacity 0.8s ease 0.95s, transform 0.8s ease 0.95s; }
  .hero-btns.visible { opacity:1; transform:none; }

  /* ── Slide indicator ── */
  .slide-track {
    position:absolute; bottom:0; left:0; right:0; height:2px;
    background:rgba(247,240,230,0.15);
  }
  .slide-progress {
    height:100%; background:${C.sand}; transform-origin:left;
    transition:transform 0.3s ease;
  }

  /* ── Pillars ── */
  .pillar {
    padding:4rem 3rem; border-right:1px solid rgba(155,107,69,0.12);
    transition:background 0.4s;
  }
  .pillar:last-child { border-right:none; }
  .pillar:hover { background:rgba(155,107,69,0.04); }
  .pillar-num {
    font-family:'Playfair Display',serif; font-size:56px; font-weight:400;
    color:rgba(155,107,69,0.15); line-height:1; margin-bottom:1.5rem;
    font-style:italic;
  }

  /* ── About ── */
  .about-img-wrap { position:relative; overflow:hidden; }
  .about-img-wrap img { width:100%; height:580px; object-fit:cover; display:block; transition:transform 0.8s ease; }
  .about-img-wrap:hover img { transform:scale(1.04); }

  /* ── Portfolio grid ── */
  .grid-item { position:relative; overflow:hidden; cursor:pointer; }
  .grid-item img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.7s cubic-bezier(0.4,0,0.2,1); }
  .grid-item:hover img { transform:scale(1.07); }
  .grid-overlay { position:absolute; inset:0; background:rgba(23,18,13,0); transition:background 0.4s; display:flex; flex-direction:column; justify-content:flex-end; padding:1.75rem; }
  .grid-item:hover .grid-overlay { background:rgba(23,18,13,0.55); }
  .grid-cat { font-family:'Jost',sans-serif; font-size:10px; letter-spacing:3px; text-transform:uppercase; color:${C.sand}; opacity:0; transform:translateY(8px); transition:opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s; }
  .grid-item:hover .grid-cat { opacity:1; transform:none; }
  .grid-view { position:absolute; top:20px; right:20px; font-size:11px; letter-spacing:2px; color:${C.cream}; opacity:0; font-family:'Jost',sans-serif; transition:opacity 0.3s; text-transform:uppercase; }
  .grid-item:hover .grid-view { opacity:1; }

  /* ── Filter tabs ── */
  .filter-tab {
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:2.5px; text-transform:uppercase;
    background:none; border:none; color:${C.fog}; cursor:pointer; padding:8px 0;
    position:relative; transition:color 0.3s; font-weight:400;
  }
  .filter-tab::after {
    content:''; position:absolute; bottom:0; left:0; right:0; height:1px;
    background:${C.wood}; transform:scaleX(0); transition:transform 0.35s ease;
  }
  .filter-tab.active { color:${C.ink}; }
  .filter-tab.active::after { transform:scaleX(1); }
  .filter-tab:hover { color:${C.wood}; }

  /* ── Testimonials ── */
  .testi-card {
    padding:3rem; background:white;
    border:1px solid rgba(155,107,69,0.1);
    transition:transform 0.35s ease, box-shadow 0.35s ease;
  }
  .testi-card:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(23,18,13,0.09); }

  /* ── Contact ── */
  .form-field {
    border:none; border-bottom:1px solid rgba(155,107,69,0.25); background:transparent;
    padding:14px 0; font-family:'EB Garamond',serif; font-size:17px; color:${C.ink};
    width:100%; outline:none; transition:border-color 0.3s;
  }
  .form-field:focus { border-color:${C.wood}; }
  .form-field::placeholder { color:rgba(138,120,104,0.5); font-style:italic; }
  .form-label {
    font-family:'Jost',sans-serif; font-size:10px; letter-spacing:2.5px; text-transform:uppercase;
    color:${C.fog}; margin-bottom:6px; display:block; transition:color 0.3s;
  }
  .form-group:focus-within .form-label { color:${C.wood}; }

  /* ── Reveal ── */
  .reveal { opacity:0; transform:translateY(32px); transition:opacity 0.9s ease, transform 0.9s ease; }
  .reveal.in { opacity:1; transform:none; }
  .reveal-left { opacity:0; transform:translateX(-32px); transition:opacity 0.9s ease, transform 0.9s ease; }
  .reveal-left.in { opacity:1; transform:none; }
  .reveal-right { opacity:0; transform:translateX(32px); transition:opacity 0.9s ease, transform 0.9s ease; }
  .reveal-right.in { opacity:1; transform:none; }

  /* ── WhatsApp ── */
  .wa-fab {
    position:fixed; bottom:32px; right:32px; z-index:500;
    width:52px; height:52px; border-radius:50%; background:#25D366; border:none;
    display:flex; align-items:center; justify-content:center;
    box-shadow:0 4px 24px rgba(37,211,102,0.35);
    transition:transform 0.25s ease, box-shadow 0.25s ease; text-decoration:none;
  }
  .wa-fab:hover { transform:scale(1.1); box-shadow:0 6px 30px rgba(37,211,102,0.5); }

  /* ── Lightbox ── */
  .lightbox { position:fixed; inset:0; background:rgba(23,18,13,0.97); z-index:9000; display:flex; align-items:center; justify-content:center; }
  .lightbox-img { max-width:88vw; max-height:84vh; object-fit:contain; }
  .lightbox-close { position:absolute; top:24px; right:28px; background:none; border:none; color:rgba(247,240,230,0.5); font-size:24px; font-family:'Jost',sans-serif; letter-spacing:1px; transition:color 0.2s; }
  .lightbox-close:hover { color:${C.cream}; }
  .lightbox-nav { background:none; border:1px solid rgba(247,240,230,0.18); color:${C.cream}; width:48px; height:48px; display:flex; align-items:center; justify-content:center; transition:border-color 0.2s, background 0.2s; }
  .lightbox-nav:hover { background:rgba(155,107,69,0.3); border-color:${C.wood}; }

  /* ── Divider line ── */
  .line-divider { width:48px; height:1px; background:${C.sand}; }

  /* ── Mobile menu ── */
  .mobile-menu {
    position:fixed; inset:0; background:${C.ink}; z-index:98; display:flex; flex-direction:column;
    align-items:center; justify-content:center; gap:3rem;
    opacity:0; pointer-events:none; transition:opacity 0.4s ease;
  }
  .mobile-menu.open { opacity:1; pointer-events:all; }
  .mobile-nav-link {
    font-family:'Playfair Display',serif; font-size:clamp(2rem,6vw,3.5rem);
    color:${C.cream}; font-style:italic; font-weight:400;
    background:none; border:none; cursor:pointer; transition:color 0.3s;
    opacity:0; transform:translateY(20px); transition:color 0.3s, opacity 0.5s ease, transform 0.5s ease;
  }
  .mobile-menu.open .mobile-nav-link { opacity:1; transform:none; }
  .mobile-menu.open .mobile-nav-link:nth-child(1) { transition-delay:0.1s; }
  .mobile-menu.open .mobile-nav-link:nth-child(2) { transition-delay:0.18s; }
  .mobile-menu.open .mobile-nav-link:nth-child(3) { transition-delay:0.26s; }
  .mobile-menu.open .mobile-nav-link:nth-child(4) { transition-delay:0.34s; }
  .mobile-nav-link:hover { color:${C.sand}; }

  /* ── Hamburger ── */
  .burger { display:none; flex-direction:column; gap:5px; background:none; border:none; padding:6px; }
  .burger-line { width:22px; height:1px; background:${C.ink}; transition:all 0.35s ease; transform-origin:center; }
  .burger.open .burger-line:nth-child(1) { transform:translateY(6px) rotate(45deg); background:${C.cream}; }
  .burger.burger.open .burger-line:nth-child(2) { opacity:0; }
  .burger.open .burger-line:nth-child(3) { transform:translateY(-6px) rotate(-45deg); background:${C.cream}; }

  @media(max-width:900px){ .nav-links{display:none!important} .burger{display:flex!important} }
  @media(max-width:768px){
    .about-grid{grid-template-columns:1fr!important; gap:3rem!important}
    .pillars-grid{grid-template-columns:1fr!important}
    .pillars-grid .pillar{border-right:none!important; border-bottom:1px solid rgba(155,107,69,0.1)}
    .contact-split{grid-template-columns:1fr!important}
    .testi-grid{grid-template-columns:1fr!important}
    .grid-masonry{grid-template-columns:1fr 1fr!important}
  }
  @media(max-width:480px){
    .grid-masonry{grid-template-columns:1fr!important}
    .wa-fab{bottom:20px;right:20px}
    .cursor-dot, .cursor-ring{display:none}
  }
`;

/* ═════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [lang, setLang]       = useState("en");
  const [activeNav, setActiveNav] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter]   = useState("All");
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", message:"" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError]     = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const cursorDot  = useRef(null);
  const cursorRing = useRef(null);
  const t     = T[lang];
  const isRtl = lang === "ar";
  const sectionIds = ["home","about","projects","contact"];

  /* ── Custom cursor ── */
  useEffect(() => {
    const move = (e) => {
      if (cursorDot.current)  { cursorDot.current.style.left  = e.clientX + "px"; cursorDot.current.style.top  = e.clientY + "px"; }
      if (cursorRing.current) { cursorRing.current.style.left = e.clientX + "px"; cursorRing.current.style.top = e.clientY + "px"; }
    };
    const over = (e) => {
      const el = e.target.closest("a,button,.grid-item");
      if (el && cursorRing.current) cursorRing.current.classList.add("hover");
    };
    const out = () => { if (cursorRing.current) cursorRing.current.classList.remove("hover"); };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);

  /* ── SEO ── */
  useEffect(() => {
    document.documentElement.dir  = t.dir;
    document.documentElement.lang = lang;
    const titles = { en:"Woodline – Custom Made Furniture | Lebanon", fr:"Woodline – Mobilier sur Mesure | Liban", ar:"وودلاين – أثاث مخصص | لبنان" };
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
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Reveal ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold:0.1 });
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* ── Hero slideshow ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => { setSlideIdx(i => (i + 1) % HERO_SLIDES.length); setTextVisible(true); }, 300);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (idx) => {
    setActiveNav(idx); setMenuOpen(false);
    window.history.pushState({ section:idx }, "", "#" + sectionIds[idx]);
    document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior:"smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSending(true); setError("");
    try {
      const { error: sbError } = await supabase.from("contacts").insert([{ name:formData.name, email:formData.email, phone:formData.phone, message:formData.message }]);
      if (sbError) throw sbError;
      setSent(true); setFormData({ name:"", email:"", phone:"", message:"" });
      setTimeout(() => setSent(false), 6000);
    } catch { setError(t.errorTxt); } finally { setSending(false); }
  };

  const allCats = ["All", ...new Set(PHOTOS.map(p => p.category))];
  const filtered = filter === "All" ? PHOTOS : PHOTOS.filter(p => p.category === filter);

  /* ── Masonry-like heights ── */
  const heights = [360, 280, 320, 300, 360, 280, 320, 300, 360, 280, 320, 300, 360, 280, 320, 300, 360, 280, 320, 300, 360, 280, 320, 300, 360];

  return (
    <div style={{ fontFamily:"'EB Garamond',Georgia,serif", background:C.creamLight, color:C.ink, overflowX:"hidden", direction:t.dir }}>
      <style>{css}</style>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ── Custom cursor ── */}
      <div className="cursor-dot" ref={cursorDot} />
      <div className="cursor-ring" ref={cursorRing} />

      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/9613011175?text=Hello%20Woodline%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="WhatsApp">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:3 }}>CLOSE</span>
          </button>
          <button className="lightbox-nav" style={{ position:"absolute", left:24, top:"50%", transform:"translateY(-50%)" }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + PHOTOS.length) % PHOTOS.length); }}>
            ←
          </button>
          <img className="lightbox-img" src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].alt} onClick={e => e.stopPropagation()} />
          <button className="lightbox-nav" style={{ position:"absolute", right:24, top:"50%", transform:"translateY(-50%)" }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % PHOTOS.length); }}>
            →
          </button>
          <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:3, color:"rgba(247,240,230,0.35)", textTransform:"uppercase" }}>
            {lightbox + 1} / {PHOTOS.length}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          NAVIGATION
      ══════════════════════════════════════════════════════ */}
      <nav className={`nav-wrap${scrolled ? " scrolled" : ""}`}>
        <div style={{ maxWidth:1400, margin:"0 auto", padding: scrolled ? "0 3rem" : "0 3rem", display:"flex", alignItems:"center", justifyContent:"space-between", height: scrolled ? "68px" : "88px", transition:"height 0.4s ease" }}>
          {/* Logo */}
          <button onClick={() => scrollTo(0)} style={{ background:"none", border:"none", display:"flex", flexDirection:"column", lineHeight:1 }}>
            <span style={{ fontFamily:"'Playfair Display',serif", fontSize: scrolled ? "22px" : "26px", fontWeight:500, color:C.ink, letterSpacing:"0.05em", transition:"font-size 0.4s", fontStyle:"italic" }}>Woodline</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:"8px", letterSpacing:"4px", color:C.fog, textTransform:"uppercase", marginTop:2, fontWeight:400 }}>Custom Furniture · Lebanon</span>
          </button>

          {/* Nav links */}
          <div className="nav-links" style={{ display:"flex", alignItems:"center", gap:"3rem" }}>
            {t.nav.map((link, i) => (
              <button key={i} className={`nav-link${activeNav === i ? " active" : ""}`} onClick={() => scrollTo(i)}>{link}</button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            {/* Lang switcher */}
            <div style={{ display:"flex", gap:"0.5rem" }}>
              {["en","fr","ar"].map(code => (
                <button key={code} onClick={() => setLang(code)} style={{
                  fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:1.5,
                  textTransform:"uppercase", background:"none", border:"none",
                  color: lang === code ? C.wood : C.fog, fontWeight: lang === code ? 500 : 400,
                  borderBottom: lang === code ? `1px solid ${C.wood}` : "1px solid transparent",
                  paddingBottom:1, transition:"all 0.2s"
                }}>{code}</button>
              ))}
            </div>
            {/* CTA */}
            <button className="btn-primary nav-links" onClick={() => scrollTo(3)} style={{ padding:"11px 24px", fontSize:"10px", letterSpacing:"2.5px" }}>
              <span>{t.cta}</span>
            </button>
            {/* Burger */}
            <button className={`burger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              <span className="burger-line" />
              <span className="burger-line" />
              <span className="burger-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {t.nav.map((link, i) => (
          <button key={i} className="mobile-nav-link" onClick={() => scrollTo(i)} style={{ transitionDelay: menuOpen ? `${0.1 + i * 0.08}s` : "0s" }}>{link}</button>
        ))}
        <div style={{ display:"flex", gap:"1.5rem", marginTop:"1rem" }}>
          {["en","fr","ar"].map(code => (
            <button key={code} onClick={() => setLang(code)} style={{ fontFamily:"'Jost',sans-serif", fontSize:11, letterSpacing:2, textTransform:"uppercase", background:"none", border:"none", color: lang === code ? C.sand : "rgba(247,240,230,0.4)" }}>{code}</button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="home" style={{ position:"relative", height:"100vh", minHeight:640, overflow:"hidden" }}>
        {/* Slides */}
        {HERO_SLIDES.map((photo, i) => (
          <div key={photo.id} className={`hero-slide${i === slideIdx ? " active" : ""}`}>
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}

        {/* Gradient */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(23,18,13,0.72) 0%, rgba(23,18,13,0.35) 60%, rgba(23,18,13,0.1) 100%)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(23,18,13,0.5) 0%, transparent 50%)" }} />

        {/* Eyebrow */}
        <div style={{ position:"absolute", top: 110, left: isRtl ? "auto" : 80, right: isRtl ? 80 : "auto" }}>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:"rgba(247,240,230,0.5)", fontWeight:300 }}>{t.eyebrow}</p>
        </div>

        {/* Content */}
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 5vw 0 7vw", maxWidth:900 }}>
          <div style={{ marginBottom:"2rem" }}>
            <div style={{ width:32, height:1, background:C.sand, marginBottom:"1.5rem" }} />
            <div className="hero-headline" style={{ marginBottom:"0.25rem" }}>
              <span className={`hero-line${textVisible ? " visible" : ""}`} style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:"clamp(3rem,6.5vw,6rem)",
                fontWeight:400, color:C.cream, lineHeight:1.05,
                transition:"transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease"
              }}>
                {t.heroSlides[slideIdx].title[0]}
              </span>
            </div>
            <div className="hero-headline">
              <span className={`hero-line${textVisible ? " visible" : ""}`} style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:"clamp(3rem,6.5vw,6rem)",
                fontWeight:400, color:C.sand, lineHeight:1.05, fontStyle:"italic",
                transitionDelay:"0.1s"
              }}>
                {t.heroSlides[slideIdx].title[1]}
              </span>
            </div>
          </div>

          <p className={`hero-sub${textVisible ? " visible" : ""}`} style={{ fontFamily:"'Jost',sans-serif", fontSize:"clamp(13px,1.4vw,15px)", letterSpacing:"0.05em", color:"rgba(247,240,230,0.65)", fontWeight:300, maxWidth:460, lineHeight:1.85, marginBottom:"3rem" }}>
            {t.heroSlides[slideIdx].sub}
          </p>

          <div className={`hero-btns${textVisible ? " visible" : ""}`} style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo(2)}><span>{t.btn1}</span></button>
            <button className="btn-ghost" onClick={() => scrollTo(3)}>{t.btn2}</button>
          </div>
        </div>

        {/* Slide counter */}
        <div style={{ position:"absolute", bottom:48, right:60, display:"flex", alignItems:"center", gap:16, zIndex:3 }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontStyle:"italic", color:"rgba(247,240,230,0.2)", lineHeight:1 }}>
            {String(slideIdx + 1).padStart(2, "0")}
          </span>
          <div style={{ width:48, height:1, background:"rgba(247,240,230,0.2)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:C.sand, transform:`scaleX(${(slideIdx + 1) / HERO_SLIDES.length})`, transformOrigin:"left", transition:"transform 0.4s ease" }} />
          </div>
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:3, color:"rgba(247,240,230,0.35)" }}>
            {String(HERO_SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        {/* Scroll hint */}
        <div style={{ position:"absolute", bottom:48, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:3 }}>
          <div style={{ width:1, height:48, background:"rgba(247,240,230,0.25)", animation:"scrollLine 2s ease-in-out infinite" }} />
        </div>

        {/* Slide dots */}
        <div style={{ position:"absolute", left:36, top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:10, zIndex:3 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlideIdx(i)} style={{
              width:2, height: i === slideIdx ? 32 : 14, background: i === slideIdx ? C.sand : "rgba(247,240,230,0.3)",
              border:"none", transition:"all 0.4s ease", padding:0
            }} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PILLARS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background:C.ink }} aria-label="Our Values">
        <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)" }} className="pillars-grid">
          {[
            { num:"01", title:t.p1title, desc:t.p1desc },
            { num:"02", title:t.p2title, desc:t.p2desc },
            { num:"03", title:t.p3title, desc:t.p3desc },
          ].map((v, i) => (
            <div key={i} className={`pillar reveal`} style={{ textAlign: isRtl ? "right" : "left" }}>
              <div className="pillar-num">{v.num}</div>
              <div style={{ width:32, height:1, background:"rgba(200,169,122,0.4)", marginBottom:"1.5rem" }} />
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.2rem,2vw,1.6rem)", fontWeight:400, color:C.cream, marginBottom:"1rem", fontStyle:"italic" }}>{v.title}</h3>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, lineHeight:1.9, color:"rgba(247,240,230,0.45)", fontWeight:300, letterSpacing:"0.02em" }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════ */}
      <section id="about" style={{ background:C.creamLight }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", padding:"9rem 4rem", gap:"7rem", alignItems:"center" }} className="about-grid">
          {/* Image */}
          <div style={{ position:"relative" }} className="reveal-left">
            <div className="about-img-wrap">
              <img src={PHOTOS[4].src} alt="Woodline bespoke interior" loading="lazy" />
            </div>
            {/* Floating badge */}
            <div style={{ position:"absolute", bottom:-32, right: isRtl ? "auto" : -32, left: isRtl ? -32 : "auto", background:C.wood, padding:"2.25rem 2.5rem", zIndex:2 }}>
              <span style={{ display:"block", fontFamily:"'Playfair Display',serif", fontSize:"3rem", fontWeight:400, color:C.cream, lineHeight:1, fontStyle:"italic" }}>30</span>
              <span style={{ display:"block", fontFamily:"'Jost',sans-serif", fontSize:"9px", letterSpacing:"3px", color:"rgba(247,240,230,0.7)", textTransform:"uppercase", marginTop:6 }}>{t.badgeTxt}</span>
            </div>
            {/* Decorative offset frame */}
            <div style={{ position:"absolute", top:28, left: isRtl ? "auto" : 28, right: isRtl ? 28 : "auto", bottom:-28, border:`1px solid rgba(155,107,69,0.2)`, zIndex:-1 }} />
          </div>

          {/* Text */}
          <div style={{ textAlign: isRtl ? "right" : "left" }} className="reveal-right">
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:C.wood, marginBottom:"1.25rem" }}>{t.aboutEye}</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:400, lineHeight:1.1, color:C.ink, marginBottom:"2rem" }}>
              {t.aboutTitle[0]}<br /><em>{t.aboutTitle[1]}</em>
            </h2>
            <div style={{ width:48, height:1, background:C.sand, marginBottom:"2rem" }} />
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:"1.1rem", lineHeight:1.9, color:C.fog, marginBottom:"1.25rem" }}>{t.aboutP1}</p>
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:"1.1rem", lineHeight:1.9, color:C.fog, marginBottom:"3rem" }}>{t.aboutP2}</p>
            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2rem", paddingTop:"2.5rem", borderTop:`1px solid rgba(155,107,69,0.15)` }}>
              {t.stats.map(([n, l]) => (
                <div key={n}>
                  <span style={{ display:"block", fontFamily:"'Playfair Display',serif", fontSize:"2.4rem", fontWeight:400, color:C.wood, fontStyle:"italic", lineHeight:1 }}>{n}</span>
                  <span style={{ display:"block", fontFamily:"'Jost',sans-serif", fontSize:"10px", letterSpacing:2, color:C.fog, marginTop:6, textTransform:"uppercase" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PORTFOLIO
      ══════════════════════════════════════════════════════ */}
      <section id="projects" style={{ background:C.creamDark, padding:"9rem 4rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          {/* Header */}
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem", flexWrap:"wrap", gap:"2rem" }} className="reveal">
            <div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:C.wood, marginBottom:"1rem" }}>{t.portEye}</p>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:400, color:C.ink, fontStyle:"italic", lineHeight:1.1 }}>{t.portTitle}</h2>
            </div>
            <p style={{ fontFamily:"'EB Garamond',serif", fontSize:"1rem", color:C.fog, maxWidth:380, lineHeight:1.75, textAlign: isRtl ? "left" : "right" }}>{t.portSub}</p>
          </div>

          {/* Filter tabs */}
          <div style={{ display:"flex", gap:"2.5rem", marginBottom:"3.5rem", flexWrap:"wrap", borderBottom:`1px solid rgba(155,107,69,0.15)`, paddingBottom:"1.5rem" }}>
            {allCats.map(cat => (
              <button key={cat} className={`filter-tab${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>
                {cat === "All" ? t.filterAll : (t.cats[cat] || cat)}
              </button>
            ))}
          </div>

          {/* Masonry-ish grid */}
          <div className="grid-masonry" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:3 }}>
            {filtered.map((photo, idx) => (
              <div key={photo.id} className="grid-item reveal" onClick={() => setLightbox(PHOTOS.findIndex(p => p.id === photo.id))}
                style={{ height: heights[idx % heights.length], gridRow: idx % 7 === 2 ? "span 2" : "span 1" }}>
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="grid-overlay">
                  <span className="grid-cat">{t.cats[photo.category] || photo.category}</span>
                </div>
                <span className="grid-view">View ↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background:C.creamLight, padding:"9rem 4rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"5rem" }} className="reveal">
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:C.wood, marginBottom:"1rem" }}>{t.testimonialEye}</p>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2rem,3.5vw,3rem)", fontWeight:400, color:C.ink, fontStyle:"italic" }}>{t.testimonialTitle}</h2>
          </div>
          <div className="testi-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2px" }}>
            {t.testimonials.map((item, i) => (
              <div key={i} className="testi-card reveal" style={{ transitionDelay:`${i * 0.1}s`, textAlign: isRtl ? "right" : "left" }}>
                {/* Stars */}
                <div style={{ display:"flex", gap:3, marginBottom:"1.75rem" }}>
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill={C.sand}><polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.2 2.8,11 3.5,7.5 1,5 4.5,4.5" /></svg>
                  ))}
                </div>
                <p style={{ fontFamily:"'EB Garamond',serif", fontSize:"1.15rem", lineHeight:1.85, color:C.inkSoft, marginBottom:"2rem", fontStyle:"italic" }}>"{item.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:C.creamDark, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:"'Playfair Display',serif", fontSize:14, color:C.wood, fontStyle:"italic" }}>{item.name[0]}</span>
                  </div>
                  <div>
                    <span style={{ display:"block", fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:500, color:C.ink, letterSpacing:1 }}>{item.name}</span>
                    <span style={{ display:"block", fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:2, color:C.fog, textTransform:"uppercase", marginTop:2 }}>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section id="contact" className="contact-split" style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        {/* Left — dark */}
        <div style={{ background:C.ink, padding:"8rem 5rem", display:"flex", flexDirection:"column", justifyContent:"center", textAlign: isRtl ? "right" : "left" }}>
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:4, textTransform:"uppercase", color:"rgba(200,169,122,0.6)", marginBottom:"1.25rem" }}>{t.contactEye}</p>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(2.2rem,3.5vw,3.2rem)", fontWeight:400, color:C.cream, lineHeight:1.1, marginBottom:"2rem" }}>
            {t.contactTitle[0]}<br /><em style={{ color:C.sand }}>{t.contactTitle[1]}</em>
          </h2>
          <div style={{ width:48, height:1, background:"rgba(200,169,122,0.3)", marginBottom:"2.5rem" }} />
          <p style={{ fontFamily:"'EB Garamond',serif", fontSize:"1.05rem", lineHeight:1.85, color:"rgba(247,240,230,0.5)", marginBottom:"3.5rem" }}>{t.contactIntro}</p>

          {/* Contact details */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1.5rem", marginBottom:"3rem" }}>
            {[
              { label:"Phone", value:"+961 3 011 175", href:"tel:+9613011175" },
              { label:"Email", value:"fadi-kassabian@hotmail.com", href:"mailto:fadi-kassabian@hotmail.com" },
              { label:"Location", value:"Zouk Mosbeh, Lebanon", href:"https://maps.google.com/?q=Zouk+Mosbeh+Lebanon" },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <span style={{ display:"block", fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, textTransform:"uppercase", color:"rgba(200,169,122,0.4)", marginBottom:4 }}>{label}</span>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ fontFamily:"'EB Garamond',serif", fontSize:"1.05rem", color:"rgba(247,240,230,0.7)", textDecoration:"none", borderBottom:"1px solid rgba(200,169,122,0.2)", paddingBottom:2, transition:"color 0.2s, border-color 0.2s" }}>
                  {value}
                </a>
              </div>
            ))}
          </div>

          {/* WhatsApp */}
          <a href="https://wa.me/9613011175" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#25D366", color:"#fff", padding:"14px 28px", fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", textDecoration:"none", width:"fit-content", transition:"opacity 0.2s" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>

        {/* Right — form */}
        <div style={{ background:C.creamLight, padding:"8rem 5rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
          {sent ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1.5rem", padding:"4rem 0", textAlign:"center" }}>
              <div style={{ width:64, height:64, border:`1px solid ${C.wood}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d="M1 8L8 15L21 1" stroke={C.wood} strokeWidth="1.5"/></svg>
              </div>
              <p style={{ fontFamily:"'EB Garamond',serif", fontSize:"1.2rem", color:C.fog, fontStyle:"italic" }}>{t.successTxt}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"2.25rem", direction: t.dir }}>
              {t.fields.slice(0,3).map(({ key, label }) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input
                    type={key==="email"?"email":key==="phone"?"tel":"text"}
                    className="form-field"
                    value={formData[key]}
                    onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    required={key !== "phone"}
                  />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">{t.fields[3].label}</label>
                <textarea
                  className="form-field"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ height:120, resize:"none" }}
                  required
                />
              </div>
              {error && <p style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"#b5351e", letterSpacing:1 }}>{error}</p>}
              <button type="submit" className="btn-primary" disabled={sending} style={{ alignSelf: isRtl ? "flex-end" : "flex-start", opacity: sending ? 0.7 : 1 }}>
                <span>{sending ? t.sending : t.send}</span>
                {!sending && <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 5H15M10 1L15 5L10 9" stroke="currentColor" strokeWidth="1"/></svg>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer style={{ background:C.inkSoft, padding:"4rem" }}>
        <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"2rem" }}>
          {/* Logo */}
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.6rem", fontWeight:400, fontStyle:"italic", color:C.cream, letterSpacing:"0.04em", marginBottom:4 }}>Woodline</div>
            <p style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:3, color:"rgba(247,240,230,0.25)", textTransform:"uppercase" }}>{t.footerTag}</p>
          </div>
          {/* Nav */}
          <div style={{ display:"flex", gap:"2.5rem", flexWrap:"wrap" }}>
            {t.nav.map((link, i) => (
              <button key={i} onClick={() => scrollTo(i)} style={{ background:"none", border:"none", fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:2, textTransform:"uppercase", color:"rgba(247,240,230,0.3)", transition:"color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.sand} onMouseLeave={e => e.target.style.color = "rgba(247,240,230,0.3)"}>
                {link}
              </button>
            ))}
          </div>
          {/* Copy */}
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:2, color:"rgba(247,240,230,0.2)" }}>{t.copy}</p>
        </div>
      </footer>

      <style>{`
        @keyframes scrollLine {
          0%,100% { transform:scaleY(1); opacity:0.25; }
          50% { transform:scaleY(0.4); opacity:0.6; }
        }
      `}</style>
    </div>
  );
}
