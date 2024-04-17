import './mainHeaderText.css'

function MainHeaderText({text}) {
    return (
        <div className={'mainHeaderText'}>{text}</div>
    );
}

export default MainHeaderText;


export function AddOrEditText({text}) {
    return (
        <div className={'AddOrEditText'}>{text}</div>
    );
}
