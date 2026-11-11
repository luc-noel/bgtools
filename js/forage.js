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
        var random = Math.floor(Math.random() * cards.length);
        // Use the randomly generated number to pull that card value out of the array
        round1.push(cards[random]);
        cards.splice(random, 1);

        random = Math.floor(Math.random() * cards.length);
        round2.push(cards[random]);
        cards.splice(random, 1);

        // Now fill in the appropriate text box
        // TODO: actually this has to happen after the whole round is filled to be able to flip it...
        document.getElementById("card-1-" + i).textContent = round1[i];
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



    return text;
}
