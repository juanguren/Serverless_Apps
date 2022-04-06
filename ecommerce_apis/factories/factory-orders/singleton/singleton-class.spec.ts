import Configuration from './singleton-class';

// mongodb+srv://juanguren:<password>@cluster0.krt3b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

describe('Configuration class', () => {
  it('Class instances should exist', () => {
    expect(Configuration).toBeDefined();
    expect(Configuration.getInstance()).toBeDefined();
  });
  it('Class instances should be singletons', () => {
    const instance1 = Configuration.getInstance();
    const instance2 = Configuration.getInstance();

    expect(instance1).toBe(instance2);
    expect(instance1).toBeInstanceOf(Configuration);
  });
  it('New instance should correctly return data', () => {
    const instance = Configuration;

    expect(instance.getEnvironment()).toBe('development');
    expect(instance.getConnection()).toBe('mongodb://localhost/test');
    expect(instance.getPort()).toEqual(3000);
  });
});
