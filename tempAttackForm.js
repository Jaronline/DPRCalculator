const a = function(attackCount) {
    return `
        <fieldset class="p-fieldset p-component">
            <div>
                <legend class="p-fieldset-legend p-unselectable-text">
                    <span class="p-fieldset-legend-text" id="pr_id_1_header">Attack #${attackCount + 1}</span>
                </legend>
            </div>
            <button type="button">
                <span class="plus" id="attack.${attackCount}.newAttackButton">+</span>
            </button>
            <button type="button">
                <span class="copy" id="attack.${attackCount}.copyAttackButton">&</span>
            </button>
            <button type="button">
                <span class="trash" id="attack.${attackCount}.removeAttackButton">-</span>
            </button>
            
            <!-- hitChance -->
            <div>
                <label for="attacks.${attackCount}.hitChance" class="p-d-block">Min. to Hit</label>
                <span id="attacks.${attackCount}.hitChance">
                    <input role="spinbutton"
                           class="p-inputtext p-component p-filled p-inputnumber-input"
                           type="text" inputmode="numeric"
                           name="attacks.0.hitChance" min="2" max="20"
                           aria-valuemin="2" aria-valuemax="20"
                           aria-valuenow="8" value="8"/>
                </span>
            </div>
        
            <!-- critRange -->
            <div>
                <label for="attacks.${attackCount}.critRange" class="p-d-block">Min. to Crit</label>
                <span id="attacks.${attackCount}.critRange">
                    <input role="spinbutton"
                           class="p-inputtext p-component p-filled p-inputnumber-input"
                           type="text" inputmode="numeric"
                           name="attacks.0.critRange" min="2" max="20"
                           aria-valuemin="2" aria-valuemax="20"
                           aria-valuenow="20" value="20"/>
                </span>
            </div>
        
            <!-- hitChanceArrayIndex -->
            <div>
                <label>
                    Accuracy Type
                    <select name="attacks.${attackCount}.hitChanceArrayIndex" tabindex="-1" aria-hidden="true">
                        <option value=""></option>
                        <option value="0">Disadvantage</option>
                        <option value="1">Standard</option>
                        <option value="2">Advantage</option>
                        <option value="3">Elven Accuracy</option>
                    </select>
                </label>
            </div>
        
            <!-- halflingLucky -->
            <div>
                <label class="p-d-block" for="attacks.${attackCount}.halflingLucky">Halfling?</label>
                <span id="attacks.${attackCount}.halflingLucky"></span>
            </div>
        
            <!-- attacks multiplier -->
            <div>
                <label for="attacks.${attackCount}.multiplier" class="p-d-block">Attacks/Turn</label>
                <span id="attacks.${attackCount}.multiplier">
                    <input role="spinbutton"
                           class="p-inputtext p-component p-filled p-inputnumber-input"
                           type="text" inputmode="numeric"
                           name="attacks.${attackCount}.multiplier" min="1"
                           aria-valuemin="1" aria-valuenow="1" value="1">
                </span>
            </div>
        
            <!-- damageOnHit -->
            <div>
                <label
                        for="attacks.${attackCount}.damageOnHit">Damage On Hit</label>
                <input
                        name="attacks.${attackCount}.damageOnHit" class="p-inputtext p-component p-filled"
                        id="attacks.${attackCount}.damageOnHit" value="12">
            </div>
            
            <!--damageOnHit average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="attacks.${attackCount}.damageOnHitAverage"></span>
            </div>
        
            <!-- damageNotMultiplied -->
            <div>
                <label for="attacks.${attackCount}.damageNotMultiplied">Additional Damage NOT multiplied Critical Hit</label>
                <input
                        name="attacks.${attackCount}.damageNotMultiplied" class="p-inputtext p-component p-filled"
                        id="attacks.${attackCount}.damageNotMultiplied" value="2+2">
            </div>
        
            <!-- damageNotMultiplied average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="attacks.${attackCount}.damageNotMultipliedAverage"></span>
            </div>
        
            <!-- damageOnCritFlat -->
            <div>
                <label for="attacks.${attackCount}.damageOnCritFlat">Damage Bonus on Crit (Not Multiplied)</label>
                <input
                        name="attacks.${attackCount}.damageOnCritFlat" class="p-inputtext p-component"
                        id="attacks.${attackCount}.damageOnCritFlat" value="">
            </div>
        
            <!-- damageOnCritFlat average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="attacks.${attackCount}.damageOnCritFlatAverage"></span>
            </div>
        
            <!-- damageOnCritMultiplied -->
            <div>
                <label for="attacks.${attackCount}.damageOnCritMultiplied">Damage Bonus on Crit (Dice Multiplied)</label>
                <input
                        name="attacks.${attackCount}.damageOnCritMultiplied" class="p-inputtext p-component"
                        id="attacks.${attackCount}.damageOnCritMultiplied" value="">
            </div>
        
            <!-- damageOnCritMultiplied average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="attacks.${attackCount}.damageOnCritMultipliedAverage"></span>
            </div>
        
            <!-- damageOnMiss -->
            <div>
                <label for="attacks.${attackCount}.damageOnMiss">Damage Dealt on Miss</label>
                <input
                        name="attacks.${attackCount}.damageOnMiss" class="p-inputtext p-component"
                        id="attacks.${attackCount}.damageOnMiss" value="">
            </div>
        
            <!-- damageOnMiss average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="attacks.${attackCount}.damageOnMissAverage"></span>
            </div>
        </fieldset>
    `;
}

export default a;