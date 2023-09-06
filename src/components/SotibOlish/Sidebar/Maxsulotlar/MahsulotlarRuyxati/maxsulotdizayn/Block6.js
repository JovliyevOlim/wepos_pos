import { Fragment } from 'react';

import {
    Box,
    CardHeader,
    Avatar,
    Card,
    Link,
    ListItemAvatar,
    ListItemText,
    Divider,
    List,
    ListItem,
    Typography,
    IconButton,
    alpha,
    styled,
    useTheme, Grid, Stack
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import Scrollbar from '../../../../../Scrollbar';
import Block44 from "./Block44";
import Text from "../../../../../Text";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import Label from './Label/index'
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import MaxsulotlarRoyxariReducer  from "../../reducer/MaxsulotlarRoyxariReducer";
import {BaseUrl} from "../../../../../../middleware";


const CardWrapper = styled(Card)(
  ({ theme }) => `
      background: ${alpha(theme.colors.alpha.black[10], 0.05)};
      border-radius: 0;
  `
);

const LinkHover = styled('a')(
  ({ theme }) => `
    transition: ${theme.transitions.create([
      'transform',
      'opacity',
      'box-shadow'
    ])};
    transform: translateY(0px);
    display: block;
    opacity: 1;

    &:hover {
        opacity: .9;
        transform: translateY(-4px);
    }
  `
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    transition: ${theme.transitions.create(['transform', 'background'])};
    transform: scale(1);
    transform-origin: center;

    &:hover {
        transform: scale(1.1);
    }
  `
);

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root:last-of-type + .MuiDivider-root {
          display: none;
      }
  `
);

function Block6({
                    users,
                    MaxsulotlarRoyxariReducer,
                }) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
        <Block44></Block44>

      <CardHeader
        subheader={
            <Typography variant="subtitle2" textAlign="center">
              {t('as.31')}
            </Typography>
        }
      />
      <Divider />
      <Box
        sx={{
          height: 385
        }}
      >
        <Scrollbar>
          <ListWrapper disablePadding>
            { MaxsulotlarRoyxariReducer.productView  && MaxsulotlarRoyxariReducer.productView?.productManyGetDtoList?.length > 0  ?
                MaxsulotlarRoyxariReducer.productView?.productManyGetDtoList?.map((item) => (
              <Fragment key={item.id}>
                <ListItem
                  sx={{
                    display: { xs: 'block', md: 'flex' },
                    py: 1.5,
                    px: 2
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      mr: 2,
                      mb: { xs: 2, md: 0 }
                    }}
                  >
                    <LinkHover href="#">
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 120,
                          height: 'auto'
                        }}
                        alt={item.name}
                        src={`${BaseUrl}/attachment/download/${item.photoId}`}
                      />
                    </LinkHover>
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          display: 'block',
                          mb: 1
                        }}
                        noWrap
                        color="text.primary"
                        variant="h4"
                        href="#"
                      >
                        {item?.name} <br/>
                          {item?.barcode}
                      </Typography>
                    }
                    secondary={
                        <Box>
                            <IconButtonWrapper
                                sx={{
                                    backgroundColor: `${theme.colors.primary.main}`,
                                    color: `${theme.palette.getContrastText(
                                        theme.colors.primary.main
                                    )}`,
                                    transition: `${theme.transitions.create(['all'])}`,

                                    'Qolgan miqdor': {
                                        backgroundColor: `${theme.colors.primary.main}`,
                                        color: `${theme.palette.getContrastText(
                                            theme.colors.primary.main
                                        )}`
                                    }
                                }}
                                size="small"
                            >
                                <Typography>
                                    {t('as.32')}
                                </Typography>
                                <Typography>
                                    <b>{item.amount} {item.measurementName}</b>
                                </Typography>

                            </IconButtonWrapper>
                        </Box>
                    }
                  />
                  <Box
                    component="span"
                    sx={{
                      display: { xs: 'none', md: 'inline-block' }
                    }}
                  >
                      <Box display={'flex'} flexDirection={'column'} gap={1}>
                          <Label color="error"> {t('as.33')} {item.buyPrice} {t('as.21')}</Label>
                          <Label color="primary">{t('as.34')} {item.salePrice} {t('as.21')}</Label>
                          <Label color="success"> {t('as.35')} {item.grossPrice} {t('as.21')}</Label>
                      </Box>
                  </Box>
                </ListItem>
                <Divider />
              </Fragment>
            )) :<Typography  textAlign={'center'}>
                    <b>{t('as.36')}</b>
                </Typography>}
          </ListWrapper>
        </Scrollbar>
      </Box>

    </Card>
  );
}

export default connect((users, MaxsulotlarRoyxariReducer), {
})(Block6)
