// to make the file a module and avoid the TypeScript error.
export {};

declare global {
  namespace Express {
    namespace Multer {
      export interface File {
        location: string;
      }
    }
  }
}
