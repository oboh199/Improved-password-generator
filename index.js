document.getElementById('generateBtn').addEventListener('click', generatePassword);
document.getElementById('copyBtn').addEventListener('click', copyPassword);
document.getElementById('lengthSlider').addEventListener('input', updateLengthValue);

function generatePassword() {
    const word1 = document.getElementById('word1').value;
    const word2 = document.getElementById('word2').value;
    const word3 = document.getElementById('word3').value;
    const includeUppercase = document.getElementById('uppercaseCheckbox').checked;
    const passwordLength = parseInt(document.getElementById('lengthSlider').value, 10);

    if (word1 && word2 && word3) {
        let combinedWords = `${word1}${word2}${word3}`;
        
        if (includeUppercase) {
            combinedWords = convertToUppercase(combinedWords);
        }

        const specialChars = "!@#$%^&*()_+{}[]|:;<>,.?";
        let password = combinedWords;

        // Add random characters to reach the desired length
        while (password.length < passwordLength) {
            const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
            const randomNumber = Math.floor(Math.random() * 10);
            const randomSelection = [randomSpecialChar, randomNumber.toString()];
            password += randomSelection[Math.floor(Math.random() * randomSelection.length)];
        }

        // Trim the password if it exceeds the desired length
        document.getElementById('passwordOutput').textContent = password.slice(0, passwordLength);

        // const specialChars = "!@#$%^&*()_+{}[]|:;<>,.?";
        // const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
        // const randomNumber = Math.floor(Math.random() * 100);

        // const password = `${combinedWords}${randomSpecialChar}${randomNumber}`;
        // document.getElementById('passwordOutput').textContent = password;
    } else {
        document.getElementById('passwordOutput').textContent = "Please enter all three words.";
    }
}

// convertToUppercase Function: This function randomly converts some of the characters in the combined words to uppercase.
// Logic Update: If the user selects the checkbox, the convertToUppercase function is applied to the combined words before 
// generating the final password.

function convertToUppercase(text) {
    return text.split('').map(char => {
        return Math.random() > 0.5 ? char.toUpperCase() : char;
    }).join('');
}


async function copyPassword() {
    const passwordText = document.getElementById('passwordOutput').textContent;

    if (passwordText) {
        try {
            await navigator.clipboard.writeText(passwordText);
            alert('Password copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy password. Please try again.');
        }
    } else {
        alert('No password to copy. Please generate a password first.');
    }
}


function updateLengthValue() {
    const lengthValue = document.getElementById('lengthSlider').value;
    document.getElementById('lengthValue').textContent = lengthValue;
}