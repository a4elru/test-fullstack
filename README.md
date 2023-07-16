# Что это?

  Тестовый проект - сервис, позволяющий читать, размещать, редактировать и удалять записи (посты).

# Используемые технологии
  - Backend
    - Nest.js
    - TypeORM (PostgreSQL)
    - Swagger 

# Запуск через Docker

```bash
git clone https://github.com/a4elru/test-fullstack && cd test-fullstack && docker compose up -d
```

# Запуск вручную

1. Клонировать репозиторий и установить зависимости для Backend.
2. Настроить PostgreSQL, проверить опции подключения в *backend\\src\\config.ts*.
3. Запустить Backend: `yarn start` / `npm run start`.

# Endpoints

  Информация о доступных методах API доступна после запуска сервиса по адресу `http://localhost:3333/docs`.
