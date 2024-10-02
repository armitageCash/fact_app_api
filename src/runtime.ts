export const App: (adapter?: any) => Runtime<any> = (adapter) => new Runtime(adapter);

class Runtime<T> {
    private dependencies: any;
    private adapter: any;

    constructor(adapter: any) {
        this.adapter = adapter;
        this.dependencies = {};
    }

    attach(factory: (dependencies: T) => void): this {
        factory(this.dependencies);
        return this;
    }

    async run(args?: any) {
        const { logger:log } = this.dependencies;
        try {

            if (args) {
                const result = await this.adapter(args, this.dependencies);
                return result;
            }

            const result = await this.adapter(this.dependencies);
            return result;
        } catch (error:any) {
            log.error("Error running", error.message);
        }
    }
}