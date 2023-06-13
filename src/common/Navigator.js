import { CommonActions, StackActions } from "@react-navigation/native";

let _container;

function setContainer(container) {
  _container = container;
}
function getContainer() {
  return _container;
}
function reset(routeName, params = {}) {
  _container.dispatch(
    CommonActions.reset({
      index: 1,
      // actions: [
      //   CommonActions.navigate({
      //     type: "Navigation/NAVIGATE",
      //     routes: [{ name: routeName }],
      //     params,
      //   }),
      // ],
      routes: [{ name: routeName, params: params }],
    })
  );
}

function resetFrom(routeName) {
  _container.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: routeName }],
    })
  );
}

function goBack(routeName) {
  _container.goBack(routeName);
}

function navigate(routeName, params = {}) {
  _container.navigate(routeName, params);
}

function push(routeName, params = {}) {
  _container.dispatch(StackActions.push(routeName, params));
}

function getCurrentRoute() {
  let route = _container.state;
  // let route = _container.state.nav
  // while (route.routes) {
  //   route = route.routes[route.index]
  // }
  return route;
}

export default {
  setContainer,
  navigate,
  reset,
  goBack,
  getContainer,
  getCurrentRoute,
  resetFrom,
  push,
};
