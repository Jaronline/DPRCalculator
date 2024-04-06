validateAttack();

function calculateDamageAttack(damage) {
    return total(damage);
}

// document.addEventListener("load",() => {
//     console.log("T");
//         validateAttack();
//     });
//
// document.onload = () => {
// console.log("A");
//         validateAttack();
// }


function avg(...e) {
    return e.reduce((a, b) => a + b, 0) / e.length;
}

function total(a) {
    return eval(a);
}

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function getFormValues() {
    const form = document.getElementById("dprForm");
}

function calculateAverageDamagePerAttack(attackData) {
    let totalDamage = 0;
    // Calculate total damage from all sources
    totalDamage += parseInt(attackData.damageOnHit);
    totalDamage += eval(attackData.damageNotMultiplied); // Using eval to evaluate arithmetic expression
    if (attackData.damageOnCritFlat !== "") {
        totalDamage += parseInt(attackData.damageOnCritFlat);
    }
    if (attackData.damageOnCritMultiplied !== "") {
        totalDamage += parseInt(attackData.damageOnCritMultiplied);
    }
    if (attackData.damageOnMiss !== "") {
        totalDamage += parseInt(attackData.damageOnMiss);
    }
    // Calculate average damage per attack
    const averageDamage = totalDamage / parseInt(attackData.multiplier);
    return averageDamage.toFixed(2); // Round to two decimal places
}

// Function to update average damage per attack in the form
function updateAverageDamagePerAttackInForm() {
    const attacks = Array.prototype.slice.call(document.querySelectorAll("[id^='attacks']")).filter((e)=>e.id.match(/attacks\.(\b\d+\b)(?!.*\b\1\b)/));
    console.log(attacks.length);
    attacks.forEach((attack, index) => {
        const averageDamage = calculateAverageDamagePerAttack(attack);
        console.log(attack);
        console.log(averageDamage);
        console.dir(attack);
        const averageDamageSpan = attack.querySelector(`[id^='attacks.${index}.damageOnHitAverage']`);
        console.log(`[id*='attacks.${index}.damageOnHitAverage']`);
        averageDamageSpan.textContent = averageDamage;
    });
}

// Function to calculate average damage per round
function calculateAverageDamagePerRound() {
    let totalAverageDamage = 0;
    const attacks = document.querySelectorAll("[id^='attacks']");
    attacks.forEach((attack) => {
        const averageDamage = calculateAverageDamagePerAttack(attack);
        totalAverageDamage += parseFloat(averageDamage);
    });
    const averageDamagePerRound = totalAverageDamage / attacks.length;
    return averageDamagePerRound.toFixed(2); // Round to two decimal places
}

// Function to update average damage per round in the output table
function updateAverageDamagePerRoundInOutputTable() {
    const outputTable = document.getElementById("outputDPR");
    const averageDamagePerRound = calculateAverageDamagePerRound();
    outputTable.innerHTML = `<tr><td>Average Damage Per Round:</td><td>${averageDamagePerRound}</td></tr>`;
}

function validateAttack() {
    
    updateAverageDamagePerRoundInOutputTable();
    updateAverageDamagePerAttackInForm();
    // find all rounds
    // per round find all attacks
    // per attack find all damages

    // transform attack to javascript object

    // calculate average damage per attack
    // update average damage per attack damage in the form
    // update total damage per attack in the output table
    // calculate average damage per round
    // update average damage per round in the output table

    const rounds = document


    
    // const attacks = document.getElementById("attacks").value;

    let attacks = Array.from(document.querySelectorAll('[id^="attacks."]'));

    // console.log("assa"+attacks);

    let newlist = attacks
        .map((attack)=>{
            // console.log(attack.id);
            // console.log(`attacks.0.damageOnHit`);
            // console.log(attack.id=="attacks.0.damageOnHit");

            // console.log(attack.value);
            return             {

            damageOnHit: attack.id.toString()===`attacks.0.damageOnHit` ? attacks.value : "s",
    }});

    console.log("DDD"+JSON.stringify(newlist[0]));
    console.log("aaa"+JSON.stringify(attacks));
    const damageOnHit = document.getElementById("attacks.0.damageOnHit").value;
    const damageNotMultiplied = document.getElementById("attacks.0.damageNotMultiplied").value;
    const damageOnCritFlat = document.getElementById("attacks.0.damageOnCritFlat").value;
    const damageOnCritMultiplied = document.getElementById("attacks.0.damageOnCritMultiplied").value;
    const damageOnMiss = document.getElementById("attacks.0.damageOnMiss").value;

    let averageDamageOnHit = total(damageOnHit);
    let averageDamageNotMultiplied = total(damageNotMultiplied);
    let averageDamageOnCritFlat = total(damageOnCritFlat);
    let averageDamageOnCritMultiplied = total(damageOnCritMultiplied);
    let averageDamageOnMiss = total(damageOnMiss);

    // document.getElementById("attacks.0.damageOnMissAverage").innerText = averageDamageOnMiss;
    // document.getElementById("attacks.0.damageNotMultipliedAverage").innerText = averageDamageNotMultiplied;
    // document.getElementById("attacks.0.damageOnCritFlatAverage").innerText = averageDamageOnCritFlat;
    // document.getElementById("attacks.0.damageOnCritMultipliedAverage").innerText = averageDamageOnCritMultiplied;
    // document.getElementById("attacks.0.damageOnHitAverage").innerText = averageDamageOnHit;
    //
    // document.getElementById("outputDPR").innerHTML = attacks.map(
    //     (attack, i) => {
    //         return "<tr> Attack #" + i + " <td>" + calculateDamageAttack(attack.damageOnHit) + "</td></tr>";
    //     },
    // );
}

