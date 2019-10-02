import React, { Component } from "react";
const formatter = new Intl.NumberFormat("vi");

export default class ProductWidget extends Component {
  render() {
    return (
      <ul class="products-list product-list-in-card pl-2 pr-2">
        {this.props.products.map(product => (
          <li class="item">
            <div class="product-img">
              <img
                src={product.imageUrl}
                alt="Product Image"
                class="img-size-50"
              />
            </div>
            <div class="product-info">
              <a
                href={`/datas/product/${product.id}/detail`}
                class="product-title"
              >
                {product.name}
                <span class="badge badge-warning float-right">
                  {formatter.format(product.listPrice)}
                </span>
              </a>
              <span class="product-description">{product.description}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
