import monsterList from "./monsterList.js";
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