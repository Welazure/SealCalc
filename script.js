function main() {
    var amount = document.getElementById('amount').value;
    var value = document.getElementById('value').value;
    var sac1_value = document.getElementById('sac1_value').value;
    var sac2_value = document.getElementById('sac2_value').value;
    
    if(sac1_value <= sac2_value) {
        var sac1_amount = calculate(value, amount, sac1_value, sac2_value);
        var sac2_amount = amount - sac1_amount;
        document.getElementById('sac1_amount').value = `sac 1: ${sac1_amount}`;
        document.getElementById('sac2_amount').value = `sac 2: ${sac2_amount}`;
    } else {
        var sac2_amount = calculate(value, amount, sac2_value, sac1_value);
        var sac1_amount = amount - sac2_amount;
        document.getElementById('sac1_amount').value = `sac 1: ${sac1_amount}`;
        document.getElementById('sac2_amount').value = `sac 2: ${sac2_amount}`;
    }
}
function calculate(value, amount, sac1_value, sac2_value) {
    var required = value * amount;
    for (var sac1_amount = 0; sac1_amount <= amount; sac1_amount++) {
        var leftover = required - sac1_amount * sac1_value;
        var last = leftover - ((amount - sac1_amount) * sac2_value);
        if (last <= 0) {
            return sac1_amount;
        }
    }
}
