import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as path from "path";
import JsonOp from "./JsonOp";
import TextOp from "./TextOp";

export default class FileOp {
    static existsFile(path: string) {
        return fs.existsSync(path);
    }
    // 删除文件，如果不存在则忽略
    static removeFile(path: string) {
        // fsExtra.rmSync(path, { force: true });
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    }
    // 删除目录，如果不存在则忽略
    static removeDirectory(path: string) {
        fsExtra.rmdirSync(path, { recursive: true });
    }
    // 复制文件，src必须存在，目标路径自动创建
    static copyFile(src: string, dest: string) {
        let dir = path.dirname(dest);
        fsExtra.ensureDirSync(dir);
        fs.copyFileSync(src, dest);
    }
    static copyDirectory(src: string, dest: string) {
        fsExtra.copySync(src, dest, { recursive: true });
    }
    static saveFileUtf8(destPath: string, text: string) {
        let dir = path.dirname(destPath);
        fsExtra.ensureDirSync(dir);
        fs.writeFileSync(destPath, text, { encoding: 'utf-8' });
    }
    static readFileUtf8(destPath: string): string {
        return fs.readFileSync(destPath, { encoding: 'utf-8' });
    }
    // array一项，表示把startMark,endMark中间的文本替换为text
    // example
    // startMark //#region autoPMPlayerXSave >>>>>>>>自动生成区域开始
    // endMark   //#endregion autoPMPlayerXSave <<<<<<<<自动生成区域结束
    static replaceTextInFileByMark(destPath: string, array: { startMark: string, endMark: string, text: string }[]) {
        let content = this.readFileUtf8(destPath);
        for (let i = 0; i < array.length; i++) {
            // let endMark = array[i].startMark.replace('#region', '#endregion');
            content = TextOp.replaceTextByMark(content, array[i].startMark, array[i].endMark, array[i].text);
        }
        this.saveFileUtf8(destPath, content);
    }
    // example
    // reg: /(\s*versionCode\s+)\d+/gi
    // text: '$180'
    static replaceTextInFileByReg(destPath: string, array: { reg: string | RegExp, text: string }[]) {
        let content = this.readFileUtf8(destPath);
        for (let i = 0; i < array.length; i++) {
            // let endMark = array[i].startMark.replace('#region', '#endregion');
            content = TextOp.replaceTextByReg(content, array[i].reg, array[i].text);
        }
        this.saveFileUtf8(destPath, content);
    }
    static modifyJsonInFile(destPath: string, array: { op: 'add' | 'delete', keyPath: string, value: any }[]) {
        let content = this.readFileUtf8(destPath);
        let json = JsonOp.toJson(content);
        for (let i = 0; i < array.length; i++) {
            JsonOp.modify(json, array[i].op, array[i].keyPath, array[i].value);
        }
        let newContent = JsonOp.toString(json);
        this.saveFileUtf8(destPath, newContent);
    }
}