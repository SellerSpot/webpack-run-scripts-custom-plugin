import { Compiler } from 'webpack';
import childProcess from 'child_process';

export interface IWebpackCustomRunScriptsPluginProps {
    command?: string;
    allowOnException?: boolean;
    allownOnError?: boolean;
}

export class WebpackCustomRunScriptsPlugin {
    private options: IWebpackCustomRunScriptsPluginProps;

    constructor(options: IWebpackCustomRunScriptsPluginProps) {
        this.options = options;
    }

    apply(compiler: Compiler): void {
        compiler.hooks.afterEmit.tap('Hello World Plugin', (stats) => {
            const { command, allowOnException, allownOnError } = this.options;
            const hasException =
                (stats.getStats().hasErrors() && !allowOnException) ||
                (stats.getStats().hasWarnings() && !allownOnError);
            if (!hasException) {
                const child = childProcess.exec(command);
                process.stdout.write('Command Execution Started!');
                child.stdout.on('data', function (data) {
                    process.stdout.write(data);
                });
                child.stderr.on('data', function (data) {
                    process.stderr.write(data);
                });
            } else {
                process.stdout.write(
                    'Command Execution aborted push aborted please fix errors and warnings!',
                );
            }
        });
    }
}
