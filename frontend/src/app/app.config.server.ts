import { ApplicationConfig, mergeApplicationConfig } from "@angular/core";
import { appConfig } from "./app.config";



const serverConfig: ApplicationConfig = {
    providers: [
        // Add server-specific providers here
        // provideServerRendering()
    ]
};

export const config = mergeApplicationConfig(serverConfig, appConfig);