<template>
  <div>
    <div class="wp-page">
        <Menu />
        <div class="page-right">
            <Header />
            <div class="wp-content-page">
                <ButtonFunction 
                  v-on:open-dialog="handleOpenDialog" 
                  v-on:input-search="handleSearch"
                  v-on:reload-table="handleReloadTable"
                  :checkboxArr="checkboxArr"
                />
                <div class="wp-table-content">
                    <EmployeeTable 
                      v-on:open-employee="handleOpenEmployee" 
                      :searchEmployee="searchEmployee"
                      :page="page"
                      :isReload="isReload"
                      @data-checked="deleteEmployee"
                    />
                    <Pagination 
                      v-on:change-page="handleChangePage" 
                      v-on:next-page="handleNextPage"
                      v-on:pre-page="handlePrePage"
                      v-on:begin-page="handleBeginPage"
                      v-on:end-page="handleEndPage"
                    />
                </div>
            </div>
        </div>
    </div>
    
    <InsertDialog v-if="isOpenDialog" style="display: block"/>
    <Dialog v-if="isOpenDialog" v-on:close-dialog="handleCloseDialog" :Employee="Employee" :isAdd="isAdd"/>
    
  </div>
</template>

<script>
import './assets/css/main.css';
import EmployeeTable from './components/EmployeeTable';
import Menu from './components/Menu';
import Header from './components/Header';
import ButtonFunction from './components/ButtonFunction';
import Pagination from './components/Pagination';
import Dialog from './components/Dialog';
import InsertDialog from './components/InsertDialog';

export default {
  data() {
    return{
      isOpenDialog: false,
      Employee: {},
      searchEmployee: '',
      isAdd: true,
      page: 1,
      isReload: false,
      checkboxArr: []
    }
  },
  methods: {
    handleOpenDialog:function(){
      this.isOpenDialog = true;
      this.isAdd = true;
    },
    handleCloseDialog:function(){
      this.isOpenDialog = false;
      this.Employee = {};
    },
    handleOpenEmployee:function(employee){
      this.isOpenDialog = true;
      this.Employee = employee;
      this.isAdd = false;
    },
    
    handleSearch:function(SearchEmployee){
      this.searchEmployee = SearchEmployee;
    },
    handleChangePage:function(selectPage){
      this.page = selectPage;
    },
    handleNextPage:function(selectPage){
      this.page = selectPage;
    },
    handlePrePage:function(selectPage){
      this.page = selectPage;
    },
    handleBeginPage:function(selectPage){
      this.page = selectPage;
    },
    handleEndPage:function(selectPage){
      this.page = selectPage;
    },
    handleReloadTable:function(){
      this.isReload = true;
    },
    deleteEmployee:function(checkedArr){
      this.checkboxArr = checkedArr;
    }
  },
  components: {
    EmployeeTable,
    Menu,
    Header,
    ButtonFunction,
    Pagination,
    Dialog,
    InsertDialog
  }
}
</script>

<style>
  .displayForm{
    display: block!important;
    z-index: 3;
  }
</style>
