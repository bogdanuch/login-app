import React, {ReactElement} from 'react';
import Button from "@mui/material/Button";
import useMetamask from "../../contexts/useMetamask";

function ConnectButton(): ReactElement {
    const {address, connect} = useMetamask();
    function sliceAddress(){
        let startAddr = address.slice(0, 8);
        let endAddr = address.slice(-8);

        return `${startAddr}...${endAddr}`;
    }
    return (
        <div>
            <Button variant='contained' onClick={connect}>{address ? sliceAddress() : 'Connect Metamask'}</Button>
        </div>
    )
}

export default ConnectButton;