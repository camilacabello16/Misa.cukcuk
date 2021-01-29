<template>
    <div class="wp-head-content">
        <div class="title-list">
            <p>Danh sách khách hàng</p>
            <div class="wp-btn-add" id="btnAdd" @click="OpenDialog">
                <img src="../assets/content/icon/add.png" />
                <a href="#" >Thêm nhân viên</a>
            </div>

        </div>
        <div class="title-list">
            <div class="input-search">
                <div class="input-search--icon">
                    <img src="../assets/content/icon/search.png" />
                </div>
                <div class="input-search--txt">
                    <input type="text" placeholder="Tìm kiếm theo mã, họ tên, số điện thoại" id="searchEmployee" v-model="searchEmployee" v-on:keyup="InputSearch"/>
                </div>
            </div>
            <div class="wp-btn-delete-employee">
                <div class="btn-del-employee" @click="handleDeleteEmployees">
                    <i class="fas fa-trash-alt"></i>
                    <span>Xóa</span>
                </div>
                <div class="refresh-icon" id="iconReload" @click="reloadTable">
                    <img src="../assets/content/icon/refresh.png" />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ButtonFunction',
    data() {
        return{
           searchEmployee: '' 
        }
    },
    methods: {
        OpenDialog: function() {
            this.$emit('open-dialog');
        },
        InputSearch: function(SearchEmployee){
            SearchEmployee = this.searchEmployee;
            this.$emit('input-search', SearchEmployee);
        },
        reloadTable:function(){
            this.$emit('reload-table');
        },
        handleDeleteEmployees:function(){
            for(let i=0; i<this.checkboxArr.length; i++){
                axios.delete('http://localhost:55745/api/Employee/' + this.checkboxArr[i])
                .then(response => {
                    console.log(response);
                });
            }
        }
    },
    props: ['checkboxArr']
}
</script>

<style scoped>
    .wp-btn-delete-employee {
        display: flex;
    }
    .btn-del-employee {
        height: 40px;
        padding: 0 24px;
        text-align: center;
        line-height: 40px;
        border-radius: 4px;
        background-color: #F65454;
        margin-right: 16px;
        color: #fff;
        cursor: pointer;
        transition: 0.3s;
    }
    .btn-del-employee:hover{
        background-color: #FF6900;
        transition: 0.3s;
    }
</style>