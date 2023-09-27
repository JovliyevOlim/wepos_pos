import './HodimlarRoyhati.css';
import {Link, useHistory} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import XodimReducer, {
    getXodim,
    deleteXodim, getUserByBranch
} from "../reducer/XodimReducer";
import {useTranslation} from "react-i18next";
import Loading from "../../../../Loading";
import ModalLoading from "../../../../ModalLoading";
import {BaseUrl} from "../../../../../middleware";
import photoreducer, {savephoto} from "../../../../../reducer/photoreducer";
import AgreeModal from "../../../../AgreeModal";
import LavozimReducer, {getLavozim} from "../reducer/LavozimReducer";
import MainHeaderText from "../../../../Components/MainHeaderText";
import CardBody from "../../../../Components/CardBody";
import SelectAnt, {ButtonAnt, SearchAnt, TableButton} from "../../../../Components/SelectAnt";
import CommonTable from "../../../../Components/CommonTable";
import {Avatar} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";




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
    const history = useHistory()
    const [mainBranchId, setMainBranchId] = useState(null)
    const [roleId, setRoleId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const columns = [
        {
            title: 'Id',
            dataIndex: 'index',
            rowScope: 'row',
            width: 20,
        },
        {
            title: t('ol.74'),
            width: 50,
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: t('ol.75'),
            width: 80,
            dataIndex: 'fio',
            key: 'fio',
            render: (item, values) => <div className={'d-flex gap-2 justify-content-between align-items-center'}>
                <div>
                    {
                        values.photoId ?
                            <Avatar size="large" src={`${BaseUrl}/attachment/download/${values?.photoId}`}
                                    className={'d-flex justify-content-center align-items-center'}/>
                            : <Avatar>{item.substring(0, 1).toUpperCase()}</Avatar>
                    }
                </div>
                <div>
                    <p className={'m-0'}>{item}</p>
                </div>
            </div>,
        },
        {
            title: t('ol.76'),
            dataIndex: 'roleName',
            key: 'roleName',
            width: 50,
        },
        {
            title: t('ol.77'),
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            width: 100,
        },
        {
            title: t('ol.20'),
            key: 'operation',
            width: 150,
            render: (item, values) => <div className={'d-flex justify-content-center gap-1 flex-wrap'}>
                {/*<TableButton type={'primary'} title={'Ko\'rish'} onClick={() => {*/}
                {/*    history.push('/main/profil/' + values.id)*/}
                {/*}*/}
                {/*} icon={<EyeOutlined/>}/>*/}
                {
                    users.editUser &&
                    <ButtonAnt text={t('ol.78')} type={'primary'} onClick={() => {
                        history.push('/main/addUser/' + values.id)
                    }
                    } icon={<EditOutlined/>}/>
                }
                {
                    users.deleteUser && <ButtonAnt text={t('ol.79')} danger={true} type={'primary'} onClick={() => {
                        deleteUserById(values.id)
                    }
                    } icon={<DeleteOutlined/>}/>
                }

            </div>,
        },
    ];


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

    const handlePageChange = (newPage) => {
        setPage(newPage - 1)
    };
    const handleLimitChange = (event, size) => {
        setPage(0)
        setLimit(parseInt(size));
    };
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
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
                <MainHeaderText text={t('ol.9')}/>
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
                            <CardBody>
                                <div className="table-responsive mb-4 table-wrapper-scroll-y">
                                <CommonTable data={XodimReducer.users?.list} columns={columns} total={XodimReducer.users?.totalItem}
                                             page={page} size={limit} handlePageChange={handlePageChange} pagination={true}
                                             handleLimitChange={handleLimitChange}
                                />
                                </div>
                            </CardBody>: <div className={'border border-2'}>
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


