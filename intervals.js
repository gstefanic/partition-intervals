var ERROR_WRONG_ARGUMENTS = "Wrong arguments!"
var ERROR_ABSTRACT_CLASS = "Abstract class!"
var ERROR_ABSTRACT_METHOD = "Abstract method!"

function union(s, a) {
    console.log(JSON.stringify(a))
    if (!s.value) {
        console.log("case 0")
        return {
            value: a,
            left: {height: 0},
            right: {height: 0},
            height: 1
        }
    } else if (a[0] >= s.value[0] && a[1] <= s.value[1]) {
        console.log("case 0.1")
        return s
    } else if (a[1] < s.value[0]) {
        console.log("case 0.2")
        s.left = union(s.left, a)
    } else if (a[0] > s.value[1]) {
        console.log("case 0.3")
        s.right = union(s.right, a)
    } else {
        if (a[0] < s.value[0]) {
            if (!s.left.value && a[1] <= s.value[1]) {
                console.log("case 1")
                s.value[0] = a[0]
            } else {
                console.log("case 2")
                s.left = union(s.left, [a[0], Math.min(s.value[0], a[1])])
            }
        }
        if (a[1] > s.value[1]) {
            if (!s.value[1]) {
                console.log("case 3")
                s.value[1] = a[1]
            } else {
                console.log("case 4")
                s.right = union(s.right, [Math.max(s.value[1], a[0]), a[1]])
            }
        }
    }
    if (s.left.value && s.left.value[1] === s.value[0]) {
        s.value[0] = s.left.value[0]
        var tmp = s.left
        s.left = s.left.left
        delete tmp
    }
    if (s.right.value && s.right.value[0] === s.value[1]) {
        s.value[1] = s.right.value[1]
        var tmp = s.right
        s.right = s.right.right
        delete tmp
    }
    return s
}
function toString(s) {
    if (!s || !s.value) {
        return " "
    } else {
        return toString(s.left) + "(" + s.value[0] + ", " + s.value[1] + ")" + toString(s.right)
    }
}
// var s = {height: 0,}
// s = union(s, [1,2])
// s = union(s, [8,9])
// s = union(s, [3,4])
// s = union(s, [4,6])
// // s = union(s, [2,8])
// console.log(toString(s))
// console.log(JSON.stringify(s))
// console.log(s)

/*
PartitionInterval
 - properties:
    - interval: Interval
    - leftChild: PartitionInterval
    - rightChild: PartitionInterval
    - height: number
 - constructor()
 - constructor(interval: Interval)
 - function union(interval: Interval): PartitionInterval
 - function union(interval: PartitionInterval): PartitionInterval
 - function intersect(interval: Interval): PartitionInterval
 - function intersect(interval: PartitionInterval): PartitionInterval
 - function difference(interval: Interval): PartitionInterval
 - function difference(interval: PartitionInterval): PartitionInterval
 - function symmetricDifference(interval: Interval): PartitionInterval
 - function symmetricDifference(interval: PartitionInterval): PartitionInterval
 - function copy([interval: PartitionInterval]): PartitionInterval
 - function isEmpty(): boolean
 - function contains(interval: Interval): boolean
 - function contains(n: number): boolean
 - static function areDisjoint(interval1: PartitionInterval, interval2: PartitionInterval): boolean
 - static function areDisjoint(intervals: Array<PartitionInterval>): boolean
 - function toArray(): Array<Interval>
 - function toString(): String
Interval
 - properties:
    - leftBound: LeftBound
    - rightBound: RightBound
 - constructor(left: LeftBound, right: RightBound)
 - static function LeftClosedRightClosed(left: number, right: number): Interval
 - static function LeftOpenRightOpen(left: number, right: number): Interval
 - static function LeftClosedRightOpen(left: number, right: number): Interval
 - static function LeftOpenRightClosed(left: number, right: number): Interval
 - function copy(): Interval
 - function difference(interval1: Interval [, interval2: Interval]): Interval
 - function compare(interval1 Interval [, interval2: Interval]): Enum[CONTAINS, EXTEND_LEFT, EXTEND_RIGHT, EXTEND, DISJOINT_LEFT, DISJOINT_RIGHT]
 - function toString(): String
Singleton
 - constructor(n: number)
Bound
 - properties:
   - value: number
 - function compareTo(bound: Bound): number
LeftBound
LeftBoundOpen
LeftBoundClosed
RightBound
RightBoundOpen
RightBoundClosed
/**/

