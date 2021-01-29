<template>  
    <div class="delete-notice" id="deleteNotice">
        <div class="wp-icon-close-warning">
            <div class="icon-close-warning" @click="cancelDelete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
        </div>
        <div class="delete-notice__content">
            <p class="delete-notice-title">Xóa nhân viên</p>
            <div class="delete-notice-warning">
                <p>Bạn có chắc chắn muốn xóa nhân viên này không?</p>
            </div>
        </div>
        <div class="delete-notice__btn">
            <div class="wp-btn-agree-delete">
                <button class="btn-submit btn-cancel" style="margin-left: 0px;" id="btnAgreeDelete" @click="doDelete">Xóa</button>
            </div>
            <div class="wp-btn-commit">
                <button class="btn-submit btn-commit btn-can-delete" id="btnCancelDelete" @click="cancelDelete">Hủy</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DeleteWarning',
    methods: {
        cancelDelete:function(){
            this.$emit('cancel-delete');
        },
        doDelete:function(){
            this.$emit('do-delete');
        }
    }
}
</script>

<style scoped>
.icon-close-warning svg {
    width: 100%;
    height: 100%;
    color: #BBBBBB;
}
.icon-close-warning {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    right: 5px;
}
.wp-icon-close-warning {
    position: relative;
    cursor: pointer;
}
.delete-notice-title {
    font-size: 14px!important;
    font-weight: bold;
}
.delete-notice__content {
    padding: 24px 24px;
}
.delete-notice-warning p {
    font-size: 14px;
}
.delete-notice__btn {
    background-color: #E9EBEE;
    padding: 10px 24px;
    display: flex;
    flex-direction: row-reverse;
}
.btn-cancel {
    /* margin-left: 16px; */
    background-color: #F65454;
    color: #fff;
    transition: 0.3s;
    font-size: 13px;
    font-weight: 600;
}
.btn-can-delete {
    background-color: #019160;
    color: #000;
    font-size: 13px;
    font-weight: 600;
    background-color: #E9EBEE;
}
.delete-notice-warning {
    margin-top: 15px;
}
.btn-can-delete:hover{
    color: #fff;
    background-color: #BBBBBB;
}
.btn-cancel:hover{
    background-color: #FF6900;
}

</style>