
import FileOp from "./FileOp";

let workingDir = process.cwd();
console.log('workingDir: ' + workingDir);

// FileOp.copyFile('./test/333.txt', './test/444.txt');
// FileOp.copyDirectory('./test', './test2');
// FileOp.removeDirectory('./test2');
//FileOp.removeFile('./xxx.txt');
// FileOp.replaceTextInFile('./test/333.txt', [{ startMark: '////33333start////', endMark: '////33333end////', text: '' }]);
// FileOp.modifyJsonInFile('D:\\Projects\\Hermes\\settings\\builder.json', [{ op: 'delete', keyPath: 'orientation/landscapeLeftXXX', value: false }])
FileOp.replaceTextInFileByReg('D:/Projects/Hermes/build-templates/jsb-link-cn/frameworks/runtime-src/proj.android-studio/app/build.gradle', [{ reg: /(\s*versionCode\s+)\d+/gi, text: '$180' }]);
console.info('done');