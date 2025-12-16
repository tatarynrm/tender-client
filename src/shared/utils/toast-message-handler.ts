import { toast } from "sonner";

export function toastMessageHandler(message:string) {
  if (message) {

    const firstDotIndex = message.indexOf(".");

    if (firstDotIndex !== -1) {
      toast.error(message.slice(0, firstDotIndex), {
        description: message.slice(firstDotIndex + 1),
      });
    }
  } else {
    toast.error("Помилка зі сторони сервера");
  }
}
