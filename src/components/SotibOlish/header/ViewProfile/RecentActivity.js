import {
    Box,
    Typography,
    Card,
    Avatar,
    useTheme,
    styled,
    Grid,
    IconButton,
    alpha,
    CardActionArea,
    LinearProgress,
    linearProgressClasses,
    ListItemButton
} from '@mui/material';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import users, {userInfo} from "../../../../reducer/users";
import XodimReducer, {getXodim} from "../../Sidebar/Hodimlar/reducer/XodimReducer";
import {BaseUrl} from "../../../../middleware";



const LabelWrapper = styled(Box)(
    ({theme}) => `
    font-size: ${theme.typography.pxToRem(13)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(0.9, 1.5, 0.7)};
    line-height: 1;
  `
);

const CardWrapper1 = styled(Box)(
    ({theme}) => `
      background: ${alpha(theme.colors.primary.main, 0.05)};
  `
);


function RecentActivity({
                            users,
                            match,
                            getXodim,
                            XodimReducer,
                            userInfo,
                            getViewByUserId,
                        }) {
    const {t} = useTranslation();
    const theme = useTheme();
    const [latestHour, setLatestHour] = useState(0)
    const [latestHourUsers, setLatestHourUsers] = useState(null)
    const chart1Options = {
        chart: {
            background: 'transparent',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            }
        },
        theme: {
            mode: theme.palette.mode === 'dark' ? 'light' : 'dark'
        },
        stroke: {
            colors: [theme.colors.warning.main],
            width: 3
        },
        colors: [theme.colors.warning.main],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                columnWidth: '60%'
            }
        },
        markers: {
            size: 0
        },
        tooltip: {
            x: {
                show: false
            },
            y: {
                title: {
                    formatter() {
                        return '';
                    }
                }
            },
            marker: {
                show: false
            }
        },
        yaxis: {
            show: false
        },
        legend: {
            show: false
        }
    };
    const chart1Data = [
        {
            name: 'Foydali koyfitsenti',
            data: [47, 38, 56, 24, 56, 24, 65]
        }
    ];

    const Box1Options = {
        chart: {
            background: 'transparent',
            toolbar: {
                show: false
            },
            sparkline: {
                enabled: true
            },
            zoom: {
                enabled: false
            }
        },
        colors: [theme.colors.warning.main],
        dataLabels: {
            enabled: false
        },
        theme: {
            mode: theme.palette.mode
        },
        stroke: {
            show: true,
            colors: [theme.colors.warning.main],
            curve: 'smooth',
            width: 2
        },
        legend: {
            show: false
        },
        labels: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
            'Last Week',
            'Last Month',
            'Last Year'
        ],
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false,
            min: 0
        }
    };
    const Box1Data = [
        {
            name: 'Sales',
            data: [32, 52, 45, 32, 54, 56, 28, 25, 36, 62]
        }
    ];
    const [userId, setUserId] = useState(null)
    const [mainBranch, setMainBranch] = useState(null)

    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'))


    return (
        <div className={'p-2 col-md-12 mb-3'}>

            <div className={'colorback'}>
                <Grid
                    sx={{
                        px: 4
                    }}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={4}
                >

                    <Grid item md={12} xs={12}>
                        <Card variant="outlined">
                            <CardWrapper1 style={{paddingBottom: "10px"}}
                                          sx={{

                                              background: `${theme.colors.gradients.purple3}`,
                                              textAlign: 'center',
                                              display: 'flex',
                                              flexDirection: 'column',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              position: 'relative',
                                              pt: 3,
                                              px: 3,
                                              pb: 7
                                          }}
                            >
                                {
                                    user.photoId ?
                                        <img style={{maxWidth: '200px', maxHeight: '200px', borderRadius: '50%'}}
                                             src={`${BaseUrl}/attachment/download/${user.photoId}`}
                                             alt=""/> :
                                        <Avatar
                                            sx={{
                                                width: `${theme.spacing(14)}`,
                                                height: `${theme.spacing(14)}`,
                                                mb: 1.5,
                                                border: `${theme.colors.alpha.white[100]} solid 4px`,
                                                boxShadow: `0 2rem 8rem 0 ${alpha(
                                                    theme.colors.alpha.black[100],
                                                    0.05
                                                )}, 
                                0 0.6rem 1.6rem ${alpha(
                                                    theme.colors.alpha.black[100],
                                                    0.15
                                                )}, 
                                0 0.2rem 0.2rem ${alpha(
                                                    theme.colors.alpha.black[100],
                                                    0.1
                                                )}`
                                            }}

                                            src={'/static/images/avatars/3.jpg'}
                                        />
                                }
                                <Typography
                                    color="text.primary"
                                    underline="none"
                                    sx={{
                                        marginTop: "20px",
                                        transition: `${theme.transitions.create(['color'])}`,
                                        fontSize: `${theme.typography.pxToRem(17)}`,

                                        '&:hover': {
                                            color: `${theme.colors.primary.main}`
                                        }
                                    }}
                                    variant="h4"
                                >
                                    {user.fio}
                                </Typography>
                                <Box mt={1} mb={1.5}>
                                    Lavozimi
                                    <LabelWrapper
                                        sx={{
                                            background: `${theme.colors.error.main}`,
                                            color: `${theme.palette.getContrastText(theme.colors.error.dark)}`
                                        }}
                                    >
                                        {user.roleName}
                                    </LabelWrapper>
                                </Box>
                            </CardWrapper1>
                        </Card>
                    </Grid>
                </Grid>

            </div>

        </div>
    );
}

export default connect((users, XodimReducer), {
    userInfo,
    getXodim,
})(RecentActivity);
