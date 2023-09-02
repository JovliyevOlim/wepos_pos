import React, { useRef, useState } from 'react';

import {
  Box,
  Typography,
  Avatar,
  Card,
  Grid,

  styled, useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  AlarmAdd,
  Beenhere,
  Category,
  QrCodeScanner,
  SquareFoot,
  EditLocationAlt
} from "@mui/icons-material";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import {connect} from "react-redux";
import users from "../../../../../../reducer/users";
import FirmaReducer, {getFirma} from "../../reducer/FirmaReducer";
const AvatarPrimary = styled(Avatar)(
    ({ theme }) => `
    background: ${theme.palette.primary.main};
    color: ${theme.palette.primary.contrastText};
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
`
);
const CardAddAction = styled(Card)(
  ({ theme }) => `
        color: ${theme.colors.primary.main};
        height: 100%;

        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
          border-radius: inherit;
          border: ${theme.colors.primary.main} dashed 2px;
          transition: ${theme.transitions.create(['all'])};

          &:hover {
            border-color: ${theme.colors.primary.dark};
          }
        }
        
        .MuiTouchRipple-root {
          opacity: .1;
        }
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardDevice = styled(Card)(
  ({ theme }) => `
      color: ${theme.colors.primary.main};
      width: 100%;

      &.Mui-active {
        background: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};

        .MuiCardActionArea-root {
          .MuiSvgIcon-root,
          .MuiSwitch-root .MuiSwitch-switchBase.Mui-checked,
          .MuiTypography-root,
          .MuiTypography-caption {
            color: ${theme.colors.alpha.white[100]};
          }

          .MuiSwitch-root .MuiSwitch-switchBase {

            .MuiSwitch-thumb {
              background-color: ${theme.colors.alpha.white[100]};
            }

            & + .MuiSwitch-track {
              background-color: ${theme.colors.alpha.white[30]};
            }
          }


        }
      }

      .MuiCardActionArea-root {
        padding: ${theme.spacing(3, 6, 3, 4)};
        height: 100%;
        align-items: flex-start;
        justify-content: center;
        display: flex;
        position: relative;
        flex-direction: column;
        border: transparent solid 1px;
        border-radius: inherit;
        transition: ${theme.transitions.create(['border', 'background'])};

        .MuiTypography-root {
          color: ${theme.colors.alpha.black[50]};
        }

        .MuiTypography-caption {
          color: ${theme.colors.alpha.black[100]};
        }

        .MuiSwitch-root {
          position: absolute;
          top: ${theme.spacing(2)};
          right: ${theme.spacing(2)};
        }

        &:hover {
          border-color: ${theme.colors.primary.main};
        }
      }
      
      .MuiTouchRipple-root {
        opacity: .1;
      }
`
);

const IconWrapper = styled(Box)(
  ({ theme }) => `
      padding: ${theme.spacing(2, 0)};
      color: ${theme.colors.primary.main};
      margin-left: -7px;
