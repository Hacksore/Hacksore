import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Vehicles = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      vehicleMake: "",
      vehicleModel: "",
      vehicleColor: "",
      vehicleYear: "",
      licensePlate: "",
      licensePlateState: "",
    },
  });
  
  const onSubmit = (data: any) => {
    fetch("/api/parking/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })

    router.push("/parking/vehicles");
  }

  return (
    <div>
      <h2>Register your vehicle</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column" }}>
        <Controller
          name="vehicleMake"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="Make" />}
        />
        <Controller
          name="vehicleModel"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="Model" />}
        />
        <Controller
          name="vehicleColor"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="Color" />}
        />
        <Controller
          name="vehicleYear"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="Year" />}
        />
        <Controller
          name="licensePlate"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="License Plate #" />}
        />
        <Controller
          name="licensePlateState"
          control={control}
          render={({ field }) => <TextField {...field} placeholder="License Plate State" />}
        />
        <Button type="submit" variant="contained">
          Register Vehicle
        </Button>
      </form>
    </div>
  );
};

export default Vehicles;
