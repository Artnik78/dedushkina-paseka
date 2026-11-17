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
      'settings.languageLabel':'Язык журнала','settings.languageSaved':'Язык сохранён в вашем аккаунте.','modal.hiveMove':"↔️ Перемещение улья",'modal.hiveFamily':"🐝 Пчелиная семья",'settings.account':"Моя учётная запись",'settings.displayName':"Название пасечника",'settings.displayNameHelp':"Это название будет показываться слева вверху журнала.",'settings.saveName':"Сохранить название",'settings.refresh':"Обновить данные",'settings.share':"🔗 Поделиться журналом",'settings.shareHelp':"Отправьте ссылку на цифровой журнал другим пчеловодам через Telegram, Viber, WhatsApp, SMS или любое другое приложение.",'settings.shareButton':"↗ Поделиться ссылкой",'settings.copyLink':"Копировать ссылку",'settings.sharePrivacy':"Личные записи, пароли и данные пасеки не передаются — отправляется только адрес журнала.",'settings.pushTitle':"🔔 Уведомления на телефон",'settings.pushHelp':"Разрешите уведомления в Chrome на Android. После настройки push-уведомления смогут приходить, даже когда журнал закрыт.",'settings.when':"Когда напоминать",'settings.daily':"Каждый день",'settings.weekdays':"Только по будням",'settings.weekly':"Раз в неделю (понедельник)",'settings.time':"Время (Europe/Minsk)",'settings.pushEnabled':"Получать push-напоминания",'settings.lowStock':"Остатки лекарств",'settings.expiry':"Сроки годности препаратов",'settings.tasks':"Задачи и запланированные работы",'settings.disinfection':"Плановая дезинфекция",'settings.birthdays':"Дни рождения контактов",'settings.saveReminders':"Сохранить настройки напоминаний",'settings.enablePush':"Включить и проверить уведомления",'settings.defaultPrefs':"Параметры по умолчанию показаны только для настройки формы и не сохранены в профиле.",'settings.pushNotConnected':"Push ещё не подключён на этом устройстве.",
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
      'settings.languageLabel':'Мова журнала','settings.languageSaved':'Мова захавана ў вашым акаўнце.','modal.hiveMove':"↔️ Перамяшчэнне вулля",'modal.hiveFamily':"🐝 Пчаліная сям’я",'settings.account':"Мой уліковы запіс",'settings.displayName':"Назва пчаляра",'settings.displayNameHelp':"Гэта назва будзе паказвацца злева ўверсе журнала.",'settings.saveName':"Захаваць назву",'settings.refresh':"Абнавіць даныя",'settings.share':"🔗 Падзяліцца журналам",'settings.shareHelp':"Адпраўце спасылку на лічбавы журнал іншым пчалярам праз Telegram, Viber, WhatsApp, SMS або любое іншае прыкладанне.",'settings.shareButton':"↗ Падзяліцца спасылкай",'settings.copyLink':"Скапіяваць спасылку",'settings.sharePrivacy':"Асабістыя запісы, паролі і даныя пчальніка не перадаюцца — адпраўляецца толькі адрас журнала.",'settings.pushTitle':"🔔 Апавяшчэнні на тэлефон",'settings.pushHelp':"Дазвольце апавяшчэнні ў Chrome на Android. Пасля наладкі push-апавяшчэнні змогуць прыходзіць, нават калі журнал закрыты.",'settings.when':"Калі нагадваць",'settings.daily':"Кожны дзень",'settings.weekdays':"Толькі ў буднія дні",'settings.weekly':"Раз на тыдзень (панядзелак)",'settings.time':"Час (Europe/Minsk)",'settings.pushEnabled':"Атрымліваць push-напаміны",'settings.lowStock':"Рэшткі лекаў",'settings.expiry':"Тэрміны прыдатнасці прэпаратаў",'settings.tasks':"Задачы і запланаваныя работы",'settings.disinfection':"Планавая дэзінфекцыя",'settings.birthdays':"Дні нараджэння кантактаў",'settings.saveReminders':"Захаваць налады напамінаў",'settings.enablePush':"Уключыць і праверыць апавяшчэнні",'settings.defaultPrefs':"Налады па змаўчанні паказаны толькі для запаўнення формы і яшчэ не захаваны ў профілі.",'settings.pushNotConnected':"Push яшчэ не падключаны на гэтай прыладзе.",
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
      'settings.languageLabel':'Journal language','settings.languageSaved':'Language saved to your account.','modal.hiveMove':"↔️ Move hive",'modal.hiveFamily':"🐝 Bee colony",'settings.account':"My account",'settings.displayName':"Beekeeper display name",'settings.displayNameHelp':"This name will appear at the top left of the journal.",'settings.saveName':"Save name",'settings.refresh':"Refresh data",'settings.share':"🔗 Share journal",'settings.shareHelp':"Send the digital journal link to other beekeepers via Telegram, Viber, WhatsApp, SMS or any other app.",'settings.shareButton':"↗ Share link",'settings.copyLink':"Copy link",'settings.sharePrivacy':"Personal records, passwords and apiary data are not shared — only the journal address is sent.",'settings.pushTitle':"🔔 Phone notifications",'settings.pushHelp':"Allow notifications in Chrome on Android. Once configured, push notifications can arrive even when the journal is closed.",'settings.when':"When to remind",'settings.daily':"Every day",'settings.weekdays':"Weekdays only",'settings.weekly':"Once a week (Monday)",'settings.time':"Time (Europe/Minsk)",'settings.pushEnabled':"Receive push reminders",'settings.lowStock':"Medicine stock levels",'settings.expiry':"Medicine expiry dates",'settings.tasks':"Tasks and scheduled work",'settings.disinfection':"Scheduled disinfection",'settings.birthdays':"Contact birthdays",'settings.saveReminders':"Save reminder settings",'settings.enablePush':"Enable and test notifications",'settings.defaultPrefs':"Default values are shown only to configure this form and have not been saved to your profile.",'settings.pushNotConnected':"Push is not connected on this device.",
      'home.title':'Beekeeping Journal','home.welcome':'Welcome to the apiary 🐝',
      'home.addHive':'➕ Add hive','home.addInspection':'📋 Record inspection','home.addHoney':'🍯 Add honey batch',
      'auth.title':'🐝 World of Beekeeping','auth.subtitle':'Sign in to the digital beekeeping journal','auth.methodHint':'Enter your email or phone number and password.','auth.passwordRequirements':'For registration: at least 8 characters, lowercase and uppercase Latin letters, a number and a special character (for example ! or #).','auth.recoveryTitle':'Account recovery','auth.recoveryHelp':'Enter the email address used to register the journal. We will send you a password reset link.','auth.phoneHelp':'SMS verification is not used for phone sign-in, so an automatic reset using only a phone number is not secure. Do not share your password with anyone. Contact the journal owner to verify your identity and restore access.'
    }
  };
  const EXTRA = {"ru":{"page.apiaries":"Мои пасеки","desc.apiaries":"Пасеки и основные сведения о них.","page.hives":"Ульи","desc.hives":"Учёт ульев и пчелиных семей.","page.weights":"⚖️ Весы и медосбор","desc.weights":"Учёт контрольного веса ульев, динамика привеса и наблюдение за медосбором.","page.inspections":"Журнал осмотров","desc.inspections":"Записывайте состояние семей, маток, расплода, корма и работы.","page.health":"🩺 Здоровье семьи","desc.health":"Контроль варроа, признаков заболеваний и проведённых обработок по каждому улью.","page.wax":"🕯️ Учёт воска и вощины","page.products":"🌿 Прополис, пыльца и перга","page.calendar":"Календарь","page.calculators":"🧮 Калькуляторы пасечника","page.queens":"👑 Племенная работа и вывод маток","page.colonies":"🐝 Рои, отводки и объединение семей","page.honey":"Мёд / партии","page.finances":"Финансы","desc.finances":"Доходы и расходы пасеки.","page.tasks":"Напоминания","desc.tasks":"Работы, которые нельзя забыть.","page.photos":"Фото","desc.photos":"Фотографии ульев и осмотров хранятся отдельно в вашем журнале.","page.stats":"Статистика","desc.stats":"Состояние пчелиных семей и основные показатели журнала.","page.medicines":"💊 Лекарства","desc.medicines":"Учёт препаратов для пасеки, их количества и сроков годности.","page.disinfection":"🧴 Дезинфекция","desc.disinfection":"Учёт дезинфекции пасеки, ульев, рамок и инвентаря: когда, чем, как и по какой причине.","page.contacts":"👥 Контакты","desc.contacts":"Поставщики, пчеловоды и другие важные контакты. Дни рождения помогут не забыть поздравить."},"be":{"page.apiaries":"Мае пчальнікі","desc.apiaries":"Пчальнікі і асноўныя звесткі пра іх.","page.hives":"Вуллі","desc.hives":"Улік вулляў і пчаліных сем’яў.","page.weights":"⚖️ Шалі і медазбор","desc.weights":"Улік кантрольнай вагі вулляў, дынаміка прыбаўлення і назіранне за медазборам.","page.inspections":"Журнал аглядаў","desc.inspections":"Запісвайце стан сем’яў, матак, расплоду, корму і выкананых работ.","page.health":"🩺 Здароўе сям’і","desc.health":"Кантроль вароа, прыкмет захворванняў і праведзеных апрацовак па кожным вуллі.","page.wax":"🕯️ Улік воску і вашчыны","page.products":"🌿 Праполіс, пылок і пярга","page.calendar":"Каляндар","page.calculators":"🧮 Калькулятары пчаляра","page.queens":"👑 Племянная праца і вывядзенне матак","page.colonies":"🐝 Роі, адводкі і аб’яднанне сем’яў","page.honey":"Мёд / партыі","page.finances":"Фінансы","desc.finances":"Даходы і выдаткі пчальніка.","page.tasks":"Напаміны","desc.tasks":"Работы, пра якія нельга забыцца.","page.photos":"Фота","desc.photos":"Фатаграфіі вулляў і аглядаў захоўваюцца асобна ў вашым журнале.","page.stats":"Статыстыка","desc.stats":"Стан пчаліных сем’яў і асноўныя паказчыкі журнала.","page.medicines":"💊 Лекі","desc.medicines":"Улік прэпаратаў для пчальніка, іх колькасці і тэрмінаў прыдатнасці.","page.disinfection":"🧴 Дэзінфекцыя","desc.disinfection":"Улік дэзінфекцыі пчальніка, вулляў, рамак і інвентару: калі, чым, як і з якой прычыны.","page.contacts":"👥 Кантакты","desc.contacts":"Пастаўшчыкі, пчаляры і іншыя важныя кантакты. Дні нараджэння дапамогуць не забыцца павіншаваць."},"en":{"page.apiaries":"My apiaries","desc.apiaries":"Apiaries and their basic information.","page.hives":"Hives","desc.hives":"Hive and bee colony records.","page.weights":"⚖️ Scales & honey flow","desc.weights":"Track hive weight, weight gain trends and honey flow.","page.inspections":"Inspection log","desc.inspections":"Record colony condition, queens, brood, food stores and work performed.","page.health":"🩺 Colony health","desc.health":"Track Varroa, disease signs and treatments for each hive.","page.wax":"🕯️ Wax & foundation records","page.products":"🌿 Propolis, pollen & bee bread","page.calendar":"Calendar","page.calculators":"🧮 Beekeeping calculators","page.queens":"👑 Breeding & queen rearing","page.colonies":"🐝 Swarms, splits & colony merging","page.honey":"Honey / batches","page.finances":"Finances","desc.finances":"Apiary income and expenses.","page.tasks":"Reminders","desc.tasks":"Tasks you do not want to forget.","page.photos":"Photos","desc.photos":"Hive and inspection photos are stored separately in your journal.","page.stats":"Statistics","desc.stats":"Colony condition and key journal metrics.","page.medicines":"💊 Medicines","desc.medicines":"Track apiary medicines, quantities and expiry dates.","page.disinfection":"🧴 Disinfection","desc.disinfection":"Track disinfection of apiaries, hives, frames and equipment: when, what, how and why.","page.contacts":"👥 Contacts","desc.contacts":"Suppliers, beekeepers and other important contacts. Birthdays help you remember to send greetings."}};
  Object.assign(EXTRA.be, {
    'settings.restoreTitle':'📥 Восстановление из JSON',
    'settings.restoreHelp':'Загрузіце раней захаваную поўную копію журнала. Існуючыя запісы не выдаляюцца: запісы з супадаючымі ID будуць абноўлены, астатнія дададзены. Акаўнт, назва пчаляра і налады доступу не змяняюцца.',
    'settings.backupLabel':'Рэзервовая копія журнала (.json)',
    'settings.checkBackup':'Праверыць копію',
    'settings.clearTitle':'🗑 Ачыстка журнала',
    'settings.clearHelp':'Выдаленне даных вашага журнала без выдалення акаўнта, назвы пчаляра і налад доступу.',
    'settings.clearHives':'Усе вуллі і пчальнікі',
    'settings.clearInspections':'Агляды, гісторыя работ і перамяшчэння вулляў',
    'settings.clearHealth':'Запісы пра здароўе, лячэнне і дэзінфекцыю',
    'settings.clearHoney':'Партыі мёду, фасоўка і QR-этыкеткі',
    'settings.clearMedicines':'Лекі і рух іх запасаў',
    'settings.clearFinances':'Фінансавыя запісы і задачы',
    'settings.clearPhotos':'Фатаграфіі і звязаныя файлы',
    'settings.install':'Усталяваць журнал'
  });
  Object.assign(EXTRA.en, {
    'settings.restoreTitle':'📥 Restore from JSON',
    'settings.restoreHelp':'Upload a previously saved full journal backup. Existing records are not deleted: records with matching IDs will be updated, and the rest will be added. Your account, beekeeper name and access settings will not change.',
    'settings.backupLabel':'Journal backup (.json)',
    'settings.checkBackup':'Check backup',
    'settings.clearTitle':'🗑 Clear journal',
    'settings.clearHelp':'Delete your journal data without deleting your account, beekeeper name or access settings.',
    'settings.clearHives':'All hives and apiaries',
    'settings.clearInspections':'Inspections, work history and hive movements',
    'settings.clearHealth':'Health, treatment and disinfection records',
    'settings.clearHoney':'Honey batches, packaging and QR labels',
    'settings.clearMedicines':'Medicines and stock movements',
    'settings.clearFinances':'Financial records and tasks',
    'settings.clearPhotos':'Photos and related files',
    'settings.install':'Install journal'
  });
  Object.assign(EXTRA.be, {
    'settings.restorePhotoNote':'Файл JSON змяшчае даныя запісаў, але не самі фатаграфіі. Запісы фота будуць прапушчаны, бо файлы выяў не ўключаны ў рэзервовую копію. Перад аднаўленнем захавайце бягучую копію журнала.',
    'settings.restoreConfirm':'Я праверыў выбраны файл і разумею, што запісы з супадаючымі ID будуць абноўлены.',
    'settings.restoreStart':'Пачаць аднаўленне','settings.cancel':'Адмена',
    'settings.clearWarning':'⚠️ Увага: выдаленыя даныя немагчыма будзе аднавіць. Перад ачысткай пры неабходнасці спампуйце копію журнала ў раздзеле «Экспарт даных».',
    'settings.clearStart':'🗑 Ачысціць журнал…','settings.clearConfirmTitle':'Пацвярджэнне 2 з 2.','settings.clearConfirmHelp':'Будуць выдалены ўсе пералічаныя даныя толькі вашага акаўнта. Акаўнт, назва пчаляра і доступ застануцца.',
    'settings.clearType':'Для пацвярджэння ўвядзіце дакладна:','settings.clearPhrase':'Пацвярджэнне выдалення','settings.clearPlaceholder':'ВЫДАЛІЦЬ УСЁ','settings.clearYes':'Так, выдаліць незваротна',
    'settings.exportTitle':'📦 Экспарт даных','settings.exportHelp':'Спампаваць копію журнала для захоўвання або пераносу. Фатаграфіі асобна не ўключаюцца ў JSON/CSV.',
    'settings.exportFull':'⬇️ Поўная копія JSON','settings.exportHives':'Вуллі CSV','settings.exportInspections':'Агляды CSV','settings.exportHealth':'Здароўе CSV','settings.exportTreatments':'Лячэнне CSV','settings.exportQueens':'Маткі CSV','settings.exportHoney':'Мёд CSV','settings.exportTasks':'Напаміны CSV','settings.exportFinance':'Фінансы CSV','settings.exportMedicines':'Лекі CSV','settings.exportMedicineMoves':'Рух лекаў CSV',
    'settings.usersTitle':'👥 Карыстальнікі журнала','settings.usersHelp':'Толькі ўладальнік можа дазваляць і блакаваць доступ.','settings.refreshUsers':'Абнавіць','settings.loading':'Загрузка…'
  });
  Object.assign(EXTRA.en, {
    'settings.restorePhotoNote':'The JSON file contains record data, but not the photos themselves. Photo records will be skipped because image files are not included in the backup. Save a current journal backup before restoring.',
    'settings.restoreConfirm':'I have checked the selected file and understand that existing records with matching IDs will be updated.',
    'settings.restoreStart':'Start restore','settings.cancel':'Cancel',
    'settings.clearWarning':'⚠️ Warning: deleted data cannot be recovered. Before clearing, download a journal backup from the “Data export” section if needed.',
    'settings.clearStart':'🗑 Clear journal…','settings.clearConfirmTitle':'Confirmation 2 of 2.','settings.clearConfirmHelp':'All listed data belonging only to your account will be deleted. Your account, beekeeper name and access will remain.',
    'settings.clearType':'To confirm, enter exactly:','settings.clearPhrase':'Deletion confirmation','settings.clearPlaceholder':'DELETE EVERYTHING','settings.clearYes':'Yes, permanently delete',
    'settings.exportTitle':'📦 Data export','settings.exportHelp':'Download a journal copy for storage or transfer. Photos are not included in JSON/CSV.',
    'settings.exportFull':'⬇️ Full JSON backup','settings.exportHives':'Hives CSV','settings.exportInspections':'Inspections CSV','settings.exportHealth':'Health CSV','settings.exportTreatments':'Treatments CSV','settings.exportQueens':'Queens CSV','settings.exportHoney':'Honey CSV','settings.exportTasks':'Reminders CSV','settings.exportFinance':'Finances CSV','settings.exportMedicines':'Medicines CSV','settings.exportMedicineMoves':'Medicine movements CSV',
    'settings.usersTitle':'👥 Journal users','settings.usersHelp':'Only the owner can grant and block access.','settings.refreshUsers':'Refresh','settings.loading':'Loading…'
  });
  Object.assign(EXTRA.be, {'settings.restoreTitle':'📥 Аднаўленне з JSON','settings.account':'Мой уліковы запіс'});
  Object.assign(EXTRA.en, {'settings.account':'My account'});
  Object.assign(EXTRA.be, {
    'settings.apiariesCount':'Мае пчальнікі:',
    'settings.hivesCount':'Мае вуллі:',
    'settings.pushEnabled':'Атрымліваць push-напаміны',
    'settings.lowStock':'Рэшткi лекаў',
    'settings.expiry':'Тэрміны прыдатнасці прэпаратаў',
    'settings.tasks':'Задачы і запланаваныя работы',
    'settings.disinfection':'Планавая дэзінфекцыя',
    'settings.birthdays':'Дні нараджэння кантактаў',
    'settings.defaultPrefs':'Паказаны налады па змаўчанні. Яны яшчэ не захаваны — націсніце «Захаваць налады напамінаў».',
    'settings.pushNotConnected':'Push яшчэ не падключаны на гэтай прыладзе.'
  });
  Object.assign(EXTRA.en, {
    'settings.apiariesCount':'My apiaries:',
    'settings.hivesCount':'My hives:',
    'settings.pushEnabled':'Receive push reminders',
    'settings.lowStock':'Medicine stock levels',
    'settings.expiry':'Medicine expiry dates',
    'settings.tasks':'Tasks and scheduled work',
    'settings.disinfection':'Scheduled disinfection',
    'settings.birthdays':'Contact birthdays',
    'settings.defaultPrefs':'Default settings are shown. They have not been saved yet — click “Save reminder settings”.',
    'settings.pushNotConnected':'Push notifications are not connected on this device.'
  });
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
  // Static interface copy only. User-entered names, notes and record values are excluded.
  const UI_STATIC = {
    be: {
      'Учёт воска и вощины':'Улік воску і вашчыны',
      'Учитывайте поступление воска, сдачу в переработку, возврат воска и получение вощины. Остатки рассчитываются отдельно по каждой пасеке; выход после переработки не считается автоматически равным сданному количеству.':'Улічвайце паступленне воску, здачу ў перапрацоўку, вяртанне воску і атрыманне вашчыны. Рэшткі разлічваюцца асобна па кожным пчальніку; выхад пасля перапрацоўкі не лічыцца аўтаматычна роўным здадзенай колькасці.',
      'Поступило воска':'Паступіла воску','Сдано в переработку':'Здадзена ў перапрацоўку','Остаток воска':'Рэшта воску','Остаток вощины':'Рэштка вашчыны',
      'Остатки по пасекам':'Рэшткі па пчальніках','Пока нет операций с воском.':'Пакуль няма аперацый з воскам.',
      'Новая операция с воском':'Новая аперацыя з воскам','Получен воск':'Атрыманы воск','Сдан в переработку':'Здадзены ў перапрацоўку','Получен воск после переработки':'Атрыманы воск пасля перапрацоўкі','Получена вощина':'Атрымана вашчына','Использована вощина':'Выкарыстана вашчына','Корректировка':'Карэкціроўка',
      'Общий склад / не указана':'Агульны склад / не пазначана','Общий склад / без пасеки':'Агульны склад / без пчальніка','Завершена':'Завершана','Запланирована':'Запланавана','В переработке':'У перапрацоўцы','Отменена':'Адменена',
      'Для сдачи воска и получения результата создавайте отдельные записи с одинаковым номером партии. Так можно сравнить отправленное и фактически возвращённое количество.':'Для здачы воску і атрымання выніку стварайце асобныя запісы з аднолькавым нумарам партыі. Так можна параўнаць адпраўленую і фактычна вернутую колькасць.',
      'История движения воска и вощины':'Гісторыя руху воску і вашчыны','Операций пока нет. Добавьте поступление воска или первую сдачу в переработку.':'Аперацый пакуль няма. Дадайце паступленне воску або першую здачу ў перапрацоўку.',
      'Мёд / партии':'Мёд / партыі','Учёт урожая, партий и продукции «Дедушкиной пасеки».':'Улік ураджаю, партый і прадукцыі «Дзядулявай пчальніка».',
      'Новая партия':'Новая партыя','Партии мёда':'Партыі мёду','Каждая партия хранится отдельно — её можно открыть и посмотреть подробности.':'Кожная партыя захоўваецца асобна — яе можна адкрыць і паглядзець падрабязнасці.',
      'Фасовка мёда':'Фасоўка мёду','Записывайте размер банки, количество и код этикетки. Каждая фасовка будет связана с исходной партией урожая.':'Запісвайце памер слоіка, колькасць і код этыкеткі. Кожная фасоўка будзе звязана з зыходнай партыяй ураджаю.',
      'Партия урожая *':'Партыя ўраджаю *','Дата фасовки *':'Дата фасоўкі *','Масса банки, г *':'Маса слоіка, г *','Количество банок *':'Колькасць слоікаў *','Код этикетки / QR':'Код этыкеткі / QR',
      'Добавить лекарство':'Дадаць лекі','Мои лекарства':'Мае лекі','Наименование *':'Назва *','Объём / фасовка':'Аб’ём / фасоўка','Минимальный остаток':'Мінімальная рэшта','Срок годности':'Тэрмін прыдатнасці','Напомнить за':'Нагадаць за',
      'Сохранить лекарство':'Захаваць лекі','Сохранить фасовку':'Захаваць фасоўку','Очистить':'Ачысціць','Требуют внимания':'Патрабуюць увагі',
      'Количество, кг *':'Колькасць, кг *','Номер партии переработки':'Нумар партыі перапрацоўкі','Переработчик / организация':'Перапрацоўшчык / арганізацыя',
      'Дата операции *':'Дата аперацыі *','Операция *':'Аперацыя *','Пасека':'Пчальнік','Примечание':'Заўвага','Статус':'Статус','Дата':'Дата','Операция':'Аперацыя','Количество':'Колькасць','Партия / переработчик':'Партыя / перапрацоўшчык','Действия':'Дзеянні',
      'Получено':'Атрымана','Продано':'Прададзена','Использовано':'Выкарыстана','Списано':'Спісана','Плановая':'Планавая','После болезни':'Пасля хваробы','После выбраковки семьи':'Пасля выбракоўкі сям’і','Санитарная':'Санітарная'
    },
    en: {
      'Учёт воска и вощины':'Wax and foundation records',
      'Учитывайте поступление воска, сдачу в переработку, возврат воска и получение вощины. Остатки рассчитываются отдельно по каждой пасеке; выход после переработки не считается автоматически равным сданному количеству.':'Track wax received, sent for processing, returned wax and foundation received. Balances are calculated separately for each apiary; processed output is not assumed to equal the amount sent.',
      'Поступило воска':'Wax received','Сдано в переработку':'Sent for processing','Остаток воска':'Wax balance','Остаток вощины':'Foundation balance',
      'Остатки по пасекам':'Balances by apiary','Пока нет операций с воском.':'No wax operations yet.',
      'Новая операция с воском':'New wax operation','Получен воск':'Wax received','Сдан в переработку':'Sent for processing','Получен воск после переработки':'Wax returned after processing','Получена вощина':'Foundation received','Использована вощина':'Foundation used','Корректировка':'Adjustment',
      'Общий склад / не указана':'General stock / not specified','Общий склад / без пасеки':'General stock / no apiary','Завершена':'Completed','Запланирована':'Scheduled','В переработке':'Processing','Отменена':'Cancelled',
      'Для сдачи воска и получения результата создавайте отдельные записи с одинаковым номером партии. Так можно сравнить отправленное и фактически возвращённое количество.':'Create separate records with the same batch number when sending wax for processing and recording the result. This lets you compare the amount sent with the amount actually returned.',
      'История движения воска и вощины':'Wax and foundation history','Операций пока нет. Добавьте поступление воска или первую сдачу в переработку.':'No operations yet. Add wax received or the first processing shipment.',
      'Мёд / партии':'Honey / batches','Учёт урожая, партий и продукции «Дедушкиной пасеки».':'Track harvests, batches and products from “Grandpa’s Apiary”.',
      'Новая партия':'New batch','Партии мёда':'Honey batches','Каждая партия хранится отдельно — её можно открыть и посмотреть подробности.':'Each batch is stored separately and can be opened to view its details.',
      'Фасовка мёда':'Honey packaging','Записывайте размер банки, количество и код этикетки. Каждая фасовка будет связана с исходной партией урожая.':'Record jar size, quantity and label code. Each packaging run is linked to its source harvest batch.',
      'Партия урожая *':'Harvest batch *','Дата фасовки *':'Packaging date *','Масса банки, г *':'Jar weight, g *','Количество банок *':'Number of jars *','Код этикетки / QR':'Label / QR code',
      'Добавить лекарство':'Add medicine','Мои лекарства':'My medicines','Наименование *':'Name *','Объём / фасовка':'Volume / package','Минимальный остаток':'Minimum stock','Срок годности':'Expiry date','Напомнить за':'Remind before',
      'Сохранить лекарство':'Save medicine','Сохранить фасовку':'Save packaging','Очистить':'Clear','Требуют внимания':'Needs attention',
      'Количество, кг *':'Quantity, kg *','Номер партии переработки':'Processing batch number','Переработчик / организация':'Processor / organization',
      'Дата операции *':'Operation date *','Операция *':'Operation *','Пасека':'Apiary','Примечание':'Note','Статус':'Status','Дата':'Date','Операция':'Operation','Количество':'Quantity','Партия / переработчик':'Batch / processor','Действия':'Actions',
      'Получено':'Received','Продано':'Sold','Использовано':'Used','Списано':'Written off','Плановая':'Scheduled','После болезни':'After disease','После выбраковки семьи':'After colony removal','Санитарная':'Sanitary'
    }
  };
  Object.assign(UI_TEXT.be, {
    'Наименование *':'Назва *','Объём / фасовка':'Аб’ём / фасоўка','Минимальный остаток':'Мінімальная рэшта','Срок годности':'Тэрмін прыдатнасці','Напомнить за':'Нагадаць за',
    'Партия урожая *':'Партыя ўраджаю *','Дата фасовки *':'Дата фасоўкі *','Масса банки, г *':'Маса слоіка, г *','Количество банок *':'Колькасць слоікаў *',
    'Сохранить фасовку':'Захаваць фасоўку','Очистить':'Ачысціць'
  });
  Object.assign(UI_TEXT.en, {
    'Наименование *':'Name *','Объём / фасовка':'Volume / package','Минимальный остаток':'Minimum stock','Срок годности':'Expiry date','Напомнить за':'Remind before',
    'Партия урожая *':'Harvest batch *','Дата фасовки *':'Packaging date *','Масса банки, г *':'Jar weight, g *','Количество банок *':'Number of jars *',
    'Сохранить фасовку':'Save packaging','Очистить':'Clear'
  });
  Object.assign(UI_TEXT.be, {
    'Дата операции *':'Дата аперацыі *','Операция *':'Аперацыя *','Пасека':'Пчальнік','Количество, кг *':'Колькасць, кг *',
    'Номер партии переработки':'Нумар партыі перапрацоўкі','Переработчик / организация':'Перапрацоўшчык / арганізацыя','Статус':'Статус','Примечание':'Заўвага',
    'Дата *':'Дата *','Продукция *':'Прадукцыя *','Номер партии':'Нумар партыі','Наименование *':'Назва *','Объём / фасовка':'Аб’ём / фасоўка',
    'Минимальный остаток':'Мінімальная рэшта','Срок годности':'Тэрмін прыдатнасці','Напомнить за':'Нагадаць за',
    'Сохранить операцию':'Захаваць аперацыю','Сохранить изменения':'Захаваць змены','Изменить':'Змяніць','Удалить':'Выдаліць',
    'Экспорт CSV':'Экспарт CSV','Очистить форму':'Ачысціць форму'
  });
  Object.assign(UI_TEXT.en, {
    'Дата операции *':'Operation date *','Операция *':'Operation *','Пасека':'Apiary','Количество, кг *':'Quantity, kg *',
    'Номер партии переработки':'Processing batch number','Переработчик / организация':'Processor / organization','Статус':'Status','Примечание':'Note',
    'Дата *':'Date *','Продукция *':'Product *','Номер партии':'Batch number','Наименование *':'Name *','Объём / фасовка':'Volume / package',
    'Минимальный остаток':'Minimum stock','Срок годности':'Expiry date','Напомнить за':'Remind before',
    'Сохранить операцию':'Save operation','Сохранить изменения':'Save changes','Изменить':'Edit','Удалить':'Delete',
    'Экспорт CSV':'Export CSV','Очистить форму':'Clear form'
  });
  Object.assign(UI_STATIC.be, {
    'Журнал пчеловода':'Журнал пчаляра','Сердечно приглашаем на пасеку 🐝':'Сардэчна запрашаем на пчальнік 🐝',
    'Цифровой журнал пасечника · Укажите район в настройках пасеки.':'Лічбавы журнал пчаляра · Укажыце раён у наладах пчальніка.',
    'Паспорт мёда':'Пашпарт мёду','Фасовка и QR-коды':'Фасоўка і QR-коды',
    'КОНТРОЛЬ ПАСЕКИ':'КАНТРОЛЬ ПЧАЛЬНІКА','Напоминания':'Напаміны','Дезинфекция':'Дэзінфекцыя',
    'Лекарства — требуют внимания':'Лекі — патрабуюць увагі','Открыть лекарства':'Адкрыць лекі',
    'Срочных племенных напоминаний нет. Когда появятся серии с контрольными датами, они отобразятся здесь.':'Тэрміновых племянных напамінаў няма. Калі з’явяцца серыі з кантрольнымі датамі, яны будуць паказаныя тут.',
    'Записей о дезинфекции пока нет.':'Запісаў пра дэзінфекцыю пакуль няма.','Открыть':'Адкрыць','Все':'Усе',
    'История движения воска и вощины':'Гісторыя руху воску і вашчыны','История операций':'Гісторыя аперацый',
    'Операций пока нет. Добавьте поступление воска или первую сдачу в переработку.':'Аперацый пакуль няма. Дадайце паступленне воску або першую здачу ў перапрацоўку.',
    'Пока нет операций.':'Пакуль няма аперацый.','Пока нет операций с воском.':'Пакуль няма аперацый з воскам.'
  });
  Object.assign(UI_STATIC.en, {
    'Журнал пчеловода':'Beekeeper journal','Сердечно приглашаем на пасеку 🐝':'Welcome to the apiary 🐝',
    'Цифровой журнал пасечника · Укажите район в настройках пасеки.':'Digital beekeeper journal · Set your district in apiary settings.',
    'Паспорт мёда':'Honey passport','Фасовка и QR-коды':'Packaging and QR codes',
    'КОНТРОЛЬ ПАСЕКИ':'APIARY CONTROL','Напоминания':'Reminders','Дезинфекция':'Disinfection',
    'Лекарства — требуют внимания':'Medicines need attention','Открыть лекарства':'Open medicines',
    'Срочных племенных напоминаний нет. Когда появятся серии с контрольными датами, они отобразятся здесь.':'No urgent queen-breeding reminders. Series with check dates will appear here.',
    'Записей о дезинфекции пока нет.':'No disinfection records yet.','Открыть':'Open','Все':'All',
    'История движения воска и вощины':'Wax and foundation history','История операций':'Operation history',
    'Операций пока нет. Добавьте поступление воска или первую сдачу в переработку.':'No operations yet. Add wax received or the first processing shipment.',
    'Пока нет операций.':'No operations yet.','Пока нет операций с воском.':'No wax operations yet.'
  });
  Object.assign(UI_STATIC.be, {
    'ДОСТУП К ЖУРНАЛУ':'ДОСТУП ДА ЖУРНАЛА','Пробный период':'Пробны перыяд','Все записи и история пасеки сохраняются в вашем аккаунте.':'Усе запісы і гісторыя пчальніка захоўваюцца ў вашым акаўнце.',
    'Годовая подписка — эквивалент 20 USD':'Гадавая падпіска — эквівалент 20 USD','Выберите страну оплаты. Сумма будет рассчитана по официальному курсу Национального банка Беларуси на текущую дату.':'Выберыце краіну аплаты. Сума будзе разлічаная па афіцыйным курсе Нацыянальнага банка Беларусі на бягучую дату.',
    'Рассчитать стоимость':'Разлічыць кошт','Это предварительный расчёт. Итоговая сумма фиксируется при создании платежа. Оплата пока не подключена.':'Гэта папярэдні разлік. Канчатковая сума фіксуецца пры стварэнні плацяжу. Аплата пакуль не падключаная.',
    'ПЛЕМЕННАЯ РАБОТА':'ПЛЕМЯННАЯ ПРАЦА','Племенной календарь':'Племянны каляндар','Открыть серии →':'Адкрыць серыі →','Загрузка племенных напоминаний...':'Загрузка племянных напамінаў...',
    'СОСТОЯНИЕ ПАСЕКИ':'СТАН ПЧАЛЬНІКА','Состояние пасеки':'Стан пчальніка','Открыть ульи →':'Адкрыць вуллі →',
    'ПЛАН РАБОТЫ':'ПЛАН ПРАЦЫ','Ближайшие работы':'Бліжэйшыя працы','Открыть календарь →':'Адкрыць каляндар →',
    'ЖУРНАЛ':'ЖУРНАЛ','Последние осмотры':'Апошнія агляды','Все осмотры →':'Усе агляды →',
    'ПРОДУКЦИЯ':'ПРАДУКЦЫЯ','Мёд и продукция':'Мёд і прадукцыя','Открыть →':'Адкрыць →',
    'Новый улей':'Новы вулей','Новый осмотр':'Новы агляд','Новая партия':'Новая партыя','Напоминание':'Напамін',
    'Добавить пасеку':'Дадаць пчальнік','Схема пасеки':'Схема пчальніка','Выберите пасеку — номера ульев можно открыть прямо со схемы.':'Выберыце пчальнік — нумары вулляў можна адкрыць проста са схемы.',
    'Список ульев':'Спіс вулляў','История перемещений':'Гісторыя перамяшчэнняў','Закрыть':'Закрыць',
    'Пока нет операций.':'Пакуль няма аперацый.','Операций пока нет.':'Аперацый пакуль няма.',
    'Собрано':'Сабрана','Остаток':'Рэшта','Цена':'Кошт','Стоимость сбора':'Кошт збору',
    'Требует внимания':'Патрабуе ўвагі','Семья сильная':'Сям’я моцная','Проверить семью':'Праверыць сям’ю',
    'Последний осмотр':'Апошні агляд','Сила семьи':'Сіла сям’і','Место не указано':'Месца не пазначана','Тип не указан':'Тып не пазначаны',
    'Выполнено':'Выканана','Просрочено':'Пратэрмінавана','Сегодня':'Сёння','Предстоящее':'Маючае адбыцца',
    'Для выбранного раздела напоминаний нет.':'Для выбранага раздзела напамінаў няма.','Активных задач нет.':'Актыўных задач няма.',
    'Ближайших обработок пока нет.':'Бліжэйшых апрацовак пакуль няма.','Ближайшая обработка не назначена':'Бліжэйшая апрацоўка не прызначаная',
    'Записей пока нет. Добавьте первую обработку выше.':'Запісаў пакуль няма. Дадайце першую апрацоўку вышэй.',
    'Остатки по пасекам и продукции':'Рэшткі па пчальніках і прадукцыі',
    'Пчельник':'Пчальнік','Прополис':'Праполіс','Пыльца':'Пылок','Перга':'Пярга',
    'Поступило воска:':'Паступіла воску:','Сдано:':'Здадзена:','Вощина:':'Вашчына:',
    'Изменить':'Змяніць','Удалить':'Выдаліць','История':'Гісторыя','Семья':'Сям’я',
    'Без описания':'Без апісання','Пасек пока нет. Добавьте первую пасеку выше.':'Пчальнікаў пакуль няма. Дадайце першы пчальнік вышэй.',
    'Осмотров пока нет.':'Аглядаў пакуль няма.','Ульев пока нет. Добавьте первый улей выше.':'Вулляў пакуль няма. Дадайце першы вулей вышэй.',
    'По заданным фильтрам ульев не найдено.':'Па зададзеных фільтрах вуллі не знойдзеныя.'
  });
  Object.assign(UI_STATIC.en, {
    'ДОСТУП К ЖУРНАЛУ':'JOURNAL ACCESS','Пробный период':'Trial period','Все записи и история пасеки сохраняются в вашем аккаунте.':'All records and apiary history are saved in your account.',
    'Годовая подписка — эквивалент 20 USD':'Annual subscription — equivalent to 20 USD','Выберите страну оплаты. Сумма будет рассчитана по официальному курсу Национального банка Беларуси на текущую дату.':'Choose your payment country. The amount will be calculated using the National Bank of Belarus official exchange rate for today.',
    'Рассчитать стоимость':'Calculate price','Это предварительный расчёт. Итоговая сумма фиксируется при создании платежа. Оплата пока не подключена.':'This is an estimate. The final amount is set when a payment is created. Payments are not enabled yet.',
    'ПЛЕМЕННАЯ РАБОТА':'QUEEN BREEDING','Племенной календарь':'Queen breeding calendar','Открыть серии →':'Open batches →','Загрузка племенных напоминаний...':'Loading breeding reminders...',
    'СОСТОЯНИЕ ПАСЕКИ':'APIARY STATUS','Состояние пасеки':'Apiary status','Открыть ульи →':'Open hives →',
    'ПЛАН РАБОТЫ':'WORK PLAN','Ближайшие работы':'Upcoming work','Открыть календарь →':'Open calendar →',
    'ЖУРНАЛ':'JOURNAL','Последние осмотры':'Recent inspections','Все осмотры →':'All inspections →',
    'ПРОДУКЦИЯ':'PRODUCTS','Мёд и продукция':'Honey and products','Открыть →':'Open →',
    'Новый улей':'New hive','Новый осмотр':'New inspection','Новая партия':'New batch','Напоминание':'Reminder',
    'Добавить пасеку':'Add apiary','Схема пасеки':'Apiary layout','Выберите пасеку — номера ульев можно открыть прямо со схемы.':'Select an apiary — open hive numbers directly from the layout.',
    'Список ульев':'Hive list','История перемещений':'Movement history','Закрыть':'Close',
    'Пока нет операций.':'No operations yet.','Операций пока нет.':'No operations yet.',
    'Собрано':'Collected','Остаток':'Remaining','Цена':'Price','Стоимость сбора':'Harvest value',
    'Требует внимания':'Needs attention','Семья сильная':'Strong colony','Проверить семью':'Check colony',
    'Последний осмотр':'Last inspection','Сила семьи':'Colony strength','Место не указано':'Location not specified','Тип не указан':'Type not specified',
    'Выполнено':'Completed','Просрочено':'Overdue','Сегодня':'Today','Предстоящее':'Upcoming',
    'Для выбранного раздела напоминаний нет.':'No reminders in this category.','Активных задач нет.':'No active tasks.',
    'Ближайших обработок пока нет.':'No upcoming treatments.','Ближайшая обработка не назначена':'No next treatment scheduled',
    'Записей пока нет. Добавьте первую обработку выше.':'No records yet. Add the first treatment above.',
    'Остатки по пасекам и продукции':'Balances by apiary and product',
    'Пчельник':'Apiary','Прополис':'Propolis','Пыльца':'Pollen','Перга':'Bee bread',
    'Поступило воска:':'Wax received:','Сдано:':'Sent:','Вощина:':'Foundation:',
    'Изменить':'Edit','Удалить':'Delete','История':'History','Семья':'Colony',
    'Без описания':'No description','Пасек пока нет. Добавьте первую пасеку выше.':'No apiaries yet. Add your first apiary above.',
    'Осмотров пока нет.':'No inspections yet.','Ульев пока нет. Добавьте первый улей выше.':'No hives yet. Add your first hive above.',
    'По заданным фильтрам ульев не найдено.':'No hives match the selected filters.'
  });
  Object.assign(UI_STATIC.be, {
    '⚖️ Весы и медосбор':'⚖️ Вагі і медазбор',
    'Учёт контрольного веса ульев, динамика привеса и наблюдение за медосбором.':'Улік кантрольнай вагі вулляў, дынаміка прыбаўлення вагі і назіранне за медазборам.',
    'Гостевой просмотр':'Гасцявы прагляд',
    'Для записи и просмотра личной истории взвешиваний войдите в свой журнал.':'Каб запісваць і праглядаць асабістую гісторыю ўзважванняў, увайдзіце ў свой журнал.',
    '➕ Новое взвешивание':'➕ Новае ўзважванне',
    'На первом этапе показания вносятся вручную. Bluetooth-подключение и импорт файлов добавим после проверки моделей оборудования.':'На першым этапе паказанні ўводзяцца ўручную. Bluetooth-падключэнне і імпарт файлаў дададзім пасля праверкі мадэляў абсталявання.',
    'История и динамика веса':'Гісторыя і дынаміка вагі',
    'Как правильно вести контрольный улей':'Як правільна весці кантрольны вулей',
    'Взвешивайте один и тот же улей, по возможности в одинаковое время.':'Узважвайце адзін і той жа вулей, па магчымасці ў аднолькавы час.',
    'Записывайте полный вес улья в килограммах, а не только изменение.':'Запісвайце поўную вагу вулля ў кілаграмах, а не толькі змяненне.',
    'Отмечайте подкормку, откачку и изменение числа корпусов или магазинов.':'Адзначайце падкормку, адкачку і змяненне колькасці карпусоў або магазінаў.',
    'Разница между взвешиваниями показывает изменение общей массы. Это не всегда равно количеству принесённого мёда.':'Розніца паміж узважваннямі паказвае змяненне агульнай масы. Гэта не заўсёды роўна колькасці прынесенага мёду.',
    'Журнал осмотров':'Журнал аглядаў',
    'Записывайте состояние семей, маток, расплода, корма и работы.':'Запісвайце стан сем’яў, матак, расплоду, корму і выкананыя работы.',
    'Новый осмотр':'Новы агляд','Голосовые заметки осмотра':'Галасавыя нататкі агляду',
    'Нажмите «Начать запись» и расскажите, что сделали у улья. Речь преобразуется в текст на устройстве; затем можно распределить распознанное по полям осмотра.':'Націсніце «Пачаць запіс» і раскажыце, што зрабілі каля вулля. Гаворка пераўтворыцца ў тэкст на прыладзе; затым распазнанае можна размеркаваць па палях агляду.',
    'Автоматически распознаются подсказки о силе семьи, матке, расплоде и корме. Остальной текст добавляется в заметки — перед сохранением проверьте поля.':'Аўтаматычна распазнаюцца звесткі пра сілу сям’і, матку, расплод і корм. Астатні тэкст дадаецца ў нататкі — перад захаваннем праверце палі.',
    'Можно сделать снимок камерой телефона или выбрать файл. Максимум 10 МБ.':'Можна зрабіць здымак камерай тэлефона або выбраць файл. Максімум 10 МБ.',
    'История осмотров':'Гісторыя аглядаў',
    '🩺 Здоровье семьи':'🩺 Здароўе сям’і',
    'Контроль варроа, признаков заболеваний и проведённых обработок по каждому улью.':'Кантроль вароа, прыкмет захворванняў і праведзеных апрацовак для кожнага вулля.',
    'Новая запись о здоровье':'Новы запіс пра здароўе',
    'Оценка заражённости клещом Varroa (смыв)':'Ацэнка заражанасці кляшчом Varroa (змыў)',
    'Отберите пробу примерно из 200–300 взрослых пчёл. Подсчитайте число обнаруженных клещей и укажите фактическое число пчёл в пробе.':'Вазьміце пробу прыкладна з 200–300 дарослых пчол. Падлічыце колькасць знойдзеных кляшчоў і пазначце фактычную колькасць пчол у пробе.',
    'Введите количество клещей, чтобы рассчитать результат.':'Увядзіце колькасць кляшчоў, каб разлічыць вынік.',
    'Расчёт: клещи ÷ пчёлы × 100. Используйте подходящий валидированный метод и средства защиты; не применяйте технический бензин или бытовые растворители. Оценка не заменяет ветеринарную рекомендацию по лечению.':'Разлік: кляшчы ÷ пчолы × 100. Выкарыстоўвайце адпаведны правераны метад і сродкі абароны; не ўжывайце тэхнічны бензін або бытавыя растваральнікі. Ацэнка не замяняе ветэрынарную рэкамендацыю па лячэнні.',
    'История здоровья семей':'Гісторыя здароўя сем’яў',
    '💊 История лечения по ульям':'💊 Гісторыя лячэння па вуллях',
    'Доходы и расходы пасеки.':'Даходы і выдаткі пчальніка.',
    'Работы, которые нельзя забыть.':'Работы, пра якія нельга забыцца.',
    'Фотографии ульев и осмотров хранятся отдельно в вашем журнале.':'Фатаграфіі вулляў і аглядаў захоўваюцца асобна ў вашым журнале.',
    'Состояние пчелиных семей и основные показатели журнала.':'Стан пчаліных сем’яў і асноўныя паказчыкі журнала.',
    'Поставщики, пчеловоды и другие важные контакты. Дни рождения помогут не забыть поздравить.':'Пастаўшчыкі, пчаляры і іншыя важныя кантакты. Дні нараджэння дапамогуць не забыцца павіншаваць.',
    'Данные контактов доступны только в вашем аккаунте. День рождения используется для персонального напоминания.':'Даныя кантактаў даступныя толькі ў вашым акаўнце. Дзень нараджэння выкарыстоўваецца для асабістага напаміну.',
    'Ваш личный журнал.':'Ваш асабісты журнал.',
    'Сначала выберите пасеку':'Спачатку выберыце пчальнік',
    'Выберите пасеку':'Выберыце пчальнік','Выберите улей':'Выберыце вулей',
    'Механические':'Механічныя','Электронные':'Электронныя','Bluetooth (пока ручной ввод)':'Bluetooth (пакуль ручны ўвод)',
    'Обычное взвешивание':'Звычайнае ўзважванне','Подкормка':'Падкормка','Откачка мёда':'Адкачка мёду','Изменение комплектации улья':'Змяненне камплектацыі вулля',
    'Сильная':'Моцная','Средняя':'Сярэдняя','Слабая':'Слабая','Есть':'Ёсць','Молодая':'Маладая','Нет':'Няма','Трутневая':'Трутнёвая',
    'Не указано':'Не пазначана','Не указана':'Не пазначана','Не выявлено':'Не выяўлена','Хороший':'Добры','Нормальный':'Нармальны','Много':'Шмат','Достаточно':'Дастаткова','Мало':'Мала',
    'История перемещений':'Гісторыя перамяшчэнняў'
  });
  Object.assign(UI_STATIC.en, {
    '⚖️ Весы и медосбор':'⚖️ Hive scales and honey flow',
    'Учёт контрольного веса ульев, динамика привеса и наблюдение за медосбором.':'Track control-hive weight, weight changes and honey flow.',
    'Гостевой просмотр':'Guest view',
    'Для записи и просмотра личной истории взвешиваний войдите в свой журнал.':'Sign in to record and view your personal weighing history.',
    '➕ Новое взвешивание':'➕ New weighing',
    'На первом этапе показания вносятся вручную. Bluetooth-подключение и импорт файлов добавим после проверки моделей оборудования.':'At this stage, readings are entered manually. Bluetooth connection and file import will be added after equipment models are tested.',
    'История и динамика веса':'Weight history and trends',
    'Как правильно вести контрольный улей':'How to track a control hive',
    'Взвешивайте один и тот же улей, по возможности в одинаковое время.':'Weigh the same hive, preferably at the same time.',
    'Записывайте полный вес улья в килограммах, а не только изменение.':'Record the full hive weight in kilograms, not just the change.',
    'Отмечайте подкормку, откачку и изменение числа корпусов или магазинов.':'Record feeding, honey extraction and changes to the number of boxes or supers.',
    'Разница между взвешиваниями показывает изменение общей массы. Это не всегда равно количеству принесённого мёда.':'The difference between weighings shows the change in total mass. It does not always equal the amount of honey brought in.',
    'Журнал осмотров':'Inspection journal',
    'Записывайте состояние семей, маток, расплода, корма и работы.':'Record colony condition, queens, brood, food stores and work performed.',
    'Новый осмотр':'New inspection','Голосовые заметки осмотра':'Voice inspection notes',
    'Нажмите «Начать запись» и расскажите, что сделали у улья. Речь преобразуется в текст на устройстве; затем можно распределить распознанное по полям осмотра.':'Press “Start recording” and describe what you did at the hive. Speech is converted to text on your device; you can then distribute the recognized text into inspection fields.',
    'Автоматически распознаются подсказки о силе семьи, матке, расплоде и корме. Остальной текст добавляется в заметки — перед сохранением проверьте поля.':'Colony strength, queen, brood and food-store details are recognized automatically. Other text is added to notes — check the fields before saving.',
    'Можно сделать снимок камерой телефона или выбрать файл. Максимум 10 МБ.':'Take a photo with your phone camera or choose a file. Maximum 10 MB.',
    'История осмотров':'Inspection history',
    '🩺 Здоровье семьи':'🩺 Colony health',
    'Контроль варроа, признаков заболеваний и проведённых обработок по каждому улью.':'Track Varroa, disease signs and treatments for each hive.',
    'Новая запись о здоровье':'New health record',
    'Оценка заражённости клещом Varroa (смыв)':'Varroa mite infestation estimate (wash test)',
    'Отберите пробу примерно из 200–300 взрослых пчёл. Подсчитайте число обнаруженных клещей и укажите фактическое число пчёл в пробе.':'Collect a sample of approximately 200–300 adult bees. Count the mites found and enter the actual number of bees in the sample.',
    'Введите количество клещей, чтобы рассчитать результат.':'Enter the number of mites to calculate the result.',
    'Расчёт: клещи ÷ пчёлы × 100. Используйте подходящий валидированный метод и средства защиты; не применяйте технический бензин или бытовые растворители. Оценка не заменяет ветеринарную рекомендацию по лечению.':'Calculation: mites ÷ bees × 100. Use an appropriate validated method and protective equipment; do not use technical gasoline or household solvents. This estimate does not replace veterinary treatment advice.',
    'История здоровья семей':'Colony health history',
    '💊 История лечения по ульям':'💊 Treatment history by hive',
    'Доходы и расходы пасеки.':'Apiary income and expenses.',
    'Работы, которые нельзя забыть.':'Tasks you should not forget.',
    'Фотографии ульев и осмотров хранятся отдельно в вашем журнале.':'Hive and inspection photos are stored separately in your journal.',
    'Состояние пчелиных семей и основные показатели журнала.':'Colony condition and key journal indicators.',
    'Поставщики, пчеловоды и другие важные контакты. Дни рождения помогут не забыть поздравить.':'Suppliers, beekeepers and other important contacts. Birthdays help you remember to send greetings.',
    'Данные контактов доступны только в вашем аккаунте. День рождения используется для персонального напоминания.':'Contact details are available only in your account. Birthdays are used for personal reminders.',
    'Ваш личный журнал.':'Your personal journal.',
    'Сначала выберите пасеку':'Select an apiary first',
    'Выберите пасеку':'Select an apiary','Выберите улей':'Select a hive',
    'Механические':'Mechanical','Электронные':'Electronic','Bluetooth (пока ручной ввод)':'Bluetooth (manual entry for now)',
    'Обычное взвешивание':'Regular weighing','Подкормка':'Feeding','Откачка мёда':'Honey extraction','Изменение комплектации улья':'Hive equipment change',
    'Сильная':'Strong','Средняя':'Medium','Слабая':'Weak','Есть':'Present','Молодая':'Young','Нет':'None','Трутневая':'Drone-laying',
    'Не указано':'Not specified','Не указана':'Not specified','Не выявлено':'Not detected','Хороший':'Good','Нормальный':'Normal','Много':'Plenty','Достаточно':'Sufficient','Мало':'Low',
    'История перемещений':'Movement history'
  });
  Object.assign(UI_STATIC.be, {
    '🗺️ Схема пасеки':'🗺️ Схема пчальніка',
    '🐝 Срочных племенных напоминаний нет. Когда появятся серии с контрольными датами, они отобразятся здесь.':'🐝 Тэрміновых племянных напамінаў няма. Калі з’явяцца серыі з кантрольнымі датамі, яны будуць паказаныя тут.',
    'Готово к записи. Для работы разрешите доступ к микрофону.':'Гатова да запісу. Каб пачаць працу, дазвольце доступ да мікрафона.',
    'Автоматически распознаются подсказки о силе семьи, матке, расплоде и корме. Остальной текст добавляется в заметки — перед сохранением проверьте поля.':'Аўтаматычна распазнаюцца звесткі пра сілу сям’і, матку, расплод і корм. Астатні тэкст дадаецца ў нататкі — перад захаваннем праверце палі.',
    '📷 Фото прямо из осмотра (необязательно)':'📷 Фота непасрэдна падчас агляду (неабавязкова)',
    'Можно сделать снимок камерой телефона или выбрать файл. Максимум 10 МБ.':'Можна зрабіць здымак камерай тэлефона або выбраць файл. Максімум 10 МБ.',
    'Ульи без номера ряда показаны отдельно. Чтобы расположить их правильно, укажите ряд и место в карточке улья.':'Вуллі без нумара рада паказваюцца асобна. Каб размясціць іх правільна, пазначце рад і месца ў картцы вулля.',
    'Осмотров ещё не было':'Аглядаў яшчэ не было',
    'Последний осмотр':'Апошні агляд',
    'Проверить состояние матки':'Праверыць стан маткі',
    '⚠️ Лекарства — патрабуюць увагі':'⚠️ Лекі — патрабуюць увагі',
    '⚠️ Лекарства — требуют внимания':'⚠️ Лекі — патрабуюць увагі',
    'Открыть лекарства':'Адкрыць лекі','По лекарствам всё в порядке.':'З лекамі ўсё ў парадку.',
    'срок годности заканчивается через':'тэрмін прыдатнасці заканчваецца праз',
    'дн.':'дз.'
  });
  Object.assign(UI_STATIC.en, {
    '🗺️ Схема пасеки':'🗺️ Apiary layout',
    '🐝 Срочных племенных напоминаний нет. Когда появятся серии с контрольными датами, они отобразятся здесь.':'🐝 No urgent queen-rearing reminders. Batches with check dates will appear here.',
    'Готово к записи. Для работы разрешите доступ к микрофону.':'Ready to record. Allow microphone access to continue.',
    'Автоматически распознаются подсказки о силе семьи, матке, расплоде и корме. Остальной текст добавляется в заметки — перед сохранением проверьте поля.':'Colony strength, queen, brood and food-store details are recognized automatically. Other text is added to notes — check the fields before saving.',
    '📷 Фото прямо из осмотра (необязательно)':'📷 Photo during inspection (optional)',
    'Можно сделать снимок камерой телефона или выбрать файл. Максимум 10 МБ.':'Take a photo with your phone camera or choose a file. Maximum 10 MB.',
    'Ульи без номера ряда показаны отдельно. Чтобы расположить их правильно, укажите ряд и место в карточке улья.':'Hives without a row number are shown separately. Set the row and position in the hive card to place them correctly.',
    'Осмотров ещё не было':'No inspections yet',
    'Последний осмотр':'Last inspection',
    'Проверить состояние матки':'Check queen condition',
    '⚠️ Лекарства — требуют внимания':'⚠️ Medicines need attention',
    'Открыть лекарства':'Open medicines','По лекарствам всё в порядке.':'All medicines are in order.',
    'срок годности заканчивается через':'expires in',
    'дн.':'days'
  });
  const UI_PLACEHOLDERS = {
    be: {'Введите email или +375291234567':'Увядзіце email або +375291234567','Ваш пароль':'Ваш пароль','Как к вам обращаться':'Як да вас звяртацца','name@example.com':'name@example.com','Не менее 8 символов':'Не менш за 8 сімвалаў','Повторите пароль':'Паўтарыце пароль','Поиск по журналу...':'Пошук па журнале...','Например, Дедушкина пасека':'Напрыклад, Дзядуляў пчальнік','Основная пасека, количество ульев, особенности...':'Асноўны пчальнік, колькасць вулляў, асаблівасці...','Что обнаружено при осмотре':'Што выяўлена падчас агляду','Например, поставлены полоски':'Напрыклад, пастаўлены палоскі','Что нужно сделать?':'Што трэба зрабіць?','Выберите препарат выше или введите название':'Выберыце прэпарат вышэй або ўвядзіце назву'},
    en: {'Введите email или +375291234567':'Enter email or +375291234567','Ваш пароль':'Your password','Как к вам обращаться':'What should we call you?','name@example.com':'name@example.com','Не менее 8 символов':'At least 8 characters','Повторите пароль':'Repeat password','Поиск по журналу...':'Search the journal...','Например, Дедушкина пасека':'e.g. Grandpa’s Apiary','Основная пасека, количество ульев, особенности...':'Main apiary, number of hives, details...','Что обнаружено при осмотре':'What was found during inspection','Например, поставлены полоски':'e.g. Strips were applied','Что нужно сделать?':'What needs to be done?','Выберите препарат выше или введите название':'Select a medicine above or enter a name'}
  };
  Object.assign(UI_PLACEHOLDERS.be, {
    'Например: перевезён на липовый медосбор':'Напрыклад: перавезены на ліпавы медазбор','Определяется автоматически':'Вызначаецца аўтаматычна','Клецкий район':'Клецкі раён','Например, 1':'Напрыклад, 1','Дадан / Рута':'Дадан / Рута','Например, 2026':'Напрыклад, 2026','Например, 3':'Напрыклад, 3','У края участка, возле дерева':'На краі ўчастка, каля дрэва','Например, 125 или Ряд 3':'Напрыклад, 125 або Рад 3','Например, 48.650':'Напрыклад, 48.650',
    'Например: начало цветения липы, установлены два магазина…':'Напрыклад: пачатак цвіцення ліпы, пастаўленыя два магазіны…','Например: семья сильная, матка есть, расплод хороший, корма достаточно. Поставил две рамки вощины.':'Напрыклад: сям’я моцная, матка ёсць, расплод добры, корму дастаткова. Паставіў дзве рамкі вашчыны.','Например, расплод, матка, признаки болезни':'Напрыклад, расплод, матка, прыкметы хваробы','Например, 9':'Напрыклад, 9','Название препарата, если применялся':'Назва прэпарата, калі ўжываўся','Например, 1 мл на 10 рамок':'Напрыклад, 1 мл на 10 рамак','Например, 3.250':'Напрыклад, 3.250','Например, ВОСК-2026-01':'Напрыклад, ВОСК-2026-01','Куда сдан воск':'Куды здадзены воск','Качество воска, партия, номер квитанции, потери и другие сведения':'Якасць воску, партыя, нумар квітанцыі, страты і іншыя звесткі','Например, 0.250':'Напрыклад, 0.250','Например, ПЕРГА-2026-01':'Напрыклад, ПЯРГА-2026-01','Качество, способ сбора, покупатель, причина списания...':'Якасць, спосаб збору, пакупнік, прычына спісання...','Например, проверить корм':'Напрыклад, праверыць корм','Например, 2026-М-001':'Напрыклад, 2026-М-001','Заполнить после проверки':'Запоўніць пасля праверкі','Линия, признаки материнской семьи, условия вывода, результаты проверки...':'Лінія, прыкметы матчынай сям’і, умовы вывядзення, вынікі праверкі...','Например, 25А':'Напрыклад, 25А','Например, 5':'Напрыклад, 5','Например, 2':'Напрыклад, 2','Например, матка принята, есть засев, семья развивается':'Напрыклад, матка прынята, ёсць засев, сям’я развіваецца','Причина операции, происхождение роя, состояние семей, дальнейшие действия...':'Прычына аперацыі, паходжанне роя, стан сем’яў, далейшыя дзеянні...','Мёд разнотравье':'Мёд рознатраўе','Июнь–июль 2026':'Чэрвень–ліпень 2026','Например, 750':'Напрыклад, 750','Например, 40':'Напрыклад, 40','Например, 2026-001-500':'Напрыклад, 2026-001-500','Тип банки, крышка, особенности фасовки':'Тып слоіка, вечка, асаблівасці фасоўкі','Только для фасованного мёда':'Толькі для фасаванага мёду','Например, 2.500':'Напрыклад, 2.500','Например, 62.50':'Напрыклад, 62.50','По желанию':'Па жаданні','Инвентарь, мёд, упаковка...':'Інвентар, мёд, упакоўка...','Проверить корм':'Праверыць корм','Например, состояние семьи после осмотра':'Напрыклад, стан сям’і пасля агляду','Например, Бипин-Т':'Напрыклад, Біпін-Т','10 мл, 100 г, 20 доз':'10 мл, 100 г, 20 доз','Для чего используется, где хранится и т.д.':'Для чаго выкарыстоўваецца, дзе захоўваецца і г.д.','Например, 10':'Напрыклад, 10','Кто выполнял':'Хто выконваў','Концентрация, время выдержки, причины, особенности...':'Канцэнтрацыя, час вытрымкі, прычыны, асаблівасці...','Например, Иван Петров':'Напрыклад, Іван Пятроў','Название фирмы':'Назва фірмы','Что поставляет, где познакомились, важные детали…':'Што пастаўляе, дзе пазнаёміліся, важныя дэталі…','Поиск по имени, телефону…':'Пошук па імені, тэлефоне…','УДАЛИТЬ ВСЁ':'УДАЛИТЬ ВСЁ','Укажите количество':'Укажыце колькасць','Например, закупка препарата, накладная':'Напрыклад, закупка прэпарата, накладная','Сильная / средняя / слабая':'Моцная / сярэдняя / слабая','Особенности семьи, характер, зимовка, происхождение...':'Асаблівасці сям’і, характар, зімоўка, паходжанне...','Например, К-125':'Напрыклад, К-125','Своя, питомник, куплена':'Свая, гадавальнік, набыта','Белая, жёлтая, красная...':'Белая, жоўтая, чырвоная...','Слабая, старая, потеряна, плановая замена...':'Слабая, старая, страчана, планавая замена...','Дополнительные сведения о матке':'Дадатковыя звесткі пра матку','Название препарата':'Назва прэпарата','Например, варроатоз':'Напрыклад, вароатоз','Доза на семью':'Доза на сям’ю','Количество':'Колькасць'
  });
  Object.assign(UI_PLACEHOLDERS.en, {
    'Например: перевезён на липовый медосбор':'Example: moved for the linden honey flow','Определяется автоматически':'Determined automatically','Клецкий район':'Kletsk district','Например, 1':'Example: 1','Дадан / Рута':'Dadant / Ruta','Например, 2026':'Example: 2026','Например, 3':'Example: 3','У края участка, возле дерева':'At the edge of the plot, near a tree','Например, 125 или Ряд 3':'Example: 125 or Row 3','Например, 48.650':'Example: 48.650',
    'Например: начало цветения липы, установлены два магазина…':'Example: linden bloom began, two supers added…','Например: семья сильная, матка есть, расплод хороший, корма достаточно. Поставил две рамки вощины.':'Example: strong colony, queen present, good brood, enough stores. Added two foundation frames.','Например, расплод, матка, признаки болезни':'Example: brood, queen, signs of disease','Например, 9':'Example: 9','Название препарата, если применялся':'Medicine name, if used','Например, 1 мл на 10 рамок':'Example: 1 ml per 10 frames','Например, 3.250':'Example: 3.250','Например, ВОСК-2026-01':'Example: WAX-2026-01','Куда сдан воск':'Where the wax was sent','Качество воска, партия, номер квитанции, потери и другие сведения':'Wax quality, batch, receipt number, losses and other details','Например, 0.250':'Example: 0.250','Например, ПЕРГА-2026-01':'Example: BEEBREAD-2026-01','Качество, способ сбора, покупатель, причина списания...':'Quality, collection method, buyer, reason for write-off...','Например, проверить корм':'Example: check food stores','Например, 2026-М-001':'Example: 2026-M-001','Заполнить после проверки':'Fill in after inspection','Линия, признаки материнской семьи, условия вывода, результаты проверки...':'Line, maternal colony traits, rearing conditions, inspection results...','Например, 25А':'Example: 25A','Например, 5':'Example: 5','Например, 2':'Example: 2','Например, матка принята, есть засев, семья развивается':'Example: queen accepted, eggs present, colony developing','Причина операции, происхождение роя, состояние семей, дальнейшие действия...':'Reason for operation, swarm origin, colony condition, next steps...','Мёд разнотравье':'Polyfloral honey','Июнь–июль 2026':'June–July 2026','Например, 750':'Example: 750','Например, 40':'Example: 40','Например, 2026-001-500':'Example: 2026-001-500','Тип банки, крышка, особенности фасовки':'Jar type, lid, packaging details','Только для фасованного мёда':'For packaged honey only','Например, 2.500':'Example: 2.500','Например, 62.50':'Example: 62.50','По желанию':'Optional','Инвентарь, мёд, упаковка...':'Equipment, honey, packaging...','Проверить корм':'Check food stores','Например, состояние семьи после осмотра':'Example: colony condition after inspection','Например, Бипин-Т':'Example: Bipin-T','10 мл, 100 г, 20 доз':'10 ml, 100 g, 20 doses','Для чего используется, где хранится и т.д.':'Purpose, storage location, etc.','Например, 10':'Example: 10','Кто выполнял':'Performed by','Концентрация, время выдержки, причины, особенности...':'Concentration, exposure time, reasons, details...','Например, Иван Петров':'Example: Ivan Petrov','Название фирмы':'Company name','Что поставляет, где познакомились, важные детали…':'What they supply, where you met, important details…','Поиск по имени, телефону…':'Search by name, phone…','УДАЛИТЬ ВСЁ':'УДАЛИТЬ ВСЁ','Укажите количество':'Enter quantity','Например, закупка препарата, накладная':'Example: medicine purchase, invoice','Сильная / средняя / слабая':'Strong / medium / weak','Особенности семьи, характер, зимовка, происхождение...':'Colony traits, temperament, wintering, origin...','Например, К-125':'Example: K-125','Своя, питомник, куплена':'Own breeding, breeder, purchased','Белая, жёлтая, красная...':'White, yellow, red...','Слабая, старая, потеряна, плановая замена...':'Weak, old, lost, scheduled replacement...','Дополнительные сведения о матке':'Additional queen details','Название препарата':'Medicine name','Например, варроатоз':'Example: varroosis','Доза на семью':'Dose per colony','Количество':'Quantity'
  });
  const UI_TABLES = {
    be: {'Дата / операция':'Дата / аперацыя','Исходная семья':'Зыходная сям’я','Новая / принимающая':'Новая / прымаючая','Пасека':'Пчальнік','Рамки':'Рамкі','Матка / семья':'Матка / сям’я','Статус / результат':'Статус / вынік','Примечание':'Заўвага','Дата':'Дата','Операция':'Аперацыя','Количество':'Колькасць','Партия / переработчик':'Партыя / перапрацоўшчык','Продукция':'Прадукцыя','Партия':'Партыя','Банка':'Банка','Фасовано':'Расфасавана','Осталось банок':'Засталося слоікаў','Код этикетки / QR':'Код этыкеткі / QR','Действия':'Дзеянні','Продано':'Прададзена','Сумма':'Сума','Финансы':'Фінансы','Продукт':'Прадукт','Улей':'Вулей','Последний осмотр':'Апошні агляд','Сила':'Сіла','Матка':'Матка','Корм':'Корм','Семья':'Сям’я','Фото':'Фота','Заметки':'Нататкі','Тип':'Тып','Категория':'Катэгорыя','Описание':'Апісанне','Что':'Што','Средство':'Сродак','Способ':'Спосаб','Причина':'Прычына','Ответственный':'Адказны','Следующая':'Наступная','Серия / дата прививки':'Серыя / дата прышчэпкі','Материнская семья':'Матчына сям’я','Стартер / финишер':'Стартар / фінішар','Ячейки':'Ячэйкі','Контрольные даты':'Кантрольныя даты','Этап':'Этап','Изменение':'Змяненне','Было → стало':'Было → стала','Комментарий':'Каментарый','Подсадка':'Падсадка','Порода':'Парода','Год':'Год','Происхождение':'Паходжанне','Метка':'Метка','Расплод':'Расплод','Препарат':'Прэпарат','Цель':'Мэта','Доза':'Доза','Расход':'Выдатак','Откуда':'Адкуль','Куда':'Куды','Событие':'Падзея','Приоритет':'Прыярытэт','Напоминание':'Напамін'},
    en: {'Дата / операция':'Date / operation','Исходная семья':'Source colony','Новая / принимающая':'New / receiving colony','Пасека':'Apiary','Рамки':'Frames','Матка / семья':'Queen / colony','Статус / результат':'Status / result','Примечание':'Note','Дата':'Date','Операция':'Operation','Количество':'Quantity','Партия / переработчик':'Batch / processor','Продукция':'Product','Партия':'Batch','Банка':'Jar','Фасовано':'Packaged','Осталось банок':'Jars remaining','Код этикетки / QR':'Label / QR code','Действия':'Actions','Продано':'Sold','Сумма':'Amount','Финансы':'Finances','Продукт':'Product','Улей':'Hive','Последний осмотр':'Last inspection','Сила':'Strength','Матка':'Queen','Корм':'Food stores','Семья':'Colony','Фото':'Photo','Заметки':'Notes','Тип':'Type','Категория':'Category','Описание':'Description','Что':'Item','Средство':'Product used','Способ':'Method','Причина':'Reason','Ответственный':'Responsible','Следующая':'Next','Серия / дата прививки':'Batch / grafting date','Материнская семья':'Mother colony','Стартер / финишер':'Starter / finisher','Ячейки':'Cells','Контрольные даты':'Check dates','Этап':'Stage','Изменение':'Change','Было → стало':'Before → after','Комментарий':'Comment','Подсадка':'Introduction','Порода':'Breed','Год':'Year','Происхождение':'Origin','Метка':'Mark','Расплод':'Brood','Препарат':'Medicine','Цель':'Purpose','Доза':'Dose','Расход':'Usage','Откуда':'From','Куда':'To','Событие':'Event','Приоритет':'Priority','Напоминание':'Reminder'}
  };
  Object.assign(UI_TABLES.be, {'Статус':'Стан','Рамок':'Рамак'});
  Object.assign(UI_TABLES.en, {'Статус':'Status','Рамок':'Frames'});
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
  Object.assign(UI_OPTIONS.be, {
    'Все ульи':'Усе вуллі','клещей / 100 пчёл':'кляшчоў / 100 пчол','клещей / сутки':'кляшчоў / суткі','% поражения':'% паражэння','условная оценка':'умоўная ацэнка','Не списывать со склада':'Не спісваць са склада',
    '100 мл':'100 мл','250 мл':'250 мл','280 мл':'280 мл','330 мл':'330 мл','500 мл':'500 мл','720 мл':'720 мл','1000 мл':'1000 мл',
    '40% — 1 : 1,5 (стимулирование яйцекладки)':'40% — 1 : 1,5 (стымуляванне яйцакладкі)','50% — 1 : 1 (побудительная подкормка, весна/лето)':'50% — 1 : 1 (стымулюючая падкормка, вясна/лета)','60% — 1,5 : 1 (осеннее пополнение запасов)':'60% — 1,5 : 1 (восеньскае папаўненне запасаў)','60% — 3 : 2 (то же соотношение)':'60% — 3 : 2 (тыя ж суадносіны)','70% — 2 : 1 (интенсивное заполнение зимних запасов)':'70% — 2 : 1 (інтэнсіўнае папаўненне зімовых запасаў)',
    'мл':'мл','г':'г','таблеток':'таблетак','полосок':'палосак','доз':'доз',
    'Прививка выполнена':'Прышчэпка выканана','Приняты личинки':'Прыняты лічынкі','Маточники запечатаны':'Матачнікі запячатаны','Выход маток':'Выхад матак','На облёте':'На аблёце','Неудачная':'Няўдалая','Молодая матка':'Маладая матка',
    '100 г':'100 г','130 г':'130 г','280 г':'280 г','500 г':'500 г','1000 г':'1000 г',
    'Пасека':'Пчальнік','Улей':'Вулей','Плановая':'Планавая','После болезни':'Пасля хваробы','После выбраковки семьи':'Пасля выбракоўкі сям’і','Санитарная':'Санітарная',
    'Пчеловод':'Пчаляр','Поставщик':'Пастаўшчык','Другой контакт':'Іншы кантакт',
    'Каждый день':'Кожны дзень','Только по будням':'Толькі ў буднія дні','Раз в неделю (понедельник)':'Раз на тыдзень (панядзелак)',
    'Австрия — EUR':'Аўстрыя — EUR','Германия — EUR':'Германія — EUR','Польша — PLN':'Польшча — PLN','Украина — UAH':'Украіна — UAH','Великобритания — GBP':'Вялікабрытанія — GBP','Швейцария — CHF':'Швейцарыя — CHF','Казахстан — KZT':'Казахстан — KZT','Турция — TRY':'Турцыя — TRY','Грузия — GEL':'Грузія — GEL','Молдова — MDL':'Малдова — MDL','Армения — AMD':'Арменія — AMD','Азербайджан — AZN':'Азербайджан — AZN','Китай — CNY':'Кітай — CNY','Япония — JPY':'Японія — JPY','Индия — INR':'Індыя — INR','Израиль — ILS':'Ізраіль — ILS','Норвегия — NOK':'Нарвегія — NOK','Швеция — SEK':'Швецыя — SEK','Дания — DKK':'Данія — DKK','Чехия — CZK':'Чэхія — CZK'
  });
  Object.assign(UI_OPTIONS.en, {
    'Все ульи':'All hives','клещей / 100 пчёл':'mites / 100 bees','клещей / сутки':'mites / day','% поражения':'% infestation','условная оценка':'qualitative estimate','Не списывать со склада':'Do not deduct from inventory',
    '100 мл':'100 ml','250 мл':'250 ml','280 мл':'280 ml','330 мл':'330 ml','500 мл':'500 ml','720 мл':'720 ml','1000 мл':'1000 ml',
    '40% — 1 : 1,5 (стимулирование яйцекладки)':'40% — 1 : 1.5 (stimulating egg laying)','50% — 1 : 1 (побудительная подкормка, весна/лето)':'50% — 1 : 1 (stimulant feeding, spring/summer)','60% — 1,5 : 1 (осеннее пополнение запасов)':'60% — 1.5 : 1 (autumn replenishment of stores)','60% — 3 : 2 (то же соотношение)':'60% — 3 : 2 (same ratio)','70% — 2 : 1 (интенсивное заполнение зимних запасов)':'70% — 2 : 1 (intensive winter-store buildup)',
    'мл':'ml','г':'g','таблеток':'tablets','полосок':'strips','доз':'doses',
    'Прививка выполнена':'Grafting completed','Приняты личинки':'Larvae accepted','Маточники запечатаны':'Queen cells capped','Выход маток':'Queens emerged','На облёте':'On mating flight','Неудачная':'Unsuccessful','Молодая матка':'Young queen',
    '100 г':'100 g','130 г':'130 g','280 г':'280 g','500 г':'500 g','1000 г':'1000 g',
    'Пасека':'Apiary','Улей':'Hive','Плановая':'Scheduled','После болезни':'After disease','После выбраковки семьи':'After colony removal','Санитарная':'Sanitary',
    'Пчеловод':'Beekeeper','Поставщик':'Supplier','Другой контакт':'Other contact',
    'Каждый день':'Every day','Только по будням':'Weekdays only','Раз в неделю (понедельник)':'Once a week (Monday)',
    'Австрия — EUR':'Austria — EUR','Германия — EUR':'Germany — EUR','Польша — PLN':'Poland — PLN','Украина — UAH':'Ukraine — UAH','Великобритания — GBP':'United Kingdom — GBP','Швейцария — CHF':'Switzerland — CHF','Казахстан — KZT':'Kazakhstan — KZT','Турция — TRY':'Turkey — TRY','Грузия — GEL':'Georgia — GEL','Молдова — MDL':'Moldova — MDL','Армения — AMD':'Armenia — AMD','Азербайджан — AZN':'Azerbaijan — AZN','Китай — CNY':'China — CNY','Япония — JPY':'Japan — JPY','Индия — INR':'India — INR','Израиль — ILS':'Israel — ILS','Норвегия — NOK':'Norway — NOK','Швеция — SEK':'Sweden — SEK','Дания — DKK':'Denmark — DKK','Чехия — CZK':'Czechia — CZK'
  });
  Object.assign(UI_OPTIONS.be, {
    'Получен воск':'Атрыманы воск','Сдан в переработку':'Здадзены ў перапрацоўку','Получен воск после переработки':'Атрыманы воск пасля перапрацоўкі','Получена вощина':'Атрымана вашчына','Использована вощина':'Выкарыстана вашчына',
    'Получено':'Атрымана','Продано':'Прададзена','Использовано':'Выкарыстана','Списано':'Спісана','Завершена':'Завершана','Запланирована':'Запланавана','В переработке':'У перапрацоўцы','Отменена':'Адменена'
  });
  Object.assign(UI_OPTIONS.en, {
    'Получен воск':'Wax received','Сдан в переработку':'Sent for processing','Получен воск после переработки':'Wax returned after processing','Получена вощина':'Foundation received','Использована вощина':'Foundation used',
    'Получено':'Received','Продано':'Sold','Использовано':'Used','Списано':'Written off','Завершена':'Completed','Запланирована':'Scheduled','В переработке':'Processing','Отменена':'Cancelled'
  });
  Object.assign(UI_OPTIONS.be, {
    'Общий склад / не указана':'Агульны склад / не пазначана','Общий склад / без пасеки':'Агульны склад / без пчальніка',
    'Прополис':'Праполіс','Пыльца':'Пылок','Перга':'Пярга','Получено':'Атрымана','Продано':'Прададзена','Использовано':'Выкарыстана','Списано':'Спісана',
    'Поступление воска':'Паступленне воску','Сдача в переработку':'Здача ў перапрацоўку','Возврат воска':'Вяртанне воску','Поступление вощины':'Паступленне вашчыны','Использование вощины':'Выкарыстанне вашчыны','Корректировка остатка':'Карэкціроўка рэшты',
    'Завершена':'Завершана','Запланирована':'Запланавана','В переработке':'У перапрацоўцы','Отменена':'Адменена'
  });
  Object.assign(UI_OPTIONS.en, {
    'Общий склад / не указана':'General stock / not specified','Общий склад / без пасеки':'General stock / no apiary',
    'Прополис':'Propolis','Пыльца':'Pollen','Перга':'Bee bread','Получено':'Received','Продано':'Sold','Использовано':'Used','Списано':'Written off',
    'Поступление воска':'Wax received','Сдача в переработку':'Sent for processing','Возврат воска':'Wax returned','Поступление вощины':'Foundation received','Использование вощины':'Foundation used','Корректировка остатка':'Balance adjustment',
    'Завершена':'Completed','Запланирована':'Scheduled','В переработке':'Processing','Отменена':'Cancelled'
  });
  Object.assign(UI_TABLES.be, {
    'Пчельник':'Пчальнік','Прополис':'Праполіс','Пыльца':'Пылок','Перга':'Пярга','Дата':'Дата','Операция':'Аперацыя','Пасека':'Пчальнік','Количество':'Колькасць','Партия':'Партыя','Статус':'Стан','Примечание':'Заўвага','Действия':'Дзеянні','Тип':'Тып','Сумма':'Сума','Категория':'Катэгорыя','Описание':'Апісанне','Улей':'Вулей','Семья':'Сям’я','Матка':'Матка','Фото':'Фота','Заметки':'Нататкі','Рамок':'Рамак','Рамок':'Рамак'
  });
  Object.assign(UI_TABLES.en, {
    'Пчельник':'Apiary','Прополис':'Propolis','Пыльца':'Pollen','Перга':'Bee bread','Дата':'Date','Операция':'Operation','Пасека':'Apiary','Количество':'Quantity','Партия':'Batch','Статус':'Status','Примечание':'Note','Действия':'Actions','Тип':'Type','Сумма':'Amount','Категория':'Category','Описание':'Description','Улей':'Hive','Семья':'Colony','Матка':'Queen','Фото':'Photos','Заметки':'Notes','Рамок':'Frames'
  });

  Object.assign(UI_TABLES.be, {
    'Операции':'Аперацыі','Операция':'Аперацыя','Рамок':'Рамак','Рамок, шт.':'Рамак, шт.','Финансы':'Фінансы',
    'Порода':'Парода','Год':'Год','Препарат':'Прэпарат','Цель':'Мэта','Доза':'Доза','Расход':'Выдатак',
    'Откуда':'Адкуль','Куда':'Куды','Событие':'Падзея','Приоритет':'Прыярытэт','Напоминание':'Напамін'
  });
  Object.assign(UI_TABLES.en, {
    'Операции':'Operations','Операция':'Operation','Рамок':'Frames','Рамок, шт.':'Frames, pcs','Финансы':'Finances',
    'Порода':'Breed','Год':'Year','Препарат':'Medicine','Цель':'Purpose','Доза':'Dose','Расход':'Usage',
    'Откуда':'From','Куда':'To','Событие':'Event','Приоритет':'Priority','Напоминание':'Reminder'
  });
  Object.assign(UI_STATIC.be, {
    'Вход в цифровой журнал пасечника':'Уваход у лічбавы журнал пчаляра',
    'Пасеки и основные сведения о них.':'Пчальнікі і асноўныя звесткі пра іх.',
    'Учёт ульев и пчелиных семей.':'Улік вулляў і пчаліных сем’яў.',
    'Учёт сбора, продажи, использования и списания продукции. Остатки рассчитываются отдельно по виду продукции и пасеке.':'Улік збору, продажу, выкарыстання і спісання прадукцыі. Рэшткі разлічваюцца асобна па відах прадукцыі і пчальніках.',
    'Работы и события пасеки.':'Работы і падзеі пчальніка.',
    'Быстрые расчёты для фасовки мёда, подкормки, зимних запасов, вощины и себестоимости. Расчёты выполняются на устройстве и не изменяют записи журнала.':'Хуткія разлікі для фасоўкі мёду, падкормкі, зімовых запасаў, вашчыны і сабекошту. Разлікі выконваюцца на прыладзе і не змяняюць запісы журнала.',
    'Пропорции указаны по массе. Расчёт примерный: плотность готового сиропа зависит от концентрации и температуры. Для точного расчёта задайте плотность для выбранного сиропа; учитывайте состояние семьи и рекомендации по подкормке.':'Прапорцыі пазначаныя па масе. Разлік прыблізны: шчыльнасць гатовага сіропу залежыць ад канцэнтрацыі і тэмпературы. Для дакладнага разліку задайце шчыльнасць абранага сіропу; улічвайце стан сям’і і рэкамендацыі па падкормцы.',
    'Норма зависит от климата, силы семьи, типа улья и местной практики. Используйте значение, подходящее вашей пасеке.':'Норма залежыць ад клімату, сілы сям’і, тыпу вулля і мясцовай практыкі. Выкарыстоўвайце значэнне, якое падыходзіць вашаму пчальніку.',
    'Введите дозу и единицы строго из инструкции к конкретному препарату. Калькулятор только умножает указанную норму и не определяет, подходит ли средство пчёлам.':'Увядзіце дозу і адзінкі строга з інструкцыі да канкрэтнага прэпарата. Калькулятар толькі памнажае ўказаную норму і не вызначае, ці падыходзіць сродак пчолам.',
    'Перед обработкой проверьте действующее вещество, способ применения, ограничения для медосбора и точную инструкцию производителя.':'Перад апрацоўкай праверце дзеючае рэчыва, спосаб прымянення, абмежаванні падчас медазбору і дакладную інструкцыю вытворцы.',
    'Планирование серий вывода маток, контроль прививки, приёма личинок, выхода маток и облёта. Карточки отдельных маток сохраняются в истории соответствующего улья.':'Планаванне серый вывядзення матак, кантроль прышчэпкі, прыёму лічынак, выхаду матак і аблёту. Карткі асобных матак захоўваюцца ў гісторыі адпаведнага вулля.',
    'Прививки, проверки маточников, выход маток и облёт по вашим сериям.':'Прышчэпкі, праверкі матачнікаў, выхад матак і аблёт па вашых серыях.',
    'Фиксируйте происхождение новой семьи, исходный и принимающий ульи, количество рамок, матку и результат операции. Записи сохраняют историю и не меняют ульи автоматически.':'Фіксуйце паходжанне новай сям’і, зыходны і прымаючы вуллі, колькасць рамак, матку і вынік аперацыі. Запісы захоўваюць гісторыю і не змяняюць вуллі аўтаматычна.',
    'Записывайте размер банки, количество и код этикетки. Каждая фасовка будет связана с исходной партией урожая.':'Запісвайце памер слоіка, колькасць і код этыкеткі. Кожная фасоўка будзе звязаная з зыходнай партыяй ураджаю.',
    'Записывайте проданное количество и фактическую сумму. Остаток партии обновляется автоматически.':'Запісвайце прададзеную колькасць і фактычную суму. Рэшта партыі абнаўляецца аўтаматычна.',
    'Учёт препаратов для пасеки, их количества и сроков годности.':'Улік прэпаратаў для пчальніка, іх колькасці і тэрмінаў прыдатнасці.',
    'Учёт дезинфекции пасеки, ульев, рамок и инвентаря: когда, чем, как и по какой причине.':'Улік дэзінфекцыі пчальніка, вулляў, рамак і інвентара: калі, чым, як і з якой прычыны.'
  });
  Object.assign(UI_STATIC.en, {
    'Вход в цифровой журнал пасечника':'Sign in to the digital beekeeper journal',
    'Пасеки и основные сведения о них.':'Apiaries and their basic details.',
    'Учёт ульев и пчелиных семей.':'Hive and colony records.',
    'Учёт сбора, продажи, использования и списания продукции. Остатки рассчитываются отдельно по виду продукции и пасеке.':'Track harvested, sold, used and written-off products. Balances are calculated separately by product type and apiary.',
    'Работы и события пасеки.':'Apiary tasks and events.',
    'Быстрые расчёты для фасовки мёда, подкормки, зимних запасов, вощины и себестоимости. Расчёты выполняются на устройстве и не изменяют записи журнала.':'Quick calculations for honey packaging, feeding, winter stores, foundation and cost price. Calculations run on your device and do not change journal records.',
    'Пропорции указаны по массе. Расчёт примерный: плотность готового сиропа зависит от концентрации и температуры. Для точного расчёта задайте плотность для выбранного сиропа; учитывайте состояние семьи и рекомендации по подкормке.':'Ratios are by weight. This is an estimate: finished syrup density depends on concentration and temperature. For an exact calculation, enter the selected syrup density; consider colony condition and feeding guidance.',
    'Норма зависит от климата, силы семьи, типа улья и местной практики. Используйте значение, подходящее вашей пасеке.':'The amount depends on climate, colony strength, hive type and local practice. Use a value appropriate for your apiary.',
    'Введите дозу и единицы строго из инструкции к конкретному препарату. Калькулятор только умножает указанную норму и не определяет, подходит ли средство пчёлам.':'Enter the dose and units exactly as stated in the product instructions. The calculator only multiplies the specified rate and does not determine whether the product is suitable for bees.',
    'Перед обработкой проверьте действующее вещество, способ применения, ограничения для медосбора и точную инструкцию производителя.':'Before treatment, check the active ingredient, application method, honey-flow restrictions and the manufacturer’s instructions.',
    'Планирование серий вывода маток, контроль прививки, приёма личинок, выхода маток и облёта. Карточки отдельных маток сохраняются в истории соответствующего улья.':'Plan queen-rearing batches and track grafting, larval acceptance, queen emergence and mating flights. Individual queen cards are saved in the relevant hive history.',
    'Прививки, проверки маточников, выход маток и облёт по вашим сериям.':'Grafting, cell checks, queen emergence and mating flights for your batches.',
    'Фиксируйте происхождение новой семьи, исходный и принимающий ульи, количество рамок, матку и результат операции. Записи сохраняют историю и не меняют ульи автоматически.':'Record the origin of a new colony, source and receiving hives, frame count, queen and operation result. Records preserve history and do not change hives automatically.',
    'Записывайте размер банки, количество и код этикетки. Каждая фасовка будет связана с исходной партией урожая.':'Record jar size, quantity and label code. Each package is linked to the original harvest batch.',
    'Записывайте проданное количество и фактическую сумму. Остаток партии обновляется автоматически.':'Record the quantity sold and actual amount. The batch balance updates automatically.',
    'Учёт препаратов для пасеки, их количества и сроков годности.':'Track apiary medicines, quantities and expiry dates.',
    'Учёт дезинфекции пасеки, ульев, рамок и инвентаря: когда, чем, как и по какой причине.':'Track apiary, hive, frame and equipment disinfection: when, with what, how and why.'
  });

  // Additional fixed interface labels found during the full Preview audit.
  Object.assign(UI_TEXT.be, {"Показать улей":"Паказаць вулей","Распознанный текст (можно исправить вручную)":"Распазнаны тэкст (можна выправіць уручную)","Подпись к фото (необязательно)":"Подпіс да фота (неабавязкова)","Принято личинок":"Прынята лічынак","Код серии *":"Код серыі *","Дата прививки *":"Дата прышчэпкі *","Материнская семья *":"Матчыная сям’я *","Семья-стартер":"Сям’я-стартар","Семья-финишер":"Сям’я-фінішар","Привито личинок / ячеек *":"Прышчэплена лічынак / ячэек *","Ожидаемый выход маток":"Чаканы выхад матак","Фактический выход":"Фактычны выхад","Начало облёта":"Пачатак аблёту","Окончание облёта":"Заканчэнне аблёту","Тип операции *":"Тып аперацыі *","Принимающий / новый улей":"Прымаючы / новы вулей","Номер нового улья, если ещё не добавлен":"Нумар новага вулля, калі яшчэ не дададзены","Всего рамок":"Усяго рамак","Рамок с расплодом":"Рамак з расплодам","Рамок с кормом":"Рамак з кормам","Статус операции":"Статус аперацыі","Результат / контроль":"Вынік / кантроль","Название мёда *":"Назва мёду *","Дата продажи *":"Дата продажу *","Партия мёда *":"Партыя мёду *","Фасовка (необязательно)":"Фасоўка (неабавязкова)","Продано, кг *":"Прададзена, кг *","Сумма продажи *":"Сума продажу *","Примечание / покупатель":"Заўвага / пакупнік","Имя / название *":"Імя / назва *","Компания / организация":"Кампанія / арганізацыя","Файл фотографии *":"Файл фатаграфіі *"});
  Object.assign(UI_TEXT.en, {"Показать улей":"Show hive","Распознанный текст (можно исправить вручную)":"Recognized text (you can edit it)","Подпись к фото (необязательно)":"Photo caption (optional)","Принято личинок":"Accepted larvae","Код серии *":"Series code *","Дата прививки *":"Grafting date *","Материнская семья *":"Mother colony *","Семья-стартер":"Starter colony","Семья-финишер":"Finisher colony","Привито личинок / ячеек *":"Grafted larvae / cells *","Ожидаемый выход маток":"Expected queen emergence","Фактический выход":"Actual emergence","Начало облёта":"Mating flight start","Окончание облёта":"Mating flight end","Тип операции *":"Operation type *","Принимающий / новый улей":"Receiving / new hive","Номер нового улья, если ещё не добавлен":"New hive number, if not added yet","Всего рамок":"Total frames","Рамок с расплодом":"Frames with brood","Рамок с кормом":"Frames with stores","Статус операции":"Operation status","Результат / контроль":"Result / follow-up","Название мёда *":"Honey name *","Дата продажи *":"Sale date *","Партия мёда *":"Honey batch *","Фасовка (необязательно)":"Packaging (optional)","Продано, кг *":"Sold, kg *","Сумма продажи *":"Sale amount *","Примечание / покупатель":"Note / buyer","Имя / название *":"Name *","Компания / организация":"Company / organization","Файл фотографии *":"Photo file *"});
  Object.assign(UI_STATIC.be, {"Карта белорусских пчеловодов":"Карта беларускіх пчаляроў","Найти пасеки · Посмотреть продукцию · Связаться с пчеловодами":"Знайсці пчальнікі · Паглядзець прадукцыю · Звязацца з пчалярамі","Перейти на карту ➜":"Перайсці да карты ➜","Цифровой журнал пасечника «Дедушкина пасека».":"Лічбавы журнал пчаляра «Дзядулява пчальня».","👑 Племенной календарь":"👑 Племянны каляндар","🐝 Состояние пасеки":"🐝 Стан пчальніка","📅 Ближайшие работы":"📅 Бліжэйшыя работы","📋 Последние осмотры":"📋 Апошнія агляды","🍯 Мёд и продукция":"🍯 Мёд і прадукцыя","📈 История и динамика веса":"📈 Гісторыя і дынаміка вагі","ℹ️ Как правильно вести контрольный улей":"ℹ️ Як правільна весці кантрольны вулей","🎙️ Голосовые заметки осмотра":"🎙️ Галасавыя нататкі агляду","🧪 Оценка заражённости клещом Varroa (смыв)":"🧪 Ацэнка заражанасці кляшчом Varroa (змыў)","Каждая обработка с препаратом автоматически попадает сюда и связывается с конкретным ульем. Если выбран препарат со склада, его расход уменьшается.":"Кожная апрацоўка прэпаратам аўтаматычна трапляе сюды і звязваецца з канкрэтным вуллём. Калі выбраны прэпарат са склада, яго рэшта памяншаецца.","Новая операция с продукцией":"Новая аперацыя з прадукцыяй","Для корректировки укажите положительное или отрицательное изменение остатка. Запланированные и отменённые операции не входят в остаток.":"Для карэкціроўкі пазначце станоўчае або адмоўнае змяненне рэшты. Запланаваныя і адмененыя аперацыі не ўлічваюцца ў рэшце.","＋ Добавить событие":"＋ Дадаць падзею","Новое событие":"Новая падзея","События и работы":"Падзеі і работы","🥣 Сахарный сироп":"🥣 Цукровы сіроп","❄️ Корм на зимовку":"❄️ Корм на зімоўку","🕯️ Рамки и вощина":"🕯️ Рамкі і вашчына","💰 Себестоимость и прибыль":"💰 Сабекошт і прыбытак","💊 Расчёт дозы по инструкции":"💊 Разлік дозы паводле інструкцыі","📅 Календарь матковода":"📅 Каляндар маткавода","Новая серия вывода маток":"Новая серыя вывядзення матак","История серий вывода":"Гісторыя серый вывядзення","Новая операция с семьёй":"Новая аперацыя з сям’ёй","История роёв, отводков и объединений":"Гісторыя раёў, адводкаў і аб’яднанняў","🫙 Фасовка мёда":"🫙 Фасоўка мёду","🍯 Продажи мёда":"🍯 Продажы мёду","История продаж мёда":"Гісторыя продажаў мёду","Новое напоминание":"Новае напамінанне","Мои напоминания":"Мае напамінанні","Просроченные и ближайшие дела находятся сверху.":"Пратэрмінаваныя і бліжэйшыя справы знаходзяцца ўверсе.","📷 Добавить фотографию":"📷 Дадаць фатаграфію","📷 Мои фотографии":"📷 Мае фатаграфіі","🐝 Состояние пчелиных семей":"🐝 Стан пчаліных сем’яў","📈 Изменение состояния семей":"📈 Змяненне стану сем’яў","Журнал дезинфекции":"Журнал дэзінфекцыі","Добавить контакт":"Дадаць кантакт","Мои контакты":"Мае кантакты","👥 Пользователи журнала":"👥 Карыстальнікі журнала","Только владелец может разрешать и блокировать доступ.":"Толькі ўладальнік можа дазваляць і блакіраваць доступ.","🎂 Ближайшие дни рождения":"🎂 Бліжэйшыя дні нараджэння","Добавьте день рождения контакту — он появится здесь.":"Дадайце дзень нараджэння кантакту — ён з’явіцца тут.","Фотографий пока нет.":"Пакуль няма фатаграфій.","Операций пока нет. Добавьте первую запись о рое, отводке или объединении.":"Пакуль няма аперацый. Дадайце першы запіс пра рой, адводак або аб’яднанне.","Поступило воска":"Паступіла воску","Сдано в переработку":"Здадзена ў перапрацоўку","Вощина":"Вашчына","Откройте раздел, чтобы загрузить измерения.":"Адкрыйце раздзел, каб загрузіць вымярэнні.","Фасовок пока нет. Добавьте первую запись выше.":"Пакуль няма фасовак. Дадайце першы запіс вышэй.","Продаж пока нет. Добавьте первую продажу выше.":"Пакуль няма продажаў. Дадайце першы продаж вышэй.","Записей пока нет. Добавьте первую операцию сбора или поступления продукции.":"Пакуль няма запісаў. Дадайце першую аперацыю збору або паступлення прадукцыі.","Записей о здоровье пока нет. Добавьте первую проверку варроа или заболевание выше.":"Пакуль няма запісаў пра здароўе. Дадайце першую праверку вароа або захворванне вышэй.","Обработок пока нет. Укажите препарат в новой записи о здоровье.":"Пакуль няма апрацовак. Пазначце прэпарат у новым запісе пра здароўе.","Партий пока нет.":"Пакуль няма партый.","Лекарств пока нет. Добавьте первый препарат выше.":"Пакуль няма лекаў. Дадайце першы прэпарат вышэй.","Ульев для схемы пока нет.":"Пакуль няма вулляў для схемы.","Серий вывода пока нет. Добавьте первую серию выше.":"Пакуль няма серый вывядзення. Дадайце першую серыю вышэй.","Предстоящих этапов нет. Добавьте серию вывода маток, чтобы заполнить календарь.":"Няма будучых этапаў. Дадайце серыю вывядзення матак, каб запоўніць каляндар.","История пока пуста.":"Гісторыя пакуль пустая.","Осмотров по этому улью пока нет.":"Па гэтым вуллі пакуль няма аглядаў.","Обработок по этому улью пока нет.":"Па гэтым вуллі пакуль няма апрацовак.","Для графика нужны результаты осмотров.":"Для графіка патрэбныя вынікі аглядаў.","Добавьте ульи и осмотры — здесь появится статистика семей.":"Дадайце вуллі і агляды — тут з’явіцца статыстыка сем’яў.","Партий мёда пока нет.":"Пакуль няма партый мёду.","Состояние в норме":"Стан у норме","⚠️ Требуют внимания":"⚠️ Патрабуюць увагі","✅ По лекарствам всё в порядке.":"✅ З лекамі ўсё ў парадку.","Заканчиваются препараты:":"Заканчваюцца прэпараты:","Ближайшие этапы":"Бліжэйшыя этапы","Выберите материнскую семью":"Выберыце матчыну сям’ю","Выберите стартер (необязательно)":"Выберыце стартар (неабавязкова)","Выберите финишер (необязательно)":"Выберыце фінішар (неабавязкова)","История маток по этому улью пока не заведена.":"Гісторыя матак па гэтым вуллі пакуль не вядзецца.","🐝 Данные пчелиной семьи":"🐝 Даныя пчалінай сям’і","Примечание о семье":"Заўвага пра сям’ю"});
  Object.assign(UI_STATIC.en, {"Карта белорусских пчеловодов":"Map of Belarusian Beekeepers","Найти пасеки · Посмотреть продукцию · Связаться с пчеловодами":"Find apiaries · Browse products · Contact beekeepers","Перейти на карту ➜":"Open the map ➜","Цифровой журнал пасечника «Дедушкина пасека».":"“Grandpa’s Apiary” digital beekeeping journal.","👑 Племенной календарь":"👑 Queen breeding calendar","🐝 Состояние пасеки":"🐝 Apiary status","📅 Ближайшие работы":"📅 Upcoming tasks","📋 Последние осмотры":"📋 Recent inspections","🍯 Мёд и продукция":"🍯 Honey and products","📈 История и динамика веса":"📈 Weight history and trends","ℹ️ Как правильно вести контрольный улей":"ℹ️ How to monitor a control hive","🎙️ Голосовые заметки осмотра":"🎙️ Voice inspection notes","🧪 Оценка заражённости клещом Varroa (смыв)":"🧪 Varroa mite infestation assessment (wash test)","Каждая обработка с препаратом автоматически попадает сюда и связывается с конкретным ульем. Если выбран препарат со склада, его расход уменьшается.":"Each treatment is recorded here and linked to a specific hive. If a medicine from inventory is selected, its stock is reduced.","Новая операция с продукцией":"New product operation","Для корректировки укажите положительное или отрицательное изменение остатка. Запланированные и отменённые операции не входят в остаток.":"For adjustments, enter a positive or negative change in stock. Planned and cancelled operations are excluded from the balance.","＋ Добавить событие":"＋ Add event","Новое событие":"New event","События и работы":"Events and tasks","🥣 Сахарный сироп":"🥣 Sugar syrup","❄️ Корм на зимовку":"❄️ Winter feed","🕯️ Рамки и вощина":"🕯️ Frames and foundation","💰 Себестоимость и прибыль":"💰 Cost and profit","💊 Расчёт дозы по инструкции":"💊 Dosage calculator (label instructions)","📅 Календарь матковода":"📅 Queen rearing calendar","Новая серия вывода маток":"New queen-rearing batch","История серий вывода":"Queen-rearing batch history","Новая операция с семьёй":"New colony operation","История роёв, отводков и объединений":"Swarm, split and merger history","🫙 Фасовка мёда":"🫙 Honey packaging","🍯 Продажи мёда":"🍯 Honey sales","История продаж мёда":"Honey sales history","Новое напоминание":"New reminder","Мои напоминания":"My reminders","Просроченные и ближайшие дела находятся сверху.":"Overdue and upcoming tasks appear first.","📷 Добавить фотографию":"📷 Add photo","📷 Мои фотографии":"📷 My photos","🐝 Состояние пчелиных семей":"🐝 Colony status","📈 Изменение состояния семей":"📈 Colony status changes","Журнал дезинфекции":"Disinfection log","Добавить контакт":"Add contact","Мои контакты":"My contacts","👥 Пользователи журнала":"👥 Journal users","Только владелец может разрешать и блокировать доступ.":"Only the owner can grant or block access.","🎂 Ближайшие дни рождения":"🎂 Upcoming birthdays","Добавьте день рождения контакту — он появится здесь.":"Add a contact’s birthday to see it here.","Фотографий пока нет.":"No photos yet.","Операций пока нет. Добавьте первую запись о рое, отводке или объединении.":"No operations yet. Add the first swarm, split or merger record.","Поступило воска":"Wax received","Сдано в переработку":"Sent for processing","Вощина":"Foundation","Откройте раздел, чтобы загрузить измерения.":"Open the section to load measurements.","Фасовок пока нет. Добавьте первую запись выше.":"No packaging records yet. Add the first one above.","Продаж пока нет. Добавьте первую продажу выше.":"No sales yet. Add your first sale above.","Записей пока нет. Добавьте первую операцию сбора или поступления продукции.":"No records yet. Add the first collection or product receipt operation.","Записей о здоровье пока нет. Добавьте первую проверку варроа или заболевание выше.":"No health records yet. Add the first Varroa check or disease record above.","Обработок пока нет. Укажите препарат в новой записи о здоровье.":"No treatments yet. Specify a medicine in a new health record.","Партий пока нет.":"No batches yet.","Лекарств пока нет. Добавьте первый препарат выше.":"No medicines yet. Add the first one above.","Ульев для схемы пока нет.":"No hives available for the layout yet.","Серий вывода пока нет. Добавьте первую серию выше.":"No queen-rearing batches yet. Add the first one above.","Предстоящих этапов нет. Добавьте серию вывода маток, чтобы заполнить календарь.":"No upcoming stages. Add a queen-rearing batch to populate the calendar.","История пока пуста.":"History is empty.","Осмотров по этому улью пока нет.":"No inspections for this hive yet.","Обработок по этому улью пока нет.":"No treatments for this hive yet.","Для графика нужны результаты осмотров.":"Inspection results are needed for the chart.","Добавьте ульи и осмотры — здесь появится статистика семей.":"Add hives and inspections to see colony statistics here.","Партий мёда пока нет.":"No honey batches yet.","Состояние в норме":"Condition is normal","⚠️ Требуют внимания":"⚠️ Need attention","✅ По лекарствам всё в порядке.":"✅ Medicine stock is in good shape.","Заканчиваются препараты:":"Medicines running low:","Ближайшие этапы":"Upcoming stages","Выберите материнскую семью":"Select a mother colony","Выберите стартер (необязательно)":"Select a starter (optional)","Выберите финишер (необязательно)":"Select a finisher (optional)","История маток по этому улью пока не заведена.":"No queen history has been recorded for this hive yet.","🐝 Данные пчелиной семьи":"🐝 Colony details","Примечание о семье":"Colony note"});
  Object.assign(UI_OPTIONS.be, {"🇷🇺 Русский":"🇷🇺 Русская","🇧🇾 Беларуская":"🇧🇾 Беларуская","🇬🇧 English":"🇬🇧 Англійская","Да, безвозвратно удалить":"Так, выдаліць незваротна","Поступление на склад":"Паступленне на склад","Ручное списание":"Ручное спісанне"});
  Object.assign(UI_OPTIONS.en, {"🇷🇺 Русский":"🇷🇺 Russian","🇧🇾 Беларуская":"🇧🇾 Belarusian","🇬🇧 English":"🇬🇧 English","Да, безвозвратно удалить":"Yes, delete permanently","Поступление на склад":"Stock received","Ручное списание":"Manual write-off"});


  Object.assign(UI_STATIC.be, {
    'Укажите район в разделе «Мои пасеки»':'Пазначце раён у раздзеле «Мае пчальнікі»',
    '📍 Укажите район в разделе «Мои пасеки»':'📍 Пазначце раён у раздзеле «Мае пчальнікі»',
    'Укажите район в настройках пасеки.':'Пазначце раён у наладах пчальніка.',
    'Дезинфекция':'Дэзінфекцыя','🧴 Дезинфекция':'🧴 Дэзінфекцыя',
    'Напоминания':'Напамінанні','🔔 Напоминания':'🔔 Напамінанні',
    'Последний осмотр':'Апошні агляд','Осмотров ещё не было':'Аглядаў яшчэ не было',
    'Осмотров пока нет.':'Пакуль няма аглядаў.','Осмотров по этому улью пока нет.':'Па гэтым вуллі пакуль няма аглядаў.',
    'Ближайшие обработки':'Бліжэйшыя апрацоўкі','Ближайшая обработка не назначена':'Бліжэйшая апрацоўка не прызначана',
    'Ближайшая обработка:':'Бліжэйшая апрацоўка:','Записей о дезинфекции пока нет.':'Пакуль няма запісаў пра дэзінфекцыю.',
    'Просрочено':'Пратэрмінавана','просрочено':'пратэрмінавана','сегодня':'сёння',
    'Сегодня:':'Сёння:','Ближайшее дело:':'Бліжэйшая справа:','Сегодня спокойно:':'Сёння спакойна:',
    'Сегодня спокойно: открытых задач с датой нет.':'Сёння спакойна: няма адкрытых задач з датай.',
    'Состояние семей под контролем':'Стан сем’яў пад кантролем',
    'Требуют внимания':'Патрабуюць увагі','Проверить семью':'Праверыць сям’ю',
    'Мало корма — требуется проверка':'Мала корму — патрэбна праверка',
    'Проверить состояние матки':'Праверыць стан маткі',
    'Состояние в норме':'Стан у норме','Показываем только ульи, которым сейчас нужна проверка. Остальные скрыты, чтобы главная страница оставалась компактной.':'Паказваем толькі вуллі, якія цяпер патрабуюць праверкі. Астатнія схаваны, каб галоўная старонка заставалася кампактнай.',
    'Состояние в норме':'Стан у норме','Семья сильная':'Сям’я моцная','Требует внимания':'Патрабуе ўвагі'
  });
  Object.assign(UI_STATIC.en, {
    'Укажите район в разделе «Мои пасеки»':'Set your district in “My apiaries”',
    '📍 Укажите район в разделе «Мои пасеки»':'📍 Set your district in “My apiaries”',
    'Укажите район в настройках пасеки.':'Set the district in your apiary settings.',
    'Дезинфекция':'Disinfection','🧴 Дезинфекция':'🧴 Disinfection',
    'Напоминания':'Reminders','🔔 Напоминания':'🔔 Reminders',
    'Последний осмотр':'Last inspection','Осмотров ещё не было':'No inspections yet',
    'Осмотров пока нет.':'No inspections yet.','Осмотров по этому улью пока нет.':'No inspections for this hive yet.',
    'Ближайшие обработки':'Upcoming treatments','Ближайшая обработка не назначена':'No next treatment scheduled',
    'Ближайшая обработка:':'Next treatment:','Записей о дезинфекции пока нет.':'No disinfection records yet.',
    'Просрочено':'Overdue','просрочено':'overdue','сегодня':'today',
    'Сегодня:':'Today:','Ближайшее дело:':'Next task:','Сегодня спокойно:':'All quiet today:',
    'Сегодня спокойно: открытых задач с датой нет.':'All quiet today: no open tasks with a due date.',
    'Состояние семей под контролем':'Colony status is under control',
    'Требуют внимания':'Need attention','Проверить семью':'Check colony',
    'Мало корма — требуется проверка':'Low food stores — check required',
    'Проверить состояние матки':'Check queen condition',
    'Состояние в норме':'Condition is normal','Показываем только ульи, которым сейчас нужна проверка. Остальные скрыты, чтобы главная страница оставалась компактной.':'Only hives needing attention are shown. The others are hidden to keep the home page compact.',
    'Семья сильная':'Strong colony','Требует внимания':'Needs attention'
  });
  Object.assign(UI_MESSAGES.be, {'Улей №':'Вулей №','Последний осмотр ':'Апошні агляд ','Осмотров ещё не было':'Аглядаў яшчэ не было','Дезинфекция: ':'Дэзінфекцыя: '});
  Object.assign(UI_MESSAGES.en, {'Улей №':'Hive No. ','Последний осмотр ':'Last inspection ','Осмотров ещё не было':'No inspections yet','Дезинфекция: ':'Disinfection: '});

  const UI_MESSAGES = {
    be: {'Вас пригласили в цифровой журнал. Зарегистрируйтесь или войдите, после чего владелец сможет разрешить доступ.':'Вас запрасілі ў лічбавы журнал. Зарэгіструйцеся або ўвайдзіце, пасля чаго ўладальнік зможа дазволіць доступ.','Введите email или номер телефона и пароль.':'Увядзіце email або нумар тэлефона і пароль.','Подтвердите проверку безопасности Cloudflare.':'Пацвердзіце праверку бяспекі Cloudflare.','Укажите номер в международном формате, например +375291234567.':'Укажыце нумар у міжнародным фармаце, напрыклад +375291234567.','Пароль должен содержать от 8 до 128 символов.':'Пароль павінен змяшчаць ад 8 да 128 сімвалаў.','Укажите имя, затем нажмите «Регистрация» ещё раз.':'Укажыце імя, затым націсніце «Рэгістрацыя» яшчэ раз.','Введите корректный email, указанный при регистрации.':'Увядзіце карэктны email, пазначаны пры рэгістрацыі.','Подтвердите проверку безопасности Cloudflare перед восстановлением доступа.':'Пацвердзіце праверку бяспекі Cloudflare перад аднаўленнем доступу.','Если для этого адреса зарегистрирован аккаунт, письмо со ссылкой для смены пароля отправлено. Проверьте входящие и папку «Спам».':'Калі для гэтага адраса зарэгістраваны ўліковы запіс, ліст са спасылкай для змены пароля адпраўлены. Праверце ўваходныя і папку «Спам».','Не удалось отправить письмо. Проверьте подключение и попробуйте позже.':'Не ўдалося адправіць ліст. Праверце злучэнне і паспрабуйце пазней.','Пароль должен содержать строчные и заглавные латинские буквы, цифру и специальный символ.':'Пароль павінен змяшчаць малыя і вялікія лацінскія літары, лічбу і спецыяльны сімвал.','Пароли не совпадают.':'Паролі не супадаюць.','Пароль изменён. Теперь войдите с новым паролем.':'Пароль зменены. Цяпер увайдзіце з новым паролем.','Не удалось изменить пароль. Откройте ссылку из письма ещё раз или запросите новую.':'Не ўдалося змяніць пароль. Адкрыйце спасылку з ліста яшчэ раз або запытайце новую.','Ссылка подтверждена. Установите новый пароль.':'Спасылка пацверджана. Усталюйце новы пароль.','Вход выполнен. Загружаем журнал…':'Уваход выкананы. Загружаем журнал…','Вход выполнен…':'Уваход выкананы…','Не удалось войти. Проверьте данные и попробуйте снова.':'Не ўдалося ўвайсці. Праверце даныя і паспрабуйце яшчэ раз.','Контакт удалён':'Кантакт выдалены','Запись удалена':'Запіс выдалены','Операция удалена':'Аперацыя выдалена','Фотография удалена':'Фатаграфія выдалена','Продажа удалена, остаток партии пересчитан.':'Продаж выдалены, рэшта партыі пералічана.','В гостевом режиме очистка недоступна':'У гасцявым рэжыме ачыстка недаступная','Необходимо войти как администратор.':'Неабходна ўвайсці як адміністратар.','Сначала войдите в журнал.':'Спачатку ўвайдзіце ў журнал.','Удалить эту фотографию?':'Выдаліць гэтую фатаграфію?','Понятно':'Зразумела','Установить журнал':'Усталяваць журнал','Заявка отклонена. Если это ошибка, свяжитесь с владельцем журнала.':'Заяўка адхілена. Калі гэта памылка, звяжыцеся з уладальнікам журнала.','Заявка принята и ожидает одобрения владельца журнала.':'Заяўка прынята і чакае адабрэння ўладальніка журнала.'},
    en: {'Вас пригласили в цифровой журнал. Зарегистрируйтесь или войдите, после чего владелец сможет разрешить доступ.':'You have been invited to the digital journal. Register or sign in, then the owner can grant access.','Введите email или номер телефона и пароль.':'Enter your email or phone number and password.','Подтвердите проверку безопасности Cloudflare.':'Complete the Cloudflare security check.','Укажите номер в международном формате, например +375291234567.':'Enter the number in international format, for example +375291234567.','Пароль должен содержать от 8 до 128 символов.':'Password must contain 8 to 128 characters.','Укажите имя, затем нажмите «Регистрация» ещё раз.':'Enter your name, then select “Register” again.','Введите корректный email, указанный при регистрации.':'Enter a valid email address used during registration.','Подтвердите проверку безопасности Cloudflare перед восстановлением доступа.':'Complete the Cloudflare security check before recovering access.','Если для этого адреса зарегистрирован аккаунт, письмо со ссылкой для смены пароля отправлено. Проверьте входящие и папку «Спам».':'If an account exists for this address, a password reset email has been sent. Check your inbox and spam folder.','Не удалось отправить письмо. Проверьте подключение и попробуйте позже.':'Could not send the email. Check your connection and try again later.','Пароль должен содержать строчные и заглавные латинские буквы, цифру и специальный символ.':'Password must include lowercase and uppercase Latin letters, a number, and a special character.','Пароли не совпадают.':'Passwords do not match.','Пароль изменён. Теперь войдите с новым паролем.':'Password changed. Sign in with your new password.','Не удалось изменить пароль. Откройте ссылку из письма ещё раз или запросите новую.':'Could not change the password. Open the email link again or request a new one.','Ссылка подтверждена. Установите новый пароль.':'Link confirmed. Set a new password.','Вход выполнен. Загружаем журнал…':'Signed in. Loading the journal…','Вход выполнен…':'Signed in…','Не удалось войти. Проверьте данные и попробуйте снова.':'Could not sign in. Check your details and try again.','Контакт удалён':'Contact deleted','Запись удалена':'Record deleted','Операция удалена':'Operation deleted','Фотография удалена':'Photo deleted','Продажа удалена, остаток партии пересчитан.':'Sale deleted; batch balance recalculated.','В гостевом режиме очистка недоступна':'Clearing is unavailable in guest mode','Необходимо войти как администратор.':'You must sign in as an administrator.','Сначала войдите в журнал.':'Please sign in to the journal first.','Удалить эту фотографию?':'Delete this photo?','Понятно':'Got it','Установить журнал':'Install journal','Заявка отклонена. Если это ошибка, свяжитесь с владельцем журнала.':'Your application was declined. If this is a mistake, contact the journal owner.','Заявка принята и ожидает одобрения владельца журнала.':'Your application was received and is awaiting approval from the journal owner.'}
  };
  Object.assign(UI_MESSAGES.be, {'Владелец':'Уладальнік','Пользователь':'Карыстальнік','Заявка одобрена':'Заяўка ўхвалена','Заявка отклонена':'Заяўка адхілена','Действующий доступ (старый аккаунт)':'Дзейны доступ (стары акаўнт)','Ожидает одобрения':'Чакае ўхвалення','Доступ разрешён':'Доступ дазволены','Доступ закрыт':'Доступ закрыты','Вход по телефону · ':'Уваход па тэлефоне · ','Пробный период завершён':'Пробны перыяд завершаны','Пробный период до:':'Пробны перыяд да:','Подписка до:':'Падпіска да:','Ручной доступ':'Ручны доступ','Срок истёк — требуется оплата':'Тэрмін скончыўся — патрэбна аплата','Подписка:':'Падпіска:','нет':'няма','Ни разу не входил':'Яшчэ не ўваходзіў','Недавно заходил':'Нядаўна заходзіў','Не заходил более 7 дней':'Не заходзіў больш за 7 дзён','Дата активности отсутствует':'Дата актыўнасці адсутнічае','Последний вход:':'Апошні ўваход:','Подтвердить оплату · +1 год':'Пацвердзіць аплату · +1 год','Заблокировать':'Заблакаваць','Разрешить доступ':'Дазволіць доступ','Удалить пользователя':'Выдаліць карыстальніка','Пользователей пока нет.':'Пакуль няма карыстальнікаў.','Обновление…':'Абнаўленне…','Обновить':'Абнавіць'});
  Object.assign(UI_MESSAGES.en, {'Владелец':'Owner','Пользователь':'User','Заявка одобрена':'Application approved','Заявка отклонена':'Application rejected','Действующий доступ (старый аккаунт)':'Active access (legacy account)','Ожидает одобрения':'Awaiting approval','Доступ разрешён':'Access granted','Доступ закрыт':'Access blocked','Вход по телефону · ':'Phone sign-in · ','Пробный период завершён':'Trial period ended','Пробный период до:':'Trial until:','Подписка до:':'Subscription until:','Ручной доступ':'Manual access','Срок истёк — требуется оплата':'Expired — payment required','Подписка:':'Subscription:','нет':'none','Ни разу не входил':'Never signed in','Недавно заходил':'Recently active','Не заходил более 7 дней':'Inactive for more than 7 days','Дата активности отсутствует':'No activity date','Последний вход:':'Last sign-in:','Подтвердить оплату · +1 год':'Confirm payment · +1 year','Заблокировать':'Block','Разрешить доступ':'Grant access','Удалить пользователя':'Delete user','Пользователей пока нет.':'No users yet.','Обновление…':'Refreshing…','Обновить':'Refresh'});


  // Dynamic notifications, validation and status text. User-entered records are intentionally excluded.
  Object.assign(UI_MESSAGES.be, {
    'Контактов пока нет. Добавьте поставщика или знакомого пчеловода выше.':'Пакуль няма кантактаў. Дадайце пастаўшчыка або знаёмага пчаляра вышэй.',
    'Добавить контакт':'Дадаць кантакт','В гостевом режиме контакты нельзя сохранять.':'У гасцявым рэжыме кантакты нельга захоўваць.',
    'Войдите в журнал, чтобы сохранять контакты.':'Увайдзіце ў журнал, каб захоўваць кантакты.',
    'Контакт сохранён':'Кантакт захаваны','Не удалось сохранить контакт: ':'Не ўдалося захаваць кантакт: ',
    'В гостевом режиме контакты доступны только для просмотра.':'У гасцявым рэжыме кантакты даступныя толькі для прагляду.',
    'Изменить контакт':'Змяніць кантакт','Сохранить изменения':'Захаваць змены',
    'Не удалось удалить контакт: ':'Не ўдалося выдаліць кантакт: ',
    'Войдите в журнал, чтобы загрузить настройки.':'Увайдзіце ў журнал, каб загрузіць налады.',
    'Сохранённые настройки загружены. Часовой пояс: Europe/Minsk.':'Захаваныя налады загружаны. Часавы пояс: Europe/Minsk.',
    'Показаны настройки по умолчанию. Они ещё не сохранены — нажмите «Сохранить настройки напоминаний».':'Паказаны налады па змаўчанні. Яны яшчэ не захаваны — націсніце «Захаваць налады напамінаў».',
    'Не удалось загрузить настройки: ':'Не ўдалося загрузіць налады: ',
    'В гостевом режиме настройки не сохраняются.':'У гасцявым рэжыме налады не захоўваюцца.',
    'Сохраняем настройки…':'Захоўваем налады…','Сессия закончилась. Войдите в журнал повторно.':'Сеанс скончыўся. Увайдзіце ў журнал паўторна.',
    'Выберите время с шагом 15 минут.':'Выберыце час з крокам 15 хвілін.',
    'Настройки сохранены для вашего аккаунта. Проверка выполняется каждые 15 минут; уведомление отправится в выбранное время по Литве.':'Налады захаваны для вашага акаўнта. Праверка выконваецца кожныя 15 хвілін; апавяшчэнне будзе адпраўлена ў выбраны час па Літве.',
    'Настройки напоминаний сохранены':'Налады напамінаў захаваны','Не удалось сохранить настройки: ':'Не ўдалося захаваць налады: ',
    'Не удалось обновить активность журнала:':'Не ўдалося абнавіць актыўнасць журнала:',
    'Ошибка загрузки данных: ':'Памылка загрузкі даных: ','Выберите фотографию':'Выберыце фатаграфію',
    'Нужен файл изображения':'Патрэбны файл выявы','Файл слишком большой. Максимум 10 МБ':'Файл занадта вялікі. Максімум 10 МБ',
    'Необходимо войти в журнал':'Неабходна ўвайсці ў журнал',
    'По запросу ничего не найдено.':'Па запыце нічога не знойдзена.',
    'Количество должно быть больше нуля.':'Колькасць павінна быць большай за нуль.',
    'Не удалось сохранить движение: ':'Не ўдалося захаваць рух: ','Движение склада сохранено.':'Рух складскіх запасаў захаваны.',
    'Контроль здоровья ещё не проводился':'Кантроль здароўя яшчэ не праводзіўся',
    'нет осмотра':'няма агляду','есть вопрос по здоровью':'ёсць пытанне па здароўі',
    'контроль здоровья более 30 дней назад':'кантроль здароўя быў больш за 30 дзён таму',
    'слабая семья':'слабая сям’я','состояние в норме':'стан у норме',
    'срок годности истёк':'тэрмін прыдатнасці скончыўся',
    'Убыток':'Страта','Выполнено':'Выканана','Просрочено':'Пратэрмінавана','Предстоящее':'Будучыя','Без даты':'Без даты'
  });
  Object.assign(UI_MESSAGES.en, {
    'Контактов пока нет. Добавьте поставщика или знакомого пчеловода выше.':'No contacts yet. Add a supplier or fellow beekeeper above.',
    'Добавить контакт':'Add contact','В гостевом режиме контакты нельзя сохранять.':'Contacts cannot be saved in guest mode.',
    'Войдите в журнал, чтобы сохранять контакты.':'Sign in to save contacts.',
    'Контакт сохранён':'Contact saved','Не удалось сохранить контакт: ':'Could not save contact: ',
    'В гостевом режиме контакты доступны только для просмотра.':'Contacts are read-only in guest mode.',
    'Изменить контакт':'Edit contact','Сохранить изменения':'Save changes',
    'Не удалось удалить контакт: ':'Could not delete contact: ',
    'Войдите в журнал, чтобы загрузить настройки.':'Sign in to load settings.',
    'Сохранённые настройки загружены. Часовой пояс: Europe/Minsk.':'Saved settings loaded. Time zone: Europe/Minsk.',
    'Показаны настройки по умолчанию. Они ещё не сохранены — нажмите «Сохранить настройки напоминаний».':'Default settings are shown. They have not been saved yet — select “Save reminder settings”.',
    'Не удалось загрузить настройки: ':'Could not load settings: ',
    'В гостевом режиме настройки не сохраняются.':'Settings cannot be saved in guest mode.',
    'Сохраняем настройки…':'Saving settings…','Сессия закончилась. Войдите в журнал повторно.':'Your session has expired. Sign in again.',
    'Выберите время с шагом 15 минут.':'Select a time in 15-minute increments.',
    'Настройки сохранены для вашего аккаунта. Проверка выполняется каждые 15 минут; уведомление отправится в выбранное время по Литве.':'Settings saved to your account. Checks run every 15 minutes; notifications are sent at the selected Lithuania time.',
    'Настройки напоминаний сохранены':'Reminder settings saved','Не удалось сохранить настройки: ':'Could not save settings: ',
    'Не удалось обновить активность журнала:':'Could not update journal activity:',
    'Ошибка загрузки данных: ':'Data loading error: ','Выберите фотографию':'Select a photo',
    'Нужен файл изображения':'An image file is required','Файл слишком большой. Максимум 10 МБ':'File is too large. Maximum size is 10 MB',
    'Необходимо войти в журнал':'Please sign in to the journal',
    'По запросу ничего не найдено.':'No results found.',
    'Количество должно быть больше нуля.':'Quantity must be greater than zero.',
    'Не удалось сохранить движение: ':'Could not save stock movement: ','Движение склада сохранено.':'Stock movement saved.',
    'Контроль здоровья ещё не проводился':'No health check has been performed yet',
    'нет осмотра':'no inspection','есть вопрос по здоровью':'health issue noted',
    'контроль здоровья более 30 дней назад':'health check was more than 30 days ago',
    'слабая семья':'weak colony','состояние в норме':'condition is normal',
    'срок годности истёк':'expired',
    'Убыток':'Loss','Выполнено':'Completed','Просрочено':'Overdue','Предстоящее':'Upcoming','Без даты':'No date'
  });
  // Additional system labels and weather terms. Demo descriptions and personal data stay untouched.
  Object.assign(UI_STATIC.be, {
    'Текущая':'Бягучая','Предыдущий осмотр':'Папярэдні агляд','Гостевой режим — только просмотр':'Гасцявы рэжым — толькі прагляд',
    'Официальный курс НБРБ':'Афіцыйны курс НБРБ','Резервный курс (не официальный курс НБРБ)':'Рэзервовы курс (неафіцыйны курс НБРБ)',
    'Красная':'Чырвоная','Белая':'Белая','Заменена':'Заменена','Куплена':'Куплена','Неизвестно':'Невядома',
    'ясно':'ясна','преимущественно ясно':'пераважна ясна','переменная облачность':'пераменная воблачнасць',
    'облачно':'воблачна','морось':'імжа','дождь':'дождж','сильный дождь':'моцны дождж','ливень':'ліўня','сильный ливень':'моцная залева',
    'снег':'снег','сильный снег':'моцны снег','туман':'туман','гроза':'навальніца'
  });
  Object.assign(UI_STATIC.en, {
    'Текущая':'Current','Предыдущий осмотр':'Previous inspection','Гостевой режим — только просмотр':'Guest mode — read only',
    'Официальный курс НБРБ':'Official NBRB exchange rate','Резервный курс (не официальный курс НБРБ)':'Fallback rate (not the official NBRB rate)',
    'Красная':'Red','Белая':'White','Заменена':'Replaced','Куплена':'Purchased','Неизвестно':'Unknown',
    'ясно':'Clear','преимущественно ясно':'Mainly clear','переменная облачность':'Partly cloudy',
    'облачно':'Cloudy','морось':'Drizzle','дождь':'Rain','сильный дождь':'Heavy rain','ливень':'Showers','сильный ливень':'Heavy showers',
    'снег':'Snow','сильный снег':'Heavy snow','туман':'Fog','гроза':'Thunderstorm'
  });
  // Extended interface coverage from the full Preview audit (static UI only).
  Object.assign(UI_TEXT.be, {"Начать запись":"Пачаць запіс","⏹ Остановить":"⏹ Спыніць","Разнести по полям":"Размеркаваць па палях","Очистить текст":"Ачысціць тэкст","🩺 Передать в «Здоровье семьи»":"🩺 Перанесці ў «Здароўе сям’і»","🔔 Создать напоминание":"🔔 Стварыць напамін","Перенести результат в запись":"Перанесці вынік у запіс","Прополис на остатке":"Праполіс у рэштку","Пыльца на остатке":"Пылок у рэштку","Перга на остатке":"Пярга ў рэштку","Калькуляторы пасечника":"Калькулятары пчаляра","Плотность, кг/л":"Шчыльнасць, кг/л","Заполнение банки, %":"Запаўненне слоіка, %","Сколько сиропа нужно, л":"Колькі сіропу трэба, л","Концентрация и соотношение сахар : вода (по массе)":"Канцэнтрацыя і суадносіны цукар : вада (па масе)","Ориентировочная плотность готового сиропа, кг/л":"Прыблізная шчыльнасць гатовага сіропу, кг/л","Корма на одну семью, кг":"Корму на адну сям’ю, кг","Резерв, %":"Рэзерв, %","Рамок на улей":"Рамак на вулей","Запас рамок, %":"Запас рамак, %","Вощины на рамку, г":"Вашчыны на рамку, г","Продано мёда, кг":"Прададзена мёду, кг","Цена продажи за кг, руб.":"Цана продажу за кг, руб.","Общие расходы, руб.":"Агульныя выдаткі, руб.","Доза на одну семью (из инструкции)":"Доза на адну сям’ю (з інструкцыі)","Количество семей/ульев":"Колькасць сем’яў/вулляў","Единица дозы":"Адзінка дозы","Предыдущий месяц":"Папярэдні месяц","Следующий месяц":"Наступны месяц","👑 Этап вывода маток":"👑 Этап вывядзення матак","🟡 Расчётная дата — проверьте по факту":"🟡 Разліковая дата — праверце фактычна","Всего серий":"Усяго серый","Привито ячеек":"Прышчэплена ячэек","💾 Сохранить серию":"💾 Захаваць серыю","0 серий":"0 серый","🐝 Рои, отводки и объединение семей":"🐝 Роі, адводкі і аб’яднанне сем’яў","Всего операций":"Усяго аперацый","Рои":"Роі","Отводки":"Адводкі","Объединения":"Аб’яднанні","0 операций":"0 аперацый","Номер партии *":"Нумар партыі *","Объём, кг":"Аб’ём, кг","Сохранить партию":"Захаваць партыю","Демо-пример фасовки.":"Дэманстрацыйны прыклад фасоўкі.","Ниже показаны три учебные партии. Нажмите":"Ніжэй паказаны тры навучальныя партыі. Націсніце","«QR банок»":"«QR слоікаў»",", чтобы увидеть индивидуальные QR-коды, скачать PNG или распечатать все карточки. Демо-коды не записываются в базу и не используются для реальной маркировки.":", каб убачыць індывідуальныя QR-коды, спампаваць PNG або раздрукаваць усе карткі. Дэма-коды не запісваюцца ў базу і не выкарыстоўваюцца для рэальнай маркіроўкі.","Другая масса, г":"Іншая маса, г","💾 Сохранить фасовку":"💾 Захаваць фасоўку","Загрузка фасовок...":"Загрузка фасовак...","Количество банок":"Колькасць слоікаў","💾 Записать продажу":"💾 Запісаць продаж","Нельзя продать больше доступного остатка. Добавление дохода в «Финансы» выполняется отдельной кнопкой, чтобы не создавать дубли.":"Нельга прадаць больш за даступную рэшту. Даданне даходу ў «Фінансы» выконваецца асобнай кнопкай, каб не ствараць дублікаты.","Продажи по партиям и связь с финансовым учётом.":"Продажы па партыях і сувязь з фінансавым улікам.","Загрузка продаж...":"Загрузка продажаў...","Новая операция":"Новая аперацыя","Сумма *":"Сума *","Сохранить":"Захаваць","Доходы":"Даходы","Расходы":"Выдаткі","Баланс":"Баланс","Фото сохраняется в закрытом хранилище и доступно только владельцу журнала.":"Фота захоўваецца ў закрытым сховішчы і даступнае толькі ўладальніку журнала.","Всего ульев":"Усяго вулляў","Всего осмотров":"Усяго аглядаў","Партий мёда":"Партый мёду","Финансовых операций":"Фінансавых аперацый","Записей о здоровье":"Запісаў пра здароўе","Ульев под контролем":"Вулляў пад кантролем","🟢 Сильных семей":"🟢 Моцных сем’яў","🟡 Средних семей":"🟡 Сярэдніх сем’яў","🔴 Слабых семей":"🔴 Слабых сем’яў","👑 Молодых маток":"👑 Маладых матак","⚠️ Без осмотра 14+ дней":"⚠️ Без агляду 14+ дзён","❗ Требуют внимания":"❗ Патрабуюць увагі","Новая запись":"Новы запіс","Что обрабатывали *":"Што апрацоўвалі *","Количество рамок":"Колькасць рамак","Дата обработки *":"Дата апрацоўкі *","Препарат из списка":"Прэпарат са спіса","Средство / препарат *":"Сродак / прэпарат *","Следующая обработка":"Наступная апрацоўка","Телефон":"Тэлефон","День рождения":"Дзень нараджэння","Загрузка контактов…":"Загрузка кантактаў…","Мои пасеки:":"Мае пчальнікі:","Мои ульи:":"Мае вуллі:","Название пасечника":"Назва пчаляра","Сохранить название":"Захаваць назву","Язык интерфейса":"Мова інтэрфейсу","Язык журнала":"Мова журнала","Моя учётная запись":"Мой уліковы запіс","Уведомления на телефон":"Апавяшчэнні на тэлефон","Когда напоминать":"Калі нагадваць","Получать push-напоминания":"Атрымліваць push-напаміны","Остатки лекарств":"Рэшткі лекаў","Сроки годности препаратов":"Тэрміны прыдатнасці прэпаратаў","Задачи и запланированные работы":"Задачы і запланаваныя работы","Плановая дезинфекция":"Планавая дэзінфекцыя","Дни рождения контактов":"Дні нараджэння кантактаў","Сохранить настройки напоминаний":"Захаваць налады напамінаў","Включить и проверить уведомления":"Уключыць і праверыць апавяшчэнні","Параметры по умолчанию показаны только для настройки формы и не сохранены в профиле.":"Налады па змаўчанні паказаны толькі для запаўнення формы і не захаваны ў профілі.","Push ещё не подключён на этом устройстве.":"Push яшчэ не падключаны на гэтай прыладзе.","Все ульи и пасеки":"Усе вуллі і пчальнікі","Осмотры, история работ и движения ульев":"Агляды, гісторыя работ і перамяшчэнняў вулляў","Записи здоровья, лечения и дезинфекции":"Запісы пра здароўе, лячэнне і дэзінфекцыю","Партии мёда, фасовка и QR-этикетки":"Партыі мёду, фасоўка і QR-этыкеткі","Лекарства и движение их запасов":"Лекі і рух іх запасаў","Финансовые записи и задачи":"Фінансавыя запісы і задачы","Фотографии и связанные файлы":"Фатаграфіі і звязаныя файлы","Начать восстановление":"Пачаць аднаўленне","Проверить копию":"Праверыць копію","Подтверждение удаления":"Пацвярджэнне выдалення","Для подтверждения введите точно:":"Для пацвярджэння ўвядзіце дакладна:","Скачать копию журнала для хранения или переноса. Фотографии отдельно не входят в JSON/CSV.":"Спампаваць копію журнала для захоўвання або пераносу. Фатаграфіі асобна не ўключаюцца ў JSON/CSV.","Движение лекарств CSV":"Рух лекаў CSV","Событие календаря":"Падзея календара"});
  Object.assign(UI_TEXT.en, {"Начать запись":"Start recording","⏹ Остановить":"⏹ Stop","Разнести по полям":"Distribute into fields","Очистить текст":"Clear text","🩺 Передать в «Здоровье семьи»":"🩺 Transfer to “Colony health”","🔔 Создать напоминание":"🔔 Create reminder","Перенести результат в запись":"Move result to record","Прополис на остатке":"Propolis in stock","Пыльца на остатке":"Pollen in stock","Перга на остатке":"Bee bread in stock","Калькуляторы пасечника":"Beekeeper calculators","Плотность, кг/л":"Density, kg/L","Заполнение банки, %":"Jar fill, %","Сколько сиропа нужно, л":"Syrup required, L","Концентрация и соотношение сахар : вода (по массе)":"Concentration and sugar-to-water ratio (by weight)","Ориентировочная плотность готового сиропа, кг/л":"Estimated finished syrup density, kg/L","Корма на одну семью, кг":"Feed per colony, kg","Резерв, %":"Reserve, %","Рамок на улей":"Frames per hive","Запас рамок, %":"Spare frames, %","Вощины на рамку, г":"Foundation per frame, g","Продано мёда, кг":"Honey sold, kg","Цена продажи за кг, руб.":"Sale price per kg, BYN","Общие расходы, руб.":"Total expenses, BYN","Доза на одну семью (из инструкции)":"Dose per colony (from instructions)","Количество семей/ульев":"Number of colonies/hives","Единица дозы":"Dose unit","Предыдущий месяц":"Previous month","Следующий месяц":"Next month","👑 Этап вывода маток":"👑 Queen-rearing stage","🟡 Расчётная дата — проверьте по факту":"🟡 Estimated date — verify actual date","Всего серий":"Total batches","Привито ячеек":"Cells grafted","💾 Сохранить серию":"💾 Save batch","0 серий":"0 batches","🐝 Рои, отводки и объединение семей":"🐝 Swarms, splits and colony mergers","Всего операций":"Total operations","Рои":"Swarms","Отводки":"Splits","Объединения":"Mergers","0 операций":"0 operations","Номер партии *":"Batch number *","Объём, кг":"Volume, kg","Сохранить партию":"Save batch","Демо-пример фасовки.":"Packaging demo.","Ниже показаны три учебные партии. Нажмите":"Three sample batches are shown below. Select","«QR банок»":"“Jar QR codes”",", чтобы увидеть индивидуальные QR-коды, скачать PNG или распечатать все карточки. Демо-коды не записываются в базу и не используются для реальной маркировки.":", to view individual QR codes, download PNG files or print all cards. Demo codes are not saved to the database and are not used for real product labelling.","Другая масса, г":"Other weight, g","💾 Сохранить фасовку":"💾 Save packaging","Загрузка фасовок...":"Loading packaging...","Количество банок":"Number of jars","💾 Записать продажу":"💾 Record sale","Нельзя продать больше доступного остатка. Добавление дохода в «Финансы» выполняется отдельной кнопкой, чтобы не создавать дубли.":"You cannot sell more than the available balance. Add the income to “Finances” using the separate button to avoid duplicates.","Продажи по партиям и связь с финансовым учётом.":"Batch sales and links to financial records.","Загрузка продаж...":"Loading sales...","Новая операция":"New operation","Сумма *":"Amount *","Сохранить":"Save","Доходы":"Income","Расходы":"Expenses","Баланс":"Balance","Фото сохраняется в закрытом хранилище и доступно только владельцу журнала.":"Photos are stored privately and are available only to the journal owner.","Всего ульев":"Total hives","Всего осмотров":"Total inspections","Партий мёда":"Honey batches","Финансовых операций":"Financial operations","Записей о здоровье":"Health records","Ульев под контролем":"Hives monitored","🟢 Сильных семей":"🟢 Strong colonies","🟡 Средних семей":"🟡 Medium colonies","🔴 Слабых семей":"🔴 Weak colonies","👑 Молодых маток":"👑 Young queens","⚠️ Без осмотра 14+ дней":"⚠️ Not inspected for 14+ days","❗ Требуют внимания":"❗ Need attention","Новая запись":"New record","Что обрабатывали *":"Treatment target *","Количество рамок":"Number of frames","Дата обработки *":"Treatment date *","Препарат из списка":"Medicine from list","Средство / препарат *":"Product / medicine *","Следующая обработка":"Next treatment","Телефон":"Phone","День рождения":"Birthday","Загрузка контактов…":"Loading contacts…","Мои пасеки:":"My apiaries:","Мои ульи:":"My hives:","Название пасечника":"Beekeeper name","Сохранить название":"Save name","Язык интерфейса":"Interface language","Язык журнала":"Journal language","Моя учётная запись":"My account","Уведомления на телефон":"Phone notifications","Когда напоминать":"When to remind","Получать push-напоминания":"Receive push reminders","Остатки лекарств":"Medicine stock levels","Сроки годности препаратов":"Medicine expiry dates","Задачи и запланированные работы":"Tasks and scheduled work","Плановая дезинфекция":"Scheduled disinfection","Дни рождения контактов":"Contact birthdays","Сохранить настройки напоминаний":"Save reminder settings","Включить и проверить уведомления":"Enable and test notifications","Параметры по умолчанию показаны только для настройки формы и не сохранены в профиле.":"Default settings are shown only to configure the form and have not been saved to your profile.","Push ещё не подключён на этом устройстве.":"Push notifications are not connected on this device.","Все ульи и пасеки":"All hives and apiaries","Осмотры, история работ и движения ульев":"Inspections, work history and hive movements","Записи здоровья, лечения и дезинфекции":"Health, treatment and disinfection records","Партии мёда, фасовка и QR-этикетки":"Honey batches, packaging and QR labels","Лекарства и движение их запасов":"Medicines and stock movements","Финансовые записи и задачи":"Financial records and tasks","Фотографии и связанные файлы":"Photos and related files","Начать восстановление":"Start restore","Проверить копию":"Check backup","Подтверждение удаления":"Deletion confirmation","Для подтверждения введите точно:":"To confirm, enter exactly:","Скачать копию журнала для хранения или переноса. Фотографии отдельно не входят в JSON/CSV.":"Download a journal backup for storage or transfer. Photos are not included in JSON/CSV.","Движение лекарств CSV":"Medicine movements CSV","Событие календаря":"Calendar event"});
  Object.assign(UI_STATIC.be, {"Укажите район в разделе «Мои пасеки»":"Укажыце раён у раздзеле «Мае пчальнікі»","📍 Укажите район в разделе «Мои пасеки»":"📍 Укажыце раён у раздзеле «Мае пчальнікі»","Укажите район в настройках пасеки.":"Укажыце раён у наладах пчальніка.","Месяц":"Месяц","Район":"Раён","Дезинфекция":"Дэзінфекцыя","Напоминания":"Напаміны","Улей":"Вулей","Осмотры":"Агляды","Район не указан":"Раён не пазначаны","Место / район":"Месца / раён","Добавить осмотр":"Дадаць агляд","Последние осмотры":"Апошнія агляды","Все осмотры":"Усе агляды","Осмотр":"Агляд","Новый осмотр":"Новы агляд","Открыть осмотры":"Адкрыць агляды","Записей о дезинфекции пока нет.":"Пакуль няма запісаў пра дэзінфекцыю.","Дезинфекция: ":"Дэзінфекцыя: ","Ближайшие обработки":"Бліжэйшыя апрацоўкі","Ближайшая обработка:":"Бліжэйшая апрацоўка:","Ближайшая обработка не назначена":"Бліжэйшая апрацоўка не прызначана","Способ:":"Спосаб:","Причина:":"Прычына:","Следующая:":"Наступная:","Обработок пока нет.":"Пакуль няма апрацовак.","Напоминаний пока нет.":"Пакуль няма напамінаў.","Активных задач нет.":"Актыўных задач няма.","Для выбранного раздела напоминаний нет.":"Для выбранага раздзела напамінаў няма.","Просрочено":"Пратэрмінавана","Сегодня":"Сёння","Предстоящее":"Будучыя","Последний осмотр":"Апошні агляд","Осмотров ещё не было":"Аглядаў яшчэ не было","Осмотров по этому улью пока нет.":"Па гэтым вуллі пакуль няма аглядаў.","Осмотров пока нет.":"Пакуль няма аглядаў.","По заданным фильтрам ульев не найдено.":"Па зададзеных фільтрах вуллі не знойдзеныя.","Ульев пока нет. Добавьте первый улей выше.":"Вулляў пакуль няма. Дадайце першы вулей вышэй.","Пасек пока нет. Добавьте первую пасеку выше.":"Пчальнікаў пакуль няма. Дадайце першы пчальнік вышэй.","Состояние семьи":"Стан сям’і","Сила семьи":"Сіла сям’і","Матка":"Матка","Расплод":"Расплод","Корм":"Корм","Заметки":"Нататкі","Семья":"Сям’я","Не указано":"Не пазначана","Не указана":"Не пазначана","Место не указано":"Месца не пазначана","Тип не указан":"Тып не пазначаны","Пасека не указана":"Пчальнік не пазначаны","Без примечания":"Без заўвагі","Без заметок":"Без нататак","Начало облёта":"Пачатак аблёту","Окончание облёта":"Заканчэнне аблёту","Сильная":"Моцная","Средняя":"Сярэдняя","Слабая":"Слабая","В работе":"У працы","Завершена":"Завершана","Запланирована":"Запланавана","Неудачная":"Няўдалая","На облёте":"На аблёце","Наведите камерой телефона. После входа откроется карточка этого улья.":"Навядзіце камеру тэлефона. Пасля ўваходу адкрыецца картка гэтага вулля.","QR-коды банок":"QR-коды слоікаў","Открыть ссылку":"Адкрыць спасылку","ДЕМО-РЕЖИМ: это учебные QR-коды. Они не записываются в базу и не являются маркировкой реальной продукции.":"ДЭМА-РЭЖЫМ: гэта навучальныя QR-коды. Яны не запісваюцца ў базу і не з’яўляюцца маркіроўкай рэальнай прадукцыі.","Событий пока нет. Нажмите «Добавить событие».":"Падзей пакуль няма. Націсніце «Дадаць падзею».","Добавить событие":"Дадаць падзею","Плановая дата":"Планавая дата","Расчётная дата":"Разліковая дата","Войти в журнал, чтобы загрузить пользователей.":"Увайдзіце ў журнал, каб загрузіць карыстальнікаў.","Ни разу не входил":"Яшчэ не ўваходзіў","Недавно заходил":"Нядаўна заходзіў","Не заходил более 7 дней":"Не заходзіў больш за 7 дзён","Пользователей пока нет.":"Пакуль няма карыстальнікаў.","Не удалось обновить список: ":"Не ўдалося абнавіць спіс: "});
  Object.assign(UI_STATIC.en, {"Укажите район в разделе «Мои пасеки»":"Set the district in “My apiaries”","📍 Укажите район в разделе «Мои пасеки»":"📍 Set the district in “My apiaries”","Укажите район в настройках пасеки.":"Set the district in your apiary settings.","Месяц":"Month","Район":"District","Дезинфекция":"Disinfection","Напоминания":"Reminders","Улей":"Hive","Осмотры":"Inspections","Район не указан":"District not specified","Добавить осмотр":"Add inspection","Последние осмотры":"Recent inspections","Все осмотры":"All inspections","Осмотр":"Inspection","Новый осмотр":"New inspection","Открыть осмотры":"Open inspections","Записей о дезинфекции пока нет.":"No disinfection records yet.","Дезинфекция: ":"Disinfection: ","Ближайшие обработки":"Upcoming treatments","Ближайшая обработка:":"Next treatment:","Ближайшая обработка не назначена":"No next treatment scheduled","Способ:":"Method:","Причина:":"Reason:","Следующая:":"Next:","Обработок пока нет.":"No treatments yet.","Напоминаний пока нет.":"No reminders yet.","Активных задач нет.":"No active tasks.","Для выбранного раздела напоминаний нет.":"No reminders in this category.","Просрочено":"Overdue","Сегодня":"Today","Предстоящее":"Upcoming","Последний осмотр":"Last inspection","Осмотров ещё не было":"No inspections yet","Осмотров по этому улью пока нет.":"No inspections for this hive yet.","Осмотров пока нет.":"No inspections yet.","По заданным фильтрам ульев не найдено.":"No hives match the selected filters.","Ульев пока нет. Добавьте первый улей выше.":"No hives yet. Add your first hive above.","Пасек пока нет. Добавьте первую пасеку выше.":"No apiaries yet. Add your first apiary above.","Состояние семьи":"Colony condition","Сила семьи":"Colony strength","Матка":"Queen","Расплод":"Brood","Корм":"Food stores","Заметки":"Notes","Семья":"Colony","Не указано":"Not specified","Не указана":"Not specified","Место не указано":"Location not specified","Тип не указан":"Type not specified","Пасека не указана":"Apiary not specified","Без примечания":"No note","Без заметок":"No notes","Начало облёта":"Mating flight start","Окончание облёта":"Mating flight end","Сильная":"Strong","Средняя":"Medium","Слабая":"Weak","В работе":"In progress","Завершена":"Completed","Запланирована":"Scheduled","Неудачная":"Unsuccessful","На облёте":"On mating flight","Наведите камерой телефона. После входа откроется карточка этого улья.":"Scan with your phone camera. After signing in, this hive card will open.","QR-коды банок":"Jar QR codes","Открыть ссылку":"Open link","ДЕМО-РЕЖИМ: это учебные QR-коды. Они не записываются в базу и не являются маркировкой реальной продукции.":"DEMO MODE: these are sample QR codes. They are not saved to the database and are not labels for real products.","Событий пока нет. Нажмите «Добавить событие».":"No events yet. Select “Add event”.","Добавить событие":"Add event","Плановая дата":"Scheduled date","Расчётная дата":"Estimated date","Войти в журнал, чтобы загрузить пользователей.":"Sign in to load users.","Ни разу не входил":"Never signed in","Недавно заходил":"Recently active","Не заходил более 7 дней":"Inactive for more than 7 days","Пользователей пока нет.":"No users yet.","Не удалось обновить список: ":"Could not refresh the list: "});

  // Labels and dynamic text prefixes used by forms and live status cards.
  Object.assign(UI_TEXT.be, {
    'Месяц':'Месяц','Район':'Раён','Улей':'Вулей','Осмотры':'Агляды',
    'Дата осмотра':'Дата агляду','Дата следующего осмотра':'Дата наступнага агляду',
    'Район пасеки':'Раён пчальніка','Выберите район':'Выберыце раён',
    'Причина дезинфекции':'Прычына дэзінфекцыі','Средство для дезинфекции':'Сродак для дэзінфекцыі',
    'Объект дезинфекции':'Аб’ект дэзінфекцыі','Дата дезинфекции':'Дата дэзінфекцыі',
    'Следующая дата':'Наступная дата','Дата напоминания':'Дата напаміну'
  });
  Object.assign(UI_TEXT.en, {
    'Месяц':'Month','Район':'District','Улей':'Hive','Осмотры':'Inspections',
    'Дата осмотра':'Inspection date','Дата следующего осмотра':'Next inspection date',
    'Район пасеки':'Apiary district','Выберите район':'Select district',
    'Причина дезинфекции':'Disinfection reason','Средство для дезинфекции':'Disinfectant',
    'Объект дезинфекции':'Disinfection target','Дата дезинфекции':'Disinfection date',
    'Следующая дата':'Next date','Дата напоминания':'Reminder date'
  });
  let current='ru', client=null, user=null;
  function valid(lang){return LANGS.includes(lang)?lang:'ru'}
  function translateMessage(message){const source=String(message??'');const map=UI_MESSAGES[current]||{};if(map[source]!==undefined)return map[source];const prefix=Object.keys(map).filter(key=>key.length>3&&(key.endsWith(': ')||key.endsWith('· '))).sort((a,b)=>b.length-a.length).find(key=>source.startsWith(key));return prefix?map[prefix]+source.slice(prefix.length):source;}
  function queryAll(root,selector){const found=Array.from(root.querySelectorAll(selector));if(root.nodeType===1&&root.matches(selector))found.unshift(root);return found;}
  function applyTextMap(el,map,attribute){
    if(el.parentElement?.closest('[data-i18n-text-mapped="1"]'))return;
    const original=el.dataset[attribute]??(el.textContent||'').replace(/\s+/g,' ').trim();
    if(!el.dataset[attribute])el.dataset[attribute]=original;
    let translated=map[original];
    if(translated===undefined){
      const prefix=Object.keys(map).filter(key=>key.length>2&&(key.endsWith(': ')||key.endsWith('№'))).sort((a,b)=>b.length-a.length).find(key=>original.startsWith(key));
      if(prefix)translated=map[prefix]+original.slice(prefix.length);
    }
    if(translated===undefined)return;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    if(!nodes.length){el.textContent=translated;return;}
    nodes[0].nodeValue=translated;
    for(let i=1;i<nodes.length;i++)nodes[i].nodeValue='';
    if(el.children.length)el.dataset.i18nTextMapped='1';
  }
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
    const staticMap=UI_STATIC[current]||{};
    queryAll(root,'#app .section > h1, #app .section > p.sub, #app .section .panel > h3, #app .section .section-head h3, #app .section .section-head .muted, #app .section .panel > .muted, #app .hero h2, #app .hero > .sub, #app .eyebrow, #app h1, #app h2, #app h3, #app h4, #app p, #app li, #app small, #app b, #app strong, #app button, #app .muted, #app .empty, #app .mobile-quick-actions b, #app .hive-card-grid small, #app .hive-health-badge, #app .task-badge, #app .medicine-mobile-grid small, #app .disinfection-mobile-meta span, #app .finance-mobile-top b, #app .home-view span, #app .section span, .map-promo-title, .map-promo-subtitle, .map-promo-cta').forEach(el=>applyTextMap(el,staticMap,'i18nStaticOriginal'));
    const uiMap=UI_TEXT[current]||{};
    queryAll(root,'label,button').forEach(el=>{
      if(el.tagName==='LABEL'&&el.querySelector('input,select,textarea,button'))return;
      applyTextMap(el,uiMap,'i18nOriginal');
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
        records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)apply(node);else if(node.nodeType===3){const parent=node.parentElement;if(parent&&(parent.id==='authMessage'||parent.id==='recoveryMessage')){const translated=translateMessage(node.textContent);if(translated!==node.textContent)node.textContent=translated;}}}));
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