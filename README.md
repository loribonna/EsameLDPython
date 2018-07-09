# Progetto sito di car-sharing per esame di Linguaggi Dinamici (UNIMORE).

## Requisiti concordati

Sia gli utenti di tipo `cliente` che di tipo `autista` necessitano di registrazione e accesso.

### Cliente
- Seleziona il punto di partenza e arrivo in mappa geografica, realizzata tramite OpenStreetMap e le librerie Leaflet. Viene quindi mostrata la lista autisti disponibili e il costo del viaggio.
- Conferma viaggio selezionato (il sistema pagamento verrà implementato con metodi simulati) e effettua la prenotazione per una certa data/ora.
- Elimina i viaggi prenotati fino a 15 minuti prima della partenza.
- Controlla lo storico dei viaggi effettuati.
- Contrassegna l'autista della tratta prenotata in caso di mancato passaggio e richiede il rimborso.
### Autista
- Aggiunge luogo comune di partenza e distanza massima percorribile.
- Aggiunge tariffa al km.
- Aggiunge disponibilità oraria.
- Controlla le prenotazioni attive in homepage.
### Amministratore
- Visualizza i rimborsi richiesti da tutti gli utenti con la possibilità di conferma/eliminazione.
- Visualizza lista utenti con possibilità di eliminare e mettere in black-list.

---

## Installazione e avvio

### Tramite docker-compose

Il software Docker è disponibile tramite [questo link](https://docs.docker.com/install/).  
Assicurarsi che anche il tool [docker-compose](https://docs.docker.com/compose/install/) sia installato e funzionante.

Assicurarsi che Docker sia in esecuzione e inserire il comando: `docker-compose -f docker-compose.yml up -d --build`.

Verranno scaricati i requisiti necessari e avviato l'applicativo in ascolto sulla porta `8000`.

### Manuale

L'installazione manuale dell'applicazione richiede l'installazione delle dependency del progetto:
- **MongoDB** (3.6.4),
- **NodeJS** (8.9.1) e l'interprete **Typescript** (2.8.3), disponibile via **npm** (5.5.1),
- interprete **python** (3.6.5) e il framework **django** (2.0.5).

1. Il software utilizza **MongoDB** come Database.

    Per installare la versione più aggiornata di MongoDB, seguire le istruzioni di installazione per la propria piattaforma:
    - [Istruzioni per Linux](https://docs.mongodb.com/manual/administration/install-on-linux/),
    - [Istruzioni per Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/),
    - [Istruzioni per MacOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

2. (Opzionale) Il software utilizza **npm** per automatizzare il processo di pre-compilazione e avvio dell'applicativo
    
    La pre-compilazione è necessaria a tradurre il codice in linguaggio typescript, utilizzato nel front-end, in codice javascript eseguibile da browser.  
    Per eseguire la compilazione, è necessario avere l'interprete `typescript` installato via *npm* ed eseguire il comando: `tsc --p ./tsconfig.json` oppure `npm run build` .  
    Tramite il comando `tsc --p ./tsconfig.json -w` o `npm run build:watch` è possibile ricompilare automaticamente i file typescript in javascript a seguito di modifiche (In Debug).

    Npm è disponibile, unitamente a Node, via package manager su linux seguendo [queste istruzioni](https://nodejs.org/en/download/package-manager/).

3. Installare l'interprete **python** e il framework **django**

Per avviare l'applicazione, assicurarsi che il demone di MongoDB sia in esecuzione ed eseguire:

- In caso di primo avvio eseguire:
    ```
    python ./manage.py makemigrations
    python ./manage.py migrate
    ```

- Avvio del server: `python ./manage.py runserver 0.0.0.0:8000`

- Se npm è installato tramite il *punto 2 (opzionale)*, eseguire `npm start` per avviare l'applicativo. 