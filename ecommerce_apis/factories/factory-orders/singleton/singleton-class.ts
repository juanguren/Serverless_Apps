import config from './config.json';

export default class Configuration {
  private static instance: Configuration;

  // Private properties cannot be called from the outside, so getters must be declared below
  private static environment: string;
  private static connection: string;
  private static apiUrl: string;
  private static port: number;

  // Private constructor prevents construction outside this class
  private constructor() {}

  private static initialize() {
    this.environment = config.app.environment;
    this.connection = config.app.connection;
    this.apiUrl = config.app.apiUrl;
    this.port = config.app.port;
  }

  public static getInstance(): Configuration {
    if (!this.instance) {
      this.initialize();
      this.instance = new Configuration();
    }
    return this.instance;
  }

  // Getters
  public static getEnvironment(): string {
    return Configuration.environment;
  }

  public static getConnection(): string {
    return Configuration.connection;
  }

  public static getApiUrl(): string {
    return Configuration.apiUrl;
  }

  public static getPort(): number {
    return Configuration.port;
  }
}
