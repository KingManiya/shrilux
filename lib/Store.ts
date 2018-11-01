export = class Store {
    private store: object = {};
    private reducer: (state: object, action: object) => object;
    private subscriptions: Array<(() => void)> = [];

    constructor(reducer: (state: object, action: object) => object, initialState: object = {}) {
        this.reducer = reducer;

        this.store = initialState;
    }

    /**
     * Сообщение состоянию о новом действии
     * @param action
     */
    public dispatch(action: object) {
        // Через функцию reducer получаем новое состояние
        this.store = this.reducer(this.store, action);

        // Сообщаем подписчикам об изменениях состояния
        this.subscriptions.forEach((callback) => callback());
    }

    /**
     * Подписка на изменение состояния
     * @param callback
     */
    public subscribe(callback: () => void) {
        this.subscriptions.push(callback);
        return callback;
    }

    /**
     * Отписка от изменения состояния
     * @param callback
     */
    public unsubscribe(callback: () => void) {
        this.subscriptions = this.subscriptions.filter((func) => func !== callback);
    }

    /**
     * Возвращает состояние
     */
    public getState() {
        return this.store;
    }
};