import './third.css'
import {Link, useHistory, useLocation} from 'react-router-dom'
import React, {useEffect} from 'react';
import {useState} from "react";
import {connect} from "react-redux";
import users, {savdooynasi} from "../../../reducer/users";
import functionreducer, {active, activSavdo} from "../../../reducer/functionreducer";
import {useTranslation} from "react-i18next";
import arrowDown from '../../../img/direction-down 01.svg'
import Home from "../../../dashboard/jsx/components/Dashboard/Home";
import 'swiper/css';
import infoReducer,
{getInfoBalanceByBranch, getInfoBalanceByBusiness, getInfoByBranch, getInfoByBusiness, getInfo}
    from "../../../reducer/infoReducer";
import 'moment/locale/uz-latn'
import {DatePicker, Space, Select, Image, Segmented} from 'antd';
import Card from "./Card/Card";
import kassa from '../../../img/money bag coin.svg'
import savdo from '../../../img/shopping basket check.svg'
import savdotolov from '../../../img/wallet check.svg'
import savdoqarz from '../../../img/wallet minus.svg'
import foyda from '../../../img/gold.svg'
import xarid from '../../../img/cart check.svg'
import xaridtolov from '../../../img/money check.svg'
import xaridqarz from '../../../img/money minus.svg'
import mijozolsum from '../../../img/money user.svg'
import mijozbersum from '../../../img/moeny bag.svg'
import dillerbersum from '../../../img/card-withdraw.svg'
import xarajat from '../../../img/pie chartcard.svg'
import calendar from '../../../img/calendar.svg'
import dayjs from "dayjs";
import {MinusOutlined} from "@ant-design/icons";
import ProgressCard from "./Progress/ProgressCard";
import TopTrader from "./TopTrader/TopTrader";
import MainHeaderText from "../../Components/MainHeaderText";

const {RangePicker} = DatePicker;

