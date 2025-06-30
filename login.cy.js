describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти
        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Текст верный
        cy.get('#exitMessageButton > .exitIcon').click(); // Проверка, что при нажатии на крестик все закрывается

    })

    it('Восстановление пароля', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type('anirkk@yandex.ru');
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('german@dolnikov.ru');
        cy.get('#pass').type('Fruktik123');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('Frukt@yandex.ru');
        cy.get('#pass').type('iLoveqastudio1');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Валидация на наличие @', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('germandolnikov.ru');
        cy.get('#pass').type('iLoveqastudio');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('GerMan@Dolnikov.ru');
        cy.get('#pass').type('iLoveqastudio');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').should('be.visible');
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    describe('Проверка покупки нового аватара', function () {                 // название набора тестов
        it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
            cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
            cy.get('input[id="k_email"]').type('USER_LOGIN');                   // вводим логин
            cy.get('input[id="k_password"]').type('USER_PASSWORD');               // вводим пароль
            cy.get('button[type="submit"]').click();                // нажимаем кнопку Подтвердить
            cy.wait(2000);
            cy.get('.header_card_trainer').click();            // Клик в шапке на аву тренера
            cy.wait(2000);
            cy.get('.k_mobile > :nth-child(5) > #dropdown > img').click(); // нажимаем кнопку Смена аватара
            cy.get('.available > button').first().click();   // кликаем Купить у первого доступного аватара
            cy.get('.card_number').type('4620869113632996');                     // вводим номер карты
            cy.get('.card_csv').type('125');                             // вводим CVV карты
            cy.get('.card_date').type('1226');                           // вводим срок действия карты
            cy.get('.card_name').type('NAME');                           // вводим имя владельца действия карты
            cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();     // нажимаем кнопку Оплатить
            cy.get('.threeds_number').type('56456');                            // вводим код подтверждения СМС
            cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();   // нажимаем кнопку Оплатить
            cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения об успешной покупке
        });
    });

})

