
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { IconDirective } from '@coreui/icons-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent, 
  RowComponent, ColComponent, 
  TextColorDirective, CardComponent,
   CardBodyComponent, FormDirective, InputGroupComponent, 
   InputGroupTextDirective, FormControlDirective, ButtonDirective,
   AvatarComponent, CardHeaderComponent,
   } from '@coreui/angular';
import { ApiService } from '../../../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractorDataService } from 'src/app/services/contractorDataService.service';

@Component({
  selector: 'app-add-contractors',
  standalone: true,
  imports: [CommonModule, ContainerComponent, FormsModule, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective],
  templateUrl: './add-contractors.component.html',
  styleUrl: './add-contractors.component.scss'
})
export class AddContractorsComponent implements OnInit {
  @ViewChild('contractorForm') contractorForm!: NgForm;
  model = {
    businessLicenseNumber: "",
    businessName: "",
    createdAt: "",
    email: "",
    fullName: "",
    idNumber: "",
    location: "",
    phoneNumber: "",
    profilePicture: null,
    serviceCategory: "",
    updatedAt: "",
    userId: 2,
    status: "",
    role:""
  };

  logoPreview: string | ArrayBuffer | null = null;
  statusOptions = ['Active', 'Inactive', 'Pending'];
  roleOptions = ['Admin', 'Manager', 'Employee'];
  serviceCategoryOptions = ['Barber', 'Architecture', 'Surveyor', 'Mechanic', 'Plumbing'];

  imageError: string | null = null;

  title = {
    header: 'Add Contractor',
    bTitle: 'Add Contractor'
  }
   urlID: number | null  = null; 

  constructor(private contractorDataService: ContractorDataService, private route: ActivatedRoute, private router: Router) {}


  ngOnInit(): void {
    const contractor = this.contractorDataService.getContractor();
    this.route.paramMap.subscribe((map:any) => {
      const id = map.get('id');
      if (id){
        this.urlID = id
      }
    })
    if ( this.urlID && contractor) {
   
      this.model = contractor;
      this.title = {
        header: 'Edit Contractor',
        bTitle: 'save changes'
  
      }

    }
    if(!contractor && this.urlID){
      this.contractorDataService.getContractorById(this.urlID).subscribe(response => {
        this.model = response
      })
      this.title = {
        header: 'Edit Contractor',
        bTitle: 'save changes'
  
      }
    }
  }



  onSubmit(): void {
    if (this.contractorForm.valid) {
      // Create a contractor object from the form model
  

      if (this.urlID) {
        // console.log(this.urlID, '>>>>>>>>', this.model)
        // If URL ID is present, update the contractor
        this.contractorDataService.updateContractor(this.urlID, this.model).subscribe({
          next: (response) => {
            // Handle success response
            console.log('Contractor updated successfully', response);
            // Optionally, reset the form or navigate to another view
            this.contractorForm.reset();
            this.logoPreview = null; // Clear the image preview
            this.router.navigate(['/contractors']); // Navigate back to contractors list or another view
          },
          error: (err) => {
            // Handle error response
            console.error('Error updating contractor', err);
          }
        });
      } else {
        // If URL ID is not present, add a new contractor
        this.contractorDataService.addContractor(this.model).subscribe({
          next: (response) => {
            // Handle success response
            debugger
            // console.log(this.model, 'Contractor added successfully++++++++++++++++++++++++++++', response);
            // Optionally, reset the form or navigate to another view
            this.contractorForm.reset();
            this.logoPreview = null; // Clear the image preview
            this.router.navigate(['/contractors']); // Navigate back to contractors list or another view
          },
          error: (err) => {
            // Handle error response
            console.error('Error adding contractor', err);
          }
        });
      }
    } else {
      // Handle form validation errors if needed
      console.log('Form is invalid');
    }
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.logoPreview = reader.result; // Set the preview image
        };
        reader.readAsDataURL(file);
        this.imageError = null; // Clear any previous errors
      } else {
        this.imageError = 'Please upload a valid image file.';
        this.logoPreview = null; // Clear the preview
      }
    }
  }
}
