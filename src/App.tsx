import { Box } from "@mui/material";
import "./App.css";
import { Layer, Line, Stage } from "react-konva";
import { useEffect, useState } from "react";

function App() {
    const [stageSize, setStageSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <Stage width={stageSize.width} height={stageSize.height}>
                <Layer>
                    <Line
                        x={100}
                        y={-19}
                        points={[0, stageSize.height / 2, stageSize.width - 300, stageSize.height / 2]}
                        tension={0.5}
                        closed
                        stroke="black"
                    />
                    <Line
                        x={100}
                        y={stageSize.height / 2 - 20}
                        points={[150, -210, 250, 0]}
                        tension={0.5}
                        closed
                        stroke="red"
                    />
                </Layer>
            </Stage>
        </Box>
    );
}

export default App;
