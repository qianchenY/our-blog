<template>
    <div>
        <ly-header></ly-header>
        <div class="editor">
            <div class="editor-box">
                <div class="editor-left" @click="clickFile($event)">
                    <p>
                        
                    </p>
                    <a title="更改用户头像">
                        <i class="el-icon-edit-outline"></i>
                    </a>
                    <img :src="userinfo.userpic || '../static/images/default2.jpg'" ref="userpic" alt="" class="avatar">
                    <input style="display: none;" type="file"  @change="changeFile($event)" ref="userpicFile">
                </div>
                <div class="editor-right">
                    <div class="overflow">
                        <p class="editor-title">
                            {{userinfo.usernickname || userinfo.username}}
                        </p>
                        <router-link class="editor-link" :to="'/User/' + userinfo.username">返回我的个人主页 ></router-link>
                    </div>
                    <ul class="editor-list">
                        <!--昵称-->
                        <li class="editor-item">
                            <span class="item-title">
                                昵称：
                            </span>
                            <p class="item-desc" v-show="!userinfoBool['usernickname']">
                                {{userinfo.usernickname || '未填写'}}
                            </p>
                            <a class="item-editor" v-show="!userinfoBool['usernickname']" @click="currentFormShow('usernickname', !userinfoBool['usernickname'])">
                                <i class="el-icon-edit"></i>编辑
                            </a>
                            <div class="item-form" v-show="userinfoBool['usernickname']">
                                <div>
                                    <el-input size="mini" v-model="userinfo['usernickname']" :placeholder="userinfo['usernickname']"></el-input>
                                </div>
                                <div>
                                    <el-button class="item-form-btn" size="mini" @click="udpateInfo('usernickname', userinfo['usernickname'])">确认</el-button>
                                    <el-button class="item-form-btn" size="mini" @click="currentFormShow('usernickname', !userinfoBool['usernickname'])">取消</el-button>
                                </div>
                            </div>
                        </li>
                        <!--性别-->
                        <li class="editor-item">
                            <span class="item-title">
                                性别：
                            </span>
                            <p class="item-desc" v-show="!userinfoBool['usersex']">
                                {{userinfo.usersex || '未填写'}}
                            </p>
                            <a class="item-editor" v-show="!userinfoBool['usersex']" @click="currentFormShow('usersex', !userinfoBool['usersex'])">
                                <i class="el-icon-edit"></i>编辑
                            </a>
                            <div class="item-form" v-show="userinfoBool['usersex']">
                                <div>
                                    <el-radio v-model="userinfo['usersex']" label="男">男</el-radio>
                                    <el-radio v-model="userinfo['usersex']" label="女">女</el-radio>
                                </div>
                                <div>
                                    <el-button class="item-form-btn" size="mini" @click="udpateInfo('usersex', userinfo['usersex'])">确认</el-button>
                                    <el-button class="item-form-btn" size="mini" @click="currentFormShow('usersex', !userinfoBool['usersex'])">取消</el-button>
                                </div>
                            </div>
                        </li>
                        <!--电话-->
                        <li class="editor-item">
                            <span class="item-title">
                                电话：
                            </span>
                            <p class="item-desc" v-show="!userinfoBool['phone']">
                                {{userinfo.phone || '未填写'}}
                            </p>
                            <a class="item-editor" v-show="!userinfoBool['phone']" @click="currentFormShow('phone', !userinfoBool['phone'])">
                                <i class="el-icon-edit"></i>编辑
                            </a>
                            <div class="item-form" v-show="userinfoBool['phone']">
                                <div>
                                    <el-input size="mini" v-model="userinfo['phone']" :placeholder="userinfo['phone']"></el-input>
                                </div>
                                <div>
                                    <el-button class="item-form-btn" size="mini" @click="udpateInfo('phone', userinfo['phone'])">确认</el-button>
                                    <el-button class="item-form-btn" size="mini" @click="currentFormShow('phone', !userinfoBool['phone'])">取消</el-button>
                                </div>
                            </div>
                        </li>
                        <!--地址-->
                        <li class="editor-item">
                            <span class="item-title">
                                地址：
                            </span>
                            <p class="item-desc" v-show="!userinfoBool['useraddress']">
                                {{userinfo.useraddress || '未填写'}}
                            </p>
                            <a class="item-editor" v-show="!userinfoBool['useraddress']" @click="currentFormShow('useraddress', !userinfoBool['useraddress'])">
                                <i class="el-icon-edit"></i>编辑
                            </a>
                            <div class="item-form" v-show="userinfoBool['useraddress']">
                                <div>
                                    <el-input size="mini" v-model="userinfo['useraddress']" :placeholder="userinfo['useraddress']"></el-input>
                                </div>
                                <div>
                                    <el-button class="item-form-btn" size="mini" @click="udpateInfo('useraddress', userinfo['useraddress'])">确认</el-button>
                                    <el-button class="item-form-btn" size="mini" @click="currentFormShow('useraddress', !userinfoBool['useraddress'])">取消</el-button>
                                </div>
                            </div>
                        </li>
                        <!--个人简介-->
                        <li class="editor-item">
                            <span class="item-title">
                                个人简介：
                            </span>
                            <p class="item-desc" v-show="!userinfoBool['userdesc']">
                                {{userinfo.userdesc || '未填写'}}
                            </p>
                            <a class="item-editor" v-show="!userinfoBool['userdesc']" @click="currentFormShow('userdesc', !userinfoBool['userdesc'])">
                                <i class="el-icon-edit"></i>编辑
                            </a>
                            <div class="item-form" v-show="userinfoBool['userdesc']">
                                <div>
                                    <el-input type="textarea" :rows="3" v-model="userinfo['userdesc']" :placeholder="userinfo['userdesc']"></el-input>
                                </div>
                                <div>
                                    <el-button class="item-form-btn" size="mini" @click="udpateInfo('userdesc', userinfo['userdesc'])">确认</el-button>
                                    <el-button class="item-form-btn" size="mini" @click="currentFormShow('userdesc', !userinfoBool['userdesc'])">取消</el-button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
        <transition name="el-zoom-in-center">
                <Editorvia 
                    :exampleImg="lexampleImg"
                    @onPropsChange="upOpenviaChange" ></Editorvia>  
        </transition>
             
    </div>
