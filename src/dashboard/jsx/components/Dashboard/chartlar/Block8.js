import React, {Fragment, useEffect, useState} from 'react';

import {
    Box,
    ListItemAvatar,
    ListItemText,
    Divider,
    List,
    ListItem,
    Card,
    Typography,
    IconButton,
    Button,
    Avatar,
    styled,
    useTheme, TablePagination
} from '@mui/material';

import {useTranslation} from 'react-i18next';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import Chart from 'react-apexcharts';
import BackspaceIcon from '@mui/icons-material/Backspace';
import Text from '../../../../../../src/components/Text';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import Scrollbar from "../../../../../components/Scrollbar";
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import infoReducer, {getInfoUserByTradeByBranch} from "../../../../../reducer/infoReducer";
import {BaseUrl} from "../../../../../middleware";
import formatDate, {formatDateMinus, formatDateYear} from "../../../../../util";

const CardActions = styled(Box)(
    ({theme}) => `
    position: absolute;
    right: ${theme.spacing(1.5)};
    top: ${theme.spacing(1.5)};
    z-index: 7;
  `
);

const ListWrapper = styled(List)(
    () => `
    .MuiDivider-root:first-of-type {
        display: none;
    }
  `
);

function Block8({users, mainBranchId, getInfoUserByTradeByBranch,infoReducer}) {
    const {t} = useTranslation();
    const theme = useTheme();


    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(5);
    const [date, setDate] = useState(new Date());

    const handlePageChange = (_event, newPage) => {
        setPage(newPage);
    };
    const handleLimitChange = (event) => {
        setPage(0)
        setLimit(parseInt(event.target.value));
    };

    useEffect(() => {
        if (users.getInfoAdmin || users.getInfo){
            getInfoUserByTradeByBranch({
                id: mainBranchId ? mainBranchId : users.businessId,
                params: {
                    date:formatDateMinus(date),
                    page,
                    size:limit,
                }
            })
        }
    }, [page,limit,mainBranchId,date]);

    useEffect(() => {
        setPage(0)
    },[limit,mainBranchId,date])


    return (
        <Card>
            <Box p={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant="h2" sx={{fontSize: `${theme.typography.pxToRem(19)}`}}>
                    Sotuvchilar reytingi
                </Typography>
                <Box display={'flex'} gap={1} justifyContent={'space-between'} alignItems={'center'}>
                    <input value={formatDateMinus(date)} onChange={(e)=>setDate(e.target.value)} type="date" className={'form-control'}/>
                </Box>
            </Box>
            <Box sx={{height:'300px',padding:'20px'}}>
                <Scrollbar>
                    <ListWrapper disablePadding>
                        {
                            infoReducer.infoTradeUser?.list?.length > 0 ?
                                infoReducer.infoTradeUser?.list?.map((item, index) =>
                                    <div key={index}>
                                    <div className={'p-2 d-flex justify-content-between align-items-center mb-2'}>
                                        <Box display="flex" alignItems="center">
                                            <Avatar
                                                sx={{
                                                    mr: 1
                                                }}
                                                src={item?.photoId
                                                    ? `${BaseUrl}/attachment/download/${item?.photoId}` : ''}
                                            />
                                            <Box>
                                                {item?.userFio}
                                            </Box>
                                        </Box>
                                        <h5>{item?.trade} {t('Bosh1.sum')}</h5>
                                    </div>
                                </div>) : <div><h4 className={'text-center'}>NOT FOUND</h4></div>
                        }

                        <Box p={2}>
                            <TablePagination
                                component="div"
                                count={infoReducer.infoTradeUser?.totalItem}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleLimitChange}
                                page={page}
                                rowsPerPageOptions={[5, 10, 15]}
                                rowsPerPage={limit}
                            />
                        </Box>
                    </ListWrapper>
                </Scrollbar>
            </Box>
        </Card>
    );
}

export default  connect((users, infoReducer), {getInfoUserByTradeByBranch})(Block8);
