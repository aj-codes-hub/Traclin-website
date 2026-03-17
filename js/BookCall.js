function goBack() {

    var modal2 = bootstrap.Modal.getInstance(document.getElementById("modalStep2"));
    modal2.hide();

    new bootstrap.Modal(document.getElementById("modalStep1")).show();

}
document.getElementById("confirmStep1").onclick = function() {

    var form = document.getElementById("step1Form");

    if (form.checkValidity()) {

        var modal1 = bootstrap.Modal.getInstance(document.getElementById("modalStep1"));
        modal1.hide();

        new bootstrap.Modal(document.getElementById("modalStep2")).show();

    } else {
        form.classList.add("was-validated");
    }

};
document.getElementById("confirmStep2").onclick = function() {

    var form = document.getElementById("step2Form");

    if (form.checkValidity()) {

        var modal2 = bootstrap.Modal.getInstance(document.getElementById("modalStep2"));
        modal2.hide();

        new bootstrap.Modal(document.getElementById("modalStep3")).show();

    } else {
        form.classList.add("was-validated");
    }
};
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el))

document.addEventListener("DOMContentLoaded", function () {

    const dateInput = document.getElementById("startDate");
    const timeSelect = document.getElementById("startTime");

    // Prevent selecting past dates
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;

    dateInput.addEventListener("change", function () {

        const now = new Date();
        const selectedDate = dateInput.value;

        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        // loop through all time options
        for (let option of timeSelect.options) {

            if (!option.value) continue; // skip "Select Time"

            let [hour, minute] = option.value.split(":");
            let optionTime = (hour * 60) + parseInt(minute);

            // disable past times if today is selected
            if (selectedDate === today && optionTime <= currentTime) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }

        }

    });

});