`
);

function Block44({active,toggle,MaxsulotlarRoyxariReducer}){

  const {barcode,branches,brandName,minQuantity,measurementName,categoryName} = MaxsulotlarRoyxariReducer.productView

  const { t } = useTranslation();
  const theme = useTheme();


  const actionRef = useRef(null);
  const [openLocation, setOpenMenuLocation] = useState(false);

  return (
    <Box
    style={{padding:"15px"}}>

      <Grid container spacing={3}>
        <Grid item xs={12} xl={3} md={4} sm={6}>
          <CardDevice>
            <Card style={{background:"#fff5eb"}}>

              <Box display="flex" alignItems="center" margin={"15px"}>
                <IconWrapper>
                  <QrCodeScanner style={{fontSize:"40px", color:"#ce9c59"}} />
                </IconWrapper>
                <Box pl={1}>
                  <Typography
                      variant="h4"
                      color="text.secondary"
                      fontWeight="normal"
                  >
                    Shtrix kod
                  </Typography>
                  {
                    <Typography gutterBottom variant="h4">

                      {barcode}

                    </Typography>

                  }


                </Box>
              </Box>



          </Card>

          </CardDevice>
        </Grid>
        <Grid item xs={12} xl={3} md={4} sm={6}>
          <CardDevice>
            <Card style={{background:"#f5ffeb"}}>

              <Box display="flex" alignItems="center" margin={"15px"}>
                <IconWrapper>
                  <Category style={{fontSize:"40px", color:"#64e15b"}} />
                </IconWrapper>
                <Box pl={1}>
                  <Typography
                      variant="h4"
                      color="text.secondary"
                      fontWeight="normal"
                  >
                    Toifasi
                  </Typography>
                  <Typography gutterBottom variant="h4"
                              onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
                  >
                    {categoryName}
                  </Typography>

                </Box>
              </Box>



            </Card>

          </CardDevice>
        </Grid>
        <Grid item xs={12} xl={3} md={4} sm={6}>
          <CardDevice>
            <Card style={{background:"#ebfaff"}}>

              <Box display="flex" alignItems="center" margin={"15px"}>
                <IconWrapper>
                  <Beenhere style={{fontSize:"40px", color:"#3fb6da"}} />
                </IconWrapper>
                <Box pl={1}>
                  <Typography
                      variant="h4"
                      color="text.secondary"
                      fontWeight="normal"
                  >
                    Brendi
                  </Typography>
                  <Typography gutterBottom variant="h4"
                              onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
                  >
                    {brandName}
                  </Typography>

                </Box>
              </Box>



            </Card>

          </CardDevice>
        </Grid>
        <Grid item xs={12} xl={3} md={4} sm={6}>
          <CardDevice>
            <Card style={{background:"#ffebf4"}}>

              <Box display="flex" alignItems="center" margin={"15px"}>
                <IconWrapper>
                  <AlarmAdd style={{fontSize:"40px", color:"#e5579e"}} />
                </IconWrapper>
                <Box pl={1}>
                  <Typography
                      variant="h4"
                      color="text.secondary"
                      fontWeight="normal"
                  >
                    Minimal miqdor
                  </Typography>
                  <Typography gutterBottom variant="h4"
                              onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
                  >
                    {minQuantity}
                  </Typography>

                </Box>
              </Box>



            </Card>

          </CardDevice>
        </Grid>
        <Grid item xs={12} xl={3} md={4} sm={6}>
          <CardDevice>
            <Card style={{background:"#ebefff"}}>

              <Box display="flex" alignItems="center" margin={"15px"}>
                <IconWrapper>
                  <SquareFoot style={{fontSize:"40px", color:"#67a0d9"}} />
                </IconWrapper>
                <Box pl={1}>
                  <Typography
                      variant="h4"
                      color="text.secondary"
                      fontWeight="normal"
                  >
                    O'lchov birligi
                  </Typography>
                  <Typography gutterBottom variant="h4"
                              onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
                  >
                    {measurementName}
                  </Typography>

                </Box>
              </Box>



            </Card>

          </CardDevice>
        </Grid>
        <Grid item xs={12} xl={3} md={4} sm={6}>
          <CardDevice>
            <Card style={{background:"#ebfffc"}}>

              <Box display="flex" alignItems="center" margin={"15px"}>
                <IconWrapper>
                  <EditLocationAlt style={{fontSize:"40px", color:"#58d0be"}} />
                </IconWrapper>
                <Box pl={1}>
                  <Typography
                      variant="h4"
                      color="text.secondary"
                      fontWeight="normal"
                  >
                    Qaysi filialda
                  </Typography>
                  <Typography gutterBottom variant="h4"
                              onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}
                  >
                    {
                      branches?.map(item=>
                          item+','
                      )
                    }
                  </Typography>

                </Box>
              </Box>



            </Card>

          </CardDevice>
        </Grid>
      </Grid>
    </Box>
  );
}

export default connect((MaxsulotlarRoyxariReducer, users, FirmaReducer), {
  getFirma
})(Block44)