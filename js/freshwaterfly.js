var cards = [
    true,
    false,
    false,
    false
];
var drawnCards = [];
var drawCount = 0;

function rollStrikeDeck()
{
    drawCount += 1;

    // Reshuffle cards if all have been drawn
    if (drawCount > 4)
    {  
        resetStrikeDeck();
    }
    else
    {
        var roll = Math.floor(Math.random() * cards.length);

        // Keep a record of drawn card
        drawnCards.push(cards[roll]);

        // Display the card result
        document.getElementById("strike-result").innerHTML = cards[roll];

        // Remove the card so it can't be picked again
        cards.splice(roll, 1);
    }

    if (drawCount > 1)
    {
        displayDrawnStrike(drawCount);
    }
}

// Displays the previously drawn strikes
function displayDrawnStrike(index)
{
    var idString = "strike-" + (index - 1);

    if (drawnCards[index - 2])
    {
        document.getElementById(idString).innerHTML = "O";
    }
    else if (!drawnCards[index - 2])
    {
        document.getElementById(idString).innerHTML = "X";
    }
}

function resetStrikeDeck()
{
    document.getElementById("strike-result").innerHTML = "Shuffling...";

    // Reset decks and card count
    drawCount = 0;
    cards = [
        true,
        false,
        false,
        false
    ]
    drawnCards = []

    // Reset drawn strikes visualisation
    document.getElementById("strike-1").innerHTML = "--";
    document.getElementById("strike-2").innerHTML = "--";
    document.getElementById("strike-3").innerHTML = "--";
}