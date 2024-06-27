const validateUserProfileData = (data) => {
    const { first_name, last_name, phone_number, address } = data;

    if (
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