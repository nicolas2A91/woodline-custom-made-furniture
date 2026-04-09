import { useState, useEffect } from "react";
import { supabase } from "./supabase.js";

const PHOTOS = [
  { id: 1, src: "/photos/villa-exterior.jpeg", category: "Architecture" },
  { id: 2, src: "/photos/front-door.jpeg", category: "Architecture" },
  { id: 3, src: "/photos/wood-beams.jpeg", category: "Architecture" },
  { id: 4, src: "/photos/open-space.jpeg", category: "Architecture" },
  { id: 5, src: "/photos/entrance-hall.jpeg", category: "Interior" },
  { id: 6, src: "/photos/hidden-door.jpeg", category: "Interior" },
  { id: 7, src: "/photos/living-room.jpeg", category: "Interior" },
  { id: 8, src: "/photos/living-room2.jpeg", category: "Interior" },
  { id: 9, src: "/photos/dining-room.jpeg", category: "Interior" },
  { id: 10, src: "/photos/dining-room2.jpeg", category: "Interior" },
  { id: 11, src: "/photos/wall-panel-marble.jpeg", category: "Interior" },
  { id: 12, src: "/photos/loft-space.jpeg", category: "Interior" },
  { id: 13, src: "/photos/loft-space2.jpeg", category: "Interior" },
  { id: 14, src: "/photos/window-bench.jpeg", category: "Interior" },
  { id: 15, src: "/photos/elevator.jpeg", category: "Interior" },
  { id: 16, src: "/photos/round-table.jpeg", category: "Furniture" },
  { id: 17, src: "/photos/black-wardrobe.jpeg", category: "Furniture" },
  { id: 18, src: "/photos/black-unit-open.jpeg", category: "Furniture" },
  { id: 19, src: "/photos/kitchen.jpeg", category: "Kitchen" },
  { id: 20, src: "/photos/kitchen2.jpeg", category: "Kitchen" },
  { id: 21, src: "/photos/kitchen-island.jpeg", category: "Kitchen" },
  { id: 22, src: "/photos/wine-cellar-outside.jpeg", category: "Wine Cellar" },
  { id: 23, src: "/photos/wine-cellar-inside.jpeg", category: "Wine Cellar" },
  { id: 24, src: "/photos/wine-cellar-angle.jpeg", category: "Wine Cellar" },
  { id: 25, src: "/photos/bathroom.jpeg", category: "Bathroom" },
];

