import { Compiler } from 'webpack';
import childProcess from 'child_process';
import { StringDecoder } from 'string_decoder';

export interface IWebpackCustomRunScriptsPluginProps {
    command?: string;
    allowOnWarning?: boolean;
    allownOnError?: boolean;
}

export class WebpackCustomRunScriptsPlugin {
    static previousProcessId: number;

    private options: IWebpackCustomRunScriptsPluginProps;

    constructor(options: IWebpackCustomRunScriptsPluginProps) {
        this.options = options;
    }

    apply(compiler: Compiler): void {
        compiler.hooks.afterEmit.tap('Webpack Custom Run Scripts Plugin', async (stats) => {
            await this.processKillHandler(WebpackCustomRunScriptsPlugin.previousProcessId);
            const { command, allowOnWarning, allownOnError } = this.options;
            const hasException =
                (stats.getStats().hasErrors() && !allownOnError) ||
                (stats.getStats().hasWarnings() && !allowOnWarning);
            if (!hasException) {
                const child = childProcess.spawn(command, {
                    detached: true,
                    stdio: 'pipe',
                    shell: true,
                });

                WebpackCustomRunScriptsPlugin.previousProcessId = child.pid;

                const decoder = new StringDecoder('utf8');

                child.stdout.on('data', function (data) {
                    const textChunk = decoder.write(data);
                    console.log(textChunk);
                });
                child.stderr.on('data', function (data) {
                    const textChunk = decoder.write(data);
                    console.log(textChunk);
                });
            } else {
                console.error('Command Execution aborted, please fix errors and warnings!');
            }
        });
    }

    private async processKillHandler(pid: number): Promise<void> {
        try {
            process.kill(-pid);
            // await this.introduceDelay();
        } catch (error) {}
    }
}
