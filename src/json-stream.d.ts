// https://github.com/dominictarr/JSONStream/issues/139
declare module 'JSONStream' {
  // Type definitions for JSONStream v0.8.0
  // Project: https://github.com/dominictarr/JSONStream
  // Definitions by: Bart van der Schoor <https://github.com/Bartvds>
  // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

  /// <reference types="node" />

  export interface Options {
    recurse: boolean;
  }

  export declare function parse(pattern: unknown): NodeJS.ReadWriteStream;
  export declare function parse(patterns: unknown[]): NodeJS.ReadWriteStream;

  /**
   * Create a writable stream.
   * you may pass in custom open, close, and seperator strings. But, by default,
   * JSONStream.stringify() will create an array,
   * (with default options open='[\n', sep='\n,\n', close='\n]\n')
   */
  export declare function stringify(): NodeJS.ReadWriteStream;

  /** If you call JSONStream.stringify(false) the elements will only be seperated by a newline. */
  export declare function stringify(newlineOnly: NewlineOnlyIndicator): NodeJS.ReadWriteStream;
  type NewlineOnlyIndicator = false;

  /**
   * Create a writable stream.
   * you may pass in custom open, close, and seperator strings. But, by default,
   * JSONStream.stringify() will create an array,
   * (with default options open='[\n', sep='\n,\n', close='\n]\n')
   */
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  export declare function stringify(
    open: string,
    separator: string,
    close: string,
  ): NodeJS.ReadWriteStream;

  export declare function stringifyObject(): NodeJS.ReadWriteStream;
  export declare function stringifyObject(
    open: string,
    separator: string,
    close: string,
  ): NodeJS.ReadWriteStream;
}
