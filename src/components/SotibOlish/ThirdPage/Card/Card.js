import React from 'react';
import './card.css';
import {prettify} from "../../../../util";
import CountUp from 'react-countup';
const formatter = (value) => <CountUp  end={value} separator="." />;

function Card({title,img,sum,percent}) {
    return (
        <div className={'dashboard-card'}>
            <div className={'dashboard-card-header'}>
                <img className={'dashboard-card-header-icon'} src={img} alt={title}/>
                <div className={'dashboard-card-header-percent'}>
                    <svg width="20" height="20" className={percent < 0 ? 'dashboard-svg-error':'dashboard-svg-success'} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Arrow">
                            <path id="Vector" d="M9.64645 8.35355C9.84171 8.15829 10.1583 8.15829 10.3536 8.35355L14.1464 12.1464C14.4614 12.4614 14.2383 13 13.7929 13L6.20711 13C5.76165 13 5.53857 12.4614 5.85355 12.1464L9.64645 8.35355Z" fill="#38CB89"/>
                        </g>
                    </svg>
                    <p className={`dashboard-card-header-text ${percent < 0 ? 'dashboard-card-header-percent-error' :'dashboard-card-header-percent-success'}`}>
                        {percent < 0 ? `${percent}`
                            : `+${percent}`}%
                    </p>
                </div>
            </div>
            <div>
                <h2 className={'dashboard-card-body-text'}>{formatter(sum)} so'm</h2>
            </div>
            <div className={'dashboard-card-footer'}>
                <h4 className={'dashboard-card-footer-text'}>{title}</h4>
            </div>
        </div>
    );
}

export default Card;