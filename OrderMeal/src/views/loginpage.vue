<template>
    <div>
        <x-particles id="myParticles" class="box" :config="config"></x-particles>
        <div class="cent-box">
            <div class="cent-box-header">
                <h1 class="main-title hide">知乎</h1>
                <h2 class="sub-title">年轻人的嘶吼 生活的乱七八糟 来喊一句</h2>
            </div>

            <div class="cont-main clearfix">
                <div class="index-tab">
                    <div class="index-slide-nav">
                        <a @click="logincurbtn" :class="{'active':sign==1}">登录</a>
                        <a @click="registerbtn" :class="{'active':sign==0}">注册</a>
                    </div>
                </div>

                <div class="formgrop" v-if="sign==1">
                    <div class="group">
                        <div class="group-ipt email">
                            <input type="text" name="text" id="name" class="ipt" placeholder="用户名" required>
                        </div>
                        <div class="group-ipt password">
                            <input type="password" name="password" id="password" class="ipt" placeholder="登录密码" required>
                        </div>
                    </div>
                </div>
                <div class="formgrop" v-if="sign==0">
                    <div class="group">
                        <div class="group-ipt">
                            <el-popover ref="popovername" popper-class="popoverdark" placement="right" title="" trigger="focus" content="可含3-10位的字母/汉字/数字/下划线">
                                <slot>
                                    <div v-html="tipnametxt" v-if="tipnametxt.length>0"></div>
                                </slot>
                            </el-popover>
                            <input type="text" name="username" id="registname" class="ipt" v-model="signinform.registname" placeholder="用户名" maxlength="10"
                                required v-on:keyup="checkregistname" v-popover:popovername>
                        </div>
                        <div class="group-ipt">
                            <el-popover ref="popoverphone" popper-class="popoverdark" placement="right" title="" trigger="focus" content="含11位的0-9之间的数字">
                                <slot>
                                    <div v-html="tipphonetxt" v-if="tipphonetxt.length>0"></div>
                                </slot>
                            </el-popover>
                            <input type="phone" name="phone" id="registphone" class="ipt" v-model="signinform.registphone" placeholder="手机号" maxlength="11"
                                required v-on:keyup="checkregistphone" v-popover:popoverphone>
                        </div>
                        <div class="group-ipt password">
                            <el-popover ref="popoverpwd" popper-class="popoverdark" placement="right" title="" trigger="focus" content="可含6-20位的任何字类字符，包括下划线">
                                <slot>
                                    <div v-html="tippasswordtxt" v-if="tippasswordtxt.length>0"></div>
                                </slot>
                            </el-popover>
                            <input type="password" name="password" id="registpassword" class="ipt password" v-model="signinform.registpassword" placeholder="密码"
                                maxlength="20" required v-on:keyup="checkregistpassword" v-popover:popoverpwd>
                        </div>
                    </div>
                </div>

                <div class="buttongrop">
                    <button type="submit" class="login-btn register-btn" v-if="sign==1" @click.enter="login">登录</button>
                    <button class="login-btn register-btn" v-if="sign==0" @click.enter="regist">注册</button>
                </div>

                <div class="remember clearfix">
                    <label class="remember-me">
                        <span class="icon">
                            <span class="zt"></span>
                        </span>
                        <input type="checkbox" name="remember-me" id="remember-me" class="remember-mecheck" checked>记住我</label>
                    <label class="forgot-password">
                        <a href="javascript:void(0)" @click="dialogVisible = true">忘记密码？</a>
                    </label>
                </div>
            </div>
        </div>

        <el-dialog
            title="密码提示"
            :visible.sync="dialogVisible"
            width="480px"
            top="25vh"
            :before-close="handleClose">
            <el-form ref="form" :label-position="labelPosition" :model="form" label-width="80px" size="small">
                <el-form-item label="请输入注册时手机" class="aaa-itme">
                    <input type="text" v-model="form.phone" v-on:keyup="mapping" class="aaa-itme-input">
                </el-form-item>
                <el-form-item label="匹配用户" class="aaa-itme">
                    <el-select v-model="form.name" placeholder="">
                        <el-option :label="item.username" :value="item.username" v-for="item in form.selectoption" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="输入新密码" class="aaa-itme">
                    <el-input v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码" class="aaa-itme">
                    <el-input v-model="form.againpwd"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doPwd">确 定</el-button>
            </span>
            </el-dialog>

        <div class="footer">
            <p>知乎 - Thousands Find</p>
            <p>Designed By ZengRong &
                <a href="zrong.me">zrong.me</a> 2016</p>
        </div>
    </div>
</template>

