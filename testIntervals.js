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
            throw new Error("Error " + result)
        }
    });
    console.log("Bounds: OK")
}

var intervalIntersectTests = [
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    
    [
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    [
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftOpenRightClosed(0,1),
    ],
    [
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    [
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftOpenRightClosed(0,1),
    ],
    
    [
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    [
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0),
    ],
    [
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftClosedRightOpen(0,1),
    ],
    [
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftClosedRightOpen(0,1),
    ],
    
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,0)
    ],
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftOpenRightClosed(0,1),
    ],
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundClosed, 0, RightBoundOpen, 1],
        Interval.intersect,
        Interval.LeftClosedRightOpen(0,1),
    ],
    [
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        [LeftBoundClosed, 0, RightBoundClosed, 1],
        Interval.intersect,
        Interval.LeftClosedRightClosed(0,1),
    ],
    
    [
        [LeftBoundOpen, 0, RightBoundClosed, 1],
        [LeftBoundOpen, 0, RightBoundClosed, 2],
        Interval.intersect,
        Interval.LeftOpenRightClosed(0,1),
    ],
    
    [
        [LeftBoundOpen, 0, RightBoundOpen, 1],
        [LeftBoundOpen, 0, RightBoundOpen, 2],
        Interval.intersect,
        Interval.LeftOpenRightOpen(0,1),
    ],
    
    [
        [LeftBoundClosed, 5, RightBoundClosed, 9],
        [LeftBoundOpen, 0, RightBoundClosed, 6],
        Interval.intersect,
        Interval.LeftClosedRightClosed(5,6),
    ],
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
]

function testInterval(tests) {
    tests.forEach(function(test, i) {
        var i0 = new Interval(new test[0][0](test[0][1]), new test[0][2](test[0][3]))
        var i1 = new Interval(new test[1][0](test[1][1]), new test[1][2](test[1][3]))
        var result = test[2](i0, i1)
        if ((result.isEmpty() && test[3].isEmpty()) || (result.equals(test[3]))) {
            
        } else {
            console.log(i0.toString(), i1.toString(), ":", test[3] ? test[3].toString() : "undefined", i)
            throw new Error("ERROR Intervals" + result.toString() + " instead of " + test[3].toString())
        }
    });
}

var testsPartitionIntervalUnion = [{
        intervals: [
            Interval.LeftOpenRightClosed(6, 10),
            Interval.LeftClosedRightClosed(12, 14),
            Interval.LeftClosedRightOpen(0, 3),
            Interval.LeftClosedRightClosed(4, 8),
        ],
        result: [
            Interval.LeftClosedRightOpen(0, 3),
            Interval.LeftClosedRightClosed(4, 10),
            Interval.LeftClosedRightClosed(12, 14),
        ],
        f: PartitionInterval.union
    }
]

function testPartitionInterval(tests) {
    tests.forEach(function(test) {
        var pi = new PartitionInterval()
        test.intervals.forEach(function(interval) {
            test.f(pi, interval)
        })
        var result = pi.toArray()
        if (result.length === test.result.length) {
            result.forEach(function(interval, i) {
                if (!interval.equals(test.result[i])) {
                    throw new Error()
                }
            })
        } else {
            throw new Error("PartitionInterval.union(): ERROR " + result, test.result)
        }
    })
}

function test() {
    testBounds(boundsTests)

    testInterval(intervalIntersectTests)
    console.log("Interval.intersect(): OK")

    testInterval(intervalUnionTests)
    console.log("Interval.union(): OK")
    
    testInterval(intervalDifferenceTests)
    console.log("Interval.difference(): OK")
    
    testPartitionInterval(testsPartitionIntervalUnion)
    console.log("PartitionInterval.union(): OK")

    console.log("DONE")
}