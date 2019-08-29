<template>
  <div >
    <input type="checkbox" v-on:click="Checked()"/>
    <span v-if="item.checked" class="answer">{{item.answer}}</span>
    <span v-else class="clue">{{item.clue}}</span>
  </div>
</template>

<script>


export default {
  name: 'Secondary',
  props: {
    item: Object
  },
  methods: {
    Checked(){
      console.log("checking item", this.item);
      if(this.item.checked){
        this.item.checked = true;
      } else {
        this.item.checked = true;
      }
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

  
  
</style>
