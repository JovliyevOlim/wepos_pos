import './HodimlarRoyhati.css';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import XodimReducer, {
    getXodim,
    deleteXodim, getUserByBranch
} from "../reducer/XodimReducer";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import {
    Avatar,
    Box, Card,
    IconButton,
     Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,
     Tooltip, Typography
} from "@mui/material";
import ModalLoading from "../../../../ModalLoading";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import EditIcon from '@mui/icons-material/Edit';
import Label from './Label'
import {BaseUrl} from "../../../../../middleware";
import photoreducer, {savephoto} from "../../../../../reducer/photoreducer";
import AgreeModal from "../../../../AgreeModal";
import LavozimReducer, {getLavozim} from "../reducer/LavozimReducer";
import MainHeaderText from "../../../../Svg/MainHeaderText";
import CardBody from "../../../../Svg/CardBody";
import SelectAnt, {ButtonAnt, SearchAnt} from "../../../../Svg/SelectAnt";

function HodimlarRoyhati({
                             getXodim,
                             deleteXodim,
                             getUserByBranch,
                             XodimReducer,
                             users,
                             getLavozim,
                             LavozimReducer
                         }) {
    const {t} = useTranslation()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [roleId, setRoleId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    function deleteUserById(id) {
        setDeleteModal(true)
        setDeleteId(id)
    }

    function deleteFunc() {
        deleteXodim(deleteId)
        setSaveModal(true)
    }


    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [query, setQuery] = useState(null)

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setLimit(parseInt(event.target.value));
    };
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const [selectedItems, setSelectedUsers] = useState([]);
    const selectedSomeUsers =
        selectedItems.length > 0 && selectedItems.length < XodimReducer.xodimlar.length;
    const selectedAllUsers = selectedItems.length === XodimReducer.xodimlar?.length;
    const handleSelectAllUsers = (event) => {
        setSelectedUsers(event.target.checked ? XodimReducer.xodimlar.map((user) => user.id) : []);
    };
    const handleSelectOneInvoice = (event, invoiceId) => {
        if (!selectedItems.includes(invoiceId)) {
            setSelectedUsers((prevSelected) => [...prevSelected, invoiceId]);
        } else {
            setSelectedUsers((prevSelected) =>
                prevSelected.filter((id) => id !== invoiceId)
            );
        }
    };


    useEffect(() => {
        if (XodimReducer.saveUserBool) {
            setDeleteModal(false)
            setDeleteId(null)
            setLoading(false)
        }
        setTimeout(() => {
            setSaveModal(false)
        }, 500)
    }, [XodimReducer.current]);

    useEffect(() => {
        if (users.getUserAdmin && !mainBranchId) {
            getXodim({
                id: users.businessId,
                params: {
                    page: page,
                    size: limit,
                    fio: query, roleId
                }
            })
        } else if (users.getUser) {
            getUserByBranch({
                id: mainBranchId ? mainBranchId : users.branchId,
                params: {
                    page: page,
                    size: limit,
                    fio: query, roleId
                }
            })
        }

    }, [XodimReducer.current, page, limit, mainBranchId, query, roleId])

    useEffect(() => {
        setTimeout(() => {
            setLoading(true)
        }, 500)
    }, [XodimReducer.getBoolean])


    useEffect(() => {
        if (users.getRole) {
            getLavozim(users.businessId)
        }
        setLoading(false)
    }, [])


    return (
        <>
                <div className="d-flex justify-content-between align-items-center">
                    <MainHeaderText  text={t('ol.9')}/>
                    {
                        users.addUser ?
                            <Link to={'/main/addUser'}>
                               <ButtonAnt text={t('ol.2')} type={'primary'}/>
                            </Link> : ''
                    }
                </div>
                {
                    users.getUser || users.getUserAdmin ?
                        <CardBody>
                            <div className="col-md-12 gap-2 gap-sm-0 d-flex flex-wrap  align-items-center">
                                <div className="col-12  col-sm-6 col-md-6 col-lg-3 p-sm-2">
                                    <SelectAnt name={t('ol.3')}
                                               onChange={(e) => setMainBranchId(e === "" ? null : e)}
                                               selectList={users.branches} permission={users.getBalanceAdmin}/>
                                </div>
                                {
                                    users.getRole &&
                                    <div className="col-12 col-sm-6  col-md-6 col-lg-3 p-sm-2">
                                        <SelectAnt name={t('ol.3')}
                                                   onChange={(e) => setRoleId(e)}
                                                   selectList={LavozimReducer.roles} permission={users.getBalanceAdmin}/>
                                    </div>
                                }
                                <div className="col-12 col-sm-12  col-md-12 col-lg-6 p-sm-2">
                                    <SearchAnt name={t('ol.73')} onChange={handleQueryChange}/>
                                </div>
                            </div>
                        </CardBody>
                      : ''
                }
                {
                    users.getUserAdmin || users.getUser ?
                        loading ?
                            XodimReducer.users?.list?.length > 0 ?
                                <div>
                                    <Card>
                                        <>
                                            <TableContainer>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Tr</TableCell>
                                                            {/*<TableCell>*/}
                                                            {/*    <Tooltip*/}
                                                            {/*        arrow*/}
                                                            {/*        placement="top"*/}
                                                            {/*        title={t('All')}*/}
                                                            {/*    >*/}
                                                            {/*        <Checkbox*/}
                                                            {/*            checked={selectedAllUsers}*/}
                                                            {/*            indeterminate={selectedSomeUsers}*/}
                                                            {/*            onChange={handleSelectAllUsers}*/}
                                                            {/*        />*/}
                                                            {/*    </Tooltip>*/}
                                                            {/*</TableCell>*/}
                                                            <TableCell>{t('ol.74')}</TableCell>
                                                            <TableCell>{t('ol.75')}</TableCell>
                                                            <TableCell>{t('ol.76')}</TableCell>
                                                            <TableCell>{t('ol.77')}</TableCell>
                                                            <TableCell align="center">{t('ol.20')}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {XodimReducer.users?.list?.map((user, index) => {
                                                            const isInvoiceSelected = selectedItems.includes(
                                                                user.id
                                                            );
                                                            return (
                                                                <TableRow selected={isInvoiceSelected} hover
                                                                          key={user.id}>
                                                                    <TableCell>
                                                                        <Typography variant="h5">
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    {/*<TableCell>*/}
                                                                    {/*    <Checkbox*/}
                                                                    {/*        checked={isInvoiceSelected}*/}
                                                                    {/*        // indeterminate={selectedSomeUsers}*/}
                                                                    {/*        onChange={(e) =>*/}
                                                                    {/*            handleSelectOneInvoice(e, user.id)*/}
                                                                    {/*        }*/}
                                                                    {/*        value={isInvoiceSelected}*/}
                                                                    {/*    />*/}
                                                                    {/*</TableCell>*/}
                                                                    <TableCell>
                                                                        <Typography variant="h5">
                                                                            {user.username}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Box display="flex" alignItems="center">
                                                                            <Avatar
                                                                                sx={{
                                                                                    mr: 1
                                                                                }}
                                                                                src={user?.photoId
                                                                                    ? `${BaseUrl}/attachment/download/${user?.photoId
                                                                                    }` : ''}
                                                                            />
                                                                            <Box>
                                                                                <Typography noWrap variant="subtitle2">
                                                                                    {user.fio}
                                                                                </Typography>
                                                                            </Box>
                                                                        </Box>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Label
                                                                            color={user.roleName === 'Admin' ? 'error' : user.roleName === 'Manager' ? 'info' :
                                                                                user.roleName === 'Employee' ? 'warning' : 'secondary'
                                                                            }>{user.roleName}</Label>
                                                                    </TableCell>
                                                                    <TableCell>{user.phoneNumber}</TableCell>
                                                                    <TableCell align="center">
                                                                        <Tooltip title={t("Ko'rish")} arrow>
                                                                            <Link to={'/main/profil/' + user.id}>
                                                                                <IconButton
                                                                                    color="primary"
                                                                                >
                                                                                    <LaunchTwoToneIcon
                                                                                        fontSize="small"/>
                                                                                </IconButton>
                                                                            </Link>
                                                                        </Tooltip>
                                                                        {
                                                                            users.editUser ?
                                                                                <Tooltip title={t('ol.78')} arrow>
                                                                                    <Link
                                                                                        to={'/main/addUser/' + user.id}>
                                                                                        <IconButton
                                                                                            color="primary"
                                                                                        >
                                                                                            <EditIcon fontSize="small"/>
                                                                                        </IconButton>
                                                                                    </Link>
                                                                                </Tooltip> : ''
                                                                        }
                                                                        {
                                                                            users.deleteUser ?
                                                                                <Tooltip title={t('ol.79')} arrow>
                                                                                    <IconButton
                                                                                        onClick={() => deleteUserById(user.id)}
                                                                                        color="primary"
                                                                                    >
                                                                                        <DeleteTwoToneIcon
                                                                                            fontSize="small"/>
                                                                                    </IconButton>
                                                                                </Tooltip> : ''
                                                                        }
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

                                            <Box p={2}>
                                                <TablePagination
                                                    component="div"
                                                    count={XodimReducer.users?.totalItem}
                                                    onPageChange={handlePageChange}
                                                    onRowsPerPageChange={handleLimitChange}
                                                    page={page}
                                                    rowsPerPageOptions={[5, 10, 15]}
                                                    rowsPerPage={limit}
                                                />
                                            </Box>

                                        </>
                                    </Card>
                                </div> : <div className={'border border-2'}>
                                    <h4 className={'text-center'}>{XodimReducer.message}</h4>
                                </div>
                            : <Loading/> : ''

                }

            <ModalLoading isOpen={saveModal}/>
            <AgreeModal deleteModaltoggle={() => setDeleteModal(prevState => !prevState)} deleteFunc={deleteFunc}
                        deletemodal={deleteModal}/>

        </>
    )
}


export default connect((XodimReducer, users, photoreducer, LavozimReducer), {
    getXodim, getUserByBranch,
    deleteXodim, savephoto, getLavozim
})
(HodimlarRoyhati)


