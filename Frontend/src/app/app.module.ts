import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// primeng
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonModule} from 'primeng/button';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {RippleModule} from 'primeng/ripple';
import { HeaderComponent } from './Components/header/header.component';
import { NavComponent } from './Components/nav/nav.component';
import { CategoryCollectionComponent } from './Components/category-collection/category-collection.component';
import { SmallNavComponent } from './Components/small-nav/small-nav.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductItemComponent } from './Components/product-item/product-item.component';
import { DealSectionComponent } from './Components/deal-section/deal-section.component';
import { TopSellingComponent } from './Components/top-selling/top-selling.component';
import { TopPopulateComponent } from './Components/top-populate/top-populate.component';
import { BestRatingComponent } from './Components/best-rating/best-rating.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { TopHeaderComponent } from './Components/header/top-header/top-header.component';
import { MainHeaderComponent } from './Components/header/main-header/main-header.component';
import { NewProductComponent } from './Components/new-product/new-product.component';
import { NewProductItemComponent } from './Components/new-product-item/new-product-item.component';
import {CarouselModule} from 'primeng/carousel';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
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
    NewProductItemComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    ToggleButtonModule,
    RippleModule,
    CarouselModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
