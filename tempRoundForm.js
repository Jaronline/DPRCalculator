const a = function (roundCount) {
    return `
         <fieldset id="round.${roundCount}">
                <legend>
                    <span>Round #${roundCount + 1}</span>
                </legend>
                <button type="button" id="round.${roundCount}.newRoundButton">+</button>
                <button type="button" id="round.${roundCount}.removeRoundButton">-</button>
                 <!-- lastRound -->
                <div>
                    <label for="round.${roundCount}.lastRound" class="p-d-block">Last Round? (Increased simulation accuracy)</label>
                    <span>
                                <input role="checkbox"
                                       id="round.${roundCount}.lastRound"
                                       class="p-checkbox p-component"
                                       type="checkbox"
                                       name="round.${roundCount}.lastRound" title="Is this round repeatable till the end of the battle? (if you havent already gotten 10 rounds this will be repeated to fill up to 10 rounds)">
                          </span>
                </div>
        </fieldset>
    `;
}

export default a;