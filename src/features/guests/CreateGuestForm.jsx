import { useForm } from "react-hook-form";
import { useCreateGuest } from "./useCreateGuest";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Controller } from "react-hook-form";
import { useMemo } from "react";
import Spinner from "../../ui/Spinner";
import { useUpdateGuest } from "./useUpdateGuest";

function CreateGuestForm({ guestToEdit = {}, onCloseModal }) {
  const { createGuest, isCreating } = useCreateGuest();
  const { updateGuest, isUpdating } = useUpdateGuest();
  const countries = useMemo(() => countryList().getData(), []);

  const { id: editId, ...editValues } = guestToEdit;
  const isEditSession = Boolean(editId);
  console.log(guestToEdit);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  function onSubmit(data) {
    const { countryCode, ...rest } = data;

    if (isEditSession) {
      updateGuest(
        {
          newGuestData: {
            ...rest,
            nationality: countryCode.nationality,
            countryFlag: `https://flagcdn.com/${countryCode.countryCode}.svg`,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    } else {
      createGuest(
        {
          newGuestData: {
            ...rest,
            nationality: countryCode.nationality,
            countryFlag: `https://flagcdn.com/${countryCode.countryCode}.svg`,
          },
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isCreating || isUpdating) return <Spinner />;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating || isUpdating}
          {...register("fullName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.countryCode?.message}>
        <Controller
          name="countryCode"
          control={control}
          rules={{ required: "This field is required" }}
          render={({ field }) => {
            return (
              <Select
                options={countries.map((c) => ({
                  value: c.value.toLowerCase(),
                  label: c.label,
                }))}
                value={
                  field.value
                    ? {
                        value: field.value.countryCode,
                        label: field.value.nationality,
                      }
                    : null
                }
                maxMenuHeight={180}
                placeholder="Select country"
                isDisabled={isCreating || isUpdating}
                styles={{
                  control: (base) => ({
                    ...base,
                    fontSize: "1.4rem",
                    height: "4.2rem",
                    minHeight: "4.2rem",
                    borderColor: "var(--color-grey-300)",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "var(--color-brand-600)",
                    },
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    height: "4.2rem",
                    padding: "0 0.8rem",
                  }),
                  indicatorsContainer: (base) => ({
                    ...base,
                    height: "4.2rem",
                  }),
                  menu: (base) => ({
                    ...base,
                    fontSize: "1.4rem",
                  }),
                }}
                onChange={(option) =>
                  field.onChange({
                    countryCode: option.value,
                    nationality: option.label,
                  })
                }
              />
            );
          }}
        />
      </FormRow>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating || isUpdating}
          {...register("email", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isCreating || isUpdating}
          {...register("nationalID", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow type="buttons">
        <Button
          $variation="secondary"
          $type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isCreating || isUpdating}
        >
          Cancel
        </Button>

        <Button disabled={isCreating || isUpdating}>
          {isEditSession ? "Edit guest" : "Create new guest"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
