const a = function (roundCount) {
    return `
         <fieldset id="round.${roundCount}">
                <legend>
                    <span>Round #${roundCount + 1}</span>
                </legend>
        </fieldset>
    `;
}

export default a;