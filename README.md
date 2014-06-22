# grunt-pandoc-ppt

## 什么是 pandoc

先看官网，[http://johnmacfarlane.net/pandoc/](http://johnmacfarlane.net/pandoc/)，英文不懂？看页面下面的图就好了

百度百科：
> Pandoc是由John MacFarlane开发的标记语言转换工具，可实现不同标记语言间的格式转换，堪称该领域中的“瑞士军刀”。

## 这是什么

由于 pandoc 目前主要用于命令行界面，且参数较多，很难记住，故记住 grunt 给出一套默认可行的参数，然后自定义部分参数即可转换;

并且借助 `grunt-contrib-watch` 插件，可以省去手动编译，达到实时预览的效果；

目前版本参数尚不完善，默认参数仅支持 **Markdown => html幻灯片(PPT)**，欢迎一起推送代码

## 怎么玩

1. 安装 pandoc

    http://johnmacfarlane.net/pandoc/installing.html

    如果 mac 有安装brew，举例：

    ```
    brew install pandoc
    ```

2. 配置 pandoc 目录

    ```
    mkdir ppt && cd ppt
    ```

3. 安装 grunt, grunt-pandoc-ppt

    ```
    npm install grunt grunt-pandoc-ppt grunt-contrib-watch
    ```

4. 创建 Gruntfile.js

    ```
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
                        cwd: './',
                        src: '*.md',
                        dest: './',
                        ext: '.html'
                    }]
                }
            },
            watch: {
                files: ['*.md'],
                tasks: ['pandoc']
            }
        });

        // 载入任务
        grunt.loadNpmTasks('grunt-pandoc-ppt');
        grunt.loadNpmTasks('grunt-contrib-watch');

        // 声明别名
        grunt.registerTask('default', ['pandoc', 'watch']);
    };
    ```

5. 运行 grunt

    ```
    grunt
    ```

    然后开始愉快的写 PPT 吧 :D

    一个简单的 [PPT例子](https://raw.githubusercontent.com/laoshu133/grunt-pandoc-ppt/master/test/test.md)


## 配置参数

```
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
    },
    watch: {
        files: ['test/*.md'],
        tasks: ['pandoc']
    }
}
```

- `theme` pandoc 默认支持：
    - [DZSlides](https://github.com/paulrouget/dzslides)
    - [reveal.js](http://lab.hakim.se/reveal-js)
    - [Slidy](http://www.w3.org/Talks/Tools/Slidy2/)
    - [S5](http://meyerweb.com/eric/tools/s5/)
    - [Slideous](http://goessner.net/articles/slideous/slideous.html)

## 一些资源

- [Markdown+Pandoc→HTML幻灯片速成](http://www.soimort.org/posts/165/)
- [用 Pandoc 写幻灯片](http://www.douban.com/note/246188604/)





