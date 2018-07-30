import { expect } from "chai";
import "mocha";
import { ComponentFactory, System, SystemManager } from "../../src/entry";
import { GameLoop } from "../../src/GameLoop";
import { TIMESTAMP } from "../../src/pollyFill";
import * as DEFAULT_CONF from "../../src/utils/DefaultConfig";
import { TimeMeasureComponent, TimeMeasureSystem, TimeMeasureSystemEndMark, TimeMeasureSystemStartMark, TimeMeasureUtil } from "../../src/utils/TimeMeasureUtil";

// RequestAnimationFrame doesn't work if the page/tab is in background, so these tests have to be run in the browsers, Karma won't make it works.

const isRequestAnimationFrameWorking = () => {
    let rafWorking = false;
    expect(requestAnimationFrame).to.not.be.equal(undefined);

    // pause after 500ms
    // then check that loop has been called more than once
    let frameId = 0;
    let firedCount = 0;

    function loop() {
        firedCount += 1;
        frameId = requestAnimationFrame(loop);
    }

    loop();

    setTimeout(() => {
        cancelAnimationFrame(frameId);
        if (firedCount > 10) {
            rafWorking = true;
        } else {
            rafWorking = false;
        }
        expect(rafWorking, "WARNING ! RequestAnimationFrame not working, run tests in foreground").to.equal(true);
    }, 800);

};

const isPerformanceWorking = () => {
    expect(performance).to.not.equal(undefined);
    expect(performance.now()).to.be.greaterThan(0);
    expect(performance.mark, "window.performance.mark is not defined").to.not.equal(undefined);
};

