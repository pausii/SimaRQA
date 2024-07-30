const {
    RuangAsetMusholla,
    RuangAsetAuditorium,
    RuangAsetPerpustakaan,
    RuangAsetUtilitas,
    Notification
} = require('../models');

const addNotification = async (assetCode, message) => {
    await Notification.create({
        asset_code: assetCode,
        message: message
    });
};

const checkMaintenanceSchedules = async () => {
    const assets = await Promise.all([
        RuangAsetAuditorium.findAll(),
        RuangAsetMusholla.findAll(),
        RuangAsetPerpustakaan.findAll(),
        RuangAsetUtilitas.findAll()
    ]);

    const allAssets = assets.flat();

    allAssets.forEach(asset => {
        const { asset_code, asset_name, last_maintenance_date, maintenance_interval_days } = asset;
        const maintenanceDate = new Date(last_maintenance_date);
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate.getTime() - maintenanceDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (diffDays > maintenance_interval_days) {
            const message = `Asset ${asset_name} perlu dipelihara kembali. Terakhir Pemeliharaan di tanggal ${maintenanceDate.toDateString()}.`;
            addNotification(id, message);
        }
    });
};

module.exports = { checkMaintenanceSchedules };