# CRM Table UI (тестовое)

## Запуск

```bash
npm i
npm run dev
```

## Что внутри

- **React + TypeScript + MUI + LESS**
- Таблица на базе **MUI X DataGrid** (sticky header, виртуализация, сортировка, пагинация)
- Все столбцы со скрина:
  - № заявки
  - Направление
  - Запрос счетов
  - Счета выставлены
  - Скачать счета
  - Ответственный
  - Наименование
  - ИНН
  - КФ ВВ оплачено
  - КФ ОДО оплачено
  - ЧВ оплачено
  - ВСТ оплачено
  - Тип объектов
  - Статус заявки
  - Тип документов
  - Контроль
  - Замечания
  - Скачать замечание
  - Дата регистрации

## Структура

- `src/app/App.tsx` — каркас страницы
- `src/features/requests/RequestsPage.tsx` — контейнер фичи
- `src/features/requests/components/RequestsToolbar.tsx` — фильтры + действия
- `src/features/requests/components/RequestsTable.tsx` — сборка таблицы (фильтрация + сортировка)
- `src/features/requests/requests.columns.tsx` — конфигурация колонок
- `src/features/requests/requests.mock.ts` — мок-данные (48 строк)
- `src/features/requests/components/RequestsTable.less` — стили таблицы (зебра/hover/sticky колонка)
- `src/shared/ui/TextEllipsis.tsx` — усечение с тултипом
- `src/shared/utils/format.ts` — форматирование валюты
