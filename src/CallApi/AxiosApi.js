import axios from 'axios';

function GetEmployees() {
    return axios.get('http://localhost:55745/employee-info');
}

export default {
    GetEmployees
}