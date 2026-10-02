# LK-024 WF SECURITY — handoff za aplikaciju

Ovaj dokument je zajednička specifikacija za sajt i aplikaciju LK-024. Sajt priprema upit, a aplikacija treba da bude centralno mesto za njegov prijem, obradu i praćenje.

## 1. Identitet projekta

- Licenca: **LK-024**
- Klijent: **WF SECURITY DOO BEOGRAD**
- Delatnost: privatno obezbeđenje, šifra 8010
- Sajt: WF SECURITY premium website
- Potpis sajta: **Powered by PLATINUM CORE 777**
- Aplikacija je zaseban LK-024 projekat, sa LK-024 izolacijom unutar postojećeg Platinum Core 777 Supabase projekta.

## 2. Granice projekta

LK-024 aplikacija koristi postojeći Platinum Core 777 Supabase projekat, ali isključivo svoje LK-024 namespace/tabele/polja. U bootstrap fazi nema tenant-a. Ne menjati:

- Core Review;
- LK-021 Platinum Car Wash;
- LK-022;
- LK-023 „Pobedi izvršitelja“;
- `pcw_*` tabele i šeme;
- glavni Platinum Core 777 sistem.

## 3. Početne korisničke uloge

Za početnu Pro postavku predviđeno je 10 korisničkih mesta, bez konačnih imena:

1. jedan **Admin**;
2. jedan **Owner**;
3. jedan **Manager**;
4. sedam **Worker** korisnika.

Imena, e-mail adrese i početne pristupne podatke unose se naknadno. Ne upisivati izmišljena imena.

## 4. Obavezni deo — upiti sa sajta

Formular na sajtu već koristi sledeći dogovoreni ugovor:

| Sajt | App polje |
|---|---|
| `ime` | `first_name` |
| `prezime` | `last_name` |
| `email` | `email` |
| `telefon` | `phone` |
| `poruka` | `message` |
| skriveno `licenca` | `license = LK-024` |
| skriveno `izvor` | `source = wf-security-website` |

Svaki novi upit mora u aplikaciji da dobije:

- jedinstveni ID;
- datum i vreme prijema;
- status `new`;
- oznaku licence `LK-024`;
- izvor `Website form`;
- korisnika kome je upit dodeljen, kada se dodeli;
- istoriju promena statusa;
- internu belešku, odvojenu od poruke klijenta.

Preporučeni tok statusa:

`new → reviewed → assigned → in_progress → completed`

Dodatni završni statusi mogu biti `cancelled` ili `archived`.

## 5. Šta aplikacija treba da omogući

Po uzoru na ozbiljniji model LK-021, aplikacija treba da ima:

- dashboard sa brojem novih, aktivnih i završenih upita;
- inbox upita sa pretragom i filtriranjem;
- pregled kompletnog zahteva klijenta;
- dodelu upita Owner-u, Manager-u ili Worker-u prema dozvolama;
- promenu statusa uz istoriju promena;
- interne beleške i komunikaciju tima;
- kontakt podatke klijenta sa klikom na telefon i e-mail;
- zaštitu pristupa po ulozi;
- obaveštenje za novi upit;
- arhivu završenih upita;
- log aktivnosti za administrativne radnje.

Ako se dodaju dokumenti ili prilozi, oni moraju biti u privatnom storage-u LK-024 projekta i dostupni samo ovlašćenim korisnicima.

## 6. Dozvole po ulozi

### Admin

- upravljanje svim korisnicima i ulogama;
- pregled i upravljanje svim upitima;
- podešavanje statusa, arhive i sistemskih pravila;
- pregled logova.

### Owner

- pregled svih upita i izveštaja;
- dodela upita;
- promena statusa;
- pregled komunikacije i arhive;
- bez menjanja globalne infrastrukture van LK-024 projekta.

### Manager

- upravljanje operativnim upitima;
- dodela Worker korisnicima;
- promena statusa i interne beleške;
- pregled tima koji mu je dodeljen.

### Worker

- pregled samo dodeljenih upita;
- ažuriranje operativnog statusa;
- dodavanje interne beleške;
- bez pristupa korisnicima, globalnim podešavanjima i tuđim nedodeljenim predmetima.

## 7. Bezbednost i baza

- RLS mora biti uključen na svim tabelama.
- Klijent ne sme direktno menjati tuđe upite.
- Server-side/RPC provera mora potvrditi ulogu pre svake osetljive radnje.
- Formular sa sajta ne sme prihvatati lažni `license` ili `source` podatak bez server-side provere.
- Ne čuvati lozinke u kodu, HTML-u, logovima ili dokumentaciji.
- Ne koristiti podatke drugih LK projekata.
- Prvo napraviti migraciju i testirati je na LK-024 Supabase projektu.

## 8. Redosled sinhronizacije

1. Druga Luna definiše LK-024 šemu i role.
2. Sajt i app potvrđuju isti `form-contract.json`.
3. App napravi sigurni endpoint/RPC za novi upit.
4. Sajt dobija produkcioni endpoint bez menjanja dizajna formulara.
5. Testira se: novi upit, greška, dupli klik, statusi, dozvole i obaveštenja.
6. Tek nakon testa povezuje se pravi domen i objavljuje produkciona verzija.

## 9. Trenutna granica

Trenutni sajt prikazuje formular i priprema sva polja, ali namerno ne tvrdi da je upit poslat dok endpoint, RLS i LK-024 aplikacija ne budu završeni i testirani zajedno.
