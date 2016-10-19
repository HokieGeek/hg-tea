import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Tells Angular to start the application (called HgTeaModule)
import { HgTeaModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(HgTeaModule);
