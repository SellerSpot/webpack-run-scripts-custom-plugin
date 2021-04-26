import { Compiler } from 'webpack';
import childProcess from 'child_process';

export interface IWebpackCustomRunScriptsPluginProps {
    command?: string;
    allowOnWarning?: boolean;
    allownOnError?: boolean;
}

export class WebpackCustomRunScriptsPlugin {
    private options: IWebpackCustomRunScriptsPluginProps;

    constructor(options: IWebpackCustomRunScriptsPluginProps) {
        this.options = options;
    }

    apply(compiler: Compiler): void {
        compiler.hooks.afterEmit.tap('Hello World Plugin', (stats) => {
            const { command, allowOnWarning, allownOnError } = this.options;
            const hasException =
                (stats.getStats().hasErrors() && !allownOnError) ||
                (stats.getStats().hasWarnings() && !allowOnWarning);
            if (!hasException) {
                const child = childProcess.exec(command);
                console.log('Command Execution Started!');
                child.stdout.on('data', function (data) {
                    console.log(data);
                });
                child.stderr.on('data', function (data) {
                    console.error(data);
                });
            } else {
                console.error('Command Execution aborted, please fix errors and warnings!');
            }
        });
    }
}
