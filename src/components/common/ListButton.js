import React from "react";
import PropTypes from "prop-types";
export const ListButton = ({ handleAdd, handleEdit, handleDelete }) => {
  return (
    <div className="btn-group" role="group">
      <button type="button" className="btn btn-primary" onClick={handleAdd}>
        <i className="fas fa-plus"></i> Tạo
      </button>

      <button
        type="button"
        className="btn btn-warning ml-2"
        onClick={handleEdit}
      >
        <i className="fas fa-edit"></i> Sửa
      </button>

      <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={handleDelete}
      >
        <i className="fas fa-trash"></i> Xóa
      </button>
    </div>
  );
};
ListButton.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default ListButton;
