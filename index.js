import createRoundForm from "./tempRoundForm.js";
import createAttackForm from "./tempAttackForm.js";
import { setEventListenersForRound, setEventListenersForAttack, createElementFromHTMLString } from "./buttonListeners.js";

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('change', (event) => {
        if (event.target.id.includes("round.") && (event.target.id.includes(".attack.") || event.target.id.includes(".lastRound"))) {
            // Call the function to update the output table
            if(validForm()){
                validateAttack();
            }

            if (event.target.id.includes(".lastRound")) {
                const roundId = event.target.id.split(".")[1];
                document.querySelectorAll(`[id^='round.']`).forEach(round => {
                    if (round.id.split(".")[1] !== roundId) {
                        const lastRoundCheckbox = round.querySelector(`[id^='round.${round.id.split(".")[1]}.lastRound']`);
                        if (lastRoundCheckbox) {
                            lastRoundCheckbox.checked = false;
                            lastRoundCheckbox.disabled = event.target.checked;
                        }
                    }
                });
            }
        }
    });
});

function validForm() {
    const form = document.getElementById('dprForm');
    const inputs = form.querySelectorAll('input, select');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
        }
    });

    return isValid;
}


const dprForm = document.getElementById("dprForm");

validateAttack();
loadData();

// if using the Calculator for (save DC):
// INT saves: 71.0% failure rate [INCREASE hit chance by 1/20]
// DEX saves: 64.2% [REDUCE hit chance by 0]
// CHA saves: 61.8% [REDUCE hit chance by 1/20]
// STR saves: 61.7% [REDUCE hit chance by 1/20]
// WIS saves: 55.6% [REDUCE hit chance by 2/20]
// CON saves: 54.1% [REDUCE hit chance by 2/20]

function handleDiceInput(e) {
    if (e.toString().match(/^[\d+\-\*\/\^\(\)d\s]+$/) == null){
        return 0;
    }
    else {
        e.toString().toLowerCase();
    }

    let avgString = e.toString();
    e.toString().match(/(\d*(?=d)?)(d(?=\d))(\d+)?/gdi)?.forEach((d) => {
        let [acc,side] = d.split("d")

        if (side === "" || !Number.isSafeInteger(Number(side)) || isNaN(Number(side)) || side === "0" || acc === "0" || acc === undefined || side === undefined) {
            avgString = avgString.replace(d, Number(0).toString());
        }
        if(acc === "" || acc === undefined || Number(acc) === 0){
            avgString = avgString.replace(d, Math.floor((1+Number(side))/2).toString());
        }

        avgString = avgString.replace(d, Math.floor(Number(acc) * ((1+Number(side))/2)).toString());
    });
    return total(avgString);
}

function avg(...e) {
    return div(e.reduce(add, 0),e.length);
}

function div(a, b) {
    return Number(a / b);
}

function total(a) {
    try {
        if (Array.isArray(a))
        {
            return a.reduce((acc, value) => add(acc,value), 0)
        }
        else if (!Number.isSafeInteger(a))
        {
            return new Function('return ' + a)();  // Safer alternative to eval
        }
        return Number(a)
        
      } catch (error) {
        console.error("Invalid expression:", a);
        return 0;  // Return 0 if there's an invalid expression
      }
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
        return Math.round((Math.round(((a * (10** (b+1))) * 2)) / (10 ** (b+1)) / 2) * (10** b)) / (10** b)
    }
    else {
        return Math.round(a);
    }
}


