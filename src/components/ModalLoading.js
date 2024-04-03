import {Modal} from "reactstrap";
import {ClockLoader} from "react-spinners";

function ModalLoading({toggle,isOpen}) {
    return (
        <Modal toggle={toggle}  isOpen={isOpen}>
            <span className={'load'} style={{position:'absolute',top:'50%',right:'50%'}}>
                <ClockLoader
                    color={'#132fb9'}
                    size={70}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </span>
        </Modal>
    );
}

export default ModalLoading;
