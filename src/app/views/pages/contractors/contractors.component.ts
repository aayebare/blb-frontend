import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective,
  CardModule,
  DropdownComponent,
  DropdownModule,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownCloseDirective,
  DropdownHeaderDirective
} from '@coreui/angular';
import { IconDirective, IconModule } from '@coreui/icons-angular';
import { ContractorDataService } from 'src/app/services/contractorDataService.service';
import { SubscriptionModalComponent } from '../subscriptions/subscriptions.component';

interface IContractor {
  id?: any,
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  serviceCategory: string;
  profilePicture: string;
  status: string;
  role: string;
  businessLicenseNumber: number
  businessName: string
  createdAt: "",

}


@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.scss'],
  // standalone: true,
  // imports: [CommonModule, DropdownCloseDirective, DropdownMenuDirective, DropdownHeaderDirective, DropdownModule, DropdownItemDirective,  DropdownComponent, IconModule, TextColorDirective, CardComponent, CardBodyComponent, RowComponent, ColComponent, ButtonDirective, IconDirective, ReactiveFormsModule, ButtonGroupComponent, FormCheckLabelDirective, NgStyle, CardFooterComponent, GutterDirective, ProgressBarDirective, ProgressComponent, CardHeaderComponent, TableDirective, AvatarComponent]
})
export class ContractorsComponent implements OnInit {

  @ViewChild(SubscriptionModalComponent) subscriptionModal!: SubscriptionModalComponent;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #document: Document = inject(DOCUMENT);
  readonly #renderer: Renderer2 = inject(Renderer2);

  selectedContractorId!: number;

  public contractors: IContractor[] = [
    // {
    //   id: 1,
    //   fullName: 'Yiorgos Avraamu',
    //   email: 'yiorgos@example.com',
    //   phoneNumber: '+123456789',
    //   location: 'New York',
    //   serviceCategory: 'Web Development',
    //   profilePicture: './assets/images/avatars/1.jpg',
    //   status: 'Active',
    //   role: 'Admin'
    // },
    // {
    //   id: 2,
    //   fullName: 'Avram Tarasios',
    //   email: 'avram@example.com',
    //   phoneNumber: '+987654321',
    //   location: 'San Francisco',
    //   serviceCategory: 'Graphic Design',
    //   profilePicture: './assets/images/avatars/2.jpg',
    //   status: 'Inactive',
    //   role: 'Manager'
    // },
    // Add more contractors as needed
  ];

  public mainChartRef: WritableSignal<any> = signal(undefined);
  #mainChartRefEffect = effect(() => {
    if (this.mainChartRef()) {
      this.setChartStyles();
    }
  });

  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  constructor(private router: Router, private contractorDataService: ContractorDataService) { }

  ngOnInit(): void {
    this.initCharts();
    this.updateChartOnColorModeChange();
    this.contractorDataService.getAllContractors().subscribe(response => {
      // console.log(response, '00000>>>>>>>>>>>>>>>>>>>>')
      this.contractors = response
    })
  }

  initCharts(): void {
    // Initialize charts if needed
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.initCharts();
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChartRef.set($chartRef);
    }
  }

  updateChartOnColorModeChange() {
    const unListen = this.#renderer.listen(this.#document.documentElement, 'ColorSchemeChange', () => {
      this.setChartStyles();
    });

    this.#destroyRef.onDestroy(() => {
      unListen();
    });
  }

  setChartStyles() {
    if (this.mainChartRef()) {
      setTimeout(() => {
        this.mainChartRef().update();
      });
    }
  }

  editContractor(contractor: any): void {
    // Handle contractor editing
    console.log('Edit contractor with ID:', contractor);

    this.contractorDataService.setContractor(contractor);
    const contractorId = contractor.id
    // Redirect to edit form or open modal
    this.router.navigate(['/edit-contractor', contractorId]);
  }

  deleteContractor(id: number): void {
    if (confirm('Are you sure you want to delete this contractor?')) {
      // Call service to delete contractor
      console.log('Delete contractor with ID:', id);
      this.contractors = this.contractors.filter(c => c.id !== id);
    }
  }
  testClick(): void {
    console.log('Button clicked');
  }

  openSubscriptionModal(contractorId: number) {
    this.selectedContractorId = contractorId;
    this.subscriptionModal.contractorId = contractorId;
    this.subscriptionModal.showModal(); // Assuming the modal has an 'open' method
  }
  
}
