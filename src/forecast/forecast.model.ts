import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ForecastParts } from '../shared/constants/forecast-parts';

export interface ForecastCreationAttributes {
  lat: number;
  lon: number;
  part: string;
  data: object;
}

@Table({
  tableName: 'forecast',
  createdAt: '_created_at',
  updatedAt: '_updated_at',
  indexes: [
    {
      unique: true,
      fields: ['lat', 'lon', 'part'],
    },
  ],
})
export class Forecast extends Model<Forecast, ForecastCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  _id: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  lat: number;

  @Column({ type: DataType.DOUBLE, allowNull: false })
  lon: number;

  @Column({
    type: DataType.ENUM({ values: Object.keys(ForecastParts) }),
    allowNull: true,
  })
  part: string;

  @Column({ type: DataType.JSONB })
  data: object;
}
