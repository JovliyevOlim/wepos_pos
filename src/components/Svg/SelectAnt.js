import React from 'react';
import {Image, Select, Input, Space, Button} from 'antd';
import './selectAnt.css'
import arrowDown from "../../img/direction-down 01.svg";
import {SearchOutlined} from "@ant-design/icons"
import {camelize} from "../../util";
const { Search } = Input;

function SelectAnt({name,permission,selectList,onChange}) {
    const selectOption = permission ? [{value: '', label: "Barchasi"},
            ...selectList.map((item) => ({value: item.id, label: camelize(item?.name)}))] :
        selectList.map((item) => ({value: item.id, label:camelize(item?.name)}))

    return (
        <>
            <h5 className={'selectLabel'}>{name}:</h5>
            <Select
                suffixIcon={<Image preview={false} src={arrowDown}/>}
                showSearch
                placeholder="Tanlang"
                optionFilterProp="children"
                onChange={onChange}
                defaultValue={selectOption[0]}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                options={selectOption}
            />
        </>
    );
}

export default SelectAnt;



export function SearchAnt({name,onChange}) {


    return (
        <>
            <h5 className={'selectLabel'}>{name}:</h5>
               <Search
                   placeholder="Qidirish...."
                   allowClear
                   onChange={onChange}
               />
        </>
    );
}

export function InputAnt({name,onChange}) {

    const onSearch = (value) => console.log(value);

    return (
        <>
            <h5 className={'selectLabel'}>{name}:</h5>
            <Input rootClassName={'input-ant'} placeholder="Basic usage" />
        </>
    );
}

export function ButtonAnt({onClick,icon,type,text,bgColor}) {


    return (
        <>
            <Button onClick={onClick} className={'button-ant'} icon={icon} type={type}
            style={{
                backgroundColor:bgColor
            }}
            >{text}</Button>
        </>
    );
}

