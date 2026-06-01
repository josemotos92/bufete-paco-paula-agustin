"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const socios = [
  {
    nombre: "Paula",
    cargo: "Socia Fundadora",
    especialidad: "Derecho Digital · Protección de Datos · Paciencia Infinita",
    bio: "Colegiada nº 42.069 en el ICAB. Lleva 12 años ejerciendo y 12 años intentando que sus socios no se duerman durante los juicios. Pionera en el RGPD aplicado a golosinas felinas. Ha ganado el 94% de sus casos. El 6% restante coincide con los días de nieve, cuando Paula estaba en pista.",
    logros: ["Colegiada ICAB · Máster en RGPD", "Premio 'Abogada del Año' (según sus gatos)", "Resistencia certificada a las faltas de atención", "Única socia que responde los emails"],
    foto: "/image-1780332351606.jpg",
    emoji: "⚖️",
  },
  {
    nombre: "Paco",
    cargo: "Socio Senior",
    especialidad: "Derecho Felino · Intimidación Procesal · Siesta Estratégica",
    bio: "7 años en el sector (49 en años gato). Su mirada fija ha conseguido más acuerdos extrajudiciales que todos los abogados del ICAB juntos. Especialista en derechos de paso, reclamaciones de territorio y caza mayor de ratones. No acepta casos que interrumpan su horario de siesta.",
    logros: ["Experto en miradas intimidatorias (certificado)", "Campeón nacional de siesta jurídica 2022–2024", "Récord: 14 acuerdos en un mismo bufé", "DPC: Delegado de Protección de Croquetas"],
    foto: "/image-1780332171328.jpg",
    emoji: "🐱",
  },
  {
    nombre: "Agustín",
    cargo: "Socio de Privacidad",
    especialidad: "RGPD · Derechos Digitales · Esponjosidad Avanzada",
    bio: "El más esponjoso del bufete y, paradójicamente, el más experto en RGPD. Ha redactado 47 políticas de privacidad, aunque ninguna cubre el tratamiento de datos de ratones. Su pelo blanco no es por la edad: es por los plazos de la AEPD. Trabaja desde casa. Siempre.",
    logros: ["CIPP/E · Certificado en Esponjosidad Avanzada", "47 políticas de privacidad redactadas", "Ex-asesor de la AEPD (rumores no confirmados)", "Récord de siesta continua: 16h 42min"],
    foto: "/image-1780332357207.jpg",
    emoji: "🤍",
  },
];

const marcasLujo = [
  { nombre: "HERMÈS", detalle: "Derecho de paso en territorio Kelly" },
  { nombre: "BALENCIAGA", detalle: "RGPD de colecciones felinas SS25" },
  { nombre: "LOUIS VUITTON", detalle: "Protección del monogram ante arañazos" },
  { nombre: "CHANEL", detalle: "Privacidad del Nº5 — ¿quién lo olfateó?" },
  { nombre: "GUCCI", detalle: "Defensa del territorio GG ante ocupación felina" },
  { nombre: "DIOR", detalle: "Gestión de datos de la New Look Collection" },
  { nombre: "PRADA", detalle: "Derecho al olvido del bag incident de 2019" },
  { nombre: "BOTTEGA VENETA", detalle: "Privacidad del intrecciato — secreto empresarial" },
  { nombre: "SAINT LAURENT", detalle: "Derechos digitales de las plataformas nocturnas" },
  { nombre: "BURBERRY", detalle: "Protección del check — caso de usurpación de identidad" },
];

