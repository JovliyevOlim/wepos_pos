import { Box, Card, Grid, Typography, Button, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Chart from 'react-apexcharts';
import {connect} from "react-redux";
import users from "../../../../../reducer/users";
import {useEffect, useState} from "react";

function Block9({

                })  {
  const { t } = useTranslation();
  const theme = useTheme();





    const [debt,setDebt] = useState([])
    const [trade,setTrade] = useState([])
    const [purchase,setPurchase] = useState([])
    const [myDebt,setMyDebt] = useState([])


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
    grid: {
      padding: {
        right: 6,
        left: 6
      }
    },
    stroke: {
      colors: [theme.colors.primary.main],
      curve: 'smooth',
      width: 3
    },
    colors: [theme.colors.primary.main],
    markers: {
      size: 0
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter() {
            return 'Jami haridlar:';
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
      name: 'Daily visitors',
      data: purchase
    }
  ];

  const chart2Options = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      padding: {
        right: 6,
        left: 6
      }
    },
    theme: {
      mode: theme.palette.mode === 'dark' ? 'light' : 'dark'
    },
    stroke: {
      colors: [theme.colors.alpha.trueWhite[100]],
      curve: 'smooth',
      width: 3
    },
    colors: [theme.colors.alpha.trueWhite[100]],
    markers: {
      size: 0
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter() {
            return 'Jami nasiyalar';
          }
        }
      },
      marker: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };
  const chart2Data = [
    {
      name: 'Jami nasiyalar',
      data: debt
    }
  ];

  const chart3Options = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      padding: {
        right: 6,
        left: 6
      }
    },
    theme: {
      mode: theme.palette.mode === 'dark' ? 'light' : 'dark'
    },
    stroke: {
      colors: [theme.colors.alpha.trueWhite[100]],
      curve: 'smooth',
      width: 3
    },
    colors: [theme.colors.alpha.trueWhite[100]],
    markers: {
      size: 0
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter() {
            return 'Jami qarzlarim';
          }
        }
      },
      marker: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };
  const chart3Data = [
    {
      name: 'Jami savdo',
      data: myDebt
    }
  ];

  const chart4Data = [
    {
      name: 'Tests',
      data: trade
    }
  ];
  const chart4Options = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      }
    },
    grid: {
      padding: {
        right: 6,
        left: 6
      }
    },
    theme: {
      mode: theme.palette.mode === 'dark' ? 'light' : 'dark'
    },
    stroke: {
      colors: [theme.colors.alpha.trueWhite[100]],
      curve: 'smooth',
      width: 3
    },
    colors: [theme.colors.alpha.trueWhite[100]],
    markers: {
      size: 0
    },
    tooltip: {
      fixed: {
        enabled: true
      },
      x: {
        show: false
      },
      y: {
        title: {
          formatter() {
            return 'Jami savdo';
          }
        }
      },
      marker: {
        show: false
      }
    },
    legend: {
      show: false
    }
  };


  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            p: 3
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography gutterBottom variant="h3">
                {/*{accountreducer.Purchases?.myPurchase?parseInt(accountreducer.Purchases.myPurchase).toFixed(0):0} so'm*/}

              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: `${theme.typography.pxToRem(17)}`
                }}
              >
                {t('Bosh1.jamixarid')}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                py: 0.6,
                fontSize: `${theme.typography.pxToRem(11)}`
              }}
            >
              {t('View all')}
            </Button>
          </Box>
          <Box>
            <Chart
              options={chart1Options}
              series={chart1Data}
              type="line"
              height={130}
            />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            p: 3,
            background: `${theme.colors.gradients.blue4}`
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                variant="h3"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[100]}`
                }}
              >
                {/*{accountreducer.Purchases?.tradersDebt} so'm*/}

              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[70]}`,
                  fontSize: `${theme.typography.pxToRem(17)}`
                }}
              >
                {t('Bosh1.jaminasiya')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Chart
              options={chart2Options}
              series={chart2Data}
              type="line"
              height={130}
            />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            p: 3,
            background: `${theme.colors.error.main}`
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                variant="h3"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[100]}`
                }}
              >
                {/*{accountreducer.Purchases?.myDebt} so'm*/}

              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[70]}`,
                  fontSize: `${theme.typography.pxToRem(17)}`
                }}
              >
                {t('Bosh1.jamiqarz')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Chart
              options={chart3Options}
              series={chart3Data}
              type="line"
              height={130}
            />
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card
          sx={{
            p: 3,
            background: `${theme.colors.success.main}`
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                variant="h3"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[100]}`
                }}
              >
                {/*{accountreducer.Purchases?.myTrade? parseInt(accountreducer.Purchases.myTrade).toFixed(0):0} so'm*/}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[70]}`,
                  fontSize: `${theme.typography.pxToRem(17)}`
                }}
              >
                {t('Bosh1.jamisavdo')}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Chart
              options={chart4Options}
              series={chart4Data}
              type="line"
              height={130}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default connect ((users), {})(Block9)
