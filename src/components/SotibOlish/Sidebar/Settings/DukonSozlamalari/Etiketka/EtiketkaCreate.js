import {Fragment, useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {Layer, Stage, Transformer, Image, Text} from "react-konva";
import {Button, Form, Input, InputNumber, Divider} from "antd";
import useImage from 'use-image';

import "./etiketka.css"
import {
    AlignCenterOutlined,
    AlignLeftOutlined,
    AlignRightOutlined,
    BoldOutlined,
    ItalicOutlined,
    StrikethroughOutlined,
    UnderlineOutlined
} from "@ant-design/icons";
import BarcodeSvg from "./Barcode";
import barcode from "../../../../../../img/menu-line-horizontal.svg"

const BarCode = ({text}) => {
    const [image] = useImage(<BarcodeSvg text={text} />);
    return <Image image={image} />;
};

const ShtrixCode = ({isSelected,shapeProps, onSelect, onChange, width, height}) => {
    const[image] = useImage(barcode);
    const imageRef = useRef();
    const imgRef = useRef();

    useEffect(() => {
        if (isSelected) {
            imgRef.current.nodes([imageRef.current]);
            imgRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    function handleResize() {
        if (imageRef.current !== null) {
            const textNode = imageRef.current;
            const box = imageRef.current.getClientRect();
            const absPos = imageRef.current.getAbsolutePosition();
            const offsetX = box.x - absPos.x;

            const newWidth = textNode.width() * textNode.scaleX() ;
            const newAbsPos = {...absPos}
            if (box.x < 0) {
                console.log("asas", offsetX)
                newAbsPos.x = -offsetX;
            }
            if (box.x + box.width > width) {
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
            onChange({...shapeProps, ...newAbsPos})
            textNode.setAbsolutePosition(newAbsPos)
        }
    }

    return <Fragment>
        <Image
            {...shapeProps}
            onClick={onSelect}
            onTap={onSelect}
            ref={imageRef}
            image={image}
            draggable
            onDragMove={()=>{
                const node = imageRef.current;
                const box = imageRef.current.getClientRect();
                const absPos = imageRef.current.getAbsolutePosition();
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
                onChange({...shapeProps, ...newAbsPos})
                node.setAbsolutePosition(newAbsPos)
            }}
            onTransform={handleResize}
        />
        {isSelected && (
            <Transformer
                ref={imgRef}
                flipEnabled={false}
                boundBoxFunc={(oldBox, newBox) => {
                    newBox.width = Math.max(5,newBox.width)
                    return newBox;
                }}
            />
        )}
    </ Fragment>;
};

const TextComp = ({shapeProps, isSelected, onSelect, onChange, width, height}) => {
    const textRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([textRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);


    function handleResize() {
        if (textRef.current !== null) {
            const textNode = textRef.current;
            const box = textRef.current.getClientRect();
            const absPos = textRef.current.getAbsolutePosition();
            const offsetX = box.x - absPos.x;

            const newWidth = textNode.width() * textNode.scaleX() ;
            const newAbsPos = {...absPos}
            if (box.x < 0) {
                console.log("asas", offsetX)
                newAbsPos.x = -offsetX;
            }
            if (box.x + box.width > width) {
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
            onChange({...shapeProps, ...newAbsPos})
            textNode.setAbsolutePosition(newAbsPos)
        }
    }

    return (
        <Fragment>
            <Text
                fill='#000'
                width={width}
                {...shapeProps}
                onClick={onSelect}
                onTap={onSelect}
                ref={textRef}
                draggable
                onDragMove={()=>{
                    const node = textRef.current;
                    const box = textRef.current.getClientRect();
                    const absPos = textRef.current.getAbsolutePosition();
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
                    onChange({...shapeProps, ...newAbsPos})
                    node.setAbsolutePosition(newAbsPos)
                }}
                onTransform={handleResize}
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    rotateEnabled={false}
                    enabledAnchors={['middle-left', 'middle-right']}
                    boundBoxFunc={(oldBox, newBox) => {
                        newBox.width = Math.max(5,newBox.width)
                        return newBox;
                    }}
                />
            )}
        </Fragment>
    );
};

const EtiketkaCreate = () => {
    const [form] = Form.useForm();
    const height = Form.useWatch('height', form);
    const width = Form.useWatch('width', form);
    const initialTexts = [
        {
            x: 0,
            y: 0,
            text: "Coca-cola 1,5l",
            align: "center",
            textDecoration: "none",
            fontStyle: "normal",
            fontVariant: "normal",
            fontSize: 20,
            id: 'rect3',
        },
        {
            x: 0,
            y: 0,
            text: "15 000",
            align: "center",
            textDecoration: "none",
            fontStyle: "normal",
            fontVariant: "bold",
            fontSize: 25,
            id: 'rect4',
        },
    ];
    const initialImages = [
        {
            x: 50,
            y: 100,
            align: "center",
            fontSize: 20,
            id: 'img1',
        },
    ];
    const [texts, setTexts] = useState(initialTexts);
    const [imgs, setImgs] = useState(initialImages);
    const [selectedIdText, selectShapeText] = useState(null);
    const [selectedText, setSelectText] = useState(null);
    const [selectedIdImg, selectShapeImg] = useState(null);
    const [selectedImg, setSelectImg] = useState(null);

    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShapeText(null);
            setSelectText(null);
            selectShapeImg(null);
            setSelectImg(null);
        }
    };

    const changeTextAttrebute = (text, name) => {
        setSelectText((prev) => ({...prev, [name]: text}))
        setTexts((prevs) => {
            const selectText = prevs.find((text) => text.id === selectedIdText)
            const selectedTextFilter = prevs.filter((text) => text.id !== selectedIdText)
            return [...selectedTextFilter, {...selectText, [name]: text}]
        })
    }

    return <div className="px-2 px-md-3 row pageEtiketka">
        <div className="col-md-8 col-12 d-flex flex-column align-items-center justify-content-between konvaKontent gap-4">
            <div className="cardInputs">
                {
                    selectedIdText ? <div className="d-flex align-items-center gap-1">
                        <div className="d-flex align-items-center gap-1">
                            <Input onChange={(e) => changeTextAttrebute(e?.target?.value, "text")} value={selectedText?.text}/>
                            <InputNumber onChange={(e) => changeTextAttrebute(e, "fontSize")} min={0} value={selectedText?.fontSize}/>
                        </div>
                        <Divider className="width2" type="vertical"/>
                        <div className="d-flex align-items-center gap-1">
                            <Button onClick={() => changeTextAttrebute("left", "align")} className={selectedText?.align === "left" ? "activeButtonEtiketka" : null} icon={<AlignLeftOutlined/>}/>
                            <Button onClick={() => changeTextAttrebute("center", "align")} className={selectedText?.align === "center" ? "activeButtonEtiketka" : null} icon={<AlignCenterOutlined/>}/>
                            <Button onClick={() => changeTextAttrebute("right", "align")} className={selectedText?.align === "right" ? "activeButtonEtiketka" : null} icon={<AlignRightOutlined/>}/>
                        </div>
                        <Divider className="width2" type="vertical"/>
                        <div className="d-flex align-items-center gap-1">
                            <Button onClick={() => changeTextAttrebute(selectedText?.fontVariant === "bold" ? "normal" : "bold", "fontVariant")} className={selectedText?.fontVariant === "bold" ? "activeButtonEtiketka" : null} icon={<BoldOutlined/>}/>
                            <Button onClick={() => changeTextAttrebute(selectedText?.fontStyle === "italic" ? "normal" : "italic", "fontStyle")} className={selectedText?.fontStyle === "italic" ? "activeButtonEtiketka" : null} icon={<ItalicOutlined/>}/>
                        </div>
                        <Divider className="width2" type="vertical"/>
                        <div className="d-flex align-items-center gap-1">
                            <Button onClick={() => changeTextAttrebute(selectedText?.textDecoration === "underline" ? "none" : "underline", "textDecoration")} className={selectedText?.textDecoration === "underline" ? "activeButtonEtiketka" : null} icon={<UnderlineOutlined/>}/>
                            <Button onClick={() => changeTextAttrebute(selectedText?.textDecoration === "line-through" ? "none" : "line-through", "textDecoration")} className={selectedText?.textDecoration === "line-through" ? "activeButtonEtiketka" : null} icon={<StrikethroughOutlined/>}/>
                        </div>
                    </div> : <p className=" d-flex align-items-center justify-content-center">Format qilish uchun elementni tanlang</p>
                }

            </div>
            <div className="h-100 d-flex align-items-center justify-content-center">
                <div className="card">
                    <Stage
                        onMouseDown={checkDeselect}
                        onTouchStart={checkDeselect}
                        width={width}
                        height={height}>
                        <Layer>
                            {
                                texts.map((text, i) => {
                                    return (
                                        <TextComp
                                            key={i}
                                            width={width}
                                            height={height}
                                            shapeProps={text}
                                            isSelected={text.id === selectedIdText}
                                            onSelect={() => {
                                                selectShapeText(text.id);
                                                setSelectText(text)
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
                            {
                                imgs.map((imge, i) => {
                                    return (
                                        <ShtrixCode
                                            key={i}
                                            width={width}
                                            height={height}
                                            shapeProps={imge}
                                            isSelected={imge.id === selectedIdImg}
                                            onSelect={() => {
                                                selectShapeImg(imge.id);
                                                setSelectImg(imge)
                                            }}
                                            onChange={(newAttrs) => {
                                                const ims = imgs.slice();
                                                ims[i] = newAttrs;
                                                setImgs(ims);
                                            }}
                                        />
                                    )
                                })
                            }
                        </Layer>
                    </Stage>
                </div>
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
