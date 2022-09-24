import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class FormatDateService {
    months=[
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]
    days=[
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ]
    public toString(d: Date):String{
        const year = d.getFullYear();
        const monthName=this.months[d.getMonth()];
        const date=d.getDate();
        const dayName=this.days[d.getDay()];
        const hour=d.getHours();
        const minutes=d.getMinutes();
        const additionalZero=(minutes<10?"0":"");
        return `${dayName}, ${date} ${monthName} ${year}, at ${hour}:${additionalZero}${minutes}`;
    }
}