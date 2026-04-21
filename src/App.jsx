import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabase.js";

/* ─── PHOTOS ─────────────────────────────────────────────────────────── */
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

// Hero slides — picks the most impactful photos
const HERO_SLIDES = [1, 7, 19, 22, 12, 16].map(id => PHOTOS.find(p => p.id === id));

/* ─── TRANSLATIONS ───────────────────────────────────────────────────── */
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
    p1title: "Bespoke Design",   p1desc: "Every piece is designed from scratch to suit your space, lifestyle, and vision — no off-the-shelf compromises.",
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
      { key:"name",    label:"Your Name",         ph:"John Smith"                                              },
      { key:"email",   label:"Email Address",     ph:"john@example.com"                                       },
      { key:"phone",   label:"Phone (optional)",  ph:"+961 X XXX XXX"                                         },
      { key:"message", label:"Describe Your Project", ph:"Type of furniture, dimensions, wood species, timeline..." },
    ],
    send: "Send My Request →", sending: "Sending…",
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
      { title: ["Bois façonné.", "Art de vivre."],             sub: "Trois décennies de menuiserie sur mesure transformant les espaces au Liban." },
      { title: ["Intérieurs uniques.", "Construits pour durer."], sub: "Chaque détail conçu autour de votre style de vie, vision et espace." },
      { title: ["Cuisines sur mesure.", "Artisanat d'exception."], sub: "Du concept à la pose — fabriqué à la main dans notre atelier de Zouk Mosbeh." },
      { title: ["Caves à vin.", "Vraiment les vôtres."],       sub: "Des caves à vin uniques alliant fonction, beauté et boiserie raffinée." },
      { title: ["Espaces de vie.", "Réinventés."],             sub: "Nous transformons les pièces ordinaires en environnements extraordinaires." },
      { title: ["Mobilier de qualité.", "Caractère durable."], sub: "Bois massifs nobles, choisis pour leur beauté, construits pour les générations." },
    ],
    btn1: "Voir nos réalisations", btn2: "Demander un devis",
    p1title: "Sur Mesure",       p1desc: "Chaque pièce est conçue de zéro pour s'adapter à votre espace, votre style de vie et votre vision.",
    p2title: "Matériaux Premium", p2desc: "Nous travaillons avec des bois nobles — chêne massif, noyer, cèdre — sélectionnés pour leur beauté et leur durabilité.",
    p3title: "30 Ans de Maîtrise", p3desc: "Trois décennies d'expertise en menuiserie sur mesure — chaque joint, surface et finition conçu pour durer des générations.",
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
      { key:"name",    label:"Votre Nom",             ph:"Jean Dupont"                                                   },
      { key:"email",   label:"Email",                 ph:"jean@exemple.fr"                                               },
      { key:"phone",   label:"Téléphone (optionnel)", ph:"+961 X XXX XXX"                                                },
      { key:"message", label:"Décrivez votre projet", ph:"Type de meuble, dimensions, essence de bois, délai..."         },
    ],
    send: "Envoyer ma demande →", sending: "Envoi…",
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
    p1title: "تصميم خاص",    p1desc: "كل قطعة مصممة من الصفر لتناسب مساحتك وأسلوب حياتك ورؤيتك — لا مجال للحلول الجاهزة.",
    p2title: "مواد فاخرة",   p2desc: "نعمل مع أخشاب نبيلة — البلوط الصلب والجوز والأرز — مختارة لجمالها ومتانتها.",
    p3title: "٣٠ عاماً من الإتقان", p3desc: "ثلاثة عقود من الخبرة في النجارة المخصصة — كل مفصل وسطح وتشطيب مبني ليدوم للأجيال.",
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
      { key:"name",    label:"اسمك",                  ph:"محمد علي"                                                 },
      { key:"email",   label:"البريد الإلكتروني",    ph:"example@mail.com"                                         },
      { key:"phone",   label:"الهاتف (اختياري)",     ph:"+961 X XXX XXX"                                           },
      { key:"message", label:"صف مشروعك",            ph:"نوع الأثاث، الأبعاد، نوع الخشب، الموعد النهائي..."       },
    ],
    send: "إرسال طلبي ←", sending: "جارٍ الإرسال…",
    successTxt: "تم إرسال رسالتك! سنرد خلال ٢٤ ساعة.",
    errorTxt: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
    footerTag: "أثاث مخصص · ٣٠ عاماً من الخبرة · سوق مصبح، لبنان",
    copy: `© ${new Date().getFullYear()} Woodline. جميع الحقوق محفوظة.`,
    dir: "rtl",
  },
};