const T = {
  en: {
    nav: ["Home","About","Projects","Contact"],
    cta: "Get a Quote",
    eyebrow: "30 Years of Expertise · Souk Mosbeh, Lebanon",
    heroTitle: ["Crafted wood.", "Elevated living."],
    heroSub: "Three decades of bespoke joinery. We design and build custom furniture that transforms spaces into lasting works of craftsmanship.",
    btn1: "View Our Work", btn2: "Request a Quote",
    p1title: "Bespoke Design", p1desc: "Every piece is designed from scratch to suit your space, lifestyle, and vision — no off-the-shelf compromises.",
    p2title: "Premium Materials", p2desc: "We work with fine-grain hardwoods, solid oak, walnut, and cedar, selected for beauty and longevity.",
    p3title: "30 Years of Mastery", p3desc: "Three decades of expertise in bespoke joinery — every joint, surface, and finish built to last generations.",
    aboutEye: "Our Story", aboutTitle: ["Born from a", "passion for wood"],
    aboutP1: "Woodline was founded on a single belief: that a well-crafted space changes how you live. Based in Souk Mosbeh, Lebanon, we have spent over 30 years transforming residential and commercial interiors with bespoke joinery that balances artistry with function.",
    aboutP2: "Every project begins with listening. We take time to understand your vision, your space, and your daily rhythms — then we design, build, and install furniture that feels like it was always meant to be there.",
    stats: [["500+","Projects completed"],["100%","Custom-made"],["30+","Years in Lebanon"]],
    badgeTxt: "Years of expertise",
    portEye: "Portfolio", portTitle: "Our Realizations", portSub: "A selection of bespoke joinery and custom furniture across Lebanon.",
    filterAll: "All",
    cats: { Architecture:"Architecture", Interior:"Interior", Furniture:"Furniture", Kitchen:"Kitchen", "Wine Cellar":"Wine Cellar", Bathroom:"Bathroom" },
    contactEye: "Get in Touch", contactTitle: ["Your project,","our passion"],
    contactIntro: "Tell us about your project and we'll get back to you within 24 hours with a first proposal.",
    fields: [{key:"name",label:"Your Name",ph:"John Smith"},{key:"email",label:"Email Address",ph:"john@example.com"},{key:"phone",label:"Phone (optional)",ph:"+961 X XXX XXX"},{key:"message",label:"Describe Your Project",ph:"Type of furniture, dimensions, wood species, timeline..."}],
    send: "Send My Request →", sending: "Sending…",
    successTxt: "Message sent! We'll reply within 24 hours.",
    errorTxt: "Something went wrong. Please try again or call us directly.",
    footerTag: "Custom Made Furniture · 30 Years of Expertise · Souk Mosbeh, Lebanon",
    copy: `© ${new Date().getFullYear()} Woodline. All rights reserved.`,
    dir: "ltr",
  },
  fr: {
    nav: ["Accueil","À propos","Réalisations","Contact"],
    cta: "Devis Gratuit",
    eyebrow: "30 Ans d'Expertise · Souk Mosbeh, Liban",
    heroTitle: ["Bois façonné.", "Art de vivre."],
    heroSub: "Trois décennies de menuiserie sur mesure. Nous concevons et fabriquons des meubles uniques qui transforment chaque espace en œuvre d'artisanat.",
    btn1: "Voir nos réalisations", btn2: "Demander un devis",
    p1title: "Sur Mesure", p1desc: "Chaque pièce est conçue de zéro pour s'adapter à votre espace, votre style de vie et votre vision.",
    p2title: "Matériaux Premium", p2desc: "Nous travaillons avec des bois nobles — chêne massif, noyer, cèdre — sélectionnés pour leur beauté et leur durabilité.",
    p3title: "30 Ans de Maîtrise", p3desc: "Trois décennies d'expertise en menuiserie sur mesure — chaque joint, surface et finition conçu pour durer des générations.",
    aboutEye: "Notre Histoire", aboutTitle: ["Né d'une", "passion du bois"],
    aboutP1: "Woodline est né d'une conviction : un espace bien conçu change la façon dont on vit. Basés à Souk Mosbeh, au Liban, nous transformons depuis plus de 30 ans des intérieurs résidentiels et commerciaux avec une menuiserie sur mesure alliant art et fonction.",
    aboutP2: "Chaque projet commence par une écoute attentive. Nous prenons le temps de comprendre votre vision, votre espace et vos habitudes — puis nous concevons, fabriquons et installons des meubles qui semblent avoir toujours été là.",
    stats: [["500+","Projets réalisés"],["100%","Sur mesure"],["30+","Ans au Liban"]],
    badgeTxt: "Ans d'expertise",
    portEye: "Portfolio", portTitle: "Nos Réalisations", portSub: "Une sélection de menuiseries et meubles sur mesure au Liban.",
    filterAll: "Tous",
    cats: { Architecture:"Architecture", Interior:"Intérieur", Furniture:"Mobilier", Kitchen:"Cuisine", "Wine Cellar":"Cave à vin", Bathroom:"Salle de bain" },
    contactEye: "Contactez-nous", contactTitle: ["Votre projet,","notre passion"],
    contactIntro: "Décrivez-nous votre projet et nous vous répondrons sous 24h avec une première proposition.",
    fields: [{key:"name",label:"Votre Nom",ph:"Jean Dupont"},{key:"email",label:"Email",ph:"jean@exemple.fr"},{key:"phone",label:"Téléphone (optionnel)",ph:"+961 X XXX XXX"},{key:"message",label:"Décrivez votre projet",ph:"Type de meuble, dimensions, essence de bois, délai..."}],
    send: "Envoyer ma demande →", sending: "Envoi…",
    successTxt: "Message envoyé ! Nous vous répondrons sous 24h.",
    errorTxt: "Une erreur s'est produite. Veuillez réessayer ou nous appeler directement.",
    footerTag: "Mobilier sur mesure · 30 Ans d'Expertise · Souk Mosbeh, Liban",
    copy: `© ${new Date().getFullYear()} Woodline. Tous droits réservés.`,
    dir: "ltr",
  },
  ar: {
    nav: ["الرئيسية","من نحن","أعمالنا","اتصل بنا"],
    cta: "طلب عرض سعر",
    eyebrow: "٣٠ عاماً من الخبرة · سوق مصبح، لبنان",
    heroTitle: ["خشب محكم الصنع.", "حياة راقية."],
    heroSub: "ثلاثة عقود من النجارة المخصصة. نصمم ونصنع أثاثاً فريداً يحوّل كل مساحة إلى تحفة فنية خالدة.",
    btn1: "اكتشف أعمالنا", btn2: "طلب عرض سعر",
    p1title: "تصميم خاص", p1desc: "كل قطعة مصممة من الصفر لتناسب مساحتك وأسلوب حياتك ورؤيتك — لا مجال للحلول الجاهزة.",
    p2title: "مواد فاخرة", p2desc: "نعمل مع أخشاب نبيلة — البلوط الصلب والجوز والأرز — مختارة لجمالها ومتانتها.",
    p3title: "٣٠ عاماً من الإتقان", p3desc: "ثلاثة عقود من الخبرة في النجارة المخصصة — كل مفصل وسطح وتشطيب مبني ليدوم للأجيال.",
    aboutEye: "قصتنا", aboutTitle: ["وُلدنا من", "شغف بالخشب"],
    aboutP1: "تأسست وودلاين على قناعة واحدة: أن المساحة المصممة جيداً تغيّر أسلوب الحياة. انطلاقاً من سوق مصبح في لبنان، نحوّل منذ أكثر من ٣٠ عاماً الديكورات الداخلية السكنية والتجارية بنجارة مخصصة تجمع بين الفن والوظيفة.",
    aboutP2: "كل مشروع يبدأ بالاستماع. نأخذ وقتنا لفهم رؤيتك ومساحتك وعاداتك اليومية — ثم نصمم ونصنع ونركّب أثاثاً يبدو وكأنه كان دائماً في مكانه.",
    stats: [["٥٠٠+","مشروع منجز"],["١٠٠٪","مخصص بالكامل"],["٣٠+","عاماً في لبنان"]],
    badgeTxt: "عاماً من الخبرة",
    portEye: "معرض الأعمال", portTitle: "إنجازاتنا", portSub: "مجموعة مختارة من أعمال النجارة والأثاث المخصص في لبنان.",
    filterAll: "الكل",
    cats: { Architecture:"معمار", Interior:"ديكور داخلي", Furniture:"أثاث", Kitchen:"مطبخ", "Wine Cellar":"قبو النبيذ", Bathroom:"حمام" },
    contactEye: "تواصل معنا", contactTitle: ["مشروعك،","شغفنا"],
    contactIntro: "أخبرنا عن مشروعك وسنرد عليك خلال ٢٤ ساعة بأول اقتراح.",
    fields: [{key:"name",label:"اسمك",ph:"محمد علي"},{key:"email",label:"البريد الإلكتروني",ph:"example@mail.com"},{key:"phone",label:"الهاتف (اختياري)",ph:"+961 X XXX XXX"},{key:"message",label:"صف مشروعك",ph:"نوع الأثاث، الأبعاد، نوع الخشب، الموعد النهائي..."}],
    send: "إرسال طلبي ←", sending: "جارٍ الإرسال…",
    successTxt: "تم إرسال رسالتك! سنرد خلال ٢٤ ساعة.",
    errorTxt: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
    footerTag: "أثاث مخصص · ٣٠ عاماً من الخبرة · سوق مصبح، لبنان",
    copy: `© ${new Date().getFullYear()} Woodline. جميع الحقوق محفوظة.`,
    dir: "rtl",
  },
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [activeNav, setActiveNav] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({ name:"", email:"", phone:"", message:"" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const t = T[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionIds = ["home","about","projects","contact"];

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
      setTimeout(() => setSent(false), 5000);
    } catch {
      setError(t.errorTxt);
    } finally {
      setSending(false);
    }
  };

  const LangBtn = ({ code, label }) => (
    <button onClick={() => setLang(code)} style={{
      background: lang === code ? C.wood : "transparent",
      color: lang === code ? C.cream : C.muted,
      border: `1px solid ${lang === code ? C.wood : "rgba(160,113,79,0.35)"}`,
      padding: "5px 10px", fontSize: 11, letterSpacing: 1,
      cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
    }}>{label}</button>
  );

  const allCategories = ["All", ...new Set(PHOTOS.map(p => p.category))];
  const filtered = filter === "All" ? PHOTOS : PHOTOS.filter(p => p.category === filter);

  return (
    <div style={{ ...S.root, direction: t.dir }}>
      <style>{css}</style>

      {lightbox !== null && (
        <div style={S.lightboxOverlay} onClick={() => setLightbox(null)}>
          <button style={S.lightboxClose}>✕</button>
          <img src={PHOTOS[lightbox].src} alt="" style={S.lightboxImg} onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* NAV */}
      <nav style={{ ...S.nav, ...(scrolled ? S.navScrolled : {}) }}>
        <div style={S.navInner}>
          <div style={S.logo}>
            <span style={S.logoMark}>W</span>
            <span style={S.logoName}>OODLINE</span>
            <span style={S.logoSub}>CUSTOM MADE FURNITURE</span>
          </div>
          <div style={S.navLinks} className="nav-links">
            {t.nav.map((link, i) => (
              <button key={i} onClick={() => scrollTo(i)}
                style={{ ...S.navLink, ...(activeNav === i ? S.navLinkActive : {}) }}>{link}</button>
            ))}
            <button onClick={() => scrollTo(3)} style={S.navCta}>{t.cta}</button>
            <div style={{ display:"flex", gap:4 }}>
              <LangBtn code="en" label="EN" />
              <LangBtn code="fr" label="FR" />
              <LangBtn code="ar" label="AR" />
            </div>
          </div>
          <button style={S.burger} onClick={() => setMenuOpen(!menuOpen)} className="burger">
            <span style={{ ...S.bLine, ...(menuOpen ? { transform:"rotate(45deg) translate(5px,5px)" } : {}) }} />
            <span style={{ ...S.bLine, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...S.bLine, ...(menuOpen ? { transform:"rotate(-45deg) translate(5px,-5px)" } : {}) }} />
          </button>
        </div>
        {menuOpen && (
          <div style={S.mobileMenu}>
            {t.nav.map((link, i) => (
              <button key={i} onClick={() => scrollTo(i)} style={S.mobileLink}>{link}</button>
            ))}
            <button onClick={() => scrollTo(3)} style={{ ...S.mobileLink, color: C.wood }}>{t.cta}</button>
            <div style={{ display:"flex", gap:6, padding:"12px 0", borderBottom:`1px solid rgba(160,113,79,0.08)` }}>
              <LangBtn code="en" label="EN" />
              <LangBtn code="fr" label="FR" />
              <LangBtn code="ar" label="AR" />
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={S.hero}>
        <div style={S.heroOverlay} />
        <img src={PHOTOS[1].src} alt="Woodline" style={S.heroBg} />
        <div style={{ ...S.heroContent, ...(isRtl ? {marginLeft:0, marginRight:"max(2rem,calc(50vw - 580px))", textAlign:"right"} : {}) }} className="hero-anim">
          <p style={S.eyebrow}>{t.eyebrow}</p>
          <h1 style={S.heroTitle}>{t.heroTitle[0]}<br /><em>{t.heroTitle[1]}</em></h1>
          <p style={S.heroSub}>{t.heroSub}</p>
          <div style={S.heroCtas}>
            <button onClick={() => scrollTo(2)} style={S.ctaPrimary} className="cta-hover">{t.btn1}</button>
            <button onClick={() => scrollTo(3)} style={S.ctaSecondary} className="cta2-hover">{t.btn2}</button>
          </div>
        </div>
        <div style={S.heroScroll}>
          <span style={S.scrollLine} className="scroll-pulse" />
          <span style={S.scrollTxt}>↓</span>
        </div>
      </section>

      {/* PILLARS */}
      <section style={S.pillars}>
        {[
          { title: t.p1title, desc: t.p1desc, icon: "◈" },
          { title: t.p2title, desc: t.p2desc, icon: "✦" },
          { title: t.p3title, desc: t.p3desc, icon: "◎" },
        ].map(v => (
          <div key={v.title} style={{ ...S.pillar, ...(isRtl ? {textAlign:"right"} : {}) }} className="pillar-card">
            <span style={S.pillarIcon}>{v.icon}</span>
            <h3 style={S.pillarTitle}>{v.title}</h3>
            <p style={S.pillarDesc}>{v.desc}</p>
          </div>
        ))}
      </section>

      {/* ABOUT */}
      <section id="about" style={S.about}>
        <div style={S.aboutImgWrap}>
          <img src={PHOTOS[4].src} alt="Woodline interior" style={S.aboutImg} />
          <div style={S.aboutBadge}>
            <span style={S.badgeNum}>30+</span>
            <span style={S.badgeTxt}>{t.badgeTxt}</span>
          </div>
        </div>
        <div style={{ ...S.aboutText, ...(isRtl ? {paddingLeft:0, paddingRight:"2rem", textAlign:"right"} : {}) }}>
          <p style={S.eyebrowDark}>{t.aboutEye}</p>
          <h2 style={S.sectionTitle}>{t.aboutTitle[0]}<br /><em>{t.aboutTitle[1]}</em></h2>
          <p style={S.para}>{t.aboutP1}</p>
          <p style={S.para}>{t.aboutP2}</p>
          <div style={S.stats}>
            {t.stats.map(([n, l]) => (
              <div key={n} style={S.stat}>
                <span style={S.statNum}>{n}</span>
                <span style={S.statLbl}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={S.projects}>
        <div style={{ ...S.projectsHead, textAlign:"center" }}>
          <p style={S.eyebrowDark}>{t.portEye}</p>
          <h2 style={S.sectionTitle}>{t.portTitle}</h2>
          <p style={S.projectsSub}>{t.portSub}</p>
          <div style={S.filters}>
            <button onClick={() => setFilter("All")}
              style={{ ...S.filterBtn, ...(filter === "All" ? S.filterActive : {}) }}>{t.filterAll}</button>
            {allCategories.filter(c => c !== "All").map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{ ...S.filterBtn, ...(filter === cat ? S.filterActive : {}) }}>
                {t.cats[cat] || cat}
              </button>
            ))}
          </div>
        </div>
        <div style={S.grid}>
          {filtered.map((photo) => (
            <div key={photo.id} style={S.gridItem} className="grid-item"
              onClick={() => setLightbox(PHOTOS.findIndex(p => p.id === photo.id))}>
              <img src={photo.src} alt="" style={S.gridImg} />
              <div style={S.gridOverlay} className="grid-overlay">
                <span style={S.gridCat}>{t.cats[photo.category] || photo.category}</span>
                <span style={S.gridZoom}>↗</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={S.contact}>
        <div style={{ ...S.contactLeft, ...(isRtl ? {textAlign:"right"} : {}) }}>
          <p style={S.eyebrowLight}>{t.contactEye}</p>
          <h2 style={{ ...S.sectionTitle, color:"#F5ECD7" }}>{t.contactTitle[0]}<br /><em>{t.contactTitle[1]}</em></h2>
          <p style={S.contactIntro}>{t.contactIntro}</p>
          <div style={S.contactInfo}>
            {[
              { icon:"☎", label:"+961 3 011 175", href:"tel:+9613011175" },
              { icon:"✉", label:"fadi-kassabian@hotmail.com", href:"mailto:fadi-kassabian@hotmail.com" },
              { icon:"⌂", label:"Souk Mosbeh, Lebanon", href:null },
            ].map(({ icon, label, href }) => (
              <div key={label} style={{ ...S.contactRow, ...(isRtl ? {flexDirection:"row-reverse"} : {}) }}>
                <span style={S.contactIcon}>{icon}</span>
                {href ? <a href={href} style={S.contactLink}>{label}</a> : <span style={S.contactLabel}>{label}</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={S.contactRight}>
          {sent ? (
            <div style={S.successBox}>
              <span style={S.successCheck}>✓</span>
              <p style={S.successTxt}>{t.successTxt}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ ...S.form, ...(isRtl ? {textAlign:"right"} : {}) }}>
              {t.fields.slice(0,3).map(({ key, label, ph }) => (
                <div key={key} style={S.field}>
                  <label style={S.fieldLabel}>{label}</label>
                  <input type={key==="email"?"email":key==="phone"?"tel":"text"} placeholder={ph}
                    value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    style={{ ...S.input, ...(isRtl ? {textAlign:"right"} : {}) }}
                    required={key !== "phone"} className="form-input" />
                </div>
              ))}
              <div style={S.field}>
                <label style={S.fieldLabel}>{t.fields[3].label}</label>
                <textarea placeholder={t.fields[3].ph} value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ ...S.input, height:120, resize:"vertical", ...(isRtl ? {textAlign:"right"} : {}) }}
                  required className="form-input" />
              </div>
              {error && <p style={S.errorTxt}>{error}</p>}
              <button type="submit" style={{ ...S.submitBtn, opacity: sending ? 0.7 : 1 }}
                className="submit-hover" disabled={sending}>
                {sending ? t.sending : t.send}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={S.footerLogo}>
          <span style={S.logoMark}>W</span>
          <span style={{ ...S.logoName, color:"#C8B99A" }}>OODLINE</span>
        </div>
        <p style={S.footerTag}>{t.footerTag}</p>
        <p style={S.footerCopy}>{t.copy}</p>
      </footer>
    </div>
  );
}

const C = { cream:"#F5ECD7", creamLight:"#FBF6EE", wood:"#A0714F", woodDark:"#7A5234", woodDeep:"#3D2B1F", charcoal:"#1C1610", muted:"#8A7060" };
const S = {
  root:{fontFamily:"'Cormorant Garamond',Georgia,serif",background:C.creamLight,color:C.charcoal,margin:0,overflowX:"hidden"},
  lightboxOverlay:{position:"fixed",inset:0,background:"rgba(28,22,16,0.95)",zIndex:999,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"2rem",cursor:"pointer"},
  lightboxClose:{position:"absolute",top:20,right:24,background:"none",border:"none",color:C.cream,fontSize:28,cursor:"pointer",fontFamily:"inherit"},
  lightboxImg:{maxWidth:"90vw",maxHeight:"80vh",objectFit:"contain",cursor:"default"},
  nav:{position:"fixed",top:0,left:0,right:0,zIndex:100,transition:"background 0.4s,box-shadow 0.4s"},
  navScrolled:{background:"rgba(251,246,238,0.96)",backdropFilter:"blur(10px)",boxShadow:"0 1px 0 rgba(160,113,79,0.15)"},
  navInner:{maxWidth:1280,margin:"0 auto",padding:"0 2rem",display:"flex",alignItems:"center",justifyContent:"space-between",height:72},
  logo:{display:"flex",alignItems:"baseline",gap:4,cursor:"default"},
  logoMark:{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:700,color:C.wood,letterSpacing:-1},
  logoName:{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:600,letterSpacing:6,color:C.woodDeep},
  logoSub:{fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:3,color:C.muted,textTransform:"uppercase",marginLeft:6,alignSelf:"center"},
  navLinks:{display:"flex",alignItems:"center",gap:"1.5rem"},
  navLink:{background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,letterSpacing:2,color:C.muted,textTransform:"uppercase",padding:"4px 0",transition:"color 0.2s",borderBottom:"1px solid transparent"},
  navLinkActive:{color:C.wood,borderBottom:`1px solid ${C.wood}`},
  navCta:{background:C.wood,color:C.cream,border:"none",padding:"10px 22px",fontSize:12,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"background 0.2s"},
  burger:{display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:4},
  bLine:{display:"block",width:24,height:1.5,background:C.woodDeep,transition:"all 0.3s"},
  mobileMenu:{background:C.creamLight,borderTop:`1px solid rgba(160,113,79,0.12)`,display:"flex",flexDirection:"column",padding:"1rem 2rem"},
  mobileLink:{background:"none",border:"none",textAlign:"left",fontFamily:"inherit",fontSize:16,letterSpacing:2,color:C.woodDeep,padding:"12px 0",cursor:"pointer",textTransform:"uppercase",borderBottom:`1px solid rgba(160,113,79,0.08)`},
  hero:{position:"relative",height:"100vh",minHeight:640,display:"flex",alignItems:"center",overflow:"hidden"},
  heroOverlay:{position:"absolute",inset:0,background:"linear-gradient(110deg,rgba(28,22,16,0.75) 0%,rgba(28,22,16,0.35) 55%,rgba(28,22,16,0.08) 100%)",zIndex:1},
  heroBg:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0},
  heroContent:{position:"relative",zIndex:2,maxWidth:680,padding:"0 3rem",marginLeft:"max(2rem,calc(50vw - 580px))"},
  eyebrow:{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:C.wood,marginBottom:"1.5rem",fontWeight:400},
  eyebrowDark:{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:C.wood,marginBottom:"1rem",fontWeight:400},
  eyebrowLight:{fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(160,113,79,0.8)",marginBottom:"1rem",fontWeight:400},
  heroTitle:{fontSize:"clamp(3rem,6vw,5.2rem)",lineHeight:1.06,fontWeight:700,color:"#FBF6EE",margin:"0 0 1.5rem"},
  heroSub:{fontSize:18,lineHeight:1.75,color:"rgba(251,246,238,0.8)",maxWidth:480,marginBottom:"2.5rem",fontWeight:300},
  heroCtas:{display:"flex",gap:"1rem",flexWrap:"wrap"},
  ctaPrimary:{background:C.wood,color:"#FBF6EE",border:"none",padding:"15px 34px",fontSize:13,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"background 0.2s,transform 0.15s"},
  ctaSecondary:{background:"transparent",color:"#FBF6EE",border:"1px solid rgba(251,246,238,0.5)",padding:"15px 34px",fontSize:13,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",transition:"border-color 0.2s"},
  heroScroll:{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center",gap:8},
  scrollLine:{display:"block",width:1,height:44,background:"rgba(251,246,238,0.35)"},
  scrollTxt:{fontSize:14,color:"rgba(251,246,238,0.45)"},
  pillars:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",background:C.woodDeep},
  pillar:{padding:"3.5rem 2.5rem",borderRight:`1px solid rgba(251,246,238,0.06)`,transition:"background 0.3s"},
  pillarIcon:{display:"block",fontSize:20,color:C.wood,marginBottom:"1.25rem"},
  pillarTitle:{fontSize:22,fontWeight:600,color:C.cream,marginBottom:"0.75rem",fontStyle:"italic"},
  pillarDesc:{fontSize:15,lineHeight:1.8,color:"rgba(245,236,215,0.58)",fontWeight:300,margin:0},
  about:{display:"grid",gridTemplateColumns:"1fr 1fr",maxWidth:1280,margin:"0 auto",padding:"7rem 2rem",gap:"5rem",alignItems:"center"},
  aboutImgWrap:{position:"relative"},
  aboutImg:{width:"100%",height:540,objectFit:"cover",display:"block"},
  aboutBadge:{position:"absolute",bottom:-28,right:-28,background:C.wood,padding:"1.75rem 2.25rem",display:"flex",flexDirection:"column",alignItems:"center"},
  badgeNum:{fontSize:38,fontWeight:700,color:C.cream,lineHeight:1,fontStyle:"italic"},
  badgeTxt:{fontSize:11,letterSpacing:2,color:"rgba(245,236,215,0.8)",textTransform:"uppercase",marginTop:4},
  aboutText:{paddingLeft:"2rem"},
  sectionTitle:{fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:700,lineHeight:1.1,margin:"0 0 1.5rem",color:C.woodDeep},
  para:{fontSize:16,lineHeight:1.9,color:C.muted,marginBottom:"1rem",fontWeight:300},
  stats:{display:"flex",gap:"2.5rem",marginTop:"2.5rem",paddingTop:"2rem",borderTop:`1px solid rgba(160,113,79,0.2)`},
  stat:{display:"flex",flexDirection:"column"},
  statNum:{fontSize:34,fontWeight:700,color:C.wood,fontStyle:"italic",lineHeight:1},
  statLbl:{fontSize:12,letterSpacing:1,color:C.muted,marginTop:4},
  projects:{background:"#F0E8D8",padding:"7rem 2rem"},
  projectsHead:{maxWidth:1280,margin:"0 auto 3rem"},
  projectsSub:{fontSize:16,color:C.muted,maxWidth:520,margin:"1rem auto 2rem",lineHeight:1.75},
  filters:{display:"flex",gap:"0.75rem",justifyContent:"center",flexWrap:"wrap"},
  filterBtn:{background:"none",border:`1px solid rgba(160,113,79,0.3)`,padding:"8px 22px",fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",color:C.muted,transition:"all 0.2s"},
  filterActive:{background:C.wood,borderColor:C.wood,color:C.cream},
  grid:{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14},
  gridItem:{position:"relative",overflow:"hidden",aspectRatio:"4/3",cursor:"pointer"},
  gridImg:{width:"100%",height:"100%",objectFit:"cover",display:"block",transition:"transform 0.55s ease"},
  gridOverlay:{position:"absolute",inset:0,background:"rgba(28,22,16,0)",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"1.25rem",transition:"background 0.3s"},
  gridCat:{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.wood,marginBottom:4},
  gridZoom:{position:"absolute",top:14,right:14,fontSize:18,color:C.cream,opacity:0,transition:"opacity 0.3s"},
  contact:{display:"grid",gridTemplateColumns:"1fr 1fr",background:C.woodDeep},
  contactLeft:{padding:"6rem 4rem 6rem 3rem"},
  contactIntro:{fontSize:16,lineHeight:1.85,color:"rgba(245,236,215,0.6)",marginBottom:"2.5rem",fontWeight:300},
  contactInfo:{display:"flex",flexDirection:"column",gap:"1.1rem"},
  contactRow:{display:"flex",alignItems:"center",gap:"1rem"},
  contactIcon:{fontSize:16,color:C.wood,width:20,textAlign:"center"},
  contactLink:{fontSize:15,color:"rgba(245,236,215,0.75)",textDecoration:"none"},
  contactLabel:{fontSize:15,color:"rgba(245,236,215,0.75)"},
  contactRight:{background:C.creamLight,padding:"6rem 3rem 6rem 4rem"},
  form:{display:"flex",flexDirection:"column",gap:"1.25rem"},
  field:{display:"flex",flexDirection:"column",gap:"0.5rem"},
  fieldLabel:{fontSize:11,letterSpacing:2,textTransform:"uppercase",color:C.muted},
  input:{border:`1px solid rgba(160,113,79,0.3)`,background:"transparent",padding:"12px 14px",fontFamily:"inherit",fontSize:15,color:C.charcoal,outline:"none",width:"100%",boxSizing:"border-box",transition:"border-color 0.2s"},
  submitBtn:{background:C.wood,color:C.cream,border:"none",padding:"16px 32px",fontSize:13,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"inherit",marginTop:"0.5rem",transition:"background 0.2s"},
  errorTxt:{color:"#c0392b",fontSize:14},
  successBox:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",gap:"1rem",padding:"3rem",textAlign:"center"},
  successCheck:{width:64,height:64,borderRadius:"50%",border:`2px solid ${C.wood}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,color:C.wood},
  successTxt:{fontSize:18,color:C.muted,fontStyle:"italic"},
  footer:{background:C.charcoal,padding:"3rem 2rem",textAlign:"center"},
  footerLogo:{display:"flex",alignItems:"baseline",justifyContent:"center",gap:4,marginBottom:"0.75rem"},
  footerTag:{fontSize:11,letterSpacing:3,color:"rgba(200,185,154,0.45)",textTransform:"uppercase",marginBottom:"1rem"},
  footerCopy:{fontSize:11,color:"rgba(200,185,154,0.28)"},
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box} body{overflow-x:hidden} em{font-style:italic}
  .hero-anim{animation:fadeUp 1s ease both}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
  .scroll-pulse{animation:pulse 2.5s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:0.35}50%{opacity:0.8}}
  .cta-hover:hover{background:#7A5234!important;transform:translateY(-2px)}
  .cta2-hover:hover{border-color:rgba(251,246,238,0.9)!important}
  .submit-hover:hover{background:#7A5234!important}
  .pillar-card:hover{background:rgba(245,236,215,0.05)!important}
  .grid-item:hover img{transform:scale(1.07)}
  .grid-item:hover .grid-overlay{background:rgba(28,22,16,0.6)!important}
  .grid-item:hover span:last-child{opacity:1!important}
  .form-input:focus{border-color:#A0714F!important}
  @media(max-width:1000px){.nav-links{display:none!important}.burger{display:flex!important}}
  @media(max-width:768px){
    #projects .grid{grid-template-columns:1fr 1fr!important}
    #contact{grid-template-columns:1fr!important}
    #contact>div{padding:3rem 1.5rem!important}
    #about{grid-template-columns:1fr!important;gap:3rem!important;padding:4rem 1.5rem!important}
  }
  @media(max-width:480px){#projects .grid{grid-template-columns:1fr!important}}
`;
