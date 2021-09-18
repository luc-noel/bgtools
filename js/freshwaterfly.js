var cards = [
    "HIT!",
    "MISS",
    "MISS",
    "MISS"
]
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

        // Display the card result
        document.getElementById("strike-result").innerHTML = cards[roll];

        // Remove the card so it can't be picked again
        cards.splice(roll, 1);
    }
}

function resetStrikeDeck()
{
    document.getElementById("strike-result").innerHTML = "Shuffling...";
    drawCount = 0;
    roll = -1;
    cards = [
        "HIT!",
        "MISS",
        "MISS",
        "MISS"
    ];
}