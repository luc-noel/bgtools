var data = {
    "cities":
        [
            { "name": "New York", "damaged": false, "unlock": 0 },
            { "name": "Roswell", "damaged": false, "unlock": 0 },
            { "name": "Washington, D.C.", "damaged": false, "unlock": 0 },
            { "name": "Havana", "damaged": false, "unlock": 1 },
            { "name": "Mexico City", "damaged": false, "unlock": 1 },
            { "name": "Montreal", "damaged": false, "unlock": 1 },
            { "name": "Rio de Janeiro", "damaged": false, "unlock": 1 },
            { "name": "Beijing", "damaged": false, "unlock": 2 },
            { "name": "Cairo", "damaged": false, "unlock": 2 },
            { "name": "Johannesburg", "damaged": false, "unlock": 2 },
            { "name": "London", "damaged": false, "unlock": 2 },
            { "name": "Moscow", "damaged": false, "unlock": 2 },
            { "name": "Paris", "damaged": false, "unlock": 2 },
            { "name": "Seoul", "damaged": false, "unlock": 3 },
            { "name": "Singapore", "damaged": false, "unlock": 3 },
            { "name": "Sydney", "damaged": false, "unlock": 3 },
            { "name": "Tokyo", "damaged": false, "unlock": 3 }

        ],
    "characters":
        [
            { "name": "Clinton Harper", "upgraded": false, "unlock": 1 },
            { "name": "Lucia Ortega", "upgraded": false, "unlock": 1 },
            { "name": "Jackson Moss", "upgraded": false, "unlock": 1 },
            { "name": "Samantha Legrand", "upgraded": false, "unlock": 1 },
            { "name": "Jaroslac Růžička", "upgraded": false, "unlock": 2 },
            { "name": "Karima Almasi", "upgraded": false, "unlock": 2 },
            { "name": "Pieter Bernstein", "upgraded": false, "unlock": 2 },
            { "name": "Shanti Aumann", "upgraded": false, "unlock": 2 },
            { "name": "Archie Bell", "upgraded": false, "unlock": 3 },
            { "name": "Iz'ox", "upgraded": false, "unlock": 3 },
            { "name": "Jang Chanwook", "upgraded": false, "unlock": 3 },
            { "name": "Wang Lin", "upgraded": false, "unlock": 3 }
        ],
    "missions":
        [
            { "name": "Battle for the Sky", "unlock": 1 },
            { "name": "Evacuation", "unlock": 1 },
            { "name": "Reinforcements", "unlock": 1 },
            { "name": "Satellites", "unlock": 1 },
            { "name": "Dangerous Research", "unlock": 2 },
            { "name": "Command Ship", "unlock": 2 },
            { "name": "Reactor Leak", "unlock": 2 },
            { "name": "Repairing the Base", "unlock": 2 },
            { "name": "Contamination", "unlock": 3 },
            { "name": "Kamikaze Ships", "unlock": 3 },
            { "name": "Saboteur", "unlock": 3 },
            { "name": "Storm", "unlock": 3 },
            { "name": "The Final Battle", "unlock": 4 }
        ],
    "tiles":
        [
            { "height": 0, "stars": [0, 1], "flipped": false, "unlock": 0 },
            { "height": 1, "stars": [0, 1], "flipped": false, "unlock": 0 },
            { "height": 2, "stars": [0, 1], "flipped": false, "unlock": 0 },
            { "height": 3, "stars": [0, 1], "flipped": false, "unlock": 0 },
            { "height": 0, "stars": [1, 2], "flipped": false, "unlock": 2 },
            { "height": 2, "stars": [1, 2], "flipped": false, "unlock": 3 },
            { "height": 3, "stars": [1, 2], "flipped": false, "unlock": 3 },
            { "height": 1, "stars": [1, 2], "flipped": false, "unlock": 4 },
            { "height": 4, "stars": [0, 0], "flipped": false, "unlock": 4 }
        ]
}

// Variables for game generation settings
var difficultyValue, useCharacters, useMission, damageCity;

/* Retrieve the game generation settings */
/* Activate in button onclick */
function getGameSettings()
{
    difficultyValue = $('input[name="difficulty"]:checked').val();
    useCharacters = $('#use-characters').prop('checked');
    useMission = $('#use-mission').prop('checked');
    damageCity = $('#city-state').prop('checked');
}

