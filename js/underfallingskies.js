var data = {
    "cities":
    [
        {"name":"New York", "destroyed":false, "unlock":0},
        {"name":"Roswell", "destroyed":false, "unlock":0},
        {"name":"Washington, D.C.", "destroyed":false, "unlock":0},
        {"name":"Havana", "destroyed":false, "unlock":1},
        {"name":"Mexico City", "destroyed":false, "unlock":1},
        {"name":"Montreal", "destroyed":false, "unlock":1},
        {"name":"Rio de Janeiro", "destroyed":false, "unlock":1},
        {"name":"Beijing", "destroyed":false, "unlock":2},
        {"name":"Cairo", "destroyed":false, "unlock":2},
        {"name":"Johannesburg", "destroyed":false, "unlock":2},
        {"name":"London", "destroyed":false, "unlock":2},
        {"name":"Moscow", "destroyed":false, "unlock":2},
        {"name":"Paris", "destroyed":false, "unlock":2},
        {"name":"Seoul", "destroyed":false, "unlock":3},
        {"name":"Singapore", "destroyed":false, "unlock":3},
        {"name":"Sydney", "destroyed":false, "unlock":3},
        {"name":"Tokyo", "destroyed":false, "unlock":3}

    ],
    "characters":
    [
        {"name":"Clinton Harper", "upgraded":false, "unlock":1},
        {"name":"Lucia Ortega", "upgraded":false, "unlock":1},
        {"name":"Jackson Moss", "upgraded":false, "unlock":1},
        {"name":"Samantha Legrand", "upgraded":false, "unlock":1},
        {"name":"Jaroslac Růžička", "upgraded":false, "unlock":2},
        {"name":"Karima Almasi", "upgraded":false, "unlock":2},
        {"name":"Pieter Bernstein", "upgraded":false, "unlock":2},
        {"name":"Shanti Aumann", "upgraded":false, "unlock":2},
        {"name":"Archie Bell", "upgraded":false, "unlock":3},
        {"name":"Iz'ox", "upgraded":false, "unlock":3},
        {"name":"Jang Chanwook", "upgraded":false, "unlock":3},
        {"name":"Wang Lin", "upgraded":false, "unlock":3}
    ],
    "missions":
    [
        {"name":"Battle for the Sky", "unlock":1},
        {"name":"Evacuation", "unlock":1},
        {"name":"Reinforcements", "unlock":1},
        {"name":"Satellites", "unlock":1},
        {"name":"Dangerous Research", "unlock":2},
        {"name":"Command Ship", "unlock":2},
        {"name":"Reactor Leak", "unlock":2},
        {"name":"Repairing the Base", "unlock":2},
        {"name":"Contamination", "unlock":3},
        {"name":"Kamikaze Ships", "unlock":3},
        {"name":"Saboteur", "unlock":3},
        {"name":"Storm", "unlock":3},
        {"name":"The Final Battle", "unlock":4}
    ],
    "tiles":
    [
        {"height":0, "stars":[0,1], "unlock":0},
        {"height":1, "stars":[0,1], "unlock":0},
        {"height":2, "stars":[0,1], "unlock":0},
        {"height":3, "stars":[0,1], "unlock":0},
        {"height":0, "stars":[1,2], "unlock":2},
        {"height":2, "stars":[1,2], "unlock":3},
        {"height":3, "stars":[1,2], "unlock":3},
        {"height":1, "stars":[1,2], "unlock":4},
        {"height":4, "stars":[0,0], "unlock":4}
    ]
}

/* Generate a single Under Falling Skies game */
/* Randomises city, mission, tiles, and characters based on desired difficulty */
function generateRandomDifficulty(difficulty)
{

}

/* Generate Under Falling Skies campaign */
function generateCampaign()
{
    // Generate random indexes based on number of keys
    const randCity = Math.floor(Math.random() * cities1.length);
    const randCharacter = Math.floor(Math.random() * characters.length);
    const rancMission = Math.floor(Math.random() * obj.length);

    // Character team array
    var team = [];

    // Generate Part I
    document.getElementById("city1-1").innerHTML =  obj["cities"][randCity]["name"];
    document.getElementById("char1-1").innerHTML = "";
    document.getElementById("miss1-1").innerHTML = "";
    document.getElementById("city1-2").innerHTML = "";
    document.getElementById("char1-2").innerHTML = "";
    document.getElementById("miss1-2").innerHTML = "";
}