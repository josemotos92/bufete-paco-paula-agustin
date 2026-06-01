import { NextRequest, NextResponse } from "next/server";

interface Check {
  id: string;
  nombre: string;
  descripcion: string;
  superado: boolean;
  gravedad: "alta" | "media" | "baja";
  puntos: number;
  comentarioPaco: string;
}

function analizarWeb(html: string, url: string): Check[] {
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
        : "Sin HTTPS. Los datos de tus usuarios viajan en abierto por internet. Inaceptable.",
    },
    {
      id: "politica_privacidad",
      nombre: "Política de Privacidad",
      descripcion: "Documento obligatorio que informa del tratamiento de datos personales",
      superado: /pol.tica de privacidad|privacy policy|aviso de privacidad/i.test(html),
      gravedad: "alta",
      puntos: 20,
      comentarioPaco: /pol.tica de privacidad|privacy policy/i.test(html)
        ? "Política de privacidad detectada. Artículo 13 RGPD cubierto."
        : "Sin política de privacidad. Infracción directa del artículo 13 RGPD. Multa garantizada.",
    },
    {
      id: "aviso_legal",
      nombre: "Aviso Legal",
      descripcion: "Identificación del responsable del sitio web (LSSI)",
      superado: /aviso legal|legal notice|nota legal|aviso-legal/i.test(html),
      gravedad: "media",
      puntos: 10,
      comentarioPaco: /aviso legal|legal notice/i.test(html)
        ? "Aviso legal presente. LSSI cumplida."
        : "Sin aviso legal. La Ley de Servicios de la Sociedad de la Información lo exige. Paco está molesto.",
    },
    {
      id: "cookies",
      nombre: "Gestión de Cookies",
      descripcion: "Banner de consentimiento para cookies no esenciales",
      superado: /cookie|galleta|consentimiento de cookies|we use cookies|usamos cookies|cookiebot|tarteaucitron|onetrust|axeptio/i.test(html),
      gravedad: "alta",
      puntos: 20,
      comentarioPaco: /cookie|consentimiento|cookiebot|onetrust/i.test(html)
        ? "Gestión de cookies detectada. Conforme con la LSSI."
        : "Sin banner de cookies. La AEPD ha impuesto multas de hasta 30.000€ por esto. Urgente.",
    },
    {
      id: "google_analytics",
      nombre: "Google Analytics",
      descripcion: "Transfiere datos de usuarios a servidores en EEUU",
      superado: !/gtag\.js|google-analytics\.com|GA_MEASUREMENT_ID|googletagmanager\.com/i.test(html),
      gravedad: "alta",
      puntos: 15,
      comentarioPaco: !/gtag\.js|google-analytics|googletagmanager/i.test(html)
        ? "Sin Google Analytics. Los datos de tus usuarios permanecen en Europa."
        : "Google Analytics detectado. Transferencia internacional de datos a EEUU sin base legal. Requiere consentimiento explícito.",
    },
    {
      id: "facebook_pixel",
      nombre: "Meta/Facebook Pixel",
      descripcion: "Píxel de seguimiento de Meta que rastrea usuarios",
      superado: !/fbq\s*\(|connect\.facebook\.net|facebook\.com\/tr/i.test(html),
      gravedad: "alta",
      puntos: 10,
      comentarioPaco: !/fbq\s*\(|connect\.facebook\.net/i.test(html)
        ? "Sin Meta Pixel. Correcto."
        : "Meta Pixel detectado activo. Tus usuarios son rastreados por Facebook sin consentimiento. Infracción grave.",
    },
    {
      id: "google_fonts",
      nombre: "Google Fonts externas",
      descripcion: "Las fuentes de Google envían la IP del usuario a sus servidores",
      superado: !/fonts\.googleapis\.com|fonts\.gstatic\.com/i.test(html),
      gravedad: "baja",
      puntos: 5,
      comentarioPaco: !/fonts\.googleapis\.com/i.test(html)
        ? "Sin Google Fonts externas. Datos tipográficos en Europa."
        : "Google Fonts cargadas desde servidores de Google. La IP de cada visita se transfiere a EEUU.",
    },
    {
      id: "formularios",
      nombre: "Consentimiento en formularios",
      descripcion: "Los formularios de contacto necesitan checkbox de consentimiento",
      superado:
        !/<form/i.test(html) ||
        /acepto|consent|rgpd|gdpr|he le.do|pol.tica de privacidad|terms/i.test(html),
      gravedad: "alta",
      puntos: 15,
      comentarioPaco: !/<form/i.test(html)
        ? "No se detectan formularios en esta página."
        : /acepto|consent|rgpd|he le.do/i.test(html)
        ? "Formularios con checkbox de consentimiento. Bien."
        : "Formularios sin consentimiento explícito. Captación de datos personales ilegal. Artículo 6 RGPD.",
    },
  ];
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
      return NextResponse.json({ error: "URL inválida. Incluye https://" }, { status: 400 });
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
        { error: "No se pudo acceder a la web. Verifica que la URL sea correcta y esté activa." },
        { status: 400 }
      );
    } finally {
      clearTimeout(timeout);
    }

    const checks = analizarWeb(html, url);
    const puntosMax = checks.reduce((s, c) => s + c.puntos, 0);
    const puntosOk = checks.filter((c) => c.superado).reduce((s, c) => s + c.puntos, 0);
    const score = Math.round((puntosOk / puntosMax) * 100);

    const infracciones = checks.filter((c) => !c.superado && c.gravedad === "alta").length;
    const veredicto =
      score >= 80
        ? { nivel: "verde", texto: "Cumplimiento aceptable", emoji: "🟢" }
        : score >= 50
        ? { nivel: "amarillo", texto: "Riesgo moderado", emoji: "🟡" }
        : { nivel: "rojo", texto: "Riesgo alto — actuar urgente", emoji: "🔴" };

    return NextResponse.json({ score, checks, url, infracciones, veredicto });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
