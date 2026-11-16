/* Journal interface localization foundation.
   Language preference is stored in the signed-in user's Supabase auth metadata.
   User-entered apiary names, notes and records are never translated. */
(function(){
  'use strict';
  const LANGS = ['ru','be','en'];
  const DICT = {
    ru: {
      'nav.home':'🏠 Главная','nav.apiaries':'🍯 Мои пасеки','nav.hives':'⬡ Ульи','nav.inspections':'📋 Осмотры',
      'nav.weights':'⚖️ Весы и медосбор','nav.health':'🩺 Здоровье','nav.queens':'👑 Племенная работа',
      'nav.colonies':'🐝 Рои и отводки','nav.wax':'🕯️ Воск и вощина','nav.products':'🌿 Прополис, пыльца и перга',
      'nav.calendar':'📅 Календарь','nav.honey':'🍯 Мёд / партии','nav.calculators':'🧮 Калькуляторы',
      'nav.finances':'💰 Финансы','nav.tasks':'🔔 Напоминания','nav.medicines':'💊 Лекарства',
      'nav.disinfection':'🧴 Дезинфекция','nav.contacts':'👥 Контакты','nav.photos':'📷 Фото',
      'nav.stats':'📊 Статистика','nav.settings':'⚙️ Настройки',
      'settings.title':'Настройки','settings.subtitle':'Ваш личный журнал.',
      'settings.languageTitle':'🌐 Язык интерфейса','settings.languageHelp':'Выберите язык, на котором вам удобно работать. Настройка сохранится в вашем аккаунте.',
      'settings.languageLabel':'Язык журнала','settings.languageSaved':'Язык сохранён в вашем аккаунте.',
      'home.title':'Журнал пасечника','home.welcome':'Добро пожаловать на пасеку 🐝',
      'home.addHive':'➕ Добавить улей','home.addInspection':'📋 Записать осмотр','home.addHoney':'🍯 Добавить партию мёда'
    },
    be: {
      'nav.home':'🏠 Галоўная','nav.apiaries':'🍯 Мае пчальнікі','nav.hives':'⬡ Вуллі','nav.inspections':'📋 Агляды',
      'nav.weights':'⚖️ Шалі і медазбор','nav.health':'🩺 Здароўе','nav.queens':'👑 Племянная праца',
      'nav.colonies':'🐝 Роі і адводкі','nav.wax':'🕯️ Воск і вашчына','nav.products':'🌿 Праполіс, пылок і пярга',
      'nav.calendar':'📅 Каляндар','nav.honey':'🍯 Мёд / партыі','nav.calculators':'🧮 Калькулятары',
      'nav.finances':'💰 Фінансы','nav.tasks':'🔔 Напаміны','nav.medicines':'💊 Лекі',
      'nav.disinfection':'🧴 Дэзінфекцыя','nav.contacts':'👥 Кантакты','nav.photos':'📷 Фота',
      'nav.stats':'📊 Статыстыка','nav.settings':'⚙️ Налады',
      'settings.title':'Налады','settings.subtitle':'Ваш асабісты журнал.',
      'settings.languageTitle':'🌐 Мова інтэрфейсу','settings.languageHelp':'Выберыце мову, на якой вам зручна працаваць. Налада захаваецца ў вашым акаўнце.',
      'settings.languageLabel':'Мова журнала','settings.languageSaved':'Мова захавана ў вашым акаўнце.',
      'home.title':'Журнал пчаляра','home.welcome':'Сардэчна запрашаем на пчальнік 🐝',
      'home.addHive':'➕ Дадаць вулей','home.addInspection':'📋 Запісаць агляд','home.addHoney':'🍯 Дадаць партыю мёду'
    },
    en: {
      'nav.home':'🏠 Home','nav.apiaries':'🍯 My apiaries','nav.hives':'⬡ Hives','nav.inspections':'📋 Inspections',
      'nav.weights':'⚖️ Scales & honey flow','nav.health':'🩺 Health','nav.queens':'👑 Queen breeding',
      'nav.colonies':'🐝 Swarms & splits','nav.wax':'🕯️ Wax & foundation','nav.products':'🌿 Propolis, pollen & bee bread',
      'nav.calendar':'📅 Calendar','nav.honey':'🍯 Honey / batches','nav.calculators':'🧮 Calculators',
      'nav.finances':'💰 Finances','nav.tasks':'🔔 Reminders','nav.medicines':'💊 Medicines',
      'nav.disinfection':'🧴 Disinfection','nav.contacts':'👥 Contacts','nav.photos':'📷 Photos',
      'nav.stats':'📊 Statistics','nav.settings':'⚙️ Settings',
      'settings.title':'Settings','settings.subtitle':'Your personal journal.',
      'settings.languageTitle':'🌐 Interface language','settings.languageHelp':'Choose the language you prefer. Your choice will be saved to your account.',
      'settings.languageLabel':'Journal language','settings.languageSaved':'Language saved to your account.',
      'home.title':'Beekeeping Journal','home.welcome':'Welcome to the apiary 🐝',
      'home.addHive':'➕ Add hive','home.addInspection':'📋 Record inspection','home.addHoney':'🍯 Add honey batch'
    }
  };
  let current='ru', client=null, user=null;
  function valid(lang){return LANGS.includes(lang)?lang:'ru'}
  function apply(root=document){
    const dict=DICT[current]||DICT.ru;
    root.querySelectorAll('[data-i18n]').forEach(el=>{
      const value=dict[el.dataset.i18n];
      if(value!==undefined) el.textContent=value;
    });
    root.documentElement?.setAttribute('lang',current);
    if(root===document) document.documentElement.lang=current;
    const select=document.getElementById('journalLanguageSelect');
    if(select&&select.value!==current)select.value=current;
  }
  async function setLanguage(lang){
    current=valid(lang);
    try{localStorage.setItem('journal-language',current)}catch(_){}
    apply();
    const status=document.getElementById('journalLanguageStatus');
    if(client&&user){
      const {data,error}=await client.auth.updateUser({data:{journal_language:current}});
      if(error){
        if(status)status.textContent='Не удалось сохранить язык в аккаунте: '+error.message;
        return false;
      }
      user=data.user||user;
      if(status)status.textContent=DICT[current]['settings.languageSaved'];
    }else if(status) status.textContent=DICT[current]['settings.languageSaved'];
    return true;
  }
  function init(authUser,supabase){
    user=authUser||null; client=supabase||null;
    const saved=user?.user_metadata?.journal_language;
    let local='ru';try{local=localStorage.getItem('journal-language')||'ru'}catch(_){}
    current=valid(saved||local);
    apply();
    const select=document.getElementById('journalLanguageSelect');
    if(select&&!select.dataset.i18nBound){
      select.dataset.i18nBound='1';
      select.addEventListener('change',()=>setLanguage(select.value));
    }
    return current;
  }
  window.JournalI18n={init,setLanguage,apply,getLanguage:()=>current,languages:LANGS.slice()};
})();