import React, {useEffect, useState} from 'react';
import './topTrader.css'
import {Avatar, DatePicker} from 'antd';
import {connect} from "react-redux";
import users from "../../../../reducer/users";
import infoReducer, {getInfoUserByTradeByBranch} from "../../../../reducer/infoReducer";
import {useTranslation} from "react-i18next";
import {formatDateMinus} from "../../../../util";
import {BaseUrl} from "../../../../middleware";
import CountUp from 'react-countup';
const formatter = (value) => <CountUp  end={value} separator="." />;

function TopTrader({users, mainBranchId, getInfoUserByTradeByBranch, infoReducer}) {
    const {t} = useTranslation();

    const [date, setDate] = useState(new Date());



    useEffect(() => {
        if (users.getInfoAdmin || users.getInfo) {
            getInfoUserByTradeByBranch({
                id: mainBranchId ? mainBranchId : users.businessId,
                params: {
                    date: formatDateMinus(date),
                }
            })
        }
    }, [mainBranchId, date]);


    return (
        <div className={'top-trader-page'}>
            <div className={'d-block d-sm-flex justify-content-between mb-4 align-items-end'}>
                <h5 className={'top-trader-page-text'}>Sotuvchilar reytingi</h5>
                <DatePicker style={{height: '30px'}} onChange={(e) => setDate(e)}/>
            </div>
            <div  className={'top-traders'}>
                {
                    infoReducer.infoTradeUser?.length > 0 ?
                        infoReducer.infoTradeUser?.map((item, index) =>
                                <div key={index} className={'d-flex justify-content-between align-items-center mb-2'}>
                                    <div className={'d-flex gap-3 align-items-center'}>
                                        {
                                        item.photoId ?
                                            <Avatar className={'trader-icon'} src={<img src={`${BaseUrl}/attachment/download/${item?.photoId}`} alt="avatar" />} />
:                                        <Avatar className={'trader-icon'}>{item?.userFio.substring(0,1)}</Avatar>

                                    }
                                    <div>
                                        <h5 className={'trader-name'}>{item?.userFio}</h5>
                                        <p className={'trader-sum-mobile'}>{formatter(item?.trade)} {t('Bosh1.sum')}</p>
                                    </div>
                                    </div>
                                    <h5 className={'trader-sum'}>{formatter(item?.trade)} {t('Bosh1.sum')}</h5>
                                </div>
                          ) : <div><h4 className={'text-center'}>NOT FOUND</h4></div>
                }
            </div>
        </div>
    );
}

export default   connect((users, infoReducer), {getInfoUserByTradeByBranch})(TopTrader);