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