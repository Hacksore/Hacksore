import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useEffect, useState } from "react";
import { VehicleCard } from "../../components/parking/vehicle-card";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    fetch("/api/parking/me")
      .then(res => res.json())
      .then(res => {
        if (!res.error) {
          setVehicles(res);
        }
      });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <h2>Your Vehicles</h2>
      <Link href="/parking/create">
        <Button>Add new Vehicle</Button>
      </Link>
      <hr />
      <Grid container>
        {Object.entries(vehicles).map(([licensePlate, props]: any) => (
          <Grid item xs={12}>
            <VehicleCard
              key={licensePlate}
              name={props.name}
              make={props.vehicleMake}
              model={props.vehicleModel}
              licensePlate={props.licensePlate}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Vehicles;
