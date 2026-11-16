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
      'home.addHive':'➕ Добавить улей','home.addInspection':'📋 Записать осмотр','home.addHoney':'🍯 Добавить партию мёда',
      'auth.title':'🐝 Мир пчеловодства','auth.subtitle':'Вход в цифровой журнал пасечника','auth.methodHint':'Введите email или телефон и пароль.','auth.passwordRequirements':'Для регистрации: минимум 8 символов, строчные и заглавные латинские буквы, цифра и специальный символ (например ! или #).','auth.recoveryTitle':'Восстановление доступа','auth.recoveryHelp':'Укажите email, на который регистрировали журнал. Мы отправим ссылку для смены пароля.','auth.phoneHelp':'Для входа по телефону SMS-подтверждение не используется, поэтому автоматический сброс по одному номеру небезопасен. Не отправляйте пароль никому. Свяжитесь с владельцем журнала для проверки личности и восстановления доступа.'
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
      'home.addHive':'➕ Дадаць вулей','home.addInspection':'📋 Запісаць агляд','home.addHoney':'🍯 Дадаць партыю мёду',
      'auth.title':'🐝 Свет пчалярства','auth.subtitle':'Уваход у лічбавы журнал пчаляра','auth.methodHint':'Увядзіце email або тэлефон і пароль.','auth.passwordRequirements':'Для рэгістрацыі: мінімум 8 сімвалаў, малыя і вялікія лацінскія літары, лічба і спецыяльны сімвал (напрыклад ! або #).','auth.recoveryTitle':'Аднаўленне доступу','auth.recoveryHelp':'Укажыце email, з якім вы зарэгістравалі журнал. Мы адправім спасылку для змены пароля.','auth.phoneHelp':'Для ўваходу па тэлефоне SMS-пацвярджэнне не выкарыстоўваецца, таму аўтаматычны скід толькі па нумары небяспечны. Не паведамляйце пароль нікому. Звяжыцеся з уладальнікам журнала для праверкі асобы і аднаўлення доступу.'
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
      'home.addHive':'➕ Add hive','home.addInspection':'📋 Record inspection','home.addHoney':'🍯 Add honey batch',
      'auth.title':'🐝 World of Beekeeping','auth.subtitle':'Sign in to the digital beekeeping journal','auth.methodHint':'Enter your email or phone number and password.','auth.passwordRequirements':'For registration: at least 8 characters, lowercase and uppercase Latin letters, a number and a special character (for example ! or #).','auth.recoveryTitle':'Account recovery','auth.recoveryHelp':'Enter the email address used to register the journal. We will send you a password reset link.','auth.phoneHelp':'SMS verification is not used for phone sign-in, so an automatic reset using only a phone number is not secure. Do not share your password with anyone. Contact the journal owner to verify your identity and restore access.'
    }
  };
  const EXTRA = {"ru":{"page.apiaries":"Мои пасеки","desc.apiaries":"Пасеки и основные сведения о них.","page.hives":"Ульи","desc.hives":"Учёт ульев и пчелиных семей.","page.weights":"⚖️ Весы и медосбор","desc.weights":"Учёт контрольного веса ульев, динамика привеса и наблюдение за медосбором.","page.inspections":"Журнал осмотров","desc.inspections":"Записывайте состояние семей, маток, расплода, корма и работы.","page.health":"🩺 Здоровье семьи","desc.health":"Контроль варроа, признаков заболеваний и проведённых обработок по каждому улью.","page.wax":"🕯️ Учёт воска и вощины","page.products":"🌿 Прополис, пыльца и перга","page.calendar":"Календарь","page.calculators":"🧮 Калькуляторы пасечника","page.queens":"👑 Племенная работа и вывод маток","page.colonies":"🐝 Рои, отводки и объединение семей","page.honey":"Мёд / партии","page.finances":"Финансы","desc.finances":"Доходы и расходы пасеки.","page.tasks":"Напоминания","desc.tasks":"Работы, которые нельзя забыть.","page.photos":"Фото","desc.photos":"Фотографии ульев и осмотров хранятся отдельно в вашем журнале.","page.stats":"Статистика","desc.stats":"Состояние пчелиных семей и основные показатели журнала.","page.medicines":"💊 Лекарства","desc.medicines":"Учёт препаратов для пасеки, их количества и сроков годности.","page.disinfection":"🧴 Дезинфекция","desc.disinfection":"Учёт дезинфекции пасеки, ульев, рамок и инвентаря: когда, чем, как и по какой причине.","page.contacts":"👥 Контакты","desc.contacts":"Поставщики, пчеловоды и другие важные контакты. Дни рождения помогут не забыть поздравить."},"be":{"page.apiaries":"Мае пчальнікі","desc.apiaries":"Пчальнікі і асноўныя звесткі пра іх.","page.hives":"Вуллі","desc.hives":"Улік вулляў і пчаліных сем’яў.","page.weights":"⚖️ Шалі і медазбор","desc.weights":"Улік кантрольнай вагі вулляў, дынаміка прыбаўлення і назіранне за медазборам.","page.inspections":"Журнал аглядаў","desc.inspections":"Запісвайце стан сем’яў, матак, расплоду, корму і выкананых работ.","page.health":"🩺 Здароўе сям’і","desc.health":"Кантроль вароа, прыкмет захворванняў і праведзеных апрацовак па кожным вуллі.","page.wax":"🕯️ Улік воску і вашчыны","page.products":"🌿 Праполіс, пылок і пярга","page.calendar":"Каляндар","page.calculators":"🧮 Калькулятары пчаляра","page.queens":"👑 Племянная праца і вывядзенне матак","page.colonies":"🐝 Роі, адводкі і аб’яднанне сем’яў","page.honey":"Мёд / партыі","page.finances":"Фінансы","desc.finances":"Даходы і выдаткі пчальніка.","page.tasks":"Напаміны","desc.tasks":"Работы, пра якія нельга забыцца.","page.photos":"Фота","desc.photos":"Фатаграфіі вулляў і аглядаў захоўваюцца асобна ў вашым журнале.","page.stats":"Статыстыка","desc.stats":"Стан пчаліных сем’яў і асноўныя паказчыкі журнала.","page.medicines":"💊 Лекі","desc.medicines":"Улік прэпаратаў для пчальніка, іх колькасці і тэрмінаў прыдатнасці.","page.disinfection":"🧴 Дэзінфекцыя","desc.disinfection":"Улік дэзінфекцыі пчальніка, вулляў, рамак і інвентару: калі, чым, як і з якой прычыны.","page.contacts":"👥 Кантакты","desc.contacts":"Пастаўшчыкі, пчаляры і іншыя важныя кантакты. Дні нараджэння дапамогуць не забыцца павіншаваць."},"en":{"page.apiaries":"My apiaries","desc.apiaries":"Apiaries and their basic information.","page.hives":"Hives","desc.hives":"Hive and bee colony records.","page.weights":"⚖️ Scales & honey flow","desc.weights":"Track hive weight, weight gain trends and honey flow.","page.inspections":"Inspection log","desc.inspections":"Record colony condition, queens, brood, food stores and work performed.","page.health":"🩺 Colony health","desc.health":"Track Varroa, disease signs and treatments for each hive.","page.wax":"🕯️ Wax & foundation records","page.products":"🌿 Propolis, pollen & bee bread","page.calendar":"Calendar","page.calculators":"🧮 Beekeeping calculators","page.queens":"👑 Breeding & queen rearing","page.colonies":"🐝 Swarms, splits & colony merging","page.honey":"Honey / batches","page.finances":"Finances","desc.finances":"Apiary income and expenses.","page.tasks":"Reminders","desc.tasks":"Tasks you do not want to forget.","page.photos":"Photos","desc.photos":"Hive and inspection photos are stored separately in your journal.","page.stats":"Statistics","desc.stats":"Colony condition and key journal metrics.","page.medicines":"💊 Medicines","desc.medicines":"Track apiary medicines, quantities and expiry dates.","page.disinfection":"🧴 Disinfection","desc.disinfection":"Track disinfection of apiaries, hives, frames and equipment: when, what, how and why.","page.contacts":"👥 Contacts","desc.contacts":"Suppliers, beekeepers and other important contacts. Birthdays help you remember to send greetings."}};
  const UI_TEXT = {
    be: {
      'Email или номер телефона':'Email або нумар тэлефона','Пароль':'Пароль','Ваше имя':'Вашае імя','Email аккаунта':'Email акаўнта','Новый пароль':'Новы пароль','Повторите новый пароль':'Паўтарыце новы пароль',
      'Откуда':'Адкуль','Куда *':'Куды *','Дата перемещения *':'Дата перамяшчэння *','Причина':'Прычына','Примечание':'Заўвага','Страна оплаты':'Краіна аплаты',
      'Название пасеки *':'Назва пчальніка *','Количество ульев':'Колькасць вулляў','Место / район':'Месца / раён','Описание':'Апісанне','Пасека *':'Пчальнік *','Номер улья *':'Нумар вулля *','Тип':'Тып',
      'Порода матки':'Парода маткі','Год вывода матки':'Год вывядзення маткі','Ряд на пасеке':'Рад на пчальніку','Место в ряду':'Месца ў радзе','Дополнительное описание места':'Дадатковае апісанне месца',
      'Состояние':'Стан','Поиск по номеру / месту / заметкам':'Пошук па нумары / месцы / нататках','Контрольный улей *':'Кантрольны вулей *','Дата и время *':'Дата і час *','Общий вес улья, кг *':'Агульная вага вулля, кг *','Тип весов':'Тып вагаў','Что происходило':'Што адбывалася',
      'Улей *':'Вулей *','Дата *':'Дата *','Состояние семьи':'Стан сям’і','Матка':'Матка','Расплод':'Расплод','Корм':'Корм','Заметки':'Нататкі',
      'Дата проверки *':'Дата праверкі *','Метод контроля варроа':'Метад кантролю вароа','Пчёл в пробе':'Пчол у пробе','Найдено клещей':'Знойдзена кляшчоў','Результат варроа':'Вынік вароа','Единица результата':'Адзінка выніку','Заболевание':'Захворванне','Степень':'Ступень','Признаки / симптомы':'Прыкметы / сімптомы','Принятые меры':'Прынятыя меры',
      'Препарат':'Прэпарат','Препарат из моего склада':'Прэпарат з майго склада','Доза / способ':'Доза / спосаб','Количество израсходовано':'Колькасць выдаткавана','Способ обработки':'Спосаб апрацоўкі',
      'Дата операции *':'Дата аперацыі *','Операция *':'Аперацыя *','Количество, кг *':'Колькасць, кг *','Номер партии переработки':'Нумар партыі перапрацоўкі','Переработчик / организация':'Перапрацоўшчык / арганізацыя','Статус':'Статус','Продукция *':'Прадукцыя *','Номер партии':'Нумар партыі',
      'Название *':'Назва *','Тип работы':'Тып працы','Приоритет':'Прыярытэт','Напоминание':'Напамін','Мёд, кг':'Мёд, кг','Банка, мл':'Банка, мл','Количество семей':'Колькасць сем’яў',
      'Войти':'Увайсці','Регистрация':'Рэгістрацыя','👁️ Гостевой просмотр':'👁️ Гасцявы прагляд','Забыли пароль или логин?':'Забылі пароль або лагін?','Отправить ссылку':'Адправіць спасылку','Сохранить новый пароль':'Захаваць новы пароль','Вернуться ко входу':'Вярнуцца да ўваходу',
      'Сохранить перемещение':'Захаваць перамяшчэнне','Отмена':'Адмена','Закрыть':'Закрыць','Выйти':'Выйсці','🚪 Выйти':'🚪 Выйсці','➕ Добавить улей':'➕ Дадаць вулей','📋 Записать осмотр':'📋 Запісаць агляд','🍯 Добавить партию мёда':'🍯 Дадаць партыю мёду',
      'Сохранить пасеку':'Захаваць пчальнік','Сохранить улей':'Захаваць вулей','Сохранить показание':'Захаваць паказанне','Сохранить осмотр':'Захаваць агляд','Сохранить запись':'Захаваць запіс','Сохранить операцию':'Захаваць аперацыю','Очистить форму':'Ачысціць форму','Экспорт CSV':'Экспарт CSV','Сохранить событие':'Захаваць падзею','Сегодня':'Сёння','Загрузить фото':'Загрузіць фота','Сохранить лекарство':'Захаваць лекі','Сохранить контакт':'Захаваць кантакт'
    },
    en: {
      'Email или номер телефона':'Email or phone number','Пароль':'Password','Ваше имя':'Your name','Email аккаунта':'Account email','Новый пароль':'New password','Повторите новый пароль':'Repeat new password',
      'Откуда':'From','Куда *':'To *','Дата перемещения *':'Transfer date *','Причина':'Reason','Примечание':'Note','Страна оплаты':'Payment country',
      'Название пасеки *':'Apiary name *','Количество ульев':'Number of hives','Место / район':'Location / district','Описание':'Description','Пасека *':'Apiary *','Номер улья *':'Hive number *','Тип':'Type',
      'Порода матки':'Queen breed','Год вывода матки':'Queen year','Ряд на пасеке':'Apiary row','Место в ряду':'Position in row','Дополнительное описание места':'Additional location details',
      'Состояние':'Condition','Поиск по номеру / месту / заметкам':'Search by number / location / notes','Контрольный улей *':'Control hive *','Дата и время *':'Date and time *','Общий вес улья, кг *':'Total hive weight, kg *','Тип весов':'Scale type','Что происходило':'What happened',
      'Улей *':'Hive *','Дата *':'Date *','Состояние семьи':'Colony condition','Матка':'Queen','Расплод':'Brood','Корм':'Food stores','Заметки':'Notes',
      'Дата проверки *':'Check date *','Метод контроля варроа':'Varroa monitoring method','Пчёл в пробе':'Bees in sample','Найдено клещей':'Mites found','Результат варроа':'Varroa result','Единица результата':'Result unit','Заболевание':'Disease','Степень':'Severity','Признаки / симптомы':'Signs / symptoms','Принятые меры':'Actions taken',
      'Препарат':'Medicine','Препарат из моего склада':'Medicine from my inventory','Доза / способ':'Dose / method','Количество израсходовано':'Quantity used','Способ обработки':'Treatment method',
      'Дата операции *':'Operation date *','Операция *':'Operation *','Количество, кг *':'Quantity, kg *','Номер партии переработки':'Processing batch number','Переработчик / организация':'Processor / organization','Статус':'Status','Продукция *':'Product *','Номер партии':'Batch number',
      'Название *':'Name *','Тип работы':'Task type','Приоритет':'Priority','Напоминание':'Reminder','Мёд, кг':'Honey, kg','Банка, мл':'Jar, ml','Количество семей':'Number of colonies',
      'Войти':'Sign in','Регистрация':'Register','👁️ Гостевой просмотр':'👁️ Guest view','Забыли пароль или логин?':'Forgot password or login?','Отправить ссылку':'Send link','Сохранить новый пароль':'Save new password','Вернуться ко входу':'Back to sign in',
      'Сохранить перемещение':'Save transfer','Отмена':'Cancel','Закрыть':'Close','Выйти':'Log out','🚪 Выйти':'🚪 Log out','➕ Добавить улей':'➕ Add hive','📋 Записать осмотр':'📋 Record inspection','🍯 Добавить партию мёда':'🍯 Add honey batch',
      'Сохранить пасеку':'Save apiary','Сохранить улей':'Save hive','Сохранить показание':'Save reading','Сохранить осмотр':'Save inspection','Сохранить запись':'Save record','Сохранить операцию':'Save operation','Очистить форму':'Clear form','Экспорт CSV':'Export CSV','Сохранить событие':'Save event','Сегодня':'Today','Загрузить фото':'Upload photo','Сохранить лекарство':'Save medicine','Сохранить контакт':'Save contact'
    }
  };
  const UI_PLACEHOLDERS = {
    be: {'Введите email или +375291234567':'Увядзіце email або +375291234567','Ваш пароль':'Ваш пароль','Как к вам обращаться':'Як да вас звяртацца','name@example.com':'name@example.com','Не менее 8 символов':'Не менш за 8 сімвалаў','Повторите пароль':'Паўтарыце пароль','Поиск по журналу...':'Пошук па журнале...','Например, Дедушкина пасека':'Напрыклад, Дзядуляў пчальнік','Основная пасека, количество ульев, особенности...':'Асноўны пчальнік, колькасць вулляў, асаблівасці...','Что обнаружено при осмотре':'Што выяўлена падчас агляду','Например, поставлены полоски':'Напрыклад, пастаўлены палоскі','Что нужно сделать?':'Што трэба зрабіць?','Выберите препарат выше или введите название':'Выберыце прэпарат вышэй або ўвядзіце назву'},
    en: {'Введите email или +375291234567':'Enter email or +375291234567','Ваш пароль':'Your password','Как к вам обращаться':'What should we call you?','name@example.com':'name@example.com','Не менее 8 символов':'At least 8 characters','Повторите пароль':'Repeat password','Поиск по журналу...':'Search the journal...','Например, Дедушкина пасека':'e.g. Grandpa’s Apiary','Основная пасека, количество ульев, особенности...':'Main apiary, number of hives, details...','Что обнаружено при осмотре':'What was found during inspection','Например, поставлены полоски':'e.g. Strips were applied','Что нужно сделать?':'What needs to be done?','Выберите препарат выше или введите название':'Select a medicine above or enter a name'}
  };
  const UI_OPTIONS = {
    be: {
      'Перемещение улья':'Перамяшчэнне вулля','Медосбор':'Медазбор','Зимовка':'Зімоўка','Объединение семей':'Аб’яднанне сем’яў','Разделение семьи':'Падзел сям’і','Ремонт / обслуживание':'Рамонт / абслугоўванне','Другое':'Іншае',
      'Выберите страну':'Выберыце краіну','Беларусь — BYN':'Беларусь — BYN','Россия — RUB':'Расія — RUB','Все пасеки':'Усе пчальнікі','Не указана':'Не пазначана','Карника':'Карніка','Бакфаст':'Бакфаст','Мешанка':'Мешанка','Итальянка':'Італьянка','Среднерусская':'Сярэдняруская','Кавказская':'Каўказская','Другая':'Іншая',
      'Активен':'Актыўны','Пустой':'Пусты','Все состояния':'Усе станы','Выберите пасеку':'Выберыце пчальнік','Сначала выберите пасеку':'Спачатку выберыце пчальнік',
      'Механические':'Механічныя','Электронные':'Электронныя','Bluetooth (пока ручной ввод)':'Bluetooth (пакуль ручны ўвод)','Обычное взвешивание':'Звычайнае ўзважванне','Подкормка':'Падкормка','Откачка мёда':'Адпампоўка мёду','Изменение комплектации улья':'Змена камплектацыі вулля',
      'Не указано':'Не пазначана','Сильная':'Моцная','Средняя':'Сярэдняя','Слабая':'Слабая','Есть':'Ёсць','Молодая':'Маладая','Нет':'Няма','Трутневая':'Трутневая','Хороший':'Добры','Нормальный':'Нармальны','Слабый':'Слабы','Много':'Шмат','Достаточно':'Дастаткова','Мало':'Мала','Мёд и перга':'Мёд і пярга','Сироп':'Сіроп',
      'Не проверялся':'Не правяраўся','Сахарная пудра':'Цукровая пудра','Спиртовая смывка':'Спіртавая змыўка','Естественный осыпь':'Натуральны апад','Поддон':'Паддон','Визуальная оценка':'Візуальная ацэнка','Другой':'Іншы',
      'Не выявлено':'Не выяўлена','Варроатоз':'Вараатоз','Нозематоз':'Нозематоз','Гнилец':'Гнілец','Аскосфероз':'Аскасфераз','Вирусное заболевание':'Віруснае захворванне','Не указана':'Не пазначана','Нет признаков':'Няма прыкмет','Лёгкая':'Лёгкая','Тяжёлая':'Цяжкая',
      'Не указан':'Не пазначаны','Полоски':'Палоскі','Капельный метод':'Кропельны метад','Орошение':'Апырскванне','Испарение':'Выпарэнне','Получен воск':'Атрыманы воск','Сдан в переработку':'Здадзены на перапрацоўку','Получен воск после переработки':'Атрыманы воск пасля перапрацоўкі','Получена вощина':'Атрымана вашчына','Использована вощина':'Выкарыстана вашчына','Корректировка':'Карэкціроўка',
      'Общий склад / не указана':'Агульны склад / не пазначана','Завершена':'Завершана','Запланирована':'Запланавана','В переработке':'На перапрацоўцы','Отменена':'Адменена','Прополис':'Праполіс','Пыльца':'Пылок','Перга':'Пярга','Получено':'Атрымана','Продано':'Прададзена','Использовано':'Выкарыстана','Списано':'Спісана',
      'Осмотр':'Агляд','Обработка':'Апрацоўка','Перестановка рамок':'Перастаноўка рамак','Покупка':'Купля','Обычный':'Звычайны','Высокий':'Высокі','Низкий':'Нізкі','Без напоминания':'Без напаміну','За 1 день':'За 1 дзень','За 3 дня':'За 3 дні','За 7 дней':'За 7 дзён','Открыта':'Адкрыта','Выполнена':'Выканана',
      'Выберите улей':'Выберыце вулей','Рой':'Рой','Отводок':'Адводак','Пересадка семьи':'Перасадка сям’і','Старая матка':'Старая матка','Маточник':'Маточнік','Матка плодная':'Плодная матка','Матка неплодная':'Неплодная матка','Без матки':'Без маткі','Свищевой маточник':'Свісцевы маточнік','В работе':'У працы','Успешно':'Паспяхова','Неудачно':'Няўдала',
      'Выберите партию':'Выберыце партыю','Другая масса…':'Іншая маса…','Продажа на вес / без фасовки':'Продаж на вагу / без фасоўкі','Расход':'Выдатак','Доход':'Даход','Все':'Усе','Просроченные':'Пратэрмінаваныя','Сегодня':'Сёння','Ближайшие':'Бліжэйшыя','Выполненные':'Выкананыя','Без привязки':'Без прывязкі','7 дней':'7 дзён','14 дней':'14 дзён','30 дней':'30 дзён','60 дней':'60 дзён','90 дней':'90 дзён','Рамки':'Рамкі','Инвентарь':'Інвентар','Не выбран — указать вручную':'Не выбраны — пазначыць уручную','Обмывание':'Абмыванне','Замачивание':'Замочванне','Обработка паром':'Апрацоўка парам'
    },
    en: {
      'Перемещение улья':'Hive transfer','Медосбор':'Honey flow','Зимовка':'Wintering','Объединение семей':'Colony merger','Разделение семьи':'Colony split','Ремонт / обслуживание':'Repair / maintenance','Другое':'Other',
      'Выберите страну':'Select country','Все пасеки':'All apiaries','Не указана':'Not specified','Карника':'Carniolan','Бакфаст':'Buckfast','Мешанка':'Mixed','Итальянка':'Italian','Среднерусская':'Russian Central','Кавказская':'Caucasian','Другая':'Other',
      'Активен':'Active','Пустой':'Empty','Все состояния':'All conditions','Выберите пасеку':'Select apiary','Сначала выберите пасеку':'Select an apiary first',
      'Механические':'Mechanical','Электронные':'Electronic','Bluetooth (пока ручной ввод)':'Bluetooth (manual entry for now)','Обычное взвешивание':'Regular weighing','Подкормка':'Feeding','Откачка мёда':'Honey extraction','Изменение комплектации улья':'Hive configuration change',
      'Не указано':'Not specified','Сильная':'Strong','Средняя':'Medium','Слабая':'Weak','Есть':'Present','Молодая':'Young','Нет':'None','Трутневая':'Drone-laying','Хороший':'Good','Нормальный':'Normal','Слабый':'Weak','Много':'Plenty','Достаточно':'Sufficient','Мало':'Low','Мёд и перга':'Honey and bee bread','Сироп':'Syrup',
      'Не проверялся':'Not checked','Сахарная пудра':'Sugar roll','Спиртовая смывка':'Alcohol wash','Естественный осыпь':'Natural mite drop','Поддон':'Sticky board','Визуальная оценка':'Visual assessment','Другой':'Other',
      'Не выявлено':'Not detected','Варроатоз':'Varroosis','Нозематоз':'Nosemosis','Гнилец':'Foulbrood','Аскосфероз':'Chalkbrood','Вирусное заболевание':'Viral disease','Нет признаков':'No signs','Лёгкая':'Mild','Тяжёлая':'Severe',
      'Не указан':'Not specified','Полоски':'Strips','Капельный метод':'Drip method','Орошение':'Spraying','Испарение':'Evaporation','Получен воск':'Wax received','Сдан в переработку':'Sent for processing','Получен воск после переработки':'Wax received after processing','Получена вощина':'Foundation received','Использована вощина':'Foundation used','Корректировка':'Adjustment',
      'Общий склад / не указана':'General stock / not specified','Завершена':'Completed','Запланирована':'Planned','В переработке':'Processing','Отменена':'Cancelled','Прополис':'Propolis','Пыльца':'Pollen','Перга':'Bee bread','Получено':'Received','Продано':'Sold','Использовано':'Used','Списано':'Written off',
      'Осмотр':'Inspection','Обработка':'Treatment','Перестановка рамок':'Frame rearrangement','Покупка':'Purchase','Обычный':'Normal','Высокий':'High','Низкий':'Low','Без напоминания':'No reminder','За 1 день':'1 day before','За 3 дня':'3 days before','За 7 дней':'7 days before','Открыта':'Open','Выполнена':'Completed',
      'Выберите улей':'Select hive','Рой':'Swarm','Отводок':'Split','Пересадка семьи':'Colony transfer','Старая матка':'Old queen','Маточник':'Queen cell','Матка плодная':'Mated queen','Матка неплодная':'Virgin queen','Без матки':'Queenless','Свищевой маточник':'Emergency queen cell','В работе':'In progress','Успешно':'Successful','Неудачно':'Unsuccessful',
      'Выберите партию':'Select batch','Другая масса…':'Other weight…','Продажа на вес / без фасовки':'Bulk sale / not packaged','Расход':'Expense','Доход':'Income','Все':'All','Просроченные':'Overdue','Сегодня':'Today','Ближайшие':'Upcoming','Выполненные':'Completed','Без привязки':'Unlinked','7 дней':'7 days','14 дней':'14 days','30 дней':'30 days','60 дней':'60 days','90 дней':'90 days','Рамки':'Frames','Инвентарь':'Equipment','Не выбран — указать вручную':'None selected — enter manually','Обмывание':'Rinsing','Замачивание':'Soaking','Обработка паром':'Steam treatment'
    }
  };
  const UI_TABLES = {
    be: {'Дата / операция':'Дата / аперацыя','Исходная семья':'Зыходная сям’я','Новая / принимающая':'Новая / прымаючая','Пасека':'Пчальнік','Рамки':'Рамкі','Матка / семья':'Матка / сям’я','Статус / результат':'Статус / вынік','Примечание':'Заўвага','Дата':'Дата','Операция':'Аперацыя','Количество':'Колькасць','Партия / переработчик':'Партыя / перапрацоўшчык','Продукция':'Прадукцыя','Партия':'Партыя','Банка':'Банка','Фасовано':'Расфасавана','Осталось банок':'Засталося слоікаў','Код этикетки / QR':'Код этыкеткі / QR','Действия':'Дзеянні','Продано':'Прададзена','Сумма':'Сума','Финансы':'Фінансы','Продукт':'Прадукт','Улей':'Вулей','Последний осмотр':'Апошні агляд','Сила':'Сіла','Матка':'Матка','Корм':'Корм','Семья':'Сям’я','Фото':'Фота','Заметки':'Нататкі','Тип':'Тып','Категория':'Катэгорыя','Описание':'Апісанне','Что':'Што','Средство':'Сродак','Способ':'Спосаб','Причина':'Прычына','Ответственный':'Адказны','Следующая':'Наступная','Серия / дата прививки':'Серыя / дата прышчэпкі','Материнская семья':'Матчына сям’я','Стартер / финишер':'Стартар / фінішар','Ячейки':'Ячэйкі','Контрольные даты':'Кантрольныя даты','Этап':'Этап','Изменение':'Змяненне','Было → стало':'Было → стала','Комментарий':'Каментарый','Подсадка':'Падсадка','Порода':'Парода','Год':'Год','Происхождение':'Паходжанне','Метка':'Метка','Расплод':'Расплод','Препарат':'Прэпарат','Цель':'Мэта','Доза':'Доза','Расход':'Выдатак','Откуда':'Адкуль','Куда':'Куды','Событие':'Падзея','Приоритет':'Прыярытэт','Напоминание':'Напамін'},
    en: {'Дата / операция':'Date / operation','Исходная семья':'Source colony','Новая / принимающая':'New / receiving colony','Пасека':'Apiary','Рамки':'Frames','Матка / семья':'Queen / colony','Статус / результат':'Status / result','Примечание':'Note','Дата':'Date','Операция':'Operation','Количество':'Quantity','Партия / переработчик':'Batch / processor','Продукция':'Product','Партия':'Batch','Банка':'Jar','Фасовано':'Packaged','Осталось банок':'Jars remaining','Код этикетки / QR':'Label / QR code','Действия':'Actions','Продано':'Sold','Сумма':'Amount','Финансы':'Finances','Продукт':'Product','Улей':'Hive','Последний осмотр':'Last inspection','Сила':'Strength','Матка':'Queen','Корм':'Food stores','Семья':'Colony','Фото':'Photo','Заметки':'Notes','Тип':'Type','Категория':'Category','Описание':'Description','Что':'Item','Средство':'Product used','Способ':'Method','Причина':'Reason','Ответственный':'Responsible','Следующая':'Next','Серия / дата прививки':'Batch / grafting date','Материнская семья':'Mother colony','Стартер / финишер':'Starter / finisher','Ячейки':'Cells','Контрольные даты':'Check dates','Этап':'Stage','Изменение':'Change','Было → стало':'Before → after','Комментарий':'Comment','Подсадка':'Introduction','Порода':'Breed','Год':'Year','Происхождение':'Origin','Метка':'Mark','Расплод':'Brood','Препарат':'Medicine','Цель':'Purpose','Доза':'Dose','Расход':'Usage','Откуда':'From','Куда':'To','Событие':'Event','Приоритет':'Priority','Напоминание':'Reminder'}
  };
  const UI_MESSAGES = {
    be: {'Контакт удалён':'Кантакт выдалены','Запись удалена':'Запіс выдалены','Операция удалена':'Аперацыя выдалена','Фотография удалена':'Фатаграфія выдалена','Продажа удалена, остаток партии пересчитан.':'Продаж выдалены, рэшта партыі пералічана.','В гостевом режиме очистка недоступна':'У гасцявым рэжыме ачыстка недаступная','Необходимо войти как администратор.':'Неабходна ўвайсці як адміністратар.','Сначала войдите в журнал.':'Спачатку ўвайдзіце ў журнал.','Удалить эту фотографию?':'Выдаліць гэтую фатаграфію?','Понятно':'Зразумела','Установить журнал':'Усталяваць журнал','Заявка отклонена. Если это ошибка, свяжитесь с владельцем журнала.':'Заяўка адхілена. Калі гэта памылка, звяжыцеся з уладальнікам журнала.','Заявка принята и ожидает одобрения владельца журнала.':'Заяўка прынята і чакае адабрэння ўладальніка журнала.'},
    en: {'Контакт удалён':'Contact deleted','Запись удалена':'Record deleted','Операция удалена':'Operation deleted','Фотография удалена':'Photo deleted','Продажа удалена, остаток партии пересчитан.':'Sale deleted; batch balance recalculated.','В гостевом режиме очистка недоступна':'Clearing is unavailable in guest mode','Необходимо войти как администратор.':'You must sign in as an administrator.','Сначала войдите в журнал.':'Please sign in to the journal first.','Удалить эту фотографию?':'Delete this photo?','Понятно':'Got it','Установить журнал':'Install journal','Заявка отклонена. Если это ошибка, свяжитесь с владельцем журнала.':'Your application was declined. If this is a mistake, contact the journal owner.','Заявка принята и ожидает одобрения владельца журнала.':'Your application was received and is awaiting approval from the journal owner.'}
  };
  let current='ru', client=null, user=null;
  function valid(lang){return LANGS.includes(lang)?lang:'ru'}
  function translateMessage(message){const source=String(message??'');const map=UI_MESSAGES[current]||{};return map[source]!==undefined?map[source]:source;}
  function queryAll(root,selector){const found=Array.from(root.querySelectorAll(selector));if(root.nodeType===1&&root.matches(selector))found.unshift(root);return found;}
  function apply(root=document){
    const dict={...(DICT[current]||DICT.ru),...(EXTRA[current]||{})};
    const sectionIds=['apiaries','hives','weights','inspections','health','wax','apiary-products','calendar','calculators','queens','colonies','honey','finances','tasks','photos','stats','medicines','disinfection','contacts'];
    sectionIds.forEach(id=>{
      const section=document.getElementById('page-'+id);
      if(!section)return;
      const heading=section.querySelector(':scope > h1');
      const subtitle=section.querySelector(':scope > p.sub');
      if(heading&&dict['page.'+(id==='apiary-products'?'products':id)])heading.textContent=dict['page.'+(id==='apiary-products'?'products':id)];
      if(subtitle&&dict['desc.'+id])subtitle.textContent=dict['desc.'+id];
    });
    queryAll(root,'[data-i18n]').forEach(el=>{
      const value=dict[el.dataset.i18n];
      if(value!==undefined) el.textContent=value;
    });
    const uiMap=UI_TEXT[current]||{};
    queryAll(root,'label,button').forEach(el=>{
      if(el.tagName==='LABEL'&&el.querySelector('input,select,textarea,button'))return;
      const original=el.dataset.i18nOriginal??(el.textContent||'').replace(/\\s+/g,' ').trim();
      if(!el.dataset.i18nOriginal)el.dataset.i18nOriginal=original;
      if(uiMap[original]!==undefined) el.textContent=uiMap[original];
    });
    const placeholderMap=UI_PLACEHOLDERS[current]||{};
    queryAll(root,'[placeholder]').forEach(el=>{
      const original=el.dataset.i18nPlaceholder??el.getAttribute('placeholder');
      if(!el.dataset.i18nPlaceholder)el.dataset.i18nPlaceholder=original;
      if(placeholderMap[original]!==undefined) el.setAttribute('placeholder',placeholderMap[original]);
    });
    const optionMap=UI_OPTIONS[current]||{};
    queryAll(root,'select option').forEach(el=>{
      const original=el.dataset.i18nOriginal??(el.textContent||'').trim();
      if(!el.dataset.i18nOriginal)el.dataset.i18nOriginal=original;
      if(optionMap[original]!==undefined)el.textContent=optionMap[original];
    });
    const tableMap=UI_TABLES[current]||{};
    queryAll(root,'th').forEach(el=>{
      const original=el.dataset.i18nOriginal??(el.textContent||'').replace(/\\s+/g,' ').trim();
      if(!el.dataset.i18nOriginal)el.dataset.i18nOriginal=original;
      if(tableMap[original]!==undefined)el.textContent=tableMap[original];
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
    if(!window.__journalI18nObserver){
      const observer=new MutationObserver(records=>{
        records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)apply(node);}));
      });
      const startObserver=()=>{if(document.body)observer.observe(document.body,{childList:true,subtree:true});};
      if(document.body)startObserver();else document.addEventListener('DOMContentLoaded',startObserver,{once:true});
      window.__journalI18nObserver=observer;
    }
    const select=document.getElementById('journalLanguageSelect');
    if(select&&!select.dataset.i18nBound){
      select.dataset.i18nBound='1';
      select.addEventListener('change',()=>setLanguage(select.value));
    }
    return current;
  }
  window.JournalI18n={init,setLanguage,apply,translateMessage,getLanguage:()=>current,languages:LANGS.slice()};
})();