import {lazy} from 'react';
import ProductLifeTime from "./Sidebar/Xisobotlar/ProductLifeTime/ProductLifeTime";
import TradeReport from "./Sidebar/Xisobotlar/TradeReport/TradeReport";
import PurchaseReport from "./Sidebar/Xisobotlar/PurchaseReport/PurchaseReport";
import Exchange from "./Sidebar/Savdo/Exchange/Exchange";
import ExchangeReportAll from "./Sidebar/Xisobotlar/ExchangeReport/ExchangeReportAll";

const HodimlarRoyhati = lazy(() => import("./Sidebar/Hodimlar/hodimlarRoyxati/HodimlarRoyhati"))
const Lavozimlar = lazy(() => import("./Sidebar/Hodimlar/Lavozimlar/Lavozimlar"))
const Taxrirlash = lazy(() => import("./Sidebar/Hodimlar/hodimlarRoyxati/Taxrirlash/Taxrirlash"))
const Taminotchilar = lazy(() => import("./Sidebar/Hamkorlar/taminotchilar/Taminotchilar"))
const Customers = lazy(() => import("./Sidebar/Hamkorlar/Customers/Customers"))
const MahsulotImport = lazy(() => import("./Sidebar/Maxsulotlar/MahsulotlarImporti/MahsulotImport"))
const MaxsulotlarRoyxati = lazy(() => import("./Sidebar/Maxsulotlar/MahsulotlarRuyxati/MaxsulotlarRoyxati"))
const MahsulotTurlari = lazy(() => import("./Sidebar/Maxsulotlar/MahsulotTurlari/MahsulotTurlari"))
const Bolimlar = lazy(() => import("./Sidebar/Maxsulotlar/bolimlar/Bolimlar"))
const Firmalar = lazy(() => import("./Sidebar/Maxsulotlar/firmalar/Firmalar"))
const Xarid = lazy(() => import("./Sidebar/Savdo/Xarid qilish/Xarid"))
const HaridlarRoyxati = lazy(() => import("./Sidebar/Xisobotlar/PurchaseReport/PurchaseReportAll"))
const BarchaSavdolar = lazy(() => import("./Sidebar/Xisobotlar/TradeReport/TradeReportAll"))
const SavdoQoshish = lazy(() => import("./Sidebar/Savdo/AddLossProducts/addLossProducts"))
const XarajatlarRoyxati = lazy(() => import("./Sidebar/Xarajatlar/xarajatlarRoyxati/XarajatlarRoyxati"))
const XarajatQoshish = lazy(() => import("./Sidebar/Xarajatlar/Qoshish/XarajatQoshish"))
const XarajatTurlari = lazy(() => import("./Sidebar/Xarajatlar/xarajatTurlari/XarajatTurlari"))
const XaridlarXisoboti = lazy(() => import("./Sidebar/Xisobotlar/PurchaseReport/PurchaseReportByProduct"))
const MijozlarXisoboti = lazy(() => import("./Sidebar/Xisobotlar/MijozlarXisoboti/MijozlarXisoboti"))
const MaxsulotXisoboti = lazy(() => import("./Sidebar/Xisobotlar/MaxsulotlarXisoboti/MaxsulotXisoboti"))
const SavdodaTulov = lazy(() => import("./Sidebar/Xisobotlar/TradeReport/TradeReportByProduct"))
const QoldiqlarXisoboti = lazy(() => import("./Sidebar/Xisobotlar/qoldiqlarXisoboti/QoldiqlarXisoboti"))
const Dukon = lazy(() => import("./Sidebar/Settings/DukonSozlamalari/Dukon"))
const Bazalar = lazy(() => import("./Sidebar/Settings/bazalar/Bazalar"))
const SuperAdmin = lazy(() => import("./Sidebar/SUPERADMIN/SuperAdmin"))
const MaxsulotMiqdoriQoldigi = lazy(() => import("./Sidebar/Xisobotlar/MahsulotMiqdoriQoldigi/MaxsulotMiqdoriQoldigi"))
const LossProducts = lazy(() => import("./Sidebar/Savdo/Yoqotilgan Mahsulotlar/LossProducts"))
const Measurement = lazy(() => import("./Sidebar/Maxsulotlar/Measurements/Measurement"))
const BalanceTableAt = lazy(() => import("./Sidebar/Balance/BalanceTableAt/BalanceTableAt"))
const BalanceHistory = lazy(() => import("./Sidebar/Balance/BalanceHistory/BalanceHistory"))
const SupplierReport = lazy(() => import("./Sidebar/Xisobotlar/PurchaseReport/SupplierReport"))
const Taxrirlash2 = lazy(() => import('./Sidebar/Hodimlar/Lavozimlar/Taxrirlash/Taxrirlash'))
const Taxrirlash3 = lazy(() => import('./Sidebar/Maxsulotlar/MahsulotlarRuyxati/Taxrirlash/Taxrirlash'))
const ShtrixCode = lazy(() => import("./Sidebar/Settings/DukonSozlamalari/ShtrixCode/ShrtixCode"))
const XodimlarNazorati = lazy(() => import("./Sidebar/Xisobotlar/XodimlarNazorati/XodimlarNazorati"))

