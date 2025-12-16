import { toast } from "sonner";
import { ApiError } from "../types/api";

export function handleApiResponse(error: unknown) {
  const err = error as ApiError;

  const message =
    err.response?.data?.message ||
    Object.values(err.response?.data?.errors || {})[0]?.[0] ||
    err.message ||
    "Сталася невідома помилка";

  toast.error(message);

  return message;
}
