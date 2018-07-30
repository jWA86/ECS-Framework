import { IComponent, IComponentFactory } from "./IComponentFactory";
export { ISystem };
interface ISystem<T> {
    /**
     * Wether to process the system in the gameloop or not
     */
    active: boolean;
    parameters: T;
    /** Assemble every components from paramsSource with the same entityId and pass it to the execute methode  */
    process(...args: any[]): any;
    /** Execution on the provided component and additionnals arguments provided in the process methode */
    execute(T: any, ...args: any[]): any;
    /**
     * Set the source of parameter
     * @param paramKey the parameter name
     * @param pool the source of the component containing the parameter
     */
    setParamSource(paramKey: string, pool: IComponentFactory<IComponent>): any;
}
