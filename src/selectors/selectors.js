import { createSelector } from "reselect";

export const authorsFormattedForDropdown = authors => {
  if (!authors) {
    return;
  }

  return authors.map(author => {
    return {
      value: author.id,
      label: `${author.firstName} ${author.lastName}`
    };
  });
};

export const productCategoriesFormattedForDropdown = productCategories => {
  if (!productCategories) {
    return;
  }

  return productCategories.map(productCategory => {
    return {
      value: productCategory.id,
      text: `${productCategory.name}`
    };
  });
};

const productsSelector = state => state.productsReducer.products;

export const productsFormattedForDropdown = createSelector(
  productsSelector,
  products =>
    products.map(product => {
      return {
        value: product.id,
        label: product.name,
        uom: product.uom
      };
    })
);

const routingsSelector = state => state.routingsReducer.routings;

export const routingsFormattedForDropdown = createSelector(
  routingsSelector,
  routings =>
    routings.map(routing => {
      return {
        value: routing.id,
        label: routing.name
      };
    })
);

const uomsSelector = state => state.uomsReducer.uoms;

export const uomsFormattedForDropdown = createSelector(
  uomsSelector,
  uoms =>
    uoms.map(uom => {
      return {
        value: uom.name,
        label: uom.name
      };
    })
);

const bomsSelector = state => state.bomsReducer.boms;

export const bomsFormattedForDropdown = createSelector(
  bomsSelector,
  boms =>
    boms.map(bom => {
      return {
        value: bom.id,
        label: bom.name
      };
    })
);

const contactsSelector = state => state.contactsReducer.contacts;

export const contactsFormattedForDropdown = createSelector(
  contactsSelector,
  contacts =>
    contacts.map(contact => {
      return {
        value: contact.id,
        label: `${contact.name}-${contact.description}`
      };
    })
);

const workcentersSelector = state => state.workcentersReducer.workcenters;

export const workcentersFormattedForDropdown = createSelector(
  workcentersSelector,
  workcenters =>
    workcenters.map(workcenter => {
      return {
        value: workcenter.id,
        label: workcenter.name
      };
    })
);

const orderLinesSelector = state => state.orderLinesReducer.orderLines;

export const subtotalSelector = createSelector(
  orderLinesSelector,
  items =>
    items.reduce((acc, item) => acc + item.productPrice * item.productUomQty, 0)
);

export const taxSelector = createSelector(
  subtotalSelector,
  subtotal => subtotal * (10 / 100)
);

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => subtotal + tax
);
