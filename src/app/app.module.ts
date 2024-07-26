import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AlertModule,
  ButtonModule,
  CardModule,
  FooterModule,
  HeaderModule,
  SidebarModule,
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
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalBodyComponent,
  ModalModule,
  DropdownComponent,
  DropdownModule,
  DropdownItemDirective,
  DropdownMenuDirective,
  DropdownCloseDirective,
  DropdownHeaderDirective
} from '@coreui/angular';
import { IconModule, IconDirective } from '@coreui/icons-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubscriptionModalComponent } from './views/pages/subscriptions/subscriptions.component';
import { ContractorsComponent } from './views/pages/contractors/contractors.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionModalComponent,
    ContractorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AlertModule,
    ButtonModule,
    CardModule,
    FooterModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    FormsModule,
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
    ModalComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalModule,
    DropdownComponent,
    DropdownModule,
    DropdownItemDirective,
    DropdownMenuDirective,
    DropdownCloseDirective,
    DropdownHeaderDirective,
    IconDirective,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
