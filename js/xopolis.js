// Livestock order: pig [0], cow [1], chicken [2]
var agropolis =
    [
        { name: "Agropolis", score: 18, fee: -1, livestock: [2, 1, 2] },
        { name: "All the Way Home", score: 5, fee: 0, livestock: [0, 2, 1] },
        { name: "Bacon and Eggs", score: 14, fee: -1, livestock: [2, 1, 2] },
        { name: "Big Country", score: 2, fee: -1, livestock: [1, 2, 2] },
        { name: "Coops and Loops", score: 8, fee: 2, livestock: [0, 2, 0] },
        { name: "Cornercopia", score: 15, fee: -1, livestock: [0, 2, 2] },
        { name: "Cornfed", score: 7, fee: 1, livestock: [2, 0, 0] },
        { name: "Corntry Roads", score: 12, fee: -1, livestock: [2, 0, 2] },
        { name: "Count your Chickens", score: 4, fee: 2, livestock: [1, 2, 0] },
        { name: "Fruitful Endeavor", score: 6, fee: -1, livestock: [2, 2, 0] },
        { name: "Happy Cows", score: 9, fee: 1, livestock: [2, 0, 1] },
        { name: "Noah's Farm", score: 17, fee: -1, livestock: [2, 1, 2] },
        { name: "Polyominorchards", score: 13, fee: -1, livestock: [2, 0, 2] },
        { name: "Swine Country", score: 10, fee: 0, livestock: [0, 0, 2] },
        { name: "Them Apples", score: 16, fee: -1, livestock: [2, 2, 0] },
        { name: "Tractor Tours", score: 11, fee: -1, livestock: [2, 2, 1] },
        { name: "Udderly Impossible", score: 3, fee: 1, livestock: [0, 0, 2] },
        { name: "Wine Seller", score: 1, fee: -1, livestock: [1, 2, 2] }
    ]

var combopolis =
    [
        { name: "Animal House", score: 14, fee: -1, livestock: [2, 2, 2] },
        { name: "Children of the Corn", score: 12, fee: -1, livestock: [2, 2, 2] },
        { name: "Petting Zoo", score: 8, fee: -1, livestock: [2, 2, 2] },
        { name: "Road Trip", score: 7, fee: -1, livestock: [2, 2, 2] },
        { name: "Sour Grapes", score: 13, fee: -1, livestock: [2, 2, 2] },
        { name: "Supply and Demand", score: 15, fee: -1, livestock: [2, 2, 2] }
    ]

var naturopolis =
    [
        { name: "Bigfoot Country", score: 13 },
        { name: "Dream Streams", score: 16 },
        { name: "Drivin' Daisies", score: 6 },
        { name: "Happy Campers", score: 12 },
        { name: "Impressive Range", score: 15 },
        { name: "Lake Mistake", score: 2 },
        { name: "Natural Selection", score: 4 },
        { name: "Naturopolis", score: 18 },
        { name: "Patchwork Park", score: 9 },
        { name: "River Runs Through It", score: 3 },
        { name: "Run Forest Run", score: 11 },
        { name: "Second Nature", score: 7 },
        { name: "Sniff or Swim", score: 14 },
        { name: "Straight and Narrow", score: 5 },
        { name: "Summit Up", score: 17 },
        { name: "Trees in Threes", score: 1 },
        { name: "Twin Peaks", score: 10 },
        { name: "Waterways and Means", score: 8 }
    ]

var sprawlopolis =
    [
        { name: "Block Party", score: 4 },
        { name: "Bloom Boom", score: 2 },
        { name: "Central Perks", score: 7 },
        { name: "Concrete Jungle", score: 9 },
        { name: "Go Green", score: 3 },
        { name: "Looping Lanes", score: 14 },
        { name: "Master Planned", score: 6 },
        { name: "Mini Marts", score: 11 },
        { name: "Morning Commute", score: 16 },
        { name: "Park Hopping", score: 13 },
        { name: "Skid Row", score: 15 },
        { name: "Sprawlopolis", score: 18 },
        { name: "Stacks and Scrapers", score: 5 },
        { name: "Superhighway", score: 12 },
        { name: "The 'Burbs", score: 8 },
        { name: "The Outskirts", score: 1 },
        { name: "The Strip", score: 10 },
        { name: "Tourist Traps", score: 17 }
    ]

var sprawlopolisBeaches =
    [
        { name: "Lookout Point", score: 0 },
        { name: "Peninsula", score: 0 },
        { name: "Scenic Route", score: 0 },
        { name: "Waterfront", score: 0 }
    ]

