<template>
    <div class="container-fluid d-flex justify-content-center col m-3 flex-nowrap">
        <div class="box" 
             :class="{ 'open': isOpen }"
             @click="toggleBox">
            <div class="side front">
                <div class="text number">{{ props.number }}</div>
            </div>
            <div class="side back"></div>
            <div class="side right"></div>
            <div class="side left"></div>
            <div class="side top" :class="{ 'open': isOpen }" @click="isOpen && toggleBox">
                <div class="inner-box">
                    <div class="text">{{ money }}</div>
                </div>
            </div>
            <div class="side bottom"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  money: Number,
  number: Number,
  concurrent: Boolean,
  winnings: {
    type: Array,
    default: () => [] 
  },
  openedBoxes: {
    type: Number,
    default: 0  
  }
});

const emit = defineEmits(['lastBox', 'addOpenedBox']);

const isOpen = ref(false);
const money = ref(props.money > 999 ? '€' + String(props.money).slice(0, -3) +
                 '.' + String(props.money).slice(-3) :'€' + String(props.money))

const toggleBox = () => {
    if(props.concurrent){
        return
    }
    emit('addOpenedBox', props.money);
    console.log('pacchi cliccati: ' + props.openedBoxes)//DEBUG
    if (!isOpen.value) {
        isOpen.value = true;
        if (props.openedBoxes === props.winnings.length - 1) {
            emit('lastBox');
        } 
    } 
};
</script>


<style scoped>
.container {
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: sans-serif;
}

.box {
    width: 60px;
    height: 40px;
    transform-style: preserve-3d;
    transform: rotateY(20deg) translateZ(30px);
    background-color: blue;
    cursor: pointer;
    transition: transform 3s ease-in-out, width 3s ease-in-out, height 3s ease-in-out;
}


@keyframes boxAnimation {
    0% {
        transform: rotateY(26deg) scale(1) translateZ(0) translateY(0);
    }
    30%, 85% {
        transform: rotateY(-15deg) scale(2) translateZ(100px) translateY(10px);
    }
    100% {
        transform: rotateY(26deg) scale(1) translateZ(0) translateY(0);
    }
}


.box.open {
    animation: boxAnimation 3s ease-in-out;
    pointer-events: none;
    z-index: 2;
}

.top.open {
    transform: rotateX(180deg);
}

.side {
    position: absolute;
    width: 60px;
    height: 40px;
    background: rgb(30, 29, 169);
    background: linear-gradient(90deg, rgba(30, 29, 169, 1) 0%, rgba(53, 75, 229, 1) 51%, rgba(9, 23, 102, 1) 100%);
}

.front {
    transform: translateZ(30px);
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.back {
    transform: rotateY(180deg) translateZ(30px);
}

.right {
    transform: rotateY(90deg) translateZ(30px);
}

.left {
    transform: rotateY(-90deg) translateZ(30px);
}

.top {
    transform: rotateX(90deg) translateY(-20px);
    transform-origin: top;
    transition: transform 3s ease-in-out, width 3s ease-in-out, height 3s ease-in-out;
}

.bottom {
    transform: rotateX(-90deg) translateZ(20px);
}

.inner-box {
    position: absolute;
    width: 48px;
    height: 32px;
    background: rgb(255, 255, 255);
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgb(218, 219, 219) 100%);
    top: 3px;
    left: 6px;
    transform: rotate(180deg) rotateY(180deg);
    display: flex;
    align-items: center;
    justify-content: center;
}

.text {
    font-weight: bold;
    font-size: 10px;
}

.number{
    font-size: 20px;
    color:rgb(249, 249, 249)
}

</style>