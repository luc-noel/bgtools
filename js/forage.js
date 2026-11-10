/* Variables for game settings */
var reverseOrder = true;
var twoRounds = false;

/* Get game settings, called on page load */
function getGameSettings()
{
    reverseOrder = $('#reverse-order').prop('checked');
    twoRounds = $('#two-rounds').prop('checked');
    toggleReadonly("round-2", twoRounds);
}

/* Activate/deactive an expansion for scoring */
/* Takes the expansion id name and its bool as the input, switches the bool value */
function toggleReadonly(name, bool)
{
    bool = !bool;

    if (document.getElementById(name))
    {
        if (bool)
        {
            document.getElementById(name).setAttribute("readonly", true);
            document.getElementById(name).value = "";
        }
        else
        {
            document.getElementById(name).removeAttribute("readonly");
        }
    }
}

var score = 0;
var targetScore = 0;
var copyText = "";

/* Calculate the inputted score and target score */
/* Then update the fields on the page and clipboard formatter */
function updateScores(data)
{
    // Check all game settings to update scoring settings
    getGameSettings();

    targetScore = 0;
    var totalFees = [0, 0, 0]; // Pigs, cows, chickens

    for (var i = 0; i < goals.length; i++)
    {
        targetScore += data[goals[i]].score;

        // Check used only for Agropolis Feed Fees scoring variant
        // Adds the livestock counts from the bottom of goal cards together
        if (useFeedFees)
        {
            for (var ii = 0; ii < totalFees.length; ii++)
            {
                totalFees[ii] += data[goals[i]].livestock[ii];
            }
        }
    }

    if (useFeedFees)
    {
        for (var i = 0; i < goals.length; i++)
        {
            if (data[goals[i]].fee > -1)
            {
                // Add the livestock fees value based on the fees index (0 = pig, 1 = cow, 2 = chicken)
                targetScore += totalFees[data[goals[i]].fee];
            }
        }
    }

    tallyScore();
    copyText = formatText(data);

    if (usePar)
    {
        if (score < 0)
        {
            document.getElementById("score").style.color = "red";
        }
        else if (score > 0)
        {
            document.getElementById("score").style.color = "lime";
        }
        else
        {
            document.getElementById("score").style.color = null;
        }
        // In par scoring the target score is already subtracted out during tallyScore()
        document.getElementById("score").innerHTML = score;
    }
    else
    {
        document.getElementById("score").style.color = null;
        document.getElementById("score").innerHTML = score + "/" + targetScore;
    }
    document.getElementById("clipboard-preview").innerText = "Clipboard Preview:\n" + copyText;
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