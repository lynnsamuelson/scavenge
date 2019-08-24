<template>
  <div >
    <ul>
      <li v-if="item.got">
        {{item.answer}}
      </li>
    </ul>
  </div>
</template>

<script>


export default {
  name: 'Done',
  props: {
    item: Object
  },
  methods: {
    
    
  }
}
</script>

<style scoped>
  ul {
    list-style: none;
    padding: -10px;
    margin: 10px 0 0 -36px;
  }

  h5 {
    margin: 0;
    background-color: gray;
  }
  
</style>
