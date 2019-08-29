var boundsTests = [
    // LeftBoundOpen
    [
        {type: LeftBoundOpen, value: 0, },
        {type: LeftBoundOpen, value: 0, },
        0
    ],
    [
        {type: LeftBoundOpen, value: 0, },
        {type: RightBoundOpen, value: 0, },
        -1
    ],
    [
        {type: LeftBoundOpen, value: 0, },
        {type: LeftBoundClosed, value: 0, },
        1
    ],
    [
        {type: LeftBoundOpen, value: 0, },
        {type: RightBoundClosed, value: 0, },
        -1
    ],
    
    // LeftBoundClosed
    [
        {type: LeftBoundClosed, value: 0, },
        {type: LeftBoundOpen, value: 0, },
        -1
    ],
    [
        {type: LeftBoundClosed, value: 0, },
        {type: RightBoundOpen, value: 0, },
        1
    ],
    [
        {type: LeftBoundClosed, value: 0, },
        {type: LeftBoundClosed, value: 0, },
        0
    ],
    [
        {type: LeftBoundClosed, value: 0, },
        {type: RightBoundClosed, value: 0, },
        0
    ],

    // RightBoundOpen
    [
        {type: RightBoundOpen, value: 0, },
        {type: LeftBoundOpen, value: 0, },
        -1
    ],
    [
        {type: RightBoundOpen, value: 0, },
        {type: RightBoundOpen, value: 0, },
        0
    ],
    [
        {type: RightBoundOpen, value: 0, },
        {type: LeftBoundClosed, value: 0, },
        -1
    ],
    [
        {type: RightBoundOpen, value: 0, },
        {type: RightBoundClosed, value: 0, },
        -1
    ],

    // RightBoundClosed
    [
        {type: RightBoundClosed, value: 0, },
        {type: LeftBoundOpen, value: 0, },
        -1
    ],
    [
        {type: RightBoundClosed, value: 0, },
        {type: RightBoundOpen, value: 0, },
        1
    ],
    [
        {type: RightBoundClosed, value: 0, },
        {type: LeftBoundClosed, value: 0, },
        0
    ],
    [
        {type: RightBoundClosed, value: 0, },
        {type: RightBoundClosed, value: 0, },
        0
    ],
]

function testBounds(tests) {
    tests.forEach(function(test) {
        var b0 = new test[0].type(test[0].value)
        var b1 = new test[1].type(test[1].value)
        var result = b0.compareTo(b1)
        if (result !== test[2]) {
            throw new Error(result + " instead of " + test[2])
        }
    });
}

var intervalIntersectTests = [
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,1),
    ],
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,1),
    ],
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,1),
    ],
    // [
    //     [LeftBoundOpen, 0, RightBoundOpen, 1],
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightOpen(0,0),
    // ],
    
    // [
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     [LeftBoundOpen, 0, RightBoundOpen, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightOpen(0,0),
    // ],
    // [
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightClosed(0,1),
    // ],
    // [
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     [LeftBoundClosed, 0, RightBoundOpen, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightOpen(0,0),
    // ],
    // [
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightClosed(0,1),
    // ],
    
    // [
    //     [LeftBoundClosed, 0, RightBoundOpen, 1],
    //     [LeftBoundOpen, 0, RightBoundOpen, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightOpen(0,0),
    // ],
    // [
    //     [LeftBoundClosed, 0, RightBoundOpen, 1],
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightOpen(0,0),
    // ],
    // [
    //     [LeftBoundClosed, 0, RightBoundOpen, 1],
    //     [LeftBoundClosed, 0, RightBoundOpen, 1],
    //     Interval.intersect,
    //     Interval.LeftClosedRightOpen(0,1),
    // ],
    // [
    //     [LeftBoundClosed, 0, RightBoundOpen, 1],
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     Interval.intersect,
    //     Interval.LeftClosedRightOpen(0,1),
    // ],
    
    // [
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     [LeftBoundOpen, 0, RightBoundOpen, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightOpen(0,0)
    // ],
    // [
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     Interval.intersect,
    //     Interval.LeftOpenRightClosed(0,1),
    // ],
    // [
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     [LeftBoundClosed, 0, RightBoundOpen, 1],
    //     Interval.intersect,
    //     Interval.LeftClosedRightOpen(0,1),
    // ],
    // [
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     [LeftBoundClosed, 0, RightBoundClosed, 1],
    //     Interval.intersect,
    //     Interval.LeftClosedRightClosed(0,1),
    // ],
    
    // [
    //     [LeftBoundOpen, 0, RightBoundClosed, 1],
    //     [LeftBoundOpen, 0, RightBoundClosed, 2],
    //     Interval.intersect,
    //     Interval.LeftOpenRightClosed(0,1),
    // ],
    
    // [
    //     [LeftBoundOpen, 0, RightBoundOpen, 1],
    //     [LeftBoundOpen, 0, RightBoundOpen, 2],
    //     Interval.intersect,
    //     Interval.LeftOpenRightOpen(0,1),
    // ],
    
    // [
    //     [LeftBoundClosed, 5, RightBoundClosed, 9],
    //     [LeftBoundOpen, 0, RightBoundClosed, 6],
    //     Interval.intersect,
    //     Interval.LeftClosedRightClosed(5,6),
    // ],
]

var intervalUnionTests = [
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundOpen, 1, RightBoundClosed, 2],
        Interval.union,
        Interval.EmptyInterval(),
    ],
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundClosed, 1, RightBoundClosed, 2],
        Interval.union,
        Interval.LeftClosedRightClosed(0,2),
    ],
]

