import { IComponent, IComponentFactory } from "./IComponentFactory";
export { ISystem };

interface ISystem<P> {
    /**
     * Wether to process the system in the gameloop or not
     */
    active: boolean;
    parameters: P;
    /** Assemble every components from paramsSource with the same entityId and pass it to the execute methode  */
    process(...args: any[]);
    /** Execution on the provided component and additionnals arguments provided in the process methode */
    execute(P, ... args: any[]);
    /**
     *
     * @param paramKey
     * @param pool
     * @param paramNameInSource
     */
    setParamSource<C extends IComponent>(paramKey: keyof P | "*", pool: IComponentFactory<C>, paramNameInSource?: keyof C);
}
