var exec = require('child_process').exec;

module.exports = function (grunt) {
    "use strict";

    grunt.registerMultiTask('pandoc', 'A grunt plugin for pandoc. ', function() {
        var done = this.async();

        var options = this.options({
            // 主题，默认 revealjs
            theme: 'revealjs',
            // 主题参数，默认为 theme=default
            themeV: 'theme=default',
            // 引用资源路径，默认为 http://lab.hakim.se/reveal-js/
            resourceUrl: 'http://lab.hakim.se/reveal-js/',
            // 是否打包成单文件，如果是编辑可能比较慢，默认 false
            portable: false,
            // 是否补全 html 标签，默认 true
            htmlDoc: true,
            // 是否解析数学公式，默认 true
            webtex: true
        });

        function createSlide(file, callback) {
            var args = [];
            args.push(file.src[0]);
            args.push('-o', file.dest);

            if(options.htmlDoc) {
                args.push('-s');
            }
            if(options.webtex) {
                args.push('--webtex');
            }
            if(options.portable) {
                args.push('--self-contained');
            }

            args.push('-t', options.theme);
            if(options.themeV) {
                args.push('-V', options.themeV);
            }
            if(options.resourceUrl) {
                args.push('-V', options.theme + '-url=' + options.resourceUrl);
            }

            // console.log(args.join(' '));

            exec('pandoc ' + args.join(' '), {
                // cwd: file.orig.cwd
            }, function(err, stdout, stderr) {
                if(stdout) {
                    console.log(stdout);
                }

                var exitCode = 0;
                if(err) {
                    exitCode = -1;

                    grunt.log.writelns('Error! -> ' + file.src);
                    console.log(stderr);
                }
                else {
                    grunt.log.writelns('Done! [Created] -> ' + file.dest);
                }

                callback(err, stdout, stderr);

                //process.exit(exitCode);
            });
        }

        grunt.util.async.forEachSeries(this.files, function(file, callback) {
            createSlide(file, callback);
        }, function(success) {
            done(success);
        });
    });    
};
