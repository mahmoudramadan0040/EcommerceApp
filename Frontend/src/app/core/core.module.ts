import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { CategoryCollectionComponent } from './components/category-collection/category-collection.component';
import { SmallNavComponent } from './components/small-nav/small-nav.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { DealSectionComponent } from './components/deal-section/deal-section.component';
import { TopSellingComponent } from './components/top-selling/top-selling.component';
import { TopPopulateComponent } from './components/top-populate/top-populate.component';
import { BestRatingComponent } from './components/best-rating/best-rating.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { TopHeaderComponent } from './components/header/top-header/top-header.component';
import { MainHeaderComponent } from './components/header/main-header/main-header.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { NewProductItemComponent } from './components/new-product-item/new-product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

// ng prime module
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {CarouselModule} from 'primeng/carousel';
import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './components/login/login.component';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {PasswordModule} from 'primeng/password';
import {ChipsModule} from 'primeng/chips';
import { RegisterComponent } from './components/register/register.component';
import { authInterceptorProviders } from '../helpers/auth.interceptor';

import { TagModule } from 'primeng/tag';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { MainComponent } from './components/main/main.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    CategoryCollectionComponent,
    SmallNavComponent,
    ProductListComponent,
    ProductItemComponent,
    DealSectionComponent,
    TopSellingComponent,
    TopPopulateComponent,
    BestRatingComponent,
    FooterComponent,
    HomeComponent,
    TopHeaderComponent,
    MainHeaderComponent,
    NewProductComponent,
    NewProductItemComponent,
    LoginComponent,
    RegisterComponent,
    ProductDetailsComponent,
    MainComponent,
    ProfileComponent,

  ],
  imports: [
    CommonModule,
    ButtonModule,
    ToggleButtonModule,
    RippleModule,
    CarouselModule,
    SharedModule,
    CoreRoutingModule,
    CheckboxModule,
    DialogModule,
    PasswordModule,
    ChipsModule,
    ReactiveFormsModule,
    TagModule
  ],
  providers: [authInterceptorProviders],
  exports:[TopHeaderComponent]
})
export class CoreModule { }
