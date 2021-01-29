<template>
    <div>
        <div class="m-dialog" id="mDialog">
            <div class="dialog-header">
                <p>THÔNG TIN NHÂN VIÊN</p>
                <div class="icon-close-dialog" id="iconCloseForm" @click="closeDialog">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            </div>
            <form id="formSubmitEmployee" @submit.prevent="handleSubmitForm">
                <div class="dialog-body">
                    <div class="wp-ava-img">
                        <div class="ava-img">
                            <img src="../assets/content/img/default-avatar.jpg">
                        </div>
                        <div class="ava-txt">
                            <p>(Vui lòng chọn ảnh có định dạng .jpg, .jpeg, .png, .gif.)</p>
                        </div>
                    </div>
                    <div class="wp-inp-content">
                        <div class="inp-content">
                            <div class="inp-content-title">
                                <p>A. THÔNG TIN CHUNG:</p>
                                <div class="line-green"></div>
                            </div>
                            <div class="inp-content-input">
                                <div class="content-input-item">
                                    <label>Mã nhân viên (<span class="reqiure-input">*</span>)</label>
                                    <input v-show="IsAdd == false" type="text" placeholder="Nhập mã nhân viên..." v-model="employeeInfo.EmployeeCode">
                                    <input v-show="IsAdd == true" type="text" placeholder="Nhập mã nhân viên..." :value="EmployeeCode | IncreaseCode" ref="EmployeeCode">
                                    <!-- <input v-show="employeeInfo == ''" type="text" placeholder="Nhập mã nhân viên..." name="EmployeeCode" v-model="employeeInfo.EmployeeCode"> -->

                                </div>
                                <div class="content-input-item">
                                    <label>Họ và tên (<span class="reqiure-input">*</span>)</label>
                                    <input  
                                        type="text" 
                                        placeholder="Nhập họ tên..." 
                                        id="employeeFullName" 
                                        name="FullName"
                                        v-model.trim="employeeInfo.FullName" 
                                        ref="FullName"
                                    >
                                    <span class="error" v-if="!$v.employeeInfo.FullName.required">Vui lòng nhập họ tên</span>
                                </div>
                                <!-- <div class="error" v-if="!$v.employeeInfo.FullName.required">require</div> -->
                                <div class="content-input-item">
                                    <label>Ngày sinh</label>
                                    <input type="date" id="employeeDateOfBirth" name="DateOfBirth" v-model="employeeInfo.DateOfBirth" ref="DateOfBirth">
                                </div>
                                <div class="content-input-item">
                                    <label>Giới tính</label>
                                    <select id="employeeGender" name="Gender" v-model="employeeInfo.Gender" ref="Gender">
                                        <option value="default">Chọn giới tính</option>
                                        <option value="0">Nam</option>
                                        <option value="1">Nữ</option>
                                        <option value="2">Khác</option>
                                    </select>
                                </div>
                                <div class="content-input-item">
                                    <label>Số CMTND/ Căn cước (<span class="reqiure-input">*</span>)</label>
                                    <input 
                                        type="text" 
                                        placeholder="Nhập CMTND/ Căn cước..." 
                                        id="employeeId" 
                                        name="IdentifyNumber" 
                                        v-model.trim="employeeInfo.IdentifyNumber" 
                                        ref="IdentifyNumber"
                                    >
                                    <span class="error" v-if="!$v.employeeInfo.IdentifyNumber.required">Vui lòng nhập CMTND/ Căn cước</span>
                                </div>
                                <div class="content-input-item">
                                    <label>Ngày cấp</label>
                                    <input type="date" id="employeeReleaseId" name="ReleaseDay" v-model="employeeInfo.ReleaseDay" ref="ReleaseDay">
                                </div>
                                <div class="content-input-item">
                                    <label>Nơi cấp</label>
                                    <input type="text" placeholder="Nhập nơi cấp..." id="employeeReleasePlace" name="ReleaseLocation" v-model="employeeInfo.ReleaseLocation" ref="ReleaseLocation">
                                </div>
                                <div class="content-input-item">
                                    <label>Email (<span class="reqiure-input">*</span>)</label>
                                    <input 
                                        type="email" 
                                        placeholder="Nhập email..." 
                                        id="employeeEmail" 
                                        name="Email" 
                                        v-model.trim="employeeInfo.Email" 
                                        ref="Email"
                                    >
                                    <span class="error" v-if="!$v.employeeInfo.Email.required">Vui lòng nhập email</span>
                                    <span class="error" v-if="!$v.employeeInfo.Email.email">Email không đúng định dạng</span>
                                </div>
                                <div class="content-input-item">
                                    <label>Số điện thoại (<span class="reqiure-input">*</span>)</label>
                                    <input 
                                        type="text" 
                                        placeholder="Nhập số điện thoại..." 
                                        id="employeePhoneNumber" 
                                        name="PhoneNumber" 
                                        v-model.trim="employeeInfo.PhoneNumber" 
                                        ref="PhoneNumber"
                                    >
                                    <span class="error" v-if="!$v.employeeInfo.PhoneNumber.required">Vui lòng nhập số điện thoại</span>
                                    <span class="error" v-if="!$v.employeeInfo.PhoneNumber.maxLength">Số điện thoại không đúng định dạng</span>
                                    <span class="error" v-if="!$v.employeeInfo.PhoneNumber.minLength">Số điện thoại không đúng định dạng</span>
                                </div>
                            </div>
                        </div>
                        <div class="inp-content-bot">
                            <div class="inp-content-title">
                                <p>B. THÔNG TIN CÔNG VIỆC:</p>
                                <div class="line-green"></div>
                            </div>
                            <div class="inp-content-input">
                                <div class="content-input-item">
                                    <label>Vị trí</label>
                                    <select id="selectPosition" name="PositionId" v-model="employeeInfo.PositionId" ref="PositionId">
                                        <option value="default">Chọn vị trí</option>
                                        <option v-for="(position, index) in positions.data" :key="index" :value="index+1">{{position.PositionName}}</option>
                                    </select>
                                </div>
                                <div class="content-input-item">
                                    <label>Phòng ban</label>
                                    <select id="selectDepartment" name="DepartmentId" v-model="employeeInfo.DepartmentId" ref="DepartmentId">
                                        <option value="default">Chọn phòng ban</option>
                                        <option v-for="(department, index) in departments.data" :key="index" :value="index+1">{{department.DepartmentName}}</option>
                                    </select>
                                </div>
                                <div class="content-input-item">
                                    <label>Mã số thuế cá nhân</label>
                                    <input type="text" placeholder="Nhập mã số thuế..." id="employeeTaxNumber" name="TaxNumber" v-model="employeeInfo.TaxNumber" ref="TaxNumber">
                                </div>
                                <div class="content-input-item">
                                    <label>Mức lương cơ bản</label>
                                    <input type="text" placeholder="Nhập mức lương cơ bản..." id="employeeSalary" name="Salary" v-model="employeeInfo.Salary" ref="Salary">
                                </div>
                                <div class="content-input-item">
                                    <label>Ngày gia nhập công ty</label>
                                    <input type="date" id="employeeJoinDate" name="JoinDate" v-model="employeeInfo.JoinDate" ref="JoinDate">
                                </div>
                                <div class="content-input-item">
                                    <label>Tình trạng công việc</label>
                                    <select id="employeeStatusJob" name="StatusJob" v-model="employeeInfo.StatusJob" ref="StatusJob">
                                        <option value="1">Đang làm việc</option>
                                        <option value="0">Đã nghỉ</option>
                                    </select>
                                </div>
                                <input type="hidden" id="employeeGuidId">
                                <input type="hidden" id="employeeSalaryNotFormat" >
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-btn">
                    <div class="wp-btn-commit">
                        <button type="button" class="btn-submit btn-commit" id="btnCommit" @click="handleSubmit">Lưu</button>
                    </div>
                    <div class="wp-btn-close-form" id="btnCancelForm" @click="closeDialog">
                        Hủy
                    </div>
                    <div v-show="!this.IsAdd" class="wp-btn-cancel" id="btnCancel" @click="isDelete = true">
                        Xóa
                    </div>
                </div>
            </form>
        </div>
        <!-- <DeleteWarning v-if="isDelete" @cancel-delete="isDelete = false" @do-delete="handleDeleteEmployee"/> -->
        <DeleteWarning v-if="isDelete" @cancel-delete="isDelete = false" @do-delete="handleDeleteEmployee"/>

        <div v-if="isDelete" class="insert-delete-notice" id="insertDeleteNotice"></div>
    </div>
