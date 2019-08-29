<template>
  <div id="app">
    <h2>Encore Scavenger Hunt</h2>
    <button v-on:click="GetFirstItem(1)" id="foundBtn" class="left button">Found</button>
    <button v-on:click="GetFirstItem(0)" id="toFindBtn" class="left button">To Find</button>
    <button v-on:click="GetFirstItem(2)" id="allBtn" class="left button">All</button>
    <div class="card">
      <div class="nav">
        <button v-on:click="Previous()" class="left button">Previous</button>
        <button v-on:click="Next()" class="right button">Next</button>
      </div>
      <ScavengeMain v-for="item in items" :key="item.id" :item="item" :data="2"/>
    </div>
    <div class="card bottomCard">
      <div class="h5Wrapper">
        <h5>Other Things to Find</h5>
      </div>
      <Secondary v-for="item in secondary" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import ScavengeMain from './components/ScavengeMain.vue'
import Done from './components/Done.vue'
import Secondary from './components/Secondary.vue'

import secondary from '../public/hunts/encoreHunt.json'
import huntItems from '../public/hunts/encorePrimary.json'
import { fileURLToPath } from 'url';
      

export default {
  name: 'app',
  components: {
    ScavengeMain,
    Done,
    Secondary
  },
  data() {
    return {items: huntItems, secondary:secondary, display: 0}
  },
  mounted:function(){
    console.log("this is page load", this.display);
    this.GetFirstItem(this.display);
  },
  computed: {
    filteredDisplays: function() {
      var displayFound = [];
      let displayNotFound = [];
      let displayAll = [];
      for(var i = 0; i<this.items.length; i++){
        if(this.items[i].got === true){
          displayFound.push(this.items[i]);
        } else {
          displayNotFound.push(this.items[i]);
        }
        displayAll.push(this.items[i]);
      }
      let filteredLists = [];
      filteredLists.push(displayFound);
      filteredLists.push(displayNotFound);
      filteredLists.push(displayAll);
      return filteredLists;
    }
  },
  methods: {
    Next() {
      console.log("display", this.display, this.items);

      // let items = this.items;
      let currentIndx = this.items.findIndex(el => el.display === true);
      
      let displays = this.filteredDisplays[this.display];
      console.log("displays", displays);
      
      // let order = this.items[currentIndx].order + 1;
      // let nextIndx = this.items.findIndex(el => el.order === order);
      // if(nextIndx == -1){
      //   nextIndx = this.items.findIndex(el => el.order == 1);
      // }
    
      // let nextItem = items[nextIndx];
      // nextItem.display = true;
      // this.items[currentIndx].display = false;
      // return nextIndx;
    },
    Previous(){
      let currentIndx = this.items.findIndex(el => el.display === true);
      let order = this.items[currentIndx].order - 1
      let prevIndx = this.items.findIndex(el => el.order === order);

      function GetLastItem(prevIndx, items){
        let lastItem = 0;
        for(var i = 0; i<items.length; i++) {
          if(items[i].order > prevIndx){
            prevIndx = i;
          }
        }
        return prevIndx;
      }

      if(prevIndx == -1){
        prevIndx = GetLastItem(prevIndx, this.items);
      };
      
      this.items[prevIndx].display = true;
      this.items[currentIndx].display = false;
    },
    ClearDisplay(){
      for(var i = 0; i< this.items.length; i++){
        this.items[i].display = false;
      }
    },
    GetFirstItem(display){
      //display 0 - show not complete
      //display 1 - show complete
      //display 2 - show all
      this.display = display;
      this.ClearDisplay();
      switch(display){
        case 0: 
          var item = this.items[0];
          for(var i = 0; i < this.items.length; i++){
            if(this.items[i].order < item.order && !this.items[i].got){
              item = this.items[i];
            }
          }
          item.display = true;
          break;
        case 1:
          var item;
          for(var i = 0; i < this.items.length; i++){
            if(this.items[i].got){
              if(item){
                if(this.items[i].order < item.order){
                  item = this.items[i];
                }
              }else {
                item = this.items[i];
              }
            }
          }
          item.display = true;
          break;
        default :
          this.items[0].display = true;
          break;
      }
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  content: "";
    display: table;
    clear: both;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #CACBCA;
  margin-top: 20px;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #010201;
  color:#CACBCA;
}

h5 {
    margin: 0;
    color: #CACBCA;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%)
  }

.h5Wrapper {
    background-color: #003366;
    min-height: 35px;
    width: 100%;
    position: relative;
    margin: 0 0 10px 0;

}

.card{
  border: 1px solid #CACBCA;
  margin: 5% 5%;
  height: 300px;
  float: left;
  width: 90%;
  padding: 5%;
}

.list {
  float: right;
  padding: 10px;
  border: 1px solid #fff;
  text-align: center;
}

.found {
  float: right;
  width: 30%;
  height: 500px;
}

.bottomCard {
  margin: 10px 0 0 10px;
}

.nav {
  margin: 0 0 35px 0;
}
.image {
  height: auto;
  width:90%;
}
.button {
  background-color: #003366;
  border: none;
  min-height: 25px;
  color: #CACBCA;
  min-width: 48%;
}

.left {
  float: left;
}

.right {
  float:right;
}
</style>
