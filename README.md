[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/bjSkceGD)

# PG6301 eksamen Event Creator

[Heroku](https://ibmo-eksamen-74c51c68e2d2.herokuapp.com/events)

[Github](https://github.com/kristiania-pg6301-2024/pg6301-exam-moab01567)

[Test rapport](https://github.com/kristiania-pg6301-2024/pg6301-exam-moab01567/actions)

## Egenutfylling av funksjonelle krav

- [ x ] _legg inn krav fra eksamentekst_
  - _alle kravene er satt, var bare litt dårlig forklart når det gjelder de tre brukerene_
  - _vi gjorde dersom du logger inn med google, så kan du kun delta på events_
  - _vi gjorde dersom du logger inn med entraId, så kan du kun delta på events og lage events_
  - _etter diskutering med foreleser og medstudenter så var det slik vi forsto det når det gjaldt de tre brukeren_

## Egenutfylling av tekniske krav

- [ x ] Oppsett av package.json, vite, express, prettier
  - _alt er satt opp og kjører fint :-)_
- [ x ] React Router
  - _Vi tok i bruk denne som dokumentasjon https://www.w3schools.com/react/react_router.asp_
- [ x ] Express app
  - _alt fungerer bra, og som ønsket_
- [ x ] Kommunikasjon mellom frontend (React) og backend (Express)
  - _alt fungerer bra, og som ønsket_
- [ x ] Deployment til Heroku
  - _alt fungerer bra, og som ønsket_
- [ x ] Bruk av MongoDB
  - _Ikke brukt docker, alt er i skyen hos mongodb_
- [ x ] OpenID Connect
  - _Implementerting av profilbildet på entra id var anderles enn google, så måtte lese meg på dokumentasjon_ -_https://learn.microsoft.com/en-us/answers/questions/31275/how-can-i-get-profile-picture-from-the-azure-ad_
  - _fulgte denne for google_
  - _https://learn.microsoft.com/en-us/answers/questions/31275/how-can-i-get-profile-picture-from-the-azure-ad_
- [ x ] Tester med dokumentert testdekning
  - _alt på github actions_
  - _der finner du to test coverage en for client og en for server. Begge er over 50% som ønsket i eksamen oppgaven :-)_
  - - _npm test vil kun checke prettier, dette er gjorte med villige slik at jeg har en fin over sikt alle testene som gjøres på clienten og på serverer siden_
  - _så i workflow så kjører git action tre forskjellige tester, som har git meg go oversikt over alle sammen :-)_
