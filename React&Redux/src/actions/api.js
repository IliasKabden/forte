import axios from "axios";

const baseUrl = "http://localhost:60671/api/"



export default {

    dNote(url = baseUrl + 'Notes/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: uid => axios.get(url + uid),
            create: newRecord => axios.post(url, newRecord),
            update: (uid, updateRecord) => axios.put(url + uid, updateRecord),
            delete: uid => axios.delete(url + uid)
        }
    }
}