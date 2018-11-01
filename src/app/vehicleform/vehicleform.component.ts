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

  vehicleId: string;
  type: number;
  price: number;
  manufacturer: string;

  model: any = {};
// reactive form
  vehicleForm: FormGroup;
  values: any;
  url = 'http://localhost:5000/api/values';

  hasValue = false;
  returnMessage: string;
  returnValid = false;

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {}

  ngOnInit() {
                                          // form state
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

    const body = JSON.stringify(testData);
    console.log('se envia  body--->', body);
    // console.log('body--con -JSON.stringify-->', JSON.stringify(testData));

    // let dataFormat = JSON.stringify(testData);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.post(this.url, body, {headers: headerOptions})
            .subscribe( res => {
              this.values = res;
              // this.value> {vehicleId: 1, returnCode: 1}

              this.returnMessage = `vehicleId: ${this.values.vehicleId} | returnCode: ${this.values.returnCode}`;

                if (this.values.returnCode) {
                  console.log('VALIDO');
                this.hasValue = true;
                this.returnValid = true;
                this.openSnackBar( this.returnMessage , 'close');
              } else {

                console.log('INVALIDO');
                this.hasValue = true;
                this.returnValid = false;
                  this.openSnackBar( this.returnMessage , 'close');
                }

      }, error => { console.log(error);
      });


  //  .pipe(
  //     map((res: any) => {
  //       const result = res;
  //       console.log('desde api result--->', result);
  //     })
  //   );

  }



  cancel() {
    // this.openSnackBar('tofdo ok', 'close');
    console.log('cancel');
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



