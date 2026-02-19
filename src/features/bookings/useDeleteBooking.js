import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: ({ bookingId }) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      return deleteBookingApi(bookingId);
    },
    onSuccess: () => {
      toast.success(`Booking deleted successfully!`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred while deleting the booking");
    },
  });

  return { deleteBooking, isDeleting };
}
