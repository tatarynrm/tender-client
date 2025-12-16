import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionSerivce } from "../services";

export function useDeleteSession() {
  const queryClient = useQueryClient();

  const { mutate: deleteSession, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => sessionSerivce.deleteSessionById(id),
    onSuccess: () => {
      // Оновлюємо список сесій після видалення
       queryClient.invalidateQueries({ queryKey: ["get sessions"] });
    },
  });

  return { deleteSession, isDeleting };
}
