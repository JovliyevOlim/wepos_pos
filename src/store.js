import {configureStore} from "@reduxjs/toolkit";
import {api} from './middleware';
import users from "./reducer/users";
import functionreducer from "./reducer/functionreducer";
import XodimReducer from "./components/SotibOlish/Sidebar/Hodimlar/reducer/XodimReducer";
import LavozimReducer from "./components/SotibOlish/Sidebar/Hodimlar/reducer/LavozimReducer";
import TaminotReducer from "./components/SotibOlish/Sidebar/Hamkorlar/reducer/TaminotReducer";
import CustomerReducer from "./components/SotibOlish/Sidebar/Hamkorlar/reducer/CustomerReducer";
import BolimReducer from "./components/SotibOlish/Sidebar/Maxsulotlar/reducer/BolimReducer";
import FirmaReducer from "./components/SotibOlish/Sidebar/Maxsulotlar/reducer/FirmaReducer";
import XaridReducer from "./components/SotibOlish/Sidebar/Haridlar/reducer/XaridReducer";
import XarajatlarReducer from "./components/SotibOlish/Sidebar/Xarajatlar/reducer/XarajatlarReducer";
import XarajatTurlariReducer from "./components/SotibOlish/Sidebar/Xarajatlar/reducer/XarajatTurlariReducer";
import FoydaZararReducer from "./components/SotibOlish/Sidebar/Xisobotlar/reducer/FoydaZararReducer";
import XaridlarXisobotiReducer from "./components/SotibOlish/Sidebar/Xisobotlar/reducer/XaridlarXisobotiReducer";
import MijozHisobotiReducer from './components/SotibOlish/Sidebar/Xisobotlar/reducer/MijozHisobotiReducer'
import XarajatXisobotReducer from './components/SotibOlish/Sidebar/Xisobotlar/reducer/XarajatXisobotReducer'
import SavdodagiTulovReducer from './components/SotibOlish/Sidebar/Xisobotlar/reducer/SavdodagiTulovReducer'
import MaxsulotxisobotReducer from './components/SotibOlish/Sidebar/Xisobotlar/reducer/MaxsulotxisobotReducer'
import KopsotilgantovarlarReducer from './components/SotibOlish/Sidebar/Xisobotlar/reducer/KopsotilgantovarlarReducer'
import QoldiqlarxisobotiReducer from './components/SotibOlish/Sidebar/Xisobotlar/reducer/QoldiqlarxisobotiReducer'
import MaxsulotlarRoyxariReducer from "./components/SotibOlish/Sidebar/Maxsulotlar/reducer/MaxsulotlarRoyxariReducer";
import SavdoQoshishReducer from "./components/SotibOlish/Sidebar/Savdo/reducer/SavdoQoshishReducer";
import branchreducer from "./reducer/branchreducer";
import MeasurementReducer from "./reducer/MeasurementReducer";
import PayReducer from "./reducer/PayReducer";
import photoreducer from "./reducer/photoreducer";
import MahsulotTurlariReducer from "./components/SotibOlish/Sidebar/Maxsulotlar/reducer/MahsulotTurlariReducer";
import tariffReducer from "./reducer/tariffReducer";
import allbusinessreducer from "./components/SotibOlish/Sidebar/SUPERADMIN/reducers/allbusinessreducer";
import subscripreducer from "./components/SotibOlish/Sidebar/SUPERADMIN/reducers/subscripreducer";
import SuperAdminReducer from "./components/SotibOlish/Sidebar/SUPERADMIN/reducers/SuperAdminReducer";
import notificationReducer from "./reducer/notificationReducer";
import checkReducer from "./reducer/checkReducer";
import filesReducer from "./reducer/filesReducer";
import balanceReducer from "./reducer/balanceReducer";
import holdOnReducer from "./reducer/holdOnReducer";
import lossReducer from "./reducer/lossReducer";
import UserHistoryReducer from "./components/SotibOlish/Sidebar/Xisobotlar/reducer/UserHistoryReducer";
import infoReducer from "./reducer/infoReducer";
import SupplierReportReducer from "./components/SotibOlish/Sidebar/Xisobotlar/reducer/SupplierReportReducer";
export default configureStore({
    reducer: {
        users,
        UserHistoryReducer,
        functionreducer,
        XodimReducer,
        LavozimReducer,
        TaminotReducer,
        photoreducer,
        CustomerReducer,
        BolimReducer,
        FirmaReducer,
        XaridReducer,
        SuperAdminReducer,
        XarajatlarReducer,
        XarajatTurlariReducer,
        FoydaZararReducer,
        XaridlarXisobotiReducer,
        MijozHisobotiReducer,
        XarajatXisobotReducer,
        SavdodagiTulovReducer,
        MaxsulotxisobotReducer,
        KopsotilgantovarlarReducer,
        QoldiqlarxisobotiReducer,
        MaxsulotlarRoyxariReducer,
        branchreducer,
        MeasurementReducer,
        SavdoQoshishReducer,
        PayReducer,
        MahsulotTurlariReducer,
        tariffReducer,
        allbusinessreducer,
        subscripreducer,
        notificationReducer,
        checkReducer,
        filesReducer,
        balanceReducer,
        holdOnReducer,
        lossReducer,
        infoReducer,
        SupplierReportReducer
    },
    middleware: [api]
})
