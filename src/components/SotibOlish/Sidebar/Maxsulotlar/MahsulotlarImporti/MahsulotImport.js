import {useEffect, useState} from "react";
import './mahsulotimporti.css'
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import MaxsulotlarRoyxariReducer, {saveProductByExcelFile} from "../reducer/MaxsulotlarRoyxariReducer";
import Example from "../../../../../file/shablonProducts.xlsx"
import img from '../../../../../img/Jami2.svg'
import ModalLoading from "../../../../ModalLoading";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import CardBody from "../../../../Svg/CardBody";
import MainHeaderText from "../../../../Svg/MainHeaderText";
import SelectAnt, {ButtonAnt} from "../../../../Svg/SelectAnt";
import {CloudDownloadOutlined, UploadOutlined} from "@ant-design/icons";
import {Upload} from "antd";


function MahsulotImport({users, saveProductByExcelFile, MaxsulotlarRoyxariReducer}) {


    const [branch, setbranch] = useState('')
    const [saveBoolean, setSaveBoolean] = useState(false)
    const [file, setfile] = useState(null)
    const history = useHistory()





    useEffect(() => {
        if (saveBoolean) {
            setfile(null)
            setSaveBoolean(false)
        }
    }, [MaxsulotlarRoyxariReducer.current])

    function saveProductByExcel() {
        if (file) {
            if (branch) {
                const formData = new FormData();
                formData.append('file', file)
                saveProductByExcelFile({
                    file: formData,
                    branchId: branch
                })
                setSaveBoolean(true)
            } else {
                toast.warning('Filial Tanlang')
            }
        } else {
            toast.warning('Excel fayl tanlang')
        }

    }

    useEffect(()=>{
        if (MaxsulotlarRoyxariReducer.saveBoolean){
            history.push('/main/productList')
        }
    },[MaxsulotlarRoyxariReducer.current])


    return (
        <div>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <MainHeaderText text={'Mahsulotni excel orqali qo\'shish'}/>
                <a href={Example} download>
                    <ButtonAnt type={'primary'} text={' Tayyor shablonni yuklash'} icon={<CloudDownloadOutlined className={'excel-import-icon'}/>}/>
                </a>
            </div>
            <CardBody>
                <div className="col-md-12 mb-4 d-flex align-items-end ">
                    <div className="col-md-3">
                        <SelectAnt name={"Filiallar"} permission={false} selectList={users.branches} onChange={(e) => setbranch(e === '' ? null : e)} />
                    </div>
                    <div className="col-md-3">
                        <form>
                            <Upload
                                customRequest={async (options) => {
                                    const { onSuccess, file } = options;
                                    setfile(file)
                                    onSuccess(file);
                                }}
                                defaultFileList={file}
                                onRemove={()=>setfile([])}
                                listType="name"
                                maxCount={1}
                            >
                                <ButtonAnt icon={<UploadOutlined/>} type={'primary'} text={'Import qilinadigan faylni tanlang !'}/>
                            </Upload>
                        </form>
                    </div>
                </div>
                <div className="col-md-12 d-flex align-items-center justify-content-end">
                    <div className="col-md-3 d-flex align-items-center justify-content-end">
                        <ButtonAnt type={'primary'} bgColor={'green'} text={'Saqlash'} onClick={saveProductByExcel}/>
                    </div>
                </div>
            </CardBody>
            <ModalLoading isOpen={saveBoolean} toggle={() => setSaveBoolean(prev => !prev)}/>
        </div>
    );
}

export default connect((users, MaxsulotlarRoyxariReducer),
    {saveProductByExcelFile})(MahsulotImport)