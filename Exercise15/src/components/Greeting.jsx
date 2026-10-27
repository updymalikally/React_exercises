import { useLanguage } from '../context/LanguageContext.jsx';

const copy = {
  en: { eyebrow: 'A little hello', title: 'Good things,\nsaid simply.', description: 'A small corner of the internet for thoughtful everyday objects.', greeting: 'Hello there', language: 'Choose your language', english: 'English', spanish: 'Español' },
  es: { eyebrow: 'Un pequeño saludo', title: 'Cosas buenas,\nsin complicaciones.', description: 'Un pequeño rincón de internet para objetos cotidianos y especiales.', greeting: 'Hola', language: 'Elige tu idioma', english: 'English', spanish: 'Español' }
};

export default function Greeting() {
  const { language, setLanguage } = useLanguage();
  const text = copy[language];

  return (
    <section className="language-card" aria-labelledby="greeting-title">
      <div className="section-kicker"><span className="kicker-dot" /> CHALLENGE A <span className="kicker-rule" /> useContext / language</div>
      <p className="eyebrow">{text.eyebrow}</p>
      <h2 id="greeting-title">{text.greeting}<span className="greeting-period">.</span></h2>
      <p className="greeting-copy">{text.description}</p>
      <div className="language-control">
        <span>{text.language}</span>
        <div className="language-buttons" role="group" aria-label={text.language}>
          <button type="button" className={language === 'en' ? 'selected' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>{text.english}</button>
          <button type="button" className={language === 'es' ? 'selected' : ''} onClick={() => setLanguage('es')} aria-pressed={language === 'es'}>{text.spanish}</button>
        </div>
      </div>
      <p className="language-note">{text.title.split('\n').join(' ')}</p>
    </section>
  );
}
