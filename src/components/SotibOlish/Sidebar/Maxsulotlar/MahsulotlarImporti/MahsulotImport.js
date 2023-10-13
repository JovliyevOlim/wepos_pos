import {useEffect, useState} from "react";
import './mahsulotimporti.css'
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import MaxsulotlarRoyxariReducer, {saveProductByExcelFile} from "../reducer/MaxsulotlarRoyxariReducer";
import Example from "../../../../../file/shablonProducts.xlsx"
import ModalLoading from "../../../../ModalLoading";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";
import CardBody from "../../../../Components/CardBody";
import MainHeaderText from "../../../../Components/MainHeaderText";
import SelectAnt, {ButtonAnt} from "../../../../Components/SelectAnt";
import {CloudDownloadOutlined, UploadOutlined} from "@ant-design/icons";
import {Upload} from "antd";
import {useTranslation} from "react-i18next";


function MahsulotImport({users, saveProductByExcelFile, MaxsulotlarRoyxariReducer}) {


    const [branch, setbranch] = useState('')
    const [saveBoolean, setSaveBoolean] = useState(false)
    const [file, setfile] = useState(null)
    const history = useHistory()
    const {t} = useTranslation()





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
                toast.warning(t('as.11'))
            }
        } else {
            toast.warning(t('as.12'))
        }

    }

    useEffect(()=>{
        if (MaxsulotlarRoyxariReducer.saveBoolean){
            history.push('/main/productList')
        }
    },[MaxsulotlarRoyxariReducer.current])


    return (
        <div>
            <div className="d-flex flex-wrap justify-content-between align-items-end">
                <MainHeaderText text={t('as.13')}/>
                <a href={Example} download style={{marginTop:'20px'}}>
                    <ButtonAnt type={'primary'} text={t('button.getShablon')} icon={<CloudDownloadOutlined className={'excel-import-icon'}/>}/>
                </a>
            </div>
            <CardBody>
                <div className="col-md-12 mb-4 gap-2 gap-sm-0 d-flex flex-wrap align-items-end ">
                    <div className="col-12 col-sm-6  p-sm-2 col-md-6 col-lg-4">
                        <SelectAnt name={t('ol.3')} all={t('ol.49')} permission={true} selectList={users.branches} onChange={(e) => setbranch(e === '' ? null : e)} />
                    </div>
                    <div className="col-12 col-sm-6 p-sm-2  col-md-6">
                            <Upload
                                customRequest={async (options) => {
                                    const { onSuccess, file } = options;
                                    setfile(file)
                                    onSuccess(file);
                                }}
                                style={{width: '100%'}}
                                defaultFileList={file}
                                onRemove={()=>setfile([])}
                                listType="name"
                                maxCount={1}
                            >
                                <ButtonAnt icon={<UploadOutlined/>} type={'primary'} text={t('button.selectFile')}/>
                            </Upload>
                    </div>
                </div>
                <div className="col-md-12 d-flex align-items-center justify-content-end">
                    <div className="col-md-3 d-flex align-items-center justify-content-end">
                        <ButtonAnt type={'primary'} bgColor={'green'} text={t('button.save')} onClick={saveProductByExcel}/>
                    </div>
                </div>
            </CardBody>
            <ModalLoading isOpen={saveBoolean} toggle={() => setSaveBoolean(prev => !prev)}/>
        </div>
    );
}

export default connect((users, MaxsulotlarRoyxariReducer),
    {saveProductByExcelFile})(MahsulotImport)