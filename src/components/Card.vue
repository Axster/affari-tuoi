<script setup>
import { ref, defineProps, computed } from 'vue';

const props = defineProps({
  money: Number,
});

// const colorMoney = computed(() => props.money > 4999 ?  'red' :'blue');

</script>

<template>
  <div class="card-money"
  :class="{'red' : props.money > 4999, 'blue' : props.money < 5001 }">
    {{ props.money > 999 ? '€' + String(props.money).slice(0, -3) 
    + '.' + String(props.money).slice(-3) :'€' + String(props.money) }}
  </div>
</template>

<style scoped>

.card-money{
    /* background-color:var(--bg-color) ; */
    color:white;
    font-weight: 600;
    font-size: 23px;
    border-radius: 10px;
    width: 200px;
    padding:3px;
    padding-left: 20px;
    transition: width 1s ease-in-out
}

.red{
  background: rgb(255,108,108);
  background: linear-gradient(0deg, rgba(255,108,108,1) 0%, rgba(146,18,18,1) 31%, rgba(155,18,18,1) 70%, rgba(255,84,84,1) 100%);
}

.blue{
  background: rgb(84,115,255);
  background: linear-gradient(0deg, rgba(84,115,255,1) 0%, rgba(18,22,146,1) 31%, rgba(18,27,155,1) 70%, rgba(84,115,255,1) 100%);
}

</style>