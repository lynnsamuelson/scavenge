<template>
  <div >
    <div v-if="item.display == true" class="answer">
      <p>{{item.clue}}</p>
      <div v-if="item.checked">
        <p>Answer: {{item.answer}}</p>
      </div>
      <button v-on:click="Checked()" class="left button greenBtn">{{btnText}}</button>
      <button v-on:click="AnotherClue()" class="right button greenBtn">Next</button>
    </div>
  </div>
</template>

<script>


export default {
  name: 'Secondary',
  props: {
    item: Object,
  },
  data() {
    return {btnText: "Found It!" }   
  },
  methods: {
    Checked(){
      if(this.item.checked){
        this.item.checked = false;
      } else {
        this.item.checked = true;
      }
      this.btnText = "Hide Answer";
    },
    AnotherClue(){
      this.$parent.AnotherClue();
    }
    
    
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    padding: -10px;
    margin: 10px 0 0 -36px;
  }

  .greenBtn {
    background-color: #46B019;
  }
</style>
