const a = function (roundCount) {
    return `
         <fieldset id="round.${roundCount}">
                <legend>
                    <span>Round #${roundCount + 1}</span>
                </legend>
                <button type="button" id="round.${roundCount}.newRoundButton">+</button>
                <button type="button" id="round.${roundCount}.removeRoundButton">-</button>
        </fieldset>
    `;
}

export default a;