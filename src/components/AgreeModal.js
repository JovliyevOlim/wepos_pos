import React from 'react';
import {Modal, ModalBody, ModalFooter} from "reactstrap";

function AgreeModal({deletemodal,deleteModaltoggle,deleteFunc,children}) {



    return (
        <Modal isOpen={deletemodal} toggle={deleteModaltoggle}>
            <ModalBody>
                <h5>Ishonchingiz komilmi ?</h5>
                {children}
            </ModalBody>
            <ModalFooter>
                <button onClick={deleteModaltoggle}
                        className={'btn btn-danger'}>Yo'q
                </button>
                <button onClick={deleteFunc} className={'btn btn-success'}>Ha
                </button>
            </ModalFooter>
        </Modal>
    );
}

export default AgreeModal;