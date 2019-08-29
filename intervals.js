var ERROR_WRONG_ARGUMENTS = "Wrong arguments!"
var ERROR_ABSTRACT_CLASS = "Abstract class!"
var ERROR_ABSTRACT_METHOD = "Abstract method!"

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
    && (this.rightBound.value - this.leftBound.value <= 0)
}

/**
 * @param {Interval} interval
 * @return {Interval}
 */
Interval.prototype.intersect = function(interval) {
    return Interval.intersect(this.copy(), interval)
}

/**
 * @param {Interval} interval
 * @return {Interval}
 */
Interval.prototype.union = function(interval) {
    return Interval.union(this.copy(), interval)
}

/**
 * @param {Interval} interval
 * @return {Interval}
 */
Interval.prototype.difference = function(interval) {
    return Interval.difference(this.copy(), interval)
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
        return interval1.assign(Interval.EmptyInterval())
    
    var leftLeft = interval1.leftBound.compareTo(interval2.leftBound)
    var rightRight = interval1.rightBound.compareTo(interval2.rightBound)
    if (leftLeft <= 0 && rightRight >= 0) 
        return interval1.assign(interval2.copy())
    if (leftLeft >= 0 && rightRight <= 0) 
        return interval1
    if (leftLeft <= 0 && rightLeft >= 0) 
        return interval1.assign(new Interval(interval2.leftBound.copy(), interval1.rightBound.copy()))
    if (rightRight >= 0 && leftRight <= 0) 
        return interval1.assign(new Interval(interval1.leftBound.copy(), interval2.rightBound.copy()))
    return interval1.assign(Interval.EmptyInterval())
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
        return interval1.assign(interval2.copy())
    if (interval2.isEmpty())
        return interval1
    if (interval1.intersect(interval2).isEmpty()) {
        return interval1.assign(Interval.EmptyInterval())
    }

    var leftLeft = interval1.leftBound.compareTo(interval2.leftBound)
    var rightRight = interval1.rightBound.compareTo(interval2.rightBound)
    var leftBound = (leftLeft < 0) ? (interval1.leftBound.copy()) : (interval2.leftBound.copy())
    var rightBound = (rightRight > 0) ? (interval1.rightBound.copy()) : (interval2.rightBound.copy())
    
    return interval1.assign(new Interval(leftBound, rightBound))
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
    if (interval1.isEmpty() || interval2.isEmpty() || interval1.intersect(interval2).isEmpty()) {
        return interval1
    }
    var leftLeft = interval1.leftBound.compareTo(interval2.leftBound)
    var rightRight = interval1.rightBound.compareTo(interval2.rightBound)
    var leftBound
    var rightBound
    if (leftLeft === 0 && rightRight === 0) {
        return interval1.assign(Interval.EmptyInterval())
    }
    if (leftLeft < 0) {
        leftBound = interval1.leftBound.copy()
        rightBound = interval2.leftBound.complement()
    } else {
        leftBound = interval2.rightBound.complement()
        rightBound = interval1.rightBound.copy()
    }
    return interval1.assign(new Interval(leftBound, rightBound))
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
    interval1.leftBound = interval2.leftBound
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
        if (interval instanceof Interval) {
            this.interval = interval
            this.left = new PartitionInterval()
            this.right = new PartitionInterval()
        } else if (interval instanceof PartitionInterval) {
            this.assign(interval)
        } else {
            throw new Error(ERROR_WRONG_ARGUMENTS)
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
            PartitionInterval.union(partitionInterval, interval)
        });
        return partitionInterval
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
    partitionInterval1.interval = partitionInterval2.interval
    partitionInterval1.left = partitionInterval2.left
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
    return PartitionInterval.union(this.copy(), interval)
}

/**
 * @param {Interval} interval
 * @return {PartitionInterval}
 */
PartitionInterval.prototype.difference = function(interval) {
    return PartitionInterval.difference(this.copy(), interval)
}

