import { useEffect, useState } from "react";
import { bookingLink } from "./config.js";
import { services, masters, gallery, perks } from "./data.js";

function Photo({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`photo ${className}`} role="img" aria-label={alt}>
      {!failed && <img src={`/img/${src}`} alt="" loading="lazy" onError={() => setFailed(true)} />}
      {failed && <span className="ph">Здесь будет фото<br /><small>public/img/{src}</small></span>}
    </div>
  );
}

function BookButton({ tag, children = "Записаться", className = "btn" }) {
  return (
    <a className={className} href={bookingLink(tag)} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const links = [["services", "Услуги"], ["masters", "Мастера"], ["gallery", "Работы"], ["why", "Преимущества"], ["contacts", "Контакты"]];

export default function App() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <>
      <div className="demo-bar">Демонстрационный проект. Барбершоп вымышленный, данные не настоящие.</div>
      <header className={`nav ${scrolled ? "solid" : ""}`}>
        <a href="#top" className="logo" onClick={() => setOpen(false)}>Графит</a>
        <nav className={`links ${open ? "open" : ""}`} aria-label="Основное меню">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <BookButton className="btn small">Записаться</BookButton>
        </nav>
        <button className="burger" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="kicker">Барбершоп в центре города</p>
            <h1>Графит.<br />Стрижка как ремесло.</h1>
            <p className="lead">Точная работа, спокойная атмосфера и мастера, которые слушают, прежде чем взять ножницы.</p>
            <div className="hero-actions">
              <BookButton>Записаться</BookButton>
              <a className="btn ghost" href="#services">Смотреть услуги</a>
            </div>
          </div>
          <Photo src="hero.jpg" alt="Мастер за работой в барбершопе" className="hero-photo" />
        </section>

        <section id="services" className="section">
          <h2>Услуги и цены</h2>
          <p className="sub">Цены демонстрационные.</p>
          <ul className="services">
            {services.map((s) => (
              <li key={s.id}>
                <div className="s-main">
                  <h3>{s.name}</h3>
                  <p>{s.note}</p>
                </div>
                <div className="s-meta"><span>{s.time}</span><strong>{s.price}</strong></div>
                <BookButton tag={s.id} className="btn small ghost">Выбрать</BookButton>
              </li>
            ))}
          </ul>
        </section>

        <section id="masters" className="section alt">
          <h2>Мастера</h2>
          <p className="sub">Имена и истории вымышленные.</p>
          <div className="masters">
            {masters.map((m) => (
              <article key={m.id} className="master">
                <Photo src={m.img} alt={`Портрет: ${m.name}`} className="portrait" />
                <h3>{m.name}</h3>
                <p className="role">{m.role}, {m.exp}</p>
                <p>{m.text}</p>
                <BookButton tag={m.id} className="btn small ghost">Записаться к мастеру</BookButton>
              </article>
            ))}
          </div>
        </section>

        <section id="gallery" className="section">
          <h2>Наши работы</h2>
          <div className="gallery">
            {gallery.map((g) => (
              <Photo key={g.img} src={g.img} alt={g.alt} className={g.tall ? "tall" : ""} />
            ))}
          </div>
        </section>

        <section id="why" className="section alt">
          <h2>Почему выбирают нас</h2>
          <div className="perks">
            {perks.map((p) => (
              <div key={p.t} className="perk">
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contacts" className="section contacts">
          <div>
            <h2>Контакты</h2>
            <p className="notice">Все данные ниже демонстрационные. Такого барбершопа не существует.</p>
            <dl>
              <dt>Адрес</dt><dd>г. Пример, ул. Образцовая, 12</dd>
              <dt>Часы работы</dt><dd>Ежедневно, 10:00–21:00</dd>
              <dt>Телефон</dt><dd>+7 (000) 000-00-00</dd>
            </dl>
          </div>
          <div className="cta-card">
            <h3>Запись через Telegram</h3>
            <p>Выберите услугу и удобное время в чате.</p>
            <BookButton>Записаться в Telegram</BookButton>
          </div>
        </section>
      </main>

      <footer>
        <span>© Графит. Демонстрационный проект.</span>
        <a href="#top">Наверх</a>
      </footer>

      <BookButton className="btn float">Записаться</BookButton>
    </>
  );
}
