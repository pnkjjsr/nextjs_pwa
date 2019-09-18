import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: '#fff',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:hover': {
            border: '1px solid #e2e2e1',
            backgroundColor: '#fff',
        },
        '&$focused': {
            border: '1px solid #e2e2e1',
            backgroundColor: '#fff',
            borderColor: theme.palette.primary.light,
        }
    },
    focused: {},
}));

function TextBox(props) {
    const classes = useStyles();
    return <TextField
        InputProps={{ classes, disableUnderline: true }}
        {...props}
    />
}

export default function Input(props) {
    return (
        <TextBox
            className={props.class}
            error={props.error}
            name={props.name}
            type={props.type}
            label={props.label}
            htmlFor={props.htmlFor}
            variant="filled"
            helperText={props.helperText}
            autoComplete={props.autoComplete}
            fullWidth={true}
            onChange={props.onChange}
        />
    );
}