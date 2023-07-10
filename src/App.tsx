import { Box } from "@mui/material";
import "./App.css";
import FishboneDiagram from "./components/FishboneDiagram";

function App() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <FishboneDiagram />
        </Box>
    );
}

export default App;
