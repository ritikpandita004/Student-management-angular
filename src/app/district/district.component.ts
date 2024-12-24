import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
declare let $: any

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {
  districtData: any;
  districtId!: string;
  selectedDistrict: any;

  constructor(private Route: Router, private client: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDistrictsInfo();
  }

  addDistrict() {
    this.Route.navigate(['dashboard/Add-district']);
  }

  editDistrict(id: string) {
    this.Route.navigate(['dashboard/Edit-district', id]);
  }


  deleteDistrict(id: string) {
    this.districtId = id;
    $('#deleteModal').modal('show');
  }


  confirmDelete() {
    this.client.deleteDistrict(this.districtId).then((response) => {

      $('#deleteModal').modal('hide');

      this.getDistrictsInfo();

      this.toastr.success(response.message);

    }).catch((error) => {
      console.error('Error deleting district:', error);
    });
  }

  getDistrictsInfo() {
    this.client.getDistrictView().then((response: any) => {
      this.districtData = response.data;
      console.log(this.districtData);
    });
  }



  toggleDistrictStatus(district: any) {
    this.selectedDistrict = district;
    const modalElement = document.getElementById('statusModal');

    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }

  confirmStatusChange() {
    this.client.changeDistrictStatus({ id: this.selectedDistrict.id }).then((response) => {
      const modalElement = document.getElementById('statusModal');

      if (modalElement) {
        const modal = Modal.getInstance(modalElement);

        if (modal) {
          modal.hide();
        } else {
          console.error('Failed to get modal instance');
        }
      } else {
        console.error('Modal element not found');
      }

      this.getDistrictsInfo();
      this.toastr.success(response.message);
    }).catch((error) => {
      console.error('Error changing district status:', error);
      this.toastr.error('Failed to update district status.');
    });
  }



}
