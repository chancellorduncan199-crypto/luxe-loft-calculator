// ==========================================
// CONSTANTS
// ==========================================

const EXCHANGE_RATE = 8.5;

const CUSTOMS_SERVICE_RATE = 0.125;

const OPT_RATE = 0.15;

const ADVANCE_PAYMENT_RATE = 0.15;

const VAT_RATE = 0.125;


// ==========================================
// CATEGORY SETTINGS
// ==========================================

const categories = {

    clothing: {
        name: "Clothing",
        dutyRate: 0.40
    },

    accessories: {
        name: "Accessories",
        dutyRate: 0.30
    },

    cases: {
        name: "Cases",
        dutyRate: 0.30
    },

    other: {
        name: "Others",
        dutyRate: 0.30
    }

};


// Start with clothing

let currentCategory = "clothing";


// ==========================================
// SELECT CATEGORY
// ==========================================

function selectCategory(category, button) {

    currentCategory = category;


    // Remove active state from all buttons

    document
        .querySelectorAll(".category")
        .forEach(btn => {
            btn.classList.remove("active");
        });


    // Add active state

    button.classList.add("active");


    // Get category information

    const categoryData =
        categories[category];


    // Update title

    document.getElementById("categoryTitle")
        .textContent =
        categoryData.name + " Calculator";


    // Update duty description

    document.getElementById("categoryDescription")
        .textContent =
        "Duty rate: " +
        (categoryData.dutyRate * 100) +
        "%";


    // Hide previous results

    document
        .getElementById("results")
        .classList
        .add("hidden");
}


// ==========================================
// CALCULATE
// ==========================================

function calculate() {

    const usd =
        Number(
            document.getElementById("usd").value
        );


    const commission =
        Number(
            document.getElementById("commission").value
        ) || 0;


    // Check USD

    if (usd <= 0) {

        alert("Please enter a USD amount.");

        return;
    }


    // Get current category

    const categoryData =
        categories[currentCategory];


    const dutyRate =
        categoryData.dutyRate;


    // ==========================================
    // STEP 1
    // USD → TTD
    // ==========================================

    const totalTT =
        usd * EXCHANGE_RATE;


    // ==========================================
    // STEP 2
    // DUTY
    // ==========================================

    const duty =
        totalTT * dutyRate;


    // ==========================================
    // STEP 3
    // CUSTOMS SERVICE
    // ==========================================

    const customsService =
        totalTT * CUSTOMS_SERVICE_RATE;


    // ==========================================
    // STEP 4
    // OPT
    // ==========================================

    const opt =
        totalTT * OPT_RATE;


    // ==========================================
    // STEP 5
    // ADVANCE PAYMENT
    // ==========================================

    const advancePayment =
        totalTT * ADVANCE_PAYMENT_RATE;


    // ==========================================
    // STEP 6
    // VAT
    // ==========================================

    const vatBase =
        duty +
        customsService +
        opt +
        advancePayment;


    const vat =
        vatBase * VAT_RATE;


    // ==========================================
    // STEP 7
    // FINAL TOTAL
    // ==========================================

    const totalPrice =
        totalTT +
        duty +
        customsService +
        opt +
        advancePayment +
        vat +
        commission;


    // ==========================================
    // DISPLAY TOTAL
    // ==========================================

    document.getElementById("finalTotal")
        .textContent =
        formatMoney(totalPrice);


    // ==========================================
    // DISPLAY BREAKDOWN
    // ==========================================

    document.getElementById("breakdown")
        .innerHTML = `

        <div class="step">

            <div class="step-title">
                1. USD → TTD
            </div>

            <div class="formula">
                $${usd.toFixed(2)}
                ×
                ${EXCHANGE_RATE}
            </div>

            <div class="amount">
                ${formatMoney(totalTT)}
            </div>

        </div>


        <div class="step">

            <div class="step-title">
                2. Duty (${dutyRate * 100}%)
            </div>

            <div class="formula">
                ${formatMoney(totalTT)}
                ×
                ${dutyRate * 100}%
            </div>

            <div class="amount">
                ${formatMoney(duty)}
            </div>

        </div>


        <div class="step">

            <div class="step-title">
                3. Customs Service (12.5%)
            </div>

            <div class="formula">
                ${formatMoney(totalTT)}
                ×
                12.5%
            </div>

            <div class="amount">
                ${formatMoney(customsService)}
            </div>

        </div>


        <div class="step">

            <div class="step-title">
                4. OPT (15%)
            </div>

            <div class="formula">
                ${formatMoney(totalTT)}
                ×
                15%
            </div>

            <div class="amount">
                ${formatMoney(opt)}
            </div>

        </div>


        <div class="step">

            <div class="step-title">
                5. Advance Payment (15%)
            </div>

            <div class="formula">
                ${formatMoney(totalTT)}
                ×
                15%
            </div>

            <div class="amount">
                ${formatMoney(advancePayment)}
            </div>

        </div>


        <div class="step">

            <div class="step-title">
                6. VAT (12.5%)
            </div>

            <div class="formula">

                (${formatMoney(duty)}
                +
                ${formatMoney(customsService)}
                +
                ${formatMoney(opt)}
                +
                ${formatMoney(advancePayment)})
                ×
                12.5%

            </div>

            <div class="amount">
                ${formatMoney(vat)}
            </div>

        </div>


        <div class="step">

            <div class="step-title">
                7. Commission
            </div>

            <div class="formula">
                Additional commission
            </div>

            <div class="amount">
                ${formatMoney(commission)}
            </div>

        </div>


        <div class="step">

            <div class="step-title">
                8. Final Total
            </div>

            <div class="formula">

                ${formatMoney(totalTT)}
                +
                ${formatMoney(duty)}
                +
                ${formatMoney(customsService)}
                +
                ${formatMoney(opt)}
                +
                ${formatMoney(advancePayment)}
                +
                ${formatMoney(vat)}
                +
                ${formatMoney(commission)}

            </div>

            <div class="amount">
                ${formatMoney(totalPrice)}
            </div>

        </div>

    `;


    // Show results

    document
        .getElementById("results")
        .classList
        .remove("hidden");
}


// ==========================================
// FORMAT MONEY
// ==========================================

function formatMoney(value) {

    return "TT$" + value.toFixed(2);

}