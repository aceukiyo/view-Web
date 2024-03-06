import type { App } from 'vue';
import { ElLoading, ElScrollbar,ElInput } from 'element-plus';

const plugins = [ElLoading];
const components = [ElScrollbar,ElInput];
export const setupElementPlus = (app: App<Element>) => {
  plugins.forEach((plugin) => {
    app.use(plugin)
  });

  components.forEach((component) => {
    app.component(component.name, component);
  });
}
