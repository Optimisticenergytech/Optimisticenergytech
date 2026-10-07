
function calculateSolution() {
            const expense = parseFloat(document.getElementById('monthlyExpense').value);
            const resultBox = document.getElementById('calcResult');
            const specOutput = document.getElementById('systemSpec');

            if (isNaN(expense) || expense <= 0) {
                alert('Please enter a valid monthly electricity amount.');
                return;
            }

            function calculateSolution() {
    const expense = parseFloat(document.getElementById('expense').value);
    const resultBox = document.getElementById('calcResult');
    const specOutput = document.getElementById('systemSpec');

    if (isNaN(expense) || expense <= 0) {
        alert('Please enter a valid monthly electricity amount.');
        return;
    }

    // --- Excel Sizing Matrix Parameters ---
    const tariff = 4.66; // ZAR/kWh (Default tariff from sizing matrix)
    const daysInMonth = 30.416;
    
    // 1. Energy Bill & Tariff Setup Calculations
    const monthlyKWh = expense / tariff;
    const dailyKWh = monthlyKWh / daysInMonth;
    const daytimeUsage = dailyKWh * 0.40;
    
    // 2. Dynamic Sizing Logic based on Excel Matrix Rules
    let inverterSize = "";
    let batteryCapacity = "";
    let panelCapacity = "";

    if (expense < 1500) {
        inverterSize = "3.6 kW Hybrid Inverter (Hanchu HESS-HY-S-3.6K)";
        batteryCapacity = "5.12 kWh LiFePO4 Battery (Hanchu HOME-ESS-LV-5.12K)";
        panelCapacity = "4x 585W Solar Panels (RS6-585NBG-E3)";
    } else if (expense >= 1500 && expense < 3500) {
        inverterSize = "5 kW / 6 kW Hybrid Inverter (Hanchu HESS-HY-S-6.0K)";
        batteryCapacity = "10.24 kWh LiFePO4 Battery Bank (2x 5.12kWh)";
        panelCapacity = "8x to 10x 585W Solar Panels";
    } else {
        // High usage tier matching spreadsheet matrix formulas (e.g., ~R12,000 bill scale)
        const calculatedPanels = Math.ceil((dailyKWh * 1.2) / (4.5 * 0.585)); // Winter peak sun hours factor
        inverterSize = "3x 12 kW Single-Phase Hybrid (Hanchu HESS-HY-S-12K-S Parallel)";
        batteryCapacity = "32 kWh LiFePO4 Battery Bank (2x 16kWh Hanchu HOME-ESS-LV-16K-S)";
        panelCapacity = `${Math.max(calculatedPanels, 10)}x 585W High-Efficiency Solar Panels (RS6-585NBG-E3)`;
    }

    // Output formatting
    specOutput.innerHTML = `
        <strong>Inverter Capacity:</strong> ${inverterSize}<br>
        <strong>Battery Storage:</strong> ${batteryCapacity}<br>
        <strong>PV Array:</strong> ${panelCapacity}<br><br>
        <small class="text-secondary">Note: Sized dynamically using Hanchu Engineering Matrix (Tariff: R${tariff}/kWh).</small>
    `;
    resultBox.style.display = 'block';

    // Form submission binding remains untouched below...
}
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            

            specOutput.innerHTML = `
                <strong>Inverter Capacity:</strong> ${inverterSize}<br>
                <strong>Battery Storage:</strong> ${batteryCapacity}<br>
                <strong>PV Array:</strong> ${panelCapacity}<br><br>
                <small class="text-secondary">Note: This is an estimated baseline. Fill in the form below or chat with us on WhatsApp to schedule a precise technical site inspection and official quotation.</small>
            `;
            resultBox.style.display = 'block';
        }

        const form = document.getElementById('serviceForm');
        const formSuccess = document.getElementById('formSuccess');
        const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async function(event) {
            event.preventDefault();
            submitBtn.disabled = true;
            submitBtn.innerText = "Transmitting...";

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formSuccess.style.display = 'block';
                    form.reset();
                    submitBtn.innerText = "Request Sent Successfully!";
                } else {
                    alert("Submission failed. Please check your network connection or message us directly via WhatsApp.");
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Submit Request via Email";
                }
            } catch (error) {
                alert("An error occurred while sending your request. Please use our direct WhatsApp or phone contacts.");
                submitBtn.disabled = false;
                submitBtn.innerText = "Submit Request via Email";
            }
        });