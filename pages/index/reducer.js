const initialState = {
    home: "Pankaj Jasoria"
};

const home = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            return Object.assign({}, state, {
                home: action.payload
            });
        default:
            return state;
    }
};

export default home;