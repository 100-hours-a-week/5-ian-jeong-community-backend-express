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