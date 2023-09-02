import React, { useState } from 'react';

import {
    Box,
    Card,
    Typography,

    Button,

    Divider,
    ToggleButton,
    ToggleButtonGroup,

    styled,
    useTheme, TablePagination, TableContainer, TableRow, TableCell, Tooltip, Checkbox, TableBody, Avatar, TableHead
} from '@mui/material';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import { useTranslation } from 'react-i18next';
import Scrollbar from '../../../../../../components/Scrollbar';
import {connect} from "react-redux";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import {dayAndMonth} from "../../../../../../util";
import MaxsulotxisobotReducer  from "../../../Xisobotlar/reducer/MaxsulotxisobotReducer";
import {BaseUrl} from "../../../../../../middleware";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import moment from "moment";
import 'moment/locale/uz-latn'

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(0.5, 1)};
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
function TarixiM({MaxsulotlarRoyxariReducer,row,page,changePage,changeRow,MaxsulotxisobotReducer}) {
  const { t } = useTranslation();
  const theme = useTheme();




  return (
    <Card>
      <Box
        p={2.5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography gutterBottom variant="h4">
            {t('Zaxira tarixi')}
          </Typography>

        </Box>
      </Box>
      <Divider />
      {MaxsulotxisobotReducer.productWorked?.list?.length> 0 ?
        <>
            <TableContainer>
                <TableHeadWrapper>
                    <TableRow>
                        <TableCell>T/R</TableCell>
                        <TableCell align="left">Maxsulot</TableCell>
                        <TableCell align="left">Xodim</TableCell>
                        <TableCell align="left">Filial</TableCell>
                        <TableCell align="center">Miqdori</TableCell>
                        <TableCell align="center">Jarayon</TableCell>
                        <TableCell align="center">Sana</TableCell>
                    </TableRow>
                </TableHeadWrapper>
                <TableBody>
                    {
                        MaxsulotxisobotReducer.productWorked?.list?.map((item, index) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Box>
                                            <Typography
                                                variant="h4">#{(page * row) + index + 1}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align={'start'}>{item?.productName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item?.userFio}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item?.branchName}
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
                                            {
                                                item?.oldQuantity > 0 && <del>{item?.oldQuantity} {item?.measurementName}</del>
                                            }
                                            <p>{item?.quantity} {item?.measurementName}</p>
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
                                                {item?.description}
                                            </Typography>
                                        </div>
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
                                                {moment(new Date(item?.createdAt)).format('LLLL')}
                                            </Typography>

                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </TableContainer>

            <Divider />
          <Box
            p={2}
            sx={{
              textAlign: 'center'
            }}
          >
              <TablePagination
                  labelRowsPerPage={'Qatori'}
                  count={MaxsulotxisobotReducer.productWorked?.totalItem}
                  page={page}
                  onPageChange={changePage}
                  rowsPerPage={row}
                  rowsPerPageOptions={[5,10,15]}
                  onRowsPerPageChange={changeRow}
              />
          </Box>
        </>:''
      }
    </Card>
  );
}

export default connect((MaxsulotlarRoyxariReducer,MaxsulotxisobotReducer),{
}) (TarixiM);
