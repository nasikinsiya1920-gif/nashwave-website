import { env } from "cloudflare:workers";

/**
 * Serves the site's videos (public/assets/video/*) with byte-range support.
 *
 * Cloudflare Workers static assets always answer with the whole file (200), ignoring the Range
 * header, and Safari (iPhone, iPad, Mac) will not play a video unless the server returns
 * 206 Partial Content for range requests. So videos are linked as /video/<file>, and this route
 * fetches the file from the ASSETS binding and returns just the requested bytes.
 */
const FILE = /^[a-z0-9-]+\.(mp4|webm)$/;

async function serve(request: Request, params: Promise<{ file: string }>, withBody: boolean) {
  const { file } = await params;
  if (!FILE.test(file)) return new Response("Not found", { status: 404 });

  const asset = await env.ASSETS.fetch(new URL(`/assets/video/${file}`, request.url));
  if (!asset.ok) return new Response("Not found", { status: 404 });
  const bytes = await asset.arrayBuffer();
  const size = bytes.byteLength;

  const headers = new Headers({
    "Content-Type": file.endsWith(".webm") ? "video/webm" : "video/mp4",
    "Accept-Ranges": "bytes",
    "Cache-Control": "public, max-age=86400",
  });

  const range = request.headers.get("Range");
  if (!range) {
    headers.set("Content-Length", String(size));
    return new Response(withBody ? bytes : null, { status: 200, headers });
  }

  // "bytes=start-end", "bytes=start-" or "bytes=-suffixLength" (a single range is all browsers ask for).
  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  let start = match && match[1] !== "" ? Number(match[1]) : NaN;
  let end = match && match[2] !== "" ? Number(match[2]) : size - 1;
  if (match && match[1] === "" && match[2] !== "") {
    start = Math.max(size - Number(match[2]), 0);
    end = size - 1;
  }
  end = Math.min(end, size - 1);
  if (!match || Number.isNaN(start) || start > end || start >= size) {
    headers.set("Content-Range", `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }

  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(end - start + 1));
  return new Response(withBody ? bytes.slice(start, end + 1) : null, { status: 206, headers });
}

export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  return serve(request, params, true);
}

export async function HEAD(request: Request, { params }: { params: Promise<{ file: string }> }) {
  return serve(request, params, false);
}
