import { Pipe, PipeTransform } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { TranslateService } from '@ngx-translate/core';

// import { Events } from '@ionic/angular';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslateAppPipe implements PipeTransform {


  constructor(public shared: SharedDataService, private translate:TranslateService
    // public events: Events
     ) {

  }
  transform(value: string) {
    //console.log(value + " " + this.shared.translationListArray[value.toString()]);

    return this.translate.instant(value)
    // if (this.shared.translationListArray[value] == undefined) {
    //   if (this.shared.lab)
    //     this.shared.missingValues[value] = value;
    //   return value;
    // }
    // return this.shared.translationListArray[value];
  }

}
