import createAttackForm from "./tempAttackForm.js";
import createRoundForm from "./tempRoundForm.js";

const dprForm = document.getElementById("dprForm");

setEventListenersForRound();

function createElementFromHTMLString(htmlString) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = htmlString;
    return unwrapFirst(wrapper);
}

function unwrapFirst(element) {
    return element.firstElementChild;
}

function matchRoundAndAttack(value, requireAttack = false) {
    const match = value.match(/^round\.(?<roundId>\d+?)(?:\.attack\.(?<attackId>\d+?))?/);

    if (!match) {
        throw new Error(`Missing round: ${value}`);
    }

    const {roundId, attackId} = match.groups;

    if (requireAttack && !attackId) {
        throw new Error(`Missing attack: ${value}`);
    }

    return {
        roundId: parseInt(roundId),
        attackId: attackId ? parseInt(attackId) : null
    };
}

function insertAfter(insertNode, referenceNode) {
    if (referenceNode.nextElementSibling) {
        referenceNode.parentElement.insertBefore(insertNode, referenceNode.nextElementSibling);
    } else {
        referenceNode.parentElement.appendChild(insertNode);
    }
}

function setEventListenersForRound(roundId = 0) {
    const newRoundButton = document.getElementById("round."+ roundId +".newRoundButton");
    const removeRoundButton = document.getElementById("round."+ roundId +".removeRoundButton");

    function getRoundFieldset(roundId) {
        return dprForm.querySelector(`fieldset[id="round.${roundId}"]`);
    }

    newRoundButton.addEventListener("click", function () {
        // try {
        //     const {roundId} = matchRoundAndAttack(newRoundButton.id);
        //     const attackFieldset = getRoundFieldset(roundId);
        //     // createNewRoundFieldsetAndUpdateFields(attackFieldset, attackId + 1);
        //     validateAttack();
        // } catch (e) {
        //     console.error(e.message);
        // }
        const {roundId} = matchRoundAndAttack(newRoundButton.id);
        const roundFieldset = getRoundFieldset(roundId);
        const newRoundCount = roundId + 1;

        const newRoundFieldset = createElementFromHTMLString(createRoundForm(newRoundCount));
        const attackFieldset = createElementFromHTMLString(createAttackForm(newRoundCount));

        newRoundFieldset.appendChild(attackFieldset);
        dprForm.appendChild(newRoundFieldset);
        //Updaterounds
        setEventListenersForRound(newRoundCount);
        validateAttack();
    });

    // removeRoundButton.addEventListener("click", function () {
    //     const {roundId} = matchRoundAndAttack(removeRoundButton.id);
    //
    //     if (roundId === 0) {
    //         return;
    //     }
    //
    //     const roundFieldset = getRoundFieldset(roundId);
    //     roundFieldset.remove();
    //
    //     validateAttack();
    // });

    setEventListenersForAttack(roundId);
}
function setEventListenersForAttack(roundId = 0, attackId = 0) {
    const dprFieldset = document.getElementById("round." + roundId);
    const newAttackButton = document.getElementById("round." + roundId + ".attack."+ attackId +".newAttackButton");
    const copyAttackButton = document.getElementById("round." + roundId + ".attack."+ attackId +".copyAttackButton");
    const removeAttackButton = document.getElementById("round." + roundId + ".attack."+ attackId +".removeAttackButton");

    function getAttackFieldset(roundId, attackId) {
        return dprFieldset.querySelector(`fieldset[id="round.${roundId}.attack.${attackId}"]`);
    }

    function updateFieldsAfterAttackFieldset(attackFieldset, roundId, attackId, matchOffset = -1) {
        const nextIdOrNameElementsToUpdate = [];
        let currentAttackFieldset = attackFieldset;
        let currentAttackId = attackId;

        while (!!currentAttackFieldset.nextElementSibling) {

            currentAttackFieldset = currentAttackFieldset.nextElementSibling;
            currentAttackId++;

            currentAttackFieldset.querySelector(":scope > legend > span").innerText =
                `Attack #${currentAttackId + 1}`;

            const idPrefix =
                `round.${roundId}.attack.${currentAttackId + matchOffset}`;

            const nextIdOrNameElementsWithAttackId =
                [
                    ...currentAttackFieldset
                        .querySelectorAll(`[id^="${idPrefix}"], [name^="${idPrefix}"], [for^="${idPrefix}"]`),
                    currentAttackFieldset
                ]
                    .map((element) => ({
                        element,
                        currentAttackId
                    }));

            nextIdOrNameElementsToUpdate.push(...nextIdOrNameElementsWithAttackId);
        }

        nextIdOrNameElementsToUpdate.forEach(({ element, currentAttackId }) => {
            const idPrefix =
                `round.${roundId}.attack.${currentAttackId + matchOffset}`;
            
            ["id", "name", "for"].forEach((att) => {
                if (element[att]?.startsWith?.(idPrefix)) {
                    element[att] = element[att].replace(idPrefix, `round.${roundId}.attack.${currentAttackId}`);
                }
            });
        });
    }
    // function updateFieldsAfterRoundFieldSet(roundFieldset, roundId){
    //     const nextIdOrNameElementsToUpdate = [];
    //     let currentRoundId = roundId;
    //     let currentRoundFieldset = roundFieldset;
                                                                                                                                                        //
    //     while (!!currentRoundFieldset.nextElementSibling){
    //
    //         currentRoundFieldset = currentRoundFieldset.nextElementSibling;
    //         currentRoundId++;
    //
    //         currentRoundFieldset.querySelector(":scope > legend > span").innerText =
    //             `Round #${currentRoundId + 1}`;
    //
    //         const idPrefix =
    //             `round.${roundId}`;
    //         const nextIdOrNameElementsWithAttackId =
    //             [
    //                 ...currentAttackFieldset
    //                     .querySelectorAll(`[id^="${idPrefix}"], [name^="${idPrefix}"], [for^="${idPrefix}"]`),
    //                 currentAttackFieldset
    //             ]
    //                 .map((element) => ({
    //                     element,
    //                     currentAttackId
    //                 }));
    //      }
    //
    //
    // }
    // function createNewRoundFieldsetAndUpdateFields(previousRoundFieldSet, attackFieldSet, newAttackId, newRoundId){
    //     const newRoundFieldset = createElementFromHTMLString(createRoundForm(newRoundId));
    //
    //     insertAfter(newRoundFieldset, previousRoundFieldSet);
    //     // updateFieldsAfterAttackFieldset(attackFieldSet, newRoundId, newAttackId);
    //     setEventListenersForRound(newRoundId);
    //
    //     return newRoundFieldset;
    // }
    function createNewAttackFieldsetAndUpdateFields(previousAttackFieldset, newAttackId) {
        const newAttackFieldset = createElementFromHTMLString(createAttackForm(roundId, newAttackId));

        insertAfter(newAttackFieldset, previousAttackFieldset);
        updateFieldsAfterAttackFieldset(newAttackFieldset, roundId, newAttackId);
        setEventListenersForAttack(roundId, newAttackId);

        return newAttackFieldset;
    }

    newAttackButton.addEventListener("click", function () {
        try {
            const {attackId} = matchRoundAndAttack(newAttackButton.id, true);
            const attackFieldset = getAttackFieldset(roundId, attackId);
            createNewAttackFieldsetAndUpdateFields(attackFieldset, attackId + 1);
            validateAttack();
        } catch (e) {
            console.error(e.message);
        }
    });

    copyAttackButton.addEventListener("click", function () {
        try {
            const {attackId} = matchRoundAndAttack(copyAttackButton.id, true);
            const attackFieldset = getAttackFieldset(roundId, attackId);
            const attackInputs = [...attackFieldset.querySelectorAll(":scope :where(input, select)")]
                .map((el) => ({
                    id: el.id.split(".").pop(),
                    value: el.value
                }));

            const newAttackFieldset = createNewAttackFieldsetAndUpdateFields(attackFieldset, attackId + 1);
            newAttackFieldset.querySelectorAll(":scope :where(input, select, textarea)")
                .forEach((el) => {
                    const {value} = attackInputs.find((input) => el.id.endsWith(input.id));
                    el.value = value;
                });
            validateAttack();
        } catch (e) {
            console.error(e.message);
        }
    });

    removeAttackButton.addEventListener("click", function () {
        try {
            const {attackId} = matchRoundAndAttack(removeAttackButton.id, true);

            if (attackId === 0) {
                return;
            }

            const attackForm = getAttackFieldset(roundId, attackId);
            const previousAttackForm = attackForm.previousElementSibling;
            attackForm.remove();
            updateFieldsAfterAttackFieldset(previousAttackForm, roundId, attackId - 1, 1);
            validateAttack();
        } catch (e) {
            console.error(e.message);
        }
    });
}