function Third({
                   display,
                   users,
                   getPay,
                   getInfo,
                   savdooynasi,
                   activSavdo,
                   infoReducer,
                   getInfoBalanceByBranch, getInfoBalanceByBusiness,
                   getInfoByBranch, getInfoByBusiness,
               }) {
    const location = useLocation()
    const history = useHistory()
    const {t} = useTranslation()
    const [mainBranchId, setMainBranch] = useState(null)
    const [currentDay, setCurrentDay] = useState('day')
    const [date, setDate] = useState([])

    const filialSelect = users.getInfoAdmin ? [{value: '', label: t('mainPage.allBranch')},
            ...users.branches?.map((item) => ({value: item.id, label: item.name}))] :
        users.branches?.map((item) => ({value: item.id, label: item.name}))

    useEffect(() => {
        getInfo()

    }, [])



    const {
        balance,
        branchAmount,
        employeeAmount,
        endDay,
        name,
        priceMoth,
        startDay,
        tariffShortDto,
        userShortDto
    } = infoReducer.infoForBusiness


    const listDay = [
        {value: 'week', label: t('mainPage.week')},
        {value: 'month', label: t('mainPage.month')},
        {value: 'year', label: t('mainPage.thisYear')},
    ]


    const {
        fromCustomer,
        outlay,
        profit,
        purchase,
        purchaseDebt,
        purchasePaid,
        toCustomer,
        toSupplier,
        trade,
        tradeDebt,
        tradePaid
    } = infoReducer.infoObject
    const {
        fromCustomerPercent,
        outlayPercent,
        profitPercent,
        purchasePercent,
        purchaseDebtPercent,
        purchasePaidPercent,
        toCustomerPercent,
        toSupplierPercent,
        tradePercent,
        tradeDebtPercent,
        tradePaidPercent
    } = infoReducer.infoObjectPercent

    const cards = [
        {
            title: t('mainPage.balance'),
            sum: infoReducer?.infoObject?.balance,
            percent: infoReducer?.infoObjectPercent?.balancePercent,
            img: kassa
        },
        {title: t('mainPage.trade'), sum: trade, percent: tradePercent, img: savdo},
        {title: t('mainPage.payInTrade'), sum: tradePaid, percent: tradePaidPercent, img: savdotolov},
        {title: t('mainPage.debtInTrade'), sum: tradeDebt, percent: tradeDebtPercent, img: savdoqarz},
        {title: t('mainPage.profit'), sum: profit, percent: profitPercent, img: foyda},
        {title: t('mainPage.purchase'), sum: purchase, percent: purchasePercent, img: xarid},
        {title:t('mainPage.payInPurchase'), sum: purchasePaid, percent: purchasePaidPercent, img: xaridtolov},
        {title: t('mainPage.debtInPurchase'), sum: purchaseDebt, percent: purchaseDebtPercent, img: xaridqarz},
        {title: t('mainPage.getSumByCustomer'), sum: fromCustomer, percent: fromCustomerPercent, img: mijozolsum},
        {title: t('mainPage.setSumByCustomer'), sum: toCustomer, percent: toCustomerPercent, img: mijozbersum},
        {title: t('mainPage.setSumToSupplier'), sum: toSupplier, percent: toSupplierPercent, img: dillerbersum},
        {title: t('mainPage.outlay'), sum: outlay, percent: outlayPercent, img: xarajat},
    ]


    console.log(cards)

    function Dates(name) {
        setCurrentDay(name)
        setDate([])
    }

    function branchonchange(e) {
        if (e === '') {
            setMainBranch(null)
        } else {
            setMainBranch(e)
        }
    }


    useEffect(() => {
        let a = []
        date?.map(item => {
            a.push((dayjs(item).format('YYYY-MM-DD')))
        })
        if (users.getInfoAdmin && !mainBranchId) {
            getInfoByBusiness({
                businessId: users.businessId,
                params: {
                    time: currentDay,
                    start: a.length === 0 ? null : a[0],
                    end: a.length === 0 ? null : a[1]
                }
            })
        } else if (users.getInfo) {
            getInfoByBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    time: currentDay,
                    start: a.length === 0 ? null : a[0],
                    end: a.length === 0 ? null : a[1]
                }
            })
        }
    }, [mainBranchId, currentDay, date])

    useEffect(() => {
        if (users.getInfoAdmin && !mainBranchId) {
            getInfoBalanceByBusiness(users.businessId)
        } else if (users.getInfo) {
            getInfoBalanceByBranch(mainBranchId ? mainBranchId : users.branchId)
        }
    }, [mainBranchId])

    return (
        <section className={'dashboard'}>
            <div className={'dashboard-header'}>
                <div className={'d-flex col-md-12 gap-2 gap-lg-0 flex-wrap align-items-end justify-content-between'}>
                    <div className={'col-12 col-md-3'}>
                        <MainHeaderText text={t('mainPage.mainPage')}/>
                    </div>
                    <div
                        className={'col-12 p-0 col-sm-12 col-md-12 col-lg-9 d-flex flex-wrap gap-2 gap-md-3 justify-content-center justify-content-lg-end  p-0   align-items-center'}>
                        <Segmented options={listDay} value={currentDay} onChange={(e) => Dates(e)}/>
                        <div className={'dashboard-datepicker'}>
                            <Space direction="vertical"  color={'#071A33'} size={0}>
                                <RangePicker
                                    format={'D MMM YYYY'}
                                    value={date}
                                    style={{width: '250px'}}
                                    suffixIcon={<Image preview={false} src={calendar}/>}
                                    separator={<MinusOutlined/>}
                                    placeholder={[t('mainPage.startDate'), t('mainPage.endDate')]}
                                    onChange={(e) => {
                                        if (e) {
                                            setDate(e)
                                            setCurrentDay(null)
                                        } else {
                                            setDate(e)
                                            setCurrentDay('day')
                                        }

                                    }} bordered={false}/>
                            </Space>
                        </div>
                        <Select
                            suffixIcon={<Image preview={false} src={arrowDown}/>}
                            className={'dashboard-select'}
                            style={{width: 160, height: 44}}
                            defaultValue={filialSelect[0]}
                            onChange={branchonchange}
                            options={filialSelect}
                        />
                        <button value={'day'}
                                className={`dashboard-day-button ${currentDay === 'day' ? 'dashboard-day-button-active' : ''}`}
                                onClick={(e) => Dates(e.target.value)}>{t('mainPage.thisDay')}
                        </button>
                    </div>
                </div>
            </div>

            {
                users.getInfo || users.getInfoAdmin ?
                    <div className={'dashboard-cards'}>
                        {
                            cards.map(item =>
                                <Card title={item.title} img={item.img} percent={item.percent} sum={item.sum}/>
                            )
                        }

                    </div>
                    : ''
            }
            <div className={'dashboard-footer'}>
                <div className="dashboard-footer-trader">
                    <TopTrader/>
                </div>
                <div className="dashboard-footer-progress">
                    <ProgressCard/>
                </div>
            </div>
            {/*<Grid container spacing={2}>*/}
            {/*    <Grid item xs={6} md={6}>*/}
            {/*        <Card style={{height: "220px"}}*/}
            {/*              sx={{*/}
            {/*                  px: 2,*/}
            {/*                  pb: 2,*/}
            {/*                  pt: 2,*/}
            {/*                  background: `${theme.colors.gradients.green2}`,*/}
            {/*              }}*/}
            {/*        >*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(18)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    <p className={'p-0 m-0'}> Biznes nomi: {name}</p>*/}
            {/*                    <p className={'p-0 m-0'}>Biznes egasi: {userShortDto?.fio}</p>*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Telefon raqami: {userShortDto?.phoneNumber}*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Hozirgi hisobdagi pul: {balance} (tariff uchun to'lanadigan)*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    <div className={'d-flex gap-2'}>*/}
            {/*                        <p className={'m-0 p-0'}> Ishchilar soni: {employeeAmount} ,*/}
            {/*                        </p>*/}
            {/*                        <p className={'m-0 p-0'}> Filiallar soni: {branchAmount}*/}
            {/*                        </p>*/}
            {/*                    </div>*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Keyin oy uchun to'lov: {priceMoth} so'm*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Boshlangan sanasi: {moment(new Date(startDay)).format('LL')}*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Tugash sanasi: {moment(new Date(endDay)).format('LL')}*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*        </Card>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6} md={6}>*/}
            {/*        <Card style={{height: "220px"}}*/}
            {/*              sx={{*/}
            {/*                  px: 2,*/}
            {/*                  pb: 1,*/}
            {/*                  pt: 2,*/}
            {/*                  background: `${theme.colors.gradients.blue2}`,*/}
            {/*              }}*/}
            {/*        >*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(18)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    <p className={'p-0 m-0'}> Tariff nomi: {tariffShortDto?.name}</p>*/}
            {/*                    <p className={'p-0 m-0'}>Tariff narxi: {tariffShortDto?.price} so'm</p>*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Filialar*/}
            {/*                    soni: {tariffShortDto?.branchAmount === 0 ? 'cheksiz' : tariffShortDto?.branchAmount}*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Xodimlar*/}
            {/*                    soni: {tariffShortDto?.employeeAmount === 0 ? 'cheksiz' : tariffShortDto?.employeeAmount}                            </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Oylik to'lovi: {priceMoth} so'm*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*            <Box display="flex" alignItems="center">*/}
            {/*                <Typography*/}
            {/*                    sx={{*/}
            {/*                        ml: 1.5,*/}
            {/*                        fontSize: `${theme.typography.pxToRem(16)}`,*/}
            {/*                        color: `${theme.colors.alpha.trueWhite[100]}`,*/}
            {/*                        fontWeight: 'bold'*/}
            {/*                    }}*/}
            {/*                    variant="subtitle2"*/}
            {/*                    component="div"*/}
            {/*                >*/}
            {/*                    Tavsifi: {tariffShortDto?.description}*/}
            {/*                </Typography>*/}
            {/*            </Box>*/}
            {/*        </Card>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}

        </section>
    );
}


export default connect((users, functionreducer, infoReducer),
    {
        savdooynasi,
        active,
        activSavdo, getInfo,
        getInfoBalanceByBranch, getInfoBalanceByBusiness,
        getInfoByBranch, getInfoByBusiness
    })(Third);
