<template>
  <div id="app">
    <div class="cardBackGround" style="width: 500px">
      <el-card shadow="hover" v-for="(item, i) in this.tabs_data"
               style="padding: 15px" @click.native="clickCallBack(item.index)">
        {{item.private_name ? item.private_name : item.title}}
        <el-button type="text" class="button" @click.stop="clickUpdate(item.title, item.id)"
                   style="float: right">编辑</el-button>
      </el-card>
      <el-dialog :visible.sync="is_update_on" title="编辑标签页名称" :close-on-click-modal="false" :modal="false" width="450px">
        <el-form :model="tabs_content_options" ref="form"  class="updateTabsForm">
          <el-form-item label="原始名称" prop="ori_name">
            <el-input v-model="tabs_content_options.origin_title" disabled>
            </el-input>
          </el-form-item>
          <el-form-item label="更改名称" prop="pri_name">
            <el-input v-model="tabs_content_options.private_title" >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateTabsTitle">更新</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "app",
    data(){
      return{
        tabs_data: [],
        is_update_on: false,
        tabs_bg_data: {},
        tabs_content_options: {
          origin_title: '',
          private_title: '',
          tab_id: ''
        },
        test: ''
      }
    },
    mounted() {
      this.getTabsAll();
      this.test = chrome.extension.getBackgroundPage();
      this.tabs_bg_data = this.test.getBgData();
    },
    methods: {
      setPriName(){
        this.tabs_data.forEach(item => {
          if (item.id in this.tabs_bg_data){
            item['private_name'] = this.tabs_bg_data[item.id]
          }
        });
        console.log('setPri内');
        console.log(this.tabs_data);
      },
      clickCallBack(index){
        chrome.tabs.highlight({tabs: index}, s => console.log(s))
      },
      updateTabsTitle(){
        this.is_update_on = false;

        this.tabs_bg_data[this.tabs_content_options.tab_id] = this.tabs_content_options.private_title;
        this.test.setBgData(this.tabs_bg_data);
        this.setPriName();
      },
      clickUpdate(target, tabs_id){
        if (this.tabs_bg_data === undefined){
          this.tabs_bg_data = {};
        }
        this.tabs_content_options.origin_title = target;
        this.tabs_content_options.tab_id = tabs_id;
        if (tabs_id in this.tabs_bg_data){
          this.tabs_content_options.private_title = this.tabs_bg_data[tabs_id];
        }
        else {
          this.tabs_content_options.private_title = '';
        }
        this.is_update_on = true;
      },
      getTabsAll(){
        chrome.tabs.query({currentWindow: true}, k => this.callback_f(k));

      },
      callback_f(tabs){
        this.tabs_data = tabs;
        this.setPriName();
      }
    }
  };
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
