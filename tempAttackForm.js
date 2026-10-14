const a = function(roundCount, attackCount = 0) {
    const idPrefix = `round.${roundCount}.attack.${attackCount}`;
    return `
            <fieldset id="${idPrefix}" class="p-fieldset p-component">
            <legend class="p-fieldset-legend p-unselectable-text">
                <i class="material-icons">gavel</i>
                <span class="p-fieldset-legend-text" id="pr_id_1_header">Attack #${attackCount + 1}</span>
            </legend>
            <div class="row">
                <div class="col s12">
                    <button type="button" class="btn btn-add waves-effect waves-light"
                        id="${idPrefix}.newAttackButton">
                        <i class="material-icons">add</i><span class="plus"></span>
                    </button>
                    <button type="button" class="btn btn-copy waves-effect waves-light"
                        id="${idPrefix}.copyAttackButton">
                        <i class="material-icons">content_copy</i><span class="copy"></span>
                    </button>
                    <button type="button" class="btn btn-remove waves-effect waves-light"
                        id="${idPrefix}.removeAttackButton">
                        <i class="material-icons">remove</i><span class="trash"></span>
                    </button>
                </div>
            </div>

            <div class="row">
                <!-- hitChance -->
                <div class="col s12 m4">
                    <label for="${idPrefix}.hitChance" class="p-d-block">Min. to Hit</label>
                    <input role="spinbutton"
                        class="p-inputtext p-component p-filled p-inputnumber-input validate" type="number"
                        inputmode="numeric" id="${idPrefix}.hitChance"
                        name="${idPrefix}.hitChance" min="1" max="20" aria-valuemin="1"
                        aria-valuemax="20" aria-valuenow="8" value="8" />
                </div>

                <!-- critRange -->
                <div class="col s12 m4">
                    <label for="${idPrefix}.critRange" class="p-d-block">Min. to Crit</label>
                    <input role="spinbutton"
                        class="p-inputtext p-component p-filled p-inputnumber-input validate" type="number"
                        inputmode="numeric" id="${idPrefix}.critRange"
                        name="${idPrefix}.critRange" min="2" max="20" aria-valuemin="2"
                        aria-valuemax="20" aria-valuenow="20" value="20" />
                </div>

                <!-- attacks multiplier -->
                <div class="col s12 m4">
                    <label for="${idPrefix}.multiplier" class="p-d-block">Attacks/Turn</label>
                    <input role="spinbutton" id="${idPrefix}.multiplier"
                        class="p-inputtext p-component p-filled p-inputnumber-input validate" type="text"
                        inputmode="numeric" name="${idPrefix}.multiplier" min="1" aria-valuemin="1"
                        aria-valuenow="1" value="1">
                </div>
            </div>

            <div class="row">
                <div class="col s12 m4">
                    <div class="percentage-indicator miss-percentage">
                        <label for="${idPrefix}.missChangePercentage"
                            class="p-d-block percentage-chance">Miss % Chance</label>
                        <span id="${idPrefix}.missChangePercentage">35%</span>
                    </div>
                </div>
                <div class="col s12 m4">
                    <div class="percentage-indicator hit-percentage">
                        <label for="${idPrefix}.hitChangePercentage"
                            class="p-d-block percentage-chance">Hit % Chance</label>
                        <span id="${idPrefix}.hitChangePercentage">60%</span>
                    </div>
                </div>
                <div class="col s12 m4">
                    <div class="percentage-indicator crit-percentage">
                        <label for="${idPrefix}.critChangePercentage"
                            class="p-d-block percentage-chance">Crit % Chance</label>
                        <span id="${idPrefix}.critChangePercentage">5%</span>
                    </div>
                </div>
            </div>

            <div class="row flex-center-row">
                <!-- hitChanceArrayIndex -->
                <div class="col s12 m6 select-wrapper-container">
                    <label for="${idPrefix}.hitChanceArrayIndex">Accuracy Type</label>
                    <select id="${idPrefix}.hitChanceArrayIndex"
                        name="${idPrefix}.hitChanceArrayIndex" class="browser-default" tabindex="-1"
                        aria-hidden="true">
                        <option value="0">Disadvantage</option>
                        <option value="1" selected>Standard</option>
                        <option value="2">Advantage</option>
                        <option value="3">Elven Accuracy</option>
                    </select>
                </label>
            </div>
        
                    <!-- halflingLucky -->
                <div class="col s12 m6 checkbox-container">
                    <label class="p-d-block" for="${idPrefix}.halflingLucky">
                        <input id="${idPrefix}.halflingLucky" type="checkbox"
                            name="${idPrefix}.halflingLucky">
                        <span>Halfling Lucky</span>
                    </label>
                </div>
                </div>
        
            <!-- attacks multiplier -->
            <div>
                <label for="${idPrefix}.multiplier" class="p-d-block">Attacks/Turn</label>
                <span>
                    <input role="spinbutton"
                           id="${idPrefix}.multiplier"
                           class="p-inputtext p-component p-filled p-inputnumber-input"
                           type="number" inputmode="numeric"
                           name="${idPrefix}.multiplier" min="1"
                           aria-valuemin="1" aria-valuenow="1" value="1">
                </span>
            </div>
        
            <div class="divider"></div>

            <div class="row">
            <!-- damageOnHit -->
            <div class="col s12 m6">
                <label
                        for="${idPrefix}.damageOnHit">Damage On Hit</label>
                <input
                        name="${idPrefix}.damageOnHit" class="p-inputtext p-component p-inputnumber-input p-filled validate"
                        id="${idPrefix}.damageOnHit" value=""
                        pattern="^[\\d+\\-\\*\\/\\^\\(\\)d\\s]+$">     
                <span class="helper-text">Average: <span id="${idPrefix}.damageOnHitAverage"
                            class="stat-value">12</span></span>
            </div>
            
            <!--damageOnHit average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageOnHitAverage"></span>
            </div>
        
                   <!-- damageNotMultiplied -->
                <div class="col s12 m6">
                    <label for="${idPrefix}.damageNotMultiplied">Additional Damage (NOT multiplied Critical Hit)</label>
                    <input name="${idPrefix}.damageNotMultiplied"
                        class="p-inputtext p-component p-filled validate"
                        id="${idPrefix}.damageNotMultiplied" value="2+2"                         
                        pattern="^[\\d+\\-\\*\\/\\^\\(\\)d\\s]+$">
                    <span class="helper-text">Average: <span
                            id="${idPrefix}.damageNotMultipliedAverage"
                            class="stat-value">4</span></span>
                </div>
        
            <!-- damageNotMultiplied average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageNotMultipliedAverage"></span>
            </div>
            </div>
        
         <div class="row">
            <!-- damageOnCritFlat -->
            <div class="col s12 m6">
                <label for="${idPrefix}.damageOnCritFlat">Damage Bonus on Crit (Not Multiplied)</label>
                <input
                        name="${idPrefix}.damageOnCritFlat" class="p-inputtext p-component"
                        id="${idPrefix}.damageOnCritFlat" value=""
                        pattern="^[\\d+\\-\\*\\/\\^\\(\\)d\\s]+$">
                                    <span class="helper-text">Average: <span id="${idPrefix}.damageOnCritFlatAverage"
                            class="stat-value">0</span></span>
            </div>
        
            <!-- damageOnCritFlat average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageOnCritFlatAverage"></span>
            </div>
        
            <!-- damageOnCritMultiplied -->
                <div class="col s12 m6">
                    <label for="${idPrefix}.damageOnCritMultiplied">Damage Bonus on Crit (Dice
                        Multiplied)</label>
                    <input name="${idPrefix}.damageOnCritMultiplied"
                        class="p-inputtext p-component validate"
                        id="${idPrefix}.damageOnCritMultiplied" value=""
                        pattern="^[\\d+\\-\\*\\/\\^\\(\\)d\\s]+$">
                    <span class="helper-text">Average: <span
                            id="${idPrefix}.damageOnCritMultipliedAverage"
                            class="stat-value">0</span></span>
                </div>
                </div>
        
            <!-- damageOnCritMultiplied average -->
            <div>
                <label class="p-d-block">Average</label>
                <span id="${idPrefix}.damageOnCritMultipliedAverage"></span>
            </div>

            <div class="row">
                <!-- damageOnMiss -->
                <div class="col s12 m6">
                    <label for="${idPrefix}.damageOnMiss">Damage Dealt on Miss</label>
                    <input name="${idPrefix}.damageOnMiss" class="p-inputtext p-component validate"
                        id="${idPrefix}.damageOnMiss" value=""
                    pattern="^[\\d+\\-\\*\\/\\^\\(\\)d\\s]+$"
                        >
            <span class="helper-text">Average: <span id="${idPrefix}.damageOnMissAverage"
                            class="stat-value">0</span></span>
                </div>
            </div>
        </fieldset>
    `;
}

export default a;