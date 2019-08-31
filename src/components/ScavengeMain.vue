<template>
<div v-if="data == 0">
  <div v-if="item.got && item.display">
    <p>Answer: {{item.answer}}</p>
    <div class="image">
      <img :src="item.image" class="image">
    </div>
  </div>
</div>
<div v-else-if="data == 1 && item.display" >
  <div v-if="!item.got">
    <div class="clue">
      <p>Clue: {{item.clue}}</p>
    </div>
    <button v-on:click="GotIt()" class="button">Got It!</button>
  </div>
</div>
<div v-else>
    <div v-if="item.display" >
      <div v-if="item.got" class="answer">
      <div>
        <p>Answer: {{item.answer}}</p>
      </div>
      <div class="image">
        <img :src="item.image" class="image">
      </div>
    </div>
    <div v-else>
      <div class="clue">
        <p>Clue: {{item.clue}}</p>
      </div>
      <button v-on:click="GotIt()" class="button">Got It!</button>
    </div>
  </div>
</div>
</template>

<script>


export default {
  name: 'ScavengeMain',
  props: {
    item: Object,
    data: Number
  },
  
  methods: {
     GotIt() {
      this.item.got = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.clue {
  margin: 55px 0 35px 0;
}

.answer {
  margin: 50px 0 0 0;
}

h3 {
  margin: 40px 0 0;
  color: #CACBCA;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #CACBCA;
}
</style>
