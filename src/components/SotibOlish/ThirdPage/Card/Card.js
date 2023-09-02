import React from 'react';
import './card.css';
import cardPicture from '../../../../img/Group 237816.svg'
import  hartArrowUp from '../../../../img/hart-arrow-up.svg'
import  hartArrowDowm from '../../../../img/hart-arrow-down.svg'
function Card({title,img,sum,percent}) {
    return (
        <div className={'dashboard-card'}>
            <div className={'dashboard-card-header'}>
                <h4 className={'dashboard-card-header-text'}>{title}</h4>
                <img className={'dashboard-card-header-icon'} src={img} alt={title}/>
            </div>
            <div>
                <h2 className={'dashboard-card-body-text'}>{sum} so'm</h2>
            </div>
            <div className={'dashboard-card-footer'}>
                <img src={percent < 0 ? hartArrowDowm : hartArrowUp} alt="hartArrowUp"/>
                <p className={`dashboard-card-footer-text ${percent < 0 ? 'dashboard-card-footer-percent-error' :'dashboard-card-footer-percent-success'}`}>
                    {percent < 0 ? `${percent}`: `+${percent}`}% vs
                </p>
                <p className={'dashboard-card-footer-text'}>oxirgi 30 kun</p>
            </div>
        </div>
    );
}

export default Card;