declare module "luxy.js" {
  interface LuxyOptions {
    wrapper?: string;
    targets?: string;
    wrapperSpeed?: number;
  }

  const luxy: {
    init(options?: LuxyOptions): void;
    destroy(): void;
  };

  export default luxy;
}
