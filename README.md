# Установка приложения `cloud_disk`
Данный проект нигде не хостится, поэтому, вам придется выполнить эти шаги из инструкции

### О проекте
Аналог облачного хранилища Google Drive. Сохраняйте свои файлы на своей базе данных и свободно ими пользуйтесь.   
При желании проект можно захостить.  

### Установка самого проекта
Установите на свое устройство этот проект и поместите его в папку "client".

### Установка пакетов проекта
Проект разбит на две части:
+ Клиентская часть [cloud_disk-frontend](https://github.com/seishunn/cloud_disk-frontend)
+ Серверная часть  [cloud_disk-backend](https://github.com/seishunn/cloud_disk-backend)    
  При открытии проекта переидите в `client`, в терминале введите следующую команду
```js 
    npm i
```

### Последний шаг
Приложение установлено и его можно запускать. (Также не забудьте настроить и установить сервер)
```js
    cd .\client
    npm start
```
И приложение и сервер должны быть одновременно запущены. Для этого откройте два терминала и в одном из них запустите `приложение`, а в другом, `сервер`.   
После успешного запуска сервера, переидите в [cloud_disk-backend](https://github.com/seishunn/cloud_disk-backend) и выполните настройку и установку сервера / базы данных.
