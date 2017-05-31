import { Component, Inject} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html'
})

export class AppComponent  {
  config: any; 
  appName: String;

  constructor(@Inject('configService') configService){
    this.config = configService.data;
    this.appName = this.config.appName || "Application"
  }
}
