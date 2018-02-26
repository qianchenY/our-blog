<template>
    <div class="editorcon">
        <div>
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :rules="rules">
                <el-form-item v-if="!id" label="类型：" prop="dyclass">
                    <el-select v-model="formLabelAlign.dyclass" placeholder="请选择">
                        <el-option
                        v-for="item in formLabelAlign.dyclasslist"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>                
                </el-form-item>
                <el-form-item label="标题：" prop="querytitle">
                    <el-input class="querytitle" v-model="formLabelAlign.querytitle"></el-input>
                </el-form-item>
                <el-form-item label="详细内容：(选填)">
                    <div class="wangeditorCon">
                        <div id="editorElem1" class="toolbar"></div>
                        <div class="editorstrip"></div>
                        <div id="editorElem2" class="text">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="预览模式" prop="editorContent">
                    <div class="editorpreview" v-html="formLabelAlign.editorContent"></div>
                    <input type="hidden" v-model="formLabelAlign.beforedycontent" value="beforedycontent">
                    <input type="hidden" v-model="formLabelAlign.beforedImg" value="beforedImg">
                </el-form-item>
                <el-form-item v-if="formLabelAlign.dyclass == 0" label="投票开关：" prop="openVote">
                    <el-switch v-model="formLabelAlign.openVote" active-text="开启投票" active-value="1" inactive-text="关闭投票" inactive-value="0"></el-switch>             
                </el-form-item>
                <el-form-item v-if="formLabelAlign.openVote == 1" label="投票选项：" prop="votes">   
                    <el-input class="votes" v-model="formLabelAlign.votes" :disabled="!!id" placeholder="请输入投票选项，格式：选项1|选项2|选项3"></el-input>           
                </el-form-item>
                <el-form-item class="align-right">
                    <el-button size="medium" @click="resetForm('formLabelAlign')" v-if="!id">重置</el-button>
                    <el-button type="primary" @click="onSubmit" size="medium">立即发起</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="less" scope>
    .votes{
        width: 350px;
    }

    
</style>

<script>
    import E from 'wangeditor';
    import { formatDate } from '../until/lydate.js';
    export default {
        name: 'editorpage',
        data() {
            return {
                id: this.$route.query.id,
                labelPosition: 'top',
                formLabelAlign: {
                    querytitle: '',
                    editorContent: '',
                    type: '',
                    beforedycontent:'',
                    beforedImg:'',
                    openVote: 0,
                    votes:'',
                    dyclasslist: [{
                        value: 0,
                        label: '问答'
                    },
                    {
                        value: 1,
                        label: '文章'
                    }],
                    dyclass: 0
                },
                rules: {
                    dyclass: [
                        { required: true, message: '请输入类型：', trigger: 'blur' },
                    ],
                    querytitle: [
                        { required: true, message: '请输入标题名称', trigger: 'blur' },
                    ],
                }
            }
        },    
        methods: {
            resetForm(formName) {
                document.querySelector("#editorElem2>.w-e-text").innerHTML = "";
                this.$refs[formName].resetFields();
            },
            onSubmit() {  
                if(this.id){
                    // 修改
                    var lyobj = {
                        id: this.id,
                        title: this.formLabelAlign.querytitle,
                        dycontent: this.formLabelAlign.editorContent,
                        beforedycontent:this.formLabelAlign.beforedycontent,
                        updated: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
                        openVote: this.formLabelAlign.openVote,
                    }       
     
                    if(lyobj.title){
                        this.$http.post('/api/updatedynamic', lyobj).then(res => {
                            var res = res.data;
                            if(res.status == 1){
                                this.$alert('修改成功！', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.push('/Homepage/DynamicDetails/' + this.id);
                                    }
                                });                                
                            }
                        })
                    }
                }else{   
                    // 添加    
                    var lyobj = {
                        title: this.formLabelAlign.querytitle,
                        dyclass: this.formLabelAlign.dyclass,
                        dycontent: this.formLabelAlign.editorContent,
                        beforedycontent:this.formLabelAlign.beforedycontent,
                        author: this.$store.state.username,
                        authorId: this.$store.state.utag,
                        authordesc:this.$store.state.desc,
                        writedate: formatDate(new Date(), "yyyy-MM-dd hh:mm"),
                        openVote: this.formLabelAlign.openVote,
                        votes: this.formLabelAlign.votes
                    }                
                        
                    if (lyobj.title) {                       
                        this.$http.post('/api/startdynamic', lyobj).then(res => {
                            var res = res.data;
                            if (res.status == 1) {
                                this.$alert('发起成功！', '提示', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.$router.push('/Homepage/dynamic');
                                    }
                                })
                            }
                        })
                    }
                }

            },
            watchRoute(){
                var _this = this;

                var editor = new E('#editorElem1', '#editorElem2')
                editor.customConfig.uploadImgServer = '/upload'
                editor.customConfig.onchange = (html) => {
                    this.formLabelAlign.editorContent = html;
                    this.formLabelAlign.beforedycontent = editor.txt.text();
                }
                editor.create();

                // 是否编辑
                if(_this.id){
                    _this.$http.get('/api/getdynamicdetails?id=' + _this.id).then(res => {
                        var res = res.data.result[0];
                        _this.formLabelAlign.dyclass = res.dyclass;
                        _this.formLabelAlign.querytitle = res.title;
                        _this.formLabelAlign.editorContent = res.dycontent;
                        _this.formLabelAlign.beforedycontent = res.beforedycontent; 
                        _this.formLabelAlign.beforedImg = res.beforedImg;
                        _this.formLabelAlign.openVote = res.openVote + '';   
                        _this.formLabelAlign.votes = res.votes;   

                        editor.txt.html(res.dycontent);               
                    }); 
                };
            }
        },
        mounted() {
            this.watchRoute();
        }
    }
</script>
