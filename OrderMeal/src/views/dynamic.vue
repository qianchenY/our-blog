<template>
    <div class="plate">
        <!-- <div class="plate-title">
            <img src="" alt="">
        </div> -->
        <ul class="plate-list">
            <li v-for="(item,index) in namicdata">
                <div class="plate-mode">
                    <div class="plate-mode-tit">
                        <router-link class="plate-mode-tit-a" :to="'/Homepage/DynamicDetails/'+item.id">{{item.title}}</router-link>
                    </div>
                    <div class="plate-mode-peopel">
                        <a href="javascript:void(0)">
                            <span class="peopel-name" @click="getuserpanel({username:item.author,userid:item.authorId})" >{{item.author}}</span>
                        </a>
                        <span title="签名">{{item.authordesc || '这家伙 very lazy，什么都没留下'}}</span>
                    </div>
                    <voicing :item="item" :index="index" :tog="String(commentShow)" :itemdata="namicdata" @toggle="toggleComment" />
                    <comment :dynamicId="item.id" v-if="commentShow==index" />
                </div>
            </li>
        </ul>
        <div class="block plate-paging">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[20, 30, 40, 50]" :page-size="20"
                layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>
        </div>
        <el-dialog
            title=""
            :visible.sync="dialogVisible"
            top="30vh"
            width="350px">
            <div class="userpanelcard">
                <div class="tal userpanel">
                    <div class="tal-l userpanel-l align-center align-top-pro">
                        <img :src="userpanelcard.userpic ||'../../static/images/default.png'" alt="" class="peopel-img">
                    </div>
                    <div class="tal-r userpanel-r align-left">
                        <p>{{userpanelcard.username || '未知'}}</p>
                        <p>{{userpanelcard.userdesc || '这家伙 very lazy，什么都没留下'}}</p>
                    </div>
                </div>
                <div class="userpanel-bottom">
                    <ul>
                        <li><p>{{userpanelcard.relation_type_A}}</p><p>关注</p></li>
                        <li><p>{{userpanelcard.relation_type_B}}</p><p>粉丝</p></li>
                        <li><p>{{userpanelcard.dynamicsNum}}</p><p>动态</p></li>
                    </ul>
                </div>
            </div>
            <span slot="footer" class="dialog-footer" v-if="!(userpanelcard.id == utag)">
                <el-button 
                    v-if="userpanelcard.relation_type==1" 
                    size="medium" 
                    :loading="dialogloadingOption.loading"
                    @click="friend({author:userpanelcard.username,authorId:userpanelcard.id},'1')">取消关注</el-button>
                <el-button 
                    type="primary"  
                    size="medium"
                    :loading="dialogloadingOption.loading"  
                    @click="friend({author:userpanelcard.username,authorId:userpanelcard.id})"
                    >{{userpanelcard.relation_type == 1 ? '已关注' : '关注'}}</el-button>
            </span>
        </el-dialog>
        <button @click="luo">{{aaa}}</button>
    </div>
</template>

<style lang="less" scoped>
    .plate-paging{
        max-width: 100%;
    }
</style>


