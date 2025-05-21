const a = function (roundCount) {
    return `
        <fieldset id="round.${roundCount}">
            <legend>
                <i class="material-icons">autorenew</i>
                <span>Round #${roundCount + 1}</span>
            </legend>
            <div class="button-container">
                <div class="row">
                    <div class="col s12">
                        <button type="button" class="btn btn-add waves-effect waves-light brown lighten 3"
                            id="round.${roundCount}.newRoundButton">
                            <i class="material-icons left">add</i>Add Round
                        </button>
                        <button type="button" class="btn btn-remove waves-effect waves-light"
                            id="round.${roundCount}.removeRoundButton">
                            <i class="material-icons left">remove</i>Remove Round
                        </button>
                    </div>
                </div>

                <!-- lastRound -->
                <div class="row">
                    <div class="col s12 m6">
                        <label class="p-d-block" for="round.${roundCount}.lastRound">
                            <input role= "checkbox" type="checkbox" id="round.${roundCount}.lastRound" class="p-checkbox p-component"
                                name="round.${roundCount}.lastRound"
                                title="Is this round repeatable till the end of the battle? (if you haven't already gotten 10 rounds this will be repeated to fill up to 10 rounds)">
                            <span>Last Round? (Increased simulation accuracy)</span>
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
    `;
}

export default a;