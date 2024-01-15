const fs = require("fs");
const path = require("path");

// @todo typesの定義も追加する

const templateSettings = new Map([
  [
    "react",
    {
      template: "react-component-template.js",
      extension: "tsx",
      directory: "",
    },
  ],
  [
    "storybook",
    {
      template: "storybook-template.js",
      extension: "stories.ts",
      directory: "/stories/",
    },
  ],
]);

// 実行関数
function generateFiles(componentPath, componentName) {
  const upperCamelComponentName = componentName
    .replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    })
    .replace(/^[a-z]/, function (g) {
      return g.toUpperCase();
    });

  templateSettings.forEach((templateSetting) => {
    // ファイルの内容を置換
    const componentContent = fs
      .readFileSync(path.join(__dirname, templateSetting.template), "utf-8")
      .replace(/__COMPONENT_NAME__/g, upperCamelComponentName)
      .replace(
        /__COMPONENT_PATH__/g,
        `@pages/${componentPath}/${componentName}`
      )
      .replace(/\.\/pages\//g, "");

    // ファイルを書き込むディレクトリのパス
    const dirPath = path.join(
      `/v-schedule/front/pages/${componentPath}`,
      templateSetting.directory
    );

    // ディレクトリが存在しない場合は作成
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // 置換した内容を書き込み
    fs.writeFileSync(
      path.join(
        `/v-schedule/front/pages/${componentPath}`,
        `${templateSetting.directory}${componentName}.${templateSetting.extension}`
      ),
      componentContent
    );
  });
}

// 処理の実行
const [componentPath, componentName] = process.argv.slice(2);
generateFiles(componentPath, componentName);
