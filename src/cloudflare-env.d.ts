// Types for the Worker environment (see wrangler.jsonc and the Cloudflare dashboard).
declare module "cloudflare:workers" {
  export const env: {
    /** Secret: Resend API key. */
    RESEND_API_KEY?: string;
    /** Where contact form submissions are sent (comma-separated for several). */
    CONTACT_TO_EMAIL?: string;
    /** Sender address on a Resend-verified domain. */
    CONTACT_FROM_EMAIL?: string;
    /** Static assets (public/). Used by /video/[file] to serve videos with byte ranges. */
    ASSETS: { fetch(input: Request | URL | string, init?: RequestInit): Promise<Response> };
  };
}
