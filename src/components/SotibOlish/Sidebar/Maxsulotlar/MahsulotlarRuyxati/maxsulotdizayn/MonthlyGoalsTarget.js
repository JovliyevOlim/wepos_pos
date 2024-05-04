import {useTranslation} from 'react-i18next';
import GaugeChart from 'react-gauge-chart';
import {connect} from "react-redux";
import MaxsulotlarRoyxariReducer from "../../reducer/MaxsulotlarRoyxariReducer";
import users from "../../../../../../reducer/users";
import {Space, Typography} from 'antd';

const {Text, Title} = Typography;


function MonthlyGoalsTarget({active, toggle, MaxsulotlarRoyxariReducer}) {
    const {t} = useTranslation();

    const {profitPercent, many} = MaxsulotlarRoyxariReducer.productView

    function FindPercent() {
        let number = 0
        if (MaxsulotlarRoyxariReducer.product) {
            let averageNumber = MaxsulotlarRoyxariReducer?.productView?.productManyGetDtoList?.length
            let totalPercent = 0
            MaxsulotlarRoyxariReducer?.productView?.productManyGetDtoList?.map(item => {
                totalPercent += item.profitPercent
            })
            number = totalPercent / averageNumber
        }
        return number
    }


    return (
        <div className={'p-4 d-flex flex-column justify-content-center align-items-center'}>
            <Title level={5}>
                {t('as.43')}
            </Title>
            <div
                style={{
                    maxWidth: '250px',
                }}
            >
                <GaugeChart
                    nrOfLevels={24}
                    hideText
                    cornerRadius={3}
                    arcWidth={0.3}
                    percent={(!many ? profitPercent : FindPercent()) / 100}
                />
            </div>
            <div className={'mt-3'}>
                <Title level={5}>
                    {t('as.45')} <strong className={'text-success'}>{!many ? profitPercent : FindPercent()} %</strong> {t('as.46')}
                </Title>
            </div>
        </div>
    );
}

export default connect((MaxsulotlarRoyxariReducer, users), {})(MonthlyGoalsTarget)