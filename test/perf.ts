// tslint:disable:object-literal-key-quotes
// tslint:disable:object-literal-sort-keys
interface IRes {
    "time": number;
    "nbComponents": number;
    "nbPool": number;
    "nbParam": number;
    "sys": string;
}

describe.only("stats", () => {
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
    it("mean 1000, 10, 1",  () => {
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
    it("mean 1000, 4, 4",  () => {
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
    it("mean 1000, 4, 1",  () => {
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
    it("mean 100, 10, 10",  () => {
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
});
const res =
[
    {
        "time": 0.29999998514540493,
        "nbComponents": 0,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 1,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 5,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 10,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 25,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.29999998514540493,
        "nbComponents": 50,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.4000000189989805,
        "nbComponents": 75,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.5999999993946403,
        "nbComponents": 100,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 1.1999999987892807,
        "nbComponents": 250,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 2.6000000070780516,
        "nbComponents": 500,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 8.600000001024455,
        "nbComponents": 1000,
        "nbParam": 4,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0,
        "nbComponents": 0,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 1,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0,
        "nbComponents": 5,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 10,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 25,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.29999998514540493,
        "nbComponents": 50,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.5000000237487257,
        "nbComponents": 75,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.29999998514540493,
        "nbComponents": 100,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.9000000136438757,
        "nbComponents": 250,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 3.599999996367842,
        "nbComponents": 500,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 1.799999998183921,
        "nbComponents": 1000,
        "nbParam": 4,
        "nbPool": 4,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 0,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 1,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 5,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.20000000949949026,
        "nbComponents": 10,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.3000000142492354,
        "nbComponents": 25,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.5999999993946403,
        "nbComponents": 50,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0.8999999845400453,
        "nbComponents": 75,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 1.0000000183936208,
        "nbComponents": 100,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 4.599999985657632,
        "nbComponents": 250,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 2.2000000171829015,
        "nbComponents": 500,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 5.199999985052273,
        "nbComponents": 1000,
        "nbParam": 10,
        "nbPool": 1,
        "sys": "previousSystem"
    },
    {
        "time": 0,
        "nbComponents": 0,
        "nbParam": 10,
        "nbPool": 10,
        "sys": "previousSystem"
    },
    {
        "time": 0,
        "nbComponents": 1,
        "nbParam": 10,
        "nbPool": 10,
        "sys": "previousSystem"
    },
    {
        "time": 0.09999997564591467,
        "nbComponents": 5,
        "nbParam": 10,
        "nbPool": 10,
        "sys": "previousSystem"
    },
    {
        "time": 0.10000000474974513,
        "nbComponents": 10,
        "nbParam": 10,
        "nbPool": 10,
        "sys": "previousSystem"
    },
    {
        "time": 0.1999999803956598,
        "nbComponents": 25,
        "nbParam": 10,
        "nbPool": 10,
        "sys": "previousSystem"
    },
    {
        "time": 0.39999998989515007,
        "nbComponents": 50,
        "nbParam": 10,
        "nbPool": 10,
        "sys": "previousSystem"
    },
    {
        "time": 0.5000000237487257,
        "nbComponents": 75,
        "nbParam": 10,
        "nbPool": 10,
        "sys": "previousSystem"
    },
    {
        "time": 0.8000000088941306,
        "nbComponents": 100,
        "nbParam": 10,
        "nbPool": 10,
        sys: "previousSystem"
    },
    {
        time: 1.4999999839346856,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.800000005867332,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 8.89999998616986,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 4.200000024866313,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 6.300000008195639,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 10.199999989708886,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.7999999797903001,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.099999983329326,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 3.2999999821186066,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.3999999975785613,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.1000000124331564,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.9000000106170774,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 8.199999982025474,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.3999999975785613,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.599999977974221,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 5.600000004051253,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 11.400000017601997,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.900000002933666,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 5.199999985052273,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 8.90000001527369,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.799999998183921,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 3.499999991618097,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 15.099999989615753,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 6.2000000034458935,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 4.6999999904073775,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 4.799999995157123,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 4.899999999906868,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.1000000124331564,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 3.800000005867332,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 10.500000003958121,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 10.09999998495914,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 6.099999998696148,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 59.5000000030268,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 27.29999998700805,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 66.09999999636784,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.3999999868683517,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 4.100000020116568,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.699999975040555,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 2.2000000171829015,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.9000000106170774,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 4.799999995157123,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.599999996367842,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.5000000237487257,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 6.900000007590279,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.199999988079071,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.0000000076834112,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.8999999922234565,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.200000006472692,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.400000008288771,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.9999999969732016,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.7999999874737114,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.7000000118277967,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.3999999975785613,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.800000005867332,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 8.09999997727573,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 3.300000011222437,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.6000000070780516,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 5.0999999803025275,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 11.499999993247911,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 3.9000000106170774,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.6999999827239662,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.699999975040555,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 4.099999991012737,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.8999999738298357,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 6.300000008195639,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.5000000023283064,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.399999994551763,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 10.799999989103526,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 4.199999995762482,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.4999999839346856,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.200000006472692,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 6.800000002840534,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6000000177882612,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.699999975040555,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.7999999874737114,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.599999996367842,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 6.500000017695129,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.299999992828816,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 5.299999989802018,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 9.799999999813735,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.799999998183921,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.8999999922234565,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.7999999797903001,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 2.599999977974221,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 2.9999999969732016,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.5000000023283064,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 5.000000004656613,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 6.099999998696148,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.0000000076834112,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.5000000023283064,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 6.099999998696148,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 12.699999992037192,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.6000000177882612,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.5000000237487257,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.700000001117587,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.6000000177882612,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.5000000207219273,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 7.299999997485429,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.7000000118277967,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.400000015972182,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 7.000000012340024,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.3999999975785613,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 4.500000010011718,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 9.50000001466833,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.699999975040555,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.6999999827239662,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 2.9999999969732016,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5000000237487257,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.3999999975785613,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 5.600000004051253,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.7999999797903001,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.599999977974221,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.100000009406358,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 11.899999983143061,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 2.0000000076834112,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.9000000106170774,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.6000000177882612,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.1999999773688614,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 6.999999983236194,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5000000237487257,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.300000011222437,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.400000008288771,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.7000000118277967,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.6000000254716724,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 6.4999999885912985,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.2000000171829015,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 4.599999985657632,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 9.29999997606501,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.7000000118277967,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.900000002933666,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.5000000023283064,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 5.000000004656613,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.599999977974221,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.000000004656613,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 11.200000008102506,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 4.500000010011718,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.300000011222437,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 6.4999999885912985,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.1000000124331564,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.599999996367842,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.7999999874737114,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.1000000124331564,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.1999999773688614,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 6.600000022444874,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.299999992828816,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 4.500000010011718,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 9.400000009918585,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.7999999797903001,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.400000008288771,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.800000016577542,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.7999999797903001,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 2.1000000124331564,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 3.1999999773688614,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5000000237487257,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.2999999744351953,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.5000000023283064,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 6.000000023050234,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.7999999797903001,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.6000000070780516,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.299999989802018,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 10.69999998435378,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.8000000272877514,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.700000001117587,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.5000000237487257,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.2999999821186066,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 7.199999992735684,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6000000177882612,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.700000001117587,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 7.400000002235174,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.299999992828816,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.299999992828816,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 4.899999999906868,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 9.30000000516884,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.400000008288771,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.800000016577542,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.400000008288771,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 3.599999996367842,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.3999999975785613,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 4.899999999906868,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.6000000070780516,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.299999989802018,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 10.999999998603016,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.900000002933666,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.6000000254716724,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 2.2000000171829015,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.700000001117587,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 8.7000000057742,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.0000000076834112,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.700000001117587,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.200000006472692,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.699999975040555,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 3.599999996367842,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.1999999773688614,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 6.699999998090789,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.9999999892897904,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.299999992828816,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 5.299999989802018,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 9.70000002416782,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.6999999827239662,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.8999999845400453,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 3.1999999773688614,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.5000000023283064,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 5.000000004656613,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.7000000118277967,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.000000004656613,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 11.499999993247911,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.2999999744351953,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.900000002933666,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 4.199999995762482,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.500000013038516,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.300000011222437,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 6.599999993341044,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.0000000076834112,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.9999999785795808,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.200000006472692,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.7999999874737114,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 2.3999999975785613,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.699999975040555,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.799999998183921,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.300000011222437,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 6.599999993341044,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.199999988079071,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 4.700000019511208,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 9.4999999855645,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.400000008288771,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.7999999874737114,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.500000013038516,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 2.9999999969732016,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.5000000023283064,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 5.999999993946403,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.5000000237487257,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 1.0000000183936208,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.599999977974221,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.600000004051253,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 11.399999988498166,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.5999999886844307,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 1.1999999987892807,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 1.900000002933666,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 3.899999981513247,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 1.500000013038516,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 3.1000000017229468,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 8.10000000637956,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "previousSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 4.0000000153668225,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 2.6999999827239662,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0.7999999797903001,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 3.599999996367842,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 6.500000017695129,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.4000000189989805,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 2.199999988079071,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 4.499999980907887,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 12.900000001536682,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.3000000142492354,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.8000000088941306,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.799999998183921,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 3.700000001117587,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 5,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.09999997564591467,
        nbComponents: 25,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.20000000949949026,
        nbComponents: 50,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 75,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 100,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0.7000000041443855,
        nbComponents: 250,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 1.6999999934341758,
        nbComponents: 500,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 2.9999999969732016,
        nbComponents: 1000,
        nbParam: 4,
        nbPool: 4,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.1999999803956598,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.39999998989515007,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0.4999999946448952,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 1.3000000035390258,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 2.6000000070780516,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 5.000000004656613,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 1,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 0,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 1,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.10000000474974513,
        nbComponents: 5,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0,
        nbComponents: 10,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.29999998514540493,
        nbComponents: 25,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.5999999993946403,
        nbComponents: 50,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 0.9000000136438757,
        nbComponents: 75,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 1.0999999940395355,
        nbComponents: 100,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 2.7000000118277967,
        nbComponents: 250,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 5.900000018300489,
        nbComponents: 500,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    },
    {
        time: 10.399999999208376,
        nbComponents: 1000,
        nbParam: 10,
        nbPool: 10,
        sys: "newSystem2"
    }
]

const filter = (nbComp: number, nbParam: number, nbPool) => {
    return res.filter((v) => {
        return (v.nbComponents ===  nbComp) && (nbParam === v.nbParam) && (nbPool === v.nbPool);
    });
};

const mean = (arr: IRes[]) => {
    let total = 0;
    arr.forEach((r)=> {
        total += r.time;
    });
    return total / arr.length;
};
