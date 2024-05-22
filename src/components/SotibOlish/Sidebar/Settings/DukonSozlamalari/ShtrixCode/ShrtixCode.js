import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import React, {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {useReactToPrint} from "react-to-print";
import Barcode from 'react-jsbarcode';
import "./shtrixcode.css"
import {useTranslation} from "react-i18next";
import MaxsulotlarRoyxariReducer, {getBarcodeAndName} from "../../../Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import MainHeaderText from "../../../../../Components/MainHeaderText";
import CardBody from "../../../../../Components/CardBody";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../../Components/SelectAnt";
import {Checkbox, DatePicker, InputNumber} from 'antd';
import CommonTable from "../../../../../Components/CommonTable";
import {CloseCircleOutlined} from "@ant-design/icons";
import moment from "moment";

const ShtrixCode = ({MaxsulotlarRoyxariReducer, users, getBarcodeAndName}) => {


    const [mainBranchId, setMainBranchId] = useState(null)
    const [search, setSearch] = useState('')
    const [isView, setIsView] = useState(false)
    const [display, setDisplay] = useState('d-none')

    const [XaridArrayPost, setXaridArrayPost] = useState([])
    const [fontSize, setFontSize] = useState(24)
    const [isName, setIsName] = useState(true)
    const [isBranchName, setIsBranchName] = useState(true)
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState('')
    const [branchName, setBranchName] = useState('')
    const inputRef = useRef()
    const [cardSize, setCardSize] = useState({
        width: 58,
        height: 58
    })

    function changeSize(e) {
        cardSize.width = e.substring(0, 2)
        cardSize.height = e.substring(2, 4)
        let a = {...cardSize}
        setCardSize(a)
    }

    const componentRef = useRef();
    const {t} = useTranslation()

    useEffect(() => {
        let a = users.branches.find(item => item.id === mainBranchId ? mainBranchId : users.branchId)
        setBranchName(a.name)
        setXaridArrayPost([])
        setSearch('')
        setIsView(false)
    }, [mainBranchId])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: '2%',
        },
        {
            title: 'Maxsulot',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Barcode',
            dataIndex: 'barcode',
            key: 'barcode',
        },
        {
            title: 'Soni',
            dataIndex: 'barcode',
            key: 'barcode',
            render: (item, values) => <div>
                <input className={'form-control w-50'} name={'purchasedQuantity'}
                       value={values.purchasedQuantity}
                       min={0}
                       onChange={(e) => ComboChangeAmount(e, values.productId)}
                       type="number"/>
            </div>
        },
        {
            title: 'Amallar',
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                <ButtonAnt type={'primary'} danger={true} text={'O\'chirish'}
                           onClick={() => DeleteXaridArrayPost(values.productId)} icon={<CloseCircleOutlined/>}/>
            </div>,
        },
    ];


    function changeSearch(e) {
        setSearch(e.target.value)
        setIsView(true)
        if (e.target.value === '') {
            setIsView(false)
        } else {
            getBarcodeAndName({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    search: e.target.value,
                    isPurchase: false,
                }
            })
        }

    }

    function AddXaridArray(item) {
        setIsView(false)
        setSearch('')
        let a = XaridArrayPost
        let isHave = XaridArrayPost.some(val => val.productId === item.id)
        if (isHave) {
            toast.warning(t('ol.45'))
        } else {
            a.push({
                productId: item.id,
                purchasedQuantity: 1,
                name: item.name,
                barcode: item.barcode,
                price: item.salePrice
            })
        }
        setXaridArrayPost(a)
    }

    useEffect(() => {
        if (MaxsulotlarRoyxariReducer.productSearch) {
            let findProduct = MaxsulotlarRoyxariReducer.productSearch
                .find(val => val.barcode === search || val.name.toLowerCase() === search.toLowerCase())
            if (findProduct) {
                AddXaridArray(findProduct)
                inputRef.current.focus()
                setSearch('')
            }
            // else {
            //     inputRef.current.focus()
            // }
        }
        if (MaxsulotlarRoyxariReducer.isClearInput) {
            setSearch('')
        }
    }, [MaxsulotlarRoyxariReducer.getBoolean])

    function ComboChangeAmount(e, id) {
        let b = XaridArrayPost.map(item => {
            if (item.productId === id) {
                return {...item, purchasedQuantity: e.target.value}
            }
            return item
        })
        setXaridArrayPost(b)
    }

    function DeleteXaridArrayPost(id) {
        let b = XaridArrayPost.filter(item => item.productId !== id)
        setXaridArrayPost(b)
    }

    const handlePrintCopy = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        setDisplay('d-flex')
        setTimeout(() => {
            handlePrintCopy()
            setXaridArrayPost([])
            setSearch('')
            setDisplay('d-none')
        }, 1000)
    }


    return (
        <div className="shtrixcode">
            <div className="col-md-12 d-flex mb-4">
                <MainHeaderText text={t('mah.5')}/>
            </div>
            <CardBody>
                <div className="col-md-12 d-flex row-gap-4 flex-wrap">
                    <div className="col-md-3 p-2">
                        <SelectAnt name={'Filiallar'} value={mainBranchId ? mainBranchId : users.branchId}
                                   onChange={(e) => setMainBranchId(e === '' ? null : e)}
                                   permission={false}
                                   selectList={users?.branches}
                        />
                    </div>
                    <div className="col-md-6 offset-1 py-2 position-relative">
                        <SearchAnt value={search} inputRef={inputRef} name={'Mahsulotni qidirish'}
                                   onChange={changeSearch}/>
                        {
                            isView && MaxsulotlarRoyxariReducer.productSearch?.length > 0 ?
                                <div className={'Combo-array'}>
                                    {
                                        MaxsulotlarRoyxariReducer.productSearch?.map(item =>
                                            <p
                                                onClick={() => AddXaridArray(item)}
                                            >
                                                {item.name}
                                            </p>
                                        )
                                    }
                                </div>
                                : ''
                        }
                    </div>

                </div>
            </CardBody>
            {
                XaridArrayPost.length > 0 && <CardBody>
                    <div className="table-responsive">
                        <CommonTable data={XaridArrayPost} columns={columns} size={0} page={XaridArrayPost.length}
                                     pagination={false}/>
                    </div>
                </CardBody>
            }

            <CardBody>
                <div className={'col-md-12 d-flex gap-2 gap-md-4 align-items-center flex-wrap'}>
                    <div className={'col-md-3'}>
                        <SelectAnt name={'O\'lchami'} permission={false} selectList={[
                            {id: '1010', name: 'Tanlang'},
                            // {id: '5858', name: '58x58'},
                            {id: '5840', name: '58x40'},
                            {id: '5830', name: '58x30'},
                            // {id: '4325', name: '43x25'},
                            {id: '3020', name: '30x20'},
                        ]} onChange={changeSize}/>
                    </div>
                    {/*<div className={'col-md-3 d-flex flex-column'}>*/}
                    {/*    <label className='barcode-text' htmlFor='grid'>Shrift o'lchami</label>*/}
                    {/*    <InputNumber value={fontSize} onChange={(e) => setFontSize(e)} className={'barcode-input'}*/}
                    {/*                 placeholder="Basic usage"/>*/}
                    {/*</div>*/}
                    {/*<div className={'col-md-1 d-flex align-items-center'}>*/}
                    {/*    <Checkbox onChange={(e) => setIsName(e.target.checked)} checked={isName}*/}
                    {/*              className='barcode-text'>Nomi</Checkbox>*/}
                    {/*</div>*/}
                    {/*<div className={'col-md-1 d-flex align-items-center'}>*/}
                    {/*    <Checkbox onChange={(e) => setIsBranchName(e.target.checked)} checked={isBranchName}*/}
                    {/*              className='barcode-text'>Filial Nomi</Checkbox>*/}
                    {/*</div>*/}
                    {/*<div className={'col-md-3 d-flex align-items-center gap-2'}>*/}
                    {/*    <Checkbox onChange={(e) => setIsDate(e.target.checked)} checked={isDate}*/}
                    {/*              className='barcode-text'>Sana</Checkbox>*/}
                    {/*    <DatePicker onChange={(e) => setDate(moment(e).format('l'))} disabled={!isDate}/>*/}
                    {/*</div>*/}
                </div>
                <div className="d-none">
                    <div
                        className={`d-flex justify-content-between flex-wrap align-items-center w-100`}
                        ref={componentRef}>
                        {
                            XaridArrayPost.map((item) => {
                                let array = [];
                                let i = 0;
                                while (i < item.purchasedQuantity) {
                                    i++;
                                    array = [...array,
                                        <BarcodeShablon branchName={branchName} item={item} cardSize={cardSize}/>
                                    ]
                                }
                                return array;
                            })
                        }
                    </div>
                </div>
                <div className={`d-flex mt-4 justify-content-start flex-wrap gap-4 align-items-center w-100`}>
                    {
                        XaridArrayPost.map((item) =>
                            <BarcodeShablon branchName={branchName} item={item} cardSize={cardSize}/>
                        )
                    }
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div style={{display: 'flex', justifyContent: 'end', marginTop: 10}}>
                            <button className={'btn btn-primary'} onClick={handlePrint}>{t('mah.10')}</button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </div>
    )
}