describe("TimeMeasureUtil", () => {
    // system that do some dummy calculation so that we have something to measure
    class DummySystem extends System<{ res: number }> {
        public hasRun = false;
        public _parameters = { res: 0 };
        constructor() { super(); }
        public process() {
            this.execute();
        }
        public execute(params?: { res: number }) {
            this.sleep(10);
            this.hasRun = true;
        }
        public sleep(ms) {
            const date = new Date();
            let curDate: Date = null;
            do { curDate = new Date(); }
            while (Number(curDate) - Number(date) < ms);
        }
    }

    let sysManager: SystemManager;
    let s1Id: string;
    let s2Id: string;
    let s3Id: string;
    let s4Id: string;

    beforeEach(() => {
        isRequestAnimationFrameWorking();
        isPerformanceWorking();
        sysManager = new SystemManager();
        s1Id = sysManager.pushSystem(new DummySystem(), false);
        s2Id = sysManager.pushSystem(new DummySystem());
        s3Id = sysManager.pushSystem(new DummySystem());
        s4Id = sysManager.pushSystem(new DummySystem());
    });
    describe("Constructor", () => {
        it("should instantiate a component factory if one is not passed as a parameter", () => {
            const tm = new TimeMeasureUtil(sysManager);
            expect(tm.timeMeasurePool.size).to.equal(DEFAULT_CONF.TM_POOL_SIZE);
        });
    });
    describe("get", () => {
        it("get current performance.measure", (done) => {
            const tm = new TimeMeasureUtil(sysManager);
            const tmComponent = tm.install(s1Id);
            tmComponent.frequency = Number.MAX_SAFE_INTEGER;
            const gl = new GameLoop(sysManager);
            expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(false);

            gl.start();
            setTimeout(() => {
                gl.pause();
                const timer = gl.currentTimer;
                expect(timer.time).to.be.approximately(800, 50);
                expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(true);

                const res = tm.getMeasures(tmComponent.systemId);
                expect(res.length).to.be.greaterThan(1);
                expect(res[0].duration).to.not.equal(undefined);
                done();
            }, 800);
        });
    });
    describe("Install", () => {
        it("return the timeMeasure component that holds time measures", () => {
            const tm = new TimeMeasureUtil(sysManager);
            const res = tm.install(s1Id);
            expect(res).to.not.equal(undefined);
        });
        it("the timeMeasureComponent should have a meadureId, the last measure, the minimum, maximum and mean of the measure data set", () => {
            const tm = new TimeMeasureUtil(sysManager);
            const tmComponent = tm.install(s1Id);
            expect(tmComponent.systemId).to.not.equal("");
            expect(tmComponent.lastT).to.equal(0);
            expect(tmComponent.minT).to.equal(0);
            expect(tmComponent.maxT).to.equal(0);
            expect(tmComponent.meanT).to.equal(0);

        });
        it("instantiate and insert a system before and after the system to measure", () => {
            const tm = new TimeMeasureUtil(sysManager);
            const tmComponent = tm.install(s1Id);
            expect(sysManager.get("TimeMeasureSystemStartMark")).to.not.equal(undefined);
            expect(sysManager.get("TimeMeasureSystemEndMark")).to.not.equal(undefined);
            const systems = sysManager.getNonFixedTSSystemsArray();

            expect(systems[0]).to.be.instanceof(TimeMeasureSystemStartMark);
            expect(systems[2]).to.be.instanceof(TimeMeasureSystemEndMark);

        });

    });
    describe("Uninstall", () => {
        it("should remove the 2 systems inserted and free the component", () => {
            const tm = new TimeMeasureUtil(sysManager);
            const tmC = tm.install(s2Id);
            expect(tmC).to.not.equal(undefined);

            tm.uninstall(s2Id);

            const systems = sysManager.getNonFixedTSSystemsArray();
            systems.forEach((v, index) => {
                if (index === 1) {
                    expect(systems[index - 1]).to.not.instanceof(TimeMeasureSystemStartMark || TimeMeasureSystemEndMark);
                    expect(systems[index + 1]).to.not.instanceof(TimeMeasureSystemStartMark || TimeMeasureSystemEndMark);
                }
            });

            expect(tm.timeMeasurePool.values[0].entityId).to.equal(0);
        });
    });
    describe("When GameLoop is running", () => {
        it("the TimeMeasure component should be updated with time data", (done) => {

            const tm = new TimeMeasureUtil(sysManager);
            const tmComponent = tm.install(s1Id);
            tmComponent.frequency = 100;
            const gl = new GameLoop(sysManager);
            expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(false);
            expect(tmComponent.lastT).to.equal(0);
            expect(tmComponent.maxT).to.equal(0);
            expect(tmComponent.minT).to.equal(0);
            expect(tmComponent.meanT).to.equal(0);

            gl.start();

            setTimeout(() => {
                gl.pause();
                const timer = gl.currentTimer;
                expect(timer.time).to.be.approximately(800, 50);
                expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(true);

                expect(tmComponent.lastT, "lastT").to.be.greaterThan(0);
                expect(tmComponent.maxT, "maxT").to.be.greaterThan(0);
                expect(tmComponent.minT, "minT").to.be.greaterThan(0);
                expect(tmComponent.meanT, "meanT").to.be.greaterThan(0);
                done();
            }, 800);
        });
        it("I should be able to compute the min, max and mean at a fixed frequency", (done) => {
            const tm = new TimeMeasureUtil(sysManager);
            const tmComponent = tm.install(s1Id);
            // Test with low frequency update, make sure it's not updated
            // then change the frequency and make sure it update
            tmComponent.frequency = Number.MAX_VALUE;

            const endingSys = sysManager.get("TimeMeasureSystemEndMark") as TimeMeasureSystemEndMark;
            // mock an update
            endingSys.lastUpdate = TIMESTAMP.now();

            const gl = new GameLoop(sysManager);
            expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(false);
            expect(tmComponent.lastT).to.equal(0);
            expect(tmComponent.maxT).to.equal(0);
            expect(tmComponent.minT).to.equal(0);
            expect(tmComponent.meanT).to.equal(0);

            gl.start();
            setTimeout(() => {
                gl.pause();
                expect(gl.currentTimer.time).to.be.greaterThan(0);

                expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(true);
                // it should not have been updated
                expect(tmComponent.lastT).to.be.equal(0);
                expect(tmComponent.maxT).to.be.equal(0);
                expect(tmComponent.minT).to.be.equal(0);
                expect(tmComponent.meanT).to.be.equal(0);

                // every 10ms
                tmComponent.frequency = 1000 / 100;
                gl.start();

                setTimeout(() => {
                    gl.pause();
                    expect(gl.currentTimer.time).to.be.greaterThan(0);
                    expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(true);
                    // it should have been updated
                    expect(tmComponent.minT).to.be.greaterThan(0);
                    expect(tmComponent.maxT).to.be.greaterThan(0);
                    expect(tmComponent.lastT).to.be.greaterThan(0);
                    expect(tmComponent.meanT).to.be.greaterThan(0);

                    done();
                }, 1000);
            }, 300);

        });
        it("clear should clear performance.measure", (done) => {
            const tm = new TimeMeasureUtil(sysManager);
            const tmComponent = tm.install(s1Id);
            tmComponent.frequency = Number.MAX_SAFE_INTEGER;
            const gl = new GameLoop(sysManager);

            gl.start();
            setTimeout(() => {
                gl.pause();
                const timer = gl.currentTimer;
                expect(timer.time).to.be.greaterThan(0);
                expect((sysManager.get(s1Id) as DummySystem).hasRun).to.equal(true);
                const tmSys: TimeMeasureSystem = sysManager.getNonFixedTSSystemsArray()[2] as TimeMeasureSystem;
                expect(tmSys.getMeasures().length).to.be.greaterThan(0);
                tmSys.clearMeasures();
                expect(tmSys.getMeasures().length).to.equal(0);
                done();
            }, 600);
        });
    });
});
