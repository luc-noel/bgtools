// Variables for game generation settings
var useExpansion, usePnP, randomAI, randomGuides;

/* Retrieve the game generation settings */
/* Activate in button onclick */
function getGameSettings()
{
    useExpansion = $('#use-expansion').prop('checked');
    usePnP = $('#use-pnp').prop('checked');
    randomAI = $('#random-AI').prop('checked');
    randomGuides = $('#random-guides').prop('checked');
}

function generateExpedition()
{
    // Reset values to blank
    document.getElementById("map-1").innerHTML = "---";
    document.getElementById("map-2").innerHTML = "---";
    document.getElementById("map-3").innerHTML = "---";
    document.getElementById("AI").innerHTML = "---";
    document.getElementById("guide-1").innerHTML = "---";
    document.getElementById("guide-2").innerHTML = "---";

    getGameSettings();

    // Map options
    var map1 = ["Dunai", "Pokhara"]
    var map2 = ["Dhye", "Kagot"]
    var map3 = ["Dhaulagiri", "Machapuchare"]

    // Add expansions maps if toggled on
    if (useExpansion)
    {
        map1.push("Jampa");
        map2.push("Dechen");
        map3.push("Wangchuk");
    };

    // Add PnP maps if toggled on
    if (usePnP)
    {
        map1.push("Philitrek");
    };

    // Randomise maps and update page text
    document.getElementById("map-1").innerHTML = map1[Math.floor(Math.random() * map1.length)];
    document.getElementById("map-2").innerHTML = map2[Math.floor(Math.random() * map2.length)];
    document.getElementById("map-3").innerHTML = map3[Math.floor(Math.random() * map3.length)];

    // AI name for comparison with guide randomisation
    var AI;

    if (randomAI)
    {
        // AI options
        var AIs = ["Max", "Tensing", "El Choucas", "Yautman"];

        // Add expansion AIs if toggled on
        if (useExpansion)
        {
            AIs.push("Dechen", "Wangchuk", "Karma");
        };

        // Randomise AI and update page text
        AI = AIs[Math.floor(Math.random() * AIs.length)]
        document.getElementById("AI").innerHTML = AI;
    }

    if (randomGuides)
    {
        var guides = ["Tensing", "Katy", "Liv", "El Choucas", "Yautman", "Yeti"];

        // Add expansion guides if toggled on
        if (useExpansion)
        {
            guides.push("Dechen", "Wangchuk", "Karma");
        };

        // Search the guides for a name matching the chosen AI
        // Remove it if found to avoid duplication
        for (var i = 0; i < guides.length; i++)
        {
            if (guides[i] == AI)
            {
                guides.splice(i, 1);
                break;
            }
        }

        // Randomise guide for player
        var guide = Math.floor(Math.random() * guides.length);
        document.getElementById("guide-1").innerHTML = guides[guide];
        
        // Remove player's guide from the options to avoid duplication
        guides.splice(guide, 1);

        // Randomise guide for AI
        document.getElementById("guide-2").innerHTML = guides[Math.floor(Math.random() * guides.length)];
    }
}