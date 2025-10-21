// utils/fetchHelper.ts
import { ApiResponse } from "@/interfaces/ApiResponse";
import { getBaseUrl } from "./getBaseUrl";

export class FetchHelper {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = getBaseUrl(); // auto-detect backend URL
    }

    /**
     * POST request
     */
    async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
    }

    /**
     * GET request
     */
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        const res = await fetch(`${this.baseUrl}${endpoint}`, { method: "GET" });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
    }

    /**
     * PUT request
     */
    async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
    }
}
