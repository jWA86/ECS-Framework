export { ISystem };
interface ISystem<T> {
    active: boolean;
    process(args?: any[]): any;
}
