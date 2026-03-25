import QRCode from "qrcode";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response("URL manquante", { status: 400 });
  }

  const png = await QRCode.toBuffer(url, {
    type: "png",
    width: 512,
    margin: 1,
    color: {
      dark: "#161616",
      light: "#FFFFFFFF",
    },
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
