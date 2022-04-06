# Web Sheet (Общее описание)
_[Ссылка](https://websheets-i.herokuapp.com/blog) на приложение_

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

## Превью

![profile-desktop](https://user-images.githubusercontent.com/91529586/162027322-ff00e9e8-36d2-448f-bb38-73bea9ad8a4d.png)
![calendar-desktop](https://user-images.githubusercontent.com/91529586/162027480-cff4e631-62a5-48cf-a29a-f45c3d8074c8.png)
![statistic-desktop](https://user-images.githubusercontent.com/91529586/162027484-7b53d1ca-9e70-41f0-abd5-aa9320d6f059.png)
![recipes-desktop](https://user-images.githubusercontent.com/91529586/162027485-44e73502-47a0-4610-94ef-606cf77aa1c1.png)
* * *
![calendar-smartphone](https://user-images.githubusercontent.com/91529586/162030808-496ec85b-92bc-4e09-b8e0-d45044d09375.png)
![recipes-smartphone](https://user-images.githubusercontent.com/91529586/162030811-ed81bd55-387f-4436-b871-f782c8231dca.png)
![statistic-smartphone](https://user-images.githubusercontent.com/91529586/162030815-b6051b67-8ab4-4d0e-bd67-b7953c7515f2.png)

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
UPD 03/04/2022.

Был добавлен запланированный адаптив для устройств разной ширины и длинны экрана
### Debounce
Написать функцию к поисковому элементу, чтобы не спамить на сервер множеством запрсов


# Server-side (back-end)
Задача состояла в том, чтобы написать сервер на express, не сильно зацикливаясь на работе самой node js, но отвечающий следующим требованиям:
* Создание полноценного API, построенного на протоколе http 
* Создание класса, который бы работал _мостом-парсером_ из google spreadsheets в node
* Обработка этих данных и заполнение базы данных
* Создание дополнительной инфраструктуры вокруг базы данных, для удобного хранения данных оставленных пользователями
* Авторизация пользователей через JWT токен с сохранением его в cookie

Тестирование API польностью происходило в Postman или, если это обычные get-запросы, то просто в браузере.

Вот полный список API:
* /auth
  * /registration
  * /login
  * /check
  * /registration
* /blog
  * /get_all
  * /get_one
  * /add
* /recipe
  * /get_many
  * /get_one
  * /add
  * /edit
  * /delete
* /api
  * /livesearch
  * /get_person
  * /get_side_persons
  * /update_db
  * /fill_db
* /user
  * /get_one
  * /upload_img
  * /change_password

Как и в client-side части документации, сделаю такое же субъективно разделение проделанной работы на три части:
* Успешно получилось реализовать
* Реализовано, но с "костылями"
* Можно реализовать в будущем (TODO)
## Успешно реализованые идеи
### Класс парсер
Spreadsheet Module

С помощью библиотеки googleapis вытаскивает данные конкретной таблицы, заданной при создании класса, а именно возможность получить метаданные таблиц, названия всех 
страниц, чтобы с помощью их обращаться к конкретным страницам и собирать данные
### Схема для рабочих смен в базе данных
Нужно было придумать такой тип схем, чтобы обращаться например к конкретному человеку, и получать все те дни в которые он работает, и также в обратную сторону, по 
конкретному дню, получать всех людей, которые в этот день работают

Идея пришла из реляционных баз данных и заключалась в создании схемы-посредника:
![schemes](https://user-images.githubusercontent.com/91529586/159889258-80e9df93-d49a-4564-bab7-4070a44714b9.png)
### Аутентификация 
Если не вдваваться в обработку типичных ошибок, то все endpoint'ы можно описать так:
1. Регистрация. Шифрование пароля > Создание юзера > Создание токена (в тело зашиваем user id) > Устанавливаем через cookie Bearer Token
2. Вход. Сравнение пароля с шифрованным паролем (comareSync) > Получение юзера через email > Создание токена (в тело зашиваем user id) > Устанавливаем через cookie Bearer Token
3. Проверка. Через функцию verify и секрктный ключ проверяем подлинность токена, а также не "умер" ли он, если нет, то возвращаем статус 200
4. Выход. Установка в куки вместо строки с токеном пустой строки с жизненым циклом в 1 секунду
## Реализованые идеи, но с недочетом
### Скрипт по заполнению данных в таблицу
Есть формально два endpoint'а, которые позволяют обновить данные в таблицах:
1. /fill_db запускается один раз и вручную для полного переноса информации из всех листов таблиц в базу данных
2. /update_db запускается как вручную, так и по таймеру, не только вручную, но и по таймеру, один раз в час. Скрипт длится достаточно долго из-за работы самого
googleapis, медленной работы серверной Mongo, не оптимизированного кода, для получения актуальной информации, он чистит все association из баз данных за месяц, а
потом заносит их обратно, более актуальные. В идеале нужно прежде, чем что-то удалять/изменять, проверить изменилась ли информация с преидущего раза.
При том из-за того, что Mongo не реляционная база данных, при удалении какого-то объекта, она не чистит ссылки на него в целом документе и приходится делать
свой сборщик мусора, что также замедляет работу.
### Загрузка изображений, через multer
Получилось без особых усилий встроить multer для загрузки фото в файловую систему сервера через middleware запросов, но к сожалению heroku, на котором
стоит мой сервер, через определенное время обновляется и полностью удаляет все то, что было на него загруженно, то есть иными словами имеет лишь временное 
хранилище.
>  Можно было бы воспользоваться S3 AWS хранилищем, но из-за неработоспособности российских карт, там даже не зарегестрироваться, поэтому нужно искать другие аналоги

UPD 24/03/2022.

Вместо AWS S3 решено было использовать виджет от сервиса uploadcare, который позволяет загружать, настраивать более обширный выбор источника,
а также обрезать изображения. Решено было отказаться от multer библиотеки, и загружать картинки сразу с клиента, на сервер лишь отправлять ссылку на нее
### Неправильное хранение токена для oauth2
Гугл прелоставляет спецальный файл в формате json, который нужно подключать для авторизации и работы самого сервиса. Вот только напрямую в сервере хранить 
его было бы странно, однако альтернативные способы, как например, addon для heroku, который создает этот файл из env окружение просто не работал. Пришлось 
отдельно заливать этот файл на сервер, но удалять из git
## Можно реализовать в будущем (TODO)
### Приватность API
Ни один endpoint не контроллируется спецальными правами, связанными с авторизацией или секретными ключами, поэтому можно сделать это для некоторых 
endpoint'ов через middleware
### Продвинутая регистрация
Из-за того, что регистрация никак не регулируется, даже формалным сообщением на email, есть возможность не указывать валидный email, к которому у пользователя есть доступ. А лучше всего регистрацию выстроить с помощью номера телефона.