<script>
    import voicing from '../components/voicing';
    import comment from '../components/comment';
    export default {
        name: 'dynamic',
        data() {
            return {
                dialogVisible: false,
                namicdata: '',
                pageTotal: null,
                pageSize: 20,
                currentPage: 1,
                commentShow: null,
                loading2: true,
                userpanelcard:{
                    username:'',
                    userdesc:'',
                    userpic:'',
                    relation_type:'1',
                    relation_type_A:0,
                    relation_type_B:0,
                    dynamicsNum:0
                },
                aaa:'<ssssss>',
                userAbout:`<div style="width:100%;
                    line-height:60px;
                    position:relative;
                    font-size:23px;
                    color:#409EFF;
                    text-align:center">
                    <i class="el-icon-loading"></i>
                    <span style="font-size:14px;position: relative;top: -3px;">加载中</span>
                </div>`,
                dialogVisible: false,
                dialogloadingOption:{
                    loading:false,
                    loadingtxt:'执行中...'
                }
            };
        },
        watch:{
            '$route' (to,form){
                this.getView();
            }
        },
        components: {
            voicing,
            comment
        },
        computed: {
            username() {
                return this.$store.state.username;
            },
            utag(){
                return this.$store.state.utag;
            }
        },
        created() {
            this.getView();
        },
        methods: {
            getView() {
                var _this = this,
                    str = '',
                    dyclass = this.$route.params.dyclass;
                if(dyclass){
                    str = `/api/getdynamic?page=${this.currentPage}&pageSize=${this.pageSize}&dyclass=${dyclass}`;
                }else{
                    str = `/api/getdynamic?page=${this.currentPage}&pageSize=${this.pageSize}`;
                }
                this.$http.get(str).then(res => {
                    var res = res.data
                    if (res.status == 1) {
                        res.result.map((v, i) => {
                            if (v.prepselfId) {
                                v.collectedconid ? v.iscur = true : v.iscur = false;
                                v.uplike ? v.iscurup = true : v.iscurup = false;
                            }

                        });
                        this.namicdata = res.result;
                        this.pageTotal = res.pagetotal
                    }

                })
            },
            luo() {
                this.$http.get('/api/luo?key=1&key=2&key=3').then(res => {
                    console.log(res)
                    var res = res.data
                    if (res.status) {
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
            },
            toggleComment(data) {
                this.commentShow = data;
            },
            getuserpanel(obj){
                this.$http.get(`/api/getdyuserInfo?id=${obj.userid}`)
                .then(res => {
                    var res = res.data;
                    if(res.status){
                        this.dialogVisible = true;
                        this.userpanelcard = res.result;

                        // this.userAbout = `
                        // <div class="userpanelcard">
                        //     <div class="tal userpanel">
                        //         <div class="tal-l userpanel-l align-center">
                        //             <img src=${res.result.userpic||'../../static/images/default.png'} alt="" class="peopel-img">
                        //         </div>
                        //         <div class="tal-r userpanel-r align-left">
                        //             <p>${res.result.username || '未知'}</p>
                        //             <p>${res.result.userdesc || '这家伙 very lazy，什么都没留下'}</p>
                        //         </div>
                        //     </div>
                        //     <div class="userpanel-bottom">
                        //         <ul>
                        //             <li><p>55</p><p>关注</p></li>
                        //             <li><p>55</p><p>粉丝</p></li>
                        //             <li><p>55</p><p>动态</p></li>
                        //         </ul>
                        //        <!--<button class="userpanel-bottom-btn">取消关注</button>-->
                        //     </div>
                        // </div>`;
                        // this.$alert(this.userAbout, ' ', {
                        //     showClose:true,
                        //     dangerouslyUseHTMLString: true,
                        //     showConfirmButton:true,
                        //     closeOnClickModal:true,
                        //     showCancelButton:res.result.relation_type==1 ? true : false,
                        //     confirmButtonText: res.result.relation_type?'已关注':'关注',
                        //     cancelButtonText:res.result.relation_type==1 ? '取消关注':'',
                        //     customClass:'userpanelDialog',
                        //     beforeClose:(action, instance, done) => {
                        //         var params = {
                        //             followername:res.result.username,
                        //             followerid:res.result.id,
                        //             username:this.username,
                        //             userid:this.utag
                        //         };
                        //         if (action === 'confirm') {
                        //             if(res.result.relation_type != 1){
                        //                 instance.confirmButtonLoading = true;
                        //                 instance.confirmButtonText = '执行中...';
                        //                 //对用户关注
                        //                 this.$http.post('/api/attention',params)
                        //                 .then(res => {
                        //                     var res = res.data;
                        //                     if(res.status){
                        //                         this.$notify({title: '提示',message: res.msg, offset: 100,type: 'success'});
                        //                         instance.confirmButtonLoading = false;
                        //                         instance.confirmButtonText = '已关注';
                        //                         done();
                        //                     }else{
                        //                         this.$notify({title: '提示',message: res.msg,offset: 100,type: 'warning'})
                        //                     }
                        //                 }).catch(err => {
                        //                     this.$message({
                        //                         message: `网络波动,请稍后重试 ${err}`,
                        //                         type: 'warning'
                        //                     });
                        //                 })
                        //             }
                        //         }else if(action == 'cancel' && instance.cancelButtonText == '取消关注'){
                        //             debugger
                        //             done();
                        //             console.log(instance)
                        //             // instance.cancelButtonLoading = true;
                        //             // instance.cancelButtonText = '执行中...';
                        //             // //取消对用户关注
                        //             // this.$http.post('/api/attention',{
                        //             //     ...params,
                        //             //     cancel:'1'
                        //             // }).then(res => {
                        //             //         var res = res.data;
                        //             //         if(res.status){
                        //             //             this.$notify({title: '提示',message: res.msg,offset: 100,type: 'success'});
                        //             //             instance.cancelButtonLoading = false;
                        //             //             instance.showCancelButton = false;
                        //             //             done();
                        //             //         }else{
                        //             //             this.$notify({title: '提示',message: res.msg,offset: 100,type: 'warning'})
                        //             //         }
                        //             //     }).catch(err => {
                        //             //         this.$message({
                        //             //             message: `网络波动,请稍后重试 ${err}`,
                        //             //             type: 'warning'
                        //             //         });
                        //             //     })
                        //         }else{
                        //             console.log(document.querySelector('.userpanel-bottom-btn'))
                        //             done();
                        //         }
                        //     }
                        // });
                        
                    } 
                }).catch(err => {
                    this.$message({
                        message: `网络波动,请稍后重试 ${err}`,
                        type: 'warning'
                    });
                })   
                
            },
            friend(item,cancel){
                var params = {
                    followername:item.author,
                    followerid:item.authorId,
                    username:this.username,
                    userid:this.utag,
                    cancel:cancel || '0'
                };
                this.dialogloadingOption.loading = true;
                this.$http.post('/api/attention',params)
                .then(res => {
                    var res = res.data;
                    this.dialogloadingOption.loading = false;
                    res.status ? 
                    this.$notify({title: '提示', message: res.msg,offset: 100,type: 'success'}):
                    this.$notify({title: '提示', message: res.msg,offset: 100,type: 'warning'});
                }).catch(err => {
                    this.$message({
                        message: `网络波动,请稍后重试 ${err}`,
                        type: 'warning'
                    });
                })
                this.dialogVisible = false;
            },
        },
        mounted(){
            
        }
    }
</script>