// Livestock order: pig [0], cow [1], chicken [2]
var agropolis =
[
    {name:"Tractor Tours", score:11, fee:-1, livestock:[2,2,1]},
    {name:"Them Apples", score:16, fee:-1, livestock:[2,2,0]},
    {name:"Fruitful Endeavor", score:6, fee:-1, livestock:[2,2,0]},
    {name:"Happy Cows", score:9, fee:1, livestock:[2,0,1]},
    {name:"Wine Seller", score:1, fee:-1, livestock:[1,2,2]},
    {name:"Coops and Loops", score:8, fee:2, livestock:[0,2,0]},
    {name:"Big Country", score:2, fee:-1, livestock:[1,2,2]},
    {name:"Bacon and Eggs", score:14, fee:-1, livestock:[2,1,2]},
    {name:"All the Way Home", score:5, fee:0, livestock:[0,2,1]},
    {name:"Polyominorchards", score:13, fee:-1, livestock:[2,0,2]},
    {name:"Agropolis", score:18, fee:-1, livestock:[2,1,2]},
    {name:"Count your Chickens", score:4, fee:2, livestock:[1,2,0]},
    {name:"Udderly Impossible", score:3, fee:1, livestock:[0,0,2]},
    {name:"Cornfed", score:7, fee:1, livestock:[2,0,0]},
    {name:"Cornercopia", score:15, fee:-1, livestock:[0,2,2]},
    {name:"Corntry Roads", score:12, fee:-1, livestock:[2,0,2]},
    {name:"Noah's Farm", score:17, fee:-1, livestock:[2,1,2]},
    {name:"Swine Country", score:10, fee:0, livestock:[0,0,2]}
]

var combopolis =
[
    {name:"Road Trip", score:7, fee:-1, livestock:[2,2,2]},
    {name:"Petting Zoo", score:8, fee:-1, livestock:[2,2,2]},
    {name:"Children of the Corn", score:12, fee:-1, livestock:[2,2,2]},
    {name:"Sour Grapes", score:13, fee:-1, livestock:[2,2,2]},
    {name:"Animal House", score:14, fee:-1, livestock:[2,2,2]},
    {name:"Supply and Demand", score:15, fee:-1, livestock:[2,2,2]}
]

var sprawlopolis =
[
    {name:"Superhighway", score:12},
    {name:"Mini Marts", score:11},
    {name:"Skid Row", score:15},
    {name:"Morning Commute", score:16},
    {name:"The Strip", score:10},
    {name:"The Outskirts", score:1},
    {name:"Master Planned", score:6},
    {name:"The 'Burbs", score:8},
    {name:"Go Green", score:3},
    {name:"Central Perks", score:7},
    {name:"Park Hopping", score:13},
    {name:"Stacks and Scrapers", score:5},
    {name:"Sprawlopolis", score:18},
    {name:"Bloom Boom", score:2},
    {name:"Tourist Traps", score:17},
    {name:"Looping Lanes", score:14},
    {name:"Concrete Jungle", score:9},
    {name:"Block Party", score:4},
]

var sprawlopolisBeaches =
[
    {name:"Peninsula", score:0},
    {name:"Lookout Point", score:0},
    {name:"Scenic Route", score:0},
    {name:"Waterfront", score:0},
]

var sprawlopolisConstruction =
[
    {name:"Sudden Demolition", score:0},
    {name:"Noisy Neighbours", score:0},
    {name:"Bulldozed", score:0},
    {name:"Business is Closed", score:0},
]

/* Variables for game settings */
var goals = [,,,]; //Stores the index of the goal from the original game list
// Agropolise Exp1 = Points of Interest, Exp2 = Invasion
var usePar, perBlock, useExp1, useExp2  = false;

/* Agropolis specific game settings */
var useFeedFees = false;

