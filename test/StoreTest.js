const Store = require('../index.js');
const {assert} = require('chai');

describe('Проверка хранилища', () => {
  it('Инициализация c reducer', () => {
    const reducer = () => ({});

    const store = new Store(reducer);

    assert.isObject(store);
  });

  it('Проверка изначального состояния', () => {
    const reducer = () => ({});
    const initialState = {a: 1, b: {c: 3, d: 4}};

    const store = new Store(reducer, initialState);
    assert.deepEqual(initialState, store.getState());
  });

  it('Событие для изменения - dispatch', () => {
    const reducer = () => ({});

    const store = new Store(reducer);

    assert.isFunction(store.dispatch);
  });

  it('Подписка - subscribe', (done) => {
    const reducer = () => ({});

    const store = new Store(reducer);

    assert.isFunction(store.subscribe);
    store.subscribe(done);

    store.dispatch({});
  });

  it('Отписка - unsubscribe', () => {
    const reducer = () => ({});

    const store = new Store(reducer);

    const sub = store.subscribe(() => {assert.fail('Произошёл вызов подписки, после отписания')});

    store.unsubscribe(sub);

    store.dispatch({});
  });

});