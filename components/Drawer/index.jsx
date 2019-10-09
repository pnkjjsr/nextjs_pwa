import React, { Fragment, Children } from 'react'
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';

import "./style.scss";

export default function MDrawer(props) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const menu = side => (
        <div
            className="drawer"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            {props.children}
        </div>
    )

    return (
        <Fragment>
            <MenuIcon onClick={toggleDrawer('left', true)} />
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {menu('left')}
            </Drawer>
        </Fragment>
    );
}