export default connect((users, MaxsulotlarRoyxariReducer),
    {getBarcodeAndName})(ShtrixCode)


const BarcodeShablon = ({cardSize, item, branchName}) => {
    return (
        <>
            {
                cardSize.height == 20 && cardSize.width == 30 &&
                <div
                    style={{
                        padding: `1mm`,
                    }}
                >
                    <div
                        style={{
                            width: `${cardSize.width - 3}mm`,
                            height: `${cardSize.height - 2}mm`,
                        }}
                        className={'barcode-card'}>
                        <div
                            className={'d-flex flex-column col-md-12 align-items-center justify-content-between'}>
                            <p className={"barcode-card-text m-0"}
                               style={{
                                   fontSize: `2.5mm`,
                                   lineHeight: 1.4,
                                   fontWeight: 700
                               }}>{item.name}</p>
                            <p className={"barcode-card-text m-0"}
                               style={{
                                   fontSize: `2.5mm`,
                                   lineHeight: 1.4,
                                   fontWeight: 700
                               }}>{item.price} so'm</p>
                            <div className="col-md-12 barcode-icon" style={{
                                width: `${cardSize.width - 5}mm`,
                                height: `${cardSize.height - 14.5}mm`
                            }}>
                                <Barcode
                                    options={{
                                        format: 'code128',
                                        height: 40,
                                        displayValue: false
                                    }}
                                    renderer="svg" value={item.barcode}/>

                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                cardSize.height == 30 && cardSize.width == 58 &&
                <div>
                    <div
                        style={{
                            width: `${cardSize.width}mm`,
                            height: `${cardSize.height}mm`,
                            // padding: `2mm`,
                        }}
                        className={'barcode-card'}>
                        <div
                            className={'d-flex justify-content-between align-items-center h-100'}>
                            <div className={'col-8'}>
                                <p className={"barcode-card-text"}
                                   style={{fontSize: `5mm`}}>{item.price} so'm</p>
                                <p className={"barcode-card-text"}
                                   style={{fontSize: `3.1mm`}}>{item.name}</p>

                            </div>
                            <div
                                className={'col-4'}>
                                <div className="barcode-icon"
                                     style={{
                                         transform: "rotate(270deg) scale(1.5)",
                                     }}
                                >
                                    <Barcode
                                        options={{
                                            format: item.barcode.length === 13 ? 'ean13' : 'code128',
                                            fontOptions: 'bold',
                                            fontSize: 30
                                        }}
                                        renderer="svg" value={item.barcode}/>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            }
            {
                cardSize.height == 40 && cardSize.width == 58 &&
                <div
                    style={{
                        padding: `1mm`,
                    }}
                >
                    <div
                        style={{
                            width: `${cardSize.width - 2}mm`,
                            height: `${cardSize.height - 2}mm`
                        }}
                        className={'barcode-card'}>
                        <div
                            className={'d-flex flex-column align-items-center h-100'}>
                            <div>
                                <p
                                    className={"barcode-card-text m-0"}
                                    style={{fontSize: `4mm`}}
                                >
                                    {branchName}
                                </p>
                                <p
                                    className={"barcode-card-text m-0"}
                                    style={{
                                        fontSize: `3.6mm`,
                                        lineHeight: 1.1
                                    }}
                                >
                                    {item.name}
                                </p>
                                <p
                                    className={"barcode-card-text m-0"}
                                    style={{
                                        fontSize: `6mm`,
                                        fontWeight: 700
                                    }}
                                >
                                    {item.price} so'm
                                </p>
                            </div>
                            <div className="barcode-icon" style={{width: "80%"}}>
                                <Barcode
                                    options={{
                                        format: item.barcode.length === 13 ? 'ean13' : 'code128',
                                        fontOptions: 'bold',
                                        height: item.barcode.length >= 5 ? 40 : 20,
                                        fontSize: item.barcode.length >= 5 ? 22 : 14
                                    }}
                                    renderer="svg"
                                    value={item.barcode}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}
