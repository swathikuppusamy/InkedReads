import axios from "axios";
const base=axios.create({
    baseURL:'http://localhost:5057/',
    headers:{
        'Content-Type':'application/json',
    },
});
export default base;