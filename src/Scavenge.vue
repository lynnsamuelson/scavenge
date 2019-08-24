<template>
  <div id="app">
    <h1>Welcome to Our Scavenger Hunt</h1>
    <div class="card">
      <div class="nav">
        <button v-on:click="Previous()" class="left">Previous</button>
        <button v-on:click="Next()" class="right">Next</button>
      </div>
      <ScavengeMain v-for="item in items" :key="item.id" :item="item"/>
    </div>
    <div class="list">
      <h5>Completed Items</h5>
      <Done v-for="item in items" :key="item.id+100" :item="item" />
    </div>
  </div>
</template>

<script>
import ScavengeMain from './components/ScavengeMain.vue'
import Done from './components/Done.vue'
var huntItems = [
  {
    id: 1,
    clue: "This is the TN seat of government",
    answer: "State Capital",
    image: "/img/tanner-boriack-GmoaEH48m8c-unsplash.eef08a16.jpg",
    desc: "This is the description of the State Capital.",
    order: 1,
    display: true,
    got: false
  },
  {
    id: 2,
    clue: "This is where farmers go to sell their commodities",
    answer: "Farmer's Market",
    image: "/img/tanner-boriack-GmoaEH48m8c-unsplash.jpg",
    desc: "This is the description of the Farmer's Market.",
    order: 2,
    display: false,
    got: true
  },
  {
    id: 3,
    clue: "This is where firemen sleep",
    answer: "Firehouse",
    image: "/img/tanner-boriack-GmoaEH48m8c-unsplash.eef08a16.jpg",
    desc: "This is the description of the Firehouse.",
    order: 3,
    display: false,
    got: false
  }
]

export default {
  name: 'app',
  components: {
    ScavengeMain,
    Done
  },
  data() {
    return {items: huntItems}
  },
  methods: {
    Next() {
      let items = this.items;
      let currentIndx = this.items.findIndex(el => el.display === true);
      let order = this.items[currentIndx].order + 1;
      let nextIndx = this.items.findIndex(el => el.order === order);
      
      function getNext(nextIndx) { 
        let nextItem = items[nextIndx];
        if(!nextItem.got) {
          nextItem.display = true;
        } else {
          nextIndx = items.findIndex(el => el.order === order+1);
          getNext(nextIndx);
        }
        return nextIndx;
      };
      getNext(nextIndx);
      this.items[currentIndx].display = false;
    },
    Previous(){
      let currentIndx = this.items.findIndex(el => el.display === true);
      let order = this.items[currentIndx].order - 1
      let prevIndx = this.items.findIndex(el => el.order === order);
      this.items[prevIndx].display = true;
      this.items[currentIndx].display = false;
    }
  }
}
</script>

<style>
#app {

  content: "";
    display: table;
    clear: both;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

* {
  box-sizing: border-box;
}

h5 {
    margin: 0;
    background-color: gray;
  }

.card{
  border: 1px solid #000;
  margin: 0 10px;
  height: 500px;
  float: left;
  width: 63%;
  padding: 10px;
}

.list {
  float: right;
  width: 30%;
  height: 500px;
  padding: 10px;
  border: 1px solid #000;
}

.nav {
  margin: 0 0 35px 0;
}
.image {
  height: auto;
  width:90%;
}

.left {
  float: left;
}

.right {
  float:right;
}
</style>