let dp = {
    critRange: 20,
    damageNotMultiplied: "",
    damageOnCritFlat: "",
    damageOnCritMultiplied: "",
    damageOnHit: "",
    damageOnMiss: "",
    halflingLucky: !1,
    hitChance: 8,
    hitChanceArrayIndex: 1,
    multiplier: 1
};

let attack = {
    critRange: 20,
    damageNotMultiplied: "",
    damageOnCritFlat: "",
    damageOnCritMultiplied: "",
    damageOnHit: "",
    damageOnMiss: "",
    halflingLucky: !1,
    hitChance: 8,
    hitChanceArrayIndex: 1,
    multiplier: 1
};

let rounds = [
    {
        attacks: [],
    },
    {
        attacks: [],
    },
    {
        attacks: [],
    },
];

let attacks = [
    {
        critRange: 20,
        damageNotMultiplied: "",
        damageOnCritFlat: "",
        damageOnCritMultiplied: "",
        damageOnHit: "",
        damageOnMiss: "",
        halflingLucky: !1,
        hitChance: 8,
        hitChanceArrayIndex: 1,
        multiplier: 1
    },
    {
        critRange: 20,
        damageNotMultiplied: "",
        damageOnCritFlat: "",
        damageOnCritMultiplied: "",
        damageOnHit: "",
        damageOnMiss: "",
        halflingLucky: !1,
        hitChance: 8,
        hitChanceArrayIndex: 1,
        multiplier: 1
    },
    {
        critRange: 20,
        damageNotMultiplied: "",
        damageOnCritFlat: "",
        damageOnCritMultiplied: "",
        damageOnHit: "",
        damageOnMiss: "",
        halflingLucky: !1,
        hitChance: 8,
        hitChanceArrayIndex: 1,
        multiplier: 1
    },
];


