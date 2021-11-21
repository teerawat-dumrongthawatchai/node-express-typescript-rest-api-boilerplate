import db from '../../../config/database.config';
import { DataTypes, Model } from 'sequelize/dist';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export default class TodoInstance extends Model<Todo> {}

TodoInstance.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  },
  {
    sequelize: db,
    tableName: 'todos'
  }
);
