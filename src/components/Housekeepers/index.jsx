import {keepers} from '../../constants'

function Housekeepers() {
    return (
        <div>
            {keepers.map(keeper => <span style={{display: 'flex'}}>
                <div>{keeper.fullName}</div>
            </span>)}
        </div>
    );
}

export default Housekeepers;
