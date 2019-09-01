/*
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
}/**/

function test() {
    /*
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

    console.log("DONE")/**/
    /*
    var operations = [
        PartitionInterval.union,
        // PartitionInterval.intersect,
        PartitionInterval.difference,
    ]
    var intervals = [
        Interval.LeftClosedRightClosed,
        Interval.LeftClosedRightOpen,
        Interval.LeftOpenRightClosed,
        Interval.LeftOpenRightOpen,
    ]
    var pi = new PartitionInterval()
    var t0 = performance.now();
    for (var i = 0; i < 1000000; i++) {
        // var rl = Math.floor(Math.random() * 1000)
        // var rr = rl + Math.floor(Math.random() * 1000)
        // var ri = Math.floor(Math.random() * intervals.length)
        // var ro = Math.floor(Math.random() * operations.length)
        // operations[ro](pi, intervals[ri](rl, rr))
        var interval = intervals[3](i, i + 1)
        pi = operations[0](pi, interval)
        // console.log(pi.toString() + ",", interval.toString())
    }
    var t1 = performance.now();
    // console.log(pi.toString())
    // console.log(pi)
    console.log("DONE", t1 - t0, pi.toString())
    console.log("DONE", t1 - t0, pi)/**/

    // var pi = PartitionInterval.fromIntervals([
    //     Interval.LeftClosedRightClosed(0,4),
    //     Interval.LeftClosedRightClosed(6,8),
    //     // Interval.LeftClosedRightClosed(10,18),
    // ])

    // var pi = new PartitionInterval()
    // pi = pi.union(Interval.LeftClosedRightClosed(0,4))
    // pi = pi.union(Interval.LeftClosedRightClosed(6,8))
    // pi = pi.union(Interval.LeftClosedRightClosed(20,22))
    // pi = pi.union(Interval.LeftClosedRightClosed(16,17))
    // pi = pi.union(Interval.LeftClosedRightClosed(4,15))

    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    var intervals = [
        Interval.LeftClosedRightClosed(0,4),
        Interval.LeftClosedRightClosed(2,3),
        Interval.LeftClosedRightClosed(5,9),
        Interval.LeftClosedRightClosed(23,34),
        Interval.LeftClosedRightClosed(12,13),
        Interval.LeftClosedRightClosed(14,15),
        Interval.LeftClosedRightClosed(16,17),
        Interval.LeftClosedRightClosed(16,17),
        Interval.LeftOpenRightClosed(15,18),
        Interval.LeftClosedRightOpen(13,15),
    ]

    var res = PartitionInterval.fromIntervals([
        Interval.LeftClosedRightClosed(0,4),
        Interval.LeftClosedRightClosed(5,9),
        Interval.LeftClosedRightClosed(12,18),
        Interval.LeftClosedRightClosed(23,34),
    ])

    console.log()
    console.log()
    console.log()
    for (var i = 0; i < 1; i++) {
        shuffle(intervals)
        var tmp = PartitionInterval.fromIntervals(intervals)
        if (!res.equals(tmp)) {
            console.log("false", res.toString() + ",", tmp.toString())
            break
        }
        if (i === 0) {
            console.log("true")
        }
    }

    // console.log(PartitionInterval.fromIntervals(intervals).toString())

    // console.log(pi.toString(), pi)
    // console.log(pi)
    // pi = pi.rotateLeft()

    // console.log(pi.toString() + ",", pi.interval.toString())
    // console.log(pi)

}