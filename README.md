# Проект: (Takeoff Staff) Contacts List

<img width="1440" alt="Снимок экрана 2022-10-10 в 15 25 40" src="https://user-images.githubusercontent.com/34587236/194812252-cefd9813-0a99-40c0-8825-d173b290a730.png">

## Данное веб приложение позволяет:
* Производить авторизацию по логину и паролю.
* Просматривать контакты, редактировать, удалять, добавлять. (Доступ к контактам происходит только после авторизации в системе)
* Производить поиск по списку контактов.


Для начала работы вам необходимо установить:
1. Node.js https://nodejs.org/en/download/
2. Git Bash https://gitforwindows.org/ если вы используете Windows OS.

## Команды для консоли

Клонирование проекта и установка зависимостей:
```
git clone https://github.com/volodin32104/take-off-staff.git
npm install
```
**(при работе из под Mac Os используйте sudo npm install для избежаний ошибок связанных с правами доступа во время установки)**

Запускаем JSON Server и открываем приложение на локальном сервере:
```
1. json-server db.json -m ./node_modules/json-server-auth (Запускаем JSON Server на http://localhost:3000/)
2. npm run start
```

## Используемые технологии:

1. React JS **18.2**
2. Стилизация приложения с помощью Tailwind CSS **3.1.8**
3. Redux Toolkit **1.8.5**
4. React-redux **8.0.4**
5. Axios **0.27.2**
6. React Router **6.4.1**
7. TypeScript **4.8.4**
8. Node **16.14.2**
9. Работа с системой контроля версий Git


