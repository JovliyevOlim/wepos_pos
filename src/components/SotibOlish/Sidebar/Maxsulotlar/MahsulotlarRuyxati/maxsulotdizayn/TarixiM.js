import React, {useEffect, useState} from 'react';

import {
    Box,
    Typography,
    Divider,
    ToggleButton,
    ToggleButtonGroup,

    styled,
    useTheme, TablePagination, TableContainer, TableRow, TableCell, Tooltip, Checkbox, TableBody, Avatar, TableHead
} from '@mui/material';


import {useTranslation} from 'react-i18next';
import {connect} from "react-redux";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import MaxsulotxisobotReducer from "../../../Xisobotlar/reducer/MaxsulotxisobotReducer";
import moment from "moment";
import 'moment/locale/uz-latn'
import MainHeaderText from "../../../../../Components/MainHeaderText";
import CardBody from "../../../../../Components/CardBody";
import Loading from "../../../../../Loading";
import CommonTable from "../../../../../Components/CommonTable";


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

function TarixiM({MaxsulotlarRoyxariReducer, size, page, changePage, changeRow, MaxsulotxisobotReducer, loading}) {
    const {t} = useTranslation();


    const columns = [
            {
                title: 'Id',
                dataIndex: 'index',
                rowScope: 'row',
                width: '2%',
            },
            {
                title: 'Mahsulot',
                dataIndex: 'productName',
                key: 'productName',
                width: '15%'
            },
            {
                title: t('as.49'),
                dataIndex: 'userFio',
                key: 'userFio',
                width: '12%'
            },
            {
                title: t('as.50'),
                dataIndex: 'branchName',
                key: 'branchName',
                width: '12%',

            },
            {
                title: t('as.51'),
                dataIndex: 'quantity',
                key: 'quantity',
                width: '10%',
                render: (item, value) => <>
                    {
                        value?.oldQuantity > 0 &&
                        <del>{value?.oldQuantity} {value?.measurementName}</del>
                    }
                    <p>{item} {value?.measurementName}</p>
                </>
            },
            {
                title: t('as.52'),
                dataIndex: 'description',
                key: 'description',
                width: '20%',

            },
            {
                title: t('ol.11'),
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (item) => <p className={'m-0'}>{moment(new Date(item)).format('lll')}</p>,
                width: '15%'
            },
        ]
    ;


    return (
        <div>
            <CardBody>
                <div className="col-md-12 d-flex mb-3">
                    <MainHeaderText text={t('as.47')}/>
                </div>
                <Loading spinning={loading}>
                    {
                        MaxsulotxisobotReducer.productWorked?.list?.length > 0 ?
                            <div className="table-responsive">
                                <CommonTable size={size} page={page}
                                             total={MaxsulotxisobotReducer.productWorked?.totalItem}
                                             handleLimitChange={changeRow} columns={columns}
                                             data={MaxsulotxisobotReducer.productWorked?.list}
                                             handlePageChange={changePage} pagination={true}/>
                            </div>
                            : <div>
                                <h4 className={'text-center'}>{MaxsulotlarRoyxariReducer.message}</h4>
                            </div>
                    }
                </Loading>
            </CardBody>
        </div>
    );
}

export default connect((MaxsulotlarRoyxariReducer, MaxsulotxisobotReducer), {})(TarixiM);
