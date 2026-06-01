"use client";

const socios = [
  {
    nombre: "Paula",
    cargo: "Socia Fundadora",
    especialidad: "Derecho Digital · Protección de Datos · Paciencia Infinita",
    bio: "Colegiada nº 42.069 en el ICAB. Lleva 12 años ejerciendo y 12 años intentando que sus socios no se duerman durante los juicios. Pionera en la aplicación del RGPD al sector de las golosinas para gatos. Ha ganado el 94% de sus casos, aunque el 6% restante se resolvió cuando Paco simplemente se fue.",
    logros: [
      "Colegiada ICAB · Máster en RGPD",
      "Premio 'Abogada del Año' (según sus gatos)",
      "Resistencia certificada a las faltas de atención",
      "Única socia que responde los emails",
    ],
    foto: "/image-1780332351606.jpg",
    emoji: "⚖️",
  },
  {
    nombre: "Paco",
    cargo: "Socio Senior",
    especialidad: "Derecho Felino · Intimidación Procesal · Siesta Estratégica",
    bio: "7 años en el sector (49 en años gato). Su mirada fija durante los interrogatorios ha conseguido más acuerdos extrajudiciales que todos los abogados del ICAB juntos. Especialista en derechos de paso, reclamaciones de territorio y caza mayor de ratones. No acepta casos que interrumpan su horario de siesta.",
    logros: [
      "Experto en miradas intimidatorias (certificado)",
      "Campeón nacional de siesta jurídica 2022–2024",
      "Récord: 14 acuerdos en un mismo bufé",
      "DPC: Delegado de Protección de Croquetas",
    ],
    foto: "/image-1780332171328.jpg",
    emoji: "🐱",
  },
  {
    nombre: "Agustín",
    cargo: "Socio de Privacidad",
    especialidad: "RGPD · Derechos Digitales · Esponjosidad Avanzada",
    bio: "El más esponjoso del bufete y, paradójicamente, el más experto en RGPD. Ha redactado 47 políticas de privacidad, aunque ninguna cubre el tratamiento de datos de ratones. Su pelo blanco no es por la edad: es por los plazos de la AEPD. Trabaja desde casa. Siempre.",
    logros: [
      "CIPP/E · Certificado en Esponjosidad Avanzada",
      "47 políticas de privacidad redactadas",
      "Ex-asesor de la AEPD (rumores no confirmados)",
      "Récord de siesta continua: 16h 42min",
    ],
    foto: "/image-1780332357207.jpg",
    emoji: "🤍",
  },
];

const areas = [
  {
    titulo: "RGPD",
    subtitulo: "Reglamento General de Protección de Datos y de Croquetas",
    descripcion:
      "Asesoramiento integral en protección de datos personales. Incluye DPO externo, auditoría de brechas y verificación de si tu gato sabe dónde guardas la comida premium.",
    icono: "🛡️",
  },
  {
    titulo: "LOPDGDD",
    subtitulo: "Ley de Obligatoria Protección De Gatos Domésticos Dormilones",
    descripcion:
      "Especialistas en la aplicación de esta ley. Especialmente el artículo 13, que garantiza el derecho fundamental a ignorar al humano durante las videollamadas de trabajo.",
    icono: "📚",
  },
  {
    titulo: "Derechos Digitales",
    subtitulo: "Incluyendo el derecho a ignorar notificaciones",
    descripcion:
      "Derecho al olvido, derecho a la desconexión digital, y derecho fundamental a no ser grabado mientras duermes en posición comprometida sobre el teclado.",
    icono: "💻",
  },
  {
    titulo: "Derecho Felino",
    subtitulo: "Especialidad única en España peninsular e islas",
    descripcion:
      "Reclamaciones de territorio, derechos de paso por encima del portátil, impugnaciones de horario de comida y recursos contra el veterinario. Primera consulta gratis si traes atún.",
    icono: "🐾",
  },
];

const honorarios = [
  {
    servicio: "Consulta Inicial",
    precio: "Gratis",
    detalle:
      "Con acreditación de que dispones de croquetas de categoría premium o superior",
    icono: "📋",
  },
  {
    servicio: "Expediente Completo",
    precio: "3 croquetas",
    detalle:
      "Más una rascada detrás de las orejas. Agustín exige ambas orejas en simultáneo.",
    icono: "📁",
  },
  {
    servicio: "Recurso de Amparo",
    precio: "1 lata de atún",
    detalle:
      "En aceite de oliva. Sin espinas. Paco lo comprobará personalmente antes de aceptar.",
    icono: "⚖️",
  },
  {
    servicio: "Urgencias 24h",
    precio: "Bajo consulta",
    detalle:
      "Disponible solo fuera del horario de siesta. Ver calendario de siestas adjunto (157 páginas).",
    icono: "🚨",
  },
];

