import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit, OnDestroy {
  product: Product;
  subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.subscription.add(this.productService.readById(id).subscribe(product => {
      this.product = product;
    }));

  }

  updateProduct(): void {
    this.subscription.add(this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['/products']);
    }));

  }

  cancel(): void {
    this.router.navigate(['/products']);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
