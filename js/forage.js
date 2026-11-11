/* Variables for game settings */
var reverseOrder = true;
var twoRounds = false;

/* Get game settings, called on page load and value changes */
function getGameSettings()
{
    reverseOrder = $('#reverse-order').prop('checked');
    twoRounds = $('#two-rounds').prop('checked');
    toggleRound(twoRounds);
}

/* Changes the second round section to an inactive visual state */
function toggleRound(bool)
{
    if (document.getElementById("round-2"))
    {
        if (!bool)
        {
            document.getElementById("round-2").style.opacity = 0.5;
            document.getElementById("copy-round2").setAttribute("disabled", true);
        }
        else
        {
            document.getElementById("round-2").style.opacity = 1.0;
            document.getElementById("copy-round2").removeAttribute("disabled");
        }
    }
}

var round1 = [];
var round2 = [];
var copyText = "";

function randomiseCards()
{
    var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    // Empty the exisitng arrays
    round1 = [];
    round2 = [];

    for (var i = 0; i < 9; i++)
    {
        // Pick a random number from 0-17
        var random = Math.floor(Math.random() * (cards.length - 1));
        // Use the randomly generated number to pull that card value out of the array
        round1.push(cards[random]);
        cards.splice(random, 1);

        // Now fill in the appropriate text box
        // TODO: actually this has to happen after the whole round is filled to be able to flip it...
        document.getElementById("card-1-" + i).textContent = random;
    }

    // If playing two rounds do it again with the remaining values
    /*if (twoRounds)
    {
        for (var i = 0; i < 9; i++)
        {
            // Pick a random number from 0-17
            var random = Math.floor(Math.random() * (cards.length - 1));
            // Use the randomly generated number to pull that card value out of the array
            round1.push(cards[random]);
            cards.splice(random, 1);
        }
    }*/
}

/* Formats the final text based on the inputs */
function formatText(data)
{
    var text = "";

    if (usePar)
    {
        // In par scoring the target score is already subtracted out during tallyScore()
        text += score;

        if (useFeedFees)
        {
            text += "\nFeed Fees";
        }
        if (hardMode)
        {
            text += "\nHard Mode";
        }
        if (easyMode)
        {
            text += "\nEasy Mode";
        }

        text += "\n\n";
    }
    else
    {
        text += score + "/" + targetScore;

        if (useFeedFees)
        {
            text += "\nFeed Fees";
        }
        if (hardMode)
        {
            text += "\nHard Mode";
        }
        if (easyMode)
        {
            text += "\nEasy Mode";
        }

        text += "\n\n";
    }
    text += data[goals[0]].name + ": " + sanitiseNumbers(document.getElementById("goal-1-score").value) + "\n";
    text += data[goals[1]].name + ": " + sanitiseNumbers(document.getElementById("goal-2-score").value) + "\n";
    text += data[goals[2]].name + ": " + sanitiseNumbers(document.getElementById("goal-3-score").value) + "\n";

    // Sprawlopolis expansion scores
    if (mode != "agropolis" && mode != "naturopolis")
    {
        if (useBeaches)
        {
            text += sprawlopolisBeaches[beachesGoal].name + ": " + sanitiseNumbers(document.getElementById("beaches-score").value) + "\n";
        }
        if (useZone)
        {
            text += sprawlopolisConstruction[zoneGoal].name + ": " + sanitiseNumbers(document.getElementById("zone-score").value) + "\n";
        }
    }

    if (mode == "combopolis")
    {
        var highBlocks = sortHighestBlocks();

        if (perBlock)
        {
            text += document.getElementById(highBlocks[0].id).getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById(highBlocks[0].id).value) + "\n";
            text += document.getElementById(highBlocks[1].id).getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById(highBlocks[1].id).value) + "\n";
            text += document.getElementById(highBlocks[2].id).getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById(highBlocks[2].id).value) + "\n";
            text += document.getElementById(highBlocks[3].id).getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById(highBlocks[3].id).value) + "\n";
        }
        else
        {
            text += "Blocks: " + (sanitiseNumbers(document.getElementById(highBlocks[0].id).value)
                + sanitiseNumbers(document.getElementById(highBlocks[1].id).value)
                + sanitiseNumbers(document.getElementById(highBlocks[2].id).value)
                + sanitiseNumbers(document.getElementById(highBlocks[3].id).value)) + "\n";
        }
    }
    else
    {
        if (hardMode)
        {
            var blocks = [document.getElementById('blocks-1'), document.getElementById('blocks-2'),
            document.getElementById('blocks-3'), document.getElementById('blocks-4')];

            var sorted = blocks.sort(function (a, b)
            {
                return (sanitiseNumbers(b.value) - sanitiseNumbers(a.value));
            });

            text += sorted[0].getAttribute("placeholder") + ": " + sanitiseNumbers(sorted[0].value) + "\n";
        }
        else if (perBlock)
        {
            text += document.getElementById("blocks-1").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-1').value) + "\n";
            text += document.getElementById("blocks-2").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-2').value) + "\n";
            text += document.getElementById("blocks-3").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-3').value) + "\n";
            text += document.getElementById("blocks-4").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-4').value) + "\n";
        }
        else
        {
            text += "Blocks: " + (sanitiseNumbers(document.getElementById('blocks-1').value)
                + sanitiseNumbers(document.getElementById('blocks-2').value)
                + sanitiseNumbers(document.getElementById('blocks-3').value)
                + sanitiseNumbers(document.getElementById('blocks-4').value)) + "\n";
        }
    }

    if (useExp1)
    {
        text += document.getElementById("exp-1").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById("exp-1").value) + "\n";
    }
    if (useExp2)
    {
        text += document.getElementById("exp-2").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById("exp-2").value) + "\n";
    }
    if (useExp3)
    {
        text += document.getElementById("exp-3").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById("exp-3").value) + "\n";
    }
    if (useExp4)
    {
        text += document.getElementById("exp-4").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById("exp-4").value) + "\n";
    }

    // Regardless of if the user inputted the score as a positive or negative number we sanitise it to a positive number for consistency
    var roads = Math.abs(sanitiseNumbers(document.getElementById('roads').value));

    // Naturopolis roads a worth -2 points, auto-deduct if the user selected the option
    if (doubleRoads)
    {
        roads += roads;
    }
    if (!easyMode)
    {
        text += "Roads: -" + roads;
    }
    else
    {
        text += "Roads: (-" + roads + ")";
    }

    return text;
}