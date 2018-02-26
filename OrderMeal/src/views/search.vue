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
                        <a href="#">
                            <!-- <img src="../../static/images/default.png" alt="" class="peopel-img"> -->
                            <span class="peopel-name">{{item.author}}</span>
                        </a>
                        <span>此处应该有签名签名签名签名</span>
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
        <button @click="luo">{{aaa}}</button>
    </div>
</template>

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
                aaa:'<ssssss>'
            };
        },
        components: {
            voicing,
            comment
        },
        computed: {
            username() {
                return this.$store.state.username;
            }
        },
        watch: {
            '$route' (to, form){
                this.getView();
            }
        },
        created() {
            this.getView();
        },
        methods: {
            getView() {
                this.$http.get(`/api/getdynamic?page=${this.currentPage}&pageSize=${this.pageSize}&search=${this.$route.query.search}`).then(res => {
                    console.log(res)
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
            }
        }
    }
</script>