const isDuplicatedEmail = (users, newEmail) => {
    users.forEach(user => {
        if (user.email === newEmail) {
            return false;            
        }
    });
    
    return true;
}