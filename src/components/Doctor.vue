<template>
  <div v-if="isOpen" class="modal">

    <!-- offerta dottore -->
    <div class="inner-modal p-5" v-if="!offerAccepted">
      <h2>Il dottore ti offre {{ offer }}</h2>
      <button class="btn btn-primary" @click="accept">Accetta</button>
      <button class="btn btn-secondary" @click="reject">Rifiuta</button>
    </div>

    <!-- vuoi continuare? -->
    <div v-if="offerAccepted && !acceptedContinue" class="inner-modal acceptedOffer p-5">
      <h2>
        Complimenti hai accettato l'offerta di {{ offer }}! 
        Continua a giocare per scoprire il contenuto del tuo pacco!
      </h2>
      <button class="btn btn-primary" @click="continueGame">Continua</button>
      <button class="btn btn-secondary" @click="closeGame">Concludi</button>
    </div>

     <!-- cosa avrebbe offorto il dottore? -->
    <div v-if="potentialOffer" class="inner-modal acceptedOffer p-5">
        <h2>
          Il Dottore avrebbe fatto un'offerta di  €{{ offer }}! 
          Continua a giocare per scoprire il contenuto del tuo pacco!
        </h2>
        <button class="btn btn-primary" @click="continuePotential">Continua</button>
        <button class="btn btn-secondary" @click="closeGame">Concludi</button>
    </div>

  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  offer: Number,
  potentialOffer:Boolean,
});

const emit = defineEmits(['accept', 'reject', 'continuePotential', 'activePotentialOffer']);

const offerAccepted = ref(false);
const acceptedContinue = ref(false);


const accept = () => {
  offerAccepted.value = true
  emit('accept');
  console.log('valore modal continua :' + offerAccepted.value)//debug
};

const reject = () => {
  emit('reject');
};

const continueGame = () => {
    acceptedContinue.value = true
    emit('activePotentialOffer')
    //potentialOffer.value = true;

};

const continuePotential = () => {
  emit('continuePotential');
};

const closeGame = () => {
  offerAccepted.value = false;
  location.reload(); //aggiorna la pagina
};

</script>

<style scoped>
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
  z-index: 3;
}

.inner-modal{
  width: 50%;
  height: 50%;
  background-color: #fff;
  color:black;
  text-align: center;
  margin:10%;
}

</style>
