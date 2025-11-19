// Инициализация Telegram WebApp
let tg = window.Telegram?.WebApp;

if (tg) {
    // Разворачивание приложения на весь экран
    tg.expand();
    
    // Настройка цвета header bar под фирменный стиль
    tg.setHeaderColor('#1e3c72');
    
    // Получение данных пользователя
    const user = tg.initDataUnsafe?.user;
    if (user) {
        console.log('User ID:', user.id);
        console.log('Username:', user.username);
        console.log('First Name:', user.first_name);
    }
}

// Функция переключения страниц через нижнее меню
function switchPage(page) {
    // Скрыть все страницы
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    
    // Удалить active у всех элементов навигации
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Показать выбранную страницу
    const pageMap = {
        'home': 'homePage',
        'community': 'communityPage',
        'knowledge': 'knowledgePage',
        'marketplace': 'marketplacePage',
        'profile': 'profilePage'
    };
    
    const pageId = pageMap[page];
    if (pageId) {
        document.getElementById(pageId).classList.add('active');
    }
    
    // Установить активный элемент навигации
    event.currentTarget.classList.add('active');
    
    // Прокрутка наверх при переключении страницы
    window.scrollTo(0, 0);
}

// Функция для открытия подстраниц
function showSubpage(subpageId) {
    // Скрыть все страницы
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    
    // Показать нужную подстраницу
    const subpageMap = {
        // Сообщество
        'matching': 'matchingPage',
        'forum': 'forumPage',
        'companies': 'companiesPage',
        'fest2026': 'fest2026Page',
        'projects': 'projectsPage',
        'vacancies': 'vacanciesPage',
        // База знаний
        'technologies': 'technologiesPage',
        'standards': 'standardsPage',
        'education': 'educationPage',
        'cases': 'casesPage',
        'news': 'newsPage',
        'materials': 'materialsPage',
        // Маркетплейс
        'resins': 'resinsPage',
        'equipment': 'equipmentPage',
        'fibers': 'fibersPage',
        'services': 'servicesPage',
        'products': 'productsPage',
        'offers': 'offersPage',
        // Профиль
        'mycompany': 'mycompanyPage',
        'myprojects': 'myprojectsPage',
        'mycontacts': 'mycontactsPage',
        'settings': 'settingsPage',
        'favorites': 'favoritesPage',
        'festregistration': 'festregistrationPage'
    };
    
    const pageId = subpageMap[subpageId];
    if (pageId) {
        const pageElement = document.getElementById(pageId);
        if (pageElement) {
            pageElement.classList.add('active');
        } else {
            // Если страница не найдена, показываем заглушку
            alert('Эта страница находится в разработке. Скоро здесь появится контент!');
            // Вернуться на предыдущую страницу
            const currentNav = document.querySelector('.nav-item.active');
            if (currentNav) {
                currentNav.click();
            }
            return;
        }
    }
    
    // Прокрутка наверх
    window.scrollTo(0, 0);
    
    // Показать кнопку "Назад" в Telegram
    if (tg && tg.BackButton) {
        tg.BackButton.show();
    }
}

// Функция навигации через quick actions
function navigateTo(section) {
    const pageMap = {
        'knowledge': 'knowledgePage',
        'marketplace': 'marketplacePage',
        'community': 'communityPage'
    };
    
    const pageId = pageMap[section];
    if (pageId) {
        // Скрыть все страницы
        document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
        
        // Удалить active у всех элементов навигации
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        
        // Показать нужную страницу
        document.getElementById(pageId).classList.add('active');
        
        // Активировать соответствующий элемент навигации
        const navItems = document.querySelectorAll('.nav-item');
        const navMap = {
            'knowledge': 2,
            'marketplace': 3,
            'community': 1
        };
        
        const navIndex = navMap[section];
        if (navIndex !== undefined && navItems[navIndex]) {
            navItems[navIndex].classList.add('active');
        }
        
        // Прокрутка наверх
        window.scrollTo(0, 0);
    }
}

// Обработка действий с постами
document.addEventListener('DOMContentLoaded', function() {
    // Обработка лайков
    document.querySelectorAll('.feed-action').forEach(action => {
        action.addEventListener('click', function(e) {
            if (this.textContent.includes('❤️')) {
                this.classList.toggle('active');
                
                // Анимация лайка
                const span = this.querySelector('span');
                if (span) {
                    const currentCount = parseInt(span.textContent);
                    if (this.classList.contains('active')) {
                        span.textContent = currentCount + 1;
                    } else {
                        span.textContent = currentCount - 1;
                    }
                }
            }
        });
    });
    
    // Обработка уведомлений
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            if (tg && tg.showPopup) {
                tg.showPopup({
                    title: 'Уведомления',
                    message: '• Оксана Григораш приветствует в сообществе\n• Новый комментарий к вашему посту\n• Андрей Соколов ответил на ваш вопрос',
                    buttons: [{type: 'ok'}]
                });
            } else {
                alert('Уведомления:\n\n• Оксана Григораш приветствует в сообществе\n• Новый комментарий к вашему посту\n• Андрей Соколов ответил на ваш вопрос\n• Скоро: Композит Фест 2026\n• Новое предложение в маркетплейсе');
            }
        });
    }
});

// Обработка кнопки "Назад" в Telegram
if (tg && tg.BackButton) {
    tg.BackButton.onClick(() => {
        const activePage = document.querySelector('.page-content.active');
        if (activePage && activePage.id !== 'homePage') {
            // Возврат на главную страницу
            document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
            document.getElementById('homePage').classList.add('active');
            
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.querySelector('.nav-item').classList.add('active');
            
            window.scrollTo(0, 0);
        } else {
            // Закрытие приложения
            tg.close();
        }
    });
    
    // Показать кнопку "Назад" если не на главной странице
    const observer = new MutationObserver(function(mutations) {
        const activePage = document.querySelector('.page-content.active');
        if (activePage && activePage.id === 'homePage') {
            tg.BackButton.hide();
        } else {
            tg.BackButton.show();
        }
    });
    
    observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ['class']
    });
}

console.log('Композит Фест - Сообщество загружено 🚀');
