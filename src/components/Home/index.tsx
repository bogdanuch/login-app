import React, {ReactElement} from 'react';
import {Button, Typography} from "@mui/material";

import useLogin from "../../contexts/useLogin";
import useMetamask from "../../contexts/useMetamask";
import styles from "./styles";

function Home(): ReactElement {
    const {userName} = useLogin();
    const {address, chainID, userBalance} = useMetamask();

    return (
        <div className="Home">
            <Typography component="h1" variant="h5"> Welcome {userName} </Typography>
            {
                address ? <>
                        <Typography component="h1" variant="h5"> Your metamask address is {address}</Typography>
                        <Typography component="h1" variant="h5"> Your selected chain id is {chainID}</Typography>
                        <Typography component="h1" variant="h5"> Your ETH balance is {userBalance}</Typography> </>
                    :
                    <Typography component="h1" variant="h5"> Please connect to metamask</Typography>
            }
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={styles.disconnectButton}
            >
                Disconnect
            </Button>
        </div>
    )
}

export default Home;