const testimonios = [
  {
    texto:
      "Llevaba semanas mirando a mi dueño con esta cara y no me entendía. Gracias a Paco, que utilizó exactamente la misma táctica, conseguimos un acuerdo en 20 minutos. Profesionalidad pura.",
    autor: "Ramoncín",
    cargo: "Chihuahua indignado, Toledo",
    foto: "/foto2.png",
  },
  {
    texto:
      "Mi cara lo dice todo. Contraté al bufete para reclamar acceso ilimitado al sofá. Ganamos. La sentencia fue inapelable: el juez vio mi foto y no pudo negarse.",
    autor: "Esperancita",
    cargo: "Chihuahua con derechos, Murcia",
    foto: "/foto5.png",
  },
  {
    texto:
      "Agustín redactó una política de privacidad para que mi dueño dejara de subirme fotos a Instagram sin consentimiento. El RGPD también protege a los peludos con dignidad.",
    autor: "Pearlita III",
    cargo: "Influencer forzada, Barcelona",
    foto: "/foto8.png",
  },
  {
    texto:
      "No tengo palabras. Solo esta cara. El bufete consiguió que me dieran de comer a las horas acordadas. Primera vez en 3 años que la justicia funciona.",
    autor: "Napoleón",
    cargo: "Chihuahua resarcido, Madrid",
    foto: "/foto4.png",
  },
];

const galeria = [
  {
    src: "/image-1780332342368.jpg",
    alt: "Los socios felinos en su mejor momento",
    caption: "Agustín y Paco. Disponibles para casos de alta complejidad. Y para croquetas.",
  },
  {
    src: "/equipo.jpg",
    alt: "El equipo al completo",
    caption: "Foto oficial del bufete. Nadie quiso sonreír.",
  },
  {
    src: "/image-1780332351606.jpg",
    alt: "Paula con Paco",
    caption: "Paula en consulta privada con el socio senior. Paco no estaba de acuerdo.",
  },
  {
    src: "/pacoyaguspelea.jpg",
    alt: "Sesión de mediación entre socios",
    caption: "Mediación fallida. Paco impugna la orden del día. Agustín no cede. St. Moritz de fondo.",
  },
  {
    src: "/image-1780332157624.jpg",
    alt: "Consejo de socios",
    caption: "Consejo de socios en plena deliberación. Acuerdo unánime: más croquetas.",
  },
  {
    src: "/image-1780332357207.jpg",
    alt: "Agustín revisando los honorarios",
    caption: "Agustín evaluando si el pastel cubre los honorarios del mes. Veredicto: insuficiente.",
  },
  {
    src: "/agus.jpg",
    alt: "Agustín en su despacho",
    caption: "Agustín redactando la política de privacidad número 48. Lleva así desde las 10h.",
  },
  {
    src: "/image-1780332359997.jpg",
    alt: "Paco tras el juicio",
    caption: "Paco tras ganar el caso. El sofá es su sala de celebraciones.",
  },
  {
    src: "/image-1780332168359.jpg",
    alt: "Paco durante el alegato",
    caption: "Paco en pleno alegato. Nadie en la sala se atrevió a interrumpirle.",
  },
  {
    src: "/image-1780332171328.jpg",
    alt: "Paco en su despacho provisional",
    caption: "El despacho de Paco. Cloudstratus talla 11.5. Le viene justo pero es suyo.",
  },
];

