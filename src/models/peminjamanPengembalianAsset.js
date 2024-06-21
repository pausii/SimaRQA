'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PeminjamanPengembalianAsset extends Model {
        static associate(models) {   
        }
    }

    PeminjamanPengembalianAsset.init({
        borrowed_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        borrowed_asset_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        borrowed_asset_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        borrowed_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        used_by_program: {
            type: DataTypes.ENUM,
            values: ['MIQA', 'ATA', 'Sedekah Sampah', 'Tahsin', 'TPQ'],
            allowNull: null
        },
        borrowed_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        return_date: {
            type: DataTypes.DATE,
            allowNull: true
          },
        status: {
            type: DataTypes.ENUM,
            values: ['Dipinjam', 'Dikembalikan'],
            defaultValue: 'Dipinjam',
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'PeminjamanPengembalianAsset',
        tableName: 'peminjaman_pengembalian_asset',
        timestamps: true,
    });
    return PeminjamanPengembalianAsset;
};