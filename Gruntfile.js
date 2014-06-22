/*
 * grunt-pandoc-ppt
 * https://github.com/laoshu133
 *
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pandoc: {
            options: {
                // 主题，默认 revealjs
                theme: 'revealjs',
                // 主题参数，默认为 theme=default
                themeV: 'theme=night',
                // 引用资源路径，默认为 http://lab.hakim.se/reveal-js/
                resourceUrl: 'http://lab.hakim.se/reveal-js/',
                // 是否打包成单文件，如果是编辑可能比较慢，默认 false
                portable: false,
                // 是否补全 html 标签，默认 true
                htmlDoc: true,
                // 是否解析数学公式，默认 true
                webtex: true
            },
            htmlPPT: {
                files: [{
                    expand: true,
                    cwd: 'test/',
                    src: '*.md',
                    dest: 'test/',
                    ext: '.html'
                }]
            }
        },
        jshint: {
            all: [ 'Gruntfile.js', 'tasks/*.js' ]
        }
    });

    // 载入任务
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadTasks('tasks');

    // 声明别名
    grunt.registerTask('default', ['pandoc']);
    grunt.registerTask('test', ['jshint', 'pandoc']);
};