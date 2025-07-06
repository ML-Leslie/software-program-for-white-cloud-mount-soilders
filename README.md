# 这是白云山五壮士的软工项目--数独乐乐

## 环境配置

### Node.js

1. 访问[Node.js官网](https://nodejs.org/zh-cn)
2. 下载安装LTS版本
3. 安装完成后重启命令提示符或 `VS Code`

#### 配置npm依赖

> - Leslie ：查询GPT似乎不用下面那么麻烦

##### 只要你想运行这个项目（比如你 clone 下来的开源项目），就必须安装它依赖的工具。所以只要这样做就行了：

```bash
npm install       # 安装项目所有依赖（包括 rimraf、rollup）
```

运行 `npm run dev`安装中缺少什么依赖就GPT搜索安装即可

#### 可能存在的问题

###### PowerShell执行策略限制问题

1. 临时改变会话执行策略

   ```
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
2. 永久改变策略

   ```
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```

###### npm依赖冲突

在配置 `rimraf`等工具过程中出现 `npm`依赖版本冲突，具体是 `svelte-preprocess@4.6.1` 和 `postcss-load-config@3.0.0` 之间的版本不兼容

解决方法（我采用的）：

**降级** `b`

```
npm uninstall postcss-load-config
npm install postcss-load-config@2.1.2 --save-dev
```

### Svelte for VS Code

直接在vscode插件中安装

### UMLet

直接在vscode插件中安装，便于画与查看用例图、类图。

## 运行

```
npm run dev
```

打开链接即可

## 说明

### 开发环境

因为是前端，所以都是在浏览器上运行的。浏览器的开发者控制台太不好用了，我们可以用vscode的调试:

创建launch.json文件 -> 选择 `Web应用(Chrome) or Web应用(Edge)` -> 修改url,webRoot -> 然后启动应用，启动调试，他会自己打开浏览器，你在js文件对应处下断点即可。

```launch.json
{
   "type": "chrome",
   "request": "launch",
   "name": "针对 localhost 启动 Chrome",
   "url": "http://localhost:5000", // 修改端口为5000，跟启动应用的端口对应
   "webRoot": "${workspaceFolder}/dist" // 应用根目录，生成在dist下
}
```

然后记得JS的**报错输出**都在vscode下面的**调试控制台**里，这个对应的就是浏览器开发者工具的控制台了。关于控制台，可以直接运行js语句。`console.log()`方法能直接在控制台输出内容。

同时，在我们的JS文件里写 `console.log()`，运行到这个JS文件时，也会输出到控制台(vscode里的调试控制台)，这也是我们主要的调试和测试方法之一。

> (⊙o⊙)？看不懂代码怎么办，运行起来下断点调试走走看，方便多了。

但是我自己写了个JS代码，比如 `src\node_modules\@sudoku\solver.js`，不知道里面的 `nakedSingle`写得对不对怎么办，这个时候我们就想运行一下看看输出:

第一步，写一个 `xxxTest`函数并export导出它。

第二步，打开 `src\components\Controls\ActionBar\Actions.svelte`，在头部导入你的测试函数，如 `import { possibleNumberSolverTest } from '@sudoku/solver';`

第三步，编译运行，打开页面，点一下功能栏的烧杯，输入对应测试函数的名字(测试函数里写 `console.log(yourfunction)`),就可以把你写的函数运行结果输出到控制台，就可以看代码写的对不对了。可以看到类似这样的输出:

```
⌵ (1) [{…}]                                                             solver.js:168
  > 0: {idx: 74, value: 6}
    length: 1
  > [[Prototype]]: Array(0)
  > [[Prototype]]: Object
⌵ (1) [{…}]                                                             solver.js:168
  > 0: {idx: 74, value: 6}
    length: 1
  > [[Prototype]]: Array(0)
  > [[Prototype]]: Object
```

> 有点简陋，但是后续应该会加一些测试框架。

---

### 项目结构

```
.
├── dist                // 编译输出文件，生成的 html、css、js 等静态资源
├── node_modules        // 项目依赖的第三方包
├── package.json        // 项目依赖、脚本和元数据配置
├── package-lock.json   // 依赖锁定文件，确保依赖版本一致
├── postcss.config.js   // PostCSS 配置文件
├── README.md           // 项目说明文档
├── rollup.config.js    // Rollup 打包配置文件，定义如何将源码打包成可部署的静态文件
├── scripts             // 自动化脚本
├── src/                // 源代码目录（主要开发内容都在这里）
    ├──components/       // 存放所有UI组件的目录，按功能模块进一步细分
      ├──Board/         //数独棋盘相关的组件，如数字键盘、操作栏等
      ├──Controls/      //底部操作区相关的组件，如菜单、按钮等
      ├──Header/        //顶部导航栏相关组件，包括不同类型的弹窗
      ├──Modal/         //弹窗相关组件，包括不同类型的弹窗内容
      ├──Utils/         //通用工具类组件，如剪贴板、开关等
    ├──styles/          //全局样式文件目录，如剪切板、开关等
    ├──App.svelte       //应用的主组件，负责整体页面结构和初始化逻辑
    ├──main.js          //应用入口文件，挂在Svelte应用到页面
    ├──template.html    //HTML模板，最终构建时生成index.html
├── static/             // 静态资源目录
├── svelte.config.js    // Svelte 配置文件
└── tailwind.config.js  // Tailwind CSS 配置文件
```

项目采用Svelte 3 和 tailwind-css。

关于Svlete 3,可以阅读其官方旧版文档： [https://v4.svelte.dev/docs/introduction](https://v4.svelte.dev/docs/introduction)

### 关于响应式

Svelte 本质上是将 `.svelte` 组件文件编译成高效的 JavaScript 代码。每个 Svelte 文件就是一个独立的组件。组件中 `<script>` 标签里的代码只会在组件初始化时执行一次，因此如果你直接修改普通变量，页面不会自动更新。

**非响应式变量（页面不会自动更新）：**

```svelte
<script>
	let count = 0;

	function add() {
		count += 1; // 页面不会自动更新
	}
</script>

<button on:click={add}>加一</button>
<p>count: {count}</p>
```

> 在 Svelte 里，直接修改 `count`，页面**不会自动更新**，因为 Svelte 只在赋值语句（`count = ...`）时追踪变化。

---

**响应式变量（页面会自动更新）：**

```svelte
<script>
	let count = 0;

	function add() {
		count = count + 1; // 页面会自动更新
	}
</script>

<button on:click={add}>加一</button>
<p>count: {count}</p>
```

> 这里用 `count = count + 1`，Svelte 能检测到赋值，页面会**自动更新**。

为了让变量的变化能自动反映到界面上，Svelte 提供了**响应式语法**。

常用的方式，第一种就是如上的 `直接赋值`，即用等于号。但是这种方式只能用于本组件的响应变量，对于跨组件的响应式应用，就需要 `store`。

- **store 响应式**：

顾名思义，`store`即商店，用于存储全局可访问的值。

通过 Svelte 的 store（如 writable、readable）实现跨组件的响应式数据共享，使用 `$store` 语法自动订阅和更新。

举例说明 Svelte 的 store 用法：

```svelte
<!-- CounterStore.js -->
import { writable } from 'svelte/store';

// 创建一个可写的 store，初始值为 0
export const count = writable(0);
```

```svelte
<!-- Counter.svelte -->
<script>
    import { count } from './CounterStore.js';
</script>

<button on:click={() => $count += 1}>加一</button>
<p>当前计数：{$count}</p>
```

这样就实现了**跨组件的响应式数据共享**。

在本项目，所有的store对象都存在路径 `src\node_modules\@sudoku\stores`下，通过`import { ... } from '@sudoku/stores/xxx'的方式导入，至于为什么这样能导入，这就跟**JS模块化**有关。

关于其他的Svlete语法，可以查阅文档https://v4.svelte.dev/docs/introduction

### JS模块化

JS有两种风格，CommonJS和ECMASrcipts，后端引擎nodejs默认是CommonJS，但前端框架大部分都采用现代ECMAScripts风格。所以很难直接用nodejs来写js代码。

关于两种风格，最主要就是导入模块方式不同

- **CommonJS** 是 Node.js 默认的模块系统，常用 `require` 和 `module.exports` 语法。例如：

  ```js
  // CommonJS
  const fs = require('fs');
  module.exports = { foo };
  ```
- **ECMAScript Modules（ESM）** 是现代前端框架（如 Svelte、React、Vue）普遍采用的标准，使用 `import` 和 `export` 语法。例如：

  ```js
  // ESM
  import fs from 'fs';
  export const foo = 123;
  ```

可以看到，Svelte作为前端框架，采取的ESM方式。

关于模块，默认是不用带后缀的，只需要给路径。去哪找呢？默认从 `node_modules`找，从引用模块的文件的目录下开始找，如果没有就往父级目录去找，直到找到没有为止。

而 `@sudoku`这样的命名主要是作为命名空间，避免和其他模块或包重名。

所以我们就能理解为什么我们自定义的JS文件都写在 `src\node_modules\@sudoku`下了，并且文件中导入对应js文件的方式也能理解了：

如 `src\node_modules\@sudoku\sudoku.js`里

```
import solve from '@mattflow/sudoku-solver'; //项目根目录能找到外部包
import { BOX_SIZE, GRID_LENGTH, SUDOKU_SIZE, GRID_COORDS } from '@sudoku/constants'; //上上级目录能找到我们自定义的node_module
```

## 实现功能

+ possible number solver
+ Test button in Page for developer to debug
+ backtracking
+ undo redo feature
+ import sudoku from SudokuWiki

## 待开发事项

* TODO: Warn when hint not possible
* TODO: Undo/Redo
* TODO: Import sudoku
* TODO: Creator mode
* TODO: Bug hunt
* TODO: Announce
* TODO: Improve keyboardDisabled
