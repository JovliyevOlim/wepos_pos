import {
    CardContent,
    Box,
    Divider,
    Link,
    Card,
    Typography,
    Grid,
    Button,
    IconButton,
    styled,
    useTheme, Stack
} from '@mui/material';

import {useTranslation} from 'react-i18next';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import Block6 from "./Block6";
import MonthlyGoalsTarget from "./MonthlyGoalsTarget";
import React from "react";
import {Label} from "reactstrap";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import FirmaReducer, {getFirma} from "../../reducer/FirmaReducer";
import Imagecom from "../../../../../Imagecom";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import Text from "../../../../../Text";

const CardActions = styled(Box)(
    ({theme}) => `
    position: absolute;
    right: ${theme.spacing(2)};
    top: ${theme.spacing(2)};
    z-index: 7;
  `
);

const LinkHover = styled(Box)(
    ({theme}) => `
    display: inline-block;
    transform: scale(1);
    transition: ${theme.transitions.create(['transform'])};

    &:hover {
        transform: scale(1.1);
    }
  `
);

const Dot = styled(Box)(
    ({theme}) => `
    transform: scale(1);
    transition: ${theme.transitions.create(['transform', 'box-shadow'])};
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: ${theme.spacing(2, 0.5)};
    border: ${theme.colors.alpha.white[100]} solid 1px;
    transform-origin: center;
    border-radius: 50px;

    &.active,
    &:hover {
        transform: scale(1.3);
        box-shadow: 0 0 0 2px ${theme.colors.primary.main};
    }
  `
);

function Block3({MaxsulotlarRoyxariReducer}) {
    const {t} = useTranslation();
    const theme = useTheme();
    const {name, photoId, salePrice, measurementName, many} = MaxsulotlarRoyxariReducer.productView
    const {average,day} = MaxsulotlarRoyxariReducer.productViewExtra

    function FindPercent() {
        let number = 0
        if (MaxsulotlarRoyxariReducer.productView) {
            let averageNumber = MaxsulotlarRoyxariReducer?.productView?.productManyGetDtoList?.length
            let totalSalePrice = 0
            MaxsulotlarRoyxariReducer.productView.productManyGetDtoList?.map(item => {
                totalSalePrice += item.salePrice
            })
            number = totalSalePrice/averageNumber
        }
        return number
    }


    return (

        <Grid container spacing={4} alignItems={'stretch'}>
            <Grid item xs={12} md={4}>
                <Card
                    sx={{
                        position: 'relative'
                    }}
                >
                    <CardContent
                        sx={{
                            p: 3,
                            textAlign: 'center'
                        }}
                    >

                        <div className={'col-md-12'}>
                            {
                                photoId === null ?
                                    <Imagecom/> :
                                    <Imagecom id={photoId}/>

                            }
                        </div>
                        <Typography
                            sx={{
                                pt: 2,
                                pb: 1
                            }}
                            variant="h4"
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mb: 2,
                                px: 2,
                                lineHeight: 1.5
                            }}
                        >
                            {t('as.25')}
                        </Typography>
                        <Label style={{background: "#deffd2", padding: "5px", borderRadius: "5%"}} color="primary">
                           {t('as.26')}
                            {
                                !many ?
                                    <b>{salePrice} {t('as.27')} </b>
                                    : <b>{FindPercent()} {t('as.27')} </b>

                            }

                        </Label>
                    </CardContent>
                    <MonthlyGoalsTarget></MonthlyGoalsTarget>
                </Card>
            </Grid>
            <Grid item xs={12} md={8}>
                <Block6></Block6>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        justifyContent="center"
                        alignItems="stretch"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={0}
                    >
                        <Box
                            display="flex"
                            flex={1}
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
                                    <MonetizationOnTwoToneIcon/>
                                </Text>
                                <Typography variant="subtitle2">{t('as.28')}</Typography>
                                <Typography
                                    variant="h5">{average} {measurementName}</Typography>

                            </Box>
                            <Box
                                p={3}
                                sx={{
                                    textAlign: 'center'
                                }}
                            >
                                <Text color="success">
                                    <PersonTwoToneIcon/>
                                </Text>
                                <Typography variant="subtitle2">{t('as.29')}</Typography>
                                <Typography
                                    variant="h5">{day} {t('as.30')}</Typography>

                            </Box>
                        </Box>


                    </Stack>
                    <Divider/>
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        justifyContent="center"
                        alignItems="stretch"
                        divider={<Divider orientation="vertical" flexItem/>}
                        spacing={0}
                    >
                        <Box
                            display="flex"
                            flex={1}
                            justifyContent="space-evenly"
                            alignItems="stretch"
                        >

                        </Box>
                    </Stack>
                </Card>
            </Grid>

        </Grid>

    );
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer), {
    getFirma
})(Block3)