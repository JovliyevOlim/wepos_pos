import './cardbody.css'
function CardBody({children}) {
    return (
        <div className={'filter'}>
            {children}
        </div>
    );
}

export default CardBody;
