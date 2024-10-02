
export default abstract class Repository{
    constructor() {
    }

    async find(query: string): Promise<[]> { return [] };

    findOne<T>(id: number): Promise<T> {
        return Promise.resolve({} as T);
    }

    createOne<T>(data: T): Promise<T> {
        return Promise.resolve({} as T);
    }

    updateOne<T>(id: number, data: T): Promise<T> {
        return Promise.resolve({} as T);
    }

    deleteOne(id: number): Promise<boolean> {
        return Promise.resolve(true)
    }
}
