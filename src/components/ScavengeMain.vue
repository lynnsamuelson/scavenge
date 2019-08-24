<template>

  <div v-if="item.display === true" >

    <div v-if="item.got">
      <div class="answer">
        <p>Answer: {{item.answer}}</p>
      </div>
      <div class="image">
        <img :src="item.image" class="image">
      </div>
      <div class="description">
        <p>{{item.desc}}</p>
      </div>
    </div>
    <div v-else>
      <div class="clue">
        <p>Clue: {{item.clue}}</p>
      </div>
      <button v-on:click="GotIt()">Got It!</button>
    </div>
  </div>
</template>

<script>


export default {
  name: 'ScavengeMain',
  props: {
    item: Object
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
h3 {
  margin: 40px 0 0;
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
  color: #42b983;
}
</style>
