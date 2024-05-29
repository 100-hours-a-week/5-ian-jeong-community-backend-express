const validateDuplicatedEmail = (users, email) => {
    let result = true;
    users.forEach(user => {
        if (user.email === email) {
            result = false;            
        }
    });
    
    return result;
}

const validateDuplicatedNickname = (users, nickname) => {
    let result = true;
    users.forEach(user => {
        if (user.nickname === nickname) {
            result = false;   
        }
    });
    
    return result;
}

const validateAccount = (users, input) => {
    let result = false;
    
    users.forEach(user => {
        if (user.email === input.email && user.password === input.password) {
            result = true;
        }
    })
    
    return result;
}


export default {
    validateDuplicatedEmail,
    validateDuplicatedNickname,
    validateAccount,
};
