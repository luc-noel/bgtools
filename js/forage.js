/* Variables for game settings */
var reverseOrder = true;
var twoRounds = false;

/* Get game settings, called on page load and value changes */
function getGameSettings()
{
    reverseOrder = $('#reverse-order').prop('checked');
    twoRounds = $('#two-rounds').prop('checked');
}

/* Variables for round data */
var round1 = [];
var round2 = [];
var round1Reverse = [];
var round2Reverse = [];
var copyRound1 = "";
var copyRound2 = "";

/* Generates both rounds of gameplay using the same 18 card deck without duplicates */
/* Then displays the rounds to the page and readies them for copying to the clipboard */
function generateRounds()
{
    getGameSettings();

    // Reset the starting variables
    var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    round1 = [];
    round2 = [];
    copyRound1 = "";
    copyRound2 = "";

    /* Randomises the order of the 18 card deck */
    for (var i = 0; i < 9; i++)
    {
        // Pick a random number from 0-17
        var index = Math.floor(Math.random() * cards.length);
        // Use the randomly generated number to pull that card value out of the array
        round1.push(cards[index]);
        cards.splice(index, 1);

        // Always randomise both rounds but we'll only display one based on user preferences
        index = Math.floor(Math.random() * cards.length);
        round2.push(cards[index]);
        cards.splice(index, 1);
    }

    // Store an already reversed versions of the rounds, faster than recalculating them on the fly
    round1Reverse = round1.slice().reverse();
    round2Reverse = round2.slice().reverse();

    updateRoundDisplay();
}

/* Fill the page's round data tables and apply the bold styling to first card */
function updateRoundDisplay()
{
    getGameSettings();

    if (!twoRounds)
    {
        // Lower section opacity & de-ctivate button
        document.getElementById("round-2").style.opacity = 0.5;
        document.getElementById("copy-round2").setAttribute("disabled", true);

        // Reset the first card styling that may have been applied
        document.getElementById("card-2-8").style.fontWeight = "normal";
        document.getElementById("card-2-1").style.fontWeight = "normal";

        // 
        for (var i = 0; i < 9; i++)
        {
            document.getElementById("card-2-" + i).innerHTML = "---";
        }
    }
    else
    {
        // Reset opacity section & re-activated button
        document.getElementById("round-2").style.opacity = 1.0;
        document.getElementById("copy-round2").removeAttribute("disabled");
    }

    // Do nothing if the rounds haven't been generated yet
    if (round1.length == 0)
        return;

    if (reverseOrder)
    {
        formatCardTable(round1Reverse, round2Reverse);

        // Bold the start play card, when reversed this is the last card in the table
        document.getElementById("card-1-0").style.fontWeight = "normal";
        document.getElementById("card-1-8").style.fontWeight = "bold";

        copyRound1 = formatText(round1Reverse);

        if (twoRounds)
        {
            document.getElementById("card-2-0").style.fontWeight = "normal";
            document.getElementById("card-2-8").style.fontWeight = "bold";

            copyRound2 = formatText(round2Reverse);
        }
    }
    else
    {
        formatCardTable(round1, round2);

        // Bold the start play card
        document.getElementById("card-1-8").style.fontWeight = "normal";
        document.getElementById("card-1-0").style.fontWeight = "bold";

        copyRound1 = formatText(round1);

        if (twoRounds)
        {
            document.getElementById("card-2-8").style.fontWeight = "normal";
            document.getElementById("card-2-0").style.fontWeight = "bold";

            copyRound2 = formatText(round2);
        }
    }

    document.getElementById("clipboard1-preview").innerText = "Clipboard Preview:\n" + copyRound1;
    document.getElementById("clipboard2-preview").innerText = "Clipboard Preview:\n" + copyRound2;
}

function formatCardTable(round1Data, round2Data)
{
    for (var i = 0; i < 9; i++)
    {
        // Fill with the appropriate data set
        document.getElementById("card-1-" + i).innerHTML = round1Data[i];

        if (twoRounds)
            document.getElementById("card-2-" + i).innerHTML = round2Data[i];
        else
            document.getElementById("card-2-" + i).innerHTML = "---";
    }
}

/* Formats the round numbers to be copied to the clipboard */
function formatText(roundData)
{
    var text = "";

    for (var i = 0; i < 9; i++)
    {
        if (!reverseOrder & i == 0)
            text += "*";
        else if (reverseOrder & i == 8)
            text += "*";

        text += roundData[i];

        // Add spacing between cards until the last one
        if (i < 8)
            text += ", ";
    }

    return text;
}