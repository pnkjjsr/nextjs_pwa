import React, { Fragment, Component } from 'react'

import { connect } from "react-redux";

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            loadIn: ""
        }
    }

    handleClick = () => {
        this.setState({
            loadIn: "loading"
        });
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.notification.show == "show") {
            this.setState({
                loadIn: ""
            });
        }
    }

    render() {
        const { text, loadIn } = this.state;

        return (
            <Fragment>
                <button className={`${loadIn} min-w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`} type="submit" onClick={this.handleClick}>
                    {text}
                </button>
                <style jsx>{`
                    .loading:after {
                        content: ' .';
                        animation: dots 1s steps(5, end) infinite;}
                      
                      @keyframes dots {
                        0%, 20% {
                          color: rgba(0,0,0,0);
                          text-shadow:
                            .25em 0 0 rgba(0,0,0,0),
                            .5em 0 0 rgba(0,0,0,0);}
                        40% {
                          color: white;
                          text-shadow:
                            .25em 0 0 rgba(0,0,0,0),
                            .5em 0 0 rgba(0,0,0,0);}
                        60% {
                          text-shadow:
                            .25em 0 0 white,
                            .5em 0 0 rgba(0,0,0,0);}
                        80%, 100% {
                          text-shadow:
                            .25em 0 0 white,
                            .5em 0 0 white;}
                        }
                `}</style>
            </Fragment>
        )
    }
}


export default connect(state => state)(Button)