import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdateGuest } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate: createGuest, isPending: isCreating } = useMutation({
    mutationFn: ({ newGuestData, id }) => createUpdateGuest(newGuestData, id),
    onSuccess: () => {
      toast.success("New guest successfully created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createGuest, isCreating };
}
