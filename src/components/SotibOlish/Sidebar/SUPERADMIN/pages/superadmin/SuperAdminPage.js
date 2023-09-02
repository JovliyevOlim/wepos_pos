import React, {useEffect} from 'react'
import './superAdminPage.css'
import Circled from '../../../../../../img/circled-right.png'
import { Link } from 'react-router-dom'
import Chart2 from 'react-apexcharts'
import {connect} from "react-redux";
import SuperAdminReducer, { getfilter} from '../../reducers/SuperAdminReducer'
import users from "../../../../../../reducer/users";
function SuperAdminPage({getfilter,users,SuperAdminReducer}) {


    const chartOptionsAdmin = {
        series: [
            {
                name: 'Values',
                data: [0, 1, 2, 3, 4, 5]
            }
        ],
        options: {
            colors: ['#0044FF', '#FF9777'],

            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            yaxis: {
                min: 0,
                max: 500000
            },
            xaxis: {
                categories: [0, 5, 10, 15, 20, 25, 30, 35]
            },
            legend: {
                position: 'top',
            },
            grid: {
                show: true
            }
        }
    }

    const windowScreen = window.screen.height


    function Dates(value){
        getfilter({time:value})
    }

    return (
        <div className='containersSuperAdmin'>
            <div className="header123">
                <h4 className=''>Welcome Superadmin</h4>
                <div className="buttonBox">
                    <button onClick={(e)=>Dates(e.target.value)} value={'TODAY'} className='btn buttonStyle'>Bugun</button>
                    <button onClick={(e)=>Dates(e.target.value)} value={'THIS_WEEK'} className='btn buttonStyle'>Bu hafta</button>
                    <button onClick={(e)=>Dates(e.target.value)} value={'THIS_MONTH'} className='btn buttonStyle'>Bir oylik</button>
                    <button onClick={(e)=>Dates(e.target.value)} value={'THIS_YEAR'} className='btn buttonStyle'>Bir yillik</button>
                </div>
            </div>
            <div className="cardBlock">
                <div className="card1">
                    <h3 className='pt-2 ps-2'>{SuperAdminReducer.Filter?.subscriptionPayment}$</h3>
                    {/*<p className='ps-2'>New Business Registrations {SuperAdminReducer.Filter?.subscribers}</p>*/}
                    <Link to='/main/superadmin/packagesubscription'> <button>More information <img src={Circled} alt="" /> </button> </Link>
                </div>
                <div className="card2">
                    <h3 className='pt-2 ps-2'>0</h3>
                    {/*<p className='ps-2'>New Subscriptions {SuperAdminReducer.Filter.waiting}</p>*/}
                    <Link to='/superadmin/allbusenesses'> <button>More information <img src={Circled} alt="" /> </button></Link>
                </div>
                <div className="card3">
                    <h3 className='pt-2 ps-2'>0</h3>
                    {/*<p className='ps-2'>Rejected: {SuperAdminReducer.Filter.rejected}</p>*/}
                    <Link to='/superadmin/allbusenesses'> <button>More information <img src={Circled} alt="" /> </button> </Link>
                </div>
            </div>
            <div className="chartBox">
                <h5>Sale - Monthly for 12 months</h5>
                <Chart2 
                options={chartOptionsAdmin.options}
                series={chartOptionsAdmin.series}
                type={'line'}
                height={windowScreen * 0.40}/>
            </div>
        </div>
    )
}
export default connect((SuperAdminReducer,users),{getfilter}) (SuperAdminPage)
