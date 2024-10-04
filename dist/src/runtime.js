"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const App = (adapter) => new Runtime(adapter);
exports.App = App;
class Runtime {
    constructor(adapter) {
        this.adapter = adapter;
        this.dependencies = {};
    }
    attach(factory) {
        factory(this.dependencies);
        return this;
    }
    async run(params) {
        const { logger: log } = this.dependencies;
        this.useCaseResult = await this.adapter(params, this.dependencies);
        return this.useCaseResult;
    }
}
//# sourceMappingURL=runtime.js.map