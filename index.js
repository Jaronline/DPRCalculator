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

function round(a, b){
    if(b>=1){
        return Math.round(a * (10 ** b)) / (10 ** b);
    }
    else {
        return Math.round(a);
    }
}

function mapDOMToObject() {
    let a = Array.from(document.querySelectorAll("[id^='round']")).filter((e)=>e.id.split(".").length === 2);
    let c = [];
    a.forEach(
        (b, rIndex) => {
            b = {
                attacks: Array.from(document.querySelectorAll(`[id^='round.${rIndex}.attack']`)).filter((e)=>{
                    return e.id.split(".").length === 4;
                }),
                lastRound: document.querySelector(`[id^='round.${rIndex}.lastRound']`)?.checked??false,
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
        if(!round.simulated) {
            addToTable += `<tr><td>Round #${rIndex + 1}:</td><td></td><td></td></tr>`;
        }
        let totalDamagePerRound = 0.0;

        round.attacks.forEach((attack,aIndex)=> {
            let chance = getHitChanceFromIndex(attack.hitChanceArrayIndex,attack);

            let averageDamagePerAttack = mul(attack.damageOnHitAverage??0,chance.hit+chance.crit)+mul(attack.damageOnCritFlatAverage??0,chance.crit)+mul(attack.damageOnCritMultipliedAverage??0,chance.crit)
                    +mul(attack.damageNotMultipliedAverage??0,chance.hit+chance.crit)+mul(attack.damageOnMissAverage??0,chance.miss);

            if(!round.simulated) {
                addToTable += `<tr><td></td><td>Attack #${aIndex + 1}:</td><td>${averageDamagePerAttack.toFixed(2)}${attack.multiplier > 1 ? " * " + attack.multiplier : ""}</td></tr>`;
            }
            totalDamagePerRound += averageDamagePerAttack * attack.multiplier;
            });
        if(!round.simulated) {
            addToTable += `<tr><td>Total Round Damage:</td><td></td><td>${totalDamagePerRound.toFixed(2)}</td></tr>`;
        }
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
    roundsObj.map((round) => ({
        attacks:
            round.attacks.map((attack) => {
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

    // if there are less than 10 rounds, repeat the last round until there are 10 rounds
    const lastRound = roundsObj.findLast((round) => round.lastRound);
    if (lastRound) {
        for (let i = 0; i < (roundsObj.length < 10 ? 10 - roundsObj.length : 0); i++) {
            let newRound = JSON.parse(JSON.stringify(lastRound));
            newRound.simulated = true;
            roundsObj.push(newRound);
        }
    }

    // update total damage per attack in the output table
    // calculate average damage per round
    // update average damage per round in the output table
    genOutputDOM(roundsObj);
}

function getHitChanceFromIndex(index,attack){
    const d20 = 20.00;

    function critStandard(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round(((d20-(critRange-1))/d20)*100)/100;
        return r>0?r:0;
    }

    function hitStandard(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round((Math.round(((d20-hitChance+1)/d20)*100)/100-critStandard(hitChance,critRange))*100)/100
        return r>0?r:0;
    }

    function missStandard(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round((1-hitStandard(hitChance,critRange)-critStandard(hitChance,critRange))*100)/100;
        return r>0?r:0;
    }

    function critDisadvantage(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round((((d20-(critRange-1))**2)/(d20**2))*10000)/10000;
        return r>0?r:0;
    }

    function hitDisadvantage(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round(((Math.round((((d20-hitChance+1)**2)/(d20**2))*10000)/10000)-critDisadvantage(hitChance,critRange))*10000)/10000;
        return r>0?r:0;
    }

    function missDisadvantage(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round((1-hitDisadvantage(hitChance,critRange)-critDisadvantage(hitChance,critRange))*10000)/10000;
        return r>0?r:0;
    }

    function critAdvantage(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round((((d20-(critRange-1)) * (critRange+d20-1))/(d20**2))*10000)/10000;
        return r>0?r:0;
    }

    function hitAdvantage(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round(((Math.round(((((d20-hitChance+1) * (d20+hitChance-1)/(d20**2))))*10000)/10000)-critAdvantage(hitChance,critRange))*10000)/10000;
        return r>0?r:0;
    }

    function missAdvantage(hitChance,critRange){
        let d20 = 20.00;

        const r = Math.round((1-hitAdvantage(hitChance,critRange)-critAdvantage(hitChance,critRange))*10000)/10000;
        return r>0?r:0;
    }

    switch ((index??1).toString()){
        case "0":
            return {hit:hitDisadvantage(attack.hitChance,attack.critRange),
                miss: missDisadvantage(attack.hitChance,attack.critRange),
                crit: critDisadvantage(attack.hitChance,attack.critRange)};
        case "2":
            return {hit:hitAdvantage(attack.hitChance,attack.critRange),
            miss: missAdvantage(attack.hitChance,attack.critRange),
            crit: critAdvantage(attack.hitChance,attack.critRange)};
        case "1":
            return {hit:hitStandard(attack.hitChance,attack.critRange),miss:missStandard(attack.hitChance,attack.critRange),crit:critStandard(attack.hitChance,attack.critRange)};
    }
}

// A attack consists of:
// - attack roll dice
// - attack bonus
// - damage roll dice
// - damage bonus
// - damage crit bonus dice
// - damage crit bonus
// - damage miss roll dice
// - damage miss bonus
//
// - proficiency