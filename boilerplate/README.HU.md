## ßoilerplate használati utasítás.

A project mappában van/kell lennie egy boilerplate mappának. A szervert a project mappájából indítjuk, és a boileren keresztül futtatjuk.
A keretrendszer maszkol, azaz hogy ha van egy azonos elérési útvanolan lévő file a projectben akkor azt használja, ha nincs akkor a boilerét.
Ez a felülírási mechanizmus egyfajta overlay-fs szerűség, és így lehet módosítani, finomhangulni, testreszabni a működését ..

## Kiegészítésre, bővítésre az alap mechanizmust kellene használni. A boiler először betölti a saját funkcióit a loader mappából.

- `ł` és `Ł` loggolási funkciók - ezeket lehet/kell használni a fejlesztés során.
- `ß` tartalmaz globális függvényeket és konstansokat, ezeket felül és elő lehet definiálni.
- `ß` tartalmaz globális csomagokat pl. `ß.fs` egy referencia az `fs-extra` csomagra
- A `ß` globális objektum, szinte mindenhonnan elérhető

## Minden funkciónak modulba kell kerülnie. A moduloknak van egy saját könyvtárszerkezete.
- a lib mappa .. innen kerülnek ki a ß.lib.module.függvény -ek
- a hook mappa .. itt definiálódnak a hookok függvényei
- a load-erek pl, init, server, start - itt ezekben minden lefut egyszer az indulásnál

A lib függvények precízen meghívhatóak, egy fut le egyszer meghívásnál.
A hook funkciók több modulban, többen is lehetnek és minden modul azonos nevű, pontosabban prefixű hookja lefut.
.. tehát pl a socket.do_something.js nevű hook, mindig a socket inicializálásánal indul, és lehetnek argumentumai. 
A `ß.run_hook` indítja ezeket a hookokat, teheát erre rákeresve lehet megnézni milyen hookok vannak már.

A szerver inicializálás után rendelkezésre áll globálisan a `ß.app` express és a `ß.io` socket.io objektumai.

A fordító mechanizmus a `##&hu szöveg ##` tag-eket szűri.

## TELEPÍTÉS

A saját rendszerünkön belül a /srv/codepad-project/boilerplate mappának már a codepad konténerben kell lennie (readonly mappa)
A `ß` shell parancsként is működik és a CLI indítója.

## ßoilerplate használati utasítás.

A project mappában van/kell lennie egy boilerplate mappának. A szervert a project mappájából indítjuk, és a boileren keresztül futtatjuk.
A keretrendszer maszkol, azaz hogy ha van egy azonos elérési útvanolan lévő file a projectben akkor azt használja, ha nincs akkor a boilerét.
Ez a felülírási mechanizmus egyfajta overlay-fs szerűség, és így lehet módosítani, finomhangulni, testreszabni a működését ..

## Kiegészítésre, bővítésre az alap mechanizmust kellene használni. A boiler először betölti a saját funkcióit a loader mappából.

- `ł` és `Ł` loggolási funkciók - ezeket lehet/kell használni a fejlesztés során.
- `ß` tartalmaz globális függvényeket és konstansokat, ezeket felül és elő lehet definiálni.
- `ß` tartalmaz globális csomagokat pl. `ß.fs` egy referencia az `fs-extra` csomagra
- A `ß` globális objektum, szinte mindenhonnan elérhető

## Minden funkciónak modulba kell kerülnie. A moduloknak van egy saját könyvtárszerkezete.
- a lib mappa .. innen kerülnek ki a ß.lib.module.függvény -ek
- a hook mappa .. itt definiálódnak a hookok függvényei
- a load-erek pl, init, server, start - itt ezekben minden lefut egyszer az indulásnál

A lib függvények precízen meghívhatóak, egy fut le egyszer meghívásnál.
A hook funkciók több modulban, többen is lehetnek és minden modul azonos nevű, pontosabban prefixű hookja lefut.
.. tehát pl a socket.do_something.js nevű hook, mindig a socket inicializálásánal indul, és lehetnek argumentumai. 
A `ß.run_hook` indítja ezeket a hookokat, teheát erre rákeresve lehet megnézni milyen hookok vannak már.

A szerver inicializálás után rendelkezésre áll globálisan a `ß.app` express és a `ß.io` socket.io objektumai.

A fordító mechanizmus a `##&hu szöveg ##` tag-eket szűri.

## TELEPÍTÉS

A saját rendszerünkön belül a /srv/codepad-project/boilerplate mappának már a codepad konténerben kell lennie (readonly mappa)
A `ß` shell parancsként is működik és a CLI indítója.