var intervalDifferenceTests = [
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundOpen, 1, RightBoundClosed, 2],
        Interval.difference,
        Interval.LeftClosedRightClosed(0,1),
    ],
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundClosed, 1, RightBoundClosed, 2],
        Interval.difference,
        Interval.LeftClosedRightOpen(0,1),
    ],
    [
        [LeftBoundClosed, 0, RightBoundOpen, 5],
        [LeftBoundClosed, 3, RightBoundClosed, 5],
        Interval.difference,
        Interval.LeftClosedRightOpen(0,3),
    ],
    [
        [LeftBoundClosed, 3, RightBoundClosed, 5],
        [LeftBoundClosed, 0, RightBoundOpen, 5],
        Interval.difference,
        Interval.LeftClosedRightClosed(5,5),
    ],
    [
        [LeftBoundClosed, 3, RightBoundClosed, 5],
        [LeftBoundClosed, 6, RightBoundOpen, 7],
        Interval.difference,
        Interval.LeftClosedRightClosed(3, 5),
    ],
    [
        [LeftBoundClosed, 3, RightBoundClosed, 5],
        [LeftBoundClosed, 3, RightBoundClosed, 5],
        Interval.difference,
        Interval.LeftOpenRightOpen(0, 0),
    ],
]

function testInterval(tests) {
    tests.forEach(function(test, i) {
        var i0 = new Interval(new test[0][0](test[0][1]), new test[0][2](test[0][3]))
        var i1 = new Interval(new test[1][0](test[1][1]), new test[1][2](test[1][3]))
        var result = test[2](i0, i1)
        if ((result.isEmpty() && test[3].isEmpty()) || (result.equals(test[3]))) {
            
        } else {
            console.log(i0.toString(), i1.toString(), ":", test[3] ? test[3].toString() : "undefined", i)
            throw new Error(result.toString() + " instead of " + test[3].toString())
        }
    });
}

var testsPartitionIntervalUnion = [
    {
        init: PartitionInterval.fromIntervals([Interval.LeftOpenRightClosed(6, 10)]),
        intervals: [
            Interval.LeftClosedRightClosed(12, 14),
            Interval.LeftClosedRightOpen(0, 3),
            Interval.LeftClosedRightClosed(4, 8),
        ],
        result:
            PartitionInterval.fromIntervals([
                Interval.LeftClosedRightOpen(0, 3), 
                Interval.LeftClosedRightClosed(4, 10), 
                Interval.LeftClosedRightClosed(12, 14),
            ]),
        f: PartitionInterval.union,
    }
]

