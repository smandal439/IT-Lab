function toggleTargetDate() {
    const useCurrentDate = document.getElementById("use-current-date").checked;
    const targetDateGroup = document.getElementById("target-date-group");
    if (useCurrentDate) {
        targetDateGroup.style.display = "none";
    } else {
        targetDateGroup.style.display = "block";
    }
}

function calculateAge() {
    const birthdateInput = document.getElementById("birthdate").value;
    const useCurrentDate = document.getElementById("use-current-date").checked;
    const targetdateInput = document.getElementById("targetdate").value;
    const resultElement = document.getElementById("age-result");

    if (!birthdateInput) {
        resultElement.innerHTML = "Please enter a valid birthdate.";
        return;
    }

    const birthDate = new Date(birthdateInput);
    let targetDate;

    if (useCurrentDate) {
        targetDate = new Date();
    } else {
        if (!targetdateInput) {
            resultElement.innerHTML = "Please enter a target date.";
            return;
        }
        targetDate = new Date(targetdateInput);
    }

    if (birthDate > targetDate) {
        resultElement.innerHTML = "Birthdate cannot be after the target date!";
        return;
    }

    let years = targetDate.getFullYear() - birthDate.getFullYear();
    let months = targetDate.getMonth() - birthDate.getMonth();
    let days = targetDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    let resultText = "You are";
    if (!useCurrentDate) {
        resultText = "Age at target date is";
    }

    resultElement.innerHTML = `${resultText} <span class="highlight">${years}</span> years, <span class="highlight">${months}</span> months, and <span class="highlight">${days}</span> days.`;
}
