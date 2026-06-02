"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Check {
  id: string;
  nombre: string;
  descripcion: string;
  superado: boolean;
  gravedad: "alta" | "media" | "baja";
  puntos: number;
  comentarioPaco: string;
}

interface AuditResult {
  score: number;
  checks: Check[];
  url: string;
  infracciones: number;
  veredicto: { nivel: string; texto: string; emoji: string };
  resumenPaco: string | null;
  analisisIA: boolean;
}

const gravedadLabel: Record<string, string> = {
  alta: "Grave",
  media: "Moderada",
  baja: "Leve",
};

const gravedadColor: Record<string, string> = {
  alta: "#ef4444",
  media: "#f59e0b",
  baja: "#6b7280",
};

export default function AuditoriaPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  async function handleAudit() {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setError("");

    let auditUrl = url.trim();
    if (!auditUrl.startsWith("http")) auditUrl = "https://" + auditUrl;

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: auditUrl }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  const scoreColor =
    result?.score && result.score >= 80
      ? "#22c55e"
      : result?.score && result.score >= 50
      ? "#f59e0b"
      : "#ef4444";

  return (
    <main
      className="min-h-screen text-zinc-100 pt-28 pb-24"
      style={{ backgroundColor: "#09090b", fontFamily: "var(--font-inter)" }}
    >
      {/* HEADER */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-[0.5em] uppercase mb-4 font-medium"
          style={{ color: "#c9a84c" }}
        >
          Servicio gratuito del bufete
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Auditoría RGPD
          <br />
          <span style={{ color: "#c9a84c" }}>Felina Gratuita</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto"
        >
          Paco analizará tu web en segundos y te dirá si estás en riesgo de multa.
          Sin registro. Sin trucos. Solo la verdad jurídica.
        </motion.p>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto px-6 mb-12"
      >
        <div
          className="border p-8"
          style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "#0d0d10" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-14 h-14 rounded-full overflow-hidden border-2 shrink-0"
              style={{ borderColor: "rgba(201,168,76,0.4)" }}
            >
              <img
                src="/image-1780332171328.jpg"
                alt="Paco, auditor"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-sm">Paco</p>
              <p className="text-zinc-500 text-xs italic">
                Socio Senior · Auditor RGPD · DPC certificado
              </p>
            </div>
          </div>

          <p className="text-zinc-400 text-sm mb-6 italic">
            &ldquo;Dame la URL de tu web. En 30 segundos te digo si la AEPD
            llamará pronto a tu puerta.&rdquo;
          </p>

          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAudit()}
              placeholder="https://tuweb.com"
              className="flex-1 px-4 py-3 text-sm bg-zinc-900 border text-zinc-100 outline-none focus:border-[#c9a84c] transition-colors"
              style={{ borderColor: "#27272a" }}
            />
            <motion.button
              onClick={handleAudit}
              disabled={loading || !url}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 text-sm font-bold tracking-widest uppercase disabled:opacity-40 shrink-0"
              style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
            >
              {loading ? "Analizando..." : "Auditar"}
            </motion.button>
          </div>

          {error && (
            <p className="mt-3 text-red-400 text-xs">{error}</p>
          )}
        </div>
      </motion.div>

      {/* LOADING */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-6 text-center"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-8 h-8 border-2 rounded-full"
                style={{ borderColor: "#c9a84c", borderTopColor: "transparent" }}
              />
              <p className="text-zinc-500 text-sm italic">
                Paco está inspeccionando tu web con una lupa y cara de pocos amigos...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESULTS */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-3xl mx-auto px-6"
          >
            {/* SCORE */}
            <div
              className="border p-8 mb-6 text-center"
              style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "#0d0d10" }}
            >
              <p className="text-xs tracking-widest uppercase mb-2 text-zinc-500">
                Veredicto de Paco para{" "}
                <span className="text-zinc-300">{result.url}</span>
              </p>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-8xl font-bold my-6"
                style={{ color: scoreColor, fontFamily: "var(--font-playfair)" }}
              >
                {result.score}
                <span className="text-4xl text-zinc-600">%</span>
              </motion.div>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold tracking-wider uppercase mb-4"
                style={{ backgroundColor: `${scoreColor}20`, color: scoreColor, border: `1px solid ${scoreColor}40` }}
              >
                {result.veredicto.emoji} {result.veredicto.texto}
              </div>

              <p className="text-zinc-400 text-sm mt-4">
                {result.infracciones === 0
                  ? "Paco no encuentra infracciones graves. Puede que haya algo escondido, pero de momento está tranquilo."
                  : result.infracciones === 1
                  ? "Paco detecta 1 infracción grave. No es catastrófico, pero hay que solucionarlo."
                  : `Paco detecta ${result.infracciones} infracciones graves. Está muy molesto y recomienda actuar de inmediato.`}
              </p>

              {result.analisisIA && (
                <div
                  className="inline-flex items-center gap-2 mt-4 px-3 py-1 text-xs rounded-full"
                  style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "#c9a84c" }}
                >
                  🧠 Análisis inteligente del contenido legal por Paco
                </div>
              )}
            </div>

            {/* RESUMEN DE PACO */}
            {result.resumenPaco && (
              <div
                className="border p-6 mb-6 flex gap-4"
                style={{ borderColor: "rgba(201,168,76,0.2)", backgroundColor: "#0d0d10" }}
              >
                <div
                  className="w-12 h-12 rounded-full overflow-hidden border-2 shrink-0"
                  style={{ borderColor: "rgba(201,168,76,0.4)" }}
                >
                  <img
                    src="/image-1780332171328.jpg"
                    alt="Paco"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#c9a84c" }}>
                    El veredicto de Paco
                  </p>
                  <p className="text-zinc-300 text-sm leading-relaxed italic">
                    &ldquo;{result.resumenPaco}&rdquo;
                  </p>
                </div>
              </div>
            )}

            {/* SCORE BAR */}
            <div className="mb-6 px-1">
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.score}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: scoreColor }}
                />
              </div>
              <div className="flex justify-between text-xs text-zinc-600 mt-1">
                <span>0% — Multa segura</span>
                <span>100% — Paco satisfecho</span>
              </div>
            </div>

            {/* CHECKS */}
            <div className="space-y-3 mb-10">
              {result.checks.map((check, i) => (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="border p-5 flex gap-4 items-start"
                  style={{ borderColor: check.superado ? "#27272a" : `${gravedadColor[check.gravedad]}30` }}
                >
                  <div className="text-xl shrink-0 mt-0.5">
                    {check.superado ? "✅" : check.gravedad === "alta" ? "🔴" : check.gravedad === "media" ? "🟡" : "⚠️"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-semibold text-sm">{check.nombre}</p>
                      {!check.superado && (
                        <span
                          className="text-xs px-2 py-0.5 rounded shrink-0"
                          style={{ backgroundColor: `${gravedadColor[check.gravedad]}20`, color: gravedadColor[check.gravedad] }}
                        >
                          {gravedadLabel[check.gravedad]}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs mb-2">{check.descripcion}</p>
                    <p
                      className="text-xs italic"
                      style={{ color: check.superado ? "#71717a" : "#e4e4e7" }}
                    >
                      &ldquo;{check.comentarioPaco}&rdquo; — Paco
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="border p-8 text-center"
              style={{ borderColor: "rgba(201,168,76,0.3)", backgroundColor: "#0d0d10" }}
            >
              {result.score >= 80 ? (
                <>
                  <p className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    Buen trabajo. Paco está relativamente satisfecho.
                  </p>
                  <p className="text-zinc-400 text-sm mb-6">
                    Aunque siempre hay margen de mejora. Una revisión profesional
                    puede detectar lo que los robots no ven.
                  </p>
                </>
              ) : result.score >= 50 ? (
                <>
                  <p className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                    Hay trabajo que hacer antes de que llegue la AEPD.
                  </p>
                  <p className="text-zinc-400 text-sm mb-6">
                    Paco puede ayudarte a solucionar cada uno de estos puntos.
                    Primera consulta gratuita, como siempre.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold mb-2" style={{ color: "#ef4444", fontFamily: "var(--font-playfair)" }}>
                    Tu web tiene infracciones graves. Actúa antes de que te multen.
                  </p>
                  <p className="text-zinc-400 text-sm mb-6">
                    Paco ha visto suficiente. Las multas de la AEPD por estas
                    infracciones van de 600€ a 20.000.000€. Consulta urgente recomendada.
                  </p>
                </>
              )}
              <div className="flex gap-3 justify-center flex-wrap">
                <motion.a
                  href="mailto:paco.paula.agustin@bufete.cat"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block px-8 py-3 text-sm font-bold tracking-widest uppercase"
                  style={{ backgroundColor: "#c9a84c", color: "#09090b" }}
                >
                  Consultar con Paco
                </motion.a>
                <motion.button
                  onClick={() => { setResult(null); setUrl(""); }}
                  whileHover={{ scale: 1.04 }}
                  className="px-8 py-3 text-sm font-bold tracking-widest uppercase border"
                  style={{ borderColor: "#27272a", color: "#71717a" }}
                >
                  Auditar otra web
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACK */}
      <div className="text-center mt-12">
        <a href="/" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors tracking-widest uppercase">
          ← Volver al bufete
        </a>
      </div>
    </main>
  );
}
