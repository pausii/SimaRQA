const validateUserProfileData = (data) => {
    const { username, role, first_name, last_name, phone_number, address } = data;

    if (
        !username ||
        !role ||
        !first_name ||
        !last_name ||
        !phone_number ||
        !address 
    ) {
        return false;
    }
    return true;
};

module.exports = {
    validateUserProfileData
}