import React from "react";
import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import users from "../../../../../../reducer/users";
import FirmaReducer, {getFirma} from "../../reducer/FirmaReducer";
import {BiSolidBadgeDollar} from "react-icons/bi";
import {AiFillPieChart} from "react-icons/ai";
import {FaWarehouse} from "react-icons/fa6";
import {BiSolidPurchaseTagAlt} from "react-icons/bi";
import {HiShoppingBag} from "react-icons/hi2";
import {RiCustomerService2Fill} from "react-icons/ri";
import {LuPackageMinus} from "react-icons/lu";
import {FaCartArrowDown, FaShoppingBasket} from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import {Space, Typography, Tag} from 'antd';
import {prettify} from "../../../../../../util";
import {PiShoppingBagOpenFill} from "react-icons/pi";

const {Text, Title} = Typography;


function ProductQuantityDetails({active, toggle, MaxsulotlarRoyxariReducer}) {
    const {t} = useTranslation();
    const {measurementName} = MaxsulotlarRoyxariReducer.productView
    const {
        average,
        day,
        amount,
        tradeQuantity,
        purchaseQuantity,
        backQuantity,
        profit,
        salePrice,
        buyPrice,
        tradePrice,
        lossQuantity
    } = MaxsulotlarRoyxariReducer.productViewExtra
    return (
        <>
            <div className={'d-flex justify-content-end flex-wrap pt-3 gap-3 '}>
                <div className={'flex-grow-1 bg-white rounded-4 p-3'}>
                    <div className={'d-flex justify-content-between align-items-start'}>
                        <Text type={'secondary'} style={{fontSize: '16px'}}>
                            {t('as.28')}
                        </Text>
                        <BiSolidBadgeDollar style={{fontSize: '40px', color: '#08c'}}/>
                    </div>
                    <div className={'mt-2'}>
                        <Title level={4} strong>
                            <strong>{average} {measurementName}</strong>
                        </Title>
                    </div>
                </div>
                <div className={'flex-grow-1 bg-white rounded-4 p-3'}>
                    <div className={'d-flex justify-content-between align-items-start'}>
                        <Text type={'secondary'} style={{fontSize: '16px'}}>
                            {t('as.29')}
                        </Text>
                        <AiFillPieChart style={{fontSize: '40px', color: '#05B06C'}}/>
                    </div>
                    <div className={'mt-2'}>
                        <Title level={4} strong>
                            <strong>{day} {t('as.30')}</strong> </Title>
                    </div>
                </div>
                <div className={'flex-grow-1 bg-white rounded-4 p-3'}>
                    <div className={'d-flex justify-content-between align-items-start'}>
                        <Text type={'secondary'} style={{fontSize: '16px'}}>
                            {t('as.16')}                        </Text>
                        <FaWarehouse style={{fontSize: '40px', color: '#FF851F'}}/>
                    </div>
                    <div className={'mt-2'}>
                        <Title level={4} strong>
                            <strong>{amount} {measurementName}</strong>
                        </Title>
                    </div>
                </div>
                <div className={'flex-grow-1 bg-white rounded-4 p-3'}>
                    <div className={'d-flex justify-content-between align-items-start'}>
                        <Text type={'secondary'} style={{fontSize: '16px'}}>
                            {t('as.17')}
                        </Text>
                        <HiShoppingBag style={{fontSize: '40px', color: '#E02323'}}/>
                    </div>
                    <div className={'mt-2'}>
                        <Title level={4} strong>
                            <strong>{tradeQuantity} {measurementName}</strong> </Title>
                    </div>
                </div>
                <div className={'flex-grow-1 bg-white rounded-4 p-3'}>
                    <div className={'d-flex justify-content-between align-items-start'}>
                        <Text type={'secondary'} style={{fontSize: '16px'}}>
                            {t('as.18')}
                        </Text>
                        <BiSolidPurchaseTagAlt style={{fontSize: '40px', color: '#6bc258'}}/>
                    </div>
                    <div className={'mt-2'}>
                        <Title level={4} strong>
                            <strong>{purchaseQuantity} {measurementName}</strong>
                        </Title>
                    </div>
                </div>
                <div className={'flex-grow-1 bg-white rounded-4 p-3'}>
                    <div className={'d-flex justify-content-between align-items-start'}>
                        <Text type={'secondary'} style={{fontSize: '16px'}}>
                            {t('as.19')}
                        </Text>
                        <LuPackageMinus style={{fontSize: '40px', color: '#1bc6ea'}}/>
                    </div>
                    <div className={'mt-2'}>
                        <Title level={4} strong>
                            <strong>{lossQuantity} {measurementName}</strong> </Title>
                    </div>
                </div>
                <div className={'flex-grow-1 bg-white rounded-4 p-3'}>
                    <div className={'d-flex justify-content-between align-items-start'}>
                        <Text type={'secondary'} style={{fontSize: '16px'}}>
                            Qaytarilgan miqdor
                        </Text>
                        <RiCustomerService2Fill style={{fontSize: '40px', color: '#edc53f'}}/>
                    </div>
                    <div className={'mt-2'}>
                        <Title level={4} strong>
                            <strong>{backQuantity} {measurementName}</strong>
                        </Title>
                    </div>
                </div>
            </div>
            <div className={'d-flex bg-white flex-wrap mt-3 rounded-4 '}>
                <div className={'col-12 col-md-6 col-lg-3  d-flex justify-content-center flex-column align-items-center p-3'}>
                    <FaCartArrowDown style={{fontSize: '40px', color: '#5348D7'}}/>
                    <Title level={4} strong className={'mb-0 mt-1'}>
                        <strong>{prettify(buyPrice)} {t('as.21')}</strong>
                    </Title>
                    <Text type={'secondary'} className={'m-0 text-center'} style={{fontSize: '16px'}}>
                        {t('as.20')}
                    </Text>
                </div>
                <div className={'col-12 col-md-6 col-lg-3 d-flex justify-content-center flex-column align-items-center p-3'}>
                    <PiShoppingBagOpenFill style={{fontSize: '40px', color: '#ff851f'}}/>
                    <Title level={4} strong className={'mb-0 mt-1'}>
                        <strong>{prettify(salePrice)} {t('as.21')}</strong>
                    </Title>
                    <Text type={'secondary'} className={'m-0 text-center'} style={{fontSize: '16px'}}>
                        {t('as.22')}
                    </Text>
                </div>
                <div className={'col-12 col-md-6 col-lg-3 d-flex justify-content-center flex-column align-items-center p-3'}>
                    <FaShoppingBasket style={{fontSize: '40px', color: '#15b575'}}/>
                    <Title level={4} strong className={'mb-0 mt-1'}>
                        <strong>{prettify(tradePrice)} {t('as.21')}</strong>
                    </Title>
                    <Text type={'secondary'} className={'m-0 text-center'} style={{fontSize: '16px'}}>
                        {t('as.23')}
                    </Text>
                </div>
                <div className={'col-12 col-md-6 col-lg-3 d-flex justify-content-center flex-column align-items-center p-3'}>
                    <GiMoneyStack  style={{fontSize: '40px', color: '#377dff'}}/>
                    <Title level={4} strong className={'mb-0 mt-1'}>
                        <strong>{prettify(profit)} {t('as.21')}</strong>
                    </Title>
                    <Text type={'secondary'} className={'m-0 text-center'} style={{fontSize: '16px'}}>
                        {t('as.24')}
                    </Text>
                </div>
            </div>
        </>
    );
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer), {
    getFirma
})(ProductQuantityDetails)