// ---------------- CompareResults Enum ---------------- //
var CompareResults = Object.freeze({
    "SUPERSET":   0,
    "EXTENDS_LEFT": 1,
    "EXTENDS_RIGHT":  2,
    "SUBSET":  3,
    "DISJOINT_LEFT":  4,
    "DISJOINT_RIGHT":  5,
})

// -------------------- Bound Class -------------------- //
/**
 * @constructor
 * @param {number} value
 */
var Bound = function(value) {
    if (isNaN(value)) {
        throw new Error(ERROR_WRONG_ARGUMENTS + " " + value)
    }
    this.value = value
    if (this.constructor === Bound) {
        throw new Error(ERROR_ABSTRACT_CLASS);
    }
}

/**
 * @param {Bound} bound
 * @return {number}
 */
Bound.prototype.compareTo = function(bound) {
    throw new Error(ERROR_ABSTRACT_METHOD);
}

/**
 * @return {Bound}
 */
Bound.prototype.copy = function() {
    return new this.constructor(this.value)
}

/**
 * @param {Bound} bound
 * @return {boolean}
 */
Bound.prototype.equals = function(bound) {
    return this.constructor === bound.constructor && this.value === bound.value
}

// ------------------ LeftBound Class ------------------ //
/**
 * @constructor
 * @param {number} value
 */
var LeftBound = function(value) {
    Bound.apply(this, arguments);
    if (this.constructor === Bound) {
        throw new Error(ERROR_ABSTRACT_CLASS);
    }
}
LeftBound.prototype = Object.create(Bound.prototype)
LeftBound.prototype.constructor = LeftBound

// ---------------- LeftBoundOpen Class ---------------- //
/**
 * @constructor
 * @param {number} value
 */
var LeftBoundOpen = function(value) {
    LeftBound.apply(this, arguments);
}
LeftBoundOpen.prototype = Object.create(LeftBound.prototype)
LeftBoundOpen.prototype.constructor = LeftBoundOpen

/**
 * @param {Bound} bound
 * @return {boolean}
 */
LeftBoundOpen.prototype.compareTo = function(bound) {
    if (!(bound instanceof Bound)) {
        throw new Error(ERROR_WRONG_ARGUMENTS);
    }

    if (bound instanceof LeftBoundOpen) {
        if (this.value > bound.value) return 1
        if (this.value < bound.value) return -1
        return 0
    } else if (bound instanceof LeftBoundClosed) {
        if (this.value >= bound.value) return 1
        return -1
    } else {
        if (this.value > bound.value) return 1
        return -1
    }
}

/**
 * @return {String}
 */
LeftBoundOpen.prototype.toString = function() {
    return "(" + this.value
}

/**
 * @return {Bound}
 */
LeftBoundOpen.prototype.complement = function() {
    return new RightBoundClosed(this.value)
}

// ---------------- LeftBoundClosed Class ---------------- //
/**
 * @constructor
 * @param {number} value
 */
var LeftBoundClosed = function(value) {
    LeftBound.apply(this, arguments);
}
LeftBoundClosed.prototype = Object.create(LeftBound.prototype)
LeftBoundClosed.prototype.constructor = LeftBoundClosed

/**
 * @param {Bound} bound
 * @return {boolean}
 */
