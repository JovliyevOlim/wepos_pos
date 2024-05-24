import React, {useState} from 'react';
import MainHeaderText from "../../../../Components/MainHeaderText";
import TradeReportByProduct from "./TradeReportByProduct";
import {Segmented} from 'antd';
import {LuBox} from "react-icons/lu";
import {TbFileInvoice} from "react-icons/tb";
import TradeReportAll from "./TradeReportAll";
import {useTranslation} from "react-i18next";

function TradeReport(props) {

    const {t} = useTranslation()
    const [changePage, setChangePage] = useState(false)

    return (
        <div>
            <div className="col-md-12 d-block d-sm-flex justify-content-between align-items-center mb-3">
                <div className="col-12 col-sm-6 text-center text-sm-start">
                    <MainHeaderText text={`${t('sidebar.trades')}  (${changePage ? "Mahsulot" : "Chek"})`}/>
                </div>
                <div className="col-12 col-sm-6  d-flex justify-content-center justify-content-sm-end mt-2 mt-md-0">
                    <Segmented value={changePage} onChange={(e) => setChangePage(e)}
                               options={[
                                   {
                                       label: 'Check',
                                       value: false,
                                       icon: <TbFileInvoice fontSize={18}/>,
                                   },
                                   {
                                       label: 'Mahsulot',
                                       value: true,
                                       icon: <LuBox fontSize={18}/>,
                                   },
                               ]}
                    />
                </div>
            </div>
            <div>
                {
                    changePage ?
                        <TradeReportByProduct/> : <TradeReportAll/>
                }
            </div>
        </div>
    );
}

export default TradeReport;