var testsPartitionIntervalDifference = [
    {
        init: PartitionInterval.fromIntervals([Interval.LeftOpenRightClosed(6, 10), Interval.LeftClosedRightClosed(12, 14), Interval.LeftClosedRightOpen(0, 3)]),
        intervals: [
            Interval.LeftOpenRightClosed(2, 8),
        ],
        result:
            PartitionInterval.fromIntervals([
                Interval.LeftClosedRightClosed(0, 2), 
                Interval.LeftOpenRightClosed(8, 10), 
                Interval.LeftClosedRightClosed(12, 14)
            ]),
        f: PartitionInterval.difference,
    },
    // {
    //     init: PartitionInterval.fromIntervals([Interval.LeftClosedRightClosed(6, 10), Interval.LeftClosedRightClosed(7, 10), Interval.LeftClosedRightClosed(0, 2),]),
    //     intervals: [
    //         Interval.LeftOpenRightClosed(2, 8),
    //     ],
    //     result: [
    //         PartitionInterval.fromIntervals([Interval.LeftOpenRightClosed(8, 10)]),
    //     ],
    //     f: PartitionInterval.difference
    // },
]

function testPartitionInterval(tests) {
    tests.forEach(function(test) {
        var pi = test.init
        // console.log("START STATE:", pi.toString())
        test.intervals.forEach(function(interval) {
            test.f(pi, interval)
        })
        if (!pi.equals(test.result)) {
            throw new Error(pi + " instead of " + test.result)
        }
    })
}

function test() {
    console.log("Testing ...")
    try {
        testBounds(boundsTests)
        console.log("Bounds: OK")
    } catch (error) {
        console.log("Bounds: ERROR", error.message)
    }

    try {
        testInterval(intervalIntersectTests)
        console.log("Interval.intersect(): OK")
    } catch (error) {
        console.log("Interval.intersect(): ERROR", error.message)
    }

    try {
        testInterval(intervalUnionTests)
        console.log("Interval.union(): OK")
    } catch (error) {
        console.log("Interval.union(): ERROR", error.message)
    }
    
    try {
        testInterval(intervalDifferenceTests)
        console.log("Interval.difference(): OK")
    } catch (error) {
        console.log("Interval.difference(): ERROR", error.message)
    }
    
    try {
        testPartitionInterval(testsPartitionIntervalUnion)
        console.log("PartitionInterval.union(): OK")
    } catch (error) {
        console.log("PartitionInterval.union(): ERROR", error)
    }
    
    try {
        testPartitionInterval(testsPartitionIntervalDifference)
        console.log("PartitionInterval.difference(): OK")
    } catch (error) {
        console.log("PartitionInterval.difference(): ERROR", error)
    }

    console.log("DONE")

    // var i1 = Interval.LeftClosedRightClosed(6, 10)
    // var i2 = Interval.LeftClosedRightClosed(7, 10)
    // var i3 = Interval.LeftClosedRightClosed(0, 2)
    // var i4 = Interval.LeftOpenRightOpen(3, 5)
    // var i5 = Interval.LeftClosedRightClosed(1, 16)

    // var pi = new PartitionInterval()

    // pi = pi.union(i1).union(i2).union(i3).union(i4)
    // // console.log(pi.toString())
    // // console.log(i5.toString())
    // // console.log(pi.intersect(i5).toString())
    // // console.log(pi.intersect(i5).difference(Interval.LeftClosedRightClosed(4, 10)).toString())
    
    // // pi = pi.union(i1)
    // console.log(pi.toString())
    // pi = pi.difference(Interval.LeftClosedRightClosed(1, 10))
    
    // var pi = PartitionInterval.fromIntervals([Interval.LeftOpenRightClosed(6, 10), Interval.LeftClosedRightClosed(12, 14), Interval.LeftClosedRightOpen(0, 3)])
    // console.log(pi)
    // console.log(pi.difference(Interval.LeftOpenRightClosed(2, 8)).toString())

    // var pi1 = PartitionInterval.fromIntervals([
    //     Interval.LeftClosedRightClosed(4,9),
    //     Interval.LeftClosedRightClosed(0,3),
    //     Interval.LeftClosedRightClosed(20, 21),
    // ])
    // console.log(pi1.toString())

    // var pi2 = PartitionInterval.fromIntervals([
    //     Interval.LeftOpenRightOpen(20, 21),
        // Interval.LeftOpenRightOpen(2, 5),
        // Interval.LeftOpenRightOpen(5, 9),
    // ])
    // console.log(pi2.toString())

    // console.log(pi1.difference(pi2).toString())


    // console.log(Interval.LeftClosedRightClosed(2,5).includes(Interval.LeftOpenRightOpen(2,5)))
    // console.log(Interval.LeftClosedRightClosed(2,5).difference(Interval.LeftOpenRightOpen(2,5)).toString())

}