var sp = {
    attacks: [
        function (e) {
            for (var n = 1; n < arguments.length; n++) {
                var t = null != arguments[n] ? arguments[n] : {};
                n % 2 ? cp(Object(t), !0).forEach((function (n) {
                        zr(e, n, t[n])
                    }
                )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : cp(Object(t)).forEach((function (n) {
                        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
                    }
                ))
            }
            return e
        }({}, dp)
    ],
    damageOnceOnHit: "",
    damageOnceOnHitNoCrit: ""
};

var mp = [1, 1, .9025, .81, .7225, .64, .5625, .49, .4225, .36, .3025, .25, .2025, .16, .1225, .09, .0625, .04, .0225, .001, .0025, 0],
    up = [1, 1, .95, .9, .85, .8, .75, .7, .65, .6, .55, .5, .45, .4, .35, .3, .25, .2, .15, .1, .05, 0],
    bp = [1, 1, .9975, .99, .9775, .96, .9375, .91, .8775, .84, .7975, .75, .6975, .64, .5775, .51, .4375, .36, .2775, .19, .0975, 0],
    Cp = [1, 1, .9999, .999, .9966, .992, .9844, .973, .9571, .936, .9089, .875, .8386, .794, .7254, .657, .5781, .488, .3859, .271, .1426, 0],
    gp = [1, 1, .99988, .99675, .98813, .974, .95438, .92925, .89253, .8625, .82088, .77375, .72113, .663, .59938, .53025, .45563, .3755, .28988, .19875, .10213, 0],
    fp = [1, 1, .99275, .891, .79475, .704, .61875, .539, .46475, .396, .33275, .275, .22275, .176, .13475, .099, .06875, .044, .02475, .011, .00275, 0],
    hp = [1, 1, .9975, .945, .8925, .84, .7875, .735, .6825, .63, .5775, .525, .4725, .42, .3675, .315, .2625, .21, .1575, .105, .0525, 0];

var xp = function (e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (n) {
        if (0 === e) return fp;
        if (1 === e) return hp;
        if (e >= 2) return gp
    } else {
        if (0 === e) return mp;
        if (1 === e) return up;
        if (2 === e) return bp;
        if (3 === e) return Cp
    }
    throw new Error("That's not a choice.")
};
const vp = xp;

var Ep = function (e, n) {
    return n[e]
};
const yp = Ep;

var kp = function (e, n) {
    if (e.critRange - e.hitChance <= 0) return 0;
    var t = n[e.hitChance], o = Ep(e.critRange, n);
    return parseFloat((t - o).toFixed(4))
};
const wp = kp;

var Bp,
    Fp = function (e) {
        return e / 2 + .5
    },
    Dp = function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], t = n ? 0 : e.flatValue || 0;
        return Fp(e.size) * e.count * e.positivity + t
    },
    Gp = /^\s*([+-]?)\s*(\d+)?\s*d\s*(\d+)\s*(.*?)\s*$/i, qp = /(?=[+-])/,
    zp = function (e) {
        var n = e.match(Gp);
        if (n) {
            var t = Ii(n, 5), o = (t[0], t[1]), r = t[2], a = t[3];
            return t[4], {count: parseInt(r), positivity: "-" === o ? -1 : 1, size: parseInt(a)}
        }

        var i = parseFloat(e);
        if (isNaN(i)) throw new Error('Unable to parse"'.concat(e.trim(), '"to a value.'));

        return {
            count: 0,
            flatValue: i,
            positivity: 1,
            size: 0
        };
    },
    Op = function (e) {
        var n = e.split(qp)
            .map((e) => e && e.replace(/\s/g, ""))
            .filter((e) => e);
        qp.lastIndex = 0;
        return n.map(zp);
    },
    Sp = Ge.div(Bp || (Bp = ep(["\n  > * {\n    display: block;\n  }\n\n  > *:first-child {\n    flex-basis: 60%;\n    flex-grow: 0;\n    flex-shrink: 0;\n  }\n"]))),
    Ip = "grid flex-row flex-nowrap align-items-end",
    jp = function (e, n) {
        return e + Dp(n)
    },
    Lp = function (n) {
        var t = n.diceText;
        try {
            var o = Op(t).reduce(jp, 0);
            return e.createElement(ip, {label: "Average", value: o});
        } catch (n) {
            return e.createElement(e.Fragment, null, e.createElement(ip, {
                label: "Average",
                value: "?"
            }), e.createElement("p", null, "Error: ", n.message))
        }
    };

function Np(e, n) {
    var t = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);

        // n && (o = o.filter((function (n) {
        //     return Object.getOwnPropertyDescriptor(e, n).enumerable
        // }))), t.push.apply(t, o)
        if (n) {
            o = o.filter((n) => Object.getOwnPropertyDescriptor(e, n).enumerable);
            t.push.apply(t, o);
        }
    }

    return t;
}

function Up(e) {
    for (var n = 1; n < arguments.length; n++) {
        var t = null != arguments[n] ? arguments[n] : {};

        // n % 2 ? Np(Object(t), !0).forEach((function (n) {
        //     zr(e, n, t[n])
        // })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : Np(Object(t)).forEach((function (n) {
        //     Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n))
        // }))
        if (n % 2) {
            Np(Object(t), !0).forEach((n) => zr(e, n, t[n]));
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(e, Object.getOwnPropertyDescriptors(t));
        } else {
            Np(Object(t)).forEach((n) => Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n)));
        }
    }

    return e;
}

var Mp = [
    {label: "Disadvantage", value: 0},
    {label: "Standard", value: 1},
    {label: "Advantage", value: 2},
    {label: "Elven Accuracy", value: 3}
];

