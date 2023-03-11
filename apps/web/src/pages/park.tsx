"use client";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { infer as Infer, object, string } from "zod";

const StyledBox = styled(Box)(() => ({
  width: "100%",
  "& form": {
    display: "flex",
    flexDirection: "column",
  },

  "& .input": {
    margin: 10,
  },
}));

const schema = object({
  firstName: string().min(2).max(255),
  lastName: string().max(255),
  vehicleMake: string().max(255),
  vehicleModel: string().max(255),
  vehicleColor: string().max(255),
  licensePlate: string().max(255),
  licensePlateState: string().max(255),
});

type ParkingForm = Infer<typeof schema>;

const defaultValues: ParkingForm = {
  firstName: "",
  lastName: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleColor: "",
  licensePlate: "",
  licensePlateState: "TX",
};

const getSavedData = (): ParkingForm => {
  if (typeof window === "undefined") {
    return defaultValues;
  }
  const storedValues = localStorage.getItem("form");
  if (!storedValues) {
    return defaultValues;
  }

  return JSON.parse(storedValues);
};

function Park() {
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<ParkingForm>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: ParkingForm) => {
    console.log(data);
    // save it
    localStorage.setItem("form", JSON.stringify(data));

    fetch("/api/park", {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify(data),
    });
  };

  // wonky impl
  useEffect(() => {
    const localData = getSavedData();

    for (const [key, val] of Object.entries(localData)) {
      // @ts-ignore
      setValue(key, val);
    }
  }, []);

  return (
    <StyledBox>
      <Typography sx={{ p: 2, fontWeight: "bold" }} variant="h3">
        Register for Parking
      </Typography>
      <form>
        <Controller
          name="firstName"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              fullWidth
              className="input"
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              inputRef={ref}
              label="First Name"
              {...field}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              fullWidth
              className="input"
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              inputRef={ref}
              label="Last name"
              {...field}
            />
          )}
        />

        <Controller
          name="vehicleMake"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              fullWidth
              className="input"
              error={Boolean(errors.licensePlate)}
              helperText={errors.licensePlate?.message}
              inputRef={ref}
              label="Vehicle Make"
              {...field}
            />
          )}
        />

        <Controller
          name="vehicleModel"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              fullWidth
              className="input"
              error={Boolean(errors.licensePlate)}
              helperText={errors.licensePlate?.message}
              inputRef={ref}
              label="Vehicle Model"
              {...field}
            />
          )}
        />

        <Controller
          name="vehicleColor"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              fullWidth
              className="input"
              error={Boolean(errors.licensePlate)}
              helperText={errors.licensePlate?.message}
              inputRef={ref}
              label="Vehicle Color"
              {...field}
            />
          )}
        />

        <Controller
          name="licensePlate"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              fullWidth
              className="input"
              error={Boolean(errors.licensePlate)}
              helperText={errors.licensePlate?.message}
              inputRef={ref}
              label="License Plate #"
              {...field}
            />
          )}
        />

        <Controller
          name="licensePlateState"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              fullWidth
              className="input"
              error={Boolean(errors.licensePlate)}
              helperText={errors.licensePlate?.message}
              inputRef={ref}
              label="License Plate State"
              {...field}
            />
          )}
        />

        <Box sx={{ mt: 2 }}>
          <Button
            sx={{ mr: 1 }}
            onClick={() => {
              reset();
              localStorage.removeItem("form");
            }}
            variant="contained"
            color="secondary"
          >
            Reset
          </Button>
          <Button sx={{ ml: 1 }} onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </StyledBox>
  );
}

export default Park;
