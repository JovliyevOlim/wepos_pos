import React, {useEffect, useState} from 'react'
import './packages.css'
import Delet from '../../../../../../img/icons-delete.png'
import Editt from '../../../../../../img/icons-edit.png'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import tariffReducer,{getTariffChoose,deleteTariff} from "../../../../../../reducer/tariffReducer";
import AgreeModal from "../../../../../AgreeModal";
 function Packages({tariffReducer,getTariffChoose,deleteTariff}) {

	 useEffect(()=>{
		 getTariffChoose()
	 },[tariffReducer.current])

	 const [deleteModal,setDeleteModal] = useState(false)
	 const [deleteID, setdeletID] = useState('')

	 function deleteTariffById(item) {
		 setDeleteModal(true)
		 setdeletID(item)
	 }

	 function deleteFunc() {
		 deleteTariff(deleteID)
		 setDeleteModal(false)
	 }

	return (
		<div className='PackagesContainer'>
			<div className="packageContainer-item">
				<h4>Packages All Packages</h4>
				<Link to={'/main/superadmin/paskages/addpackage'}><button className='btn btn-primary mt-sm-2 mt-md-4 '>Qo'shish</button></Link>
			</div>

					<div className="cardBlock mb-5">
						{
							tariffReducer.tariffchoose.map(item=>
								<div className="card1 m-2">
									<div className="cardBox d-block text-center">
										<h5 className=''>{item.name}</h5>
										<div className="d-flex justify-content-center align-items-center">
											{/*<button className={item.active ? 'activeButton' : 'activeButtonDanger'}>{*/}
											{/*	item.active ? 'Active' : "NoActive"*/}
											{/*}</button>*/}
											<Link to={'/main/superadmin/paskages/addpackage/'+item.id}>
												<img src={Editt} alt="" className='editImg' />
											</Link>
											<img src={Delet} onClick={()=>deleteTariffById(item.id)} alt="" className='editImg' />
										</div>
										<hr className='my-3'/>
										<p>{item.branchAmount === 0 ?'Cheksiz Bazalar' : item.branchAmount+'ta Bazalar'}</p>
										<p>{item.employeeAmount
										=== 0 ?'Cheksiz Foydalanuvchilar' : item.employeeAmount+"ta Foydalanuvchilar"
										}</p>
										<p>Cheksiz Mahsulotlar</p>
										<p>{item.history ? 'Hodimlar tarixi' :''}</p>
										<p>{item.testDay} test kuni</p>
										<div className={'d-flex align-items-center justify-content-center'}>
											<h2 className='p-0 m-0'>
												${item.price}/
											</h2>
											<p className={'m-0 p-0'}>{item.interval} oyiga</p>
										</div>

										<hr className='mt-4'/>
										<p className='mt-4'>{item.description}</p>
									</div>
								</div>
							)
						}

					</div>
			<AgreeModal deletemodal={deleteModal} deleteFunc={deleteFunc} deleteModaltoggle={()=>setDeleteModal(!deleteModal)}/>



		</div>
	)
}
export default connect((tariffReducer),{getTariffChoose,deleteTariff}) (Packages)