export const routes = [
    {path: "superadmin",component:SuperAdmin,permissions:['SUPER_ADMIN']},
    {path: "addUser/:id?",component:Taxrirlash,permissions:['ADD_USER','GET_USER','GET_USER_ADMIN']},
    {path: "addUser",component:Taxrirlash,permissions:['ADD_USER']},
    {path: "user",component:HodimlarRoyhati,permissions:['ADD_USER','GET_USER','GET_USER_ADMIN']},
    {path: "addRole/:id?",component:Taxrirlash2,permissions:['ADD_ROLE','GET_ROLE']},
    {path: "addRole",component:Taxrirlash2,permissions:['ADD_ROLE']},
    {path: "role",component:Lavozimlar,permissions:['ADD_ROLE','GET_ROLE']},
    {path: "balanceTable",component:BalanceTableAt,permissions:['EDIT_BALANCE', 'GET_BALANCE','GET_BALANCE_ADMIN',]},
    {path: "balanceHistory",component:BalanceHistory,permissions:['GET_BALANCE','GET_BALANCE_ADMIN',]},
    {path: "supplier",component:Taminotchilar,permissions:['ADD_SUPPLIER','GET_SUPPLIER']},
    {path: "customer",component:Customers,permissions:['ADD_CUSTOMER','GET_CUSTOMER','GET_CUSTOMER_ADMIN']},
    {path: "addProduct/:id",component:Taxrirlash3,permissions:['ADD_PRODUCT','GET_PRODUCT','GET_PRODUCT_ADMIN']},
    {path: "addProduct",component:Taxrirlash3,permissions:['ADD_PRODUCT']},
    {path: "importProduct",component:MahsulotImport,permissions:['ADD_PRODUCT']},
    {path: "productList",component:MaxsulotlarRoyxati,permissions:['ADD_PRODUCT','GET_PRODUCT','GET_PRODUCT_ADMIN']},
    /// product Lite fitime
    {path: "productLifeTime",component:ProductLifeTime,permissions:['ADD_PRODUCT','GET_PRODUCT','GET_PRODUCT_ADMIN']},
    {path: "productType",component:MahsulotTurlari,permissions:['ALL_TYPE']},
    {path: "category",component:Bolimlar,permissions:['ALL_CATEGORY']},
    {path: "measurements",component:Measurement,permissions:['ALL_MEASUREMENT']},
    {path: "brand",component:Firmalar,permissions:['ALL_BRAND']},
    {path: "barcode",component:ShtrixCode,permissions:['GET_PRODUCT']},
    {path: "addPurchase/:id?",component:Xarid,permissions:['ADD_PURCHASE','GET_PURCHASE','GET_PURCHASE_ADMIN']},
    {path: "addPurchase",component:Xarid,permissions:['ADD_PURCHASE']},
    // {path: "purchaseList",component:HaridlarRoyxati,permissions:['ADD_PURCHASE','GET_PURCHASE','GET_PURCHASE_ADMIN']},
    // {path: "tradeList",component:BarchaSavdolar,permissions:['ADD_TRADE','GET_TRADE','GET_TRADE_ADMIN']},
    {path: "exchange",component:Exchange,permissions:['ADD_TRADE','GET_TRADE','GET_TRADE_ADMIN']},
    {path: "addLossProducts/:id?",component:SavdoQoshish,permissions:['ADD_LOSS','GET_LOSS','GET_LOSS_ADMIN']},
    {path: "addLossProducts",component:SavdoQoshish,permissions:['ADD_LOSS','GET_LOSS','GET_LOSS_ADMIN']},
    {path: "lossProducts",component:LossProducts,permissions:['GET_LOSS','GET_LOSS_ADMIN']},
    {path: "lossProducts",component:LossProducts,permissions:['GET_LOSS','GET_LOSS_ADMIN']},
    {path: "outlayList",component:XarajatlarRoyxati,permissions:['ADD_OUTLAY','GET_OUTLAY','GET_OUTLAY_ADMIN']},
    {path: "addOutlay/:id?",component:XarajatQoshish,permissions:['ADD_OUTLAY','GET_OUTLAY','GET_OUTLAY_ADMIN']},
    {path: "addOutlay",component:XarajatQoshish,permissions:['ADD_OUTLAY']},
    {path: "outlayCategoryList",component:XarajatTurlari,permissions:['ADD_OUTLAY','GET_OUTLAY']},
    {path: "productsReport",component:MaxsulotXisoboti,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "lostProductsReport",component:MaxsulotMiqdoriQoldigi,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "tradesReport",component:TradeReport,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "exchangeReport",component:ExchangeReportAll,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "purchasesReport",component:PurchaseReport,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "customersReport",component:MijozlarXisoboti,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "usersReport",component:XodimlarNazorati,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "suppliersReport",component:SupplierReport,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "remainProductReport",component:QoldiqlarXisoboti,permissions:['GET_INFO_ADMIN','GET_INFO']},
    {path: "shopSetting",component:Dukon,permissions:['EDIT_INVOICE','EDIT_MY_BUSINESS']},
    {path: "branches",component:Bazalar,permissions:['ADD_BRANCH','GET_BRANCH']},
]
