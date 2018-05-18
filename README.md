# Progetto sito di car-sharing per esame di Linguaggi Dinamici (UNIMORE).

Sia gli utenti di tipo `cliente` che di tipo `autista` necessitano di registrazione e accesso.

## Cliente
- Seleziona il punto di partenza e arrivo in mappa geografica, realizzata tramite OpenStreetMap e le librerie Leaflet. Viene quindi mostrata la lista autisti disponibili e il costo del viaggio.
- Conferma viaggio selezionato (il sistema pagamento verrà implementato con metodi simulati) e effettua la prenotazione per una certa data/ora.
- Elimina i viaggi prenotati fino a 15 minuti prima della partenza.
- Controlla lo storico dei viaggi effettuati.
- Contrassegna l'autista della tratta prenotata in caso di mancato passaggio e richiede il rimborso.
## Autista
- Aggiunge luogo comune di partenza e distanza massima percorribile.
- Aggiunge tariffa al km.
- Aggiunge disponibilità oraria.
- Controlla le prenotazioni attive in homepage.
## Amministratore
- Visualizza i rimborsi richiesti da tutti gli utenti con la possibilità di conferma/eliminazione.
- Visualizza lista utenti con possibilità di eliminare e mettere in black-list.
