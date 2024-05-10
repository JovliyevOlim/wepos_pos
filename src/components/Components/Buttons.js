import {useTranslation} from "react-i18next";
import {Tooltip} from "antd";

import trashIcon from "../../img/Trash-danger.svg";
import edit from "../../img/pencil.svg"
import eye from "../../img/eye.svg"
import {PlusOutlined} from "@ant-design/icons";

import "./buttons.css"

const CustomButton = ({ onClick, className, size= "small", text= "", img, icon , ...props}) => {
    return <Tooltip placement="bottom" title={text}>
        <button
          onClick={() => onClick()}
          className={`buttonClass viewButton ${className} ${size === "big" ? "bigButton" : "smallButton"}`}
          {...props}>
            {
                icon ? icon : <img src={img} alt="custom button"/>
            }
        </button>
    </Tooltip>
}

const AddButton = ({ onClick = () => {}, size= "small", text , ...props}) => {
    return <button type={'button'}
        onClick={() => onClick()}
        className={`buttonClass addButton ${size === "big" ? "bigButton" : "smallButton"}`}
        {...props}>
        <PlusOutlined />
        {text}
    </button>
}

const DeleteButton = ({ onClick, size= "small" , ...props}) => {
    const {t} = useTranslation();

    return <Tooltip placement="bottom" title={t('button.delete')}>
        <button
            onClick={() => onClick()}
            className={`buttonClass deleteButton ${size === "big" ? "bigButton" : "smallButton"}`}
            {...props}>
            <img src={trashIcon} alt="delete"/>
        </button>
    </Tooltip>
}

const EditButton = ({onClick, size = "small", ...props}) => {
    const {t} = useTranslation();

    return <Tooltip placement="bottom" title={t('button.edit')}>
        <button
            onClick={() => onClick()}
            className={`buttonClass editButton ${size === "big" ? "bigButton" : "smallButton"}`}
            {...props}>
            <img src={edit} alt="edit"/>
        </button>
    </Tooltip>
}

const ViewButton = ({onClick, size = "small", ...props}) => {
    const {t} = useTranslation();

    return <Tooltip placement="bottom" title={t('button.view')}>
        <button
            onClick={() => onClick()}
            className={`buttonClass viewButton ${size === "big" ? "bigButton" : "smallButton"}`}
            {...props}>
            <img src={eye} alt="view"/>
        </button>
    </Tooltip>
}

export {DeleteButton, EditButton, ViewButton, AddButton, CustomButton}
