const route = require('express').Router();

const authLogin = require('./authRoutes');

const profileRoutes = require('./profileRoutes');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');

const assetMushollaRoutes = require('./ruangAssetMushollaRoutes');
const assetAuditoriumRoutes = require('./ruangAssetAuditoriumRoutes');
const assetPerpustakaanRoutes = require('./ruangAssetPerpustakaanRoutes');
const assetUtilitasRoutes = require('./ruangAssetUtilitasRoutes');

const reportAssetMushollaRoutes = require('./reportAssetMushollaRoutes');
const reportAssetAuditoriumRoutes = require('./reportAssetAuditoriumRoutes');
const reportAssetPerpustakaanRoutes = require('./reportAssetPerpustakaanRoutes');
const reportAssetUtilitasRoutes = require('./reportAssetUtilitasRoutes');

const maintenanceTransactionRoutes = require('./maintenanceTransactionRoutes');
const borrowedReturnTransactionRoutes = require('./borrowedReturnTransactionRoutes');

route.use('/api/auth', authLogin);

route.use('/api/profile', profileRoutes);
route.use('/api/user', userRoutes);
route.use('/api/category', categoryRoutes);

route.use('/api/musholla', assetMushollaRoutes);
route.use('/api/auditorium', assetAuditoriumRoutes);
route.use('/api/perpustakaan', assetPerpustakaanRoutes);
route.use('/api/utilitas', assetUtilitasRoutes);

route.use('/api/musholla', reportAssetMushollaRoutes);
route.use('/api/auditorium', reportAssetAuditoriumRoutes);
route.use('/api/perpustakaan', reportAssetPerpustakaanRoutes);
route.use('/api/utilitas', reportAssetUtilitasRoutes);

route.use('/api/maintenance', maintenanceTransactionRoutes);
route.use('/api/borrowed-return/', borrowedReturnTransactionRoutes);

module.exports = route;
