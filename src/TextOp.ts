export default class TextOp {
    static replaceTextByMark(content: string, startMark: string, endMark: string, text: string): string {
        let start = content.indexOf(startMark);
        if (start < 0) {
            throw ('startMark ' + startMark + ' not found');
        }
        while (true) {
            start++;
            if (start >= content.length) {
                break;
            }
            if (content[start] == '\n') {
                break;
            }
        }

        let end = content.indexOf(endMark);
        if (end <= 0) {
            console.error('endMark ' + endMark + ' not found');
            process.exit(1);
        }
        while (true) {
            end--;
            if (end < 0) {
                break;
            }
            if (content[end] == '\n') {
                break;
            }
        }

        let pre = content.substring(0, start + 1);
        let post = content.substring(end);
        return pre + text + post;
    }
    static replaceTextByReg(content: string, reg: string | RegExp, text: string): string {
        return content.replace(reg, text);
    }
}