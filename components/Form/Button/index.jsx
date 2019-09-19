import React, { Fragment, Component } from 'react'

import { connect } from "react-redux";

import { styled } from '@material-ui/styles';
import MButton from '@material-ui/core/Button';

import "./style.scss";

const MyButton = styled(MButton)({
    textTransform: 'capitalize'
});

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            variant: props.variant,
            color: props.color,
            action: props.action,
            size: props.size,
            loadIn: ""
        }
    }

    handleClick = (e) => {
        if (!e) {
            this.setState({
                loadIn: "loading"
            });
        } else {
            e()
        }
    }

    componentDidUpdate(prevProps, prevStats) {
        const { notification } = prevProps;
        const { open } = this.props.notification;

        if (notification.open != open) {
            this.setState({
                loadIn: ""
            });
        }
    }


    render() {
        const { text, loadIn, variant, color, size, action } = this.state;

        return (
            <Fragment>
                <MyButton className={`${loadIn}`} size={size} variant={variant} color={color} type="submit" onClick={e => this.handleClick(action)}>
                    {text}
                </MyButton>
                <style jsx>{``}</style>
            </Fragment>
        )
    }
}

export default connect(state => state)(Button)