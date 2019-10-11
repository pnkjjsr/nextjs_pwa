import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ministerActions from "./actions";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FlagIcon from '@material-ui/icons/Flag';
import MoneyIcon from '@material-ui/icons/Money';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';

import './style.scss';

class PanelMinister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ""
        }
    }

    static getDerivedStateFromProps(props) {
        if (props.minister) {
            return {
                data: props.minister
            }
        }
        return true;
    }

    componentDidMount() {
        const { ministerAction } = this.props;
        ministerAction.prefetchData();
    }

    render() {
        const { data } = this.state;

        return (
            <Fragment>
                <div className="panel-minister">
                    <div className="row">
                        <div className="col-3 col-lg-12">
                            <figure className="photo">
                                <AccountCircleIcon />
                            </figure>
                        </div>
                        <div className="col-9 col-lg-12">
                            <div className="heading">
                                <label htmlFor="ministerName">MCD Councillor</label>
                                <h3 className="title" name="ministerName">{data.councillor.name}</h3>
                            </div>

                            <div className="details">
                                <ul>
                                    <li>
                                        <i>
                                            <FlagIcon />
                                        </i>
                                        <label htmlFor="party"><b>{data.councillor.party}</b></label>
                                    </li>
                                    <li>
                                        <i>
                                            <MoneyIcon />
                                        </i>
                                        <label htmlFor="assets">Rs {data.councillor.assets}</label>
                                    </li>
                                    <li>
                                        <i>
                                            <MenuBookIcon />
                                        </i>
                                        <label htmlFor="education">{data.councillor.education}</label>
                                    </li>
                                    <li>
                                        <i>
                                            <HomeIcon />
                                        </i>
                                        <label htmlFor="address">{data.councillor.address}, {data.councillor.state}-{data.councillor.pincode}</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    ministerAction: bindActionCreators(ministerActions, dispatch)
})
export default connect(state => state, mapDispatchToProps)(PanelMinister) 