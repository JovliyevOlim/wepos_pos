import {useEffect, useState} from 'react';
import {
    Card,
    Box,
    CardContent,
    CardHeader,
    Typography,
    Button,
    Divider,
    Avatar,
    Switch,
    styled,
    useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import Chart from 'react-apexcharts';
import {Label} from "reactstrap";
import {connect} from "react-redux";
import ReportsReducer, {
    getCashKassa
} from "../../../../../components/SotibOlish/Sidebar/Xisobotlar/reducer/ReportsReducer";
import users from "../../../../../reducer/users";
import formatDate from "../../../../../util";
import CountUp from "react-countup";

const AvatarLabelInfo = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.info.lighter};
      color: ${theme.colors.info.main};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
`
);

const AvatarLabelWarning = styled(Avatar)(
    ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color: ${theme.colors.warning.main};
      width: ${theme.spacing(6)};
      height: ${theme.spacing(6)};
`
);

function Investments({users,ReportsReducer,saveBranchId,getCashKassa}) {
    const { t } = useTranslation();
    const theme = useTheme();

    const data = {
        amount: '54,348.55 so\'m',
        amountIncrease: '12,475.44 so\'m',
        amountPercent: '+ 3.24%',
        wallet: '5,348.73 so\'m',
        shares: '785.00 so\'m'
    };

    const [state, setState] = useState({
        interest: true
    });

    const interestActivate = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked
        });
    };

    const [sana, setSana] = useState([])
    const [totalTradeSum, setTotalTradeSum] = useState([])
    const [totalOutlay, setTotalOutlay] = useState([])
    const [totalCash, setTotalCash] = useState([])
    const [totalDebt, setTotalDebt] = useState([])

    useEffect(()=>{

        if (ReportsReducer.kassa){
            let timestamp = []
            let TradeSum = []
            let Outlay = []
            let Cash = []
            let Debt = []

            ReportsReducer.kassa.data.map(item=>{
                timestamp.push(item.timestamp)
                TradeSum.push(item?.totalTradeSum)
                Outlay.push(item?.totalOutlay)
                Cash.push(item?.totalCash)
                Debt.push(item?.totalDebt)
            })
            console.log(timestamp)
            setSana(timestamp)
            setTotalTradeSum(TradeSum)
            setTotalOutlay(Outlay)
            setTotalCash(Cash)
            setTotalDebt(Debt)
        }

    },[ReportsReducer.getKassaBoolean])

    const chartOptions = {
        chart: {
            background: 'transparent',
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            curve: 'smooth',
            width: [3, 3]
        },
        theme: {
            mode: theme.palette.mode
        },
        markers: {
            hover: {
                sizeOffset: 3
            },
            shape: 'circle',
            size: 6,
            strokeWidth: 3,
            strokeOpacity: 1,
            strokeColors: theme.colors.alpha.white[100],
            colors: [theme.colors.primary.main, theme.colors.error.main]
        },
        colors: [theme.colors.primary.main, theme.colors.error.main],
        labels: sana? sana.map(item=>formatDate(item)):''
        //     [
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[13].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[12].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[11].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[10].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[9].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[8].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[9].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[6].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[5].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[4].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[3].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[2].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[1].timestamp):0,
        //     ReportsReducer.kassa?formatDate(ReportsReducer.kassa.data[0].timestamp):0
        // ]
        ,
        dataLabels: {
            enabled: false
        },
        grid: {
            strokeDashArray: 5,
            borderColor: theme.palette.divider,
            padding: {
                right: 8,
                left: 8,
                bottom: 5,
                top: 5
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        }
    };

    const chartData = [
        {
            name: 'Savdo summasi',
            // data: [10000, 80000, 30000, 41000, 50000, 30000, 20000, 40000, 10000, 41000, 25000, 20000]
            data: totalTradeSum ? totalTradeSum: 0
        },
        {
            name: 'Xarajat',
            // data: [2000, 3000, 1800, 5000, 32000, 12000, 4000, 3500, 2500, 8000, 29000, 8500]
            data: totalOutlay? totalOutlay :0
        },
        {
            name: 'Kassa yopilgan summa',
            // data: [12000, 70000, 35000, 30000, 40000, 60000, 25000, 25600, 9000, 34000, 29000, 17000]
            data: totalCash? totalCash :0
        },

        {
            name: 'Tolangan nasiyalar',
            // data: [2000, 10000, 5000, 0, 10000, 30000, 0, 25600, 9000, 34000, 4000, 3000]
            data: totalDebt? totalDebt :0
        }
    ];

        console.log(saveBranchId)
    useEffect(()=>{
        getCashKassa({
            branchId: saveBranchId==='ALL' ? users.branchId:saveBranchId ,
            params:{
                businessId:saveBranchId ==='ALL' ? users.businessId:null
            }
        })
    },[saveBranchId])



    return (
        <Card>
            <CardHeader title={t('Bosh1.kunlikxisobot')} />
            <Divider />
            <CardContent
                sx={{
                    p: 4
                }}
            >
                <Box
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography>
                            Kassadagi pul
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                mb: 1
                            }}
                        >
                            {
                                // ReportsReducer.kassa?
                                    // <CountUp start={0} duration={2.75}
                                    //          end={(ReportsReducer.kassa.totalSumma).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")} />:0
                            }

                            {
                                ReportsReducer.kassa ? ReportsReducer.kassa.totalSumma.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+ ' so`m': 0
                            }
                        </Typography>
                        <Box display="flex" alignItems="left">
                            <label>
                                {t('Bosh1.unsumma')}
                            </label>

                            <Label style={{color:"#13e004"}}>{data.amountIncrease}</Label>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{
                                    ml: 1
                                }}
                            >
                                {data.amountPercent}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        display="flex"
                        alignItems="center"
                        flexWrap="wrap"
                        sx={{
                            pt: 5,
                            pb: 4
                        }}
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                mr: 5
                            }}
                        >
                            <AvatarLabelInfo
                                sx={{
                                    mr: 1
                                }}
                                variant="rounded"
                            >
                                <AttachMoneyTwoToneIcon />
                            </AvatarLabelInfo>
                            <Box>
                                <Typography variant="subtitle2" noWrap>
                                    {t('Bosh1.bfoyda')}
                                </Typography>
                                <Typography variant="h5">{
                                    ReportsReducer.kassa ? ReportsReducer.kassa?.totalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") + ' so`m': 0
                                }</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <AvatarLabelWarning
                                sx={{
                                    mr: 1
                                }}
                                variant="rounded"
                            >
                                <MonetizationOnTwoToneIcon />
                            </AvatarLabelWarning>
                            <Box>
                                <Typography variant="subtitle2" noWrap>
                                    {t('Bosh1.bxarajat')}
                                </Typography>
                                <Typography variant="h5">{
                                    ReportsReducer.kassa ? ReportsReducer.kassa?.totalOutlay.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") + ' so`m': 0
                                }</Typography>
                            </Box>
                        </Box>





                    </Box>
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="subtitle2">{t('Bosh1.kunlik')}</Typography>
                        <Switch
                            checked={state.interest}
                            onChange={interestActivate}
                            color="primary"
                            name="interest"
                        />
                    </Box>
                </Box>


                <Box
                    sx={{
                        px: 1
                    }}
                >
                    <Chart
                        options={chartOptions}
                        series={chartData}
                        type="line"
                        height={240}
                    />
                </Box>
                <Divider
                    sx={{
                        my: 3
                    }}
                />
                <Box
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    <Button size="small">{t('View all investments')}</Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default connect((ReportsReducer,users),{getCashKassa}) (Investments);