</template>

<script>
import axios from 'axios';
import DeleteWarning from './DeleteWarning';
// import Vue from 'vue';
// import VeeValidate from 'vee-validate';
import { required, email, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'Dialog',
    data(){
        return{
            departments: [],
            positions: [],
            employeeInfo: {},
            EmployeeCode: "",
            IsAdd: null,
            isDelete: false
        }
    },
    validations: {
        employeeInfo:{
            FullName: {
                required
            },
            IdentifyNumber: {
                required
            },
            Email: {
                required,
                email
            },
            PhoneNumber: {
                required,
                maxLength: maxLength(10),
                minLength: minLength(10)
            }
        }
    },
    components: {   
        DeleteWarning
    },
    methods: {
        closeDialog:function(){
            this.$emit('close-dialog');
        },
        handleDeleteEmployee:function(){
            var id = this.employeeInfo.EmployeeId;
            axios.delete('http://localhost:55745/api/Employee/' + id)
                .then(response => {
                    console.log(response);
                });
            this.isDelete = false;
            this.closeDialog();
        },
        handleSubmit:function(){
            if(this.$refs.JoinDate.value == ''){
                this.employeeInfo.JoinDate = this.getCurrentDate();
            }
            if(this.$refs.DateOfBirth.value == ''){
                this.employeeInfo.DateOfBirth = this.getCurrentDate();
            }
            if(this.$refs.ReleaseDay.value == ''){
                this.employeeInfo.ReleaseDay = this.getCurrentDate();
            }
            if(this.IsAdd != true){
                console.log(this.employeeInfo);
                axios.put('http://localhost:55745/api/Employee', this.employeeInfo).then(res => console.log(res));
            } else if(this.IsAdd == true){
                console.log(this.employeeInfo);
                this.employeeInfo.EmployeeCode = this.$refs.EmployeeCode.value;
                axios.post('http://localhost:55745/api/Employee', this.employeeInfo).then(res => console.log(res));
                console.log(this.$refs.EmployeeCode.value);
                console.log(this.$refs.JoinDate.value);
            }
            //this.closeDialog();
            this.handleSubmitForm();
        },
        formatDateForm:function(aaa) {
            var date = new Date(aaa);
            var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
            var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
            var year = date.getFullYear();
            return year + '-' + month + '-' + day;
        },
        getCurrentDate:function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
            return today;
        },
        handleSubmitForm(){
            this.$v.$touch()
            if (this.$v.$invalid) {
                console.log('error');
            } else {
                this.closeDialog();
            }
        }
    },
    props: ['Employee', 'employeeCode', 'isAdd'],
    mounted() {
        axios.get('http://localhost:55745/api/Department').then(response => (this.departments = response));
        axios.get('http://localhost:55745/api/Position').then(response => (this.positions = response));
        this.employeeInfo = this.Employee;
        this.employeeInfo.DateOfBirth = this.formatDateForm(this.employeeInfo.DateOfBirth);
        this.employeeInfo.ReleaseDay = this.formatDateForm(this.employeeInfo.ReleaseDay);
        this.employeeInfo.JoinDate = this.formatDateForm(this.employeeInfo.JoinDate);
        //this.employeeInfo.Salary = this.formatCash(this.employeeInfo.Salary);
        this.IsAdd = this.isAdd;
        if(this.isAdd == true){
            axios.get('http://localhost:55745/max-employee-code').then(response => (this.EmployeeCode = response.data));
        }
        if(this.IsAdd == true){
            //this.refs.DepartmentId.value = 'default';
            this.employeeInfo.PositionId = 'default';
            this.employeeInfo.DepartmentId = 'default';
            this.employeeInfo.Gender = 'default';
            this.employeeInfo.StatusJob = 1;
        }
    },
    filters: {
        formatCash:function(cash) {
            var res = new Intl.NumberFormat({ style: 'currency', currency: 'VND' }).format(cash);
            return res;
        },
        IncreaseCode:function(code){
            var res = code.substring(2, 8);
            var increaseCode = parseInt(res, 10) + 1;
            code = "NV" + increaseCode;
            return code;
        },
        // formatDateForm:function(aaa) {
        //     var date = new Date(aaa);
        //     var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        //     var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        //     var year = date.getFullYear();
        //     return year + '-' + month + '-' + day;
        // },
    },
}
</script>

<style scoped>

</style>