import axios from 'axios';


export default class dataGov {
    async getLocation(pincode) {
        let data;
        let link = `https://api.data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6?api-key=${process.env.govKey}&format=json&offset=0&limit=10&filters[pincode]=${pincode}`

        await axios.get(link)
            .then(res => {
                data = res.data.records
            })
            .catch(err => {
                console.log(err);
            })
        return data
    }

}