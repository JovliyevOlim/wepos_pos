import "./maxsulotlarRoyxati.css"
import {Link, useHistory} from "react-router-dom"
import {connect} from 'react-redux'
import React, {useEffect, useState} from 'react'
import users from "../../../../../reducer/users";
import MaxsulotlarRoyxariReducer, {
    deleteMaxsulotRuyxati,
    getMaxsulotById, deleteMaxsulotRuyxatiByIds,
    getProductTableSearch, getProductTableSearchBranch
} from '../reducer/MaxsulotlarRoyxariReducer'
import FirmaReducer, {getFirma} from "../reducer/FirmaReducer";
import BolimReducer, {getBolim} from "../reducer/BolimReducer";
import branchreducer, {getbranch} from "../../../../../reducer/branchreducer";
import {useTranslation} from "react-i18next";
import Select from "react-select";
import {
    alpha, Avatar, Box, Checkbox,
    Divider, Grid, IconButton,
    InputAdornment, styled, Table,
    TableBody, TableCell,
    TableContainer, TableHead, TablePagination,
    TableRow, TextField, Tooltip,
    Typography, useTheme
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Loading from "../../../../Loading";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {BaseUrl} from "../../../../../middleware";
import Excel from "../../../../../img/Excel.png";
import KorishM from "./Taxrirlash/Korish";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ModalLoading from "../../../../ModalLoading";
import AgreeModal from "../../../../AgreeModal";
import MeasurementReducer, {getMeasurement} from "../../../../../reducer/MeasurementReducer";
import axios from "axios";
import MainHeaderText from "../../../../Svg/MainHeaderText";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Svg/SelectAnt";
import CardBody from "../../../../Svg/CardBody";
import {FileExcelOutlined} from "@ant-design/icons";
import {Tag} from "antd";

const TableWrapper = styled(Table)(
    ({theme}) => `

    thead tr th {
        border: 0;
    }

    tbody tr td {
        position: relative;
        border: 0;

        & > div {
            position: relative;
            z-index: 5;
        }

        &::before {
            position: absolute;
            left: 0;
            top: 0;
            transition: ${theme.transitions.create(['all'])};
            height: 100%;
            width: 100%;
            content: "";
            background: ${theme.colors.alpha.white[100]};
            border-top: 1px solid ${theme.colors.alpha.black[10]};
            border-bottom: 1px solid ${theme.colors.alpha.black[10]};
            pointer-events: none;
            z-index: 4;
        }

        &:first-of-type:before {
            border-top-left-radius: ${theme.general.borderRadius};
            border-bottom-left-radius: ${theme.general.borderRadius};
            border-left: 1px solid ${theme.colors.alpha.black[10]};
        }
        

        &:last-child:before {
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
            border-right: 1px solid ${theme.colors.alpha.black[10]};
        }
    }

    tbody tr:hover td::before {
        background: ${alpha(theme.colors.primary.main, 0.02)};
        border-color: ${alpha(theme.colors.alpha.black[100], 0.25)} !important;
    }

  `
);

const TableRowDivider = styled(TableRow)(
    ({theme}) => `
    height: ${theme.spacing(2)};
  `
);

const LabelSuccess = styled(Box)(
    ({theme}) => `
    display: inline-block;
    background: ${theme.colors.success.lighter};
    color: ${theme.colors.success.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(14)};
    font-weight: bold;
    padding: ${theme.spacing(1, 1)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelError = styled(Box)(
    ({theme}) => `
    display: inline-block;
    background: ${theme.colors.error.lighter};
    color: ${theme.colors.error.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(14)};
    font-weight: bold;
    padding: ${theme.spacing(1, 1)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelWarning = styled(Box)(
    ({theme}) => `
    display: inline-block;
    background: ${theme.colors.warning.lighter};
    color: ${theme.colors.warning.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(14)};
    font-weight: bold;
    padding: ${theme.spacing(1, 1)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const IconButtonWrapper = styled(IconButton)(
    ({theme}) => `
    transition: ${theme.transitions.create(['transform', 'background'])};
    transform: scale(1);
    transform-origin: center;

    &:hover {
        transform: scale(1.1);
    }
  `
);

const TableHeadWrapper = styled(TableHead)(
    ({theme}) => `
      .MuiTableCell-root {
          text-transform: none;
          font-weight: normal;
          color: ${theme.colors.alpha.black[100]};
          font-size: ${theme.typography.pxToRem(16)};
          padding: ${theme.spacing(2)};
      }

      .MuiTableRow-root {
          background: transparent;
      }
  `
);

const SearchInputWrapper = styled(TextField)(
    ({theme}) => `
    background: ${theme.colors.alpha.white[100]};
    border-radius: ${theme.general.borderRadius};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(16)};
    }
  `
);

function MaxsulotlarRoyxati({
                                getBolim,
                                getMeasurement,
                                MeasurementReducer,
                                BolimReducer,
                                users,
                                getFirma,
                                FirmaReducer,
                                MaxsulotlarRoyxariReducer,
                                deleteMaxsulotRuyxati,
                                deleteMaxsulotRuyxatiByIds,
                                getProductTableSearch,
                                getProductTableSearchBranch,
                            }) {


    const theme = useTheme();

    const [loading, setLoading] = useState(false)
    const {t} = useTranslation()
    const [deletemodal, setdeletemodal] = useState(false)
    const [deleteID, setdeletID] = useState('')
    const [active, setActive] = useState(false)


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [mainBranchId, setMainBranchId] = useState(null)
    const [brandId, setbranId] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [measurementId, setMeasurementId] = useState(null)
    const [search, setSearch] = useState('')

    const history = useHistory()


    useEffect(() => {
        getFirma(users.businessId)
        getBolim(users.businessId)
        getMeasurement(users.businessId)
    }, [])

    useEffect(() => {
        setLoading(false)
        if (users.getProductAdmin && !mainBranchId) {
            getProductTableSearch({
                businessId: users.businessId,
                params: {
                    brandId,
                    categoryId,
                    measurementId,
                    page,
                    size: rowsPerPage,
                    search
                }
            })
        } else if (users.getProduct) {
            getProductTableSearchBranch({
                branchId: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    brandId,
                    categoryId,
                    measurementId,
                    page,
                    size: rowsPerPage,
                    search
                }
            })
        }

    }, [brandId, mainBranchId, categoryId, search, rowsPerPage, page, measurementId, MaxsulotlarRoyxariReducer.current])


    const [productId, setProductId] = useState(null)

    function korishsh(id) {
        setProductId(id)
        toggle()
    }


    function toggle() {
        setActive(!active)
    }

    function deleteFunc() {
        deleteMaxsulotRuyxati(deleteID)
        setSaveModal(true)
    }

    function deleteProductById(item) {
        setdeletemodal(true)
        setdeletID(item)
    }


    useEffect(() => {
        setLoading(true)
    }, [MaxsulotlarRoyxariReducer.getBoolean])

    useEffect(() => {
        setLoading(false)
    }, [])
    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };


    const togglePush = () => {
        history.push('/main/addProduct')
    }

    let firm = FirmaReducer.firmalar ? FirmaReducer.firmalar?.map(item => ({value: item.id, label: item.name})) : ''
    const firmOptions = [{value: "ALL", label: 'Barchasi'}, ...firm]
    let baza = users.branches ? users.branches?.map(item => ({value: item.id, label: item.name})) : ''
    const bazaOptions = [{value: "ALL", label: 'Barchasi'}, ...baza]
    let category = BolimReducer.bolimlar ? BolimReducer.bolimlar?.map(item => ({value: item.id, label: item.name})) : ''
    const categoryOptions = [{value: "ALL", label: 'Barchasi'}, ...category]
    let measurement = MeasurementReducer.measurements ? MeasurementReducer.measurements?.map(item => ({
        value: item.id,
        label: item.name
    })) : ''
    const measurementOptions = [{value: "ALL", label: 'Barchasi'}, ...measurement]

    const [selectedItems, setSelectedUsers] = useState([]);
    const selectedSomeUsers =
        selectedItems.length > 0 && selectedItems.length < MaxsulotlarRoyxariReducer.productTableSearch?.list?.length;
    const selectedAllUsers = selectedItems.length === MaxsulotlarRoyxariReducer.productTableSearch?.list?.length;

    const handleSelectAllUsers = (event) => {
        setSelectedUsers(event.target.checked ? MaxsulotlarRoyxariReducer.productTableSearch?.list.map((product) => product.id) : []);
    };

    const handleSelectOneInvoice = (event, invoiceId) => {
        if (!selectedItems.includes(invoiceId)) {
            setSelectedUsers((prevSelected) => [...prevSelected, invoiceId]);
        } else {
            setSelectedUsers((prevSelected) =>
                prevSelected.filter((id) => id !== invoiceId)
            );
        }
        console.log(selectedItems)
    };

    const [saveModal, setSaveModal] = useState(false)

    useEffect(() => {
        if (MaxsulotlarRoyxariReducer.saveBoolean) {
            setSelectedUsers([])
            setdeletemodal(false)
            setdeletID(null)
            setLoading(true)
        }
        setTimeout(() => {
            setSaveModal(false)
        }, 200)
    }, [MaxsulotlarRoyxariReducer.current])


    function getFilesById() {
        axios.get(`${BaseUrl}/excel/${mainBranchId ? mainBranchId : users.businessId}`, {
            method: 'GET',
            responseType: 'blob',
            headers: {
                "Content-Type": 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('tokenname') || sessionStorage.getItem('tokenname')}`
            },
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Products of ${
                users.branches.some(item => item.id === mainBranchId) ? users.branches.find(item => item.id === mainBranchId).name : 'business'}.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    }


    return (
        <div>
            <div className="d-flex col-md-12 align-items-center mb-5 justify-content-between">
                <MainHeaderText text={'Mahsulotlar'}/>
                {
                    users.addProduct ?
                        <ButtonAnt onClick={togglePush} text={'Qo\'shish'} type={'primary'}/> : ''
                }
            </div>
            <>
                <CardBody>
                    <div className="col-md-12 d-flex align-items-end row-gap-4 flex-wrap">
                        <div className="col-md-3">
                            <SelectAnt name={'Filiallar'} onChange={(e) => {
                                setPage(0)
                                setMainBranchId(e === "" ? null : e)
                            }}
                                       permission={users.getProductAdmin}
                                       selectList={users.branches}
                            />
                        </div>
                        <div className="col-md-3">
                            <SelectAnt name={'Firmalar'} onChange={(e) => {
                                setPage(0)
                                setbranId(e === "" ? null : e)
                            }}
                                       permission={true}
                                       selectList={FirmaReducer.firmalar}
                            />
                        </div>
                        <div className="col-md-3">
                            <SelectAnt name={'Bo\'limlar'} onChange={(e) => {
                                setPage(0)
                                setCategoryId(e === "" ? null : e)
                            }}
                                       permission={true}
                                       selectList={BolimReducer.bolimlar}
                            />
                        </div>
                        <div className="col-md-3">
                            <SelectAnt name={'O\'lchov birligi'} onChange={(e) => {
                                setPage(0)
                                setMeasurementId(e === "" ? null : e)
                            }}
                                       permission={true}
                                       selectList={MeasurementReducer.measurements}
                            />
                        </div>
                        <div className="col-md-6">
                            <SearchAnt onChange={(e) => setSearch(e.target.value)}
                                       name={'Mahsulotni nomi yoki barcode yordamida qidirish'}/>
                        </div>
                        <div className="col-md-3">
                            <ButtonAnt type={'dash'} onClick={getFilesById} bgColor={'green'}
                                       icon={<FileExcelOutlined/>} text={'Excel faylni yuklash'}/>
                        </div>
                    </div>
                </CardBody>
                {
                    MaxsulotlarRoyxariReducer.productTableSearch?.profitDto &&
                    <CardBody>
                        <div className="d-flex justify-content-around align-items-center flex-wrap">
                            <Tag className={'productStatistic'} color="red">
                                <p className={'p-0 m-2'}>Barcha maxsulotlar Olish narxida :</p>
                                <h5>{MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.buyPrice} so'm </h5>
                            </Tag>
                            <Tag className={'productStatistic'} color="geekblue">
                                <p className={'p-0 m-2'}> Barcha maxsulotlar Sotish narxida :</p>
                                <h5> {MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.salePrice} so'm</h5>
                            </Tag>
                            <Tag className={'productStatistic'} color="green">
                                <p className={'p-0 m-2'}>Foyda sumda :</p>
                                <h5>{MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.salePrice-MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.buyPrice} so'm </h5>
                            </Tag>
                            <Tag className={'productStatistic'} color="cyan">
                                <p className={'p-0 m-2'}>Foyda foizda :</p>
                                <h5>
                                    {((parseFloat(MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.salePrice / MaxsulotlarRoyxariReducer.productTableSearch?.profitDto?.buyPrice) - 1) * 100).toFixed(2)} %
                                </h5>
                            </Tag>
                        </div>
                    </CardBody>
                }

            </>
            {
                users.getProductAdmin || users.getProduct ?

                    <div className="rowStyleMax colorback">

                        <>{

                                loading ?
                                    MaxsulotlarRoyxariReducer.productTableSearch?.list?.length > 0 ?
                                        <Box pb={3}>
                                            {
                                                selectedItems.length > 0 &&
                                                <button onClick={() => {
                                                    deleteMaxsulotRuyxatiByIds(selectedItems)
                                                    setSaveModal(true)
                                                }}
                                                        className={'btn btn-danger mt-4 d-flex justify-content-end'}>Belgilanganlarni
                                                    o'chirish</button>
                                            }
                                            <TableContainer>
                                                {/*<TableWrapper>*/}
                                                <TableHeadWrapper>
                                                    <TableRow>
                                                        <TableCell>T/R</TableCell>
                                                        <TableCell>
                                                            <Tooltip
                                                                arrow
                                                                placement="top"
                                                                title={t('All')}
                                                            >
                                                                <Checkbox
                                                                    checked={selectedAllUsers}
                                                                    indeterminate={selectedSomeUsers}
                                                                    onChange={handleSelectAllUsers}
                                                                />
                                                            </Tooltip>
                                                        </TableCell>

                                                        <TableCell align="left">Maxsulotlar</TableCell>
                                                        <TableCell align="left">Filial</TableCell>
                                                        <TableCell align="center">Barcode</TableCell>
                                                        <TableCell align="center">Turi</TableCell>
                                                        <TableCell align="center">Sotib olish narxi</TableCell>
                                                        <TableCell align="center">Sotish narxi</TableCell>
                                                        <TableCell align="center">Optom Sotish narxi</TableCell>
                                                        <TableCell align="center">Firma</TableCell>
                                                        <TableCell align="center">{t('Bo`limi')}</TableCell>
                                                        <TableCell align="center">{t('Actions')}</TableCell>
                                                    </TableRow>
                                                </TableHeadWrapper>
                                                <TableBody>
                                                    {
                                                        MaxsulotlarRoyxariReducer.productTableSearch?.list.map((item, index) => {
                                                            const isInvoiceSelected = selectedItems.includes(
                                                                item.id
                                                            );
                                                            return (
                                                                <TableRow key={item.id}>
                                                                    <TableCell>
                                                                        <Box>
                                                                            <Typography
                                                                                variant="h4">#{(page * rowsPerPage) + index + 1}</Typography>
                                                                        </Box>
                                                                    </TableCell>

                                                                    <TableCell>
                                                                        <Checkbox
                                                                            checked={isInvoiceSelected}
                                                                            // indeterminate={selectedSomeUsers}
                                                                            onChange={(e) =>
                                                                                handleSelectOneInvoice(e, item.id)
                                                                            }
                                                                            value={isInvoiceSelected}
                                                                        />
                                                                    </TableCell>

                                                                    <TableCell>
                                                                        <Box display="flex" alignItems="center">
                                                                            <Avatar
                                                                                variant="square"
                                                                                sx={{
                                                                                    height: 'auto',
                                                                                    width: 80
                                                                                }}
                                                                                src={item.photoId ? `${BaseUrl}/attachment/download/${item.photoId}` : ''}
                                                                            />
                                                                            <Box pl={1}>
                                                                                <Typography
                                                                                    color="text.primary"
                                                                                    underline="none"
                                                                                    width={180}
                                                                                    variant="h5"
                                                                                    sx={{
                                                                                        '&:hover': {
                                                                                            color: `${theme.colors.primary.main}`

                                                                                        }
                                                                                    }}
                                                                                >
                                                                                    {item.name}
                                                                                </Typography>
                                                                                <Typography variant="subtitle2"
                                                                                            display={'flex'}
                                                                                            justifyContent={'space-between'}
                                                                                            alignItems="center"
                                                                                            mt={1}
                                                                                            noWrap
                                                                                >
                                                                                    <Typography mr={1}>
                                                                                        {t('Miqdori')}:
                                                                                    </Typography>
                                                                                    <Typography>
                                                                                        <Typography>
                                                                                            <div>
                                                                                                {
                                                                                                    item.amount > item.minQuantity ?
                                                                                                        <LabelSuccess>
                                                                                                            <b>{item.amount} </b> {item.measurementName}
                                                                                                        </LabelSuccess> :
                                                                                                        item.minQuantity >= item.amount && item.amount > 0 ?
                                                                                                            <LabelWarning>
                                                                                                                <b>{item.amount}</b> {item.measurementName}
                                                                                                            </LabelWarning> :
                                                                                                            <LabelError>
                                                                                                                <b>{item.amount}</b> {item.measurementName}
                                                                                                            </LabelError>
                                                                                                }
                                                                                            </div>
                                                                                        </Typography>
                                                                                    </Typography>

                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell align={'start'}>{
                                                                        item.branches ? item.branches.map(i =>
                                                                            <p className={'p-0 m-0'} style={{
                                                                                maxWidth: '150px',
                                                                                minWidth: '80px'
                                                                            }}>{i}</p>
                                                                        ) : ''
                                                                    }</TableCell>
                                                                    <TableCell align="center">
                                                                        {item?.barcode}
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        {item.many ? 'Turli xil' : 'Bir turli'}
                                                                        {
                                                                            users.getProductAdmin || users.getProduct ? (
                                                                                <Tooltip title="Ko'rish" arrow>
                                                                                    <IconButtonWrapper
                                                                                        onClick={() => korishsh(item.id)}
                                                                                        sx={{
                                                                                            margin: '5px',
                                                                                            backgroundColor: `${theme.colors.success.lighter}`,
                                                                                            color: `${theme.colors.success.main}`,
                                                                                            transition: `${theme.transitions.create(['all'])}`,
                                                                                            '&:hover': {
                                                                                                backgroundColor: `${theme.colors.success.main}`,
                                                                                                color: `${theme.palette.getContrastText(
                                                                                                    theme.colors.success.main
                                                                                                )}`
                                                                                            }
                                                                                        }}
                                                                                    >
                                                                                        <VisibilityIcon
                                                                                            fontSize="small"/>
                                                                                    </IconButtonWrapper>
                                                                                </Tooltip>) : ''
                                                                        }
                                                                    </TableCell>

                                                                    <TableCell align="center">
                                                                        <Typography
                                                                            sx={{
                                                                                pr: 0.5
                                                                            }}
                                                                            component="span"
                                                                            variant="h4"
                                                                            color="text.primary"
                                                                        >
                                                                            {item.buyPrice.toFixed(0)} So'm
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Typography
                                                                            sx={{
                                                                                pr: 0.5
                                                                            }}
                                                                            component="span"
                                                                            variant="h4"
                                                                            color="text.primary"
                                                                        >
                                                                            {item.salePrice.toFixed(0)} So'm
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <Typography
                                                                            sx={{
                                                                                pr: 0.5
                                                                            }}
                                                                            component="span"
                                                                            variant="h4"
                                                                            color="text.primary">
                                                                            {item.grossPrice.toFixed(0)} So'm
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <div>
                                                                            <Typography
                                                                                sx={{
                                                                                    pr: 0.5
                                                                                }}
                                                                                component="span"
                                                                                variant="h4"
                                                                                color="text.primary"
                                                                            >
                                                                                {item.brandName}
                                                                            </Typography>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell align="center">
                                                                        <div>
                                                                            <Typography
                                                                                sx={{
                                                                                    pr: 0.5
                                                                                }}
                                                                                component="span"
                                                                                variant="h4"
                                                                                color="text.primary"
                                                                            >
                                                                                {item.categoryName}
                                                                            </Typography>
                                                                        </div>
                                                                    </TableCell>
                                                                    <TableCell
                                                                        sx={{
                                                                            whiteSpace: 'nowrap'
                                                                        }}
                                                                        align="right"
                                                                    >
                                                                        <Box>
                                                                            {
                                                                                users.editProduct ? (
                                                                                    <Tooltip title="Taxrirlash" arrow>
                                                                                        <IconButtonWrapper
                                                                                            onClick={() => history.push(`/main/addProduct/${item.id}`)}
                                                                                            sx={{
                                                                                                ml: 1,
                                                                                                backgroundColor: `${theme.colors.primary.lighter}`,
                                                                                                color: `${theme.colors.primary.main}`,
                                                                                                transition: `${theme.transitions.create(['all'])}`,
                                                                                                '&:hover': {
                                                                                                    backgroundColor: `${theme.colors.primary.main}`,
                                                                                                    color: `${theme.palette.getContrastText(
                                                                                                        theme.colors.primary.main
                                                                                                    )}`
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <EditIcon fontSize="small"/>
                                                                                        </IconButtonWrapper>
                                                                                    </Tooltip>) : ''
                                                                            }
                                                                            {
                                                                                users.deleteProduct ? (
                                                                                    <Tooltip title="O'chirish" arrow>
                                                                                        <IconButtonWrapper
                                                                                            onClick={() => deleteProductById(item.id)}
                                                                                            sx={{
                                                                                                ml: 1,
                                                                                                backgroundColor: `${theme.colors.error.lighter}`,
                                                                                                color: `${theme.colors.error.main}`,
                                                                                                transition: `${theme.transitions.create(['all'])}`,
                                                                                                '&:hover': {
                                                                                                    backgroundColor: `${theme.colors.error.main}`,
                                                                                                    color: `${theme.palette.getContrastText(
                                                                                                        theme.colors.error.main
                                                                                                    )}`
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <DeleteTwoToneIcon
                                                                                                fontSize="small"/>
                                                                                        </IconButtonWrapper>
                                                                                    </Tooltip>) : ''
                                                                            }
                                                                        </Box>
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                    <TableRowDivider/>
                                                </TableBody>
                                            </TableContainer>
                                            <Box pt={1} display="flex" justifyContent="space-between">
                                                <TablePagination
                                                    component="div"
                                                    count={MaxsulotlarRoyxariReducer?.productTableSearch?.totalItem}
                                                    page={page}
                                                    onPageChange={handleChangePage}
                                                    rowsPerPage={rowsPerPage}
                                                    rowsPerPageOptions={[10, 50, 100, 200]}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                />
                                            </Box>
                                            {
                                                active ?
                                                    <KorishM active={active} toggle={toggle} id={mainBranchId}
                                                             productId={productId}/> : ''
                                            }
                                        </Box>
                                        : <div>
                                            <h4 className={'fw-bold text-center'}>{MaxsulotlarRoyxariReducer?.message}</h4>
                                        </div> : <Loading/>

                            }
                        </>
                    </div> : ''
            }
            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deletemodal={deletemodal} deleteModaltoggle={() => setdeletemodal(prevState => !prevState)}
                        deleteFunc={deleteFunc}/>
        </div>
    )
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer, BolimReducer, branchreducer, MeasurementReducer), {
    getBolim,
    getMeasurement,
    getbranch,
    getFirma,
    deleteMaxsulotRuyxati,
    getMaxsulotById,
    deleteMaxsulotRuyxatiByIds,
    getProductTableSearch,
    getProductTableSearchBranch,
})(MaxsulotlarRoyxati)
