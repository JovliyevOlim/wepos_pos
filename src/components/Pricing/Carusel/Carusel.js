import React, {useState, StrictMode, useEffect} from "react";
import './carousel.css'
import Carousel from "react-simply-carousel";
import img from "../../../img/tick-circle.png";
import {connect} from "react-redux";
import tariffReducer, {getTariffChoose} from "../../../reducer/tariffReducer";
import {Link} from "react-router-dom";
import shopreducer, {saveiD, saveinfo} from "../ShopInfo/shopreducer";

function Carusel({getTariffChoose, tariffReducer, saveinfo, shopreducer, saveiD}) {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        getTariffChoose()
    }, [])


    const [number,setNumber] = useState(2)
    useEffect(()=>{
        const windowWidth = window.innerWidth;
        console.log(windowWidth)
        if (windowWidth <= 425.9) {
            setNumber(1)
        }
    },[window.innerWidth])

    function Connect(id) {

        saveiD(id)
    }

    return (
        <div className={'carousel-width'}>
            <Carousel
                containerProps={{
                    style: {
                        width: "100%",
                        maxWidth:'900px',
                        display:'flex',
                        justifyContent: "space-between",
                        userSelect: "none",
                        background: "transparent",
                    }
                }}
                preventScrollOnSwipe
                swipeTreshold={60}
                activeSlideIndex={activeSlide}
                activeSlideProps={{
                    style: {
                        background: "transparent"
                    }
                }}
                onRequestChange={setActiveSlide}
                forwardBtnProps={{
                    children: ">>",
                    style: {
                        width: 50,
                        height: 50,
                        minWidth: 60,
                        zIndex: 100,
                        cursor: 'pointer',
                        border: '5px solid #fff',
                        color: '#fff',
                        alignSelf: "center",
                        background: "#0044FF",
                        borderRadius: "50%"
                    }
                }}
                backwardBtnProps={{
                    children: "<<",
                    style: {
                        width: 50,
                        height: 50,
                        minWidth: 60,
                        zIndex: 100,
                        cursor: 'pointer',
                        border: '5px solid #fff',
                        color: '#fff',
                        alignSelf: "center",
                        background: '#0044FF',
                        borderRadius: "50%"
                    }
                }}
                dotsNav={{
                    show: true,
                    itemBtnProps: {
                        style: {
                            height: 16,
                            width: 16,
                            borderRadius: "50%",
                            border: 0
                        }
                    },
                    activeItemBtnProps: {
                        style: {
                            height: 16,
                            width: 16,
                            borderRadius: "50%",
                            border: 0,
                            // background: "black"
                        }
                    }
                }}
                itemsToShow={
                2
                }
                speed={400}
            >
                {
                    tariffReducer.tariffchoose.map((item, index) =>
                            <div className={'row carousel-tariff'}
                                 style={{

                                 }}
                            >

                                <div className="card">
                                    <p className={'fw-bold text-dark display-6'}>
                                        {item.name}
                                    </p>
                                    <div className="mb-2 d-flex justify-content-center align-items-end">
                                        <h4 className={'text-dark p-0 m-0'}>{item?.price}</h4>
                                        {/*<p className={'text-dark p-0 m-0'}>$ / {item?.lifetime.toLowerCase()}</p>*/}
                                    </div>
                                    <p>
                                        {item.description}
                                    </p>


                                    <Link to={'/shopDetails/'+item.id} style={{width:'100%'}}>
                                        <button onClick={()=>Connect(item.id)} style={{width:'90%'}} className={'btn btn-outline-primary'}>Tarifni ulash</button>
                                    </Link>

                                    <div className={'ms-3 mt-0'}>
                                        <div className="ch">
                                            <img src={img} alt=""/>
                                            <p className={'p-0 m-0'}>{item?.branchAmount === 0 ? 'Cheksiz': item?.branchAmount} bazalar</p>
                                        </div>
                                        <div className="ch">
                                            <img src={img} alt=""/>
                                            <p className={'p-0 m-0'}>{item?.employeeAmount === 0 ? 'Cheksiz': item?.employeeAmount} xodimlar</p>
                                        </div>
                                        <div className="ch">
                                            <img src={img} alt=""/>
                                            <p className={'p-0 m-0'}>{item?.productAmount === 0 ? 'Cheksiz': item?.productAmount} mahsulotlar</p>
                                        </div>
                                        <div className="ch">
                                            <img src={img} alt=""/>
                                            <p className={'p-0 m-0'}>{item?.tradeAmount
                                            === 0 ? 'Cheksiz': item?.tradeAmount
                                            } savdolar</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                    )
                }

            </Carousel>
        </div>
    );
}

const rootElement = document.getElementById("root");
// const root = ReactDOMClient.createRoot(rootElement);

// root.render(
//     <StrictMode>
//         <App />
//     </StrictMode>
// );

export default connect((tariffReducer, shopreducer), {getTariffChoose, saveinfo, saveiD})(Carusel)
