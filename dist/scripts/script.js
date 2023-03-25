
// On Startup

const monster_list = monsterList();
monster_list.map(populateMonsterList);
monster_list.map(setEventListener);
const clearFilter = document.querySelector("#resetFilter");
const filter = document.querySelector("#filter");
const addAllFilter = document.querySelector("#selectAllFilter");
clearFilter.addEventListener("click", clearMyFilter);
filter.addEventListener("click", startFilter);
addAllFilter.addEventListener("click", addAllMyFilter);

// Functions
function populateMonsterList(monster) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdCR = document.createElement("td");
    const tdXP = document.createElement("td");
    // const tdSelect = document.createElement("td");
    // const buttonSelect = document.createElement("input");

    switch (monster.CR) {
        case 0.125:
            tdCR.innerHTML = "1/8";
            break;
        case 0.25:
            tdCR.innerHTML = "1/4";
            break;
        case 0.5:
            tdCR.innerHTML = "1/2";
            break;
        default:
            tdCR.innerHTML = monster.CR;
    }
    tdName.innerHTML = monster.Name;
    tdXP.innerHTML = monster.XP;
    // buttonSelect.setAttribute("type", "button");
    // buttonSelect.setAttribute("id", `${monster.Name}Add`);
    // buttonSelect.setAttribute("value", "Select");

    tr.appendChild(tdName);
    tr.appendChild(tdCR);
    tr.appendChild(tdXP);
    // tdSelect.appendChild(buttonSelect);
    // tr.appendChild(tdSelect);

    tr.setAttribute("id", monster.ID);
    tr.setAttribute("value", monster.XP);

    document.querySelector("#listTable").appendChild(tr);
}

function setEventListener(monster) {
    const tr = document.querySelector(`#${monster.ID}`);
    tr.addEventListener("click", addMonster);

}

function addMonster(monster) {
    const originalTr = monster.target.parentElement;
    const parentNode = document.querySelector("#selectedTable");
    if (notInSelected(originalTr, parentNode)) {
        const tr = originalTr.cloneNode(true);
        const tdAmount = document.createElement("td");
        const amount = document.createElement("input");
        amount.setAttribute("type", "number");
        amount.setAttribute("min", "1");
        amount.setAttribute("step", "1");
        amount.setAttribute("value", "1");
        amount.setAttribute("id", `${tr.getAttribute("id")}_input`);
        amount.addEventListener("change", calcXP);
        const remove = document.createElement("td");
        remove.innerHTML = "Remove";
        remove.setAttribute("class", "center");
        remove.addEventListener("click", removeMonster);
        tdAmount.appendChild(amount);
        tr.appendChild(tdAmount);
        tr.appendChild(remove);
        parentNode.appendChild(tr);
        calcXP();
    }
}

function removeMonster(monster) {
    const tr = monster.target.parentElement;
    const parentNode = document.querySelector("#selectedTable");
    parentNode.removeChild(tr);
    calcXP();
}

function resetList() {
    const monsterTable = document.querySelector("#listTable");
    console.log(monsterTable.lastElementChild.matches("tr"));
    while (monsterTable.lastElementChild.matches("tr")) {
        monsterTable.removeChild(monsterTable.lastElementChild);
    }
}

function sortByAlph(listMonster) {
    resetList();
    // const monsterList = monsterList();
    listMonster.sort(sortAscending);
    listMonster.map(populateMonsterList);
    listMonster.map(setEventListener);
}

function sortByCR(listMonster) {
    resetList();
    listMonster.map(populateMonsterList);
    listMonster.map(setEventListener);
}

function notInSelected(monster, selectedList) {
    for (let x of selectedList.children) {
        if (monster.getAttribute("id") == x.getAttribute("id")) {
            return false;
        } 
    }
    return true;
}

function calcXP() {
    const totalXP = document.querySelector("#totalXP");
    const adjustedXP = document.querySelector("#adjustedXP");
    const selectedMonsters = document.querySelector("#selectedTable")
    let xpTotal = 0;
    let xpAdjusted = 0;
    let totalMonsters = 0;
    for (let monster of selectedMonsters.children) {
        if (monster.localName == "tbody") {continue;}
        const amountInput = document.querySelector(`#${monster.getAttribute("id")}_input`);
        totalMonsters += Number(amountInput.value);
        xpTotal += Number(amountInput.value) * Number(monster.getAttribute("value"));

    }
    if (totalMonsters<=1) {
        xpAdjusted = xpTotal;
    } else if (totalMonsters<=2) {
        xpAdjusted = xpTotal * 1.5;
    } else if (totalMonsters<=6) {
        xpAdjusted = xpTotal * 2;
    } else if (totalMonsters<=10) {
        xpAdjusted = xpTotal * 2.5;
    } else if (totalMonsters<=14) {
        xpAdjusted = xpTotal * 3;
    } else {
        xpAdjusted = xpTotal * 4;
    }
    totalXP.innerHTML = xpTotal;
    adjustedXP.innerHTML = xpAdjusted;
}


function sortAscending(a, b) {
    const fa = a.Name.toLowerCase();
    const fb = b.Name.toLowerCase();
    
    if (fa < fb) {
        return -1;
    } else if (fa > fb) {
        return 1;
    } else {
        return 0;
    }
}

function clearMyFilter() {
    const filterButtons = document.querySelectorAll('input[name="cr"]');
    for (const filterButton of filterButtons) {
        filterButton.checked = false;
    }
}

function addAllMyFilter() {
    const filterButtons = document.querySelectorAll('input[name="cr"]');
    for (const filterButton of filterButtons) {
        filterButton.checked = true;
    }

}

function startFilter() {
    const sortButtons = document.querySelectorAll('input[name="sort"]');
    const newMonsterList = monsterList().filter(filterFunction);
    for (const sortButton of sortButtons) {
        if (sortButton.checked) {
            if (sortButton.value == "sort_cr") {
                sortByCR(newMonsterList);
            } else {
                sortByAlph(newMonsterList);
            }
        }
    }
}

function filterFunction(value) {
    const filterButtons = document.querySelectorAll('input[name="cr"]');

    let filterList = [];
    for (const filterButton of filterButtons) {
        if (filterButton.checked) {
            // console.log(filterButton)
            // const x = filterButton.getAttribute(value);
            filterList.push(Number(filterButton.getAttribute("value")));
        }
    }
    const crValue = value.CR;
    if (filterList.includes(crValue)) {
        return true;
    } else {
        return false;
    }
}

