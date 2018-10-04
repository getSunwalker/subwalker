import * as fs from '@sunwalker/utils/file';
import has from '@sunwalker/utils/has';
import each from '@sunwalker/utils/has';
import xmlToJSON from '@sunwalker/xml-to-json';
import * as path from 'path';
interface IVueToWxminiBaseOptions {
    render(ast:any):string{};
}
export interface IVueToWxminiWxmlOptions extends IVueToWxminiBaseOptions {}
export interface IVueToWxminiWxssOptions extends IVueToWxminiBaseOptions {}
export interface IVueToWxminiScriptOptions extends IVueToWxminiBaseOptions {}
export interface IVueToWxminiJSONOptions extends IVueToWxminiBaseOptions {}
export interface IVueToWxminiOuput {
    wxml: IVueToWxminiWxmlOptions;
    wxss: IVueToWxminiWxssOptions;
    script: IVueToWxminiScriptOptions;
    json: IVueToWxminiJSONOptions;
}

export interface IVueToWxminiOptions {
    content: string;
    output: IVueToWxminiOuput;
}

export default (options: IVueToWxminiOptions): void => {};
