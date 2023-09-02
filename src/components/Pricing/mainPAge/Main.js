import React from 'react';
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";
import './main.css'

function Main({number,setNumber}) {

    const location  = useLocation();
    const {t, i18n} = useTranslation()

    return (
        <>
            <div className={`container mt-2 secondpage`}>
                <div className={'row m-0'}>
                    <div className="col-md-12">
                        <div className="text">
                            <h1>{t("Main.1")}</h1>
                            <p>{t("Main.2")}</p>
                        </div>

                    </div>
                </div>
                <div><h4 className={'text-center'}>Ma'lumotlarni kiriting!</h4></div>
            </div>
        </>
    );
}

export default Main;
