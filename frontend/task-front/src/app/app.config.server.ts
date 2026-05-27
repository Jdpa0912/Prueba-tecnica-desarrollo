import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // No incluyas aquí servicios que usen localStorage
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);