const Wp = function (n) {
    var t = n.index,
        o = Cr(),
        r = o.setFieldValue,
        a = o.values,
        i = a.attacks[t],
        A = xp(i.hitChanceArrayIndex, i.halflingLucky),
        p = kp(a.attacks[t], A),
        l = Ep(a.attacks[t].critRange, A);

    return e.createElement(
        zi,
        {legend: "Attack #".concat(t + 1)},
        e.createElement(
            "div",
            {
                className: "grid flex-row justify-content-between align-items-end",
                style: {margin: "0", width: "100%"}
            },
            e.createElement(
                Pa,
                {
                    icon: "pi ".concat(Aa.PLUS),
                    onClick: function () {
                        a.attacks.push(Up({}, dp)), r("encounters", a.attacks)
                    },
                    tooltip: "Add another empty attack",
                    tooltipOptions: Oi
                }
            ),
            e.createElement(
                Pa,
                {
                    icon: "pi ".concat(Aa.COPY),
                    onClick: function () {
                        var e;
                        e = i, a.attacks.push(Up({}, e)), r("encounters", a.attacks)
                    },
                    tooltip: "Clone this attack",
                    tooltipOptions: Oi
                }
            ),
            e.createElement(
                Pa,
                {
                    icon: "pi ".concat(Aa.TRASH),
                    disabled: a.attacks.length <= 1,
                    onClick: function () {
                        var e;
                        e = t, a.attacks.splice(e, 1), r("encounters", a.attacks)
                    },
                    tooltip: "Remove this attack",
                    tooltipOptions: Oi
                }
            )
        ),
        e.createElement(
            "div",
            {
                className: "grid flex-row justify-content-between align-items-end",
                style: {margin: "0", width: "100%"}
            },
            e.createElement(
                pA,
                {
                    buttonLayout: "horizontal",
                    id: "attacks.".concat(t, ".hitChance"),
                    label: "Min. to Hit",
                    max: 20,
                    min: 2,
                    step: 1,
                    tooltip: 'Minimum roll on your d20 to succeed on your attack roll. See "Calculating Minimum Roll to Hit", above.'
                }
            ),
            e.createElement(
                pA,
                {
                    buttonLayout: "horizontal",
                    id: "attacks.".concat(t, ".critRange"),
                    label: "Min. to Crit",
                    max: 20,
                    min: 2,
                    step: 1,
                    tooltip: "Minimum roll on your d20 to score a critical hit. The Champion Fighter's Improved Critical would change this to 19 or 18."
                }
            ),
            e.createElement(
                RA,
                {
                    floatLabel: !1,
                    id: "attacks.".concat(t, ".hitChanceArrayIndex"),
                    label: "Accuracy Type",
                    options: Mp,
                    style: {width: "180px"}
                }
            ),
            e.createElement(
                $A,
                {
                    id: "attacks.".concat(t, ".halflingLucky"),
                    label: "Halfling ? ",
                    offLabel: "No",
                    offIcon: "pi -times",
                    onLabel: "Yes",
                    onIcon: "pi -check",
                    style: {width: "100px"}
                }
            )
        ),
        e.createElement(
            "div",
            {
                className: "grid flex-row justify-content-between align-items-end",
                style: {
                    margin: "0",
                    width: "100%"
                }
            },
            e.createElement(
                ip,
                {
                    label: "Miss% Chance",
                    tooltip: "Chance to score a NON-CRITICAL hit",
                    value: 100 * (1 - p - l)
                }
            ),
            e.createElement(
                ip,
                {
                    label: "Hit% Chance",
                    tooltip: "Chance to score a NON-CRITICAL hit",
                    value: 100 * p
                }
            ),
            e.createElement(
                ip,
                {
                    label: "Crit% Chance",
                    value: 100 * l
                }
            ),
            e.createElement(
                pA,
                {
                    buttonLayout: "horizontal",
                    id: "attacks.".concat(t, ".multiplier"),
                    label: "Attacks / Turn",
                    min: 1,
                    step: 1,
                    tooltip: "Number of identical attacks. Your DPR will be multiplied by this number."
                }
            )
        ),
        e.createElement(
            Sp,
            {
                className: Ip,
                style: {
                    margin: "0",
                    width: "100%"
                }
            },
            e.createElement(
                lp,
                {
                    floatLabel: !1,
                    id: "attacks.".concat(t, ".damageOnHit"),
                    label: "Damage On Hit",
                    tooltip: "Your basic damage, typically from your weapon and your ability score modifier. Only dice are multiplied on critical hits."
                }
            ),
            e.createElement(
                Lp,
                {
                    diceText: a.attacks[t].damageOnHit
                }
            )
        ),
        e.createElement(
            Sp,
            {
                className: Ip,
                style: {
                    margin: "0",
                    width: "100%"
                }
            },
            e.createElement(
                lp,
                {
                    floatLabel: !1,
                    id: "attacks.".concat(t, ".damageNotMultiplied"),
                    label: "Additional Damage NOT multiplied Critical Hit",
                    tooltip: "Damage from sources not multiplied by a critical hit, such as the secondary damage from Booming Blade."
                }
            ),
            e.createElement(
                Lp,
                {
                    diceText: a.attacks[t].damageNotMultiplied
                }
            )
        ),
        e.createElement(
            Sp,
            {
                className: Ip,
                style: {
                    margin: "0",
                    width: "100%"
                }
            },
            e.createElement(
                lp,
                {
                    floatLabel: !1,
                    id: "attacks.".concat(t, ".damageOnCritFlat"),
                    label: "Damage Bonus on Crit (Not Multiplied)",
                    tooltip: "Example: The Half-Orc's Savage Attacks trait would add a damage die here."
                }
            ),
            e.createElement(
                Lp,
                {
                    diceText: a.attacks[t].damageOnCritFlat
                }
            )
        ),
        e.createElement(
            Sp,
            {
                className: Ip,
                style: {margin: "0", width: "100%"}
            },
            e.createElement(
                lp,
                {
                    floatLabel: !1,
                    id: "attacks.".concat(t, ".damageOnCritMultiplied"),
                    label: "Damage Bonus on Crit (Dice Multiplied)",
                    tooltip: "Example: If you only use Divine Smite on a critical hit, you would add it here."
                }
            ),
            e.createElement(
                Lp,
                {
                    diceText: a.attacks[t].damageOnCritMultiplied
                }
            )
        ),
        e.createElement(
            Sp,
            {
                className: Ip,
                style: {margin: "0", width: "100%"}
            },
            e.createElement(
                lp,
                {
                    floatLabel: !1,
                    id: "attacks.".concat(t, ".damageOnMiss"),
                    label: "Damage Dealt on Miss",
                    tooltip: 'Example: The "Graze" weapon mastery currently in the D&D Playtest'
                }
            ),
            e.createElement(
                Lp,
                {
                    diceText: a.attacks[t].damageOnMiss
                }
            )
        )
    )
};
var Hp = function (e, n) {
    return e + Dp(n, !1)
}, Rp = function (e, n) {
    return e + 2 * Dp(n, !0) + (n.flatValue || 0)
}, _p = function (e) {
    var n = xp(e.hitChanceArrayIndex), t = Ep(e.critRange, n), o = kp(e, n), r = 1 - t - o,
        a = Op(e.damageNotMultiplied).reduce(Hp, 0), i = Op(e.damageOnHit);
    return (a + i.reduce(Hp, 0)) * o + (i.reduce(Rp, 0) + Op(e.damageOnCritMultiplied).reduce(Rp, 0) + (a + Op(e.damageOnCritFlat).reduce(Hp, 0))) * t + Op(e.damageOnMiss).reduce(Hp, 0) * r
};
const Tp = _p;
var Jp = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = e.reduce((function (e, n) {
        var t = vp(n.hitChanceArrayIndex), o = 1 - yp(n.critRange, t);
        return e * Math.pow(o, n.multiplier)
    }), 1);
    return 1 - n
};
const Kp = Jp;
var Pp = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = e.reduce((function (e, n) {
        var t = vp(n.hitChanceArrayIndex), o = 1 - wp(n, t);
        return e * Math.pow(o, n.multiplier)
    }), 1);
    return 1 - n
};
const Yp = Pp;
var Vp = function (e, n, t) {
    var o = Yp(e), r = Kp(e), a = o + r, i = Op(n), A = i.reduce(Hp, 0), p = i.reduce(Rp, 0) * r;
    return t ? A * o + p : A * a
};
const Qp = function (n) {
    try {
        return e.createElement(zi, {legend: "DPR output"}, e.createElement("table", null, e.createElement("tbody", null, n.attacks.map((function (n, t) {
            return e.createElement("tr", null, e.createElement("th", null, "Attack #", t + 1), e.createElement("td", null, _p(n).toFixed(2), n.multiplier > 1 ? " * ".concat(n.multiplier) : ""))
        })), !!n.damageOnceOnHit && e.createElement("tr", null, e.createElement("th", null, "Once/Turn"), e.createElement("td", null, Vp(n.attacks, n.damageOnceOnHit, !0).toPrecision(2))), !!n.damageOnceOnHitNoCrit && e.createElement("tr", null, e.createElement("th", null, "Once/Turn (No Crit)"), e.createElement("td", null, Vp(n.attacks, n.damageOnceOnHitNoCrit, !1).toPrecision(2))), e.createElement("tr", null, e.createElement("th", null, "Damage Per Round"), e.createElement("td", null, (t = n, o = t.attacks, r = t.damageOnceOnHit, a = t.damageOnceOnHitNoCrit, o.reduce((function (e, n) {
            return e + Tp(n) * n.multiplier
        }), 0) + Vp(o, r, !0) + Vp(o, a, !1)).toFixed(2))))))
    } catch (n) {
        return e.createElement("p", null, "Error: ", n.message)
    }
    var t, o, r, a
};
var Xp, Zp, $p, el = Ge.h2(Xp || (Xp = ep(["\n  color: inherit;\n"]))),
    nl = Ge.h3(Zp || (Zp = ep(["\n  color: inherit;\n"])));
