<template>
  <div id="app">
    <div class="nav control">
      <h2 class="title">Encore Scavenger Hunt</h2>
      <button v-on:click="GetFirstItem(1)" id="foundBtn" :class="{'displaying' : display == 1}" class="left button" >Found</button>
      <button v-on:click="GetFirstItem(0)" id="toFindBtn" class="left button" :class="{'displaying' : display == 0}">To Find</button>
      <button v-on:click="GetFirstItem(2)" id="allBtn" class="left button" :class="{'displaying' : display == 2}">All</button>
    </div>
    <div class="card topcard">
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
import Secondary from './components/Secondary.vue'

import secondary from '../public/hunts/encoreHunt.json'
import huntItems from '../public/hunts/encorePrimary.json'
import { fileURLToPath } from 'url';
      

export default {
  name: 'app',
  components: {
    ScavengeMain,
    Secondary
  },
  data() {
    //display 0 - show not complete
      //display 1 - show complete
      //display 2 - show all
    return {items: huntItems, secondary:secondary, display: 0}
  },
  mounted:function(){
    this.GetFirstItem(this.display);
  },
  computed: {
    found: function(){
      var displayFound = [];
      for(var i = 0; i<this.items.length; i++){
        if(this.items[i].got === true){
          displayFound.push(this.items[i]);
        } 
      }
      return displayFound;
    },
    toFind: function(){
      var displayNotFound = [];
      for(var i = 0; i<this.items.length; i++){
        if(this.items[i].got === false){
          displayNotFound.push(this.items[i]);
        } 
      }
      return displayNotFound;
    },
    noClues: function(){
      var noClues = [];
      var item = {
        "id": 5,
        "clue": "NEED CLUE ",
        "answer": "First TN Park",
        "image": "/img/firstTNPark.jpg",
        "desc": "This is the description of the First TN Park",
        "directions": "Dicetions to the First TN Park",
        "order": 5,
        "display": true,
        "got": false
      }
      noClues.push(item);
      return noClues;
    }
  },
  methods: {
    Next() {
      let displays = [];
      switch(this.display){
        case 0:
          //need to fix bug that if you find all the things it does not cycle and stays on last item
          console.log("length", this.toFind.length)
          if(this.toFind.length > 0){
            displays = this.toFind;
          } else {
            displays = this.noClues;
          }
          break;
        case 1: 
          displays = this.found;
          break;
        default:
          displays = this.items;
          break;
      }
      let currentIndx = this.items.findIndex(el => el.display === true);
      let displaysCurrentIndx = displays.findIndex(el => el.id == this.items[currentIndx].id);
      let next;
      if(displaysCurrentIndx === displays.length-1){
        next = displays[0];
      } else {
        next = displays[displaysCurrentIndx+1];
      } 

      let nextIndx = this.items.findIndex(el => el.id === next.id);
      this.items[currentIndx].display = false;
      this.items[nextIndx].display = true;

      return nextIndx;
    },
    Previous(){
      let displays = [];
      switch(this.display){
        case 0:
          displays = this.toFind;
          break;
        case 1: 
          displays = this.found;
          break;
        default:
          displays = this.items;
          break;
      }
      let currentIndx = this.items.findIndex(el => el.display === true);

      let displaysCurrentIndx = displays.findIndex(el => el.id == this.items[currentIndx].id);
      let prev;
      if(displaysCurrentIndx === 0){
        prev = displays[displays.length-1];
      } else {
        prev = displays[displaysCurrentIndx-1];
      } 

      let prevIndx = this.items.findIndex(el => el.id === prev.id);
      this.items[currentIndx].display = false;
      this.items[prevIndx].display = true;

      return prevIndx;
    },
    ClearDisplay(){
      for(var i = 0; i< this.items.length; i++){
        this.items[i].display = false;
      }
    },
    GetFirstItem(display){
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
    },
    AnotherClue(){
      let currentClueIndx = secondary.findIndex(el => el.display === true);
      let nextClue = secondary[currentClueIndx+1];
      
      secondary[currentClueIndx].display = false;
      if(secondary[currentClueIndx+1]){
        secondary[currentClueIndx+1].display = true;
      } else {
        secondary[0].display = true;
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
  color: #ffffff;
  margin-top: 20px;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #07050c;
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

.title {
  margin: -4px 0 10px 0;
}

.h5Wrapper {
    background-color: #46B019;
    min-height: 35px;
    width: 100%;
    position: relative;
    margin: 0 0 10px 0;
}

.card{
  margin: 1% 15%;
  height: 520px;
  float: left;
  width: 70%;
  padding: 5%;
}

.topcard {
  background-color: #279ECC;
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
  background-color: #90D277;
  height: 280px;
}

.nav {
  margin: 0 0 35px 0;
}

.control{
 background-color: #A34F3366;
  margin: 1% 15%;
  float: left;
  width: 70%;
  padding: 5%;
}

.image {
  height: auto;
  width:85%;
  margin: 0 5%;
}

.button {
  background-color: #00336685;
  border: none;
  min-height: 25px;
  color: #CACBCA;
  min-width: 48%;
}



.right {
  float:right;
}
.control .button {
  background-color: #00336633;
  min-height: 50px;
  border-radius: 50%;
  min-width: 50px;
  margin: 0 20px; 
}
#app .displaying {
  background-color: #A34F33;
}

@media (max-width: 450px) { 
  .control{
    background-color: #A34F3366;
    margin: 5% 5%;
    float: left;
    width: 90%;
    padding: 5%;
  }

  .left {
    float: left;
  }

  .card{
    margin: 5% 5%;
    width: 90%;
    height: 280px;
  }

}

</style>
