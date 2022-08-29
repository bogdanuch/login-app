import React, {ReactElement} from 'react';
import ConnectButton from "../ConnectButton";

function ScreenWrapper({children}: { children: ReactElement }) {
    return (
        <div className='Wrapper'>
            <div className='Header'>
                <ConnectButton/>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ScreenWrapper;