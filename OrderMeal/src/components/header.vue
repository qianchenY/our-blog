<template>
    <!-- <div class="lyheader">
        <div class="lyheadering">
            <div class="lyheader-con tal">
                <div class="lyheader-con-l tal-l">
                    <img src="../../static/images/linshi.png" alt="">
                </div>
                <div class="lyheader-con-c tal-c">
                    <div class="nav-con tal">
                        <div class="nav-con-l tal-l">
                            <nav>
                                <router-link to="/Homepage/dynamic" class="nav-con-a">动态</router-link>
                                <router-link to="/Homepage/helloworld" class="nav-con-a">发现</router-link>
                                <a class="nav-con-a" href="#">话题</a>
                                <a class="nav-con-a" href="#">活动</a>
                            </nav>
                        </div>
                        <div class="nav-con-r tal-r">
                            <div class="tal">
                                <div class="tal-l">
                                    <input type="text" class="nav-search" placeholder="输入你感兴趣的内容">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lyheader-con-r tal-r align-right">
                    <div class="iocnav iocnav-for"></div>
                    <div class="iocnav iocnav-abo"></div>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <div class="iocnav iocnav-set"></div>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item disabled>账号设置</el-dropdown-item>
                            <el-dropdown-item disabled>用户反馈</el-dropdown-item>
                            <el-dropdown-item disabled>用户申诉</el-dropdown-item>
                            <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div> -->
    <div class="sheepheader">
        <div class="sheepheader-con tal">
            <div class="sheepheader-con-l tal-l">
                <img src="../assets/logo3x.png" alt="">
            </div>
            <div class="sheepheader-con-c tal-c">
                <div class="headermiddle tal">
                    <div class="headermiddle-l tal-l">
                        <input v-model="searchVal" type="text" class="sheepheader-search" @keydown="search($event,searchVal)" placeholder="搜索old！sheep" />
                    </div>
                    <div class="headermiddle-r tal-r align-right">
                        <nav>
                            <!-- <a class="nav-con-a" href="#">
                                <i class="el-icon-news"></i>问答</a>
                            <a class="nav-con-a" href="#">
                                <i class="el-icon-tickets"></i>文章</a> -->
                            <router-link to="/Homepage/dynamic/0" class="nav-con-a">
                                <i class="el-icon-warning"></i>问答</router-link>
                            <router-link to="/Homepage/dynamic/1" class="nav-con-a">
                                <i class="el-icon-menu"></i>文章</router-link>
                            <router-link to="/Homepage/editorpage" class="nav-con-a">
                                <i class="el-icon-edit"></i>发起</router-link>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="sheepheader-con-r tal-r">
                <div class="sheepheader-side tal">
                    <div class="sheepheader-side-l tal-l"></div>
                    <div class="sheepheader-side-c tal-c align-right">
                        <el-badge is-dot class="item">
                            <el-button class="share-button" icon="el-icon-bell" type="primary"></el-button>
                        </el-badge>
                    </div>
                    <div class="sheepheader-side-r tal-r">
                        <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <img :src="pic || '../../static/images/default2.jpg'" class="oldsheepvia">
                                <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <router-link :to="{name: 'User', params: {userid: $store.state.username}}">用户中心</router-link>
                                </el-dropdown-item>
                                <el-dropdown-item disabled>用户反馈</el-dropdown-item>
                                <el-dropdown-item disabled>用户申诉</el-dropdown-item>
                                <el-dropdown-item command="loginOut">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'lyheader',
        data() {
            return {
                splitbutton: true,
                searchVal:'',
            }
        },
        computed:{
            pic(){
                return this.$store.state.pic;
            }
        },
        methods: {
            handleCommand(command) {
                if (command == "loginOut") {
                    this.$http.get('/api/dologinout').then(res => {
                        if (res.data.status == 0) {
                            this.$store.commit("updataUsername", res.result);
                            this.$store.commit("updataLostat", res.result);
                            this.$store.commit("updataUtag", res.result)
                            this.$store.commit("updataPic", res.result)
                            this.$router.push('/Loginpage');
                        }
                    })
                }
            },
            //搜索框事件
            search(e,val){
                var _this = this,
                    code = e.keyCode || e.which,
                    val = _this.searchVal,
                    isSearch = _this.$route.path.split('/')[2] == 'search';
                if(code == 13){
                    if(val == ''){
                        _this.$alert('搜索关键字不能为空！', '提示', {
                            confirmButtonText: '确定'
                        });                         
                    }else{
                        val = escape(val);
                        _this.$router.push({path:"/Homepage/search", query: {search: val}});                  
                    }
                }
                
            },
            
        },
        created(){
           
        }
    }
</script>
<style lang="less" src="../assets/css/header.less"></style>