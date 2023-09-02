import React,{useState} from 'react';


import CardSlider from './Card/CardSlider';


function CardCenter(){
	const [current, setCurrent] = useState("Oldest");
	return(
		<>
			<div className="row mt-2">
				<div className="col-xl-12">
					<CardSlider />
				</div>
			</div>	
		</>
	)
}

export default CardCenter;