/* Generate a single Under Falling Skies game */
/* Randomises city, mission, tiles, and characters based on desired difficulty */
function generateByDifficulty()
{
    document.getElementById("city").innerHTML = "---";
    document.getElementById("miss").innerHTML = "---";
    document.getElementById("char").innerHTML = "---";
    // Clear star ratings to fill them later
    document.getElementById("star-difficulty").innerHTML = "";

    getGameSettings();

    var difficultyCount = 0.0;
    var maxDifficulty = 0.0;
    var damagedText = "";
    var charText = "---";

    switch (difficultyValue)
    {
        // Low difficulty
        case "0":
            maxDifficulty = getRandomIntInclusive(0, 0.5);
            break;
        // Medium difficulty
        case "1":
            maxDifficulty = getRandomIntInclusive(1, 2);
            break;
        // High difficulty
        case "2":
            maxDifficulty = getRandomIntInclusive(2, 4);
            break;
        // Extreme difficulty
        case "3":
            maxDifficulty = getRandomIntInclusive(4, 7);
            break;
    }

    // Randomise everything that makes the difficulty easier first
    // We will then add back to the difficulty until reaching the target difficulty 
    var randCity = Math.floor(Math.random() * data["cities"].length);
    // Undamaged Cities reduce difficulty by 0.5
    difficultyCount -= 0.5;

    if (damageCity)
    {
        // Randomise if city is damaged
        if (Math.random() > 0.5)
        {
            // Damaged Cities reduce difficulty by an additional 0.5
            difficultyCount -= 0.5;
            damagedText = " (Damaged)";
        }
    }

    if (useMission)
    {
        var randMission = Math.floor(Math.random() * data["missions"].length);
        document.getElementById("miss").innerHTML = data["missions"][randMission]["name"];
        // Missions increase difficulty by 1
        difficultyCount += 1.0;
    }

    // Array to pick characters
    // When a character has already been picked remove their index from this array
    var charIndexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    if (useCharacters)
    {
        // Choose to randomise 1-3 characters
        var rand = getRandomIntInclusive(1, 3);
        var count = 0; // Number of characters added

        charText = "";

        while (count < rand)
        {
            // When adding a second or third character add a new line
            if (charText)
            {
                charText += "<br>";
            }

            var randCharacter = Math.floor(Math.random() * charIndexArray.length);
            charText += data["characters"][charIndexArray[randCharacter]]["name"];
            charIndexArray.splice(randCharacter, 1);

            // Non-upgraded characters reduce difficulty by 0.5
            difficultyCount -= -0.5;

            // Randomise if character is upgraded
            if (Math.random() > 0.5)
            {
                // Upgraded characters reduce difficulty by an additional 0.5
                difficultyCount -= 0.5;
                charText += " (Upgraded)";
            }

            count += 1;
        }
    }

    console.log(difficultyCount);
    difficultyCount += randomiseSkyTiles(maxDifficulty + Math.abs(difficultyCount));

    // Visualise difficulty with stars
    var starText = "";

    // Reduce difficultyCount by 0.5 otherwise it gets rounded up to the next whole value
    for (i = 0; i < difficultyCount - 0.5; i++)
    {
        starText += "&#9733;";
    }

    // Fill in missing stars with blanks until there are at least 5 stars
    for (i = 0; i + difficultyCount < 5; i++)
    {
        starText += "&#9734;";
    }

    // Check if the difficulty count isn't a whole number
    // If not then the difficulty is a value ending in 0.5
    if (difficultyCount % 1 != 0)
    {
        starText += "½";
    }

    // TEMP: TILE VISUAL
    var tileText = "";

    for (var i = 0; i < randomTiles.length; i++)
    {
        t = randomTiles[i];
        tileText += t.height + "." + t.unlock;
        tileText += " - "
        tileText += t.flipped == true ? t.stars[1] + " (flipped)" : t.stars[0];
        tileText += "<br>";
    }

    document.getElementById("tilecheck").innerHTML = tileText;

    console.log("Target: " + difficultyCount);

    document.getElementById("star-difficulty").innerHTML = starText;
    document.getElementById("city").innerHTML = data["cities"][randCity]["name"] + damagedText;
    document.getElementById("char").innerHTML = charText;
}

// One array item per height level of tiles
var randomTiles = [{}, {}, {}, {}];

function randomiseSkyTiles(targetDifficulty)
{
    var difficulty = 0;

    // Pick a tile for each height from the options in data
    for (var height = 0; height < 4; height++)
    {
        // Get the tiles from the data that match the randomised height
        var tiles = [];

        for (var i = 0; i < data.tiles.length; i++)
        {
            if (data.tiles[i].height == height)
            {
                tiles.push(data.tiles[i]);
            }
        }

        // Choose a single tile for the height
        var tile = tiles[Math.floor(Math.random() + 0.5)];
        difficulty += tile.stars[0];

        // Send all the tile info to randomTiles for passing to the HTML page later
        // Deletes the previous tile at that height if there was one
        randomTiles.splice(height, 1, tile);
    }

    console.log(randomTiles);

    // Which tile heights have yet to be randomised
    // Randomising the order the tiles are flipped in avoids patterns of the lower/higher floors being more likely to be flipped
    var tileLevels = [0, 1, 2, 3];

    // Flip tiles to add to difficulty
    while (difficulty < targetDifficulty)
    {
        // If we got here randomised tiles weren't high enough value
        // Punt us out of here and let the other generator retry
        if (tileLevels.length == 0)
        {
            break;
        }

        // TODO: This isn't being counted properly????
        // Flipped tiles are 1 difficulty higher than unflipped
        difficulty += 1;

        var height = Math.floor(Math.random() * tileLevels.length);
        var tile = randomTiles[tileLevels[height]];

        tile.flipped = true;

        tileLevels.splice(height, 1); // Remove height option from being randomised again
        randomTiles.splice(tileLevels[height], 1, tile); // Update the tile with the flipped value
    }

    return difficulty;
}

/* Generate Under Falling Skies campaign */
function generateCampaign()
{
    // Character team array
    var team = [];

    // Generate Part I
    document.getElementById("city1-1").innerHTML = "";
    document.getElementById("char1-1").innerHTML = "";
    document.getElementById("miss1-1").innerHTML = "";
    document.getElementById("city1-2").innerHTML = "";
    document.getElementById("char1-2").innerHTML = "";
    document.getElementById("miss1-2").innerHTML = "";
}

function getRandomIntInclusive(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
} 