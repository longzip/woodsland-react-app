//This is to ensure that we can see the entirety of the store

export default {
  authorReducer: {
    authors: []
  },

  workcentersReducer: {
    workcenters: []
  },

  selectedWorkcenterReducer: {
    workcenter: undefined
  },

  productsReducer: {
    products: []
  },

  selectedProductReducer: {
    product: undefined
  },

  bomsReducer: {
    boms: []
  },

  selectedBomReducer: {
    bom: undefined
  },
  bomLinesReducer: {
    bomLines: []
  },

  selectedBomLineReducer: {
    bomLine: undefined
  },

  contactsReducer: {
    contacts: []
  },

  selectedContactReducer: {
    contact: undefined
  },

  deliversReducer: {
    delivers: []
  },

  selectedDeliverReducer: {
    deliver: undefined
  },

  inventoriesReducer: {
    inventories: []
  },

  selectedInventoryReducer: {
    inventory: undefined
  },

  ordersReducer: {
    orders: []
  },

  selectedOrderReducer: {
    order: undefined
  },

  quotesReducer: {
    quotes: []
  },

  selectedQuoteReducer: {
    quote: undefined
  },

  orderLinesReducer: {
    orderLines: []
  },

  selectedOrderLineReducer: {
    orderLine: undefined
  },

  productCategoriesReducer: {
    productCategories: []
  },

  selectedProductCategoryReducer: {
    productCategory: undefined
  },

  productionsReducer: {
    productions: []
  },

  selectedProductionReducer: {
    production: undefined
  },

  routingsReducer: {
    routings: []
  },

  selectedRoutingReducer: {
    routing: undefined
  },

  routingWorkcentersReducer: {
    routingWorkcenters: []
  },

  selectedRoutingWorkcenterReducer: {
    routingWorkcenter: undefined
  },

  uomsReducer: {
    uoms: []
  },

  selectedUomReducer: {
    uom: undefined
  },

  usersReducer: {
    users: []
  },

  selectedUserReducer: {
    user: undefined
  },

  loginedUserReducer: {
    userAuth: JSON.parse(localStorage.getItem("user"))
  },

  workcenterProductivitiesReducer: {
    workcenterProductivities: []
  },

  selectedWorkcenterProductivityReducer: {
    workcenterProductivity: undefined
  },

  workordersReducer: {
    workorders: []
  },

  selectedWorkorderReducer: {
    workorder: undefined
  },

  coursesReducer: {
    courses: []
  },

  selectedCourseReducer: {
    course: undefined
  },

  apiReducer: {
    apiCallsInProgress: 0
  },

  documentsReducer: {
    documents: []
  }
};
