import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {ImCancelCircle} from "react-icons/im";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import XaridReducer, {getXaridProductType} from "../../Haridlar/reducer/XaridReducer";
import Barcode from "react-barcode";
import {useReactToPrint} from "react-to-print";
import "./shtrixcode.css"

const ShtrixCode = ({XaridReducer, users, getXaridProductType}) => {



    const [mainBranchId,setMainBranchId] = useState(null)
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
        numberSize:40,
        yon: 20,
        top: 20
    })
    const componentRef = useRef();

    useEffect(() => {
        getXaridProductType(mainBranchId ? mainBranchId : users.branchId)
        setXaridArray([])
        setXaridArrayPost([])
        setXaridSearchValue('')
    },[mainBranchId])

    function XaridSearch(e) {
        let a = []
        setXaridSearchValue(e.target.value)
        XaridReducer.xaridMahsulot.filter(val => {
            if (e.target.value === '') {
                setXaridArray([])
            } else if(val.name === e.target.value){
                AddXaridArray(val)
            }
            else if(val.barcode === e.target.value){
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
        XaridArrayPost.map(val=>{
            if (item.productTypePriceId === null && val.productId === item.productId){
                if (item.purchaseProductId){
                    item.delete = false
                    purchase = true
                    order = true
                }
                order = true

            }
            else if(item.productId === null && val.productTypePriceId === item.productTypePriceId){
                if (item.purchaseProductId){
                    item.delete = false
                    purchase = true
                    order = true
                }
                order = true
            }
        })
        if(order === true){
            if (purchase === false){
                toast.warning('Mahsulot jadvalda bor')
            }
        }
        else{
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

    function DeleteXaridArrayPost(indx,purchasesId) {
        if (purchasesId === null){
            XaridArrayPost.map((item,index)=>{
                if (indx === index){
                    XaridArrayPost.splice(index,1)
                }
            })
        }
        else{
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
        XaridArrayPost.filter(val=>val.delete===false).map(item => {
            d += parseFloat(item.purchasedQuantity)
            c += (item.purchasedQuantity * item.buyPrice)

        })
    }

    const handlePrintCopy = useReactToPrint({
        content: () => componentRef.current,
    });

    const handlePrint = () =>{
        XaridArrayPost[0] ? handlePrintCopy() : toast.warning('Mahsulot tanlanmagan')
        setXaridArrayPost([])
        setXaridSearchValue('')
        setXaridArray([])
    }


    return(
        <div className={'xaridQilishBox'}>

            <div className={'row  mt-5 mx-5 '}>
                <div className="col-md-12 my-3">
                    <div className="offset-1 col-md-4">
                        <select name="" id="" value={mainBranchId} onChange={(e)=>setMainBranchId(e.target.value)} className={'form-control'}>
                            {
                                users.branches.map(item=>
                                    <option value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>

                </div>
                <h5 className={'text-center mt-3'}>SHTRIXCODE CHIQARISH</h5>
                <div className={'col-md-10 mt-4 mb-5 offset-1'}>
                    <div className="row">
                        <div className="col-md-12">
                            <input type="text"
                                   value={XaridSearchValue} onChange={XaridSearch}
                                   className={'form-control'}
                                   placeholder={'Mahsulot shtrix kodi yoki nomi'}/>
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
                            <div><p style={{color: "red", textAlign: 'center', marginTop: '4px'}}>Mahsulot nomi
                                        yoki shtrix kodini kiriting </p></div>
                            <div className="table-responsive">
                                <table className={'table mt-3 border'}>
                                    <thead style={{textAlign: 'center'}}>
                                    <tr>
                                        <th>Mahsulot nomi</th>
                                        <th>BarCode</th>
                                        <th>Soni</th>
                                        <th>x</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {
                                        XaridArrayPost.filter(val=>val.delete === false).map((item, index) =>
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
                                                               type="number"/>
                                                    </div>
                                                </td>
                                                <td className={'text-danger'}><ImCancelCircle
                                                    onClick={() => DeleteXaridArrayPost(index,item.purchaseProductId
                                                        ? item.purchaseProductId : null)}
                                                    style={{width: '30px', height: '30px'}}/></td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div style={{display:'flex', justifyContent:'end', marginTop: 10}}><button className={'btn btn-primary'} onClick={handlePrint} >Chop Etish</button></div>
                        </div>
                    </div>
                    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
                        <div>
                            <label className='font-w600' htmlFor='grid'>Qatorlar soni: </label>
                            <input className='form-control' min='1' type='number' value={shtrixData.grid}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,grid: e.target.value}))}
                                   placeholder='Qatorlar soni' name='grid' id='grid' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='barcodeWidth'>Barcode eni: </label>
                            <input className='form-control' min='1' max='8' type='number' value={shtrixData.barcodeWIdth}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,barcodeWIdth: e.target.value}))}
                                   placeholder='Barcode eni' name='barcodeWidth' id='barcodeWidth' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='barcodeHeight'>Barcode bo'yi: </label>
                            <input className='form-control' min='1' type='number' value={shtrixData.barcodeHeight}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,barcodeHeight: e.target.value}))}
                                   placeholder="Barcode bo'yi" name='barcodeHeight' id='barcodeHeight' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='textHeight'>Text o'lchami: </label>
                            <input className='form-control' min='1' type='number' value={shtrixData.textHeight}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,textHeight: e.target.value}))}
                                   placeholder="Text o'lchami" name='textHeight' id='textHeight' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='numberSize'>Nomer o'lchami: </label>
                            <input className='form-control' min='1' type='number' value={shtrixData.numberSize}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,numberSize: e.target.value}))}
                                   placeholder="Nomer o'lchami" name='numberSize' id='numberSize' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='rowGap'>Qatorlar orasidagi masofa: </label>
                            <input className='form-control' min='0' type='number' value={shtrixData.rowGap}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,rowGap: e.target.value}))}
                                   placeholder="Qatorlar orasidagi masofa" name='rowGap' id='rowGap' />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='columnGap'>Ustunlar orasidagi masofa: </label>
                            <input className='form-control' min='0' type='number' value={shtrixData.columnGap}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,columnGap: e.target.value}))}
                                   placeholder="Ustunlar orasidagi masofa" name='columnGap' id='columnGap'
                                   disabled={shtrixData.grid <= 1}
                            />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='yon'>Ikki yondagi masofa: </label>
                            <input className='form-control' min='0' type='number' value={shtrixData.yon}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,yon: e.target.value}))}
                                   placeholder="Ikki yondagi masofa" name='yon' id='yon'
                            />
                        </div>
                        <div>
                            <label className='font-w600' htmlFor='top'>Tepadan qoladigan masofa: </label>
                            <input className='form-control' min='0' type='number' value={shtrixData.top}
                                   onChange={(e) => setShtrixData((prev) => ({...prev,top: e.target.value}))}
                                   placeholder="Tepadan qoladigan masofa" name='top' id='top'
                            />
                        </div>
                    </div>
                    <div style={{margin: `${shtrixData.top}px ${shtrixData.yon}px 0`}} ref={componentRef}>
                        <div className="row" style={{display: 'grid', gridTemplateColumns: `repeat(${shtrixData.grid}, 1fr)`,
                            rowGap: `${shtrixData.rowGap}px`, columnGap: `${shtrixData.columnGap}px`}}>
                            {
                                XaridArrayPost.map((item) => {
                                    let array = [];
                                    let i = 0;
                                      while(i<item.purchasedQuantity){
                                          i++;
                                          array = [...array, <div className="text-center">
                                              <p style={{marginBottom:-10, position:'relative', zIndex: 4, fontWeight: 600, fontSize: `${shtrixData.textHeight}px` , fontFamily: "monospace"}}>{item.name}</p>
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

export default connect((users,XaridReducer),
    {
        getXaridProductType
    }) (ShtrixCode)