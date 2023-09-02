import {lazy} from "react";
import { Route, Switch, Link } from 'react-router-dom'
import './superadmin.css'
const SuperAdminPages = lazy(() => import('./pages/superadmin/SuperAdminPage'))
const AllBusenesses = lazy(() => import('./pages/all-buseness/AllBusenesses'))
const PackageSubscription = lazy(() => import('./pages/package-subscription/PackageSubscripton'))
const Packages = lazy(() => import('./pages/packages/Packages'))
const SuperAdminSettings = lazy(() => import('./pages/super-admin-settings/SuperAdminSettings'))
const Communicator = lazy(() => import('./pages/communicator/Communicator'))
const AddBusiness = lazy(() => import('./pages/all-buseness/addBusiness/AddBusiness'))
const PackageAdd = lazy(() => import('./pages/packages/PackageAdd/PackageAdd'))
const MainPageTitles = lazy(() => import("./pages/main-pages-titles/MainPageTitles"))

function SuperAdmin() {

    return (<div className="col-md-12 pb-4 pt-4">
        <div className="rowStyleSA">
            <Link to='/main/superadmin'> <button> Super Admin</button></Link>
            <Link to='/main/superadmin/allbusenesses'> <button>All Busenesses</button></Link>
            <Link to='/main/superadmin/packagesubscription'> <button>Package Subscription</button></Link>
            <Link to='/main/superadmin/paskages'> <button>Paskages</button></Link>
            {/*<Link to='/superadmin/titles'> <button>Titles</button></Link>*/}
            {/*<Link to='/superadmin/superadminsettings'> <button>Super Admin Settings</button></Link>*/}
            {/*<Link to='/superadmin/changer'> <button>Change Users Password</button></Link>*/}
        </div>
        <div className='mt-2'>
            <Switch>
                <Route path={'/main/superadmin/allbusenesses/addbusiness/:id?'} component={AddBusiness} />
                <Route path={'/main/superadmin/allbusenesses/addbusiness'} component={AddBusiness} />
                <Route path={'/main/superadmin/allbusenesses'} component={AllBusenesses}/>
                <Route path={'/main/superadmin/packagesubscription'} component={PackageSubscription}/>
                <Route path={'/main/superadmin/paskages/addpackage/:id'} component={PackageAdd}/>
                <Route path={'/main/superadmin/paskages/addpackage'} component={PackageAdd}/>
                <Route path={'/main/superadmin/paskages'} component={Packages}/>
                {/*<Route path={'/superadmin/titles'} component={MainPageTitles}/>*/}
                {/*<Route path={'/superadmin/superadminsettings'} component={SuperAdminSettings}/>*/}
                {/*<Route path={'/superadmin/changer'} component={Communicator}/>*/}
                <Route path={'/main/superadmin'} component={SuperAdminPages}/>
            </Switch>
        </div>
    </div>)


}

export default SuperAdmin
