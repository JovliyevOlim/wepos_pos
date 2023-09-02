import {
  Grid,
  Box,
  CircularProgress,
  Card,
  Typography,
  alpha,
  circularProgressClasses,
  styled,
  useTheme
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {useEffect, useState} from "react";
import infoReducer from "../../../../../reducer/infoReducer";

const CardBorderBottom = styled(Card)(
  () => `
    border-bottom: transparent 5px solid;
  `
);

function Block3({users,infoReducer}) {
  const { t } = useTranslation();
  const theme = useTheme();

  const {balance,fromCustomer,outlay,profit,purchase,purchaseDebt,purchasePaid,toCustomer,toSupplier,trade,tradeDebt,tradePaid} = infoReducer.infoObject

  return (

    <Grid container spacing={1}>


        <Grid item xs={12} sm={6} md={3}>
        <CardBorderBottom
          sx={{
            borderBottomColor: `${theme.colors.success.main}`,
            boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.success.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.success.main, 0.15)}
                    `,
            display: 'flex',
            alignItems: 'center',
            p: 2
          }}
        >
          <Box flexGrow={1} mr={2}>
            <Typography
              component="div"
              fontWeight="bold"
              sx={{
                pb: 1
              }}
              variant="caption"
              color={theme.colors.success.main}
            >
              Kassa
            </Typography>
            <Typography
              sx={{
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center'
              }}
              variant="h3"
              color={theme.colors.success.main}
            >
             {balance} so'm
            </Typography>
          </Box>
        </CardBorderBottom>
      </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.success.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.success.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.success.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.success.main}
                    >
                        Savdo
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.success.main}

                    >
                        {trade} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.success.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.success.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.success.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.success.main}
                    >
                        Savdodagi To'lov
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.success.main}

                    >
                        {tradePaid} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.info.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.info.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.info.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.info.main}
                    >
                        Savdodagi qarz
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.info.main}

                    >
                        {tradeDebt} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.success.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.success.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.success.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.success.main}
                    >
                        Foyda
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.success.main}

                    >
                        {profit} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.primary.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.primary.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.primary.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.primary.main}
                    >
                        Xarid
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.primary.main}
                    >
                        {purchase} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.primary.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.primary.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.primary.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.primary.main}
                    >
                        Xariddagi qilingan to'lov
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.primary.main}

                    >
                        {purchasePaid} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.info.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.info.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.info.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.info.main}
                    >
                        Xariddagi qarzi
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.info.main}

                    >
                        {purchaseDebt} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <CardBorderBottom
          sx={{
            borderBottomColor: `${theme.colors.success.main}`,
            boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.success.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.success.main, 0.15)}
                    `,
            display: 'flex',
            alignItems: 'center',
            p: 2
          }}
        >
          <Box flexGrow={1} mr={2}>
            <Typography
              component="div"
              fontWeight="bold"
              sx={{
                pb: 1
              }}
              variant="caption"
              color={theme.colors.success.main}
            >
              Mijozlardan Olingan Pul
            </Typography>
            <Typography
              sx={{
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center'
              }}
              variant="h3"
              color={theme.colors.success.main}

            >
                {fromCustomer} so'm
            </Typography>
          </Box>
        </CardBorderBottom>
      </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.warning.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.warning.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.warning.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.warning.main}
                    >
                        Mijozga berilgan summa
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.warning.main}

                    >
                        {toCustomer} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.warning.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.warning.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.warning.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.warning.main}
                    >
                        Diller berilgan summa
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.warning.main}
                    >
                        {toSupplier} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <CardBorderBottom
                sx={{
                    borderBottomColor: `${theme.colors.error.main}`,
                    boxShadow: `
                    0 .7rem 1rem ${alpha(theme.colors.error.main, 0.08)},
                    0 .25rem .7rem ${alpha(theme.colors.error.main, 0.15)}
                    `,
                    display: 'flex',
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Box flexGrow={1} mr={2}>
                    <Typography
                        component="div"
                        fontWeight="bold"
                        sx={{
                            pb: 1
                        }}
                        variant="caption"
                        color={theme.colors.error.main}
                    >
                        Xarajat
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                        variant="h3"
                        color={theme.colors.error.main}

                    >
                        {outlay} so'm
                    </Typography>
                </Box>
            </CardBorderBottom>
        </Grid>
    </Grid>
  );
}

export default connect((users,infoReducer)) (Block3);
