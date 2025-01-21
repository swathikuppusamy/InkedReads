import axios from "axios";
const base=axios.create({
    baseURL:'https://inkedreads-backend.onrender.com/',
    headers:{
        'Content-Type':'application/json',
    },
});
export default base;