<template>
    <div class="messcard">
        <div class="messcard-top">
            <div class="messcard-top-bg"></div>
            <div class="messcard-top-avatar">
                <img :src="userinfo.userpic || '../../static/images/default2.jpg'" alt="" class="avatar">
            </div>
            <div class="messcard-top-ms">
                <a href="#" class="messframe">{{userinfo.usernickname || userinfo.username}}</a>
                <ul class="messcard-mode clearfloat">
                    <li>
                        <a href="#" class="messcard-mode-con">
                            <p>10</p>
                            <p>关注</p>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="messcard-mode-con">
                            <p>10</p>
                            <p>问答</p>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="messcard-mode-con">
                            <p>10</p>
                            <p>文章</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="messcard-info">
            <ul class="messcard-info-list">
                <li class="messcard-info-item">
                    <p class="item-title">
                        性别：
                    </p>
                    <p class="item-desc">
                        {{userinfo.usersex || '未填写'}}
                    </p>
                </li>
                <li class="messcard-info-item">
                    <p class="item-title">
                        电话：
                    </p>
                    <p class="item-desc">
                        {{userinfo.phone || '未填写'}}
                    </p>
                </li>
                <li class="messcard-info-item">
                    <p class="item-title">
                        简介：
                    </p>
                    <p class="item-desc">
                        {{userinfo.userdesc || '未填写'}}
                    </p>
                </li>
            </ul>
            <p class="messcard-link" v-if="$route.params.userid == $store.state.username">
                <el-button @click="userEditor">编辑资料</el-button>
            </p>            
        </div>
    </div>
</template>

<style lang="less" scoped>
    .messcard-info{
        margin-top: 10px;
        padding: 15px;
        background-color: white;
    }

    .messcard-info-item{
        margin: 5px 0;
        line-height: 25px;
        overflow: hidden;

        .item-title{
            float: left;
            font-size: 16px;
            color: #333;
        }

        .item-desc{
            float: left;
            font-size: 14px;
            color: #333;
        }
    }

    .messcard-link{
        margin-top: 10px;
    }
</style>


<script>
    export default {
        name: 'messcard',
        data(){
            return {
                userinfo: {}
            }
        },
        computed:{
            username() {
                return this.$store.state.username;
            },
            utag(){
                return this.$store.state.utag;
            }
        },
        methods: {
            getData(username){
                var _this = this;
                _this.$http.post('/api/userInfo',{
                    username: username
                }).then(res => {                    
                    _this.userinfo = res.body.result;
                })
            },
            userEditor(){
                this.$router.push('/User/editor');
            }            
        },
        created(){
            this.getData(this.username);
        }
    }
</script>
<style lang="less" src="../assets/css/messcard.less"></style>