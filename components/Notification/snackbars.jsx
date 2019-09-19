import React from 'react';

import { connect } from "react-redux";
import actions from "./actions";

import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import "./style.scss";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

function SimpleSnackbar(props) {
    const classes = useStyles();

    function handleClose(event, reason) {
        props.hideNotification();
        // setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={props.open}
            autoHideDuration={6000}
            onClose={handleClose}
            className={props.type}
            ContentProps={{
                'aria-describedby': '',
            }}
            message={<span>{props.msg}</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
        />
    );
}
export default connect(state => state, actions)(SimpleSnackbar);