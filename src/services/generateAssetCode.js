const generateAssetCode = async (Model, prefix) => {
    const lastAsset = await Model.findOne({
        order: [['asset_id', 'DESC']]
    });
    
    if (!lastAsset) {
        return `${prefix.toUpperCase()}001`;
    }

    const codeNumber = parseInt(lastAsset.asset_code.replace(prefix, ''));
    const newCodeNumber = codeNumber + 1;
    return `${prefix.toUpperCase()}${newCodeNumber.toString().padStart(3, '0')}`;
};

module.exports = generateAssetCode;