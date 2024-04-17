import {connect} from "react-redux";
import {Link} from "react-router-dom";
import { Stage, Layer, Rect, Circle } from 'react-konva';
import MainHeaderText from "../../../../../Components/MainHeaderText";
import {AddButton, DeleteButton, EditButton} from "../../../../../Components/Buttons";

import "./etiketka.css"
import {useTranslation} from "react-i18next";

const EtiketkaList = ({users}) => {
    const {t} = useTranslation()

    return <div>
        <div className={'d-flex mb-5 align-items-center justify-content-between px-3'}>
            <MainHeaderText text={"Etiketkalar"}/>
            <Link to={'/main/shopSetting/label-create'}>
                <AddButton text={t('button.add')}/>
            </Link>
        </div>
        <div className="px-3">
            <div className="col-12 col-sm-6 col-lg-4">
                <div className="etiketkaCard">
                    <div className="konvaCard">
                        <Stage width={200} height={100}>
                            <Layer>
                                <Rect width={58} height={30} fill="red" />
                                <Circle x={100} y={100} stroke="black" radius={50} />
                            </Layer>
                        </Stage>
                    </div>
                    <div className="actionCard">
                        <div>
                            <h4>Name</h4>
                        </div>
                        <div className="d-flex gap-2">
                            <EditButton />
                            <DeleteButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default connect((users) => {})(EtiketkaList)