var sprawlopolisConstruction =
    [
        { name: "Bulldozed", score: 0 },
        { name: "Business is Closed", score: 0 },
        { name: "Noisy Neighbours", score: 0 },
        { name: "Sudden Demolition", score: 0 }
    ]

/* Variables for game settings */
var mode = "";
var goals = [, , ,]; //Stores the index of the goal from the original game list
// Agropolis Exp1 = Points of Interest, Exp2 = Invasion
// Sprawlopolis Exp1 = Points of Interest, Exp2 = Wrecktar
// Combopolis Exp1 = POI (Sprawlopolis), Wrecktar, POI (Agropolis), Invasion
var easyMode, usePar, perBlock, useExp1, useExp2, useExp3, useExp4 = false;

/* Agropolis specific game settings */
var useFeedFees = false;

/* Sprawlopolis specific game settings */
var hardMode = false;
var useBeaches, useZone = false;
var beachesGoal, zoneGoal = false;

/* Naturopolis specific game settings */
var doubleRoads = false;
var defaultSetting = true; // Bool to check if the doubleRoads were already turned on by default

function setMode(name)
{
    mode = name;
}

/* Get game settings, called on page load */
function getGameSettings()
{
    usePar = $('#use-par').prop('checked');
    perBlock = $('#per-block').prop('checked');

    if (mode != "naturopolis")
    {
        easyMode = $('#use-easy').prop('checked');
        useExp1 = $('#use-exp1').prop('checked');
        useExp2 = $('#use-exp2').prop('checked');
        toggleReadonly("exp-1", useExp1);
        toggleReadonly("exp-2", useExp2);
    }

    if (mode == "sprawlopolis")
    {
        hardMode = $('#use-hard').prop('checked');
    }

    // Sprawlopolis/Combopolis expansions settings
    if (mode != "agropolis" && mode != "naturopolis")
    {
        useBeaches = $('#use-beaches').prop('checked');
        useZone = $('#use-zone').prop('checked');
        toggleReadonly("beaches-score", useBeaches);
        toggleReadonly("zone-score", useZone);
        zoneGoal = document.getElementById("zone").value;
        beachesGoal = document.getElementById("beaches").value;
    }

    if (mode == "combopolis")
    {
        useExp3 = $('#use-exp3').prop('checked');
        useExp4 = $('#use-exp4').prop('checked');
        toggleReadonly("exp-3", useExp3);
        toggleReadonly("exp-4", useExp4);
    }

    // Agropolis specific settings
    if (mode == "agropolis")
    {
        useFeedFees = $('#feed-fees').prop('checked');
    }

    // Naturopolis specific settings
    if (mode == "naturopolis")
    {
        if (!defaultSetting)
        {
            doubleRoads = $("#double-roads").prop("checked");
        }
        else
        {
            // Set double roads on by default
            $("#double-roads").prop("checked", true);
            doubleRoads = true;
            defaultSetting = false;
        }
    }

    // When fetching goals replace the old ones
    goals.splice(0, 1, document.getElementById("goals-1").value);
    goals.splice(1, 1, document.getElementById("goals-2").value);
    goals.splice(2, 1, document.getElementById("goals-3").value);
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

/* Initialise the dropdowns, fills them from the necessary list*/
function setGoalDropdowns(data)
{
    if (mode != "combopolis")
    {
        var items = [];

        for (var i = 0; i < data.length; i++)
        {
            items += '<option value="' + i + '">' + data[i].name + '</option>';
        }

        document.getElementById("goals-1").innerHTML = items;
        document.getElementById("goals-2").innerHTML = items;
        document.getElementById("goals-3").innerHTML = items;
    }
    else
    {
        // Combine all Sprawlopolis and Agropolis items into one list
        combopolis = combopolis.concat(sprawlopolis, agropolis);

        var sprawloplisItems = [];
        var agropolisItems = [];
        var combopolisItems = [];

        for (var i = 0; i < combopolis.length; i++)
        {
            // Combopolis goals are stored only in the first 6 index (0-5)
            if (i < 6)
            {
                combopolisItems += '<option value="' + i + '">' + combopolis[i].name + '</option>';
            }
            // Sprawlopolis goals are stored in the next 18 indexes (6-23)
            else if (i < 24)
            {
                sprawloplisItems += '<option value="' + i + '">' + combopolis[i].name + '</option>';
            }
            // The last 18 indexes are all Agropolis cards
            else
            {
                agropolisItems += '<option value="' + i + '">' + combopolis[i].name + '</option>';
            }
        }

        document.getElementById("goals-1").innerHTML = sprawloplisItems;
        document.getElementById("goals-2").innerHTML = agropolisItems;
        document.getElementById("goals-3").innerHTML = combopolisItems;
    }

    if (mode != "agropolis" && mode != "naturopolis")
    {
        var beachItems = [];
        var zoneItems = [];

        for (var i = 0; i < sprawlopolisBeaches.length; i++)
        {
            beachItems += '<option value="' + i + '">' + sprawlopolisBeaches[i].name + '</option>';
        }
        for (var i = 0; i < sprawlopolisConstruction.length; i++)
        {
            zoneItems += '<option value="' + i + '">' + sprawlopolisConstruction[i].name + '</option>';
        }

        document.getElementById("beaches").innerHTML = beachItems;
        document.getElementById("zone").innerHTML = zoneItems;
    }
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

/* Adds up the inputted scores & updates the formatted text */
function tallyScore()
{
    score = sanitiseNumbers(document.getElementById("goal-1-score").value) + sanitiseNumbers(document.getElementById("goal-2-score").value)
        + sanitiseNumbers(document.getElementById("goal-3-score").value);

    if (mode == "combopolis")
    {
        var highBlocks = sortHighestBlocks();

        for (var i = 0; i < highBlocks.length; i++)
        {
            score += sanitiseNumbers(highBlocks[i].value);
        }
    }
    else if (hardMode)
    {
        var blocks = [document.getElementById('blocks-1'), document.getElementById('blocks-2'),
        document.getElementById('blocks-3'), document.getElementById('blocks-4')];

        var sorted = blocks.sort(function (a, b)
        {
            return (sanitiseNumbers(b.value) - sanitiseNumbers(a.value));
        });

        score += sanitiseNumbers(sorted[0].value);
    }
    else
    {
        score += sanitiseNumbers(document.getElementById('blocks-1').value) + sanitiseNumbers(document.getElementById('blocks-2').value)
            + sanitiseNumbers(document.getElementById('blocks-3').value) + sanitiseNumbers(document.getElementById('blocks-4').value);
    }

    if (useExp1)
    {
        score += sanitiseNumbers(document.getElementById("exp-1").value);
    }
    if (useExp2)
    {
        score += sanitiseNumbers(document.getElementById("exp-2").value);
    }
    if (useExp3)
    {
        score += sanitiseNumbers(document.getElementById("exp-3").value);
    }
    if (useExp4)
    {
        score += sanitiseNumbers(document.getElementById("exp-4").value);
    }

    if (mode != "agropolis" && mode != "naturopolis")
    {
        if (useBeaches)
        {
            score += sanitiseNumbers(document.getElementById("beaches-score").value);
        }
        if (useZone)
        {
            score += sanitiseNumbers(document.getElementById("zone-score").value);
        }
    }

    // Road scoring
    // Regardless of if the user inputted the score as a positive or negative number we sanitise it to a positive number for consistency
    if (!easyMode)
    {
        score -= Math.abs(sanitiseNumbers(document.getElementById('roads').value));

        // Roads in Naturopolis are worth -2, so we deduct again
        if (doubleRoads)
        {
            score -= Math.abs(sanitiseNumbers(document.getElementById('roads').value));
        };
    }

    if (usePar)
    {
        score -= targetScore;
    }
}

/* For Combopolis, sorts out the 4 highest value blocks only */
function sortHighestBlocks()
{
    var blocksS = [document.getElementById('blocks-1'), document.getElementById('blocks-2'),
    document.getElementById('blocks-3'), document.getElementById('blocks-4')];

    var blocksA = [document.getElementById('blocks-1a'), document.getElementById('blocks-2a'),
    document.getElementById('blocks-3a'), document.getElementById('blocks-4a')];

    // Sort blocks highest to lowest
    var sortedS = blocksS.sort(function (a, b)
    {
        return (sanitiseNumbers(b.value) - sanitiseNumbers(a.value));
    });

    sortedS = sortedS.slice(0, 2);

    var sortedA = blocksA.sort(function (a, b)
    {
        return (sanitiseNumbers(b.value) - sanitiseNumbers(a.value));
    });

    sortedA = sortedA.slice(0, 2);

    return sortedS.concat(sortedA);
}

/* Returns only the number values from an input or 0 if there's no input value */
function sanitiseNumbers(input)
{
    var output = 0;

    if (input)
    {
        output = input.replace(/(?!^-)[^0-9]/g, '');
    }

    return parseInt(output);
}