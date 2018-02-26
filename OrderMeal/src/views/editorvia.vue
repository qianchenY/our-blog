<template>
    <div v-show="p_exampleImg!=''" class="viacon">
        <div class="viacondialog">
            <div class="viacondialog-top">
                <h3 class="Modal-title">编辑头像</h3>
                <p>调整头像尺寸和位置</p>
                <i class="el-icon-close viacondialog-top-close" @click="closeVia"></i>
            </div>
            <div class="viacondialog-con">
                    <vueCropper
                    ref="cropper"
                    :img="p_exampleImg"
                    :autoCrop="autoCrop"
                    :autoCropWidth="autoCropWidth"
                    :autoCropHeight="autoCropHeight"
                    :fixedBox="fixedBox"
                ></vueCropper>
            </div>
            <div class="viacondialog-btn">
                <el-button @click="viasumbit" class="via-btn" size="medium" type="primary">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import VueCropper from 'vue-cropper';
    import propsync from '../assets/js/propsync.js';
    export default {
        name: 'editorvia',
        mixins: [propsync],//声明使用propsync的mixin
        props:{
            exampleImg:{
                type:String,
            }
        },
        data(){
            return{
                autoCrop: true,
                autoCropWidth: 200,
                autoCropHeight: 200,
                fixedBox: true
            }
        },
        watch:{

        },
        components:{
            VueCropper
        },
        methods:{
            closeVia(){
                this.p_exampleImg = '';
                //this.$emit("upOpenvia",this.p_exampleImg)
            },
            viasumbit(){
                this.$refs.cropper.startCrop() //开始截图
                this.$refs.cropper.stopCrop() //停止截图
                //this.$refs.cropper.clearCrop() //清除截图
                this.$refs.cropper.getCropBlob((data) => {
                    // do something
                    console.log(data)  
                    var formData = new FormData();
                    formData.append('uservia',data)
                    
                    this.$http.post('/api/uploadvia',
                        formData,{
                            headers:{'Content-Type': 'multipart/form-data'}
                        }).then(res => {
                        var res = res.data;
                        if(res.status){
                            this.$message({
                                message: `头像上传成功`,
                                type: 'success'
                            });
                            this.p_exampleImg = '';
                        }else{
                            this.$message.error('哭唧唧~err');
                        }
                    }).catch(err => {
                        this.$message({
                            message: `网络波动,请稍后重试 ${err}`,
                            type: 'warning'
                        });
                    })
                })
            }
        }
    }
</script>

<style>
    .viacon{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(26,26,26,.65);
        transition: background-color .3s ease-out;
        z-index: 100;
    }
    .viacondialog{
        position: absolute;
        width: 400px;
        height: 480px;
        left: 50%;
        top: 50%;
        margin: -240px 0 0 -240px;
        background: #fff;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
    }
    .viacondialog-top{
        position: relative;
    }
    .viacondialog-top>.Modal-title{
        margin-top: 40px;
        font-size: 24px;
        font-weight: 500;
        color: #1a1a1a;
        text-align: center;
    }
    .viacondialog-top>p{
        padding: 0 38px;
        margin-top: 4px;
        font-size: 14px;
        line-height: 1.5;
        color: #8590a6;
        text-align: center;
    }
    .viacondialog-con{
        width: 352px;
        height: 260px;
        margin: 20px auto;
    }
    .viacondialog-btn{
        width: 352px;
        margin:30px auto;
    }
    .viacondialog-btn>.via-btn{
        width: 100%;
    }
    .viacondialog-top-close{
        position: absolute;
        right: 11px;
        top: -28px;
        cursor: pointer;
        font-size: 21px;
    }
</style>