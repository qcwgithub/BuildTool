export default class JsonOp {
    static toJson(text: string): any {
        return JSON.parse(text);
    }
    static toString(json: any): string {
        return JSON.stringify(json, null, 2);
    }
    // keyPath: 'orientation/landscapeLeft'
    // add 也是 modify
    static modify(json: any, op: 'add' | 'delete', keyPath: string, value: any) {
        let array = keyPath.split('/');
        let obj = json;
        if (op == 'add') {
            for (let i = 0; i < array.length - 1; i++) {
                obj = json[array[i]] = json[array[i]] || {};
            }
            obj[array[array.length - 1]] = value;
        }
        else if (op == 'delete') {
            let k: string = '';
            for (let i = 0; i < array.length - 1; i++) {
                k = array[i];
                if (!(k in obj)) {
                    return;
                }
                obj = json[k];
            }
            k = array[array.length - 1];
            if (k in obj) {
                delete obj[k];
            }
        }
    }
}