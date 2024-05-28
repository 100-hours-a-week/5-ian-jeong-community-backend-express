const isDuplicatedEmail = (users, email) => {
    users.forEach(user => {
        if (user.email === email) {
            return false;            
        }
    });
    
    return true;
}

const isDuplicatedNickname = (users, nickname) => {
    users.forEach(user => {
        if (user.nickname === nickname) {
            return false;            
        }
    });
    
    return true;
}

const validateAccount = (users, input) => {
    users.forEach(user => {
        if (user.email === input.email && user.password === input.password) {
            return true;
        }
    })

    return false;
}


export default {
    isDuplicatedEmail,
    isDuplicatedNickname,
    validateAccount,
};
