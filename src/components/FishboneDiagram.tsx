import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Layer, Line, Stage } from "react-konva";

type Line = {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

const FishboneDiagram = () => {
    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setStageSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const SpineCordinate = {
        x1: 30,
        y1: stageSize.height / 2,
        x2: stageSize.width - 30,
        y2: stageSize.height / 2,
    };

    const makeNewLine = (prevLine: Line, r: number, angle: number, percentage: number) => {
        const dx = prevLine?.x2 - prevLine?.x1;
        const newX = prevLine?.x1 + dx * percentage;
        const newY = prevLine?.y1 + dx * percentage * ((prevLine?.y2 - prevLine?.y1) / (prevLine?.x2 - prevLine?.x1));
        const newLineFirstPoint = { newX, newY };
        const finalCoord = [
            newLineFirstPoint?.newX,
            newLineFirstPoint?.newY,
            newLineFirstPoint?.newX - r * Math.cos(angle),
            newLineFirstPoint?.newY - r * Math.sin(angle),
        ];
        return finalCoord;
    };

    const fishboneData = [
        {
            title: "نیروانسانی",
            children: [
                {
                    title: "علل یک",
                    children: [
                        {
                            title: "علل 2",
                        },
                        {
                            title: "علل 1.2",
                        },
                    ],
                },
            ],
        },
    ];

    const items = [];
    let depthCounter = 1;
    const createCordinates = (data: any, makeNewLine: any, cord: any) => {
        data.forEach((item: any, index: number) => {
            if (!cord) {
                item.cord = makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85);
            } else {
                const cordObject = {
                    x1: cord[0],
                    y1: cord[1],
                    x2: cord[2],
                    y2: cord[3],
                };
                if (depthCounter % 2 === 0) {
                    item.cord = makeNewLine(cordObject, 200, 0, 0.85);
                } else {
                    item.cord = makeNewLine(cordObject, 200, Math.PI / 2.3, 0.85);
                }
            }

            if (item.children) {
                if (!cord) {
                    let cordinate: any;
                    if (depthCounter % 2 === 0) {
                        cordinate = makeNewLine(SpineCordinate, 200, Math.PI, 0.85);
                    } else {
                        cordinate = makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85);
                    }
                    depthCounter++;
                    createCordinates(item.children, makeNewLine, cordinate); // Recursively call the function for nested children
                } else {
                    if (!item.cord) {
                        depthCounter++;
                        createCordinates(item.children, makeNewLine, cord); // Recursively call the function for nested children
                    } else {
                        console.log(cord);
                        depthCounter++;
                        createCordinates(item.children, makeNewLine, item.cord); // Recursively call the function for nested children
                    }
                }
            }
            console.log(item);
            items.push({ title: item?.title, coord: item?.cord });
        });
    };

    console.log(fishboneData);

    createCordinates(fishboneData, makeNewLine, null);
    console.log(items);

    const randomColorGenerator = () => {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        console.log(color);
        return color;
    };

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
            <Stage width={stageSize.width} height={stageSize.height}>
                <Layer>
                    <Line
                        points={[SpineCordinate.x1, SpineCordinate.y1, SpineCordinate.x2, SpineCordinate.y2]}
                        tension={0.5}
                        closed
                        stroke="black"
                        strokeWidth={3}
                    />
                    {/* <Line
                        points={makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85)}
                        tension={0.5}
                        closed
                        stroke="red"
                        strokeWidth={3}
                    /> */}
                    {items.map((item) => (
                        <Line
                            points={item.coord}
                            tension={0.5}
                            closed
                            stroke={`#${randomColorGenerator()}`}
                            strokeWidth={3}
                        />
                    ))}
                </Layer>
            </Stage>
        </Box>
    );
};

export default FishboneDiagram;
