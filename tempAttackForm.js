const a = function(roundCount, attackCount = 0) {
    const idPrefix = `round.${roundCount}.attack.${attackCount}`;
    return `
        <fieldset id="${idPrefix}" class="p-fieldset p-component">
            <legend class="p-fieldset-legend p-unselectable-text">
                <span class="p-fieldset-legend-text" id="pr_id_1_header">Attack #${attackCount + 1}</span>
            </legend>
            <button type="button" id="${idPrefix}.newAttackButton">
                <span class="plus">+</span>
            </button>
            <button type="button" id="${idPrefix}.copyAttackButton">
                <span class="copy">&</span>
            </button>
            <button type="button" id="${idPrefix}.removeAttackButton">
                <span class="trash">-</span>
            </button>
            
            <!-- hitChance -->
            <div>
                <label for="${idPrefix}.hitChance" class="p-d-block">Min. to Hit</label>
                <span>
                    <input role="spinbutton"
                           id="${idPrefix}.hitChance"
                           class="p-inputtext p-component p-filled p-inputnumber-input"
                           type="text" inputmode="numeric"
                           name="${idPrefix}.hitChance" min="2" max="20"
                           aria-valuemin="2" aria-valuemax="20"
                           aria-valuenow="8" value="8"/>
                </span>
            </div>
        
            <!-- critRange -->
            <div>
                <label for="${idPrefix}.critRange" class="p-d-block">Min. to Crit</label>
                <span>
                    <input role="spinbutton"
                           id="${idPrefix}.critRange"
                           class="p-inputtext p-component p-filled p-inputnumber-input"
                           type="text" inputmode="numeric"
                           name="${idPrefix}.critRange" min="2" max="20"
                           aria-valuemin="2" aria-valuemax="20"
                           aria-valuenow="20" value="20"/>
                </span>
            </div>
        
            <!-- hitChanceArrayIndex -->
            <div>
                <label>
                    Accuracy Type
                    <select id="${idPrefix}.hitChanceArrayIndex" name="${idPrefix}.hitChanceArrayIndex" tabindex="-1" aria-hidden="true">
                        <option value="0">Disadvantage</option>
                        <option value="1" selected>Standard</option>
                        <option value="2">Advantage</option>
                        <option value="3">Elven Accuracy</option>
                    </select>
                </label>
            </div>
        
            <!-- halflingLucky -->
            <div>
                <label class="p-d-block" for="${idPrefix}.halflingLucky">Halfling?</label>
                <span id="${idPrefix}.halflingLucky"></span>
            </div>
        
            <!-- attacks multiplier -->
            <div>
                <label for="${idPrefix}.multiplier" class="p-d-block">Attacks/Turn</label>
                <span>
                    <input role="spinbutton"
                           id="${idPrefix}.multiplier"
                           class="p-inputtext p-component p-filled p-inputnumber-input"
                           type="text" inputmode="numeric"
                           name="${idPrefix}.multiplier" min="1"
                           aria-valuemin="1" aria-valuenow="1" value="1">
                </span>
            </div>
        
            <!-- damageOnHit -->
            <div>
                <label
                        for="${idPrefix}.damageOnHit">Damage On Hit</label>
                <input
                        name="${idPrefix}.damageOnHit" class="p-inputtext p-component p-filled"
                        id="${idPrefix}.damageOnHit" value="12">
            </div>
            
            <!--damageOnHit average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageOnHitAverage"></span>
            </div>
        
            <!-- damageNotMultiplied -->
            <div>
                <label for="${idPrefix}.damageNotMultiplied">Additional Damage NOT multiplied Critical Hit</label>
                <input
                        name="${idPrefix}.damageNotMultiplied" class="p-inputtext p-component p-filled"
                        id="${idPrefix}.damageNotMultiplied" value="2+2">
            </div>
        
            <!-- damageNotMultiplied average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageNotMultipliedAverage"></span>
            </div>
        
            <!-- damageOnCritFlat -->
            <div>
                <label for="${idPrefix}.damageOnCritFlat">Damage Bonus on Crit (Not Multiplied)</label>
                <input
                        name="${idPrefix}.damageOnCritFlat" class="p-inputtext p-component"
                        id="${idPrefix}.damageOnCritFlat" value="">
            </div>
        
            <!-- damageOnCritFlat average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageOnCritFlatAverage"></span>
            </div>
        
            <!-- damageOnCritMultiplied -->
            <div>
                <label for="${idPrefix}.damageOnCritMultiplied">Damage Bonus on Crit (Dice Multiplied)</label>
                <input
                        name="${idPrefix}.damageOnCritMultiplied" class="p-inputtext p-component"
                        id="${idPrefix}.damageOnCritMultiplied" value="">
            </div>
        
            <!-- damageOnCritMultiplied average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageOnCritMultipliedAverage"></span>
            </div>
        
            <!-- damageOnMiss -->
            <div>
                <label for="${idPrefix}.damageOnMiss">Damage Dealt on Miss</label>
                <input
                        name="${idPrefix}.damageOnMiss" class="p-inputtext p-component"
                        id="${idPrefix}.damageOnMiss" value="">
            </div>
        
            <!-- damageOnMiss average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageOnMissAverage"></span>
            </div>
        </fieldset>
    `;
}

export default a;