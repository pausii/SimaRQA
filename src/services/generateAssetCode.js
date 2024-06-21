const generateAssetCode = async (Model, prefix) => {
    const assetCount = await Model.count();
    const newCodeNumber = assetCount + 1;
    const assetCode = `${prefix.toUpperCase()}${newCodeNumber.toString().padStart(3, '0')}`;
    return assetCode;
};

module.exports = generateAssetCode;