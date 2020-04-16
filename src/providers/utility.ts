import { Injectable } from '@angular/core';

/*
Generic utility e.g :delay
*/
@Injectable()
export class UtilityService {
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    stripHtml(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
    urlify(text) {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, function (url) {
            return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }


}
