import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import productsReducer from "./productsReducer";
import selectedProductReducer from "./selectedProductReducer";
import workcentersReducer from "./workcentersReducer";
import selectedWorkcenterReducer from "./selectedWorkcenterReducer";
import bomsReducer from "./bomsReducer";
import selectedBomReducer from "./selectedBomReducer";
import bomLinesReducer from "./bomLinesReducer";
import selectedBomLineReducer from "./selectedBomLineReducer";
import contactsReducer from "./contactsReducer";
import selectedContactReducer from "./selectedContactReducer";
import deliversReducer from "./deliversReducer";
import selectedDeliverReducer from "./selectedDeliverReducer";
import inventoriesReducer from "./inventoriesReducer";
import selectedInventoryReducer from "./selectedInventoryReducer";
import quotesReducer from "./quotesReducer";
import selectedQuoteReducer from "./selectedQuoteReducer";
import ordersReducer from "./ordersReducer";
import selectedOrderReducer from "./selectedOrderReducer";
import orderLinesReducer from "./orderLinesReducer";
import selectedOrderLineReducer from "./selectedOrderLineReducer";
import productCategoriesReducer from "./productCategoriesReducer";
import selectedProductCategoryReducer from "./selectedProductCategoryReducer";
import productionsReducer from "./productionsReducer";
import selectedProductionReducer from "./selectedProductionReducer";
import routingsReducer from "./routingsReducer";
import selectedRoutingReducer from "./selectedRoutingReducer";
import routingWorkcentersReducer from "./routingWorkcentersReducer";
import selectedRoutingWorkcenterReducer from "./selectedRoutingWorkcenterReducer";
import uomsReducer from "./uomsReducer";
import selectedUomReducer from "./selectedUomReducer";
import loginedUserReducer from "./loginedUserReducer";
import usersReducer from "./usersReducer";
import selectedUserReducer from "./selectedUserReducer";
import workcenterProductivitiesReducer from "./workcenterProductivitiesReducer";
import selectedWorkcenterProductivityReducer from "./selectedWorkcenterProductivityReducer";
import workordersReducer from "./workordersReducer";
import selectedWorkorderReducer from "./selectedWorkorderReducer";
import coursesReducer from "./coursesReducer";
import selectedCourseReducer from "./selectedCourseReducer";
import authorReducer from "./authorReducer";
import apiReducer from "./apiReducer";
import documentsReducer from "./documentsReducer";

export default combineReducers({
  workcentersReducer,
  selectedWorkcenterReducer,
  productsReducer,
  selectedProductReducer,
  bomsReducer,
  selectedBomReducer,
  bomLinesReducer,
  selectedBomLineReducer,
  contactsReducer,
  selectedContactReducer,
  deliversReducer,
  selectedDeliverReducer,
  inventoriesReducer,
  selectedInventoryReducer,
  ordersReducer,
  selectedOrderReducer,
  quotesReducer,
  selectedQuoteReducer,
  orderLinesReducer,
  selectedOrderLineReducer,
  productCategoriesReducer,
  selectedProductCategoryReducer,
  productionsReducer,
  selectedProductionReducer,
  routingsReducer,
  selectedRoutingReducer,
  routingWorkcentersReducer,
  selectedRoutingWorkcenterReducer,
  uomsReducer,
  selectedUomReducer,
  usersReducer,
  selectedUserReducer,
  loginedUserReducer,
  workcenterProductivitiesReducer,
  selectedWorkcenterProductivityReducer,
  workordersReducer,
  selectedWorkorderReducer,
  coursesReducer,
  selectedCourseReducer,
  authorReducer,
  apiReducer,
  documentsReducer,
  form: formReducer
});
