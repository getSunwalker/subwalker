import { readFileSync, writeFileSync } from 'fs';
export const saveFile = (fileName: string, content: any): void => {
    writeFileSync(fileName, content, {
        encoding: 'utf8',
    });
};
export const readFile = (fileName: string): string => {
    return readFileSync(fileName, {
        encoding: 'utf8',
    });
};
