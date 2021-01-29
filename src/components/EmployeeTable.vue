<template>
    <div class="table-content">
        <table style="width:100%" class="table-data" border="0" cellspacing="0" id="table-customer">
            <thead>
                <tr>
                    <th></th>
                    <th>Mã nhân viên</th>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>Ngày sinh</th>
                    <th>Điện thoại</th>
                    <th>Email</th>
                    <th>Chức vụ</th>
                    <th>Phòng ban</th>
                    <th>Mức lương cơ bản</th>
                    <th>Tình trạng công việc</th>
                </tr>
            </thead>
            <tbody id="bodyTable" v-if="renderComponent">
                <tr v-for="(employee, i) in resultFilter" :key="i" v-on:dblclick="OpenEmployeeInfo" :id="i">
                    <td><input type="checkbox" :id="'checkbox-' + employee.EmployeeId" @click="clickCheckbox()" /></td>
                    <td>{{ employee.EmployeeCode }}</td>
                    <td>{{ employee.FullName }}</td>
                    <td>{{ employee.Gender | formatGender }}</td>
                    <td>{{ employee.DateOfBirth | formatDate }}</td>
                    <td>{{ employee.PhoneNumber }}</td>
                    <td>{{ employee.Email }}</td>
                    <td>{{ employee.PositionName }}</td>
                    <td>{{ employee.DepartmentName }}</td>
                    <td>{{ employee.Salary | formatCash }}</td>
                    <td>{{ employee.StatusJob | formatStatus }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EmployeeTable',
    props: ['searchEmployee', 'page', 'isReload'],
    data(){
        return{
            employees: [],
            departments: [],
            positions: [],
            SearchEmployee: '',
            countEmployee: 0,
            activePage: 1,
            renderComponent: true,
            checkedArr: []
        }
    },
    methods: {
        OpenEmployeeInfo:function(employee){
            var tableId = event.currentTarget.id;
            employee = this.employees.data[tableId];
            this.$emit('open-employee', employee);
        },
        GetNumberRow:function(rowTable){
            rowTable = this.countEmployee;
            this.$emit('get-row', rowTable);
        },
        forceRerender(){
            this.renderComponent = false;
            this.$nextTick(()=>{
                this.renderComponent = true;
            })
        },
        clickCheckbox: function(){
            var id = event.currentTarget.id;
            var deleteBlank = document.getElementById(id);
            var idCheck = id.substring(9);
            if(deleteBlank.checked){
                //var idCheck = id.substring(9);
                this.checkedArr.push(idCheck);
            } else {
                this.checkedArr = this.checkedArr.filter(item => item !== idCheck);
            }
            this.$emit('data-checked', this.checkedArr);
            console.log(this.checkedArr);
        }
    },
    updated() {
        for(let i = 0; i < this.employees.data.length; i++){
            var boxChecked = document.getElementById('checkbox-' + this.employees.data[i].EmployeeId);
            if(this.checkedArr.includes(this.employees.data[i].EmployeeId)) boxChecked.checked = true;
            else boxChecked.checked = false;
        }
    },
    filters: {
        formatCash:function(cash) {
            var res = new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(cash);
            return res;
        },
        formatGender:function(gender){
            var res;
            if(gender == 0){
                res = 'Nam';
            }
            else if(gender == 1){
                res = 'Nữ';
            }
            else if(gender == 2){
                res = 'Khác';
            }
            return res;
        },
        formatStatus:function(status){
            var res;
            if(status == 1){
                res = 'Đang làm việc';
            }else if(status == 0){
                res = 'Đã nghỉ';
            }
            return res;
        },
        formatDate:function(d) {
            var date = new Date(d);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            return day + '/' + month + '/' + year;
        }
    },
    mounted() {
        //this.employees = this.EmployeeData;
        //axios.get('http://localhost:55745/employee-info').then(response => (this.employees = response));
        axios.get('http://localhost:55745/test/0').then(response => (this.employees = response));
        axios.get('http://localhost:55745/api/Department').then(response => (this.departments = response));
        axios.get('http://localhost:55745/api/Position').then(response => (this.positions = response));
        this.SearchEmployee = this.searchEmployee;
        this.countEmployee = document.getElementById('bodyTable').rows.length;
    },
    computed: {
        resultFilter(){
            if(this.searchEmployee){
                return this.employees.data.filter((employee)=>{
                    return (this.searchEmployee.toLowerCase().split(' ').every(v => (employee.EmployeeCode.toLowerCase().includes(v))) ||
                            this.searchEmployee.toLowerCase().split(' ').every(v => (employee.FullName.toLowerCase().includes(v))) ||
                            this.searchEmployee.toLowerCase().split(' ').every(v => (employee.PhoneNumber.toLowerCase().includes(v)))
                    );
                })
            }else{
                return this.employees.data;
            }
        }
    },
    watch: {
        page: {
            handler(val){
                this.activePage = val;
                var pageUrl = (50 * (this.activePage-1));
                axios.get('http://localhost:55745/test/' + pageUrl).then(response => (this.employees = response));
            }
        }
    }
}
</script>