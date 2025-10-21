// interfaces/ApiResponse.ts
export interface ApiResponseHeader {
    responseCode: number;
    responseRefId?: string;
    customerMessage?: string;
    debugMessage?: string;
}

export interface ApiResponse<T> {
    ResponseHeader: ApiResponseHeader; // matches backend capitalization
    ResponseBody: T;                   // T can be boolean, string, object, etc.
}
