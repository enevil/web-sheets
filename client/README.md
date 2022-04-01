# Web Sheet (Общее описание)
_[Ссылка](https://web-sheets.netlify.app) на приложение_

Данный проект был создан мной, как не только как полноценный портфолио-проект, но и как веб-приложение,
которым могла бы пользоваться моя предыдущая команда. При разработке данного проекта, я приследовал следующие 
цели:
* Отработка теоретических навыков
* Получение опыта в создании full-stack web-приложения с нуля
* Размещение и минимальная поддержка приложения

Основные задачи выдвиннутые при разработке проекта:
* Парсинг данных из google spreadsheets и занесение их в базу данных
* Удобное отображение рабочих смен в интерактивном календаре
* Отображение статистики с помощью диаграммы и расчет предположительного дохода за месяц
* Создание библиотеки рецептов, поиск и полный CRUD связанный с ними
* Авторизация 
## Стак приложения 
В первую очередь данный проект - это SPA. Так как React, весь его синтаксис и VDOM полностью подталкивают, к созданию такого рода приложения.
Несмотря на минусы этого подхода, был выбран именно он. Поход к написанию css-стилей - модульный. Его плюс - это полная инкапсуляция css стилей
для одного компонента.

Основная архитектура приложения:
* M - MongoDb
* E - Express
* R - React
* N - Node JS

> Пару слов о выбранном стаке. Основой выбора больше служило доступность образовательного контента, а также доступность самих систем и библиотек

Другие ключевые библиотеки:
* Redux (thunk,persist) - удобное хранилище состояний
* React Router DOM - отличная библиотека для создания наглядной структуры (путей) приложения
* React Hook Form - более удобная работа с формаими и их frontend валидацией
* JWT - на нем выстроена вся авторизация в приложении
* Mongoose - более удобная работа с MongoDb
* UploadCare Widget - работа с загрузкой файлов на сервер, аналог AWS S3

# Client-side
_Чтобы посмотреть server-side документацию передите по [ссылке](https://github.com/enevil/web_sheet_server)_

Хотелось бы в данном документе не разбирать каждую строчку кода, а подвести какой-то итог проделанной работы, разделив ее на три субъективные части.
Что я считаю в проекте:
* Успешно получилось реализовать
* Реализовано, но с "костылями"
* Можно реализовать в будущем (TODO)

## Успешно реализованые идеи
### Структура приложения (Размещена в файле App.js.)
Выполнена она была на основе react-roter-dom новейшей 6 версии. Скелетом послужили вложенные Routes, а также Layout-компоненты из-за чего
концепция и механизм работы приложения понятны лишь по одному компоненту. Удалось добиться разграничение функционала сайта - для не 
зарегестрированных пользователей сайт выполняет роль блога-визитки, после же регистрации - открывается полный функционал
### Навигация сайта
Несмотря на то, что идея изначально казалось странной совмещение не только верхней (navbar-header), но и сторонней (sidebar) навигации,
но в конце результат получился абсолютно функционирующим и удобным в использовании
### Календарь
Абсолютно работающий календарь с подсветкой рабочих смен, а также отображением тех людей, которые работают с тобой в этот день. Построен на основе библиотеки react-calendar
### Статистика 
Диаграмма построеная на основе библиотеки react-chartjs-2. Отображает по оси x - день месяца, по оси y - кол-во рабочих часов, на основе этих данных 
составляется полученная заработная плата с учетом ставки в месяц, которую можно изменить 
### Библиотека рецептов
Билиотека выполнена весьма просто, с учетом одного фильтра, и панелью поиска, но этого вполне достаточно для комфортного пользования. Также реализован весь CRUD,
возможности которого зависят от того, являетесь ли вы создателем данного рецепта
### Переиспользование логики
В данном случае имеется ввиду hoc-декораторы и создание библиотеки компонентов, которые используются несколько раз в коде
### Redux business logic
С помощью redux получилось не только создать удобное хранилище состояний, но и разграничить некоторую логику работы приложения, а сама архитектура получилась 
достаточно компактной и ясной
## Реализованые идеи, но с недочетом
### Дизайн 
Несмотря на то, что дизайн выглядит достаточно приятным глазу, сайт вообще не претендует на уровень в плане дизайн-подхода, ux-ui подхода.
### CSS
За счет того, что я пользовался css-modules не сильно вдавался в красивое и компактное написание css стилей, типа БЭМ и других методик
## Можно реализовать в будущем (TODO)
### Мобильный адаптив
Вероятно для этого предстоит найти новый подход к написанию стилей и использовать множество breakpoint'ов
### Debounce
Написать функцию к поисковому элементу, чтобы не спамить на сервер множеством запрсов
