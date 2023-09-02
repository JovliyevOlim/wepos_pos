import {
  Grid,
  Box,
  Card,
  Typography,
  Divider,
  Tooltip,
  Stack,
  IconButton,
  Avatar,
  alpha,
  styled,
  useTheme
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';

import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import AddAlertTwoToneIcon from '@mui/icons-material/AddAlertTwoTone';
import Text from '../../../../../../components/Text'
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';

import {connect} from "react-redux";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import users from "../../../../../../reducer/users";
import FirmaReducer, {getFirma} from "../../reducer/FirmaReducer";

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    padding: ${theme.spacing(1.5)};
    color: ${theme.palette.primary.contrastText};
    transform: translateY(0px);
    transition: ${theme.transitions.create([
      'color',
      'transform',
      'background'
    ])};
    
    .MuiSvgIcon-root {
        transform: scale(1);
        transition: ${theme.transitions.create(['transform'])};
    }

    &:hover {
        background: initial;
        transform: translateY(-2px);

        .MuiSvgIcon-root {
            transform: scale(1.2);
        }
    }
  `
);

function Block1({active,toggle,MaxsulotlarRoyxariReducer}){
  const { t } = useTranslation();
  const theme = useTheme();
    const {measurementName} = MaxsulotlarRoyxariReducer.productView
    const {amount,tradeQuantity,purchaseQuantity,backQuantity,profit,salePrice,buyPrice,tradePrice,lossQuantity} = MaxsulotlarRoyxariReducer.productViewExtra
  return (
    <Grid container spacing={4} style={{marginRight:"15px"}}>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 2.5,
              background: `${theme.colors.gradients.purple3}`
          }}
        >
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                component="div"
                variant="caption"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[70]}`
                }}
              >
                {t('Bazada qolgan miqdori')}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[100]}`
                }}
              >
                  {amount} {measurementName}
              </Typography>
            </Box>
            <Avatar
              variant="rounded"
              sx={{
                width: `${theme.spacing(7)}`,
                height: `${theme.spacing(7)}`,
                background: `${theme.colors.alpha.trueWhite[100]}`,
                color: `${theme.colors.success.main}`
              }}
            >
              <AccountBoxTwoToneIcon />
            </Avatar>
          </Box>

        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 2.5,
            background: `${theme.colors.gradients.orange1}`

          }}
        >
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                component="div"
                variant="caption"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[70]}`
                }}
              >
                {t('Sotilgan miqdori')}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[100]}`
                }}
              >
                  {tradeQuantity} {measurementName}
              </Typography>
            </Box>
            <Avatar
              variant="rounded"
              sx={{
                width: `${theme.spacing(7)}`,
                height: `${theme.spacing(7)}`,
                background: `${theme.colors.alpha.trueWhite[100]}`,
                color: `${theme.colors.warning.main}`
              }}
            >
              <ThumbUpTwoToneIcon />
            </Avatar>
          </Box>

        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 2.5,
            background: `${theme.colors.gradients.green2}`
          }}
        >
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                component="div"
                variant="caption"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[70]}`
                }}
              >
                {t('Harid qilingan miqdori')}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[100]}`
                }}
              >
                  {purchaseQuantity} {measurementName}
              </Typography>
            </Box>
            <Avatar
              variant="rounded"
              sx={{
                width: `${theme.spacing(7)}`,
                height: `${theme.spacing(7)}`,
                background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`
              }}
            >
              <AddAlertTwoToneIcon />
            </Avatar>
          </Box>

        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            p: 2.5,
            background: `#ff4b4b`
          }}
        >
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography
                gutterBottom
                component="div"
                variant="caption"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[70]}`
                }}
              >
                {t('Yo\'qotilgan miqdori')}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: `${theme.colors.alpha.trueWhite[100]}`
                }}
              >
                  {lossQuantity} {measurementName}
              </Typography>
            </Box>
            <Avatar
              variant="rounded"
              sx={{
                width: `${theme.spacing(7)}`,
                height: `${theme.spacing(7)}`,
                background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`
              }}
            >
              <AddAlertTwoToneIcon />
            </Avatar>
          </Box>

        </Card>
      </Grid>


      <Grid item xs={12}>
        <Card>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            alignItems="stretch"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={0}
          >
            <Box
              display="flex"
              flex={1}
              flexWrap={'wrap'}
              justifyContent="space-evenly"
              alignItems="stretch"
            >
              <Box
                p={3}
                sx={{
                  textAlign: 'center'
                }}
              >
                <Text color="warning">
                  <MonetizationOnTwoToneIcon />
                </Text>
                <Typography variant="subtitle2">{t('Qolgan maxsulot olish narxida')}</Typography>
                  <Typography variant="h5">{buyPrice} so'm</Typography>

              </Box>
              <Box
                p={3}
                sx={{
                  textAlign: 'center'
                }}
              >
                <Text color="success">
                  <PersonTwoToneIcon />
                </Text>
                <Typography variant="subtitle2">{t('Qolgan maxsulot sotish narxida')}</Typography>
                  <Typography variant="h5">{salePrice} so'm</Typography>

              </Box>
            </Box>

              <Box
                  display="flex"
                  flex={1}
                  flexWrap={'wrap'}
                  justifyContent="space-evenly"
                  alignItems="stretch"
              >
                  <Box
                      p={3}
                      sx={{
                          textAlign: 'center'
                      }}
                  >
                      <Text color="warning">
                          <MonetizationOnTwoToneIcon />
                      </Text>
                      <Typography variant="subtitle2">{t('Sotilgan miqdor summasi')}</Typography>
                      <Typography variant="h5">{tradePrice} so'm</Typography>

                  </Box>
                  <Box
                      p={3}
                      sx={{
                          textAlign: 'center'
                      }}
                  >
                      <Text color="success">
                          <PersonTwoToneIcon />
                      </Text>
                      <Typography variant="subtitle2">{t('Umumiy daromad summasi')}</Typography>
                      <Typography variant="h5">{profit} so'm</Typography>

                  </Box>
              </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer), {
    getFirma
})(Block1)

