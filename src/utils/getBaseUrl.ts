// utils/getBaseUrl.ts
export function getBaseUrl(): string {
    if (typeof window !== "undefined") {
        const hostname = window.location.hostname;

        // When developing locally on laptop or LAN
        if (hostname === "localhost" || hostname.startsWith("192.168.")) {
            return `http://${hostname}:8080`;
        }

        // If hosted on production domain
        if (hostname === "your-production-domain.com") {
            return "https://api.your-production-domain.com";
        }

        // Default fallback
        return `http://${hostname}:8080`;
    }

    // When running on server-side in Next.js (SSR)
    return process.env.NEXT_PUBLIC_MAXXDENTAL_BACKEND_URL || "http://localhost:8080";
}
