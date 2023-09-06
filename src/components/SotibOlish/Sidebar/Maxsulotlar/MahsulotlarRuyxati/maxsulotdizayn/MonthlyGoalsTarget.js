import { Card, Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GaugeChart from 'react-gauge-chart';
import {connect} from "react-redux";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import users from "../../../../../../reducer/users";

function MonthlyGoalsTarget({active,toggle,MaxsulotlarRoyxariReducer}){
  const { t } = useTranslation();
  const theme = useTheme();

    const {profitPercent,many} = MaxsulotlarRoyxariReducer.productView

    function FindPercent() {
        let number = 0
        if (MaxsulotlarRoyxariReducer.product) {
            let averageNumber = MaxsulotlarRoyxariReducer?.productView?.productManyGetDtoList?.length
            let totalPercent = 0
            MaxsulotlarRoyxariReducer?.productView?.productManyGetDtoList?.map(item => {
                totalPercent += item.profitPercent
            })
            number = totalPercent/averageNumber
        }
        return number
    }


    return (
    <Card
      sx={{
        px: 4,
        pt: 4,
        pb: 1,
        height: '400px'
      }}
    >
      <Typography
        gutterBottom
        align="center"
        variant="h3"
        sx={{
          fontSize: `${theme.typography.pxToRem(21)}`
        }}
      >
        {t('as.43')}
      </Typography>
      <Typography align="center" variant="subtitle2">
        {t('as.44')}
      </Typography>
      <Box
        sx={{
          mt: 3,
          mb: 1,
          mx: 'auto',
          maxWidth: '480px'
        }}
      >
        <GaugeChart
          nrOfLevels={24}
          hideText
          cornerRadius={3}
          needleColor={theme.colors.alpha.black[30]}
          needleBaseColor={theme.colors.alpha.black[100]}
          colors={[
            theme.colors.error.main,
            theme.colors.warning.main,
            theme.colors.success.main
          ]}
          arcWidth={0.3}
          percent={( !many ? profitPercent:FindPercent())/100}
        />
      </Box>
      <Box
        sx={{
          textAlign: 'center'
        }}
      >
        <Typography component="span" align="center" variant="h4">
          {t('as.45')}
        </Typography>
        <Typography
          component="span"
          align="center"
          variant="h2"
          sx={{
            px: 1,
            color: `${theme.colors.warning.main}`
          }}
        >
            { !many ? profitPercent: FindPercent()} %
        </Typography>
        <Typography component="span" align="center" variant="h4">
          {t('as.46')}
        </Typography>
      </Box>
    </Card>
  );
}

export default connect((MaxsulotlarRoyxariReducer, users), {
})(MonthlyGoalsTarget)