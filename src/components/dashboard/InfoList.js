import React from "react";

export default function InfoList(quotes, contacts, products) {
  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box">
          <span className="info-box-icon bg-info elevation-1">
            <i className="fas fa-cog"></i>
          </span>

          <div className="info-box-content">
            <span className="info-box-text">Sản xuất</span>
            <span className="info-box-number">
              10
              <small>%</small>
            </span>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box mb-3">
          <span className="info-box-icon bg-danger elevation-1">
            <i className="fas fa-thumbs-up"></i>
          </span>

          <div className="info-box-content">
            <span className="info-box-text">Sản phẩm</span>
            <span className="info-box-number"> </span>
          </div>
        </div>
      </div>

      <div className="clearfix hidden-md-up"></div>

      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box mb-3">
          <span className="info-box-icon bg-success elevation-1">
            <i className="fas fa-shopping-cart"></i>
          </span>

          <div className="info-box-content">
            <span className="info-box-text">Báo giá</span>
            <span className="info-box-number">{quotes.length}</span>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="info-box mb-3">
          <span className="info-box-icon bg-warning elevation-1">
            <i className="fas fa-users"></i>
          </span>

          <div className="info-box-content">
            <span className="info-box-text">Dự án</span>
            <span className="info-box-number">{contacts.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
