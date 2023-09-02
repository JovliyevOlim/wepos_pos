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
import Imagecom from "../../../../../Imagecom";
import Block3 from "../maxsulotdizayn/Block3";
import {Grid} from "@mui/material";
import TarixiM from "../maxsulotdizayn/TarixiM";
import Block1 from "../maxsulotdizayn/Block1";

function Korish({active, toggle, MaxsulotlarRoyxariReducer, getMaxsulotByIdView, productId, id, users,getProductHistoryByProductByBusiness,
                    getProductHistoryByProductByBranch}) {

    const {t} = useTranslation()

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setSize(parseInt(event.target.value, 10));
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


    return (
        <Modal isOpen={active} toggle={toggle} size={'xl'}>
            <Block3/>
            <Grid container spacing={4} alignItems={'stretch'} style={{paddingTop: "20px"}}>

                <Grid item xs={12} md={12}>
                    <Block1/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TarixiM page={page} row={size} changeRow={handleChangeRowsPerPage} changePage={handleChangePage}/>
                </Grid>
            </Grid>


            <ModalFooter>
                <button className={'btn btn-primary'}>{t('ProductEdit.19')}</button>
                <button className={'btn btn-primary'} onClick={toggle}>{t('Buttons.7')}</button>
            </ModalFooter>
        </Modal>
    )
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer, MaxsulotxisobotReducer), {
    getFirma, getMaxsulotByIdView, getProductHistoryByProductByBusiness, getProductHistoryByProductByBranch
})(Korish)
