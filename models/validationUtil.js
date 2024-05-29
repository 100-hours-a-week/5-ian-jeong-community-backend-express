const isDuplicatedEmail = (users, email) => {
    let result = false;
    users.forEach(user => {
        if (user.email === email) {
            result = true;            
        }
    });
    
    return result;
}

const isDuplicatedNickname = (users, nickname) => {
    let result = false;
    users.forEach(user => {
        if (user.nickname === nickname) {
            result = true;   
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
    isDuplicatedEmail,
    isDuplicatedNickname,
    validateAccount,
};
