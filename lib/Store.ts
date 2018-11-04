export = class Store<T extends object, A extends object> {
    private store: T;
    private readonly reducer: (state: T, action: A) => T;
    private subscriptions: Array<(() => void)> = [];

    constructor(reducer: (state: T, action: A) => T, initialState: T) {
        this.reducer = reducer;

        this.store = initialState;
    }

    /**
     * Сообщение состоянию о новом действии
     * @param action
     */
    public dispatch(action: A) {
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