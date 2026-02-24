import { useForm } from "react-hook-form";
import { useCreateBooking } from "./useCreateBooking";
import { useWatch } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { format, isBefore, parseISO, startOfToday } from "date-fns";

import Spinner from "../../ui/Spinner";
import CabinDropdown from "./CabinDropdown";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import GuestDropdown from "./GuestDropdown";
import { useBookingPrice } from "./useBookingPrice";
import { useAvailableCabins } from "./useAvailableCabins";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { createBooking, isCreating } = useCreateBooking();
  const { settings, isPending: isPendingSettings } = useSettings();
  const isWorking = isCreating;

  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
    setValue,
    control,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    createBooking(
      {
        startDate,
        endDate,
        numNights,
        numGuests,
        cabinPrice,
        extrasPrice: breakfastTotal,
        totalPrice,
        status: "unconfirmed",
        isPaid: data.isPaid,
        observations: data.observations,
        cabinId: data.cabinId,
        guestId: data.guestId,
        hasBreakfast,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      },
    );

    console.log(data);
  }

  function onError(errors) {
    console.error(errors);
  }

  const cabin = useWatch({
    control,
    name: "cabin",
  });

  const guest = useWatch({
    control,
    name: "guest",
  });

  const startDate = useWatch({ control, name: "startDate" });

  const endDate = useWatch({ control, name: "endDate" });
  const numGuests = useWatch({ control, name: "numGuests" });
  const hasBreakfast = useWatch({
    control,
    name: "hasBreakfast",
  });

  const { numNights, cabinPrice, breakfastTotal, totalPrice } = useBookingPrice(
    {
      startDate,
      endDate,
      cabin,
      numGuests,
      hasBreakfast,
      settings,
    },
  );

  const { data: cabins = [], isPending: isPendingCabins } = useAvailableCabins(
    startDate,
    endDate,
  );

  if (isPendingSettings || isPendingCabins) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Guest" error={errors?.guestId?.message}>
        <GuestDropdown
          numGuests={numGuests}
          selectedGuest={guest}
          onSelect={(guest) => {
            setValue("guestId", guest.id, { shouldValidate: true });
            setValue("guest", guest);
          }}
        />

        <input
          type="hidden"
          {...register("guestId", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          min={format(new Date(), "yyyy-MM-dd")}
          {...register("startDate", {
            required: "This field is required",
            validate: (value) =>
              !isBefore(parseISO(value), startOfToday()) ||
              "The start date should be at least today",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          min={
            startDate
              ? format(parseISO(startDate), "yyyy-MM-dd")
              : format(new Date(), "yyyy-MM-dd")
          }
          {...register("endDate", {
            required: "This field is required",
            validate: (value) =>
              !isBefore(parseISO(value), parseISO(getValues().startDate)) ||
              "The end date should be after the start date",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Number of nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          value={numNights}
          disabled
          {...register("numNights")}
        />
      </FormRow>

      <FormRow label="Number of guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isWorking}
          {...register("numGuests", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin" error={errors?.cabinId?.message}>
        <CabinDropdown
          numGuests={numGuests}
          selectedCabin={cabin}
          cabins={cabins}
          onSelect={(cabin) => {
            setValue("cabinId", cabin.id, { shouldValidate: true });
            setValue("cabin", cabin);
          }}
        />

        <input
          type="hidden"
          {...register("cabinId", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Optionals" error={errors?.breakfast?.message}>
        <Checkbox
          disabled={isWorking}
          id="breakfast"
          {...register("hasBreakfast")}
        >
          Wants to add breakfast for {numGuests} guest
          {numGuests > 1 ? "s" : ""} for {numNights} night
          {numNights > 1 ? "s" : ""} ({formatCurrency(breakfastTotal)})
        </Checkbox>
        <Checkbox disabled={isWorking} id="isPaid" {...register("isPaid")}>
          Paying now? {formatCurrency(totalPrice)} ({formatCurrency(cabinPrice)}{" "}
          + {formatCurrency(breakfastTotal)})
        </Checkbox>
      </FormRow>

      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="number"
          id="observations"
          disabled={isWorking}
          defaultValue=""
          {...register("observations")}
        />
      </FormRow>

      <FormRow type="buttons">
        <Button
          $variation="secondary"
          $type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Booking" : "Create new Booking"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