/* ─── SEO STRUCTURED DATA ─────────────────────────────────────────────── */
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.woodline.lb/#business",
  "name": "Woodline",
  "alternateName": "Woodline Custom Made Furniture",
  "description": "Custom made furniture and bespoke joinery in Zouk Mosbeh, Lebanon. 30 years of expertise in handcrafted wood interiors, kitchens, wine cellars, and luxury furniture.",
  "url": "https://www.woodline.lb",
  "telephone": "+9613011175",
  "email": "fadi-kassabian@hotmail.com",
  "foundingDate": "1994",
  "priceRange": "$$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zouk Mosbeh",
    "addressLocality": "Zouk Mosbeh",
    "addressRegion": "Keserwan",
    "addressCountry": "LB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 33.9933,
    "longitude": 35.6117
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "08:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Saturday"], "opens": "09:00", "closes": "14:00" }
  ],
  "areaServed": { "@type": "Country", "name": "Lebanon" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Custom Furniture & Joinery Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Kitchen Design & Installation" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bespoke Wine Cellars" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Interior Joinery" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Furniture Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Luxury Bathroom Furniture" } }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "47",
    "bestRating": "5"
  },
  "sameAs": [
    "https://www.instagram.com/woodline.lb",
    "https://www.facebook.com/woodline.lb"
  ]
};

