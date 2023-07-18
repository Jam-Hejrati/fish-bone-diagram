import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Layer, Line, RegularPolygon, Stage, Text } from "react-konva";

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

    class Fishbone {
        data: any[] = [];
        items: any = [];
        spineCoordinate: Line = {
            x1: 30,
            y1: stageSize.height / 2,
            x2: stageSize.width - 320,
            y2: stageSize.height / 2,
        };
        verticalLinesLength = stageSize.height / 2 - 50;
        lineSpot = 0.3;
        depthCounter = 1;
        lineAngle = 0;
        nthChild = 1;

        constructor(data: any[]) {
            this.data = data;
        }

        makeNewLine(prevLine: Line, r: number, percentage: number, angle: number) {
            const dx = prevLine?.x2 - prevLine?.x1;
            const newX = prevLine?.x1 + dx * percentage;
            const newY =
                prevLine?.y1 + dx * percentage * ((prevLine?.y2 - prevLine?.y1) / (prevLine?.x2 - prevLine?.x1));
            const newLineFirstPoint = { newX, newY };
            const finalCoord = [
                newLineFirstPoint?.newX,
                newLineFirstPoint?.newY,
                newLineFirstPoint?.newX - r * Math.cos(angle),
                newLineFirstPoint?.newY - r * Math.sin(angle),
            ];
            return finalCoord;
        }

        createCoordinate(item: any, lineBase: any, length: number, angle: number, startSpot: number) {
            item.coord = this.makeNewLine(lineBase, length, startSpot, angle);
        }

        start() {
            this.checkItems(this.data, this.makeNewLine, null);
        }

        print() {
            console.log(this.data);
        }

        checkItems(data: any, callBackFn: any, coord: any) {
            // debugger;
            data.forEach((item: any) => {
                if (!coord) {
                    this.verticalLinesLength = stageSize.height / 2 - 50;
                    this.createCoordinate(
                        item,
                        this.spineCoordinate,
                        this.verticalLinesLength,
                        Math.PI / 2.3,
                        this.lineSpot
                    );
                    this.verticalLinesLength -= 70;
                    this.lineSpot += 0.15;
                    this.nthChild++;
                } else {
                    const coordObject = {
                        x1: coord[0],
                        y1: coord[1],
                        x2: coord[2],
                        y2: coord[3],
                    };
                    if (this.depthCounter % 2 === 0) {
                        item.coord = this.makeNewLine(coordObject, 180, this.lineSpot, this.lineAngle);
                        this.lineAngle = this.lineAngle === 0 ? Math.PI / 2.3 : 0;
                        this.verticalLinesLength -= 70;
                    } else {
                        item.coord = this.makeNewLine(coordObject, this.verticalLinesLength, 0.9, this.lineAngle);
                        this.lineAngle = this.lineAngle === 0 ? Math.PI / 2.3 : 0;
                        this.verticalLinesLength -= 70;
                    }
                }

                if (item.children) {
                    if (!coord) {
                        let coordinate: any;
                        let angle = Math.PI / 2.3;
                        coordinate = this.makeNewLine(this.spineCoordinate, 200, this.lineSpot - 0.15, angle);
                        // this.lineSpot += 0.1;
                        angle = angle === Math.PI / 2.3 ? 0 : Math.PI / 2.3;
                        this.depthCounter++;
                        this.checkItems(item.children, this.makeNewLine, coordinate); // Recursively call the function for nested children
                    } else {
                        if (!item.coord) {
                            this.depthCounter++;
                            this.checkItems(item.children, this.makeNewLine, null); // Recursively call the function for nested children
                        } else {
                            this.depthCounter++;
                            this.checkItems(item.children, this.makeNewLine, item.coord); // Recursively call the function for nested children
                        }
                    }
                }
                this.reflect(this.data[0], stageSize.height / 2);
                this.reflect(this.data[2], stageSize.height / 2);
                this.reflect(this.data[4], stageSize.height / 2);
                this.items.push({ title: item?.title, coord: item?.coord });
            });
        }

        reflect(item: any, YSpineCoordinate: number) {
            if (item.coord) {
                // item.coord[0] += 20
                item.coord[1] = YSpineCoordinate - item.coord[1] + YSpineCoordinate;
                item.coord[3] = YSpineCoordinate - item.coord[3] + YSpineCoordinate;
            }
            if (item.children) {
                this.reflect(item.children[0], YSpineCoordinate);
            }
        }
    }

    const SpineCordinate = {
        x1: 30,
        y1: stageSize.height / 2,
        x2: stageSize.width - 320,
        y2: stageSize.height / 2,
    };

    const fishboneData = [
        {
            title: "نیروانسانی",
            children: [
                {
                    title: "قصه حسین کرد تا فردا صبح کش میایه",
                    children: [
                        {
                            title: "علل1.2",
                            children: [
                                {
                                    title: "علل 2",
                                    children: [
                                        {
                                            title: "علل 2",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: "نیرو غیر انسانی",
            children: [
                {
                    title: "test",
                    children: [
                        {
                            title: "test-2",
                            children: [
                                {
                                    title: "test-3",
                                    children: [
                                        {
                                            title: "test-4",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: "نیرو غیر انسانی",
            children: [
                {
                    title: "test",
                    children: [
                        {
                            title: "test-2",
                            children: [
                                {
                                    title: "test-3",
                                    children: [
                                        {
                                            title: "test-4",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: "نیرو غیر انسانی",
            children: [
                {
                    title: "test",
                    children: [
                        {
                            title: "test-2",
                            children: [
                                {
                                    title: "test-3",
                                    children: [
                                        {
                                            title: "test-4",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            title: "نیرو غیر انسانی",
            children: [
                {
                    title: "test",
                    children: [
                        {
                            title: "test-2",
                            children: [
                                {
                                    title: "test-3",
                                    children: [
                                        {
                                            title: "test-4",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    const diagram = new Fishbone(fishboneData);
    diagram.start();
    diagram.print();

    const randomColorGenerator = () => {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return color;
    };

    const getTextWidth = (text: string, fontSize: number, fontFamily: string) => {
        const tempText = new window.Konva.Text({
            text,
            fontSize,
            fontFamily,
        });
        return tempText.getTextWidth();
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                direction: "rtl",
                position: "relative",
            }}
        >
            <Stage width={stageSize.width} height={stageSize.height}>
                <Layer>
                    <RegularPolygon
                        x={stageSize.width - 210}
                        y={stageSize.height / 2}
                        sides={3}
                        radius={110}
                        scaleX={1.5}
                        scaleY={2}
                        rotation={90}
                        stroke="#fff"
                        fill="salmon"
                        zIndex={2}
                    />
                    <Line
                        points={[SpineCordinate.x1, SpineCordinate.y1, SpineCordinate.x2, SpineCordinate.y2]}
                        height={3}
                        tension={0.5}
                        stroke="black"
                        cornerRadius={70}
                        strokeWidth={5}
                        lineCap="round"
                        // zIndex={3}
                    />
                    <Text
                        x={SpineCordinate.x2 + 10}
                        y={SpineCordinate.y2 - 10}
                        text="عدم رضایت مشتریان از ارائه فاکتور"
                        fontSize={20}
                        fontFamily="sans-serif"
                        fill="#000"
                        zIndex={3}
                    />
                    {diagram?.items.map((item: any) => (
                        <>
                            <Line
                                points={item.coord}
                                stroke={`#${randomColorGenerator()}`}
                                strokeWidth={3}
                                cornerRadius={70}
                                lineCap="round"
                                // onClick={() => console.log("text")}
                            />
                            <Text
                                x={
                                    item.coord[2] -
                                    (getTextWidth(item.title, 20, "Arial") > 200
                                        ? 200
                                        : getTextWidth(item.title, 20, "Arial") + 15)
                                }
                                y={item.coord[3] - 10}
                                text={item.title}
                                fontSize={16}
                                fontFamily="sans-serif"
                                width={150}
                                fill="black"
                            />
                        </>
                    ))}
                </Layer>
            </Stage>
        </Box>
    );
};

export default FishboneDiagram;