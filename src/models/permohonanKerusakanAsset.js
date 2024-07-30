'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PermohonanKerusakanAsset extends Model {
        static associate(models) {   
        }
    }

    PermohonanKerusakanAsset.init({
        request_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        request_asset_code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        request_asset_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        damage_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status_confirmation: {
            type: DataTypes.ENUM,
            values: ['Sedang Dikonfirmasi', 'Sudah Dikonfirmasi'],
            defaultValue: 'Sedang Dikonfirmasi',
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'PermohonanKerusakanAsset',
        tableName: 'permohonan_kerusakan_asset',
        timestamps: true,
    });
    return PermohonanKerusakanAsset;
};


