const schedule = require('node-schedule');
const { checkMaintenanceSchedules } = require('../services/checkscedule');

let scheduleJob;

const startMaintenanceSchedule = (req, res) => {
    if (scheduleJob) {
        return res.status(400).json({ message: 'Jadwal pemeliharaan sudah berjalan' });
    }

    scheduleJob = schedule.scheduleJob('0 0 * * *', async () => {
        console.log('Memeriksa jadwal pemeliharaan...');
        await checkMaintenanceSchedules();
    })

    res.status(200).json({ message: 'Jadwal pemeliharaan dimulai'});
};

const stopMaintenanceSchedule = (req, res) => {
    if (!scheduleJob) {
        return res.status(400).json({ message: 'Tidak ada jadwal pemeliharaan yang berjalan'});
    }

    scheduleJob.cancel();
    scheduleJob = null;

    res.status(200).json({ message: 'Jadwal pemeliharaan dihentikan'});
}

module.exports = {
    startMaintenanceSchedule,
    stopMaintenanceSchedule
}