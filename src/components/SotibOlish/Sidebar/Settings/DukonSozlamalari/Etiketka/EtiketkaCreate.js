import {Fragment, useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {Layer, Rect, Stage, Transformer, Group, Image, Text} from "react-konva";
import {Form, Input, InputNumber} from "antd";
import useImage from 'use-image';
import {Editor} from "@tinymce/tinymce-react";

const LionImage = () => {
    const [image] = useImage('https://konvajs.org/assets/lion.png');
    return <Image image={image} />;
};

const shtrixCode = <svg width="241px" height="73.60793804079967px" x="0px" y="0px" viewBox="0 0 241 73.60793804079967"
                        xmlns="http://www.w3.org/2000/svg" version="1.1" style={{transform: "translate(0,0)"}}>
    <Rect x="0" y="0" width="241" height="73.60793804079967" style={{fill: "#ffffff"}}></Rect>
    <Group transform="translate(0, 0)" style={{fill: "#000000"}}>
        <Rect x="0" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="5.864014157445733" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="11.728028314891464" y="0" width="5.864014157445733" height="40.28668804079952"></Rect>
        <Rect x="21.501385243967686" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="25.410728015598174" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="33.22941355885916" y="0" width="5.864014157445733" height="40.28668804079952"></Rect>
        <Rect x="43.00277048793537" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="50.82145603119635" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="54.73079880282683" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="64.50415573190305" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="68.41349850353355" y="0" width="7.818685543260977" height="40.28668804079952"></Rect>
        <Rect x="78.18685543260976" y="0" width="5.864014157445733" height="40.28668804079952"></Rect>
        <Rect x="86.00554097587074" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="91.86955513331648" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="95.77889790494696" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="107.50692621983843" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="111.41626899146891" y="0" width="7.818685543260977" height="40.28668804079952"></Rect>
        <Rect x="123.14429730636039" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="129.00831146380614" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="132.9176542354366" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="144.64568255032808" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="150.5096967077738" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="158.3283822510348" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="164.19239640848053" y="0" width="5.864014157445733" height="40.28668804079952"></Rect>
        <Rect x="172.0110819517415" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="177.87509610918724" y="0" width="5.864014157445733" height="40.28668804079952"></Rect>
        <Rect x="187.64845303826345" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="193.5124671957092" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="201.33115273897016" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="205.24049551060065" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="215.01385243967687" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <Rect x="224.7872093687531" y="0" width="5.864014157445733" height="40.28668804079952"></Rect>
        <Rect x="232.60589491201407" y="0" width="1.9546713858152442" height="40.28668804079952"></Rect>
        <Rect x="236.51523768364456" y="0" width="3.9093427716304885" height="40.28668804079952"></Rect>
        <text style={{font: "30.321250000000145px monospace"}} textAnchor="middle" x="120.5"
              y="70.60793804079967">1234567890123
        </text>
    </Group>
</svg>

const Rectangle = ({shapeProps, isSelected, onSelect, onChange}) => {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <Fragment>
            <Rect
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    // transformer is changing scale of the node
                    // and NOT its width or height
                    // but in the store we have only width and height
                    // to match the data better we will reset scale on transform end
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // we will reset it back
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        // set minimal value
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </Fragment>
    );
};

const TextComp = ({shapeProps, isSelected, onSelect, onChange, width, height}) => {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);


    function handleResize() {
        if (shapeRef.current !== null) {
            // const textNode = shapeRef.current;
            // const box = shapeRef.current.getClientRect();
            // const absPos = shapeRef.current.getAbsolutePosition();
            // const offsetX = box.x - absPos.x;
            // const newAbsPos = {...absPos}
            // const newWidth = textNode.width() * textNode.scaleX();
            // console.log(box.x, "box x", absPos.x, "abspos x", textNode.scaleX(), "scaleX",textNode.width(), "Text width", offsetX, "offsetX" )
            // if (box.x < 0) {
            //     newAbsPos.x = -offsetX;
            // }
            // if (box.x + box.width > width){
            //     console.log(newWidth, textNode.width(), width - box.width - offsetX)
            //     newAbsPos.x = width - box.width - offsetX;
            //     textNode.setAttrs({
            //         width: textNode.width(),
            //         scaleX: 1,
            //     });
            // } else {
            //     textNode.setAttrs({
            //         width: newWidth,
            //         scaleX: 1
            //     });
            // }
            // textNode.setAbsolutePosition(newAbsPos)
            // onResize(newWidth, newHeight);
            const textNode = shapeRef.current;
            const box = shapeRef.current.getClientRect();
            const absPos = shapeRef.current.getAbsolutePosition();
            const offsetX = box.x - absPos.x;

            const newWidth = textNode.width() * textNode.scaleX() ;
            const newAbsPos = {...absPos}
            if (box.x < 0) {
                console.log("asas", offsetX)
                newAbsPos.x = -offsetX;
            }
            if (box.x + box.width > width) {
                // newAbsPos.x = width - box.width - offsetX;
                console.log("bbbbbb",textNode.width())
                if (box.x > 0 && box.width === textNode.width()){
                    textNode.setAttrs({
                        width: textNode.width() - box.x,
                        scaleX: 1,
                    });
                } else {
                    textNode.setAttrs({
                        width: textNode.width(),
                        scaleX: 1,
                    });
                }
            } else {
                console.log("ccccc")
                if (box.x >= 0){
                    textNode.setAttrs({
                        width: newWidth,
                        scaleX: 1
                    });
                } else {
                    textNode.setAttrs({
                        width: textNode.width(),
                        scaleX: 1
                    });
                }

            }
            textNode.setAbsolutePosition(newAbsPos)
        }
    }

    return (
        <Fragment>
            <Text
                text='Hello React-Konva!'
                fontSize={25}
                fill='blue'
                // align='center'
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}
                draggable
                onDragMove={()=>{
                    const node = shapeRef.current;
                    const box = shapeRef.current.getClientRect();
                    const absPos = shapeRef.current.getAbsolutePosition();
                    const offsetX = box.x - absPos.x;
                    const offsetY = box.y - absPos.y;

                    const newAbsPos = {...absPos}
                    if (box.x < 0) {
                        newAbsPos.x = -offsetX;
                    }
                    if (box.y < 0) {
                        newAbsPos.y = -offsetY;
                    }
                    if (box.x + box.width > width) {
                        newAbsPos.x = width - box.width - offsetX;
                    }
                    if (box.y + box.height > height) {
                        newAbsPos.y = height - box.height - offsetY;
                    }
                    node.setAbsolutePosition(newAbsPos)
                }}
                onTransform={handleResize}

                // onDragEnd={(e) => {
                //     if(width - shapeProps.width - Math.round(e.target.x()) > 0) {
                //         console.log("1")
                //         onChange({
                //             ...shapeProps,
                //             x: Math.round(e.target.x()),
                //             y: Math.round(e.target.y()),
                //         });
                //     } else {
                //         console.log("2")
                //         onChange({
                //             ...shapeProps,
                //             x: 0,
                //             y: 0,
                //         });
                //     }
                // }}
                // onTransform={(e) => {
                //     const node = shapeRef.current;
                //     // const scaleX = node.scaleX();
                //     // const scaleY = node.scaleY();
                //     onChange({
                //         ...shapeProps,
                //         // x: node.x(),
                //         // y: node.y(),
                //         width: Math.max(5,node.width() * node.scaleX),
                //         scaleX: 1,
                //         scaleY: 1,
                //         // height: Math.max(node.height() * scaleY),
                //     });
                //     // node.setAttrs({
                //     //     width:Math.max(node.width() * node.scaleX),
                //     //     scaleX:1
                //     // })
                // }}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    enabledAnchors={['middle-left', 'middle-right']}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        // if (Math.abs(newBox.width) < 5) {
                        //     return oldBox;
                        // }
                        newBox.width = Math.max(5,newBox.width)
                        return newBox;
                    }}
                />
            )}
        </Fragment>
    );
};

