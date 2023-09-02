import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";


import DonutChart from './Dashboard/DonutChart';
import {connect} from "react-redux";
import users from "../../../../reducer/users";

import formatDate from "../../../../util";
import {t} from "i18next";
import {Grid, useTheme} from "@mui/material";
import Chart from "react-apexcharts";
import Block8 from "./chartlar/Block8";
import Investments from "./chartlar/Investments";
import Block9 from "./chartlar/Block9";
import Block3 from "./chartlar/Block3";
import {useMediaQuery} from 'react-responsive'
import infoReducer from "../../../../reducer/infoReducer";


const TotalInvoices = loadable(() =>
    pMinDelay(import("./Dashboard/TotalInvoices"), 1000)
);
const Paidinvoices = loadable(() =>
    pMinDelay(import("./Dashboard/Paidinvoices"), 1000)
);
const Unpaidinvoices = loadable(() =>
    pMinDelay(import("./Dashboard/Unpaidinvoices"), 1000)
);
const Totalinvoicessent = loadable(() =>
    pMinDelay(import("./Dashboard/Totalinvoicessent"), 1000)
);
const ChartBarApex = loadable(() =>
    pMinDelay(import("./Dashboard/ChartBarApex"), 1000)
);


function Home({
                  users, mainBranchId, infoReducer
              }) {


    const {balance, total} = infoReducer?.infoBalance

    const theme = useTheme();
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
    })

    return (
        <>
            <div className="row p-2">
                <div style={{paddingTop: "20px" }}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={4}
                    >
                        <Grid item md={5} xs={12}>
                            <Block8 mainBranchId={mainBranchId}/>
                        </Grid>
                        <Grid item md={7} xs={12}>
                            <div className="col-xl-12 col-sm-12 m-0">
                                <div className="row p-0">
                                    <div className="col-xl-12 p-0">
                                        <div className="card m-0 p-0 border-radius overflow-hidden">
                                            <div className="card-body p-0 colorback">
                                                <div className="row">
                                                    <div className="col-sm-4 col-md-4 col-xl-4 col-xxl-4">
                                                        <h4 className="fs-20 text-black mb-4 font-w700">{t('BOSH.tolovlar')} </h4>
                                                        <div className="row flex-column">
                                                            <div className="d-flex col-xl-12 col-xxl-12 col-md-12 col-sm-12 mb-4">
                                                                <svg className="me-3" width="14" height="54"
                                                                     viewBox="0 0 14 54"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="-6.10352e-05" width="14" height="54"
                                                                          rx="7"
                                                                          fill="#AC39D4"/>
                                                                </svg>
                                                                <div>
                                                                    <p className="fs-14 mb-2">{t('BOSH.plastik')}</p>
                                                                    <span
                                                                        className="fs-16 p-0 m-0 font-w600 text-gray"><span
                                                                        className="text-black p-0 m-0 font-w700">{balance?.PLASTIK} UZS</span></span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex col-xl-12 col-xxl-12 col-md-12 col-sm-12 mb-4">
                                                                <svg className="me-3" width="14" height="54"
                                                                     viewBox="0 0 14 54"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="-6.10352e-05" width="14" height="54"
                                                                          rx="7"
                                                                          fill="#40D4A8"/>
                                                                </svg>
                                                                <div>
                                                                    <p className="fs-14 mb-2">{t('BOSH.naqd')}</p>
                                                                    <span
                                                                        className="fs-16 font-w600 text-light"><span
                                                                        className="text-black me-2 font-w700">{balance?.NAQD} UZS</span></span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex col-xl-12 col-xxl-12 col-md-12 col-sm-12 mb-4">
                                                                <svg className="me-3" width="14" height="54"
                                                                     viewBox="0 0 14 54"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="-6.10352e-05" width="14" height="54"
                                                                          rx="7"
                                                                          fill="#1EB6E7"/>
                                                                </svg>
                                                                <div>
                                                                    <p className="fs-14 mb-2">{t('BOSH.bank')}</p>
                                                                    <span
                                                                        className="fs-16 font-w600 text-light"><span
                                                                        className="text-black me-2 font-w700">{balance?.BANK_ORQALI} UZS</span></span>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex col-xl-12 col-xxl-12 col-md-12 col-sm-12 mb-4">
                                                                <svg className="me-3" width="14" height="54"
                                                                     viewBox="0 0 14 54"
                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <rect x="-6.10352e-05" width="14" height="54"
                                                                          rx="7"
                                                                          fill="#461EE7"/>
                                                                </svg>
                                                                <div>
                                                                    <p className="fs-14 mb-2">Jami</p>
                                                                    <span
                                                                        className="fs-16 font-w600 text-light"><span
                                                                        className="text-black me-2 font-w700">{total} UZS</span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-md-8 col-xl-8 col-xxl-8">
                                                        <div className="row p-0">
                                                            <div className="col-sm-12   col-md-6 mb-4">
                                                                <div
                                                                    className="bg-gradient1 border-radius text-center p-3">
                                                                    <div
                                                                        className="d-inline-block position-relative donut-chart-sale mb-3">
                                                                        <DonutChart
                                                                            value={parseFloat(balance?.PLASTIK / total * 100).toFixed(2)}
                                                                            backgroundColor="rgba(255, 255, 255,1)"
                                                                            backgroundColor2="rgba(255, 255, 255, 0.2)"
                                                                        />
                                                                        <small
                                                                            className="text-white"
                                                                            style={{fontSize: '12px'}}>{parseFloat(balance?.PLASTIK / total * 100).toFixed(2)} %</small>
                                                                    </div>
                                                                    <span
                                                                        className="fs-14 text-white d-block">{t('BOSH.plastik')}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12 col-md-6 mb-4">
                                                                <div
                                                                    className="bg-gradient2  border-radius  text-center p-3">
                                                                    <div
                                                                        className="d-inline-block position-relative donut-chart-sale mb-3">
                                                                        <DonutChart
                                                                            value={parseFloat(balance?.NAQD / total * 100).toFixed(2)}
                                                                            backgroundColor="rgba(255, 255, 255,1)"
                                                                            backgroundColor2="rgba(255, 255, 255, 0.2)"
                                                                        />
                                                                        <small
                                                                            className="text-white"
                                                                            style={{fontSize: '14px'}}>{parseFloat(balance?.NAQD / total * 100).toFixed(2)} %</small>
                                                                    </div>
                                                                    <span
                                                                        className="fs-14 text-white d-block">{t('BOSH.naqd')}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12  col-md-6 mb-4">
                                                                <div
                                                                    className="border-radius text-center p-3 bg-gradient3">
                                                                    <div
                                                                        className="d-inline-block position-relative donut-chart-sale mb-3">
                                                                        <DonutChart
                                                                            value={parseFloat(balance?.BANK_ORQALI / total * 100).toFixed(2)}
                                                                            backgroundColor="rgba(255, 255, 255,1)"
                                                                            backgroundColor2="rgba(255, 255, 255, 0.2)"
                                                                        />
                                                                        <small
                                                                            className="text-white"
                                                                            style={{fontSize: '14px'}}>{parseFloat(balance?.BANK_ORQALI / total * 100).toFixed(2)} %</small>
                                                                    </div>
                                                                    <span
                                                                        className="fs-14 text-white d-block">{t('BOSH.bank')}</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12  col-md-6 mb-4">
                                                                <div
                                                                    className="border-radius  text-center p-3 bg-gradient4">
                                                                    <div
                                                                        className="d-inline-block position-relative donut-chart-sale mb-3">
                                                                        <DonutChart value="100"
                                                                                    backgroundColor="rgba(255, 255, 255,1)"
                                                                                    backgroundColor2="rgba(255, 255, 255, 0.2)"
                                                                        />
                                                                        <small
                                                                            className="text-white">100 %</small>
                                                                    </div>
                                                                    <span
                                                                        className="fs-14 text-white d-block">{t('BOSH.qarz')}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default connect((users, infoReducer), {})(Home)
