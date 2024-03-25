
<template>
    <div class="container-fluid" :class="{'backGame' : backGame}">
        <div v-if="start" class="modal">
            <div class="inner-modal p-5">
                <h2>Inizia a giocare! Buona fortuna!!</h2>
                <button  class="btn btn-primary" @click="clickStart">Gioca</button>
            </div>
        </div>

        <div class="money-cards d-flex flex-column">
            <Card v-for="winning in remainingWinnings" :key="'box-'+winning"
                :money="winning"
            />
        </div>

        <div class="row d-flex justify-content-center mt-5 pt-5">
            <!-- Box con numero e vincita casuali, lato sinistro -->
            <div class="box col-6 d-flex flex-wrap">
                <Box v-for="number in boxNumber.slice(1)" :key="'box-'+number" :number="number" 
                    :money="winnings[number-1]" :openedBoxes="openedBoxes" :winnings="winnings"
                    @lastBox="handleLastBox" @addOpenedBox="handleAddOpenedBox" class="mt-5 mb-5"
                />
            </div>

            <!-- Box con numero e vincita casuali -->
            <div class="box box-concurrent col-12 m-5 pt-5">
                <Box :key="'box-' + boxNumber[0]" :number="boxNumber[0]" :money="winnings[boxNumber[0]-1]" 
                    :concurrent="concurrent" :openedBoxes="openedBoxes" :winnings="winnings"
                    @lastBox="handleLastBox" @addOpenedBox="handleAddOpenedBox" 
                />
            </div>
        </div>

        <!-- Modale dell'offerta -->
        <Doctor :isOpen="isModalOpen" :potentialOffer="potentialOffer" :offer="offer" @accept="handleAccept" @reject="handleReject" 
                @continuePotential="handleContinuePotential" @activePotentialOffer="handleActivePotentialOffer"/>
        <!-- Div con l'offerta accettata -->
        <div v-if="acceptedOffer" class="accepted-offer">
            Offerta accettata: {{ acceptedOffer }}
        </div>
         <!-- ultimo messaggio -->
        <div v-if="isLastBox" class="modal">
            <div class="inner-modal">
                <h2>Complimenti! non resta altro che aprire il tuo pacco! cosa aspetti? apri</h2>
                <button class="btn btn-primary" @click="continueLastBox">continua</button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import Box from './Box.vue';
import Doctor from './Doctor.vue';
import Card from './Card.vue';
import { ref } from 'vue';


const shuffle = () => {
    const numbers = [1,2,3,4,5,6,7,8,9,10]
    const shuffled = [];
    while (shuffled.length < numbers.length) {
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        if (!shuffled.includes(number)) {
            shuffled.push(number);
        }
    }
    return shuffled;
};

const start = ref(true)
const acceptedOffer = ref(0);
const boxNumber = shuffle();
const openedBoxes = ref(1);
const concurrent = ref(true);
const isModalOpen = ref(false);
const offer = ref(0);
const countOffer = ref(0);
let winnings = ref([
    0, 5, 20, 75, 500, 10_000, 20_000,
    50_000, 100_000, 300_000
]);
const remainingWinnings = ref(winnings.value);
const backGame = ref(false)
const isLastBox = ref(false)
const potentialOffer = ref(false);


const clickStart = () =>{
    start.value = false
}

const cotinueLAstBoxDelay = () => {
    setTimeout(() => {
       isLastBox.value = false
    }, 2000); // Imposto il ritardo a 4 secondi
};

const continueLastBox = () =>{
    cotinueLAstBoxDelay()
}

const handleLastBox = () => {
    concurrent.value = false;
};

//funzione che decide la frequenza delle offerte e apre la modale
const doOffer = () =>{
    countOffer.value++
    if (openedBoxes.value < 4 || openedBoxes.value > 8){
        return false
    }
    if (countOffer.value === 3){
        countOffer.value = 0
        return true
    } 
    return Boolean(Math.round(Math.random()))
}


// Funzione per impostare il ritardo sull'apertura della modale- fatta a parte per poterla invocare nell'handler
const setModalOpenWithDelay = () => {
    setTimeout(() => {
        isModalOpen.value = doOffer();
        backGame.value = false
    }, 3000); // Imposto il ritardo a 3 secondi 
};

const setIsLastBoxModalDelay = () => {
    setTimeout(() => {
        isLastBox.value = openedBoxes.value === 10 
    }, 4000); // Imposto il ritardo a 4 secondi 
};

const handleAddOpenedBox = (valueToRemove) => {
    backGame.value = true
    openedBoxes.value++;
    setModalOpenWithDelay() // deve essere invocata a ogni apertura di pacco
    remainingWinnings.value = remainingWinnings.value.filter((item) => item != valueToRemove)
    //calcolo offerta
    offer.value = 
        Math.round(remainingWinnings.value.reduce((acc, item) => acc + item, 0) 
        /(remainingWinnings.value.length) / (Math.round(Math.random()) + 1))
    setIsLastBoxModalDelay()
    console.log('offerta :' + offer.value) // Debug
};

const handleActivePotentialOffer = () =>{//per attivare la modal solo al click del prossimo pacco dopo aver accettato
    potentialOffer.value = true
    isModalOpen.value = false
}


const handleAccept = () => {
    isModalOpen.value = true;
    acceptedOffer.value = acceptedOffer.value === 0 && offer.value;
};

const handleReject = () => {
    isModalOpen.value = false;
};

const handleContinuePotential = () => {
  isModalOpen.value =  false
};
</script>


<style scoped>

.box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.accepted-offer {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #eee;
    padding: 1em;
    border-radius: 5px;
}

.backGame{
    pointer-events: none;
}

.modal{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-content: center;

  color:#fff;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); 

  position:fixed;
  top:0;
  left:0;
  z-index:3;
}

.inner-modal{
  width: 50%;
  height: 50%;
  background-color: #fff;
  color:black;
  text-align: center;
  margin:10%;
}

.money-cards{
    width: 100%;
    height: 100%;
    position:fixed;
    top:0;
    left:0;
    z-index: -1;
}

</style>
