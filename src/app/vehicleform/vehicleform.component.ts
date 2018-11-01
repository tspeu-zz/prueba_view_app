import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import { SnackComponent } from './snack';

@Component({
  selector: 'app-vehicleform',
  templateUrl: './vehicleform.component.html',
  styleUrls: ['./vehicleform.component.css']
})

// vehicle = {
//   ManufacturerNameShort: string;
//   vehicleId: string;
//   type: number;
//   price: number;

// }

export class VehicleformComponent implements OnInit {

  // vehicleId: string;
  // type: number;
  // price: number;
  // manufacturer: string;

  model: any = {};
// reactive form
  vehicleForm: FormGroup;
  values: any;
  url = 'http://localhost:5000/api/vehicle';

  hasValue = false;
  returnMessage: string;
  returnValid = false;
  textValid: string;
  color = 'accent';
  mode = 'indeterminate';
  value = 100;
  // showSpinner = false;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {}

  ngOnInit() {

    this.vehicleForm = new FormGroup(
      {
        VehicleId: new FormControl('', Validators.required),
        Type: new FormControl('',  Validators.required),
        ManufacturerNameShort: new FormControl(),
        Price: new FormControl()
      });
  }

  sendData() {

    this.model = this.vehicleForm.value;
    console.log('model' + this.model);
    this.postTest(this.model);

  }

  postTest(testData: any) {
    // this.showSpinner = true;
    const body = JSON.stringify(testData);
    console.log('se envia  body--->', body);

    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    // setTimeout(() => {  this.showSpinner = false;}, 1000);

    return this.http.post(this.url, body,
      {headers: headerOptions})
      .subscribe( res => {
          // this.value> {vehicleId: 1, returnCode: 1}
          this.values = res;

          this.returnMessage = `vehicleId: ${this.values.vehicleId} | returnCode: ${this.values.returnCode} | `;

          // this.showSpinner = false;

            if (this.values.returnCode) {

              this.textValid = 'VALID';
              this.hasValue = true;
              this.returnValid = true;
            this.openSnackBar( this.returnMessage + this.textValid, 'close');
          } else {

            this.textValid = 'INVALID';
            this.hasValue = true;
            this.returnValid = false;
            this.openSnackBar( this.returnMessage  + 'INVALID', 'close');
          }
          this.vehicleForm.reset();
        }, error => { console.log(error);
        });
  }


  cancel() {
    this.vehicleForm.reset();

  }


  openSnackBar(message, action ) {

    this.snackBar.open(message, action, {
      duration: 3500,
      panelClass: 'success-dialog'
    });

  }
/*
VehicleId int { get; set; }
string Type { get; set; }
string ManufacturerNameShort { get; set; }
 decimal Price  */

}



