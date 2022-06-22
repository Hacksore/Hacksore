import { Social } from "./components/social";
import { Projects } from "./components/projects";
import { AboutMe } from "./components/aboutMe";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

import { initializeApp } from "firebase/app";

const StyledBox = styled(Box)(() => ({
  "& .content-wrap": {
    padding: 22,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const firebaseConfig = {
  apiKey: "AIzaSyDBO3X54XXPYYDiL3XEcydaPquCNFzJYVU",
  authDomain: "biofun.firebaseapp.com",
  databaseURL: "https://biofun.firebaseio.com",
  projectId: "biofun",
  storageBucket: "biofun.appspot.com",
  messagingSenderId: "331493792247",
  appId: "1:331493792247:web:0fc34f987d3a67167976f2",
  measurementId: "G-HPNGCVE8RB",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

if (window.location.hostname === "localhost") {
  console.log("Connecting to localhost emulator for realtime db");
  connectDatabaseEmulator(database, "localhost", 9000); 
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBox>
        <div className="content-wrap">
          <AboutMe />
          <Social />
          <Projects />
        </div>
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
