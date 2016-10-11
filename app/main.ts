import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Tells Angular to start the application (called AppModule)
import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
