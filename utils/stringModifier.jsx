class stringModifier {
    constructor(props) { }

    removeWord = (e, word) => {
        let arr = [];
        e.map(i => {
            let nameBefore = i.officename;
            let index = nameBefore.search(word)
            let name = nameBefore.slice(0, index)
            let state = i.taluk
            let district = i.districtname
            let division = i.divisionname
            arr.push({
                area: name.trim(),
                division: division,
                district: district,
                state: state
            })
        });
        return arr;
    }
}

export default stringModifier
