const res = [];
interface IRes {
    "time": number;
    "nbComponents": number;
    "nbPool": number;
    "nbParam": number;
    "sys": string;
}

describe.only("stats", () => {
    describe("1000 components", () => {
        it("mean 1000, 10, 10", () => {
            const f = filter(1000, 10, 10);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 1000, 10, 10, previousSys " + meanPSys);
            console.log("mean 1000, 10, 10, newSys " + meanNewSys);
            console.log("mean 1000, 10, 10, newSys2 " + meanNewSys2);
        });
        it("mean 1000, 10, 2", () => {
            const f = filter(1000, 10, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 1000, 10, 2, previousSys " + meanPSys);
            console.log("mean 1000, 10, 2, newSys " + meanNewSys);
            console.log("mean 1000, 10, 2, newSys2 " + meanNewSys2);
        });
        it("mean 1000, 10, 1", () => {
            const f = filter(1000, 10, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1000, 10, 1, previousSys " + meanPSys);
            console.log("mean 1000, 10, 1, newSys " + meanNewSys);
            console.log("mean 1000, 10, 1, newSys2 " + meanNewSys2);
        });
        it("mean 1000, 4, 4", () => {
            const f = filter(1000, 4, 4);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1000, 4, 4, previousSys " + meanPSys);
            console.log("mean 1000, 4, 4, newSys " + meanNewSys);
            console.log("mean 1000, 4, 4, newSys2 " + meanNewSys2);
        });
        it("mean 1000, 4, 1", () => {
            const f = filter(1000, 4, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1000, 4, 1, previousSys " + meanPSys);
            console.log("mean 1000, 4, 1, newSys " + meanNewSys);
            console.log("mean 1000, 4, 1, newSys2 " + meanNewSys2);
        });
        it("mean 1000, 4, 2", () => {
            const f = filter(1000, 4, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1000, 4, 2, previousSys " + meanPSys);
            console.log("mean 1000, 4, 2, newSys " + meanNewSys);
            console.log("mean 1000, 4, 2, newSys2 " + meanNewSys2);
        });
    });
    describe("500 components", () => {
        it("mean 500, 10, 10", () => {
            const f = filter(500, 10, 10);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 500, 10, 10, previousSys " + meanPSys);
            console.log("mean 500, 10, 10, newSys " + meanNewSys);
            console.log("mean 500, 10, 10, newSys2 " + meanNewSys2);
        });
        it("mean 500, 10, 2", () => {
            const f = filter(500, 10, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 500, 10, 2, previousSys " + meanPSys);
            console.log("mean 500, 10, 2, newSys " + meanNewSys);
            console.log("mean 500, 10, 2, newSys2 " + meanNewSys2);
        });
        it("mean 500, 10, 1", () => {
            const f = filter(500, 10, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 500, 10, 1, previousSys " + meanPSys);
            console.log("mean 500, 10, 1, newSys " + meanNewSys);
            console.log("mean 500, 10, 1, newSys2 " + meanNewSys2);
        });
        it("mean 500, 4, 4", () => {
            const f = filter(500, 4, 4);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 500, 4, 4, previousSys " + meanPSys);
            console.log("mean 500, 4, 4, newSys " + meanNewSys);
            console.log("mean 500, 4, 4, newSys2 " + meanNewSys2);
        });
        it("mean 500, 4, 1", () => {
            const f = filter(500, 4, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 500, 4, 1, previousSys " + meanPSys);
            console.log("mean 500, 4, 1, newSys " + meanNewSys);
            console.log("mean 500, 4, 1, newSys2 " + meanNewSys2);
        });
        it("mean 500, 4, 2", () => {
            const f = filter(500, 4, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 500, 4, 2, previousSys " + meanPSys);
            console.log("mean 500, 4, 2, newSys " + meanNewSys);
            console.log("mean 500, 4, 2, newSys2 " + meanNewSys2);
        });
    });
    describe("100 components", () => {
        it("mean 100, 10, 10", () => {
            const f = filter(100, 10, 10);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 100, 10, 10, previousSys " + meanPSys);
            console.log("mean 100, 10, 10, newSys " + meanNewSys);
            console.log("mean 100, 10, 10, newSys2 " + meanNewSys2);
        });
        it("mean 100, 10, 2", () => {
            const f = filter(100, 10, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 100, 10, 2, previousSys " + meanPSys);
            console.log("mean 100, 10, 2, newSys " + meanNewSys);
            console.log("mean 100, 10, 2, newSys2 " + meanNewSys2);
        });
        it("mean 100, 10, 1", () => {
            const f = filter(100, 10, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 100, 10, 1, previousSys " + meanPSys);
            console.log("mean 100, 10, 1, newSys " + meanNewSys);
            console.log("mean 100, 10, 1, newSys2 " + meanNewSys2);
        });
        it("mean 100, 4, 4", () => {
            const f = filter(100, 4, 4);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 100, 4, 4, previousSys " + meanPSys);
            console.log("mean 100, 4, 4, newSys " + meanNewSys);
            console.log("mean 100, 4, 4, newSys2 " + meanNewSys2);
        });
        it("mean 100, 4, 1", () => {
            const f = filter(100, 4, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 100, 4, 1, previousSys " + meanPSys);
            console.log("mean 100, 4, 1, newSys " + meanNewSys);
            console.log("mean 100, 4, 1, newSys2 " + meanNewSys2);
        });
        it("mean 100, 4, 2", () => {
            const f = filter(100, 4, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 100, 4, 2, previousSys " + meanPSys);
            console.log("mean 100, 4, 2, newSys " + meanNewSys);
            console.log("mean 100, 4, 2, newSys2 " + meanNewSys2);
        });
    });
    describe("50", () => {
        it("mean 50, 10, 10", () => {
            const f = filter(50, 10, 10);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 50, 10, 10, previousSys " + meanPSys);
            console.log("mean 50, 10, 10, newSys " + meanNewSys);
            console.log("mean 50, 10, 10, newSys2 " + meanNewSys2);
        });
        it("mean 50, 10, 2", () => {
            const f = filter(50, 10, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 50, 10, 2, previousSys " + meanPSys);
            console.log("mean 50, 10, 2, newSys " + meanNewSys);
            console.log("mean 50, 10, 2, newSys2 " + meanNewSys2);
        });
        it("mean 50, 10, 1", () => {
            const f = filter(50, 10, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 50, 10, 1, previousSys " + meanPSys);
            console.log("mean 50, 10, 1, newSys " + meanNewSys);
            console.log("mean 50, 10, 1, newSys2 " + meanNewSys2);
        });
        it("mean 50, 4, 4", () => {
            const f = filter(50, 4, 4);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 50, 4, 4, previousSys " + meanPSys);
            console.log("mean 50, 4, 4, newSys " + meanNewSys);
            console.log("mean 50, 4, 4, newSys2 " + meanNewSys2);
        });
        it("mean 50, 4, 1", () => {
            const f = filter(50, 4, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 50, 4, 1, previousSys " + meanPSys);
            console.log("mean 50, 4, 1, newSys " + meanNewSys);
            console.log("mean 50, 4, 1, newSys2 " + meanNewSys2);
        });
        it("mean 50, 4, 2", () => {
            const f = filter(50, 4, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 50, 4, 2, previousSys " + meanPSys);
            console.log("mean 50, 4, 2, newSys " + meanNewSys);
            console.log("mean 50, 4, 2, newSys2 " + meanNewSys2);
        });
    });
    describe("10 components", () => {
        it("mean 10, 10, 10", () => {
            const f = filter(10, 10, 10);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 10, 10, 10, previousSys " + meanPSys);
            console.log("mean 10, 10, 10, newSys " + meanNewSys);
            console.log("mean 10, 10, 10, newSys2 " + meanNewSys2);
        });
        it("mean 10, 10, 2", () => {
            const f = filter(10, 10, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 10, 10, 2, previousSys " + meanPSys);
            console.log("mean 10, 10, 2, newSys " + meanNewSys);
            console.log("mean 10, 10, 2, newSys2 " + meanNewSys2);
        });
        it("mean 10, 10, 1", () => {
            const f = filter(10, 10, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 10, 10, 1, previousSys " + meanPSys);
            console.log("mean 10, 10, 1, newSys " + meanNewSys);
            console.log("mean 10, 10, 1, newSys2 " + meanNewSys2);
        });
        it("mean 10, 4, 4", () => {
            const f = filter(10, 4, 4);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 10, 4, 4, previousSys " + meanPSys);
            console.log("mean 10, 4, 4, newSys " + meanNewSys);
            console.log("mean 10, 4, 4, newSys2 " + meanNewSys2);
        });
        it("mean 10, 4, 1", () => {
            const f = filter(10, 4, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 10, 4, 1, previousSys " + meanPSys);
            console.log("mean 10, 4, 1, newSys " + meanNewSys);
            console.log("mean 10, 4, 1, newSys2 " + meanNewSys2);
        });
        it("mean 10, 4, 2", () => {
            const f = filter(10, 4, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 10, 4, 2, previousSys " + meanPSys);
            console.log("mean 10, 4, 2, newSys " + meanNewSys);
            console.log("mean 10, 4, 2, newSys2 " + meanNewSys2);
        });
    });
    describe("1 components", () => {
        it("mean 1, 10, 10", () => {
            const f = filter(1, 10, 10);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 1, 10, 10, previousSys " + meanPSys);
            console.log("mean 1, 10, 10, newSys " + meanNewSys);
            console.log("mean 1, 10, 10, newSys2 " + meanNewSys2);
        });
        it("mean 1, 10, 2", () => {
            const f = filter(1, 10, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);
            console.log("mean 1, 10, 2, previousSys " + meanPSys);
            console.log("mean 1, 10, 2, newSys " + meanNewSys);
            console.log("mean 1, 10, 2, newSys2 " + meanNewSys2);
        });
        it("mean 1, 10, 1", () => {
            const f = filter(1, 10, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1, 10, 1, previousSys " + meanPSys);
            console.log("mean 1, 10, 1, newSys " + meanNewSys);
            console.log("mean 1, 10, 1, newSys2 " + meanNewSys2);
        });
        it("mean 1, 4, 4", () => {
            const f = filter(1, 4, 4);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1, 4, 4, previousSys " + meanPSys);
            console.log("mean 1, 4, 4, newSys " + meanNewSys);
            console.log("mean 1, 4, 4, newSys2 " + meanNewSys2);
        });
        it("mean 1, 4, 1", () => {
            const f = filter(1, 4, 1);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1, 4, 1, previousSys " + meanPSys);
            console.log("mean 1, 4, 1, newSys " + meanNewSys);
            console.log("mean 1, 4, 1, newSys2 " + meanNewSys2);
        });
        it("mean 1, 4, 2", () => {
            const f = filter(1, 4, 2);
            const newSys = f.filter((v) => {
                return v.sys === "newSystem";
            });
            const pSys = f.filter((v) => {
                return v.sys === "previousSystem";
            });
            const newSys2 = f.filter((v) => {
                return v.sys === "newSystem2";
            });

            const meanNewSys = mean(newSys);
            const meanPSys = mean(pSys);
            const meanNewSys2 = mean(newSys2);

            console.log("mean 1, 4, 2, previousSys " + meanPSys);
            console.log("mean 1, 4, 2, newSys " + meanNewSys);
            console.log("mean 1, 4, 2, newSys2 " + meanNewSys2);
        });
    });

});

const filter = (nbComp: number, nbParam: number, nbPool) => {
    return res.filter((v) => {
        return (v.nbComponents === nbComp) && (nbParam === v.nbParam) && (nbPool === v.nbPool);
    });
};

const mean = (arr: IRes[]) => {
    let total = 0;
    arr.forEach((r) => {
        total += r.time;
    });
    return total / arr.length;
};