</template>

<script>
    import Header from '../components/header';
    import Editorvia from './editorvia'
    export default {
        name: 'UserInfo',
        data(){
            return {
               userinfo: {
                   id: '',
                   username: '',
                   phone: '',
                   usernickname: '',
                   userdesc: '',
                   userpic: '',
                   useraddress: '',
                   usersex: ''
               },
               userinfoBool: {
                   id: false,
                   username: false,
                   phone: false,
                   usernickname: false,
                   userdesc: false,
                   userpic: false,
                   useraddress: false,
                   usersex: false                   
               },
               lexampleImg:'',
            }
        },
        methods: {
            // 获取用户信息
            getData(username){
                var _this = this;
                _this.$http.post('/api/userInfo',{
                    username: username,
                }).then(res => {         
                    var data = res.body.result;
                    
                    for(let [key, val] of Object.entries(data)){
                        _this.userinfo[key] = val;
                    }
                })
            },
            // 更换编辑状态
            currentFormShow(key, bool){
                this.userinfoBool[key] = bool;
            },
            // 提交用户信息
            udpateInfo(key, val){
                var _this = this;
                _this.$http.post('/api/userInfoUpdate',{
                    username: _this.userinfo.username,
                    typename: key,
                    typeval: val
                }).then(res => {
                    if(res.body.status){
                        _this.$alert('修改成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.currentFormShow(key, false); 
                            }
                        });                          
                    }
                })
            },
            //头像编辑dialog
            upOpenviaChange(propName,newVal,oldVal){
                this.lexampleImg = newVal
            },
            // file控件触发
            clickFile(e){
                var _this = this,
                    ele = e.currentTarget;
                
                this.$refs.userpicFile.click();
            },
            // file控件值改变后
            changeFile(e){
                var _this = this,
                    ele = e.currentTarget,
                    file;
                if(ele.files.length > 0){
                    file =  ele.files[0];
                    //console.log(file)
                    var uservia = file;
                    if(file.size > 2097152){
                        alert("图片过大，不能大于2MB！");  
                        return false; 
                    }
                    if(!/image\/\w+/.test(file.type)){
                        alert("看清楚，这个需要图片！");  
                        return false;                          
                    };
                    var fileReader = new FileReader();
                    fileReader.onload = function(e){
                        var pic = fileReader.result;
                        _this.userinfo.userpic = pic;
                        _this.lexampleImg = pic;
                    };
                    fileReader.readAsDataURL(file);
                };
            }

        },
        components:{
            'ly-header': Header,
            Editorvia
        },
        created(){
            this.getData(this.$store.state.username);
            
        }
    }
</script>

<style lang="less" scoped>
    .overflow{
        overflow: hidden;
    }

    .editor{
        margin: 89px auto 0 auto;
        width: 1000px;
        padding: 20px 0;
        overflow: hidden;        
        background-color: #fff;
    }

    .editor-box{
        padding: 0 20px;
    }

    .editor-left{
        float: left;
        position: relative;
        width: 180px;
        height: 180px;
        line-height: 180px;
        text-align: center;

        p{
            display: none;
            position: absolute;
            z-index: 2;
            font-size: 25px;
            width: 100%;
            height: 100%;
            background: black;
            opacity: .5;
                
        }

        a{  
            display: none;
            position: absolute;
            z-index: 3;
            font-size: 35px;
            width: 100%;
            height: 100%;
            color: white;  
            cursor: pointer;  
        }

        img{
            position: relative;
            z-index: 1;
            vertical-align: middle;
            width: 100%;
            max-width: 180px;
        }

        &:hover{
            p,a{
                display: block;
            }
        }
    }

    .editor-right{
        float: right;
        width: 750px;
    }

    .editor-title{
        float: left;
        font-size: 30px;
        line-height: 35px;
        color: #666;
    }

    .editor-link{
        float: right;
        line-height: 35px;
        font-size: 14px;
        color: #8590a6;

        &:hover{
            color: #333; 
        }
    }

    .editor-list{
        margin-top: 20px;
    }

    .editor-item{
        padding: 15px 20px;
        line-height: 36px;
        font-size: 15px;
        color: #444;        
        border-bottom: 1px solid #ebebeb;
        overflow: hidden;

        .item-title{
            float: left;
            width: 85px;
        }

        .item-desc{
            float: left;
        }

        .item-editor{
            float: left;
            display: block;
            margin-left: 10px;
            cursor: pointer;

            &:hover{
                color: #333;
            }
        }

        .item-form{
            float: left;
        }
    }
</style>
