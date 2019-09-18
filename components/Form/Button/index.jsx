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
            loadIn: ""
        }
    }

    handleClick = (e) => {
        if (!e) {
            this.setState({
                loadIn: "loading"
            });
        }
        else {
            this.setState({
                loadIn: "loading"
            }, () => e());
        }

    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.notification.show == "show") {
            this.setState({
                loadIn: ""
            });
        }
    }

    render() {
        const { text, loadIn, variant, color, action } = this.state;

        return (
            <Fragment>
                <MyButton className={`${loadIn}`} variant={variant} color={color} type="submit" onClick={e => this.handleClick(action)}>
                    {text}
                </MyButton>
                <style jsx>{``}</style>
            </Fragment>
        )
    }
}


export default connect(state => state)(Button)