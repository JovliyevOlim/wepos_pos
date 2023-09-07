import { connect } from "react-redux";
import users from "../../../../../reducer/users";
import { ImCancelCircle } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import XaridReducer, { getXaridProductType } from "../../Haridlar/reducer/XaridReducer";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";
import "./shtrixcode.css"
import {useTranslation} from "react-i18next";

const ShtrixCode = ({ XaridReducer, users, getXaridProductType }) => {



    const [mainBranchId, setMainBranchId] = useState(null)
    const [XaridArray, setXaridArray] = useState([])
    const [XaridArrayPost, setXaridArrayPost] = useState([])
    const [XaridSearchValue, setXaridSearchValue] = useState('')
    const [shtrixData, setShtrixData] = useState({
        rowGap: 60,
        columnGap: 0,
        grid: 1,
        barcodeWIdth: 6,
        barcodeHeight: 250,
        textHeight: 40,
        numberSize: 40,
        yon: 20,
        top: 20
    })
    const componentRef = useRef();
    const {t} = useTranslation()


    useEffect(() => {
        getXaridProductType(mainBranchId ? mainBranchId : users.branchId)
        setXaridArray([])
        setXaridArrayPost([])
        setXaridSearchValue('')
    }, [mainBranchId])

    function XaridSearch(e) {
        let a = []
        setXaridSearchValue(e.target.value)
        XaridReducer.xaridMahsulot.filter(val => {
            if (e.target.value === '') {
                setXaridArray([])
            } else if (val.name === e.target.value) {
                AddXaridArray(val)
            }
            else if (val.barcode === e.target.value) {
                AddXaridArray(val)
            }
            else if (val.name.toUpperCase().includes(e.target.value.toUpperCase())) {
                a.push(val)
            } else if (val.barcode.includes(e.target.value)) {
                a.push(val)
            }
        })
        setXaridArray(a)
    }

    function AddXaridArray(item) {
        setXaridArray([])
        setXaridSearchValue('')
        let a = XaridArrayPost
        let order = false
        let purchase = false
        XaridArrayPost.map(val => {
            if (item.productTypePriceId === null && val.productId === item.productId) {
                if (item.purchaseProductId) {
                    item.delete = false
                    purchase = true
                    order = true
                }
                order = true

            }
            else if (item.productId === null && val.productTypePriceId === item.productTypePriceId) {
                if (item.purchaseProductId) {
                    item.delete = false
                    purchase = true
                    order = true
                }
                order = true
            }
        })
        if (order === true) {
            if (purchase === false) {
                toast.warning(t('ol.45'))
            }
        }
        else {
            a.push({
                productId: item.productId,
                purchasedQuantity: 0,
                delete: false,
                name: item.name,
                barcode: item.barcode
            })
        }

        setXaridArrayPost(a)
    }

    function ComboChangeAmount(e, index) {
        let b = XaridArrayPost
        let totalSum = 0
        let totalQuantity = 0
        b[index][e.target.name] = e.target.value
        b[index].totalSum = parseFloat(b[index].purchasedQuantity * b[index].buyPrice)
        XaridArrayPost.map(item => {
            totalQuantity += parseFloat(item.purchasedQuantity)
            totalSum += parseFloat(item.purchasedQuantity * item.buyPrice)
            // totalQuantity += parseFloat(item.purchasedQuantity)
        }
        )
        let a = [...XaridArrayPost]
        setXaridArrayPost(a)
    }

    function DeleteXaridArrayPost(indx, purchasesId) {
        if (purchasesId === null) {
            XaridArrayPost.map((item, index) => {
                if (indx === index) {
                    XaridArrayPost.splice(index, 1)
                }
            })
        }
        else {
            XaridArrayPost.map((item, index) => {
                if (index === indx) {
                    item.delete = true
                }
            })
        }
        let b = [...XaridArrayPost]
        setXaridArrayPost(b)
        setXaridArray([])
        setXaridSearchValue('')

        let d = 0
        let c = 0
        XaridArrayPost.filter(val => val.delete === false).map(item => {
            d += parseFloat(item.purchasedQuantity)
            c += (item.purchasedQuantity * item.buyPrice)

        })
    }

    const handlePrintCopy = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () => {
        XaridArrayPost[0] ? handlePrintCopy() : toast.warning(t('mah.4'))
        setXaridArrayPost([])
        setXaridSearchValue('')
        setXaridArray([])
    }


    return (
        <div className={'xaridQilishBox'}>

            <div className={'row  mt-5 mx-5 '}>
                <div className="col-md-12 my-3">
                    <div className="offset-1 col-md-4">
                        <select name="" id="" value={mainBranchId} onChange={(e) => setMainBranchId(e.target.value)} className={'form-control'}>
                            {
                                users.branches.map(item =>
                                    <option value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>

                </div>
                <h5 className={'text-center mt-3'}>{t('mah.5')}</h5>
                <div className={'col-md-10 mt-4 mb-5 offset-1'}>
                    <div className="row">
                        <div className="col-md-12">
                            <input type="text"
                                value={XaridSearchValue} onChange={XaridSearch}
                                className={'form-control'}
                                placeholder={t('mah.6')} />
                            {
                                XaridArray.length !== 0 ?
                                    <div className={'Combo-array'}>
                                        {
                                            XaridArray.map(item =>
                                                <p onClick={() => AddXaridArray(item)} key={item.id}>
                                                    {item.name}
                                                </p>
                                            )

                                        }
                                    </div>
                                    : ''
                            }
                            {/*--ESKI--*/}
                            <div><p style={{ color: "red", textAlign: 'center', marginTop: '4px' }}>{t('mah.7')} </p></div>
                            <div className="table-responsive">
                                <table className={'table mt-3 border'}>
                                    <thead style={{ textAlign: 'center' }}>
                                        <tr>
                                            <th>{t('Pagination.1')}</th>
                                            <th>{t('mah.8')}</th>
                                            <th>{t('mah.9')}</th>
                                            <th>x</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            XaridArrayPost.filter(val => val.delete === false).map((item, index) =>
                                                <tr className={'text-center'} key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <div>
                                                            <p>{item.barcode}</p>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div>
                                                            <input className={'form-control'} name={'purchasedQuantity'}
                                                                value={item.purchasedQuantity}
                                                                min={0}
                                                                onChange={(e) => ComboChangeAmount(e, index)}
                                                                type="number" />
                                                        </div>
                                                    </td>
                                                    <td className={'text-danger'}><ImCancelCircle
                                                        onClick={() => DeleteXaridArrayPost(index, item.purchaseProductId
                                                            ? item.purchaseProductId : null)}
                                                        style={{ width: '30px', height: '30px' }} /></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div style={{ display: 'flex', justifyContent: 'end', marginTop: 10 }}><button className={'btn btn-primary'} onClick={handlePrint} >{t('mah.10')}</button></div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        <div>
                            <label className='font-w600' htmlFor='grid'>{t('mah.11')}</label>
                            <input className='form-control' min='1' type='number' value={shtrixData.grid}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, grid: e.target.value }))}
                                placeholder={t('mah.11')} name='grid' id='grid' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='barcodeWidth'>{t('mah.12')} </label>
                            <input className='form-control' min='1' max='8' type='number' value={shtrixData.barcodeWIdth}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, barcodeWIdth: e.target.value }))}
                                placeholder={t('mah.12')} name='barcodeWidth' id='barcodeWidth' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='barcodeHeight'>{t('mah.13')}</label>
                            <input className='form-control' min='1' type='number' value={shtrixData.barcodeHeight}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, barcodeHeight: e.target.value }))}
                                placeholder={t('mah.13')} name='barcodeHeight' id='barcodeHeight' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='textHeight'>{t('mah.14')} </label>
                            <input className='form-control' min='1' type='number' value={shtrixData.textHeight}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, textHeight: e.target.value }))}
                                placeholder={t('mah.14')} name='textHeight' id='textHeight' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='numberSize'>{t('mah.15')} </label>
                            <input className='form-control' min='1' type='number' value={shtrixData.numberSize}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, numberSize: e.target.value }))}
                                placeholder={t('mah.15')} name='numberSize' id='numberSize' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='rowGap'>{t('mah.16')} </label>
                            <input className='form-control' min='0' type='number' value={shtrixData.rowGap}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, rowGap: e.target.value }))}
                                placeholder={t('mah.16')} name='rowGap' id='rowGap' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='columnGap'>{t('mah.17')}</label>
                            <input className='form-control' min='0' type='number' value={shtrixData.columnGap}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, columnGap: e.target.value }))}
                                placeholder={t('mah.17')} name='columnGap' id='columnGap'
                                disabled={shtrixData.grid <= 1}
                            />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='yon'>{t('mah.18')} </label>
                            <input className='form-control' min='0' type='number' value={shtrixData.yon}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, yon: e.target.value }))}
                                placeholder={t('mah.18')} name='yon' id='yon'
                            />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='top'>{t('mah.19')} </label>
                            <input className='form-control' min='0' type='number' value={shtrixData.top}
                                onChange={(e) => setShtrixData((prev) => ({ ...prev, top: e.target.value }))}
                                placeholder={t('mah.19')} name='top' id='top'
                            />
                        </div>
                    </div>
                    <div style={{ margin: `${shtrixData.top}px ${shtrixData.yon}px 0` }} ref={componentRef}>
                        <div className="row" style={{
                            display: 'grid', gridTemplateColumns: `repeat(${shtrixData.grid}, 1fr)`,
                            rowGap: `${shtrixData.rowGap}px`, columnGap: `${shtrixData.columnGap}px`
                        }}>
                            {
                                XaridArrayPost.map((item) => {
                                    let array = [];
                                    let i = 0;
                                    while (i < item.purchasedQuantity) {
                                        i++;
                                        array = [...array, <div className="text-center">
                                            <p style={{ marginBottom: -10, position: 'relative', zIndex: 4, fontWeight: 600, fontSize: `${shtrixData.textHeight}px`, fontFamily: "monospace" }}>{item.name}</p>
                                            <Barcode width={shtrixData.barcodeWIdth} height={shtrixData.barcodeHeight} fontSize={shtrixData.numberSize} value={item.barcode} />
                                        </div>]
                                    }
                                    return array;
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect((users, XaridReducer),
    {
        getXaridProductType
    })(ShtrixCode)