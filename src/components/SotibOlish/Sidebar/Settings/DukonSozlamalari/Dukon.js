import './dukon.css'
import {Link,Route,Switch} from "react-router-dom";
import BusinessSetting from "./businessSetting/BusinessSetting";
import Chek from "./chek/Chek";
import Business from "./business/Business";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
 function Dukon({users}) {
    return (
        <div className={'containerSet'}>
                <div className="dashboardBox">
                    {
                        users.editMyBusiness &&
                        <Link to={'/main/shopSetting/1'}><button className={'btn btn-outline-primary form-control mt-2'}>Biznes</button></Link>
                    }
                    {
                        users.editMyBusiness  ?
                            <Link to={'/main/shopSetting/3'}><button className={'btn btn-outline-primary form-control mt-2'}>Savdo</button></Link>
                         :''
                    }
                    {
                        users.editInvoice ?
                        <Link to={'/main/shopSetting/4'}><button className={'btn btn-outline-primary form-control mt-2'}>Chek</button></Link>
                                :''
                    }
                </div>
                
                <div className="blokSet">
                   
                    <Switch>
                        {
                            users.editMyBusiness && <Route path={'/main/shopSetting/1'} component={Business}/>
                        }
                        {
                            users.editMyBusiness && <Route path={'/main/shopSetting/3'} component={BusinessSetting}/>
                        }
                        {
                            users.editInvoice && <Route path={'/main/shopSetting/4'} component={Chek}/>
                        }
                    </Switch>
                </div>
            </div>
    )
}
export default connect((users),{}) (Dukon)