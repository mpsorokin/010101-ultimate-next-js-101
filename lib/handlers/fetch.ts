import { ActionResponse } from "@/types/global";

interface IFetchOptions extends RequestInit {
  timeout?: number;
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
}
