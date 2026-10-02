
function calculateSolution() {
            const expense = parseFloat(document.getElementById('monthlyExpense').value);
            const resultBox = document.getElementById('calcResult');
            const specOutput = document.getElementById('systemSpec');

            if (isNaN(expense) || expense <= 0) {
                alert('Please enter a valid monthly electricity amount.');
                return;
            }

            let inverterSize = "";
            let batteryCapacity = "";
            let panelCapacity = "";

            if (expense < 1500) {
                inverterSize = "3.6 kW Hybrid Inverter";
                batteryCapacity = "5.12 kWh LiFePO4 Lithium Battery";
                panelCapacity = "4x 550W Solar Panels";
            } else if (expense >= 1500 && expense < 3500) {
                inverterSize = "5 kW / 6 kW Hybrid Inverter";
                batteryCapacity = "10.24 kWh LiFePO4 Battery Bank";
                panelCapacity = "6x to 8x 550W High-Efficiency Solar Panels";
            } else {
                inverterSize = "8 kW to 12 kW Single-Phase / 3-Phase Inverter Setup";
                batteryCapacity = "14.3 kWh to 20 kWh LiFePO4 High-Capacity Bank";
                panelCapacity = "10x to 16x 550W Solar Panels";
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