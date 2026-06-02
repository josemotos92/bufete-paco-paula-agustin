import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

interface Check {
  id: string;
  nombre: string;
  descripcion: string;
  superado: boolean;
  gravedad: "alta" | "media" | "baja";
  puntos: number;
  comentarioPaco: string;
}

// ─── CAPA 1: Checks técnicos rápidos (regex, sin coste) ──────────────────────

function checksTecnicos(html: string, url: string): Check[] {
  return [
    {
      id: "https",
      nombre: "Conexión HTTPS segura",
      descripcion: "Los datos viajan cifrados entre el usuario y la web",
      superado: url.startsWith("https://"),
      gravedad: "alta",
      puntos: 15,
      comentarioPaco: url.startsWith("https://")
        ? "HTTPS correcto. Los datos viajan cifrados. Paco aprueba."
        : "Sin HTTPS. Los datos de tus usuarios viajan en abierto. Inaceptable.",
    },
    {
      id: "cookies",
      nombre: "Gestión de Cookies",
      descripcion: "Banner de consentimiento para cookies no esenciales",
      superado:
        /cookie|galleta|consentimiento|cookiebot|tarteaucitron|onetrust|axeptio|cookieyes/i.test(
          html
        ),
      gravedad: "alta",
      puntos: 15,
      comentarioPaco: /cookie|cookiebot|onetrust|axeptio/i.test(html)
        ? "Gestión de cookies detectada."
        : "Sin banner de cookies. La AEPD multa hasta 30.000€ por esto. Urgente.",
    },
    {
      id: "google_analytics",
      nombre: "Google Analytics",
      descripcion: "Transfiere datos de usuarios a servidores en EEUU",
      superado: !/gtag\.js|google-analytics\.com|googletagmanager\.com/i.test(html),
      gravedad: "media",
      puntos: 10,
      comentarioPaco: !/gtag\.js|google-analytics|googletagmanager/i.test(html)
        ? "Sin Google Analytics sin control. Bien."
        : "Google Analytics detectado. Requiere consentimiento previo y mención en la política de cookies.",
    },
    {
      id: "facebook_pixel",
      nombre: "Meta/Facebook Pixel",
      descripcion: "Píxel de seguimiento de Meta",
      superado: !/fbq\s*\(|connect\.facebook\.net|facebook\.com\/tr/i.test(html),
      gravedad: "media",
      puntos: 5,
      comentarioPaco: !/fbq\s*\(|connect\.facebook\.net/i.test(html)
        ? "Sin Meta Pixel. Correcto."
        : "Meta Pixel detectado. Rastrea a tus usuarios sin consentimiento previo.",
    },
    {
      id: "google_fonts",
      nombre: "Google Fonts externas",
      descripcion: "Las fuentes de Google reciben la IP del usuario",
      superado: !/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(html),
      gravedad: "baja",
      puntos: 5,
      comentarioPaco: !/fonts\.googleapis\.com/i.test(html)
        ? "Sin Google Fonts externas."
        : "Google Fonts desde servidores de Google. La IP de cada visita va a EEUU.",
    },
  ];
}

// ─── CAPA 2: Análisis de contenido con Claude ────────────────────────────────

interface AnalisisClaude {
  checks: Check[];
  resumenPaco: string;
}

function extraerTexto(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40000);
}

async function analisisLegalClaude(
  texto: string,
  url: string
): Promise<AnalisisClaude | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null;

  const client = new Anthropic();

  const schema = {
    type: "object",
    properties: {
      checks: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            nombre: { type: "string" },
            descripcion: { type: "string" },
            superado: { type: "boolean" },
            gravedad: { type: "string", enum: ["alta", "media", "baja"] },
            puntos: { type: "integer" },
            comentarioPaco: { type: "string" },
          },
          required: [
            "id",
            "nombre",
            "descripcion",
            "superado",
            "gravedad",
            "puntos",
            "comentarioPaco",
          ],
          additionalProperties: false,
        },
      },
      resumenPaco: { type: "string" },
    },
    required: ["checks", "resumenPaco"],
    additionalProperties: false,
  };

  const prompt = `Eres "Paco", un gato abogado experto en RGPD y protección de datos, socio del Bufete Paco, Paula & Agustín de Barcelona. Tu tono es profesional pero con humor felino: directo, algo gruñón, y con referencias ocasionales a siestas, croquetas o tu mirada intimidatoria. Pero el análisis jurídico es RIGUROSO y real.

Analiza el contenido de esta web: ${url}

Evalúa CADA uno de estos puntos sobre protección de datos (RGPD y LOPDGDD española). Para cada uno determina si está PRESENTE Y BIEN HECHO en el contenido (no solo si existe la palabra):

1. politica_privacidad: ¿Hay una política de privacidad y contiene lo exigido por el art. 13 RGPD? (identidad del responsable, finalidad, base jurídica, derechos del usuario, plazo de conservación). gravedad alta, 20 puntos.
2. aviso_legal: ¿Hay aviso legal con los datos del titular (nombre/razón social, NIF, dirección, contacto) según la LSSI? gravedad media, 10 puntos.
3. derechos_arco: ¿Se informa de los derechos de acceso, rectificación, supresión, oposición, portabilidad y cómo ejercerlos? gravedad alta, 15 puntos.
4. autoridad_control: ¿Se menciona el derecho a reclamar ante la AEPD? gravedad baja, 5 puntos.
5. formularios_consentimiento: Si hay formularios de contacto, ¿hay consentimiento explícito e información sobre el tratamiento? Si no hay formularios, marca superado=true. gravedad alta, 15 puntos.

Para cada check, escribe un comentarioPaco breve (1-2 frases) en primera persona como Paco, valorando lo que has encontrado. Sé concreto sobre lo que falta o está bien.

Después escribe un resumenPaco: un párrafo de 2-3 frases con el veredicto general de Paco sobre la web, en su tono characterístico.

IMPORTANTE: basa tu análisis SOLO en el contenido proporcionado. Si no encuentras un documento, asume que no existe (superado=false). Sé honesto y riguroso.

CONTENIDO DE LA WEB:
${texto}`;

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 4000,
      output_config: { format: { type: "json_schema", schema } },
      messages: [{ role: "user", content: prompt }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") return null;

    return JSON.parse(textBlock.text) as AnalisisClaude;
  } catch (e) {
    console.error("Error Claude:", e);
    return null;
  }
}