export default function Home() {
  return (
    <main
      className="min-h-screen text-zinc-100"
      style={{ backgroundColor: "#09090b", fontFamily: "var(--font-inter)" }}
    >
      {/* BARRA DE ANUNCIO */}
      <div
        className="w-full py-2 px-4 text-center text-xs tracking-widest uppercase font-bold"
        style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
      >
        🐾 Nueva especialidad: Derecho Canino. Ahora también defendemos chihuahuas 🐾
      </div>

      {/* NAVBAR */}
      <nav
        className="fixed top-0 w-full z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: "rgba(9,9,11,0.85)",
          borderColor: "rgba(201,168,76,0.2)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="font-bold text-sm tracking-[0.25em] uppercase"
            style={{ fontFamily: "var(--font-playfair)", color: "#c9a84c" }}
          >
            Bufete P.P.A.
          </div>
          <div className="hidden md:flex gap-8 text-xs text-zinc-400 tracking-widest uppercase">
            {[
              { label: "Socios", href: "#socios" },
              { label: "Galería", href: "#galeria" },
              { label: "Áreas", href: "#areas" },
              { label: "Honorarios", href: "#honorarios" },
              { label: "Contacto", href: "#contacto" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-zinc-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-8"
            style={{ color: "#c9a84c" }}
          >
            Ilustre Bufete · Barcelona · Desde 2019
          </p>
          <h1
            className="text-5xl md:text-8xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Paco, Paula
            <br />
            <span style={{ color: "#c9a84c" }}>&</span> Agustín
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl mb-4 font-light max-w-2xl mx-auto">
            Expertos en Protección de Datos, Derechos Digitales
            <br />y Derecho Felino Internacional
          </p>
          <p className="text-zinc-600 text-sm mb-12 italic">
            &ldquo;La justicia es ciega. Nosotros también, especialmente durante
            la siesta.&rdquo;
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#socios"
              className="px-8 py-3 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
            >
              Conocer al Equipo
            </a>
            <a
              href="#contacto"
              className="px-8 py-3 text-sm font-bold tracking-widest uppercase border transition-opacity hover:opacity-80"
              style={{ borderColor: "rgba(201,168,76,0.4)", color: "#c9a84c" }}
            >
              Consulta Inicial
            </a>
          </div>
        </div>
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
          style={{ color: "#c9a84c" }}
        >
          <div className="w-px h-12 bg-current" />
          <span className="text-xs tracking-widest uppercase">scroll</span>
        </div>
      </section>

      {/* FOTO + PRESENTACIÓN */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div
              className="aspect-[4/3] overflow-hidden border"
              style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "#18181b" }}
            >
              <img
                src="/equipo.jpg"
                alt="Paula, Paco y Agustín"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-4 -right-4 px-4 py-2 text-xs font-bold tracking-widest uppercase"
              style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
            >
              ICAB · RGPD · LOPDGDD
            </div>
          </div>
          <div>
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#c9a84c" }}
            >
              Quiénes somos
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              El bufete más peludo
              <br />
              de Barcelona
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4 text-sm">
              Fundado en 2019, el Bufete Paco, Paula & Agustín nació de la
              necesidad urgente de combinar rigor jurídico con la perspectiva
              única de quienes duermen 16 horas al día.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8 text-sm">
              Nuestro enfoque multidisciplinar, con humanos y felinos trabajando
              juntos, nos permite abordar casos desde ángulos que los bufetes
              tradicionales simplemente no consideran. Como el de debajo de la
              mesa.
            </p>
            <div
              className="grid grid-cols-3 gap-4 border-t pt-8"
              style={{ borderColor: "#27272a" }}
            >
              {[
                { num: "12+", label: "años ejerciendo" },
                { num: "47", label: "políticas de privacidad" },
                { num: "∞", label: "siestas jurídicas" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "#c9a84c",
                    }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-zinc-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOCIOS */}
      <section id="socios" className="py-24" style={{ backgroundColor: "#0d0d10" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#c9a84c" }}
            >
              Nuestro equipo
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Los Socios
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {socios.map((socio) => (
              <div
                key={socio.nombre}
                className="border p-8"
                style={{ borderColor: "#27272a" }}
              >
                {/* Foto del socio — si no existe muestra el emoji */}
                <div
                  className="w-24 h-24 rounded-full overflow-hidden mb-5 border-2 flex items-center justify-center text-4xl"
                  style={{ borderColor: "rgba(201,168,76,0.3)", backgroundColor: "#18181b" }}
                >
                  <img
                    src={socio.foto}
                    alt={socio.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.querySelector("span")!.style.display = "block";
                    }}
                  />
                  <span style={{ display: "none" }}>{socio.emoji}</span>
                </div>
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: "#c9a84c" }}
                >
                  {socio.cargo}
                </p>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {socio.nombre}
                </h3>
                <p className="text-zinc-600 text-xs mb-5 italic">
                  {socio.especialidad}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {socio.bio}
                </p>
                <ul className="space-y-2">
                  {socio.logros.map((logro) => (
                    <li
                      key={logro}
                      className="flex items-start gap-2 text-xs text-zinc-500"
                    >
                      <span
                        className="mt-0.5 shrink-0 text-xs"
                        style={{ color: "#c9a84c" }}
                      >
                        ✦
                      </span>
                      {logro}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#c9a84c" }}
            >
              La vida en el bufete
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Galería
            </h2>
            <p className="text-zinc-600 text-sm mt-3 italic">
              Momentos de trabajo duro, reflexión jurídica y siestas merecidas.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {galeria.map((foto, i) => (
              <div
                key={i}
                className={`overflow-hidden border relative group ${i === 0 ? "col-span-2 md:col-span-2 row-span-2" : "aspect-square"}`}
                style={{ borderColor: "#27272a", backgroundColor: "#18181b" }}
              >
                <img
                  src={foto.src}
                  alt={foto.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                  }}
                />
                {/* Caption al hacer hover */}
                <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(9,9,11,0.9) 0%, transparent 60%)" }}>
                  <p className="text-xs text-zinc-300 italic p-4 leading-relaxed">
                    {foto.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÁREAS */}
      <section id="areas" className="py-24" style={{ backgroundColor: "#0d0d10" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#c9a84c" }}
            >
              Lo que hacemos
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Áreas de Práctica
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area) => (
              <div
                key={area.titulo}
                className="border p-8"
                style={{ borderColor: "#27272a" }}
              >
                <div className="text-4xl mb-5">{area.icono}</div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {area.titulo}
                </h3>
                <p className="text-xs mb-4 italic" style={{ color: "#c9a84c" }}>
                  {area.subtitulo}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {area.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONORARIOS */}
      <section
        id="honorarios"
        className="py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#c9a84c" }}
            >
              Transparencia total
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Honorarios
            </h2>
            <p className="text-zinc-500 text-sm">
              Aceptamos croquetas, atún y rascadas. Raramente euros.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {honorarios.map((h) => (
              <div
                key={h.servicio}
                className="border p-6 text-center"
                style={{ borderColor: "#27272a" }}
              >
                <div className="text-4xl mb-4">{h.icono}</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {h.servicio}
                </h3>
                <p className="text-xl font-bold mb-3" style={{ color: "#c9a84c" }}>
                  {h.precio}
                </p>
                <p className="text-zinc-500 text-xs leading-relaxed">{h.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-24" style={{ backgroundColor: "#0d0d10" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#c9a84c" }}
            >
              Nuestros clientes hablan
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Testimonios
            </h2>
            <p className="text-zinc-600 text-sm mt-3 italic">
              No discriminamos por especie. Todos los peludos merecen justicia.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonios.map((t) => (
              <div
                key={t.autor}
                className="border p-6 flex flex-col"
                style={{ borderColor: "#27272a" }}
              >
                <div
                  className="w-20 h-20 rounded-full overflow-hidden mb-4 mx-auto border-2"
                  style={{ borderColor: "rgba(201,168,76,0.3)" }}
                >
                  <img
                    src={t.foto}
                    alt={t.autor}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p
                  className="text-3xl mb-3 text-center"
                  style={{ color: "#c9a84c", fontFamily: "var(--font-playfair)" }}
                >
                  &ldquo;
                </p>
                <p className="text-zinc-300 text-xs leading-relaxed mb-6 italic flex-1">
                  {t.texto}
                </p>
                <div className="border-t pt-4" style={{ borderColor: "#27272a" }}>
                  <p className="font-semibold text-sm">{t.autor}</p>
                  <p className="text-zinc-500 text-xs">{t.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="py-24"
      >
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#c9a84c" }}
          >
            Escríbenos
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Contacto
          </h2>
          <p className="text-zinc-400 mb-12 leading-relaxed text-sm">
            Atendemos consultas de lunes a viernes, salvo cuando Paco decide que
            la agenda puede esperar. Para urgencias, dejar atún frente a la
            puerta del bufete y aguardar pacientemente.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
            {[
              {
                titulo: "Horario",
                lineas: ["L–V: 10h–14h", "Resto: bajo consulta"],
                nota: "Agustín no antes de las 11h",
              },
              {
                titulo: "Ubicación",
                lineas: ["Barcelona, España", "Barrio de les Croquetes"],
                nota: "Cerca del parque donde duerme Paco",
              },
              {
                titulo: "Especialidades",
                lineas: ["RGPD · LOPDGDD", "Derecho Felino"],
                nota: "Y siesta jurídica avanzada",
              },
            ].map((item) => (
              <div
                key={item.titulo}
                className="border p-6"
                style={{ borderColor: "#27272a" }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "#c9a84c" }}
                >
                  {item.titulo}
                </p>
                {item.lineas.map((l) => (
                  <p key={l} className="text-sm text-zinc-400">
                    {l}
                  </p>
                ))}
                <p className="text-zinc-600 text-xs mt-2 italic">{item.nota}</p>
              </div>
            ))}
          </div>
          <a
            href="mailto:paco.paula.agustin@bufete.cat"
            className="inline-block px-10 py-4 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
          >
            Solicitar Consulta
          </a>
          <p className="text-zinc-700 text-xs mt-6">
            * El tiempo de respuesta depende del nivel de interés de Paco en el
            asunto.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10" style={{ borderColor: "#18181b" }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div
            className="font-bold tracking-widest text-sm uppercase"
            style={{ fontFamily: "var(--font-playfair)", color: "#c9a84c" }}
          >
            Bufete Paco, Paula & Agustín
          </div>
          <p className="text-zinc-600 text-xs text-center">
            © 2025 Bufete Paco, Paula & Agustín · Colegiados en el ICAB ·
            Todos los derechos reservados · Especialmente el de la siesta
          </p>
          <p className="text-zinc-700 text-xs">Powered by croquetes & Next.js</p>
        </div>
      </footer>
    </main>
  );
}
