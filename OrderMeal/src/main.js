// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import XParticles from 'x-particles';
import ElementUI from 'element-ui'
import './assets/css/reset.css';
import './assets/css/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';
// import './assets/css/login.css';
// import './assets/css/header.less';
//import './assets/css/messcard.css';
//import './assets/css/component.css';

console.log(Vuex)

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(XParticles);
Vue.use(ElementUI);
Vue.use(Vuex);

Vue.filter('getDateDiff', (dateTimeStamp) => {
  dateTimeStamp = dateTimeStamp.replace(/-/g, "/");
  dateTimeStamp = new Date(dateTimeStamp).getTime();
  var minute = 1000 * 60, hour = minute * 60, day = hour * 24, halfamonth = day * 15, month = day * 30, year = month * 12, now = new Date().getTime(), diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    console.log("日期不合法");
    return;
  }
  var yearC = diffValue / year, monthC = diffValue / month, weekC = diffValue / (7 * day), dayC = diffValue / day, hourC = diffValue / hour, minC = diffValue / minute;
  var result = "";
  yearC >= 1 ? result = `${parseInt(yearC)}年前` :
    monthC >= 1 ? result = `${parseInt(monthC)}个月前` :
      weekC >= 1 ? result = `${parseInt(weekC)}周前` :
        dayC >= 1 ? result = `${parseInt(dayC)}天前` :
          hourC >= 1 ? result = `${parseInt(hourC)}个小时前` :
            minC >= 1 ? result = `${parseInt(minC)}分钟前` :
              result = "刚刚";
  return result;
});


/*
*---------------Buddha be here!----------/
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  ` - `.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            佛祖保佑       永无BUG!
*
*/

Vue.http.interceptors.push((request, next) => {
  const loading = ElementUI.Loading.service({
    target: '.denglucon',
    fullscreen: true,
    text: store.state.httpmsg || '正在加载...',
  })
  next((response) => {
    if (response.status == 200) {
      loading.close();
    }
    return response;
  })
})



const store = new Vuex.Store({
  state: {
    username: '',
    lostat: '0',
    utag: '',
    desc:'',
    pic:'',
  },
  mutations: {
    updataUsername(state, username) {
      state.username = username;
    },
    updataLostat(state, lostat) {
      state.lostat = lostat;
    },
    updataUtag(state, utag) {
      state.utag = utag;
    },
    updataDesc(state,desc){
      state.desc = desc;
    },
    updataPic(state,pic){
      state.pic = pic;
    }
  }
});


console.log(store)
/* eslint-disable no-new */
/* 创建和挂在根实例*/
new Vue({
  el: '#app',
  router,
  store,
  computed: {
    lostat() {
      return this.$store.state.lostat
    }
  },
  methods: {
    checkDoLogin() {
      this.$http.get('/api/checkdologin').then(res => {
        var res = res.data;
        if (res.status == 1) {
          this.$store.commit("updataUsername", res.result.username);
          this.$store.commit("updataLostat", res.result.lostat);
          this.$store.commit("updataUtag", res.result.usernameId)
          this.$store.commit("updataPic", res.result.userpic)
          this.$router.push('/Homepage/dynamic/0');
        } else {
          this.$router.push('/Loginpage')
        }
      })
    },
    aa() {
      console.log(this.$store.state)
      console.log(this.$store.state.lostat)
    }
  },
  mounted() {
    this.checkDoLogin();
    this.aa();
    //this.$router.history.push('/Loginpage');
    //this.$router.history.push('/Loginpage')    
    //debugger;
    // if(this.lostat == "1"){
    //   this.$router.history.push('/Homepage');
    // }else{
    //   this.$router.history.push('/Loginpage')
    // }
  },
  template: '<App/>',
  components: { App }
})
