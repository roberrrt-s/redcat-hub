/**
 * The RedCat hub: an index of the twelve Davilex RedCat titles.
 *
 * Each entry becomes its own repo and its own Netlify site; this page is the
 * front door that links to whichever ports are live. Today that is two:
 * De Spannende Stedentocht, and De Knallende Komeet — the Megapack 3
 * bonus audio-cd, which is why its badge says listen rather than play.
 */

interface Title {
  naam: string;
  vak: string;
  jaar: string;
  /** Absolute or relative URL of the live port; null while still parked. */
  url: string | null;
  /** Live-badge text; defaults to "speelbaar". The audio-cd overrides it. */
  badge?: string;
}

interface Pack {
  naam: string;
  jaar: string;
  titels: Title[];
}

// The three 4-in-1 Megapacks, per the Nationaal Archief Educatieve Games.
const PACKS: Pack[] = [
  {
    naam: "Megapack 1", jaar: "1997",
    titels: [
      { naam: "De Razende Rekenrace", vak: "Oefen rekenen in een razende race door de ruimte.", jaar: "1996", url: null },
      {
        naam: "De Spannende Stedentocht", vak: "Zoek de kaartstukken bij elkaar in de twaalf provincies.", jaar: "1997",
        // The one live port, served on the canonical domain via the
        // netlify.toml proxy to redcat-stedentocht.netlify.app.
        url: "https://redcat.robertspier.nl/de-spannende-stedentocht/",
      },
      { naam: "De Woeste Woordenbrij", vak: "Haal je gestolen letters terug en oefen spelling.", jaar: "1996", url: null },
      { naam: "Het Levende Kleurboek", vak: "Een kleurboek waarvan de platen tot leven komen.", jaar: "1997", url: null },
    ],
  },
  {
    naam: "Megapack 2", jaar: "1998",
    titels: [
      { naam: "De Toffe Tijdreis", vak: "Reis door de vaderlandse geschiedenis.", jaar: "1997", url: null },
      { naam: "Het Machtige Monumenten Mysterie", vak: "Leer Engels tussen beroemde monumenten.", jaar: "1997", url: null },
      { naam: "De Europese Stedentocht", vak: "Topografie, nu door heel Europa.", jaar: "1998", url: null },
      { naam: "De Brutale Bankroof", vak: "Rekenen met geld na een brutale bankroof.", jaar: "1998", url: null },
    ],
  },
  {
    naam: "Megapack 3", jaar: "1998",
    titels: [
      { naam: "De Duistere Dierendiefstal", vak: "Het dierenrijk in, achter een dierendief aan.", jaar: "1998", url: null },
      { naam: "De Snelle Sommenrace", vak: "Nog een race, met nog snellere sommen.", jaar: "1998", url: null },
      { naam: "De Reusachtige Letterraket", vak: "Woordenschat aan boord van de letterraket.", jaar: "1998", url: null },
      {
        naam: "De Knallende Komeet", vak: "Liedjes en verhalen van RedCat, Brutus en Max — de bonus-audio-cd.", jaar: "1998",
        // The audio-cd port, proxied to redcat-knallende-komeet.netlify.app.
        url: "https://redcat.robertspier.nl/de-knallende-komeet/",
        badge: "te beluisteren",
      },
    ],
  },
];

function Rij({ t }: { t: Title }) {
  // Year and badge are direct grid children: the list shares its column
  // tracks with every row through subgrid, so both columns align whatever a
  // row carries. Rows show the bare year; the parenthesised year is the pack
  // header's.
  const inner = (
    <>
      <span className="naam">{t.naam}</span>
      <span className="vak">{t.vak}</span>
      <time dateTime={t.jaar}>{t.jaar}</time>
      <span className={t.url ? "badge live" : "badge"}>
        {t.url ? (t.badge ?? "speelbaar") : "binnenkort"}
      </span>
    </>
  );
  return (
    <li className={t.url ? "titel live" : "titel"}>
      {t.url ? <a href={t.url}>{inner}</a> : <div>{inner}</div>}
    </li>
  );
}

export default function App() {
  return (
    <main className="hub">
      <header>
        <h1>
          <span className="red">RedCat</span> in de browser
        </h1>
        <p className="intro">
          De klassieke RedCat-spellen, stuk voor stuk nagebouwd in de
          browser, met originele graphics, origineel geluid en originele
          spelregels — en één titel is geen spel maar een audio-cd, dus die
          kun je beluisteren. Twee van de twaalf staan online; de rest staat
          nog in de kast.
        </p>
      </header>

      {PACKS.map((p) => (
        <section key={p.naam} className="pack">
          <h2>
            {p.naam} <span className="pack-jaar">({p.jaar})</span>
          </h2>
          <ol className="titels">
            {p.titels.map((t) => <Rij key={t.naam} t={t} />)}
          </ol>
        </section>
      ))}

      <footer>
        <p>
          Een hobby-archiefproject. Alle spelinhoud &copy; Davilex; dit is een
          technische reconstructie uit liefde voor het origineel, gebouwd met
          een mix van Claude-, Gemini- en OpenAI-modellen.
        </p>
        <p>
          Meer over de originelen:{" "}
          <a href="https://nationaalarchiefeducatievegames.nl/">
            Nationaal Archief Educatieve Games
          </a>.
        </p>
        <p>
          Gemaakt door Robert Spier,{" "}
          <a href="https://github.com/roberrrt-s">roberrrt-s</a> op GitHub.
          Iets kapot, of anders dan vroeger?{" "}
          <a href="https://github.com/roberrrt-s/redcat-hub/issues">
            Meld het hier
          </a>.
        </p>
      </footer>
    </main>
  );
}
