import { Box } from "@mui/material";

export const VehicleCard = ({ make, model, name, licensePlate }: any) => {
  return (
    <Box
      sx={{ borderRadius: 1, textAlign: "left", background: "#262626", padding: "2px 12px 2px 12px", marginBottom: 3, color: "#fff" }}
    >
      <p style={{ fontWeight: "bold", fontSize: 20, margin: "8px 0 0 0" }}>
       {name}
      </p>
      <p style={{ margin: "2px 0 8px 0" }}> {make} {model} - {licensePlate}</p>
    </Box>
  );
};
