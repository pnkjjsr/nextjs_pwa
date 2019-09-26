import React, { Fragment, Component } from 'react'
import { connect } from "react-redux";

import "./style.scss";

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        const { loadIn } = this.state;
        const { text, variant, size, action } = this.props
        return (
            <Fragment>
                <button className={`btn ${loadIn} ${variant} ${size}`} onClick={e => this.handleClick(action)} type="submit">
                    {text}
                </button>
                <style jsx>{``}</style>
            </Fragment>
        )
    }
}

export default connect(state => state)(Button)