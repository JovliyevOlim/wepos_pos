import './slideshow.css'
import {connect} from "react-redux";
import titleReducer from "../reducer/titleReducer";
import Typewriter from "typewriter-effect";
import {BaseUrl} from "../middleware";
import {Link} from "react-router-dom";

const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 2500;
function Slideshow({titleReducer}) {
    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {titleReducer.title.map((item, index) => (
                    <div key={index} className="row p-0 m-0 card1 border border-2 colorback mb-2 rounded-3" style={{boxShadow:"rgb(27 9 181 / 58%) 0px 8px 24px"}}>
                        <img src={`${BaseUrl}/attachment/download/${item.photo?.id}`} alt="" style={{marginLeft:"70px", width:"124px", height:"190px"}}/>
                        <div className="col-md-7 col-lg-9 col-xl-9 col-xxl-9 col-sm-12 p-1 mb-2 ">
                            <div className="row py-1 d-flex justify-content-between align-items-center">
                                <div className="col-md-10 col-sm-8 align-items-center">
                                    <h4 className={'kitchen2'}>
                                        <Typewriter
                                            onInit={(typewriter)=> {
                                                typewriter
                                                    .typeString(t('Bosh1.salom'))
                                                    .pauseFor(100)
                                                    .deleteAll()
                                                    .typeString(t('Bosh1.xushkelibsiz'))
                                                    .start();
                                            }
                                        }
                                        />
                                    </h4>
                                    <h5 className={'kitchen'}>
                                        <Typewriter
                                            onInit={(typewriter)=> {
                                                typewriter
                                                    .pauseFor(9000)
                                                    .changeDelay(30)
                                                    .typeString("<span style='font-size:20px'><span style='color:#2c3e50'>Men sizning shaxsiy yordamchingizman, siz platforma bilan tanish bo'lmasangiz iltimos video darsliklar bo'limiga o'ting.... </span></span>")
                                                    .start();
                                            }
                                        }
                                        />
                                    </h5>
                                </div>
                                <div className="col-md-5 col-lg-3 col-xl-3 col-xxl-3 col-sm-12 align-items-center d-flex justify-content-around" style={{padding:"initial"}} >
                                    <Link to={'/foydaZarar'}>
                                        <button className={' kitchen-button'} style={{backgroundColor:"#b3e714"}}>Darslik</button>
                                    </Link>
                                    <Link to={'/shopping'}>
                                        <button  className={'kitchen-button'}></button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default connect((titleReducer),{}) (Slideshow)