LeftBoundClosed.prototype.compareTo = function(bound) {
    if (!(bound instanceof Bound)) {
        throw new Error(ERROR_WRONG_ARGUMENTS);
    }

    if (bound instanceof LeftBoundClosed || bound instanceof RightBoundClosed) {
        if (this.value > bound.value) return 1
        if (this.value < bound.value) return -1
        return 0
    } else if (bound instanceof LeftBoundOpen) {
        if (this.value > bound.value) return 1
        return -1
    } else if (bound instanceof RightBoundOpen) {
        if (this.value < bound.value) return -1
        return 1
    }
}

/**
 * @return {String}
 */
LeftBoundClosed.prototype.toString = function() {
    return "[" + this.value
}

/**
 * @return {Bound}
 */
LeftBoundClosed.prototype.complement = function() {
    return new RightBoundOpen(this.value)
}

// ------------------ RightBound Class ------------------ //
/**
 * @constructor
 * @param {number} value
 */
var RightBound = function(value) {
    Bound.apply(this, arguments);
    if (this.constructor === Bound) {
        throw new Error(ERROR_ABSTRACT_CLASS);
    }
}
RightBound.prototype = Object.create(Bound.prototype)
RightBound.prototype.constructor = RightBound

// ---------------- RightBoundOpen Class ---------------- //
/**
 * @constructor
 * @param {number} value
 */
var RightBoundOpen = function(value) {
    RightBound.apply(this, arguments);
}
RightBoundOpen.prototype = Object.create(RightBound.prototype)
RightBoundOpen.prototype.constructor = RightBoundOpen

/**
 * @param {Bound} bound
 * @return {boolean}
 */
RightBoundOpen.prototype.compareTo = function(bound) {
    if (!(bound instanceof Bound)) {
        throw new Error(ERROR_WRONG_ARGUMENTS);
    }
    if (bound instanceof RightBoundOpen) {
        if (this.value === bound.value) return 0
        if (this.value < bound.value) return -1
        return 1
    } else {
        if (this.value > bound.value) return 1
        return -1
    }
}

/**
 * @return {String}
 */
RightBoundOpen.prototype.toString = function() {
    return this.value + ")"
}

/**
 * @return {Bound}
 */
RightBoundOpen.prototype.complement = function() {
    return new LeftBoundClosed(this.value)
}

// ---------------- RightBoundClosed Class ---------------- //
/**
 * @constructor
 * @param {number} value
 */
var RightBoundClosed = function(value) {
    RightBound.apply(this, arguments);
}
RightBoundClosed.prototype = Object.create(RightBound.prototype)
RightBoundClosed.prototype.constructor = RightBoundClosed

/**
 * @param {Bound} bound
 * @return {boolean}
 */
RightBoundClosed.prototype.compareTo = function(bound) {
    if (!(bound instanceof Bound)) {
        throw new Error(ERROR_WRONG_ARGUMENTS);
    }
    if (bound instanceof RightBoundClosed || bound instanceof LeftBoundClosed) {
        if (this.value === bound.value) return 0
        if (this.value < bound.value) return -1
        return 1
    } else if (bound instanceof RightBoundOpen) {
        if (this.value < bound.value) return -1
        return 1
    } else if (bound instanceof LeftBoundOpen) {
        if (this.value <= bound.value) return -1
        return 1
    }
}

/**
 * @return {Bound}
 */
RightBoundClosed.prototype.complement = function() {
    return new LeftBoundOpen(this.value)
}

/**
 * @return {String}
 */
RightBoundClosed.prototype.toString = function() {
    return this.value + "]"
}

// ---------------- Interval Class ---------------- //
/**
 * @constructor
 * @param {leftBound} LeftBound
 * @param {rightBound} RightBound
 */
var Interval = function(leftBound, rightBound) {
    if (!(leftBound instanceof LeftBound && rightBound instanceof RightBound)) {
        throw new Error(ERROR_WRONG_ARGUMENTS);
    }
    if (leftBound.value > rightBound.value) return Interval.EmptyInterval()
    this.leftBound = leftBound
    this.rightBound = rightBound
}

