const defaultInitialState = {
    foo: "Yes"
};

const reducer = (state = defaultInitialState, action) => {
    switch (action.type) {
        case "FOO":
            return Object.assign({}, state, {
                foo: "No"
            });
        default:
            return state;
    }
};

export default reducer;