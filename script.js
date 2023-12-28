function main() {
    amount = parseInt(document.getElementById('amount').value);
    value = parseInt(document.getElementById('value').value);
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
                sac1_amount = Math.round(amount/2);
                sac2_amount = amount - sac1_amount;
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
    console.log("end");
    return 1000;
}
