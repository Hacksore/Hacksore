import { AppBar, Box, styled, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const navItems = ["/uses"];

const StyledBox = styled(Box)(() => ({
  display: "flex",
  "& a": {
    textDecoration: "none",
    color: "#fff",
    "& > *": { fontWeight: "bold" },
  },
}));

export const Header = () => {
  return (
    <StyledBox>
      <AppBar component="nav" elevation={0} position="absolute" sx={{ background: "rgba(0,0,0,0)" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold", flexGrow: 1 }}>
            <Link href="/">
              <Typography variant="h5">/home</Typography>
            </Link>
          </Typography>
          <Box>
            {navItems.map(item => (
              <Link key={item} href={item}>
                <Typography variant="h5">{item}</Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </StyledBox>
  );
};
