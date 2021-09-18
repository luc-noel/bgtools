var misses = 0;
var strike = false;

function rollStrikeDeck()
{
    // Player automatically gets a success if three misses have been rolled
    if (misses == 3)
    {
        //display strike
        document.getElementById("strike-result").innerHTML = "HIT!";      
        resetStrikeDeck();
    }
    else
    {
        // Returns a random integer from 0 to 3
        var roll = Math.floor(Math.random() * 4);

        // On a zero the player gets a successful strike
        if (roll == 0 & !strike)
        {
            strike = true;
            //display strike
            document.getElementById("strike-result").innerHTML = "HIT!";
        }
        else
        {
            // Increment miss counter
            misses += 1;

            //display miss
            document.getElementById("strike-result").innerHTML = "MISS";
        }
    }
}

function resetStrikeDeck()
{
    document.getElementById("strike-result").innerHTML = "...";
    misses = 0;
    strike = false;
}