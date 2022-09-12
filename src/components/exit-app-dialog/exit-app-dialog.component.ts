import { Component, OnInit } from '@angular/core';
import { MatDialogRef  } from '@angular/material/dialog';

@Component({
  selector: 'app-exit-app-dialog',
  templateUrl: './exit-app-dialog.component.html',
  styleUrls: ['./exit-app-dialog.component.css']
})
export class ExitAppDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ExitAppDialogComponent>
  ) {}

  ngOnInit(): void {
  }

  onYesClick():void{
    this.dialogRef.close(true);
  }

  onNoClick():void{
    this.dialogRef.close(false);
  }

}
