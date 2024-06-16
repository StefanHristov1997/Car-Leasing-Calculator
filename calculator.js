document.addEventListener('DOMContentLoaded', () => {
    const carValueInput = document.getElementById('car-value');
    const carValueSlider = document.getElementById('car-value-slider');
    const downPaymentInput = document.getElementById('down-payment');
    const downPaymentSlider = document.getElementById('down-payment-slider');
    const leasePeriodSelect = document.getElementById('lease-period');
    const carTypeSelect = document.getElementById('car-type');

    const carValueError = document.getElementById('car-value-error');
    const downPaymentError = document.getElementById('down-payment-error');

    const interestRates = {
        'brand-new': 0.0299,
        'used': 0.037
    };

    function validateInputs() {
        let isValid = true;

        // Validate car value
        const carValue = parseFloat(carValueInput.value);
        if (isNaN(carValue) || carValue < 10000 || carValue > 200000) {
            carValueError.textContent = "Car value must be between €10,000 and €200,000.";
            carValueError.style.display = 'block';
            isValid = false;
        } else {
            carValueError.style.display = 'none';
        }

        // Validate down payment
        const downPayment = parseFloat(downPaymentInput.value);
        if (isNaN(downPayment) || downPayment < 10 || downPayment > 50) {
            downPaymentError.textContent = "Down payment must be between 10% and 50%.";
            downPaymentError.style.display = 'block';
            isValid = false;
        } else {
            downPaymentError.style.display = 'none';
        }

        return isValid;
    }

    function updateLeasingDetails() {
        if (!validateInputs()) {
            document.getElementById('total-leasing-cost').textContent = '€0';
            document.getElementById('monthly-installment').textContent = '€0';
            document.getElementById('down-payment-value').textContent = '€0';
            document.getElementById('interest-rate').textContent = '0.00%';
            return;
        }

        const carValue = parseFloat(carValueInput.value);
        const downPaymentPercentage = parseFloat(downPaymentInput.value) / 100;
        const downPaymentValue = carValue * downPaymentPercentage;
        const interestRate = interestRates[carTypeSelect.value];
        const leasePeriod = parseInt(leasePeriodSelect.value);

        const loanAmount = carValue - downPaymentValue;
        const monthlyInstallment = (loanAmount * (interestRate / 12)) / (1 - Math.pow(1 + (interestRate / 12), -leasePeriod));
        const totalLeasingCost = (monthlyInstallment * leasePeriod) + downPaymentValue;

        document.getElementById('total-leasing-cost').textContent = `€${totalLeasingCost.toFixed(2)}`;
        document.getElementById('monthly-installment').textContent = `€${monthlyInstallment.toFixed(2)}`;
        document.getElementById('down-payment-value').textContent = `€${downPaymentValue.toFixed(2)}`;
        document.getElementById('interest-rate').textContent = `${(interestRate * 100).toFixed(2)}%`;
    }

    carValueInput.addEventListener('input', () => {
        carValueSlider.value = carValueInput.value;
        updateLeasingDetails();
    });

    carValueSlider.addEventListener('input', () => {
        carValueInput.value = carValueSlider.value;
        updateLeasingDetails();
    });

    downPaymentInput.addEventListener('input', () => {
        downPaymentSlider.value = downPaymentInput.value;
        updateLeasingDetails();
    });
    
    downPaymentSlider.addEventListener('input', () => {
        downPaymentInput.value = downPaymentSlider.value;
        updateLeasingDetails();
    });

    leasePeriodSelect.addEventListener('change', updateLeasingDetails);
    carTypeSelect.addEventListener('change', updateLeasingDetails);

    updateLeasingDetails();  // Initial call to set values
});
