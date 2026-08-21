// Small fetch wrapper for the /api backend.
// Guarantees that failures surface as readable Error messages instead of
// raw exceptions like "Failed to execute 'json' on 'Response': Unexpected
// end of JSON input" (which happens when the backend is unreachable and the
// dev-server proxy returns an empty 502/500 body).

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  let res: Response;

  try {
    res = await fetch(path, options);
  } catch {
    throw new ApiError(
      'Cannot reach the server. Please check your connection and try again.',
      0
    );
  }

  // Read the body as text first, then parse — an empty or non-JSON body
  // (proxy error page, crashed backend) must not blow up.
  const text = await res.text();
  let data: any = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    // 5xx with no body usually means the API server is not running.
    if (res.status >= 500 || !data) {
      throw new ApiError(
        data?.error ||
          `The server could not be reached (HTTP ${res.status}). ` +
          'Make sure the backend is running — start it with "npm run dev" from the repo root.',
        res.status
      );
    }
    throw new ApiError(data.error || `Request failed (HTTP ${res.status})`, res.status);
  }

  if (data === null || data === undefined) {
    throw new ApiError('The server returned an empty response. Please try again.', res.status);
  }

  return data;
}
