import React from 'react';
import {Progress} from 'antd';
import './progress.css'
import CountUp from 'react-countup';
import {connect} from "react-redux";
import users from "../../../../reducer/users";
import infoReducer from "../../../../reducer/infoReducer";
import {useTranslation} from "react-i18next";
import {t} from "i18next";
import {prettify} from "../../../../util";

const formatter = (value) => <CountUp end={value}    formattingFn={()=>prettify(value,3)} separator=" "/>;

function ProgressCard({users, infoReducer}) {

    const {t} = useTranslation()
    const {balance, total,supplierDebt,customerDebt} = infoReducer?.infoBalance


    return (
        <div className={'progress-page'}>
            <p className={'progress-page-text'}>{t('mainPage.totalSum')}</p>
            <h4 className={'progress-page-totalSum'}>{formatter(total)} {t('mainPage.sum')}</h4>
            <div className={'progress-card'}>
                <div className={'progress-card-item'}>
                    <div className="progress-round">
                        <Progress type='circle' percent={parseFloat(balance?.PLASTIK / total * 100).toFixed(1)}
                                  size={[120, 120]} strokeColor={'#377DFF'} strokeWidth={10}/>
                    </div>
                    <div className="progress-text">
                        <h4 className={'progress-number'}>{formatter(balance?.PLASTIK)} {t('mainPage.sum')}</h4>
                        <h6 className={'progress-type'}>{t('mainPage.plastik')}</h6>
                    </div>
                </div>
                <div className={'progress-card-item'}>
                    <div className="progress-round">
                        <Progress type='circle' percent={parseFloat(balance?.NAQD / total * 100).toFixed(1)} size={[120, 120]} strokeColor={'#38CB89'} strokeWidth={10}/>
                    </div>
                    <div className="progress-text">
                        <h4 className={'progress-number'}>{formatter(balance?.NAQD)} {t('mainPage.sum')}</h4>
                        <h6 className={'progress-type'}>{t('mainPage.naqd')}</h6>
                    </div>
                </div>
                <div className={'progress-card-item'}>
                    <div className="progress-round">
                        <Progress type='circle' percent={parseFloat(balance?.BANK_ORQALI / total * 100).toFixed(1)} size={[120, 120]} strokeColor={'#ffc040'} strokeWidth={10}/>
                    </div>
                    <div className="progress-text">
                        <h4 className={'progress-number'}>{formatter(balance?.BANK_ORQALI)} {t('mainPage.sum')}</h4>
                        <h6 className={'progress-type'}>{t('mainPage.bankOrqali')}</h6>
                    </div>
                </div>
                <div className={'progress-card-item'}>
                    <div className="progress-round">
                        <Progress type='circle' percent={parseFloat(supplierDebt /(supplierDebt+customerDebt) * 100).toFixed(1)} size={[120,120]} strokeColor={'#ff5630'} strokeWidth={10}/>
                    </div>
                    <div className="progress-text">
                        <h4 className={'progress-number'}>{formatter(supplierDebt)} {t('mainPage.sum')}</h4>
                        <h6 className={'progress-type'}>{t('mainPage.supplierDebt')}</h6>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default connect((users, infoReducer), {})(ProgressCard);