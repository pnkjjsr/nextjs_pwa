class stringModifier {
    constructor(props) { }

    removeWord = (e, word) => {
        let arr = [];
        e.map(i => {
            let nameBefore = i.officename;
            let index = nameBefore.search(word)
            let nameAfter = nameBefore.slice(0, index)
            arr.push(nameAfter.trim())
        });
        return arr;
    }
}

export default stringModifier
