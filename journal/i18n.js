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
  const EXTRA = {"ru":{"page.apiaries":"Мои пасеки","desc.apiaries":"Пасеки и основные сведения о них.","page.hives":"Ульи","desc.hives":"Учёт ульев и пчелиных семей.","page.weights":"⚖️ Весы и медосбор","desc.weights":"Учёт контрольного веса ульев, динамика привеса и наблюдение за медосбором.","page.inspections":"Журнал осмотров","desc.inspections":"Записывайте состояние семей, маток, расплода, корма и работы.","page.health":"🩺 Здоровье семьи","desc.health":"Контроль варроа, признаков заболеваний и проведённых обработок по каждому улью.","page.wax":"🕯️ Учёт воска и вощины","page.products":"🌿 Прополис, пыльца и перга","page.calendar":"Календарь","page.calculators":"🧮 Калькуляторы пасечника","page.queens":"👑 Племенная работа и вывод маток","page.colonies":"🐝 Рои, отводки и объединение семей","page.honey":"Мёд / партии","page.finances":"Финансы","desc.finances":"Доходы и расходы пасеки.","page.tasks":"Напоминания","desc.tasks":"Работы, которые нельзя забыть.","page.photos":"Фото","desc.photos":"Фотографии ульев и осмотров хранятся отдельно в вашем журнале.","page.stats":"Статистика","desc.stats":"Состояние пчелиных семей и основные показатели журнала.","page.medicines":"💊 Лекарства","desc.medicines":"Учёт препаратов для пасеки, их количества и сроков годности.","page.disinfection":"🧴 Дезинфекция","desc.disinfection":"Учёт дезинфекции пасеки, ульев, рамок и инвентаря: когда, чем, как и по какой причине.","page.contacts":"👥 Контакты","desc.contacts":"Поставщики, пчеловоды и другие важные контакты. Дни рождения помогут не забыть поздравить."},"be":{"page.apiaries":"Мае пчальнікі","desc.apiaries":"Пчальнікі і асноўныя звесткі пра іх.","page.hives":"Вуллі","desc.hives":"Улік вулляў і пчаліных сем’яў.","page.weights":"⚖️ Шалі і медазбор","desc.weights":"Улік кантрольнай вагі вулляў, дынаміка прыбаўлення і назіранне за медазборам.","page.inspections":"Журнал аглядаў","desc.inspections":"Запісвайце стан сем’яў, матак, расплоду, корму і выкананых работ.","page.health":"🩺 Здароўе сям’і","desc.health":"Кантроль вароа, прыкмет захворванняў і праведзеных апрацовак па кожным вуллі.","page.wax":"🕯️ Улік воску і вашчыны","page.products":"🌿 Праполіс, пылок і пярга","page.calendar":"Каляндар","page.calculators":"🧮 Калькулятары пчаляра","page.queens":"👑 Племянная праца і вывядзенне матак","page.colonies":"🐝 Роі, адводкі і аб’яднанне сем’яў","page.honey":"Мёд / партыі","page.finances":"Фінансы","desc.finances":"Даходы і выдаткі пчальніка.","page.tasks":"Напаміны","desc.tasks":"Работы, пра якія нельга забыцца.","page.photos":"Фота","desc.photos":"Фатаграфіі вулляў і аглядаў захоўваюцца асобна ў вашым журнале.","page.stats":"Статыстыка","desc.stats":"Стан пчаліных сем’яў і асноўныя паказчыкі журнала.","page.medicines":"💊 Лекі","desc.medicines":"Улік прэпаратаў для пчальніка, іх колькасці і тэрмінаў прыдатнасці.","page.disinfection":"🧴 Дэзінфекцыя","desc.disinfection":"Улік дэзінфекцыі пчальніка, вулляў, рамак і інвентару: калі, чым, як і з якой прычыны.","page.contacts":"👥 Кантакты","desc.contacts":"Пастаўшчыкі, пчаляры і іншыя важныя кантакты. Дні нараджэння дапамогуць не забыцца павіншаваць."},"en":{"page.apiaries":"My apiaries","desc.apiaries":"Apiaries and their basic information.","page.hives":"Hives","desc.hives":"Hive and bee colony records.","page.weights":"⚖️ Scales & honey flow","desc.weights":"Track hive weight, weight gain trends and honey flow.","page.inspections":"Inspection log","desc.inspections":"Record colony condition, queens, brood, food stores and work performed.","page.health":"🩺 Colony health","desc.health":"Track Varroa, disease signs and treatments for each hive.","page.wax":"🕯️ Wax & foundation records","page.products":"🌿 Propolis, pollen & bee bread","page.calendar":"Calendar","page.calculators":"🧮 Beekeeping calculators","page.queens":"👑 Breeding & queen rearing","page.colonies":"🐝 Swarms, splits & colony merging","page.honey":"Honey / batches","page.finances":"Finances","desc.finances":"Apiary income and expenses.","page.tasks":"Reminders","desc.tasks":"Tasks you do not want to forget.","page.photos":"Photos","desc.photos":"Hive and inspection photos are stored separately in your journal.","page.stats":"Statistics","desc.stats":"Colony condition and key journal metrics.","page.medicines":"💊 Medicines","desc.medicines":"Track apiary medicines, quantities and expiry dates.","page.disinfection":"🧴 Disinfection","desc.disinfection":"Track disinfection of apiaries, hives, frames and equipment: when, what, how and why.","page.contacts":"👥 Contacts","desc.contacts":"Suppliers, beekeepers and other important contacts. Birthdays help you remember to send greetings."}};
  let current='ru', client=null, user=null;
  function valid(lang){return LANGS.includes(lang)?lang:'ru'}
  function apply(root=document){
    const dict={...(DICT[current]||DICT.ru),...(EXTRA[current]||{})};
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