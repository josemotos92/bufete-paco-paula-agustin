"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState } from "react";

const offices = ["Marbella", "París", "Milán", "St. Moritz", "Ibiza"];

const services = [
  {
    number: "01",
    title: "Postura de marca",
    text: "Posicionamiento, narrativa y dirección visual para firmas que prefieren marcar la temperatura antes que seguirla.",
  },
  {
    number: "02",
    title: "Atención privada al cliente",
    text: "Experiencias por invitación, rituales de fidelización y relaciones discretamente diseñadas para su clientela más exigente.",
  },
  {
    number: "03",
    title: "Coreografía comercial",
    text: "Desde la primera mirada hasta la última bolsa: aperturas, momentos de temporada y comportamiento en tienda con un sentido impecable del tiempo.",
  },
  {
    number: "04",
    title: "Cuidado reputacional",
    text: "Una respuesta serena ante lanzamientos delicados, sobreexposición y algún incidente ocasional con un sofá de cachemir.",
  },
];

const leadership = [
  {
    name: "Paco",
    role: "Fundador y Director de Presencia Ejecutiva",
    image: "/image-1780332171328.jpg",
    note: "Expansión territorial, negociación y aprobación final de cada silla presente en la sala.",
  },
  {
    name: "Agustín",
    role: "Fundador y Director de Experiencia de Cliente",
    image: "/agus.jpg",
    note: "Poder blando, citas privadas y un compromiso riguroso con las decisiones sin prisa.",
  },
  {
    name: "Paula",
    role: "Directora Creativa y de Temporada",
    image: "/image-1780332433632.jpg",
    imagePosition: "object-[50%_66%]",
    note: "Dirección creativa, inteligencia estacional y criterio final sobre cualquier presencia que no esté a la altura.",
  },
  {
    name: "Paco & Agustín",
    role: "Comité Ejecutivo",
    image: "/image-1780332342368.jpg",
    note: "La reunión semanal termina únicamente cuando ambos socios dejan de parecer ligeramente escépticos.",
  },
];

const testimonials = [
  {
    quote:
      "Reposicionaron nuestra cápsula resort sin una sola reunión innecesaria. Paco miró la presentación una vez. Lo entendimos.",
    name: "Bianca",
    company: "Fundadora, Casa Levante",
    image: "/foto2.png",
  },
  {
    quote:
      "Nuestra apertura en Marbella se sintió exclusiva, precisa y lo bastante intimidante. Exactamente lo solicitado.",
    name: "Allegra",
    company: "Directora Creativa, Maison Bruna",
    image: "/foto5.png",
  },
  {
    quote:
      "Agustín introdujo un ritual de clienteling más pausado. La facturación aumentó. Los tiempos de respuesta no.",
    name: "Pearl",
    company: "Directora General, Neroli Club",
    image: "/foto8.png",
  },
];