/**
 * @param {number} leftValue
 * @param {number} rightValue
 * @return {Interval}
 */
Interval.LeftClosedRightClosed = function(leftValue, rightValue) {
    if (isNaN(leftValue) || isNaN(rightValue)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (leftValue > rightValue) {
        return undefined
    }
    return new Interval(
        new LeftBoundClosed(leftValue),
        new RightBoundClosed(rightValue)
    )
}

/**
 * @param {number} leftValue
 * @param {number} rightValue
 * @return {Interval}
 */
Interval.LeftClosedRightOpen = function(leftValue, rightValue) {
    if (isNaN(leftValue) || isNaN(rightValue)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (leftValue > rightValue) {
        return undefined
    }
    return new Interval(
        new LeftBoundClosed(leftValue),
        new RightBoundOpen(rightValue)
    )
}

/**
 * @param {number} leftValue
 * @param {number} rightValue
 * @return {Interval}
 */
Interval.LeftOpenRightClosed = function(leftValue, rightValue) {
    if (isNaN(leftValue) || isNaN(rightValue)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (leftValue > rightValue) {
        return undefined
    }
    return new Interval(
        new LeftBoundOpen(leftValue),
        new RightBoundClosed(rightValue)
    )
}

/**
 * @param {number} leftValue
 * @param {number} rightValue
 * @return {Interval}
 */
Interval.LeftOpenRightOpen = function(leftValue, rightValue) {
    if (isNaN(leftValue) || isNaN(rightValue)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (leftValue > rightValue) {
        return undefined
    }
    return new Interval(
        new LeftBoundOpen(leftValue),
        new RightBoundOpen(rightValue)
    )
}

/**
 * @return {Interval}
 */
Interval.EmptyInterval = function() {
    return Interval.LeftOpenRightOpen(0, 0)
}

/**
 * @param {number} value
 * @return {Interval}
 */
Interval.Singleton = function(value) {
    return Interval.LeftClosedRightClosed(value, value)
}

/**
 * @param {Interval} interval
 * @return {boolean}
 */
Interval.prototype.isEmpty = function() {
    return (this.leftBound instanceof LeftBoundOpen) 
    && (this.rightBound instanceof RightBoundOpen)
    && (this.rightBound.value - this.leftBound.value <= 1)
}

/**
 * @param {Interval} interval
 * @return {Interval}
 */
Interval.prototype.intersect = function(interval) {
    return this.assign(Interval.intersect(this, interval))
}

/**
 * @param {Interval} interval
 * @return {Interval}
 */
Interval.prototype.union = function(interval) {
    return this.assign(Interval.intersect(this, interval))
}

/**
 * @param {Interval} interval
 * @return {Interval}
 */
Interval.prototype.difference = function(interval) {
    return this.assign(Interval.difference(this, interval))
}

/**
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @return {Interval}
 */
Interval.intersect = function(interval1, interval2) {
    if (!(interval1 instanceof Interval && interval2 instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    var rightLeft = interval1.rightBound.compareTo(interval2.leftBound)
    var leftRight = interval1.leftBound.compareTo(interval2.rightBound)
    // console.log(leftLeft, rightLeft, leftRight, rightRight)
    if (rightLeft < 0 || leftRight > 0 || interval1.isEmpty() || interval2.isEmpty()) 
        return Interval.LeftOpenRightOpen(0, 0)
    
    var leftLeft = interval1.leftBound.compareTo(interval2.leftBound)
    var rightRight = interval1.rightBound.compareTo(interval2.rightBound)
    if (leftLeft <= 0 && rightRight >= 0) 
        return interval2.copy()
    if (leftLeft >= 0 && rightRight <= 0) 
        return interval1.copy()
    if (leftLeft <= 0 && rightLeft >= 0) 
        return new Interval(interval2.leftBound.copy(), interval1.rightBound.copy())
    if (rightRight >= 0 && leftRight <= 0) 
        return new Interval(interval1.leftBound.copy(), interval2.rightBound.copy())
    return Interval.LeftOpenRightOpen(0,0)
}

/**
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @return {Interval}
 */
Interval.union = function(interval1, interval2) {
    if (!(interval1 instanceof Interval && interval2 instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (interval1.isEmpty())
        return interval2.copy()
    if (interval2.isEmpty())
        return interval1.copy()
    if (Interval.intersect(interval1, interval2).isEmpty()) {
        return Interval.EmptyInterval()
    }

    var leftLeft = interval1.leftBound.compareTo(interval2.leftBound)
    var rightRight = interval1.rightBound.compareTo(interval2.rightBound)
    var leftBound = (leftLeft < 0) ? (interval1.leftBound.copy()) : (interval2.leftBound.copy())
    var rightBound = (rightRight > 0) ? (interval1.rightBound.copy()) : (interval2.rightBound.copy())
    
    return new Interval(leftBound, rightBound)
}

/**
 * @param {Interval} interval1
 * @param {Interval} interval2
 * @return {Interval}
 */
Interval.difference = function(interval1, interval2) {
    if (!(interval1 instanceof Interval && interval2 instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (interval1.isEmpty())
        return interval1.copy()
    if (interval2.isEmpty())
        return interval1.copy()
    var intersection = Interval.intersect(interval1, interval2)
    if (intersection.isEmpty()) {
        return interval1.copy()
    }
    var leftLeft = interval1.leftBound.compareTo(interval2.leftBound)
    var leftBound
    var rightBound
    if (leftLeft < 0) {
        leftBound = interval1.leftBound.copy()
        rightBound = interval2.leftBound.complement()
    } else {
        leftBound = interval2.rightBound.complement()
        rightBound = interval1.rightBound.copy()
    }
    return new Interval(leftBound, rightBound)
}

/**
 * @param {Interval} interval
 * @return {boolean}
 */
Interval.prototype.equals = function(interval) {
    if (!(interval instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    return this.isEmpty() && interval.isEmpty() || this.leftBound.equals(interval.leftBound) 
    && this.rightBound.equals(interval.rightBound)
}

/**
 * @param {Interval} interval
 * @return {boolean}
 */
Interval.prototype.isLeftOf = function(interval) {
    if (!(interval instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    return Interval.intersect(this, interval).isEmpty() && this.rightBound.compareTo(interval.leftBound) < 0
}

/**
 * @param {Interval} interval
 * @return {boolean}
 */
Interval.prototype.isRightOf = function(interval) {
    if (!(interval instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    return Interval.intersect(this, interval).isEmpty() && this.leftBound.compareTo(interval.rightBound) > 0
}

/**
 * @param {Interval} interval
 * @return {boolean}
 */
Interval.prototype.includes = function(interval) {
    if (!(interval instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    return interval.isEmpty() || this.leftBound.compareTo(interval.leftBound) <= 0 && this.rightBound.compareTo(interval.rightBound) >= 0
}

/**
 * @return {String}
 */
Interval.prototype.toString = function() {
    return this.leftBound.toString() + "," + this.rightBound.toString()
}

/**
 * @return {Interval}
 */
Interval.prototype.copy = function() {
    return new Interval(
        this.leftBound.copy(),
        this.rightBound.copy()
    )
}

Interval.assign = function(interval1, interval2) {
    if (!(interval1 instanceof Interval && interval2 instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    // delete interval1.leftBound
    interval1.leftBound = interval2.leftBound
    // delete interval1.rightBound
    interval1.rightBound = interval2.rightBound
    return interval1
}

Interval.prototype.assign = function(interval) {
    return Interval.assign(this, interval)
}

// ---------------- PartitionInterval Class ---------------- //
/**
 * @constructor
 * @param {leftBound} interval
 */
var PartitionInterval = function(interval) {
    if (interval !== undefined) {
        if (!(interval instanceof Interval)) {
            throw new Error(ERROR_WRONG_ARGUMENTS)
        } else {
            this.interval = interval
            this.left = new PartitionInterval()
            this.right = new PartitionInterval()
        }
    }
}

/**
 * @param {Array<Interval>} intervals
 * @return {PartitionInterval}
 */
PartitionInterval.fromIntervals = function(intervals) {
    if (intervals.constructor === Array) {
        var partitionInterval = new PartitionInterval()
        intervals.forEach(function(interval) {
            partitionInterval.union(interval)
        });
    } else {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
}

/**
 * @param {PartitionInterval} partitionInterval1
 * @param {PartitionInterval} partitionInterval2
 * @return {PartitionInterval}
 */
PartitionInterval.assign = function(partitionInterval1, partitionInterval2) {
    if (!(partitionInterval1 instanceof PartitionInterval && partitionInterval2 instanceof PartitionInterval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    // delete partitionInterval1.interval
    partitionInterval1.interval = partitionInterval2.interval
    // delete partitionInterval1.left
    partitionInterval1.left = partitionInterval2.left
    // delete partitionInterval1.right
    partitionInterval1.right = partitionInterval2.right
    return partitionInterval1
}

/**
 * @param {PartitionInterval} partitionInterval
 * @return {PartitionInterval}
 */
PartitionInterval.prototype.assign = function(partitionInterval) {
    return PartitionInterval.assign(this, partitionInterval)
}

/**
 * @param {Interval} interval
 * @return {PartitionInterval}
 */
PartitionInterval.prototype.union = function(interval) {
    return PartitionInterval.union(this, interval)
}

/**
 * @param {PartitionInterval} partitionInterval
 * @param {Interval} interval
 * @return {PartitionInterval}
 */
PartitionInterval.union = function(partitionInterval, interval) {
    if (!(partitionInterval instanceof PartitionInterval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    console.log("Inserting " + interval.toString() + " into " + partitionInterval.toString())
    if (!partitionInterval.interval) {
        return partitionInterval.assign(new PartitionInterval(interval))
    } else if (partitionInterval.interval.includes(interval)) {
        console.log("CASE 0.1")
        return partitionInterval
    } else if (interval.isLeftOf(partitionInterval.interval)) {
        console.log("CASE 0.2")
        partitionInterval.left.assign(PartitionInterval.union(partitionInterval.left, interval))
    } else if (interval.isRightOf(partitionInterval.interval)) {
        console.log("CASE 0.3")
        partitionInterval.right.assign(PartitionInterval.union(partitionInterval.right, interval))
    } else {
        console.log("nothing")
        if (interval.leftBound.compareTo(partitionInterval.interval.leftBound) < 0) {
            if (!partitionInterval.left.interval && 
                interval.rightBound.compareTo(partitionInterval.rightBound) <= 0) {
                console.log("CASE 1")
                partitionInterval.interval.leftBound = interval.leftBound.copy()
            } else {
                console.log("CASE 2")
                partitionInterval.left.assign(PartitionInterval.union(partitionInterval.left, 
                    new Interval(
                        interval.leftBound.copy(), 
                        partitionInterval.interval.leftBound.compareTo(interval.rightBound) < 0 ? partitionInterval.interval.leftBound.complement() : interval.rightBound.copy()
                    )
                ))
            }
        }
    }
    return partitionInterval
}

/**
 * @return {String}
 */
PartitionInterval.prototype.toString = function() {
    if (this.interval) {
        var left = this.left.toString()
        var right = this.right.toString()
        return (left ? left + " " : "") + this.interval.toString() + (right ? " " + right : "")
    }
}

/************************************************************/
var Animal = function() {
    if (this.constructor === Animal) {
        throw new Error("Abstract class!");
    }
};

Animal.prototype.say = function() {
    throw new Error("Abstract method!");
}

var Cat = function() {
    Animal.apply(this, arguments);
};
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.say = function() {
    console.log('meow');
}
/************************************************************/