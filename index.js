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
            let chance = getHitChanceFromIndex(attack.hitChanceArrayIndex,attack);

            let averageDamagePerAttack = mul(attack.damageOnHitAverage??0,chance.hit+chance.crit)+mul(attack.damageOnCritFlatAverage??0,chance.crit)+mul(attack.damageOnCritMultipliedAverage??0,chance.crit)
                    +mul(attack.damageNotMultipliedAverage??0,chance.hit+chance.crit)+mul(attack.damageOnMissAverage??0,chance.miss);

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


// advantage = ()=>Math.pow(((21-(20*.65))/20),2)
// disadvantage = ()=>Math.pow(((20*.65)/20),2)

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




    // attack.hitChance = 8;
    // attack.critRange = 20;

    // const StandardHit = Math.round(((attack.critRange-attack.hitChance)/d20)*100)/100;
    // const StandardCrit = Math.round((((d20 - attack.critRange) + 1)/(d20 - (d20 - attack.critRange) + 1))*10000)/10000;
    // const StandardMiss = Math.round(((1 - ((attack.critRange-attack.hitChance)/d20)) - StandardCrit)*10000)/10000;
    // const DisadvantageHit = Math.round(((attack.critRange-attack.hitChance)/(d20**2))*100)/100;
    // console.log("StandardMiss XX: ",StandardMiss);
    // console.log("StandardCrit XX: ",StandardCrit);
    // console.log("StandardHit XX: ",StandardHit);
    // console.log("DisadvantageMiss: ",Math.round((Math.pow(((20*StandardMiss)/20),2))*10000)/10000);
    // console.log("DisadvantageCrit: ",Math.round((Math.pow(((20*StandardCrit)/20),2))*10000)/10000);
    // console.log("DisadvantageHit: ",Math.round(((attack.critRange-attack.hitChance)/(d20**2))*100)/100);
    // console.log("AdvantageMiss: ",Math.round((Math.pow(((21-(20*StandardMiss))/20),2))*10000)/10000);
    // console.log("AdvantageCrit: ",Math.round((Math.pow((((d20+((d20 - attack.critRange) + 1))-(StandardCrit))/d20),2)-1)*10000)/10000);
    // console.log("AdvantageHit: ",Math.round((Math.pow(((21-(20*StandardHit))/20),2))*10000)/10000);


    /////// OFFICIAL COMPLETE WORKING FOMRULA:: disadvantage hit chance is: let hitDisadvantage = ((21 - attack.hitChance) / 20) ** 2;
    /////// OFFICIAL COMPLETE WORKING FORMULA:: advantage miss chance is: let missAdvantage = ((1 - attack.hitChance) / 20) ** 2;
    /////// OFFICIAL COMPLETE WORKING FORMULA:: advantage crit chance is: let critAdvantage = 1-(((critRange-1)/20)**2);
    /////// OFFICIAL COMPLETE WORKING FORMULA:: disadvantage crit chance is: let critDisadvantage = ((20*(20-(attack.critRange-1))/20)/20)**2;

    // let hitDisadvantage = (((20+1) - attack.hitChance) / 20) ** 2;
    // let missAdvantage = ((1 - attack.hitChance) / 20) ** 2;
    // let critAdvantage = 1-(((attack.critRange-1)/20)**2);
    // let critDisadvantage = ((20*(20-(attack.critRange-1))/20)/20)**2;
    // let critStandard = (20-(attack.critRange-1))/20;

    // console.log("((21 - attack.hitChance) / 20)**2: ",(((20+1) - attack.hitChance) / 20) ** 2); // at hitChance == 9 this is 0.36 the disadvantage hit chance of hitChance 9 minus the crit at disadvantage with hitChance 9, at hitChance == 10 this is the disadvantage hit chance of hitChance 10 minus the crit at disadvantage with hitChance 10
    // console.log("((1 - attack.hitChance) / 20)**2: ",((1 - attack.hitChance) / 20) ** 2); // at hitChance == 9 this is 0.16 the advantage miss chance of hitChance 9, at hitChance == 10 this is 0.2025 the advantage of miss chance of hitChance 10
    // console.log("((1 - attack.critRange) / 20)**2: ",(((20 - attack.critRange)+1) / 20 ) ** 2); // at critRange == 11 this is 0.25 the disadvantage crit chance of critRange 11, at critRange == 20 this is 0.0025 the disadvantage crit chance of critRange 20

    // function testHitStandard(hitChance, critRange) {
    //
    //     let critStandard = (20-(critRange-1))/20;
    //     console.log(critStandard);
    //     let missStandard = 1-((hitChance)/(d20) + critStandard) ;
    //     console.log(missStandard);
    //     let hitStandard = 1-((critStandard)+(missStandard));
    //     console.log(hitStandard);
    //     console.log("hitStandard test results with critrange "+ critRange + " and hitChance "+ hitChance + " :",hitStandard);
    // }
    // let j = 1;
    // while (j < 21) {
    //     testHitStandard(j,19);
    //     j++;
    // }

    /* DONE */
    /*
    let critAdv = (d=d20) => ((d20*2-1)-attack.critRange+d20)/Math.pow(d20,2);
    critAdv = () => (2 - attack.critRange / d20) / d20;
    // critAdv = () => ((((21)-crit)/20)**2);
    console.log("critAdv: ",critAdv().toFixed(4));

    let critDis = (d=d20) => (d20-attack.critRange+2)/Math.pow(d20,2);
    critDis = () => (d20 - attack.critRange + 2) / (d20 * d20)
    // critDis = () => ((((d20*1)-crit)/20)**2);
    console.log("critDis: ",critDis().toFixed(4));

    let missAdv = (d=d20) => (((d20-(1*2))-attack.hitChance)+(d20*2))/Math.pow(d20,2);
    missAdv = () => ((d20 - 2) - attack.hitChance + (d20 * 2)) / (d20 * d20);
    // missAdv = () => ((((21)+miss)/20)**2);
    console.log("missAdv: ",missAdv().toFixed(4));

    let missDis = (d=d20)=> ((Math.pow(d20,2)+(((d20*2)-(d20+attack.hitChance))))/Math.pow(d20,2));
    missDis = () => (d20 + 2 - attack.hitChance) / d20;
    // missDis = () => ((((d20*1)-miss)/20)**2);
    console.log("missDis: ",missDis().toFixed(4));

    let hitDis = (d=d20) => (((((d20)+attack.hitChance)-(d20*2))/Math.pow(d20,2)));
    hitDis = () => (attack.hitChance / d20 - 1) / d20;
    // hitDis = () => ((((d20*1)-hit)/20)**2);
    console.log("hitDis: ",hitDis().toFixed(4));

    let hitAdv = () => Math.pow((attack.hitChance / d20), 2);
    // hitAdv = () => (((()+hit)/20)**2);
    console.log("hitAdv: ",hitAdv().toFixed(4));

     */

    // let critAdv = (d=d20) => ((d20*2-1)-attack.critRange+d20)/Math.pow(d20,2);
    // let missDis = (d=d20)=> (d20 + 2 - attack.hitChance) / d20;

    // let critAdv = () => {};
    // let critDis = () => {};
    // let missAdv = () => {};
    // let missDis = () => {};
    // let hitDis = () => {};
    // let hitAdv = () => {};


    // hitAdv is actually the miss formula but reversed so it isnt a A in B chance but a A+B
    // let hitAdv = (d=d20) => {a=(((d20*2)-((d20*2)+attack.hitChance)));return a/(Math.pow(d20,2)-a)};
    // let hitAdv = (d=d20) => ((d20*2)+((d20)-attack.hitChance))/Math.pow(d20,2);

    // console.log("hit: ",hit.toFixed(4));
    // console.log("miss: ",(miss-crit).toFixed(4));
    // console.log("crit: ",crit.toFixed(4));
    // console.log("hitAdv: ",Math.pow(((20-hit)/20),2).toFixed(4));
    // console.log("missAdv: ",(missAdv()-critAdv()).toFixed(4));
    // console.log("critAdv: ",critAdv().toFixed(4));
    // console.log("critDis: ",critDis().toFixed(4));
    // console.log("missDis: ",missDis().toFixed(4));
    // console.log("hitDis: ",hitDis().toFixed(4));

    // console.log("assert Sta: ", (StandardHit+StandardMiss+StandardCrit),(StandardHit+StandardMiss+StandardCrit)===1);
    // console.log("assert Dis: ", (hitDisadvantage+missDis()+critAdvantage),(hitDisadvantage+missDis())+critAdvantage===1);
    // console.log("assert Adv: ", (Math.pow(((d20-StandardHit)/d20),2)+missAdvantage+critAdvantage),(Math.pow(((d20-StandardHit)/d20),2)+missAdvantage+critAdvantage)===1);


    switch ((index??1).toString()){
        case "0":
            return {hit:hitDisadvantage(attack.hitChance,attack.critRange),
                miss: missDisadvantage(attack.hitChance,attack.critRange),
                crit: critDisadvantage(attack.hitChance,attack.critRange)};
        case "2":
            return {hit:Math.pow(((d20-StandardHit)/d20),2),
            miss: missAdvantage,
            crit: critAdvantage};
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



// export function critStandard(hitChance,critRange){
//     return Math.round((((d20 - attack.critRange) + 1)/(d20 - (d20 - attack.critRange) + 1))*10000)/10000;
// }
//
// export function hitStandard(hitChance,critRange){
//     return Math.round(((attack.critRange-attack.hitChance)/d20)*100)/100;
// }
//
// export function missStandard(hitChance,critRange){
//     return 1-hitStandard(hitChance,critRange);
// }