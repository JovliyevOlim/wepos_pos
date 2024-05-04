import React, {Fragment} from 'react';


import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import {Space, Typography, Avatar, Tag} from 'antd';
import {FaMapLocationDot} from "react-icons/fa6";
import {TbRulerMeasure} from "react-icons/tb";
import {RiAlarmWarningFill} from "react-icons/ri";
import {SiBrandfolder} from "react-icons/si";
import {MdCategory} from "react-icons/md";
import {MdOutlineQrCodeScanner} from "react-icons/md"
import {BaseUrl} from "../../../../../../middleware";

const {Text, Title} = Typography;


function ProductSomeDetails({
                                users,
                                MaxsulotlarRoyxariReducer,
                            }) {
    const {
        barcode,
        branches,
        brandName,
        minQuantity,
        measurementName,
        categoryName
    } = MaxsulotlarRoyxariReducer.productView

    const {t} = useTranslation();

    return (
        <>
            <div className={'d-flex flex-wrap align-items-stretch'}>
                <div className={'col-12 col-sm-6 col-md-4 p-2'}>
                    <div className={'bg-white p-1 rounded-4'}>
                        <div className={'p-2'}>
                            <div className={'d-flex justify-content-between align-items-start'}>
                                <Text type={'secondary'}>
                                    {t('as.37')}
                                </Text>
                                <MdOutlineQrCodeScanner style={{fontSize: '40px', color: '#08c'}}/>
                            </div>
                            <div className={'mt-2'}>
                                <Title level={5} strong>
                                    {barcode ? barcode : '---------------'}
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-12 col-sm-6 col-md-4 p-2'}>
                    <div className={'bg-white p-1 rounded-4'}>
                        <div className={'p-2'}>
                            <div className={'d-flex justify-content-between align-items-start'}>
                                <Text type={'secondary'}>
                                    {t('as.38')}
                                </Text>
                                <MdCategory style={{fontSize: '40px', color: '#64e15b'}}/>
                            </div>
                            <div className={'mt-2'}>
                                <Title level={5} strong>
                                    {categoryName ? categoryName : '------------'}
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-12 col-sm-6 col-md-4 p-2'}>
                    <div className={'bg-white p-1 rounded-4'}>
                        <div className={'p-2'}>
                            <div className={'d-flex justify-content-between align-items-start'}>
                                <Text type={'secondary'}>
                                    {t('as.39')}
                                </Text>
                                <SiBrandfolder style={{fontSize: '40px', color: '#3fb6da'}}/>
                            </div>
                            <div className={'mt-2'}>
                                <Title level={5} strong>
                                    {brandName ? brandName : '---------------'}
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-12 col-sm-6 col-md-4 p-2'}>
                    <div className={'bg-white p-1 rounded-4'}>
                        <div className={'p-2'}>
                            <div className={'d-flex justify-content-between align-items-start'}>
                                <Text type={'secondary'}>
                                    {t('as.40')}
                                </Text>
                                <RiAlarmWarningFill style={{fontSize: '40px', color: '#e5579e'}}/>
                            </div>
                            <div className={'mt-2'}>
                                <Title level={5} strong>
                                    {minQuantity}
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-12 col-sm-6 col-md-4 p-2'}>
                    <div className={'bg-white p-1 rounded-4'}>
                        <div className={'p-2'}>
                            <div className={'d-flex justify-content-between align-items-start'}>
                                <Text type={'secondary'}>
                                    {t('as.41')}
                                </Text>
                                <TbRulerMeasure style={{fontSize: '40px', color: '#67a0d9'}}/>
                            </div>
                            <div className={'mt-2'}>
                                <Title level={5} strong>
                                    {measurementName}
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'col-12 col-sm-6 col-md-4 p-2'}>
                    <div className={'bg-white p-1 rounded-4'}>
                        <div className={'p-2'}>
                            <div className={'d-flex justify-content-between align-items-start'}>
                                <Text type={'secondary'}>
                                    {t('as.42')}
                                </Text>
                                <FaMapLocationDot style={{fontSize: '40px', color: '#58d0be'}}/>
                            </div>
                            <div className={'mt-2'}>
                                <Title level={5} strong>
                                    {
                                        branches?.map(item =>
                                            item + ','
                                        )
                                    }
                                </Title>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-12 h-100 px-2">
                <div className={'bg-white p-3 pt-2 rounded-4'}>
                    <Title level={5} className={'m-0'} strong type={'success'}>
                        {t('as.31')}
                    </Title>
                    <div
                        style={{
                            height: '350px',
                            overflow: 'auto',
                            marginTop: '5px',
                            width: '100%',
                            paddingRight: '10px'
                        }}
                        className={'scroll'}
                    >
                        <div>
                            {MaxsulotlarRoyxariReducer.productView && MaxsulotlarRoyxariReducer.productView?.productManyGetDtoList?.length > 0 ?
                                MaxsulotlarRoyxariReducer.productView?.productManyGetDtoList?.map((item) => (
                                    <Fragment key={item.id}>
                                        <div className={'d-flex align-items-center justify-content-between mt-3'}>
                                            <div
                                                className={'d-flex col-12 col-md-6 align-items-center justify-content-start gap-3'}>
                                                <div className={'border border-secondary p-1 rounded-3'}>
                                                    <Avatar shape="square" size={54}
                                                            src={`${BaseUrl}/attachment/download/${item.photoId}`}/>
                                                </div>
                                                <div>
                                                    <Title level={5} className={'m-0'}>{item?.name}</Title>
                                                    <div className={'d-flex align-items-center gap-2'}>
                                                        <Title level={5} className={'m-0'}>
                                                            {t('as.32')}
                                                        </Title>
                                                        <Tag
                                                            color={item.amount < minQuantity ? 'red' : item.amount === minQuantity ? 'orange' : 'green'}
                                                            className={'m-0'}>
                                                            {item.amount} {item.measurementName}
                                                        </Tag>
                                                    </div>
                                                    <Title level={5}
                                                           className={'mt-1 d-flex d-md-none justify-content-between gap-2'}>
                                                        {t('as.34')} <Tag
                                                        color={'#2db7f5'}
                                                        className={'m-0'}>
                                                        {item.salePrice} {t('as.21')}
                                                    </Tag>
                                                    </Title>

                                                </div>
                                            </div>
                                            <div
                                                className={'col-6 d-none  d-md-flex  align-items-center justify-content-end gap-2'}>
                                                <div className={'d-flex flex-column gap-1'}>
                                                    <Title level={5}
                                                           className={'m-0 d-flex justify-content-between gap-2'}>
                                                        {t('as.33')} <Tag
                                                        color={'#f50'}
                                                        className={'m-0'}>
                                                        {item.buyPrice} {t('as.21')}
                                                    </Tag>
                                                    </Title>
                                                    <Title level={5}
                                                           className={'m-0 d-flex justify-content-between gap-2'}>
                                                        {t('as.34')} <Tag
                                                        color={'#2db7f5'}
                                                        className={'m-0'}>
                                                        {item.salePrice} {t('as.21')}
                                                    </Tag>
                                                    </Title>
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )) : <Title type="warning" level={3}>
                                    <b>{t('as.36')}</b>
                                </Title>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default connect((users, MaxsulotlarRoyxariReducer), {})(ProductSomeDetails)
