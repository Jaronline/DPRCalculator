validateAttack();

function avg(...e) {
    return div(e.reduce(add, 0),e.length);
}

function div(a, b) {
    return Number(a / b);
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

function mapDOMToObject() {
    let a = Array.from(document.querySelectorAll("[id^='round']")).filter((e)=>e.id.split(".").length === 2);
    let c = [];
    a.forEach(
        (b, rIndex) => {
            b = {
                attacks: Array.from(document.querySelectorAll(`[id^='round.${rIndex}.attack']`)).filter((e)=>{
                    return e.id.split(".").length === 4;
                })
            }
            let e = [];
            b.attacks.forEach((d,aIndex)=>{
                let critRange = document.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='critRange']:not([id*='average' i])`);
                let damageNotMultiplied = document.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageNotMultiplied']:not([id*='average' i])`);
                let damageOnCritFlat =document.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnCritFlat']:not([id*='average' i])`)
                let damageOnCritMultiplied =document.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnCritMultiplied']:not([id*='average' i])`)
                let damageOnHit =document.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnHit']:not([id*='average' i])`)
                let damageOnMiss =document.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnMiss']:not([id*='average' i])`)
                let halflingLucky =document.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='halflingLucky']:not([id*='average' i])`)
                let hitChance =document.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='hitChance']:not([id*='average' i])`)
                let hitChanceArrayIndex =document.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='hitChanceArrayIndex']:not([id*='average' i])`)
                let multiplier =document.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='multiplier']:not([id*='average' i])`)

                d = {
                    critRange: critRange?.value??undefined,
                    damageNotMultiplied: damageNotMultiplied?.value??undefined,
                    damageOnCritFlat: damageOnCritFlat?.value??undefined,
                    damageOnCritMultiplied: damageOnCritMultiplied?.value??undefined,
                    damageOnHit: damageOnHit?.value??undefined,
                    damageOnMiss: damageOnMiss?.value??undefined,
                    halflingLucky: !halflingLucky?.value??undefined,
                    hitChance: hitChance?.value??undefined,
                    hitChanceArrayIndex: hitChanceArrayIndex?.value??undefined,
                    multiplier: multiplier?.value??undefined,
                }

                e.push(d);
            })
            b.attacks = e;
            a = c.push(b);
        }
    );
    return c;
}

function mapObjectToDOM(rounds) {
    rounds.forEach((round,rIndex)=>{
        round.attacks.forEach((attack,aIndex)=> {
            Object.entries(attack).forEach(([key,value])=>{
                let input = document.querySelector(`[id^='round.${rIndex}.attack.${aIndex}.${key}']`);
                let span = document.querySelector(`span[id^='round.${rIndex}.attack.${aIndex}.${key}']`);
                span?span.innerHTML=value??"":"";
                input?input.value=value??undefined:undefined;
            })
            })
    })
}

function genOutputDOM(rounds) {
    let addToTable = "";

    let averageDPR = 0.0;
    let totalDPR = 0.0;
    rounds.forEach((round,rIndex)=>{
        addToTable += `<tr><td>Round #${rIndex+1}:</td><td></td><td></td></tr>`;
        let totalDamagePerRound = 0.0;

        round.attacks.forEach((attack,aIndex)=> {
            let averageDamagePerAttack = mul(attack.damageOnHitAverage??0,.65)+mul(attack.damageOnCritFlatAverage??0,.05)+mul(attack.damageOnCritMultipliedAverage??0,.05)
                    +mul(attack.damageNotMultipliedAverage??0,.65)+mul(attack.damageOnMissAverage??0,.35);

            addToTable += `<tr><td></td><td>Attack #${aIndex+1}:</td><td>${averageDamagePerAttack.toFixed(2)}${attack.multiplier>1?" * "+attack.multiplier:""}</td></tr>`;
            totalDamagePerRound += averageDamagePerAttack * attack.multiplier;
            });
        addToTable += `<tr><td>Total Round Damage:</td><td></td><td>${totalDamagePerRound.toFixed(2)}</td></tr>`;
        totalDPR += totalDamagePerRound;
    })
    averageDPR = div(totalDPR,rounds.length);

    addToTable += `<tr><td>Damage Per Round:</td><td></td><td>${averageDPR.toFixed(2)}</td></tr>`;

    document.querySelector("table[id='outputDPR']").innerHTML = addToTable;
}

function validateAttack() {




    // find all rounds
    // per round find all attacks
    // per attack find all damages
    // transform attack to javascript object
    let roundsObj = mapDOMToObject();

    // calculate average damage per attack
    roundsObj.map((round)=>({attacks:
            round.attacks.map((attack)=>{
                attack.damageOnHitAverage = total(attack.damageOnHit);
                attack.damageNotMultipliedAverage = total(attack.damageNotMultiplied);
                attack.damageOnCritFlatAverage = total(attack.damageOnCritFlat);
                attack.damageOnCritMultipliedAverage = total(attack.damageOnCritMultiplied);
                attack.damageOnMissAverage = total(attack.damageOnMiss);
                return attack;
            }),
    }))

    // update average damage per attack damage in the form
    mapObjectToDOM(roundsObj);

    // update total damage per attack in the output table
    // calculate average damage per round
    // update average damage per round in the output table
    genOutputDOM(roundsObj);
}

// var mp = [1, 1, .9025, .81, .7225, .64, .5625, .49, .4225, .36, .3025, .25, .2025, .16, .1225, .09, .0625, .04, .0225, .001, .0025, 0],
//     up = [1, 1, .95, .9, .85, .8, .75, .7, .65, .6, .55, .5, .45, .4, .35, .3, .25, .2, .15, .1, .05, 0],
//     bp = [1, 1, .9975, .99, .9775, .96, .9375, .91, .8775, .84, .7975, .75, .6975, .64, .5775, .51, .4375, .36, .2775, .19, .0975, 0],
//     Cp = [1, 1, .9999, .999, .9966, .992, .9844, .973, .9571, .936, .9089, .875, .8386, .794, .7254, .657, .5781, .488, .3859, .271, .1426, 0],
//     gp = [1, 1, .99988, .99675, .98813, .974, .95438, .92925, .89253, .8625, .82088, .77375, .72113, .663, .59938, .53025, .45563, .3755, .28988, .19875, .10213, 0],
//     fp = [1, 1, .99275, .891, .79475, .704, .61875, .539, .46475, .396, .33275, .275, .22275, .176, .13475, .099, .06875, .044, .02475, .011, .00275, 0],
//     hp = [1, 1, .9975, .945, .8925, .84, .7875, .735, .6825, .63, .5775, .525, .4725, .42, .3675, .315, .2625, .21, .1575, .105, .0525, 0];
