"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { infer as Infer, object, string } from "zod";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  name: string({}).nonempty(),
  vehicleMake: string().nonempty(),
  vehicleModel: string().nonempty(),
  vehicleColor: string().nonempty(),
  licensePlate: string().nonempty(),
  licensePlateState: string().nonempty(),
});

type ParkingForm = Infer<typeof schema>;

const defaultValues: ParkingForm = {
  name: "",
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
  const [open, setOpen] = useState(false);

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

  const handleClose = () => {
    setOpen(false);
    reset();
    localStorage.removeItem("form");
  };

  return (
    <StyledBox>
      <Typography sx={{ p: 2, fontWeight: "bold" }} variant="h3">
        🚘 Parking
      </Typography>
      <form>
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              className="input"
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              inputRef={ref}
              label="Name"
              {...field}
            />
          )}
        />

        <Controller
          name="vehicleMake"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              className="input"
              error={Boolean(errors.vehicleMake)}
              helperText={errors.vehicleMake?.message}
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
              className="input"
              error={Boolean(errors.vehicleModel)}
              helperText={errors.vehicleModel?.message}
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
              className="input"
              error={Boolean(errors.vehicleColor)}
              helperText={errors.vehicleColor?.message}
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
              className="input"
              error={Boolean(errors.licensePlateState)}
              helperText={errors.licensePlateState?.message}
              inputRef={ref}
              label="License Plate State"
              {...field}
            />
          )}
        />

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Reset Form Data?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              If you reset the form data it will clear the form and also remove the data when you visit the app again!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleClose}>
              Reset
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ mt: 2 }}>
          <Button sx={{ mr: 1 }} onClick={() => setOpen(true)} variant="contained" color="secondary">
            Reset
          </Button>
          <Button sx={{ ml: 1 }} onClick={handleSubmit(onSubmit)} variant="contained">
            Register Vehicle
          </Button>
        </Box>
      </form>
    </StyledBox>
  );
}

export default Park;
