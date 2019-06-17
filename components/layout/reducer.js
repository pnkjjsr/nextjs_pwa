const initialState = {
    title: "Home",
    desc: "Home page description."
};

const Head = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE":
            return Object.assign({}, state, {
                home: action.payload
            });
        default:
            return state;
    }
};

export default Head;