Ge.div($p || ($p = ep(["\n  text-align: right;\n"])));
const tl = function () {
    var n = Cr().values, t = 100 * Pp(n.attacks), o = 100 * Jp(n.attacks);
    return e.createElement(zi, {legend: "Once Per Turn Damage Boosts"}, e.createElement(Sp, {
        className: Ip,
        style: {margin: "0", width: "100%"}
    }, e.createElement(lp, {
        floatLabel: !1,
        id: "damageOnceOnHit",
        label: "Damage Bonus on Hit Once Per Turn",
        tooltip: "Example: Sneak Attack."
    }), e.createElement(Lp, {diceText: n.damageOnceOnHit}), e.createElement(ip, {
        label: "Chance to Hit Once",
        value: "".concat(t.toPrecision(2), "%")
    }), e.createElement(ip, {
        label: "Chance to Crit Once",
        value: "".concat(o.toPrecision(2), "%")
    })), e.createElement(Sp, {className: Ip, style: {margin: "0", width: "100%"}}, e.createElement(lp, {
        floatLabel: !1,
        id: "damageOnceOnHitNoCrit",
        label: "Damage Bonus on Hit Once/Turn (Not multiplied on crit)"
    }), e.createElement(Lp, {diceText: n.damageOnceOnHitNoCrit}), e.createElement(ip, {
        label: "Chance to Hit Once",
        value: "".concat((t + o).toPrecision(2), "%")
    })))
};
var ol = function () {
    var n = Cr().values;
    return e.createElement(e.Fragment, null, e.createElement(el, null, "About DPR Calculator"), e.createElement("p", null, 'Damage Per Round or "DPR" is a helpful way to approximate your character\'s damage output, allowing you to more easily weigh build choices.'),
        e.createElement(nl, null, "Calculating Minimum Roll to Hit"), e.createElement("p", null, "5e expects that players' attack bonuses will advance in parallel with expected AC for monsters of their level, and players are expected to hit those creatures on an attack roll of 8 or better. I explain in more detail inÂ ", e.createElement("a", {
            href: "https://rpgbot.net/dnd5/characters/fundamental_math/"
        }, "The Fundamental Math of Character Optimization"), "."), e.createElement("p", null, "If you increase your primary ability score at 4th and 8th level and have no other changes your attack bonus, leaving your Minimum Roll to Hit value at 8 is fine. If your attack bonus increases by 1, such as from a +1 weapon, reduce the Minimum Roll to Hit value accordingly. If your attack bonus decreases relative to the AC progression for some reason (maybe you took a feat at level 4 instead, or maybe you're using Sharpshooter), increase the Minimum Roll to Hit value by the value of the penalty."), e.createElement(el, null, "DPR Calculator"), n.attacks.map((function (n, t) {
            return e.createElement(Wp, {
                index: t
            })
        })), e.createElement(tl, null), e.createElement(Qp, n)
    )
};


function cp(e, n) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        n && (o = o.filter((function (n) {
            return Object.getOwnPropertyDescriptor(e, n).enumerable
        }))), t.push.apply(t, o)
    }
    return t
}