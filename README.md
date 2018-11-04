# shrilux
Flux библиотека

[![Build Status](https://travis-ci.org/KingManiya/shrilux.svg?branch=master)](https://travis-ci.org/KingManiya/shrilux)
[![Coverage Status](https://coveralls.io/repos/github/KingManiya/shrilux/badge.svg)](https://coveralls.io/github/KingManiya/shrilux)

# Установка
```sh
npm install git+https://github.com/KingManiya/shrilux.git
```

# Разработка
```sh
git clone https://github.com/KingManiya/shrilux.git
cd shrilux
npm install
npm start
npm test
```

# Тестирование
Перед тестирование необходимо собрать js файл из TypeScript
```sh
npm start
npm test
```

# Документация

### Store
Для работы с библиотекой необходимо создать и хранить экземпляр хранилища
```js
import Store from 'shrilux';

const store = new Store(reducer, initialState)
```
Обязательны два параметра: reducer и initialState

#### reducer
Функция которая знает, как менять хранилище в зависимости от действия.
Должна возвращать новое состояние

```js
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      store.list.push(action.payload);
      return store;
    case 'SUB':
      store.list.pop();
      return store;
  }

  return state;
}
```
*action.type используется в качестве примера, возможно вы будите по другому определять тип события.*

#### initialState
Изначальное состояние хранилища
```js
const initialState = {list: []};
```

### dispatch
#### Сообщение состоянию о новом действии

```js
function add(5) {
  store.dispatch({
    type: 'ADD',
    payload: 5,
  })
}

function sub() {
  store.dispatch({
    type: 'SUB',
  })
}
```
*Действие удобнее всего передавать в качестве объекта с указанием типа действия.*

### subscribe
#### Подписка на изменение состояния

Позволяет узнавать об изменении данных в хранилище, после какого то действия.

Для подписки необходимо передать функцияю callback, которая сработает после изменения состояния.
```js
store.subscribe(callback);
```

### unsubscribe
#### Отписка от изменения состояния

Для отключения подписки об обновлениях необходимо передать в unsubscribe функцию callback,
которой была произведена подписка, либо результат функции subscribe
```js
store.unsubscribe(callback);
```

### getState
#### Возвращает состояние

Позволяет получить текущее состояние хранилища
```js
const state = store.getState();
```
