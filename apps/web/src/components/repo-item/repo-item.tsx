"use client";
import { VisibilityOff, Visibility, Delete } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";

export const RepoItem = ({ repoName, data }: any) => {
  const [visible, setVisible] = useState(false);

  const value = visible ? data.url : Array(data.url.length).fill("*").join("");
  return (
    <Box sx={{ display: "flex", flexDirection: "row", textAlign: "left", p: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left", p: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {repoName}
        </Typography>
        <OutlinedInput
          value={value}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={() => setVisible(!visible)} edge="end">
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
      <IconButton>
        <Delete />
      </IconButton>
    </Box>
  );
};
