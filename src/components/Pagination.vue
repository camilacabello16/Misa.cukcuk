<template>
    <div class="table-pagination">
        <div class="customer-visible">
            <p>Hiển thị 50/{{numberOfEmployee}} nhân viên</p>
        </div>
        <div class="pagination-number">
            <div class="arrow-back" @click="BeginPage">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
            </div>
            <div class="arrow-back" @click="PrePage">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </div>
            <div class="wp-pagi-nb">
                <div 
                    class="pagi-nb" 
                    v-for="(page, index) in numberPages" 
                    :key="index" 
                    :class="{pagi_num_active: page == activePage}" 
                    :id="page"
                    @click="changePage"
                >
                    {{ page }}
                </div>
            </div>
            <div class="arrow-back" @click="NextPage">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </div>
            <div class="arrow-back" @click="EndPage">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
            </div>

        </div>
        <div class="customer-visible-last">
            <p>50 nhân viên/trang</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Pagination',
    data() {
        return{
            pages: null,
            activePage: 1,
            employeePerPage: 50,
            numberOfEmployee: null
        }
    },
    methods: {
        PrePage:function(selectPage){
            if(this.activePage > 1){
                this.activePage -= 1;
            }
            selectPage = this.activePage;
            this.$emit('pre-page', selectPage);
        },
        NextPage:function(selectPage){
            if(this.activePage < this.numberPages){
                this.activePage += 1;
            }
            selectPage = this.activePage;
            this.$emit('next-page', selectPage);
        },
        changePage:function(selectPage){
            selectPage = parseInt(event.currentTarget.id);
            this.activePage = (selectPage);
            this.$emit('change-page', selectPage);
        },
        BeginPage:function(selectPage){
            this.activePage = 1;
            selectPage = this.activePage;
            this.$emit('begin-page', selectPage);
        },
        EndPage:function(selectPage){
            this.activePage = this.numberPages;
            selectPage = this.activePage;
            this.$emit('end-page', selectPage);
        }
    },
    mounted() {
        axios.get('http://localhost:55745/number-employee').then(response => (this.numberOfEmployee = response.data));
    },
    computed: {
        numberPages(){
            return Math.ceil(this.numberOfEmployee / this.employeePerPage)
        }
    }
}
</script>

<style scoped>

</style>