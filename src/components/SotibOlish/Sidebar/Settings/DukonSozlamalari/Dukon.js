import './dukon.css'
import {Link,Route,Switch} from "react-router-dom";
import BusinessSetting from "./businessSetting/BusinessSetting";
import Chek from "./chek/Chek";
import Business from "./business/Business";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {useTranslation} from "react-i18next";
import ChangeTariff from "./changeTariff/ChangeTariff";
import Bazalar from "../bazalar/Bazalar";
import ShtrixCode from "./ShtrixCode/ShrtixCode";

 function Dukon({users}) {
     const {t} = useTranslation()

     return (
        <div className={'containerSet'}>
                <div className="dashboardBox">
                    {
                        users.editMyBusiness &&
                        <Link to={'/main/shopSetting/1'}><button className={'btn btn-outline-primary form-control mt-2'}>{t('sidebar.settingBusiness')}</button></Link>
                    }

                    {
                        users.editMyBusiness  ?
                            <Link to={'/main/shopSetting/2'}><button className={'btn btn-outline-primary form-control mt-2'}>{t('sidebar.settingChangeTariff')}</button></Link>
                            :''
                    }
                    {
                        users.editMyBusiness  ?
                            <Link to={'/main/shopSetting/3'}><button className={'btn btn-outline-primary form-control mt-2'}>{t('sidebar.trade')}</button></Link>
                            :''
                    }
                    {
                        users.editInvoice ?
                        <Link to={'/main/shopSetting/4'}><button className={'btn btn-outline-primary form-control mt-2'}>{t('sidebar.settingCheck')}</button></Link>
                                :''
                    }
                    {
                        users.getBranch ?
                            <Link to={'/main/shopSetting/5'}><button className={'btn btn-outline-primary form-control mt-2'}>{t('sidebar.settingBranch')}</button></Link>
                            :''
                    }
                    {
                        users.getProduct ?
                            <Link to={'/main/shopSetting/6'}><button className={'btn btn-outline-primary form-control mt-2'}>{t('sidebar.settingBarcode')}</button></Link>
                            :''
                    }
                </div>
                
                <div className="blokSet">
                   
                    <Switch>
                        {
                            users.editMyBusiness && <Route path={'/main/shopSetting/1'} component={Business}/>
                        }
                        {
                            users.editMyBusiness && <Route path={'/main/shopSetting/2'} component={ChangeTariff}/>
                        }
                        {
                            users.editMyBusiness && <Route path={'/main/shopSetting/3'} component={BusinessSetting}/>
                        }
                        {
                            users.editInvoice && <Route path={'/main/shopSetting/4'} component={Chek}/>
                        }
                        {
                            users.getBranch && <Route path={'/main/shopSetting/5'} component={Bazalar}/>
                        }
                        {
                            users.getProduct && <Route path={'/main/shopSetting/6'} component={ShtrixCode}/>
                        }
                    </Switch>
                </div>
            </div>
    )
}
export default connect((users),{}) (Dukon)