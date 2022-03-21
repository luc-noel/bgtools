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
            { "height": 0, "stars": [0, 1], "flipped": false, "unlock": 0, "image": "ufs-tile0a" },
            { "height": 1, "stars": [0, 1], "flipped": false, "unlock": 0, "image": "ufs-tile1a" },
            { "height": 2, "stars": [0, 1], "flipped": false, "unlock": 0, "image": "ufs-tile2a" },
            { "height": 3, "stars": [0, 1], "flipped": false, "unlock": 0, "image": "ufs-tile3a" },
            { "height": 0, "stars": [1, 2], "flipped": false, "unlock": 2, "image": "ufs-tile0b" },
            { "height": 2, "stars": [1, 2], "flipped": false, "unlock": 3, "image": "ufs-tile2b" },
            { "height": 3, "stars": [1, 2], "flipped": false, "unlock": 3, "image": "ufs-tile3b" },
            { "height": 1, "stars": [1, 2], "flipped": false, "unlock": 4, "image": "ufs-tile1b" },
            { "height": 4, "stars": [0, 0], "flipped": false, "unlock": 4, "image": "ufs-tile4" }
        ]
}

// Variables for game generation settings
var difficultyValue, useCharacters, useMission;

/* Retrieve the game generation settings */
/* Activate in button onclick */
function getGameSettings()
{
    difficultyValue = $('input[name="difficulty"]:checked').val();
    useCharacters = $('#use-characters').prop('checked');
    useMission = $('#use-mission').prop('checked');
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
    var difficultyRange = [,];
    var damagedText = "";
    var charText = "---";

    switch (difficultyValue)
    {
        // Low difficulty
        case "0":
            difficultyRange = [0, 0.5];
            break;
        // Medium difficulty
        case "1":
            difficultyRange = [1, 2];
            break;
        // High difficulty
        case "2":
            difficultyRange = [2.5, 3.5];
            break;
        // Extreme difficulty
        case "3":
            difficultyRange = [4, 7];
            break;
    }

    // Pick a random city to play
    var randCity = Math.floor(Math.random() * data.cities.length);
    // Undamaged Cities reduce difficulty by 0.5
    difficultyCount -= 0.5;

    // Randomise damaging the city
    if (Math.random() >= 0.5)
    {
        // Damaged Cities reduce difficulty by an additional 0.5
        difficultyCount -= 0.5;
        damagedText = " (Damaged)";
    }

    if (useMission)
    {
        // Reduce the randomiser range by 1 to omit Final Battle mission from selection
        var randMission = Math.floor(Math.random() * (data.missions.length - 1));
        document.getElementById("miss").innerHTML = data.missions[randMission].name;
        // Missions increase difficulty by 1
        difficultyCount += 1.0;
    }

    // Array to pick characters
    // When a character has already been picked remove their index from this array
    var charIndexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    if (useCharacters)
    {
        // Choose to randomise 1-3 characters
        var rand = Math.floor(Math.random() * 3) + 1;
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
            charText += data.characters[charIndexArray[randCharacter]].name;
            charIndexArray.splice(randCharacter, 1);

            // Non-upgraded characters reduce difficulty by 0.5
            difficultyCount -= 0.5;

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

    var randomisedDifficulty = 0; // Hold last value of randomised tile difficulty
    var attempts = 0; // Count how many times we tried to generate a valid tile set

    do
    {
        // Failsafe, if we try to generate too many times dump out and regenerate the whole game set-up
        if (attempts > 5)
        {
            attempts = 0;
            generateByDifficulty();
        }
        else
        {
            attempts += 1;
            randomisedDifficulty = randomiseSkyTiles(difficultyRange[0] - difficultyCount);
        }
    } while (randomisedDifficulty + difficultyCount < difficultyRange[0] | randomisedDifficulty + difficultyCount > difficultyRange[1]);

    difficultyCount += randomisedDifficulty;

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

    // Assign tile images
    document.getElementById("tile-vis3").src = "img/" + (randomTiles[3].flipped ? randomTiles[3].image + "-flipped" : randomTiles[3].image) + ".png";
    document.getElementById("tile-vis2").src = "img/" + (randomTiles[2].flipped ? randomTiles[2].image + "-flipped" : randomTiles[2].image) + ".png";
    document.getElementById("tile-vis1").src = "img/" + (randomTiles[1].flipped ? randomTiles[1].image + "-flipped" : randomTiles[1].image) + ".png";
    document.getElementById("tile-vis0").src = "img/" + (randomTiles[0].flipped ? randomTiles[0].image + "-flipped" : randomTiles[0].image) + ".png";

    document.getElementById("star-difficulty").innerHTML = starText;
    document.getElementById("city").innerHTML = data.cities[randCity].name + damagedText;
    document.getElementById("char").innerHTML = charText;
}

// One array item per height level of tiles
var randomTiles = [{}, {}, {}, {}];

function randomiseSkyTiles(targetDifficulty)
{
    randomTiles = [{}, {}, {}, {}];
    var difficulty = 0;

    // For the very specific scenario of a Low difficulty game with only Use Mission on
    // We only play with the base game tiles and never flip any
    if (difficultyValue == 0 & !useCharacters & useMission)
    {
        randomTiles = [data.tiles[0], data.tiles[1], data.tiles[2], data.tiles[3]];
        return difficulty;
    }

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
        tile.flipped = false; // Make sure the tile isn't flipped yet
        difficulty += tile.stars[0];

        // Send all the tile info to randomTiles for passing to the HTML page later
        // Deletes the previous tile at that height if there was one
        randomTiles.splice(height, 1, tile);
    }

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

        difficulty += 1;

        var h = Math.floor(Math.random() * tileLevels.length);
        var tile = randomTiles[tileLevels[h]];

        tile.flipped = true;

        randomTiles.splice(tileLevels[h], 1, tile); // Update the tile with the flipped value
        tileLevels.splice(h, 1); // Remove height option from being randomised again
    }

    return difficulty;
}

