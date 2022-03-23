## Server-side (back-end)
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

Как и в client-side части документации, сделаю такое же субъективно разделение проделанной работе на три части:
*
*
*
