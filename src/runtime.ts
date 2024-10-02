import { usecaseResult } from "./shared/cases";

export const App: (adapter?: any) => Runtime<any> = (adapter) =>
  new Runtime(adapter);

class Runtime<T> {
  private dependencies: any;
  //crear type adapter
  private adapter: any;
  private useCaseResult?: usecaseResult;

  constructor(adapter: any) {
    this.adapter = adapter;
    this.dependencies = {};
  }

  attach(factory: (dependencies: T) => void): this {
    factory(this.dependencies);
    return this;
  }

  async run(params?: T) {
    const { logger: log } = this.dependencies;
    this.useCaseResult = await this.adapter(params, this.dependencies);
    return this.useCaseResult;
  }
}
