import React, {useEffect} from 'react'
import { useState } from 'react';
import './superadminsettings.css'
import imgMenu from '../../../../../../img/menu.png'
import { Link,Switch,Route,useHistory } from 'react-router-dom';
import AdminSettings from './pagenationSettings/adminSettings/AdminSettings';
import ApplicationSettings from './pagenationSettings/applicationSettings/ApplicationSettings';
import EmailSettings from './pagenationSettings/emailSettings/EmailSettings'
import PaymentSettings from './pagenationSettings/paymentSettings/PaymentSettings'
import BaccupSettings from './pagenationSettings/baccupSettings/BaccupSettings'
import CronSettings from './pagenationSettings/cronSettings/CronSettings'
import PusherSettings from './pagenationSettings/pusherSettings/PusherSettings'
import AddJavascriptCss from './pagenationSettings/addJavaScriptCss/AddJavascriptCss'


export default function SuperAdminSettings() {

	const [clickButton, setClickButton] = useState('buttonsStyle')
	const [menuClass,setMenuClass] = useState('settinButtonsBox-sm')

	function ChangeClass(){
		if (menuClass === 'settinButtonsBox-sm'){
			setMenuClass('settinButtonsBox-sm-ts')
		}
		else{
			setMenuClass('settinButtonsBox-sm')
		}
	}

	const history = useHistory();

	useEffect(()=>{
		history.push('/main/superadmin/superadminsettings/adminsettings')
	},[])
	function changeButtonStyle() {
		setClickButton('clicButtonStyle')
	}

	return (
		<div className='supAdmSetContStyle'>
			<div className='textHeaderSuprAdmin'>
				<h4>Super Admin Settings</h4>
				<select name="" id="" className='selectStyl mb-2'>
					<option value="">Tanlang</option>
				</select>
					{/*<img className={'superAdminMenu'} onClick={ChangeClass} src={imgMenu} alt=""/>*/}
			</div>

			<div className="settingsBlock">
				<div className="settinButtonsBox">
					<Link to={'/main/superadmin/superadminsettings/adminsettings'}><button id='bs' className={'buttonsStyle'} >Super Admin Settings</button></Link>
					<Link to={'/main/superadmin/superadminsettings/applicationSettings'}><button className={'buttonsStyle'} >Application Settings</button></Link>
					<Link to={'/main/superadmin/superadminsettings/emailsettings'}><button className={'buttonsStyle'} >Email SMPT Settings</button></Link>
					<Link to={'/main/superadmin/superadminsettings/paymentsettings'}><button className={'buttonsStyle'} > Payment Gateways</button></Link>
					<Link to={'/main/superadmin/superadminsettings/backup'}><button className={'buttonsStyle'} > Backup</button></Link>
					<Link to={'/main/superadmin/superadminsettings/cronsettings'}><button className={'buttonsStyle'} > Cron Jobs</button></Link>
					<Link to={'/main/superadmin/superadminsettings/pushersettings'}><button className={'buttonsStyle'} >Pusher Settings</button></Link>
					<Link to={'/main/superadmin/superadminsettings/addjavascriptcss'}><button className={'buttonsStyle'} >Additional Javascript and CSS</button></Link>
				</div>

				<button className={'select-Menu'} onClick={ChangeClass}>Select menu</button>
				<div className={menuClass}>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/adminsettings'}><li id='bs' className={'liStyle'} >Super Admin Settings</li></Link>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/applicationSettings'}><li className={'liStyle'} >Application Settings</li></Link>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/emailsettings'}><li className={'liStyle'} >Email SMPT Settings</li></Link>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/paymentsettings'}><li className={'liStyle'} > Payment Gateways</li></Link>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/backup'}><li className={'liStyle'} > Backup</li></Link>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/cronsettings'}><li className={'liStyle'} > Cron Jobs</li></Link>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/pushersettings'}><li className={'liStyle'} >Pusher Settings</li></Link>
						<Link onClick={ChangeClass} to={'/superadmin/superadminsettings/addjavascriptcss'}><li className={'liStyle'} >Additional Javascript <br/> and CSS</li></Link>
				</div>
				<div className="settinPages container">
					<Switch>
						<Route path={'/superadmin/superadminsettings/adminsettings'} component={AdminSettings}/>
						<Route path={'/superadmin/superadminsettings/applicationSettings'} component={ApplicationSettings}/>
						<Route path={'/superadmin/superadminsettings/emailsettings'} component={EmailSettings}/>
						<Route path={'/superadmin/superadminsettings/paymentsettings'} component={PaymentSettings}/>
						<Route path={'/superadmin/superadminsettings/backup'} component={BaccupSettings}/>
						<Route path={'/superadmin/superadminsettings/cronsettings'} component={CronSettings}/>
						<Route path={'/superadmin/superadminsettings/pushersettings'} component={PusherSettings}/>
						<Route path={'/superadmin/superadminsettings/addjavascriptcss'} component={AddJavascriptCss}/>
					</Switch>
				</div>
			</div>

		</div>
	)
}