function mapDOMToObject() {
    let a = Array.from(dprForm.querySelectorAll("[id^='round']")).filter((e)=>e.id.split(".").length === 2);
    let c = [];
    a.forEach(
        (b, rIndex) => {
            b = {
                attacks: Array.from(dprForm.querySelectorAll(`[id^='round.${rIndex}.attack']`)).filter((e)=>{
                    return e.id.split(".").length === 4;
                }),
                lastRound: dprForm.querySelector(`[id^='round.${rIndex}.lastRound']`)?.checked??false,
            }
            let e = [];
            b.attacks.forEach((d,aIndex)=>{
                let critRange = dprForm.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='critRange']:not([id*='average' i])`);
                let damageNotMultiplied = dprForm.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageNotMultiplied']:not([id*='average' i])`);
                let damageOnCritFlat =dprForm.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnCritFlat']:not([id*='average' i])`)
                let damageOnCritMultiplied =dprForm.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnCritMultiplied']:not([id*='average' i])`)
                let damageOnHit =dprForm.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnHit']:not([id*='average' i])`)
                let damageOnMiss =dprForm.querySelector(`input[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='damageOnMiss']:not([id*='average' i])`)
                let halflingLucky =dprForm.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='halflingLucky']:not([id*='average' i])`)
                let hitChance =dprForm.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='hitChance']:not([id*='average' i])`)
                let hitChanceArrayIndex =dprForm.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='hitChanceArrayIndex']:not([id*='average' i])`)
                let multiplier =dprForm.querySelector(`[id^='round.${rIndex}'][id*='attack.${aIndex}'][id*='multiplier']:not([id*='average' i])`)

                d = {
                    critRange: critRange?.value??undefined,
                    damageNotMultiplied: damageNotMultiplied?.value??undefined,
                    damageOnCritFlat: damageOnCritFlat?.value??undefined,
                    damageOnCritMultiplied: damageOnCritMultiplied?.value??undefined,
                    damageOnHit: damageOnHit?.value??undefined,
                    damageOnMiss: damageOnMiss?.value??undefined,
                    halflingLucky: halflingLucky?.checked??false,
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
    if (!rounds || rounds.length <= 0 || !Array.isArray(rounds)) return;
    let domRoundsFieldsets = Array.from(dprForm.querySelectorAll(`fieldset[id^='round.']`)).filter(e=>e.id.split(".").length === 2);

    for(let i = 0; i < domRoundsFieldsets.length; i++) {
        const fieldset = domRoundsFieldsets[i];
        const roundIndex = parseInt(fieldset.id.split(".")[1]);
        if(roundIndex > 0) {
            if (isNaN(roundIndex) || !rounds[roundIndex] || rounds[roundIndex]?.simulated) {
                fieldset.dispatchEvent(new Event("dispose"));
            }
        }
    }

    rounds.forEach((round, rIndex) => {
        if (round.simulated) return; // Skip simulated rounds

        let domAttacksFieldsets = Array.from(dprForm.querySelectorAll(`fieldset[id^='round.${rIndex}.attack.']`)).filter(e=>e.id.split(".").length === 4);

        for(let i = 0; i < domAttacksFieldsets.length; i++) {
            const fieldset = domAttacksFieldsets[i];
            const attackIndex = parseInt(fieldset.id.split(".")[3]);
            if(attackIndex > 0) {
                if (isNaN(attackIndex) || !round.attacks[attackIndex]) {
                    fieldset.dispatchEvent(new Event("dispose"));
                }
            }
        }

        let roundFieldset = dprForm.querySelector(`fieldset[id='round.${rIndex}']`);

        if (!roundFieldset) {
            roundFieldset = createElementFromHTMLString(createRoundForm(rIndex));
            dprForm.appendChild(roundFieldset);
            setEventListenersForRound(rIndex);
            roundFieldset = dprForm.querySelector(`fieldset[id='round.${rIndex}']`);
        }

        const lastRoundCheckbox = dprForm.querySelector(`[id='round.${rIndex}.lastRound']`);
        if (lastRoundCheckbox) lastRoundCheckbox.checked = round.lastRound ?? false;

        round.attacks.forEach((attack, aIndex) => {
            let attackFieldset = dprForm.querySelector(`fieldset[id='round.${rIndex}.attack.${aIndex}']`);

            if (!attackFieldset) {
                attackFieldset = createElementFromHTMLString(createAttackForm(rIndex, aIndex));
                roundFieldset.appendChild(attackFieldset);
                setEventListenersForAttack(rIndex, aIndex);
                attackFieldset = dprForm.querySelector(`fieldset[id='round.${rIndex}.attack.${aIndex}']`);
            }

            Object.entries(attack).forEach(([key, value]) => {
                const input = attackFieldset.querySelector(`[id='round.${rIndex}.attack.${aIndex}.${key}']`);
                const span = attackFieldset.querySelector(`span[id='round.${rIndex}.attack.${aIndex}.${key}']`);
                if (span) span.innerHTML = value ?? "";

                if (input) {
                    if (input.type === "checkbox") {
                        input.checked = value ?? false;
                    } else {
                        input.value = value ?? "";
                    }
                }
            });
        });
    });
}

function genOutputDOM(rounds) {
    let addToTable = "";

    let totalDPR = 0.0;
    rounds.forEach((round,rIndex)=>{
        if(!round.simulated) {
            addToTable += `<tr><td>Round #${rIndex + 1}:</td><td></td><td></td></tr>`;
        }
        let totalDamagePerRound = 0.0;

        round.attacks.forEach((attack,aIndex)=> {
            let chance = getHitChanceFromIndex(attack.hitChanceArrayIndex,attack);

            let averageDamagePerAttack = 
                mul(attack.damageOnHitAverage ?? 0, (chance.hit + chance.crit)) +        // Damage for normal hits and crits
                mul(attack.damageOnCritFlatAverage ?? 0, chance.crit) +                  // Additional flat damage from crit
                mul(attack.damageOnCritMultipliedAverage ?? 0, chance.crit) +           // Multiplied damage from crit
                mul(attack.damageNotMultipliedAverage ?? 0, (chance.hit + chance.crit)) + // Damage that is not multiplied (like modifier damage)
                mul(attack.damageOnMissAverage ?? 0, chance.miss);                      // Damage on miss

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
    let averageDPR = div(totalDPR,rounds.length)??0.0;

    addToTable += `<tr><td>Damage Per Round:</td><td></td><td>${averageDPR.toFixed(2)}</td></tr>`;
    addToTable += `<tr><td>Total Combat Damage:</td><td></td><td>${totalDPR.toFixed(2)}</td></tr>`;

    document.querySelector("table[id='outputDPR']").innerHTML = addToTable;

    saveData(rounds);
}

export function validateAttack() {
    // find all rounds
    // per round find all attacks
    // per attack find all damages
    // transform attack to javascript object
    let roundsObj = mapDOMToObject();

    // calculate average damage per attack
    roundsObj.map((r) => ({
        attacks:
            r.attacks.map((attack) => {
                let chance = getHitChanceFromIndex(attack.hitChanceArrayIndex,attack);

                attack.missChangePercentage = round((chance.miss * 100),2)??undefined;
                attack.hitChangePercentage = round((chance.hit * 100),2)??undefined;
                attack.critChangePercentage = round((chance.crit * 100),2)??undefined;
                attack.damageOnHitAverage = total(handleDiceInput(attack.damageOnHit));
                attack.damageNotMultipliedAverage = total(handleDiceInput(attack.damageNotMultiplied));
                attack.damageOnCritFlatAverage = total(handleDiceInput(attack.damageOnCritFlat));
                attack.damageOnCritMultipliedAverage = total(handleDiceInput(attack.damageOnCritMultiplied));
                attack.damageOnMissAverage = total(handleDiceInput(attack.damageOnMiss));
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
    const d20 = 20.0

    const P = (threshold, total = d20, dice = 1) =>
        ((total - threshold + 1) / total) ** Math.max(dice, 1);

    const pAny = (threshold, total = d20, dice = 1) =>
        1 - ((threshold - 1) / total) ** Math.max(dice, 1);

    const pReroll = (
        baseProb,
        isFailure = false,
        dice = 1,
        threshold = 1,
        total = d20
    ) => {
        const rerollChance = threshold / total;  // chance of rerolling per dice
        const attempts = Math.max(1,dice);  // at least one reroll
        const pFailure = 1 - baseProb;  // probability of failure on each dice roll
        const pRerollFailure = pFailure ** attempts;
        const pRerollSucceeds = 1 - pRerollFailure;  // cumulative probability of at least one success

        let adjustedProb;

        if (isFailure) {
            // If we're dealing with failures, we calculate how much the rerolls reduce the failure rate
            const failuresSaved = pFailure * rerollChance * pRerollSucceeds;
            adjustedProb = baseProb - failuresSaved;
        } else {
            // If we're dealing with successes, we calculate how much rerolls increase the success rate
            const successesBoosted = pFailure * rerollChance * pRerollSucceeds;
            adjustedProb = baseProb + successesBoosted;
        }

        // Clamping the result to ensure it stays within the valid probability range [0, 1]
        return Math.min(Math.max(adjustedProb, 0), 1);
    };

    // Standard
    const critStandard = (hit, crit) => P(crit);
    const hitStandard = (hit, crit) => Math.max(0, P(hit) - P(crit));
    const missStandard = (hit, crit) => Math.max(0,1 - hitStandard(hit, crit) - critStandard(hit, crit));

    // Advantage (any die succeeds)
    const critAdvantage = (hit, crit, dice = 2) => pAny(crit, d20, dice??2);
    const hitAdvantage = (hit, crit, dice = 2) => Math.max(0, pAny(hit, d20, dice??2) - pAny(crit, d20, dice??2));
    const missAdvantage = (hit, crit, dice = 2) => Math.max(0,1 - hitAdvantage(hit, crit, dice??2) - critAdvantage(hit, crit, dice??2));

    // Disadvantage (all dice must succeed)
    const critDisadvantage = (hit, crit, dice = 2) => P(crit, d20, dice??2);
    const hitDisadvantage = (hit, crit, dice = 2) => Math.max(0, P(hit, d20, dice??2) - P(crit, d20, dice??2));
    const missDisadvantage = (hit, crit, dice = 2) => Math.max(0,1 - hitDisadvantage(hit, crit, dice??2) - critDisadvantage(hit, crit, dice??2));

    switch ((index??1).toString()){
        case "0":
            return {
                hit:(attack.halflingLucky)?pReroll(hitDisadvantage(attack.hitChance,attack.critRange)):
                    hitDisadvantage(attack.hitChance,attack.critRange),
                miss: (attack.halflingLucky)?pReroll(missDisadvantage(attack.hitChance,attack.critRange),true):
                    missDisadvantage(attack.hitChance,attack.critRange),
                crit: (attack.halflingLucky)?pReroll(critDisadvantage(attack.hitChance,attack.critRange)):
                    critDisadvantage(attack.hitChance,attack.critRange)};
        case "1":
            return {
                hit:(attack.halflingLucky)?pReroll(hitStandard(attack.hitChance,attack.critRange)):
                    hitStandard(attack.hitChance,attack.critRange),
                miss:(attack.halflingLucky)?pReroll(missStandard(attack.hitChance,attack.critRange),true):
                    missStandard(attack.hitChance,attack.critRange),
                crit:(attack.halflingLucky)?pReroll(critStandard(attack.hitChance,attack.critRange)):
                    critStandard(attack.hitChance,attack.critRange)};
        case "2":
            return {
                hit:(attack.halflingLucky)?pReroll(hitAdvantage(attack.hitChance,attack.critRange)):
                    hitAdvantage(attack.hitChance,attack.critRange),
                miss: (attack.halflingLucky)?pReroll(missAdvantage(attack.hitChance,attack.critRange),true):
                    missAdvantage(attack.hitChance,attack.critRange),
                crit: (attack.halflingLucky)?pReroll(critAdvantage(attack.hitChance,attack.critRange)):
                    critAdvantage(attack.hitChance,attack.critRange)};
        case "3":
            return {
                hit:(attack.halflingLucky)?pReroll(hitAdvantage(attack.hitChance,attack.critRange,3)):
                    hitAdvantage(attack.hitChance,attack.critRange,3),
                miss:(attack.halflingLucky)?pReroll(missAdvantage(attack.hitChance,attack.critRange,3),true):
                    missAdvantage(attack.hitChance,attack.critRange,3),
                crit:(attack.halflingLucky)?pReroll(critAdvantage(attack.hitChance,attack.critRange,3)):
                    critAdvantage(attack.hitChance,attack.critRange,3)};

    }
}

function saveData(rounds) {
    let roundsString = JSON.stringify(rounds);
    if ((roundsString !== sessionStorage.getItem("rounds") || sessionStorage.getItem("rounds") === null || sessionStorage.getItem("rounds") === undefined) && rounds.length > 0 && roundsString !== "[]" && roundsString !== null && roundsString !== undefined && roundsString !== "") {
        console.log("Saving rounds to session storage.");
        sessionStorage.setItem("rounds", roundsString);
    }
}

function loadData() {
    let roundsString = sessionStorage.getItem("rounds");
    if (roundsString !== null && roundsString !== undefined && roundsString !== "" && roundsString !== "[]") {
        console.log("Loading rounds from session storage.");
        let rounds = JSON.parse(roundsString);
        if (rounds.length <= 0) {
            return;
        }
        mapObjectToDOM(rounds);
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