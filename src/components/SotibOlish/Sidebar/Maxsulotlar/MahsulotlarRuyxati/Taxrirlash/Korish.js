import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {connect} from "react-redux";
import MaxsulotlarRoyxariReducer, {getMaxsulotByIdView} from "../../reducer/MaxsulotlarRoyxariReducer";
import MaxsulotxisobotReducer, {
    getProductHistoryByProductByBusiness,
    getProductHistoryByProductByBranch
} from "../../../Xisobotlar/reducer/MaxsulotxisobotReducer";
import users from "../../../../../../reducer/users";
import FirmaReducer, {getFirma} from "../../reducer/FirmaReducer";
import {useTranslation} from "react-i18next";
import "./korish.css"
import {useEffect, useState} from "react";
import TarixiM from "../maxsulotdizayn/TarixiM";
import ProductImagePercent from "../maxsulotdizayn/ProductImagePercent";

function Korish({
                    active,
                    toggle,
                    MaxsulotlarRoyxariReducer,
                    getMaxsulotByIdView,
                    productId,
                    id,
                    users,
                    getProductHistoryByProductByBusiness,
                    getProductHistoryByProductByBranch
                }) {

    const {t} = useTranslation()

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [loading, setLoading] = useState(false)

    const handleChangePage = (newPage) => {
        setPage(newPage - 1);
    };
    const handleChangeRowsPerPage = (event, size) => {
        setPage(0)
        setSize(size);
    };

    console.log(id)

    useEffect(() => {
        if (users.getProductAdmin && !id) {
            getMaxsulotByIdView({
                productId: productId,
                id: users.businessId
            })
        } else {
            getMaxsulotByIdView({
                productId,
                id: id ? id : users.branchId
            })
        }
    }, [productId])

    useEffect(() => {
        if (users.getProductAdmin && !id) {
            getProductHistoryByProductByBusiness({
                productId,
                params: {
                    page, size,
                }
            })
        } else {
            getProductHistoryByProductByBranch({
                branchId: id ? id : users.branchId,
                params: {
                    page, size, productId
                }
            })
        }
    }, [productId, size, page])

    useEffect(() => {
        setLoading(true)
    }, [MaxsulotlarRoyxariReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <Modal isOpen={active} toggle={toggle} size={'xl'} style={{borderRadius: '20px'}}>
            <ModalBody style={{padding: '0', backgroundColor: '#F8F8F8'}}>
                <ProductImagePercent/>
                <TarixiM page={page} size={size} changeRow={handleChangeRowsPerPage} loading={loading}
                         changePage={handleChangePage}/>
            </ModalBody>
            <ModalFooter className={'bg-white border-0 rounded-top-4'}>
                <div>
                    <button className={'btn btn-primary'} onClick={toggle}>{t('Buttons.7')}</button>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer, MaxsulotxisobotReducer), {
    getFirma, getMaxsulotByIdView, getProductHistoryByProductByBusiness, getProductHistoryByProductByBranch
})(Korish)
