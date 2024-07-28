import { ModelCtor, Sequelize } from "sequelize-typescript";

export default class DataBaseController {
  sequelize: Sequelize;
  constructor(models: string[] | ModelCtor[] | undefined) {
    this.sequelize = new Sequelize({
      database: process.env.DB_NAME,
      dialect: "sqlite",
      storage: `${process.env.DB_STORAGE}`,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // host: process.env.DB_HOST,
      // port: process.env.DB_PORT,
      models, // or [Player, Team],
      pool: {
        idle: 10000,
        acquire: 30000,
      },
    });
  }

  async connectDB(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      await this.sequelize.sync({ alter: true });
      console.log("✅ Connection has been established successfully.");
    } catch (error) {
      await this.sequelize.close();
      console.error("❌ Unable to connect to the database:", error);
    }
  }

  async disconnectDB(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log("✅ Connection has been closed successfully.");
    } catch (error) {
      console.error("❌ Unable to close the database connection:", error);
      throw error; // Пробрасываем ошибку для обработки во внешнем коде
    }
  }
}
