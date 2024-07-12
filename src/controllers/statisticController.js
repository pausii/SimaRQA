const { RuangAsetAuditorium, RuangAsetMusholla, RuangAsetPerpustakaan, RuangAsetUtilitas, CategoryAsset, Users, PemeliharaanAsset, PeminjamanPengembalianAsset } = require('../models');

const handleError = (res, error, message = 'Kesalahan Server Internal', status = 500) => {
    console.error(error);
    res.status(status).json({ message });
};

const getCountData = async (req, res) => {
    const { type } = req.query;

    console.log('Received type:', type); // Debugging statement

    try {
        let count;

        switch (type) {
            case 'auditorium':
                count = await RuangAsetAuditorium.count();
                break;
            case 'musholla':
                count = await RuangAsetMusholla.count();
                break;
            case 'perpustakaan':
                count = await RuangAsetPerpustakaan.count();
                break;
            case 'utilitas':
                count = await RuangAsetUtilitas.count();
                break;
            case 'category':
                count = await CategoryAsset.count();
                break;
            case 'users': 
                count = await Users.count();
                break;
            case 'maintenance':
                count = await PemeliharaanAsset.count();
                break;
            case 'borrowed-return':
                count = await PeminjamanPengembalianAsset.count();
                break;
            default:
                return res.status(400).json({ error: 'Kesalahan Parameter Tipe' });
        }

        console.log('Count:', count); // Debugging statement

        res.status(200).json({ type, count });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    getCountData
};

