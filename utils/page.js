/* export default class PM { */
class PM {
  constructor() {
    this.$$cache = {};
  }

  add(pageModel) {
    let pagePath = this._getPageModelPath(pageModel);

    this.$$cache[pagePath] = pageModel;
  }

  got(pagePath) {
    return this.$$cache[pagePath];
  }

  delete(pageModel) {
    try {
      delete this.$$cache[this._getPageModelPath(pageModel)];
    } catch (e) {
    }
  }

  _getPageModelPath(page) {
    // 关键点
    return page.__route__;
  }
}


export { PM }