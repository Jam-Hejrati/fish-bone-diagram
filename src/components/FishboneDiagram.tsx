import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Layer, Line, Stage, Text } from "react-konva";

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
        x2: stageSize.width - 250,
        y2: stageSize.height / 2,
    };

    const makeNewLine = (
        prevLine: Line,
        r: number,
        angle: number,
        percentage: number,
        YSpinecoordinate = stageSize.height / 2,
        reflection = false
    ) => {
        const dx = prevLine?.x2 - prevLine?.x1;
        const newX = prevLine?.x1 + dx * percentage;
        const newY = prevLine?.y1 + dx * percentage * ((prevLine?.y2 - prevLine?.y1) / (prevLine?.x2 - prevLine?.x1));
        const newLineFirstPoint = { newX, newY };
        const finalCoord = [
            newLineFirstPoint?.newX,
            reflection ? YSpinecoordinate - newLineFirstPoint?.newY + YSpinecoordinate : newLineFirstPoint?.newY,
            newLineFirstPoint?.newX - r * Math.cos(angle),
            reflection
                ? YSpinecoordinate - (newLineFirstPoint?.newY - r * Math.sin(angle)) + YSpinecoordinate
                : newLineFirstPoint?.newY - r * Math.sin(angle),
        ];
        return finalCoord;
    };

    const fishboneData = [
        {
            title: "نیروانسانی",
            children: [
                {
                    title: "قصه حسین کرد تا فردا صبح کش میایه",
                    children: [
                        {
                            title: "علل نیبت ینتب ینت بنیتب نی1.2",
                            children: [
                                {
                                    title: "عبتین تنیبتینت بیبت ینت بینلل 2",
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
                {
                    title: "قصه حسین کرد تا فردا صبح کش میایه",
                    // children: [
                    //     {
                    //         title: "علل نیبت ینتب ینت بنیتب نی1.2",
                    //         children: [
                    //             {
                    //                 title: "عبتین تنیبتینت بیبت ینت بینلل 2",
                    //                 children: [
                    //                     {
                    //                         title: "علل 2",
                    //                     },
                    //                 ],
                    //             },
                    //         ],
                    //     },
                    // ],
                },
            ],
        },
        // {
        //     title: "نیروانسانی",
        //     children: [
        //         {
        //             title: "علل یک",
        //             children: [
        //                 {
        //                     title: "علل 2",
        //                 },
        //                 {
        //                     title: "علل 1.2",
        //                     children: [
        //                         {
        //                             title: "علل 2",
        //                             children: [
        //                                 {
        //                                     title: "علل 2",
        //                                 },
        //                             ],
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     title: "نیروانسانی",
        //     children: [
        //         {
        //             title: "علل یک",
        //             children: [
        //                 {
        //                     title: "علل 2",
        //                 },
        //                 {
        //                     title: "علل 1.2",
        //                     children: [
        //                         {
        //                             title: "علل 2",
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     title: "نیروانسانی",
        //     children: [
        //         {
        //             title: "علل یک",
        //             children: [
        //                 {
        //                     title: "علل 2",
        //                 },
        //                 {
        //                     title: "علل 1.2",
        //                     children: [
        //                         {
        //                             title: "علل 2",
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     title: "نیروانسانی",
        //     children: [
        //         {
        //             title: "علل یک",
        //             children: [
        //                 {
        //                     title: "علل 2",
        //                 },
        //                 {
        //                     title: "علل 1.2",
        //                     children: [
        //                         {
        //                             title: "علل 2",
        //                         },
        //                     ],
        //                 },
        //             ],
        //         },
        //     ],
        // },
    ];

    const reflecter = (item: any, YSpinecoordinate: number) => {
        // lineTree.forEach((item) => {
        if (item.coord) {
            item.coord[1] = YSpinecoordinate - item.coord[1] + YSpinecoordinate;
            item.coord[3] = YSpinecoordinate - item.coord[3] + YSpinecoordinate;
        }
        if (item.children) {
            reflecter(item.children, YSpinecoordinate);
        }
        // });
    };

    const items: any[] = [];
    let depthCounter = 1;
    const createCordinates = (data: any, makeNewLine: any, cord: any) => {
        data.forEach((item: any) => {
            if (!cord) {
                item.cord = makeNewLine(SpineCordinate, 400, Math.PI / 2.3, 0.4);
            } else {
                const cordObject = {
                    x1: cord[0],
                    y1: cord[1],
                    x2: cord[2],
                    y2: cord[3],
                };
                if (depthCounter % 2 === 0) {
                    item.cord = makeNewLine(cordObject, 200, 0, 0.5);
                } else {
                    item.cord = makeNewLine(cordObject, 250, Math.PI / 2.3, 0.9);
                }
            }

            if (item.children) {
                if (!cord) {
                    let cordinate: any;
                    cordinate = makeNewLine(SpineCordinate, 200, Math.PI / 2.3, 0.4);
                    depthCounter++;
                    createCordinates(item.children, makeNewLine, cordinate); // Recursively call the function for nested children
                } else {
                    if (!item.cord) {
                        depthCounter++;
                        createCordinates(item.children, makeNewLine, cord); // Recursively call the function for nested children
                    } else {
                        depthCounter++;
                        createCordinates(item.children, makeNewLine, item.cord); // Recursively call the function for nested children
                    }
                }
            }
            items.push({ title: item?.title, coord: item?.cord });
        });
    };

    createCordinates(fishboneData, makeNewLine, null);
    // items.forEach((item , index) => {
    //     if(index % 2 === 0) reflecter(item, stageSize.height / 2);
    // })

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
    console.log(getTextWidth("djfkdljfdkl", 16, "sans"));
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                direction: "rtl",
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
                    <Text
                        x={SpineCordinate.x2 + 8}
                        y={SpineCordinate.y2 - 10}
                        text="عدم رضایت مشتریان از ارائه فاکتور"
                        fontSize={20}
                        fontFamily="IranSans"
                        fill="black"
                    />
                    {items.map((item) => (
                        <>
                            <Line
                                points={item.coord}
                                stroke={`#${randomColorGenerator()}`}
                                strokeWidth={3}
                                // onClick={() => console.log("text")}
                            />
                            <Text
                                x={
                                    item.coord[2] -
                                    (getTextWidth(item.title, 20, "Arial") > 200
                                        ? 150
                                        : getTextWidth(item.title, 20, "Arial") + 25)
                                }
                                y={item.coord[3] - 20}
                                text={item.title}
                                fontSize={20}
                                fontFamily="IranSans"
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
