document.addEventListener('DOMContentLoaded', () => {
    const carType = document.getElementById('carType');
    const carValue = document.getElementById('carValue');
    const carValueRange = document.getElementById('carValueRange');
    const leasePeriod = document.getElementById('leasePeriod');
    const downPayment = document.getElementById('downPayment');
    const downPaymentValue = document.getElementById('downPaymentValue');
    const totalLeasingCost = document.getElementById('totalLeasingCost');
    const downPaymentAmount = document.getElementById('downPaymentAmount');
    const monthlyInstallment = document.getElementById('monthlyInstallment');
    const interestRate = document.getElementById('interestRate');

    const updateCarValue = () => {
        let value = parseInt(carValue.value);
        if (value < parseInt(carValue.min)) {
            value = parseInt(carValue.min);
        } else if (value > parseInt(carValue.max)) {
            value = parseInt(carValue.max);
        }
        carValue.value = value;
        carValueRange.value = value;
        calculateLeasing();
    };

    const updateLeasePeriod = () => {
        calculateLeasing();
    };

    const updateDownPayment = () => {
        let value = parseInt(downPaymentValue.value);
        if (value < parseInt(downPaymentValue.min)) {
            value = parseInt(downPaymentValue.min);
        } else if (value > parseInt(downPaymentValue.max)) {
            value = parseInt(downPaymentValue.max);
        }
        downPaymentValue.value = value;
        downPayment.value = value;
        calculateLeasing();
    };

    const calculateLeasing = () => {
        const carPrice = parseFloat(carValue.value);
        const period = parseInt(leasePeriod.value);
        const downPaymentPercent = parseInt(downPayment.value);
        const downPaymentAmountValue = (carPrice * downPaymentPercent) / 100;
        const loanAmount = carPrice - downPaymentAmountValue;
        const annualInterestRate = carType.value === 'brand-new' ? 2.99 : 3.7;
        const monthlyInterestRate = annualInterestRate / 100 / 12;

        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - (1 / Math.pow(1 + monthlyInterestRate, period)));
        const totalCost = (monthlyPayment * period) + downPaymentAmountValue;

        totalLeasingCost.innerText = totalCost.toFixed(2);
        downPaymentAmount.innerText = downPaymentAmountValue.toFixed(2);
        monthlyInstallment.innerText = monthlyPayment.toFixed(2);
        interestRate.innerText = `${annualInterestRate.toFixed(2)}%`;
    };

    carValue.addEventListener('input', updateCarValue);
    carValueRange.addEventListener('input', () => {
        carValue.value = carValueRange.value;
        calculateLeasing();
    });

    leasePeriod.addEventListener('change', updateLeasePeriod);

    downPaymentValue.addEventListener('input', updateDownPayment);
    downPayment.addEventListener('input', () => {
        downPaymentValue.value = downPayment.value;
        calculateLeasing();
    });

    carType.addEventListener('change', calculateLeasing);

    calculateLeasing();
});