/* Get game settings, called on page load */
function getGameSettings()
{
    usePar = $('#use-par').prop('checked');
    perBlock = $('#per-block').prop('checked');
    useExp1 = $('#use-exp1').prop('checked');
    useExp2 = $('#use-exp2').prop('checked');
    toggleExpansion("exp-1", useExp1);
    toggleExpansion("exp-2", useExp2);

    // Agropolis specific settings
    useFeedFees = $('#feed-fees').prop('checked');

    // When fetching goals replace the old ones
    goals.splice(0, 1, document.getElementById("goals-1").value);
    goals.splice(1, 1, document.getElementById("goals-2").value);
    goals.splice(2, 1, document.getElementById("goals-3").value);
}

/* Activate/deactive and expansion for scoring */
/* Takes the expansion id name and its bool as the input, switches the bool value */
function toggleExpansion(name, bool)
{
    bool = !bool;
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
    var totalFees = [0,0,0]; // Pigs, cows, chickens

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

function copyToClipboard()
{
    navigator.clipboard.writeText(copyText);
    alert("Copied scoring to clipboard.");
}

/* Initialise the dropdowns, fills them from the necessary list*/
function setGoalDropdowns(data)
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

/* Formats the final text based on the inputs */
function formatText(data)
{
    var text = "";

    if (usePar)
    {
        // In par scoring the target score is already subtracted out during tallyScore()
        text += score + "\n\n";
    }
    else
    {
        text += score + "/" + targetScore + "\n\n";
    }
    text += data[goals[0]].name + ": " + sanitiseNumbers(document.getElementById("goal-1-score").value) + "\n";
    text += data[goals[1]].name + ": " + sanitiseNumbers(document.getElementById("goal-2-score").value) + "\n";
    text += data[goals[2]].name + ": " + sanitiseNumbers(document.getElementById("goal-3-score").value) + "\n";

    if (perBlock)
    {
        text += document.getElementById("blocks-1").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-1').value) + "\n";
        text += document.getElementById("blocks-2").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-1').value) + "\n";
        text += document.getElementById("blocks-3").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-1').value) + "\n";
        text += document.getElementById("blocks-4").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById('blocks-1').value) + "\n";
    }
    else
    {
        text += "Blocks: "  + (sanitiseNumbers(document.getElementById('blocks-1').value)
                            + sanitiseNumbers(document.getElementById('blocks-2').value) 
                            + sanitiseNumbers(document.getElementById('blocks-3').value)
                            + sanitiseNumbers(document.getElementById('blocks-4').value)) + "\n";
    }

    if (useExp1)
    {
        text += document.getElementById("exp-1").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById("exp-1").value) + "\n";
    }
    if (useExp2)
    {
        text += document.getElementById("exp-2").getAttribute("placeholder") + ": " + sanitiseNumbers(document.getElementById("exp-2").value) + "\n";
    }
    text += "Roads: -" + sanitiseNumbers(document.getElementById('roads').value);

    return text;
}

/* Adds up the inputted scores & updates the formatted text */
function tallyScore()
{
    score = sanitiseNumbers(document.getElementById("goal-1-score").value) + sanitiseNumbers(document.getElementById("goal-2-score").value)
    + sanitiseNumbers(document.getElementById("goal-3-score").value) + sanitiseNumbers(document.getElementById('blocks-1').value)
    + sanitiseNumbers(document.getElementById('blocks-2').value) + sanitiseNumbers(document.getElementById('blocks-3').value)
    + sanitiseNumbers(document.getElementById('blocks-4').value) - sanitiseNumbers(document.getElementById('roads').value);

    if (useExp1)
    {
        score += sanitiseNumbers(document.getElementById("exp-1").value);
    }
    if (useExp2)
    {
        score += sanitiseNumbers(document.getElementById("exp-2").value);
    }

    if (usePar)
    {
        score -= targetScore;
    }
}

/* Returns only the (positive) number values from an input or 0 if there's no input value */
function sanitiseNumbers(input)
{
    var output = 0;

    if (input)
    {
        output = input.replace(/[^0-9]/g, '');
    }
    
    return parseInt(output);
}