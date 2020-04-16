
import { NgModule } from '@angular/core';
import { CurencyPipe } from './curency.pipe';
import { TranslateAppPipe } from './translate-app/translate-app.pipe';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
    declarations: [CurencyPipe,TranslateAppPipe],
    imports: [],
    exports: [CurencyPipe,TranslateAppPipe,TranslateModule]
})
export class PipesModule { }
