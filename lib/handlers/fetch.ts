import handleError from "@/lib/handlers/error";
import { RequestError } from "@/lib/http-errors";
import logger from "@/lib/logger";
import { ActionResponse } from "@/types/global";

interface IFetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: IFetchOptions = {},
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new RequestError(
        response.status,
        `HTTP error in ${url} with status ${response.status}`,
      );
    }

    return await response.json();
  } catch (e) {
    const error = isError(e) ? e : new Error("Unknown error");

    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