## Tematika
```
- A boilerplate 2.0 bemutatása, a névadó fogalom

Programozásban a "boilerplate code" olyan kód amit több helyen használunk fel, 
és aránylag kevés változtatással érjük el a kívánt célt. 
Lényegében egy kiindulási alap, amivel elindulhatunk, amivel aztán dolgozunk.

- előny: teljesen a saját kezünkben van, bárhol módosítható
- hátrány: nehezen frissíthető, továbbfejleszthető, megragadtuk utánna a mienk
           haladó pontrol indulás után nem történik semmi


keretrendszer:
Egy bizonyos értelemben absztrakt szoftver, melyben egy aránylag univerzális, 
általános célú kód részlegesen bővíthető hozzáírt kóddal.
A keretrendszer fejlesztői adott esetben egy komplett ekoszisztémával, kódbázisán kívül segédfunkciókkal, és egyéb sgédprogramokkal segítik a keretrendszerben való kódírást.
A keretrendszer diktálja hogyan lehet, hogyan kellene vele dolgozni, dokumentációjában írja le a fejlesztők-felhasználók számára.
Kód hozzáadható, bizonyos része kiváltható, felülírható és általában tartalmazza a keretrendszerhez tartozó nem-felülírandó kódot is. A keretrendszer magjának módosítása nem ajánlott, ha ezt tennénk degradálnánk boilerplate kóddá.

előny: a frissítéseket a fejlesztők végzik, nem a mi dolgunk ...
       felgyorsítja a fejlesztést
hátrány: frissítéseket alkalmazni és a frissítésekhez alkalmazkodni kell,
         alap felhasználó számára a keretrendszer kódja tabu, így be is zár a keretredszerbe
         minden eshetőségre, mindenki minden gondjára igyekszik megoldást találni
         

Összes előnyt akarjuk használni, egyik se akadályozzon hátrányával.

- ß karakter
  legális javascript változónév, olyan mint a jquery $ jele, csak kevésbé elcsépelt
  globális objektum, nemjó, de jó
  namespace amit mi fogunk koordinálni
  beimportált node modulokat, vagy azok példányosításait csatoljuk hozzá, egyfajta alias
  konstansokat definiálunk benne (csupa nagybetűvel)
  függvényeket csatolunk hozzá (kisbetűvel)
  
- ßoilerplate javascript keretrendszer - kódkészlet rétegek "stackek" egy moduláris rendszerben
  nodejs backend-en indul, de végeredményben fullstack keretrendszer
  a stack-ek meglévő technológia stackeket fognak össze pl MEAN stack implementáció
  frissíthető
  komplexitáskezelésben segítség
  struktúrál a projektben filerendszeren keresztül
  ujrahasznosítást könnyebbé teszi
  webes alkalmazások, weboldalak készítése a fő csapásirány
  kollaboratív workflow-val kompatibilitásra törekszik

- mi egy modul stack?
  főleg frontendek diverzitása miatt, de alkalmazások variálása miatt is kell
  kódunk csak a használt odatartozó modulokat tartalmazza
  symlinkek használatával könnyen használhatunk vagy szüntetünk meg modulokat
  prioritásos modulok és kukacos gyári-modulok prioritás nélkül lehetőleg readonly mappában
  
- a moduláris felbontás
  a boilerplate magja egyfajta modul-loader, bootolja a rendszert
  maximalizált felülírhatóság, felüldefiniáhatóság
  struktúrát könyvtárszerkezeteken keresztül biztosítja

- mit várunk el egy modultól?
  elnevezése találó legyen
  amennyire lehet legyen ki-be kapcsolható
  minél inkább független legyen, de lehetnek más modulok amire épít
  node_modules és npm csomagokat tartalmazhat, azokhoz egy illesztést is ad
  
  libek - precízen meghívható függvények 
  hookok - minden modulban lefutnak
  alap-modulok frissíthetősége érdekében törekedünk arra hogy minél kisebb funkcióhalmaz legyen egy-egy fileban, minél kisebb legyen egy-egy file tartalma
  autómatikusan töltődnek be könyvtárak tartalmai, hookok kapcsolatai

- systemd scope, systemd service környezetben
  háttérszálak, alprogramok
  processzek összefogása
  push script

- a loader tartalma

- codepad
  codemirror
  kollaboratív
  online-ide, projektkezelés
  continious integration
  git push - mérföldkő mentés
  logkezelés
  realtime szintaxis-ellenőrzés
  prettier formatálás

- server modules
  readme autodoc kommentekből
  express app
  socket.io
  session

- angularjs stack
  kicsit outdated, deprecated
  sok kis file
  inline nyelvi definiciók, fordítás indításnál

- vue stack
  multilanguage modulok által hasonló, de mégis más implementáció, inline fordítások, nyelvi buildek
  webpack vue-cli által 
  hot module reload, előnézet a 9000-es porton
  development / production
  boilerplate konstansok és debuglog Ł külön importálás nélkül
  single file components, vue extension, syntax highlighting, prettier, szemantikus ellenörzéssel  
  vue router history mode - url reakciókkal, szerveroldalon is támogatva, history-api fallback default route
  vue store, session támogatással
  vuetify UI alapból de lehet akár vue-bootstrap is
  kész login dialógus
  build folyamán var mappában képződnek a vue src mappák
  index, admin - fix nyelvű szerkeszthető
  nyelvi változók az index fordításaiból - fejlesztés alatt hot reloadban nem elérhető
  
  
- TODO
  képek jobb integrálása
  UI designelemek
  
  angular stack
  react stack

```