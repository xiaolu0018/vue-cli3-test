const path = require('path');

// 引入存放的模拟数据
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	// 项目部署的基础路径
	// 我们默认假设你的应用将会部署在域名的根部，
	// 比如 https://www.my-app.com/
	// 如果你的应用时部署在一个子路径下，那么你需要在这里
	// 指定子路径。比如，如果你的应用部署在
	// https://www.foobar.com/my-app/
	// 那么将这个值改为 `/my-app/`
	baseUrl: process.env.NODE_ENV === 'production' ?
		'./' :
		'/',

	// 将构建好的文件输出到哪里
	outputDir: process.env.NODE_ENV === 'production' ?
		'F:\\20181009\\police-project-big-data-2.0.0\\big-data-web\\src\\main\\resources' :
		'dist',

	indexPath: process.env.NODE_ENV === 'production' ?
		'F:\\20181009\\police-project-big-data-2.0.0\\big-data-web\\src\\main\\resources\\templates\\login.html' :
		'login.html',

	// 放置静态资源的地方 (js/css/img/font/...)
	assetsDir: process.env.NODE_ENV === 'production' ? './' : './static',

	filenameHashing: process.env.NODE_ENV === 'production' ? false : true,

	// 是否在保存的时候使用 `eslint-loader` 进行检查。
	// 有效的值：`ture` | `false` | `"error"`
	// 当设置为 `"error"` 时，检查出的错误会触发编译失败。
	lintOnSave: false,

	// 使用带有浏览器内编译器的完整构建版本
	// 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
	// compiler: false,

	// babel-loader 默认会跳过 node_modules 依赖。
	// 通过这个选项可以显式转译一个依赖。
	transpileDependencies: [ /* string or regex */ ],

	// 是否为生产环境构建生成 source map？
	productionSourceMap: false,

	// 调整内部的 webpack 配置。
	// 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
	chainWebpack: config => {
		//去掉prefetch和preload	
		config.plugins.delete('prefetch');
		config.plugins.delete('preload');
		// config.plugins.delete('uglifyjs');
		//proxy代理模式
		(process.env.NODE_ENV === 'development') && (process.env.VUE_APP_PROXY === 'proxy') && config.devServer.proxy({
			'/*.action': {
				target: 'http://localhost:8080',
				changeOrigin: true,
				secure: false
			}
		});


	},
	configureWebpack: () => {},

	// CSS 相关选项
	css: {
		// 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
		// 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
		extract: true,

		// 是否开启 CSS source map？
		sourceMap: false,

		// 为预处理器的 loader 传递自定义选项。比如传递给
		// sass-loader 时，使用 `{ sass: { ... } }`。
		loaderOptions: {
			sass: {

				data: `@import "@/style/global/mixin.scss";@import "@/style/global/var.scss";`
			}
		},

		// 为所有的 CSS 及其预处理文件开启 CSS Modules。
		// 这个选项不会影响 `*.vue` 文件。
		modules: false
	},

	// 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
	// 在多核机器下会默认开启。
	parallel: require('os').cpus().length > 1,

	// PWA 插件的选项。
	// 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
	pwa: {},

	// 配置 webpack-dev-server 行为。
	devServer: {
		// open: process.platform === 'darwin',
		host: 'localhost',
		hot: true,
		port: 8898,
		https: false,
		open: true,
		openPage: 'login.shtml'
	},

	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...


		} else {
			// 为开发环境修改配置...

		}

	},
	// 第三方插件的选项
	pluginOptions: {
		'style-resources-loader': {
			'preProcessor': 'scss',
			'patterns': [
				path.resolve(__dirname, 'src/styles/global/mixin.scss'),
				path.resolve(__dirname, 'src/styles/global/common.scss')
			],
			'injector': 'prepend'
		}
	}
}
