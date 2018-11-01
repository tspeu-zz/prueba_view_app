import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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

  constructor() { }

  ngOnInit() {
                                          // form state
    this.vehicleForm = new FormGroup({
      vehicleIdInput: new FormControl('', Validators.required),
      typeInput: new FormControl('',  Validators.required),
      manufacturerInput: new FormControl(),
      priceInput: new FormControl()
    });
  }

  sendData() {

    // console.log($event.value);
    // console.log( this.manufacturer);
    // console.log( this.vehicleId);
    // console.log( this.type);
    // console.log( this.price);
    console.log('formulario' + JSON.stringify(this.vehicleForm.value));
  }

  cancel() {
    console.log('cancel');
  }
/*
VehicleId int { get; set; }
string Type { get; set; }
string ManufacturerNameShort { get; set; }
 decimal Price  */

}