const areas = [
  { titulo: "RGPD", subtitulo: "Reglamento General de Protección de Datos y de Croquetas", descripcion: "Asesoramiento integral en protección de datos personales. Incluye DPO externo, auditoría de brechas y verificación de si tu gato sabe dónde guardas la comida premium.", icono: "🛡️" },
  { titulo: "LOPDGDD", subtitulo: "Ley de Obligatoria Protección De Gatos Domésticos Dormilones", descripcion: "Especialistas en la aplicación de esta ley. Especialmente el artículo 13, que garantiza el derecho fundamental a ignorar al humano durante las videollamadas de trabajo.", icono: "📚" },
  { titulo: "Derechos Digitales", subtitulo: "Incluyendo el derecho a ignorar notificaciones", descripcion: "Derecho al olvido, derecho a la desconexión digital, y derecho fundamental a no ser grabado mientras duermes en posición comprometida sobre el teclado.", icono: "💻" },
  { titulo: "Derecho Felino", subtitulo: "Especialidad única en España peninsular e islas", descripcion: "Reclamaciones de territorio, derechos de paso por encima del portátil, impugnaciones de horario de comida y recursos contra el veterinario. Primera consulta gratis si traes atún.", icono: "🐾" },
];

const honorarios = [
  { servicio: "Consulta Inicial", precio: "Gratis", detalle: "Con acreditación de croquetas de categoría premium o superior", icono: "📋" },
  { servicio: "Expediente Completo", precio: "3 croquetas", detalle: "Más una rascada detrás de las orejas. Agustín exige ambas en simultáneo.", icono: "📁" },
  { servicio: "Recurso de Amparo", precio: "1 lata de atún", detalle: "En aceite de oliva. Sin espinas. Paco lo comprobará antes de aceptar.", icono: "⚖️" },
  { servicio: "Urgencias 24h", precio: "Bajo consulta", detalle: "Solo fuera del horario de siesta. Ver calendario adjunto (157 páginas).", icono: "🚨" },
];

const faqs = [
  { q: "¿Aceptáis casos urgentes?", a: "Depende. Si es antes de las 11h, Agustín no está disponible. Si es después de las 14h, Paco está en siesta. Hay una ventana de 30 minutos entre las 12:30 y las 13:00. Aprovéchela." },
  { q: "¿Cuál es vuestra tasa de éxito?", a: "94%. El 6% restante coincide exactamente con los días en que hay nieve fresca en pista. No hay relación causal probada." },
  { q: "¿Puedo traer a mi mascota a la consulta?", a: "Solo si no ladra. Paco ha ganado casos contra perros y los recuerda todos. No es amenaza, es historial." },
  { q: "¿Trabajáis casos internacionales?", a: "Sí. Agustín tiene experiencia en derecho europeo desde el RGPD de 2018. También estuvo en Bruselas, aunque sus abogados dicen que fue en sueños." },
  { q: "¿Hacéis contratos en inglés?", a: "Agustín dice que sí. Luego los olfatea durante 40 minutos y se va. El resultado es el mismo." },
  { q: "¿Dónde está vuestro despacho?", a: "Tenemos tres ubicaciones: la silla gaming roja, el sofá del salón y la caja de zapatillas Cloudstratus talla 11.5. Paco elige según el caso." },
];

const testimonios = [
  { texto: "Llevaba semanas mirando a mi dueño con esta cara y no me entendía. Gracias a Paco, conseguimos un acuerdo en 20 minutos. Profesionalidad pura.", autor: "Ramoncín", cargo: "Chihuahua indignado, Toledo", foto: "/foto2.png" },
  { texto: "Mi cara lo dice todo. Contraté al bufete para reclamar acceso ilimitado al sofá. Ganamos. El juez vio mi foto y no pudo negarse.", autor: "Esperancita", cargo: "Chihuahua con derechos, Murcia", foto: "/foto5.png" },
  { texto: "Agustín redactó una política de privacidad para que mi dueño dejara de subirme fotos a Instagram sin consentimiento.", autor: "Pearlita III", cargo: "Influencer forzada, Barcelona", foto: "/foto8.png" },
  { texto: "No tengo palabras. Solo esta cara. El bufete consiguió que me dieran de comer a las horas acordadas. Primera vez en 3 años.", autor: "Napoleón", cargo: "Chihuahua resarcido, Madrid", foto: "/foto4.png" },
];