/* ─── COLORS & STYLES ─────────────────────────────────────────────────── */
const C = {
  cream:     "#F5ECD7",
  creamLight:"#FBF6EE",
  wood:      "#A0714F",
  woodDark:  "#7A5234",
  woodDeep:  "#3D2B1F",
  charcoal:  "#1C1610",
  muted:     "#8A7060",
  gold:      "#C8A96E",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{overflow-x:hidden}
  em{font-style:italic}

  /* ── Hero Slideshow ── */
  .slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 1.4s cubic-bezier(0.4,0,0.2,1),transform 8s ease-out;transform:scale(1.06);will-change:opacity,transform}
  .slide.active{opacity:1;transform:scale(1)}
  .hero-text{opacity:0;transform:translateY(28px);transition:opacity 0.9s ease 0.4s,transform 0.9s ease 0.4s}
  .hero-text.visible{opacity:1;transform:none}

  /* ── Nav ── */
  .cta-hover:hover{background:#7A5234!important;transform:translateY(-2px)}
  .cta2-hover:hover{border-color:rgba(251,246,238,0.9)!important}
  .navlink-hover:hover{color:#A0714F!important}

  /* ── Pillars ── */
  .pillar-card:hover{background:rgba(245,236,215,0.06)!important}
  .pillar-card:hover .pillar-icon-wrap{transform:scale(1.1)}

  /* ── Grid ── */
  .grid-item:hover img{transform:scale(1.08)}
  .grid-item:hover .grid-overlay{background:rgba(28,22,16,0.62)!important}
  .grid-item:hover .grid-zoom{opacity:1!important}

  /* ── Form ── */
  .form-input:focus{border-color:#A0714F!important;outline:none}
  .submit-hover:hover{background:#7A5234!important}

  /* ── Testimonial card ── */
  .testi-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
  .testi-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(28,22,16,0.12)!important}

  /* ── Slide dots ── */
  .dot{width:6px;height:6px;border-radius:50%;background:rgba(251,246,238,0.4);border:none;cursor:pointer;padding:0;transition:all 0.3s;flex-shrink:0}
  .dot.active{background:#A0714F;width:24px;border-radius:3px}

  /* ── WhatsApp FAB ── */
  .wa-fab{position:fixed;bottom:28px;right:28px;z-index:500;width:56px;height:56px;border-radius:50%;background:#25D366;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.45);transition:transform 0.2s,box-shadow 0.2s}
  .wa-fab:hover{transform:scale(1.12);box-shadow:0 6px 28px rgba(37,211,102,0.6)}

  /* ── Section reveal ── */
  .reveal{opacity:0;transform:translateY(40px);transition:opacity 0.8s ease,transform 0.8s ease}
  .reveal.in{opacity:1;transform:none}

  /* ── Star rating ── */
  .stars{color:#C8A96E;letter-spacing:2px;font-size:13px}

  /* ── Pillar icon wrap ── */
  .pillar-icon-wrap{width:48px;height:48px;border-radius:50%;background:rgba(160,113,79,0.12);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;transition:transform 0.3s;font-size:20px}

  /* ── Responsive ── */
  @media(max-width:1000px){.nav-links{display:none!important}.burger{display:flex!important}}
  @media(max-width:768px){
    .grid-3{grid-template-columns:1fr 1fr!important}
    .contact-grid{grid-template-columns:1fr!important}
    .contact-grid>div{padding:3rem 1.5rem!important}
    .about-grid{grid-template-columns:1fr!important;gap:3rem!important;padding:4rem 1.5rem!important}
    .testi-grid{grid-template-columns:1fr!important}
    .pillars-grid{grid-template-columns:1fr!important}
  }
  @media(max-width:480px){
    .grid-3{grid-template-columns:1fr!important}
    .wa-fab{bottom:18px;right:18px}
  }
`;

/* ─── APP ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [lang, setLang]         = useState("en");
  const [activeNav, setActiveNav] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter]     = useState("All");
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", message:"" });
  const [sent, setSent]         = useState(false);
  const [sending, setSending]   = useState(false);
  const [error, setError]       = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);

  const t      = T[lang];
  const isRtl  = lang === "ar";
  const sectionIds = ["home","about","projects","contact"];

  /* ── SEO injection ── */
  useEffect(() => {
    document.documentElement.dir  = t.dir;
    document.documentElement.lang = lang;
    const titles = { en:"Woodline – Custom Made Furniture | Lebanon", fr:"Woodline – Mobilier sur Mesure | Liban", ar:"وودلاين – أثاث مخصص | لبنان" };
    const descs  = { en:"Bespoke joinery and custom made furniture in Zouk Mosbeh, Lebanon. 30 years of expertise in handcrafted wood interiors, wine cellars, kitchens and luxury furniture.", fr:"Menuiserie et mobilier sur mesure à Zouk Mosbeh, Liban. 30 ans d'expertise en intérieurs bois, caves à vin, cuisines et mobilier de luxe.", ar:"نجارة مخصصة وأثاث فاخر في سوق مصبح، لبنان. ٣٠ عاماً من الخبرة في الديكور الخشبي وأقبية النبيذ والمطابخ." };
    document.title = titles[lang];
    document.querySelector('meta[name="description"]')?.setAttribute("content", descs[lang]);
    // JSON-LD
    let ld = document.getElementById("ld-json");
    if (!ld) { ld = document.createElement("script"); ld.id = "ld-json"; ld.type = "application/ld+json"; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify(JSON_LD);
    // OG
    const setMeta = (prop, val, attr="property") => { let m = document.querySelector(`meta[${attr}="${prop}"]`); if (!m) { m = document.createElement("meta"); m.setAttribute(attr, prop); document.head.appendChild(m); } m.setAttribute("content", val); };
    setMeta("og:title",       titles[lang]);
    setMeta("og:description", descs[lang]);
    setMeta("og:type",        "website");
    setMeta("og:url",         "https://www.woodline.lb");
    setMeta("og:image",       "/photos/living-room.jpeg");
    setMeta("og:locale",      lang === "ar" ? "ar_LB" : lang === "fr" ? "fr_LB" : "en_LB");
    setMeta("twitter:card",   "summary_large_image", "name");
    setMeta("twitter:title",  titles[lang], "name");
    setMeta("twitter:description", descs[lang], "name");
    // Canonical
    let can = document.querySelector('link[rel="canonical"]');
    if (!can) { can = document.createElement("link"); can.rel = "canonical"; document.head.appendChild(can); }
    can.href = "https://www.woodline.lb";
    // Hreflang
    ["en","fr","ar"].forEach(l => {
      let hl = document.querySelector(`link[hreflang="${l}"]`);
      if (!hl) { hl = document.createElement("link"); hl.rel = "alternate"; hl.hreflang = l; document.head.appendChild(hl); }
      hl.href = `https://www.woodline.lb/${l === "en" ? "" : l}`;
    });
  }, [lang, t.dir]);

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = sectionIds.map(id => { const el = document.getElementById(id); return el ? el.getBoundingClientRect().top : 9999; });
      const active = offsets.reduce((best, off, i) => (off <= 120 && off > (offsets[best] ?? -9999) ? i : best), 0);
      setActiveNav(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Reveal on scroll ── */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* ── Hero slideshow ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideVisible(false);
      setTimeout(() => {
        setSlideIdx(i => (i + 1) % HERO_SLIDES.length);
        setSlideVisible(true);
      }, 200);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (idx) => {
    setActiveNav(idx);
    setMenuOpen(false);
    document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const { error: sbError } = await supabase.from("contacts").insert([{
        name: formData.name, email: formData.email, phone: formData.phone, message: formData.message,
      }]);
      if (sbError) throw sbError;
      setSent(true);
      setFormData({ name:"", email:"", phone:"", message:"" });
      setTimeout(() => setSent(false), 6000);
    } catch {
      setError(t.errorTxt);
    } finally {
      setSending(false);
    }
  };

  const LangBtn = ({ code, label }) => (
    <button onClick={() => setLang(code)} style={{
      background:   lang === code ? C.wood : "transparent",
      color:        lang === code ? C.cream : C.muted,
      border:       `1px solid ${lang === code ? C.wood : "rgba(160,113,79,0.35)"}`,
      padding:      "5px 10px", fontSize: 11, letterSpacing: 1,
      cursor:       "pointer",  fontFamily: "inherit", transition: "all 0.2s",
    }}>{label}</button>
  );

  const allCategories = ["All", ...new Set(PHOTOS.map(p => p.category))];
  const filtered      = filter === "All" ? PHOTOS : PHOTOS.filter(p => p.category === filter);

  return (
    <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", background:C.creamLight, color:C.charcoal, margin:0, overflowX:"hidden", direction:t.dir }}>
      <style>{css}</style>

      {/* ── JSON-LD (runtime fallback) ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />

      {/* ── WhatsApp FAB ── */}
      <a href="https://wa.me/9613011175?text=Hello%20Woodline%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="wa-fab" aria-label="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div style={{ position:"fixed", inset:0, background:"rgba(28,22,16,0.96)", zIndex:999, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem", cursor:"pointer" }} onClick={() => setLightbox(null)}>
          <button style={{ position:"absolute", top:20, right:24, background:"none", border:"none", color:C.cream, fontSize:28, cursor:"pointer", fontFamily:"inherit" }}>✕</button>
          <img src={PHOTOS[lightbox].src} alt={PHOTOS[lightbox].alt || `Woodline ${PHOTOS[lightbox].category} – custom furniture Lebanon`} style={{ maxWidth:"90vw", maxHeight:"82vh", objectFit:"contain", cursor:"default" }} onClick={e => e.stopPropagation()} />
          <div style={{ display:"flex", gap:16, marginTop:"1.5rem" }}>
            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + PHOTOS.length) % PHOTOS.length); }} style={{ background:C.wood, border:"none", color:C.cream, padding:"10px 22px", cursor:"pointer", fontFamily:"inherit", fontSize:18 }}>←</button>
            <button onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % PHOTOS.length); }} style={{ background:C.wood, border:"none", color:C.cream, padding:"10px 22px", cursor:"pointer", fontFamily:"inherit", fontSize:18 }}>→</button>
          </div>
          <p style={{ color:"rgba(245,236,215,0.45)", fontSize:12, letterSpacing:2, marginTop:"0.75rem", textTransform:"uppercase" }}>{t.cats[PHOTOS[lightbox].category] || PHOTOS[lightbox].category}</p>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════ */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, transition:"background 0.4s,box-shadow 0.4s", ...(scrolled ? { background:"rgba(251,246,238,0.97)", backdropFilter:"blur(12px)", boxShadow:"0 1px 0 rgba(160,113,79,0.15)" } : {}) }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:72 }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"baseline", gap:4, cursor:"default" }}>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.wood, letterSpacing:-1 }}>W</span>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, letterSpacing:6, color:C.woodDeep }}>OODLINE</span>
            <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:10, letterSpacing:3, color:C.muted, textTransform:"uppercase", marginLeft:6, alignSelf:"center" }}>CUSTOM MADE FURNITURE</span>
          </div>
          {/* Desktop links */}
          <div className="nav-links" style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
            {t.nav.map((link, i) => (
              <button key={i} onClick={() => scrollTo(i)} className="navlink-hover"
                style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, letterSpacing:2, color:activeNav === i ? C.wood : C.muted, textTransform:"uppercase", padding:"4px 0", transition:"color 0.2s", borderBottom: activeNav === i ? `1px solid ${C.wood}` : "1px solid transparent" }}>{link}</button>
            ))}
            <button onClick={() => scrollTo(3)} style={{ background:C.wood, color:C.cream, border:"none", padding:"10px 22px", fontSize:12, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"inherit", transition:"background 0.2s" }} className="cta-hover">{t.cta}</button>
            <div style={{ display:"flex", gap:4 }}>
              <LangBtn code="en" label="EN" />
              <LangBtn code="fr" label="FR" />
              <LangBtn code="ar" label="AR" />
            </div>
          </div>
          {/* Burger */}
          <button style={{ display:"none", flexDirection:"column", gap:5, background:"none", border:"none", cursor:"pointer", padding:4 }} className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            {[0,1,2].map(i => <span key={i} style={{ display:"block", width:24, height:1.5, background:C.woodDeep, transition:"all 0.3s", ...(menuOpen && i===0 ? {transform:"rotate(45deg) translate(5px,5px)"} : menuOpen && i===1 ? {opacity:0} : menuOpen && i===2 ? {transform:"rotate(-45deg) translate(5px,-5px)"} : {}) }} />)}
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background:C.creamLight, borderTop:`1px solid rgba(160,113,79,0.12)`, display:"flex", flexDirection:"column", padding:"1rem 2rem" }}>
            {t.nav.map((link, i) => (
              <button key={i} onClick={() => scrollTo(i)} style={{ background:"none", border:"none", textAlign: isRtl ? "right" : "left", fontFamily:"inherit", fontSize:16, letterSpacing:2, color:C.woodDeep, padding:"12px 0", cursor:"pointer", textTransform:"uppercase", borderBottom:`1px solid rgba(160,113,79,0.08)` }}>{link}</button>
            ))}
            <button onClick={() => scrollTo(3)} style={{ background:"none", border:"none", textAlign: isRtl ? "right" : "left", fontFamily:"inherit", fontSize:16, letterSpacing:2, color:C.wood, padding:"12px 0", cursor:"pointer", textTransform:"uppercase", borderBottom:`1px solid rgba(160,113,79,0.08)` }}>{t.cta}</button>
            <div style={{ display:"flex", gap:6, padding:"12px 0" }}>
              <LangBtn code="en" label="EN" />
              <LangBtn code="fr" label="FR" />
              <LangBtn code="ar" label="AR" />
            </div>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO — SLIDESHOW
      ══════════════════════════════════════════════════════ */}
      <section id="home" style={{ position:"relative", height:"100vh", minHeight:640, display:"flex", alignItems:"center", overflow:"hidden" }} aria-label="Hero">
        {/* Slides */}
        {HERO_SLIDES.map((photo, i) => (
          <img key={photo.id} src={photo.src} alt={photo.alt || `Woodline bespoke furniture – ${photo.category}`}
            className={`slide${i === slideIdx ? " active" : ""}`}
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}
          />
        ))}
        {/* Gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(110deg,rgba(28,22,16,0.78) 0%,rgba(28,22,16,0.32) 55%,rgba(28,22,16,0.08) 100%)", zIndex:1 }} />
        {/* Progress bar */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:"rgba(160,113,79,0.25)", zIndex:3 }}>
          <div key={slideIdx} style={{ height:"100%", background:C.wood, animation:"progress 5.5s linear forwards" }} />
        </div>
        <style>{`@keyframes progress{from{width:0}to{width:100%}}`}</style>

        {/* Content */}
        <div style={{ position:"relative", zIndex:2, maxWidth:680, padding:"0 3rem", marginLeft: isRtl ? 0 : "max(2rem,calc(50vw - 580px))", marginRight: isRtl ? "max(2rem,calc(50vw - 580px))" : 0, textAlign: isRtl ? "right" : "left" }}
          className={`hero-text${slideVisible ? " visible" : ""}`}>
          <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:C.wood, marginBottom:"1.5rem", fontWeight:400 }}>{t.eyebrow}</p>
          <h1 style={{ fontSize:"clamp(3rem,6vw,5.2rem)", lineHeight:1.06, fontWeight:700, color:"#FBF6EE", margin:"0 0 1.25rem" }}>
            {t.heroSlides[slideIdx].title[0]}<br /><em>{t.heroSlides[slideIdx].title[1]}</em>
          </h1>
          <p style={{ fontSize:18, lineHeight:1.75, color:"rgba(251,246,238,0.8)", maxWidth:480, marginBottom:"2.5rem", fontWeight:300 }}>{t.heroSlides[slideIdx].sub}</p>
          <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
            <button onClick={() => scrollTo(2)} style={{ background:C.wood, color:"#FBF6EE", border:"none", padding:"15px 34px", fontSize:13, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"inherit", transition:"background 0.2s,transform 0.15s" }} className="cta-hover">{t.btn1}</button>
            <button onClick={() => scrollTo(3)} style={{ background:"transparent", color:"#FBF6EE", border:"1px solid rgba(251,246,238,0.5)", padding:"15px 34px", fontSize:13, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"inherit", transition:"border-color 0.2s" }} className="cta2-hover">{t.btn2}</button>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", zIndex:3, display:"flex", gap:8, alignItems:"center" }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`dot${i === slideIdx ? " active" : ""}`} onClick={() => { setSlideIdx(i); setSlideVisible(true); }} aria-label={`Slide ${i+1}`} />
          ))}
        </div>
        {/* Scroll indicator */}
        <div style={{ position:"absolute", bottom:32, right:40, zIndex:3, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
          <span style={{ display:"block", width:1, height:44, background:"rgba(251,246,238,0.35)" }} />
          <span style={{ fontSize:10, letterSpacing:3, color:"rgba(251,246,238,0.4)", textTransform:"uppercase", writingMode:"vertical-rl" }}>scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PILLARS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background:C.woodDeep }} aria-label="Our Strengths">
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", maxWidth:1280, margin:"0 auto" }} className="pillars-grid">
          {[
            { icon:"✦", title:t.p1title, desc:t.p1desc },
            { icon:"◈", title:t.p2title, desc:t.p2desc },
            { icon:"◉", title:t.p3title, desc:t.p3desc },
          ].map((v, i) => (
            <div key={i} style={{ padding:"3.5rem 2.5rem", borderRight:`1px solid rgba(251,246,238,0.06)`, transition:"background 0.3s", textAlign: isRtl ? "right" : "left" }} className="pillar-card reveal">
              <div className="pillar-icon-wrap"><span style={{ color:C.wood }}>{v.icon}</span></div>
              <h3 style={{ fontSize:22, fontWeight:600, color:C.cream, marginBottom:"0.75rem", fontStyle:"italic" }}>{v.title}</h3>
              <p style={{ fontSize:15, lineHeight:1.8, color:"rgba(245,236,215,0.58)", fontWeight:300 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT
      ══════════════════════════════════════════════════════ */}
      <section id="about" aria-label="About Woodline">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", maxWidth:1280, margin:"0 auto", padding:"7rem 2rem", gap:"5rem", alignItems:"center" }} className="about-grid">
          {/* Image side */}
          <div style={{ position:"relative" }} className="reveal">
            <img src={PHOTOS[4].src} alt="Woodline bespoke interior craftsmanship in Lebanon" style={{ width:"100%", height:540, objectFit:"cover", display:"block" }} loading="lazy" />
            <div style={{ position:"absolute", bottom:-28, right: isRtl ? "auto" : -28, left: isRtl ? -28 : "auto", background:C.wood, padding:"1.75rem 2.25rem", display:"flex", flexDirection:"column", alignItems:"center" }}>
              <span style={{ fontSize:38, fontWeight:700, color:C.cream, lineHeight:1, fontStyle:"italic" }}>30+</span>
              <span style={{ fontSize:11, letterSpacing:2, color:"rgba(245,236,215,0.8)", textTransform:"uppercase", marginTop:4 }}>{t.badgeTxt}</span>
            </div>
          </div>
          {/* Text side */}
          <div style={{ paddingLeft: isRtl ? 0 : "2rem", paddingRight: isRtl ? "2rem" : 0, textAlign: isRtl ? "right" : "left" }} className="reveal">
            <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:C.wood, marginBottom:"1rem", fontWeight:400 }}>{t.aboutEye}</p>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, lineHeight:1.1, margin:"0 0 1.5rem", color:C.woodDeep }}>
              {t.aboutTitle[0]}<br /><em>{t.aboutTitle[1]}</em>
            </h2>
            <p style={{ fontSize:16, lineHeight:1.9, color:C.muted, marginBottom:"1rem", fontWeight:300 }}>{t.aboutP1}</p>
            <p style={{ fontSize:16, lineHeight:1.9, color:C.muted, marginBottom:"1rem", fontWeight:300 }}>{t.aboutP2}</p>
            <div style={{ display:"flex", gap:"2.5rem", marginTop:"2.5rem", paddingTop:"2rem", borderTop:`1px solid rgba(160,113,79,0.2)` }}>
              {t.stats.map(([n, l]) => (
                <div key={n} style={{ display:"flex", flexDirection:"column" }}>
                  <span style={{ fontSize:34, fontWeight:700, color:C.wood, fontStyle:"italic", lineHeight:1 }}>{n}</span>
                  <span style={{ fontSize:12, letterSpacing:1, color:C.muted, marginTop:4 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PORTFOLIO
      ══════════════════════════════════════════════════════ */}
      <section id="projects" style={{ background:"#F0E8D8", padding:"7rem 2rem" }} aria-label="Portfolio">
        <div style={{ maxWidth:1280, margin:"0 auto 3rem", textAlign:"center" }} className="reveal">
          <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:C.wood, marginBottom:"1rem", fontWeight:400 }}>{t.portEye}</p>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, lineHeight:1.1, margin:"0 0 1rem", color:C.woodDeep }}>{t.portTitle}</h2>
          <p style={{ fontSize:16, color:C.muted, maxWidth:520, margin:"0 auto 2rem", lineHeight:1.75 }}>{t.portSub}</p>
          {/* Filters */}
          <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap" }}>
            {allCategories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{ background: filter === cat ? C.wood : "none", border:`1px solid ${filter === cat ? C.wood : "rgba(160,113,79,0.3)"}`, padding:"8px 22px", fontSize:11, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"inherit", color: filter === cat ? C.cream : C.muted, transition:"all 0.2s" }}>
                {cat === "All" ? t.filterAll : (t.cats[cat] || cat)}
              </button>
            ))}
          </div>
        </div>
        {/* Grid */}
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }} className="grid-3">
          {filtered.map((photo) => (
            <div key={photo.id} style={{ position:"relative", overflow:"hidden", aspectRatio:"4/3", cursor:"pointer" }} className="grid-item reveal"
              onClick={() => setLightbox(PHOTOS.findIndex(p => p.id === photo.id))}>
              <img src={photo.src} alt={photo.alt || `Woodline ${t.cats[photo.category] || photo.category} – custom furniture Lebanon`} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform 0.55s ease" }} loading="lazy" />
              <div style={{ position:"absolute", inset:0, background:"rgba(28,22,16,0)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"1.25rem", transition:"background 0.3s" }} className="grid-overlay">
                <span style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:C.wood, marginBottom:4 }}>{t.cats[photo.category] || photo.category}</span>
                <span style={{ position:"absolute", top:14, right:14, fontSize:18, color:C.cream, opacity:0, transition:"opacity 0.3s" }} className="grid-zoom">↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════ */}
      <section style={{ background:C.creamLight, padding:"7rem 2rem" }} aria-label="Testimonials">
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"3.5rem" }} className="reveal">
            <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:C.wood, marginBottom:"1rem", fontWeight:400 }}>{t.testimonialEye}</p>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:C.woodDeep, lineHeight:1.15 }}>{t.testimonialTitle}</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"2rem" }} className="testi-grid">
            {t.testimonials.map((testi, i) => (
              <div key={i} style={{ background:"#fff", padding:"2.5rem", boxShadow:"0 4px 24px rgba(28,22,16,0.06)", textAlign: isRtl ? "right" : "left" }} className="testi-card reveal" itemScope itemType="https://schema.org/Review">
                <div className="stars">★★★★★</div>
                <p style={{ fontSize:16, lineHeight:1.85, color:C.muted, fontStyle:"italic", margin:"1.25rem 0 1.5rem", fontWeight:300 }} itemProp="reviewBody">"{testi.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", flexDirection: isRtl ? "row-reverse" : "row" }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:C.wood, display:"flex", alignItems:"center", justifyContent:"center", color:C.cream, fontWeight:700, fontSize:16 }}>{testi.name[0]}</div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:600, color:C.woodDeep, letterSpacing:1 }} itemProp="author">{testi.name}</p>
                    <p style={{ fontSize:12, color:C.muted, letterSpacing:1 }}>{testi.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Trust badges */}
          <div style={{ display:"flex", gap:"3rem", justifyContent:"center", marginTop:"4rem", flexWrap:"wrap" }} className="reveal">
            {[["500+", lang === "ar" ? "مشروع منجز" : lang === "fr" ? "Projets Réalisés" : "Projects Completed"],
              ["30+",  lang === "ar" ? "عاماً من الخبرة" : lang === "fr" ? "Ans d'Expertise" : "Years of Expertise"],
              ["100%", lang === "ar" ? "مخصص بالكامل" : lang === "fr" ? "Sur Mesure" : "Custom Made"],
              ["★ 5/5", lang === "ar" ? "تقييم العملاء" : lang === "fr" ? "Note Client" : "Client Rating"]].map(([num, lbl]) => (
              <div key={num} style={{ textAlign:"center" }}>
                <span style={{ fontSize:32, fontWeight:700, color:C.wood, fontStyle:"italic", display:"block" }}>{num}</span>
                <span style={{ fontSize:12, letterSpacing:2, color:C.muted, textTransform:"uppercase" }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section id="contact" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", background:C.woodDeep }} className="contact-grid" aria-label="Contact">
        {/* Left */}
        <div style={{ padding:"6rem 4rem 6rem 3rem", textAlign: isRtl ? "right" : "left" }}>
          <p style={{ fontSize:11, letterSpacing:4, textTransform:"uppercase", color:"rgba(160,113,79,0.8)", marginBottom:"1rem", fontWeight:400 }}>{t.contactEye}</p>
          <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, lineHeight:1.1, margin:"0 0 1.5rem", color:"#F5ECD7" }}>{t.contactTitle[0]}<br /><em>{t.contactTitle[1]}</em></h2>
          <p style={{ fontSize:16, lineHeight:1.85, color:"rgba(245,236,215,0.6)", marginBottom:"2.5rem", fontWeight:300 }}>{t.contactIntro}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"1.1rem" }}>
            {[
              { icon:"☎", label:"+961 3 011 175", href:"tel:+9613011175" },
              { icon:"✉", label:"fadi-kassabian@hotmail.com", href:"mailto:fadi-kassabian@hotmail.com" },
              { icon:"⌂", label:"Zouk Mosbeh, Lebanon", href:"https://maps.google.com/?q=Zouk+Mosbeh+Lebanon" },
            ].map(({ icon, label, href }) => (
              <div key={label} style={{ display:"flex", alignItems:"center", gap:"1rem", flexDirection: isRtl ? "row-reverse" : "row" }}>
                <span style={{ fontSize:16, color:C.wood, width:20, textAlign:"center" }}>{icon}</span>
                {href ? <a href={href} style={{ fontSize:15, color:"rgba(245,236,215,0.75)", textDecoration:"none" }} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{label}</a> : <span style={{ fontSize:15, color:"rgba(245,236,215,0.75)" }}>{label}</span>}
              </div>
            ))}
          </div>
          {/* WhatsApp shortcut */}
          <a href="https://wa.me/9613011175" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:"0.6rem", marginTop:"2rem", background:"#25D366", color:"#fff", padding:"12px 24px", fontSize:13, letterSpacing:2, textTransform:"uppercase", textDecoration:"none", transition:"background 0.2s" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
        </div>
        {/* Form */}
        <div style={{ background:C.creamLight, padding:"6rem 3rem 6rem 4rem" }}>
          {sent ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:"1rem", padding:"3rem", textAlign:"center" }}>
              <span style={{ width:64, height:64, borderRadius:"50%", border:`2px solid ${C.wood}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, color:C.wood }}>✓</span>
              <p style={{ fontSize:18, color:C.muted, fontStyle:"italic" }}>{t.successTxt}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1.25rem", textAlign: isRtl ? "right" : "left" }} itemScope itemType="https://schema.org/ContactPage">
              {t.fields.slice(0,3).map(({ key, label, ph }) => (
                <div key={key} style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                  <label style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:C.muted }}>{label}</label>
                  <input type={key==="email"?"email":key==="phone"?"tel":"text"} placeholder={ph}
                    value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    style={{ border:`1px solid rgba(160,113,79,0.3)`, background:"transparent", padding:"12px 14px", fontFamily:"inherit", fontSize:15, color:C.charcoal, outline:"none", width:"100%", boxSizing:"border-box", transition:"border-color 0.2s", textAlign: isRtl ? "right" : "left" }}
                    required={key !== "phone"} className="form-input" />
                </div>
              ))}
              <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                <label style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:C.muted }}>{t.fields[3].label}</label>
                <textarea placeholder={t.fields[3].ph} value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ border:`1px solid rgba(160,113,79,0.3)`, background:"transparent", padding:"12px 14px", fontFamily:"inherit", fontSize:15, color:C.charcoal, outline:"none", width:"100%", boxSizing:"border-box", height:120, resize:"vertical", transition:"border-color 0.2s", textAlign: isRtl ? "right" : "left" }}
                  required className="form-input" />
              </div>
              {error && <p style={{ color:"#c0392b", fontSize:14 }}>{error}</p>}
              <button type="submit" style={{ background:C.wood, color:C.cream, border:"none", padding:"16px 32px", fontSize:13, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"inherit", marginTop:"0.5rem", transition:"background 0.2s", opacity: sending ? 0.7 : 1 }}
                className="submit-hover" disabled={sending}>
                {sending ? t.sending : t.send}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer style={{ background:C.charcoal, padding:"3rem 2rem", textAlign:"center" }} role="contentinfo">
        <div style={{ display:"flex", alignItems:"baseline", justifyContent:"center", gap:4, marginBottom:"0.75rem" }}>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:C.wood, letterSpacing:-1 }}>W</span>
          <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, letterSpacing:6, color:"#C8B99A" }}>OODLINE</span>
        </div>
        <p style={{ fontSize:11, letterSpacing:3, color:"rgba(200,185,154,0.45)", textTransform:"uppercase", marginBottom:"1rem" }}>{t.footerTag}</p>
        {/* Footer nav */}
        <div style={{ display:"flex", gap:"1.5rem", justifyContent:"center", marginBottom:"1.5rem", flexWrap:"wrap" }}>
          {t.nav.map((link, i) => (
            <button key={i} onClick={() => scrollTo(i)} style={{ background:"none", border:"none", color:"rgba(200,185,154,0.45)", cursor:"pointer", fontFamily:"inherit", fontSize:11, letterSpacing:2, textTransform:"uppercase" }}>{link}</button>
          ))}
        </div>
        <p style={{ fontSize:11, color:"rgba(200,185,154,0.28)" }}>{t.copy}</p>
      </footer>
    </div>
  );
}