<script>
    import 'particles.js'
    import defConfig from '../until/config.js'
    export default {
        name: 'loginpage',
        data() {
            return {
                config: {},
                sign: 1,
                signinform: {
                    registname: '',
                    registphone: '',
                    registpassword: '',
                },
                tipnametxt: '',
                tipphonetxt: '',
                tippasswordtxt: '',
                tipnamestat: '',
                tipphonestat: '',
                tippasswordstat: '',
                popovername: false,
                dialogVisible: false,
                labelPosition:'top',
                form: {
                    name: '',
                    phone:'',
                    pwd:'',
                    againpwd:'',
                    selectoption:[1,2]
                }
            }
        },
        computed: {
            lostat() {
                return this.$store.state.lostat
            }
        },
        components: {
            //xparticles
        },
        methods: {
            logincurbtn() {
                this.sign = 1;
            },
            registerbtn() {
                this.sign = 0;
            },
            checkregistname() {
                if (this.signinform.registname.length >= 3) {
                    var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g;
                    var objExp = new RegExp(pattern);
                    if (objExp.test(this.signinform.registname)) {
                        console.log("验证通过")
                        this.tipnametxt = '<span class="tipgreen">可含3-10位的字母/汉字/数字/下划线</span>';
                        this.tipnamestat = 1;
                    } else {
                        this.tipnametxt = '<span class="tipred">格式不合法</span>';
                        this.tipnamestat = 0;
                        console.log("验证不通过")
                    }
                } else if (this.signinform.registname.length < 3) {
                    this.tipnametxt = '';
                    this.tipnamestat = '';
                }

                //console.log(this.registname)
            },
            checkregistphone() {
                if (this.signinform.registphone.length >= 3) {
                    var pattern = /^[0-9]{11}$/g;
                    var objExp = new RegExp(pattern);
                    if (objExp.test(this.signinform.registphone)) {
                        this.tipphonetxt = '<span class="tipgreen">含11位的0-9之间的数字</span>';
                        this.tipphonestat = 1;
                    } else {
                        this.tipphonetxt = '<span class="tipred">格式不合法</span>';
                        this.tipphonestat = 0;
                    }
                } else if (this.signinform.registphone.length < 11) {
                    this.tipphonetxt = '';
                    this.tipphonestat = '';
                }

            },
            checkregistpassword() {
                if (this.signinform.registpassword.length > 5) {
                    var pattern = /^(\w){6,20}$/g;
                    var objExp = new RegExp(pattern);
                    if (objExp.test(this.signinform.registpassword)) {
                        this.tippasswordtxt = '<span class="tipgreen">可含6-20位的任何字类字符，包括下划线</span>';
                        this.tippasswordstat = 1;
                    } else {
                        this.tippasswordtxt = '<span class="tipred">格式不合法</span>';
                        this.tippasswordstat = 0;
                    }
                } else if (this.signinform.registpassword.length < 5) {
                    this.tippasswordtxt = '';
                    this.tippasswordstat = '';
                }
            },
            regist() {
                debugger
                if (this.tipnamestat == 1 && this.tipphonestat == 1 && this.tippasswordstat == 1) {
                    this.$http.post(
                        '/api/doregist',
                        {
                            'username': this.signinform.registname,
                            'phone': this.signinform.registphone,
                            'password': this.signinform.registpassword
                        }
                    ).then((response) => {
                        var res = response.data;
                        if (res.status == -1) {
                            document.querySelector('#registname').focus();
                            this.tipnametxt = '<span class="tiporange">客官你来迟了，用户名已被占用！</span>'
                        } else if (res.status == 1) {
                            this.$confirm(`你的新用户名：${res.result.username}，是否立即登录？`, '恭喜，注册成功!', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type:'info',
                            }).then(() => {
                                this.sign = 1;
                                this.signinform.registname = this.signinform.registphone = this.signinform.registpassword = '';
                                setTimeout(() => {
                                    document.querySelector('#name').focus();
                                }, 500);
                            }).catch(()=>{
                                this.signinform.registname = this.signinform.registphone = this.signinform.registpassword = '';
                            });
                        } else {
                            this.$alert('受网络波动影响，请稍后重试！', '提示!', {
                                confirmButtonText: '确定',
                            });
                        }
                    })
                }
            },
            login() {
                if (document.querySelector("#name").value.length > 0 && document.querySelector("#password").value.length) {
                    this.$http.post(
                        '/api/dologin',
                        {
                            'username': document.querySelector("#name").value,
                            'password': document.querySelector("#password").value
                        }
                    ).then((response) => {
                        var res = response.data;
                        if (res.status == 1) {
                            this.$store.commit("updataUsername", res.result.username);
                            this.$store.commit("updataLostat", res.result.lostat);
                            this.$store.commit("updataUtag",res.result.usernameId);
                            this.$store.commit("updataDesc",res.result.userdesc);
                            this.$store.commit("updataPic", res.result.userpic)
                            this.$router.push('/Homepage/dynamic');
                        } else {
                            this.$alert('账号或密码输入错误！', '提示!', {
                                confirmButtonText: '确定',
                            });
                        }
                    })
                } else {
                    this.$alert('账号密码不能为空！', '提示!', {
                        confirmButtonText: '确定',
                    });
                    return;
                }

            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            mapping(){
              this.$http.post('/api/mappingUser',{
                  phone:this.form.phone
              })
              .then(res => {
                var res = res.data; 
                if(res.status){
                    this.form.selectoption = res.result;
                }
              }).catch(err => {
                  this.$message({
                        message: `网络波动 ${err}`,
                        type: 'warning'
                    });
              })
            },
            doPwd(){
                this.$http.post('/api/doPassword',{
                    phone:this.form.phone,
                    username:this.form.name,
                    password:this.form.pwd
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                  this.$message({
                        message: `网络波动 ${err}`,
                        type: 'warning'
                    });
                })
            }
        },
        created() {
            this.config = defConfig
        },
        mouthed() {

        }
    }
</script>
<style lang="less" src="../assets/css/login.less"></style>