/* Generate Under Falling Skies campaign */
function generateCampaign()
{
    // Character team array
    var team = [, , , , ,];

    // Array to pick characters
    // When a character has already been picked remove their index from this array
    var charIndexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    // Randomise character team of characters
    for (var i = 0; i < 2; i++)
    {
        // Reduce ranges by i so that the second time through they've shifted to the new range of 3 choices instead of 4
        var char1 = getRandomInt(0, 3 - i);
        var char2 = getRandomInt(4 - i, 7 - i * 2);
        var char3 = getRandomInt(8 - i * 2, 11 - i * 3);

        // Add character choices into correct array positions
        team.splice(0 + i, 1, data.characters[charIndexArray[char1]]);
        team.splice(2 + i, 1, data.characters[charIndexArray[char2]]);
        team.splice(4 + i, 1, data.characters[charIndexArray[char3]]);

        // Remove characters from the options pool
        charIndexArray.splice(char1, 1);
        charIndexArray.splice(char2 - 1, 1);
        charIndexArray.splice(char3 - 2, 1);
    }

    // Fill Part I values
    document.getElementById("city1-1").innerHTML = "";
    document.getElementById("char1-1").innerHTML = team[0].name;
    document.getElementById("miss1-1").innerHTML = "";
    document.getElementById("city1-2").innerHTML = "";
    document.getElementById("char1-2").innerHTML = team[1].name;
    document.getElementById("miss1-2").innerHTML = "";

    // Part II Characters
    team[0].upgraded = true;
    team[1].upgraded = true;

    // Basically a variable used for a coin flip
    // Decides which of two previous characters to assign to the two new battles
    var rand = getRandomInt(0, 1);
    var char1Text = team[2].name + "<br>" + team[rand].name + " (Upgraded)";
    var char2Text = team[3].name + "<br>" + team[Math.abs(rand - 1)].name + " (Upgraded)";

    // Fill Part II values
    document.getElementById("city2-1").innerHTML = "";
    document.getElementById("char2-1").innerHTML = char1Text;
    document.getElementById("miss2-1").innerHTML = "";
    document.getElementById("city2-2").innerHTML = "";
    document.getElementById("char2-2").innerHTML = char2Text;
    document.getElementById("miss2-2").innerHTML = "";

    // Part III Characters
    team[2].upgraded = true;
    team[3].upgraded = true;

    rand = getRandomInt(0, 1);
    char1Text = team[4].name + "<br>" + team[rand].name + " (Upgraded)";
    char2Text = team[5].name + "<br>" + team[Math.abs(rand - 1)].name + " (Upgraded)";

    rand = getRandomInt(0, 1);
    char1Text += "<br>" + team[rand + 2].name + " (Upgraded)";
    char2Text += "<br>" + team[Math.abs(rand - 1) + 2].name + " (Upgraded)";

    // Fill Part III values
    document.getElementById("city3-1").innerHTML = "";
    document.getElementById("char3-1").innerHTML = char1Text;
    document.getElementById("miss3-1").innerHTML = "";
    document.getElementById("city3-2").innerHTML = "";
    document.getElementById("char3-2").innerHTML = char2Text;
    document.getElementById("miss3-2").innerHTML = "";

    // Fill Part IV values
    document.getElementById("city4").innerHTML = "";
    document.getElementById("char4").innerHTML = team[0].name;
    document.getElementById("miss4").innerHTML = "";
}

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
