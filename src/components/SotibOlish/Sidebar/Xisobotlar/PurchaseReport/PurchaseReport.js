import React, {useState} from 'react';
import MainHeaderText from "../../../../Components/MainHeaderText";
import {Segmented} from 'antd';
import {LuBox} from "react-icons/lu";
import {TbFileInvoice, TbTruckDelivery} from "react-icons/tb";
import {useTranslation} from "react-i18next";
import PurchaseReportByProduct from "./PurchaseReportByProduct";
import PurchaseReportAll from "./PurchaseReportAll";
import SupplierReport from "./SupplierReport";

function PurchaseReport(props) {

    const {t} = useTranslation()
    const [changePage, setChangePage] = useState(1)

    return (
        <div>
            <div className="col-md-12 d-block d-md-flex  justify-content-between align-items-center mb-3">
                <div className="col-12 col-md-6 text-center text-md-start">
                    <MainHeaderText text={`${t('sidebar.purchases')}  (${changePage === 2 ? "Mahsulot" : changePage === 1 ?  "Chek" : "Ta'minotchi"})`}/>
                </div>
                <div className="col-12 col-md-6  d-flex justify-content-center justify-content-md-end mt-2 mt-md-0">
                    <Segmented value={changePage} onChange={(e) => setChangePage(e)}
                               options={[
                                   {
                                       label: 'Check',
                                       value: 1,
                                       icon: <TbFileInvoice fontSize={18}/>,
                                   },
                                   {
                                       label: 'Mahsulot',
                                       value: 2,
                                       icon: <LuBox fontSize={18}/>,
                                   },
                                   {
                                       label: "Ta'miotchi",
                                       value: 3,
                                       icon: <TbTruckDelivery fontSize={18}/>,
                                   },
                               ]}
                    />
                </div>
            </div>
            <div>
                {
                    changePage === 2 ?
                        <PurchaseReportByProduct/> : changePage === 1 ? <PurchaseReportAll/> : <SupplierReport/>
                }
            </div>
        </div>
    );
}

export default PurchaseReport;