const initialRectangles = [
    {
        x: 10,
        y: 10,
        width: 40,
        height: 40,
        fill: 'red',
        id: 'rect1',
    },
    {
        x: 50,
        y: 50,
        width: 40,
        height: 40,
        fill: 'green',
        id: 'rect2',
    },
];

const EtiketkaCreate = () => {
    const [form] = Form.useForm();
    const height = Form.useWatch('height', form);
    const width = Form.useWatch('width', form);
    const initialTexts = [
        {
            x: 0,
            y: 0,
            // width: width,
            // height: 40,
            id: 'rect3',
        },
    ];
    const [rectangles, setRectangles] = useState(initialRectangles);
    const [texts, setTexts] = useState(initialTexts);
    const [selectedId, selectShape] = useState(null);
    const [selectedIdText, selectShapeText] = useState(null);

    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    return <div className="px-2 px-md-3 row">
        <div className="col-md-8 col-12 d-flex flex-column align-items-center justify-content-center konvaKontent gap-4">
            <Editor
                init={{
                    height:150,
                    menubar: "null",
                    plugins: "code",
                }}
                apiKey='kkjjryyh1qoiepsxtam1vtgslftwdprq3whrt32rc1gloupt'
                // onChange={onChangeHeadText}
            />
            <div className="card">
                <Stage
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                    width={width}
                    height={height}>
                    <Layer>
                        {
                            initialTexts.map((text, i) => {
                                return (
                                    <TextComp
                                        key={i}
                                        width={width}
                                        height={height}
                                        shapeProps={text}
                                        isSelected={text.id === selectedIdText}
                                        onSelect={() => {
                                            selectShapeText(text.id);
                                        }}
                                        onChange={(newAttrs) => {
                                            const txts = texts.slice();
                                            txts[i] = newAttrs;
                                            setTexts(txts);
                                        }}
                                    />
                                )
                            })
                        }
                        {/*<LionImage />*/}
                        {rectangles.map((rect, i) => {
                            return (
                                <Rectangle
                                    key={i}
                                    shapeProps={rect}
                                    isSelected={rect.id === selectedId}
                                    onSelect={() => {
                                        selectShape(rect.id);
                                    }}
                                    onChange={(newAttrs) => {
                                        const rects = rectangles.slice();
                                        rects[i] = newAttrs;
                                        setRectangles(rects);
                                    }}
                                />
                            );
                        })}
                    </Layer>
                </Stage>
            </div>
        </div>
        <div className="col-md-4 col-12">
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    height: 200,
                    width: 400
                }}
            >
                <Form.Item
                    name="name"
                    label="Nomi"
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                >
                    <Input size="large" placeholder="Nomi..."/>
                </Form.Item>
                <div className="row">
                    <div className="col-6">
                        <Form.Item
                            name="width"
                            label="Uzunligi (mm)"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                        >
                            <InputNumber className="w-100" size="large" placeholder="Balandligi..."/>
                        </Form.Item>
                    </div>
                    <div className="col-6">
                        <Form.Item
                            name="height"
                            label="Balandligi (mm)"
                            rules={[
                                {
                                    required: true,
                                }
                            ]}
                        >
                            <InputNumber className="w-100" size="large" placeholder="Balandligi..."/>
                        </Form.Item>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default connect((users) => {
})(EtiketkaCreate)
