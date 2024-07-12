const { RuangAsetAuditorium, RuangAsetMusholla, RuangAsetPerpustakaan, RuangAsetUtilitas, CategoryAsset, Users, PemeliharaanAsset, PeminjamanPengembalianAsset } = require('../models');

const handleError = (res, error, message = 'Kesalahan Server Internal', status = 500) => {
    console.error(error);
    res.status(status).json({ message });
};

const getCountData = async (req, res) => {
    try {
        const auditorium = await RuangAsetAuditorium.count();
        const musholla = await RuangAsetMusholla.count();
        const perpustakaan = await RuangAsetPerpustakaan.count();
        const utilitas = await RuangAsetUtilitas.count();
        const borrowedReturn = await PeminjamanPengembalianAsset.count();
        const maintenance = await PemeliharaanAsset.count();
        const users = await Users.count();
        const categories = await CategoryAsset.count();

        res.status(200).json({
            auditorium,
            musholla,
            perpustakaan,
            utilitas,
            borrowedReturn,
            maintenance,
            users,
            categories
        });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getCountData
};