const galeria = [
  { src: "/image-1780332342368.jpg", alt: "Los socios felinos", caption: "Agustín y Paco. Disponibles para casos de alta complejidad. Y para croquetas." },
  { src: "/equipo.jpg", alt: "El equipo al completo", caption: "Foto oficial del bufete. Nadie quiso sonreír." },
  { src: "/image-1780332351606.jpg", alt: "Paula con Paco", caption: "Paula en consulta privada con el socio senior. Paco no estaba de acuerdo." },
  { src: "/pacoyaguspelea.jpg", alt: "Mediación fallida", caption: "Mediación fallida. Paco impugna la orden del día. Agustín no cede. St. Moritz de fondo." },
  { src: "/image-1780332157624.jpg", alt: "Consejo de socios", caption: "Consejo de socios en plena deliberación. Acuerdo unánime: más croquetas." },
  { src: "/image-1780332357207.jpg", alt: "Agustín y los honorarios", caption: "Agustín evaluando si el pastel cubre los honorarios. Veredicto: insuficiente." },
  { src: "/agus.jpg", alt: "Agustín en su despacho", caption: "Agustín redactando la política de privacidad número 48. Desde las 10h." },
  { src: "/image-1780332359997.jpg", alt: "Paco tras el juicio", caption: "Paco tras ganar el caso. El sofá es su sala de celebraciones." },
  { src: "/image-1780332168359.jpg", alt: "Paco durante el alegato", caption: "Paco en pleno alegato. Nadie se atrevió a interrumpirle." },
  { src: "/image-1780332171328.jpg", alt: "Despacho de Paco", caption: "El despacho de Paco. Cloudstratus talla 11.5. Le viene justo pero es suyo." },
  { src: "/image-1780332427506.jpg", alt: "Acuerdo total", caption: "Reunión de socios. Orden del día: estar cómodos. Aprobado por unanimidad." },
  { src: "/image-1780332436059.jpg", alt: "Sala de deliberaciones", caption: "Paco en su sala de deliberaciones privada. Privacísima." },
  { src: "/image-1780332430836.jpg", alt: "Paula en pista", caption: "Paula preparando su alegato en las alturas. Las pistas también son su despacho." },
  { src: "/image-1780332433632.jpg", alt: "Retiro estratégico", caption: "Retiro estratégico anual. Los gatos se quedan en casa. Agustín no lo sabe todavía." },
  { src: "/image-1780332438825.jpg", alt: "Paula subiendo", caption: "Paula subiendo hacia el siguiente caso. Literalmente." },
];

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.5em] uppercase mb-4 font-medium" style={{ color: "#c9a84c" }}>
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
      {children}
    </h2>
  );
}

function AccordionItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeIn delay={index * 0.07}>
      <div className="border-b" style={{ borderColor: "#27272a" }}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors pr-4">
            {q}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 text-xl font-light"
            style={{ color: "#c9a84c" }}
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <p className="text-zinc-400 text-sm leading-relaxed pb-5 italic">
                {a}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────────

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="min-h-screen text-zinc-100" style={{ backgroundColor: "#09090b", fontFamily: "var(--font-inter)" }}>

      {/* BARRA DE ANUNCIO */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full py-2 px-4 text-center text-xs tracking-widest uppercase font-bold"
        style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
      >
        🐾 Nueva especialidad: Derecho Canino. Ahora también defendemos chihuahuas 🐾
      </motion.div>

      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="fixed top-6 w-full z-50 px-6"
      >
        <div
          className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between rounded-full border"
          style={{ backgroundColor: "rgba(9,9,11,0.80)", backdropFilter: "blur(20px)", borderColor: "rgba(201,168,76,0.25)" }}
        >
          <div className="font-bold text-sm tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-playfair)", color: "#c9a84c" }}>
            Bufete P.P.A.
          </div>
          <div className="hidden md:flex gap-8 text-xs text-zinc-400 tracking-widest uppercase">
            {[{ label: "Socios", href: "#socios" }, { label: "Galería", href: "#galeria" }, { label: "Áreas", href: "#areas" }, { label: "FAQ", href: "#faq" }, { label: "Contacto", href: "#contacto" }, { label: "🔍 Auditoría", href: "/auditoria" }].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-white transition-colors duration-200">{item.label}</a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fondo animado */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="glow-pulse absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xs tracking-[0.6em] uppercase mb-10 font-medium"
            style={{ color: "#c9a84c" }}
          >
            Ilustre Bufete · Barcelona · Desde 2019
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-9xl font-bold leading-none mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Paco, Paula
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-6xl md:text-9xl font-bold leading-none mb-10 tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span style={{ color: "#c9a84c" }}>&</span> Agustín
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
            className="text-zinc-400 text-lg md:text-xl mb-3 font-light max-w-2xl mx-auto"
          >
            Expertos en Protección de Datos, Derechos Digitales y Derecho Felino Internacional
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }}
            className="text-zinc-600 text-sm mb-14 italic"
          >
            &ldquo;La justicia es ciega. Nosotros también, especialmente durante la siesta.&rdquo;
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href="#socios"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-sm font-bold tracking-widest uppercase"
              style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
            >
              Conocer al Equipo
            </motion.a>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-sm font-bold tracking-widest uppercase border"
              style={{ borderColor: "rgba(201,168,76,0.4)", color: "#c9a84c" }}
            >
              Consulta Inicial
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: "#c9a84c" }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-px h-10 bg-current" />
          <span className="text-xs tracking-widest uppercase">scroll</span>
        </motion.div>
      </section>

      {/* FOTO + PRESENTACIÓN */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
                className="aspect-[4/3] overflow-hidden border"
                style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "#18181b" }}
              >
                <img src="/equipo.jpg" alt="Paula, Paco y Agustín" className="w-full h-full object-cover" />
              </motion.div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: "#c9a84c", color: "#09090b" }}>
                ICAB · RGPD · LOPDGDD
              </div>
              {/* Glow */}
              <div className="absolute -inset-1 -z-10 rounded-sm opacity-20 blur-xl" style={{ background: "linear-gradient(135deg, #c9a84c, transparent)" }} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <SectionLabel>Quiénes somos</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              El bufete más peludo<br />de Barcelona
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4 text-sm">
              Fundado en 2019, el Bufete Paco, Paula & Agustín nació de la necesidad urgente de combinar rigor jurídico con la perspectiva única de quienes duermen 16 horas al día.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8 text-sm">
              Nuestro enfoque multidisciplinar, con humanos y felinos trabajando juntos, nos permite abordar casos desde ángulos que los bufetes tradicionales simplemente no consideran. Como el de debajo de la mesa.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t pt-8" style={{ borderColor: "#27272a" }}>
              {[{ num: "12+", label: "años ejerciendo" }, { num: "47", label: "políticas de privacidad" }, { num: "∞", label: "siestas jurídicas" }].map((stat, i) => (
                <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <div className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#c9a84c" }}>{stat.num}</div>
                  <div className="text-zinc-500 text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MARCAS DE LUJO */}
      <section className="py-16 overflow-hidden border-y" style={{ borderColor: "#1a1a1d" }}>
        <FadeIn>
          <p className="text-center text-xs tracking-[0.5em] uppercase mb-8 text-zinc-600">Clientes distinguidos de la casa</p>
        </FadeIn>
        {/* Marquee 1 */}
        <div className="relative flex overflow-hidden mb-4">
          <div className="animate-marquee flex shrink-0 gap-12 pr-12">
            {[...marcasLujo, ...marcasLujo].map((m, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span className="text-lg font-bold tracking-[0.2em] text-zinc-300" style={{ fontFamily: "var(--font-playfair)" }}>{m.nombre}</span>
                <span className="text-zinc-700 text-xs italic hidden md:block">{m.detalle}</span>
                <span className="text-zinc-800 mx-4">✦</span>
              </div>
            ))}
          </div>
        </div>
        {/* Marquee 2 — reverso */}
        <div className="relative flex overflow-hidden opacity-40">
          <div className="animate-marquee-reverse flex shrink-0 gap-12 pr-12">
            {[...marcasLujo, ...marcasLujo].reverse().map((m, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold tracking-[0.2em] text-zinc-600" style={{ fontFamily: "var(--font-playfair)" }}>{m.nombre}</span>
                <span className="text-zinc-800 mx-4">·</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIOS */}
      <section id="socios" className="py-24" style={{ backgroundColor: "#0d0d10" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Nuestro equipo</SectionLabel>
            <SectionTitle>Los Socios</SectionTitle>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {socios.map((socio, i) => (
              <FadeIn key={socio.nombre} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(201,168,76,0.08)" }}
                  transition={{ duration: 0.3 }}
                  className="border p-8 h-full"
                  style={{ borderColor: "#27272a" }}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-2 flex items-center justify-center text-4xl" style={{ borderColor: "rgba(201,168,76,0.3)", backgroundColor: "#18181b" }}>
                    <img src={socio.foto} alt={socio.nombre} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  </div>
                  <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "#c9a84c" }}>{socio.cargo}</p>
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{socio.nombre}</h3>
                  <p className="text-zinc-600 text-xs mb-5 italic">{socio.especialidad}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{socio.bio}</p>
                  <ul className="space-y-2">
                    {socio.logros.map((logro) => (
                      <li key={logro} className="flex items-start gap-2 text-xs text-zinc-500">
                        <span className="mt-0.5 shrink-0" style={{ color: "#c9a84c" }}>✦</span>
                        {logro}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionLabel>La vida en el bufete</SectionLabel>
            <SectionTitle>Galería</SectionTitle>
            <p className="text-zinc-600 text-sm mt-3 italic">Trabajo duro, reflexión jurídica y siestas merecidas.</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {galeria.map((foto, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.07 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
                className={`overflow-hidden border relative group cursor-pointer ${i === 0 ? "col-span-2 row-span-2" : "aspect-square"}`}
                style={{ borderColor: "#27272a", backgroundColor: "#18181b" }}
              >
                <img src={foto.src} alt={foto.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }} />
                <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, rgba(9,9,11,0.92) 0%, transparent 60%)" }}>
                  <p className="text-xs text-zinc-300 italic p-4 leading-relaxed">{foto.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREAS */}
      <section id="areas" className="py-24" style={{ backgroundColor: "#0d0d10" }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Lo que hacemos</SectionLabel>
            <SectionTitle>Áreas de Práctica</SectionTitle>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area, i) => (
              <FadeIn key={area.titulo} delay={i * 0.1}>
                <motion.div
                  whileHover={{ borderColor: "rgba(201,168,76,0.4)", x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="border p-8"
                  style={{ borderColor: "#27272a" }}
                >
                  <div className="text-4xl mb-5">{area.icono}</div>
                  <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{area.titulo}</h3>
                  <p className="text-xs mb-4 italic" style={{ color: "#c9a84c" }}>{area.subtitulo}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed">{area.descripcion}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HONORARIOS */}
      <section id="honorarios" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Transparencia total</SectionLabel>
            <SectionTitle>Honorarios</SectionTitle>
            <p className="text-zinc-500 mt-4 text-sm">Aceptamos croquetas, atún y rascadas. Raramente euros.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {honorarios.map((h, i) => (
              <FadeIn key={h.servicio} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(201,168,76,0.1)" }}
                  transition={{ duration: 0.3 }}
                  className="border p-6 text-center h-full"
                  style={{ borderColor: "#27272a" }}
                >
                  <div className="text-4xl mb-4 float">{h.icono}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>{h.servicio}</h3>
                  <p className="text-xl font-bold mb-3" style={{ color: "#c9a84c" }}>{h.precio}</p>
                  <p className="text-zinc-500 text-xs leading-relaxed">{h.detalle}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24" style={{ backgroundColor: "#0d0d10" }}>
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Dudas frecuentes</SectionLabel>
            <SectionTitle>Preguntas & Respuestas</SectionTitle>
          </FadeIn>
          <div>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Nuestros clientes hablan</SectionLabel>
            <SectionTitle>Testimonios</SectionTitle>
            <p className="text-zinc-600 text-sm mt-3 italic">No discriminamos por especie. Todos los peludos merecen justicia.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonios.map((t, i) => (
              <FadeIn key={t.autor} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                  className="border p-6 flex flex-col h-full"
                  style={{ borderColor: "#27272a" }}
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto border-2" style={{ borderColor: "rgba(201,168,76,0.3)" }}>
                    <img src={t.foto} alt={t.autor} className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="text-3xl mb-3 text-center" style={{ color: "#c9a84c", fontFamily: "var(--font-playfair)" }}>&ldquo;</p>
                  <p className="text-zinc-300 text-xs leading-relaxed mb-6 italic flex-1">{t.texto}</p>
                  <div className="border-t pt-4" style={{ borderColor: "#27272a" }}>
                    <p className="font-semibold text-sm">{t.autor}</p>
                    <p className="text-zinc-500 text-xs">{t.cargo}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-24" style={{ backgroundColor: "#0d0d10" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <SectionLabel>Escríbenos</SectionLabel>
            <SectionTitle>Contacto</SectionTitle>
            <p className="text-zinc-400 mt-6 mb-12 leading-relaxed text-sm">
              Atendemos consultas de lunes a viernes, salvo cuando Paco decide que la agenda puede esperar. Para urgencias, dejar atún frente a la puerta y aguardar pacientemente.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            {[
              { titulo: "Horario", lineas: ["L–V: 10h–14h", "Resto: bajo consulta"], nota: "Agustín no antes de las 11h" },
              { titulo: "Ubicación", lineas: ["Barcelona, España", "Barrio de les Croquetes"], nota: "Cerca del parque donde duerme Paco" },
              { titulo: "Especialidades", lineas: ["RGPD · LOPDGDD", "Derecho Felino"], nota: "Y siesta jurídica avanzada" },
            ].map((item, i) => (
              <FadeIn key={item.titulo} delay={i * 0.1}>
                <motion.div
                  whileHover={{ borderColor: "rgba(201,168,76,0.3)" }}
                  className="border p-6 transition-colors"
                  style={{ borderColor: "#27272a" }}
                >
                  <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>{item.titulo}</p>
                  {item.lineas.map((l) => <p key={l} className="text-sm text-zinc-400">{l}</p>)}
                  <p className="text-zinc-600 text-xs mt-2 italic">{item.nota}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <motion.a
              href="mailto:paco.paula.agustin@bufete.cat"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="inline-block px-12 py-4 text-sm font-bold tracking-widest uppercase"
              style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
            >
              Solicitar Consulta
            </motion.a>
            <p className="text-zinc-700 text-xs mt-6">* El tiempo de respuesta depende del nivel de interés de Paco en el asunto.</p>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10" style={{ borderColor: "#18181b" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-bold tracking-widest text-sm uppercase" style={{ fontFamily: "var(--font-playfair)", color: "#c9a84c" }}>
            Bufete Paco, Paula & Agustín
          </div>
          <p className="text-zinc-600 text-xs text-center">
            © 2025 Bufete Paco, Paula & Agustín · Colegiados en el ICAB · Todos los derechos reservados · Especialmente el de la siesta
          </p>
          <p className="text-zinc-700 text-xs">Powered by croquetes & Next.js</p>
        </div>
      </footer>

    </main>
  );
}