const notes = [
  {
    image: "/image-1780332430836.jpg",
    city: "St. Moritz",
    title: "Altitud, contención y el cliente de invierno",
    layout: "md:col-span-2",
  },
  {
    image: "/image-1780332427506.jpg",
    city: "Marbella",
    title: "El consejo aprueba un enfoque mesurado",
    layout: "",
  },
  {
    image: "/image-1780332157624.jpg",
    city: "Marbella",
    title: "Estudio sobre la serenidad ejecutiva",
    layout: "",
  },
  {
    image: "/image-1780332438825.jpg",
    city: "St. Moritz",
    title: "Llegar antes que la temporada",
    layout: "md:col-span-2",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.18, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function HeroLine({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 28,
    mass: 0.18,
    stiffness: 180,
  });
  const heroImageY = useTransform(scrollY, [0, 900], ["0%", "14%"]);
  const heroImageScale = useTransform(scrollY, [0, 900], [1.04, 1.13]);
  const heroCopyY = useTransform(scrollY, [0, 900], ["0%", "12%"]);
  const heroCopyOpacity = useTransform(scrollY, [0, 700], [1, 0.2]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 56);
  });

  return (
    <main className="bg-[#f2eee6] text-[#181817]">
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[#c8896f]"
        style={{ scaleX: smoothProgress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-40 border-b text-white transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-[#1b1b19]/88 shadow-[0_12px_45px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : "border-white/20 bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1480px] items-center justify-between px-5 transition-all duration-500 sm:px-8 lg:px-12 ${
            scrolled ? "py-3" : "py-5"
          }`}
        >
          <a className="font-serif text-xl tracking-[0.18em]" href="#">
            P&A
          </a>
          <nav className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.22em] md:flex">
            <a className="transition hover:text-[#d4b78c]" href="#expertise">
              Servicios
            </a>
            <a className="transition hover:text-[#d4b78c]" href="#leadership">
              Dirección
            </a>
            <a className="transition hover:text-[#d4b78c]" href="#field-notes">
              Notas
            </a>
          </nav>
          <a
            className="border border-white/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-black"
            href="#contact"
          >
            Presentación privada
          </a>
        </div>
      </header>

      <section className="relative flex min-h-[820px] items-end overflow-hidden bg-[#191918] text-white">
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroImageScale, y: heroImageY }}
        >
          <Image
            alt="Paco y Agustín, fundadores de la oficina privada de marca"
            className="object-cover object-[55%_50%] opacity-65"
            fill
            loading="eager"
            priority
            sizes="100vw"
            src="/image-1780332342368.jpg"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1480px] px-5 pb-16 pt-40 sm:px-8 lg:px-12 lg:pb-20"
          style={{ opacity: heroCopyOpacity, y: heroCopyY }}
        >
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#d4b78c]"
            initial={{ opacity: 0, y: 18 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Oficina Privada de Marca · Marbella
          </motion.p>
          <h1 className="max-w-5xl font-serif text-[clamp(4.7rem,12vw,11.5rem)] leading-[0.82] tracking-[-0.075em]">
            <HeroLine delay={0.28}>Paco</HeroLine>
            <HeroLine className="italic text-[#d4b78c]" delay={0.42}>
              & Agustín
            </HeroLine>
          </h1>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 grid max-w-5xl gap-7 border-t border-white/35 pt-6 md:grid-cols-[1fr_1.4fr]"
            initial={{ opacity: 0, y: 24 }}
            transition={{ delay: 0.72, duration: 0.85 }}
          >
            <p className="text-[10px] font-semibold uppercase leading-6 tracking-[0.27em] text-white/70">
              Estrategia de lujo
              <br />
              Relación con clientes
              <br />
              Experiencias en tienda
            </p>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-white/88 sm:text-xl">
                Damos forma a marcas de moda y lujo para clientes que valoran
                el instinto, la discreción y una entrada perfectamente medida.
              </p>
              <a
                className="mt-7 inline-flex items-center gap-3 border-b border-[#d4b78c] pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#e2c59b] transition hover:text-white"
                href="#expertise"
              >
                Entrar en la oficina <Arrow />
              </a>
            </div>
          </motion.div>
        </motion.div>
        <p className="absolute bottom-6 right-7 z-10 hidden text-[9px] uppercase tracking-[0.24em] text-white/55 lg:block">
          Los fundadores, entre revisiones
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] font-bold uppercase tracking-[0.25em] text-white/55 md:flex"
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        >
          Desliza
          <span className="h-10 w-px bg-white/45" />
        </motion.div>
      </section>

      <section className="border-b border-[#282722]/15 bg-[#24231f] text-[#efe9dd]">
        <div className="marquee overflow-hidden py-4">
          <div className="marquee-track flex w-max items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4b78c]">
            {[...offices, ...offices].map((office, index) => (
              <span className="flex items-center gap-8" key={`${office}-${index}`}>
                {office}
                <span className="text-[#efe9dd]/45">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.35fr]">
          <Reveal>
            <p className="section-kicker">La oficina</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.045em] sm:text-7xl">
              No perseguimos tendencias.
              <span className="block italic text-[#a24a39]">
                Las observamos.
              </span>
            </h2>
            <div className="mt-10 grid gap-7 text-base leading-8 text-[#58554f] sm:grid-cols-2">
              <p>
                Paco & Agustín es una oficina independiente de marca para
                proyectos de moda, belleza y hospitalidad con apetito por la
                precisión. Trabajamos en silencio, de cerca y con entusiasmo
                selectivo.
              </p>
              <p>
                Con sede en Marbella y presentes allí donde la temporada lo
                exige, combinamos instinto mediterráneo con una política
                inusualmente estricta frente al ruido innecesario.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        className="border-y border-[#282722]/15 bg-[#e6ded1]"
        id="expertise"
      >
        <div className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <Reveal className="grid gap-8 border-b border-[#282722]/20 pb-9 lg:grid-cols-[0.8fr_1.35fr]">
            <p className="section-kicker">Servicios seleccionados</p>
            <h2 className="font-serif text-5xl tracking-[-0.045em] sm:text-7xl">
              Una ventaja serena.
            </h2>
          </Reveal>
          <div>
            {services.map((service, index) => (
              <motion.article
                className="group grid gap-4 border-b border-[#282722]/20 py-7 transition hover:bg-[#eee7dc] md:grid-cols-[0.8fr_1fr_1.35fr_44px] md:items-center"
                initial={{ opacity: 0, x: -20 }}
                key={service.number}
                transition={{
                  delay: index * 0.06,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ amount: 0.4, once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <p className="text-xs font-bold tracking-[0.2em] text-[#a24a39]">
                  {service.number}
                </p>
                <h3 className="font-serif text-3xl tracking-[-0.025em] transition group-hover:translate-x-2">
                  {service.title}
                </h3>
                <p className="max-w-xl text-sm leading-7 text-[#625f58]">
                  {service.text}
                </p>
                <span className="hidden translate-x-0 text-2xl text-[#a24a39] opacity-0 transition duration-300 group-hover:translate-x-2 group-hover:opacity-100 md:block">
                  <Arrow />
                </span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
        id="leadership"
      >
        <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
          <Reveal className="pb-8 sm:col-span-2 sm:grid sm:grid-cols-[0.8fr_1.35fr] xl:col-span-4">
            <p className="section-kicker">Dirección</p>
            <div>
              <h2 className="font-serif text-5xl tracking-[-0.045em] sm:text-7xl">
                Autoridad serena.
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-[#625f58]">
                La implicación de la dirección está garantizada. La delegación
                continúa bajo revisión.
              </p>
            </div>
          </Reveal>
          {leadership.map((person, index) => (
            <motion.article
              className="group"
              initial={{ opacity: 0, y: 36 }}
              key={person.name}
              transition={{
                delay: index * 0.08,
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.22, once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#d8cec0]">
                <Image
                  alt={`${person.name}, ${person.role}`}
                  className={`object-cover saturate-[0.78] transition duration-700 group-hover:scale-[1.04] group-hover:saturate-100 ${
                    person.imagePosition ?? ""
                  }`}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={person.image}
                />
              </div>
              <div className="border-b border-[#282722]/20 py-5">
                <p className="font-serif text-3xl tracking-[-0.03em]">
                  {person.name}
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase leading-5 tracking-[0.2em] text-[#a24a39]">
                  {person.role}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#625f58]">
                  {person.note}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-[#24231f] text-[#f0eadd]">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.35fr] lg:px-12 lg:py-32">
          <Reveal>
            <p className="section-kicker text-[#d4b78c]">Voces de clientes</p>
            <h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-7xl">
              Exigentes
              <span className="block italic text-[#d4b78c]">por naturaleza.</span>
            </h2>
          </Reveal>
          <div className="grid gap-5">
            {testimonials.map((testimonial, index) => (
              <motion.figure
                className="grid gap-5 border border-white/15 p-5 transition hover:border-[#d4b78c]/70 sm:grid-cols-[104px_1fr] sm:items-center"
                initial={{ opacity: 0, x: 24 }}
                key={testimonial.name}
                transition={{
                  delay: index * 0.08,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ amount: 0.35, once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="relative aspect-square overflow-hidden bg-[#35332e]">
                  <Image
                    alt={testimonial.name}
                    className="object-cover"
                    fill
                    sizes="104px"
                    src={testimonial.image}
                  />
                </div>
                <figcaption>
                  <blockquote className="font-serif text-2xl leading-8 tracking-[-0.02em]">
                    “{testimonial.quote}”
                  </blockquote>
                  <p className="mt-4 text-[10px] font-bold uppercase leading-5 tracking-[0.2em] text-[#d4b78c]">
                    {testimonial.name} · {testimonial.company}
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1480px] px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
        id="field-notes"
      >
        <Reveal className="mb-12 grid gap-5 md:grid-cols-[0.8fr_1.35fr]">
          <p className="section-kicker">Notas de campo</p>
          <h2 className="font-serif text-5xl tracking-[-0.045em] sm:text-7xl">
            Inteligencia de temporada.
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {notes.map((note, index) => (
            <motion.article
              className={`group relative min-h-[420px] overflow-hidden bg-[#d8cec0] ${note.layout}`}
              initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
              key={note.title}
              transition={{
                delay: index * 0.07,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ amount: 0.15, once: true }}
              whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
            >
              <Image
                alt={note.title}
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                src={note.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e2c59b]">
                  {note.city}
                </p>
                <h3 className="mt-2 max-w-lg font-serif text-3xl leading-9 tracking-[-0.025em]">
                  {note.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        className="border-t border-[#282722]/20 bg-[#a24a39] text-[#fff8ee]"
        id="contact"
      >
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.35fr] lg:px-12 lg:py-32">
          <Reveal>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#f0cfb7]">
              Presentaciones privadas
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.05em] sm:text-7xl">
              Su próxima temporada merece una postura mejor.
            </h2>
            <div className="mt-10 flex flex-col gap-5 border-t border-white/30 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-sm leading-7 text-white/75">
                Aceptamos nuevos proyectos de forma selectiva y los revisamos
                durante las horas de vigilia. Citas en Marbella únicamente por
                presentación.
              </p>
              <a
                className="inline-flex w-fit items-center gap-3 border border-white/60 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] transition hover:bg-white hover:text-[#a24a39]"
                href="mailto:office@pacoaugustin.com"
              >
                office@pacoaugustin.com <Arrow />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#24231f] text-[#f0eadd]">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-4 px-5 py-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>Paco & Agustín · Oficina Privada de Marca</p>
          <p>Marbella · París · Milán · St. Moritz · Ibiza</p>
        </div>
      </footer>
    </main>
  );
}
