// SAMOLIKWIDATOR. Nie jest to service worker aplikacji — aplikacja jest budowana
// z `--pwa-strategy=none` i nie rejestruje zadnego.
//
// Ten plik istnieje wylacznie po to, zeby usunac service workera, ktory zdazyl sie
// zainstalowac we wczesniejszych wersjach. Sam plik pusty by nie wystarczyl: przestalby
// przechwytywac zadania, ale zostalby zarejestrowany razem ze swoimi cache'ami, a
// przegladarka dalej podawalaby stary pakiet.
//
// Przegladarka sprawdza ten skrypt przy nawigacji; gdy zobaczy nowa tresc, zainstaluje
// ja — i wtedy ponizsze wyczysci cache, wyrejestruje sie i przeladuje otwarte karty.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      await caches.delete(key);
    }
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) {
      client.navigate(client.url);
    }
  })());
});
