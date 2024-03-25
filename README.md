# Affari Tuoi - con Vue.js

Questo progetto è un'implementazione del popolare programma televisivo "Affari Tuoi" utilizzando Vue.js. Nel gioco, i partecipanti devono aprire una serie di pacchi contenenti diverse somme di denaro e ricevere offerte da un "dottore" virtuale. L'obiettivo del gioco è massimizzare il proprio guadagno scegliendo l'offerta più vantaggiosa o sperando che il proprio pacco contenga il premio più alto.


## Implementazione

Il gioco è stato implementato utilizzando `Vue.js`. Per gestire lo stato e la logica del gioco in modo modulare e scalabile è stata utilizzata la `Composition API`.
I componenti sono stati implementati come `Single File Components` (SFC). Le informazioni tra i componenti vengono condivise attraverso `props`.
Nell'implementazione del gioco sono state utilizzate diverse direttive Vue come `v-for`, `v-bind`, `v-on` e `v-if` per controllare il rendering condizionale, la gestione degli eventi e l'iterazione degli elementi.
Sono stati creati eventi personalizzati all'interno dei componenti utilizzando il metodo `emit`, permettendo così di eseguire funzioni nel componente padre quando si verificano determinati eventi nei componenti figlio.
Le variabili reattive sono state dichiarate utilizzando il hook `ref`, e per modificarle è stato utilizzato il suffisso `.value`.
Inoltre, è stato utilizzato il binding per le classi `(v-bind:class)` per applicare classi dinamicamente in base allo stato o ai dati del gioco.

Infine, nel progetto è stato incluso l'utilizzo di `Bootstrap`.


## Stato Attuale e Piani Futuri

Attualmente, il progetto è funzionante ma presenta diverse aree che necessitano di miglioramento:

- **Implementazione del Cambio Pacco**: Attualmente il gioco si basa sull'apertura di 10 pacchi. Potrebbe essere implementata la possibilità di effettuare uno scambio con un pacco non ancora aperto per aumentare l'elemento di strategia del gioco.

- **Aumento del Numero di Pacchi**: Attualmente il gioco prevede l'apertura di 10 pacchi. Potrebbe essere interessante aumentare il numero di pacchi a 20 per aumentare la durata e l'interesse del gioco.

- **Miglioramento del Calcolo dell'Offerta**: Attualmente il calcolo dell'offerta da parte del "dottore" potrebbe essere migliorato per renderlo più realistico.

- **Miglioramento dell'Aspetto Grafico**: L'aspetto grafico del gioco potrebbe essere migliorato per renderlo più accattivante e coinvolgente per l'utente. Questo potrebbe includere miglioramenti nell'animazione dei pacchi, nella grafica dell'interfaccia utente e nell'utilizzo di immagini e colori più accattivanti.


## Come Eseguire il Progetto

Per eseguire il progetto in locale, segui questi passaggi:

1. Assicurati di avere Node.js installato sul tuo sistema.
2. Clona il repository sul tuo computer.
3. Naviga nella directory del progetto tramite il terminale.
4. Esegui `npm install` per installare le dipendenze.
5. Esegui `npm run dev` per avviare il server di sviluppo.
6. Apri il tuo browser e vai a `http://localhost:5173/` per visualizzare il gioco.

