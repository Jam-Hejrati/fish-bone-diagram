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
    const [line, setLine] = useState();

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
        // setLine(finalCsoord)
        console.log(finalCoord);
        return finalCoord;
    };

    console.log(makeNewLine({ x1: 559.55, y1: 312.5, x2: 518.8587973894732, y2: 116.68318246353542 }, 200, 0, 0.85));

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
                    ],
                },
            ],
        },
    ];

    const createCordinates = (data, makeNewLine, cord) => {
        data.forEach((item) => {
            if (!cord) {
                item.cord = makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85);
            } else {
                const cordObject = {
                    x1: cord[0],
                    y1: cord[1],
                    x2: cord[2],
                    y2: cord[3],
                };

                item.cord = makeNewLine(cordObject, 200, Math.PI / 2.3, 0.85);
            }

            // if (item.cord) {
            //     item.cord = makeNewLine(...item.cord, 200, Math.PI / 2.3, 0.85);
            // } else if (cord) {
            //     item.cord = makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85);
            // }

            if (item.children) {
                console.log("object");

                if (!cord) {
                    const cordinate = makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85);
                    createCordinates(item.children, makeNewLine, cordinate); // Recursively call the function for nested children
                } else {
                    createCordinates(item.children, makeNewLine, cord); // Recursively call the function for nested children
                }
            }
        });
    };

    createCordinates(fishboneData, makeNewLine);

    console.log(fishboneData);
    // fishboneData.map(mainBone => {
    //     const mainBoneCordinate = makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85)

    //     const children =

    // })

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
                    <Line
                        points={makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.85)}
                        tension={0.5}
                        closed
                        stroke="red"
                        strokeWidth={3}
                    />
                    {line && (
                        <Line
                            points={makeNewLine(line, 200, 0, 0.85)}
                            tension={0.5}
                            closed
                            stroke="blue"
                            strokeWidth={3}
                        />
                    )}
                    {/* <Line
                        // points={[
                        //     SpineCordinate.x2 - 0.1 * (SpineCordinate.x2 - SpineCordinate.x1),
                        //     SpineCordinate.y1,
                        //     ...secondCordinateBaseOnFirstCordinate(
                        //         {
                        //             x: SpineCordinate.x2 - 0.1 * (SpineCordinate.x2 - SpineCordinate.x1),
                        //             y: SpineCordinate.y1,
                        //         },
                        //         200,
                        //         Math.PI / 3
                        //     ),
                        // ]}
                        points={makeNewLine({x1:524.9624777810523, y1:146.05570509400513, x2:324.96247778105226, y2:146.05570509400513}, 100, Math.PI / 2.3 , 0.45)}
                        tension={0.5}
                        closed
                        stroke="green"
                        strokeWidth={3}
                    /> */}
                </Layer>
            </Stage>
        </Box>
    );
};

export default FishboneDiagram;
