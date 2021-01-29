<template>
    <div class="page-left">
        <div class="menu-logo">
            <div class="menu-logo__icon"></div>
            <div class="menu-logo__img"></div>
        </div>
        <div class="menu-list">
            <div class="menu-list__item" v-for="(menu, index) in menus" :key="index">
                <div class="menu-list__item--icon">
                    <img :src="require('@/assets/content/icon/' + menu.image)" />
                </div>
                <div class="menu-list__item--txt">{{ menu.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    data(){
        return{
            menus: [
                {name: 'Tổng quan', image:'dashboard.png'},
                {name: 'Báo cáo', image:'report.png'},
                {name: 'Mua hàng', image:'dashboard.png'},
                {name: 'Danh mục khách hàng', image:'dic-employee.png'},
                {name: 'Danh mục khách hàng', image:'dic-employee.png'},
                {name: 'Thiết lập hệ thống', image:'setting.png'},
            ]
        };
    }
}
</script>

<style scoped>

</style>