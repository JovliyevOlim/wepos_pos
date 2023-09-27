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
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default connect((users, infoReducer), {})(Home)
