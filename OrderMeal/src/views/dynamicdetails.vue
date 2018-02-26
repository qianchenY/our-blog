<template>
    <div class="dynamic-details">
        <div class="details-query">
            <div class="details-top">
                <div class="tal">
                    <div class="tal-l">
                        <img src="../../static/images/wen.png" class="title-img">
                    </div>
                    <div class="tal-r">
                        <h1>{{querydata.title}}</h1>
                    </div>
                </div>
                <!-- <p>{{$route.params.id}}</p> -->
            </div>
            <div class="details-con" v-html="querydata.dycontent">
               
            </div>
            <!--投票选项-->
            <el-table
                :data="querydata.votes"
                style="width: 100%"
                v-if="querydata.openVote">
                <el-table-column
                label="选项"
                >
                <template slot-scope="scope">
                    {{ scope.row.title }}
                </template>
                </el-table-column>
                <el-table-column
                label="票数"
                >
                <template slot-scope="scope">
                    {{ scope.row.num }}
                </template>
                </el-table-column>
                <el-table-column label="比例">
                <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="18" :percentage="querydata.votesMxa ? Math.floor(scope.row.num / querydata.votesMxa * 100) : scope.row.num" status="success"></el-progress>
                </template>
                </el-table-column>
                <el-table-column label="投票" v-if="isUpdateVotes">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="updateVotes(scope.$index)">投票</el-button>
                </template>
                </el-table-column>
            </el-table>            
            <!--作者选项-->
            <el-button-group class="details-info" v-if="isAuthor">
                <el-button type="primary" icon="el-icon-edit" @click="updateCurrent"></el-button>
                <el-button type="primary" icon="el-icon-delete" @click="deleteCurrent"></el-button>
            </el-button-group>              
        </div>

    </div>
</template>

<style lang="less" scope>
    .details-info{
        margin: 10px 0;
        text-align: right;
    }
</style>

<script>
    export default {
        name: 'dynamicdetails',
        data(){
            return{
                querydata:'',
                isAuthor: false,
                isUpdateVotes: true
            }
        },
        methods:{
            getqueryData(){
                this.$http.get('/api/getdynamicdetails?id='+this.$route.params.id).then(res => {
                    var res = res.data;
                    if(res.status == 1){
                        this.querydata = res.result[0];

                        // 获取投票选项
                        if(this.querydata.openVote == 1){
                            var votesMax = 0;
                            this.querydata.votes = this.querydata.votes.split("|").map((v,k) => {
                                let obj = {},
                                    val = v.split("=");
                                
                                obj["title"] = val[0];
                                obj["num"] = parseInt(val[1]);  
                                votesMax += obj["num"];  

                                return obj;
                            });

                            this.querydata.votesMxa = votesMax;
                        }
                    }
                })
            },
            // 删除记录
            deleteCurrent(){    
                var _this = this;
                this.$http.get('/api/deletedynamic?id='+this.$route.params.id).then(res => {
                    var res = res.data;
                    if(res.status){      
                        _this.$alert('删除成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                _this.$router.push('/Homepage/dynamic'); 
                            }
                        });                      
                    }
                })
            },
            // 判断是否作者及是否投票
            updateData(){
                this.$http.get('/api/isAuthor?id='+this.$route.params.id).then(res => {
                    var res = res.data;
                    if(res.status){                  
                        this.isAuthor = true;
                    }
                });

                this.$http.get('/api/isUpdateVotes?id='+this.$route.params.id).then(res => {
                    var res = res.data;
                    if(res.status){                  
                        this.isUpdateVotes = false;
                    }
                });
                
            },
            //更新记录
            updateCurrent(){
                this.$router.push({path: "/Homepage/editorpage", query:{id:this.$route.params.id}})
            },      
            //点击投票
            updateVotes(i){
                var _this = this,votes,activeVotes;

                // 票数自增
                _this.querydata.votes[i].num++;
                // 总票数更改
                _this.querydata.votesMxa++;

                // 更新投票选项
                votes = _this.querydata.votes.map((v,k) => {
                    return v["title"] + "=" + v["num"];
                }).join("|");
                
                _this.$http.post('/api/updateVotes',{ id: _this.$route.params.id, activeVotes: _this.querydata.votes[i].title, votes: votes }).then(res => {
                    if(res.data.status){
                        _this.$alert('投票成功', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                // 投票关闭
                                _this.isUpdateVotes = false;
                            }
                        });  
                    }
                });
                
            }
        },
        created(){
            this.getqueryData();
            this.updateData();
        },
        mouthed(){
            //window.scrollTo(0,0);
            //this.getqueryData();
            //console.log(this.$router.params.id)
        }
    }
</script>

<style>
</style>