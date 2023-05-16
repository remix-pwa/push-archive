import { PushHandlerPlugin, PushHandlerEnv } from "../types";

export abstract class Push {
  protected plugins: PushHandlerPlugin[];

  constructor(plugins: PushHandlerPlugin[] = []) {
    this.plugins = plugins;
  }

  protected async applyPlugins(
    pluginMethod: keyof PushHandlerPlugin,
    args: PushHandlerEnv
  ) {
    const promises = this.plugins.map(async (plugin) => {
      if (plugin[pluginMethod]) {
        await plugin[pluginMethod]!(args);
      }
    });
    await Promise.all(promises);
  }

  abstract handlePush(event: PushEvent): Promise<void>;

  abstract handleNotificationClick(event: NotificationEvent): Promise<void>;

  abstract handleNotificationClose(event: NotificationEvent): Promise<void>;

  abstract handleError(error: ErrorEvent): Promise<void>;
}
