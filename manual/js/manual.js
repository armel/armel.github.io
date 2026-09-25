(() => {
  'use strict';

  const icons = {
    home: '<svg viewBox="0 0 24 24"><path d="m3 11 9-8 9 8v9H3z"/><path d="M9 20v-6h6v6"/></svg>',
    play: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4z"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24"><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
    video: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 4-2v8l-4-2z"/></svg>',
    radio: '<svg viewBox="0 0 24 24"><path d="M6 4h12v16H6zM9 8h6"/><circle cx="10" cy="13" r="1"/><circle cx="14" cy="13" r="1"/><path d="M10 17h4M8 4l6-2"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h.01M11 9h.01M15 9h.01M19 9h.01M7 13h.01M11 13h.01M15 13h.01M19 13h.01M8 16h8"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    scan: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M6 15h2l2-6 3 9 3-12 2 9h3"/></svg>',
    spectrum: '<svg viewBox="0 0 24 24"><path d="M3 20h18M5 17v-4M9 17V8M13 17V4M17 17v-7M21 17v-2"/></svg>',
    fm: '<svg viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="12" rx="2"/><path d="m7 7 10-4M8 12h5M8 15h3"/><circle cx="17" cy="14" r="1.5"/></svg>',
    sliders: '<svg viewBox="0 0 24 24"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>',
    transfer: '<svg viewBox="0 0 24 24"><path d="M7 7h13l-3-3M20 7l-3 3M17 17H4l3-3M4 17l3 3"/></svg>',
    target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
    beacon: '<svg viewBox="0 0 24 24"><path d="M12 13v8M8 21h8M10 13h4l-2-9z"/><path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11"/></svg>',
    apps: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    reference: '<svg viewBox="0 0 24 24"><path d="M5 3h11l4 4v14H5zM16 3v5h5M9 12h7M9 16h7M9 8h2"/></svg>',
    slots: '<svg viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></svg>',
    chip: '<svg viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>',
    monitor: '<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M8 21h8M12 18v3"/></svg>',
    bolt: '<svg viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    help: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.3 2.1c-.8.4-1.1.9-1.1 1.9M12 17h.01"/></svg>'
  };

  const groups = [
    { title: 'Start here', pages: [
      ['home', 'Overview', 'home', 'Home.md'],
      ['getting-started', 'Getting started', 'play', 'Getting-started.md'],
      ['recent-changes', 'What’s new', 'sparkle', 'Recent-changes.md'],
      ['videos-and-tutorials', 'Videos & tutorials', 'video', 'Videos-and-tutorials.md']
    ]},
    { title: 'Use the radio', pages: [
      ['radio-operation', 'Radio operation', 'radio', 'Radio-operation.md'],
      ['button-functions', 'Buttons & shortcuts', 'keyboard', 'Button-functions.md'],
      ['menu', 'Menu operation', 'menu', 'Menu.md'],
      ['scanning', 'Scanning', 'scan', 'Scanning.md'],
      ['spectrum-analyzer', 'Spectrum analyzer', 'spectrum', 'Spectrum-analyzer.md'],
      ['fm-broadcast-radio', 'FM broadcast radio', 'fm', 'FM-broadcast-radio-receiver.md'],
      ['advanced-features', 'Advanced features', 'sliders', 'Advanced-features.md']
    ]},
    { title: 'Applications', pages: [
      ['aircopy', 'AirCopy', 'transfer', 'AirCopy.md'],
      ['foxhunt', 'FoxHunt', 'target', 'Fox-Hunt.md'],
      ['beacon', 'Beacon', 'beacon', 'Beacon.md'],
      ['overlay-apps', 'Overlay apps', 'apps', 'Overlay-apps.md'],
      ['overlay-applications', 'Application reference', 'reference', 'Overlay-applications.md']
    ]},
    { title: 'Configuration & tools', pages: [
      ['multiboot', 'Multiboot & Multiconfig', 'slots', 'Multiboot-and-Multiconfig.md'],
      ['programming-with-chirp', 'Programming with CHIRP', 'chip', 'Programming-with-CHIRP.md'],
      ['uv-studio', 'UV Studio', 'monitor', 'UV-Studio.md']
    ]},
    { title: 'Support', pages: [
      ['troubleshooting', 'Troubleshooting', 'help', 'Troubleshooting.md']
    ]}
  ];

  const navigationPages = groups.flatMap(group => group.pages.map(page => ({
    id: page[0], title: page[1], icon: page[2], file: page[3], group: group.title
  })));
  const pages = [...navigationPages, {
    id: 'foxhunt-and-beacon-history',
    title: 'FoxHunt and Beacon history',
    icon: 'target',
    file: 'Fox-Hunt-and-Beacon.md',
    group: 'Application history'
  }];
  const byId = new Map(pages.map(page => [page.id, page]));
  const byFile = new Map(pages.map(page => [page.file.replace(/\.md$/i, '').toLowerCase(), page]));
  const cache = new Map();
  const searchDocuments = [];
  let searchIndexPromise = null;

  const locales = {
    en: {
      groups: {}, pages: {},
      ui: {
        documentation: 'Documentation', onThisPage: 'On this page', previous: '← Previous', next: 'Next →',
        loading: 'Loading documentation…', unavailable: 'Page unavailable', returnHome: 'Return to the manual overview',
        search: 'Search documentation', searchShort: 'Search', searchPlaceholder: 'Search the manual…',
        searchHint: 'Search commands, features, applications or troubleshooting topics.',
        searchMinimum: 'Enter at least two characters to search the complete manual.', indexing: 'Indexing the manual…',
        noResult: 'No result for', footer: 'F4HWN custom firmware documentation', sidebarFooter: 'UV Manual · v6.1 documentation', wiki: 'View the Wiki ↗', linkTo: 'Link to',
        callouts: { note: 'Note', tip: 'Tip', important: 'Important', warning: 'Warning', caution: 'Caution' }
      }
    },
    fr: {
      groups: {
        'Start here': 'Bien démarrer', 'Use the radio': 'Utiliser la radio', Applications: 'Applications',
        'Configuration & tools': 'Configuration et outils', Support: 'Assistance',
        'Application history': 'Historique des applications'
      },
      pages: {
        home: 'Vue d’ensemble', 'getting-started': 'Bien démarrer', 'recent-changes': 'Nouveautés',
        'videos-and-tutorials': 'Vidéos et tutoriels', 'radio-operation': 'Utilisation de la radio',
        'button-functions': 'Boutons et raccourcis', menu: 'Menu', scanning: 'Scan',
        'spectrum-analyzer': 'Analyseur de spectre', 'fm-broadcast-radio': 'Radio FM',
        'advanced-features': 'Fonctions avancées', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Applications overlay', 'overlay-applications': 'Référence des applications',
        multiboot: 'Multiboot et Multiconfig', 'programming-with-chirp': 'Programmation avec CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Dépannage',
        'foxhunt-and-beacon-history': 'Historique de FoxHunt et Beacon'
      },
      ui: {
        documentation: 'Documentation', onThisPage: 'Sur cette page', previous: '← Précédent', next: 'Suivant →',
        loading: 'Chargement de la documentation…', unavailable: 'Page indisponible', returnHome: 'Revenir à l’accueil du manuel',
        search: 'Rechercher dans la documentation', searchShort: 'Rechercher', searchPlaceholder: 'Rechercher dans le manuel…',
        searchHint: 'Recherchez une commande, une fonction, une application ou une solution.',
        searchMinimum: 'Saisissez au moins deux caractères pour rechercher dans le manuel.', indexing: 'Indexation du manuel…',
        noResult: 'Aucun résultat pour', footer: 'Documentation du firmware personnalisé F4HWN', sidebarFooter: 'UV Manual · documentation v6.1', wiki: 'Voir le Wiki ↗', linkTo: 'Lien vers',
        callouts: { note: 'Remarque', tip: 'Astuce', important: 'Important', warning: 'Avertissement', caution: 'Attention' }
      }
    },
    it: {
      groups: {
        'Start here': 'Per iniziare', 'Use the radio': 'Usare la radio', Applications: 'Applicazioni',
        'Configuration & tools': 'Configurazione e strumenti', Support: 'Assistenza',
        'Application history': 'Cronologia delle applicazioni'
      },
      pages: {
        home: 'Panoramica', 'getting-started': 'Per iniziare', 'recent-changes': 'Novità',
        'videos-and-tutorials': 'Video e tutorial', 'radio-operation': 'Uso della radio',
        'button-functions': 'Pulsanti e scorciatoie', menu: 'Menu', scanning: 'Scansione',
        'spectrum-analyzer': 'Analizzatore di spettro', 'fm-broadcast-radio': 'Radio FM',
        'advanced-features': 'Funzioni avanzate', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Applicazioni overlay', 'overlay-applications': 'Riferimento applicazioni',
        multiboot: 'Multiboot e Multiconfig', 'programming-with-chirp': 'Programmazione con CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Risoluzione dei problemi',
        'foxhunt-and-beacon-history': 'Cronologia di FoxHunt e Beacon'
      },
      ui: {
        documentation: 'Documentazione', onThisPage: 'In questa pagina', previous: '← Precedente', next: 'Successiva →',
        loading: 'Caricamento della documentazione…', unavailable: 'Pagina non disponibile', returnHome: 'Torna alla panoramica del manuale',
        search: 'Cerca nella documentazione', searchShort: 'Cerca', searchPlaceholder: 'Cerca nel manuale…',
        searchHint: 'Cerca comandi, funzioni, applicazioni o soluzioni ai problemi.',
        searchMinimum: 'Inserisci almeno due caratteri per cercare nel manuale.', indexing: 'Indicizzazione del manuale…',
        noResult: 'Nessun risultato per', footer: 'Documentazione del firmware personalizzato F4HWN', sidebarFooter: 'UV Manual · documentazione v6.1', wiki: 'Visualizza il Wiki ↗', linkTo: 'Link a',
        callouts: { note: 'Nota', tip: 'Suggerimento', important: 'Importante', warning: 'Avvertenza', caution: 'Attenzione' }
      }
    },
    es: {
      groups: {
        'Start here': 'Primeros pasos', 'Use the radio': 'Usar la radio', Applications: 'Aplicaciones',
        'Configuration & tools': 'Configuración y herramientas', Support: 'Asistencia',
        'Application history': 'Historial de aplicaciones'
      },
      pages: {
        home: 'Descripción general', 'getting-started': 'Primeros pasos', 'recent-changes': 'Novedades',
        'videos-and-tutorials': 'Vídeos y tutoriales', 'radio-operation': 'Uso de la radio',
        'button-functions': 'Botones y atajos', menu: 'Menú', scanning: 'Escaneo',
        'spectrum-analyzer': 'Analizador de espectro', 'fm-broadcast-radio': 'Radio FM',
        'advanced-features': 'Funciones avanzadas', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Aplicaciones overlay', 'overlay-applications': 'Referencia de aplicaciones',
        multiboot: 'Multiboot y Multiconfig', 'programming-with-chirp': 'Programación con CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Solución de problemas',
        'foxhunt-and-beacon-history': 'Historial de FoxHunt y Beacon'
      },
      ui: {
        documentation: 'Documentación', onThisPage: 'En esta página', previous: '← Anterior', next: 'Siguiente →',
        loading: 'Cargando la documentación…', unavailable: 'Página no disponible', returnHome: 'Volver a la descripción general del manual',
        search: 'Buscar en la documentación', searchShort: 'Buscar', searchPlaceholder: 'Buscar en el manual…',
        searchHint: 'Busque comandos, funciones, aplicaciones o soluciones a problemas.',
        searchMinimum: 'Introduzca al menos dos caracteres para buscar en el manual.', indexing: 'Indexando el manual…',
        noResult: 'Ningún resultado para', footer: 'Documentación del firmware personalizado F4HWN', sidebarFooter: 'UV Manual · documentación v6.1', wiki: 'Ver el Wiki ↗', linkTo: 'Enlace a',
        callouts: { note: 'Nota', tip: 'Consejo', important: 'Importante', warning: 'Advertencia', caution: 'Precaución' }
      }
    },
    de: {
      groups: {
        'Start here': 'Erste Schritte', 'Use the radio': 'Funkgerät verwenden', Applications: 'Anwendungen',
        'Configuration & tools': 'Konfiguration und Werkzeuge', Support: 'Hilfe',
        'Application history': 'Anwendungsverlauf'
      },
      pages: {
        home: 'Übersicht', 'getting-started': 'Erste Schritte', 'recent-changes': 'Neuigkeiten',
        'videos-and-tutorials': 'Videos und Anleitungen', 'radio-operation': 'Funkbetrieb',
        'button-functions': 'Tasten und Kurzbefehle', menu: 'Menü', scanning: 'Scannen',
        'spectrum-analyzer': 'Spektrumanalysator', 'fm-broadcast-radio': 'UKW-Radio',
        'advanced-features': 'Erweiterte Funktionen', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Overlay-Apps', 'overlay-applications': 'Anwendungsreferenz',
        multiboot: 'Multiboot und Multiconfig', 'programming-with-chirp': 'Programmierung mit CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Fehlerbehebung',
        'foxhunt-and-beacon-history': 'Verlauf von FoxHunt und Beacon'
      },
      ui: {
        documentation: 'Dokumentation', onThisPage: 'Auf dieser Seite', previous: '← Zurück', next: 'Weiter →',
        loading: 'Dokumentation wird geladen…', unavailable: 'Seite nicht verfügbar', returnHome: 'Zurück zur Übersicht des Handbuchs',
        search: 'Dokumentation durchsuchen', searchShort: 'Suchen', searchPlaceholder: 'Handbuch durchsuchen…',
        searchHint: 'Nach Befehlen, Funktionen, Anwendungen oder Problemlösungen suchen.',
        searchMinimum: 'Geben Sie mindestens zwei Zeichen ein, um das Handbuch zu durchsuchen.', indexing: 'Handbuch wird indiziert…',
        noResult: 'Kein Ergebnis für', footer: 'Dokumentation der angepassten F4HWN-Firmware', sidebarFooter: 'UV Manual · Dokumentation v6.1', wiki: 'Wiki anzeigen ↗', linkTo: 'Link zu',
        callouts: { note: 'Hinweis', tip: 'Tipp', important: 'Wichtig', warning: 'Warnung', caution: 'Vorsicht' }
      }
    },
    pt: {
      groups: {
        'Start here': 'Primeiros passos', 'Use the radio': 'Utilizar o rádio', Applications: 'Aplicações',
        'Configuration & tools': 'Configuração e ferramentas', Support: 'Ajuda',
        'Application history': 'Histórico das aplicações'
      },
      pages: {
        home: 'Visão geral', 'getting-started': 'Primeiros passos', 'recent-changes': 'Novidades',
        'videos-and-tutorials': 'Vídeos e tutoriais', 'radio-operation': 'Utilização do rádio',
        'button-functions': 'Botões e atalhos', menu: 'Menu', scanning: 'Varredura',
        'spectrum-analyzer': 'Analisador de espectro', 'fm-broadcast-radio': 'Rádio FM',
        'advanced-features': 'Funcionalidades avançadas', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Aplicações overlay', 'overlay-applications': 'Referência das aplicações',
        multiboot: 'Multiboot e Multiconfig', 'programming-with-chirp': 'Programação com CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Resolução de problemas',
        'foxhunt-and-beacon-history': 'Histórico do FoxHunt e Beacon'
      },
      ui: {
        documentation: 'Documentação', onThisPage: 'Nesta página', previous: '← Anterior', next: 'Seguinte →',
        loading: 'A carregar a documentação…', unavailable: 'Página indisponível', returnHome: 'Voltar à visão geral do manual',
        search: 'Pesquisar na documentação', searchShort: 'Pesquisar', searchPlaceholder: 'Pesquisar no manual…',
        searchHint: 'Pesquise comandos, funcionalidades, aplicações ou soluções para problemas.',
        searchMinimum: 'Introduza pelo menos dois caracteres para pesquisar no manual.', indexing: 'A indexar o manual…',
        noResult: 'Nenhum resultado para', footer: 'Documentação do firmware personalizado F4HWN', sidebarFooter: 'UV Manual · documentação v6.1', wiki: 'Ver o Wiki ↗', linkTo: 'Ligação para',
        callouts: { note: 'Nota', tip: 'Dica', important: 'Importante', warning: 'Aviso', caution: 'Cuidado' }
      }
    },
    ru: {
      groups: {
        'Start here': 'Начало работы', 'Use the radio': 'Работа с радиостанцией', Applications: 'Приложения',
        'Configuration & tools': 'Настройка и инструменты', Support: 'Поддержка',
        'Application history': 'История приложений'
      },
      pages: {
        home: 'Обзор', 'getting-started': 'Начало работы', 'recent-changes': 'Что нового',
        'videos-and-tutorials': 'Видео и руководства', 'radio-operation': 'Работа с радиостанцией',
        'button-functions': 'Кнопки и сочетания', menu: 'Меню', scanning: 'Сканирование',
        'spectrum-analyzer': 'Анализатор спектра', 'fm-broadcast-radio': 'FM-радио',
        'advanced-features': 'Расширенные функции', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Оверлейные приложения', 'overlay-applications': 'Справочник приложений',
        multiboot: 'Multiboot и Multiconfig', 'programming-with-chirp': 'Программирование с CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Устранение неполадок',
        'foxhunt-and-beacon-history': 'История FoxHunt и Beacon'
      },
      ui: {
        documentation: 'Документация', onThisPage: 'На этой странице', previous: '← Назад', next: 'Далее →',
        loading: 'Загрузка документации…', unavailable: 'Страница недоступна', returnHome: 'Вернуться к обзору руководства',
        search: 'Поиск по документации', searchShort: 'Поиск', searchPlaceholder: 'Поиск по руководству…',
        searchHint: 'Ищите команды, функции, приложения и способы устранения неполадок.',
        searchMinimum: 'Введите не менее двух символов для поиска по руководству.', indexing: 'Индексирование руководства…',
        noResult: 'Нет результатов для', footer: 'Документация пользовательской прошивки F4HWN', sidebarFooter: 'UV Manual · документация v6.1', wiki: 'Открыть Wiki ↗', linkTo: 'Ссылка на',
        callouts: { note: 'Примечание', tip: 'Совет', important: 'Важно', warning: 'Предупреждение', caution: 'Осторожно' }
      }
    },
    pl: {
      groups: {
        'Start here': 'Pierwsze kroki', 'Use the radio': 'Obsługa radiostacji', Applications: 'Aplikacje',
        'Configuration & tools': 'Konfiguracja i narzędzia', Support: 'Pomoc',
        'Application history': 'Historia aplikacji'
      },
      pages: {
        home: 'Przegląd', 'getting-started': 'Pierwsze kroki', 'recent-changes': 'Co nowego',
        'videos-and-tutorials': 'Filmy i poradniki', 'radio-operation': 'Obsługa radiostacji',
        'button-functions': 'Przyciski i skróty', menu: 'Menu', scanning: 'Skanowanie',
        'spectrum-analyzer': 'Analizator widma', 'fm-broadcast-radio': 'Radio FM',
        'advanced-features': 'Funkcje zaawansowane', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Aplikacje nakładkowe', 'overlay-applications': 'Opis aplikacji',
        multiboot: 'Multiboot i Multiconfig', 'programming-with-chirp': 'Programowanie z CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Rozwiązywanie problemów',
        'foxhunt-and-beacon-history': 'Historia FoxHunt i Beacon'
      },
      ui: {
        documentation: 'Dokumentacja', onThisPage: 'Na tej stronie', previous: '← Wstecz', next: 'Dalej →',
        loading: 'Wczytywanie dokumentacji…', unavailable: 'Strona niedostępna', returnHome: 'Wróć do przeglądu podręcznika',
        search: 'Przeszukaj dokumentację', searchShort: 'Szukaj', searchPlaceholder: 'Przeszukaj podręcznik…',
        searchHint: 'Szukaj poleceń, funkcji, aplikacji i rozwiązań problemów.',
        searchMinimum: 'Wpisz co najmniej dwa znaki, aby przeszukać podręcznik.', indexing: 'Indeksowanie podręcznika…',
        noResult: 'Brak wyników dla', footer: 'Dokumentacja niestandardowego firmware F4HWN', sidebarFooter: 'UV Manual · dokumentacja v6.1', wiki: 'Otwórz Wiki ↗', linkTo: 'Odnośnik do',
        callouts: { note: 'Uwaga', tip: 'Wskazówka', important: 'Ważne', warning: 'Ostrzeżenie', caution: 'Przestroga' }
      }
    },
    nl: {
      groups: {
        'Start here': 'Aan de slag', 'Use the radio': 'De radio gebruiken', Applications: 'Toepassingen',
        'Configuration & tools': 'Configuratie en hulpmiddelen', Support: 'Ondersteuning',
        'Application history': 'Toepassingsgeschiedenis'
      },
      pages: {
        home: 'Overzicht', 'getting-started': 'Aan de slag', 'recent-changes': 'Recente wijzigingen',
        'videos-and-tutorials': "Video's en tutorials", 'radio-operation': 'Radiobediening',
        'button-functions': 'Knoppen en sneltoetsen', menu: 'Menu', scanning: 'Scannen',
        'spectrum-analyzer': 'Spectrumanalysator', 'fm-broadcast-radio': 'FM-radio',
        'advanced-features': 'Geavanceerde functies', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': 'Overlay-apps', 'overlay-applications': 'Toepassingsreferentie',
        multiboot: 'Multiboot en Multiconfig', 'programming-with-chirp': 'Programmeren met CHIRP',
        'uv-studio': 'UV Studio', troubleshooting: 'Probleemoplossing',
        'foxhunt-and-beacon-history': 'Geschiedenis van FoxHunt en Beacon'
      },
      ui: {
        documentation: 'Documentatie', onThisPage: 'Op deze pagina', previous: '← Vorige', next: 'Volgende →',
        loading: 'Documentatie laden…', unavailable: 'Pagina niet beschikbaar', returnHome: 'Terug naar het overzicht van de handleiding',
        search: 'Documentatie doorzoeken', searchShort: 'Zoeken', searchPlaceholder: 'De handleiding doorzoeken…',
        searchHint: 'Zoek naar opdrachten, functies, toepassingen of oplossingen voor problemen.',
        searchMinimum: 'Voer ten minste twee tekens in om de handleiding te doorzoeken.', indexing: 'De handleiding indexeren…',
        noResult: 'Geen resultaat voor', footer: 'Documentatie voor aangepaste F4HWN-firmware', sidebarFooter: 'UV Manual · documentatie v6.1', wiki: 'Wiki bekijken ↗', linkTo: 'Link naar',
        callouts: { note: 'Opmerking', tip: 'Tip', important: 'Belangrijk', warning: 'Waarschuwing', caution: 'Let op' }
      }
    },
    zh: {
      groups: {
        'Start here': '从这里开始', 'Use the radio': '使用对讲机', Applications: '应用',
        'Configuration & tools': '配置和工具', Support: '支持',
        'Application history': '应用历史'
      },
      pages: {
        home: '概览', 'getting-started': '入门指南', 'recent-changes': '近期变更',
        'videos-and-tutorials': '视频和教程', 'radio-operation': '对讲机操作',
        'button-functions': '按钮和快捷方式', menu: '菜单', scanning: '扫描',
        'spectrum-analyzer': '频谱分析仪', 'fm-broadcast-radio': 'FM 广播收音机',
        'advanced-features': '高级功能', aircopy: 'AirCopy', foxhunt: 'FoxHunt', beacon: 'Beacon',
        'overlay-apps': '叠加应用', 'overlay-applications': '应用参考',
        multiboot: '多重启动和多重配置', 'programming-with-chirp': '使用 CHIRP 编程',
        'uv-studio': 'UV Studio', troubleshooting: '故障排除',
        'foxhunt-and-beacon-history': 'FoxHunt 和 Beacon 历史'
      },
      ui: {
        documentation: '文档', onThisPage: '本页内容', previous: '← 上一页', next: '下一页 →',
        loading: '正在加载文档…', unavailable: '页面不可用', returnHome: '返回手册概览',
        search: '搜索文档', searchShort: '搜索', searchPlaceholder: '搜索手册…',
        searchHint: '搜索命令、功能、应用或故障排除主题。',
        searchMinimum: '请输入至少两个字符以搜索完整手册。', indexing: '正在为手册建立索引…',
        noResult: '未找到结果：', footer: 'F4HWN 自定义固件文档', sidebarFooter: 'UV Manual · v6.1 文档', wiki: '查看 Wiki ↗', linkTo: '链接到',
        callouts: { note: '注意', tip: '提示', important: '重要', warning: '警告', caution: '小心' }
      }
    }
  };

  const initialLanguage = new URLSearchParams(location.search).get('lang') || localStorage.getItem('uv-manual-language') || 'en';
  let currentLanguage = Object.hasOwn(locales, initialLanguage) ? initialLanguage : 'en';

  const article = document.getElementById('article');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('backdrop');
  const mainContent = document.getElementById('mainContent');
  const toc = document.getElementById('tableOfContents');
  const searchDialog = document.getElementById('searchDialog');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  let currentPage = null;
  let selectedResult = -1;

  function locale() { return locales[currentLanguage]; }
  function t(key) { return locale().ui[key] || locales.en.ui[key] || key; }
  function pageTitle(page) { return locale().pages[page.id] || page.title; }
  function groupTitle(group) { return locale().groups[group] || group; }

  function pageUrl(id, hash = '') {
    const url = new URL(location.href);
    url.search = '';
    if (currentLanguage !== 'en') url.searchParams.set('lang', currentLanguage);
    if (id !== 'home') url.searchParams.set('page', id);
    url.hash = hash;
    return `${url.pathname}${url.search}${url.hash}`;
  }

  function renderNavigation() {
    document.getElementById('mainNavigation').innerHTML = groups.map(group => `
      <section><h2>${groupTitle(group.title)}</h2>${group.pages.map(page => `
        <a href="${pageUrl(page[0])}" data-page="${page[0]}">
          <span class="nav-icon" aria-hidden="true">${icons[page[2]] || icons.reference}</span>
          <span class="nav-label">${pageTitle(byId.get(page[0]))}</span>
        </a>`).join('')}</section>`).join('');
  }

  function requestedPage() {
    const id = new URLSearchParams(location.search).get('page') || 'home';
    return byId.get(id) || byId.get('home');
  }

  function slugify(text) {
    return text.toLowerCase().trim()
      .replace(/<[^>]+>/g, '')
      .replace(/[’']/g, '')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  async function getMarkdown(page) {
    const cacheKey = `${currentLanguage}:${page.id}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);
    const localizedBundles = {
      en: window.UV_MANUAL_PAGES,
      fr: window.UV_MANUAL_PAGES_FR,
      it: window.UV_MANUAL_PAGES_IT,
      es: window.UV_MANUAL_PAGES_ES,
      de: window.UV_MANUAL_PAGES_DE,
      pt: window.UV_MANUAL_PAGES_PT,
      ru: window.UV_MANUAL_PAGES_RU,
      pl: window.UV_MANUAL_PAGES_PL,
      zh: window.UV_MANUAL_PAGES_ZH,
      nl: window.UV_MANUAL_PAGES_NL
    };
    const localizedBundle = localizedBundles[currentLanguage] || window.UV_MANUAL_PAGES;
    const bundled = localizedBundle?.[page.file] ?? window.UV_MANUAL_PAGES?.[page.file];
    if (typeof bundled === 'string') {
      cache.set(cacheKey, bundled);
      return bundled;
    }
    const localizedPath = currentLanguage === 'en' ? `pages/${page.file}` : `pages/${currentLanguage}/${page.file}`;
    const response = await fetch(localizedPath);
    if (!response.ok) throw new Error(`Unable to load ${page.file}`);
    const markdown = await response.text();
    cache.set(cacheKey, markdown);
    return markdown;
  }

  function enhanceArticle(page) {
    const translation = article.querySelector('blockquote:first-child');
    if (translation && /translate/i.test(translation.textContent)) translation.classList.add('translation-banner');

    let canonicalHeadingIds = [];
    if (currentLanguage !== 'en' && window.UV_MANUAL_PAGES?.[page.file]) {
      const canonical = document.createElement('div');
      canonical.innerHTML = marked.parse(window.UV_MANUAL_PAGES[page.file]);
      canonicalHeadingIds = [...canonical.querySelectorAll('h2,h3,h4')].map(heading => slugify(heading.textContent));
    }
    article.querySelectorAll('h2,h3,h4').forEach((heading, index) => {
      const id = canonicalHeadingIds[index] || slugify(heading.textContent);
      heading.id = id;
      const anchor = document.createElement('a');
      anchor.className = 'heading-anchor';
      anchor.href = `#${id}`;
      anchor.setAttribute('aria-label', `${t('linkTo')} ${heading.textContent}`);
      anchor.textContent = '#';
      heading.append(anchor);
    });

    article.querySelectorAll('blockquote').forEach(block => {
      const first = block.querySelector('p');
      if (!first) return;
      const match = first.innerHTML.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i);
      if (!match) return;
      const kind = match[1].toLowerCase();
      first.innerHTML = first.innerHTML.replace(match[0], '');
      const title = document.createElement('strong');
      title.className = 'callout-title';
      title.textContent = locale().ui.callouts[kind] || kind.charAt(0).toUpperCase() + kind.slice(1);
      block.prepend(title);
      block.dataset.kind = ['warning', 'caution'].includes(kind) ? 'warning' : kind;
    });

    article.querySelectorAll('a[href]').forEach(link => {
      const raw = link.getAttribute('href');
      if (!raw) return;
      if (/^https?:\/\//i.test(raw)) {
        link.target = '_blank'; link.rel = 'noopener'; return;
      }
      if (raw.startsWith('#')) return;
      const match = raw.match(/^(?:\.\/)?([^#/?]+?)(?:\.md)?(?:#(.+))?$/i);
      if (!match) return;
      const target = byFile.get(match[1].toLowerCase());
      if (target) link.href = pageUrl(target.id, match[2] ? `#${match[2]}` : '');
    });

    renderToc();
    document.title = `${pageTitle(page)} · UV Manual`;
  }

  function renderToc() {
    const headings = [...article.querySelectorAll('h2,h3')].slice(0, 18);
    if (!headings.length) { toc.innerHTML = ''; return; }
    toc.innerHTML = `<strong>${t('onThisPage')}</strong>${headings.map(heading =>
      `<a href="#${heading.id}" class="${heading.tagName === 'H3' ? 'sub' : ''}">${heading.childNodes[0].textContent}</a>`
    ).join('')}`;
  }

  function renderBreadcrumbs(page) {
    document.getElementById('breadcrumbs').innerHTML = `<a href="${pageUrl('home')}">${t('documentation')}</a><span>›</span><span>${groupTitle(page.group)}</span><span>›</span><strong>${pageTitle(page)}</strong>`;
  }

  function renderPager(page) {
    const index = navigationPages.findIndex(item => item.id === page.id);
    const previous = index > 0 ? navigationPages[index - 1] : null;
    const next = index >= 0 ? navigationPages[index + 1] : null;
    document.getElementById('pageNavigation').innerHTML = `
      ${previous ? `<a href="${pageUrl(previous.id)}"><small>${t('previous')}</small><strong>${pageTitle(previous)}</strong></a>` : ''}
      ${next ? `<a class="next" href="${pageUrl(next.id)}"><small>${t('next')}</small><strong>${pageTitle(next)}</strong></a>` : ''}`;
  }

  function setActiveNavigation(page) {
    document.querySelectorAll('[data-page]').forEach(link => {
      const active = link.dataset.page === page.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
  }

  async function loadPage(page, push = false) {
    currentPage = page;
    article.innerHTML = `<div class="loading"><span></span><p>${t('loading')}</p></div>`;
    toc.innerHTML = '';
    closeMenu();
    if (push) history.pushState({ page: page.id }, '', pageUrl(page.id));
    setActiveNavigation(page);
    document.getElementById('sectionName').textContent = pageTitle(page);
    renderBreadcrumbs(page);
    renderPager(page);
    try {
      const markdown = await getMarkdown(page);
      article.innerHTML = marked.parse(markdown, { gfm: true, breaks: false });
      enhanceArticle(page);
      if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
      else scrollTo({ top: 0, behavior: 'instant' });
    } catch (error) {
      article.innerHTML = `<div class="error-state"><h1>${t('unavailable')}</h1><p>${error.message}</p><p><a href="${pageUrl('home')}">${t('returnHome')}</a></p></div>`;
    }
  }

  function interceptNavigation(event) {
    const link = event.target.closest('a[href]');
    if (!link || link.target === '_blank' || event.metaKey || event.ctrlKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) return;
    const target = byId.get(new URLSearchParams(url.search).get('page') || 'home');
    if (!target) return;
    event.preventDefault();
    if (searchDialog.open) closeSearch();
    if (target.id === currentPage?.id && url.hash) {
      history.pushState({ page: target.id }, '', `${url.pathname}${url.search}${url.hash}`);
      document.getElementById(url.hash.slice(1))?.scrollIntoView();
    } else loadPage(target, true);
  }

  function setMenuState(expanded) { document.getElementById('menuButton').setAttribute('aria-expanded', String(expanded)); }
  function openMenu() { sidebar.classList.add('open'); backdrop.classList.add('open'); setMenuState(true); }
  function closeMenu() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('open');
    setMenuState(innerWidth > 790 ? !document.body.classList.contains('nav-collapsed') : false);
  }
  function toggleMenu() {
    if (innerWidth <= 790) {
      sidebar.classList.contains('open') ? closeMenu() : openMenu();
      return;
    }
    document.body.classList.toggle('nav-collapsed');
    setMenuState(!document.body.classList.contains('nav-collapsed'));
  }

  async function buildSearchIndex() {
    if (searchIndexPromise) return searchIndexPromise;
    const indexedLanguage = currentLanguage;
    const indexedDocuments = [];
    searchIndexPromise = Promise.all(pages.map(async page => {
      try {
        const markdown = await getMarkdown(page);
        const holder = document.createElement('div');
        holder.innerHTML = marked.parse(markdown);
        indexedDocuments.push({ ...page, text: holder.textContent.replace(/\s+/g, ' ').trim() });
      } catch (_) { /* A missing page should not disable the rest of search. */ }
    }));
    await searchIndexPromise;
    if (indexedLanguage !== currentLanguage) return searchIndexPromise;
    searchDocuments.splice(0, searchDocuments.length, ...indexedDocuments);
    if (searchInput.value.trim().length >= 2) runSearch();
    return searchIndexPromise;
  }

  function highlight(text, query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'ig'), '<mark>$1</mark>');
  }

  function runSearch() {
    const query = searchInput.value.trim();
    selectedResult = -1;
    if (query.length < 2) {
      searchResults.innerHTML = `<p class="search-hint">${t('searchMinimum')}</p>`;
      return;
    }
    if (!searchDocuments.length) {
      searchResults.innerHTML = `<p class="search-hint">${t('indexing')}</p>`;
      buildSearchIndex();
      return;
    }
    const terms = query.toLowerCase().split(/\s+/);
    const matches = searchDocuments.map(doc => {
      const title = pageTitle(doc);
      const lower = `${title} ${doc.text}`.toLowerCase();
      const score = terms.reduce((total, term) => total + (title.toLowerCase().includes(term) ? 8 : 0) + (lower.split(term).length - 1), 0);
      return { doc, score };
    }).filter(item => item.score > 0).sort((a,b) => b.score - a.score).slice(0, 12);
    if (!matches.length) { searchResults.innerHTML = `<p class="no-results">${t('noResult')} “${query}”.</p>`; return; }
    searchResults.innerHTML = matches.map(({doc}) => {
      const lower = doc.text.toLowerCase();
      const at = Math.max(0, lower.indexOf(terms[0]) - 70);
      const excerpt = `${at ? '…' : ''}${doc.text.slice(at, at + 190)}…`;
      return `<a class="search-result" href="${pageUrl(doc.id)}"><strong>${highlight(pageTitle(doc), query)}</strong><span>${highlight(excerpt, query)}</span></a>`;
    }).join('');
  }

  function openSearch() { if (!searchDialog.open) searchDialog.showModal(); searchInput.focus(); if (!searchDocuments.length) buildSearchIndex(); }
  function closeSearch() { searchDialog.close(); searchInput.value = ''; selectedResult = -1; searchResults.innerHTML = `<p class="search-hint">${t('searchHint')}</p>`; }

  function applyLocale() {
    document.documentElement.lang = currentLanguage;
    document.getElementById('languageSelect').value = currentLanguage;
    document.querySelector('.brand-link').href = pageUrl('home');
    document.querySelector('.search-label').textContent = t('searchShort');
    document.getElementById('searchButton').setAttribute('aria-label', t('search'));
    searchInput.placeholder = t('searchPlaceholder');
    document.querySelector('.article-footer span').textContent = t('footer');
    document.querySelector('.article-footer a').textContent = t('wiki');
    document.querySelector('.sidebar footer').textContent = t('sidebarFooter');
    searchResults.innerHTML = `<p class="search-hint">${t('searchHint')}</p>`;
    renderNavigation();
  }

  function changeLanguage(language) {
    if (!Object.hasOwn(locales, language) || language === currentLanguage) return;
    currentLanguage = language;
    localStorage.setItem('uv-manual-language', language);
    searchDocuments.length = 0;
    searchIndexPromise = null;
    applyLocale();
    loadPage(currentPage || requestedPage(), true);
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => buildSearchIndex());
    else window.setTimeout(() => buildSearchIndex(), 250);
  }

  function moveSearchSelection(direction) {
    const results = [...searchResults.querySelectorAll('.search-result')];
    if (!results.length) return;
    selectedResult = (selectedResult + direction + results.length) % results.length;
    results.forEach((result,index) => result.classList.toggle('selected', index === selectedResult));
    results[selectedResult].scrollIntoView({ block: 'nearest' });
  }

  applyLocale();
  document.addEventListener('click', interceptNavigation);
  document.getElementById('menuButton').addEventListener('click', toggleMenu);
  backdrop.addEventListener('click', closeMenu);
  document.getElementById('searchButton').addEventListener('click', openSearch);
  document.getElementById('closeSearch').addEventListener('click', closeSearch);
  document.getElementById('languageSelect').addEventListener('change', event => changeLanguage(event.target.value));
  searchInput.addEventListener('input', runSearch);
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown') { event.preventDefault(); moveSearchSelection(1); }
    if (event.key === 'ArrowUp') { event.preventDefault(); moveSearchSelection(-1); }
    if (event.key === 'Enter' && selectedResult >= 0) { event.preventDefault(); searchResults.querySelectorAll('.search-result')[selectedResult].click(); closeSearch(); }
  });
  searchDialog.addEventListener('click', event => { if (event.target === searchDialog) closeSearch(); });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
    if (event.key === 'Escape' && sidebar.classList.contains('open')) closeMenu();
  });
  document.getElementById('themeButton').addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('uv-manual-theme', theme);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#1e293b' : '#ffffff';
  });
  const savedTheme = localStorage.getItem('uv-manual-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  window.addEventListener('popstate', () => {
    const language = new URLSearchParams(location.search).get('lang') || 'en';
    if (Object.hasOwn(locales, language) && language !== currentLanguage) {
      currentLanguage = language;
      searchDocuments.length = 0;
      searchIndexPromise = null;
      applyLocale();
    }
    loadPage(requestedPage());
  });
  window.addEventListener('resize', () => {
    if (innerWidth > 790) closeMenu();
    else setMenuState(sidebar.classList.contains('open'));
  });
  loadPage(requestedPage());
  if ('requestIdleCallback' in window) window.requestIdleCallback(() => buildSearchIndex());
  else window.setTimeout(() => buildSearchIndex(), 250);
})();