/**
 * @param {Interval} interval
 * @return {PartitionInterval}
 */
PartitionInterval.prototype.intersect = function(interval) {
    return PartitionInterval.intersect(this.copy(), interval)
}

/**
 * @param {PartitionInterval} partitionInterval
 * @param {Interval} interval
 * @return {PartitionInterval}
 */
PartitionInterval.union = function(partitionInterval, interval) {
    if (!(partitionInterval instanceof PartitionInterval) || !(interval instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    // console.log("Inserting " + interval.toString() + " into " + partitionInterval.toString())
    if (!partitionInterval.interval) {
        return partitionInterval.assign(new PartitionInterval(interval))
    }
    if (partitionInterval.interval.includes(interval)) {
        console.log("CASE 0.1")
        return partitionInterval
    }
    if (interval.leftBound.compareTo(partitionInterval.interval.leftBound) < 0) {
        // levi rob intervala je bolj levo od levega roba
        if (interval.rightBound.compareTo(partitionInterval.interval.leftBound) <= 0) {
            // desni rob intervala je levo od levega roba
            PartitionInterval.union(partitionInterval.left, interval)
        } else {
            PartitionInterval.union(partitionInterval.left, 
                new Interval(interval.leftBound, partitionInterval.interval.leftBound.complement())
            )
        }
        if (partitionInterval.left.rightMost()) {
            // pridobi najbolj desnega od levega poddrevesa
            var biggestInLeft = partitionInterval.left.rightMost()
            // preveri ali se stikata
            if (biggestInLeft.interval.rightBound.complement().compareTo(partitionInterval.interval.leftBound) >= 0) {
                // razsiri pi na levo
                partitionInterval.interval.leftBound = biggestInLeft.interval.leftBound
                // prevezi
                PartitionInterval.assign(biggestInLeft, biggestInLeft.left.copy())
            }
        }
    }
    if (interval.rightBound.compareTo(partitionInterval.interval.rightBound) > 0) {
        if (interval.leftBound.compareTo(partitionInterval.interval.rightBound) >= 0) {
            PartitionInterval.union(partitionInterval.right, interval)
        } else {
            PartitionInterval.union(partitionInterval.right,
                new Interval(partitionInterval.interval.rightBound.complement(), interval.rightBound)    
            )
        }
        var smallestInRight = partitionInterval.right.leftMost()
        if (smallestInRight.interval.leftBound.complement().compareTo(partitionInterval.interval.rightBound) <= 0) {
            partitionInterval.interval.rightBound = smallestInRight.interval.rightBound
            PartitionInterval.assign(smallestInRight, smallestInRight.right.copy())
        }
    }
    return partitionInterval
}

/**
 * @param {PartitionInterval} partitionInterval
 * @param {Interval} interval
 * @return {PartitionInterval}
 */
PartitionInterval.difference = function(partitionInterval, interval) {
    if (!(partitionInterval instanceof PartitionInterval) || !(interval instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (!partitionInterval.interval) {
        // ce je prazen list
        return partitionInterval
    }
    if (partitionInterval.interval.isEmpty()) {
        // ce je praze, ga naredi da je prazen list
        return partitionInterval.assign(new PartitionInterval())
    }
    if (partitionInterval.interval.includes(interval)) {
        // partitionInterval.interval razdeli na dva dela
        var newRight = new PartitionInterval(
            new Interval(
                interval.rightBound.complement(),
                partitionInterval.interval.rightBound
            )
        )
        // desni del originalnega nastavi kot desnega od desnega dela
        newRight.right.assign(partitionInterval.right)
        // desni del nastavi kot desni del levega dela
        partitionInterval.right.assign(newRight)
        // skrci originalni interval
        partitionInterval.interval.assign(
            new Interval(
                partitionInterval.interval.leftBound,
                interval.leftBound.complement()
            )
        )
    } else {
        if (interval.leftBound.compareTo(partitionInterval.interval.leftBound) < 0) {
            // rekurzivno poklici difference nad levim otrokom
            PartitionInterval.difference(
                partitionInterval.left,
                new Interval(
                    interval.leftBound.copy(),
                    partitionInterval.interval.leftBound.complement()
                )
            )
            // skrci interval
            Interval.difference(partitionInterval.interval, interval)
        }
    
        if (partitionInterval.interval.isEmpty() || interval.rightBound.compareTo(partitionInterval.interval.rightBound) > 0) {
            // rekurzivno poklici difference nad desnim otrokom
            PartitionInterval.difference(
                partitionInterval.right,
                new Interval(
                    partitionInterval.interval.rightBound.complement(),
                    interval.rightBound.copy()
                )
            )
            // skrci interval
            Interval.difference(partitionInterval.interval, interval)
        }
    
    }
    if (interval.includes(partitionInterval.interval)) {
        partitionInterval.interval.assign(Interval.EmptyInterval())
    }
    if (partitionInterval.interval.isEmpty()) {
        // to pomeni, da je blo interval.includes(partitionInterval.interval) na zacetku true
        // naredi unijo med desnim otrokom in desnim otrokom levega otroka
        if (partitionInterval.left.right) {
            // // TODO: optimiziraj, lahko ga nastavis kot najbolj levega, ker ves da so vsi manjsi
            // partitionInterval.left.right.toArray().forEach(function(interval) {
            //     PartitionInterval.union(partitionInterval.right, interval)
            // })
            PartitionInterval.setAsLeftmost(partitionInterval.right, partitionInterval.left.right, true)
        } else {
            partitionInterval.left.right = new PartitionInterval()
        }


        // nastavi desnega otroka kot desnega otroka levega otroka
        partitionInterval.left.right.assign(partitionInterval.right)

        // nastavi levega otroka kot partitionInterval
        partitionInterval.assign(partitionInterval.left)
    }

    return partitionInterval
}

/**
 * @param {PartitionInterval} partitionInterval
 * @param {Interval} interval
 * @return {PartitionInterval}
 */
PartitionInterval.intersect = function(partitionInterval, interval) {
    if (!(partitionInterval instanceof PartitionInterval) || !(interval instanceof Interval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (!partitionInterval.interval || partitionInterval.interval.isEmpty()) {
        // ce je prazen, ga naredi da je prazen list
        // return partitionInterval.assign(new PartitionInterval())
        partitionInterval = new PartitionInterval()
        return partitionInterval
    }
    if (partitionInterval.interval.includes(interval)) {
        return partitionInterval.interval.assign(interval)
    }
    if (interval.includes(partitionInterval.interval)) {
        PartitionInterval.intersect(
            partitionInterval.left,
            new Interval(
                interval.leftBound.copy(),
                partitionInterval.interval.leftBound.complement()
            )
        )
        PartitionInterval.intersect(
            partitionInterval.right,
            new Interval(
                partitionInterval.interval.rightBound.complement(),
                interval.rightBound.copy()
            )
        )
        return partitionInterval
    } else {
        if (interval.leftBound.compareTo(partitionInterval.interval.leftBound) < 0) {
            return partitionInterval.assign(
                PartitionInterval.union(
                    PartitionInterval.intersect(
                        partitionInterval.left,
                        new Interval(
                            interval.leftBound.copy(),
                            partitionInterval.interval.leftBound.complement()
                        )
                    ), 
                    new Interval(
                        partitionInterval.interval.leftBound.copy(),
                        interval.rightBound.copy()
                    )
                )
            )
        }
        if (interval.rightBound.compareTo(partitionInterval.interval.rightBound) > 0) {
            return partitionInterval.assign(
                PartitionInterval.union(
                    PartitionInterval.intersect(
                        partitionInterval.right,
                        new Interval(
                            partitionInterval.interval.rightBound.complement(),
                            interval.rightBound.copy()
                        )
                    ),
                    new Interval(
                        interval.leftBound.copy(),
                        partitionInterval.interval.rightBound.copy()
                    )
                )
            )
        }
    }
}

/**
 * @param {PartitionInterval} partitionInterval1
 * @param {PartitionInterval} partitionInterval2
 * @param {boolean} force Skip check if `true`
 * @return {PartitionInterval}
 */
PartitionInterval.setAsLeftmost = function(partitionInterval1, partitionInterval2, force) {
    if (!(partitionInterval1 instanceof PartitionInterval) || !(partitionInterval2 instanceof PartitionInterval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (force || 
        partitionInterval2.rightMost().interval.rightBound.compareTo(partitionInterval1.leftMost().interval.leftBound) < 0) {
        if (!partitionInterval1.left) {
            partitionInterval1.assign(partitionInterval2)
        } else if (!partitionInterval1.left.interval) {
            return partitionInterval1.assign(partitionInterval2)
        } else {
            PartitionInterval.setAsLeftmost(partitionInterval1.left, partitionInterval2, true)
        }
    } else {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
}

/**
 * @param {PartitionInterval} partitionInterval1
 * @param {PartitionInterval} partitionInterval2
 * @param {boolean} force Skip check if `true`
 * @return {PartitionInterval}
 */
PartitionInterval.setAsRightmost = function(partitionInterval1, partitionInterval2, force) {
    if (!(partitionInterval1 instanceof PartitionInterval) || !(partitionInterval2 instanceof PartitionInterval)) {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
    if (force || 
        partitionInterval2.leftMost().interval.leftBound.compareTo(partitionInterval1.rightMost().interval.rightBound) > 0) {
        if (!partitionInterval1.right.interval) {
            return partitionInterval1.assign(partitionInterval2)
        } else {
            PartitionInterval.setAsRightmost(partitionInterval1.right, partitionInterval2, true)
        }
    } else {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
}

/**
 * @return {PartitionInterval}
 */
PartitionInterval.prototype.rightMost = function() {
    if (this.right.interval) {
        return this.right
    } else {
        return this
    }
}

/**
 * @return {PartitionInterval}
 */
PartitionInterval.prototype.leftMost = function() {
    if (this.left.interval) {
        return this.left.interval
    } else {
        return this
    }
}

/**
 * @param {boolean} deep If set to `true` then makes a deep copy
 * @return {PartitionInterval}
 */
PartitionInterval.prototype.copy = function(deep) {
    var partitionInterval
    if (this.interval) {
        var partitionInterval = new PartitionInterval(this.interval.copy())
    } else {
        var partitionInterval = new PartitionInterval()
    }
    partitionInterval.left = deep ? this.left.copy(deep) : this.left
    partitionInterval.right = deep ? this.right.copy(deep) : this.right
    return partitionInterval
}

/**
 * @return {boolean}
 */
PartitionInterval.prototype.isEmpty = function() {
    return !this.interval || this.interval.isEmpty()
}

PartitionInterval.prototype.equals = function(interval) {
    if (interval instanceof PartitionInterval) {
        var a1 = this.toArray()
        var a2= interval.toArray()
        // console.log("compare", a1, "with", a2)
        if (a1.length === a2.length) {
            for (var i = 0; i < a1.length; i++) {
                if (!(a1[i].equals(a2[i]))) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    } else if (interval instanceof Interval) {
        return interval.equals(this.interval) && this.left.isEmpty() && this.right.isEmpty()
    } else {
        throw new Error(ERROR_WRONG_ARGUMENTS)
    }
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

/**
 * @return {Array<Interval>}
 */
PartitionInterval.prototype.toArray = function() {
    if (!this.interval) return []
    var left = this.left.toArray()
    var right = this.right.toArray()
    left.push(this.interval)
    return left.concat(right)
}