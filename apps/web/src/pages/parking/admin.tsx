import { VehicleCard } from "../../components/parking/vehicle-card";
import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    fetch("/api/parking/all")
      .then(res => res.json())
      .then(res => setVehicles(res));
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <h2>All Vehicles</h2>
      <br />
      <Grid container>
        {vehicles.map((props: any) => (
          <Grid item xs={12}>
            <VehicleCard
              name={props.name}
              key={props.licensePlate}
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
