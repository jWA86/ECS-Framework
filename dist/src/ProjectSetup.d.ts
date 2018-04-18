import { IProjectSetup, IUtil } from "./interfaces";
export { Project };
declare class Project {
    protected _projectName: string;
    project: IProjectSetup;
    protected globalObject: any;
    constructor(globalObject: any, _projectName: string, ...utils: IUtil[]);
    readonly projectName: string;
    /**
     * Clear references so that the project can be garbage collected
     */
    clear(): void;
}
