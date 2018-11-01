"use strict";
module.exports = /** @class */ (function () {
    function Store(reducer, initialState) {
        if (initialState === void 0) { initialState = {}; }
        this.store = {};
        this.subscriptions = [];
        this.reducer = reducer;
        this.store = initialState;
    }
    /**
     * Сообщение состоянию о новом действии
     * @param action
     */
    Store.prototype.dispatch = function (action) {
        // Через функцию reducer получаем новое состояние
        this.store = this.reducer(this.store, action);
        // Сообщаем подписчикам об изменениях состояния
        this.subscriptions.forEach(function (callback) { return callback(); });
    };
    /**
     * Подписка на изменение состояния
     * @param callback
     */
    Store.prototype.subscribe = function (callback) {
        this.subscriptions.push(callback);
        return callback;
    };
    /**
     * Отписка от изменения состояния
     * @param callback
     */
    Store.prototype.unsubscribe = function (callback) {
        this.subscriptions = this.subscriptions.filter(function (func) { return func !== callback; });
    };
    /**
     * Возвращает состояние
     */
    Store.prototype.getState = function () {
        return this.store;
    };
    return Store;
}());
