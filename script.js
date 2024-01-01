json = 0;

function main(value) {
    amount = parseInt(document.getElementById('amount').value);
    value = parseInt(document.getElementById('value').value.replace(/Terpilih: /g, ''));
    sac1_value = parseInt(document.getElementById('sac1_value').value);
    sac2_value = parseInt(document.getElementById('sac2_value').value);
    

    sac1_filled = (sac1_value > 0);
    sac2_filled = (sac2_value > 0);

    if(sac1_filled && !sac2_filled) { //if sac1 is filled and sac 2 is not filled
        if(sac1_value < value) { // only sac1 available and is not enough
            sac1_amount = "Value too low";
            sac2_amount = 0;
        } else {
            sac1_amount = amount;
            sac2_amount = 0;
        }
    } else if (sac2_filled && !sac1_filled) { //if sac1 is filled and sac 2 is not filled
        if(sac2_value < value) { // only sac1 available and is not enough
            sac2_amount = "Value too low";
            sac1_amount = 0;
        } else {
            sac2_amount = amount;
            sac1_amount = 0;
        }
    } else if(sac1_filled && sac2_filled) {
        if(sac1_value === sac2_value) {
            if((sac1_value + sac2_value) >= value) {
            sac1_amount = Math.round(amount/2);
            sac2_amount = amount - sac1_amount;
            } else {
                sac1_amount = "Value too low";
                sac2_amount = "Value too low";
            }
        } else {
            if((sac1_value + sac2_value) > value) {
                if(sac1_value > sac2_value) {
                    sac1_amount = calculate(value, amount, sac1_value, sac2_value);
                    sac2_amount = amount -sac1_amount;
                } else {
                    sac2_amount = calculate(value, amount, sac2_value, sac1_value);
                    sac1_amount = amount -sac2_amount;
                }
            } else if((sac1_value + sac2_value) === value){
                sac1_amount = amount;
                sac2_amount = amount;
            } else {
                sac1_amount = "Value too low";
                sac2_amount = "Value too low";
            }
        }
    }

        document.getElementById('sac1_amount').value = `${sac1_amount}`;
        document.getElementById('sac2_amount').value = `${sac2_amount}`;

}
function calculate(value, amount, sac1_value, sac2_value) {
    var required = value * amount;
    for (var sac1_amount = 0; sac1_amount <= amount; sac1_amount++) {
        sac2_amount = amount - sac1_amount;
        console.log(`required = ${required}, sac2_amount = ${sac2_amount}, sac1_amount = ${sac1_amount}`);
        sac1_values = sac1_value * sac1_amount;
        sac2_values = sac2_value * sac2_amount;
        if((required - (sac1_values + sac2_values)) <= 0) {
            console.log("pass");
            return sac1_amount;
        }

    }
    console.log("CRITICAL ERROR");
    return 1000;
}

async function load() {
    const response = await fetch("./data.json");
    json = await response.json();

    selected = document.getElementById("name");
    optgroup = document.createElement('optgroup');
    optgroup.label = "Max Blue";
    for(let i in json.MB) {
        opt = document.createElement('option');
        opt.value = json.MB[i].Ingredient;
        opt.innerHTML = json.MB[i].Sacrifice;
        optgroup.append(opt);
    }

    newoptgroup = document.createElement('optgroup');
    newoptgroup.label = "Max Red";
    for(let i in json.MR) {
        opt = document.createElement('option');
        opt.value = json.MR[i].Ingredient;
        opt.innerHTML = json.MR[i].Sacrifice;
        newoptgroup.append(opt);
    }
    newnewoptgroup = document.createElement('optgroup');
    newnewoptgroup.label = "Max Red";
    for(let i in json.HB) {
        opt = document.createElement('option');
        opt.value = json.HB[i].Ingredient;
        opt.innerHTML = json.HB[i].Sacrifice;
        newnewoptgroup.append(opt);
    }

    selected.append(newoptgroup);
    selected.append(optgroup);
    selected.append(newnewoptgroup);
}

function changeValue() {
    obj = document.getElementById('value');
    obj2 = document.getElementById('namee').value;
    if(obj2.includes("Max Blue")) {
        for(let i in json.MB) {
            if(json.MB[i].Ingredient === obj2) {
                obj.value = `Terpilih: ${json.MB[i].Sacrifice}`;
                break;
            }
        }
    } else if(obj2.includes("Max Red")) {
        for(let i in json.MR) {
            if(json.MR[i].Ingredient === obj2) {
                obj.value = `Terpilih: ${json.MR[i].Sacrifice}`;
                break;
            }
        }
    } else if(obj2.includes("High Blue")) {
        for(let i in json.HB) {
            if(json.HB[i].Ingredient === obj2) {
                obj.value = `Terpilih: ${json.HB[i].Sacrifice}`;
                break;
            }
        }
    } else if(obj2 === '') {
        document.getElementById('value').value = "";
    }
}
