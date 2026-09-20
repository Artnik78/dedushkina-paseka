import { useEffect, useMemo, useState } from "react";

type VolumeOption = {
  volume: string;
  price: number;
};

const volumes: VolumeOption[] = [
  { volume: "0,1 л", price: 5 },
  { volume: "0,28 л", price: 7 },
  { volume: "0,5 л", price: 12 },
  { volume: "1 литр", price: 25 },
];

const labResults = [
  {
    name: "Массовая доля воды",
    unit: "%",
    standard: "не более 20,0",
    value: "18,01",
    method: "ГОСТ 31774-2012",
  },
  {
    name: "Редуцирующие сахара",
    unit: "%",
    standard: "не менее 65,0",
    value: "79,3",
    method: "ГОСТ 32167-2013, п. 6",
  },
  {
    name: "Диастазное число",
    unit: "ед. Готе",
    standard: "не менее 8,0",
    value: "19,5",
    method: "ГОСТ 34232-2017, п. 7",
  },
  {
    name: "Цезий-137",
    unit: "Бк/кг/л",
    standard: "не более 370",
    value: "< 10,2",
    method: "МВИ.МН 1823-2007",
  },
];

function BeeMark({ light = false }: { light?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={light ? "text-[#f2bd55]" : "text-[#b87716]"}
      fill="none"
      height="32"
      viewBox="0 0 44 32"
      width="44"
    >
      <path d="M22 8.5c-3.8 0-6.7 3.1-6.7 7.3 0 5 3.3 9.4 6.7 9.4s6.7-4.4 6.7-9.4c0-4.2-2.9-7.3-6.7-7.3Z" fill="currentColor" />
      <path d="M16 13h12M15.5 18h13M18.5 23h7" stroke="#17352c" strokeWidth="1.5" />
      <path d="M17.5 11.2C12.6 5.1 5.9 5 5.4 9.1c-.5 4.1 5.7 6.1 10.1 5.9M26.5 11.2C31.4 5.1 38.1 5 38.6 9.1c.5 4.1-5.7 6.1-10.1 5.9" stroke="currentColor" strokeWidth="1.6" />
      <path d="m19.1 8-2.4-4M24.9 8l2.4-4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowIcon({ direction = "down" }: { direction?: "down" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      className={direction === "right" ? "rotate-[-90deg]" : ""}
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path d="M3 6.5 9 12l6-5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path d="m5 12.5 4.2 4.2L19.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  );
}

function ProtocolModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      aria-label="Данные лабораторного протокола"
      aria-modal="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-[#0d201b]/80 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
    >
      <div className="protocol-sheet max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-[#fbfaf5] text-[#18362d] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#18362d]/15 bg-[#fbfaf5]/95 px-5 py-4 backdrop-blur sm:px-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9a681b]">Лабораторный документ</p>
            <p className="mt-1 font-serif text-xl">Протокол № 1328 х.д.</p>
          </div>
          <button
            aria-label="Закрыть протокол"
            className="grid h-11 w-11 place-items-center border border-[#18362d]/20 transition hover:bg-[#18362d] hover:text-white"
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-5 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col justify-between gap-6 border-b border-[#18362d] pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#567066]">Выдан 23.07.2026</p>
              <h2 className="mt-3 max-w-xl font-serif text-4xl leading-[1.05] sm:text-5xl">Результаты испытаний натурального мёда</h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#567066] sm:text-right">Образец № 1328/1<br />Сбор: июль 2026</p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#18362d]/35 text-[10px] uppercase tracking-[0.16em] text-[#6a7d76]">
                  <th className="py-4 pr-5 font-semibold">Показатель</th>
                  <th className="px-5 py-4 font-semibold">Метод</th>
                  <th className="px-5 py-4 font-semibold">Норма</th>
                  <th className="py-4 pl-5 text-right font-semibold">Результат</th>
                </tr>
              </thead>
              <tbody>
                {labResults.map((result) => (
                  <tr className="border-b border-[#18362d]/15" key={result.name}>
                    <td className="py-5 pr-5 font-medium">{result.name}, {result.unit}</td>
                    <td className="px-5 py-5 text-sm text-[#567066]">{result.method}</td>
                    <td className="px-5 py-5 text-sm">{result.standard}</td>
                    <td className="py-5 pl-5 text-right font-serif text-2xl text-[#9a681b]">{result.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-8 border-b border-[#18362d]/15 pb-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a681b]">Условия исследования</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-[#18362d]/10 pb-3"><dt className="text-[#6a7d76]">Температура</dt><dd>19,7–20,0 °C</dd></div>
                <div className="flex justify-between gap-4 border-b border-[#18362d]/10 pb-3"><dt className="text-[#6a7d76]">Влажность</dt><dd>57,1–57,4 %</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[#6a7d76]">Давление</dt><dd>98,6–98,7 кПа</dd></div>
              </dl>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9a681b]">Заключение</p>
              <p className="mt-5 font-serif text-2xl leading-snug">Исследованный образец натурального мёда по указанным показателям соответствует ГОСТ 19792-2017.</p>
              <p className="mt-4 text-sm leading-6 text-[#6a7d76]">Удельная активность радионуклидов цезия-137 соответствует требованиям гигиенического норматива.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs leading-5 text-[#6a7d76]">Данные перенесены из протокола испытаний от 23.07.2026.</p>
            <button className="inline-flex items-center justify-center gap-3 bg-[#18362d] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#b87716]" onClick={() => window.print()} type="button">
              Печать протокола
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedVolume, setSelectedVolume] = useState(volumes[2]);
  const [protocolOpen, setProtocolOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const orderText = useMemo(
    () => `Мёд разнотравье, ${selectedVolume.volume} — ${selectedVolume.price} руб. Дедушкина пасека, урожай 2026.`,
    [selectedVolume],
  );

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const copySelection = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="overflow-hidden bg-[#f3efe6] text-[#17352c]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#102a23]/75 text-white backdrop-blur-lg">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button aria-label="Перейти к началу" className="flex items-center gap-3 text-left" onClick={() => scrollTo("about")} type="button">
            <BeeMark light />
            <span className="leading-none">
              <span className="block font-serif text-lg">Дедушкина пасека</span>
              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.23em] text-white/55">Клецкий район</span>
            </span>
          </button>

          <nav aria-label="Основная навигация" className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.16em] md:flex">
            <button className="nav-link" onClick={() => scrollTo("about")} type="button">О мёде</button>
            <button className="nav-link" onClick={() => scrollTo("passport")} type="button">Паспорт</button>
            <button className="nav-link" onClick={() => scrollTo("lab")} type="button">Лабораторный анализ</button>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <span className="h-2 w-2 rounded-full bg-[#f2bd55] shadow-[0_0_0_5px_rgba(242,189,85,0.15)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">Урожай 2026</span>
          </div>

          <button
            aria-expanded={mobileOpen}
            aria-label="Открыть меню"
            className="relative h-11 w-11 md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            type="button"
          >
            <span className={`absolute left-2 top-[16px] h-px w-7 bg-white transition ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute left-2 top-[26px] h-px w-7 bg-white transition ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>

        <div className={`grid overflow-hidden bg-[#102a23] transition-all duration-500 md:hidden ${mobileOpen ? "grid-rows-[1fr] border-t border-white/10" : "grid-rows-[0fr]"}`}>
          <nav className="min-h-0" aria-label="Мобильная навигация">
            <div className="flex flex-col gap-1 p-5 text-left font-serif text-3xl">
              <button className="border-b border-white/10 py-4 text-left" onClick={() => scrollTo("about")} type="button">О мёде</button>
              <button className="border-b border-white/10 py-4 text-left" onClick={() => scrollTo("passport")} type="button">Паспорт</button>
              <button className="py-4 text-left" onClick={() => scrollTo("lab")} type="button">Лабораторный анализ</button>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero relative flex min-h-[760px] h-[100svh] items-end" id="about">
        <img
          alt="Банка мёда разнотравье среди полевых цветов"
          className="hero-image absolute inset-0 h-full w-full object-cover object-[68%_center]"
          src="/images/honey-field.jpg"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,38,30,0.88)_0%,rgba(11,38,30,0.65)_38%,rgba(11,38,30,0.10)_72%),linear-gradient(0deg,rgba(11,38,30,0.62)_0%,transparent_42%)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-14 pt-32 text-white sm:px-8 sm:pb-20 lg:px-12 lg:pb-16">
          <div className="hero-copy max-w-4xl">
            <p className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f2bd55] sm:text-xs">
              <span className="h-px w-10 bg-[#f2bd55]" /> Цифровой паспорт продукта
            </p>
            <div className="brand-display font-serif leading-[0.78] tracking-[-0.055em]">
              <span className="block text-[clamp(4.1rem,10.5vw,10rem)]">Дедушкина</span>
              <span className="ml-[12%] mt-3 block text-[clamp(3.8rem,9vw,8.7rem)] italic text-[#f4dca8]">пасека</span>
            </div>
            <div className="mt-9 max-w-2xl border-l border-[#f2bd55]/70 pl-5 sm:ml-[12%] sm:pl-7">
              <h1 className="font-serif text-3xl sm:text-5xl">Мёд разнотравье</h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/72 sm:text-base">Честный летний сбор из Клецкого района. Происхождение, цена и лабораторные показатели одной партии.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 sm:ml-[12%]">
              <button className="action-primary" onClick={() => scrollTo("passport")} type="button">Изучить паспорт <ArrowIcon direction="right" /></button>
              <button className="action-ghost" onClick={() => scrollTo("lab")} type="button">Результаты анализа</button>
            </div>
          </div>
        </div>

        <button
          aria-label="Прокрутить к паспорту"
          className="scroll-cue absolute bottom-8 right-5 z-10 hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 lg:flex lg:right-12"
          onClick={() => scrollTo("passport")}
          type="button"
        >
          Листайте <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30"><ArrowIcon /></span>
        </button>
      </section>

      <section className="relative py-24 sm:py-32 lg:py-40" id="passport">
        <div className="absolute left-0 top-0 h-32 w-px bg-[#17352c]/20 sm:left-[8%]" />
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.4fr] lg:gap-20">
            <div data-reveal>
              <p className="section-index">01 / Паспорт</p>
              <h2 className="mt-6 max-w-lg font-serif text-5xl leading-[0.98] tracking-[-0.035em] sm:text-7xl">Один мёд.<br /><span className="italic text-[#a56d18]">Одно место.</span><br />Один сезон.</h2>
              <p className="mt-8 max-w-md text-base leading-7 text-[#587067]">Каждая банка относится к урожаю разнотравья, собранному в июне и июле 2026 года в Клецком районе.</p>
            </div>

            <div className="lg:pt-16" data-reveal style={{ transitionDelay: "120ms" }}>
              <dl className="passport-list border-t border-[#17352c]">
                <div>
                  <dt>Вид продукта</dt>
                  <dd>Мёд натуральный, разнотравье</dd>
                </div>
                <div>
                  <dt>Период сбора</dt>
                  <dd>Июнь – июль 2026</dd>
                </div>
                <div>
                  <dt>Место сбора</dt>
                  <dd>Клецкий район, Беларусь</dd>
                </div>
                <div>
                  <dt>Производитель</dt>
                  <dd>Абрамович А. Н.</dd>
                </div>
                <div>
                  <dt>Пасека</dt>
                  <dd>«Дедушкина пасека»</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-24 grid border-y border-[#17352c] lg:grid-cols-[0.8fr_1.2fr]" data-reveal>
            <div className="flex min-h-[260px] flex-col justify-between border-b border-[#17352c] py-8 lg:border-b-0 lg:border-r lg:py-10 lg:pr-12">
              <div>
                <p className="section-index">Доступный объём</p>
                <p className="mt-6 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">Выберите банку, чтобы увидеть стоимость.</p>
              </div>
              <p className="mt-10 text-xs leading-5 text-[#6b7c75]">Цена указана в белорусских рублях за одну единицу.</p>
            </div>

            <div className="py-8 lg:py-10 lg:pl-12">
              <div className="grid grid-cols-2 gap-px bg-[#17352c]/20 sm:grid-cols-4" role="radiogroup" aria-label="Выбор объёма мёда">
                {volumes.map((item) => {
                  const active = selectedVolume.volume === item.volume;
                  return (
                    <button
                      aria-checked={active}
                      className={`volume-button ${active ? "is-active" : ""}`}
                      key={item.volume}
                      onClick={() => {
                        setSelectedVolume(item);
                        setCopied(false);
                      }}
                      role="radio"
                      type="button"
                    >
                      <span>{item.volume}</span>
                      <span className="mt-2 font-serif text-2xl">{item.price} руб.</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                <div aria-live="polite" key={selectedVolume.volume} className="price-change">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6b7c75]">Ваш выбор</p>
                  <p className="mt-2 font-serif text-4xl sm:text-5xl">{selectedVolume.volume} <span className="text-[#a56d18]">/ {selectedVolume.price} руб.</span></p>
                </div>
                <button className="copy-button" onClick={copySelection} type="button">
                  {copied ? <><CheckIcon /> Скопировано</> : <>Скопировать позицию <ArrowIcon direction="right" /></>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f8f5ee] py-24 sm:py-32" aria-labelledby="origin-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-12">
          <figure className="origin-image-wrap overflow-hidden" data-reveal>
            <img className="h-[480px] w-full object-cover object-center sm:h-[650px]" src="/images/honey-field.jpg" alt="Мёд разнотравье Дедушкиной пасеки на фоне летнего луга" loading="lazy" />
          </figure>
          <div className="lg:pl-8" data-reveal style={{ transitionDelay: "100ms" }}>
            <p className="section-index">О мёде</p>
            <h2 className="mt-6 font-serif text-5xl leading-none tracking-[-0.035em] sm:text-7xl" id="origin-title">Лето,<br />сохранённое<br /><span className="italic text-[#a56d18]">в банке.</span></h2>
            <p className="mt-8 max-w-md text-base leading-7 text-[#587067]">Разнотравье собрано в период активного цветения луговых растений Клецкого района. Натуральный мёд разливается в четыре удобных объёма.</p>
            <div className="mt-10 flex items-center gap-5 border-t border-[#17352c]/25 pt-6">
              <BeeMark />
              <p className="text-xs font-bold uppercase leading-5 tracking-[0.16em]">Производитель<br /><span className="font-normal normal-case tracking-normal text-[#587067]">Абрамович А. Н.</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#15372e] py-24 text-[#f7f2e8] sm:py-32 lg:py-40" id="lab">
        <div className="lab-orb absolute -right-44 top-10 h-[440px] w-[440px] rounded-full border border-[#f2bd55]/10" />
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.4fr] lg:gap-20">
            <div data-reveal>
              <p className="section-index !text-[#efbd5b]">02 / Лабораторный анализ</p>
              <h2 className="mt-6 font-serif text-5xl leading-[0.98] tracking-[-0.035em] sm:text-7xl">Проверено.<br /><span className="italic text-[#f1d9a6]">Подтверждено.</span></h2>
            </div>
            <div className="lg:pt-7" data-reveal style={{ transitionDelay: "120ms" }}>
              <div className="flex items-start gap-4 border-t border-[#f7f2e8]/35 pt-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#efbd5b] text-[#15372e]"><CheckIcon /></span>
                <div>
                  <p className="font-serif text-3xl sm:text-4xl">Соответствует ГОСТ 19792-2017</p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f7f2e8]/60">Заключение по результатам физико-химического и радиологического исследования образца № 1328/1.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 border-t border-[#f7f2e8]/30" data-reveal>
            {labResults.map((result, index) => (
              <div className="lab-row grid gap-5 border-b border-[#f7f2e8]/20 py-7 sm:grid-cols-[2fr_1fr_0.85fr] sm:items-end sm:gap-8 lg:py-9" key={result.name}>
                <div className="flex items-start gap-5">
                  <span className="pt-1 text-[9px] tracking-[0.18em] text-[#efbd5b]">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl">{result.name}</h3>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#f7f2e8]/40">{result.method}</p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#f7f2e8]/40">Норма</p>
                  <p className="mt-1 text-sm text-[#f7f2e8]/75">{result.standard}</p>
                </div>
                <div className="sm:text-right">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#efbd5b]">Результат, {result.unit}</p>
                  <p className="mt-1 font-serif text-4xl text-[#efbd5b] sm:text-5xl">{result.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-between gap-7 sm:flex-row sm:items-center" data-reveal>
            <p className="max-w-xl text-xs leading-5 text-[#f7f2e8]/50">Протокол № 1328 х.д. от 23.07.2026. Результаты относятся к представленному образцу натурального мёда.</p>
            <button className="protocol-button" onClick={() => setProtocolOpen(true)} type="button">
              Открыть данные протокола <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-[#0d2821] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-12 md:flex-row md:items-end">
            <div>
              <BeeMark light />
              <p className="mt-5 font-serif text-4xl sm:text-5xl">Дедушкина пасека</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/45">Мёд из Клецкого района</p>
            </div>
            <button className="action-ghost self-start md:self-auto" onClick={() => scrollTo("about")} type="button">К началу <span className="rotate-180"><ArrowIcon /></span></button>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[10px] uppercase tracking-[0.14em] text-white/35 sm:flex-row">
            <p>Цифровой паспорт · Урожай 2026</p>
            <p>Производитель: Абрамович А. Н.</p>
          </div>
        </div>
      </footer>

      {protocolOpen && <ProtocolModal onClose={() => setProtocolOpen(false)} />}
    </main>
  );
}