// ─── HANDLER ──────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
      return NextResponse.json(
        { error: "URL inválida. Incluye https://" },
        { status: 400 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    let html = "";
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; AuditoriaRGPD-Bufete/1.0)",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      html = await res.text();
    } catch {
      return NextResponse.json(
        {
          error:
            "No se pudo acceder a la web. Verifica que la URL sea correcta y esté activa.",
        },
        { status: 400 }
      );
    } finally {
      clearTimeout(timeout);
    }

    // Capa 1: técnicos (siempre)
    const tecnicos = checksTecnicos(html, url);

    // Capa 2: legales con Claude (si hay API key)
    const texto = extraerTexto(html);
    const analisis = await analisisLegalClaude(texto, url);

    // Puntos fijos por check legal (no fiarse de lo que devuelve Claude)
    const puntosLegales: Record<string, number> = {
      politica_privacidad: 20,
      aviso_legal: 10,
      derechos_arco: 15,
      autoridad_control: 5,
      formularios_consentimiento: 15,
    };
    if (analisis) {
      analisis.checks = analisis.checks.map((c) => ({
        ...c,
        puntos: puntosLegales[c.id] ?? c.puntos,
      }));
    }

    const checks = analisis ? [...tecnicos, ...analisis.checks] : tecnicos;

    const puntosMax = checks.reduce((s, c) => s + c.puntos, 0);
    const puntosOk = checks
      .filter((c) => c.superado)
      .reduce((s, c) => s + c.puntos, 0);
    const score = Math.round((puntosOk / puntosMax) * 100);

    const infracciones = checks.filter(
      (c) => !c.superado && c.gravedad === "alta"
    ).length;

    const veredicto =
      score >= 80
        ? { nivel: "verde", texto: "Cumplimiento aceptable", emoji: "🟢" }
        : score >= 50
        ? { nivel: "amarillo", texto: "Riesgo moderado", emoji: "🟡" }
        : { nivel: "rojo", texto: "Riesgo alto — actuar urgente", emoji: "🔴" };

    return NextResponse.json({
      score,
      checks,
      url,
      infracciones,
      veredicto,
      resumenPaco: analisis?.resumenPaco ?? null,
      analisisIA: !!analisis,
    });
  } catch {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
