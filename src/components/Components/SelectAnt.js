import React from 'react';
import {Image, Select, Input, Space, Button, Tooltip} from 'antd';
import './selectAnt.css'
import arrowDown from "../../img/direction-down 01.svg";
import {camelize} from "../../util";
import {t} from "i18next";

const {Search} = Input;


function SelectAnt({name, permission, selectList, onChange, all, disabled, value}) {
    const selectOption = permission ? [{value: '', label: all ? all : (t('ol.21'))},

            ...selectList.map((item) => ({value: item.id, label: camelize(item?.name)}))] :
        selectList.map((item) => ({value: item.id, label: camelize(item?.name)}))

    return (
        <>
            {
                name && <h5 className={'selectLabel'}>{name}</h5>
            }
            <Select
                suffixIcon={<Image preview={false} src={arrowDown}/>}
                showSearch
                value={value}
                disabled={disabled ? disabled : false}
                placeholder={t('ol.22')}
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


export function SearchAnt({name, onChange}) {


    return (
        <>
            <h5 className={'selectLabel'}>{name}:</h5>
            <Search
                placeholder={t('ol.23')}
                allowClear
                onChange={onChange}
            />
        </>
    );
}

export function InputAnt({name, type, items}) {


    return (
        <>
            <label htmlFor={name} className={'selectLabel'}>{name}:</label>
            <Input rootClassName={'input-ant'} id={name} type={type} {...items}/>
        </>
    );
}

export function ButtonAnt({onClick, icon, type, text, bgColor, danger, value}) {


    return (
        <>
            <Button onClick={onClick} className={'button-ant'} icon={icon} danger={danger} type={type}
                    style={{
                        backgroundColor: bgColor
                    }}
            >{text}</Button>
        </>
    );
}

export function TableButton({onClick, icon, type, danger, title, color}) {


    return (
        <>
            <Tooltip title={title} color={color} key={color}>
                <Button type={type} onClick={onClick} shape="round" icon={icon} size={'large'} danger={danger}/>
            </Tooltip>

        </>
    );
}