function monsterList() {
    return [
      {
        "Name": "Awakened Shrub",
        "CR": 0,
        "XP": 10,
        "ID": "Awakened_Shrub"
      },
      {
        "Name": "Baboon",
        "CR": 0,
        "XP": 10,
        "ID": "Baboon"
      },
      {
        "Name": "Badger",
        "CR": 0,
        "XP": 10,
        "ID": "Badger"
      },
      {
        "Name": "Bat",
        "CR": 0,
        "XP": 10,
        "ID": "Bat"
      },
      {
        "Name": "Cat",
        "CR": 0,
        "XP": 10,
        "ID": "Cat"
      },
      {
        "Name": "Chwinga Astronaut",
        "CR": 0,
        "XP": 10,
        "ID": "Chwinga_Astronaut"
      },
      {
        "Name": "Commoner",
        "CR": 0,
        "XP": 10,
        "ID": "Commoner"
      },
      {
        "Name": "Crab",
        "CR": 0,
        "XP": 10,
        "ID": "Crab"
      },
      {
        "Name": "Cranium Rat",
        "CR": 0,
        "XP": 10,
        "ID": "Cranium_Rat"
      },
      {
        "Name": "Crawling Claw",
        "CR": 0,
        "XP": 10,
        "ID": "Crawling_Claw"
      },
      {
        "Name": "Deer",
        "CR": 0,
        "XP": 10,
        "ID": "Deer"
      },
      {
        "Name": "Dohwar",
        "CR": 0,
        "XP": 10,
        "ID": "Dohwar"
      },
      {
        "Name": "Eagle",
        "CR": 0,
        "XP": 10,
        "ID": "Eagle"
      },
      {
        "Name": "Giant Fire Beetle",
        "CR": 0,
        "XP": 10,
        "ID": "Giant_Fire_Beetle"
      },
      {
        "Name": "Goat",
        "CR": 0,
        "XP": 10,
        "ID": "Goat"
      },
      {
        "Name": "Hawk",
        "CR": 0,
        "XP": 10,
        "ID": "Hawk"
      },
      {
        "Name": "Homunculus",
        "CR": 0,
        "XP": 10,
        "ID": "Homunculus"
      },
      {
        "Name": "Hyena",
        "CR": 0,
        "XP": 10,
        "ID": "Hyena"
      },
      {
        "Name": "Jackal",
        "CR": 0,
        "XP": 10,
        "ID": "Jackal"
      },
      {
        "Name": "Juvenile Mimic",
        "CR": 0,
        "XP": 10,
        "ID": "Juvenile_Mimic"
      },
      {
        "Name": "Larva",
        "CR": 0,
        "XP": 10,
        "ID": "Larva"
      },
      {
        "Name": "Lemure",
        "CR": 0,
        "XP": 10,
        "ID": "Lemure"
      },
      {
        "Name": "Lizard",
        "CR": 0,
        "XP": 10,
        "ID": "Lizard"
      },
      {
        "Name": "Magewright",
        "CR": 0,
        "XP": 10,
        "ID": "Magewright"
      },
      {
        "Name": "Myconid Sprout",
        "CR": 0,
        "XP": 10,
        "ID": "Myconid_Sprout"
      },
      {
        "Name": "Octopus",
        "CR": 0,
        "XP": 10,
        "ID": "Octopus"
      },
      {
        "Name": "Owl",
        "CR": 0,
        "XP": 10,
        "ID": "Owl"
      },
      {
        "Name": "Quipper",
        "CR": 0,
        "XP": 10,
        "ID": "Quipper"
      },
      {
        "Name": "Rat",
        "CR": 0,
        "XP": 10,
        "ID": "Rat"
      },
      {
        "Name": "Raven",
        "CR": 0,
        "XP": 10,
        "ID": "Raven"
      },
      {
        "Name": "Scorpion",
        "CR": 0,
        "XP": 10,
        "ID": "Scorpion"
      },
      {
        "Name": "Shrieker",
        "CR": 0,
        "XP": 10,
        "ID": "Shrieker"
      },
      {
        "Name": "Space Guppy",
        "CR": 0,
        "XP": 10,
        "ID": "Space_Guppy"
      },
      {
        "Name": "Space Mollymawk",
        "CR": 0,
        "XP": 10,
        "ID": "Space_Mollymawk"
      },
      {
        "Name": "Spider",
        "CR": 0,
        "XP": 10,
        "ID": "Spider"
      },
      {
        "Name": "Tiny Servant",
        "CR": 0,
        "XP": 10,
        "ID": "Tiny_Servant"
      },
      {
        "Name": "Vulture",
        "CR": 0,
        "XP": 10,
        "ID": "Vulture"
      },
      {
        "Name": "Weasel",
        "CR": 0,
        "XP": 10,
        "ID": "Weasel"
      },
      {
        "Name": "Bandit",
        "CR": 0.125,
        "XP": 25,
        "ID": "Bandit"
      },
      {
        "Name": "Blood Hawk",
        "CR": 0.125,
        "XP": 25,
        "ID": "Blood_Hawk"
      },
      {
        "Name": "Boggle",
        "CR": 0.125,
        "XP": 25,
        "ID": "Boggle"
      },
      {
        "Name": "Camel",
        "CR": 0.125,
        "XP": 25,
        "ID": "Camel"
      },
      {
        "Name": "Cultist",
        "CR": 0.125,
        "XP": 25,
        "ID": "Cultist"
      },
      {
        "Name": "Dolphin",
        "CR": 0.125,
        "XP": 25,
        "ID": "Dolphin"
      },
      {
        "Name": "Expeditious Messenger",
        "CR": 0.125,
        "XP": 25,
        "ID": "Expeditious_Messenger"
      },
      {
        "Name": "Flumph",
        "CR": 0.125,
        "XP": 25,
        "ID": "Flumph"
      },
      {
        "Name": "Flying Snake",
        "CR": 0.125,
        "XP": 25,
        "ID": "Flying_Snake"
      },
      {
        "Name": "Gadabout",
        "CR": 0.125,
        "XP": 25,
        "ID": "Gadabout"
      },
      {
        "Name": "Giant Crab",
        "CR": 0.125,
        "XP": 25,
        "ID": "Giant_Crab"
      },
      {
        "Name": "Giant Rat",
        "CR": 0.125,
        "XP": 25,
        "ID": "Giant_Rat"
      },
      {
        "Name": "Giant Rat Diseased",
        "CR": 0.125,
        "XP": 25,
        "ID": "Giant_Rat_Diseased"
      },
      {
        "Name": "Giant Weasel",
        "CR": 0.125,
        "XP": 25,
        "ID": "Giant_Weasel"
      },
      {
        "Name": "Goon Balloon",
        "CR": 0.125,
        "XP": 25,
        "ID": "Goon_Balloon"
      },
      {
        "Name": "Guard",
        "CR": 0.125,
        "XP": 25,
        "ID": "Guard"
      },
      {
        "Name": "Hadozee Shipmate",
        "CR": 0.125,
        "XP": 25,
        "ID": "Hadozee_Shipmate"
      },
      {
        "Name": "Kobold",
        "CR": 0.125,
        "XP": 25,
        "ID": "Kobold"
      },
      {
        "Name": "Manes",
        "CR": 0.125,
        "XP": 25,
        "ID": "Manes"
      },
      {
        "Name": "Mastiff",
        "CR": 0.125,
        "XP": 25,
        "ID": "Mastiff"
      },
      {
        "Name": "Merfolk",
        "CR": 0.125,
        "XP": 25,
        "ID": "Merfolk"
      },
      {
        "Name": "Monodrone",
        "CR": 0.125,
        "XP": 25,
        "ID": "Monodrone"
      },
      {
        "Name": "Mule",
        "CR": 0.125,
        "XP": 25,
        "ID": "Mule"
      },
      {
        "Name": "Neogi Hatchling",
        "CR": 0.125,
        "XP": 25,
        "ID": "Neogi_Hatchling"
      },
      {
        "Name": "Noble",
        "CR": 0.125,
        "XP": 25,
        "ID": "Noble"
      },
      {
        "Name": "Poisonous Snake",
        "CR": 0.125,
        "XP": 25,
        "ID": "Poisonous_Snake"
      },
      {
        "Name": "Pony",
        "CR": 0.125,
        "XP": 25,
        "ID": "Pony"
      },
      {
        "Name": "Slaad Tadpole",
        "CR": 0.125,
        "XP": 25,
        "ID": "Slaad_Tadpole"
      },
      {
        "Name": "Stirge",
        "CR": 0.125,
        "XP": 25,
        "ID": "Stirge"
      },
      {
        "Name": "Tribal Warrior",
        "CR": 0.125,
        "XP": 25,
        "ID": "Tribal_Warrior"
      },
      {
        "Name": "Valenar Hawk",
        "CR": 0.125,
        "XP": 25,
        "ID": "Valenar_Hawk"
      },
      {
        "Name": "Xvart",
        "CR": 0.125,
        "XP": 25,
        "ID": "Xvart"
      },
      {
        "Name": "Young Kruthik",
        "CR": 0.125,
        "XP": 25,
        "ID": "Young_Kruthik"
      },
      {
        "Name": "Dretch",
        "CR": 0.25,
        "XP": 50,
        "ID": "Dretch"
      },
      {
        "Name": "Riding Horse",
        "CR": 0.25,
        "XP": 50,
        "ID": "Riding_Horse"
      },
      {
        "Name": "Aarakocra",
        "CR": 0.25,
        "XP": 50,
        "ID": "Aarakocra"
      },
      {
        "Name": "Acolyte",
        "CR": 0.25,
        "XP": 50,
        "ID": "Acolyte"
      },
      {
        "Name": "Apprentice Wizard",
        "CR": 0.25,
        "XP": 50,
        "ID": "Apprentice_Wizard"
      },
      {
        "Name": "Ash Zombie",
        "CR": 0.25,
        "XP": 50,
        "ID": "Ash_Zombie"
      },
      {
        "Name": "Axe Beak",
        "CR": 0.25,
        "XP": 50,
        "ID": "Axe_Beak"
      },
      {
        "Name": "Blink Dog",
        "CR": 0.25,
        "XP": 50,
        "ID": "Blink_Dog"
      },
      {
        "Name": "Boar",
        "CR": 0.25,
        "XP": 50,
        "ID": "Boar"
      },
      {
        "Name": "Bullywug",
        "CR": 0.25,
        "XP": 50,
        "ID": "Bullywug"
      },
      {
        "Name": "Constrictor Snake",
        "CR": 0.25,
        "XP": 50,
        "ID": "Constrictor_Snake"
      },
      {
        "Name": "Deep Rothe",
        "CR": 0.25,
        "XP": 50,
        "ID": "Deep_Rothe"
      },
      {
        "Name": "Derro",
        "CR": 0.25,
        "XP": 50,
        "ID": "Derro"
      },
      {
        "Name": "Dimetrodon",
        "CR": 0.25,
        "XP": 50,
        "ID": "Dimetrodon"
      },
      {
        "Name": "Draft Horse",
        "CR": 0.25,
        "XP": 50,
        "ID": "Draft_Horse"
      },
      {
        "Name": "Drow",
        "CR": 0.25,
        "XP": 50,
        "ID": "Drow"
      },
      {
        "Name": "Duodrone",
        "CR": 0.25,
        "XP": 50,
        "ID": "Duodrone"
      },
      {
        "Name": "Elk",
        "CR": 0.25,
        "XP": 50,
        "ID": "Elk"
      },
      {
        "Name": "Fastieth",
        "CR": 0.25,
        "XP": 50,
        "ID": "Fastieth"
      },
      {
        "Name": "Flying Sword",
        "CR": 0.25,
        "XP": 50,
        "ID": "Flying_Sword"
      },
      {
        "Name": "Giant Badger",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Badger"
      },
      {
        "Name": "Giant Bat",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Bat"
      },
      {
        "Name": "Giant Centipede",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Centipede"
      },
      {
        "Name": "Giant Frog",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Frog"
      },
      {
        "Name": "Giant Lizard",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Lizard"
      },
      {
        "Name": "Giant Lizard",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Lizard"
      },
      {
        "Name": "Giant Owl",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Owl"
      },
      {
        "Name": "Giant Poisonous Snake",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Poisonous_Snake"
      },
      {
        "Name": "Giant Space Hamster",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Space_Hamster"
      },
      {
        "Name": "Giant Wolf Spider",
        "CR": 0.25,
        "XP": 50,
        "ID": "Giant_Wolf_Spider"
      },
      {
        "Name": "Gnoll Witherling",
        "CR": 0.25,
        "XP": 50,
        "ID": "Gnoll_Witherling"
      },
      {
        "Name": "Goblin",
        "CR": 0.25,
        "XP": 50,
        "ID": "Goblin"
      },
      {
        "Name": "Gray Scavver",
        "CR": 0.25,
        "XP": 50,
        "ID": "Gray_Scavver"
      },
      {
        "Name": "Grimlock",
        "CR": 0.25,
        "XP": 50,
        "ID": "Grimlock"
      },
      {
        "Name": "Grung",
        "CR": 0.25,
        "XP": 50,
        "ID": "Grung"
      },
      {
        "Name": "Hadrosaurus",
        "CR": 0.25,
        "XP": 50,
        "ID": "Hadrosaurus"
      },
      {
        "Name": "Kalashtar",
        "CR": 0.25,
        "XP": 50,
        "ID": "Kalashtar"
      },
      {
        "Name": "Kenku",
        "CR": 0.25,
        "XP": 50,
        "ID": "Kenku"
      },
      {
        "Name": "Kobold Inventor",
        "CR": 0.25,
        "XP": 50,
        "ID": "Kobold_Inventor"
      },
      {
        "Name": "Kuo toa",
        "CR": 0.25,
        "XP": 50,
        "ID": "Kuo_toa"
      },
      {
        "Name": "Lhupo",
        "CR": 0.25,
        "XP": 50,
        "ID": "Lhupo"
      },
      {
        "Name": "Male Steeder",
        "CR": 0.25,
        "XP": 50,
        "ID": "Male_Steeder"
      },
      {
        "Name": "Mud Mephit",
        "CR": 0.25,
        "XP": 50,
        "ID": "Mud_Mephit"
      },
      {
        "Name": "Needle Blight",
        "CR": 0.25,
        "XP": 50,
        "ID": "Needle_Blight"
      },
      {
        "Name": "Oblex Spawn",
        "CR": 0.25,
        "XP": 50,
        "ID": "Oblex_Spawn"
      },
      {
        "Name": "Ox",
        "CR": 0.25,
        "XP": 50,
        "ID": "Ox"
      },
      {
        "Name": "Panther",
        "CR": 0.25,
        "XP": 50,
        "ID": "Panther"
      },
      {
        "Name": "Pixie",
        "CR": 0.25,
        "XP": 50,
        "ID": "Pixie"
      },
      {
        "Name": "Plasmoid Explorer",
        "CR": 0.25,
        "XP": 50,
        "ID": "Plasmoid_Explorer"
      },
      {
        "Name": "Pseudodragon",
        "CR": 0.25,
        "XP": 50,
        "ID": "Pseudodragon"
      },
      {
        "Name": "Pseudodragon",
        "CR": 0.25,
        "XP": 50,
        "ID": "Pseudodragon"
      },
      {
        "Name": "Redbrand Ruffian",
        "CR": 0.25,
        "XP": 50,
        "ID": "Redbrand_Ruffian"
      },
      {
        "Name": "Skeleton",
        "CR": 0.25,
        "XP": 50,
        "ID": "Skeleton"
      },
      {
        "Name": "Smoke Mephit",
        "CR": 0.25,
        "XP": 50,
        "ID": "Smoke_Mephit"
      },
      {
        "Name": "Snarl",
        "CR": 0.25,
        "XP": 50,
        "ID": "Snarl"
      },
      {
        "Name": "Space Hamster",
        "CR": 0.25,
        "XP": 50,
        "ID": "Space_Hamster"
      },
      {
        "Name": "Space Swine",
        "CR": 0.25,
        "XP": 50,
        "ID": "Space_Swine"
      },
      {
        "Name": "Sprite",
        "CR": 0.25,
        "XP": 50,
        "ID": "Sprite"
      },
      {
        "Name": "Star Spawn Grue",
        "CR": 0.25,
        "XP": 50,
        "ID": "Star_Spawn_Grue"
      },
      {
        "Name": "Steam Mephit",
        "CR": 0.25,
        "XP": 50,
        "ID": "Steam_Mephit"
      },
      {
        "Name": "Steam Mephit",
        "CR": 0.25,
        "XP": 50,
        "ID": "Steam_Mephit"
      },
      {
        "Name": "Stench Kow",
        "CR": 0.25,
        "XP": 50,
        "ID": "Stench_Kow"
      },
      {
        "Name": "Swarm of Bats",
        "CR": 0.25,
        "XP": 50,
        "ID": "Swarm_of_Bats"
      },
      {
        "Name": "Swarm of Rats",
        "CR": 0.25,
        "XP": 50,
        "ID": "Swarm_of_Rats"
      },
      {
        "Name": "Swarm of Ravens",
        "CR": 0.25,
        "XP": 50,
        "ID": "Swarm_of_Ravens"
      },
      {
        "Name": "Tortle",
        "CR": 0.25,
        "XP": 50,
        "ID": "Tortle"
      },
      {
        "Name": "Troglodyte",
        "CR": 0.25,
        "XP": 50,
        "ID": "Troglodyte"
      },
      {
        "Name": "Vegepygmy",
        "CR": 0.25,
        "XP": 50,
        "ID": "Vegepygmy"
      },
      {
        "Name": "Velociraptor",
        "CR": 0.25,
        "XP": 50,
        "ID": "Velociraptor"
      },
      {
        "Name": "Violet Fungus",
        "CR": 0.25,
        "XP": 50,
        "ID": "Violet_Fungus"
      },
      {
        "Name": "Winged Kobold",
        "CR": 0.25,
        "XP": 50,
        "ID": "Winged_Kobold"
      },
      {
        "Name": "Wolf",
        "CR": 0.25,
        "XP": 50,
        "ID": "Wolf"
      },
      {
        "Name": "Wretched Sorrowsworn",
        "CR": 0.25,
        "XP": 50,
        "ID": "Wretched_Sorrowsworn"
      },
      {
        "Name": "Yeemik",
        "CR": 0.25,
        "XP": 50,
        "ID": "Yeemik"
      },
      {
        "Name": "Yegg",
        "CR": 0.25,
        "XP": 50,
        "ID": "Yegg"
      },
      {
        "Name": "Zombie",
        "CR": 0.25,
        "XP": 50,
        "ID": "Zombie"
      },
      {
        "Name": "Deep Gnome Svirfneblin",
        "CR": 0.5,
        "XP": 100,
        "ID": "Deep_Gnome_Svirfneblin"
      },
      {
        "Name": "Ape",
        "CR": 0.5,
        "XP": 100,
        "ID": "Ape"
      },
      {
        "Name": "Black Bear",
        "CR": 0.5,
        "XP": 100,
        "ID": "Black_Bear"
      },
      {
        "Name": "Brughor Axe-Biter",
        "CR": 0.5,
        "XP": 100,
        "ID": "Brughor_Axe-Biter"
      },
      {
        "Name": "Changeling",
        "CR": 0.5,
        "XP": 100,
        "ID": "Changeling"
      },
      {
        "Name": "Chitine",
        "CR": 0.5,
        "XP": 100,
        "ID": "Chitine"
      },
      {
        "Name": "Cockatrice",
        "CR": 0.5,
        "XP": 100,
        "ID": "Cockatrice"
      },
      {
        "Name": "Crocodile",
        "CR": 0.5,
        "XP": 100,
        "ID": "Crocodile"
      },
      {
        "Name": "Darkling",
        "CR": 0.5,
        "XP": 100,
        "ID": "Darkling"
      },
      {
        "Name": "Darkmantle",
        "CR": 0.5,
        "XP": 100,
        "ID": "Darkmantle"
      },
      {
        "Name": "Dolgrim",
        "CR": 0.5,
        "XP": 100,
        "ID": "Dolgrim"
      },
      {
        "Name": "Dust Mephit",
        "CR": 0.5,
        "XP": 100,
        "ID": "Dust_Mephit"
      },
      {
        "Name": "Dust Mephit",
        "CR": 0.5,
        "XP": 100,
        "ID": "Dust_Mephit"
      },
      {
        "Name": "Firenewt Warrior",
        "CR": 0.5,
        "XP": 100,
        "ID": "Firenewt_Warrior"
      },
      {
        "Name": "Gas Spore",
        "CR": 0.5,
        "XP": 100,
        "ID": "Gas_Spore"
      },
      {
        "Name": "Gazer",
        "CR": 0.5,
        "XP": 100,
        "ID": "Gazer"
      },
      {
        "Name": "Giant Goat",
        "CR": 0.5,
        "XP": 100,
        "ID": "Giant_Goat"
      },
      {
        "Name": "Giant Sea Horse",
        "CR": 0.5,
        "XP": 100,
        "ID": "Giant_Sea_Horse"
      },
      {
        "Name": "Giant Wasp",
        "CR": 0.5,
        "XP": 100,
        "ID": "Giant_Wasp"
      },
      {
        "Name": "Gnoll",
        "CR": 0.5,
        "XP": 100,
        "ID": "Gnoll"
      },
      {
        "Name": "Gnoll Hunter",
        "CR": 0.5,
        "XP": 100,
        "ID": "Gnoll_Hunter"
      },
      {
        "Name": "Gray Ooze",
        "CR": 0.5,
        "XP": 100,
        "ID": "Gray_Ooze"
      },
      {
        "Name": "Hadozee Warrior",
        "CR": 0.5,
        "XP": 100,
        "ID": "Hadozee_Warrior"
      },
      {
        "Name": "Hobgoblin",
        "CR": 0.5,
        "XP": 100,
        "ID": "Hobgoblin"
      },
      {
        "Name": "Ice Mephit",
        "CR": 0.5,
        "XP": 100,
        "ID": "Ice_Mephit"
      },
      {
        "Name": "Ice Mephit",
        "CR": 0.5,
        "XP": 100,
        "ID": "Ice_Mephit"
      },
      {
        "Name": "Jackalwere",
        "CR": 0.5,
        "XP": 100,
        "ID": "Jackalwere"
      },
      {
        "Name": "Lizardfolk",
        "CR": 0.5,
        "XP": 100,
        "ID": "Lizardfolk"
      },
      {
        "Name": "Magma Mephit",
        "CR": 0.5,
        "XP": 100,
        "ID": "Magma_Mephit"
      },
      {
        "Name": "Magma Mephit",
        "CR": 0.5,
        "XP": 100,
        "ID": "Magma_Mephit"
      },
      {
        "Name": "Magmin",
        "CR": 0.5,
        "XP": 100,
        "ID": "Magmin"
      },
      {
        "Name": "Myconid Adult",
        "CR": 0.5,
        "XP": 100,
        "ID": "Myconid_Adult"
      },
      {
        "Name": "Nupperibo",
        "CR": 0.5,
        "XP": 100,
        "ID": "Nupperibo"
      },
      {
        "Name": "Orc",
        "CR": 0.5,
        "XP": 100,
        "ID": "Orc"
      },
      {
        "Name": "Piercer",
        "CR": 0.5,
        "XP": 100,
        "ID": "Piercer"
      },
      {
        "Name": "Psychic Gray Ooze",
        "CR": 0.5,
        "XP": 100,
        "ID": "Psychic_Gray_Ooze"
      },
      {
        "Name": "Reef Shark",
        "CR": 0.5,
        "XP": 100,
        "ID": "Reef_Shark"
      },
      {
        "Name": "Reflections",
        "CR": 0.5,
        "XP": 100,
        "ID": "Reflections"
      },
      {
        "Name": "Rust Monster",
        "CR": 0.5,
        "XP": 100,
        "ID": "Rust_Monster"
      },
      {
        "Name": "Sahuagin",
        "CR": 0.5,
        "XP": 100,
        "ID": "Sahuagin"
      },
      {
        "Name": "Satyr",
        "CR": 0.5,
        "XP": 100,
        "ID": "Satyr"
      },
      {
        "Name": "Satyr",
        "CR": 0.5,
        "XP": 100,
        "ID": "Satyr"
      },
      {
        "Name": "Scout",
        "CR": 0.5,
        "XP": 100,
        "ID": "Scout"
      },
      {
        "Name": "Shadow",
        "CR": 0.5,
        "XP": 100,
        "ID": "Shadow"
      },
      {
        "Name": "Shifter",
        "CR": 0.5,
        "XP": 100,
        "ID": "Shifter"
      },
      {
        "Name": "Skulk",
        "CR": 0.5,
        "XP": 100,
        "ID": "Skulk"
      },
      {
        "Name": "Space Eel",
        "CR": 0.5,
        "XP": 100,
        "ID": "Space_Eel"
      },
      {
        "Name": "Ssurran Poisoner",
        "CR": 0.5,
        "XP": 100,
        "ID": "Ssurran_Poisoner"
      },
      {
        "Name": "Swarm of Beetles",
        "CR": 0.5,
        "XP": 100,
        "ID": "Swarm_of_Beetles"
      },
      {
        "Name": "Swarm of Centipedes",
        "CR": 0.5,
        "XP": 100,
        "ID": "Swarm_of_Centipedes"
      },
      {
        "Name": "Swarm of Insects",
        "CR": 0.5,
        "XP": 100,
        "ID": "Swarm_of_Insects"
      },
      {
        "Name": "Swarm of Rot Grubs",
        "CR": 0.5,
        "XP": 100,
        "ID": "Swarm_of_Rot_Grubs"
      },
      {
        "Name": "Swarm of Spiders",
        "CR": 0.5,
        "XP": 100,
        "ID": "Swarm_of_Spiders"
      },
      {
        "Name": "Swarm of Wasps",
        "CR": 0.5,
        "XP": 100,
        "ID": "Swarm_of_Wasps"
      },
      {
        "Name": "Targor Bloodsword",
        "CR": 0.5,
        "XP": 100,
        "ID": "Targor_Bloodsword"
      },
      {
        "Name": "Thug",
        "CR": 0.5,
        "XP": 100,
        "ID": "Thug"
      },
      {
        "Name": "Tridrone",
        "CR": 0.5,
        "XP": 100,
        "ID": "Tridrone"
      },
      {
        "Name": "Valenar Hound",
        "CR": 0.5,
        "XP": 100,
        "ID": "Valenar_Hound"
      },
      {
        "Name": "Valenar Steed",
        "CR": 0.5,
        "XP": 100,
        "ID": "Valenar_Steed"
      },
      {
        "Name": "Vine Blight",
        "CR": 0.5,
        "XP": 100,
        "ID": "Vine_Blight"
      },
      {
        "Name": "Warhorse",
        "CR": 0.5,
        "XP": 100,
        "ID": "Warhorse"
      },
      {
        "Name": "Warhorse Skeleton",
        "CR": 0.5,
        "XP": 100,
        "ID": "Warhorse_Skeleton"
      },
      {
        "Name": "Worg",
        "CR": 0.5,
        "XP": 100,
        "ID": "Worg"
      },
      {
        "Name": "Brass Dragon Wyrmling",
        "CR": 1,
        "XP": 200,
        "ID": "Brass_Dragon_Wyrmling"
      },
      {
        "Name": "Animated Armor",
        "CR": 1,
        "XP": 200,
        "ID": "Animated_Armor"
      },
      {
        "Name": "Astral Blight",
        "CR": 1,
        "XP": 200,
        "ID": "Astral_Blight"
      },
      {
        "Name": "Brown Bear",
        "CR": 1,
        "XP": 200,
        "ID": "Brown_Bear"
      },
      {
        "Name": "Bugbear",
        "CR": 1,
        "XP": 200,
        "ID": "Bugbear"
      },
      {
        "Name": "Choker",
        "CR": 1,
        "XP": 200,
        "ID": "Choker"
      },
      {
        "Name": "Clawfoot",
        "CR": 1,
        "XP": 200,
        "ID": "Clawfoot"
      },
      {
        "Name": "Clockwork Bronze Scout",
        "CR": 1,
        "XP": 200,
        "ID": "Clockwork_Bronze_Scout"
      },
      {
        "Name": "Copper Dragon Wyrmling",
        "CR": 1,
        "XP": 200,
        "ID": "Copper_Dragon_Wyrmling"
      },
      {
        "Name": "Corrin Delmaco",
        "CR": 1,
        "XP": 200,
        "ID": "Corrin_Delmaco"
      },
      {
        "Name": "Death Dog",
        "CR": 1,
        "XP": 200,
        "ID": "Death_Dog"
      },
      {
        "Name": "Deinonychus",
        "CR": 1,
        "XP": 200,
        "ID": "Deinonychus"
      },
      {
        "Name": "Dire Wolf",
        "CR": 1,
        "XP": 200,
        "ID": "Dire_Wolf"
      },
      {
        "Name": "Dryad",
        "CR": 1,
        "XP": 200,
        "ID": "Dryad"
      },
      {
        "Name": "Duergar",
        "CR": 1,
        "XP": 200,
        "ID": "Duergar"
      },
      {
        "Name": "Duergar Soulblade",
        "CR": 1,
        "XP": 200,
        "ID": "Duergar_Soulblade"
      },
      {
        "Name": "Evil Mage",
        "CR": 1,
        "XP": 200,
        "ID": "Evil_Mage"
      },
      {
        "Name": "Faerie Dragon Younger",
        "CR": 1,
        "XP": 200,
        "ID": "Faerie_Dragon_Younger"
      },
      {
        "Name": "Female Steeder",
        "CR": 1,
        "XP": 200,
        "ID": "Female_Steeder"
      },
      {
        "Name": "Fire Snake",
        "CR": 1,
        "XP": 200,
        "ID": "Fire_Snake"
      },
      {
        "Name": "Firenewt Walock of Imix",
        "CR": 1,
        "XP": 200,
        "ID": "Firenewt_Walock_of_Imix"
      },
      {
        "Name": "Garra",
        "CR": 1,
        "XP": 200,
        "ID": "Garra"
      },
      {
        "Name": "Ghoul",
        "CR": 1,
        "XP": 200,
        "ID": "Ghoul"
      },
      {
        "Name": "Giant Eagle",
        "CR": 1,
        "XP": 200,
        "ID": "Giant_Eagle"
      },
      {
        "Name": "Giant Hyena",
        "CR": 1,
        "XP": 200,
        "ID": "Giant_Hyena"
      },
      {
        "Name": "Giant Octopus",
        "CR": 1,
        "XP": 200,
        "ID": "Giant_Octopus"
      },
      {
        "Name": "Giant Spider",
        "CR": 1,
        "XP": 200,
        "ID": "Giant_Spider"
      },
      {
        "Name": "Giant Strider",
        "CR": 1,
        "XP": 200,
        "ID": "Giant_Strider"
      },
      {
        "Name": "Giant Toad",
        "CR": 1,
        "XP": 200,
        "ID": "Giant_Toad"
      },
      {
        "Name": "Giant Vulture",
        "CR": 1,
        "XP": 200,
        "ID": "Giant_Vulture"
      },
      {
        "Name": "Gnoll Flech Gnawer",
        "CR": 1,
        "XP": 200,
        "ID": "Gnoll_Flech_Gnawer"
      },
      {
        "Name": "Goblin Boss",
        "CR": 1,
        "XP": 200,
        "ID": "Goblin_Boss"
      },
      {
        "Name": "Grung Wildling",
        "CR": 1,
        "XP": 200,
        "ID": "Grung_Wildling"
      },
      {
        "Name": "Half Ogre",
        "CR": 1,
        "XP": 200,
        "ID": "Half_Ogre"
      },
      {
        "Name": "Harpy",
        "CR": 1,
        "XP": 200,
        "ID": "Harpy"
      },
      {
        "Name": "Hippogriff",
        "CR": 1,
        "XP": 200,
        "ID": "Hippogriff"
      },
      {
        "Name": "Imp",
        "CR": 1,
        "XP": 200,
        "ID": "Imp"
      },
      {
        "Name": "Imp",
        "CR": 1,
        "XP": 200,
        "ID": "Imp"
      },
      {
        "Name": "Irda Seeker",
        "CR": 1,
        "XP": 200,
        "ID": "Irda_Seeker"
      },
      {
        "Name": "Iron Defender",
        "CR": 1,
        "XP": 200,
        "ID": "Iron_Defender"
      },
      {
        "Name": "Jammer Leech",
        "CR": 1,
        "XP": 200,
        "ID": "Jammer_Leech"
      },
      {
        "Name": "King Grol",
        "CR": 1,
        "XP": 200,
        "ID": "King_Grol"
      },
      {
        "Name": "Kobold Dragonshield",
        "CR": 1,
        "XP": 200,
        "ID": "Kobold_Dragonshield"
      },
      {
        "Name": "Kobold Scale Sorcerer",
        "CR": 1,
        "XP": 200,
        "ID": "Kobold_Scale_Sorcerer"
      },
      {
        "Name": "Kuo toa Whip",
        "CR": 1,
        "XP": 200,
        "ID": "Kuo_toa_Whip"
      },
      {
        "Name": "Lion",
        "CR": 1,
        "XP": 200,
        "ID": "Lion"
      },
      {
        "Name": "Living Burning Hands",
        "CR": 1,
        "XP": 200,
        "ID": "Living_Burning_Hands"
      },
      {
        "Name": "Maw Demon",
        "CR": 1,
        "XP": 200,
        "ID": "Maw_Demon"
      },
      {
        "Name": "Meazel",
        "CR": 1,
        "XP": 200,
        "ID": "Meazel"
      },
      {
        "Name": "Nilbog",
        "CR": 1,
        "XP": 200,
        "ID": "Nilbog"
      },
      {
        "Name": "Psurlon ringer",
        "CR": 1,
        "XP": 200,
        "ID": "Psurlon_ringer"
      },
      {
        "Name": "Quadrone",
        "CR": 1,
        "XP": 200,
        "ID": "Quadrone"
      },
      {
        "Name": "Quaggoth Spore Servant",
        "CR": 1,
        "XP": 200,
        "ID": "Quaggoth_Spore_Servant"
      },
      {
        "Name": "Quasit",
        "CR": 1,
        "XP": 200,
        "ID": "Quasit"
      },
      {
        "Name": "Quasit",
        "CR": 1,
        "XP": 200,
        "ID": "Quasit"
      },
      {
        "Name": "Quickling",
        "CR": 1,
        "XP": 200,
        "ID": "Quickling"
      },
      {
        "Name": "Scarecrow",
        "CR": 1,
        "XP": 200,
        "ID": "Scarecrow"
      },
      {
        "Name": "Sea Spawn",
        "CR": 1,
        "XP": 200,
        "ID": "Sea_Spawn"
      },
      {
        "Name": "Sildar Hallwinter",
        "CR": 1,
        "XP": 200,
        "ID": "Sildar_Hallwinter"
      },
      {
        "Name": "Specter",
        "CR": 1,
        "XP": 200,
        "ID": "Specter"
      },
      {
        "Name": "Spy",
        "CR": 1,
        "XP": 200,
        "ID": "Spy"
      },
      {
        "Name": "Stone Cursed",
        "CR": 1,
        "XP": 200,
        "ID": "Stone_Cursed"
      },
      {
        "Name": "Swarm of Quippers",
        "CR": 1,
        "XP": 200,
        "ID": "Swarm_of_Quippers"
      },
      {
        "Name": "Thanoi Hunter",
        "CR": 1,
        "XP": 200,
        "ID": "Thanoi_Hunter"
      },
      {
        "Name": "Thorny Vegepygmy",
        "CR": 1,
        "XP": 200,
        "ID": "Thorny_Vegepygmy"
      },
      {
        "Name": "Thri kreen",
        "CR": 1,
        "XP": 200,
        "ID": "Thri_kreen"
      },
      {
        "Name": "Tiger",
        "CR": 1,
        "XP": 200,
        "ID": "Tiger"
      },
      {
        "Name": "Vargouille",
        "CR": 1,
        "XP": 200,
        "ID": "Vargouille"
      },
      {
        "Name": "Warforged Soldier",
        "CR": 1,
        "XP": 200,
        "ID": "Warforged_Soldier"
      },
      {
        "Name": "Xvart Warlock of Raxivort",
        "CR": 1,
        "XP": 200,
        "ID": "Xvart_Warlock_of_Raxivort"
      },
      {
        "Name": "Yuan ti Pureblood",
        "CR": 1,
        "XP": 200,
        "ID": "Yuan_ti_Pureblood"
      },
      {
        "Name": "Ankheg",
        "CR": 2,
        "XP": 450,
        "ID": "Ankheg"
      },
      {
        "Name": "Aartuk Starhorror",
        "CR": 2,
        "XP": 450,
        "ID": "Aartuk_Starhorror"
      },
      {
        "Name": "Aartuk Weedling",
        "CR": 2,
        "XP": 450,
        "ID": "Aartuk_Weedling"
      },
      {
        "Name": "Adult Kruthik",
        "CR": 2,
        "XP": 450,
        "ID": "Adult_Kruthik"
      },
      {
        "Name": "Aurochs",
        "CR": 2,
        "XP": 450,
        "ID": "Aurochs"
      },
      {
        "Name": "Autognome",
        "CR": 2,
        "XP": 450,
        "ID": "Autognome"
      },
      {
        "Name": "Awakened Tree",
        "CR": 2,
        "XP": 450,
        "ID": "Awakened_Tree"
      },
      {
        "Name": "Azer",
        "CR": 2,
        "XP": 450,
        "ID": "Azer"
      },
      {
        "Name": "Bandit Captain",
        "CR": 2,
        "XP": 450,
        "ID": "Bandit_Captain"
      },
      {
        "Name": "Bard",
        "CR": 2,
        "XP": 450,
        "ID": "Bard"
      },
      {
        "Name": "Berbalang",
        "CR": 2,
        "XP": 450,
        "ID": "Berbalang"
      },
      {
        "Name": "Berserker",
        "CR": 2,
        "XP": 450,
        "ID": "Berserker"
      },
      {
        "Name": "Black Dragon Wyrmling",
        "CR": 2,
        "XP": 450,
        "ID": "Black_Dragon_Wyrmling"
      },
      {
        "Name": "Black Guard Drake",
        "CR": 2,
        "XP": 450,
        "ID": "Black_Guard_Drake"
      },
      {
        "Name": "Blue Guard Drake",
        "CR": 2,
        "XP": 450,
        "ID": "Blue_Guard_Drake"
      },
      {
        "Name": "Bronze Dragon Wyrmling",
        "CR": 2,
        "XP": 450,
        "ID": "Bronze_Dragon_Wyrmling"
      },
      {
        "Name": "Carrion Crawler",
        "CR": 2,
        "XP": 450,
        "ID": "Carrion_Crawler"
      },
      {
        "Name": "Cave Bear",
        "CR": 2,
        "XP": 450,
        "ID": "Cave_Bear"
      },
      {
        "Name": "Centaur",
        "CR": 2,
        "XP": 450,
        "ID": "Centaur"
      },
      {
        "Name": "Clockwork Horror",
        "CR": 2,
        "XP": 450,
        "ID": "Clockwork_Horror"
      },
      {
        "Name": "Cult Fanatic",
        "CR": 2,
        "XP": 450,
        "ID": "Cult_Fanatic"
      },
      {
        "Name": "Darkling Elder",
        "CR": 2,
        "XP": 450,
        "ID": "Darkling_Elder"
      },
      {
        "Name": "Druid",
        "CR": 2,
        "XP": 450,
        "ID": "Druid"
      },
      {
        "Name": "Duergar Hammerer",
        "CR": 2,
        "XP": 450,
        "ID": "Duergar_Hammerer"
      },
      {
        "Name": "Duergar Kavalrachni",
        "CR": 2,
        "XP": 450,
        "ID": "Duergar_Kavalrachni"
      },
      {
        "Name": "Duergar Mind Master",
        "CR": 2,
        "XP": 450,
        "ID": "Duergar_Mind_Master"
      },
      {
        "Name": "Duergar Stone Guard",
        "CR": 2,
        "XP": 450,
        "ID": "Duergar_Stone_Guard"
      },
      {
        "Name": "Duergar Xarrorn",
        "CR": 2,
        "XP": 450,
        "ID": "Duergar_Xarrorn"
      },
      {
        "Name": "Ettercap",
        "CR": 2,
        "XP": 450,
        "ID": "Ettercap"
      },
      {
        "Name": "Ettercap",
        "CR": 2,
        "XP": 450,
        "ID": "Ettercap"
      },
      {
        "Name": "Faerie Dragon Older",
        "CR": 2,
        "XP": 450,
        "ID": "Faerie_Dragon_Older"
      },
      {
        "Name": "Gargoyle",
        "CR": 2,
        "XP": 450,
        "ID": "Gargoyle"
      },
      {
        "Name": "Gelatinous Cube",
        "CR": 2,
        "XP": 450,
        "ID": "Gelatinous_Cube"
      },
      {
        "Name": "Ghast",
        "CR": 2,
        "XP": 450,
        "ID": "Ghast"
      },
      {
        "Name": "Giant Boar",
        "CR": 2,
        "XP": 450,
        "ID": "Giant_Boar"
      },
      {
        "Name": "Giant Constrictor Snake",
        "CR": 2,
        "XP": 450,
        "ID": "Giant_Constrictor_Snake"
      },
      {
        "Name": "Giant Elk",
        "CR": 2,
        "XP": 450,
        "ID": "Giant_Elk"
      },
      {
        "Name": "Gibbering Mouther",
        "CR": 2,
        "XP": 450,
        "ID": "Gibbering_Mouther"
      },
      {
        "Name": "Githzerai Monk",
        "CR": 2,
        "XP": 450,
        "ID": "Githzerai_Monk"
      },
      {
        "Name": "Gnoll Pack Lord",
        "CR": 2,
        "XP": 450,
        "ID": "Gnoll_Pack_Lord"
      },
      {
        "Name": "Green Dragon Wyrmling",
        "CR": 2,
        "XP": 450,
        "ID": "Green_Dragon_Wyrmling"
      },
      {
        "Name": "Green Guard Drake",
        "CR": 2,
        "XP": 450,
        "ID": "Green_Guard_Drake"
      },
      {
        "Name": "Grick",
        "CR": 2,
        "XP": 450,
        "ID": "Grick"
      },
      {
        "Name": "Griffon",
        "CR": 2,
        "XP": 450,
        "ID": "Griffon"
      },
      {
        "Name": "Grung Elite Warrior",
        "CR": 2,
        "XP": 450,
        "ID": "Grung_Elite_Warrior"
      },
      {
        "Name": "Guard Drake",
        "CR": 2,
        "XP": 450,
        "ID": "Guard_Drake"
      },
      {
        "Name": "Hadozee Explorer",
        "CR": 2,
        "XP": 450,
        "ID": "Hadozee_Explorer"
      },
      {
        "Name": "Hobgoblin Iron Shadow",
        "CR": 2,
        "XP": 450,
        "ID": "Hobgoblin_Iron_Shadow"
      },
      {
        "Name": "Hunter Shark",
        "CR": 2,
        "XP": 450,
        "ID": "Hunter_Shark"
      },
      {
        "Name": "Inspired",
        "CR": 2,
        "XP": 450,
        "ID": "Inspired"
      },
      {
        "Name": "Intellect Devourer",
        "CR": 2,
        "XP": 450,
        "ID": "Intellect_Devourer"
      },
      {
        "Name": "Lizardfolk Shaman",
        "CR": 2,
        "XP": 450,
        "ID": "Lizardfolk_Shaman"
      },
      {
        "Name": "Lunar Dragon Wyrmling",
        "CR": 2,
        "XP": 450,
        "ID": "Lunar_Dragon_Wyrmling"
      },
      {
        "Name": "Meenlock",
        "CR": 2,
        "XP": 450,
        "ID": "Meenlock"
      },
      {
        "Name": "Merrow",
        "CR": 2,
        "XP": 450,
        "ID": "Merrow"
      },
      {
        "Name": "Mimic",
        "CR": 2,
        "XP": 450,
        "ID": "Mimic"
      },
      {
        "Name": "Minotaur Skeleton",
        "CR": 2,
        "XP": 450,
        "ID": "Minotaur_Skeleton"
      },
      {
        "Name": "Myconid Sovereign",
        "CR": 2,
        "XP": 450,
        "ID": "Myconid_Sovereign"
      },
      {
        "Name": "Nevermind Gnome Inventor",
        "CR": 2,
        "XP": 450,
        "ID": "Nevermind_Gnome_Inventor"
      },
      {
        "Name": "Nezznar the Black Spider",
        "CR": 2,
        "XP": 450,
        "ID": "Nezznar_the_Black_Spider"
      },
      {
        "Name": "Ochre Jelly",
        "CR": 2,
        "XP": 450,
        "ID": "Ochre_Jelly"
      },
      {
        "Name": "Ogre",
        "CR": 2,
        "XP": 450,
        "ID": "Ogre"
      },
      {
        "Name": "Ogre Bolt Launcher",
        "CR": 2,
        "XP": 450,
        "ID": "Ogre_Bolt_Launcher"
      },
      {
        "Name": "Ogre Howdah",
        "CR": 2,
        "XP": 450,
        "ID": "Ogre_Howdah"
      },
      {
        "Name": "Ogre Zombie",
        "CR": 2,
        "XP": 450,
        "ID": "Ogre_Zombie"
      },
      {
        "Name": "Orc Eye of Gruumsh",
        "CR": 2,
        "XP": 450,
        "ID": "Orc_Eye_of_Gruumsh"
      },
      {
        "Name": "Orog",
        "CR": 2,
        "XP": 450,
        "ID": "Orog"
      },
      {
        "Name": "Pegasus",
        "CR": 2,
        "XP": 450,
        "ID": "Pegasus"
      },
      {
        "Name": "Pentadrone",
        "CR": 2,
        "XP": 450,
        "ID": "Pentadrone"
      },
      {
        "Name": "Peryton",
        "CR": 2,
        "XP": 450,
        "ID": "Peryton"
      },
      {
        "Name": "Plesiosaurus",
        "CR": 2,
        "XP": 450,
        "ID": "Plesiosaurus"
      },
      {
        "Name": "Polar Bear",
        "CR": 2,
        "XP": 450,
        "ID": "Polar_Bear"
      },
      {
        "Name": "Poltergeist",
        "CR": 2,
        "XP": 450,
        "ID": "Poltergeist"
      },
      {
        "Name": "Priest",
        "CR": 2,
        "XP": 450,
        "ID": "Priest"
      },
      {
        "Name": "Psurlon",
        "CR": 2,
        "XP": 450,
        "ID": "Psurlon"
      },
      {
        "Name": "Quaggoth",
        "CR": 2,
        "XP": 450,
        "ID": "Quaggoth"
      },
      {
        "Name": "Quetzalcoatlus",
        "CR": 2,
        "XP": 450,
        "ID": "Quetzalcoatlus"
      },
      {
        "Name": "Red Guard Drake",
        "CR": 2,
        "XP": 450,
        "ID": "Red_Guard_Drake"
      },
      {
        "Name": "Rhinoceros",
        "CR": 2,
        "XP": 450,
        "ID": "Rhinoceros"
      },
      {
        "Name": "Rug of Smothering",
        "CR": 2,
        "XP": 450,
        "ID": "Rug_of_Smothering"
      },
      {
        "Name": "Rutterkin",
        "CR": 2,
        "XP": 450,
        "ID": "Rutterkin"
      },
      {
        "Name": "Saber-Toothed Tiger",
        "CR": 2,
        "XP": 450,
        "ID": "Saber-Toothed_Tiger"
      },
      {
        "Name": "Sahuagin Priestess",
        "CR": 2,
        "XP": 450,
        "ID": "Sahuagin_Priestess"
      },
      {
        "Name": "Sea Hag",
        "CR": 2,
        "XP": 450,
        "ID": "Sea_Hag"
      },
      {
        "Name": "Shadow Mastiff",
        "CR": 2,
        "XP": 450,
        "ID": "Shadow_Mastiff"
      },
      {
        "Name": "Silver Dragon Wyrmling",
        "CR": 2,
        "XP": 450,
        "ID": "Silver_Dragon_Wyrmling"
      },
      {
        "Name": "Space Clown",
        "CR": 2,
        "XP": 450,
        "ID": "Space_Clown"
      },
      {
        "Name": "Spined Devil",
        "CR": 2,
        "XP": 450,
        "ID": "Spined_Devil"
      },
      {
        "Name": "Star Lancer",
        "CR": 2,
        "XP": 450,
        "ID": "Star_Lancer"
      },
      {
        "Name": "Swarm of Poisonous Snakes",
        "CR": 2,
        "XP": 450,
        "ID": "Swarm_of_Poisonous_Snakes"
      },
      {
        "Name": "Tarkanan Assassin",
        "CR": 2,
        "XP": 450,
        "ID": "Tarkanan_Assassin"
      },
      {
        "Name": "Thri kreen Hunter",
        "CR": 2,
        "XP": 450,
        "ID": "Thri_kreen_Hunter"
      },
      {
        "Name": "Tortle Druid",
        "CR": 2,
        "XP": 450,
        "ID": "Tortle_Druid"
      },
      {
        "Name": "Undying Soldier",
        "CR": 2,
        "XP": 450,
        "ID": "Undying_Soldier"
      },
      {
        "Name": "Vampirate",
        "CR": 2,
        "XP": 450,
        "ID": "Vampirate"
      },
      {
        "Name": "Vegepygmy Chief",
        "CR": 2,
        "XP": 450,
        "ID": "Vegepygmy_Chief"
      },
      {
        "Name": "Wererat",
        "CR": 2,
        "XP": 450,
        "ID": "Wererat"
      },
      {
        "Name": "White Dragon Wyrmling",
        "CR": 2,
        "XP": 450,
        "ID": "White_Dragon_Wyrmling"
      },
      {
        "Name": "White Guard Drake",
        "CR": 2,
        "XP": 450,
        "ID": "White_Guard_Drake"
      },
      {
        "Name": "Will-o-Wisp",
        "CR": 2,
        "XP": 450,
        "ID": "Will-o-Wisp"
      },
      {
        "Name": "Yuan ti Broodguard",
        "CR": 2,
        "XP": 450,
        "ID": "Yuan_ti_Broodguard"
      },
      {
        "Name": "Aartuk Elder",
        "CR": 3,
        "XP": 700,
        "ID": "Aartuk_Elder"
      },
      {
        "Name": "Archer",
        "CR": 3,
        "XP": 700,
        "ID": "Archer"
      },
      {
        "Name": "Astral Elf Warrior",
        "CR": 3,
        "XP": 700,
        "ID": "Astral_Elf_Warrior"
      },
      {
        "Name": "Basilisk",
        "CR": 3,
        "XP": 700,
        "ID": "Basilisk"
      },
      {
        "Name": "Bearded Devil",
        "CR": 3,
        "XP": 700,
        "ID": "Bearded_Devil"
      },
      {
        "Name": "Bearded Devil",
        "CR": 3,
        "XP": 700,
        "ID": "Bearded_Devil"
      },
      {
        "Name": "Blue Dragon Wyrmling",
        "CR": 3,
        "XP": 700,
        "ID": "Blue_Dragon_Wyrmling"
      },
      {
        "Name": "Bugbear Chief",
        "CR": 3,
        "XP": 700,
        "ID": "Bugbear_Chief"
      },
      {
        "Name": "Bulezau",
        "CR": 3,
        "XP": 700,
        "ID": "Bulezau"
      },
      {
        "Name": "Cave Fisher",
        "CR": 3,
        "XP": 700,
        "ID": "Cave_Fisher"
      },
      {
        "Name": "Choldrith",
        "CR": 3,
        "XP": 700,
        "ID": "Choldrith"
      },
      {
        "Name": "Deathlock Wight",
        "CR": 3,
        "XP": 700,
        "ID": "Deathlock_Wight"
      },
      {
        "Name": "Deep Scion",
        "CR": 3,
        "XP": 700,
        "ID": "Deep_Scion"
      },
      {
        "Name": "Derro Savant",
        "CR": 3,
        "XP": 700,
        "ID": "Derro_Savant"
      },
      {
        "Name": "Displacer Beast",
        "CR": 3,
        "XP": 700,
        "ID": "Displacer_Beast"
      },
      {
        "Name": "Dolgaunt",
        "CR": 3,
        "XP": 700,
        "ID": "Dolgaunt"
      },
      {
        "Name": "Dolphin Delighter",
        "CR": 3,
        "XP": 700,
        "ID": "Dolphin_Delighter"
      },
      {
        "Name": "Doppelganger",
        "CR": 3,
        "XP": 700,
        "ID": "Doppelganger"
      },
      {
        "Name": "Duergar Screamer",
        "CR": 3,
        "XP": 700,
        "ID": "Duergar_Screamer"
      },
      {
        "Name": "Flail Snail",
        "CR": 3,
        "XP": 700,
        "ID": "Flail_Snail"
      },
      {
        "Name": "Giant Scorpion",
        "CR": 3,
        "XP": 700,
        "ID": "Giant_Scorpion"
      },
      {
        "Name": "Giff",
        "CR": 3,
        "XP": 700,
        "ID": "Giff"
      },
      {
        "Name": "Giff Shipmate",
        "CR": 3,
        "XP": 700,
        "ID": "Giff_Shipmate"
      },
      {
        "Name": "Githyanki Buccaneer",
        "CR": 3,
        "XP": 700,
        "ID": "Githyanki_Buccaneer"
      },
      {
        "Name": "Githyanki Warrior",
        "CR": 3,
        "XP": 700,
        "ID": "Githyanki_Warrior"
      },
      {
        "Name": "Gold Dragon Wyrmling",
        "CR": 3,
        "XP": 700,
        "ID": "Gold_Dragon_Wyrmling"
      },
      {
        "Name": "Green Hag",
        "CR": 3,
        "XP": 700,
        "ID": "Green_Hag"
      },
      {
        "Name": "Grell",
        "CR": 3,
        "XP": 700,
        "ID": "Grell"
      },
      {
        "Name": "Hell Hound",
        "CR": 3,
        "XP": 700,
        "ID": "Hell_Hound"
      },
      {
        "Name": "Hobgoblin Captain",
        "CR": 3,
        "XP": 700,
        "ID": "Hobgoblin_Captain"
      },
      {
        "Name": "Hook Horror",
        "CR": 3,
        "XP": 700,
        "ID": "Hook_Horror"
      },
      {
        "Name": "Illusionist Wizard",
        "CR": 3,
        "XP": 700,
        "ID": "Illusionist_Wizard"
      },
      {
        "Name": "Karrnathi Undead Soldier",
        "CR": 3,
        "XP": 700,
        "ID": "Karrnathi_Undead_Soldier"
      },
      {
        "Name": "Killer Whale",
        "CR": 3,
        "XP": 700,
        "ID": "Killer_Whale"
      },
      {
        "Name": "Knight",
        "CR": 3,
        "XP": 700,
        "ID": "Knight"
      },
      {
        "Name": "Kuo toa Monitor",
        "CR": 3,
        "XP": 700,
        "ID": "Kuo_toa_Monitor"
      },
      {
        "Name": "Leucrotta",
        "CR": 3,
        "XP": 700,
        "ID": "Leucrotta"
      },
      {
        "Name": "Manticore",
        "CR": 3,
        "XP": 700,
        "ID": "Manticore"
      },
      {
        "Name": "Martial Arts Adept",
        "CR": 3,
        "XP": 700,
        "ID": "Martial_Arts_Adept"
      },
      {
        "Name": "Merrenoloth",
        "CR": 3,
        "XP": 700,
        "ID": "Merrenoloth"
      },
      {
        "Name": "Minotaur",
        "CR": 3,
        "XP": 700,
        "ID": "Minotaur"
      },
      {
        "Name": "Mormesk the Wraith",
        "CR": 3,
        "XP": 700,
        "ID": "Mormesk_the_Wraith"
      },
      {
        "Name": "Mummy",
        "CR": 3,
        "XP": 700,
        "ID": "Mummy"
      },
      {
        "Name": "Neogi",
        "CR": 3,
        "XP": 700,
        "ID": "Neogi"
      },
      {
        "Name": "Neogi Hatchling Swarm",
        "CR": 3,
        "XP": 700,
        "ID": "Neogi_Hatchling_Swarm"
      },
      {
        "Name": "Neogi Pirate",
        "CR": 3,
        "XP": 700,
        "ID": "Neogi_Pirate"
      },
      {
        "Name": "Nightmare",
        "CR": 3,
        "XP": 700,
        "ID": "Nightmare"
      },
      {
        "Name": "Ogre Chain Brute",
        "CR": 3,
        "XP": 700,
        "ID": "Ogre_Chain_Brute"
      },
      {
        "Name": "Owlbear",
        "CR": 3,
        "XP": 700,
        "ID": "Owlbear"
      },
      {
        "Name": "Phase Spider",
        "CR": 3,
        "XP": 700,
        "ID": "Phase_Spider"
      },
      {
        "Name": "Plasmoid Warrior",
        "CR": 3,
        "XP": 700,
        "ID": "Plasmoid_Warrior"
      },
      {
        "Name": "Puppeteer Parasite",
        "CR": 3,
        "XP": 700,
        "ID": "Puppeteer_Parasite"
      },
      {
        "Name": "Quaggoth Thonot",
        "CR": 3,
        "XP": 700,
        "ID": "Quaggoth_Thonot"
      },
      {
        "Name": "Redcap",
        "CR": 3,
        "XP": 700,
        "ID": "Redcap"
      },
      {
        "Name": "Slithering Tracker",
        "CR": 3,
        "XP": 700,
        "ID": "Slithering_Tracker"
      },
      {
        "Name": "Solar Dragon Wyrmling",
        "CR": 3,
        "XP": 700,
        "ID": "Solar_Dragon_Wyrmling"
      },
      {
        "Name": "Ssurran Defiler",
        "CR": 3,
        "XP": 700,
        "ID": "Ssurran_Defiler"
      },
      {
        "Name": "Swashbuckler",
        "CR": 3,
        "XP": 700,
        "ID": "Swashbuckler"
      },
      {
        "Name": "Sword Wraith Warrior",
        "CR": 3,
        "XP": 700,
        "ID": "Sword_Wraith_Warrior"
      },
      {
        "Name": "Trapper",
        "CR": 3,
        "XP": 700,
        "ID": "Trapper"
      },
      {
        "Name": "Vampiric Mist",
        "CR": 3,
        "XP": 700,
        "ID": "Vampiric_Mist"
      },
      {
        "Name": "Veteran",
        "CR": 3,
        "XP": 700,
        "ID": "Veteran"
      },
      {
        "Name": "Water Weird",
        "CR": 3,
        "XP": 700,
        "ID": "Water_Weird"
      },
      {
        "Name": "Werewolf",
        "CR": 3,
        "XP": 700,
        "ID": "Werewolf"
      },
      {
        "Name": "Wight",
        "CR": 3,
        "XP": 700,
        "ID": "Wight"
      },
      {
        "Name": "Winter Wolf",
        "CR": 3,
        "XP": 700,
        "ID": "Winter_Wolf"
      },
      {
        "Name": "Yuan ti Malison",
        "CR": 3,
        "XP": 700,
        "ID": "Yuan_ti_Malison"
      },
      {
        "Name": "Agony the Ghost",
        "CR": 4,
        "XP": 1100,
        "ID": "Agony_the_Ghost"
      },
      {
        "Name": "Babau",
        "CR": 4,
        "XP": 1100,
        "ID": "Babau"
      },
      {
        "Name": "Barghest",
        "CR": 4,
        "XP": 1100,
        "ID": "Barghest"
      },
      {
        "Name": "Black Pudding",
        "CR": 4,
        "XP": 1100,
        "ID": "Black_Pudding"
      },
      {
        "Name": "Bone Naga",
        "CR": 4,
        "XP": 1100,
        "ID": "Bone_Naga"
      },
      {
        "Name": "Brown Scavver",
        "CR": 4,
        "XP": 1100,
        "ID": "Brown_Scavver"
      },
      {
        "Name": "Chuul",
        "CR": 4,
        "XP": 1100,
        "ID": "Chuul"
      },
      {
        "Name": "Clockwork Iron Cobra",
        "CR": 4,
        "XP": 1100,
        "ID": "Clockwork_Iron_Cobra"
      },
      {
        "Name": "Clockwork Stone Defender",
        "CR": 4,
        "XP": 1100,
        "ID": "Clockwork_Stone_Defender"
      },
      {
        "Name": "Couatl",
        "CR": 4,
        "XP": 1100,
        "ID": "Couatl"
      },
      {
        "Name": "Deathlock",
        "CR": 4,
        "XP": 1100,
        "ID": "Deathlock"
      },
      {
        "Name": "Dybbuk",
        "CR": 4,
        "XP": 1100,
        "ID": "Dybbuk"
      },
      {
        "Name": "Elephant",
        "CR": 4,
        "XP": 1100,
        "ID": "Elephant"
      },
      {
        "Name": "Ettin",
        "CR": 4,
        "XP": 1100,
        "ID": "Ettin"
      },
      {
        "Name": "Gaj",
        "CR": 4,
        "XP": 1100,
        "ID": "Gaj"
      },
      {
        "Name": "Ghost",
        "CR": 4,
        "XP": 1100,
        "ID": "Ghost"
      },
      {
        "Name": "Girallon",
        "CR": 4,
        "XP": 1100,
        "ID": "Girallon"
      },
      {
        "Name": "Gnoll Fang of Yeenoghu",
        "CR": 4,
        "XP": 1100,
        "ID": "Gnoll_Fang_of_Yeenoghu"
      },
      {
        "Name": "Helmed Horror",
        "CR": 4,
        "XP": 1100,
        "ID": "Helmed_Horror"
      },
      {
        "Name": "Hobgoblin Devastator",
        "CR": 4,
        "XP": 1100,
        "ID": "Hobgoblin_Devastator"
      },
      {
        "Name": "Irda Veil Keeper",
        "CR": 4,
        "XP": 1100,
        "ID": "Irda_Veil_Keeper"
      },
      {
        "Name": "Lamia",
        "CR": 4,
        "XP": 1100,
        "ID": "Lamia"
      },
      {
        "Name": "Lizard King",
        "CR": 4,
        "XP": 1100,
        "ID": "Lizard_King"
      },
      {
        "Name": "Merregon",
        "CR": 4,
        "XP": 1100,
        "ID": "Merregon"
      },
      {
        "Name": "Neh thalggu",
        "CR": 4,
        "XP": 1100,
        "ID": "Neh_thalggu"
      },
      {
        "Name": "Neogi Master",
        "CR": 4,
        "XP": 1100,
        "ID": "Neogi_Master"
      },
      {
        "Name": "Neogi Void Hunter",
        "CR": 4,
        "XP": 1100,
        "ID": "Neogi_Void_Hunter"
      },
      {
        "Name": "Ogre Battering Ram",
        "CR": 4,
        "XP": 1100,
        "ID": "Ogre_Battering_Ram"
      },
      {
        "Name": "Orc War Chief",
        "CR": 4,
        "XP": 1100,
        "ID": "Orc_War_Chief"
      },
      {
        "Name": "Plasmoid Boss",
        "CR": 4,
        "XP": 1100,
        "ID": "Plasmoid_Boss"
      },
      {
        "Name": "Red Dragon Wyrmling",
        "CR": 4,
        "XP": 1100,
        "ID": "Red_Dragon_Wyrmling"
      },
      {
        "Name": "Sea Hag",
        "CR": 4,
        "XP": 1100,
        "ID": "Sea_Hag"
      },
      {
        "Name": "Shadow Demon",
        "CR": 4,
        "XP": 1100,
        "ID": "Shadow_Demon"
      },
      {
        "Name": "Stegosaurus",
        "CR": 4,
        "XP": 1100,
        "ID": "Stegosaurus"
      },
      {
        "Name": "Succubus",
        "CR": 4,
        "XP": 1100,
        "ID": "Succubus"
      },
      {
        "Name": "Warlock of the Archfey",
        "CR": 4,
        "XP": 1100,
        "ID": "Warlock_of_the_Archfey"
      },
      {
        "Name": "Wereboar",
        "CR": 4,
        "XP": 1100,
        "ID": "Wereboar"
      },
      {
        "Name": "Weretiger",
        "CR": 4,
        "XP": 1100,
        "ID": "Weretiger"
      },
      {
        "Name": "Yeth Hound",
        "CR": 4,
        "XP": 1100,
        "ID": "Yeth_Hound"
      },
      {
        "Name": "Yuan ti Mind Whisperer",
        "CR": 4,
        "XP": 1100,
        "ID": "Yuan_ti_Mind_Whisperer"
      },
      {
        "Name": "Yuan ti Nightmare Speaker",
        "CR": 4,
        "XP": 1100,
        "ID": "Yuan_ti_Nightmare_Speaker"
      },
      {
        "Name": "Adult Oblex",
        "CR": 5,
        "XP": 1800,
        "ID": "Adult_Oblex"
      },
      {
        "Name": "Air Elemental",
        "CR": 5,
        "XP": 1800,
        "ID": "Air_Elemental"
      },
      {
        "Name": "Allip",
        "CR": 5,
        "XP": 1800,
        "ID": "Allip"
      },
      {
        "Name": "Astral Elf Honor Guard",
        "CR": 5,
        "XP": 1800,
        "ID": "Astral_Elf_Honor_Guard"
      },
      {
        "Name": "Astral Elf Star Priest",
        "CR": 5,
        "XP": 1800,
        "ID": "Astral_Elf_Star_Priest"
      },
      {
        "Name": "Banderhobb",
        "CR": 5,
        "XP": 1800,
        "ID": "Banderhobb"
      },
      {
        "Name": "Barbed Devil",
        "CR": 5,
        "XP": 1800,
        "ID": "Barbed_Devil"
      },
      {
        "Name": "Barbed Devil",
        "CR": 5,
        "XP": 1800,
        "ID": "Barbed_Devil"
      },
      {
        "Name": "Barlgura",
        "CR": 5,
        "XP": 1800,
        "ID": "Barlgura"
      },
      {
        "Name": "Beholder Zombie",
        "CR": 5,
        "XP": 1800,
        "ID": "Beholder_Zombie"
      },
      {
        "Name": "Bone Knight",
        "CR": 5,
        "XP": 1800,
        "ID": "Bone_Knight"
      },
      {
        "Name": "Brontosaurus",
        "CR": 5,
        "XP": 1800,
        "ID": "Brontosaurus"
      },
      {
        "Name": "Bulette",
        "CR": 5,
        "XP": 1800,
        "ID": "Bulette"
      },
      {
        "Name": "Cambion",
        "CR": 5,
        "XP": 1800,
        "ID": "Cambion"
      },
      {
        "Name": "Catoblepas",
        "CR": 5,
        "XP": 1800,
        "ID": "Catoblepas"
      },
      {
        "Name": "Clockwork Oaken Bolter",
        "CR": 5,
        "XP": 1800,
        "ID": "Clockwork_Oaken_Bolter"
      },
      {
        "Name": "Doric",
        "CR": 5,
        "XP": 1800,
        "ID": "Doric"
      },
      {
        "Name": "Drow Elite Warrior",
        "CR": 5,
        "XP": 1800,
        "ID": "Drow_Elite_Warrior"
      },
      {
        "Name": "Earth Elemental",
        "CR": 5,
        "XP": 1800,
        "ID": "Earth_Elemental"
      },
      {
        "Name": "Edgin Darvis",
        "CR": 5,
        "XP": 1800,
        "ID": "Edgin_Darvis"
      },
      {
        "Name": "Enchanter Wizard",
        "CR": 5,
        "XP": 1800,
        "ID": "Enchanter_Wizard"
      },
      {
        "Name": "Feyr",
        "CR": 5,
        "XP": 1800,
        "ID": "Feyr"
      },
      {
        "Name": "Fire Elemental",
        "CR": 5,
        "XP": 1800,
        "ID": "Fire_Elemental"
      },
      {
        "Name": "Flesh Golem",
        "CR": 5,
        "XP": 1800,
        "ID": "Flesh_Golem"
      },
      {
        "Name": "Giant Crocodile",
        "CR": 5,
        "XP": 1800,
        "ID": "Giant_Crocodile"
      },
      {
        "Name": "Giant Shark",
        "CR": 5,
        "XP": 1800,
        "ID": "Giant_Shark"
      },
      {
        "Name": "Gladiator",
        "CR": 5,
        "XP": 1800,
        "ID": "Gladiator"
      },
      {
        "Name": "Gorgon",
        "CR": 5,
        "XP": 1800,
        "ID": "Gorgon"
      },
      {
        "Name": "Green Hag",
        "CR": 5,
        "XP": 1800,
        "ID": "Green_Hag"
      },
      {
        "Name": "Half-Red Dragon Veteran",
        "CR": 5,
        "XP": 1800,
        "ID": "Half-Red_Dragon_Veteran"
      },
      {
        "Name": "Hill Giant",
        "CR": 5,
        "XP": 1800,
        "ID": "Hill_Giant"
      },
      {
        "Name": "Holga Kilgore",
        "CR": 5,
        "XP": 1800,
        "ID": "Holga_Kilgore"
      },
      {
        "Name": "Kraken Priest",
        "CR": 5,
        "XP": 1800,
        "ID": "Kraken_Priest"
      },
      {
        "Name": "Kruthik Hive Lord",
        "CR": 5,
        "XP": 1800,
        "ID": "Kruthik_Hive_Lord"
      },
      {
        "Name": "Living Lightning Bolt",
        "CR": 5,
        "XP": 1800,
        "ID": "Living_Lightning_Bolt"
      },
      {
        "Name": "Master Thief",
        "CR": 5,
        "XP": 1800,
        "ID": "Master_Thief"
      },
      {
        "Name": "Mercane",
        "CR": 5,
        "XP": 1800,
        "ID": "Mercane"
      },
      {
        "Name": "Mezzoloth",
        "CR": 5,
        "XP": 1800,
        "ID": "Mezzoloth"
      },
      {
        "Name": "Mindwitness",
        "CR": 5,
        "XP": 1800,
        "ID": "Mindwitness"
      },
      {
        "Name": "Murder Comet",
        "CR": 5,
        "XP": 1800,
        "ID": "Murder_Comet"
      },
      {
        "Name": "Nevermind Gnome Mastermind",
        "CR": 5,
        "XP": 1800,
        "ID": "Nevermind_Gnome_Mastermind"
      },
      {
        "Name": "Night Hag",
        "CR": 5,
        "XP": 1800,
        "ID": "Night_Hag"
      },
      {
        "Name": "Night Scavver",
        "CR": 5,
        "XP": 1800,
        "ID": "Night_Scavver"
      },
      {
        "Name": "Otyugh",
        "CR": 5,
        "XP": 1800,
        "ID": "Otyugh"
      },
      {
        "Name": "Prisoner 13",
        "CR": 5,
        "XP": 1800,
        "ID": "Prisoner_13"
      },
      {
        "Name": "Red Slaad",
        "CR": 5,
        "XP": 1800,
        "ID": "Red_Slaad"
      },
      {
        "Name": "Revenant",
        "CR": 5,
        "XP": 1800,
        "ID": "Revenant"
      },
      {
        "Name": "Roper",
        "CR": 5,
        "XP": 1800,
        "ID": "Roper"
      },
      {
        "Name": "Sahuagin Baron",
        "CR": 5,
        "XP": 1800,
        "ID": "Sahuagin_Baron"
      },
      {
        "Name": "Salamander",
        "CR": 5,
        "XP": 1800,
        "ID": "Salamander"
      },
      {
        "Name": "Shambling Mound",
        "CR": 5,
        "XP": 1800,
        "ID": "Shambling_Mound"
      },
      {
        "Name": "Simon Aumar",
        "CR": 5,
        "XP": 1800,
        "ID": "Simon_Aumar"
      },
      {
        "Name": "Spawn of Kyuss",
        "CR": 5,
        "XP": 1800,
        "ID": "Spawn_of_Kyuss"
      },
      {
        "Name": "Star Spawn Mangler",
        "CR": 5,
        "XP": 1800,
        "ID": "Star_Spawn_Mangler"
      },
      {
        "Name": "Starlight Apparition",
        "CR": 5,
        "XP": 1800,
        "ID": "Starlight_Apparition"
      },
      {
        "Name": "Swarm of Cranium Rats",
        "CR": 5,
        "XP": 1800,
        "ID": "Swarm_of_Cranium_Rats"
      },
      {
        "Name": "Tanarukk",
        "CR": 5,
        "XP": 1800,
        "ID": "Tanarukk"
      },
      {
        "Name": "Thri kreen Mystic",
        "CR": 5,
        "XP": 1800,
        "ID": "Thri_kreen_Mystic"
      },
      {
        "Name": "Tlincalli",
        "CR": 5,
        "XP": 1800,
        "ID": "Tlincalli"
      },
      {
        "Name": "Traag Draconian",
        "CR": 5,
        "XP": 1800,
        "ID": "Traag_Draconian"
      },
      {
        "Name": "Transmuter Wizard",
        "CR": 5,
        "XP": 1800,
        "ID": "Transmuter_Wizard"
      },
      {
        "Name": "Triceratops",
        "CR": 5,
        "XP": 1800,
        "ID": "Triceratops"
      },
      {
        "Name": "Troll",
        "CR": 5,
        "XP": 1800,
        "ID": "Troll"
      },
      {
        "Name": "Troll",
        "CR": 5,
        "XP": 1800,
        "ID": "Troll"
      },
      {
        "Name": "Umber Hulk",
        "CR": 5,
        "XP": 1800,
        "ID": "Umber_Hulk"
      },
      {
        "Name": "Unicorn",
        "CR": 5,
        "XP": 1800,
        "ID": "Unicorn"
      },
      {
        "Name": "Vampirate Mage",
        "CR": 5,
        "XP": 1800,
        "ID": "Vampirate_Mage"
      },
      {
        "Name": "Vampire Spawn",
        "CR": 5,
        "XP": 1800,
        "ID": "Vampire_Spawn"
      },
      {
        "Name": "Water Elemental",
        "CR": 5,
        "XP": 1800,
        "ID": "Water_Elemental"
      },
      {
        "Name": "Werebear",
        "CR": 5,
        "XP": 1800,
        "ID": "Werebear"
      },
      {
        "Name": "Wood Woad",
        "CR": 5,
        "XP": 1800,
        "ID": "Wood_Woad"
      },
      {
        "Name": "Wraith",
        "CR": 5,
        "XP": 1800,
        "ID": "Wraith"
      },
      {
        "Name": "Xorn",
        "CR": 5,
        "XP": 1800,
        "ID": "Xorn"
      },
      {
        "Name": "Young Remorhaz",
        "CR": 5,
        "XP": 1800,
        "ID": "Young_Remorhaz"
      },
      {
        "Name": "Yuan ti Pit Master",
        "CR": 5,
        "XP": 1800,
        "ID": "Yuan_ti_Pit_Master"
      },
      {
        "Name": "Zakya Rakshasa",
        "CR": 5,
        "XP": 1800,
        "ID": "Zakya_Rakshasa"
      },
      {
        "Name": "Annis Hag",
        "CR": 6,
        "XP": 2300,
        "ID": "Annis_Hag"
      },
      {
        "Name": "B rohg",
        "CR": 6,
        "XP": 2300,
        "ID": "B_rohg"
      },
      {
        "Name": "Bodak",
        "CR": 6,
        "XP": 2300,
        "ID": "Bodak"
      },
      {
        "Name": "Chasme",
        "CR": 6,
        "XP": 2300,
        "ID": "Chasme"
      },
      {
        "Name": "Chimera",
        "CR": 6,
        "XP": 2300,
        "ID": "Chimera"
      },
      {
        "Name": "Conjurer Wizard",
        "CR": 6,
        "XP": 2300,
        "ID": "Conjurer_Wizard"
      },
      {
        "Name": "Drider",
        "CR": 6,
        "XP": 2300,
        "ID": "Drider"
      },
      {
        "Name": "Drider",
        "CR": 6,
        "XP": 2300,
        "ID": "Drider"
      },
      {
        "Name": "Duergar Warlord",
        "CR": 6,
        "XP": 2300,
        "ID": "Duergar_Warlord"
      },
      {
        "Name": "Dusk Hag",
        "CR": 6,
        "XP": 2300,
        "ID": "Dusk_Hag"
      },
      {
        "Name": "Foresworn",
        "CR": 6,
        "XP": 2300,
        "ID": "Foresworn"
      },
      {
        "Name": "Galeb Duhr",
        "CR": 6,
        "XP": 2300,
        "ID": "Galeb_Duhr"
      },
      {
        "Name": "Gauth",
        "CR": 6,
        "XP": 2300,
        "ID": "Gauth"
      },
      {
        "Name": "Giff Shock Trooper",
        "CR": 6,
        "XP": 2300,
        "ID": "Giff_Shock_Trooper"
      },
      {
        "Name": "Githzerai Zerth",
        "CR": 6,
        "XP": 2300,
        "ID": "Githzerai_Zerth"
      },
      {
        "Name": "Hobgoblin Warlord",
        "CR": 6,
        "XP": 2300,
        "ID": "Hobgoblin_Warlord"
      },
      {
        "Name": "Invisible Stalker",
        "CR": 6,
        "XP": 2300,
        "ID": "Invisible_Stalker"
      },
      {
        "Name": "Kuo toa Archpriest",
        "CR": 6,
        "XP": 2300,
        "ID": "Kuo_toa_Archpriest"
      },
      {
        "Name": "Mage",
        "CR": 6,
        "XP": 2300,
        "ID": "Mage"
      },
      {
        "Name": "Mammoth",
        "CR": 6,
        "XP": 2300,
        "ID": "Mammoth"
      },
      {
        "Name": "Medusa",
        "CR": 6,
        "XP": 2300,
        "ID": "Medusa"
      },
      {
        "Name": "Mouth of Grolantor",
        "CR": 6,
        "XP": 2300,
        "ID": "Mouth_of_Grolantor"
      },
      {
        "Name": "Psurlon Leader",
        "CR": 6,
        "XP": 2300,
        "ID": "Psurlon_Leader"
      },
      {
        "Name": "Vampirate Captian",
        "CR": 6,
        "XP": 2300,
        "ID": "Vampirate_Captian"
      },
      {
        "Name": "Vrock",
        "CR": 6,
        "XP": 2300,
        "ID": "Vrock"
      },
      {
        "Name": "Vrock",
        "CR": 6,
        "XP": 2300,
        "ID": "Vrock"
      },
      {
        "Name": "Warlock of the Great Old One",
        "CR": 6,
        "XP": 2300,
        "ID": "Warlock_of_the_Great_Old_One"
      },
      {
        "Name": "White Abishai",
        "CR": 6,
        "XP": 2300,
        "ID": "White_Abishai"
      },
      {
        "Name": "Wyvern",
        "CR": 6,
        "XP": 2300,
        "ID": "Wyvern"
      },
      {
        "Name": "Young Brass Dragon",
        "CR": 6,
        "XP": 2300,
        "ID": "Young_Brass_Dragon"
      },
      {
        "Name": "Young White Dragon",
        "CR": 6,
        "XP": 2300,
        "ID": "Young_White_Dragon"
      },
      {
        "Name": "Air Elemental Myrmidon",
        "CR": 7,
        "XP": 2900,
        "ID": "Air_Elemental_Myrmidon"
      },
      {
        "Name": "Armanite",
        "CR": 7,
        "XP": 2900,
        "ID": "Armanite"
      },
      {
        "Name": "Astral Elf Commander",
        "CR": 7,
        "XP": 2900,
        "ID": "Astral_Elf_Commander"
      },
      {
        "Name": "Bheur Hag",
        "CR": 7,
        "XP": 2900,
        "ID": "Bheur_Hag"
      },
      {
        "Name": "Black Abishai",
        "CR": 7,
        "XP": 2900,
        "ID": "Black_Abishai"
      },
      {
        "Name": "Blue Slaad",
        "CR": 7,
        "XP": 2900,
        "ID": "Blue_Slaad"
      },
      {
        "Name": "Dhergoloth",
        "CR": 7,
        "XP": 2900,
        "ID": "Dhergoloth"
      },
      {
        "Name": "Draegloth",
        "CR": 7,
        "XP": 2900,
        "ID": "Draegloth"
      },
      {
        "Name": "Dream Eater",
        "CR": 7,
        "XP": 2900,
        "ID": "Dream_Eater"
      },
      {
        "Name": "Drow Mage",
        "CR": 7,
        "XP": 2900,
        "ID": "Drow_Mage"
      },
      {
        "Name": "Earth Elemental Myrmidon",
        "CR": 7,
        "XP": 2900,
        "ID": "Earth_Elemental_Myrmidon"
      },
      {
        "Name": "Fire Elemental Myrmidon",
        "CR": 7,
        "XP": 2900,
        "ID": "Fire_Elemental_Myrmidon"
      },
      {
        "Name": "Giant Ape",
        "CR": 7,
        "XP": 2900,
        "ID": "Giant_Ape"
      },
      {
        "Name": "Githyanki Star Seer",
        "CR": 7,
        "XP": 2900,
        "ID": "Githyanki_Star_Seer"
      },
      {
        "Name": "Grick Alpha",
        "CR": 7,
        "XP": 2900,
        "ID": "Grick_Alpha"
      },
      {
        "Name": "Kindori",
        "CR": 7,
        "XP": 2900,
        "ID": "Kindori"
      },
      {
        "Name": "Korred",
        "CR": 7,
        "XP": 2900,
        "ID": "Korred"
      },
      {
        "Name": "Living Cloudkill",
        "CR": 7,
        "XP": 2900,
        "ID": "Living_Cloudkill"
      },
      {
        "Name": "Lost Sorrowsworn",
        "CR": 7,
        "XP": 2900,
        "ID": "Lost_Sorrowsworn"
      },
      {
        "Name": "Maurezhi",
        "CR": 7,
        "XP": 2900,
        "ID": "Maurezhi"
      },
      {
        "Name": "Mind Flayer",
        "CR": 7,
        "XP": 2900,
        "ID": "Mind_Flayer"
      },
      {
        "Name": "Night Hag",
        "CR": 7,
        "XP": 2900,
        "ID": "Night_Hag"
      },
      {
        "Name": "Oni",
        "CR": 7,
        "XP": 2900,
        "ID": "Oni"
      },
      {
        "Name": "Shadar kai Shadow Dancer",
        "CR": 7,
        "XP": 2900,
        "ID": "Shadar_kai_Shadow_Dancer"
      },
      {
        "Name": "Shield Guardian",
        "CR": 7,
        "XP": 2900,
        "ID": "Shield_Guardian"
      },
      {
        "Name": "Stone Giant",
        "CR": 7,
        "XP": 2900,
        "ID": "Stone_Giant"
      },
      {
        "Name": "Thri kreen Gladiator",
        "CR": 7,
        "XP": 2900,
        "ID": "Thri_kreen_Gladiator"
      },
      {
        "Name": "Tsucora Quori",
        "CR": 7,
        "XP": 2900,
        "ID": "Tsucora_Quori"
      },
      {
        "Name": "Venom Troll",
        "CR": 7,
        "XP": 2900,
        "ID": "Venom_Troll"
      },
      {
        "Name": "Warlock of the Fiend",
        "CR": 7,
        "XP": 2900,
        "ID": "Warlock_of_the_Fiend"
      },
      {
        "Name": "Water Elemental Myrmidon",
        "CR": 7,
        "XP": 2900,
        "ID": "Water_Elemental_Myrmidon"
      },
      {
        "Name": "Yggdrasti",
        "CR": 7,
        "XP": 2900,
        "ID": "Yggdrasti"
      },
      {
        "Name": "Young Black Dragon",
        "CR": 7,
        "XP": 2900,
        "ID": "Young_Black_Dragon"
      },
      {
        "Name": "Young Copper Dragon",
        "CR": 7,
        "XP": 2900,
        "ID": "Young_Copper_Dragon"
      },
      {
        "Name": "Young Lunar Dragon",
        "CR": 7,
        "XP": 2900,
        "ID": "Young_Lunar_Dragon"
      },
      {
        "Name": "Yuan ti Abomination",
        "CR": 7,
        "XP": 2900,
        "ID": "Yuan_ti_Abomination"
      },
      {
        "Name": "Assassin",
        "CR": 8,
        "XP": 3900,
        "ID": "Assassin"
      },
      {
        "Name": "Astral Elf Aristocrat",
        "CR": 8,
        "XP": 3900,
        "ID": "Astral_Elf_Aristocrat"
      },
      {
        "Name": "Blackguard",
        "CR": 8,
        "XP": 3900,
        "ID": "Blackguard"
      },
      {
        "Name": "Canoloth",
        "CR": 8,
        "XP": 3900,
        "ID": "Canoloth"
      },
      {
        "Name": "Chain Devil",
        "CR": 8,
        "XP": 3900,
        "ID": "Chain_Devil"
      },
      {
        "Name": "Cloaker",
        "CR": 8,
        "XP": 3900,
        "ID": "Cloaker"
      },
      {
        "Name": "Corpse Flower",
        "CR": 8,
        "XP": 3900,
        "ID": "Corpse_Flower"
      },
      {
        "Name": "Deathlock Mastermind",
        "CR": 8,
        "XP": 3900,
        "ID": "Deathlock_Mastermind"
      },
      {
        "Name": "Diviner Wizard",
        "CR": 8,
        "XP": 3900,
        "ID": "Diviner_Wizard"
      },
      {
        "Name": "Drow Priestess of Lolth",
        "CR": 8,
        "XP": 3900,
        "ID": "Drow_Priestess_of_Lolth"
      },
      {
        "Name": "Fomorian",
        "CR": 8,
        "XP": 3900,
        "ID": "Fomorian"
      },
      {
        "Name": "Forest Master",
        "CR": 8,
        "XP": 3900,
        "ID": "Forest_Master"
      },
      {
        "Name": "Forge Fitzwilliam",
        "CR": 8,
        "XP": 3900,
        "ID": "Forge_Fitzwilliam"
      },
      {
        "Name": "Frost Giant",
        "CR": 8,
        "XP": 3900,
        "ID": "Frost_Giant"
      },
      {
        "Name": "Githyanki Knight",
        "CR": 8,
        "XP": 3900,
        "ID": "Githyanki_Knight"
      },
      {
        "Name": "Green Slaad",
        "CR": 8,
        "XP": 3900,
        "ID": "Green_Slaad"
      },
      {
        "Name": "Hezrou",
        "CR": 8,
        "XP": 3900,
        "ID": "Hezrou"
      },
      {
        "Name": "Hezrou",
        "CR": 8,
        "XP": 3900,
        "ID": "Hezrou"
      },
      {
        "Name": "Howler",
        "CR": 8,
        "XP": 3900,
        "ID": "Howler"
      },
      {
        "Name": "Hydra",
        "CR": 8,
        "XP": 3900,
        "ID": "Hydra"
      },
      {
        "Name": "Mind Flayer Arcanist",
        "CR": 8,
        "XP": 3900,
        "ID": "Mind_Flayer_Arcanist"
      },
      {
        "Name": "Reigar",
        "CR": 8,
        "XP": 3900,
        "ID": "Reigar"
      },
      {
        "Name": "Shoosuva",
        "CR": 8,
        "XP": 3900,
        "ID": "Shoosuva"
      },
      {
        "Name": "Spirit Naga",
        "CR": 8,
        "XP": 3900,
        "ID": "Spirit_Naga"
      },
      {
        "Name": "Sword Wraith Commander",
        "CR": 8,
        "XP": 3900,
        "ID": "Sword_Wraith_Commander"
      },
      {
        "Name": "Tyrannosaurus Rex",
        "CR": 8,
        "XP": 3900,
        "ID": "Tyrannosaurus_Rex"
      },
      {
        "Name": "Warforged Titan",
        "CR": 8,
        "XP": 3900,
        "ID": "Warforged_Titan"
      },
      {
        "Name": "Young Bronze Dragon",
        "CR": 8,
        "XP": 3900,
        "ID": "Young_Bronze_Dragon"
      },
      {
        "Name": "Young Green Dragon",
        "CR": 8,
        "XP": 3900,
        "ID": "Young_Green_Dragon"
      },
      {
        "Name": "Abjurer Wizard",
        "CR": 9,
        "XP": 5000,
        "ID": "Abjurer_Wizard"
      },
      {
        "Name": "Abominable Yeti",
        "CR": 9,
        "XP": 5000,
        "ID": "Abominable_Yeti"
      },
      {
        "Name": "Bone Devil",
        "CR": 9,
        "XP": 5000,
        "ID": "Bone_Devil"
      },
      {
        "Name": "Bone Devil",
        "CR": 9,
        "XP": 5000,
        "ID": "Bone_Devil"
      },
      {
        "Name": "Braxat",
        "CR": 9,
        "XP": 5000,
        "ID": "Braxat"
      },
      {
        "Name": "Champion",
        "CR": 9,
        "XP": 5000,
        "ID": "Champion"
      },
      {
        "Name": "Clay Golem",
        "CR": 9,
        "XP": 5000,
        "ID": "Clay_Golem"
      },
      {
        "Name": "Cloud Giant",
        "CR": 9,
        "XP": 5000,
        "ID": "Cloud_Giant"
      },
      {
        "Name": "Drow House Captian",
        "CR": 9,
        "XP": 5000,
        "ID": "Drow_House_Captian"
      },
      {
        "Name": "Evoker Wizard",
        "CR": 9,
        "XP": 5000,
        "ID": "Evoker_Wizard"
      },
      {
        "Name": "Fire Giant",
        "CR": 9,
        "XP": 5000,
        "ID": "Fire_Giant"
      },
      {
        "Name": "Flind",
        "CR": 9,
        "XP": 5000,
        "ID": "Flind"
      },
      {
        "Name": "Fractine",
        "CR": 9,
        "XP": 5000,
        "ID": "Fractine"
      },
      {
        "Name": "Frost Salamander",
        "CR": 9,
        "XP": 5000,
        "ID": "Frost_Salamander"
      },
      {
        "Name": "Githyanki Xenomancer",
        "CR": 9,
        "XP": 5000,
        "ID": "Githyanki_Xenomancer"
      },
      {
        "Name": "Glabrezu",
        "CR": 9,
        "XP": 5000,
        "ID": "Glabrezu"
      },
      {
        "Name": "Glabrezu",
        "CR": 9,
        "XP": 5000,
        "ID": "Glabrezu"
      },
      {
        "Name": "Gray Slaad",
        "CR": 9,
        "XP": 5000,
        "ID": "Gray_Slaad"
      },
      {
        "Name": "Hashalaq Quori",
        "CR": 9,
        "XP": 5000,
        "ID": "Hashalaq_Quori"
      },
      {
        "Name": "Hydroloth",
        "CR": 9,
        "XP": 5000,
        "ID": "Hydroloth"
      },
      {
        "Name": "Lonely Sorrowsworn",
        "CR": 9,
        "XP": 5000,
        "ID": "Lonely_Sorrowsworn"
      },
      {
        "Name": "Necromancer Wizard",
        "CR": 9,
        "XP": 5000,
        "ID": "Necromancer_Wizard"
      },
      {
        "Name": "Nycaloth",
        "CR": 9,
        "XP": 5000,
        "ID": "Nycaloth"
      },
      {
        "Name": "Rot Troll",
        "CR": 9,
        "XP": 5000,
        "ID": "Rot_Troll"
      },
      {
        "Name": "Shadar kai Gloom Weaver",
        "CR": 9,
        "XP": 5000,
        "ID": "Shadar_kai_Gloom_Weaver"
      },
      {
        "Name": "Treant",
        "CR": 9,
        "XP": 5000,
        "ID": "Treant"
      },
      {
        "Name": "Ulitharid",
        "CR": 9,
        "XP": 5000,
        "ID": "Ulitharid"
      },
      {
        "Name": "War Priest",
        "CR": 9,
        "XP": 5000,
        "ID": "War_Priest"
      },
      {
        "Name": "Young Blue Dragon",
        "CR": 9,
        "XP": 5000,
        "ID": "Young_Blue_Dragon"
      },
      {
        "Name": "Young Silver Dragon",
        "CR": 9,
        "XP": 5000,
        "ID": "Young_Silver_Dragon"
      },
      {
        "Name": "Young Solar Dragon",
        "CR": 9,
        "XP": 5000,
        "ID": "Young_Solar_Dragon"
      },
      {
        "Name": "Aboleth",
        "CR": 10,
        "XP": 5900,
        "ID": "Aboleth"
      },
      {
        "Name": "Alhoon",
        "CR": 10,
        "XP": 5900,
        "ID": "Alhoon"
      },
      {
        "Name": "Autumn Eladrin",
        "CR": 10,
        "XP": 5900,
        "ID": "Autumn_Eladrin"
      },
      {
        "Name": "Death Kiss",
        "CR": 10,
        "XP": 5900,
        "ID": "Death_Kiss"
      },
      {
        "Name": "Death Slaad",
        "CR": 10,
        "XP": 5900,
        "ID": "Death_Slaad"
      },
      {
        "Name": "Deva",
        "CR": 10,
        "XP": 5900,
        "ID": "Deva"
      },
      {
        "Name": "Elder Oblex",
        "CR": 10,
        "XP": 5900,
        "ID": "Elder_Oblex"
      },
      {
        "Name": "Eye Monger",
        "CR": 10,
        "XP": 5900,
        "ID": "Eye_Monger"
      },
      {
        "Name": "Froghemoth",
        "CR": 10,
        "XP": 5900,
        "ID": "Froghemoth"
      },
      {
        "Name": "Giff Warlord",
        "CR": 10,
        "XP": 5900,
        "ID": "Giff_Warlord"
      },
      {
        "Name": "Githyanki Gish",
        "CR": 10,
        "XP": 5900,
        "ID": "Githyanki_Gish"
      },
      {
        "Name": "Githzerai Enlightened",
        "CR": 10,
        "XP": 5900,
        "ID": "Githzerai_Enlightened"
      },
      {
        "Name": "Guardian Naga",
        "CR": 10,
        "XP": 5900,
        "ID": "Guardian_Naga"
      },
      {
        "Name": "Orthon",
        "CR": 10,
        "XP": 5900,
        "ID": "Orthon"
      },
      {
        "Name": "Spring Eladrin",
        "CR": 10,
        "XP": 5900,
        "ID": "Spring_Eladrin"
      },
      {
        "Name": "Star Spawn Hulk",
        "CR": 10,
        "XP": 5900,
        "ID": "Star_Spawn_Hulk"
      },
      {
        "Name": "Stone Giant Dreamwalker",
        "CR": 10,
        "XP": 5900,
        "ID": "Stone_Giant_Dreamwalker"
      },
      {
        "Name": "Stone Golem",
        "CR": 10,
        "XP": 5900,
        "ID": "Stone_Golem"
      },
      {
        "Name": "Summer Eladrin",
        "CR": 10,
        "XP": 5900,
        "ID": "Summer_Eladrin"
      },
      {
        "Name": "Undying Councilor",
        "CR": 10,
        "XP": 5900,
        "ID": "Undying_Councilor"
      },
      {
        "Name": "Winger Eladrin",
        "CR": 10,
        "XP": 5900,
        "ID": "Winger_Eladrin"
      },
      {
        "Name": "Xenk Yendar",
        "CR": 10,
        "XP": 5900,
        "ID": "Xenk_Yendar"
      },
      {
        "Name": "Yochlol",
        "CR": 10,
        "XP": 5900,
        "ID": "Yochlol"
      },
      {
        "Name": "Young Gold Dragon",
        "CR": 10,
        "XP": 5900,
        "ID": "Young_Gold_Dragon"
      },
      {
        "Name": "Young Red Dragon",
        "CR": 10,
        "XP": 5900,
        "ID": "Young_Red_Dragon"
      },
      {
        "Name": "Alkilith",
        "CR": 11,
        "XP": 7200,
        "ID": "Alkilith"
      },
      {
        "Name": "Balhannoth",
        "CR": 11,
        "XP": 7200,
        "ID": "Balhannoth"
      },
      {
        "Name": "Behir",
        "CR": 11,
        "XP": 7200,
        "ID": "Behir"
      },
      {
        "Name": "Cloud Giant Smiling One",
        "CR": 11,
        "XP": 7200,
        "ID": "Cloud_Giant_Smiling_One"
      },
      {
        "Name": "Dao",
        "CR": 11,
        "XP": 7200,
        "ID": "Dao"
      },
      {
        "Name": "Djinni",
        "CR": 11,
        "XP": 7200,
        "ID": "Djinni"
      },
      {
        "Name": "Drow Shadowblade",
        "CR": 11,
        "XP": 7200,
        "ID": "Drow_Shadowblade"
      },
      {
        "Name": "Efreeti",
        "CR": 11,
        "XP": 7200,
        "ID": "Efreeti"
      },
      {
        "Name": "Gynosphinx",
        "CR": 11,
        "XP": 7200,
        "ID": "Gynosphinx"
      },
      {
        "Name": "Horned Devil",
        "CR": 11,
        "XP": 7200,
        "ID": "Horned_Devil"
      },
      {
        "Name": "Horned Devil",
        "CR": 11,
        "XP": 7200,
        "ID": "Horned_Devil"
      },
      {
        "Name": "Hungry Sorrowsworn",
        "CR": 11,
        "XP": 7200,
        "ID": "Hungry_Sorrowsworn"
      },
      {
        "Name": "Marid",
        "CR": 11,
        "XP": 7200,
        "ID": "Marid"
      },
      {
        "Name": "Megapede",
        "CR": 11,
        "XP": 7200,
        "ID": "Megapede"
      },
      {
        "Name": "Morkoth",
        "CR": 11,
        "XP": 7200,
        "ID": "Morkoth"
      },
      {
        "Name": "Radiant idol",
        "CR": 11,
        "XP": 7200,
        "ID": "Radiant_idol"
      },
      {
        "Name": "Remorhaz",
        "CR": 11,
        "XP": 7200,
        "ID": "Remorhaz"
      },
      {
        "Name": "Roc",
        "CR": 11,
        "XP": 7200,
        "ID": "Roc"
      },
      {
        "Name": "Shadar kai Soul Monger",
        "CR": 11,
        "XP": 7200,
        "ID": "Shadar_kai_Soul_Monger"
      },
      {
        "Name": "Spirit Troll",
        "CR": 11,
        "XP": 7200,
        "ID": "Spirit_Troll"
      },
      {
        "Name": "Void Scavver",
        "CR": 11,
        "XP": 7200,
        "ID": "Void_Scavver"
      },
      {
        "Name": "Yagnoloth",
        "CR": 11,
        "XP": 7200,
        "ID": "Yagnoloth"
      },
      {
        "Name": "Arcanaloth",
        "CR": 12,
        "XP": 8400,
        "ID": "Arcanaloth"
      },
      {
        "Name": "Archdruid",
        "CR": 12,
        "XP": 8400,
        "ID": "Archdruid"
      },
      {
        "Name": "Archmage",
        "CR": 12,
        "XP": 8400,
        "ID": "Archmage"
      },
      {
        "Name": "Boneclaw",
        "CR": 12,
        "XP": 8400,
        "ID": "Boneclaw"
      },
      {
        "Name": "Duergar Despot",
        "CR": 12,
        "XP": 8400,
        "ID": "Duergar_Despot"
      },
      {
        "Name": "Eidolon",
        "CR": 12,
        "XP": 8400,
        "ID": "Eidolon"
      },
      {
        "Name": "Erinyes",
        "CR": 12,
        "XP": 8400,
        "ID": "Erinyes"
      },
      {
        "Name": "Erinyes",
        "CR": 12,
        "XP": 8400,
        "ID": "Erinyes"
      },
      {
        "Name": "Esthetic",
        "CR": 12,
        "XP": 8400,
        "ID": "Esthetic"
      },
      {
        "Name": "Forst Giant Everlasting One",
        "CR": 12,
        "XP": 8400,
        "ID": "Forst_Giant_Everlasting_One"
      },
      {
        "Name": "Githyanki Kith rak",
        "CR": 12,
        "XP": 8400,
        "ID": "Githyanki_Kith_rak"
      },
      {
        "Name": "Gray Render",
        "CR": 12,
        "XP": 8400,
        "ID": "Gray_Render"
      },
      {
        "Name": "Ki rin",
        "CR": 12,
        "XP": 8400,
        "ID": "Ki_rin"
      },
      {
        "Name": "Oinoloth",
        "CR": 12,
        "XP": 8400,
        "ID": "Oinoloth"
      },
      {
        "Name": "Warlord",
        "CR": 12,
        "XP": 8400,
        "ID": "Warlord"
      },
      {
        "Name": "Yuan ti Anathema",
        "CR": 12,
        "XP": 8400,
        "ID": "Yuan_ti_Anathema"
      },
      {
        "Name": "Adult Brass Dragon",
        "CR": 13,
        "XP": 10000,
        "ID": "Adult_Brass_Dragon"
      },
      {
        "Name": "Adult Lunar Dragon",
        "CR": 13,
        "XP": 10000,
        "ID": "Adult_Lunar_Dragon"
      },
      {
        "Name": "Adult White Dragon",
        "CR": 13,
        "XP": 10000,
        "ID": "Adult_White_Dragon"
      },
      {
        "Name": "Angry Sorrowsworn",
        "CR": 13,
        "XP": 10000,
        "ID": "Angry_Sorrowsworn"
      },
      {
        "Name": "Beholder",
        "CR": 13,
        "XP": 10000,
        "ID": "Beholder"
      },
      {
        "Name": "Devourer",
        "CR": 13,
        "XP": 10000,
        "ID": "Devourer"
      },
      {
        "Name": "Dire Troll",
        "CR": 13,
        "XP": 10000,
        "ID": "Dire_Troll"
      },
      {
        "Name": "Drow Arachnomancer",
        "CR": 13,
        "XP": 10000,
        "ID": "Drow_Arachnomancer"
      },
      {
        "Name": "Nalfeshnee",
        "CR": 13,
        "XP": 10000,
        "ID": "Nalfeshnee"
      },
      {
        "Name": "Nalfeshnee",
        "CR": 13,
        "XP": 10000,
        "ID": "Nalfeshnee"
      },
      {
        "Name": "Narzugon",
        "CR": 13,
        "XP": 10000,
        "ID": "Narzugon"
      },
      {
        "Name": "Neothelid",
        "CR": 13,
        "XP": 10000,
        "ID": "Neothelid"
      },
      {
        "Name": "Rakshasa",
        "CR": 13,
        "XP": 10000,
        "ID": "Rakshasa"
      },
      {
        "Name": "Star Spawn Seer",
        "CR": 13,
        "XP": 10000,
        "ID": "Star_Spawn_Seer"
      },
      {
        "Name": "Storm Giant",
        "CR": 13,
        "XP": 10000,
        "ID": "Storm_Giant"
      },
      {
        "Name": "Ultroloth",
        "CR": 13,
        "XP": 10000,
        "ID": "Ultroloth"
      },
      {
        "Name": "Vampire",
        "CR": 13,
        "XP": 10000,
        "ID": "Vampire"
      },
      {
        "Name": "Wastrilith",
        "CR": 13,
        "XP": 10000,
        "ID": "Wastrilith"
      },
      {
        "Name": "Young Red Shadow Dragon",
        "CR": 13,
        "XP": 10000,
        "ID": "Young_Red_Shadow_Dragon"
      },
      {
        "Name": "Adult Black Dragon",
        "CR": 14,
        "XP": 11500,
        "ID": "Adult_Black_Dragon"
      },
      {
        "Name": "Adult Copper Dragon",
        "CR": 14,
        "XP": 11500,
        "ID": "Adult_Copper_Dragon"
      },
      {
        "Name": "Adult Solar Dragon",
        "CR": 14,
        "XP": 11500,
        "ID": "Adult_Solar_Dragon"
      },
      {
        "Name": "Cadaver Collector",
        "CR": 14,
        "XP": 11500,
        "ID": "Cadaver_Collector"
      },
      {
        "Name": "Death Tyrant",
        "CR": 14,
        "XP": 11500,
        "ID": "Death_Tyrant"
      },
      {
        "Name": "Drwo Inquisitor",
        "CR": 14,
        "XP": 11500,
        "ID": "Drwo_Inquisitor"
      },
      {
        "Name": "Elder Brain",
        "CR": 14,
        "XP": 11500,
        "ID": "Elder_Brain"
      },
      {
        "Name": "Fire Giant Dreadnought",
        "CR": 14,
        "XP": 11500,
        "ID": "Fire_Giant_Dreadnought"
      },
      {
        "Name": "Githyanki Supreme Commander",
        "CR": 14,
        "XP": 11500,
        "ID": "Githyanki_Supreme_Commander"
      },
      {
        "Name": "Ice Devil",
        "CR": 14,
        "XP": 11500,
        "ID": "Ice_Devil"
      },
      {
        "Name": "Ice Devil",
        "CR": 14,
        "XP": 11500,
        "ID": "Ice_Devil"
      },
      {
        "Name": "Retriever",
        "CR": 14,
        "XP": 11500,
        "ID": "Retriever"
      },
      {
        "Name": "Adult Bronze Dragon",
        "CR": 15,
        "XP": 13000,
        "ID": "Adult_Bronze_Dragon"
      },
      {
        "Name": "Adult Green Dragon",
        "CR": 15,
        "XP": 13000,
        "ID": "Adult_Green_Dragon"
      },
      {
        "Name": "Asteroid Spider",
        "CR": 15,
        "XP": 13000,
        "ID": "Asteroid_Spider"
      },
      {
        "Name": "Eldritch Lich",
        "CR": 15,
        "XP": 13000,
        "ID": "Eldritch_Lich"
      },
      {
        "Name": "Green Abishai",
        "CR": 15,
        "XP": 13000,
        "ID": "Green_Abishai"
      },
      {
        "Name": "Mordakhesh",
        "CR": 15,
        "XP": 13000,
        "ID": "Mordakhesh"
      },
      {
        "Name": "Mummy Lord",
        "CR": 15,
        "XP": 13000,
        "ID": "Mummy_Lord"
      },
      {
        "Name": "Nabassu",
        "CR": 15,
        "XP": 13000,
        "ID": "Nabassu"
      },
      {
        "Name": "Purple Worm",
        "CR": 15,
        "XP": 13000,
        "ID": "Purple_Worm"
      },
      {
        "Name": "Skull Lord",
        "CR": 15,
        "XP": 13000,
        "ID": "Skull_Lord"
      },
      {
        "Name": "Sofina",
        "CR": 15,
        "XP": 13000,
        "ID": "Sofina"
      },
      {
        "Name": "Vampire Spellcaster",
        "CR": 15,
        "XP": 13000,
        "ID": "Vampire_Spellcaster"
      },
      {
        "Name": "Vampire Warrior",
        "CR": 15,
        "XP": 13000,
        "ID": "Vampire_Warrior"
      },
      {
        "Name": "Adult Blue Dragon",
        "CR": 16,
        "XP": 15000,
        "ID": "Adult_Blue_Dragon"
      },
      {
        "Name": "Adult Silver Dragon",
        "CR": 16,
        "XP": 15000,
        "ID": "Adult_Silver_Dragon"
      },
      {
        "Name": "Githzerai Anarch",
        "CR": 16,
        "XP": 15000,
        "ID": "Githzerai_Anarch"
      },
      {
        "Name": "Hellfire Engine",
        "CR": 16,
        "XP": 15000,
        "ID": "Hellfire_Engine"
      },
      {
        "Name": "Iron Golem",
        "CR": 16,
        "XP": 15000,
        "ID": "Iron_Golem"
      },
      {
        "Name": "Marilith",
        "CR": 16,
        "XP": 15000,
        "ID": "Marilith"
      },
      {
        "Name": "Marilith",
        "CR": 16,
        "XP": 15000,
        "ID": "Marilith"
      },
      {
        "Name": "Nightmare Beast",
        "CR": 16,
        "XP": 15000,
        "ID": "Nightmare_Beast"
      },
      {
        "Name": "Phoenix",
        "CR": 16,
        "XP": 15000,
        "ID": "Phoenix"
      },
      {
        "Name": "Planetar",
        "CR": 16,
        "XP": 15000,
        "ID": "Planetar"
      },
      {
        "Name": "Star Spawn Larva Mage",
        "CR": 16,
        "XP": 15000,
        "ID": "Star_Spawn_Larva_Mage"
      },
      {
        "Name": "Steel Predator",
        "CR": 16,
        "XP": 15000,
        "ID": "Steel_Predator"
      },
      {
        "Name": "Storm Giant Quintessent",
        "CR": 16,
        "XP": 15000,
        "ID": "Storm_Giant_Quintessent"
      },
      {
        "Name": "Titivilus",
        "CR": 16,
        "XP": 15000,
        "ID": "Titivilus"
      },
      {
        "Name": "Zodar",
        "CR": 16,
        "XP": 15000,
        "ID": "Zodar"
      },
      {
        "Name": "Adult Blue Dracolich",
        "CR": 17,
        "XP": 18000,
        "ID": "Adult_Blue_Dracolich"
      },
      {
        "Name": "Adult Gold Dragon",
        "CR": 17,
        "XP": 18000,
        "ID": "Adult_Gold_Dragon"
      },
      {
        "Name": "Adult Red Dracolich",
        "CR": 17,
        "XP": 18000,
        "ID": "Adult_Red_Dracolich"
      },
      {
        "Name": "Adult Red Dragon",
        "CR": 17,
        "XP": 18000,
        "ID": "Adult_Red_Dragon"
      },
      {
        "Name": "Androsphinx",
        "CR": 17,
        "XP": 18000,
        "ID": "Androsphinx"
      },
      {
        "Name": "Blue Abishai",
        "CR": 17,
        "XP": 18000,
        "ID": "Blue_Abishai"
      },
      {
        "Name": "Death Knight",
        "CR": 17,
        "XP": 18000,
        "ID": "Death_Knight"
      },
      {
        "Name": "Dragon Turtle",
        "CR": 17,
        "XP": 18000,
        "ID": "Dragon_Turtle"
      },
      {
        "Name": "Goristro",
        "CR": 17,
        "XP": 18000,
        "ID": "Goristro"
      },
      {
        "Name": "Nagpa",
        "CR": 17,
        "XP": 18000,
        "ID": "Nagpa"
      },
      {
        "Name": "Verminaard",
        "CR": 17,
        "XP": 18000,
        "ID": "Verminaard"
      },
      {
        "Name": "Amnizu",
        "CR": 18,
        "XP": 20000,
        "ID": "Amnizu"
      },
      {
        "Name": "Cosmic Horror",
        "CR": 18,
        "XP": 20000,
        "ID": "Cosmic_Horror"
      },
      {
        "Name": "Demilich",
        "CR": 18,
        "XP": 20000,
        "ID": "Demilich"
      },
      {
        "Name": "Drow Favored Consort",
        "CR": 18,
        "XP": 20000,
        "ID": "Drow_Favored_Consort"
      },
      {
        "Name": "Sibriex",
        "CR": 18,
        "XP": 20000,
        "ID": "Sibriex"
      },
      {
        "Name": "The Lord of Blades",
        "CR": 18,
        "XP": 20000,
        "ID": "The_Lord_of_Blades"
      },
      {
        "Name": "Ancient Lunar Dragon",
        "CR": 19,
        "XP": 22000,
        "ID": "Ancient_Lunar_Dragon"
      },
      {
        "Name": "Bael",
        "CR": 19,
        "XP": 22000,
        "ID": "Bael"
      },
      {
        "Name": "Balor",
        "CR": 19,
        "XP": 22000,
        "ID": "Balor"
      },
      {
        "Name": "Balor",
        "CR": 19,
        "XP": 22000,
        "ID": "Balor"
      },
      {
        "Name": "Kalaraq Quori",
        "CR": 19,
        "XP": 22000,
        "ID": "Kalaraq_Quori"
      },
      {
        "Name": "Red Abishai",
        "CR": 19,
        "XP": 22000,
        "ID": "Red_Abishai"
      },
      {
        "Name": "Ancient Brass Dragon",
        "CR": 20,
        "XP": 25000,
        "ID": "Ancient_Brass_Dragon"
      },
      {
        "Name": "Ancient White Dragon",
        "CR": 20,
        "XP": 25000,
        "ID": "Ancient_White_Dragon"
      },
      {
        "Name": "Drow Matron Mother",
        "CR": 20,
        "XP": 25000,
        "ID": "Drow_Matron_Mother"
      },
      {
        "Name": "Drow Mother of Rebellion",
        "CR": 20,
        "XP": 25000,
        "ID": "Drow_Mother_of_Rebellion"
      },
      {
        "Name": "Leviathan",
        "CR": 20,
        "XP": 25000,
        "ID": "Leviathan"
      },
      {
        "Name": "Nightwalker",
        "CR": 20,
        "XP": 25000,
        "ID": "Nightwalker"
      },
      {
        "Name": "Pit Fiend",
        "CR": 20,
        "XP": 25000,
        "ID": "Pit_Fiend"
      },
      {
        "Name": "Pit Fiend",
        "CR": 20,
        "XP": 25000,
        "ID": "Pit_Fiend"
      },
      {
        "Name": "Ancient Black Dragon",
        "CR": 21,
        "XP": 33000,
        "ID": "Ancient_Black_Dragon"
      },
      {
        "Name": "Ancient Copper Dragon",
        "CR": 21,
        "XP": 33000,
        "ID": "Ancient_Copper_Dragon"
      },
      {
        "Name": "Ancient Solar Dragon",
        "CR": 21,
        "XP": 33000,
        "ID": "Ancient_Solar_Dragon"
      },
      {
        "Name": "Astral Dreadnought",
        "CR": 21,
        "XP": 33000,
        "ID": "Astral_Dreadnought"
      },
      {
        "Name": "Hutijin",
        "CR": 21,
        "XP": 33000,
        "ID": "Hutijin"
      },
      {
        "Name": "Lich",
        "CR": 21,
        "XP": 33000,
        "ID": "Lich"
      },
      {
        "Name": "Moloch",
        "CR": 21,
        "XP": 33000,
        "ID": "Moloch"
      },
      {
        "Name": "Molydeus",
        "CR": 21,
        "XP": 33000,
        "ID": "Molydeus"
      },
      {
        "Name": "Solar",
        "CR": 21,
        "XP": 33000,
        "ID": "Solar"
      },
      {
        "Name": "Ancient Bronze Dragon",
        "CR": 22,
        "XP": 41000,
        "ID": "Ancient_Bronze_Dragon"
      },
      {
        "Name": "Ancient Green Dragon",
        "CR": 22,
        "XP": 41000,
        "ID": "Ancient_Green_Dragon"
      },
      {
        "Name": "Belashyrra",
        "CR": 22,
        "XP": 41000,
        "ID": "Belashyrra"
      },
      {
        "Name": "Ember",
        "CR": 22,
        "XP": 41000,
        "ID": "Ember"
      },
      {
        "Name": "Geryon",
        "CR": 22,
        "XP": 41000,
        "ID": "Geryon"
      },
      {
        "Name": "Lady Illmarrow",
        "CR": 22,
        "XP": 41000,
        "ID": "Lady_Illmarrow"
      },
      {
        "Name": "Zaratan",
        "CR": 22,
        "XP": 41000,
        "ID": "Zaratan"
      },
      {
        "Name": "Ancient Blue Dragon",
        "CR": 23,
        "XP": 50000,
        "ID": "Ancient_Blue_Dragon"
      },
      {
        "Name": "Ancient Silver Dragon",
        "CR": 23,
        "XP": 50000,
        "ID": "Ancient_Silver_Dragon"
      },
      {
        "Name": "Baphomet",
        "CR": 23,
        "XP": 50000,
        "ID": "Baphomet"
      },
      {
        "Name": "Elder Tempest",
        "CR": 23,
        "XP": 50000,
        "ID": "Elder_Tempest"
      },
      {
        "Name": "Empyrean",
        "CR": 23,
        "XP": 50000,
        "ID": "Empyrean"
      },
      {
        "Name": "Fraz-urb luu",
        "CR": 23,
        "XP": 50000,
        "ID": "Fraz-urb_luu"
      },
      {
        "Name": "Juiblex",
        "CR": 23,
        "XP": 50000,
        "ID": "Juiblex"
      },
      {
        "Name": "Kraken",
        "CR": 23,
        "XP": 50000,
        "ID": "Kraken"
      },
      {
        "Name": "Zuggtmoy",
        "CR": 23,
        "XP": 50000,
        "ID": "Zuggtmoy"
      },
      {
        "Name": "Ancient Gold Dragon",
        "CR": 24,
        "XP": 62000,
        "ID": "Ancient_Gold_Dragon"
      },
      {
        "Name": "Ancient Red Dragon",
        "CR": 24,
        "XP": 62000,
        "ID": "Ancient_Red_Dragon"
      },
      {
        "Name": "Graz zt",
        "CR": 24,
        "XP": 62000,
        "ID": "Graz_zt"
      },
      {
        "Name": "Yeenoghu",
        "CR": 24,
        "XP": 62000,
        "ID": "Yeenoghu"
      },
      {
        "Name": "Marut",
        "CR": 25,
        "XP": 75000,
        "ID": "Marut"
      },
      {
        "Name": "Warforged Colossus",
        "CR": 25,
        "XP": 75000,
        "ID": "Warforged_Colossus"
      },
      {
        "Name": "demogorgon",
        "CR": 26,
        "XP": 90000,
        "ID": "demogorgon"
      },
      {
        "Name": "Orcus",
        "CR": 26,
        "XP": 90000,
        "ID": "Orcus"
      },
      {
        "Name": "Zariel",
        "CR": 26,
        "XP": 90000,
        "ID": "Zariel"
      },
      {
        "Name": "Rak Tulkhesh",
        "CR": 28,
        "XP": 120000,
        "ID": "Rak_Tulkhesh"
      },
      {
        "Name": "Sul Khatesh",
        "CR": 28,
        "XP": 120000,
        "ID": "Sul_Khatesh"
      },
      {
        "Name": "Tarrasque",
        "CR": 30,
        "XP": 155000,
        "ID": "Tarrasque"
      }
     ]
    }
