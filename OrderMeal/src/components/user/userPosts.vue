<template>
    <div>
        <ul class="user-list">
            <li class="user-list-item" v-for="(item,index) in namicdata">                
                <router-link class="item-title" :to="'/Homepage/DynamicDetails/'+item.id">{{item.title}}</router-link>
                <p class="item-info">
                    {{item.writedate | getDateDiff}} &emsp; {{item.uplikeNum || '0'}}个赞 &emsp; {{item.observerNum || '0'}}个评论
                </p>             
            </li>
        </ul>
        <div class="block plate-paging">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 30, 40, 50]" :page-size="20"
                layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>
        </div>        
    </div>
</template>
<style lang="less" scoped>
    .user-list-item{
        padding: 10px 5px;
        border-bottom: 1px solid #f6f6f6;
        overflow: hidden;

        .item-title{
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            &:hover{
                color: #0F88EB;
            }
        }

        .item-info{
            line-height: 20px;
            font-size: 12px;
            color: #8590a6;
        }
    }

    .plate-paging{
        margin-top: 20px;
        text-align: center;
    }
</style>
<script>
    export default {
        name: 'UserPosts',
        data(){
            return {
                namicdata: '',
                pageTotal: null,
                pageSize: 20,
                currentPage: 1,                
            }
        },
        watch:{
            '$route' (to,form){
                this.getView();
            }
        },        
        methods: {
            getView() {
                var _this = this,
                    str = '',
                    dyclass = 1;
                str = `/api/userList?page=${this.currentPage}&pageSize=${this.pageSize}&dyclass=${dyclass}&username=${this.$route.params.userid}`;
                this.$http.get(str).then(res => {
                    var res = res.data
                    if (res.status == 1) {
                        this.namicdata = res.result;
                        this.pageTotal = res.pagetotal
                    }

                })
            }, 
            handleSizeChange(val) {
                this.pageSize = val;
                this.getView();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getView();
                console.log(`当前页: ${val}`);
            }                 
        },
        created(){
            this.getView();
        }
    }
</script>
